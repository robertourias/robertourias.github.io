# Decisões Frontend

Escolhas específicas deste projeto que substituem padrões gerais.
Carregue junto com `agents/frontend.agent.md`.

## Rendering

- App Router (Next.js) — sem Pages Router
- Server Components por padrão; `'use client'` apenas para interatividade ou browser APIs
- Server Actions para mutações internas — não API routes
- Dados em Server Components sempre que possível — evitar `useEffect` para fetch

## Estilização

- Tailwind CSS — sem CSS Modules, sem styled-components

## Componentes

- shadcn/ui sobre Radix UI — sem MUI, sem Chakra

## Estado global

- Zustand — sem Redux, sem Jotai

## Formulários

- React Hook Form + Zod — sem Formik

## Data fetching no cliente

- TanStack Query — sem SWR, sem fetch hooks manuais

## Ícones

- Lucide React — sem Heroicons, sem Phosphor

## Testes

- React Testing Library + Jest — sem Enzyme
- MSW para mock de rede — sem mocks manuais de fetch
- Playwright para E2E

## Cobertura mínima

- Componentes: 70% (foco em comportamento, não markup)
- Hooks e utils: 90%
- Fluxos P0 (E2E): 100%
