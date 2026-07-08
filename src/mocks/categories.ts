import type { Category } from "../types/index.js";

export const CATEGORIES: Category[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "Eletrônicos",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "Móveis",
  },
];

export function generateCategoryId(): string {
  return crypto.randomUUID();
}
