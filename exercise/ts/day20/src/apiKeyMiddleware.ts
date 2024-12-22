import { NextFunction, Request, Response } from "express";

export const apiKeyMiddleware =
  (validApiKey: string) =>
  (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers["x-api-key"];

    if (apiKey && apiKey === validApiKey) {
      next();
    } else {
      res.status(403).send("Forbidden: Invalid API Key");
    }
  };
