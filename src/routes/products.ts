import { Router } from "express";
import type { Request, Response } from "express";
import { PRODUCTS } from "../mocks/products.js";
import { validatePositiveId } from "../middlewares/validatePositiveId.js";

const router = Router();

/**
 * GET /products
 * Listagem de produtos com filtro opcional por categoria via query string
 * Exemplo: GET /products?category=eletronicos
 */
router.get("/", (req: Request, res: Response): void => {
  const { category } = req.query;

  if (category) {
    const filtered = PRODUCTS.filter(
      (product) => product.category.name === category,
    );
    res.status(200).json(filtered);
  } else {
    res.status(200).json(PRODUCTS);
  }
});

/**
 * GET /products/:id
 * Consulta específica de um produto por ID
 * Middleware de validação garante que ID seja positivo
 */
router.get("/:id", validatePositiveId, (req: Request, res: Response): void => {
  const { id } = req.params;
  const productId = parseInt(id as string, 10);

  const product = PRODUCTS.find((p) => p.id === productId);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({
      error: "Produto não encontrado.",
      searchedId: productId,
    });
  }
});

export default router;
