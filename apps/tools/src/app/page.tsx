import Link from "next/link"
import { ItemCard } from "@ui"

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
    slug: "clt-pj",
    name: "CLT vs PJ",
    description: "Compare salário líquido entre regime CLT e PJ de forma simples.",
    icon: "💰",
    status: "active",
    href: "/clt-pj",
  },
] as const

export default function HomePage() {
  return (
    <main className="flex-1 px-6 py-12 max-w-5xl mx-auto w-full">
      <header className="mb-12">
        <p className="text-sm font-medium text-primary mb-2">tools.nico.dev</p>
        <h1 className="text-4xl font-bold text-foreground mb-3">
          Ferramentas para devs
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl">
          Coleção de utilidades web potencializadas por IA. Cada ferramenta resolve um problema real do dia a dia.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => {
          const isActive = tool.status === "active"
          const media = (
            <span className="text-3xl block px-5 pt-5" aria-hidden="true">
              {tool.icon}
            </span>
          )

          if (isActive && "href" in tool) {
            return (
              <Link key={tool.slug} href={tool.href}>
                <ItemCard
                  media={media}
                  title={tool.name}
                  description={tool.description}
                  className="hover:border-primary/50 transition-colors cursor-pointer h-full"
                />
              </Link>
            )
          }

          return (
            <div key={tool.slug} className="relative opacity-60 cursor-not-allowed">
              <ItemCard
                media={media}
                title={tool.name}
                description={tool.description}
              />
              <div className="absolute top-3 right-3">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  Em breve
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
