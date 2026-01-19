import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";

export * from "./models/auth";

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  organization: text("organization"),
  phone: text("phone"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

export const sowFormSchema = z.object({
  contact: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Valid email is required"),
    organization: z.string().optional(),
    role: z.string().optional(),
    phone: z.string().optional(),
  }),
  projectBasics: z.object({
    serviceTypes: z.array(z.string()).min(1, "Select at least one service"),
    projectTitle: z.string().min(1, "Project title is required"),
    goals: z.string().min(10, "Please describe your goals"),
    audience: z.string().optional(),
    desiredOutcomes: z.string().optional(),
  }),
  timeline: z.object({
    duration: z.enum(["2 weeks", "4 weeks", "8 weeks", "12 weeks", "3 months", "6 months", "9 months", "12 months"]),
    budgetBand: z.enum(["$500-$1k", "<$5k", "$5-15k", "$15-40k", "$40k+"]),
  }),
  techContext: z.object({
    toolsOfInterest: z.array(z.string()),
    integrations: z.string().optional(),
    dataSecurityNeeds: z.string().optional(),
  }),
  deliverables: z.object({
    suggested: z.array(z.string()),
    custom: z.array(z.string()),
  }),
  successMetrics: z.object({
    predefined: z.array(z.string()),
    custom: z.string().optional(),
  }),
  legal: z.object({
    ipOwnership: z.enum(["client", "shared", "skylyfe"]),
    confidentiality: z.boolean(),
    accessibility: z.boolean(),
    dataSecurity: z.string().optional(),
  }),
});

export type SowFormData = z.infer<typeof sowFormSchema>;

export const sowOutputSchema = z.object({
  projectTitle: z.string(),
  client: z.object({
    name: z.string(),
    email: z.string(),
    organization: z.string().optional(),
  }),
  date: z.string(),
  summary: z.string(),
  objectives: z.array(z.string()),
  scope: z.array(z.string()),
  deliverables: z.array(z.string()),
  timeline: z.array(z.object({
    week: z.string(),
    milestone: z.string(),
  })),
  successMetrics: z.array(z.string()),
  assumptions: z.array(z.string()),
  outOfScope: z.array(z.string()),
  pricingModel: z.string(),
  pricingNotes: z.string(),
  legal: z.object({
    ipOwnership: z.string(),
    confidentiality: z.string(),
    accessibility: z.string(),
    dataSecurity: z.string(),
  }),
});

export type SowOutput = z.infer<typeof sowOutputSchema>;
