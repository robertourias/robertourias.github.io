# Releases

## [Unreleased]

Ver [2026-05-23](2026-05-23.md) para mudanças desta versão.

---

## [0.10.0] — 2026-05-18

### Monorepo — Design System completo (`packages/ui` + Storybook)

- feat: `@storybook/addon-a11y` — painel de acessibilidade (axe-core) em todas as stories
- feat: dark mode toggle na toolbar global do Storybook
- feat: viewports customizados `mobile375` e `desktop` em `preview.tsx`
- feat: Stories `Tokens/Colors`, `Tokens/Typography`, `Tokens/Spacing`
- feat: 19 famílias de componentes em `packages/ui` (Button, Input, Label, Textarea, Checkbox, RadioGroup, Switch, Select, FormGroup, Badge, Alert, Card, Tabs, ToggleFilter, Avatar, Calendar, DatePicker, Heatmap, Skeleton)
- feat: Storybook migrado para `@storybook/react-vite`
- feat: `CONTRIBUTING.md` na raiz com guia do design system
- chore: fix Tailwind v4 `@source` em `globals.css`

---

## [0.9.0] — 2026-05-18

- feat: internacionalização completa com next-intl (PT / EN / ES)
- feat: detecção automática de idioma via `Accept-Language`
- feat: seletor de idioma PT / EN / ES na navbar
- feat: todos os textos de UI traduzidos (Navbar, Hero, About, Skills, Contact, Footer, Chat, Resume)
- fix: links de âncora no Navbar funcionam corretamente a partir de sub-rotas

---

## [0.8.0] — 2026-05-18

- feat: chat context enriquecido (situação profissional, modalidade, pretensão salarial)
- fix: alinhamento vertical dos bullets na seção de Experiência Profissional
- fix: CTAs movidos para seção About

---

## [0.7.0] — 2026-05-17

- feat: carrossel de Projetos em Destaque refeito com Embla Carousel
- feat: loop infinito nativo, responsividade via CSS, dots dinâmicos
- chore: dependências `embla-carousel` e `embla-carousel-react`

---

## [0.6.0] — 2026-05-16

- feat: formulário de contato funcional com envio real via Resend SDK
- feat: migração do formulário para React Hook Form + Zod
- fix: substituído redirect `mailto:` por envio real de e-mail

---

## [0.5.0] — 2026-05-16

- feat: widget de chat com IA flutuante (Anthropic claude-haiku-4-5)
- feat: rota `POST /api/chat` com streaming SSE
- feat: renderização de Markdown nas respostas do assistente
- feat: persistência do histórico em `localStorage`

---

## [0.4.0] — 2026-05-16

- feat: página de currículo `/curriculo` com 7 seções
- feat: botão Download PDF na página de currículo
- feat: item "Currículo" no Navbar

---

## [0.3.0] — 2026-05-16

- feat: carrossel de projetos com drag nativo no mobile
- fix: FOUC de tema light → dark (script bloqueante no `<head>`)
- fix: botões de seta do carrossel clipped por `overflow-hidden`

---

## [0.2.0] — 2026-05-15

- feat: scroll suave com `scroll-behavior: smooth`
- feat: Vercel Analytics e Speed Insights

---

## [0.1.0] — 2026-05-15

- feat: migração para monorepo Turborepo com pnpm workspaces
- feat: app `web-nico.dev.br` com Next.js 16 + App Router
- feat: dark mode via CSS variables + `ThemeProvider`
- feat: seções Hero, About, Skills, Projects, Contact, Footer, Navbar
- feat: CI/CD via GitHub Actions + deploy na Vercel

<!--
Formato ao criar uma release:

## [1.0.0] - YYYY-MM-DD

### Added
- feat: ...

### Fixed
- fix: ...

### Changed
- refactor: ...
-->
