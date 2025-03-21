import type { Request, Response, NextFunction } from "express";

export const notFound = (_req: Request, res: Response) =>
  res.status(404).render("404", { title: "404 Not Found" });

//export default notFound;
