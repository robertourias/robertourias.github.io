# Architecture Context

> **Maintainer**: Update this file whenever a significant architectural decision is made or the system structure changes.

## System Overview

**Product name**: Nico.dev
**Purpose**: Site pessoal e portfólio profissional organizado como monorepo Turborepo, com site principal e subprojetos independentes com deploy em subdomínios separados.
**Status**: Early development (MVP)

## Monorepo Structure (Turborepo)

```
apps/
  web/          → Next.js frontend (App Router) — site principal nico.dev
  api/          → NestJS backend (quando necessário)
  [subproject]/ → Aplicações independentes com deploy em subdomínio (ex: projeto.nico.dev)
packages/
  ui/           → Shared React component library
  config/       → Shared ESLint, TypeScript, Tailwind configs
  types/        → Shared TypeScript types and interfaces
  utils/        → Shared utility functions
```

## Technology Stack

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Frontend | Next.js | latest | App Router, SSR/RSC |
| UI Components | <!-- a definir --> | | |
| Styling | <!-- a definir --> | | |
| Backend | NestJS | latest | Usado nos subprojetos que exigem API |
| ORM | Prisma (MVPs) / Drizzle (projetos com foco em performance) | | Prisma para MVPs, Drizzle para projetos modernos |
| Database | PostgreSQL | | |
| Auth | NextAuth / Auth.js | | |
| Queue | Nenhum por enquanto | | |
| Cache | Redis | | |
| File Storage | <!-- a definir --> | | |

## Domain Model

Cada subprojeto possui seu próprio domínio. O site principal (web) possui as seguintes entidades:

```
Project ──── Tag
   │
   └──── SubprojectLink (aponta para subdomínio)

BlogPost ──── Tag
```

Key entities:
- **Project**: Trabalho ou projeto exibido no portfólio, com descrição, tecnologias e links
- **SubprojectLink**: Referência a uma aplicação independente hospedada em subdomínio
- **BlogPost**: Artigo técnico (planejado)

## API Design

- **Style**: REST
- **Base URL**: `/api/v1`
- **Authentication**: NextAuth / Auth.js (session-based)
- **API Documentation**: Available at `/api/docs` (Swagger) nos subprojetos com API

## Data Flow

```
User → Next.js (SSR/RSC) → NestJS API → PostgreSQL
                         ↘ Redis (cache)
```

Subprojetos com subdomínio seguem o mesmo padrão de forma independente.

## Bounded Contexts

- **Portfolio**: Gerencia projetos exibidos no portfólio e links para subprojetos
- **Blog**: Artigos técnicos (planejado)
- **Contact**: Formulário de contato
- **Subprojects**: Cada subprojeto é um contexto isolado no monorepo

## Infrastructure

- **Hosting**: Vercel (frontend / Next.js) + Railway (backend / NestJS + PostgreSQL)
- **CI/CD**: GitHub Actions
- **Environments**: development | production
- **Secrets management**: Variáveis de ambiente via Vercel e Railway

## Key Architectural Decisions

| Decision | Choice | Date | Rationale |
|----------|--------|------|-----------|
| Monorepo tool | Turborepo | 2026-05 | Fast incremental builds, shared packages entre site e subprojetos |
| Backend framework | NestJS | 2026-05 | DI, modular, TypeScript-first |
| Frontend framework | Next.js | 2026-05 | SSR, RSC, edge-ready |
| Architecture pattern | Clean Architecture | 2026-05 | Testable, maintainable business logic |
| ORM strategy | Prisma (MVPs) + Drizzle (perf) | 2026-05 | Pragmatismo: Prisma para agilidade, Drizzle para performance em projetos maduros |
| Deploy strategy | Subdomínios por subprojeto | 2026-05 | Isolamento de deploy, cada app independente |

## Known Constraints & Limitations

- Subprojetos são independentes: compartilham packages mas têm deploys e ciclos de vida separados
- Dois ORMs no monorepo exigem atenção para não misturar padrões entre projetos

## External Dependencies

| Service | Purpose | Critical? |
|---------|---------|-----------|
| Vercel | Hosting do frontend (Next.js) | Sim |
| Railway | Hosting do backend e banco de dados | Sim |
| GitHub Actions | CI/CD | Sim |
| Redis | Cache | Não (MVP pode operar sem) |
