"use client"

import { useState, useRef } from "react"
import Link from "next/link"
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
          <p className="font-display text-sm tracking-[0.2em] text-primary uppercase mb-4">
            Portfólio
          </p>
          <h2
            id="projects-title"
            className="font-display text-3xl md:text-5xl font-bold text-on-surface"
          >
            Projetos em Destaque
          </h2>
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
                <ProjectCard isCarousel project={project} sizes="100vw" />
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
                aria-current={currentIndex === index ? "true" : undefined}
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
