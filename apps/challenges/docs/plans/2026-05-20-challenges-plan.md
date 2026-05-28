# Plano Técnico: challenges.nico.dev

**Spec:** `.ai-core/specs/2026-05-20-challenges.md`
**Data:** 2026-05-20
**Status:** ready

---

## Análise antes de planejar

### Problema resolvido
`robertourias/testes-tecnicos` está no GitHub sem interface visual. Recrutadores precisam navegar o repo bruto. Este app expõe os desafios como cards visuais com preview, descrição e links.

### Partes do sistema afetadas
- Novo app `apps/challenges` — sem impacto em `apps/web`, `apps/tools` ou `packages/*`
- `turbo.json` e `pnpm-workspace.yaml` já usam glob `apps/*` — sem edição necessária
- Nenhum backend, nenhum banco de dados, nenhuma migration

### Contrato interno
```ts
interface Challenge {
  slug: string          // nome do diretório (ex: "empresa-xpto")
  name: string          // slug formatado (ex: "Empresa Xpto")
  description: string | null
  previewUrl: string    // https://raw.githubusercontent.com/robertourias/testes-tecnicos/main/{slug}/preview.png
  repoUrl: string       // https://github.com/robertourias/testes-tecnicos/tree/main/{slug}
  projectUrl: string | null  // extraído do "Link Final" no README
}
```

### API externa consumida
- `GET https://api.github.com/repos/robertourias/testes-tecnicos/contents/`
- `GET https://api.github.com/repos/robertourias/testes-tecnicos/readme/{dir}`
- Header: `Authorization: Bearer ${GITHUB_TOKEN}`, `Accept: application/vnd.github+json`

### Ambiguidades (resolvidas pelo spec)
- `GITHUB_TOKEN` ausente → `fetchChallenges` trata o erro e relança; página exibe `Alert` destructive
- Diretório sem README → API retorna 404; tratar silenciosamente, retornar `description: null, projectUrl: null`
- `preview.png` ausente → fallback no componente via `onError` (inicial + bg-muted)
- Rate limit sem token: 60 req/h — token obrigatório em CI/CD

### Riscos
| Risco | Mitigação |
|-------|-----------|
| Rate limit GitHub sem token | `GITHUB_TOKEN` server-side obrigatório; registrado no `.env.example` |
| README sem "Link Final" | `extractProjectUrl` retorna `null`; botão "Ver projeto" omitido |
| `preview.png` ausente | `onError` no `<Image>` renderiza fallback com inicial |
| Port 3002 ocupado | Documentado no spec; verificar antes do dev |

---

## Tarefas

---

## Tarefa 1: Scaffolding de `apps/challenges`
Tipo: chore
Agente: frontend

Criar o app Next.js `@nico.dev/challenges` espelhando exatamente a estrutura de `apps/tools`. Inclui todos os arquivos de configuração necessários para o app funcionar isoladamente no monorepo.

Arquivos a criar:
- `apps/challenges/package.json`
- `apps/challenges/tsconfig.json`
- `apps/challenges/postcss.config.mjs`
- `apps/challenges/next.config.ts`
- `apps/challenges/.gitignore`
- `apps/challenges/.env.example`
- `apps/challenges/src/app/globals.css`
- `apps/challenges/src/app/layout.tsx`

Critérios de aceite:
- [ ] `pnpm install` roda sem erros depois da criação
- [ ] `pnpm --filter @nico.dev/challenges dev` sobe em `localhost:3002` sem erros
- [ ] Dark mode funciona (script inline no `<head>`)
- [ ] `next.config.ts` tem `images.remotePatterns` para `raw.githubusercontent.com`
- [ ] `.env.example` documenta `GITHUB_TOKEN`
- [ ] `globals.css` copia os tokens Pencil de `apps/tools` e `@source` aponta para `../../../../packages/ui/src/**/*.tsx`

Notas:
- `package.json`: nome `@nico.dev/challenges`, port 3002, mesma stack de `apps/tools` — sem `@anthropic-ai/sdk`
- `turbo.json` e `pnpm-workspace.yaml` NÃO precisam de edição (glob `apps/*` já cobre)
- `next.config.ts` deve ter `images.remotePatterns` para `raw.githubusercontent.com` (não `unoptimized: true`)
- Sem dependências novas além das já presentes no monorepo

---

## Tarefa 2: Tipo `Challenge` e utilitário `github.ts`
Tipo: feature
Agente: frontend
Depende de: Tarefa 1

Criar `src/lib/github.ts` com a função `fetchChallenges()` e os dois parsers de markdown (`extractDescription`, `extractProjectUrl`). Toda lógica de acesso à API do GitHub e parsing de README fica aqui.

Arquivos a criar:
- `apps/challenges/src/lib/github.ts`

Critérios de aceite:
- [ ] `fetchChallenges()` busca `contents/` da API GitHub, filtra `type === "dir"`, chama `readme/{dir}` para cada um
- [ ] Conteúdo base64 do README decodificado com `Buffer.from(content, 'base64').toString('utf-8')`
- [ ] `extractDescription`: ignora linhas vazias, headings, badges; retorna primeira linha de texto puro ≤ 160 chars (cortado na última palavra); retorna `null` se não encontrar
- [ ] `extractProjectUrl`: localiza heading com "link final" (case-insensitive), extrai primeira URL nas 5 linhas seguintes (URL pura ou `[texto](url)`); retorna `null` se não encontrar
- [ ] Diretório sem README (404) → tratado silenciosamente, retorna `description: null, projectUrl: null`
- [ ] `GITHUB_TOKEN` ausente → erro lançado (será capturado pela página)
- [ ] Array retornado ordenado por `slug` (ordem alfabética)
- [ ] TypeScript sem erros (`tsc --noEmit`)

Notas:
- `GITHUB_TOKEN` lido de `process.env.GITHUB_TOKEN` (sem prefixo `NEXT_PUBLIC_`)
- `name` gerado formatando `slug`: `slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())`
- `previewUrl`: `https://raw.githubusercontent.com/robertourias/testes-tecnicos/main/{slug}/preview.png`
- `repoUrl`: `https://github.com/robertourias/testes-tecnicos/tree/main/{slug}`
- Usar `fetch` nativo do Node 18+ (sem axios ou node-fetch)

---

## Tarefa 3: Componente `ChallengeCard`
Tipo: feature
Agente: frontend
Depende de: Tarefa 1

Criar o componente visual que renderiza um desafio. Usa `Card`, `CardContent`, `Button` de `@nico.dev/ui`. Lida com fallback de imagem.

Arquivos a criar:
- `apps/challenges/src/components/ChallengeCard.tsx`

Critérios de aceite:
- [ ] Recebe `challenge: Challenge` como prop
- [ ] Imagem `next/image` com `aspect-video`, `object-cover`, `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`
- [ ] Fallback de imagem: `onError` no `<img>` que revela `<div>` com inicial do nome em `bg-muted` (usar `useState` para controlar)
- [ ] Nome do desafio exibido
- [ ] Descrição com `line-clamp-2`; omitida se `null`
- [ ] Botão "Ver repositório" (variant `outline`, `target="_blank"`, sempre presente)
- [ ] Botão "Ver projeto" (variant `default`, `target="_blank"`); omitido se `projectUrl === null`
- [ ] TypeScript sem erros

Notas:
- Componente client (`"use client"`) apenas por causa do `useState` do fallback — todo o resto pode ser server
- Alternativa sem `useState`: usar `onError` nativo do `<img>` com manipulação de DOM via ref — preferir `useState` para manter o padrão React
- Não usar `Image` com `onError` diretamente (Next.js `Image` não suporta `onError` de forma confiável antes do Next 15); usar `<img>` dentro de um wrapper que controla o fallback via estado

---

## Tarefa 4: Página principal `/`
Tipo: feature
Agente: frontend
Depende de: Tarefas 2 e 3

Criar o Server Component da página raiz com ISR 24h, header, grid de cards, estado de erro e estado vazio. Usar componente de header reutilizável de `apps/tools` como referência visual (não importar — recriar localmente).

Arquivos a criar:
- `apps/challenges/src/app/page.tsx`

Critérios de aceite:
- [ ] `export const revalidate = 86400` no topo do módulo
- [ ] `fetchChallenges()` chamado dentro do Server Component
- [ ] Header com eyebrow "challenges.nico.dev" em `text-primary`, `<h1>` "Desafios Técnicos", descrição do spec
- [ ] Grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
- [ ] `ChallengeCard` renderizado para cada desafio
- [ ] Estado de erro: `Alert` variant `destructive` com "Não foi possível carregar os desafios. Tente novamente mais tarde." (wrap `fetchChallenges` em try/catch)
- [ ] Estado vazio: ícone + "Nenhum desafio encontrado" quando array retorna vazio
- [ ] `pnpm --filter @nico.dev/challenges build` passa sem erros
- [ ] TypeScript sem erros

Notas:
- Não criar `error.tsx` separado — o try/catch inline no Server Component é suficiente dado o spec
- Header pode ser inline na página (sem componente separado) — escopo pequeno, não há reutilização prevista
- `Alert` de `@nico.dev/ui` — verificar se o componente existe no pacote antes de usar; se não, criar inline com classes Tailwind matching o design system

---

## Ordem de execução

```
Tarefa 1 (scaffolding)
    ↓
Tarefa 2 (github.ts)
    ↓
Tarefa 3 (ChallengeCard)
    ↓
Tarefa 4 (página /)
```

---

## Critérios de sucesso globais (do spec)

- [ ] `pnpm --filter @nico.dev/challenges dev` sobe sem erros em `localhost:3002`
- [ ] `pnpm --filter @nico.dev/challenges build` passa sem erros
- [ ] TypeScript sem erros (`tsc --noEmit`)
- [ ] Página lista todos os diretórios de `robertourias/testes-tecnicos` com imagem, nome e descrição
- [ ] Botão "Ver projeto" aparece apenas quando o README tem seção "Link Final"
- [ ] Nenhuma variável com prefixo `NEXT_PUBLIC_` exposta
- [ ] `GITHUB_TOKEN` ausente não quebra o build — exibe `Alert`
