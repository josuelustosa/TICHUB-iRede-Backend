# Contexto de IA — Atividade 06: Roteamento REST com Express e TypeScript

## Objetivo do Projeto

API REST implementada com Express e TypeScript, praticando semântica REST, captura de dados via Query String, Route Params e Body, além do uso de middlewares customizados.

## Stack Técnica

- **Runtime:** Node.js (ESM — `"type": "module"` no `package.json`)
- **Framework:** Express v5
- **Linguagem:** TypeScript (compilado via `tsc`, executado em desenvolvimento via `tsx watch`)
- **Tipos:** `@types/express`, `@types/node`
- **Módulos:** `nodenext` (imports relativos exigem extensão `.js`, mesmo em arquivos `.ts`)

## Scripts (`package.json`)

- `npm run dev`: inicia o servidor em modo desenvolvimento com `tsx watch src/main.ts`
- `npm run build`: compila TypeScript para `dist/` (`rootDir: ./src`, `outDir: ./dist`)
- `npm run start`: executa o build compilado (`node dist/main.js`)

**Atenção:** nunca alterar `rootDir`/`outDir` do `tsconfig.json` de volta para comentado — isso fazia o `tsc` gerar `.js`/`.d.ts`/`.map` dentro de `src/`, poluindo o código-fonte. Esses artefatos já foram removidos e `dist/` está no `.gitignore`.

## Estrutura de Pastas

```
src/
├── main.ts                          # Entry point: registra middlewares e routers
├── middlewares/
│   ├── logger.ts                    # Loga [DATA] MÉTODO /URL de cada requisição
│   ├── validatePositiveId.ts        # Valida req.params.id como número positivo (400 se inválido)
│   └── validateBodyNotEmpty.ts      # Valida se req.body não está vazio (400 se vazio)
├── routes/
│   ├── products.ts                  # Router de /products (somente leitura)
│   └── orders.ts                    # Router de /orders (criação, atualização, remoção)
├── mocks/
│   ├── products.ts                  # Dados mock: CATEGORIES e PRODUCTS
│   └── orders.ts                    # Dados mock: ORDERS + generateOrderId()
└── types/
    └── index.ts                     # Interfaces e enum compartilhados
```

## Tipos Compartilhados (`src/types/index.ts`)

```typescript
interface Category {
  id: number;
  name: string;
}
interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
}
enum OrderStatus {
  PENDENTE = "pendente",
  PAGO = "pago",
  CANCELADO = "cancelado",
}
interface Order {
  id: number;
  clientName: string;
  productIds: number[];
  status: OrderStatus;
}
```

- `Product.category` é um objeto `Category` (não string solta).
- `Order.status` é restrito ao enum `OrderStatus` (sem união com `string`), forçando validação explícita no PATCH.

## Endpoints Implementados

### Produtos (`/products`) — somente leitura

| Método | Rota            | Descrição                                                                            | Validações                                                    |
| ------ | --------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| GET    | `/products`     | Lista produtos. Filtra por `?category=<nome>` comparando com `product.category.name` | —                                                             |
| GET    | `/products/:id` | Busca produto por ID                                                                 | `validatePositiveId` (400 se negativo); 404 se não encontrado |

### Pedidos (`/orders`) — criação, atualização e remoção

| Método | Rota          | Descrição                                                                                          | Validações                                                                                                                                                                               |
| ------ | ------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/orders`     | Cria pedido com `clientName` e `productIds` (array). Status inicial fixo em `OrderStatus.PENDENTE` | `validateBodyNotEmpty` (400 se vazio); 400 se `clientName`/`productIds` ausentes; 400 se `productIds` não for array não vazio; retorna 201                                               |
| PATCH  | `/orders/:id` | Atualiza `status` do pedido                                                                        | `validatePositiveId`; `validateBodyNotEmpty`; 400 se `status` ausente; 400 se `status` não pertencer a `Object.values(OrderStatus)` (retorna `allowedValues`); 404 se pedido não existir |
| DELETE | `/orders/:id` | Remove pedido do array `ORDERS`                                                                    | `validatePositiveId`; 204 se sucesso; 404 se não encontrado                                                                                                                              |

## Middlewares

1. **`loggerMiddleware`** — registrado globalmente em `main.ts` antes das rotas. Exibe `[DATA_PT_BR] MÉTODO /URL` no console para toda requisição.
2. **`validatePositiveId`** — reutilizado em `/products/:id`, `/orders/:id` (PATCH e DELETE). Faz `parseInt(req.params.id, 10)`; se resultado `< 0`, responde 400 com `{ error, receivedId }` e interrompe a cadeia (`return`, sem `next()`).
3. **`validateBodyNotEmpty`** — reutilizado em `POST /orders` e `PATCH /orders/:id`. Verifica `!req.body || Object.keys(req.body).length === 0`; se vazio, responde 400.

## Convenções de Código Adotadas

- Dados mock nomeados em `UPPER_CASE` (`PRODUCTS`, `CATEGORIES`, `ORDERS`) para diferenciá-los visualmente de variáveis locais.
- Importações de tipos usam `import type { ... } from "express"` (obrigatório com `verbatimModuleSyntax`/ESM); importações de valores usam `import { ... }`.
- Todas as importações relativas entre arquivos `.ts` usam extensão `.js` (exigência do `module: nodenext`).
- Mensagens de erro em português, no formato `{ error: string, ... }` com campos adicionais de contexto (`receivedId`, `searchedId`, `allowedValues`, `required`).
- Handlers de rota sempre tipados como `(req: Request, res: Response): void`.
