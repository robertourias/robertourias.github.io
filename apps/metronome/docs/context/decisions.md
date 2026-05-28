# Decisões — Metronome (apps/metronome)

Decisões específicas deste app. Desvios em relação aos padrões globais em `docs/context/decisions.md`.

## Stack

- **Renderização**: Next.js App Router — mesmo padrão do monorepo
- **Estilização**: Tailwind CSS — igual ao padrão global
- **Componentes**: `@nico.dev/ui` obrigatório — igual ao padrão global
- **Ícones**: Lucide React — igual ao padrão global
- **Estado global**: nenhum — state local via `useState` e `useRef` (app simples e stateless)
- **Formulários**: inputs controlados com `useState` — sem React Hook Form nem Zod
- **Data fetching**: nenhum — app puramente client-side, sem API
- **Backend / ORM / Auth / Cache / Fila**: nenhum — app 100% frontend

## Áudio

- Web Audio API nativa (`AudioContext`, `OscillatorNode` ou `AudioBuffer`) — sem biblioteca externa
- Timing de alta precisão via `AudioContext.currentTime` — não usar `setInterval` para o clock do metrônomo (impreciso)

## Hospedagem

- Vercel — mesmo padrão do monorepo
- CI/CD: GitHub Actions
