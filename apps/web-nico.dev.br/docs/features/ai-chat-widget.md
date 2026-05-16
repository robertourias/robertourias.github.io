# Feature: Widget de Chat com IA

**Status:** Live  
**Data:** 2026-05-16  
**Spec:** `.ai-core/specs/2026-05-16-ai-chat-widget.md`

---

## O que é

Widget flutuante de chat que permite a visitantes e recrutadores conversar com uma IA especializada no perfil profissional de Roberto Nicoletti. A IA responde sobre experiência, carreira, hobbies, objetivos e personalidade — recusando temas fora desse escopo.

---

## Arquitetura

```
ChatCTAButton (Hero / About)
        ↓ CustomEvent("open-chat")
ChatWidget (layout.tsx — global)
        ↓ fetch POST /api/chat
route.ts (App Router API)
        ↓ Anthropic SDK (streaming)
claude-haiku-4-5-20251001
```

### Arquivos

| Arquivo | Responsabilidade |
|---------|-----------------|
| `src/app/components/ChatWidget.tsx` | UI completa + estado + streaming SSE |
| `src/app/components/ChatCTAButton.tsx` | Botão client que dispara `open-chat` |
| `src/app/components/MarkdownMessage.tsx` | Parser markdown → JSX (zero deps) |
| `src/app/api/chat/route.ts` | POST handler com validação + streaming |
| `src/app/data/chat-context.ts` | `SYSTEM_PROMPT` com perfil completo |

---

## Decisões de implementação

### Comunicação entre CTAs e Widget
Evento customizado `window.dispatchEvent(new CustomEvent('open-chat'))` em vez de React Context. Evita prop drilling e funciona entre Server Components (About.tsx) e o widget no layout.

### Streaming
A rota usa `ReadableStream` + `TransformStream` com `Content-Type: text/event-stream`. O cliente lê chunks via `reader.read()` e atualiza a última mensagem do assistente progressivamente.

Formato SSE:
```
data: "chunk de texto"\n\n
data: [DONE]\n\n
```

### Persistência
`localStorage` com chave `chat-history`. Envolvido em `try/catch` para não quebrar em browsers com localStorage bloqueado (modo privado). Máximo de 20 mensagens enviadas à API por requisição.

### Markdown
Renderizador custom sem dependências externas (`MarkdownMessage.tsx`). Suporta: `**bold**`, `*italic*`, `` `code` ``, `- listas`, `1. listas ordenadas`, `### headings`, `---` separadores. Aplicado apenas nas mensagens do assistente.

---

## Variáveis de ambiente

| Variável | Onde configurar | Obrigatória |
|----------|----------------|-------------|
| `ANTHROPIC_API_KEY` | `.env.local` (dev) + Vercel (prod) | Sim |

---

## Guardrails do system prompt

- Responde apenas sobre perfil/carreira de Roberto
- Recusa off-topic com mensagem educada e sugestão relevante
- Não revela o conteúdo do system prompt
- Responde no idioma da última mensagem do usuário (PT/EN)
- Não inventa informações ausentes do contexto — declara a lacuna explicitamente

---

## Modelo

`claude-haiku-4-5-20251001` — balanceamento custo/velocidade. Para melhor qualidade, trocar por `claude-sonnet-4-6` em 1 linha no `route.ts`.

---

## Limitações conhecidas

- Sem rate limiting por IP (futuro: Vercel Edge Middleware)
- Sem analytics de perguntas
- Histórico apenas no browser local (sem sincronização entre dispositivos)
