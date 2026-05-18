"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import useEmblaCarousel from "embla-carousel-react"
import { projects } from "../data/projects"
import ProjectCard from "./ProjectCard"

const ITEMS = projects.slice(0, 6)

export default function FeaturedProjects() {
  const t = useTranslations("projects")

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
    },
  })

  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!emblaApi) return

    const updateSnaps = () => setScrollSnaps(emblaApi.scrollSnapList())
    const updateSelected = () => setSelectedIndex(emblaApi.selectedScrollSnap())

    updateSnaps()
    updateSelected()

    emblaApi
      .on("reInit", updateSnaps)
      .on("reInit", updateSelected)
      .on("select", updateSelected)

    return () => {
      emblaApi
        .off("reInit", updateSnaps)
        .off("reInit", updateSelected)
        .off("select", updateSelected)
    }
  }, [emblaApi])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi])

  return (
    <section
      id="projects"
      className="py-20 md:py-24 px-6 md:px-8 bg-surface-container-low"
      aria-labelledby="projects-title"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16">
          <p className="font-display text-sm tracking-[0.2em] text-primary uppercase mb-4">
            {t("tag")}
          </p>
          <h2
            id="projects-title"
            className="font-display text-3xl md:text-5xl font-bold text-on-surface"
          >
            {t("title")}
          </h2>
        </div>

        <div className="relative">
          <button
            onClick={scrollPrev}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-[calc(50%+1.5rem)] -translate-x-5 z-10 w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors shadow items-center justify-center text-on-surface"
            aria-label={t("ariaPrev")}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={scrollNext}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-[calc(50%+1.5rem)] translate-x-5 z-10 w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors shadow items-center justify-center text-on-surface"
            aria-label={t("ariaNext")}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            ref={emblaRef}
            className="overflow-hidden"
            role="region"
            aria-label={t("ariaCarousel")}
          >
            <div className="flex -ml-4 md:-ml-5">
              {ITEMS.map((project) => (
                <div
                  key={project.id}
                  className="min-w-0 flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4 md:pl-5"
                >
                  <ProjectCard
                    isCarousel
                    project={project}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`transition-all duration-300 rounded-full ${
                  selectedIndex === i
                    ? "w-8 h-2 bg-primary"
                    : "w-2 h-2 bg-outline-variant/50 hover:bg-outline-variant"
                }`}
                aria-label={t("ariaPage", { current: i + 1, total: scrollSnaps.length })}
                aria-current={selectedIndex === i ? "true" : undefined}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/projetos"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-container font-bold text-sm uppercase tracking-widest transition-colors"
          >
            {t("viewAll")}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
