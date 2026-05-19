# Plano Técnico: Melhorias no Storybook

**Spec:** `.ai-core/specs/2026-05-19-storybook-improvements.md`
**Status:** ready
**Data:** 2026-05-19

---

## Ordem de execução

```
Tarefa 1 (a11y addon) ──► Tarefa 5 (form stories + play)
Tarefa 2 (dark mode)  ──┐
Tarefa 3 (tokens)     ──┤── paralelas entre si
Tarefa 4 (JSDoc)      ──┤
Tarefa 6 (viewports)  ──┘
```

Tarefa 1 deve ser concluída antes da Tarefa 5. As demais são independentes entre si.

---

## Tarefa 1 — Instalar e configurar @storybook/addon-a11y

**Tipo:** chore
**Agente:** frontend
**Desbloqueia:** Tarefa 5

Instalar o addon de acessibilidade e habilitá-lo no Storybook. Este addon adiciona o painel "Accessibility" que roda `axe-core` em cada story automaticamente.

Critérios de aceite:
- [ ] `@storybook/addon-a11y` instalado como devDependency em `apps/storybook`
- [ ] Adicionado ao array `addons` em `.storybook/main.ts`
- [ ] Painel "Accessibility" aparece no Storybook ao rodar `pnpm dev --filter @nico.dev/storybook`

Notas:
- Versão deve ser compatível com `storybook@^8.6.18` — usar `^8.6.x`
- Comando: `pnpm add -D @storybook/addon-a11y --filter @nico.dev/storybook`

---

## Tarefa 2 — Dark mode toggle na toolbar

**Tipo:** feature
**Agente:** frontend

Adicionar botão de toggle light/dark na toolbar global do Storybook. Ao ativar, aplica a classe `.dark` em `document.documentElement` (o mesmo mecanismo usado pelo Tailwind v4 + CSS custom properties do design system). O estado persiste ao navegar entre stories.

Critérios de aceite:
- [ ] Toolbar do Storybook tem ícone de lua/sol para alternar tema
- [ ] Ao ativar dark: classe `.dark` aplicada em `document.documentElement` do iframe de preview
- [ ] Ao desativar: classe removida
- [ ] Estado persiste ao navegar entre stories (globalTypes mantém o valor)
- [ ] Todos os componentes respondem visualmente ao toggle (tokens CSS mudam)

Notas:

Implementar em `.storybook/preview.tsx` via `globalTypes` + decorator:

```ts
// preview.tsx
export const globalTypes = {
  theme: {
    name: "Theme",
    defaultValue: "light",
    toolbar: {
      icon: "moon",
      items: [
        { value: "light", title: "Light", icon: "sun" },
        { value: "dark",  title: "Dark",  icon: "moon" },
      ],
      dynamicTitle: true,
    },
  },
};
```

Decorator que aplica/remove `.dark`:
```ts
decorators: [
  (Story, context) => {
    const theme = context.globals.theme;
    useEffect(() => {
      const root = document.documentElement;
      theme === "dark" ? root.classList.add("dark") : root.classList.remove("dark");
    }, [theme]);
    return <Story />;
  },
  // decorator existente de bg-background...
];
```

**Não instalar `@storybook/addon-themes`** — o decorator manual é suficiente e mais compatível com Tailwind v4.

---

## Tarefa 3 — Stories de showcase de tokens

**Tipo:** feature
**Agente:** frontend

Criar três stories na categoria `Tokens/` que documentam visualmente o design system: cores, tipografia e espaçamento. Devem funcionar corretamente nos dois modos (light/dark, usando o toggle da Tarefa 2).

Critérios de aceite:
- [ ] Story `Tokens/Colors`: exibe todas as variáveis CSS semânticas com amostra de cor, nome e valor hex (light e dark)
- [ ] Story `Tokens/Typography`: exibe escala xs→4xl nas fontes Inter e JetBrains Mono, com nome e valor px
- [ ] Story `Tokens/Spacing`: exibe blocos visuais para spacing-1 a spacing-8 com nome e valor px
- [ ] As três stories têm `tags: ["autodocs"]` desativado (são stories de documentação, não de componente)
- [ ] As cores mudam corretamente ao usar o dark mode toggle

Notas:

Arquivos a criar:
- `apps/storybook/src/stories/tokens/Colors.stories.tsx`
- `apps/storybook/src/stories/tokens/Typography.stories.tsx`
- `apps/storybook/src/stories/tokens/Spacing.stories.tsx`

Para cores, importar os valores do token JS e também ler as variáveis CSS:
```ts
import { colors } from "@nico.dev/ui/tokens";
```

Story de cores com `parameters: { layout: "fullscreen" }` para ter mais espaço.

Estrutura de cada entrada de cor:
```tsx
<div className="flex items-center gap-3">
  <div className="h-10 w-10 rounded-md border border-border" style={{ background: `var(--primary)` }} />
  <div>
    <p className="text-sm font-medium">primary</p>
    <p className="text-xs text-muted-foreground">#5546E8</p>
  </div>
</div>
```

---

## Tarefa 4 — JSDoc nos 19 componentes de packages/ui

**Tipo:** docs
**Agente:** frontend

Adicionar documentação JSDoc completa em todos os 19 componentes. O objetivo é que o autocomplete do editor (VS Code, WebStorm) exiba descrição, props e exemplo ao usar o componente.

Critérios de aceite:
- [ ] Todos os 19 componentes têm bloco JSDoc antes da função/const do componente principal
- [ ] Cada JSDoc contém: descrição (1-2 frases), `@example` com JSX funcional, e comentário inline em cada valor de variante
- [ ] Cada prop da interface tem comentário TSDoc (`/** ... */` acima da prop)
- [ ] `pnpm --filter "@nico.dev/ui" exec tsc --noEmit` passa sem erros

Notas:

Template obrigatório (aplicar a todos):
```tsx
/**
 * [Descrição — o que é e quando usar.]
 *
 * @example
 * ```tsx
 * <Component variant="default">Conteúdo</Component>
 * ```
 */
```

Props com TSDoc:
```tsx
export interface ButtonProps ... {
  /** Estilo visual do botão. Use "default" para a ação principal da seção. */
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link";
  /** Tamanho do botão. "md" na maioria dos casos; "sm" em contextos compactos. */
  size?: "sm" | "md" | "lg" | "icon";
  /** Renderiza o filho como elemento raiz via Radix Slot (útil para links). */
  asChild?: boolean;
}
```

Componentes a documentar (em ordem sugerida de complexidade):
1. `label.tsx` — simples, sem variantes
2. `input.tsx`
3. `textarea.tsx`
4. `badge.tsx` — 4 variantes
5. `skeleton.tsx`
6. `card.tsx` — subcomponentes (CardHeader, CardTitle, etc.)
7. `button.tsx` — 6 variantes + 4 tamanhos
8. `alert.tsx`
9. `checkbox.tsx`
10. `switch.tsx`
11. `radio.tsx`
12. `select.tsx`
13. `form-group.tsx`
14. `tabs.tsx`
15. `toggle-filter.tsx`
16. `avatar.tsx` — múltiplos exports (Avatar, AvatarImage, AvatarFallback, AvatarWithStatus, AvatarGroup)
17. `calendar.tsx`
18. `date-picker.tsx`
19. `heatmap.tsx`

---

## Tarefa 5 — Stories de formulário composto com play functions

**Tipo:** feature
**Agente:** frontend
**Depende de:** Tarefa 1 (addon-a11y instalado)

Criar duas stories de formulário composto que demonstram uso real dos primitivos de `@nico.dev/ui` combinados, e incluem play functions que simulam interação de usuário e verificam acessibilidade.

Critérios de aceite:
- [ ] Story `Formulários/ContatoForm`: formulário com Nome, E-mail, Mensagem e botão Enviar; exibe estados idle, loading e sucesso
- [ ] Story `Formulários/ValidacaoForm`: formulário com campos obrigatórios; exibe estado de erro por campo e estado de sucesso
- [ ] Ambas as stories têm `play` function que: foca o primeiro campo via Tab, preenche campos com `userEvent.type`, clica em Enviar, verifica que não há violações a11y críticas
- [ ] Play functions passam sem lançar exceções ao clicar "Run interactions" no Storybook
- [ ] Painel Accessibility não reporta violações críticas (nível A/AA) nas duas stories

Notas:

Arquivo a criar: `apps/storybook/src/stories/Composites.stories.tsx`

Imports necessários:
```tsx
import { within, userEvent, expect } from "@storybook/test";
// axe é verificado automaticamente pelo addon — não precisa importar
```

Estrutura da play function:
```tsx
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const nameInput = canvas.getByLabelText("Nome");
  await userEvent.tab();
  await userEvent.type(nameInput, "Roberto");
  // ... demais campos
  await userEvent.click(canvas.getByRole("button", { name: /enviar/i }));
},
```

**Não bloquear o build com as play functions** — são documentação interativa, não suite de CI.

---

## Tarefa 6 — Viewport stories para componentes responsivos

**Tipo:** feature
**Agente:** frontend

Adicionar stories com viewport configurado para componentes que têm comportamento de layout responsivo real: `Card`, `FormGroup` e `AvatarGroup`. Para cada um, criar stories Mobile (375px) e Desktop (1280px).

Critérios de aceite:
- [ ] `Card` tem stories `Mobile` e `Desktop` com `parameters.viewport.defaultViewport` configurado
- [ ] `FormGroup` tem stories `Mobile` e `Desktop`
- [ ] `AvatarGroup` tem stories `Mobile` e `Desktop`
- [ ] As stories usam viewports built-in do Storybook (`"mobile1"` e `"desktop"` do addon-viewport padrão)
- [ ] Cada viewport story demonstra o componente em um contexto real (Card com conteúdo, FormGroup em formulário, AvatarGroup com vários itens)

Notas:

Adicionar nas stories existentes de cada componente:
```tsx
export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    layout: "fullscreen",
  },
  // args do componente...
};

export const Desktop: Story = {
  parameters: {
    viewport: { defaultViewport: "desktop" },
    layout: "fullscreen",
  },
};
```

`"mobile1"` = 320px no addon-viewport padrão do Storybook. Se quiser 375px, definir viewport customizado em `preview.tsx`:
```ts
parameters: {
  viewport: {
    viewports: {
      mobile375: { name: "Mobile 375", styles: { width: "375px", height: "812px" } },
    },
  },
},
```

---

## Checklist de conclusão

- [ ] Tarefa 1 concluída — painel Accessibility visível
- [ ] Tarefa 2 concluída — toggle dark/light funcional na toolbar
- [ ] Tarefa 3 concluída — 3 stories de tokens navegáveis
- [ ] Tarefa 4 concluída — JSDoc nos 19 componentes, `tsc --noEmit` limpo
- [ ] Tarefa 5 concluída — 2 stories compostas com play functions passando
- [ ] Tarefa 6 concluída — viewport stories em Card, FormGroup e AvatarGroup
- [ ] CHANGELOG atualizado em `apps/web-nico.dev.br/docs/CHANGELOG.md`
- [ ] `STATUS.md` atualizado
