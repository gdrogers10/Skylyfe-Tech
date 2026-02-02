import { db } from "./db";
import { type Contact, type InsertContact, contacts, type SavedSow, type InsertSavedSow, savedSows } from "@shared/schema";
import type { IStorage } from "./storage";
import { eq, and, desc } from "drizzle-orm";

export class DatabaseStorage implements IStorage {
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return db
      .select()
      .from(contacts)
      .orderBy(contacts.createdAt);
  }

  async createSavedSow(insertSow: InsertSavedSow): Promise<SavedSow> {
    const [sow] = await db
      .insert(savedSows)
      .values(insertSow)
      .returning();
    return sow;
  }

  async getSavedSowsByUser(userId: string): Promise<SavedSow[]> {
    return db
      .select()
      .from(savedSows)
      .where(eq(savedSows.userId, userId))
      .orderBy(desc(savedSows.createdAt));
  }

  async getSavedSowById(id: number, userId: string): Promise<SavedSow | null> {
    const [sow] = await db
      .select()
      .from(savedSows)
      .where(and(eq(savedSows.id, id), eq(savedSows.userId, userId)));
    return sow || null;
  }

  async deleteSavedSow(id: number, userId: string): Promise<boolean> {
    const result = await db
      .delete(savedSows)
      .where(and(eq(savedSows.id, id), eq(savedSows.userId, userId)))
      .returning();
    return result.length > 0;
  }
}

export const dbStorage = new DatabaseStorage();
