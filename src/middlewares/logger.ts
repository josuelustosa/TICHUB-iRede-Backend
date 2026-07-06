import type { Request, Response, NextFunction } from "express";

/**
 * Middleware de logging que exibe no terminal: [DATA] MÉTODO /URL
 * Executado para cada requisição antes de chegar nas rotas
 */
export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const now = new Date();
  const dateTimeString = now.toLocaleString("pt-BR");

  console.log(`[${dateTimeString}] ${req.method} ${req.originalUrl}`);

  next();
}
