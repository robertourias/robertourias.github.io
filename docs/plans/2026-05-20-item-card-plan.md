# Plano Técnico: ItemCard no design system

**Spec:** `.ai-core/specs/2026-05-20-item-card.md`
**Data:** 2026-05-20
**Status:** ready

---

## Análise antes de planejar

### Partes do sistema afetadas
- `packages/ui` — novo componente `item-card.tsx` + exportação no barrel
- `apps/storybook` — nova story `ItemCard.stories.tsx`
- `apps/tools/src/app/page.tsx` — substituição dos `<div>` customizados
- `apps/challenges/src/components/ChallengeCard.tsx` — substituído por `ItemCard`

### Decisão de implementação (FR-010)
O `ChallengeCard.tsx` será mantido como wrapper fino client-only responsável pelo fallback de imagem, repassando `media` e `links` para `ItemCard`. Motivo: mantém `page.tsx` como Server Component puro e isola o `"use client"` em arquivo dedicado — padrão mais limpo que colocar `useState` dentro de `page.tsx`.

### Ambiguidades resolvidas
- `ItemCard` não usa `CardContent` (tem `border-t` indesejado quando há mídia) — layout interno próprio.
- `Button asChild` já existe em `@nico.dev/ui`; links são renderizados como `<a>` via Radix Slot.
- Storybook usa `@nico.dev/ui` como alias — mesmo padrão das stories existentes.

---

## Ordem de execução

```
Tarefa 1 — ItemCard em packages/ui (base para todas as demais)
    ├── Tarefa 2 — Story no Storybook
    ├── Tarefa 3 — apps/tools home
    └── Tarefa 4 — apps/challenges ChallengeCard
```

Tarefas 2, 3 e 4 são independentes entre si e podem ser executadas em paralelo após a Tarefa 1.

---

## Tarefa 1: Criar `ItemCard` em `packages/ui`
Tipo: feature
Agente: frontend
Depende de: nada

Criar o componente `ItemCard` no design system com slot de mídia, título, descrição e links. Exportar no barrel.

### Arquivo a criar
`packages/ui/src/components/item-card.tsx`

```tsx
import * as React from "react";
import { cn } from "../lib/utils";
import { Button } from "./button";

export interface ItemCardLink {
  label: string;
  href: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  target?: "_blank" | "_self";
  rel?: string;
}

interface ItemCardProps {
  media?: React.ReactNode;
  title: string;
  description?: string | null;
  links?: ItemCardLink[];
  className?: string;
}

export function ItemCard({ media, title, description, links, className }: ItemCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface text-foreground overflow-hidden flex flex-col",
        className
      )}
    >
      {media && <div className="overflow-hidden">{media}</div>}

      <div className="flex flex-col gap-2 p-5 flex-1">
        <h3 className="font-semibold text-foreground text-sm leading-snug">{title}</h3>

        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        )}

        {links && links.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-auto pt-1">
            {links.map((link) => (
              <Button key={link.href} variant={link.variant ?? "outline"} size="sm" asChild>
                <a href={link.href} target={link.target} rel={link.rel}>
                  {link.label}
                </a>
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

### Edição no barrel `packages/ui/src/index.ts`
Adicionar na seção `// Components — Layout`:
```ts
export * from "./components/item-card";
```

### Critérios de aceite
- [ ] Arquivo criado em `packages/ui/src/components/item-card.tsx`
- [ ] `ItemCard` e `ItemCardLink` exportados pelo barrel
- [ ] Sem `"use client"` no componente
- [ ] `pnpm --filter @nico.dev/ui exec tsc --noEmit` sem erros

---

## Tarefa 2: Story do `ItemCard` no Storybook
Tipo: chore
Agente: frontend
Depende de: Tarefa 1

Criar `apps/storybook/src/stories/ItemCard.stories.tsx` com 6 stories cobrindo todas as variações de props.

### Arquivo a criar
`apps/storybook/src/stories/ItemCard.stories.tsx`

Stories obrigatórias:
- `ComIcone` — `media={<Wrench className="h-6 w-6 text-muted-foreground m-5" />}`
- `ComImagem` — `media={<img src="https://placehold.co/400x225" alt="Preview" className="aspect-video object-cover w-full" />}`
- `SemMidia` — sem prop `media`
- `SemDescricao` — sem prop `description`
- `SemLinks` — sem prop `links`
- `MultiplosBotoes` — `links` com dois itens: `{variant: "default"}` e `{variant: "outline"}`

Seguir o padrão das stories existentes (ex: `Card.stories.tsx`): `Meta` + `StoryObj`, `title: "UI/ItemCard"`, `parameters: { layout: "centered" }`, `tags: ["autodocs"]`. Largura das stories: `w-72` (card estreito para visualização isolada).

### Critérios de aceite
- [ ] Arquivo criado
- [ ] 6 stories exportadas sem erros de TypeScript
- [ ] Storybook roda sem warnings de console nas stories do `ItemCard`

---

## Tarefa 3: Substituir cards em `apps/tools`
Tipo: refactor
Agente: frontend
Depende de: Tarefa 1

Reescrever `apps/tools/src/app/page.tsx` substituindo os `<div>` customizados por `ItemCard` de `@nico.dev/ui`. Manter a lógica de wrapper `<Link>` para tools ativas e badge "Em breve" para coming-soon.

### Mudanças em `apps/tools/src/app/page.tsx`

1. Adicionar import: `import { ItemCard } from "@nico.dev/ui"` (ou do alias configurado em tools)
2. Para cada tool, renderizar:

```tsx
const card = (
  <ItemCard
    media={<span className="text-3xl px-5 pt-5 block">{tool.icon}</span>}
    title={tool.name}
    description={tool.description}
  />
)

// active: envolver com Link
// coming-soon: envolver com div + adicionar badge abaixo (dentro de um wrapper relativo)
```

**Estratégia para o badge "Em breve":**
Como o `ItemCard` não expõe slot de badge, o wrapper do coming-soon inclui `ItemCard` + badge sobreposto ou sequencial. A opção mais simples: badge posicionado absolutamente sobre o card via wrapper relativo, ou renderizado após o `ItemCard` dentro de um `<div>` com `opacity-60`:

```tsx
<div key={tool.slug} className="relative opacity-60 cursor-not-allowed">
  <ItemCard
    media={<span className="text-3xl px-5 pt-5 block">{tool.icon}</span>}
    title={tool.name}
    description={tool.description}
  />
  <div className="absolute top-3 right-3">
    <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
      Em breve
    </span>
  </div>
</div>
```

3. Manter grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`
4. Remover o import de `Link` de next/link se não for mais necessário após a refatoração (verificar se ainda é usado).

### Critérios de aceite
- [ ] Nenhum `<div className="rounded-2xl ...">` customizado remanescente na home
- [ ] Cards "active" são clicáveis e navegam para a tool
- [ ] Cards "coming-soon" têm badge "Em breve" e aparecem com opacity reduzida
- [ ] Grid responsiva mantida
- [ ] `pnpm --filter @nico.dev/tools exec tsc --noEmit` sem erros

---

## Tarefa 4: Substituir `ChallengeCard` em `apps/challenges`
Tipo: refactor
Agente: frontend
Depende de: Tarefa 1

Reescrever `apps/challenges/src/components/ChallengeCard.tsx` como wrapper fino client-only que monta o slot `media` com fallback de imagem e repassa para `ItemCard`.

### Novo conteúdo de `ChallengeCard.tsx`

```tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import { ItemCard } from "@ui"
import type { Challenge } from "@/lib/github"

interface ChallengeCardProps {
  challenge: Challenge
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  const [imgError, setImgError] = useState(false)

  const media = (
    <div className="aspect-video relative bg-muted">
      {imgError ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-semibold text-muted-foreground select-none">
            {challenge.name.charAt(0)}
          </span>
        </div>
      ) : (
        <Image
          src={challenge.previewUrl}
          alt={`Preview de ${challenge.name}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={() => setImgError(true)}
        />
      )}
    </div>
  )

  const links = [
    { label: "Ver repositório", href: challenge.repoUrl, variant: "outline" as const, target: "_blank" as const, rel: "noopener noreferrer" },
    ...(challenge.projectUrl
      ? [{ label: "Ver projeto", href: challenge.projectUrl, variant: "default" as const, target: "_blank" as const, rel: "noopener noreferrer" }]
      : []),
  ]

  return (
    <ItemCard
      media={media}
      title={challenge.name}
      description={challenge.description}
      links={links}
    />
  )
}
```

### Critérios de aceite
- [ ] `ChallengeCard` usa `ItemCard` de `@nico.dev/ui`
- [ ] Fallback de imagem funciona (mostra inicial do nome)
- [ ] Botão "Ver projeto" aparece apenas quando `projectUrl` não é null
- [ ] `page.tsx` de challenges continua sem `"use client"`
- [ ] `pnpm --filter @nico.dev/challenges exec tsc --noEmit` sem erros

---

## Critérios de sucesso globais

- [ ] `ItemCard` existe em `packages/ui` e é exportado pelo barrel
- [ ] `pnpm --filter @nico.dev/ui exec tsc --noEmit` sem erros
- [ ] Storybook exibe as 6 stories sem erros de render
- [ ] `apps/tools` home renderiza todos os cards usando `ItemCard`; cards "active" clicáveis; "coming-soon" com badge e opacity
- [ ] `apps/challenges` home renderiza os desafios usando `ItemCard`; imagem com fallback funciona
- [ ] `pnpm --filter @nico.dev/tools build` e `pnpm --filter @nico.dev/challenges build` sem erros
- [ ] Nenhum `<div>` customizado de card remanescente nas homes de tools e challenges
