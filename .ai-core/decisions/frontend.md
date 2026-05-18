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

## Design System

- Todos os componentes UI devem vir de `@nico.dev/ui` (packages/ui/)
- Nenhum componente deve ser criado diretamente em `apps/web` ou subprojetos sem antes existir (ou ser adicionado) ao design system
- Fonte da verdade visual: `docs/nico.dev.br.pen` via MCP do Pencil
- Referência de componentes disponíveis: rodar `pnpm dev --filter @nico.dev/storybook`
- Tokens de cor: sempre via variáveis CSS semânticas (classes Tailwind como `bg-primary`) — nunca hex direto

## Componentes

- Radix UI para primitivas de acessibilidade (Checkbox, Select, Tabs, Avatar, etc.)
- shadcn/ui como referência de padrão — sem MUI, sem Chakra

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
