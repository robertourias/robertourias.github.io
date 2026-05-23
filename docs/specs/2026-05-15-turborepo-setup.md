# Spec: Setup do Monorepo Turborepo com migração de web-nico.dev.br

**Status:** approved
**Data:** 2026-05-15
**Autor:** planner

---

## Problema

O repositório `robertourias.github.io` possui o projeto `nico.dev.br/` diretamente na raiz, sem estrutura de monorepo. Isso impede a adição de novos subprojetos com packages compartilhados e pipelines de build coordenados. A migração para Turborepo estabelece a fundação para o modelo de subdomínios descrito no produto: cada subprojeto sendo uma app independente com deploy em seu próprio subdomínio.

---

## Cenários de Usuário

- **P1 (crítico):** Como desenvolvedor do Nico.dev, quero mover `nico.dev.br/` para `apps/web-nico.dev.br/` dentro de um monorepo Turborepo, para que o site continue funcionando com a mesma stack e eu possa adicionar novos subprojetos futuramente.
- **P1 (crítico):** Como desenvolvedor, quero um `packages/config` com configs compartilhadas de TypeScript, ESLint e Tailwind, para não duplicar configuração entre apps.
- **P2 (importante):** Como desenvolvedor, quero um workflow de CI no GitHub Actions que execute `build` e `lint` em todos os packages afetados por um push, para garantir que nenhuma app quebre silenciosamente.

---

## Requisitos Funcionais

- **FR-001:** A raiz do repositório deve ter um `package.json` configurado como workspace root do pnpm com `"private": true` e `engines: { "node": ">=20" }`.
- **FR-002:** O arquivo `pnpm-workspace.yaml` deve declarar `apps/*` e `packages/*` como workspaces.
- **FR-003:** O `turbo.json` deve definir os pipelines `build`, `lint` e `dev` com dependências corretas (`dependsOn: ["^build"]` para `build`).
- **FR-004:** O diretório `nico.dev.br/` deve ser movido para `apps/web-nico.dev.br/` com o `name` no `package.json` atualizado para `@nico.dev/web-nico.dev.br`.
- **FR-005:** O `package-lock.json` existente dentro de `nico.dev.br/` deve ser removido; o lockfile passa a ser `pnpm-lock.yaml` na raiz.
- **FR-006:** O `packages/config` deve exportar pelo menos três configs: `tsconfig/base.json`, `eslint/base.js` e `tailwind/base.js`.
- **FR-007:** O `apps/web-nico.dev.br/` deve estender as configs de `packages/config` em vez de manter configs locais duplicadas.
- **FR-008:** O GitHub Actions deve ter um workflow `ci.yml` que rode em push/PR para `main` e `master`, executando `pnpm install` + `turbo lint build` com cache do Turborepo.
- **FR-009:** O `.gitignore` raiz deve ignorar `node_modules`, `.turbo`, `dist` e `.next` em qualquer nível.

---

## Critérios de Sucesso

- [ ] `pnpm install` na raiz instala as dependências de todos os workspaces sem erro
- [ ] `pnpm turbo build` a partir da raiz compila `apps/web-nico.dev.br` com sucesso
- [ ] `pnpm turbo lint` executa sem erros no app migrado
- [ ] `pnpm turbo dev` inicia o servidor de desenvolvimento de `web-nico.dev.br`
- [ ] O CI no GitHub Actions passa no primeiro push após a migração
- [ ] Nenhum arquivo de `packages/config` é duplicado dentro de `apps/web-nico.dev.br`

---

## Fora do Escopo

- Criação de qualquer outro app além de `web-nico.dev.br`
- Packages `ui`, `types` ou `utils`
- Configuração de deploy na Vercel (requer ajuste manual do "Root Directory" após a migração)
- Migração ou alteração do conteúdo da aplicação Next.js em si

---

## Riscos e Premissas

- **Premissa:** A Vercel está configurada para fazer deploy a partir de `nico.dev.br/`. Após a migração o "Root Directory" no painel da Vercel precisará ser atualizado manualmente para `apps/web-nico.dev.br` — isso está **fora do escopo deste spec**, mas deve ser documentado como passo manual pós-migração.
- **Risco:** Conflito entre a versão de Node do `nico.dev.br` e a exigência de Node 20 → Mitigação: verificar o `engines` atual antes de mover.
- **Risco:** Paths de import absolutos que dependem do `tsconfig.json` local podem quebrar se o `paths` não for preservado → Mitigação: auditar `tsconfig.json` existente antes de substituir pelo extend de `packages/config`.
- **Premissa:** O repositório usa `git` e o histórico de `nico.dev.br/` será preservado pelo simples `git mv`, já que o path muda mas o conteúdo permanece.

---

<!--
GATE DE APROVAÇÃO
Para desbloquear a criação do plano técnico, altere o Status acima de "draft" para "approved".
O agente planner NÃO deve criar tasks de implementação enquanto Status for "draft".
-->
