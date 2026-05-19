# Status do Projeto

> Memória de trabalho persistente. Atualizado pelo `/checkpoint`, lido pelo `/retomar`.
> Não edite manualmente durante uma sessão ativa — use `/checkpoint` antes de fechar.

**Última atualização:** 2026-05-19
**Resumo da última sessão:** Documentação e governança do design system — READMEs de `packages/ui` e `apps/storybook`, protocolo pré-commit no workflow, business rule de `packages/ui` obrigatório, e `/init-project` atualizado.

---

## Feature em andamento

**Spec ativo:** (nenhum — aguardando próxima feature)
**Plano ativo:** (nenhum)

---

## Tasks

### ✅ Concluídas
- Design system completo: 19 componentes, 19 stories, tokens Pencil [0.10.0]
- `packages/ui/README.md` — documentação completa do design system
- `apps/storybook/README.md` — documentação do Storybook
- Protocolo pré-commit adicionado ao workflow (conventions.md + checkpoint.md)
- Business rule de `packages/ui` obrigatório em product.md
- `/init-project` atualizado para fixar `packages/ui` no Bloco 4

### 🔄 Em progresso
- (nenhuma)

### ⏭ Próximos passos
1. Configurar `RESEND_API_KEY` no painel da Vercel (pendente desde sessão do formulário de contato)
2. Verificar domínio `nico.dev.br` no Resend (e-mails saem com `onboarding@resend.dev`)
3. Próxima feature via `/spec` — sugestões:
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

- `apps/web` ainda não migrado para `@nico.dev/ui` — componentes existentes foram criados antes do design system
