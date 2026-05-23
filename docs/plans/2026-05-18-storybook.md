# Plano Técnico: Storybook — Documentação de Componentes

**Spec:** `.ai-core/specs/2026-05-18-storybook.md`
**Status:** ready
**Data:** 2026-05-18

---

## Contexto

O monorepo tem apenas `apps/web-nico.dev.br` e `packages/config`. `packages/ui` está referenciada na arquitetura mas ainda não existe — o Storybook cobrirá os componentes do site agora e ficará pronto para receber os de `packages/ui` quando criados.

**Stack relevante:**
- Storybook 8.x com builder Vite (não Next.js — Storybook roda isolado)
- Tailwind CSS v4 com `@import "tailwindcss"` e CSS variables para temas
- `useTranslations` (next-intl) em todos os componentes — exige decorator global
- Dark mode via classe `dark` no `<html>` — exige decorator e toolbar addon

**Decisão arquitetural: `apps/storybook` separado**
Os componentes de `web-nico.dev.br` serão importados via alias de path no `tsconfig.json` do Storybook apontando para `../web-nico.dev.br/src`. Não exige mover componentes para `packages/ui` nesta iteração.

---

## Arquivos novos

```
apps/storybook/
  package.json
  tsconfig.json
  vite.config.ts
  .storybook/
    main.ts          ← config principal (addons, stories glob, framework)
    preview.ts       ← decorators globais (dark mode, next-intl)
    preview.css      ← importa globals.css do web app
    manager.ts       ← tema visual do Storybook (opcional)
  src/
    stories/
      design-tokens/
        Colors.stories.tsx
        Typography.stories.tsx
      components/
        Footer.stories.tsx
        Hero.stories.tsx
        About.stories.tsx
        Skills.stories.tsx
        ProjectCard.stories.tsx
        ChatCTAButton.stories.tsx
        LocaleSwitcher.stories.tsx
        Navbar.stories.tsx
        FeaturedProjects.stories.tsx
        Contact.stories.tsx
        ChatWidget.stories.tsx
      pages/
        Home.stories.tsx
        Curriculo.stories.tsx
        Projetos.stories.tsx
```

---

## Tarefas (executar em sequência)

---

### Tarefa 1 — Scaffold do app `apps/storybook`

**Tipo:** chore | **Depende de:** nada

Criar o app com `package.json`, `tsconfig.json`, adicionar ao workspace e instalar dependências do Storybook 8 com Vite builder.

**Dependências a instalar:**
```
@storybook/react-vite       # framework principal
@storybook/addon-essentials # actions, controls, docs, backgrounds, viewport
storybook-dark-mode         # toolbar toggle para dark mode
@vitejs/plugin-react        # React support no Vite
vite                        # builder
```

**`package.json`** — scripts:
```json
{
  "name": "@nico.dev/storybook",
  "scripts": {
    "dev": "storybook dev -p 6006",
    "build": "storybook build -o storybook-static"
  }
}
```

**`tsconfig.json`** — alias de path para importar componentes do web app:
```json
{
  "compilerOptions": {
    "paths": {
      "@web/*": ["../web-nico.dev.br/src/*"],
      "@/*": ["../web-nico.dev.br/src/*"]
    }
  }
}
```

**`pnpm-workspace.yaml`** — adicionar `apps/storybook`.

Critérios de aceite:
- [ ] `pnpm install` na raiz resolve sem conflitos
- [ ] `apps/storybook` reconhecido como workspace package

Notas: Storybook 8 com Vite builder NÃO requer Next.js — é um app React standalone. Não instalar `@storybook/nextjs`.

---

### Tarefa 2 — Configuração base do Storybook (`.storybook/main.ts`)

**Tipo:** chore | **Depende de:** Tarefa 1

Configurar o Storybook para encontrar as stories, carregar os addons e resolver os path aliases do Vite.

**`.storybook/main.ts`:**
```ts
import type { StorybookConfig } from "@storybook/react-vite"
import { mergeConfig } from "vite"
import path from "path"

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-essentials",
    "storybook-dark-mode",
  ],
  framework: "@storybook/react-vite",
  viteFinal: (config) =>
    mergeConfig(config, {
      resolve: {
        alias: {
          "@web": path.resolve(__dirname, "../../web-nico.dev.br/src"),
          "@": path.resolve(__dirname, "../../web-nico.dev.br/src"),
        },
      },
      plugins: [/* @tailwindcss/vite se necessário */],
    }),
}
export default config
```

**`vite.config.ts`** — pode ser minimal (Storybook usa `viteFinal` para configuração).

Critérios de aceite:
- [ ] `pnpm dev` (no `apps/storybook`) inicia Storybook na porta 6006 sem erros
- [ ] Path aliases resolvem corretamente (importar de `@web/app/components/Footer` funciona)

---

### Tarefa 3 — Tailwind CSS v4 + CSS variables no preview

**Tipo:** chore | **Depende de:** Tarefa 2

Tailwind v4 usa `@import "tailwindcss"` ao invés de `@tailwind base/components/utilities`. Configurar o preview para carregar os estilos do web app.

**`.storybook/preview.css`:**
```css
/* Importa o globals.css do web app — inclui Tailwind v4 + CSS variables de tema */
@import "../../web-nico.dev.br/src/app/globals.css";
```

**`.storybook/preview.ts`** — importar o CSS:
```ts
import "./preview.css"
```

**`vite.config.ts`** ou `viteFinal` — adicionar plugin `@tailwindcss/vite`:
```ts
import tailwindcss from "@tailwindcss/vite"
// plugins: [react(), tailwindcss()]
```

Critérios de aceite:
- [ ] Cores CSS variables (ex: `bg-surface`, `text-primary`) aplicadas nas stories
- [ ] Sem erros de PostCSS ou Tailwind no terminal do Storybook

Notas: Tailwind v4 com Vite usa `@tailwindcss/vite` (plugin Vite nativo) em vez do PostCSS. Instalar `@tailwindcss/vite` como devDependency em `apps/storybook`.

---

### Tarefa 4 — Decorators globais: dark mode + next-intl

**Tipo:** feature | **Depende de:** Tarefa 3

Criar os dois decorators globais no `preview.ts`:

**Dark mode** via `storybook-dark-mode`:
- Quando o addon alterna para dark, aplica `document.documentElement.classList.add('dark')`
- Configurar `darkClass: 'dark'` e `lightClass: ''` no `parameters.darkMode`

**next-intl** — decorator que envolve cada story em `NextIntlClientProvider`:
```ts
import { NextIntlClientProvider } from "next-intl"
import ptMessages from "../../web-nico.dev.br/messages/pt.json"
import enMessages from "../../web-nico.dev.br/messages/en.json"
import esMessages from "../../web-nico.dev.br/messages/es.json"

const messages = { pt: ptMessages, en: enMessages, es: esMessages }

// Toolbar addon para locale
export const globalTypes = {
  locale: {
    name: "Locale",
    defaultValue: "pt",
    toolbar: {
      icon: "globe",
      items: [
        { value: "pt", title: "PT" },
        { value: "en", title: "EN" },
        { value: "es", title: "ES" },
      ],
    },
  },
}

export const decorators = [
  (Story, context) => (
    <NextIntlClientProvider
      locale={context.globals.locale}
      messages={messages[context.globals.locale]}
    >
      <Story />
    </NextIntlClientProvider>
  ),
]
```

Critérios de aceite:
- [ ] Toggle de dark mode no toolbar aplica classe `dark` e muda as cores
- [ ] Toolbar "Locale" com PT/EN/ES — ao trocar, componentes exibem o idioma correto
- [ ] Sem erros de "Missing NextIntlClientProvider" no console

---

### Tarefa 5 — Stories: componentes simples

**Tipo:** feature | **Depende de:** Tarefa 4

Criar stories para os componentes que não têm dependências complexas (sem fetch, sem router):

- `Footer.stories.tsx` — default
- `Hero.stories.tsx` — default (mock do ChatCTAButton com `fn()`)
- `About.stories.tsx` — default
- `Skills.stories.tsx` — default
- `ProjectCard.stories.tsx` — default, sem imagem (placeholder), com imagem
- `ChatCTAButton.stories.tsx` — default, variante com className customizado
- `LocaleSwitcher.stories.tsx` — default (exige mock do `useRouter` do next-intl)

Padrão de story:
```tsx
import type { Meta, StoryObj } from "@storybook/react"
import Footer from "@web/app/components/Footer"

const meta: Meta<typeof Footer> = {
  title: "Components/Footer",
  component: Footer,
}
export default meta
type Story = StoryObj<typeof Footer>

export const Default: Story = {}
```

Critérios de aceite:
- [ ] Cada componente listado tem ao menos 1 story que renderiza sem erros no console
- [ ] Stories passam no `storybook build` (sem warnings fatais)

Notas:
- `LocaleSwitcher` usa `useRouter` e `usePathname` do `@/i18n/navigation` — mockar com `jest.mock` ou Storybook `parameters.nextjs.navigation` (se disponível no Vite builder) ou substituir por stubs no decorator.
- `Hero` dispara `window.dispatchEvent` no `ChatCTAButton` — sem problema pois é um evento customizado que não quebra.

---

### Tarefa 6 — Stories: componentes complexos (Navbar, FeaturedProjects, Contact, ChatWidget)

**Tipo:** feature | **Depende de:** Tarefa 5

Componentes com dependências de router, fetch ou localStorage:

**Navbar:**
- Mock de `usePathname` (retorna `/`) e `useLocale` (retorna `pt`) via decorator local ou Storybook parameters
- Story: `Default` (home, menu fechado), `Scrolled` (com `isScrolled: true`), `MobileMenuOpen`

**FeaturedProjects:**
- Sem mock necessário — dados vêm de `projects.ts` (estático)
- Story: `Default`

**Contact:**
- Mock de `fetch("/api/contact")` via `MSW` (Mock Service Worker) ou `parameters.msw` no Storybook 8
- Stories: `Default`, `SuccessState`, `ErrorState`

**ChatWidget:**
- Mock de `fetch("/api/chat")` via MSW
- Mock de `localStorage` no `parameters.storybook` (via `beforeEach`)
- Stories: `Empty` (sem histórico), `WithHistory` (mensagens pré-carregadas)

Critérios de aceite:
- [ ] Navbar renderiza sem erros de router; links de âncora clicáveis
- [ ] Contact exibe estado de sucesso e erro sem chamar API real
- [ ] ChatWidget renderiza sem erros de localStorage

Notas: MSW no Storybook 8 + Vite requer `msw` e `msw-storybook-addon`. Alternativa mais simples: monkey-patch global de `fetch` no decorator de cada story.

---

### Tarefa 7 — Página de Design Tokens

**Tipo:** feature | **Depende de:** Tarefa 3

Documentar os tokens do design system em MDX ou stories puras:

**`Colors.stories.tsx`:** renderiza a paleta completa lendo os CSS variables do `:root` via `getComputedStyle`. Exibe nome da variável, preview de cor e valor hex.

**`Typography.stories.tsx`:** escala de tamanhos (text-xs até text-5xl), pesos (300–800), fontes (Manrope display, Inter sans).

Critérios de aceite:
- [ ] Página "Design Tokens / Colors" exibe as ~20 variáveis de cor com preview visual
- [ ] Página "Design Tokens / Typography" exibe a escala tipográfica

---

### Tarefa 8 — Stories de Páginas Compostas

**Tipo:** feature | **Depende de:** Tarefas 5 e 6

Stories que compõem múltiplos componentes em páginas completas:

- `Home.stories.tsx` — Navbar + Hero + About + Skills + FeaturedProjects + Contact + Footer
- `Curriculo.stories.tsx` — Navbar + conteúdo do currículo + Footer (dados mockados de `curriculumData`)
- `Projetos.stories.tsx` — Navbar + grid de projetos + Footer

Critérios de aceite:
- [ ] Cada página renderiza sem erros
- [ ] Scroll funciona dentro do canvas do Storybook

---

### Tarefa 9 — Turborepo + Deploy Vercel

**Tipo:** chore | **Depende de:** Tarefa 8 (build deve funcionar)

**`turbo.json`** — adicionar task de build do Storybook:
```json
{
  "tasks": {
    "storybook:build": {
      "dependsOn": [],
      "outputs": ["storybook-static/**"]
    }
  }
}
```

**`apps/storybook/vercel.json`:**
```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "storybook-static",
  "installCommand": "cd ../.. && pnpm install --frozen-lockfile",
  "framework": null
}
```

**Deploy:**
1. Criar projeto separado na Vercel apontando para `apps/storybook` (Root Directory: `apps/storybook`)
2. Após deploy, configurar domínio personalizado `storybook.nico.dev.br`

Critérios de aceite:
- [ ] `pnpm storybook:build` na raiz roda via Turborepo e gera `storybook-static/`
- [ ] `vercel.json` configurado corretamente para build monorepo
- [ ] Deploy de preview na Vercel funciona (URL pública acessível)

---

## Riscos na execução

1. **Tailwind v4 + Vite:** `@tailwindcss/vite` é o plugin correto para v4 em projetos Vite. Não usar `@tailwindcss/postcss` com Vite — pode conflitar.
2. **`useRouter` do next-intl no Storybook:** `createNavigation(routing)` retorna hooks que internamente usam `next/navigation`. No ambiente Vite/Storybook, sem o runtime do Next.js, esses hooks quebram. Solução: mockar `@/i18n/navigation` via `storybook/test` module mock ou criar um stub simples.
3. **Fonts do Google (next/font):** `Manrope` e `Inter` são carregadas via `next/font` que não existe fora do Next.js. No Storybook, importar as fontes diretamente via `@import` no `preview.css` ou usar fontes do sistema como fallback.
4. **`next/image`:** Componentes usam `<Image>` do Next.js que não funciona fora do runtime Next.js. Duas opções: (a) mockar `next/image` com `<img>` simples no `viteFinal`, (b) usar `@storybook/nextjs` ao invés de `@storybook/react-vite`. **Recomendação: usar `@storybook/nextjs`** — evita ter que mockar `next/image`, `next/font` e `next/navigation` manualmente.

> ⚠️ **Decisão revisada:** Dado que os componentes usam `next/image`, `next/font` e hooks do Next.js router, o framework recomendado para o Storybook é **`@storybook/nextjs`** (em vez de `@storybook/react-vite`). Isso elimina a necessidade de mocks manuais para APIs do Next.js. Para Tailwind v4, usar `@tailwindcss/postcss` via `postcss.config.js` dentro do `apps/storybook`.
