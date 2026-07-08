import type { Request, Response } from "express";
import { PRODUCTS } from "../mocks/products.js";
import { CATEGORIES } from "../mocks/categories.js";
import type { Product } from "../types/index.js";

/**
 * GET /products
 * Lista produtos com filtro opcional por categoria
 * Query validada pelo middleware: ?category=<categoryId>
 */
export function listProducts(req: Request, res: Response): void {
  const { category } = req.query as any;
  let data = PRODUCTS;

  if (category) {
    data = PRODUCTS.filter((product) => product.category.id === category);
  }

  res.status(200).json(data);
}

/**
 * POST /products
 * Cria um novo produto
 * Body validado pelo middleware: { name, price, categoryId }
 */
export function createProduct(req: Request, res: Response): void {
  const { name, price, categoryId } = req.body as any;

  const category = CATEGORIES.find((c) => c.id === categoryId);
  if (!category) {
    res.status(404).json({
      error: "Categoria não encontrada",
      searchedId: categoryId,
    });
    return;
  }

  const newProduct: Product = {
    id: crypto.randomUUID(),
    name,
    price,
    category,
  };

  PRODUCTS.push(newProduct);

  res.status(201).json(newProduct);
}

/**
 * DELETE /products/:id
 * Remove um produto
 * Params validados pelo middleware
 */
export function deleteProduct(req: Request, res: Response): void {
  const { id } = req.params as any;
  const index = PRODUCTS.findIndex((p) => p.id === id);

  if (index === -1) {
    res.status(404).json({
      error: "Produto não encontrado",
      searchedId: id,
    });
    return;
  }

  PRODUCTS.splice(index, 1);

  res.status(204).send();
}
