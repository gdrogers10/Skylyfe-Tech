import { type Contact, type InsertContact, type SavedSow, type InsertSavedSow } from "@shared/schema";

export interface IStorage {
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  createSavedSow(sow: InsertSavedSow): Promise<SavedSow>;
  getSavedSowsByUser(userId: string): Promise<SavedSow[]>;
  getSavedSowById(id: number, userId: string): Promise<SavedSow | null>;
  deleteSavedSow(id: number, userId: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private contacts: Map<number, Contact>;
  private contactIdCounter: number;
  private savedSows: Map<number, SavedSow>;
  private sowIdCounter: number;

  constructor() {
    this.contacts = new Map();
    this.contactIdCounter = 1;
    this.savedSows = new Map();
    this.sowIdCounter = 1;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.contactIdCounter++;
    const contact: Contact = {
      ...insertContact,
      id,
      organization: insertContact.organization || null,
      phone: insertContact.phone || null,
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createSavedSow(insertSow: InsertSavedSow): Promise<SavedSow> {
    const id = this.sowIdCounter++;
    const sow: SavedSow = {
      ...insertSow,
      id,
      clientOrganization: insertSow.clientOrganization || null,
      createdAt: new Date(),
    };
    this.savedSows.set(id, sow);
    return sow;
  }

  async getSavedSowsByUser(userId: string): Promise<SavedSow[]> {
    return Array.from(this.savedSows.values())
      .filter(sow => sow.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getSavedSowById(id: number, userId: string): Promise<SavedSow | null> {
    const sow = this.savedSows.get(id);
    if (sow && sow.userId === userId) {
      return sow;
    }
    return null;
  }

  async deleteSavedSow(id: number, userId: string): Promise<boolean> {
    const sow = this.savedSows.get(id);
    if (sow && sow.userId === userId) {
      this.savedSows.delete(id);
      return true;
    }
    return false;
  }
}

import { dbStorage } from "./dbStorage";

export const storage: IStorage = dbStorage;
