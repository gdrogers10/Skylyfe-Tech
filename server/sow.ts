import OpenAI from "openai";
import sanitizeHtml from "sanitize-html";
import { type SowFormData, type SowOutput } from "@shared/schema";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

const SERVICE_TITLES: Record<string, string> = {
  "ai-ml-genai": "AI/ML & GenAI",
  "spatial-ar": "Spatial/AR Experiences",
  "3d-printing-prototyping": "3D Printing & Rapid Prototyping",
  "iot-gps-tracking": "IoT & GPS Tracking",
  "ecommerce-shopify": "E-commerce & Shopify",
  "branding-visual-identity": "Branding & Visual Identity",
  "training-workshops": "Training & Workshops",
};

const SOW_SCHEMA = {
  name: "sow_output",
  strict: true,
  schema: {
    type: "object",
    properties: {
      projectTitle: { type: "string" },
      client: {
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          organization: { type: "string" },
        },
        required: ["name", "email", "organization"],
        additionalProperties: false,
      },
      date: { type: "string" },
      summary: { type: "string" },
      objectives: { type: "array", items: { type: "string" } },
      scope: { type: "array", items: { type: "string" } },
      deliverables: { type: "array", items: { type: "string" } },
      timeline: {
        type: "array",
        items: {
          type: "object",
          properties: {
            week: { type: "string" },
            milestone: { type: "string" },
          },
          required: ["week", "milestone"],
          additionalProperties: false,
        },
      },
      successMetrics: { type: "array", items: { type: "string" } },
      assumptions: { type: "array", items: { type: "string" } },
      outOfScope: { type: "array", items: { type: "string" } },
      pricingModel: { type: "string" },
      pricingNotes: { type: "string" },
      legal: {
        type: "object",
        properties: {
          ipOwnership: { type: "string" },
          confidentiality: { type: "string" },
          accessibility: { type: "string" },
          dataSecurity: { type: "string" },
        },
        required: ["ipOwnership", "confidentiality", "accessibility", "dataSecurity"],
        additionalProperties: false,
      },
    },
    required: [
      "projectTitle",
      "client",
      "date",
      "summary",
      "objectives",
      "scope",
      "deliverables",
      "timeline",
      "successMetrics",
      "assumptions",
      "outOfScope",
      "pricingModel",
      "pricingNotes",
      "legal",
    ],
    additionalProperties: false,
  },
};

export async function generateSow(formData: SowFormData): Promise<SowOutput> {
  const selectedServices = formData.projectBasics.serviceTypes
    .map((slug) => SERVICE_TITLES[slug] || slug)
    .join(", ");

  const allDeliverables = [
    ...formData.deliverables.suggested,
    ...formData.deliverables.custom,
  ];

  const allMetrics = [
    ...formData.successMetrics.predefined,
    formData.successMetrics.custom,
  ].filter(Boolean);

  const ipOwnershipText = {
    client: "All custom work transfers to client upon final payment",
    shared: "Both parties retain rights to use and modify the work",
    skylyfe: "Skylyfe retains ownership with perpetual license to client",
  }[formData.legal.ipOwnership];

  const prompt = `Generate a professional Statement of Work (SOW) for the following project:

CLIENT INFORMATION:
- Name: ${formData.contact.name}
- Email: ${formData.contact.email}
- Organization: ${formData.contact.organization || "Individual"}
- Role: ${formData.contact.role || "Not specified"}

PROJECT DETAILS:
- Title: ${formData.projectBasics.projectTitle}
- Services: ${selectedServices}
- Goals: ${formData.projectBasics.goals}
- Target Audience: ${formData.projectBasics.audience || "Not specified"}
- Desired Outcomes: ${formData.projectBasics.desiredOutcomes || "Not specified"}

TIMELINE & BUDGET:
- Duration: ${formData.timeline.duration}
- Budget Range: ${formData.timeline.budgetBand}

TECHNICAL CONTEXT:
- Tools of Interest: ${formData.techContext.toolsOfInterest.join(", ") || "Not specified"}
- Integrations: ${formData.techContext.integrations || "None specified"}
- Security Needs: ${formData.techContext.dataSecurityNeeds || "Standard security practices"}

DELIVERABLES:
${allDeliverables.map((d) => `- ${d}`).join("\n")}

SUCCESS METRICS:
${allMetrics.map((m) => `- ${m}`).join("\n")}

LEGAL PREFERENCES:
- IP Ownership: ${ipOwnershipText}
- Confidentiality: ${formData.legal.confidentiality ? "Required" : "Not required"}
- WCAG Accessibility: ${formData.legal.accessibility ? "Required" : "Not required"}
- Additional Security Notes: ${formData.legal.dataSecurity || "None"}

Generate a comprehensive, professional SOW document with clear objectives, detailed scope, realistic timeline milestones, and appropriate assumptions and exclusions. The SOW should be ready for client review and signature.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are an expert technical project manager at Skylyfe Technologies LLC. Generate professional, comprehensive Statements of Work that clearly define project scope, deliverables, and expectations. Be specific and actionable. Use today's date for the document date.",
      },
      { role: "user", content: prompt },
    ],
    response_format: {
      type: "json_schema",
      json_schema: SOW_SCHEMA,
    },
    max_completion_tokens: 4096,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response from OpenAI");
  }

  return JSON.parse(content) as SowOutput;
}

export function sanitizeSowHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'strong', 'em', 'b', 'i', 'br', 'hr'
    ],
    allowedAttributes: {
      '*': ['style', 'class']
    },
    allowedStyles: {
      '*': {
        'color': [/^#[0-9a-fA-F]{3,6}$/],
        'background': [/^#[0-9a-fA-F]{3,6}$/],
        'background-color': [/^#[0-9a-fA-F]{3,6}$/],
        'font-family': [/^[a-zA-Z\s\-,'"]+$/],
        'font-size': [/^\d+(?:px|em|rem|pt|%)$/],
        'font-weight': [/^\d+$/, /^bold$/, /^normal$/],
        'line-height': [/^\d+(?:\.\d+)?$/],
        'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
        'margin': [/^[\d\s.]+(?:px|em|rem|%)?\s*$/],
        'margin-top': [/^\d+(?:px|em|rem|%)$/],
        'margin-bottom': [/^\d+(?:px|em|rem|%)$/],
        'margin-left': [/^\d+(?:px|em|rem|%)$/],
        'margin-right': [/^\d+(?:px|em|rem|%)$/],
        'padding': [/^[\d\s.]+(?:px|em|rem|%)?\s*$/],
        'padding-top': [/^\d+(?:px|em|rem|%)$/],
        'padding-bottom': [/^\d+(?:px|em|rem|%)$/],
        'padding-left': [/^\d+(?:px|em|rem|%)$/],
        'padding-right': [/^\d+(?:px|em|rem|%)$/],
        'border': [/^\d+px\s+\w+\s+#[0-9a-fA-F]{3,6}$/],
        'border-bottom': [/^\d+px\s+\w+\s+#[0-9a-fA-F]{3,6}$/],
        'border-top': [/^\d+px\s+\w+\s+#[0-9a-fA-F]{3,6}$/],
        'border-radius': [/^\d+(?:px|em|rem|%)$/],
        'border-collapse': [/^collapse$/, /^separate$/],
        'width': [/^\d+(?:px|em|rem|%)$/],
        'display': [/^grid$/, /^flex$/, /^block$/, /^inline$/, /^inline-block$/],
        'grid-template-columns': [/^(?:\d+fr\s*)+$/, /^repeat\(\d+,\s*\d+fr\)$/],
        'gap': [/^\d+(?:px|em|rem|%)$/],
      }
    },
    disallowedTagsMode: 'discard'
  });
}

export function renderSowHtml(sow: SowOutput): string {
  return `
    <div class="sow-document" style="font-family: system-ui, sans-serif; line-height: 1.6; color: #1f2937;">
      <div style="text-align: center; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 2px solid #2563eb;">
        <h1 style="font-size: 1.5rem; font-weight: bold; color: #1f2937; margin: 0;">STATEMENT OF WORK</h1>
        <p style="color: #6b7280; margin-top: 0.5rem;">Skylyfe Technologies LLC</p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; padding: 1rem; background: #f9fafb; border-radius: 0.5rem;">
        <div>
          <strong style="color: #374151;">Project:</strong> ${sow.projectTitle}
        </div>
        <div>
          <strong style="color: #374151;">Date:</strong> ${sow.date}
        </div>
        <div>
          <strong style="color: #374151;">Client:</strong> ${sow.client.name}
        </div>
        <div>
          <strong style="color: #374151;">Organization:</strong> ${sow.client.organization || "N/A"}
        </div>
      </div>

      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.1rem; font-weight: 600; color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;">Executive Summary</h2>
        <p style="color: #4b5563;">${sow.summary}</p>
      </div>

      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.1rem; font-weight: 600; color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;">Objectives</h2>
        <ul style="color: #4b5563; padding-left: 1.5rem;">
          ${sow.objectives.map((obj) => `<li style="margin-bottom: 0.5rem;">${obj}</li>`).join("")}
        </ul>
      </div>

      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.1rem; font-weight: 600; color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;">Scope of Work</h2>
        <ul style="color: #4b5563; padding-left: 1.5rem;">
          ${sow.scope.map((s) => `<li style="margin-bottom: 0.5rem;">${s}</li>`).join("")}
        </ul>
      </div>

      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.1rem; font-weight: 600; color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;">Deliverables</h2>
        <ul style="color: #4b5563; padding-left: 1.5rem;">
          ${sow.deliverables.map((d) => `<li style="margin-bottom: 0.5rem;">${d}</li>`).join("")}
        </ul>
      </div>

      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.1rem; font-weight: 600; color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;">Timeline</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #f3f4f6;">
              <th style="padding: 0.75rem; text-align: left; border: 1px solid #e5e7eb; font-weight: 600;">Week</th>
              <th style="padding: 0.75rem; text-align: left; border: 1px solid #e5e7eb; font-weight: 600;">Milestone</th>
            </tr>
          </thead>
          <tbody>
            ${sow.timeline.map((t) => `
              <tr>
                <td style="padding: 0.75rem; border: 1px solid #e5e7eb; color: #374151;">${t.week}</td>
                <td style="padding: 0.75rem; border: 1px solid #e5e7eb; color: #4b5563;">${t.milestone}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.1rem; font-weight: 600; color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;">Success Metrics</h2>
        <ul style="color: #4b5563; padding-left: 1.5rem;">
          ${sow.successMetrics.map((m) => `<li style="margin-bottom: 0.5rem;">${m}</li>`).join("")}
        </ul>
      </div>

      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.1rem; font-weight: 600; color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;">Assumptions</h2>
        <ul style="color: #4b5563; padding-left: 1.5rem;">
          ${sow.assumptions.map((a) => `<li style="margin-bottom: 0.5rem;">${a}</li>`).join("")}
        </ul>
      </div>

      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.1rem; font-weight: 600; color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;">Out of Scope</h2>
        <ul style="color: #4b5563; padding-left: 1.5rem;">
          ${sow.outOfScope.map((o) => `<li style="margin-bottom: 0.5rem;">${o}</li>`).join("")}
        </ul>
      </div>

      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.1rem; font-weight: 600; color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;">Pricing</h2>
        <p style="color: #4b5563;"><strong>Model:</strong> ${sow.pricingModel}</p>
        <p style="color: #4b5563;">${sow.pricingNotes}</p>
      </div>

      <div style="margin-bottom: 2rem; padding: 1rem; background: #f9fafb; border-radius: 0.5rem;">
        <h2 style="font-size: 1.1rem; font-weight: 600; color: #2563eb; margin-bottom: 1rem;">Legal Terms</h2>
        <div style="display: grid; gap: 0.75rem; color: #4b5563;">
          <div><strong>IP Ownership:</strong> ${sow.legal.ipOwnership}</div>
          <div><strong>Confidentiality:</strong> ${sow.legal.confidentiality}</div>
          <div><strong>Accessibility:</strong> ${sow.legal.accessibility}</div>
          <div><strong>Data Security:</strong> ${sow.legal.dataSecurity}</div>
        </div>
      </div>

      <div style="margin-top: 3rem; padding-top: 2rem; border-top: 2px solid #e5e7eb;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem;">
          <div>
            <p style="margin-bottom: 2rem; color: #6b7280;">Client Signature:</p>
            <div style="border-bottom: 1px solid #9ca3af; margin-bottom: 0.5rem;"></div>
            <p style="color: #6b7280; font-size: 0.875rem;">Name: _____________________ Date: _____</p>
          </div>
          <div>
            <p style="margin-bottom: 2rem; color: #6b7280;">Skylyfe Technologies LLC:</p>
            <div style="border-bottom: 1px solid #9ca3af; margin-bottom: 0.5rem;"></div>
            <p style="color: #6b7280; font-size: 0.875rem;">Name: _____________________ Date: _____</p>
          </div>
        </div>
      </div>
    </div>
  `;
}
