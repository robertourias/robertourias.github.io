# Plano Técnico: Design System — packages/ui sincronizado com Pencil

**Spec:** `.ai-core/specs/2026-05-18-design-system.md`
**Status:** ready
**Data:** 2026-05-18

---

## Contexto técnico

- Pacote: `@nico.dev/ui` (em `packages/ui/`) — Tailwind v4, React 19, TypeScript
- Storybook: `apps/storybook/` — `@storybook/react-vite` v8, já importa `@nico.dev/ui/globals.css`
- Componentes existentes: apenas `Button` — todos os demais a criar
- Tokens atuais em `globals.css` e `tokens/colors.ts` diferem do Pencil — serão substituídos
- Fonte da verdade: `docs/nico.dev.br.pen` via MCP do Pencil

## Dependências a adicionar em `packages/ui`

```
@radix-ui/react-label
@radix-ui/react-checkbox
@radix-ui/react-radio-group
@radix-ui/react-switch
@radix-ui/react-select
@radix-ui/react-tabs
@radix-ui/react-avatar
react-day-picker        ← Calendar e DatePicker
date-fns               ← peer dep do react-day-picker
```

---

## Ordem de execução

```
Tarefa 1 (tokens)
  → Tarefa 2 (deps)
    → Tarefa 3 (Label, Input, Textarea)
    → Tarefa 4 (Checkbox, Radio, Switch, Select)
    → Tarefa 5 (Badge, Alert, Card)
    → Tarefa 6 (Tabs, ToggleFilter)
    → Tarefa 7 (Avatar)
    → Tarefa 8 (Calendar, DatePicker, Heatmap)
    → Tarefa 9 (Skeleton, FormGroup)
      → Tarefa 10 (barrel exports + build check)
        → Tarefa 11 (stories Storybook)
          → Tarefa 12 (documentação .ai-core + CONTRIBUTING.md)
```

Tarefas 3–9 são paralelas entre si (sem dependência mútua). Tarefa 10 depende de todas.

---

## Tarefa 1: Sincronizar tokens com o Pencil
Tipo: chore
Agente: frontend

Substituir todos os valores de tokens em `packages/ui/src/tokens/` e `globals.css` pelos valores exatos do Pencil. O Pencil é a única fonte de verdade — nenhum valor deve ser calculado ou inferido.

**Tokens de cor (Pencil — light / dark):**
```
background:         #F8F9FF / #080A12
foreground:         #0A0C1A / #EEEEF8
surface:            #FFFFFF  / #0F1120
surface-raised:     #F0F1FA  / #171A2E
surface-overlay:    #E4E6F8  / #20243C
primary:            #5546E8  / #6B5CF8
primary-foreground: #FFFFFF  / #FFFFFF
primary-hover:      #4032D6  / #8073FF
secondary:          #8B5CF6  / #BF81FF
secondary-foreground: #FFFFFF / #080A12
muted:              #F0F1FA  / #171A2E
muted-foreground:   #64658A  / #7B7E9E
accent:             #EBE9FF  / #1B1E38
accent-foreground:  #4032D6  / #A89BFF
border:             #DDE0F5  / #1E2240
input:              #DDE0F5  / #1E2240
ring:               #5546E8  / #6B5CF8
destructive:        #CF2E2E  / #FF4444
destructive-foreground: #FFFFFF / #FFFFFF
success:            #0F7A41  / #1ED97A
success-foreground: #FFFFFF  / #080A12
warning:            #C96D00  / #FFAA20
warning-foreground: #FFFFFF  / #080A12
badge-destructive-bg: #FFE4E4 / #220808
badge-success-bg:   #DCFCE7  / #0C2218
badge-warning-bg:   #FEF3C7  / #231800
```

**Tipografia (Pencil):**
```
font-sans: Inter
font-mono: JetBrains Mono
font-sizes: xs=11px, sm=12px, base=14px, lg=16px, xl=18px,
            2xl=20px, 3xl=24px, 4xl=30px
```

**Radius (Pencil):**
```
sm=4px, md=6px, lg=8px, xl=12px, 2xl=16px
```
- Remover a abordagem `calc(var(--radius) ± Npx)` — substituir por valores absolutos no `@theme inline`

**Spacing:** manter o existente (os valores Pencil são um subconjunto — sem conflito)

**globals.css:**
- Adicionar tokens `--badge-destructive-bg`, `--badge-success-bg`, `--badge-warning-bg` nos seletores `:root` e `.dark`
- Corrigir seletor de dark mode: usar `.dark` (não `:root.dark`) — padrão do Tailwind v4
- Adicionar `--color-badge-*` no `@theme inline`
- Corrigir `--radius-*` para valores absolutos (não calc)

Critérios de aceite:
- [ ] `packages/ui/src/tokens/colors.ts` — todos os valores batem com o Pencil
- [ ] `packages/ui/src/tokens/typography.ts` — font-family Inter/JetBrains Mono, font-sizes do Pencil
- [ ] `packages/ui/src/tokens/radius.ts` — valores absolutos: sm=4px, md=6px, lg=8px, xl=12px, 2xl=16px
- [ ] `packages/ui/src/globals.css` — `:root` e `.dark` com todos os tokens (incluindo badge-*); `@theme inline` completo
- [ ] Inspecionar visualmente no Storybook que `bg-primary`, `bg-background`, `text-foreground` refletem as novas cores

Notas: Esta tarefa afeta o `apps/web` — após aplicar, verificar se alguma classe Tailwind em `apps/web` quebra com os novos valores de tokens.

---

## Tarefa 2: Instalar dependências Radix UI e react-day-picker
Tipo: chore
Agente: frontend

Adicionar ao `packages/ui/package.json` as dependências necessárias para os componentes que dependem de primitivas Radix e do react-day-picker.

```bash
pnpm add --filter @nico.dev/ui \
  @radix-ui/react-label \
  @radix-ui/react-checkbox \
  @radix-ui/react-radio-group \
  @radix-ui/react-switch \
  @radix-ui/react-select \
  @radix-ui/react-tabs \
  @radix-ui/react-avatar \
  react-day-picker \
  date-fns
```

Critérios de aceite:
- [ ] Todas as deps listadas aparecem em `packages/ui/package.json`
- [ ] `pnpm install` completa sem erros no workspace

Notas: Sem alteração de código nesta tarefa — apenas manifesto.

---

## Tarefa 3: Componentes de formulário simples (Label, Input, Textarea)
Tipo: feature
Agente: frontend

Criar os três componentes de formulário sem interatividade complexa. `Label` usa `@radix-ui/react-label`. `Input` e `Textarea` são elementos HTML estilizados com `cva` consumindo tokens de `--input`, `--border`, `--ring`, `--muted-foreground`.

Arquivos a criar:
- `packages/ui/src/components/label.tsx`
- `packages/ui/src/components/input.tsx`
- `packages/ui/src/components/textarea.tsx`

Antes de implementar: usar `batch_get` no Pencil (IDs: `f1BE8`, `cFDnN`, `WcApv`) para confirmar visual exato de cada componente (padding, radius, border, font-size).

Critérios de aceite:
- [ ] `Label` usa `@radix-ui/react-label`, suporta prop `htmlFor`, `required` (asterisco visual), `disabled`
- [ ] `Input` suporta variantes `default` e `error` (border-destructive), props `disabled`, `placeholder`, `type`
- [ ] `Textarea` suporta `rows`, `disabled`, `error` — mesmas classes base do Input
- [ ] TypeScript sem erros (`pnpm tsc --noEmit`)

Notas: Focus ring deve usar `--ring` com `ring-offset-background`.

---

## Tarefa 4: Componentes de formulário interativos (Checkbox, Radio, Switch, Select)
Tipo: feature
Agente: frontend

Criar quatro componentes usando primitivas Radix UI. Todos devem respeitar acessibilidade (teclado, ARIA) e usar tokens de cor do design system.

Arquivos a criar:
- `packages/ui/src/components/checkbox.tsx` → `@radix-ui/react-checkbox`
- `packages/ui/src/components/radio.tsx` → `@radix-ui/react-radio-group`
- `packages/ui/src/components/switch.tsx` → `@radix-ui/react-switch`
- `packages/ui/src/components/select.tsx` → `@radix-ui/react-select`

Antes de implementar: `batch_get` nos IDs `VuXfm` (Checkbox), `xfRBu` (Radio), `CABvF` (Switch), `GROt8` (Select).

Critérios de aceite:
- [ ] Checkbox: suporta `checked`, `indeterminate`, `disabled`, `onCheckedChange`; ícone de check via Lucide (`Check`)
- [ ] Radio: exporta `RadioGroup` e `RadioGroupItem`; suporta `value`, `disabled`
- [ ] Switch: suporta `checked`, `onCheckedChange`, `disabled`; thumb anima horizontalmente
- [ ] Select: exporta `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectValue`; suporta `disabled`, `placeholder`
- [ ] TypeScript sem erros

Notas: Select deve ter `z-index` adequado no `SelectContent` para não ficar sob outros elementos.

---

## Tarefa 5: Badge, Alert, Card
Tipo: feature
Agente: frontend

Três componentes puramente CSS — sem primitivas Radix. Todos usam `cva`.

Arquivos a criar:
- `packages/ui/src/components/badge.tsx`
- `packages/ui/src/components/alert.tsx`
- `packages/ui/src/components/card.tsx`

Antes de implementar: `batch_get` nos IDs `XoYl1`, `mjnZi`, `j5TAY`, `UJIkb` (Badge variants), `GP0u9`, `x92yX`, `bdYRd`, `s3DpcO` (Alert variants), `us12e` (Card).

**Badge:** variantes `default | success | destructive | warning`. Cada variante usa o token `badge-*-bg` de fundo.

**Alert:** variantes `default | success | warning | destructive`. Exporta `Alert`, `AlertTitle`, `AlertDescription`. Usa ícones Lucide: `Info`, `CheckCircle`, `AlertTriangle`, `XCircle`.

**Card:** exporta `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`. Usa `--surface`, `--border`, `--radius-lg`.

Critérios de aceite:
- [ ] Badge: 4 variantes com cores corretas do Pencil; suporta `asChild`
- [ ] Alert: 4 variantes; ícone inline; `AlertTitle` em `font-semibold`, `AlertDescription` em `text-sm`
- [ ] Card: sub-componentes separados; `CardHeader` com `gap-1.5`, `CardFooter` com `border-t`
- [ ] TypeScript sem erros

---

## Tarefa 6: Tabs e ToggleFilter
Tipo: feature
Agente: frontend

`Tabs` usa `@radix-ui/react-tabs`. `ToggleFilter` é um componente controlado sem Radix (toggle pill sem estado nativo de browser).

Arquivos a criar:
- `packages/ui/src/components/tabs.tsx`
- `packages/ui/src/components/toggle-filter.tsx`

Antes de implementar: `batch_get` nos IDs `kXw2E`, `ZxZAK` (Tabs), `uzFwx`, `UNEE8`, `t9RYjb` (ToggleFilter).

**Tabs:** exporta `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`. Suporta variantes `pill` e `underline` via cva no `TabsList`/`TabsTrigger`.

**ToggleFilter:** exporta `ToggleFilter` (item) e `ToggleFilterGroup` (wrapper). Item recebe `active: boolean`, `onToggle`, `value`. Group gerencia seleção única ou múltipla via `mode: "single" | "multiple"`.

Critérios de aceite:
- [ ] Tabs/pill: background no TabsList, border-radius nos triggers ativos
- [ ] Tabs/underline: border-bottom no trigger ativo, sem background no TabsList
- [ ] ToggleFilter: item ativo usa `bg-primary text-primary-foreground`; inativo usa `bg-muted text-muted-foreground`
- [ ] TypeScript sem erros

---

## Tarefa 7: Avatar
Tipo: feature
Agente: frontend

`Avatar` usa `@radix-ui/react-avatar`. Suporta 4 tamanhos, estado com indicador de status e grupo (pilha de avatares).

Arquivo a criar:
- `packages/ui/src/components/avatar.tsx`

Antes de implementar: `batch_get` nos IDs `U4TIKt`, `wSdSk`, `GkN5a`, `C6ObP`, `e7VqJ1`, `YVF2z`.

Exporta: `Avatar`, `AvatarImage`, `AvatarFallback`, `AvatarWithStatus`, `AvatarGroup`.

**Tamanhos via cva:** sm=24px, md=32px, lg=40px, xl=48px.

**WithStatus:** anel colorido (online=success, away=warning, offline=muted) posicionado `absolute bottom-0 right-0`.

**Group:** wrapper com `flex`, itens com `ring-2 ring-background` e `ml-[-8px]` exceto o primeiro.

Critérios de aceite:
- [ ] AvatarFallback com iniciais (2 letras) e bg `bg-muted`
- [ ] AvatarWithStatus: prop `status: "online" | "away" | "offline"`
- [ ] AvatarGroup: prop `max?: number` — trunca com "+N" como último avatar
- [ ] TypeScript sem erros

---

## Tarefa 8: Calendar, DatePicker e Heatmap
Tipo: feature
Agente: frontend

Os três componentes mais complexos. Calendar e DatePicker usam `react-day-picker`. Heatmap é implementação custom em SVG/grade CSS.

Arquivos a criar:
- `packages/ui/src/components/calendar.tsx`
- `packages/ui/src/components/date-picker.tsx`
- `packages/ui/src/components/heatmap.tsx`

Antes de implementar: `batch_get` nos IDs `aUZNm` (Calendar), `LP8xd` (DatePicker), `oAKDu` (Heatmap).

**Calendar:** wrapper sobre `DayPicker` do `react-day-picker`. Estilizar com tokens via `classNames` prop. Suporta `mode: "single" | "range"`, `selected`, `onSelect`, `disabled`.

**DatePicker:** composição de `Calendar` + botão trigger + Popover (implementar Popover simples via `useState` + `position: absolute` — sem Radix Popover para evitar dep extra). Prop `value: Date | undefined`, `onChange`, `placeholder`.

**Heatmap:** grade de células coloridas por intensidade (ex: contribuições GitHub). Props: `data: { date: string; value: number }[]`, `colorScale?: string[]` (padrão: 5 tons do token `--primary`). Implementar como grid CSS (`grid-template-columns: repeat(53, 1fr)`). Tooltip de célula via `title` HTML nativo.

Critérios de aceite:
- [ ] Calendar: navegação entre meses, highlight do dia atual, seleção single e range
- [ ] DatePicker: abre/fecha ao clicar; fecha ao selecionar data; formata data como `dd/MM/yyyy` via `date-fns`
- [ ] Heatmap: renderiza células proporcionalmente coloridas; aceita dados vazios graciosamente
- [ ] TypeScript sem erros

Notas: Se `react-day-picker` v9 tiver breaking changes de API, verificar via `context7-mcp` antes de implementar.

---

## Tarefa 9: Skeleton e FormGroup
Tipo: feature
Agente: frontend

Skeleton é animação CSS pura (pulse). FormGroup compõe Label + Input + mensagem de erro.

Arquivos a criar:
- `packages/ui/src/components/skeleton.tsx`
- `packages/ui/src/components/form-group.tsx`

Antes de implementar: `batch_get` nos IDs `GJeQu`, `UyvcZ`, `rICoC`, `Sld4J` (Skeleton), `UhYSw` (FormGroup).

**Skeleton:** variantes via cva: `line` (w-full h-4), `line-short` (w-1/2 h-4), `circle` (rounded-full), `card` (w-full h-32). Animação: `animate-pulse bg-muted`.

**FormGroup:** wrapper que compõe `Label` + filho (slot para Input/Select/etc) + `<p>` de erro opcional. Props: `label`, `error?: string`, `required?: boolean`, `children`. O `Label` deve ter `htmlFor` igual ao `id` do input filho — usar `React.Children.map` ou exigir `id` como prop.

Critérios de aceite:
- [ ] Skeleton: `animate-pulse` com `bg-muted`; círculo perfeitamente redondo
- [ ] FormGroup: quando `error` presente, exibe texto em `text-destructive text-sm`; `Label` fica em `text-destructive` também
- [ ] TypeScript sem erros

---

## Tarefa 10: Barrel exports + verificação de build
Tipo: chore
Agente: frontend

Atualizar `packages/ui/src/index.ts` para re-exportar todos os 19 componentes e verificar que o build TypeScript passa.

Critérios de aceite:
- [ ] `index.ts` exporta: `Button`, `Input`, `Label`, `Textarea`, `Checkbox`, `RadioGroup`, `RadioGroupItem`, `Switch`, `Select` (+ sub-componentes), `Badge`, `Alert`, `AlertTitle`, `AlertDescription`, `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`, `ToggleFilter`, `ToggleFilterGroup`, `Avatar`, `AvatarImage`, `AvatarFallback`, `AvatarWithStatus`, `AvatarGroup`, `Calendar`, `DatePicker`, `Heatmap`, `Skeleton`, `FormGroup`
- [ ] `pnpm tsc --noEmit --filter @nico.dev/ui` sem erros
- [ ] `import { Button, Badge, Card, Input } from "@nico.dev/ui"` funciona em `apps/web` sem erro de módulo

---

## Tarefa 11: Stories no Storybook
Tipo: feature
Agente: frontend

Criar uma story por família de componente em `apps/storybook/src/stories/`. Cada story deve ter pelo menos: `Default` e stories para as variantes principais.

Convenção de nomes de arquivo: `<ComponentName>.stories.tsx`

Estrutura mínima de cada arquivo:
```ts
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "@nico.dev/ui";

const meta = { title: "UI/<ComponentName>", component: ComponentName } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { ... } };
export const Variant: Story = { args: { variant: "..." } };
```

Stories a criar (19 arquivos):
`Button`, `Input`, `Label`, `Textarea`, `Checkbox`, `Radio`, `Switch`, `Select`, `Badge`, `Alert`, `Card`, `Tabs`, `ToggleFilter`, `Avatar`, `Calendar`, `DatePicker`, `Heatmap`, `Skeleton`, `FormGroup`

Critérios de aceite:
- [ ] `pnpm dev --filter @nico.dev/storybook` abre sem erros de console
- [ ] Todas as 19 stories aparecem na sidebar do Storybook
- [ ] Cada story renderiza com as cores corretas dos tokens (verificar visualmente `primary`, `background`, `border`)
- [ ] Story de `Button` atualizada para refletir novos tokens (deletar conteúdo antigo se necessário)

Notas: Storybook já importa `globals.css` no `preview.tsx` — não duplicar o import.

---

## Tarefa 12: Documentação — CONTRIBUTING.md e .ai-core/
Tipo: chore
Agente: frontend

Criar e atualizar documentação para formalizar o workflow do design system.

**CONTRIBUTING.md** (novo arquivo na raiz):
```
1. Como usar componentes de @nico.dev/ui
2. Como adicionar novo componente ao design system
3. Como sincronizar tokens com o Pencil (MCP)
4. Convenção de nomes de stories no Storybook
```

**`.ai-core/decisions/frontend.md`** — adicionar seção:
```
## Design System
- Todos os componentes UI devem vir de `@nico.dev/ui` (packages/ui/)
- Nenhum componente deve ser criado diretamente em `apps/web` ou subprojetos
  sem primeiro existir (ou ser adicionado) ao design system
- Fonte da verdade visual: `docs/nico.dev.br.pen` via MCP do Pencil
- Referência de componentes disponíveis: `apps/storybook/`
```

**`.ai-core/agents/frontend.agent.md`** — adicionar regra não-negociável:
```
### Design System
- Antes de criar qualquer elemento visual, verificar se o componente já existe em `@nico.dev/ui`
- Se não existir, adicioná-lo ao design system ANTES de usar no app
- Tokens de cor: sempre via variáveis CSS (--primary, etc.) — nunca hex direto
```

**`.ai-core/context/ui-guidelines.md`** — substituir seções "a definir" por:
```
- Design tokens source: docs/nico.dev.br.pen (Pencil) — fonte da verdade
- Component library: @nico.dev/ui (packages/ui/)
- Storybook: apps/storybook/ (referência visual)
- Fontes: Inter (sans), JetBrains Mono (mono)
- Lista de componentes disponíveis: [os 19 do design system]
```

Critérios de aceite:
- [ ] `CONTRIBUTING.md` existe na raiz com as 4 seções
- [ ] `decisions/frontend.md` contém a seção "Design System" com as 3 regras
- [ ] `agents/frontend.agent.md` contém a seção "Design System" nas regras não-negociáveis
- [ ] `context/ui-guidelines.md` sem seções "a definir" — todas preenchidas com valores do Pencil

---

## Riscos e decisões abertas

| # | Risco | Decisão |
|---|-------|---------|
| 1 | `react-day-picker` v9 pode ter API diferente do esperado | Verificar com `context7-mcp` antes de implementar Tarefa 8 |
| 2 | Mudança de tokens em Tarefa 1 pode quebrar `apps/web` | Após Tarefa 1, rodar `pnpm build --filter @nico.dev/web` e ajustar |
| 3 | DatePicker sem Radix Popover pode ter z-index issues | Testar dentro de modals; adicionar Radix Popover se necessário |
| 4 | Heatmap com muitos dados pode ser lento | Limitar a 53 semanas × 7 dias = 371 células; sem virtualização necessária |
| 5 | Storybook pode falhar se algum componente tiver import circular | Checar com `pnpm build --filter @nico.dev/storybook` após Tarefa 11 |
