# Contexto de IA — Atividade 07: Estruturação, Controladores e Validação com Zod

## Objetivo do Projeto

Implementar uma **arquitetura de 3 camadas** (routers → controllers → schemas) aplicando validação centralizada com **Zod**, eliminando duplicação de código e deixando controllers focados em lógica de negócio. Também praticar middlewares genéricos reutilizáveis para validação.

## Stack Técnica

- **Runtime:** Node.js v24.14.1 (ESM — `"type": "module"` no `package.json`)
- **Framework:** Express v5
- **Linguagem:** TypeScript 6.0.3 (compilado via `tsc`, executado em desenvolvimento via `tsx watch`)
- **Validação:** Zod v4 (`.safeParse()` para validação segura com tipos inferred)
- **UUIDs:** `crypto.randomUUID()` nativo do Node.js
- **Tipos:** `@types/express`, `@types/node`
- **Módulos:** `nodenext` (imports relativos exigem extensão `.js`, mesmo em arquivos `.ts`)

## Scripts (`package.json`)

- `npm run dev`: inicia o servidor em modo desenvolvimento com `tsx watch src/main.ts`
- `npm run build`: compila TypeScript para `dist/` (`rootDir: ./src`, `outDir: ./dist`)
- `npm run start`: executa o build compilado (`node dist/main.js`)

## Estrutura de Pastas

```
src/
├── main.ts                          # Entry point: registra middlewares globais e routers
├── middlewares/
│   ├── logger.ts                    # Loga [DATA] MÉTODO /URL de cada requisição
│   ├── validateBodyNotEmpty.ts      # (herdado) Valida se req.body não está vazio
│   ├── validatePositiveId.ts        # (herdado) Valida req.params.id como número positivo
│   └── validateData.ts              # ✨ Middleware genérico de validação Zod
├── routes/
│   ├── category.router.ts           # ✨ Router de /category (CRUD completo)
│   ├── products.router.ts           # Refatorado: 3 handlers com controllers e schemas
│   └── orders.ts                    # (herdado) Router de /orders
├── controllers/
│   ├── category.controller.ts       # ✨ 5 handlers de Category (GET, GET/:id, POST, PUT/:id, DELETE/:id)
│   └── product.controller.ts        # ✨ 3 handlers de Product (GET, POST, DELETE/:id)
├── schemas/
│   ├── category.schema.ts           # ✨ 4 schemas Zod: params, query, create, update
│   └── product.schema.ts            # ✨ 3 schemas Zod: params, query, create
├── mocks/
│   ├── categories.ts                # ✨ Dados mock com UUIDs e função `generateCategoryId()`
│   ├── products.ts                  # Refatorado: IDs em string (UUID), referencia CATEGORIES
│   └── orders.ts                    # (herdado) Dados mock de pedidos
└── types/
    └── index.ts                     # ✨ Migrado: IDs de `number` para `string` (UUID)
```

## Tipos Compartilhados (`src/types/index.ts`)

```typescript
interface Category {
  id: string; // ✨ Mudado de number para UUID string
  name: string;
}

interface Product {
  id: string; // ✨ Mudado de number para UUID string
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

**Mudanças principais:**

- IDs de Category e Product agora são `string` (UUID format)
- Facilita integração com bancos de dados reais (UUIDs padrão)
- OrderStatus permanece inalterado

## Schemas Zod (`src/schemas/`)

### Category Schema (`src/schemas/category.schema.ts`)

```typescript
export const categoryParamsSchema = z.object({
  id: z.string().uuid(),
});

export const categoryQueryPaginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  size: z.coerce.number().int().positive().max(100).default(10),
});

export const createCategorySchema = z.object({
  name: z.string().min(3, "Name deve ter no mínimo 3 caracteres"),
});

export const updateCategorySchema = z.object({
  name: z.string().min(3, "Name deve ter no mínimo 3 caracteres"),
});

// Types inferred do Zod
export type CategoryParams = z.infer<typeof categoryParamsSchema>;
export type CategoryPaginationQuery = z.infer<
  typeof categoryQueryPaginationSchema
>;
export type CreateCategoryData = z.infer<typeof createCategorySchema>;
export type UpdateCategoryData = z.infer<typeof updateCategorySchema>;
```

### Product Schema (`src/schemas/product.schema.ts`)

```typescript
export const productParamsSchema = z.object({
  id: z.string().uuid(),
});

export const productQuerySchema = z.object({
  category: z.string().uuid().optional(),
});

export const createProductSchema = z.object({
  name: z.string().min(3, "Name deve ter no mínimo 3 caracteres"),
  price: z.number().positive("Price deve ser positivo"),
  categoryId: z.string().uuid("CategoryId deve ser um UUID válido"),
});

// Types inferred
export type ProductParams = z.infer<typeof productParamsSchema>;
export type ProductQuery = z.infer<typeof productQuerySchema>;
export type CreateProductData = z.infer<typeof createProductSchema>;
```

## Controllers

### Category Controller (`src/controllers/category.controller.ts`)

| Handler           | Descrição                            | Validação                    | Resposta          |
| ----------------- | ------------------------------------ | ---------------------------- | ----------------- |
| `listCategories`  | Lista com paginação (`page`, `size`) | Query via middleware         | 200 + JSON        |
| `getCategoryById` | Busca por UUID                       | Params UUID via middleware   | 200 ou 404        |
| `createCategory`  | Cria nova categoria com UUID gerado  | Body (name) via middleware   | 201 + JSON        |
| `updateCategory`  | Atualiza nome da categoria           | Params + Body via middleware | 200 + JSON ou 404 |
| `deleteCategory`  | Remove categoria                     | Params UUID via middleware   | 204 ou 404        |

**Padrão de Controller Limpo:**

```typescript
export function createCategory(req: Request, res: Response): void {
  const { name } = req.body; // ✨ Já validado pelo middleware
  const newCategory: Category = {
    id: generateCategoryId(),
    name,
  };
  CATEGORIES.push(newCategory);
  res.status(201).json(newCategory);
}
```

### Product Controller (`src/controllers/product.controller.ts`)

| Handler         | Descrição                                 | Validação                   | Resposta   |
| --------------- | ----------------------------------------- | --------------------------- | ---------- |
| `listProducts`  | Lista com filtro opcional por `?category` | Query via middleware        | 200 + JSON |
| `createProduct` | Cria novo produto (valida categoria)      | Body via middleware + check | 201 ou 404 |
| `deleteProduct` | Remove produto                            | Params UUID via middleware  | 204 ou 404 |

**Lógica Especial:**

- `createProduct` valida existência da categoria após middleware (404 se não encontrada)

## Middleware Genérico (`src/middlewares/validateData.ts`)

```typescript
type DataSource = "body" | "query" | "params";

export function validateData(schema: ZodSchema, source: DataSource) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const dataToValidate = req[source];
    const result = schema.safeParse(dataToValidate);

    if (!result.success) {
      res.status(400).json({
        error: `Validação de ${source} falhou`,
        details: result.error.flatten(),
      });
      return;
    }

    // Atualiza req[source] com dados validados (preserva getters do Express)
    Object.assign(req[source], result.data);
    next();
  };
}
```

**Uso em Rotas:**

```typescript
// Validação simples
router.get(
  "/",
  validateData(categoryQueryPaginationSchema, "query"),
  listCategories,
);

// Validação dupla (params + body)
router.put(
  "/:id",
  validateData(categoryParamsSchema, "params"),
  validateData(updateCategorySchema, "body"),
  updateCategory,
);
```

## Endpoints Implementados

### Categorias (`/category`) — CRUD completo ✨

| Método | Rota            | Descrição                  | Validações                    | Status          |
| ------ | --------------- | -------------------------- | ----------------------------- | --------------- |
| GET    | `/category`     | Lista com paginação        | `page`, `size` via query      | 200             |
| GET    | `/category/:id` | Busca por UUID             | UUID válido via params        | 200 ou 404      |
| POST   | `/category`     | Cria nova categoria        | `name` (min 3) via body       | 201 ou 400      |
| PUT    | `/category/:id` | Atualiza nome da categoria | UUID + `name` via params/body | 200, 404 ou 400 |
| DELETE | `/category/:id` | Remove categoria           | UUID via params               | 204 ou 404      |

### Produtos (`/products`) — refatorado com nova arquitetura ✨

| Método | Rota            | Descrição                        | Validações                             | Status          |
| ------ | --------------- | -------------------------------- | -------------------------------------- | --------------- |
| GET    | `/products`     | Lista com filtro por `?category` | UUID de categoria (opcional) via query | 200             |
| POST   | `/products`     | Cria novo produto                | `name`, `price`, `categoryId` via body | 201, 400 ou 404 |
| DELETE | `/products/:id` | Remove produto                   | UUID via params                        | 204 ou 404      |

### Pedidos (`/orders`) — herdado da Atividade 06

| Método | Rota          | Descrição       | Validações | Status          |
| ------ | ------------- | --------------- | ---------- | --------------- |
| POST   | `/orders`     | Cria pedido     | Body       | 201 ou 400      |
| PATCH  | `/orders/:id` | Atualiza status | ID, Body   | 200, 400 ou 404 |
| DELETE | `/orders/:id` | Remove pedido   | ID         | 204 ou 404      |

## Convenções de Código Adotadas

- **Dados mock:** nomeados em `UPPER_CASE` (`CATEGORIES`, `PRODUCTS`, `ORDERS`)
- **Imports:** `import type { ... }` para tipos; `import { ... }` para valores
- **Extensões:** todas as importações relativas usam `.js` (obrigatoriedade ESM + `nodenext`)
- **Mensagens:** em português, formato `{ error: string, details: ZodError }`
- **HTTP Status:**
  - `200` — GET/PUT/PATCH com sucesso
  - `201` — POST com sucesso
  - `204` — DELETE com sucesso (sem body)
  - `400` — validação falhou
  - `404` — recurso não encontrado
- **Handlers:** sempre tipados como `(req: Request, res: Response): void`
