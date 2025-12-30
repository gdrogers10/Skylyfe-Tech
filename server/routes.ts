import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, sowFormSchema } from "@shared/schema";
import { generateSow, renderSowHtml } from "./sow";
import { generatePdf } from "./pdf";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const parsed = insertContactSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid contact data", details: parsed.error.errors });
      }

      const contact = await storage.createContact(parsed.data);

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

  app.post("/api/sow", async (req: Request, res: Response) => {
    try {
      const parsed = sowFormSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid SOW data", details: parsed.error.errors });
      }

      const sow = await generateSow(parsed.data);
      const html = renderSowHtml(sow);

      res.json({ sow, html });
    } catch (error) {
      console.error("SOW generation error:", error);
      res.status(500).json({ error: "Failed to generate SOW" });
    }
  });

  app.post("/api/sow/pdf", async (req: Request, res: Response) => {
    try {
      const { html } = req.body;
      if (!html || typeof html !== "string") {
        return res.status(400).json({ error: "HTML content required" });
      }

      const pdfBuffer = await generatePdf(html);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", 'attachment; filename="Statement-of-Work.pdf"');
      res.send(pdfBuffer);
    } catch (error) {
      console.error("PDF generation error:", error);
      res.status(500).json({ error: "Failed to generate PDF" });
    }
  });

  return httpServer;
}
