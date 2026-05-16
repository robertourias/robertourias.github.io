import Anthropic from "@anthropic-ai/sdk"
import { SYSTEM_PROMPT } from "../../data/chat-context"

export const runtime = "nodejs"

interface Message {
  role: "user" | "assistant"
  content: string
}

function isValidMessages(value: unknown): value is Message[] {
  if (!Array.isArray(value) || value.length === 0) return false
  return value.every(
    (m) =>
      typeof m === "object" &&
      m !== null &&
      ((m as Message).role === "user" || (m as Message).role === "assistant") &&
      typeof (m as Message).content === "string"
  )
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  const { messages } = body as { messages: unknown }

  if (!isValidMessages(messages)) {
    return new Response(
      JSON.stringify({ error: "messages must be a non-empty array of {role, content}" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    )
  }

  // Limitar histórico a 20 mensagens para controlar custo de tokens
  const trimmed = messages.slice(-20)

  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  })

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await client.messages.stream({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: trimmed,
        })

        for await (const chunk of response) {
          if (
            chunk.type === "content_block_delta" &&
            chunk.delta.type === "text_delta"
          ) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify(chunk.delta.text)}\n\n`)
            )
          }
        }

        controller.enqueue(encoder.encode("data: [DONE]\n\n"))
        controller.close()
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error"
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ error: message })}\n\n`)
        )
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}
