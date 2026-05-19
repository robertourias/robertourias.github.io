# Status do Projeto

> Memória de trabalho persistente. Atualizado pelo `/checkpoint`, lido pelo `/retomar`.
> Não edite manualmente durante uma sessão ativa — use `/checkpoint` antes de fechar.

**Última atualização:** 2026-05-19
**Resumo da última sessão:** Storybook improvements completos — addon-a11y, dark mode toggle, showcase de tokens (cores/tipo/spacing), JSDoc nos 19 componentes, stories compostas com play functions e viewport stories.

---

## Feature em andamento

**Spec ativo:** (nenhum — aguardando próxima feature)
**Plano ativo:** (nenhum)

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
- (nenhuma)

### ⏭ Próximos passos
1. Verificar Storybook visualmente: `pnpm dev --filter @nico.dev/storybook` → http://localhost:6006
2. Configurar `RESEND_API_KEY` no painel da Vercel (pendente)
3. Verificar domínio `nico.dev.br` no Resend
4. Próxima feature via `/spec`:
   - Migrar `apps/web` para usar `@nico.dev/ui`
   - Blog
   - Animações de entrada nas seções

---

## Decisões desta sessão

- **`@source` no globals.css:** Tailwind v4 + `@tailwindcss/vite` não segue symlinks de workspace pnpm em `node_modules` — `@source "./components/**/*.tsx"` é necessário para gerar todas as classes dos componentes
- **Radius com valores absolutos no `@theme inline`:** `var(--radius-sm)` dentro do `@theme inline` criava referência circular — substituído por `4px`, `6px`, etc. diretamente
- **`"use client"` removido dos componentes:** diretiva só faz sentido em Next.js (RSC boundary) — desnecessária em pacote compartilhado consumido pelo Vite/Storybook

---

## Bloqueadores / Perguntas abertas

- `apps/web` ainda não migrado para `@nico.dev/ui` — componentes existentes foram criados antes do design system
