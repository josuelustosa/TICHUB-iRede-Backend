import type { Request, Response } from "express";
import { CATEGORIES, generateCategoryId } from "../mocks/categories.js";
import type { Category } from "../types/index.js";

/**
 * GET /category
 * Lista categorias com paginação
 * Query validada pelo middleware: ?page=1&size=10
 */
export function listCategories(req: Request, res: Response): void {
  // query já foi validada pelo middleware validateData
  const { page, size } = req.query as any;
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
 * Params validados pelo middleware: validateData
 */
export function getCategoryById(req: Request, res: Response): void {
  const { id } = req.params as any;
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
 * Body validado pelo middleware: validateData
 */
export function createCategory(req: Request, res: Response): void {
  const { name } = req.body as any;
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
 * Params e Body validados pelo middleware: validateData
 */
export function updateCategory(req: Request, res: Response): void {
  const { id } = req.params as any;
  const { name } = req.body as any;

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
 * Params validados pelo middleware: validateData
 */
export function deleteCategory(req: Request, res: Response): void {
  const { id } = req.params as any;
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
