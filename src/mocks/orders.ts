import { OrderStatus } from "../types/index.js";
import type { Order } from "../types/index.js";

export let ORDERS: Order[] = [
  {
    id: 1,
    clientName: "João Silva",
    productIds: [1, 2, 3],
    status: OrderStatus.PENDENTE,
  },
  {
    id: 2,
    clientName: "Maria Santos",
    productIds: [4, 5],
    status: OrderStatus.PAGO,
  },
  {
    id: 3,
    clientName: "Pedro Costa",
    productIds: [2],
    status: OrderStatus.CANCELADO,
  },
];

/**
 * Gera um novo ID para pedidos
 */
export function generateOrderId(): number {
  return ORDERS.length > 0 ? Math.max(...ORDERS.map((o) => o.id)) + 1 : 1;
}
