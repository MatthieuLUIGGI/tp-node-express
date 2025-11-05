import express from "express";
import contactsRoutes from "./routes/contacts.routes";
import { jsonSyntaxError } from "./middleware/jsonError";

export const createApp = () => {
    const app = express();

    app.use(express.json());
    app.use(jsonSyntaxError); // 400 en cas de JSON invalide

    app.get("/", (_req, res) => {
        res.json({ ok: true, service: "tp-node-express", domain: "contacts" });
    });

    app.use("/contacts", contactsRoutes);

    app.use((_req, res) => {
        res.status(404).json({ error: "Not Found" });
    });

    return app;
};
