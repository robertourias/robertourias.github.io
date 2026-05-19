# Spec: Melhorias no Storybook

**Status:** approved
**Data:** 2026-05-19
**Autor:** Planner Agent

---

## Problema

O Storybook atual cobre as variantes básicas dos 19 componentes de `@nico.dev/ui`, mas não cumpre dois papéis que precisam ser atendidos com o mesmo peso: **documentação técnica para novos devs** e **ferramenta de qualidade** para quem mantém os componentes.

Na frente de documentação: faltam showcase dos tokens de design (um dev precisa abrir o `globals.css` para saber quais cores existem), não há como ver dark mode sem editar código, os componentes não têm JSDoc (o autocomplete do editor é mudo), e não há exemplos de composição — ninguém vê como montar um formulário real com os primitivos disponíveis.

Na frente de qualidade: não há verificação automatizada de acessibilidade, as play functions são inexistentes (não é possível simular interações), e componentes com comportamento responsivo não têm stories que evidenciem isso.

---

## Cenários de Usuário

- **P1:** Como dev novo no monorepo, quero abrir o Storybook e entender quais componentes existem, como usá-los, quais props aceitam e quais tokens aplicar — sem precisar ler o código fonte.
- **P1:** Como dev implementando um formulário, quero ver um exemplo de formulário composto funcional no Storybook para entender como combinar `FormGroup`, `Input`, `Label`, `Button` e tratamento de erro.
- **P2:** Como dev revisando um componente, quero rodar as play functions e o a11y addon para confirmar que o fluxo de formulário é acessível por teclado antes de abrir PR.
- **P2:** Como dev checando responsividade, quero ver no Storybook como `Card` e `FormGroup` se comportam em mobile vs desktop sem precisar redimensionar o browser.
- **P3:** Como designer ou stakeholder, quero abrir o Storybook e ver o showcase de tokens para confirmar que os valores do código refletem o Pencil.

---

## Requisitos Funcionais

### Showcase de Tokens

- **FR-001:** Story `Tokens/Colors` — lista todas as variáveis CSS semânticas com amostra de cor visual, nome da variável e valor hex. Exibe light e dark lado a lado (ou com o toggle ativo).
- **FR-002:** Story `Tokens/Typography` — exibe a escala completa de font-size (xs=11px → 4xl=30px) nas duas famílias tipográficas (`Inter` e `JetBrains Mono`), com nome do token e valor em px.
- **FR-003:** Story `Tokens/Spacing` — exibe o grid de 4px (spacing-1 a spacing-8) como blocos visuais com nome e valor em px ao lado.

### Dark Mode Toggle

- **FR-004:** A toolbar global do Storybook deve ter um botão para alternar entre light e dark mode. Ao ativar, a classe `.dark` é aplicada no elemento raiz do preview. Ao desativar, é removida. O estado deve persistir entre navegações de stories.

### JSDoc nos Componentes

- **FR-005:** Todos os 19 componentes em `packages/ui/src/components/` devem ter JSDoc cobrindo:
  - Descrição do componente em 1-2 frases (o que é e quando usar)
  - Cada prop documentada com `@param`, tipo e descrição
  - `@example` com uso real mínimo (JSX funcional)
  - Descrição de cada valor de variante no tipo (ex: comentário inline em `"default" | "destructive"`)

  Template obrigatório:
  ```tsx
  /**
   * [Descrição do componente — o que é e quando usar.]
   *
   * @example
   * ```tsx
   * <Component variant="default">Conteúdo</Component>
   * ```
   */
  ```

### Stories de Formulário Composto

- **FR-006:** Story `Formulários/ContatoForm` — formulário completo com: campo Nome (`Input` + `Label`), campo E-mail (`Input` + `Label`), campo Mensagem (`Textarea` + `Label`), todos embrulhados em `FormGroup`, e botão Enviar (`Button`). Exibe estado idle, loading e sucesso.
- **FR-007:** Story `Formulários/ValidacaoForm` — formulário com validação visível: campos obrigatórios, estado de erro com mensagem em vermelho via `FormGroup`, e estado de sucesso após submissão correta.

### Play Functions + A11y Addon

- **FR-008:** Instalar `@storybook/addon-a11y` e habilitá-lo em `.storybook/main.ts`.
- **FR-009:** As stories `ContatoForm` e `ValidacaoForm` devem ter `play` functions cobrindo:
  - Foco inicial no primeiro campo via teclado (`Tab`)
  - Preenchimento de campos via `userEvent.type`
  - Submissão via `userEvent.click` no botão ou `Enter`
  - Verificação de que o painel a11y não reporta violações críticas (`axe`)

### Viewport Stories

- **FR-010:** Identificar os componentes de `packages/ui` com comportamento de layout responsivo real. Mínimo esperado: `Card`, `FormGroup`, `AvatarGroup`.
- **FR-011:** Para cada componente identificado, adicionar ao menos duas stories com `parameters.viewport` configurado: `{ defaultViewport: "mobile1" }` (375px) e `{ defaultViewport: "desktop" }` (1280px).

---

## Critérios de Sucesso

- [ ] Storybook rodando tem seção "Tokens" com stories de Cores, Tipografia e Espaçamento navegáveis
- [ ] A toolbar tem botão de dark/light toggle que aplica `.dark` corretamente em todos os componentes
- [ ] Todos os 19 componentes de `packages/ui` têm JSDoc — o autocomplete do editor (VS Code/WebStorm) exibe descrição e exemplo ao usar o componente
- [ ] Existem as stories `Formulários/ContatoForm` e `Formulários/ValidacaoForm` com os estados documentados
- [ ] `@storybook/addon-a11y` está instalado e o painel aparece no Storybook
- [ ] As play functions das duas stories compostas rodam sem erros e o painel a11y não reporta violações críticas
- [ ] `Card`, `FormGroup` e `AvatarGroup` (ou mais, se identificado) têm viewport stories para mobile (375px) e desktop (1280px)
- [ ] `tsc --noEmit` passa sem erros após os JSDoc adicionados

---

## Fora do Escopo

- Play functions em stories de componentes individuais (apenas nas stories compostas)
- Viewport stories para todos os 19 componentes (somente responsivos identificados)
- Deploy público do Storybook (Chromatic, Netlify, etc.)
- Testes de snapshot ou visual regression
- JSDoc em arquivos fora de `packages/ui` (apps, utils, types)
- Internacionalização das stories

---

## Riscos e Premissas

- **Premissa:** `@storybook/addon-a11y` é compatível com Storybook 8.6.x + `@storybook/react-vite`. Verificar antes de instalar.
- **Premissa:** O dark mode toggle pode ser implementado via decorator manual (aplicar/remover `.dark` no `<html>`) sem necessidade de `@storybook/addon-themes` — validar compatibilidade com Tailwind v4 antes de escolher abordagem.
- **Risco:** Play functions com `userEvent` podem ser flaky em ambientes CI → **Mitigação:** não bloquear o build de Storybook nas play functions; tratá-las como documentação interativa, não como suite de CI.
- **Risco:** JSDoc em 19 componentes é trabalho volumoso e propenso a inconsistências de formato → **Mitigação:** o template fixo definido em FR-005 deve ser seguido rigorosamente; revisar todos ao final antes de commitar.

---

<!--
GATE DE APROVAÇÃO
Para desbloquear a criação do plano técnico, altere o Status acima de "draft" para "approved".
O agente planner NÃO deve criar tasks de implementação enquanto Status for "draft".
-->
