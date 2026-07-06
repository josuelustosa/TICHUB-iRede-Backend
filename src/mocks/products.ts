import type { Product, Category } from "../types/index.js";
import { CATEGORIES } from "./categories.js";

export const PRODUCTS: Product[] = [
  {
    id: "660e8400-e29b-41d4-a716-446655440001",
    name: "Notebook",
    category: CATEGORIES[0] as Category,
    price: 2500.0,
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440002",
    name: "Mouse",
    category: CATEGORIES[0] as Category,
    price: 50.0,
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440003",
    name: "Teclado",
    category: CATEGORIES[0] as Category,
    price: 150.0,
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440004",
    name: "Monitor",
    category: CATEGORIES[0] as Category,
    price: 800.0,
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440005",
    name: "Cadeira Gamer",
    category: CATEGORIES[1] as Category,
    price: 1200.0,
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440006",
    name: "Mesa",
    category: CATEGORIES[1] as Category,
    price: 600.0,
  },
];
