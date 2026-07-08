import { Router } from "express";
import {
  listCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { validateData } from "../middlewares/validateData.js";
import {
  categoryParamsSchema,
  categoryQueryPaginationSchema,
  createCategorySchema,
  updateCategorySchema,
} from "../schemas/category.schema.js";

const router = Router();

/**
 * GET /category
 * Lista categorias com paginação
 * Exemplo: GET /category?page=1&size=10
 */
router.get(
  "/",
  validateData(categoryQueryPaginationSchema, "query"),
  listCategories,
);

/**
 * GET /category/:id
 * Busca uma categoria por ID
 */
router.get(
  "/:id",
  validateData(categoryParamsSchema, "params"),
  getCategoryById,
);

/**
 * POST /category
 * Cria uma nova categoria
 * Body: { name: string }
 */
router.post("/", validateData(createCategorySchema, "body"), createCategory);

/**
 * PUT /category/:id
 * Atualiza uma categoria completa
 * Body: { name: string }
 */
router.put(
  "/:id",
  validateData(categoryParamsSchema, "params"),
  validateData(updateCategorySchema, "body"),
  updateCategory,
);

/**
 * DELETE /category/:id
 * Remove uma categoria
 */
router.delete(
  "/:id",
  validateData(categoryParamsSchema, "params"),
  deleteCategory,
);

export default router;
