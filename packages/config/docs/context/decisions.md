# Decisões — @nico.dev/config (packages/config)

## Responsabilidade

Configs compartilhadas de tooling: ESLint, TypeScript, Tailwind. Consumidos por todos os apps e packages do monorepo.

## Regras

- Alterações aqui afetam todo o monorepo — revisar impacto antes de modificar
- TypeScript: strict mode habilitado em todos os projetos
- ESLint: config base em `eslint-config-base`, extendida por cada app se necessário
- Tailwind: config base inclui tokens do design system — não sobrescrever tokens sem motivo
