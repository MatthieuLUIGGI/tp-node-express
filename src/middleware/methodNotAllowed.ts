import { Request, Response } from "express";
export function methodNotAllowed(_req: Request, res: Response) {
    res.status(405).json({ error: "Method Not Allowed" });
}
