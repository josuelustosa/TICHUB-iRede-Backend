import { Router } from "express";
import type { Request, Response } from "express";
import { PRODUCTS } from "../mocks/products.js";
import { validatePositiveId } from "../middlewares/validatePositiveId.js";

const router = Router();

/**
 * GET /products
 * Listagem de produtos com filtro opcional por categoria via query string
 * Exemplo: GET /products?category=550e8400-e29b-41d4-a716-446655440001
 */
router.get("/", (req: Request, res: Response): void => {
  const { category } = req.query;

  if (category) {
    const filtered = PRODUCTS.filter(
      (product) => product.category.id === category,
    );
    res.status(200).json(filtered);
  } else {
    res.status(200).json(PRODUCTS);
  }
});

/**
 * GET /products/:id
 * Consulta específica de um produto por ID (UUID)
 */
router.get("/:id", (req: Request, res: Response): void => {
  const { id } = req.params;

  const product = PRODUCTS.find((p) => p.id === id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({
      error: "Produto não encontrado.",
      searchedId: id,
    });
  }
});

export default router;
