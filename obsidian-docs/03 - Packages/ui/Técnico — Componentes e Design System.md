---
tags: [técnico, ui, design-system, radix, cva, tailwind, tokens]
created: 2026-05-21
package: "@nico.dev/ui"
relacionados:
  - "[[Visão Geral]]"
  - "[[../../02 - Apps/storybook/Técnico]]"
---

# @nico.dev/ui — Técnico: Componentes e Design System

---

## Identificação

| Campo | Valor |
|-------|-------|
| Package name | `@nico.dev/ui` |
| Versão | 0.0.1 |
| Diretório | `packages/ui/` |
| Entry point | `./src/index.ts` |
| Exports | `.` (componentes), `./tokens`, `./tokens.css`, `./globals.css` |

---

## Stack de implementação

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| React | ^19 (peer) | Runtime |
| TypeScript | ^5 | Linguagem |
| Tailwind CSS | ^4 (peer) | Estilização via utility classes |
| Radix UI | ^1.x (vários) | Primitivas acessíveis |
| class-variance-authority (CVA) | ^0.7.1 | Variantes de componentes tipadas |
| clsx | ^2.1.1 | Composição condicional de classes |
| tailwind-merge | ^3.3.0 | Merge seguro de classes Tailwind |
| Lucide React | ^0.511.0 | Ícones |
| Framer Motion | ^12.12.1 | Animações |
| react-day-picker | ^10.0.1 | Calendar / DatePicker |
| date-fns | ^4.2.1 | Manipulação de datas |

---

## Estrutura de arquivos

```
packages/ui/
├── src/
│   ├── index.ts               → Barrel export público de todos os componentes
│   ├── components/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── textarea.tsx
│   │   ├── checkbox.tsx
│   │   ├── radio.tsx
│   │   ├── switch.tsx
│   │   ├── select.tsx
│   │   ├── form-group.tsx
│   │   ├── badge.tsx
│   │   ├── alert.tsx
│   │   ├── card.tsx
│   │   ├── item-card.tsx
│   │   ├── tabs.tsx
│   │   ├── toggle-filter.tsx
│   │   ├── avatar.tsx
│   │   ├── calendar.tsx
│   │   ├── date-picker.tsx
│   │   ├── heatmap.tsx
│   │   └── skeleton.tsx
│   ├── tokens/
│   │   └── index.ts           → Tokens como valores JS exportáveis
│   └── lib/
│       └── utils.ts           → cn() helper (clsx + tailwind-merge)
├── tokens.css                 → CSS custom properties (variáveis semânticas)
├── src/globals.css            → Estilos base Tailwind + reset
├── package.json
└── tsconfig.json
```

---

## Padrão de implementação de componentes

### Estrutura com CVA (Class Variance Authority)

```tsx
// exemplo: button.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const buttonVariants = cva(
  // base classes
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary-hover',
        secondary: 'bg-secondary text-secondary-foreground',
        outline: 'border border-input bg-background hover:bg-accent',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}
```

---

## Tokens CSS (Design Tokens)

Os tokens ficam em `tokens.css` como CSS custom properties e são mapeados para classes Tailwind via configuração:

```css
/* tokens.css — exemplo de estrutura */
:root {
  --background: hsl(0 0% 100%);
  --foreground: hsl(222.2 84% 4.9%);
  --primary: hsl(222.2 47.4% 11.2%);
  --primary-foreground: hsl(210 40% 98%);
  --secondary: hsl(210 40% 96.1%);
  --muted: hsl(210 40% 96.1%);
  --muted-foreground: hsl(215.4 16.3% 46.9%);
  --border: hsl(214.3 31.8% 91.4%);
  /* ... */
}

.dark {
  --background: hsl(222.2 84% 4.9%);
  --foreground: hsl(210 40% 98%);
  /* ... */
}
```

### Tokens semânticos de cor

```
bg-background / text-foreground
bg-surface / bg-surface-raised / bg-surface-overlay
bg-primary / text-primary-foreground / hover:bg-primary-hover
bg-secondary / text-secondary-foreground
bg-muted / text-muted-foreground
bg-accent / text-accent-foreground
bg-destructive / text-destructive-foreground
bg-success / text-success-foreground
bg-warning / text-warning-foreground
border-border / border-input / ring-ring
bg-badge-destructive-bg / bg-badge-success-bg / bg-badge-warning-bg
```

> ⚠️ **Nunca usar hex direto** — sempre via classes Tailwind semânticas.

---

## Helper `cn()`

```ts
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Uso:
```tsx
<div className={cn('base-class', condition && 'conditional-class', className)} />
```

---

## Primitivas Radix UI

Os seguintes componentes usam Radix UI como base de acessibilidade:

| Componente `@nico.dev/ui` | Primitiva Radix |
|--------------------------|-----------------|
| `Avatar` | `@radix-ui/react-avatar` |
| `Checkbox` | `@radix-ui/react-checkbox` |
| `Label` | `@radix-ui/react-label` |
| `RadioGroup` | `@radix-ui/react-radio-group` |
| `Select` | `@radix-ui/react-select` |
| `Button` (Slot) | `@radix-ui/react-slot` |
| `Switch` | `@radix-ui/react-switch` |
| `Tabs` | `@radix-ui/react-tabs` |

---

## Como consumir nos apps

```tsx
// Em qualquer app do monorepo
import { Button, Card, CardContent, Badge } from '@nico.dev/ui'
import '@nico.dev/ui/tokens.css'    // se não já importado no layout
import '@nico.dev/ui/globals.css'   // reset e base styles
```

---

## Como adicionar um novo componente

1. Criar `packages/ui/src/components/<nome>.tsx`
2. Implementar usando CVA + Radix (se for componente interativo)
3. Exportar em `packages/ui/src/index.ts`
4. Criar story em `apps/storybook/src/stories/<Nome>.stories.tsx`
5. Verificar no addon a11y que não há violações
6. Documentar em `ui-guidelines.md` se for nova categoria

---

## Baseline de acessibilidade

- Cor nunca deve ser o único diferenciador — sempre adicionar texto ou ícone
- `outline: none` é proibido — focus rings sempre visíveis
- Touch targets: mínimo 44×44px em mobile
- Ícones usados sozinhos: exigem `aria-label` ou `title`
- Dark mode: testar contraste 4.5:1 (texto normal) e 3:1 (texto grande) em ambos os modos

---

## Ver também

- [[Visão Geral]]
- [[../../02 - Apps/storybook/Técnico]]
- [[../../01 - Projeto/Técnico — Arquitetura e Stack]]
