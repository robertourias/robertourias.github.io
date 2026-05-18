# Status do Projeto

> Memória de trabalho persistente. Atualizado pelo `/checkpoint`, lido pelo `/retomar`.
> Não edite manualmente durante uma sessão ativa — use `/checkpoint` antes de fechar.

**Última atualização:** 2026-05-18
**Resumo da última sessão:** Design System completo — tokens sincronizados com Pencil, 19 famílias de componentes implementadas em packages/ui, 19 stories no Storybook, CONTRIBUTING.md e .ai-core/ atualizados.

---

## Feature em andamento

**Spec ativo:** .ai-core/specs/2026-05-18-design-system.md (Status: approved — **implementado e commitado**)
**Plano ativo:** .ai-core/plans/2026-05-18-design-system.md

---

## Tasks

### ✅ Concluídas

**Fase A — Fundação**
- Tokens sincronizados com Pencil (`colors.ts`, `typography.ts`, `radius.ts`, `globals.css`)
- 9 dependências instaladas: `@radix-ui/react-{label,checkbox,radio-group,switch,select,tabs,avatar}`, `react-day-picker`, `date-fns`

**Fase B — Componentes (19 famílias)**
- Formulários: Button (atualizado), Label, Input, Textarea, Checkbox, RadioGroup, Switch, Select, FormGroup
- Feedback: Badge (4 variantes), Alert (4 variantes)
- Layout: Card
- Navegação: Tabs (pill/underline), ToggleFilter
- Identidade: Avatar (sm/md/lg/xl/WithStatus/Group)
- Dados: Calendar, DatePicker, Heatmap
- Estado: Skeleton (4 variantes)
- Barrel export `index.ts` atualizado — TypeScript sem erros

**Fase D — Storybook + Docs**
- 19 stories criadas (18 novas + Button existente)
- `CONTRIBUTING.md` criado na raiz (4 seções)
- `.ai-core/decisions/frontend.md` — seção Design System adicionada
- `.ai-core/agents/frontend.agent.md` — regras Design System adicionadas
- `.ai-core/context/ui-guidelines.md` — reescrito com lista de componentes, tokens e padrões

### 🔄 Em progresso
- (nenhuma — design system entregue por completo)

### ⏭ Próximos passos
1. Verificar visualmente o Storybook: `pnpm dev --filter @nico.dev/storybook` → http://localhost:6006
2. Configurar `RESEND_API_KEY` no painel da Vercel (pendente desde sessão do formulário de contato)
3. Verificar domínio `nico.dev.br` no Resend para usar como remetente (e-mails saem com `onboarding@resend.dev`)
4. Iniciar próxima feature via `/spec` — sugestões: migrar `apps/web` para usar `@nico.dev/ui`, Blog, animações de entrada nas seções

---

## Decisões desta sessão

- **Pencil é a fonte da verdade:** todos os tokens de `packages/ui` foram substituídos pelos valores exatos do Pencil — nenhum valor calculado ou inferido
- **Escopo completo (todas as 47 variantes / 19 famílias):** implementadas em uma única iteração
- **Workflow via CONTRIBUTING.md:** regra "sempre usar @nico.dev/ui" documentada sem enforcement automático por lint — decisão consciente para não bloquear o fluxo atual
- **Heatmap custom:** implementado como CSS grid de células coloridas por intensidade (sem dependência externa)
- **DatePicker sem Radix Popover:** usa `position: absolute` com `useEffect` para fechar ao clicar fora — suficiente para o caso de uso atual
- **dark mode via `.dark`:** corrigido de `:root.dark` para `.dark` (padrão Tailwind v4)

---

## Bloqueadores / Perguntas abertas

- `RESEND_API_KEY` precisa ser configurada no painel da Vercel antes do próximo deploy de produção
- Domínio `nico.dev.br` não verificado no Resend — e-mails saem com remetente `onboarding@resend.dev`
- `apps/web` ainda não foi migrado para usar `@nico.dev/ui` — os componentes existentes lá foram criados antes do design system
