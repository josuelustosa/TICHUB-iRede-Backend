import { z } from "zod";

/**
 * Schema de validação para parâmetros de produto (:id)
 * Valida que o ID é um UUID válido
 */
export const productParamsSchema = z.object({
  id: z.string().uuid(),
});

/**
 * Schema de validação para query string de filtro
 * - category: UUID de categoria (opcional) para filtrar produtos
 */
export const productQuerySchema = z.object({
  category: z.string().uuid().optional(),
});

/**
 * Schema de validação para criação de produto
 * - name: string com mínimo de 3 caracteres
 * - price: número positivo
 * - categoryId: UUID válido de uma categoria existente
 */
export const createProductSchema = z.object({
  name: z
    .string("Name deve ser uma string")
    .min(3, "Name deve ter no mínimo 3 caracteres"),
  price: z
    .number("Price deve ser um número")
    .positive("Price deve ser positivo"),
  categoryId: z.string("CategoryId deve ser uma string").uuid(),
});

/**
 * Tipos inferidos dos schemas para uso nos controllers
 */
export type ProductParams = z.infer<typeof productParamsSchema>;
export type ProductQuery = z.infer<typeof productQuerySchema>;
export type CreateProductData = z.infer<typeof createProductSchema>;
