import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";

type DataSource = "body" | "query" | "params";

/**
 * Middleware genérico de validação com Zod
 *
 * @param schema - Schema Zod para validar os dados
 * @param source - De qual parte extrair dados: 'body', 'query' ou 'params'
 * @returns Middleware que valida e passa para o handler ou retorna 400
 *
 * @example
 * // Validar body de criação de categoria
 * router.post("/", validateData(createCategorySchema, "body"), createCategory);
 *
 * // Validar parâmetros de ID
 * router.delete("/:id", validateData(categoryParamsSchema, "params"), deleteCategory);
 *
 * // Validar query string de paginação
 * router.get("/", validateData(categoryQueryPaginationSchema, "query"), listCategories);
 */
export function validateData(schema: ZodSchema, source: DataSource) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const dataToValidate = req[source];
    const result = schema.safeParse(dataToValidate);

    if (!result.success) {
      res.status(400).json({
        error: `Validação de ${source} falhou`,
        details: result.error.flatten(),
      });
      return;
    }

    Object.assign(req[source], result.data);

    next();
  };
}
