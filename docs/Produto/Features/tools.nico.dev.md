---
tags: [feature, subprojeto, tools]
status: planejado
---

# Feature: tools.nico.dev

**Status:** 📅 Planejado

## O que é

Coleção de ferramentas web úteis para desenvolvedores, hospedada em `tools.nico.dev` como um [[Glossário#Subprojeto|subprojeto]] independente no monorepo.

## Ferramentas previstas

| Ferramenta | Descrição |
|-----------|-----------|
| Clima | Previsão do tempo |
| Debugger IA | Análise de erros com IA |
| OCR | Extração de texto de imagens |
| Busca semântica | Busca por similaridade de conteúdo |
| Mercado financeiro | Dados de ações e ativos |
| CLT vs PJ | Calculadora de comparação de regime |

## Características técnicas

- Deploy independente em `tools.nico.dev` (subdomínio)
- Pode ter backend próprio (NestJS) se necessário
- Compartilha `packages/ui` e `packages/utils` do monorepo

> ⚠️ Subprojeto de maior escopo — requer spec detalhada antes de iniciar.

## Links

- [[Arquitetura#Monorepo Structure]]
- [[Roadmap]]
- [[Glossário]]
