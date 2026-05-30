# Spec: Rebalanceamento de Paleta de Cores (Light + Dark)

**Status:** approved
**Data:** 2026-05-30
**Autor:** planner-agent

---

## Problema

O tema escuro atual usa `--background: #080A12` (luminosidade ~4%), tornando a interface quase preta e sem profundidade — surfaces são mal distinguíveis entre si e a experiência visual é cansativa. A referência desejada é o estilo Rocketseat: charcoal escuro com toque indigo/roxo, com warmth e hierarquia visual nítida entre camadas.

O tema claro apresenta contraste excessivo: o foreground `#0A0C1A` sobre o background `#F8F9FF` gera ~18:1 de contraste, bem acima do mínimo WCAG AA (4.5:1). Leitura prolongada fica cansativa. As surfaces do light mode também usam branco puro (`#FFFFFF`) sem diferenciação suave do background.

---

## Cenários de Usuário

- **P1 (crítico):** Como desenvolvedor usando o app em dark mode, quero um fundo charcoal com toque indigo (não preto puro) para que a interface tenha profundidade e seja confortável para uso prolongado.
- **P1 (crítico):** Como desenvolvedor usando o app em light mode, quero um contraste de texto equilibrado (~14:1 ou menos) para que a leitura não canse os olhos.
- **P2 (importante):** Como desenvolvedor, quero que as camadas de surface (background → surface → surface-raised → surface-overlay) sejam visualmente distinguíveis sem depender de bordas, para que a hierarquia da UI fique evidente.
- **P3 (nice-to-have):** Como desenvolvedor, quero que os badges de status (success/warning/destructive) no dark mode tenham fundos com saturação e luminosidade adequadas para leitura do texto sobre eles.

---

## Requisitos Funcionais

- **FR-001:** O `--background` no dark mode deve ter luminosidade entre 8% e 13% (HSL), com matiz no intervalo indigo/slate (220°–240°), eliminando a aparência de preto puro.
- **FR-002:** Cada camada de surface no dark mode deve diferir da camada anterior em pelo menos 4 pontos de luminosidade (L no HSL), criando hierarquia visual sem bordas.
- **FR-003:** O `--foreground` no light mode deve ter contraste entre 12:1 e 15:1 contra o `--background`, dentro do conforto de leitura enquanto mantém WCAG AAA.
- **FR-004:** O `--background` no light mode deve ser off-white com leve toque frio/indigo (não branco puro), e o `--surface` deve ser branco puro para criar separação visual sutil.
- **FR-005:** Todos os tokens de texto (`--foreground`, `--muted-foreground`, `--primary-foreground`, etc.) devem manter contraste mínimo de 4.5:1 WCAG AA contra seus respectivos backgrounds em ambos os temas.
- **FR-006:** Os tokens de badge (destructive/success/warning) no dark mode devem ter luminosidade de background suficiente para que o texto sobre eles seja legível (contraste ≥ 4.5:1).
- **FR-007:** Nenhum token semântico (`bg-primary`, `bg-destructive`, etc.) deve ser removido ou renomeado — apenas os valores hex são alterados.

---

## Critérios de Sucesso

- [ ] Dark `--background` com luminosidade ≥ 8% no HSL e matiz indigo/slate visível
- [ ] Todas as 4 camadas de dark surface (background → surface → surface-raised → surface-overlay) visualmente distinguíveis a olho nu
- [ ] Light `--foreground` com contraste entre 12:1 e 15:1 contra `--background`
- [ ] Nenhuma regressão de contraste: todos os pares texto/fundo mantêm ≥ 4.5:1 WCAG AA
- [ ] Tokens no Storybook (`apps/storybook/`) exibem a paleta atualizada corretamente
- [ ] `packages/ui/tokens.css` é o único arquivo alterado (sem mudança de componentes)

---

## Fora do Escopo

- Alteração de tokens de tipografia, radius ou spacing
- Mudança nos nomes dos tokens (apenas valores hex)
- Ajuste de cores em componentes individuais (os componentes herdam via variáveis CSS)
- Criação de novos tokens além dos existentes
- Suporte a tema adicional (high-contrast, sepia, etc.)
- Atualização do arquivo Pencil (`docs/nico.dev.br.pen`)

---

## Riscos e Premissas

- **Premissa:** Todos os apps do monorepo importam `tokens.css` via `@nico.dev/ui` — a mudança é propagada automaticamente para metronome, tools, web e storybook.
- **Premissa:** O Storybook em `apps/storybook/` serve como validação visual após a mudança.
- **Risco:** Componentes que hardcodam cores hex (não usam variáveis CSS) não receberão o ajuste → Mitigação: grep no repositório antes de implementar para identificar e corrigir ocorrências.
- **Risco:** Novos valores podem quebrar contraste em pares de cor não testados manualmente → Mitigação: verificar os pares mais críticos (foreground/background, muted-foreground/surface, primary/background) com ferramenta de contraste antes de commitar.

---

<!--
GATE DE APROVAÇÃO
Para desbloquear a criação do plano técnico, altere o Status acima de "draft" para "approved".
O agente planner NÃO deve criar tasks de implementação enquanto Status for "draft".
-->
