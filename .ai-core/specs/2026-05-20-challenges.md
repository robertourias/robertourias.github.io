# Spec: challenges.nico.dev — Portfólio de Desafios Técnicos

**Status:** draft
**Data:** 2026-05-20
**Autor:** planner-agent

---

## Problema

Os desafios técnicos resolvidos por Roberto Nicoletti estão no GitHub (`robertourias/testes-tecnicos`), mas sem uma interface visual acessível para recrutadores. Navegar pelo repositório é trabalhoso e não transmite a qualidade de entrega de forma imediata. O `challenges.nico.dev` expõe cada desafio como um card visual — com preview, descrição e links diretos — tornando a avaliação rápida e sem fricção.

---

## Cenários de Usuário

- **P1 (crítico):** Como recrutador, quero ver uma lista visual de desafios técnicos com imagem de preview e descrição curta, para avaliar rapidamente o portfólio de entregas sem precisar acessar o GitHub.
- **P1 (crítico):** Como recrutador, quero clicar em "Ver projeto" para acessar o deploy do desafio ao vivo.
- **P1 (crítico):** Como recrutador, quero clicar em "Ver repositório" para ver o código-fonte no GitHub.
- **P2 (importante):** Como visitante, quero que a página carregue instantaneamente — sem skeleton ou loading visível.

---

## Requisitos Funcionais

### Scaffolding do app (FR-001–FR-004)

- **FR-001:** Criar `apps/challenges` como subapp Next.js no monorepo, espelhando a estrutura de `apps/tools`:
  - `package.json` com nome `@nico.dev/challenges`, mesma versão Next.js, dependência `@nico.dev/ui: "workspace:*"`
  - `tsconfig.json` extendendo `@nico.dev/config/tsconfig/base.json` com paths `@/*`
  - `postcss.config.mjs` idêntico ao de `apps/tools`
  - `src/app/globals.css` com os tokens Pencil e `@source` para `packages/ui`
  - `src/app/layout.tsx` com tema dark mode (script inline)
  - `.gitignore` padrão Next.js

- **FR-002:** `next.config.ts` com `images.remotePatterns` configurado para `raw.githubusercontent.com`:
  ```ts
  images: {
    remotePatterns: [{ protocol: "https", hostname: "raw.githubusercontent.com" }]
  }
  ```

- **FR-003:** Variável de ambiente `GITHUB_TOKEN` usada somente server-side (sem prefixo `NEXT_PUBLIC_`). Deve ser registrada no `.env.example` com instrução de uso.

- **FR-004:** Adicionar `apps/challenges` ao `turbo.json` e ao `pnpm-workspace.yaml` (se necessário).

### Busca de dados via GitHub API (FR-005–FR-009)

- **FR-005:** Criar utilitário `src/lib/github.ts` com função `fetchChallenges(): Promise<Challenge[]>` que:
  1. Busca `GET https://api.github.com/repos/robertourias/testes-tecnicos/contents/` com `Authorization: Bearer ${GITHUB_TOKEN}` e `Accept: application/vnd.github+json`
  2. Filtra itens com `type === "dir"`
  3. Para cada diretório, busca `GET https://api.github.com/repos/robertourias/testes-tecnicos/readme/{dir}` (mesmo cabeçalho)
  4. Decodifica o conteúdo base64 do README
  5. Extrai descrição e link final (ver FR-006 e FR-007)
  6. Retorna array de `Challenge` ordenado por nome do diretório

- **FR-006:** Extração de **descrição curta** do README:
  - Percorrer as linhas do markdown
  - Ignorar linhas vazias, headings (`#`), badges/imagens (`![]`, `[![`)
  - Retornar a primeira linha de texto puro encontrada (máx. 160 caracteres, cortado na última palavra inteira)
  - Se nenhuma linha válida, retornar `null`

- **FR-007:** Extração do **Link Final**:
  - Localizar seção cujo heading contenha "link final" (case-insensitive): `## Link Final`, `### Link Final`, etc.
  - Extrair a primeira URL (`https://...`) nas 5 linhas seguintes ao heading
  - Suportar URL pura e link markdown `[texto](url)`
  - Retornar `null` se não encontrado

- **FR-008:** URL da imagem de preview:
  ```
  https://raw.githubusercontent.com/robertourias/testes-tecnicos/main/{dir}/preview.png
  ```

- **FR-009:** ISR — a função `fetchChallenges` deve ser chamada em um Server Component com `export const revalidate = 86400` (24 horas).

### Tipo `Challenge`

```ts
interface Challenge {
  slug: string          // nome do diretório (ex: "empresa-xpto")
  name: string          // slug formatado (ex: "Empresa Xpto")
  description: string | null
  previewUrl: string    // URL raw.githubusercontent.com
  repoUrl: string       // https://github.com/robertourias/testes-tecnicos/tree/main/{slug}
  projectUrl: string | null  // extraído do "Link Final"
}
```

### Página principal `/` (FR-010–FR-015)

- **FR-010:** Header idêntico ao padrão de `apps/tools`:
  - Eyebrow: "challenges.nico.dev" em `text-primary`
  - `<h1>`: "Desafios Técnicos"
  - Descrição: "Testes técnicos reais entregues em processos seletivos. Código-fonte e deploy disponíveis para cada desafio."

- **FR-011:** Grid responsivo de cards:
  - `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`

- **FR-012:** Cada card exibe:
  - **Imagem de preview:** `next/image` com aspect ratio 16/9 (`aspect-video`), `object-cover`, `sizes` adequado, `unoptimized={false}`; em caso de erro de carregamento, exibir fallback com inicial do nome em fundo `bg-muted`
  - **Nome** do desafio (formatado)
  - **Descrição curta** (máx. 2 linhas com `line-clamp-2`); se `null`, omitir
  - **Botão "Ver repositório"** (variant `outline`, `target="_blank"`, sempre presente)
  - **Botão "Ver projeto"** (variant `default`, `target="_blank"`); omitido se `projectUrl` for `null`

- **FR-013:** Cards usam componentes de `@nico.dev/ui`: `Card`, `CardContent`, `Button`.

- **FR-014:** Estado de erro: se `fetchChallenges()` lançar exceção durante build/render, exibir `Alert` variant `destructive` com mensagem "Não foi possível carregar os desafios. Tente novamente mais tarde."

- **FR-015:** Se a lista vier vazia (zero diretórios), exibir estado vazio: ícone + "Nenhum desafio encontrado".

---

## Critérios de Sucesso

- [ ] `pnpm --filter @nico.dev/challenges dev` sobe sem erros em `localhost:3002`
- [ ] `pnpm --filter @nico.dev/challenges build` passa sem erros
- [ ] TypeScript sem erros (`tsc --noEmit`)
- [ ] Página lista todos os diretórios de `robertourias/testes-tecnicos` com imagem, nome e descrição
- [ ] Botão "Ver projeto" aparece apenas quando o README tem seção "Link Final"
- [ ] Nenhuma variável com prefixo `NEXT_PUBLIC_` exposta
- [ ] `GITHUB_TOKEN` ausente não quebra o build — API retorna erro tratado, exibe `Alert`

---

## Fora do Escopo

- Página de detalhe por desafio (`/challenges/[slug]`)
- Filtro ou busca por tecnologia, empresa ou data
- Autenticação
- Conteúdo editável / CMS
- Ordenação manual dos cards (ordem alfabética por slug)
- Screenshot automático por URL de deploy

---

## Riscos e Premissas

- **Premissa:** Cada diretório de `robertourias/testes-tecnicos` representa um desafio e tem `README.md` na raiz.
- **Premissa:** A seção "Link Final" no README segue o padrão `## Link Final\n{url}`.
- **Risco:** Diretório sem `README.md` → a API retorna 404; mitigação: tratar o erro silenciosamente e retornar `description: null, projectUrl: null`.
- **Risco:** `preview.png` ausente → `next/image` emite erro de carregamento; mitigação: fallback via `onError` no componente Image.
- **Risco:** Rate limit sem token (60 req/h) pode falhar em builds com muitos desafios → mitigação: `GITHUB_TOKEN` obrigatório no CI/CD e na Vercel.
- **Premissa:** Port `3002` livre para dev local (tools usa `3001`).

---

<!-- 
GATE DE APROVAÇÃO
Para desbloquear a criação do plano técnico, altere o Status acima de "draft" para "approved".
O agente planner NÃO deve criar tasks de implementação enquanto Status for "draft".
-->
