import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import rateLimit from "express-rate-limit";
import { storage } from "./storage";
import { insertContactSchema, sowFormSchema } from "@shared/schema";
import { generateSow, renderSowHtml, sanitizeSowHtml } from "./sow";
import { generatePdf } from "./pdf";
import { sendSOWNotification, sendContactNotification } from "./email";
import { setupAuth, registerAuthRoutes, isAuthenticated } from "./replit_integrations/auth";

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
    const userId = user?.id || 'anonymous';
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    return `${userId}-${ip}`;
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
    const userId = user?.id || 'anonymous';
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    return `${userId}-${ip}`;
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

      res.json({ sow, html });
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

  return httpServer;
}
