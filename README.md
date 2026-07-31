# TIC Hub Programação Fullstack: Módulo Backend

Aqui você irá encontrar as atividades que desenvolvi durante o **Módulo Backend** do programa [TIC Hub 12: Programação Fullstack](https://tic-hub.irede.org.br/) (2026_1).

## 🎓 Conheça o Programa

A Residência em TIC 12 é um programa de capacitação profissional e tecnológica executado pela Universidade Estadual do Ceará (UECE), coordenado pela Softex, com parceria do Instituto iRede (iRede) e do Instituto Federal do Ceará (IFCE), e incentivo do Ministério da Ciência, Tecnologia e Inovação (MCTI).

> O programa oferece 7 trilhas tecnológicas, com destaque para a formação em Programação FullStack, que atraiu 508 candidatos para apenas 100 vagas iniciais.

## 📂 Organização das Atividades

| Atividade                                                    | Branch                |
| ------------------------------------------------------------ | --------------------- |
| Atividade 6: Roteamento REST com Express e TypeScript        | `atv-6/intro-backend` |
| Atividade 7: Estruturação, Controladores e Validação com Zod | `atv-7/controllers`   |
| Atividade 8: Normalização de Dados e Arquitetura de Software | `atv-8/banco-de-dados` |

## 💻 Sobre o Projeto

- Objetivo do Módulo: Desenvolver o backend de uma API REST.
- Tecnologias Utilizadas: Node.js, Express (v5), TypeScript e Zod (v4).

## ⚙️ Configuração do Projeto

1. Clone o repositório ou a Branch que desejar:

```sh
git clone https://github.com/josuelustosa/TICHUB-iRede-Backend.git
cd TICHUB-iRede-Backend
```

2. Instale as dependências

```sh
npm install
```

3. Execute o projeto em ambiente de desenvolvimento:

```sh
npm run dev
```

4. Acesse a API em:

```sh
http://localhost:3000
```

## 👀 Observações das Atividades

### Atividade 6: Roteamento REST

Implementação dos endpoints de **Produtos** (`/products`) e **Pedidos** (`/orders`), praticando semântica REST, Query String, Route Params, Body e middlewares customizados (logger e validações).

Mais detalhes em [docs/contexto-ia-atv_06.md](docs/contexto-ia-atv_06.md).

### Atividade 7: Estruturação, Controladores e Validação com Zod

Implementação de uma **arquitetura de 3 camadas** (routers → controllers → schemas) aplicando validação centralizada com **Zod**.

- **Schemas Centralizados:** criação de `src/schemas/` com validações Zod reutilizáveis
- **Controllers Limpos:** handlers focados em lógica de negócio, sem duplicação de validação
- **Middleware Genérico:** `validateData` para reutilização em qualquer rota (params, query, body)
- **UUIDs:** migração de IDs numéricos para UUID strings (padrão real de produção)
- **Entidade Category:** CRUD completo com 5 endpoints e paginação
- **Refatoração de Products:** aplicação do novo padrão com 3 handlers
- **Challenge Realizado:** middleware genérico elimina ~50+ linhas de código duplicado

Mais detalhes técnicos em [docs/contexto-ia-atv_07.md](docs/contexto-ia-atv_07.md).

### Atividade 8: Normalização de Dados e Arquitetura de Software

Aplicação prática das **Formas Normais (1FN, 2FN e 3FN)** por meio da análise de diferentes cenários de modelagem, identificando redundâncias, dependências funcionais e propondo estruturas de banco de dados normalizadas.

- **Diagnóstico da 1FN:** identificação de atributos multivalorados e aplicação da atomicidade
- **Diagnóstico da 3FN:** remoção de dependências transitivas no modelo de vendas
- **Normalização em Cadeia:** aplicação sequencial da 1FN, 2FN e 3FN em um sistema de restaurante
- **Diagnóstico da 2FN:** identificação de dependências parciais no sistema de biblioteca
- **Desafio Master:** modelagem completa de um sistema de clínica utilizando entidades, PKs e FKs em 3FN
- **Documentação Técnica:** diagramas desenvolvidos em DBML com representação visual no [dbdiagram.io](https://dbdiagram.io/home)

Mais detalhes em [docs/atv_08-banco-de-dados/README.md](docs/atv_08-banco-de-dados/README.md).

## 📃 Certificado de Conclusão

Status do Programa: Em andamento.
