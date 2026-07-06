import { Router } from "express";
import type { Request, Response } from "express";
import { ORDERS, generateOrderId } from "../mocks/orders.js";
import { validatePositiveId } from "../middlewares/validatePositiveId.js";
import { validateBodyNotEmpty } from "../middlewares/validateBodyNotEmpty.js";
import { OrderStatus } from "../types/index.js";
import type { Order } from "../types/index.js";

const router = Router();

/**
 * POST /orders
 * Criar um novo pedido
 * Body obrigatório: { clientName: string, productIds: number[] }
 * Retorna: 201 (Created) com o objeto criado
 */
router.post("/", validateBodyNotEmpty, (req: Request, res: Response): void => {
  const { clientName, productIds } = req.body;

  if (!clientName || !productIds) {
    res.status(400).json({
      error: "Campos obrigatórios faltando.",
      required: ["clientName", "productIds"],
    });
    return;
  }

  if (!Array.isArray(productIds) || productIds.length === 0) {
    res.status(400).json({
      error: "productIds deve ser um array não vazio.",
    });
    return;
  }

  const newOrder: Order = {
    id: generateOrderId(),
    clientName,
    productIds,
    status: OrderStatus.PENDENTE,
  };

  ORDERS.push(newOrder);

  res.status(201).json(newOrder);
});

/**
 * PATCH /orders/:id
 * Atualizar o status de um pedido
 * Body: { status: OrderStatus }
 */
router.patch(
  "/:id",
  validatePositiveId,
  validateBodyNotEmpty,
  (req: Request, res: Response): void => {
    const { id } = req.params;
    const status: OrderStatus = req.body.status;
    const orderId = parseInt(id as string, 10);

    if (!status) {
      res.status(400).json({
        error: "Campo 'status' obrigatório no body.",
      });
      return;
    }

    if (!Object.values(OrderStatus).includes(status)) {
      res.status(400).json({
        error: "Status inválido.",
        allowedValues: Object.values(OrderStatus),
      });
      return;
    }

    const order = ORDERS.find((o) => o.id === orderId);

    if (order) {
      order.status = status;
      res.status(200).json(order);
    } else {
      res.status(404).json({
        error: "Pedido não encontrado.",
        searchedId: orderId,
      });
    }
  },
);

/**
 * DELETE /orders/:id
 * Cancelar um pedido (deletar)
 * Retorna: 204 (No Content)
 */
router.delete(
  "/:id",
  validatePositiveId,
  (req: Request, res: Response): void => {
    const { id } = req.params;
    const orderId = parseInt(id as string, 10);

    const orderIndex = ORDERS.findIndex((o) => o.id === orderId);

    if (orderIndex !== -1) {
      ORDERS.splice(orderIndex, 1);
      res.status(204).send();
    } else {
      res.status(404).json({
        error: "Pedido não encontrado.",
        searchedId: orderId,
      });
    }
  },
);

export default router;
