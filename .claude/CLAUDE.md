# Claude Project Context

Este projeto usa `docs/` como memória persistente de contexto para agentes de IA.
Leia apenas os arquivos relevantes ao seu papel antes de qualquer tarefa.

---

## Papel: PLANNER
```
docs/context/product.md
docs/architecture/overview.md
docs/skills/architecture.md
docs/agents/planner.agent.md
docs/workflows/feature-delivery.md
```

## Papel: FRONTEND
```
docs/skills/frontend.md
docs/context/conventions.md
packages/ui/docs/context/ui-guidelines.md
docs/context/decisions.md
docs/agents/frontend.agent.md
```

## Papel: BACKEND
```
docs/skills/backend.md
docs/context/conventions.md
docs/context/decisions.md
docs/agents/backend.agent.md
```

## Papel: REVIEWER
```
docs/skills/quality.md
docs/context/conventions.md
docs/context/decisions.md
docs/agents/reviewer.agent.md
```

## Contexto por app ou package

Ao trabalhar em um app ou package específico, leia também o `docs/context/` local:

```
apps/web-nico.dev.br/docs/context/   ← site principal nico.dev
apps/tools/docs/context/             ← tools.nico.dev
apps/challenges/docs/context/        ← challenges.nico.dev
apps/storybook/docs/context/         ← design system reference
apps/metronome/docs/context/         ← metronome.nico.dev
packages/ui/docs/context/            ← @nico.dev/ui (inclui ui-guidelines.md)
packages/config/docs/context/        ← @nico.dev/config
```

Specs e plans de cada app ficam em `[app]/docs/specs/` e `[app]/docs/plans/`.

## Carregue sob demanda (não por padrão)
```
docs/context/current-state.md        ← estado atual do projeto (use /retomar)
docs/context/product.md              ← regras de negócio (se não for PLANNER)
docs/workflows/release-process.md
```

---

## Estrutura do monorepo
```
apps/
  web-nico.dev.br/ → Next.js (App Router) — site principal nico.dev
  api/             → NestJS
  tools/           → tools.nico.dev
  challenges/      → challenges.nico.dev
  metronome/       → metronome.nico.dev
  storybook/       → Design system reference
packages/
  ui/              → Biblioteca de componentes compartilhada (@nico.dev/ui)
  config/          → ESLint, TypeScript, Tailwind configs
  types/           → Tipos TypeScript compartilhados
  utils/           → Funções utilitárias compartilhadas
```

## Estrutura de docs por app/package
```
[app ou package]/
  docs/
    context/       ← decisões e contexto específicos do app
    architecture/  ← arquitetura específica (se houver)
    plans/         ← planos técnicos de features
    specs/         ← especificações funcionais
```

## Slash commands disponíveis
```
/init-project [descrição]   ← preenche todos os arquivos de contexto
/retomar                    ← reconstrói contexto da sessão anterior
/checkpoint                 ← salva estado atual antes de encerrar
/spec   [requisito]         ← gera spec com gate humano (Modo Spec)
/plan   [caminho-do-spec]   ← cria plano técnico de spec aprovado
/back   [tarefa]            ← agente backend
/front  [tarefa]            ← agente frontend
/review [diff ou contexto]  ← revisão em dois estágios
/commit                     ← atualiza docs e faz commit
```
Referência completa: `docs/commands/README.md`

---

## Princípios-chave
1. Clean Architecture — dependências apontam para dentro, domínio sem dependências de framework
2. Testes junto com a implementação, não depois
3. Toda decisão deve ser rastreável a um arquivo em `docs/` (global) ou `[app]/docs/` (específico)
4. Em caso de dúvida: pergunte antes de assumir
