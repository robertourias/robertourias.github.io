# Status do Projeto

> Memória de trabalho persistente. Atualizado pelo `/checkpoint`, lido pelo `/retomar`.
> Não edite manualmente durante uma sessão ativa — use `/checkpoint` antes de fechar.

**Última atualização:** 2026-05-19
**Resumo da última sessão:** Calculadora CLT vs PJ entregue do zero — spec aprovado, 5 tarefas implementadas e pushas: integração @nico.dev/ui, lógica de cálculo 2025, página /clt-pj completa com formulário bidirecional, tabelas de resultado e seção educativa.

---

## Feature em andamento

**Spec ativo:** (nenhum — calculadora CLT vs PJ concluída)
**Plano ativo:** (nenhum)

---

## Tasks

### ✅ Concluídas
- Spec e plano da calculadora CLT vs PJ (`2026-05-19-clt-pj-calculator`)
- Tarefa 1: `@nico.dev/ui` integrado em `apps/tools` + tokens migrados para Pencil + `@source` configurado
- Tarefa 2: `apps/tools/src/lib/salary-calculator.ts` — tabelas INSS/IRRF 2025, 4 regimes PJ, busca binária para equivalências
- Tarefa 3: `apps/tools/src/components/tool-page-header.tsx` — header reutilizável com breadcrumb
- Tarefa 4: página `/clt-pj` completa — formulário, tabelas lado a lado, badge "Equivalente estimado", seção educativa
- Tarefa 5: card CLT vs PJ na home ativado como link (feito na Tarefa 1)
- Push para `main` no GitHub

### 🔄 Em progresso
- (nenhuma)

### ⏭ Próximos passos
1. Verificar calculadora visualmente: `pnpm --filter @nico.dev/tools dev` → http://localhost:3001/clt-pj
2. Próxima feature via `/spec`: blog, migração `apps/web` para `@nico.dev/ui`, ou animações de entrada
3. Configurar `RESEND_API_KEY` no painel da Vercel (pendente)
4. Verificar domínio `nico.dev.br` no Resend

---

## Decisões desta sessão

- **Tokens CSS migrados de Material You para Pencil:** `apps/tools` usava tokens `--color-on-surface`, `--color-primary` etc. — substituídos pelos tokens Pencil do design system (`--foreground`, `--primary`, `--border`, etc.) para viabilizar o uso de `@nico.dev/ui`
- **Teto INSS 2025 calculado: R$ 951,63:** O spec mencionava R$ 908,86 (valor 2024). A implementação usa as tabelas 2025 corretas — teto salarial R$ 8.157,41, contribuição máxima ~R$ 951,63
- **`@source` relativo no globals.css:** `../../../../packages/ui/src/**/*.tsx` (relativo ao arquivo CSS) necessário para o Tailwind v4 escanear os componentes do workspace sem seguir symlinks
- **Estimativa bidirecional zerando despesas:** Ao estimar o equivalente PJ para um salário CLT, as despesas fixas são zeradas — responde "quanto preciso faturar para ter o mesmo líquido", desconsiderando custos operacionais do PJ
- **Tarefa 5 antecipada para Tarefa 1:** O card da home foi ativado junto com a migração de tokens, evitando um commit separado desnecessário

---

## Bloqueadores / Perguntas abertas

- `apps/web` ainda não migrado para `@nico.dev/ui` — componentes existentes foram criados antes do design system
- Dependabot reporta 29 vulnerabilidades no repositório (16 high, 9 moderate, 4 low) — pré-existentes, não relacionadas às mudanças desta sessão
