---
tags: [ai-core, harness, agentes, contexto, ia]
created: 2026-05-21
relacionados:
  - "[[Fluxo de Entrega Spec-Driven]]"
  - "[[Agentes e Comandos]]"
  - "[[../01 - Projeto/Técnico — Arquitetura e Stack]]"
---

# .ai-core — Visão Geral do Harness

> Sistema de memória persistente para agentes de IA. Elimina a necessidade de reensinar convenções, decisões e regras de negócio a cada sessão.

---

## O problema que resolve

Agentes de IA não têm memória de sessões anteriores e não sabem nada sobre o seu projeto: stack escolhida, convenções adotadas, regras de negócio, decisões passadas. Sem contexto, eles inventam convenções, repetem perguntas e divergem do que foi decidido.

O `.ai-core/` é a **memória persistente** que preenche essa lacuna — sem reensinar o que o agente já sabe sobre a tecnologia em si.

**Princípio central:** coloque no contexto apenas o que o agente **não pode inferir sozinho**. Carregue apenas o que é relevante para a tarefa em curso.

---

## O que o .ai-core/ NÃO contém

- Tutoriais de tecnologias (o agente já sabe Next.js, NestJS, TypeScript)
- Naming óbvio (PascalCase, camelCase, snake_case para DB)
- Breakpoints padrão do Tailwind, type scale padrão

**Só fica aqui o delta:** o que este projeto específico escolheu e por quê.

---

## Estrutura

```
.ai-core/
├── agents/                   → Papel, regras e checklist por tipo de agente
│   ├── planner.agent.md      → Spec-driven: Modo Spec e Modo Plan separados
│   ├── frontend.agent.md     → Senior frontend engineer
│   ├── backend.agent.md      → Senior backend engineer
│   └── reviewer.agent.md     → Revisão em dois estágios: Funcional → Qualidade
│
├── specs/                    → Specs aprovados por feature
│   ├── spec-template.md      → Template para novos specs
│   └── YYYY-MM-DD-<topic>.md → Spec de cada feature (Status: draft → approved)
│
├── decisions/                → Escolhas específicas do projeto
│   ├── frontend.md           → Stack, libs, padrões de teste do frontend
│   └── backend.md            → ORM, auth, arquitetura, padrões de teste
│
├── context/                  → O que é único do produto
│   ├── architecture.md       → Stack real, estrutura, decisões arquiteturais
│   ├── product.md            → Usuários, regras de negócio, glossário
│   ├── conventions.md        → Nomenclatura, Git, imports, comentários
│   └── ui-guidelines.md      → Design system, tokens, componentes
│
├── workflows/                → Processos (carregados sob demanda)
│   ├── feature-delivery.md   → Fase 0: Spec → gate → Plan → implementação
│   ├── review-process.md     → Processo de PR e revisão
│   └── release-process.md    → Deploy e rollback
│
├── plans/                    → Planos técnicos de features aprovadas
│   └── YYYY-MM-DD-<topic>.md
│
├── STATUS.md                 → Estado atual do projeto (memória de trabalho)
├── CHANGELOG.md              → Histórico de mudanças
├── GLOSSARY.md               → Termos do domínio
└── README.md                 → Documentação do harness
```

---

## Adaptadores de ferramentas

| Ferramenta | Arquivo | Comportamento |
|-----------|---------|---------------|
| Claude Code | `.claude/CLAUDE.md` | Carregado automaticamente ao abrir o projeto |
| OpenAI Codex | `AGENTS.md` | Lido automaticamente na raiz do repositório |
| Cursor Agent | `AGENTS.md` | Cursor usa como contexto do projeto |
| Copilot Workspace | `AGENTS.md` | Compatível com o formato AGENTS.md |

---

## Quanto contexto cada papel usa

| Papel | Arquivos carregados | Tokens estimados |
|-------|-------------------|-----------------|
| Backend | `backend.agent.md` + `conventions.md` + `decisions/backend.md` | ~1.1k |
| Frontend | `frontend.agent.md` + `conventions.md` + `ui-guidelines.md` + `decisions/frontend.md` | ~1.5k |
| Planner (Modo Spec) | `planner.agent.md` + `context/architecture.md` + `context/product.md` | ~2k |
| Planner (Modo Plan) | idem + spec aprovado da feature | ~3k |
| Reviewer | `reviewer.agent.md` + `decisions/<domínio>.md` | ~1k |

---

## Arquivos carregados sob demanda

| Arquivo | Quando carregar |
|---------|----------------|
| `workflows/feature-delivery.md` | Ao iniciar planejamento de feature |
| `workflows/review-process.md` | Ao abrir PR ou revisão formal |
| `workflows/release-process.md` | Ao preparar deploy |
| `GLOSSARY.md` | Quando surgir termo de domínio ambíguo |
| `context/product.md` | Quando o planner precisar de regras de negócio |

---

## STATUS.md — Memória de trabalho

O `STATUS.md` é a memória de estado entre sessões. Ele contém:
- Data da última atualização e resumo da última sessão
- Feature em andamento (spec ativo e plano ativo)
- Tasks: ✅ Concluídas / 🔄 Em progresso / ⏭ Próximos passos
- Decisões tomadas na sessão
- Bloqueadores e perguntas abertas

**Protocolo:**
- `/checkpoint` → escreve o STATUS.md antes de encerrar a sessão
- `/retomar` → lê o STATUS.md ao voltar ao projeto

---

## CHANGELOG.md — Protocolo pré-commit

Antes de qualquer commit, obrigatoriamente:

1. Atualizar `.ai-core/CHANGELOG.md` — seção `[Unreleased]`
2. Atualizar `.ai-core/STATUS.md` — estado atual
3. Incluir ambos no commit

---

## Manutenção do .ai-core/

Trate com o mesmo cuidado que código de produção: **versionado no Git, revisado em PR**.

| Quando | Atualizar |
|--------|-----------|
| Decisão arquitetural tomada | `context/architecture.md` |
| Regra de negócio definida | `context/product.md` |
| Nova lib/stack adotada | `decisions/frontend.md` ou `decisions/backend.md` |
| Novo termo do domínio surgir | `GLOSSARY.md` |
| Feature nova aprovada | `specs/YYYY-MM-DD-<topic>.md` |

---

## Ver também

- [[Fluxo de Entrega Spec-Driven]]
- [[Agentes e Comandos]]
- [[../01 - Projeto/Técnico — Arquitetura e Stack]]
