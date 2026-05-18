"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"
import { useTransition } from "react"

const locales = [
  { code: "pt", label: "PT" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
] as const

export default function LocaleSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleChange = (nextLocale: string) => {
    if (nextLocale === locale) return
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <div
      className="flex items-center gap-1"
      role="group"
      aria-label="Selecionar idioma"
    >
      {locales.map(({ code, label }, i) => (
        <span key={code} className="flex items-center">
          <button
            onClick={() => handleChange(code)}
            aria-label={`Mudar idioma para ${label}`}
            aria-current={locale === code ? "true" : undefined}
            disabled={isPending}
            className={`text-xs font-semibold tracking-wider transition-colors px-0.5 disabled:opacity-50 ${
              locale === code
                ? "text-primary"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {label}
          </button>
          {i < locales.length - 1 && (
            <span className="text-outline-variant/50 text-xs mx-0.5" aria-hidden="true">
              /
            </span>
          )}
        </span>
      ))}
    </div>
  )
}
