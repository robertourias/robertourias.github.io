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
            <p className="font-display text-sm tracking-[0.2em] text-primary uppercase mb-4">
              Portfólio
            </p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-on-surface">
              Todos os Projetos
            </h1>
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
