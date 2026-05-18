---
tags: [feature, blog]
status: planejado
---

# Feature: Blog

**Status:** 📅 Planejado

## O que é

Seção de artigos técnicos autorais. Serve tanto para posicionamento como referência técnica quanto para SEO orgânico.

## Público

Primariamente a [[Personas#Desenvolvedor|comunidade de desenvolvedores]], mas também recrutadores que querem avaliar profundidade técnica.

## Requisitos funcionais (a definir)

- [ ] Listagem de posts com título, data, tags e resumo
- [ ] Página de post com renderização de Markdown/MDX
- [ ] Sistema de tags/categorias
- [ ] RSS feed
- [ ] SEO (meta tags, Open Graph)

## Decisões a tomar

- **Fonte do conteúdo:** MDX em arquivos (simples, versionado no git) vs. CMS headless (Contentlayer, Sanity, Notion API)
- **Renderização:** SSG por post (melhor performance, SEO) ou ISR
- **Highlighting de código:** Shiki ou Prism

> ⚠️ Abrir `/spec` antes de iniciar implementação.

## Links

- [[Roadmap]]
- [[Visão do Produto]]
