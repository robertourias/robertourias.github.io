"use client";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden bg-surface"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary-container/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[5%] left-[-5%] w-[400px] h-[400px] bg-secondary-container/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center text-center">
        <div className="w-32 h-32 md:w-40 md:h-40 mb-8 rounded-full overflow-hidden border-4 border-surface-container-high">
          <img
            src="/roberto-nicoletti.png"
            alt="Roberto Nicoletti"
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="font-display text-3xl md:text-5xl font-light text-primary-fixed-dim tracking-tight mb-4">
          Fullstack Developer
        </h2>

        <p className="text-on-surface-variant text-lg md:text-xl font-medium mb-12 max-w-2xl">
          React • Next.js • NestJS • LLMs • RAG • APIs de IA • Arquitetura de Software
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <a
            href="#projects"
            className="px-10 py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-full font-semibold shadow-lg shadow-primary/10 hover:scale-105 transition-transform flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 4l16 8-8 2-2 8z" />
            </svg>
            Ver Projetos
          </a>
          <a
            href="/Curriculo-Fullstack.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 border border-outline-variant text-on-surface rounded-full font-semibold hover:bg-surface-container-low transition-all flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 4l16 8-8 2-2 8z" />
            </svg>
            Currículo
          </a>
          <a
            href="#contact"
            className="px-10 py-4 border border-outline-variant text-on-surface rounded-full font-semibold hover:bg-surface-container-low transition-all flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 4l16 8-8 2-2 8z" />
            </svg>
            Vamos Conversar
          </a>
        </div>
      </div>
    </section>
  );
}