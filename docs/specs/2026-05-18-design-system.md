# Spec: Design System — packages/ui sincronizado com Pencil

**Status:** approved
**Data:** 2026-05-18
**Autor:** planner agent

---

## Problema

O `packages/ui` foi criado como estrutura inicial mas está desatualizado em relação ao design definido no arquivo Pencil (`docs/nico.dev.br.pen`), que é a fonte da verdade visual do projeto. Há três gaps críticos:

1. **Tokens divergentes**: as cores, tipografia, espaçamento e radius em `packages/ui/src/tokens/` diferem dos valores definidos no Pencil (ex: `primary` light é `#5546E8` no Pencil vs `#4f46e5` no código).
2. **Componentes ausentes**: o Pencil define 47 componentes (19 famílias), mas `packages/ui` só possui `Button`. Os demais não existem como código — Input, Badge, Card, Alert, Tabs, Avatar, Skeleton, Calendar, DatePicker, Heatmap, etc.
3. **Workflow não enforced**: não há documentação que oriente devs a sempre consumir `packages/ui` ao construir novas features em `apps/web` ou subprojetos.

Sem resolver isso, cada nova feature reinventa estilos ad-hoc, o design system acumula drift e o Storybook permanece vazio.

---

## Cenários de Usuário

- **P1 (crítico):** Como desenvolvedor neste monorepo, quero importar qualquer componente do design system (`Button`, `Badge`, `Input`, `Card`, etc.) de `@repo/ui` com tipagem completa, para não criar CSS ou componentes duplicados em cada app.
- **P1 (crítico):** Como desenvolvedor, quero que os tokens CSS (`--primary`, `--background`, etc.) sejam derivados do Pencil, para que o código e o design visual estejam sempre sincronizados.
- **P2 (importante):** Como desenvolvedor, quero navegar pelo Storybook e ver cada componente com suas variantes documentadas, para usar o design system como referência sem abrir o Pencil.
- **P2 (importante):** Como novo colaborador, quero ler um `CONTRIBUTING.md` que explique como contribuir com features usando o design system, para não ter que adivinhar o processo.
- **P3 (nice-to-have):** Como agente de IA, quero que os arquivos `.ai-core/` descrevam o design system e o workflow de features, para aplicar as regras automaticamente ao receber uma tarefa.

---

## Requisitos Funcionais

### Tokens (sincronização com Pencil)
- **FR-001:** Todos os tokens de cor em `packages/ui/src/tokens/colors.ts` devem refletir exatamente os valores do Pencil para os modos `light` e `dark`, incluindo: `background`, `foreground`, `surface`, `surface-raised`, `surface-overlay`, `primary`, `primary-foreground`, `primary-hover`, `secondary`, `secondary-foreground`, `muted`, `muted-foreground`, `accent`, `accent-foreground`, `border`, `input`, `ring`, `destructive`, `destructive-foreground`, `success`, `success-foreground`, `warning`, `warning-foreground`, `badge-destructive-bg`, `badge-success-bg`, `badge-warning-bg`.
- **FR-002:** `packages/ui/src/globals.css` deve expor todos os tokens acima como variáveis CSS (`--primary`, `--background`, etc.) nos seletores `:root` (light) e `.dark` (dark).
- **FR-003:** Os tokens de tipografia devem incluir `font-sans: Inter` e `font-mono: JetBrains Mono` (vindos do Pencil), com font-sizes: xs=11px, sm=12px, base=14px, lg=16px, xl=18px, 2xl=20px, 3xl=24px, 4xl=30px.
- **FR-004:** Os tokens de radius do Pencil devem ser aplicados: sm=4px, md=6px, lg=8px, xl=12px, 2xl=16px.
- **FR-005:** Os tokens de spacing do Pencil devem ser aplicados: 1=4px, 2=8px, 3=12px, 4=16px, 5=20px, 6=24px, 8=32px.

### Componentes (packages/ui)
- **FR-006:** `packages/ui` deve exportar os seguintes componentes React com TypeScript, usando `cva` + `@radix-ui` onde aplicável, consumindo exclusivamente tokens do próprio pacote:
  - **Formulários:** `Button` (atualizado), `Input`, `Label`, `FormGroup`, `Textarea`, `Checkbox`, `Radio`, `Switch`, `Select`
  - **Feedback:** `Badge` (variantes: default, success, destructive, warning), `Alert` (variantes: default, success, warning, destructive)
  - **Layout:** `Card`
  - **Navegação:** `Tabs` (variantes: pill, underline), `ToggleFilter`
  - **Identidade:** `Avatar` (tamanhos: sm, md, lg, xl; com `withStatus` e `group`)
  - **Dados:** `Calendar`, `DatePicker`, `Heatmap`
  - **Estado:** `Skeleton` (variantes: line, line-short, circle, card)
- **FR-007:** Cada componente deve exportar seu tipo de props e, onde aplicável, os `variants` do `cva` para extensibilidade.
- **FR-008:** `packages/ui/src/index.ts` deve re-exportar todos os componentes e tokens como barrel export.

### Storybook
- **FR-009:** Cada componente de `packages/ui` deve ter uma story em `apps/storybook/src/stories/` com ao menos: story `Default` e stories cobrindo todas as variantes principais.
- **FR-010:** O Storybook deve carregar `globals.css` do `packages/ui` para que os tokens CSS estejam disponíveis nas stories.
- **FR-011:** O Storybook deve estar funcional (`pnpm storybook`) sem erros de build após a implementação.

### Workflow e documentação
- **FR-012:** Criar `CONTRIBUTING.md` na raiz do monorepo documentando: (a) como usar componentes de `packages/ui`, (b) como adicionar novos componentes ao design system, (c) como sincronizar tokens com o Pencil, (d) convenção de nomes de stories no Storybook.
- **FR-013:** Atualizar `.ai-core/decisions/frontend.md` para registrar: "Todos os componentes UI devem vir de `packages/ui`. Nenhum componente deve ser criado diretamente em `apps/web` ou subprojetos sem antes existir (ou ser adicionado) ao design system."
- **FR-014:** Atualizar `.ai-core/agents/frontend.agent.md` para incluir instrução de sempre verificar `packages/ui` antes de criar qualquer elemento visual.
- **FR-015:** Atualizar `.ai-core/context/ui-guidelines.md` com: lista de componentes disponíveis, referência ao Pencil como fonte da verdade, e instrução de consultar o Storybook como referência visual.

---

## Critérios de Sucesso

- [ ] `pnpm build --filter=@repo/ui` conclui sem erros TypeScript
- [ ] `pnpm storybook` abre e exibe stories de todos os 19 componentes sem erros de console
- [ ] Importar `import { Button, Badge, Card, Input } from "@repo/ui"` em `apps/web` funciona sem ajuste de tsconfig
- [ ] As variáveis CSS `--primary`, `--background`, `--foreground`, `--border` no browser refletem exatamente os valores do Pencil para light e dark mode
- [ ] `CONTRIBUTING.md` existe na raiz com as 4 seções definidas no FR-012
- [ ] `.ai-core/decisions/frontend.md` contém a regra do design system
- [ ] `.ai-core/agents/frontend.agent.md` referencia `packages/ui` como primeira checagem antes de criar componentes

---

## Fora do Escopo

- Migração do `apps/web` para usar os novos componentes (será feita em feature separada, pós design system)
- Testes unitários/E2E dos componentes (escopo de uma iteração futura)
- Dark mode toggle na UI do site (separado)
- Publicação do `packages/ui` como pacote npm público
- Animações e motion tokens além dos já definidos em `tokens/motion.ts`
- Componentes não presentes no Pencil (ex: Modal, Drawer, Toast, Tooltip) — serão adicionados quando o Pencil for atualizado

---

## Riscos e Premissas

- **Premissa:** O arquivo `docs/nico.dev.br.pen` é acessível via MCP do Pencil durante a implementação para leitura de componentes individuais via `batch_get`.
- **Premissa:** `@radix-ui`, `class-variance-authority`, `clsx` e `tailwind-merge` já estão disponíveis ou podem ser adicionados ao `packages/ui`.
- **Risco:** Calendar e DatePicker são componentes complexos que podem exigir dependências adicionais (ex: `react-day-picker`) → Mitigação: verificar dependências antes de iniciar esses dois componentes; se muito custosos, entregá-los em uma segunda iteração dentro do mesmo plano.
- **Risco:** Heatmap não tem equivalente em biblioteca — precisa ser implementado do zero em SVG/Canvas → Mitigação: implementar como componente simples baseado no layout Pencil sem animações; adiar versão interativa.
- **Risco:** Mudança nos tokens (FR-001/FR-002) pode quebrar estilos existentes em `apps/web` que dependem dos valores antigos → Mitigação: mapear quais classes Tailwind em `apps/web` usam os tokens afetados antes de alterar; ajustar se necessário.

---

<!--
GATE DE APROVAÇÃO
Para desbloquear a criação do plano técnico, altere o Status acima de "draft" para "approved".
O agente planner NÃO deve criar tasks de implementação enquanto Status for "draft".
-->
