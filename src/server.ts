import { createApp } from "./app";
import { logger } from "./utils/logger";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const app = createApp();

app.listen(PORT, () => {
    logger.info(`[tp-node-express] Listening on http://localhost:${PORT}`);
});
