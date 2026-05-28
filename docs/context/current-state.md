# Status do Projeto

> Memória de trabalho persistente. Atualizado pelo `/checkpoint`, lido pelo `/retomar`.
> Não edite manualmente durante uma sessão ativa — use `/checkpoint` antes de fechar.

**Última atualização:** 2026-05-28
**Resumo da última sessão:** Suporte a escopo de app/package nos commands (`/front apps/metronome`, `/back apps/api`, etc.) — back, front, plan, review, retomar e README atualizados.

---

## Feature em andamento

**Spec ativo:** — (nenhum ativo)
**Plano ativo:** — (nenhum ativo)

---

## Tasks

### ✅ Concluídas
- Migração completa de `.ai-core/` → `docs/`
- `docs/context/` preenchido com dados reais (product, conventions, decisions, current-state)
- `docs/architecture/` criado (overview, backend, infra — padrões globais)
- `docs/agents/`, `docs/skills/`, `docs/workflows/`, `docs/commands/` migrados
- `docs/specs/` e `docs/plans/` globais mantidos (specs de turborepo e workflow)
- Auto-mirror de valor bruto entre CLT e PJ + calculadora CLT vs PJ implementada
- **Init subprojeto metronome:** product.md, architecture/overview.md, decisions.md e conventions.md atualizados
- **Reorganização docs distribuída:** cada app/package passou a ter seu próprio `docs/context/`, `docs/plans/`, `docs/specs/`; `ui-guidelines.md` movido para `packages/ui/docs/context/`; `architecture/frontend.md` movido para `apps/web-nico.dev.br/docs/architecture/`; CLAUDE.md atualizado
- **Escopo de app nos commands:** `back`, `front`, `plan`, `review`, `retomar`, `commit` passam a aceitar `apps/<app>` ou `packages/<pkg>` como primeiro argumento para carregar contexto específico + determinar onde salvar artefatos e com qual escopo fazer commit (`tipo(scope): descrição`)

### 🔄 Em progresso
- Subprojeto metronome: documentação criada, implementação ainda não iniciada

### ⏭ Próximos passos
1. Criar spec do metrônomo: `/spec Metrônomo — controle de BPM, beats, timer, stress first beat e subdivisões`
2. Criar o app `apps/metronome/` com Next.js
3. Implementar o metrônomo com Web Audio API
4. Verificar calculadora CLT vs PJ no dev server: `pnpm --filter @nico.dev/tools dev`
5. `apps/web` ainda não migrado para `@nico.dev/ui`

---

## Decisões desta sessão

- **Docs distribuída:** cada app/package tem `docs/context/`, `docs/plans/`, `docs/specs/`; root `docs/` mantém apenas contexto global (conventions, decisions de padrão, product, changelog, commands, agents, skills, workflows)
- **Subprojeto metronome:** app puramente frontend, Web Audio API para som, sem backend/auth/DB; `AudioContext.currentTime` para timing de alta precisão (não `setInterval`)
- **ui-guidelines.md em packages/ui/docs/context/:** a fonte de verdade de guidelines de UI fica junto ao pacote que implementa o design system

---

## Bloqueadores / Perguntas abertas

- `apps/web` ainda não migrado para `@nico.dev/ui`
