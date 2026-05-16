# Status do Projeto

> Memória de trabalho persistente. Atualizado pelo `/checkpoint`, lido pelo `/retomar`.
> Não edite manualmente durante uma sessão ativa — use `/checkpoint` antes de fechar.

**Última atualização:** 2026-05-16
**Resumo da última sessão:** Implementadas múltiplas features no portfólio: widget de chat com IA (streaming, Anthropic API, markdown), página de currículo `/curriculo`, melhorias no carrossel mobile, correção de FOUC no dark mode, navegação melhorada no Navbar e documentação técnica completa.

---

## Feature em andamento

**Spec ativo:** .ai-core/specs/2026-05-16-ai-chat-widget.md (Status: approved — implementado e commitado)
**Plano ativo:** —

---

## Tasks

### ✅ Concluídas
- Smooth scroll com CSS (`scroll-behavior` + `scroll-padding-top`) e fix do `handleNavClick`
- Carrossel: drag nativo mobile (strip completo), botões no header desktop, auto-play removido
- Imagens reais nos cards de projeto via `next/image`
- Correção FOUC dark mode: script bloqueante no `<head>` + fallback para `prefers-color-scheme`
- Página `/curriculo` com 7 seções (RSC), dados tipados em `curriculum.ts`, download PDF
- Navbar: logo linkado para home, âncoras resolvem para `/#section` fora da home
- Widget de chat com IA: `ChatWidget`, `ChatCTAButton`, `MarkdownMessage`, `/api/chat` streaming
- System prompt com perfil completo, guardrails, auto-detect de idioma, transparência de lacunas
- Nível de inglês e instrução de transparência adicionados ao contexto do chat
- Pós-graduação em IA Aplicada (Unipds) no currículo e no contexto do chat
- Footer com `pb-24` para não sobrepor botão do chat
- Documentação técnica: `docs/CHANGELOG.md` + `docs/features/` (4 arquivos)
- Workflow de documentação em `.ai-core/workflows/documentation.md`
- CHANGELOG promovido para `[0.5.0]` com detalhes completos do chat

### 🔄 Em progresso
- (nenhuma)

### ⏭ Próximos passos
1. Configurar `ANTHROPIC_API_KEY` na Vercel (painel → Settings → Environment Variables) e no `.env.local` local para testar o chat em desenvolvimento
2. Resolver as vulnerabilidades reportadas pelo GitHub: `pnpm audit` e aplicar fixes (`pnpm audit --fix` ou atualizar deps manualmente)
3. Atualizar "Root Directory" no painel da Vercel de `nico.dev.br` para `apps/web-nico.dev.br`
4. Usar `/spec` para próxima feature — sugestões: seção Blog, formulário de contato funcional, animações de entrada nas seções

---

## Decisões desta sessão

- **Chat via evento customizado:** `CustomEvent("open-chat")` em vez de React Context — evita prop drilling e funciona com Server Components (About.tsx)
- **MarkdownMessage sem dependências:** renderer custom em vez de `react-markdown` (>10kB) — suporta os padrões que a IA usa sem custo de bundle
- **Modelo `claude-haiku-4-5-20251001`:** balanceamento custo/velocidade para chat de portfólio — migrar para `claude-sonnet-4-6` é 1 linha se qualidade for insuficiente
- **`educationList: EducationEntry[]`:** campo `education` renomeado para array para suportar múltiplas formações com status `in_progress` / `completed`
- **Documentação por projeto (`apps/<app>/docs/`):** doc co-localizada com o código; root `docs/` apenas para features cross-app
- **Script bloqueante no `<head>` para FOUC:** padrão canônico para dark mode em SSR sem depender de bibliotecas externas

---

## Bloqueadores / Perguntas abertas

- `ANTHROPIC_API_KEY` ainda não configurada na Vercel nem no `.env.local` — chat não funciona em produção/dev até ser preenchida
- Pasta `apps/web-nico.dev.br/src/app/docs/` contém um PDF (`Ementa Engenharia de Software em IA Aplicada.pdf`) fora do lugar — mover para `public/` ou `apps/web-nico.dev.br/docs/` se quiser versionar
