# Frontend Architecture

> Detalhe aqui as decisões específicas de arquitetura do cliente.

## Estrutura de rotas

| Rota | Componente de página | Descrição |
|------|---------------------|-----------|
| / | HomePage | Site principal nico.dev |
| /curriculo | CurriculoPage | Página de CV |
| /projetos | ProjetosPage | Galeria de projetos |

## Features mapeados

<!-- Features no padrão features/[nome]/ -->
| Feature | Componentes principais | Status |
|---------|----------------------|--------|
| portfolio | ProjectCard, ProjectCarousel | Live |
| contact | ContactForm | Em andamento |
| chat | ChatWidget, ChatCTAButton | Live |
| resume | ResumePage | Em andamento |
