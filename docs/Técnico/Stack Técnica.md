---
tags: [técnico, stack, tecnologias]
---

# Stack Técnica

> Tecnologias escolhidas por camada, com justificativa de cada escolha.

---

## Frontend (`apps/web`)

| Camada | Tecnologia | Versão | Notas |
|--------|-----------|--------|-------|
| Framework | **Next.js** | latest | App Router, SSR/RSC |
| Linguagem | **TypeScript** | latest | Strict mode |
| Estilização | **Tailwind CSS** | latest | Utility-first, sem CSS Modules |
| Componentes | **shadcn/ui** | — | Sobre Radix UI; sem MUI, sem Chakra |
| Estado global | **Zustand** | — | Sem Redux, sem Jotai |
| Formulários | **React Hook Form + Zod** | — | Sem Formik |
| Data fetching | **TanStack Query** | — | No cliente; sem SWR |
| Ícones | **Lucide React** | — | Sem Heroicons, sem Phosphor |
| Carrossel | **Embla Carousel** | — | Loop infinito nativo, drag/swipe |
| E-mail | **Resend** | — | Transacional simples, SDK TypeScript |
| i18n | **next-intl** | — | Em spec |

---

## Backend (`apps/api` e subprojetos)

| Camada | Tecnologia | Notas |
|--------|-----------|-------|
| Framework | **NestJS** | DI, modular, TypeScript-first |
| ORM (MVPs) | **Prisma** | Agilidade no desenvolvimento |
| ORM (perf) | **Drizzle** | Projetos mais maduros com foco em performance |
| Banco de dados | **PostgreSQL** | Relacional, via Railway |
| Cache | **Redis** | Opcional no MVP |
| Auth | **NextAuth / Auth.js** | Session-based |
| API | **REST** — `/api/v1` | Docs via Swagger em `/api/docs` |

---

## Testes

| Tipo | Ferramenta |
|------|-----------|
| Unitário/Integração | React Testing Library + Jest |
| Mock de rede | MSW (sem mocks manuais de fetch) |
| E2E | Playwright |

**Cobertura mínima:**
- Componentes: 70% (foco em comportamento, não markup)
- Hooks e utils: 90%
- Fluxos P0 (E2E): 100%

---

## Tooling & Infra

| Ferramenta | Uso |
|-----------|-----|
| **Turborepo** | Monorepo, builds incrementais |
| **pnpm** | Package manager |
| **ESLint** | Linting (config compartilhada em `packages/config`) |
| **Prettier** | Formatação |
| **GitHub Actions** | CI/CD |
| **Vercel** | Deploy do frontend |
| **Railway** | Deploy do backend e banco |
| **Storybook** | Documentação de componentes (em spec) |

---

## Links

- [[Arquitetura]]
- [[Decisões Frontend]]
- [[Decisões Backend]]
