import * as express from "express";

export function delayMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  setTimeout(next, process.env.REQUEST_DELAY ? Number(process.env.REQUEST_DELAY) : 0);
}
