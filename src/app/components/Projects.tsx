"use client";

import { useState, useEffect, useRef } from "react";
import { projects, type Project } from "../data/projects";

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCardsToShow = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCardsToShow(1);
      } else if (width < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };

    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  // Rotação automática a cada 5 segundos (apenas desktop)
  useEffect(() => {
    if (cardsToShow > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + cardsToShow) % projects.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [cardsToShow]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - cardsToShow + projects.length) % projects.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + cardsToShow) % projects.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index * cardsToShow);
  };

  // Touch handlers para swipe com transição visual
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (cardsToShow > 1) return; // Only apply drag effect on mobile (1 card)
    touchEndX.current = e.touches[0].clientX;
    const deltaX = touchStartX.current! - touchEndX.current!;
    setTranslateX(deltaX);
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    
    const deltaX = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }

    setTranslateX(0);
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const visibleProjects = [];
  for (let i = 0; i < cardsToShow; i++) {
    visibleProjects.push(projects[(currentIndex + i) % projects.length]);
  }

  const totalDots = Math.ceil(projects.length / cardsToShow);

  return (
    <section id="projects" className="py-20 md:py-24 px-6 md:px-8 bg-surface-container-low" aria-labelledby="projects-title">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 id="projects-title" className="font-display text-sm tracking-[0.2em] text-primary uppercase mb-4">
              Portfólio
            </h2>
            <h3 className="font-display text-3xl md:text-5xl font-bold text-on-surface">
              Projetos em Destaque
            </h3>
          </div>
          <div className="hidden md:block h-[1px] flex-grow mx-12 bg-outline-variant/20 mb-4" />
        </div>

        {/* Carrossel */}
        <div 
          className="relative overflow-hidden"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 transition-transform duration-300 ease-out"
            style={{ 
              transform: cardsToShow === 1 ? `translateX(${translateX}px)` : 'none',
              willChange: 'transform'
            }}
          >
            {visibleProjects.map((project: Project) => (
              <article
                key={project.id}
                className="group bg-surface-container hover:bg-surface-container-high transition-all duration-300 rounded-xl overflow-hidden"
              >
                <div className="aspect-video relative overflow-hidden bg-surface-container-low">
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:scale-105 transition-transform duration-500" />
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex gap-2 mb-4">
                    <span className="px-2 py-0.5 bg-surface-container-highest text-[10px] text-on-surface-variant rounded-sm font-label uppercase tracking-widest">
                      {project.category}
                    </span>
                  </div>

                  <h4 className="font-display text-xl font-bold text-on-surface mb-4 hover:text-primary transition-colors">
                    {project.title}
                  </h4>

                  <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="flex gap-4 items-center">
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
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Botões de navegação - Setas (apenas desktop) */}
          <button
            onClick={handlePrev}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 z-10 p-2 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors"
            aria-label="Projeto anterior"
          >
            <svg className="w-6 h-6 text-on-surface" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 z-10 p-2 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors"
            aria-label="Próximo projeto"
          >
            <svg className="w-6 h-6 text-on-surface" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Indicadores - Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: totalDots }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`transition-all duration-300 rounded-full ${
                Math.floor(currentIndex / cardsToShow) === index
                  ? "w-8 h-2 bg-primary"
                  : "w-2 h-2 bg-outline-variant/50 hover:bg-outline-variant"
              }`}
              aria-label={`Ir para projeto ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}