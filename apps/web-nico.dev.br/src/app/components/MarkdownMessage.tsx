"use client"

import React from "react"

// Renderiza inline: **bold**, *italic*, `code`
function parseInline(text: string, baseKey: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  const regex = /(\*\*([^*\n]+)\*\*|\*([^*\n]+)\*|`([^`\n]+)`)/g
  let last = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index))
    }
    const key = `${baseKey}-${match.index}`
    if (match[0].startsWith("**")) {
      nodes.push(<strong key={key} className="font-semibold">{match[2]}</strong>)
    } else if (match[0].startsWith("*")) {
      nodes.push(<em key={key}>{match[3]}</em>)
    } else {
      nodes.push(
        <code key={key} className="px-1.5 py-0.5 bg-surface-container-highest rounded text-[0.8em] font-mono">
          {match[4]}
        </code>
      )
    }
    last = match.index + match[0].length
  }

  if (last < text.length) {
    nodes.push(text.slice(last))
  }

  return nodes.length ? nodes : [text]
}

interface Block {
  type: "heading" | "ul" | "ol" | "hr" | "paragraph"
  level?: number
  items?: string[]
  text?: string
}

function parseBlocks(markdown: string): Block[] {
  const lines = markdown.split("\n")
  const blocks: Block[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Linha em branco — separa blocos
    if (line.trim() === "") {
      i++
      continue
    }

    // Heading
    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/)
    if (headingMatch) {
      blocks.push({ type: "heading", level: headingMatch[1].length, text: headingMatch[2] })
      i++
      continue
    }

    // Separador horizontal
    if (/^[-*]{3,}$/.test(line.trim())) {
      blocks.push({ type: "hr" })
      i++
      continue
    }

    // Lista não-ordenada
    if (/^[-*+]\s/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^[-*+]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*+]\s/, ""))
        i++
      }
      blocks.push({ type: "ul", items })
      continue
    }

    // Lista ordenada
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ""))
        i++
      }
      blocks.push({ type: "ol", items })
      continue
    }

    // Parágrafo — agrupa linhas contíguas não-vazias
    const paragraphLines: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^(#{1,3}\s|[-*+]\s|\d+\.\s|[-*]{3,}$)/.test(lines[i])
    ) {
      paragraphLines.push(lines[i])
      i++
    }
    if (paragraphLines.length) {
      blocks.push({ type: "paragraph", text: paragraphLines.join(" ") })
    }
  }

  return blocks
}

interface MarkdownMessageProps {
  content: string
}

export default function MarkdownMessage({ content }: MarkdownMessageProps) {
  const blocks = parseBlocks(content)

  return (
    <div className="space-y-2 text-sm leading-relaxed">
      {blocks.map((block, bi) => {
        const key = `block-${bi}`

        if (block.type === "hr") {
          return <hr key={key} className="border-outline-variant/30 my-1" />
        }

        if (block.type === "heading") {
          const Tag = (["h1", "h2", "h3"] as const)[Math.min((block.level ?? 3) - 1, 2)]
          const sizes = ["text-base font-bold", "text-sm font-bold", "text-sm font-semibold"]
          return (
            <Tag key={key} className={`${sizes[Math.min((block.level ?? 3) - 1, 2)]} text-on-surface mt-1`}>
              {parseInline(block.text ?? "", key)}
            </Tag>
          )
        }

        if (block.type === "ul") {
          return (
            <ul key={key} className="space-y-1 pl-1">
              {(block.items ?? []).map((item, ii) => (
                <li key={`${key}-${ii}`} className="flex items-start gap-2">
                  <span className="text-primary mt-1 shrink-0 text-[10px]">●</span>
                  <span>{parseInline(item, `${key}-${ii}`)}</span>
                </li>
              ))}
            </ul>
          )
        }

        if (block.type === "ol") {
          return (
            <ol key={key} className="space-y-1 pl-1">
              {(block.items ?? []).map((item, ii) => (
                <li key={`${key}-${ii}`} className="flex items-start gap-2">
                  <span className="text-primary shrink-0 font-semibold text-xs mt-0.5 min-w-[16px]">{ii + 1}.</span>
                  <span>{parseInline(item, `${key}-${ii}`)}</span>
                </li>
              ))}
            </ol>
          )
        }

        // Parágrafo
        return (
          <p key={key}>
            {parseInline(block.text ?? "", key)}
          </p>
        )
      })}
    </div>
  )
}
