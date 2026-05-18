const tools = [
  {
    slug: "weather",
    name: "Dashboard de Clima",
    description: "Previsão do tempo por localidade com dados atualizados em tempo real.",
    icon: "🌤️",
    status: "coming-soon",
  },
  {
    slug: "code-debugger",
    name: "Debugger de Código com IA",
    description: "Analise e corrija bugs no seu código com ajuda do Claude.",
    icon: "🐛",
    status: "coming-soon",
  },
  {
    slug: "document-reader",
    name: "Leitor de Documentos",
    description: "Extraia e interprete informações de documentos com OCR e IA.",
    icon: "📄",
    status: "coming-soon",
  },
  {
    slug: "semantic-search",
    name: "Buscador Semântico",
    description: "Busca por significado, não apenas por palavras-chave.",
    icon: "🔍",
    status: "coming-soon",
  },
  {
    slug: "content-classifier",
    name: "Classificador de Conteúdo",
    description: "Categorize e organize conteúdo automaticamente com IA.",
    icon: "🏷️",
    status: "coming-soon",
  },
  {
    slug: "text-analyzer",
    name: "Analisador de Texto",
    description: "Sentimento, entidades, resumo e insights sobre qualquer texto.",
    icon: "📊",
    status: "coming-soon",
  },
  {
    slug: "market",
    name: "Mercado Financeiro",
    description: "Cotações, variações e informações sobre ativos do mercado.",
    icon: "📈",
    status: "coming-soon",
  },
  {
    slug: "salary-calculator",
    name: "CLT vs PJ",
    description: "Compare salário líquido entre regime CLT e PJ de forma simples.",
    icon: "💰",
    status: "coming-soon",
  },
] as const

export default function HomePage() {
  return (
    <main className="flex-1 px-6 py-12 max-w-5xl mx-auto w-full">
      <header className="mb-12">
        <p className="text-sm font-medium text-[var(--color-primary)] mb-2">tools.nico.dev</p>
        <h1 className="text-4xl font-bold text-[var(--color-on-surface)] mb-3">
          Ferramentas para devs
        </h1>
        <p className="text-lg text-[var(--color-on-surface-variant)] max-w-xl">
          Coleção de utilidades web potencializadas por IA. Cada ferramenta resolve um problema real do dia a dia.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <div
            key={tool.slug}
            className="rounded-2xl p-6 bg-[var(--color-surface-container-low)] border border-[var(--color-outline-variant)] opacity-60 cursor-not-allowed"
          >
            <span className="text-3xl mb-4 block">{tool.icon}</span>
            <h2 className="font-semibold text-[var(--color-on-surface)] mb-1">{tool.name}</h2>
            <p className="text-sm text-[var(--color-on-surface-variant)] mb-4">{tool.description}</p>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-[var(--color-surface-container)] text-[var(--color-on-surface-variant)]">
              Em breve
            </span>
          </div>
        ))}
      </div>
    </main>
  )
}
