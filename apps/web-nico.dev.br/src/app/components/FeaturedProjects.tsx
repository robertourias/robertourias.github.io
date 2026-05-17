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
