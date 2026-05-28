# Decisões — tools.nico.dev (apps/tools)

Decisões específicas deste app. Desvios em relação aos padrões globais em `docs/context/decisions.md`.

## Descrição

Coleção de ferramentas web para desenvolvedores. Cada tool é uma feature independente dentro do app.

## Estrutura

- Cada ferramenta vive em `src/features/[nome-da-tool]/`
- Ferramentas são client-side por padrão (cálculos, formatadores, conversores)
- Ferramentas que exigem API (ex: busca semântica, OCR) usam Server Actions ou Route Handlers

## Ferramentas planejadas / em andamento

| Tool | Descrição | Status |
|------|-----------|--------|
| CLT vs PJ | Calculadora de benefícios CLT vs PJ | Em andamento |
