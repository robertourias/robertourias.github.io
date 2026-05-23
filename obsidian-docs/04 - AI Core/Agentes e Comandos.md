---
tags: [ai-core, agentes, comandos, slash-commands, planner, frontend, backend, reviewer]
created: 2026-05-21
relacionados:
  - "[[Visão Geral do Harness]]"
  - "[[Fluxo de Entrega Spec-Driven]]"
---

# Agentes e Comandos

> Referência dos quatro agentes do projeto e dos slash commands disponíveis no Claude Code.

---

## Os quatro agentes

### 🗂️ Planner Agent

**Papel:** Traduz requisitos de produto em tarefas técnicas acionáveis e ordenadas. Define contratos de API e sinaliza riscos antes da implementação.

**Opera em dois modos mutuamente exclusivos:**

| Modo | Quando usar | O que produz |
|------|-------------|--------------|
| **Modo Spec** | Sem spec aprovado — requisito chegou como texto | `.ai-core/specs/YYYY-MM-DD-<topic>.md` com `Status: draft` |
| **Modo Plan** | Existe spec com `Status: approved` | Tarefas técnicas ordenadas + contrato de API |

**Regras:**
- Conduz levantamento com **uma pergunta por vez**
- No Modo Spec: **para após gerar o spec** — não decompõe nem cria tasks antes da aprovação
- No Modo Plan: verifica obrigatoriamente que o campo `Status` é `approved` antes de começar

**Escala imediatamente se:**
- Breaking changes em contratos de API existentes
- Migrations em tabelas grandes (> 1M registros)
- Mudanças em lógica de auth/autorização
- Nova dependência de serviço externo

---

### 🖥️ Frontend Agent

**Papel:** Senior frontend engineer — React, Next.js, TypeScript. Implementa UI, mantém design system, garante performance e acessibilidade.

**Carrega ao iniciar:**
- `context/conventions.md`
- `context/ui-guidelines.md`
- `decisions/frontend.md`

**Regras não-negociáveis:**

| Categoria | Regra |
|-----------|-------|
| Design System | Verificar `@nico.dev/ui` antes de criar qualquer elemento visual |
| Design System | Se não existir, adicionar ao design system ANTES de usar no app |
| Tokens | Sempre via classes Tailwind semânticas — nunca hex direto |
| TypeScript | Props sempre tipadas com interface explícita |
| Componentes | Apenas funcionais — zero class components |
| Componentes | Um componente por arquivo, nome igual ao arquivo |
| Componentes | Sem lógica de negócio em componentes — extrair para hooks |
| Acessibilidade | Todo elemento interativo navegável por teclado + ARIA label |
| Performance | `next/image` para todas as imagens |
| Performance | LCP < 2.5s, CLS < 0.1, TBT < 200ms, bundle < 150kB gzipped |

**Hierarquia de estado:** `useState` → `useReducer` → Context → store externo

**Estrutura de feature:**
```
features/[nome]/
  components/    → componentes do feature
  hooks/         → lógica extraída
  services/      → chamadas de API
  index.ts       → barrel export público
```

---

### ⚙️ Backend Agent

**Papel:** Senior backend engineer — NestJS, TypeScript, Clean Architecture.

**Carrega ao iniciar:**
- `context/conventions.md`
- `decisions/backend.md`

**Estrutura de módulo:**
```
module/
  controllers/   → HTTP handlers, DTOs
  services/      → Use cases e lógica de negócio
  repositories/  → Acesso a dados (Prisma)
  domain/        → Entidades, value objects (zero imports de framework)
  dto/           → Data Transfer Objects
```

**Regras invioláveis:**

| Regra |
|-------|
| Sem lógica de negócio em controllers |
| Prisma apenas dentro de repositories |
| DTOs apenas na camada de transporte |
| Services contêm os use cases |
| Sem acesso cross-module a repositories |
| Sem `console.log` — usar Pino logger com JSON estruturado |
| Validação com Zod obrigatória em todas as entradas |
| Nunca logar dados sensíveis |

---

### 🔍 Reviewer Agent

**Papel:** Revisa código para corretude, segurança, performance e aderência aos padrões do projeto.

**Labels de severidade:**

| Label | Significado |
|-------|-------------|
| 🔴 **BLOCKER** | Obrigatório corrigir antes do merge (falha de segurança, lógica quebrada, teste crítico faltando) |
| 🟡 **WARNING** | Deve corrigir (anti-pattern, risco de performance, edge case descoberto) |
| 🟢 **SUGGESTION** | Melhoria opcional |
| 💡 **NOTE** | Informativo, sem ação necessária |

**Checklist em dois estágios:**
1. **Estágio 1 — Funcional** (primeiro) → um 🔴 BLOCKER encerra a revisão
2. **Estágio 2 — Qualidade** (só se Estágio 1 passou sem BLOCKERs)

**Formato de saída:**
```
## Verdict: APPROVED | CHANGES REQUESTED | NEEDS DISCUSSION

### Issues
[🔴/🟡/🟢 arquivo:linha — descrição e sugestão de correção]

### Notes
[💡 observações informativas]
```

**Não bloquear por:**
- Formatação (o linter trata)
- Preferências pessoais de estilo sem impacto objetivo
- Requisitos futuros especulativos fora do escopo

---

## Slash commands (Claude Code)

Disponíveis via `/` no Claude Code. Cada comando carrega automaticamente os arquivos `.ai-core/` relevantes.

| Comando | Exemplo | O que faz |
|---------|---------|-----------|
| `/init-project [desc]` | `/init-project portfólio pessoal` | Preenche todos os arquivos de contexto interativamente (use ao iniciar um projeto) |
| `/retomar` | `/retomar` | Reconstrói contexto da sessão anterior a partir do STATUS.md + git log |
| `/checkpoint` | `/checkpoint` | Salva estado atual em STATUS.md — use antes de encerrar a sessão |
| `/spec [requisito]` | `/spec calculadora CLT vs PJ` | Planner conduz levantamento, gera spec draft e para — aguarda aprovação |
| `/plan [caminho-spec]` | `/plan .ai-core/specs/2026-05-19-clt-pj.md` | Planner cria plano técnico a partir do spec aprovado |
| `/back [tarefa]` | `/back implementar endpoint de contato` | Backend agent com contexto completo carregado |
| `/front [tarefa]` | `/front criar página de ferramentas` | Frontend agent com contexto completo carregado |
| `/review [diff]` | `/review [cole o diff aqui]` | Revisão em dois estágios — Funcional → Qualidade |

---

## Fluxo completo com comandos

```bash
# 1. Iniciar o projeto (uma vez)
/init-project portfólio pessoal e subprojetos

# 2. Criar spec de nova feature
/spec calculadora CLT vs PJ
  → planner gera .ai-core/specs/2026-05-19-clt-pj.md (Status: draft)
  → você edita o arquivo: Status: draft → Status: approved

# 3. Criar plano técnico
/plan .ai-core/specs/2026-05-19-clt-pj.md
  → planner decompõe em tarefas com contrato de API

# 4. Implementar
/back implementar lógica de cálculo CLT e PJ
/front criar formulário e painel de resultados

# 5. Revisar
/review [diff do commit]

# 6. Antes de fechar a sessão
/checkpoint

# 7. Ao voltar ao projeto
/retomar
```

---

## Specs ativos (referência)

Os specs ficam em `.ai-core/specs/` com o padrão `YYYY-MM-DD-<topic>.md`.

**Campo Status controla o gate:**
- `draft` → spec em revisão, planner bloqueado
- `approved` → planner pode criar o plano técnico

---

## Sem Claude Code (Cursor, Copilot, outros)

Copie os prompts abaixo no chat da ferramenta:

**Para spec:**
```
Você é o PLANNER deste projeto.
Leia .ai-core/agents/planner.agent.md, .ai-core/context/architecture.md e .ai-core/specs/spec-template.md.
Feature: [descrever]. Não há spec aprovado ainda.
```

**Para backend:**
```
Você é o agente de BACKEND deste projeto.
Leia .ai-core/agents/backend.agent.md, .ai-core/context/conventions.md e .ai-core/decisions/backend.md.
Tarefa: [descrever]
```

**Para frontend:**
```
Você é o agente de FRONTEND deste projeto.
Leia .ai-core/agents/frontend.agent.md, .ai-core/context/conventions.md e .ai-core/decisions/frontend.md.
Tarefa: [descrever]
```

**Para review:**
```
Você é o REVIEWER deste projeto.
Leia .ai-core/agents/reviewer.agent.md e .ai-core/decisions/[frontend|backend].md.
Revise o seguinte diff: [diff]
```

---

## Ver também

- [[Visão Geral do Harness]]
- [[Fluxo de Entrega Spec-Driven]]
