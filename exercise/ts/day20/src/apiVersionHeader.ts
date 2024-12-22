import { NextFunction, Request, Response } from "express";

const apiVersionHeaderKey = "x-api-version";
export const apiVersionHeaderMiddleware =
  (version: string) => (req: Request, res: Response, next: NextFunction) => {
    res.setHeader(apiVersionHeaderKey, version);
    next();
  };
