# Changelog — web-nico.dev.br

Registro cronológico de features, melhorias e correções do site.  
Para detalhes de implementação, veja os arquivos em `docs/features/`.

---

## [Unreleased]

### Adicionado
- Widget de chat com IA (`/api/chat`) — `docs/features/ai-chat-widget.md`
- Renderização de Markdown nas respostas do chat
- Pós-graduação em IA Aplicada (Unipds) na página de currículo e contexto do chat

---

## [0.4.0] — 2026-05-16

### Adicionado
- Página de currículo `/curriculo` com 7 seções: cabeçalho, resumo, habilidades, diferenciais, experiência, formação, referências LinkedIn — `docs/features/curriculo-page.md`
- Botão Download PDF na página de currículo
- Link direto para recomendações no LinkedIn
- Item "Currículo" no Navbar com navegação por rota (`/curriculo`)
- CTA "Fale com a IA" nas seções Hero e About

### Alterado
- Botão "Currículo" no Hero redirecionado de PDF direto para `/curriculo`
- `Navbar.tsx`: "Roberto Nicoletti" virou link para a home (`/`)
- Links de âncora do Navbar resolvem para `/#section` quando fora da home (`usePathname`)

---

## [0.3.0] — 2026-05-16

### Adicionado
- Carrossel de projetos com drag nativo no mobile (`calc(-N*100% + dragPx)`) — `docs/features/carousel.md`
- Botões de navegação no header da seção (desktop)
- Imagens reais nos cards de projeto (`next/image` com `fill`)

### Removido
- Auto-play do carrossel
- `SmoothScroll.tsx` global (substituído por CSS + handler explícito)

### Corrigido
- Flash de tema light → dark no carregamento (FOUC) via script bloqueante no `<head>` — `docs/features/dark-mode.md`
- Botões de seta do carrossel eram clipped por `overflow-hidden`
- Direção do `translateX` no swipe estava invertida

---

## [0.2.0] — 2026-05-15

### Adicionado
- Scroll suave com `scroll-behavior: smooth` + `scroll-padding-top: 80px` no CSS
- `handleNavClick` no Navbar com smooth scroll para âncoras da home
- Vercel Analytics (`@vercel/analytics`)
- Vercel Speed Insights (`@vercel/speed-insights`)

### Alterado
- `<img>` → `next/image` no componente `About.tsx`

---

## [0.1.0] — 2026-05-15

### Adicionado
- Migração para monorepo Turborepo com pnpm workspaces
- `packages/config` com tsconfig/base, eslint/base e postcss.mjs
- App `web-nico.dev.br` com Next.js 16 + App Router
- Dark mode via CSS variables + `ThemeProvider` com `localStorage`
- Seções: Hero, About, Skills, Projects, Contact, Footer, Navbar
- CI/CD via GitHub Actions
- Deploy na Vercel
