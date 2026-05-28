# Decisões — challenges.nico.dev (apps/challenges)

Decisões específicas deste app. Desvios em relação aos padrões globais em `docs/context/decisions.md`.

## Descrição

Portfólio visual de desafios técnicos por empresa. Cards com preview, descrição, link de deploy e repositório. Dados carregados automaticamente do GitHub via API.

## Fonte de dados

- GitHub API (`robertourias/testes-tecnicos`) — sem banco de dados local
- Dados cacheados via Next.js ISR ou fetch com `revalidate`
- Link final extraído do padrão `## Link Final` no README de cada repositório

## Renderização

- Geração estática preferida (SSG/ISR) — conteúdo muda raramente
- Sem autenticação — app público
