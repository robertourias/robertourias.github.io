# Página de Projetos + FeaturedProjects Refactor — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refatorar a seção Projects da home para mostrar apenas projetos em destaque (2 no desktop / 3 no mobile via carrossel) e criar uma página `/projetos` com grid completo de todos os projetos.

**Architecture:** Extrair `ProjectCard` como componente reutilizável; substituir `Projects.tsx` por `FeaturedProjects.tsx` (home) e criar `/projetos/page.tsx` (grid completo). Nenhuma nova dependência necessária.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS v4, TypeScript, `next/image`, `next/link`

---

## File Map

| Arquivo | Ação |
|---|---|
| `apps/web-nico.dev.br/src/app/components/ProjectCard.tsx` | **Criar** — card reutilizável (Server Component) |
| `apps/web-nico.dev.br/src/app/components/FeaturedProjects.tsx` | **Criar** — seção home (Client Component) |
| `apps/web-nico.dev.br/src/app/projetos/page.tsx` | **Criar** — página grid completo (Server Component) |
| `apps/web-nico.dev.br/src/app/page.tsx` | **Modificar** — trocar `Projects` → `FeaturedProjects` |
| `apps/web-nico.dev.br/src/app/components/Projects.tsx` | **Deletar** |

---

## Task 1: Criar ProjectCard

**Files:**
- Create: `apps/web-nico.dev.br/src/app/components/ProjectCard.tsx`

- [ ] **Step 1: Criar o arquivo**

```tsx
// apps/web-nico.dev.br/src/app/components/ProjectCard.tsx
import Image from "next/image"
import { type Project } from "../data/projects"

interface ProjectCardProps {
  project: Project
  sizes?: string
}

export default function ProjectCard({
  project,
  sizes = "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: ProjectCardProps) {
  return (
    <article className="group bg-surface-container hover:bg-surface-container-high transition-all duration-300 rounded-xl overflow-hidden">
      <div className="aspect-video relative overflow-hidden bg-surface-container-low">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes={sizes}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6 md:p-8">
        <div className="flex gap-2 mb-4">
          <span className="px-2 py-0.5 bg-surface-container-highest text-[10px] text-on-surface-variant rounded-sm font-label uppercase tracking-widest">
            {project.category}
          </span>
        </div>
        <h3 className="font-display text-xl font-bold text-on-surface mb-4 hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
          {project.description}
        </p>
        <div className="flex gap-4 items-center">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-container flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors"
              aria-label={`Ver demonstração do projeto ${project.title}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Visualizar
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-outline hover:text-on-surface flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors"
              aria-label={`Ver código fonte do projeto ${project.title}`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.201-6.086 8.201-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Repo
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
```

- [ ] **Step 2: Verificar type-check**

```bash
cd apps/web-nico.dev.br && pnpm exec tsc --noEmit
```

Esperado: sem erros.

- [ ] **Step 3: Commit**

```bash
git add apps/web-nico.dev.br/src/app/components/ProjectCard.tsx
git commit -m "feat: add ProjectCard reusable component"
```

---

## Task 2: Criar FeaturedProjects

**Files:**
- Create: `apps/web-nico.dev.br/src/app/components/FeaturedProjects.tsx`

Mobile: carrossel com os 3 primeiros projetos, cards inline (precisam de `pointer-events-none` e `stopPropagation` para não interferir com o drag).  
Desktop: grid estático de 2 colunas usando `ProjectCard`.

- [ ] **Step 1: Criar o arquivo**

```tsx
// apps/web-nico.dev.br/src/app/components/FeaturedProjects.tsx
"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { projects, type Project } from "../data/projects"
import ProjectCard from "./ProjectCard"

const FEATURED_DESKTOP = projects.slice(0, 2)
const FEATURED_MOBILE = projects.slice(0, 3)

export default function FeaturedProjects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef<number | null>(null)

  const handleDragStart = (clientX: number) => {
    dragStartX.current = clientX
    setIsDragging(true)
  }

  const handleDragMove = (clientX: number) => {
    if (!isDragging || dragStartX.current === null) return
    setDragOffset(clientX - dragStartX.current)
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    const threshold = 60
    if (dragOffset < -threshold && currentIndex < FEATURED_MOBILE.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else if (dragOffset > threshold && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
    setDragOffset(0)
    setIsDragging(false)
    dragStartX.current = null
  }

  return (
    <section
      id="projects"
      className="py-20 md:py-24 px-6 md:px-8 bg-surface-container-low"
      aria-labelledby="projects-title"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16">
          <h2
            id="projects-title"
            className="font-display text-sm tracking-[0.2em] text-primary uppercase mb-4"
          >
            Portfólio
          </h2>
          <h3 className="font-display text-3xl md:text-5xl font-bold text-on-surface">
            Projetos em Destaque
          </h3>
        </div>

        {/* Mobile: carrossel com 3 itens */}
        <div
          className="md:hidden overflow-hidden select-none"
          aria-label="Carrossel de projetos em destaque"
        >
          <div
            className={`flex ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            style={{
              transform: `translateX(calc(${-currentIndex * 100}% + ${dragOffset}px))`,
              transition: isDragging ? "none" : "transform 0.3s ease-out",
              willChange: "transform",
            }}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
            onTouchEnd={handleDragEnd}
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseMove={(e) => handleDragMove(e.clientX)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
          >
            {FEATURED_MOBILE.map((project: Project) => (
              <div key={project.id} className="shrink-0 w-full" draggable={false}>
                <article className="group bg-surface-container rounded-xl overflow-hidden">
                  <div className="aspect-video relative overflow-hidden bg-surface-container-low">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      draggable={false}
                      sizes="100vw"
                      className="object-cover pointer-events-none"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex gap-2 mb-4">
                      <span className="px-2 py-0.5 bg-surface-container-highest text-[10px] text-on-surface-variant rounded-sm font-label uppercase tracking-widest">
                        {project.category}
                      </span>
                    </div>
                    <h4 className="font-display text-xl font-bold text-on-surface mb-4">
                      {project.title}
                    </h4>
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>
                    <div className="flex gap-4 items-center">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary-container flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors"
                          aria-label={`Ver demonstração do projeto ${project.title}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Visualizar
                        </a>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-outline hover:text-on-surface flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors"
                          aria-label={`Ver código fonte do projeto ${project.title}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.201-6.086 8.201-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          Repo
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>

          {/* Dots para mobile */}
          <div className="flex justify-center gap-2 mt-8">
            {FEATURED_MOBILE.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === index
                    ? "w-8 h-2 bg-primary"
                    : "w-2 h-2 bg-outline-variant/50 hover:bg-outline-variant"
                }`}
                aria-label={`Ir para projeto ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: grid estático 2 colunas */}
        <div className="hidden md:grid md:grid-cols-2 gap-8">
          {FEATURED_DESKTOP.map((project: Project) => (
            <ProjectCard
              key={project.id}
              project={project}
              sizes="(max-width: 1024px) 50vw, 40vw"
            />
          ))}
        </div>

        {/* CTA: Ver todos */}
        <div className="mt-12 text-center">
          <Link
            href="/projetos"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-container font-bold text-sm uppercase tracking-widest transition-colors"
          >
            Ver todos os projetos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verificar type-check**

```bash
cd apps/web-nico.dev.br && pnpm exec tsc --noEmit
```

Esperado: sem erros.

- [ ] **Step 3: Commit**

```bash
git add apps/web-nico.dev.br/src/app/components/FeaturedProjects.tsx
git commit -m "feat: add FeaturedProjects component (home section, 2 desktop / 3 mobile)"
```

---

## Task 3: Atualizar home e deletar Projects.tsx

**Files:**
- Modify: `apps/web-nico.dev.br/src/app/page.tsx`
- Delete: `apps/web-nico.dev.br/src/app/components/Projects.tsx`

- [ ] **Step 1: Atualizar page.tsx**

Substituir o conteúdo completo de `apps/web-nico.dev.br/src/app/page.tsx`:

```tsx
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import FeaturedProjects from "./components/FeaturedProjects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <FeaturedProjects />
      <Contact />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Verificar type-check**

```bash
cd apps/web-nico.dev.br && pnpm exec tsc --noEmit
```

Esperado: sem erros. Se aparecer erro referenciando `Projects`, significa que algum outro arquivo ainda importa o componente deletado — corrija o import.

- [ ] **Step 4: Commit**

```bash
git add apps/web-nico.dev.br/src/app/page.tsx
git rm apps/web-nico.dev.br/src/app/components/Projects.tsx
git commit -m "refactor: replace Projects with FeaturedProjects on home page"
```

---

## Task 4: Criar página /projetos

**Files:**
- Create: `apps/web-nico.dev.br/src/app/projetos/page.tsx`

- [ ] **Step 1: Criar o diretório e arquivo**

```bash
mkdir -p apps/web-nico.dev.br/src/app/projetos
```

```tsx
// apps/web-nico.dev.br/src/app/projetos/page.tsx
import type { Metadata } from "next"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import ProjectCard from "../components/ProjectCard"
import { projects } from "../data/projects"

export const metadata: Metadata = {
  title: "Projetos | Roberto Nicoletti",
  description:
    "Todos os projetos desenvolvidos — landing pages, aplicações web e produtos digitais.",
}

export default function ProjetosPage() {
  return (
    <main>
      <Navbar />

      <div className="pt-28 pb-20 px-6 md:px-8 bg-surface min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16">
            <h1 className="font-display text-sm tracking-[0.2em] text-primary uppercase mb-4">
              Portfólio
            </h1>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-on-surface">
              Todos os Projetos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
```

- [ ] **Step 2: Verificar type-check**

```bash
cd apps/web-nico.dev.br && pnpm exec tsc --noEmit
```

Esperado: sem erros.

- [ ] **Step 3: Commit**

```bash
git add apps/web-nico.dev.br/src/app/projetos/page.tsx
git commit -m "feat: add /projetos page with full project grid"
```

---

## Task 5: Verificação final

- [ ] **Step 1: Build de produção**

```bash
cd apps/web-nico.dev.br && pnpm build
```

Esperado: build concluído sem erros. Se aparecer erro de imagem não otimizada ou domínio não configurado, verifique `next.config` — mas imagens locais (`/projects/...`) não precisam de config adicional.

- [ ] **Step 2: Iniciar dev server e verificar manualmente**

```bash
pnpm dev
```

Abrir `http://localhost:3000` e verificar:
- [ ] Seção home desktop: exibe exatamente 2 cards lado a lado, sem botões prev/next, sem dots
- [ ] Link "Ver todos os projetos →" aparece abaixo dos cards
- [ ] Abrir `http://localhost:3000/projetos`: exibe os 11 projetos em grid (1 col → 2 col md → 3 col lg)
- [ ] Redimensionar para mobile (< 768px) na home: carrossel com 3 cards, dots aparecem, arraste funciona
- [ ] Dark mode: ambas as páginas respeitam o tema
- [ ] Navbar na `/projetos`: link "Projetos" resolve para `/#projects` (comportamento já implementado via `getHref`)

- [ ] **Step 3: Commit final se houver ajustes**

```bash
git add -p
git commit -m "fix: visual adjustments after manual verification"
```
