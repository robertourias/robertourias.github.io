---
tags: [técnico, decisões, backend]
---

# Decisões Backend

> Escolhas específicas deste projeto. Estas decisões são **non-negotiable** — não desvie sem registrar uma nova decisão aqui.

---

## Arquitetura

**Feature-first**, organizado por módulo (não por camada técnica). Clean Architecture com limites de camada estritos.

```
src/
  modules/        → funcionalidades (cada uma com estrutura interna)
  common/         → shared code
  infra/          → configuração de infra
  config/         → variáveis e configurações

module/
  controllers/    → HTTP — sem lógica de negócio
  services/       → use-cases
  repositories/   → acesso ao banco (Prisma aqui, em nenhum outro lugar)
  domain/         → entidades e regras — zero imports de framework
  dto/            → objetos de transporte
```

**Regras invioláveis:**
- Sem lógica de negócio em controllers
- Prisma apenas dentro de repositories
- DTOs apenas na camada de transporte
- Services contêm os use-cases
- Sem acesso cross-module a repositories
- Domínio isolado do NestJS — zero imports de framework na camada de domínio

---

## ORM e Banco de Dados

- **Prisma ORM** com PostgreSQL
- `synchronize: false` em produção — migrations obrigatórias para toda mudança de schema
- Sem concatenação de SQL raw

---

## Autenticação

- **NextAuth / Auth.js**
- HTTP-only cookies para sessão
- Guards obrigatórios em todas as rotas privadas

---

## API

- **REST** com Swagger (`@nestjs/swagger`)
- Versionamento via prefixo de URL: `/api/v1/`
- Breaking changes exigem nova versão
- Paginação obrigatória em listagens (evitar N+1)

---

## Tratamento de Erros

- Todos os erros estendem `AppException`
- Sem stacktrace exposto ao cliente
- Tratamento centralizado via HTTP exception filter global
- Erros de domínio exigem código único identificador

---

## Logging

- **Pino logger** — logs JSON estruturados
- `requestId` obrigatório em todos os logs
- Proibido `console.log`
- Nunca logar dados sensíveis

---

## Segurança

- Validação com **Zod** obrigatória em todas as entradas
- Nunca confiar em input do cliente
- **Helmet** habilitado
- **Rate limiting** habilitado

---

## Cache e Filas

- Cache: **Redis** via NestJS CacheModule
- Filas: nenhuma no MVP — jobs pesados devem usar filas quando implementados (não bloqueiam resposta HTTP)

---

## Testes

| Tipo | Ferramenta |
|------|-----------|
| Unit | Jest — para services (use-cases) |
| E2E | Supertest — para fluxos HTTP |

---

## Links

- [[Stack Técnica]]
- [[Arquitetura]]
- [[Convenções]]
