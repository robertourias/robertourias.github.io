# Status do Projeto

> Memória de trabalho persistente. Atualizado pelo `/checkpoint`, lido pelo `/retomar`.
> Não edite manualmente durante uma sessão ativa — use `/checkpoint` antes de fechar.

**Última atualização:** 2026-05-19
**Resumo da última sessão:** Iniciada feature calculadora CLT vs PJ em apps/tools — Tarefa 1 concluída: @nico.dev/ui integrado, tokens migrados para Pencil, home page atualizada com link ativo para /clt-pj.

---

## Feature em andamento

**Spec ativo:** `.ai-core/specs/2026-05-19-clt-pj-calculator.md` (approved)
**Plano ativo:** `.ai-core/plans/2026-05-19-clt-pj-calculator.md`

---

## Tasks

### ✅ Concluídas
- Design system completo: 19 componentes, 19 stories, tokens Pencil [0.10.0]
- READMEs de `packages/ui` e `apps/storybook`
- Protocolo pré-commit + business rule de `packages/ui` obrigatório
- Storybook improvements (spec 2026-05-19):
  - `@storybook/addon-a11y` instalado e configurado
  - Dark mode toggle na toolbar (globalTypes + decorator)
  - Stories `Tokens/Colors`, `Tokens/Typography`, `Tokens/Spacing`
  - JSDoc completo nos 19 componentes de `packages/ui`
  - Stories compostas `Formulários/Compostos` com play functions
  - Viewport stories Mobile/Desktop em Card, FormGroup e AvatarGroup

### 🔄 Em progresso
- Calculadora CLT vs PJ (`apps/tools/src/app/clt-pj/`)
  - [x] Tarefa 1: @nico.dev/ui integrado + tokens Pencil + home page atualizada
  - [x] Tarefa 2: lógica de cálculo (`src/lib/salary-calculator.ts`)
  - [ ] Tarefa 3: componente ToolPageHeader
  - [ ] Tarefa 4: página /clt-pj completa
  - [ ] Tarefa 5: ativar card na home (já feito junto com Tarefa 1)

### ⏭ Próximos passos
1. `/front Tarefa 2 — lógica de cálculo salary-calculator.ts`
2. `/front Tarefa 3 — ToolPageHeader`
3. `/front Tarefa 4 — página /clt-pj`
4. Configurar `RESEND_API_KEY` no painel da Vercel (pendente)
5. Verificar domínio `nico.dev.br` no Resend

---

## Decisões desta sessão

- **`@source` no globals.css:** Tailwind v4 + `@tailwindcss/vite` não segue symlinks de workspace pnpm em `node_modules` — `@source "./components/**/*.tsx"` é necessário para gerar todas as classes dos componentes
- **Radius com valores absolutos no `@theme inline`:** `var(--radius-sm)` dentro do `@theme inline` criava referência circular — substituído por `4px`, `6px`, etc. diretamente
- **`"use client"` removido dos componentes:** diretiva só faz sentido em Next.js (RSC boundary) — desnecessária em pacote compartilhado consumido pelo Vite/Storybook

---

## Bloqueadores / Perguntas abertas

- `apps/web` ainda não migrado para `@nico.dev/ui` — componentes existentes foram criados antes do design system
