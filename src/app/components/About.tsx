export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-8 bg-surface-container-low">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="relative group">
          <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
            <img
              alt="Roberto Nicoletti"
              className="w-full h-full object-cover"
              src="/escritorio.png"
            />
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-2">
            <p className="text-primary font-sans font-bold text-xs tracking-widest uppercase">Trajetória</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-on-surface tracking-tight">
              Engenheiro de software
            </h2>
          </div>

          <p className="text-on-surface-variant text-lg leading-relaxed">
            Desenvolvedor com mais de 14 anos de experiência em Frontend, evoluindo para Fullstack com foco em Inteligência Artificial aplicada. Atuo na construção de aplicações modernas e na integração de LLMs, RAG e automações, sempre com foco em resolver problemas reais e gerar valor em produtos digitais.
          </p>
        </div>
      </div>
    </section>
  );
}