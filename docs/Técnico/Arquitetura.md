---
tags: [técnico, arquitetura, monorepo]
---

# Arquitetura

## Visão Geral

**Nico.dev** é organizado como um **monorepo Turborepo** com o site principal e subprojetos independentes com deploy em subdomínios separados.

```
nico.dev           → apps/web    (Next.js, App Router)
projeto.nico.dev   → apps/[subprojeto] (Next.js + NestJS)
tools.nico.dev     → apps/tools  (planejado)
```

---

## Estrutura do Monorepo

```
apps/
  web/          → Next.js (App Router) — site principal nico.dev
  api/          → NestJS backend (quando necessário)
  [subprojeto]/ → Apps independentes com deploy em subdomínio
packages/
  ui/           → Biblioteca de componentes React compartilhada
  config/       → ESLint, TypeScript, Tailwind configs compartilhados
  types/        → Tipos TypeScript compartilhados
  utils/        → Funções utilitárias compartilhadas
```

---

## Domain Model

O site principal (`apps/web`) possui as seguintes entidades:

```
Project ──── Tag
   │
   └──── SubprojectLink (aponta para subdomínio)

BlogPost ──── Tag
```

- **Project** — trabalho exibido no portfólio (descrição, tecnologias, links)
- **SubprojectLink** — referência a uma app em subdomínio
- **BlogPost** — artigo técnico (planejado)

Cada subprojeto possui seu próprio domínio isolado.

---

## Bounded Contexts

| Contexto | Responsabilidade |
|----------|-----------------|
| Portfolio | Gerencia projetos e links para subprojetos |
| Blog | Artigos técnicos (planejado) |
| Contact | Formulário de contato |
| Subprojects | Cada subprojeto é um contexto isolado |

---

## Fluxo de Dados

```
User → Next.js (SSR/RSC) → NestJS API → PostgreSQL
                         ↘ Redis (cache)
```

Subprojetos com subdomínio seguem o mesmo padrão de forma independente.

---

## Infraestrutura

| Serviço | Uso | Crítico? |
|---------|-----|----------|
| Vercel | Hosting do frontend (Next.js) | ✅ Sim |
| Railway | Hosting do backend (NestJS + PostgreSQL) | ✅ Sim |
| GitHub Actions | CI/CD | ✅ Sim |
| Redis | Cache | ⚠️ Não (MVP pode operar sem) |

**Ambientes:** `development` · `production`
**Secrets:** variáveis de ambiente via Vercel e Railway

---

## Princípios Arquiteturais

1. **Clean Architecture** — dependências apontam para dentro; domínio sem dependências de framework
2. **Testes junto com a implementação** — não depois
3. **Toda decisão rastreável** — registrada em `.ai-core/` e nesta documentação
4. **Subprojetos isolados** — compartilham packages mas têm deploys e ciclos de vida separados

---

## Decisões Arquiteturais

| Decisão | Escolha | Data | Justificativa |
|---------|---------|------|---------------|
| Monorepo tool | Turborepo | 2026-05 | Builds incrementais rápidos, shared packages |
| Backend framework | NestJS | 2026-05 | DI, modular, TypeScript-first |
| Frontend framework | Next.js | 2026-05 | SSR, RSC, edge-ready |
| Padrão arquitetural | Clean Architecture | 2026-05 | Testável, manutenível |
| ORM | Prisma (MVPs) + Drizzle (perf) | 2026-05 | Pragmatismo: Prisma para agilidade, Drizzle para performance |
| Deploy | Subdomínios por subprojeto | 2026-05 | Isolamento, cada app independente |

---

## Constraints Conhecidos

- Dois ORMs no monorepo (Prisma + Drizzle) exigem atenção para não misturar padrões
- Subprojetos têm ciclos de vida independentes do site principal

---

## Links

- [[Stack Técnica]]
- [[Decisões Frontend]]
- [[Decisões Backend]]
- [[Decisões de Infraestrutura]]
