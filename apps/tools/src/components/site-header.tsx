import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-sm font-semibold text-foreground transition-colors hover:text-primary"
        >
          tools.nico.dev
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}
