import { NextFunction, Request, Response } from "express";

export function jsonSyntaxError(
    err: any,
    _req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof SyntaxError && "body" in err) {
        return res.status(400).json({ error: "Invalid JSON" });
    }
    next(err);
}
