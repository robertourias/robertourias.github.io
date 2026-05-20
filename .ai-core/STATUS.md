# Status do Projeto

> Memória de trabalho persistente. Atualizado pelo `/checkpoint`, lido pelo `/retomar`.
> Não edite manualmente durante uma sessão ativa — use `/checkpoint` antes de fechar.

**Última atualização:** 2026-05-19
**Resumo da última sessão:** Calculadora CLT vs PJ completa em apps/tools — formulário com CLT/PJ, cálculo progressivo INSS/IRRF 2025, estimativa bidirecional, tabelas de resultado e seção educativa. Build passa limpo.

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
  - [x] Tarefa 3: componente ToolPageHeader
  - [x] Tarefa 4: página /clt-pj completa
  - [x] Tarefa 5: ativar card na home (feito na Tarefa 1)

### ⏭ Próximos passos
1. Verificar calculadora visualmente: `pnpm dev --filter @nico.dev/tools` → http://localhost:3001/clt-pj
2. Configurar `RESEND_API_KEY` no painel da Vercel (pendente)
3. Verificar domínio `nico.dev.br` no Resend
4. Próxima feature: `/spec [blog | migração apps/web para @nico.dev/ui | animações]`

---

## Decisões desta sessão

- **`@source` no globals.css:** Tailwind v4 + `@tailwindcss/vite` não segue symlinks de workspace pnpm em `node_modules` — `@source "./components/**/*.tsx"` é necessário para gerar todas as classes dos componentes
- **Radius com valores absolutos no `@theme inline`:** `var(--radius-sm)` dentro do `@theme inline` criava referência circular — substituído por `4px`, `6px`, etc. diretamente
- **`"use client"` removido dos componentes:** diretiva só faz sentido em Next.js (RSC boundary) — desnecessária em pacote compartilhado consumido pelo Vite/Storybook

---

## Bloqueadores / Perguntas abertas

- `apps/web` ainda não migrado para `@nico.dev/ui` — componentes existentes foram criados antes do design system
