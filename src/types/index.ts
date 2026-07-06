// Tipos compartilhados da aplicação

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
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
