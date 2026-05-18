---
tags: [feature, portfólio]
status: live
---

# Feature: Portfólio

**Status:** ✅ Live

## O que é

Galeria de projetos e trabalhos de Roberto Nicoletti. Cada projeto exibe descrição, tecnologias utilizadas e links (repositório, demo ao vivo ou subdomínio).

## Componentes principais

- **Carrossel de Projetos em Destaque** — implementado com Embla Carousel
  - Loop infinito nativo
  - Responsivo: 1 card (mobile), 2 (tablet), 3 (desktop)
  - Botões Anterior/Próximo no tablet/desktop
  - Dots dinâmicos via `scrollSnapList()`
  - 6 projetos exibidos
- **Grid de projetos** — listagem completa (planejado)
- **Tags de tecnologia** — filtro por stack (planejado)

## Entidades do domínio

- `Project` — projeto com título, descrição, imagem, tags e links
- `SubprojectLink` — referência a uma aplicação em subdomínio
- `Tag` — tecnologia ou categoria

## Decisões técnicas

- Carrossel migrado de implementação manual (clone-based) para **Embla Carousel** em 2026-05-17
  - Motivo: loop infinito nativo, menos código frágil com refs e `transitionend`
- Responsividade via CSS (`flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%]`) — sem JS de resize

## Links

- [[Roadmap]]
- [[Arquitetura#Domain Model]]
