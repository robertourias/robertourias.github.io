import type { Metadata } from "next"
import { Manrope, Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "./components/ThemeProvider"
import SmoothScroll from "./components/SmoothScroll"

const manrope = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
})

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Roberto Nicoletti | Fullstack AI Developer",
  description:
    "Desenvolvedor Fullstack com foco em Inteligência Artificial aplicada. React • Next.js • NestJS • LLMs • RAG",
  keywords: [
    "desenvolvedor fullstack",
    "desenvolvedor React",
    "Next.js",
    "inteligência artificial",
    "LLM",
    "RAG",
    "desenvolvedor frontend",
    "engenheiro de software",
    "portfolio desenvolvedor",
  ],
  authors: [{ name: "Roberto Nicoletti" }],
  creator: "Roberto Nicoletti",
  publisher: "Roberto Nicoletti",
  openGraph: {
    title: "Roberto Nicoletti | Fullstack",
    description:
      "Desenvolvedor Fullstack com foco em Inteligência Artificial aplicada.",
    url: "https://robertourias.github.io",
    siteName: "Roberto Nicoletti Portfolio",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roberto Nicoletti | Fullstack AI Developer",
    description:
      "Desenvolvedor Fullstack com foco em Inteligência Artificial aplicada.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${manrope.variable} ${inter.variable} min-h-full flex flex-col antialiased`}
      >
        <ThemeProvider>
          <SmoothScroll />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
