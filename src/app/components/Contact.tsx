export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-24 px-6 md:px-8 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          <div className="md:col-span-5 space-y-10 md:space-y-12">
            <div>
              <h3 className="font-display text-sm tracking-[0.2em] text-primary uppercase mb-4">
                Comunicação
              </h3>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-on-surface">
                Vamos Conversar.
              </h2>
            </div>

            <div className="space-y-6">
              <a
                className="flex items-center gap-6 group"
                href="https://www.linkedin.com/in/robertourias/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-surface-container rounded-lg group-hover:bg-primary transition-colors">
                  <svg className="w-5 h-5 text-on-surface group-hover:text-on-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] text-outline uppercase tracking-widest">LinkedIn</div>
                  <div className="text-on-surface font-semibold">/in/robertourias</div>
                </div>
              </a>

              <a
                className="flex items-center gap-6 group"
                href="https://wa.me/5511980927661"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-surface-container rounded-lg group-hover:bg-primary transition-colors">
                  <svg className="w-5 h-5 text-on-surface group-hover:text-on-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124.272-1.254.852-1.252 1.106-.001 2.078.134 2.846.622 1.514.976 2.14 2.744 2.14 4.615-.001 4.037-3.347 7.072-7.455 7.072-1.23.001-2.39-.381-3.306-1.113l-6.018 1.677 1.678-6.018c.461-1.21.117-2.67-.867-2.67-1.16-.001-2.124.622-2.879 1.664l-.892 1.772-1.823-1.117zm-3.68-8.818c.566 0 .866.401.866.803 0 .395-.22.783-.564.887-.36.11-.717.164-1.155.164-.447 0-.82-.058-1.125-.175-.298-.114-.535-.276-.704-.444-.171-.17-.289-.37-.353-.594l-.02-.216c-.033-.188-.019-.388.043-.575.063-.19.172-.356.328-.495l.197-.25c.116-.135.268-.232.455-.29.19-.058.42-.102.664-.131.244-.03.531-.044.86-.044 1.065-.001 1.936.415 2.422 1.164.485.748.679 1.705.579 2.684-.107 1.033-.537 1.964-1.226 2.654-.69.69-1.602 1.13-2.56 1.238-1.027.115-2.024-.097-2.795-.595-.769-.498-1.265-1.212-1.393-2.008l-.029-.245c-.128-.937.138-1.884.752-2.582.616-.697 1.488-1.102 2.453-1.139.949-.036 1.876.182 2.603.61l.218.127c.21.123.387.279.518.462.13.183.2.39.209.616l.022.262c-.016.187.028.382.129.567.103.188.263.347.472.466l.216.143c.156.09.34.145.531.162.19.017.39.011.594.001.402-.02.768-.132 1.072-.323.297-.188.514-.45.638-.77.124-.32.162-.677.111-1.027l-.018-.114c-.053-.337-.226-.628-.487-.823-.263-.196-.589-.303-.938-.308-.35-.004-.684.109-.978.331-.29.22-.48.539-.56.928l-.023.224c.012.36.15.702.397.987.247.284.586.474.958.533.372.06.765.01 1.127-.143l.219-.097c.222-.099.418-.234.58-.402.162-.167.272-.372.326-.601.054-.23.052-.473-.006-.696l-.015-.074z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] text-outline uppercase tracking-widest">WhatsApp</div>
                  <div className="text-on-surface font-semibold">+55 11 98092-7661</div>
                </div>
              </a>

              <a
                className="flex items-center gap-6 group"
                href="https://github.com/robertourias"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-surface-container rounded-lg group-hover:bg-primary transition-colors">
                  <svg className="w-5 h-5 text-on-surface group-hover:text-on-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.201-6.086 8.201-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] text-outline uppercase tracking-widest">GitHub</div>
                  <div className="text-on-surface font-semibold">@robertourias</div>
                </div>
              </a>
            </div>
          </div>

          <div className="md:col-span-7 bg-surface-container-low p-8 md:p-10 rounded-2xl">
            <h4 className="font-display text-xl font-bold mb-8">Nova Mensagem</h4>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-outline">Seu Nome</label>
                  <input
                    className="w-full bg-surface-container-high border-none rounded-sm px-4 py-3 focus:ring-1 focus:ring-primary text-on-surface placeholder:text-outline/30 outline-none transition-colors"
                    placeholder="Nome Sobrenome"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-outline">E-mail de Contato</label>
                  <input
                    className="w-full bg-surface-container-high border-none rounded-sm px-4 py-3 focus:ring-1 focus:ring-primary text-on-surface placeholder:text-outline/30 outline-none transition-colors"
                    placeholder="voce@dominio.com"
                    type="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-outline">Mensagem</label>
                <textarea
                  className="w-full bg-surface-container-high border-none rounded-sm px-4 py-3 focus:ring-1 focus:ring-primary text-on-surface placeholder:text-outline/30 outline-none transition-colors resize-none"
                  placeholder="Descreva seu projeto ou ideia..."
                  rows={4}
                />
              </div>

              <button
                className="w-full py-4 bg-primary text-on-primary font-bold tracking-widest uppercase text-xs rounded-full hover:bg-primary-container transition-colors shadow-[0_20px_40px_rgba(0,218,243,0.08)]"
                type="submit"
              >
                Iniciar Contato
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}