export interface Category {
  id: string; // UUID
  name: string;
}

export interface Product {
  id: string; // UUID
  name: string;
  category: Category;
  price: number;
}

export enum OrderStatus {
  PENDENTE = "pendente",
  PAGO = "pago",
  CANCELADO = "cancelado",
}

export interface Order {
  id: number;
  clientName: string;
  productIds: number[];
  status: OrderStatus;
}
