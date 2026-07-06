import type { Request, Response, NextFunction } from "express";

/**
 * Middleware de validação para IDs positivos
 * Garante que o parâmetro :id seja um número positivo
 * Retorna 400 (Bad Request) se inválido
 */
export function validatePositiveId(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { id } = req.params;
  const numId = parseInt(id, 10);

  if (numId < 0) {
    res.status(400).json({
      error: "ID inválido. O ID deve ser um número positivo.",
      receivedId: numId,
    });
    return;
  }
  next();
}
