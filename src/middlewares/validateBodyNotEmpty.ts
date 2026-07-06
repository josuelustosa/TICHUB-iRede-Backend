import type { Request, Response, NextFunction } from "express";

/**
 * Middleware de validação para Body vazio
 * Garante que a requisição tenha um body com dados
 * Retorna 400 (Bad Request) se body vazio
 */
export function validateBodyNotEmpty(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).json({
      error: "Corpo da requisição obrigatório. O body não pode estar vazio.",
    });
    return;
  }
  next();
}
