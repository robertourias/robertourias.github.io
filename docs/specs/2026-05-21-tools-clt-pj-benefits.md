# Spec: Calculadora CLT vs PJ — Benefícios e Painel de Equivalência nos Resultados

**Status:** approved
**Data:** 2026-05-21
**Autor:** planner-agent

---

## Problema

A calculadora CLT vs PJ em `apps/tools` compara apenas o salário líquido pós-impostos, ignorando benefícios relevantes (vale alimentação, vale transporte, outros). Isso distorce a comparação real de remuneração: um CLT com VA de R$ 800/mês pode ser mais vantajoso que o bruto sugere, enquanto um PJ sem benefícios pode ser subestimado. Além disso, quando apenas um lado é preenchido, a informação de equivalência fica escondida num card pré-cálculo; o usuário precisa enxergar esse dado claramente nos resultados, depois de clicar em Calcular.

---

## Cenários de Usuário

- **P1 (crítico):** Como profissional avaliando uma proposta CLT, quero informar meu VA, VT e outros benefícios para que a comparação inclua a remuneração total efetiva, não apenas o salário líquido.
- **P1 (crítico):** Como PJ avaliando converter para CLT, quero ver claramente qual salário bruto CLT me daria a mesma renda total líquida que tenho hoje como PJ.
- **P2 (importante):** Como PJ com benefícios não tributáveis (plano de saúde pago pela empresa, gym pass etc.), quero informar esses benefícios para que o comparativo PJ também reflita a remuneração total.
- **P3 (nice-to-have):** Como usuário lendo os resultados, quero ver o resumo comparativo com linguagem clara nomeando as duas modalidades (ex: "CLT é mais vantajoso: R$ X (Y% acima do PJ)").

---

## Requisitos Funcionais

### Novos campos de entrada

- **FR-001:** O formulário CLT deve aceitar um campo opcional "Vale alimentação" (valor líquido mensal recebido pelo colaborador, em reais). Padrão: 0.
- **FR-002:** O formulário CLT deve aceitar um campo opcional "Vale transporte" (valor líquido recebido pelo colaborador — empresa cobre o excedente; usuário informa o benefício efetivo). Padrão: 0.
- **FR-003:** O formulário CLT deve aceitar um campo opcional "Outros benefícios" (plano de saúde pago pela empresa, auxílio home office, gym pass, etc.). Padrão: 0.
- **FR-004:** O formulário PJ deve aceitar um campo opcional "Outros benefícios" (plano de saúde pago pelo CNPJ já existe como campo separado; este campo cobre benefícios adicionais: gym pass, equipamentos, auxílio home office, etc.). Padrão: 0.

### Cálculo de renda efetiva

- **FR-005:** A renda efetiva CLT é definida como: `netSalary + va + vt + otherBenefitsCLT`. Esse valor é usado como base de comparação em todas as equivalências e no painel de resultados.
- **FR-006:** A renda efetiva PJ é definida como: `netValue + otherBenefitsPJ`. O plano de saúde já descontado do `netValue` (tratamento atual) não é contado em dobro.
- **FR-007:** As funções de estimativa de equivalência (`estimateCLTEquivalent`, `estimatePJEquivalent`) recebem `targetNet` já ajustado para benefícios: ao buscar o CLT equivalente de um PJ, `targetNet = pjEffective - cltBenefitsTotal`; ao buscar o PJ equivalente de um CLT, `targetNet = cltEffective - pjBenefitsTotal`.

### Painel de equivalência nos resultados (somente pós-Calcular, single source)

- **FR-008:** Quando apenas um lado foi preenchido manualmente (single source), o componente `ResultTables` deve exibir, acima das tabelas de breakdown, um painel de equivalência com layout de duas colunas:
  - Coluna 1 (texto): "Para receber a mesma renda efetiva de **[formatBRL(sourceEffective)]** como [modalidade não preenchida], você precisaria de um [rótulo do campo] de:"
  - Coluna 2 (valor destaque): `formatBRL(equivalentGross)` em fonte grande e cor primária.
  - Nota contextual abaixo: regime tributário selecionado e premissas usadas na estimativa.
- **FR-009:** O painel de equivalência **não** é exibido quando ambos os lados foram preenchidos manualmente.

### Texto do comparativo de vantagem

- **FR-010:** O texto comparativo abaixo das tabelas deve seguir o formato: "[Modalidade vencedora] é mais vantajoso: **R$ [diff]** ([pct]% acima do [modalidade perdedora])".
  - Quando PJ vence: "PJ é mais vantajoso: R$ X,XX (Y% acima do CLT)"
  - Quando CLT vence: "CLT é mais vantajoso: R$ X,XX (Y% acima do PJ)"
  - A comparação deve ser feita sobre a **renda efetiva** (net + benefícios) de cada modalidade.
- **FR-011:** O diff e o percentual são sempre positivos (usar `Math.abs`).

### Card de hint pré-cálculo (comportamento existente)

- **FR-012:** O card informativo exibido antes de clicar em Calcular (implementado em sessão anterior) deve usar a **renda efetiva** na descrição e no cálculo da equivalência, considerando os novos campos de benefícios preenchidos até o momento.

---

## Critérios de Sucesso

- [ ] Campos VA, VT e Outros Benefícios aparecem na seção CLT do formulário (todos opcionais, layout consistente com campos existentes).
- [ ] Campo Outros Benefícios aparece na seção PJ do formulário (opcional).
- [ ] Ao calcular com CLT = R$ 10.000 + VA R$ 800, a renda efetiva CLT exibida é R$ 10.000 líquido + R$ 800 = valor correto.
- [ ] O painel de equivalência pós-Calcular (single source) exibe o gross equivalente correto e a linguagem da FR-008.
- [ ] Com ambos os lados preenchidos, o painel de equivalência NÃO aparece.
- [ ] O texto de vantagem diz "CLT é mais vantajoso: R$ X (Y% acima do PJ)" quando CLT vence.
- [ ] O card hint pré-cálculo usa renda efetiva quando benefícios estão preenchidos.
- [ ] TypeScript sem erros (`tsc --noEmit` limpo).
- [ ] Nenhum campo existente foi removido ou quebrado.

---

## Fora do Escopo

- Cálculo automático do desconto de 6% do empregado no VT (tratado como benefício líquido informado pelo usuário — FR-002).
- Cálculo de FGTS como benefício CLT (pode ser futuro).
- Benefícios variáveis / PLR / bônus.
- Persistência de dados entre sessões.
- Testes automatizados (fora do escopo desta iteração, mas a lógica de cálculo deve permanecer pura e testável).

---

## Riscos e Premissas

- **Premissa:** `lucide-react` já foi adicionado a `apps/tools/package.json` na sessão anterior — disponível para uso.
- **Premissa:** A lógica de auto-mirror (preencher o mesmo valor bruto no campo não preenchido) implementada na sessão anterior permanece em vigor e é complementar a este spec.
- **Risco:** Ajuste do `targetNet` para equivalência com benefícios pode gerar resultado inesperado se o usuário preencher benefícios apenas em um lado. → Mitigação: notas contextuais na estimativa deixam claras as premissas usadas (ex: "Estimado com benefícios CLT informados, sem benefícios PJ").
- **Risco:** Adicionar 4 campos novos pode deixar o formulário pesado visualmente. → Mitigação: agrupar VA, VT e Outros Benefícios CLT em subsection "Benefícios" colapsável ou com separador visual dentro do Card CLT.

---

<!-- 
GATE DE APROVAÇÃO
Para desbloquear a criação do plano técnico, altere o Status acima de "draft" para "approved".
O agente planner NÃO deve criar tasks de implementação enquanto Status for "draft".
-->
