# Spec: Storybook — Documentação de Componentes

**Status:** approved
**Data:** 2026-05-18
**Autor:** planner-agent

---

## Problema

O projeto não tem documentação visual dos componentes. Com a crescente quantidade de componentes em `apps/web-nico.dev.br` e a biblioteca compartilhada em `packages/ui`, fica difícil visualizar estados, variantes e tokens do design system sem subir o site inteiro. Isso desacelera desenvolvimento, onboarding e revisão visual.

---

## Cenários de Usuário

- **P1 (crítico):** Como desenvolvedor do projeto, quero visualizar cada componente isolado com todos os seus estados (default, hover, dark mode, variantes) sem precisar navegar pelo site.
- **P1 (crítico):** Como desenvolvedor, quero ver os design tokens (cores, tipografia, espaçamentos) documentados em um só lugar para usá-los de forma consistente.
- **P2 (importante):** Como colaborador externo, quero acessar o Storybook publicado em `storybook.nico.dev.br` para revisar componentes sem clonar o repositório.
- **P2 (importante):** Como desenvolvedor, quero ver as páginas compostas (home, currículo, projetos) como stories para validar composição visual.
- **P3 (nice-to-have):** Como desenvolvedor, quero que o Storybook atualize automaticamente a cada push na branch `main`.

---

## Requisitos Funcionais

- **FR-001:** Um app dedicado `apps/storybook` no monorepo Turborepo, com deploy independente na Vercel.
- **FR-002:** Storybook 8.x com suporte a React 19 e Next.js 16.
- **FR-003:** Stories para todos os componentes de `apps/web-nico.dev.br/src/app/components/`: Navbar, Hero, About, Skills, FeaturedProjects, Contact, Footer, ChatCTAButton, ChatWidget, LocaleSwitcher, ProjectCard.
- **FR-004:** Stories para componentes de `packages/ui` (quando existirem).
- **FR-005:** Página de design tokens documentando: paleta de cores CSS variables (`--color-*`), escala tipográfica (fontes Manrope e Inter), espaçamentos e breakpoints Tailwind.
- **FR-006:** Stories de páginas compostas: home (composição de todas as seções), curriculo, projetos.
- **FR-007:** Decorator global de dark mode — toggle no toolbar do Storybook para alternar entre light e dark.
- **FR-008:** Decorator global para `NextIntlClientProvider` com locale configurável (PT / EN / ES) via toolbar, garantindo que componentes com `useTranslations` funcionem nas stories.
- **FR-009:** Build estático do Storybook (`storybook build`) publicado na Vercel no subdomínio `storybook.nico.dev.br`.
- **FR-010:** Script `pnpm storybook` no `apps/storybook` para desenvolvimento local na porta 6006.
- **FR-011:** Integração com Turborepo — task `storybook:build` no `turbo.json` com cache de output.

---

## Critérios de Sucesso

- [ ] `pnpm storybook` na raiz do monorepo (ou em `apps/storybook`) inicia o Storybook local na porta 6006.
- [ ] Todos os componentes de `apps/web-nico.dev.br/components/` têm pelo menos 1 story.
- [ ] Dark mode toggle funciona via toolbar — aplica classe `dark` no `<html>`.
- [ ] Locale toggle (PT/EN/ES) funciona — componentes com `useTranslations` exibem o texto no idioma selecionado.
- [ ] Página de design tokens exibe a paleta completa de cores com os valores CSS.
- [ ] Build estático (`storybook build`) gera output sem erros em `apps/storybook/storybook-static/`.
- [ ] Deploy na Vercel acessível em `storybook.nico.dev.br` (ou preview URL enquanto domínio não for configurado).
- [ ] Nenhuma regressão no build do site (`apps/web-nico.dev.br`).

---

## Fora do Escopo

- Testes de regressão visual automáticos (Chromatic ou Percy) — pode ser adicionado em iteração futura.
- Stories para API routes (`/api/chat`, `/api/contact`).
- Integração com CI/CD (GitHub Actions) nesta iteração — deploy acontece via Vercel Git integration.
- Storybook para outros apps do monorepo além de `web-nico.dev.br` e `packages/ui`.

---

## Riscos e Premissas

- **Premissa:** Storybook 8.x é compatível com React 19 e Tailwind CSS v4.
- **Risco:** Tailwind CSS v4 usa uma nova engine baseada em Vite/LightningCSS — a integração com Storybook pode exigir configuração extra de PostCSS. → Mitigação: usar `@storybook/addon-styling-webpack` ou configurar Vite builder com suporte a Tailwind v4.
- **Risco:** Componentes usam `useTranslations` (next-intl) — sem o `NextIntlClientProvider`, as stories quebram. → Mitigação: decorator global com provider e mensagens mockadas.
- **Risco:** Componentes como `Navbar` e `ChatWidget` usam `localStorage` e `window` APIs — podem causar erros no ambiente SSR/Node do Storybook. → Mitigação: mock de `localStorage` no setup do Storybook ou guards `typeof window !== 'undefined'`.
- **Risco:** O subdomínio `storybook.nico.dev.br` precisa de configuração DNS e domínio personalizado no projeto Vercel do Storybook. → Mitigação: documentar os passos de configuração DNS no plano; entrega inicial via preview URL.
- **Premissa:** O app `apps/storybook` importa os componentes de `apps/web-nico.dev.br` via imports relativos ou alias — não via pacote npm publicado, já que são do mesmo monorepo.

---

<!--
GATE DE APROVAÇÃO
Para desbloquear a criação do plano técnico, altere o Status acima de "draft" para "approved".
O agente planner NÃO deve criar tasks de implementação enquanto Status for "draft".
-->
