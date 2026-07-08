import { z } from "zod";

/**
 * Schema de validação para parâmetros de categoria (:id)
 * Valida que o ID é um UUID válido
 */
export const categoryParamsSchema = z.object({
  id: z.string().uuid(),
});

/**
 * Schema de validação para query string de paginação
 * - page: número inteiro positivo, padrão 1
 * - size: número inteiro positivo de 1 a 100, padrão 10
 */
export const categoryQueryPaginationSchema = z.object({
  page: z.coerce
    .number()
    .int("Page deve ser um número inteiro")
    .positive("Page deve ser positivo")
    .default(1),
  size: z.coerce
    .number()
    .int("Size deve ser um número inteiro")
    .positive("Size deve ser positivo")
    .max(100, "Size máximo é 100")
    .default(10),
});

/**
 * Schema de validação para criação de categoria
 * - name: string com mínimo de 3 caracteres
 */
export const createCategorySchema = z.object({
  name: z
    .string("Name deve ser uma string")
    .min(3, "Name deve ter no mínimo 3 caracteres"),
});

/**
 * Schema de validação para atualização de categoria
 * Mesmo do create (todos os campos obrigatórios para PUT)
 */
export const updateCategorySchema = z.object({
  name: z
    .string("Name deve ser uma string")
    .min(3, "Name deve ter no mínimo 3 caracteres"),
});

/**
 * Tipos inferidos dos schemas para uso nos controllers
 */
export type CategoryParams = z.infer<typeof categoryParamsSchema>;
export type CategoryPaginationQuery = z.infer<
  typeof categoryQueryPaginationSchema
>;
export type CreateCategoryData = z.infer<typeof createCategorySchema>;
export type UpdateCategoryData = z.infer<typeof updateCategorySchema>;
