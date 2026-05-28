# Spec: Calculadora CLT vs PJ

**Status:** approved
**Data:** 2026-05-19
**Autor:** planner-agent

---

## Problema

Profissionais de tecnologia frequentemente precisam comparar se vale mais a pena trabalhar como CLT ou como PJ para uma determinada remuneração. O cálculo envolve tabelas progressivas de INSS e IRRF (CLT) e regimes tributários diferentes (Simples Nacional, Lucro Presumido, MEI) para PJ — o que torna a comparação manual trabalhosa e sujeita a erro.

A ferramenta resolve isso em segundos: o usuário informa os valores de um regime (ou dos dois) e obtém uma comparação clara do salário líquido lado a lado.

---

## Cenários de Usuário

- **P1 (crítico):** Como profissional avaliando uma proposta CLT, quero informar meu salário bruto e ver o líquido após INSS + IRRF, para saber quanto vou receber no bolso.
- **P1 (crítico):** Como profissional avaliando uma proposta PJ, quero informar o valor do contrato e o regime tributário, para ver quanto fica disponível após impostos e despesas.
- **P1 (crítico):** Como profissional comparando propostas, quero preencher apenas um regime e ver o equivalente do outro, para entender qual é mais vantajoso sem precisar pesquisar fórmulas.
- **P2 (importante):** Como usuário que acabou de ver o resultado, quero entender como o cálculo foi feito, para confiar nos números e aprender sobre as diferenças entre os regimes.
- **P3 (nice-to-have):** Como usuário que quer tentar cenários diferentes, quero um botão de "Refazer cálculo" que limpa os campos, para experimentar outros valores rapidamente.

---

## Requisitos Funcionais

### Formulário

- **FR-001:** A página deve ter um formulário com **duas seções independentes**: "CLT" e "PJ". O usuário pode preencher uma, a outra ou ambas.

- **FR-002:** Seção CLT deve conter:
  - Salário bruto (R$) — obrigatório para calcular CLT
  - Número de dependentes para IRRF (default: 0)
  - Outros descontos em folha (plano de saúde, vale-transporte descontado, etc.) — opcional

- **FR-003:** Seção PJ deve conter:
  - Valor do contrato/faturamento mensal (R$) — obrigatório para calcular PJ
  - Regime tributário: Simples Nacional (Anexo III), Simples Nacional (Anexo V), Lucro Presumido, MEI
  - Pró-labore mensal (R$) — usado para calcular INSS e IRRF do sócio; default: salário mínimo vigente (R$ 1.518)
  - Despesas fixas mensais (R$): contador, infraestrutura, etc. — opcional, default: 0
  - Plano de saúde pago pelo CNPJ (R$) — opcional, default: 0

- **FR-004:** Se apenas uma seção for preenchida (tem valor no campo obrigatório e a outra está vazia), o sistema deve calcular automaticamente o equivalente do outro regime mantendo o líquido aproximadamente igual, exibindo-o como "equivalente estimado".

- **FR-005:** O formulário deve ter um botão "Calcular" que dispara o cálculo e um botão "Refazer cálculo" que limpa todos os campos e esconde o resultado.

### Cálculo CLT

- **FR-006:** INSS CLT calculado pela tabela progressiva vigente 2025:
  - Até R$ 1.518,00 → 7,5%
  - De R$ 1.518,01 até R$ 2.793,88 → 9%
  - De R$ 2.793,89 até R$ 4.190,83 → 12%
  - De R$ 4.190,84 até R$ 8.157,41 → 14%
  - Teto de INSS: R$ 908,86/mês
  - Cálculo é progressivo (cada faixa aplica sua alíquota apenas ao valor dentro dela)

- **FR-007:** IRRF CLT calculado sobre (Salário Bruto − INSS − R$ 189,59 por dependente), pela tabela progressiva vigente 2025:
  - Até R$ 2.259,20 → isento
  - De R$ 2.259,21 até R$ 2.826,65 → 7,5% (dedução R$ 169,44)
  - De R$ 2.826,66 até R$ 3.751,05 → 15% (dedução R$ 381,44)
  - De R$ 3.751,06 até R$ 4.664,68 → 22,5% (dedução R$ 662,77)
  - Acima de R$ 4.664,68 → 27,5% (dedução R$ 896,00)

- **FR-008:** Salário líquido CLT = Salário Bruto − INSS − IRRF − Outros descontos

### Cálculo PJ

- **FR-009:** Imposto sobre faturamento por regime:
  - **MEI:** alíquota fixa R$ 75,90/mês (INSS + ISS/ICMS, faturamento máximo R$ 81.000/ano ≈ R$ 6.750/mês)
  - **Simples Nacional Anexo III** (ex: TI/consultoria): alíquota efetiva sobre faturamento conforme Tabela do Simples 2025 (progressiva por receita bruta acumulada 12 meses — usar alíquota base da 1ª faixa: até R$ 180k/ano → 6%, efetiva ≈ 6%)
  - **Simples Nacional Anexo V** (serviços profissionais intensivos em capital): faixa 1 → alíquota base 15,5% sobre faturamento (efetiva varia)
  - **Lucro Presumido:** presunção de 32% para serviços → IRPJ 15% + CSLL 9% + PIS 0,65% + COFINS 3% + ISS 2% sobre faturamento (carga total ~17% sobre faturamento para serviços)

- **FR-010:** INSS do sócio (pró-labore): 11% sobre o pró-labore (contribuinte individual), limitado ao teto de R$ 908,86/mês.

- **FR-011:** IRRF do sócio: calculado sobre (pró-labore − INSS do sócio) usando a mesma tabela progressiva do FR-007.

- **FR-012:** Líquido PJ = Faturamento − Impostos sobre faturamento − INSS sócio − IRRF sócio − Despesas fixas − Plano de saúde

### Resultado

- **FR-013:** Exibir duas tabelas lado a lado (CLT | PJ) com as seguintes linhas:
  - Salário/Faturamento Bruto
  - (−) INSS
  - (−) IRRF
  - (−) Impostos PJ (apenas coluna PJ)
  - (−) Despesas fixas (apenas coluna PJ, se preenchido)
  - **= Salário/Valor Líquido** (destacado)
  - Diferença absoluta e percentual entre os líquidos (linha de rodapé)

- **FR-014:** Quando um regime for calculado como "equivalente estimado" (FR-004), a tabela correspondente deve exibir um badge "Equivalente estimado" e uma nota explicando a premissa usada.

- **FR-015:** Após o resultado, exibir uma seção informativa com:
  - Como é feito o cálculo CLT (INSS progressivo, IRRF, 13º salário, FGTS — contexto)
  - Como é feito o cálculo PJ (regimes tributários, pró-labore, carga tributária comparativa)
  - Principais diferenças (FGTS, férias, 13º, previdência, riscos do PJ)
  - Nota: "Este cálculo é uma estimativa. Consulte um contador para decisões financeiras importantes."

### Navegação e Layout

- **FR-016:** A página deve usar o mesmo cabeçalho da página inicial de `apps/tools` (componente ou markup reutilizado), com:
  - Link "tools.nico.dev" apontando para `/` (raiz do projeto)
  - Título da ferramenta: "Calculadora CLT vs PJ"
  - Descrição curta da ferramenta

- **FR-017:** A URL da página deve ser `/clt-pj` em `apps/tools` (Next.js App Router: `src/app/clt-pj/page.tsx`).

- **FR-018:** A ferramenta "CLT vs PJ" na página inicial (`/`) deve deixar de exibir "Em breve" e passar a ser um link ativo para `/clt-pj`.

- **FR-019:** Todo o UI deve usar `packages/ui` como biblioteca de componentes (business rule do projeto). Não instalar shadcn, MUI ou outras libs de componentes no app.

---

## Critérios de Sucesso

- [ ] Usuário informa salário CLT de R$ 10.000 com 0 dependentes e obtém resultado com INSS e IRRF corretos (verificável contra tabelas vigentes)
- [ ] Usuário informa faturamento PJ de R$ 15.000, Simples Anexo III, pró-labore R$ 2.000, despesas R$ 500 e obtém valor líquido coerente
- [ ] Usuário preenche apenas a seção CLT (R$ 8.000) e vê o equivalente PJ estimado automaticamente
- [ ] Usuário preenche apenas a seção PJ e vê o equivalente CLT estimado automaticamente
- [ ] Botão "Refazer cálculo" limpa todos os campos e esconde o resultado
- [ ] Seção informativa é exibida após o resultado do cálculo
- [ ] Link "tools.nico.dev" no header aponta para `/`
- [ ] Card "CLT vs PJ" na home (`/`) está ativo e leva para `/clt-pj`
- [ ] Não há dependências de componentes fora de `packages/ui` e primitivos HTML

---

## Fora do Escopo

- Cálculo de 13º salário, férias e FGTS como valor mensal estimado no líquido (mencionado apenas na seção informativa como vantagem CLT)
- Comparação com outros regimes além dos 4 listados (MEI, Simples III, Simples V, Lucro Presumido)
- Persistência de resultados ou histórico de cálculos
- Compartilhamento de resultado por link
- Simulação de deduções legais do IRRF além de dependentes (previdência privada, livro-caixa, etc.)
- Versão mobile-first avançada com steps separados (ambas as seções ficam no mesmo formulário em todos os breakpoints)

---

## Riscos e Premissas

- **Premissa:** As tabelas de INSS e IRRF usadas são as vigentes em 2025 (devem ser armazenadas como constantes no código para fácil atualização anual).
- **Premissa:** O cálculo de "equivalente estimado" (FR-004) usa iteração numérica simples: ajusta o valor bruto do outro regime até que o líquido calculado seja igual ao do regime preenchido (tolerância ± R$ 1,00).
- **Risco:** Alíquotas do Simples Nacional variam conforme o faturamento acumulado nos últimos 12 meses, que é desconhecido → Mitigação: usar a 1ª faixa de cada Anexo como estimativa, com nota explicativa visível ao usuário.
- **Risco:** `packages/ui` pode não ter todos os componentes necessários (tabela, input monetário, select) → Mitigação: verificar no início da implementação e criar/estender componentes em `packages/ui` antes de implementar a página.
- **Premissa:** O app `apps/tools` já está funcionando com Next.js App Router — a nova rota é adicionada sem alterar a infraestrutura existente.

---

<!-- 
GATE DE APROVAÇÃO
Para desbloquear a criação do plano técnico, altere o Status acima de "draft" para "approved".
O agente planner NÃO deve criar tasks de implementação enquanto Status for "draft".
-->
