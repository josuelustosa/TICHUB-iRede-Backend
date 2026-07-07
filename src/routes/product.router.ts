import { Router } from "express";
import {
  listProducts,
  createProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = Router();

/**
 * GET /products
 * Lista produtos com filtro opcional por categoria
 * Exemplo: GET /products?category=550e8400-e29b-41d4-a716-446655440001
 */

router.get("/", listProducts);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);

export default router;
