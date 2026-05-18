# Status do Projeto

> Memória de trabalho persistente. Atualizado pelo `/checkpoint`, lido pelo `/retomar`.
> Não edite manualmente durante uma sessão ativa — use `/checkpoint` antes de fechar.

**Última atualização:** 2026-05-18
**Resumo da última sessão:** Spec e plano técnico do Design System criados — sincronização de tokens do Pencil com `packages/ui`, implementação de 19 famílias de componentes, Storybook e documentação de workflow.

---

## Feature em andamento

**Spec ativo:** .ai-core/specs/2026-05-18-design-system.md (Status: approved)
**Plano ativo:** .ai-core/plans/2026-05-18-design-system.md

---

## Tasks

### ✅ Concluídas
- Spec do Design System gerado e aprovado (`.ai-core/specs/2026-05-18-design-system.md`)
- Plano técnico com 12 tarefas decompostas e ordenadas (`.ai-core/plans/2026-05-18-design-system.md`)

### 🔄 Em progresso
- (nenhuma — plano pronto, implementação ainda não iniciada)

### ⏭ Próximos passos
1. Executar **Tarefa 1**: sync tokens do Pencil em `packages/ui/src/tokens/` e `globals.css` — comando: `/front Tarefa 1 do plano 2026-05-18-design-system — sync tokens`
2. Executar **Tarefa 2**: instalar deps Radix UI e react-day-picker em `packages/ui` — comando: `/front Tarefa 2`
3. Executar Tarefas 3–9 em paralelo (componentes de formulário, feedback, layout, navegação, avatar, dados, estado)
4. Executar **Tarefa 10**: barrel exports + verificação de build
5. Executar **Tarefa 11**: stories Storybook (19 arquivos)
6. Executar **Tarefa 12**: CONTRIBUTING.md + updates em `.ai-core/`

---

## Decisões desta sessão

- **Pencil é a fonte da verdade para tokens:** todos os valores de `packages/ui/src/tokens/` serão substituídos pelos valores exatos do arquivo `docs/nico.dev.br.pen` via MCP do Pencil
- **Todos os 47 componentes (19 famílias):** escopo completo, sem priorização — implementar tudo nesta iteração
- **Workflow via CONTRIBUTING.md (sem lint automático):** a regra "sempre usar packages/ui" será documentada em `CONTRIBUTING.md` na raiz e nos arquivos `.ai-core/` — sem enforcement por ferramentas nesta iteração
- **Dependências Radix UI confirmadas:** Label, Checkbox, RadioGroup, Switch, Select, Tabs, Avatar — cada um com seu primitivo Radix dedicado
- **Calendar/DatePicker via react-day-picker + date-fns**
- **Heatmap:** implementação custom CSS grid (53 colunas × 7 linhas), sem dependência extra

---

## Bloqueadores / Perguntas abertas

- `react-day-picker` v9 pode ter breaking changes — verificar com `context7-mcp` antes de iniciar Tarefa 8
- Mudança de tokens (Tarefa 1) pode afetar visual de `apps/web` — rodar `pnpm build --filter @nico.dev/web` após Tarefa 1 para detectar regressões
