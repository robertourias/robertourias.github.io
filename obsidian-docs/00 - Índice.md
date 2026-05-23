---
tags: [índice, monorepo, nico.dev]
created: 2026-05-21
---

# 🗂️ Nico.dev — Documentação do Monorepo

> Documentação centralizada do monorepo `nico.dev.br`. Gerada para uso no Obsidian com links internos entre notas.

---

## Navegação rápida

### 🏠 Projeto
- [[01 - Projeto/Visão Geral|Visão Geral do Projeto]]
- [[01 - Projeto/Técnico — Arquitetura e Stack|Técnico — Arquitetura e Stack]]

### 📱 Apps
| App | Visão Geral | Técnico |
|-----|-------------|---------|
| `web-nico.dev.br` — Site principal | [[02 - Apps/web-nico.dev.br/Visão Geral]] | [[02 - Apps/web-nico.dev.br/Técnico]] |
| `tools` — Ferramentas web | [[02 - Apps/tools/Visão Geral]] | [[02 - Apps/tools/Técnico]] |
| `challenges` — Portfólio de desafios | [[02 - Apps/challenges/Visão Geral]] | [[02 - Apps/challenges/Técnico]] |
| `storybook` — Catálogo de componentes | [[02 - Apps/storybook/Visão Geral]] | [[02 - Apps/storybook/Técnico]] |

### 📦 Packages
| Package | Visão Geral | Técnico |
|---------|-------------|---------|
| `@nico.dev/ui` — Design System | [[03 - Packages/ui/Visão Geral]] | [[03 - Packages/ui/Técnico — Componentes e Design System]] |

### 🤖 AI Core (Harness de Agentes)
- [[04 - AI Core/Visão Geral do Harness|Visão Geral do Harness]]
- [[04 - AI Core/Fluxo de Entrega Spec-Driven|Fluxo de Entrega Spec-Driven]]
- [[04 - AI Core/Agentes e Comandos|Agentes e Comandos]]

---

## Estrutura do monorepo

```
nico.dev.br/
├── apps/
│   ├── web-nico.dev.br/   → Site principal (nico.dev)
│   ├── tools/             → tools.nico.dev
│   ├── challenges/        → challenges.nico.dev
│   └── storybook/         → Catálogo de componentes
├── packages/
│   ├── ui/                → @nico.dev/ui — Design System
│   └── config/            → ESLint, TypeScript, Tailwind configs
├── .ai-core/              → Harness de agentes IA
└── obsidian-docs/         → Esta documentação
```

---

## Status atual

**Última atualização:** 2026-05-21
**Stage:** MVP — Early Development

| Área | Status |
|------|--------|
| Site principal (`web-nico.dev.br`) | 🟡 Em andamento |
| Ferramentas (`tools`) | 🟡 Em andamento |
| Desafios técnicos (`challenges`) | 🔴 Planejado |
| Design System (`ui`) | 🟢 Ativo |
| Storybook | 🟢 Ativo |
