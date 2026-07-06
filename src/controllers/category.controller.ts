import type { Request, Response } from "express";
import { CATEGORIES, generateCategoryId } from "../mocks/categories.js";
import type { Category } from "../types/index.js";
import {
  categoryParamsSchema,
  categoryQueryPaginationSchema,
  createCategorySchema,
  updateCategorySchema,
} from "../schemas/category.schema.js";

/**
 * GET /category
 * Lista categorias com paginação
 * Query: ?page=1&size=10
 */
export function listCategories(req: Request, res: Response): void {
  const result = categoryQueryPaginationSchema.safeParse(req.query);

  if (!result.success) {
    res.status(400).json({
      error: "Parâmetros de paginação inválidos",
      details: result.error.flatten(),
    });
    return;
  }

  const { page, size } = result.data;
  const start = (page - 1) * size;
  const end = start + size;
  const data = CATEGORIES.slice(start, end);

  res.status(200).json({
    data,
    page,
    size,
    total: CATEGORIES.length,
  });
}

/**
 * GET /category/:id
 * Busca uma categoria por ID (UUID)
 */
export function getCategoryById(req: Request, res: Response): void {
  const result = categoryParamsSchema.safeParse(req.params);

  if (!result.success) {
    res.status(400).json({
      error: "ID inválido",
      details: result.error.flatten(),
    });
    return;
  }

  const { id } = result.data;
  const category = CATEGORIES.find((c) => c.id === id);

  if (!category) {
    res.status(404).json({
      error: "Categoria não encontrada",
      searchedId: id,
    });
    return;
  }

  res.status(200).json(category);
}

/**
 * POST /category
 * Cria uma nova categoria
 */
export function createCategory(req: Request, res: Response): void {
  const result = createCategorySchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      error: "Dados de categoria inválidos",
      details: result.error.flatten(),
    });
    return;
  }

  const { name } = result.data;
  const newCategory: Category = {
    id: generateCategoryId(),
    name,
  };

  CATEGORIES.push(newCategory);

  res.status(201).json(newCategory);
}

/**
 * PUT /category/:id
 * Atualiza uma categoria completa
 */
export function updateCategory(req: Request, res: Response): void {
  const paramsResult = categoryParamsSchema.safeParse(req.params);

  if (!paramsResult.success) {
    res.status(400).json({
      error: "ID inválido",
      details: paramsResult.error.flatten(),
    });
    return;
  }

  const bodyResult = updateCategorySchema.safeParse(req.body);

  if (!bodyResult.success) {
    res.status(400).json({
      error: "Dados de categoria inválidos",
      details: bodyResult.error.flatten(),
    });
    return;
  }

  const { id } = paramsResult.data;
  const { name } = bodyResult.data;

  const category = CATEGORIES.find((c) => c.id === id);

  if (!category) {
    res.status(404).json({
      error: "Categoria não encontrada",
      searchedId: id,
    });
    return;
  }

  category.name = name;

  res.status(200).json(category);
}

/**
 * DELETE /category/:id
 * Remove uma categoria
 */
export function deleteCategory(req: Request, res: Response): void {
  const result = categoryParamsSchema.safeParse(req.params);

  if (!result.success) {
    res.status(400).json({
      error: "ID inválido",
      details: result.error.flatten(),
    });
    return;
  }

  const { id } = result.data;
  const index = CATEGORIES.findIndex((c) => c.id === id);

  if (index === -1) {
    res.status(404).json({
      error: "Categoria não encontrada",
      searchedId: id,
    });
    return;
  }

  CATEGORIES.splice(index, 1);

  res.status(204).send();
}
