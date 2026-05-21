# Status do Projeto

> Memória de trabalho persistente. Atualizado pelo `/checkpoint`, lido pelo `/retomar`.
> Não edite manualmente durante uma sessão ativa — use `/checkpoint` antes de fechar.

**Última atualização:** 2026-05-21
**Resumo da última sessão:** Evolução completa da calculadora CLT vs PJ em `apps/tools`: campos de benefícios, cálculo de renda efetiva com FGTS/13º/férias, painel de equivalência corrigido (busca binária sobre effectiveIncome), header global com toggle de tema dark/light.

---

## Feature em andamento

**Spec ativo:** `.ai-core/specs/2026-05-21-tools-clt-pj-benefits.md` (Status: approved — **totalmente implementado**)
**Plano ativo:** (nenhum — entregue no commit 7e3fac3)

---

## Tasks

### ✅ Concluídas
- Auto-mirror de valor bruto entre CLT e PJ ao preencher apenas um campo
- Card informativo pré-cálculo com equivalência (renda efetiva)
- Spec `2026-05-21-tools-clt-pj-benefits.md` criado e aprovado
- Campos CLT: Vale Alimentação, Vale Transporte, Outros Benefícios (opcionais)
- Campo PJ: Outros Benefícios (opcional)
- Cálculo de renda efetiva CLT: `netSalary + va + vt + otherBenefits + fgts + decimoTerceiro + abonoFerias`
- Cálculo de renda efetiva PJ: `netValue + otherBenefits`
- Função `estimateCLTEffectiveEquivalent` — busca binária sobre `effectiveIncome` (não `netSalary`)
- Painel de equivalência nos resultados: single-source e both-filled (mostra equivalente para o loser)
- Seção de vantagens/desvantagens CLT vs PJ em `info-section.tsx` (4 cards, ícones Lucide)
- Header global (`SiteHeader`) com toggle de tema Sun/Moon
- Dark mode como padrão (inline script no `layout.tsx`)
- Informativo de plano de saúde médio SP no formulário PJ
- Commit `7e3fac3` com todas as mudanças

### 🔄 Em progresso
- (nenhuma)

### ⏭ Próximos passos
1. Verificar visualmente a calculadora no dev server (`pnpm --filter @nico.dev/tools dev`)
2. Fazer build de produção para validar: `pnpm --filter @nico.dev/tools build`
3. Próxima feature: deploy no Vercel, ou nova ferramenta em `apps/tools`
4. Criar `.ai-core/CHANGELOG.md` para seguir o protocolo pré-commit

---

## Decisões desta sessão

- **`estimateCLTEffectiveEquivalent` separado de `estimateCLTEquivalent`:** a função antiga busca por `netSalary`, a nova por `effectiveIncome`; coexistem para não quebrar o fallback do path morto (`else if hasCLT` apenas)
- **FGTS/13º/abono automáticos:** sempre computados e exibidos no card CLT — são benefícios estatutários que tornam o comparativo CLT vs PJ mais justo
- **Abono de férias = netSalary / 3 / 12:** 1/3 do salário líquido mensal, rateado em 12 meses
- **Painel de equivalência both-filled:** usa `pjConfig` completo (com despesas fixas e plano) ao calcular equivalente PJ; usa `cltConfig` real ao calcular equivalente CLT
- **Dark mode padrão:** script inline só usa light se `localStorage.theme === 'light'`; qualquer outro valor (null, ausente) resulta em dark

---

## Bloqueadores / Perguntas abertas

- `apps/web` ainda não migrado para `@nico.dev/ui`
