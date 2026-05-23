---
tags: [app, storybook, design-system, componentes, catálogo]
created: 2026-05-21
app: storybook
package: "@nico.dev/storybook"
relacionados:
  - "[[Técnico]]"
  - "[[../../03 - Packages/ui/Visão Geral]]"
---

# storybook — Visão Geral

> Catálogo visual interativo de todos os componentes do `@nico.dev/ui`. A referência viva do design system.

---

## Propósito

O app `storybook` serve como **documentação viva** do design system `@nico.dev/ui`. Ele permite:

- Visualizar todos os componentes disponíveis com suas variantes e estados
- Testar interações e comportamentos de forma isolada
- Verificar acessibilidade dos componentes (addon a11y)
- Servir de referência para devs antes de implementar qualquer UI

---

## Regra de uso

> **Todo componente UI deve ser verificado no Storybook antes de ser usado nos apps.**
>
> Se o componente necessário não existir no Storybook, ele deve ser adicionado a `@nico.dev/ui` primeiro, antes de ser utilizado em qualquer app.

---

## Componentes documentados

O Storybook cobre as seguintes famílias de componentes do `@nico.dev/ui`:

| Categoria | Componentes |
|-----------|-------------|
| **Formulários** | Button, Input, Label, Textarea, Checkbox, RadioGroup, Switch, Select, FormGroup |
| **Feedback** | Badge (4 variantes), Alert (4 variantes) |
| **Layout** | Card (Header, Title, Description, Content, Footer), ItemCard |
| **Navegação** | Tabs (pill/underline), ToggleFilter, ToggleFilterGroup |
| **Identidade** | Avatar, AvatarImage, AvatarFallback, AvatarWithStatus, AvatarGroup |
| **Dados** | Calendar, DatePicker, Heatmap |
| **Estado** | Skeleton (line/line-short/circle/card) |
| **Tokens** | Paleta de cores, tipografia, espaçamento, radius |

---

## Como rodar

```bash
# Subir o Storybook em modo dev
pnpm --filter @nico.dev/storybook dev
# Acessa: http://localhost:6006

# Build estático
pnpm --filter @nico.dev/storybook build
# Output em: apps/storybook/storybook-static/
```

---

## Addons instalados

| Addon | Propósito |
|-------|-----------|
| `@storybook/addon-essentials` | Controls, Actions, Docs, Backgrounds, Viewport |
| `@storybook/addon-a11y` | Verificação de acessibilidade por componente |
| `@storybook/addon-interactions` | Testes de interação play functions |

---

## Ver também

- [[Técnico]]
- [[../../03 - Packages/ui/Visão Geral]]
- [[../../03 - Packages/ui/Técnico — Componentes e Design System]]
