// Tipos compartilhados da aplicação

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

export interface Order {
  id: number;
  clientName: string;
  productIds: number[];
  status: string;
}
