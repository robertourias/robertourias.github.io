---
tags: [técnico, arquitetura, stack, turborepo, nextjs, nestjs]
created: 2026-05-21
relacionados:
  - "[[Visão Geral]]"
  - "[[../03 - Packages/ui/Visão Geral]]"
---

# Técnico — Arquitetura e Stack

---

## Visão da arquitetura

```
┌─────────────────────────────────────────────────────┐
│                   Monorepo Turborepo                 │
│                                                      │
│  apps/                    packages/                  │
│  ├── web-nico.dev.br  ←── ui/ (@nico.dev/ui)        │
│  ├── tools            ←── ui/ (@nico.dev/ui)        │
│  ├── challenges       ←── ui/ (@nico.dev/ui)        │
│  └── storybook        ←── ui/ (@nico.dev/ui)        │
│                            config/                   │
└─────────────────────────────────────────────────────┘

Deploy independente por subdomínio:
  nico.dev            → apps/web-nico.dev.br (Vercel)
  tools.nico.dev      → apps/tools (Vercel)
  challenges.nico.dev → apps/challenges (Vercel)
```

---

## Stack tecnológica

| Camada | Tecnologia | Versão | Notas |
|--------|-----------|--------|-------|
| **Monorepo** | Turborepo | latest | Builds incrementais, cache remoto |
| **Package Manager** | pnpm | 9.15.0 | Workspaces |
| **Frontend** | Next.js | 16.2.1 | App Router, SSR/RSC |
| **Linguagem** | TypeScript | ^5 | Strict mode |
| **Estilização** | Tailwind CSS | ^4 | Design tokens via CSS vars |
| **UI Components** | `@nico.dev/ui` | workspace | Radix UI + CVA como primitivas |
| **Backend** | NestJS | latest | DI, modular, TypeScript-first |
| **ORM** | Prisma (MVPs) / Drizzle (perf) | — | Prisma para agilidade, Drizzle para projetos maduros |
| **Banco de dados** | PostgreSQL | — | — |
| **Auth** | NextAuth / Auth.js | — | Session-based, HTTP-only cookies |
| **Cache** | Redis | — | Via NestJS CacheModule |
| **Hosting** | Vercel (frontend) + Railway (backend/DB) | — | Deploy por subdomínio |
| **CI/CD** | GitHub Actions | — | — |
| **Node.js** | >=20 | — | Obrigatório |

---

## Fluxo de dados

```
User → Next.js (SSR/RSC) → NestJS API → PostgreSQL
                         ↘ Redis (cache)
```

Cada subprojeto segue o mesmo padrão de forma independente.

---

## Estrutura do monorepo

```
nico.dev.br/
├── apps/
│   ├── web-nico.dev.br/    → Site principal (Next.js)
│   │   ├── src/app/        → App Router pages e layouts
│   │   ├── src/app/api/    → API Routes (contact, chat)
│   │   └── messages/       → i18n (pt, en, es) via next-intl
│   │
│   ├── tools/              → tools.nico.dev (Next.js)
│   │   └── src/app/        → Ferramentas (ex: clt-pj/)
│   │
│   ├── challenges/         → challenges.nico.dev (Next.js)
│   │   └── src/app/        → Portfólio de desafios técnicos
│   │
│   └── storybook/          → Catálogo visual de componentes
│       ├── .storybook/     → Configuração (main.ts, preview.tsx)
│       └── src/stories/    → Stories dos componentes
│
├── packages/
│   ├── ui/                 → @nico.dev/ui — Design System compartilhado
│   │   ├── src/components/ → Componentes React
│   │   ├── src/tokens/     → Tokens de design
│   │   ├── tokens.css      → CSS variables globais
│   │   └── src/globals.css → Estilos base
│   │
│   └── config/
│       ├── eslint/         → ESLint base config
│       ├── tailwind/       → PostCSS config compartilhado
│       └── tsconfig/       → TypeScript base config
│
├── .ai-core/               → Harness de agentes IA
├── .claude/                → Adapter Claude Code
├── turbo.json              → Pipeline de tasks Turborepo
└── pnpm-workspace.yaml     → Workspace configuration
```

---

## Pipeline Turborepo

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "lint": {},
    "dev": { "cache": false, "persistent": true }
  }
}
```

O `^build` garante que `packages/ui` é buildado antes dos apps que o consomem.

---

## Comandos principais

```bash
# Desenvolvimento — todos os apps
pnpm dev

# Desenvolvimento — app específico
pnpm --filter @nico.dev/web-nico.dev.br dev
pnpm --filter @nico.dev/tools dev        # porta 3001
pnpm --filter @nico.dev/challenges dev   # porta 3002
pnpm --filter @nico.dev/storybook dev    # porta 6006

# Build de todos os apps
pnpm build

# Lint em todo o monorepo
pnpm lint
```

---

## Decisões arquiteturais registradas

| Decisão | Escolha | Data | Motivo |
|---------|---------|------|--------|
| Monorepo tool | Turborepo | 2026-05 | Builds incrementais, packages compartilhados |
| Frontend framework | Next.js (App Router) | 2026-05 | SSR, RSC, edge-ready |
| Backend framework | NestJS | 2026-05 | DI, modular, TypeScript-first |
| Arquitetura | Clean Architecture | 2026-05 | Testável, lógica de negócio isolada |
| ORM strategy | Prisma (MVPs) + Drizzle (perf) | 2026-05 | Pragmatismo por maturidade do projeto |
| Deploy strategy | Subdomínios por subprojeto | 2026-05 | Isolamento de deploy independente |
| Estilização | Tailwind CSS v4 | 2026-05 | Sem CSS Modules, sem styled-components |
| Componentes | `@nico.dev/ui` obrigatório | 2026-05 | Design system único — nunca instalar lib alternativa nos apps |

---

## Infraestrutura

| Serviço | Propósito | Crítico? |
|---------|-----------|----------|
| Vercel | Hosting frontend (Next.js) | Sim |
| Railway | Hosting backend (NestJS + PostgreSQL) | Sim |
| GitHub Actions | CI/CD | Sim |
| Redis | Cache | Não (MVP pode operar sem) |

---

## Padrões de código

### Arquivos e diretórios
```
kebab-case/          → diretórios e arquivos comuns
PascalCase.tsx       → componentes React
kebab-case.spec.ts   → testes backend
PascalCase.test.tsx  → testes frontend
```

### Ordem de imports
```ts
// 1. Node built-ins
// 2. Pacotes externos
// 3. Pacotes internos do monorepo (@packages/*)
// 4. Imports absolutos da aplicação (@/)
// 5. Imports relativos
```

### Git
- **Branches:** `feat/` `fix/` `chore/` `refactor/` `docs/`
- **Commits:** Conventional Commits
- **PRs:** máx. 400 linhas — features grandes viram PRs sequenciais
- **Merge:** squash and merge (histórico linear)

### Protocolo pré-commit (obrigatório)
1. Atualizar `.ai-core/CHANGELOG.md`
2. Atualizar `.ai-core/STATUS.md`
3. Incluir ambos no commit

---

## Bounded Contexts

| Contexto | Responsabilidade |
|----------|-----------------|
| Portfolio | Gerencia projetos exibidos e links para subprojetos |
| Blog | Artigos técnicos (planejado) |
| Contact | Formulário de contato via Resend |
| Subprojects | Cada subprojeto é um contexto isolado |

---

## Ver também

- [[../03 - Packages/ui/Técnico — Componentes e Design System]]
- [[../04 - AI Core/Visão Geral do Harness]]
- [[../02 - Apps/web-nico.dev.br/Técnico]]
