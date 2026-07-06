import { Router } from "express";
import {
  listCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const router = Router();

/**
 * GET /category
 * Lista categorias com paginação
 * Exemplo: GET /category?page=1&size=10
 */

router.get("/", listCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
