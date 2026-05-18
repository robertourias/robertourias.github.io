import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { routing } from "@/i18n/routing"
import { ThemeProvider } from "../components/ThemeProvider"
import ChatWidget from "../components/ChatWidget"

export const metadata: Metadata = {
  title: "Roberto Nicoletti | Fullstack AI Developer",
  description:
    "Desenvolvedor Fullstack com foco em Inteligência Artificial aplicada. React • Next.js • NestJS • LLMs • RAG",
  authors: [{ name: "Roberto Nicoletti" }],
  creator: "Roberto Nicoletti",
  robots: { index: true, follow: true },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as "pt" | "en" | "es")) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider>
        {children}
        <ChatWidget />
        <Analytics />
        <SpeedInsights />
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}
