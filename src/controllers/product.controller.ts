import type { Request, Response } from "express";
import { PRODUCTS } from "../mocks/products.js";
import { CATEGORIES } from "../mocks/categories.js";
import type { Product } from "../types/index.js";
import {
  productParamsSchema,
  productQuerySchema,
  createProductSchema,
} from "../schemas/product.schema.js";

/**
 * GET /products
 * Lista produtos com filtro opcional por categoria
 * Query: ?category=<categoryId>
 */
export function listProducts(req: Request, res: Response): void {
  const result = productQuerySchema.safeParse(req.query);

  if (!result.success) {
    res.status(400).json({
      error: "Parâmetros de query inválidos",
      details: result.error.flatten(),
    });
    return;
  }

  const { category } = result.data;
  let data = PRODUCTS;

  if (category) {
    data = PRODUCTS.filter((product) => product.category.id === category);
  }

  res.status(200).json(data);
}

/**
 * POST /products
 * Cria um novo produto
 * Body: { name, price, categoryId }
 */
export function createProduct(req: Request, res: Response): void {
  const result = createProductSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      error: "Dados de produto inválidos",
      details: result.error.flatten(),
    });
    return;
  }

  const { name, price, categoryId } = result.data;

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
 */
export function deleteProduct(req: Request, res: Response): void {
  const result = productParamsSchema.safeParse(req.params);

  if (!result.success) {
    res.status(400).json({
      error: "ID inválido",
      details: result.error.flatten(),
    });
    return;
  }

  const { id } = result.data;
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
