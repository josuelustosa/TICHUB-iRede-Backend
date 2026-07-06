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
  // Obter data e hora atual
  const now = new Date();
  const dateTimeString = now.toLocaleString("pt-BR");

  // Exibir log: [DATA] MÉTODO /URL
  console.log(`[${dateTimeString}] ${req.method} ${req.originalUrl}`);

  // Passar para o próximo middleware/rota
  next();
}
