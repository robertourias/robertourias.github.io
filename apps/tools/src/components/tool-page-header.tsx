import Link from "next/link"

interface ToolPageHeaderProps {
  name: string
  description: string
}

export default function ToolPageHeader({ name, description }: ToolPageHeaderProps) {
  return (
    <header className="mb-10">
      <Link
        href="/"
        className="text-sm font-medium text-primary hover:opacity-80 transition-opacity"
      >
        ← tools.nico.dev
      </Link>
      <h1 className="text-3xl font-bold text-foreground mt-3 mb-2">{name}</h1>
      <p className="text-base text-muted-foreground max-w-2xl">{description}</p>
    </header>
  )
}
