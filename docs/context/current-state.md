# Status do Projeto

> Memória de trabalho persistente. Atualizado pelo `/checkpoint`, lido pelo `/retomar`.
> Não edite manualmente durante uma sessão ativa — use `/checkpoint` antes de fechar.

**Última atualização:** 2026-05-23
**Resumo da última sessão:** Migração da estrutura `.ai-core/` para o novo padrão `docs/` — arquivos de contexto, agentes, skills, workflows, commands, specs e plans migrados; `.claude/CLAUDE.md` e commands atualizados para referenciar `docs/`.

---

## Feature em andamento

**Spec ativo:** — (último spec entregue: `docs/specs/2026-05-21-tools-clt-pj-benefits.md` — Status: approved, totalmente implementado)
**Plano ativo:** — (nenhum ativo)

---

## Tasks

### ✅ Concluídas
- Migração completa de `.ai-core/` → `docs/`
- `docs/context/` preenchido com dados reais (product, conventions, ui-guidelines, decisions, current-state)
- `docs/architecture/` criado (overview preenchido, backend/frontend/infra como templates vivos)
- `docs/agents/` migrado com referências atualizadas
- `docs/skills/` criado (backend, frontend, architecture, quality)
- `docs/workflows/` migrado com referências atualizadas
- `docs/commands/` migrado do novo padrão
- `docs/changelog/` criado com histórico
- `docs/specs/` e `docs/plans/` migrados do `.ai-core/`
- `.claude/CLAUDE.md` atualizado para o novo padrão
- `.claude/commands/commit.md` adicionado
- Auto-mirror de valor bruto entre CLT e PJ ao preencher apenas um campo
- Calculadora CLT vs PJ com campos de benefícios, renda efetiva e toggle de tema (commit `7e3fac3`)

### 🔄 Em progresso
- (nenhuma)

### ⏭ Próximos passos
1. Verificar visualmente a calculadora no dev server (`pnpm --filter @nico.dev/tools dev`)
2. Fazer build de produção para validar: `pnpm --filter @nico.dev/tools build`
3. Próxima feature: deploy no Vercel, ou nova ferramenta em `apps/tools`
4. `apps/web` ainda não migrado para `@nico.dev/ui`

---

## Decisões desta sessão

- **Migração `.ai-core/` → `docs/`:** nova estrutura com `docs/skills/` separando regras técnicas dos agentes, `docs/architecture/` expandido em 4 arquivos, `docs/changelog/` baseado em data, `docs/commands/commit.md` adicionado, decisions consolidados em arquivo único
- **`estimateCLTEffectiveEquivalent` separado de `estimateCLTEquivalent`:** a função antiga busca por `netSalary`, a nova por `effectiveIncome`; coexistem para não quebrar o fallback do path morto
- **Dark mode padrão:** script inline só usa light se `localStorage.theme === 'light'`; qualquer outro valor resulta em dark

---

## Bloqueadores / Perguntas abertas

- `apps/web` ainda não migrado para `@nico.dev/ui`
