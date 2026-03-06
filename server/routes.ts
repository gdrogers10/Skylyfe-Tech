import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import { storage } from "./storage";
import { insertContactSchema, sowFormSchema, scheduleFormSchema } from "@shared/schema";
import { generateSow, renderSowHtml, sanitizeSowHtml } from "./sow";
import { generatePdf } from "./pdf";
import { sendSOWNotification, sendContactNotification } from "./email";
import { setupAuth, registerAuthRoutes, isAuthenticated } from "./replit_integrations/auth";
import { getUncachableGoogleCalendarClient } from "./replit_integrations/googleCalendar";

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many contact submissions, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

const sowLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { error: "Too many SOW generation requests, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request) => {
    const user = (req as any).user;
    return user?.id || ipKeyGenerator(req.ip || '127.0.0.1');
  },
});

const pdfEmailLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: { error: "Too many PDF/email requests, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request) => {
    const user = (req as any).user;
    return user?.id || ipKeyGenerator(req.ip || '127.0.0.1');
  },
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  await setupAuth(app);
  registerAuthRoutes(app);
  app.post("/api/contact", contactLimiter, async (req: Request, res: Response) => {
    try {
      const parsed = insertContactSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid contact data", details: parsed.error.errors });
      }

      const contact = await storage.createContact(parsed.data);

      sendContactNotification({
        name: escapeHtml(parsed.data.name),
        email: escapeHtml(parsed.data.email),
        organization: parsed.data.organization ? escapeHtml(parsed.data.organization) : undefined,
        phone: parsed.data.phone ? escapeHtml(parsed.data.phone) : undefined,
        message: escapeHtml(parsed.data.message),
      }).catch(err => console.error("Contact email notification failed:", err));

      if (process.env.CONTACT_WEBHOOK_URL) {
        try {
          await fetch(process.env.CONTACT_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contact),
          });
        } catch (webhookError) {
          console.error("Webhook delivery failed:", webhookError);
        }
      }

      res.status(201).json({ success: true, id: contact.id });
    } catch (error) {
      console.error("Contact submission error:", error);
      res.status(500).json({ error: "Failed to submit contact" });
    }
  });

  app.post("/api/sow", sowLimiter, isAuthenticated, async (req: Request, res: Response) => {
    try {
      const parsed = sowFormSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid SOW data", details: parsed.error.errors });
      }

      const sow = await generateSow(parsed.data);
      const html = sanitizeSowHtml(renderSowHtml(sow));

      const user = (req as any).user;
      let savedSowId: number | null = null;

      if (user?.id) {
        try {
          const savedSow = await storage.createSavedSow({
            userId: user.id,
            projectTitle: sow.projectTitle,
            clientName: sow.client.name,
            clientEmail: sow.client.email,
            clientOrganization: sow.client.organization || null,
            sowData: sow,
          });
          savedSowId = savedSow.id;
        } catch (saveError) {
          console.error("Failed to save SOW to user profile:", saveError);
        }
      }

      res.json({ sow, html, savedSowId });
    } catch (error) {
      console.error("SOW generation error:", error);
      res.status(500).json({ error: "Failed to generate SOW" });
    }
  });

  app.post("/api/sow/pdf", pdfEmailLimiter, isAuthenticated, async (req: Request, res: Response) => {
    try {
      const { html } = req.body;
      if (!html || typeof html !== "string") {
        return res.status(400).json({ error: "HTML content required" });
      }
      if (html.length > 500000) {
        return res.status(400).json({ error: "HTML content too large" });
      }

      const sanitizedHtml = sanitizeSowHtml(html);
      const pdfBuffer = await generatePdf(sanitizedHtml);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", 'attachment; filename="Statement-of-Work.pdf"');
      res.send(pdfBuffer);
    } catch (error) {
      console.error("PDF generation error:", error);
      res.status(500).json({ error: "Failed to generate PDF" });
    }
  });

  app.post("/api/sow/email", pdfEmailLimiter, isAuthenticated, async (req: Request, res: Response) => {
    try {
      const { html, clientName, clientEmail, projectName } = req.body;
      if (!html || typeof html !== "string") {
        return res.status(400).json({ error: "HTML content required" });
      }
      if (html.length > 500000) {
        return res.status(400).json({ error: "HTML content too large" });
      }
      if (!clientName || !clientEmail || !projectName) {
        return res.status(400).json({ error: "Client name, email, and project name are required" });
      }
      if (typeof clientName !== "string" || typeof clientEmail !== "string" || typeof projectName !== "string") {
        return res.status(400).json({ error: "Invalid client data" });
      }

      const sanitizedHtml = sanitizeSowHtml(html);
      const pdfBuffer = await generatePdf(sanitizedHtml);

      const success = await sendSOWNotification({
        clientName: escapeHtml(clientName),
        clientEmail: escapeHtml(clientEmail),
        projectName: escapeHtml(projectName),
        pdfBuffer,
      });

      if (success) {
        res.json({ success: true, message: "SOW email sent successfully" });
      } else {
        res.status(500).json({ error: "Failed to send email" });
      }
    } catch (error) {
      console.error("SOW email error:", error);
      res.status(500).json({ error: "Failed to send SOW email" });
    }
  });

  app.get("/api/user/sows", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;
      if (!user?.id) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const sows = await storage.getSavedSowsByUser(user.id);
      res.json(sows);
    } catch (error) {
      console.error("Failed to fetch user SOWs:", error);
      res.status(500).json({ error: "Failed to fetch saved SOWs" });
    }
  });

  app.get("/api/user/sows/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;
      if (!user?.id) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const sowId = parseInt(req.params.id);
      if (isNaN(sowId)) {
        return res.status(400).json({ error: "Invalid SOW ID" });
      }

      const sow = await storage.getSavedSowById(sowId, user.id);
      if (!sow) {
        return res.status(404).json({ error: "SOW not found" });
      }

      res.json(sow);
    } catch (error) {
      console.error("Failed to fetch SOW:", error);
      res.status(500).json({ error: "Failed to fetch SOW" });
    }
  });

  app.delete("/api/user/sows/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;
      if (!user?.id) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const sowId = parseInt(req.params.id);
      if (isNaN(sowId)) {
        return res.status(400).json({ error: "Invalid SOW ID" });
      }

      const deleted = await storage.deleteSavedSow(sowId, user.id);
      if (!deleted) {
        return res.status(404).json({ error: "SOW not found or already deleted" });
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Failed to delete SOW:", error);
      res.status(500).json({ error: "Failed to delete SOW" });
    }
  });

  const scheduleLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { error: "Too many scheduling requests, please try again later" },
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.post("/api/schedule", scheduleLimiter, async (req: Request, res: Response) => {
    try {
      const parsed = scheduleFormSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid scheduling data", details: parsed.error.errors });
      }

      const { name, email, date, time, service, message } = parsed.data;

      const timeMatch = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
      if (!timeMatch) {
        return res.status(400).json({ error: "Invalid time format" });
      }

      let hours = parseInt(timeMatch[1]);
      const minutes = parseInt(timeMatch[2]);
      const ampm = timeMatch[3].toUpperCase();

      if (ampm === "PM" && hours !== 12) hours += 12;
      if (ampm === "AM" && hours === 12) hours = 0;

      const startDateTime = new Date(`${date}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`);
      const endDateTime = new Date(startDateTime.getTime() + 30 * 60 * 1000);

      if (isNaN(startDateTime.getTime())) {
        return res.status(400).json({ error: "Invalid date or time" });
      }

      const calendar = await getUncachableGoogleCalendarClient();

      const event = {
        summary: `Skylyfe Consultation: ${escapeHtml(service)} - ${escapeHtml(name)}`,
        description: [
          `Client: ${escapeHtml(name)}`,
          `Email: ${escapeHtml(email)}`,
          `Service: ${escapeHtml(service)}`,
          message ? `\nNotes: ${escapeHtml(message)}` : '',
        ].filter(Boolean).join('\n'),
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: 'America/New_York',
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: 'America/New_York',
        },
        attendees: [
          { email: email },
        ],
      };

      await calendar.events.insert({
        calendarId: 'primary',
        requestBody: event,
        sendUpdates: 'all',
      });

      res.status(201).json({ success: true, message: "Meeting scheduled successfully" });
    } catch (error) {
      console.error("Scheduling error:", error);
      res.status(500).json({ error: "Failed to schedule meeting. Please try again." });
    }
  });

  app.get("/robots.txt", (req: Request, res: Response) => {
    const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://skylyfe.tech/sitemap.xml
`;
    res.type("text/plain").send(robotsTxt);
  });

  app.get("/sitemap.xml", (req: Request, res: Response) => {
    const baseUrl = "https://skylyfe.tech";
    const services = [
      "ai-ml-genai",
      "spatial-ar",
      "3d-printing-prototyping",
      "iot-gps-tracking",
      "ecommerce-shopify",
      "branding-visual-identity",
      "training-workshops",
    ];

    const staticUrls = [
      { loc: "/", priority: "1.0", changefreq: "weekly" },
      { loc: "/services", priority: "0.9", changefreq: "weekly" },
      { loc: "/scope", priority: "0.9", changefreq: "weekly" },
      { loc: "/schedule", priority: "0.8", changefreq: "weekly" },
      { loc: "/work", priority: "0.8", changefreq: "monthly" },
      { loc: "/about", priority: "0.7", changefreq: "monthly" },
      { loc: "/contact", priority: "0.7", changefreq: "monthly" },
    ];

    const serviceUrls = services.map((slug) => ({
      loc: `/services/${slug}`,
      priority: "0.8",
      changefreq: "monthly",
    }));

    const allUrls = [...staticUrls, ...serviceUrls];
    const lastmod = new Date().toISOString().split("T")[0];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

    res.type("application/xml").send(sitemap);
  });

  return httpServer;
}
