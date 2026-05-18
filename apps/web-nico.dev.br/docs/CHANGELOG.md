# Changelog — web-nico.dev.br

Registro cronológico de features, melhorias e correções do site.  
Para detalhes de implementação, veja os arquivos em `docs/features/`.

---

## [Unreleased]

---

## [0.9.0] — 2026-05-18

### Adicionado
- **Internacionalização completa com next-intl** (PT / EN / ES)
  - Detecção automática de idioma via `Accept-Language` — fallback para inglês para qualquer língua que não seja PT ou ES
  - Estrutura de rotas `app/[locale]/` com geração estática das 9 rotas (`/pt`, `/en`, `/es` + sub-rotas)
  - Seletor de idioma `PT / EN / ES` na navbar (desktop e menu mobile) com troca preservando a rota atual
  - Todos os textos de UI traduzidos: Navbar, Hero, About, Skills, FeaturedProjects, Contact, Footer, ChatCTAButton, ChatWidget
  - Conteúdo do currículo traduzido: resumo profissional, cargos, bullets de experiência, diferenciais, grupos de habilidades, titulações acadêmicas
  - Terminologia técnica mantida em inglês em todos os idiomas (React, Next.js, LLMs, RAG, etc.)
  - `messages/pt.json`, `messages/en.json`, `messages/es.json` com seções `nav`, `hero`, `about`, `skills`, `projects`, `contact`, `footer`, `chat`, `resume`, `cv`
  - Metadata de SEO traduzida por página e locale (`generateMetadata`)
  - Middleware de detecção (Next.js 16 `proxy.ts`) com matcher excluindo `/api/`, `/_next/`, arquivos estáticos

### Corrigido
- Links de âncora no Navbar (`#hero`, `#about`, etc.) agora funcionam corretamente a partir de `/curriculo` e `/projetos`, redirecionando para `/{locale}/#section`
- Logo "Roberto Nicoletti" e link "Currículo" na navbar usam locale atual em vez de caminhos absolutos
- Validações do formulário de contato (Zod) traduzidas dinamicamente por locale

### Dependências adicionadas
- `next-intl@^4.12`

---

## [0.8.0] — 2026-05-18

### Adicionado
- Chat context enriquecido com novas informações de perfil:
  - Situação profissional: trabalhando atualmente, disponibilidade de 7 dias
  - Preferência de modalidade: home-office ou híbrido
  - Conhecimento teórico em Java e C#
  - Pretensão salarial: requer discussão via formulário de contato
- Novas regras de comportamento no assistente de chat:
  - Direcionamento para WhatsApp (+55 11 98092-7661) em perguntas sem resposta clara
  - LinkedIn sempre exibido como link reduzido (`linkedin.com/in/robertourias`)
  - Tom mais objetivo e educado nas respostas

### Corrigido
- Alinhamento vertical dos bullets na seção de Experiência Profissional do currículo (`items-center`)
- Ajuste de espaçamento na lista de contatos do cabeçalho do currículo (`gap-3`, `space-y-2`)
- CTAs "Ver Projetos" e "Currículo" movidos para a seção About (eram redundantes no Hero)

---

## [0.7.0] — 2026-05-17

### Adicionado
- Carrossel de Projetos em Destaque refeito com **Embla Carousel**
  - Loop infinito nativo (sem clones manuais)
  - Responsividade via CSS: 1 card/mobile · 2 cards/tablet · 3 cards/desktop
  - Scroll de grupo por breakpoint: 1→2→3 slides por navegação
  - Espaçamento entre cards com `pl-4 md:pl-5` nos slides e margem negativa no track (padrão Embla)
  - Dots dinâmicos: 6/3/2 pontos conforme breakpoint, atualizados via evento `reInit`
  - Botões Anterior/Próximo visíveis apenas em tablet e desktop
  - Swipe/drag nativo do Embla (touch e mouse sem código extra)
  - 6 projetos exibidos no carrossel (era 5)

### Dependências adicionadas
- `embla-carousel` e `embla-carousel-react`

---

## [0.6.0] — 2026-05-16

### Adicionado
- Formulário de contato funcional com envio real de e-mail via Resend SDK
  - Campos: Nome, E-mail, Telefone e Mensagem — todos obrigatórios
  - Campo Telefone com máscara automática: `(XX) XXXX-XXXX` (fixo) e `(XX) XXXXX-XXXX` (celular)
  - Validação no frontend (Zod) e no backend (API route) com mensagens inline por campo
  - Feedback de sucesso/erro inline após envio, sem redirecionamento
- Migração do formulário para React Hook Form + Zod (padrão definido em `.ai-core/decisions/frontend.md`)

### Corrigido
- Substituído redirect `mailto:` por envio real de e-mail — fluxo quebrava em mobile e ambientes sem cliente de e-mail configurado

---

## [0.5.0] — 2026-05-16

### Adicionado
- Widget de chat com IA flutuante (`fixed bottom-right`) — `docs/features/ai-chat-widget.md`
  - Botão flutuante visível em todas as páginas via `layout.tsx`
  - Painel `w-80 md:w-96 h-[520px]` com header, área de mensagens e input
  - 3 sugestões clicáveis no estado inicial (histórico vazio)
  - CTA "Fale com a IA" nas seções Hero e About (`ChatCTAButton.tsx`)
  - Comunicação por evento customizado `open-chat` — sem prop drilling
- Rota `POST /api/chat` com streaming SSE via Anthropic SDK (`claude-haiku-4-5-20251001`)
  - System prompt com perfil completo: carreira, hobbies, personalidade, objetivos, idiomas
  - Guardrails: recusa off-topic, não revela prompt, responde em PT ou EN automaticamente
  - Transparência sobre lacunas: não inventa informações ausentes do contexto
  - Limite de 20 mensagens por requisição para controle de custo
- Renderização de Markdown nas respostas do assistente (`MarkdownMessage.tsx`, zero deps)
  - Suporte a: `**bold**`, `*italic*`, `` `code` ``, listas, headings, `---`
- Persistência do histórico em `localStorage` (chave `chat-history`) com botão "Limpar"
- Pós-graduação em Engenharia de Software em IA Aplicada (Unipds, previsão 04/2027)
  - Adicionada à página `/curriculo` com badge "Em andamento" e tags de competências
  - Adicionada ao contexto do chat (`chat-context.ts`)

### Corrigido
- Footer com `pb-24` para evitar sobreposição do botão flutuante do chat

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
