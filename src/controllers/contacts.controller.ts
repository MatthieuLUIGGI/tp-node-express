import { Request, Response } from "express";
import { z } from "zod";
import { store } from "../store/memory.store";
import { logger } from "../utils/logger";

const phoneRegex = /^[+()\-.\s0-9]{7,}$/;

const contactSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().regex(phoneRegex, "invalid phone").optional().or(z.literal("").transform(() => undefined))
});

type ContactInput = z.infer<typeof contactSchema>;

// GET /contacts
export function listContacts(_req: Request, res: Response) {
    res.json(store.all());
}

// POST /contacts
export function createContact(req: Request, res: Response) {
    logger.info({ body: req.body }, "Creating contact");
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: "Invalid body", details: parsed.error.flatten() });
    }
    const { email } = parsed.data;
    if (store.findByEmail(email)) {
        return res.status(409).json({ error: "Email already exists" });
    }
    const created = store.create(parsed.data);
    res.status(201).json(created);
}

// GET /contacts/:id
export function getContact(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ error: "Invalid id" });
    const c = store.findById(id);
    if (!c) return res.status(404).json({ error: "Not found" });
    res.json(c);
}

// PUT /contacts/:id
export function updateContact(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ error: "Invalid id" });

    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: "Invalid body", details: parsed.error.flatten() });
    }

    // Unicité email (si autre contact utilise déjà ce mail)
    const existing = store.findByEmail(parsed.data.email);
    if (existing && existing.id !== id) {
        return res.status(409).json({ error: "Email already exists" });
    }

    const updated = store.update(id, parsed.data);
    if (!updated) return res.status(404).json({ error: "Not found" });

    res.json(updated);
}

// DELETE /contacts/:id
export function deleteContact(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ error: "Invalid id" });
    const ok = store.delete(id);
    if (!ok) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
}
