import express from "express";
import contactsRoutes from "./routes/contacts.routes";
import { jsonSyntaxError } from "./middleware/jsonError";
import { logger } from "./utils/logger";

export const createApp = () => {
    const app = express();

    app.use(express.json());
    app.use(jsonSyntaxError);

    app.use((req, _res, next) => {
        logger.info({ method: req.method, url: req.url }, "incoming request");
        next();
    });

    app.get("/", (_req, res) => {
        logger.debug("Root route accessed");
        res.json({ ok: true, service: "tp-node-express", domain: "contacts" });
    });

    app.use("/contacts", contactsRoutes);

    app.use((_req, res) => {
        res.status(404).json({ error: "Not Found" });
    });

    return app;
};
