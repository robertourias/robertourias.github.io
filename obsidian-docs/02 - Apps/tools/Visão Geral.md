---
tags: [app, tools, nextjs, ferramentas, clt-pj]
created: 2026-05-21
app: tools
package: "@nico.dev/tools"
url: https://tools.nico.dev.br
relacionados:
  - "[[Técnico]]"
  - "[[../../01 - Projeto/Visão Geral]]"
---

# tools — Visão Geral

> Coleção de ferramentas web para desenvolvedores e profissionais de tecnologia, hospedada em `tools.nico.dev`.

---

## Propósito

O app `tools` é um subprojeto do monorepo que agrupa micro-ferramentas úteis para devs. Cada ferramenta é uma página independente dentro do app Next.js, com foco em utilidade prática e boa experiência de uso.

A proposta é demonstrar capacidade técnica com produtos funcionando — não apenas código no GitHub.

---

## Ferramentas disponíveis

| Ferramenta | Rota | Descrição | Status |
|------------|------|-----------|--------|
| **Calculadora CLT vs PJ** | `/clt-pj` | Compara renda efetiva CLT × PJ com benefícios, FGTS, 13º, férias e plano de saúde | 🟢 Implementado |

### Ferramentas planejadas (roadmap)

| Ferramenta | Descrição |
|------------|-----------|
| **Debugger IA** | Análise de erros e stack traces com IA |
| **OCR** | Extração de texto de imagens |
| **Busca semântica** | Busca por similaridade em documentos |
| **Mercado financeiro** | Consulta de dados de ativos |
| **Clima** | Previsão do tempo com geolocalização |

---

## Calculadora CLT vs PJ — detalhe

A principal ferramenta implementada calcula e compara:

**Lado CLT:**
- Salário bruto → líquido (INSS + IRPF)
- Vale Alimentação, Vale Transporte, Outros Benefícios
- FGTS mensal, 13º salário (rateado), Abono de férias (1/3)
- **Renda efetiva total** = líquido + benefícios + encargos trabalhistas

**Lado PJ:**
- Valor bruto → líquido (impostos PJ estimados)
- Despesas fixas (contador, DAS, etc.)
- Plano de saúde (referência: custo médio SP)
- **Renda efetiva total** = líquido + benefícios extras

**Equivalência:** Calcula o salário CLT bruto equivalente à renda PJ (via busca binária sobre `effectiveIncome`) e vice-versa.

**UI features:**
- Auto-mirror de valor bruto entre os campos
- Dark mode como padrão (toggle Sun/Moon no header)
- Card informativo pré-cálculo com equivalência estimada
- Seção de vantagens/desvantagens CLT vs PJ

---

## Público-alvo

- Desenvolvedores considerando transição CLT → PJ ou vice-versa
- Profissionais avaliando propostas em regimes diferentes
- Recrutadores entendendo como Roberto constrói ferramentas úteis

---

## Ver também

- [[Técnico]]
- [[../../01 - Projeto/Visão Geral]]
- [[../../03 - Packages/ui/Visão Geral]]
