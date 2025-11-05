import type { Contact } from "../models/contact.model";

export class MemoryStore {
    private contacts: Contact[] = [];
    private seq = 1;

    all(): Contact[] {
        return this.contacts;
    }

    findById(id: number): Contact | undefined {
        return this.contacts.find(c => c.id === id);
    }

    findByEmail(email: string): Contact | undefined {
        const e = email.toLowerCase();
        return this.contacts.find(c => c.email.toLowerCase() === e);
    }

    create(data: Omit<Contact, "id">): Contact {
        const c: Contact = { id: this.seq++, ...data };
        this.contacts.push(c);
        return c;
    }

    update(id: number, data: Omit<Contact, "id">): Contact | undefined {
        const idx = this.contacts.findIndex(c => c.id === id);
        if (idx === -1) return undefined;
        const updated: Contact = { id, ...data };
        this.contacts[idx] = updated;
        return updated;
    }

    delete(id: number): boolean {
        const before = this.contacts.length;
        this.contacts = this.contacts.filter(c => c.id !== id);
        return this.contacts.length < before;
    }

    clear(): void {
        this.contacts = [];
        this.seq = 1;
    }
}

export const store = new MemoryStore();
