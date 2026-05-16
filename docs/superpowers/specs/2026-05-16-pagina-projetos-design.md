# Design: Página de Projetos + Seção Featured Refatorada

**Data:** 2026-05-16  
**Status:** Aprovado

---

## Contexto

O site `nico.dev.br` possui uma seção "Projetos em Destaque" na home que exibe todos os 11 projetos em um carrossel responsivo. O objetivo é separar a exibição em duas superfícies:

1. **Home (seção featured)**: exibe apenas uma seleção de projetos para chamar atenção sem sobrecarregar.
2. **Página `/projetos`**: exibe todos os projetos em grid completo para quem quer explorar o portfólio inteiro.

---

## Arquitetura de Arquivos

```
apps/web-nico.dev.br/src/app/
├── components/
│   ├── ProjectCard.tsx          ← novo — card reutilizável (Server Component)
│   ├── FeaturedProjects.tsx     ← novo — substitui Projects.tsx na home
│   └── Projects.tsx             ← removido
├── projetos/
│   └── page.tsx                 ← nova página (Server Component)
└── page.tsx                     ← atualizado: importa FeaturedProjects em vez de Projects
```

---

## Componentes

### `ProjectCard.tsx` — Server Component

Responsabilidade única: renderizar um card de projeto.

**Props:**
```ts
interface ProjectCardProps {
  project: Project
  sizes?: string  // para next/image responsivo
}
```

**Markup:** imagem `aspect-video` com `next/image`, badge de categoria, título, descrição, links "Visualizar" e "Repo". Reutiliza os estilos atuais de `Projects.tsx`.

---

### `FeaturedProjects.tsx` — Client Component

Seção da home. Contém lógica de carrossel apenas para mobile.

**Comportamento por breakpoint:**

| Breakpoint | Projetos exibidos | Modo |
|---|---|---|
| Mobile (`< md`) | `projects.slice(0, 3)` | Carrossel arrastável (touch + mouse), dots para 3 items |
| Desktop (`md+`) | `projects.slice(0, 2)` | Grid estático 2 colunas, sem prev/next, sem dots |

**CTA no rodapé da seção:**
```
Ver todos os projetos →   (link para /projetos)
```

**Removido em relação ao `Projects.tsx` atual:**
- Botões prev/next no desktop
- Dots no desktop
- Lógica de `cardsToShow` dinâmico
- Slice de projetos visíveis no desktop (não é mais carrossel)

---

### `/projetos/page.tsx` — Server Component

Página dedicada ao portfólio completo.

**Layout:**
- Header: label "Portfólio" + título "Todos os Projetos"
- Grid responsivo: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Todos os 11 projetos via `<ProjectCard>`
- Sem carrossel, sem navegação de páginas, sem paginação
- Utiliza `Navbar` e `Footer` do layout raiz (sem necessidade de layout próprio)

**Metadata:**
```ts
export const metadata = {
  title: "Projetos | Roberto Nicoletti",
  description: "Todos os projetos desenvolvidos — landing pages, aplicações web e produtos digitais.",
}
```

---

### `page.tsx` (home) — sem mudança estrutural

Apenas troca a importação:
```ts
// antes
import Projects from "./components/Projects";
// depois
import FeaturedProjects from "./components/FeaturedProjects";
```

---

## Navegação

- O link "Ver todos os projetos →" na `FeaturedProjects` aponta para `/projetos`.
- A navbar principal **não ganha novo item** — a página é descoberta pelo CTA na seção.
- A navbar existente já lida com rotas fora da home (resolve âncoras para `/#section`).

---

## Critérios de Sucesso

- [ ] Desktop home: exibe exatamente 2 projetos em grid estático, sem carrossel
- [ ] Mobile home: carrossel com 3 projetos, arraste funcional, dots corretos
- [ ] Link "Ver todos" presente e navega para `/projetos`
- [ ] `/projetos` exibe todos os 11 projetos em grid responsivo
- [ ] `ProjectCard` é o mesmo componente usado nas duas superfícies
- [ ] Sem regressão no dark mode, acessibilidade ou responsividade
