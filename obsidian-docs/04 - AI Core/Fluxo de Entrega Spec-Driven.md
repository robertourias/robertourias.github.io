---
tags: [ai-core, fluxo, spec, feature-delivery, workflow]
created: 2026-05-21
relacionados:
  - "[[Visão Geral do Harness]]"
  - "[[Agentes e Comandos]]"
---

# Fluxo de Entrega Spec-Driven

> O fluxo completo de entrega de uma feature — da ideia ao deploy. Toda feature começa com um spec aprovado; nenhum código é escrito antes disso.

---

## Visão macro

```
Ideia / Requisito
      ↓
┌─────────────────────────────┐
│  Fase 0: SPEC               │  ← Planner conduz levantamento
│  .ai-core/specs/YYYY-MM-... │    Gera spec com Status: draft
└─────────────────────────────┘
      ↓
⛔ GATE — Aprovação humana obrigatória
  → Você revisa o spec
  → Muda Status: draft → Status: approved
      ↓
┌─────────────────────────────┐
│  Fase 1: PLAN               │  ← Planner decompõe em tarefas técnicas
│  Contrato de API definido   │    Define ordem de implementação
└─────────────────────────────┘
      ↓
┌─────────────────────────────┐
│  Fase 2: BACKEND            │  ← Backend Agent implementa
│  Domain → App → Infra → API │
└─────────────────────────────┘
      ↓
┌─────────────────────────────┐
│  Fase 3: FRONTEND           │  ← Frontend Agent implementa
│  Data → Components → Page   │
└─────────────────────────────┘
      ↓
┌─────────────────────────────┐
│  Fase 4: INTEGRAÇÃO         │  ← E2E, responsividade, a11y
└─────────────────────────────┘
      ↓
┌─────────────────────────────┐
│  Fase 5: REVIEW             │  ← Reviewer Agent (2 estágios)
└─────────────────────────────┘
      ↓
┌─────────────────────────────┐
│  Fase 6: DEPLOY             │
└─────────────────────────────┘
      ↓
┌─────────────────────────────┐
│  Fase 7: DOCUMENTAÇÃO       │  ← Pós-merge (obrigatório)
└─────────────────────────────┘
```

---

## Fase 0 — Spec (Planner em Modo Spec)

**Input:** Requisito, user story ou pedido verbal  
**Output:** `.ai-core/specs/YYYY-MM-DD-<topic>.md` com `Status: draft`

O Planner conduz o levantamento fazendo **uma pergunta por vez** até ter clareza suficiente para escrever o spec. Usa `.ai-core/specs/spec-template.md` como base.

**Ao final, para imediatamente** e avisa:
> "Spec gerado em `.ai-core/specs/YYYY-MM-DD-<topic>.md` com `Status: draft`. Revise e altere `Status` para `approved` para continuar."

**Não cria tasks, não define contratos, não decompõe nada** antes da aprovação.

---

## ⛔ Gate — Aprovação Humana

> **Este gate é obrigatório e não pode ser pulado.**

Você deve:
1. Abrir o arquivo de spec gerado
2. Revisar problema, cenários, critérios de aceite e restrições
3. Corrigir ambiguidades e requisitos faltantes
4. Alterar `Status: draft` → `Status: approved`

**Nenhuma fase de implementação começa antes deste gate.**

**Por que o gate importa:** sem ele, o agente assume o escopo e você descobre o desvio após código escrito. Com o spec, se algo estiver errado, você edita um Markdown — não reverte código.

---

## Fase 1 — Plan (Planner em Modo Plan)

**Input:** Spec com `Status: approved`  
**Output:** Tarefas técnicas ordenadas + contrato de API definido

Ordem de decomposição:
1. Mudanças de schema + migrations
2. Entidades de domínio e value objects
3. Use cases e services (com testes)
4. Controllers e DTOs
5. Componentes e hooks frontend (com testes)
6. Páginas e rotas
7. Integração + E2E

**Gate:** Todas as ambiguidades resolvidas antes de implementar.

---

## Fase 2 — Backend

**Pré-requisito:** Contrato de API definido e acordado

| Etapa | O que fazer |
|-------|-------------|
| 2a — Domain & DB | Entidades de domínio, value objects, migrations |
| 2b — Application | Use cases em `application/use-cases/`, testes unitários |
| 2c — Infra | Implementar repositories em `infrastructure/repositories/` |
| 2d — Presentation | Controller com DTOs, Swagger, validação, testes de integração |

**Gate:** Todos os testes unitários + integração passando.

---

## Fase 3 — Frontend

**Pré-requisito:** Endpoints de API disponíveis (ou mockados via MSW)

| Etapa | O que fazer |
|-------|-------------|
| 3a — Data Layer | Tipos TypeScript para responses, funções de fetch, MSW handlers |
| 3b — Components | Componentes de `@nico.dev/ui`, tokens, estados (loading/empty/error) |
| 3c — Page / Route | Página Next.js com metadata, `loading.tsx` e `error.tsx` |

**Gate:** Todos os testes de componentes passando. Feature funciona com MSW.

---

## Fase 4 — Integração

- [ ] Frontend apontando para backend real (remover mock MSW)
- [ ] Testar happy path end-to-end
- [ ] Testar casos de erro
- [ ] Verificar estados de loading e vazio
- [ ] Responsividade: 375px e 768px mínimo
- [ ] Acessibilidade: navegação por teclado, screen reader

---

## Fase 5 — Review (Reviewer Agent)

**Dois estágios sequenciais:**

### Estágio 1 — Funcional
*O código faz o que deve fazer?*

- Atende todos os requisitos do spec aprovado
- Lógica de negócio correta
- Segurança: sem secrets hardcoded, sem SQL injection, sem XSS
- Testes cobrem happy path e ao menos um caminho de falha
- Migrations incluídas para mudanças de schema
- Sem regressões em fluxos existentes

> 🔴 **BLOCKER no Estágio 1 → encerra revisão aqui.** Corrija e reabra.

### Estágio 2 — Qualidade
*O código está bem feito?*

Só após Estágio 1 limpo:
- Sem `any`, sem regras de lint desabilitadas sem justificativa
- Edge cases tratados (null, vazio, timeout, erro de rede)
- Naming segue `conventions.md`
- Frontend: sem re-renders desnecessários, a11y mantida
- Backend: sem N+1, todos os inputs validados via DTO

**Severidades:** 🔴 BLOCKER · 🟡 WARNING · 🟢 SUGGESTION · 💡 NOTE

---

## Fase 6 — Deploy

**Processo padrão:**

| Tipo de release | Trigger |
|----------------|---------|
| Patch | Bug fix, hotfix |
| Minor | Nova feature, melhoria |
| Major | Breaking change |

1. CI verde em `main`
2. Sem BLOCKERs abertos na revisão
3. Migrations testadas no staging
4. Variáveis de ambiente configuradas em todos os ambientes
5. Deploy no staging → verificação
6. Deploy em produção → monitorar 15min (error rates + response times)

**Rollback:**
```bash
vercel rollback    # Vercel
railway rollback   # Railway
```

---

## Fase 7 — Documentação (pós-merge)

Obrigatório após cada merge em `main`:

- [ ] `docs/features/<feature>.md` criado ou atualizado
- [ ] `.ai-core/CHANGELOG.md` — seção `[Unreleased]` atualizada
- [ ] `.env.example` atualizado se novas variáveis foram adicionadas
- [ ] `context/architecture.md` atualizado se houve decisão arquitetural

---

## Definition of Done

Uma feature só está "pronta" quando:

- [ ] Todos os critérios de aceite do spec estão atendidos
- [ ] Testes unitários, integração e E2E passando
- [ ] Código revisado e aprovado
- [ ] Feature verificada em staging
- [ ] Sem regressões em features existentes
- [ ] `context/architecture.md` atualizado (se aplicável)

---

## Retomando o trabalho após interrupção

```bash
# Antes de fechar a sessão
/checkpoint
# → Escreve STATUS.md com tasks prontas, em progresso e próximos passos
# → Faz commit do STATUS.md

# Ao voltar
/retomar
# → Lê STATUS.md + git log + spec ativo
# → Apresenta: o que está pronto, onde parou, próxima ação concreta
```

---

## Ver também

- [[Visão Geral do Harness]]
- [[Agentes e Comandos]]
