import { Router } from "express";
import {
  listProducts,
  createProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { validateData } from "../middlewares/validateData.js";
import {
  productParamsSchema,
  productQuerySchema,
  createProductSchema,
} from "../schemas/product.schema.js";

const router = Router();

/**
 * GET /products
 * Lista produtos com filtro opcional por categoria
 * Exemplo: GET /products?category=550e8400-e29b-41d4-a716-446655440001
 */
router.get("/", validateData(productQuerySchema, "query"), listProducts);

/**
 * POST /products
 * Cria um novo produto
 * Body: { name: string, price: number, categoryId: string }
 */
router.post("/", validateData(createProductSchema, "body"), createProduct);

/**
 * DELETE /products/:id
 * Remove um produto por ID
 */
router.delete(
  "/:id",
  validateData(productParamsSchema, "params"),
  deleteProduct,
);

export default router;
