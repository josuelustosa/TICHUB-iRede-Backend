import type { Product, Category } from "../types/index.js";

export const CATEGORIES: Category[] = [
  { id: 1, name: "eletronicos" },
  { id: 2, name: "moveis" },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Notebook",
    category: CATEGORIES[0] as Category,
    price: 2500.0,
  },
  { id: 2, name: "Mouse", category: CATEGORIES[0] as Category, price: 50.0 },
  { id: 3, name: "Teclado", category: CATEGORIES[0] as Category, price: 150.0 },
  { id: 4, name: "Monitor", category: CATEGORIES[0] as Category, price: 800.0 },
  {
    id: 5,
    name: "Cadeira Gamer",
    category: CATEGORIES[1] as Category,
    price: 1200.0,
  },
  { id: 6, name: "Mesa", category: CATEGORIES[1] as Category, price: 600.0 },
];
