import express from "express";
import type { Request, Response } from "express";
import productsRouter from "./routes/products.js";
import ordersRouter from "./routes/orders.js";
import { loggerMiddleware } from "./middlewares/logger.js";

const app = express();
const port = 3000;

// Middleware para parsing JSON
app.use(express.json());

// Middleware de logging
app.use(loggerMiddleware);

// Rota raiz
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world! Here is an Express API running...");
});

// Registro dos routers
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);

// Inicializar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
