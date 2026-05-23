---
tags: [técnico, web, nextjs, app-router, i18n, resend]
created: 2026-05-21
app: web-nico.dev.br
package: "@nico.dev/web-nico.dev.br"
relacionados:
  - "[[Visão Geral]]"
  - "[[../../01 - Projeto/Técnico — Arquitetura e Stack]]"
---

# web-nico.dev.br — Técnico

---

## Identificação

| Campo | Valor |
|-------|-------|
| Package name | `@nico.dev/web-nico.dev.br` |
| Versão | 0.1.0 |
| Diretório | `apps/web-nico.dev.br/` |
| Dev server | `pnpm --filter @nico.dev/web-nico.dev.br dev` (porta 3000) |
| URL produção | `nico.dev.br` |
| Hosting | Vercel |

---

## Stack

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| Next.js | 16.2.1 | Framework principal (App Router) |
| React | 19.2.4 | UI |
| TypeScript | ^5 | Linguagem |
| Tailwind CSS | ^4 | Estilização |
| next-intl | ^4.12.0 | Internacionalização |
| Resend | ^6.10.0 | Envio de emails |
| Zod | ^4.4.3 | Validação de schemas |
| React Hook Form | ^7.76.0 | Formulários |
| Embla Carousel | ^8.6.0 | Carrossel de projetos |
| Anthropic SDK | ^0.96.0 | IA (chat widget) |
| Vercel Analytics | ^2.0.1 | Analytics |
| Vercel Speed Insights | ^2.0.0 | Performance monitoring |

---

## Estrutura de arquivos

```
apps/web-nico.dev.br/
├── src/
│   ├── app/
│   │   ├── [locale]/              → Páginas com i18n (pt/en/es)
│   │   │   ├── layout.tsx         → Layout por locale
│   │   │   ├── page.tsx           → Home
│   │   │   ├── projetos/          → Portfólio
│   │   │   └── curriculo/         → Currículo
│   │   ├── api/
│   │   │   ├── contact/           → Endpoint de formulário de contato
│   │   │   └── chat/              → Endpoint de chat com IA
│   │   ├── components/            → Componentes do app
│   │   ├── data/                  → Dados estáticos (projetos, etc.)
│   │   ├── curriculo/             → Rota de currículo
│   │   ├── projetos/              → Rota de projetos
│   │   └── docs/                  → Documentação interna
│   ├── i18n/                      → Configuração do next-intl
│   └── proxy.ts                   → Proxy config
├── messages/
│   ├── pt.json                    → Traduções PT
│   ├── en.json                    → Traduções EN
│   └── es.json                    → Traduções ES
├── public/                        → Assets estáticos
│   ├── Curriculo-Fullstack.pdf
│   ├── favico.ico / favico.png
│   └── roberto-nicoletti.png
├── next.config.ts                 → Configuração Next.js
├── tsconfig.json                  → TypeScript config
└── .env / .env.example            → Variáveis de ambiente
```

---

## Roteamento (App Router)

O roteamento segue o padrão do Next.js App Router com dynamic segment `[locale]` para i18n:

```
/                → Redireciona para /pt (locale padrão)
/pt              → Home PT
/en              → Home EN
/es              → Home ES
/pt/projetos     → Portfólio
/pt/curriculo    → Currículo
/api/contact     → POST — Envia email de contato
/api/chat        → POST — Chat com IA
```

---

## Internacionalização (next-intl)

- **Locales suportados:** `pt`, `en`, `es`
- **Locale padrão:** `pt`
- **Estratégia:** Segment dinâmico `[locale]` no App Router
- **Arquivos:** `messages/{locale}.json`

```ts
// next.config.ts — configuração de i18n
// src/i18n/ — routing e request config
```

---

## API Routes

### POST /api/contact
Recebe dados do formulário e envia email via **Resend**.

```ts
// Payload esperado
{
  name: string;
  email: string;
  message: string;
}
```

### POST /api/chat
Integração com **Anthropic SDK** para chat com IA.

---

## Variáveis de ambiente

```bash
# .env.example
RESEND_API_KEY=              # API key do Resend
ANTHROPIC_API_KEY=           # API key da Anthropic (chat widget)
```

---

## Decisões frontend específicas

- **Server Components** por padrão; `'use client'` apenas para interatividade
- **Server Actions** para mutações internas — não API routes adicionais
- **Sem `useEffect`** para fetch — dados em Server Components sempre que possível
- **Validação:** Zod + React Hook Form (blur, não keystroke)
- **Formulários:** `FormGroup` de `@nico.dev/ui` sempre
- **Tokens de cor:** sempre via classes Tailwind semânticas (`bg-primary`, `text-muted-foreground`)

---

## Performance targets

| Métrica | Target |
|---------|--------|
| LCP | < 2.5s |
| CLS | < 0.1 |
| TBT | < 200ms |
| Bundle por rota | < 150kB gzipped |

---

## Dependência de packages internos

```json
{
  "devDependencies": {
    "@nico.dev/config": "workspace:*"
  }
}
```

> ⚠️ `apps/web-nico.dev.br` ainda **não** usa `@nico.dev/ui` — migração pendente.

---

## Ver também

- [[Visão Geral]]
- [[../../03 - Packages/ui/Visão Geral]]
- [[../../01 - Projeto/Técnico — Arquitetura e Stack]]
