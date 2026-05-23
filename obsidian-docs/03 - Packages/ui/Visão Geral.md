---
tags: [package, ui, design-system, componentes, tailwind, radix]
created: 2026-05-21
package: "@nico.dev/ui"
relacionados:
  - "[[Técnico — Componentes e Design System]]"
  - "[[../../02 - Apps/storybook/Visão Geral]]"
  - "[[../../01 - Projeto/Técnico — Arquitetura e Stack]]"
---

# @nico.dev/ui — Visão Geral

> Biblioteca de componentes React compartilhada do monorepo. A única fonte de verdade para UI em todos os apps.

---

## Propósito

`@nico.dev/ui` é o **design system** centralizado do monorepo `nico.dev.br`. Todos os apps (`web-nico.dev.br`, `tools`, `challenges`) devem consumir componentes exclusivamente deste package — nunca instalar bibliotecas alternativas (MUI, Chakra, shadcn standalone, etc.) diretamente em um app.

---

## Regra de ouro

> **Extensão do design system acontece em `packages/ui`, não nos apps.**
>
> Se um componente necessário não existir aqui, ele deve ser criado neste package primeiro e então usado no app.

---

## Componentes disponíveis

### Formulários
| Componente | Descrição |
|------------|-----------|
| `Button` | 6 variantes: default, secondary, outline, ghost, destructive, link |
| `Input` | Campo de texto com suporte a estados de erro e hint |
| `Label` | Label acessível via Radix |
| `Textarea` | Área de texto com resize |
| `Checkbox` | Checkbox acessível via Radix |
| `RadioGroup` | Grupo de radio buttons via Radix |
| `Switch` | Toggle switch via Radix |
| `Select` | Select nativo acessível via Radix |
| `FormGroup` | Wrapper para Label + Input + mensagem de erro/hint |

### Feedback
| Componente | Variantes |
|------------|-----------|
| `Badge` | default, success, destructive, warning |
| `Alert` | default, success, warning, destructive |

### Layout
| Componente | Descrição |
|------------|-----------|
| `Card` | + `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` |
| `ItemCard` | Card especializado para items de portfólio/listagem |

### Navegação
| Componente | Variantes |
|------------|-----------|
| `Tabs` | pill, underline |
| `ToggleFilter` | Filtro individual |
| `ToggleFilterGroup` | Grupo de filtros com seleção múltipla |

### Identidade
| Componente | Descrição |
|------------|-----------|
| `Avatar` | + `AvatarImage`, `AvatarFallback` via Radix |
| `AvatarWithStatus` | Avatar com indicador de status (online/offline/away) |
| `AvatarGroup` | Grupo de avatares com overlap |

### Dados
| Componente | Descrição |
|------------|-----------|
| `Calendar` | Calendário via react-day-picker |
| `DatePicker` | Seletor de data com popover |
| `Heatmap` | Visualização de heatmap (ex: contribuições GitHub) |

### Estado
| Componente | Variantes |
|------------|-----------|
| `Skeleton` | line, line-short, circle, card |

---

## Tokens de design

| Token | Valor |
|-------|-------|
| **Font sans** | Inter |
| **Font mono** | JetBrains Mono |
| **Radius sm/md/lg/xl/2xl** | 4/6/8/12/16px |
| **Grid de espaçamento** | 4px base (1=4px, 2=8px, 3=12px, 4=16px…) |
| **Font scale** | xs=11px, sm=12px, base=14px, lg=16px, xl=18px, 2xl=20px, 3xl=24px, 4xl=30px |

---

## Dark mode

Suportado via classe `.dark` no elemento raiz. Todas as variáveis CSS têm valor para modo escuro.

- Contraste mínimo: 4.5:1 para texto normal, 3:1 para texto grande
- Sempre testar ambos os modos ao criar novos componentes

---

## Fonte da verdade visual

| Recurso | Localização |
|---------|-------------|
| Design source of truth | `docs/nico.dev.br.pen` (Pencil) |
| Catálogo de componentes | `apps/storybook/` |
| Tokens CSS | `packages/ui/tokens.css` |
| Estilos base | `packages/ui/src/globals.css` |

---

## Ver também

- [[Técnico — Componentes e Design System]]
- [[../../02 - Apps/storybook/Visão Geral]]
- [[../../01 - Projeto/Técnico — Arquitetura e Stack]]
