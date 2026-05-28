# Decisões — @nico.dev/ui (packages/ui)

Decisões específicas deste package. Desvios em relação aos padrões globais em `docs/context/decisions.md`.

## Responsabilidade

Biblioteca de componentes compartilhada. Todos os apps do monorepo devem usar `@nico.dev/ui` como única fonte de componentes UI.

## Regras

- Nenhum app deve criar componentes de UI sem primeiro adicioná-los (ou propor adição) aqui
- Componentes são tree-shakeable — exports nomeados por componente
- Radix UI como primitivas de acessibilidade
- shadcn/ui como referência de padrão — sem MUI, sem Chakra
- Tailwind CSS para estilização

## Design source of truth

- Arquivo `.pen` em `docs/nico.dev.br.pen` (Pencil) — tokens e componentes visuais
- `ui-guidelines.md` neste diretório documenta como consumir o design system

## Versionamento

- Sem versionamento semântico individual — os apps consomem via workspace (monorepo)
- Breaking changes devem ser comunicadas via changelog e atualizadas em todos os consumers
