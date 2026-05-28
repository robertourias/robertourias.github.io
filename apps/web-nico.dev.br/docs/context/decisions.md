# Decisões — web-nico.dev.br (apps/web-nico.dev.br)

Decisões específicas deste app. Desvios em relação aos padrões globais em `docs/context/decisions.md`.

## Renderização

- App Router (Next.js) — sem Pages Router
- Server Components por padrão; `'use client'` apenas para interatividade ou browser APIs
- Server Actions para mutações internas — não API routes
- Dados em Server Components sempre que possível

## Estado

- Zustand para estado global de UI (ex: tema, sidebar)

## Formulários

- React Hook Form + Zod

## Data fetching

- TanStack Query para fetch client-side (ex: previews, dados dinâmicos)

## Integrações externas

- Resend para envio de e-mails via formulário de contato
- next-intl para internacionalização (i18n)
