# Status do Projeto

> Memória de trabalho persistente. Atualizado pelo `/checkpoint`, lido pelo `/retomar`.
> Não edite manualmente durante uma sessão ativa — use `/checkpoint` antes de fechar.

**Última atualização:** 2026-05-15
**Resumo da última sessão:** Inicializado o contexto completo do projeto (init-project) e migrado o repositório para monorepo Turborepo com pnpm workspaces, movendo nico.dev.br para apps/web-nico.dev.br.

---

## Feature em andamento

**Spec ativo:** .ai-core/specs/2026-05-15-turborepo-setup.md (Status: approved — implementado e commitado)
**Plano ativo:** —

---

## Tasks

### ✅ Concluídas
- Preenchimento de todos os arquivos de contexto do .ai-core/ via /init-project
- Spec de migração para Turborepo criado e aprovado
- Raiz do monorepo configurada (package.json, pnpm-workspace.yaml, turbo.json)
- packages/config criado com tsconfig/base.json, eslint/base.js e tailwind/postcss.mjs
- git mv de nico.dev.br/ → apps/web-nico.dev.br/ com histórico preservado
- App atualizado para estender @nico.dev/config
- CI/CD configurado (.github/workflows/ci.yml)
- pnpm install, turbo build e turbo lint validados com sucesso
- Push para origin (remote atualizado para https://github.com/robertourias/nico.dev.br.git)

### 🔄 Em progresso
- (nenhuma)

### ⏭ Próximos passos
1. Renomear pasta local de `robertourias.github.io` para `nico.dev.br` manualmente (terminal fora da pasta ou Explorador de Arquivos)
2. Atualizar "Root Directory" no painel da Vercel de `nico.dev.br` para `apps/web-nico.dev.br`
3. Rodar `pnpm audit` e resolver vulnerabilidades detectadas pelo GitHub (16 high, 9 moderate, 4 low)
4. Usar `/spec` para a próxima feature (sugestão: substituir `<img>` por `next/image` em About.tsx, ou iniciar o Blog)

---

## Decisões desta sessão

- **Turborepo + pnpm:** Escolhidos como base do monorepo para suportar subprojetos em subdomínios independentes
- **packages/config apenas:** Primeiro pacote compartilhado limitado a configs (tsconfig, eslint, tailwind/postcss) — packages/ui, types e utils ficaram fora do escopo inicial
- **Dois ORMs:** Prisma para MVPs, Drizzle para projetos com foco em performance — coexistem no monorepo
- **Tailwind v4:** CSS-first, sem tailwind.config.js — packages/config compartilha apenas o postcss.mjs
- **react-hooks/set-state-in-effect:** Suprimido com eslint-disable em ThemeProvider.tsx (padrão legítimo de mount detection, debt registrado)
- **Remote renomeado:** git remote atualizado para https://github.com/robertourias/nico.dev.br.git

---

## Bloqueadores / Perguntas abertas

- Pasta local ainda com nome `robertourias.github.io` — renomear manualmente para `nico.dev.br`
- Vercel precisa ter "Root Directory" atualizado para `apps/web-nico.dev.br` para o deploy continuar funcionando
