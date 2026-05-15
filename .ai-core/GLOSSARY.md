# Glossário

Termos do domínio usados de forma consistente em código, documentação e conversas.
Use sempre estes termos exatos — não sinônimos — em nomes de variáveis, comentários e design de API.

| Termo | Definição |
|-------|-----------|
| Subprojeto | Aplicação separada dentro do monorepo Turborepo com deploy próprio em um subdomínio de nico.dev (ex: `projeto.nico.dev`). Cada subprojeto tem ciclo de vida e pipeline de deploy independentes. |
| Monorepo | Repositório único gerenciado com Turborepo contendo o site principal (`apps/web`) e todos os subprojetos. Packages compartilhados ficam em `packages/`. |
| Site principal | A aplicação `apps/web`, hospedada em `nico.dev`, que contém portfólio, blog, currículo e formulário de contato. |
| Portfólio | Seção do site principal que exibe os projetos e trabalhos de Roberto Nicoletti, com descrição, tecnologias e links. |
| BlogPost | Artigo técnico autoral publicado no blog de nico.dev (feature planejada). |
