import type { Order } from "../types/index.js";

export let orders: Order[] = [
  {
    id: 1,
    clientName: "João Silva",
    productIds: [1, 2, 3],
    status: "pendente",
  },
  {
    id: 2,
    clientName: "Maria Santos",
    productIds: [4, 5],
    status: "pago",
  },
  {
    id: 3,
    clientName: "Pedro Costa",
    productIds: [2],
    status: "cancelado",
  },
];

/**
 * Gera um novo ID para pedidos
 */
export function generateOrderId(): number {
  return orders.length > 0 ? Math.max(...orders.map((o) => o.id)) + 1 : 1;
}
