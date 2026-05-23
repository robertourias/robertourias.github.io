---
tags: [técnico, storybook, vite, a11y, design-system]
created: 2026-05-21
app: storybook
package: "@nico.dev/storybook"
relacionados:
  - "[[Visão Geral]]"
  - "[[../../03 - Packages/ui/Técnico — Componentes e Design System]]"
---

# storybook — Técnico

---

## Identificação

| Campo | Valor |
|-------|-------|
| Package name | `@nico.dev/storybook` |
| Versão | 0.0.1 |
| Diretório | `apps/storybook/` |
| Dev server | `pnpm --filter @nico.dev/storybook dev` (porta 6006) |
| Build output | `apps/storybook/storybook-static/` |

---

## Stack

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| Storybook | ^8.6.18 | Framework de catálogo de componentes |
| Vite | ^6 | Bundler (via `@storybook/react-vite`) |
| React | 19.2.4 | Runtime |
| TypeScript | ^5 | Linguagem |
| Tailwind CSS | ^4 | Estilização (via `@tailwindcss/vite`) |
| `@nico.dev/ui` | workspace | Componentes documentados |

---

## Estrutura de arquivos

```
apps/storybook/
├── .storybook/
│   ├── main.ts              → Configuração principal do Storybook
│   └── preview.tsx          → Decoradores globais, tema, providers
├── src/
│   └── stories/
│       ├── tokens/          → Stories de tokens de design (cores, tipografia)
│       ├── Button.stories.tsx
│       ├── Input.stories.tsx
│       ├── Card.stories.tsx
│       ├── Badge.stories.tsx
│       ├── Alert.stories.tsx
│       ├── Avatar.stories.tsx
│       ├── Calendar.stories.tsx
│       ├── DatePicker.stories.tsx
│       ├── Heatmap.stories.tsx
│       ├── Skeleton.stories.tsx
│       ├── Tabs.stories.tsx
│       ├── ToggleFilter.stories.tsx
│       └── ... (demais componentes)
├── storybook-static/        → Build estático (não commitar)
├── package.json
└── tsconfig.json
```

---

## Configuração (`.storybook/main.ts`)

```ts
// Pontos-chave da configuração
{
  framework: "@storybook/react-vite",
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-interactions"
  ]
}
```

---

## Preview global (`.storybook/preview.tsx`)

O `preview.tsx` configura:
- Import de `tokens.css` e `globals.css` do `@nico.dev/ui`
- Decorador para suporte a dark/light mode
- Backgrounds padrão (claro e escuro)
- Viewport breakpoints padrão (mobile, tablet, desktop)

---

## Padrão de story

```tsx
// Exemplo: Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@nico.dev/ui'

const meta: Meta<typeof Button> = {
  title: 'Forms/Button',
  component: Button,
  args: {
    children: 'Click me',
    variant: 'default',
  },
}
export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {}
export const Secondary: Story = { args: { variant: 'secondary' } }
export const Destructive: Story = { args: { variant: 'destructive' } }
// ... demais variantes
```

---

## Como adicionar uma nova story

1. Criar `src/stories/<ComponentName>.stories.tsx`
2. Importar o componente de `@nico.dev/ui`
3. Definir `meta` com `title` (categoria/nome) e `component`
4. Exportar stories para cada variante e estado relevante
5. Verificar no addon a11y que não há violações

---

## Addons e suas funções

| Addon | O que faz |
|-------|-----------|
| `addon-essentials` | **Controls** (props interativas), **Actions** (event log), **Docs** (documentação automática), **Backgrounds** (mudar fundo), **Viewport** (breakpoints) |
| `addon-a11y` | Roda axe-core por story — reporta violações WCAG |
| `addon-interactions` | Permite `play()` functions para testar interações automaticamente |

---

## Dependências de packages internos

```json
{
  "dependencies": {
    "@nico.dev/ui": "workspace:*"
  },
  "devDependencies": {
    "@nico.dev/config": "workspace:*"
  }
}
```

---

## Build e deploy

```bash
# Build estático
pnpm --filter @nico.dev/storybook build
# → apps/storybook/storybook-static/

# O storybook-static pode ser servido em qualquer CDN estático
# Chromatic (planejado) para review visual de componentes em PRs
```

---

## Ver também

- [[Visão Geral]]
- [[../../03 - Packages/ui/Visão Geral]]
- [[../../03 - Packages/ui/Técnico — Componentes e Design System]]
