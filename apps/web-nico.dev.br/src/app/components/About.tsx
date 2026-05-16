import Image from "next/image"

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-8 bg-surface-container-low" aria-labelledby="about-title">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
        <figure className="relative group">
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
            <Image
              alt="Roberto Nicoletti em seu escritório de trabalho"
              className="object-cover"
              src="/roberto-nicoletti.png"
              fill
              priority
            />
          </div>
          <figcaption className="sr-only">Roberto Nicoletti em seu ambiente de trabalho</figcaption>
        </figure>

        <article className="space-y-8">
          <div className="space-y-2">
            <p className="text-primary font-sans font-bold text-xs tracking-widest uppercase">Trajetória</p>
            <h2 id="about-title" className="font-display text-4xl md:text-5xl font-bold text-on-surface tracking-tight">
              Engenheiro de software
            </h2>
          </div>

          <p className="text-on-surface-variant text-lg leading-relaxed">
            Desenvolvedor com mais de 14 anos de experiência em Frontend, evoluindo para Fullstack com foco em Inteligência Artificial aplicada. Atuo na construção de aplicações modernas e na integração de LLMs, RAG e automações, sempre com foco em resolver problemas reais e gerar valor em produtos digitais.
          </p>
        </article>
      </div>
    </section>
  );
}