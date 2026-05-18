---
tags: [técnico, decisões, frontend]
---

# Decisões Frontend

> Escolhas específicas deste projeto que substituem padrões gerais. Estas decisões são **non-negotiable** entre sessões — não desvie sem abrir uma nova decisão aqui.

---

## Rendering

| Decisão | Escolha |
|---------|---------|
| Router | **App Router** (Next.js) — sem Pages Router |
| Padrão de componente | **Server Components** por padrão |
| Uso de `'use client'` | Apenas para interatividade ou browser APIs |
| Mutações internas | **Server Actions** — não API routes |
| Data fetching | Em Server Components sempre que possível — evitar `useEffect` para fetch |

---

## Estilização

- **Tailwind CSS** — sem CSS Modules, sem styled-components
- Classes utilitárias direto nos componentes
- Responsividade via classes (`sm:`, `md:`, `lg:`) — sem JS de resize

---

## Componentes

- **shadcn/ui** sobre Radix UI
- Sem MUI, sem Chakra, sem Ant Design
- Componentes customizados em `packages/ui`

---

## Estado Global

- **Zustand** — sem Redux, sem Jotai, sem Context para estado global

---

## Formulários

- **React Hook Form + Zod** — sem Formik
- Validação no cliente e no servidor com o mesmo schema Zod

---

## Data Fetching no Cliente

- **TanStack Query** — sem SWR, sem fetch hooks manuais

---

## Ícones

- **Lucide React** — sem Heroicons, sem Phosphor

---

## Testes

| Tipo | Ferramenta |
|------|-----------|
| Unitário/Componentes | React Testing Library + Jest |
| Mock de rede | MSW — sem mocks manuais de fetch |
| E2E | Playwright |

**Cobertura mínima:**
- Componentes: 70% (foco em comportamento, não markup)
- Hooks e utils: 90%
- Fluxos P0 (E2E): 100%

---

## Links

- [[Stack Técnica]]
- [[Convenções]]
- [[Arquitetura]]
