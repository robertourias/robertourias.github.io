---
tags: [glossário, domínio, referência]
---

# Glossário

> Termos do domínio usados de forma consistente em código, documentação e conversas.
> Use sempre estes termos exatos — não sinônimos — em nomes de variáveis, comentários e design de API.

---

## Termos do Domínio

### Monorepo
Repositório único gerenciado com **Turborepo** contendo o site principal (`apps/web`) e todos os subprojetos. Packages compartilhados ficam em `packages/`.

### Site Principal
A aplicação `apps/web`, hospedada em `nico.dev`, que contém portfólio, blog, currículo e formulário de contato.

### Subprojeto
Aplicação separada dentro do monorepo Turborepo com deploy próprio em um subdomínio de `nico.dev` (ex: `projeto.nico.dev`). Cada subprojeto tem ciclo de vida e pipeline de deploy independentes. Compartilha packages do monorepo (`packages/ui`, `packages/utils`) mas é autônomo.

### Portfólio
Seção do site principal que exibe os projetos e trabalhos de Roberto Nicoletti, com descrição, tecnologias e links.

### BlogPost
Artigo técnico autoral publicado no blog de `nico.dev` (feature planejada). Entidade do domínio com título, conteúdo, data e tags.

### Project
Entidade do domínio que representa um trabalho ou projeto exibido no portfólio. Contém: título, descrição, imagem, tecnologias (Tags) e links (repositório, demo, SubprojectLink).

### SubprojectLink
Referência a uma aplicação independente hospedada em subdomínio. Pertence a um `Project` no portfólio.

### Tag
Tecnologia ou categoria associada a um `Project` ou `BlogPost`.

---

## Abreviações & Siglas

| Sigla | Significado |
|-------|-------------|
| MVP | Minimum Viable Product — versão mínima com valor entregável |
| SSR | Server-Side Rendering |
| RSC | React Server Components |
| DI | Dependency Injection (NestJS) |
| ORM | Object-Relational Mapper |
| CI/CD | Continuous Integration / Continuous Deployment |
| ADR | Architecture Decision Record |

---

## Links

- [[Visão do Produto]]
- [[Arquitetura]]
