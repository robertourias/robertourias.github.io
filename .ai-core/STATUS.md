# Status do Projeto

> Memória de trabalho persistente. Atualizado pelo `/checkpoint`, lido pelo `/retomar`.
> Não edite manualmente durante uma sessão ativa — use `/checkpoint` antes de fechar.

**Última atualização:** 2026-05-18
**Resumo da última sessão:** Design system entregue e corrigido — Tailwind v4 fix no Storybook (`@source` para escanear workspace symlinks), CHANGELOG promovido para [0.10.0].

---

## Feature em andamento

**Spec ativo:** .ai-core/specs/2026-05-18-design-system.md (Status: approved — **entregue e fechado**)
**Plano ativo:** .ai-core/plans/2026-05-18-design-system.md

---

## Tasks

### ✅ Concluídas
- Spec e plano técnico do design system
- Tokens sincronizados com Pencil (colors, typography, radius, globals.css)
- 9 deps Radix UI + react-day-picker + date-fns instaladas
- 19 famílias de componentes em `packages/ui` (TypeScript clean)
- 19 stories no Storybook
- CONTRIBUTING.md + .ai-core/ atualizados
- Fix Tailwind v4: `@source "./components/**/*.tsx"` em globals.css
- Fix radius circular var() no `@theme inline`
- Fix `"use client"` removido de calendar.tsx e date-picker.tsx
- CHANGELOG promovido para [0.10.0]

### 🔄 Em progresso
- (nenhuma)

### ⏭ Próximos passos
1. Verificar Storybook visualmente: `pnpm dev --filter @nico.dev/storybook` → http://localhost:6006
2. Configurar `RESEND_API_KEY` no painel da Vercel (pendente desde sessão do formulário de contato)
3. Verificar domínio `nico.dev.br` no Resend (e-mails saem com `onboarding@resend.dev`)
4. Próxima feature via `/spec` — sugestões:
   - Migrar `apps/web` para usar `@nico.dev/ui` nos componentes existentes
   - Blog
   - Animações de entrada nas seções

---

## Decisões desta sessão

- **`@source` no globals.css:** Tailwind v4 + `@tailwindcss/vite` não segue symlinks de workspace pnpm em `node_modules` — `@source "./components/**/*.tsx"` é necessário para gerar todas as classes dos componentes
- **Radius com valores absolutos no `@theme inline`:** `var(--radius-sm)` dentro do `@theme inline` criava referência circular — substituído por `4px`, `6px`, etc. diretamente
- **`"use client"` removido dos componentes:** diretiva só faz sentido em Next.js (RSC boundary) — desnecessária em pacote compartilhado consumido pelo Vite/Storybook

---

## Bloqueadores / Perguntas abertas

- `RESEND_API_KEY` precisa ser configurada no painel da Vercel antes do próximo deploy de produção
- Domínio `nico.dev.br` não verificado no Resend — e-mails saem com remetente `onboarding@resend.dev`
- `apps/web` ainda não migrado para `@nico.dev/ui` — componentes existentes foram criados antes do design system
