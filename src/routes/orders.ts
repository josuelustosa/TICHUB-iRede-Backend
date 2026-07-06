import { Router } from "express";
import type { Request, Response } from "express";
import { orders, generateOrderId } from "../mocks/orders.js";
import { validatePositiveId } from "../middlewares/validatePositiveId.js";
import { validateBodyNotEmpty } from "../middlewares/validateBodyNotEmpty.js";
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
    status: "pendente",
  };

  orders.push(newOrder);

  res.status(201).json(newOrder);
});

/**
 * PATCH /orders/:id
 * Atualizar o status de um pedido
 * Body: { status: string }
 */
router.patch(
  "/:id",
  validatePositiveId,
  validateBodyNotEmpty,
  (req: Request, res: Response): void => {
    const { id } = req.params;
    const { status } = req.body;
    const orderId = parseInt(id, 10);

    if (!status) {
      res.status(400).json({
        error: "Campo 'status' obrigatório no body.",
      });
      return;
    }

    const order = orders.find((o) => o.id === orderId);

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
    const orderId = parseInt(id, 10);

    const orderIndex = orders.findIndex((o) => o.id === orderId);

    if (orderIndex !== -1) {
      orders.splice(orderIndex, 1);
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
