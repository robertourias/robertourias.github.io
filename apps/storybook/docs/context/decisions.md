# Decisões — Storybook (apps/storybook)

Decisões específicas deste app. Desvios em relação aos padrões globais em `docs/context/decisions.md`.

## Descrição

Design system reference — Storybook para documentação visual e interativa de todos os componentes de `packages/ui`.

## Escopo

- Documenta apenas componentes de `@nico.dev/ui` (packages/ui/)
- Sem lógica de negócio — apenas stories e variantes de componentes
- Cada componente deve ter stories para todos os seus estados e variantes

## Deploy

- Deploy separado como subdomínio ou rota interna (a definir)
- Não é um produto voltado ao usuário final — uso interno de desenvolvimento
