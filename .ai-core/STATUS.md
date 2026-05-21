# Status do Projeto

> Memória de trabalho persistente. Atualizado pelo `/checkpoint`, lido pelo `/retomar`.
> Não edite manualmente durante uma sessão ativa — use `/checkpoint` antes de fechar.

**Última atualização:** 2026-05-20
**Resumo da última sessão:** Spec, plano e implementação completa do `ItemCard` no design system — componente adicionado a `packages/ui`, 6 stories no Storybook, cards de `apps/tools` e `apps/challenges` migrados para usar `ItemCard`. Também adicionado botão "Visualizar" em challenges via coluna Preview do README principal do repositório `testes-tecnicos`.

---

## Feature em andamento

**Spec ativo:** (nenhum — ItemCard concluído)
**Plano ativo:** (nenhum)

---

## Tasks

### ✅ Concluídas
- Fix: `github.ts` filtra diretórios que começam com `.`
- Fix: `formatName` trata `--` como separador empresa/projeto (`hurb--projeto` → `Hurb - Projeto`)
- Spec `2026-05-20-item-card.md` criado e aprovado
- Plano `2026-05-20-item-card-plan.md` criado
- Tarefa 1: `ItemCard` criado em `packages/ui/src/components/item-card.tsx` + exportado no barrel
- Tarefa 2: `ItemCard.stories.tsx` criado no Storybook (6 stories)
- Tarefa 3: Home de `apps/tools` migrada para usar `ItemCard` (badge "Em breve" mantido via wrapper)
- Tarefa 4: `ChallengeCard` em `apps/challenges` refatorado para usar `ItemCard`
- Feat: campo `visualizarUrl` adicionado ao `Challenge` + `parsePreviewLinks()` + botão "Visualizar" no card

### 🔄 Em progresso
- (nenhuma)

### ⏭ Próximos passos
1. Verificar visualmente os cards em `apps/tools` e `apps/challenges`: `pnpm --filter @nico.dev/tools dev` e `pnpm --filter @nico.dev/challenges dev`
2. Fazer build de produção para validar: `pnpm --filter @nico.dev/tools build && pnpm --filter @nico.dev/challenges build`
3. Próxima feature via `/spec`: blog, migração `apps/web` para `@nico.dev/ui`, ou animações de entrada
4. Configurar `RESEND_API_KEY` no painel da Vercel (pendente de sessão anterior)

---

## Decisões desta sessão

- **`ItemCard` sem `"use client"`:** Server Component puro; lógica de estado (fallback de imagem) fica no wrapper do app consumidor
- **`ChallengeCard` mantido como wrapper fino:** isola o `"use client"` + `useState` do fallback sem poluir `page.tsx`
- **Badge "Em breve" fora do `ItemCard`:** posicionado absolutamente via wrapper `relative` em `apps/tools` — componente permanece genérico (Opção B do spec)
- **`visualizarUrl` via README principal:** `parsePreviewLinks()` extrai coluna "Preview" da tabela do README de `robertourias/testes-tecnicos` — fetch único antes do `Promise.all`, silencioso em caso de falha

---

## Bloqueadores / Perguntas abertas

- `apps/web` ainda não migrado para `@nico.dev/ui` — componentes existentes foram criados antes do design system
- Dependabot reporta 29 vulnerabilidades no repositório (16 high, 9 moderate, 4 low) — pré-existentes
- `RESEND_API_KEY` e domínio `nico.dev.br` no Resend ainda pendentes de configuração na Vercel
