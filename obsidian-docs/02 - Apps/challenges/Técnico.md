---
tags: [técnico, challenges, nextjs, github-api]
created: 2026-05-21
app: challenges
package: "@nico.dev/challenges"
relacionados:
  - "[[Visão Geral]]"
  - "[[../../03 - Packages/ui/Técnico — Componentes e Design System]]"
---

# challenges — Técnico

---

## Identificação

| Campo | Valor |
|-------|-------|
| Package name | `@nico.dev/challenges` |
| Versão | 0.1.0 |
| Diretório | `apps/challenges/` |
| Dev server | `pnpm --filter @nico.dev/challenges dev` (porta 3002) |
| URL produção | `challenges.nico.dev` |
| Hosting | Vercel |

---

## Stack

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| Next.js | 16.2.1 | Framework principal (App Router) |
| React | 19.2.4 | UI |
| TypeScript | ^5 | Linguagem |
| Tailwind CSS | ^4 | Estilização |
| `@nico.dev/ui` | workspace | Design System compartilhado |
| Lucide React | ^0.511.0 | Ícones |
| GitHub API | — | Fetch de dados dos desafios técnicos |

---

## Estrutura de arquivos

```
apps/challenges/
├── src/
│   ├── app/
│   │   ├── layout.tsx             → Layout raiz
│   │   ├── page.tsx               → Grid de desafios
│   │   └── [slug]/               → (planejado) Página de detalhe de cada desafio
│   ├── components/
│   │   ├── challenge-card.tsx     → Card visual de cada desafio
│   │   └── challenge-grid.tsx     → Grid responsivo de cards
│   └── lib/
│       └── github.ts              → Integração com GitHub API
├── next.config.ts
├── tsconfig.json
└── .env / .env.example
```

---

## Integração com GitHub API

O app busca os desafios diretamente do repositório `robertourias/testes-tecnicos`.

### Estratégia de fetch

```ts
// Fluxo de busca de dados
GitHub API (repositório testes-tecnicos)
  → Lista de diretórios (cada diretório = 1 desafio)
  → Para cada desafio:
      → README.md (descrição + ## Link Final)
      → package.json (tecnologias)
      → Screenshot / preview (se disponível)
```

### Parsing do Link Final

O padrão definido nos README dos desafios é:

```markdown
## Link Final
https://url-do-projeto.vercel.app
```

O parser extrai a URL após o heading `## Link Final`.

---

## Modelo de dados

```ts
interface Challenge {
  id: string;           // slug do diretório no GitHub
  company: string;      // Nome da empresa (extraído do nome do diretório)
  description: string;  // Extraído do README.md
  deployUrl: string;    // Extraído de "## Link Final" no README
  repoUrl: string;      // URL do diretório no GitHub
  technologies: string[]; // Extraído do package.json ou README
  previewUrl?: string;  // Screenshot se disponível
  date?: string;        // Data de entrega
}
```

---

## Dependências de packages internos

```json
{
  "dependencies": {
    "@nico.dev/ui": "workspace:*"
  },
  "devDependencies": {
    "@nico.dev/config": "workspace:*"
  }
}
```

---

## Variáveis de ambiente

```bash
# .env.example
GITHUB_TOKEN=                # Token do GitHub para aumentar rate limit da API
```

---

## Decisões técnicas planejadas

| Decisão | Escolha | Motivo |
|---------|---------|--------|
| Fonte de dados | GitHub API | Dados já existem no repositório público — sem necessidade de banco de dados |
| Revalidação | `revalidate: 3600` (ISR) | Cache de 1h — dados raramente mudam |
| Rendering | Server Components (RSC) | Fetch na edge, sem JavaScript no cliente para dados |
| Filtros | `ToggleFilterGroup` de `@nico.dev/ui` | Consistência com o design system |

---

## Componentes de `@nico.dev/ui` utilizados

- `Card`, `CardHeader`, `CardContent`, `CardFooter` — estrutura dos cards
- `Badge` — exibição de tecnologias
- `ToggleFilter`, `ToggleFilterGroup` — filtros por empresa/tecnologia
- `Skeleton` — loading state enquanto carrega os dados
- `Alert` — error state se a API do GitHub falhar

---

## Ver também

- [[Visão Geral]]
- [[../../03 - Packages/ui/Técnico — Componentes e Design System]]
- [[../../04 - AI Core/Fluxo de Entrega Spec-Driven]]
