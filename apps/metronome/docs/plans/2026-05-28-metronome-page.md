# Plano: Página do Metrônomo

**Spec:** apps/metronome/docs/specs/2026-05-28-metronome-page.md
**Data:** 2026-05-28
**App:** apps/metronome

---

## Visão geral

App puramente frontend (Next.js App Router). Sem API, sem banco, sem auth.
Todo o estado é local (`useState`, `useRef`). O timing de áudio usa Web Audio API com lookahead scheduling.

## Estrutura de arquivos a criar

```
apps/metronome/
  package.json
  next.config.ts
  tsconfig.json
  tailwind.config.ts
  src/
    app/
      layout.tsx
      page.tsx
      globals.css
    hooks/
      use-metronome.ts       ← engine principal (Web Audio API + scheduler)
      use-tap-bpm.ts         ← detecção de BPM por tap
    lib/
      tempo-names.ts         ← tabela BPM → nome do andamento
      audio-engine.ts        ← helpers Web Audio API (createClick)
      subdivisions.ts        ← definições das subdivisões e seus offsets
    components/
      bpm-display.tsx        ← número BPM + nome do andamento
      bpm-slider.tsx         ← slider range nativo + botões -/+
      beat-indicators.tsx    ← círculos animados por beat
      metronome-controls.tsx ← botões Start/Stop e Tap BPM
      beats-control.tsx      ← seletor numérico de beats (1-12)
      stress-first-beat.tsx  ← checkbox stress first beat
      timer-control.tsx      ← checkbox + input MM:SS + contagem regressiva
      subdivision-picker.tsx ← grade de figuras musicais
```

---

## Ordem de implementação

```
T-01 → T-02 → T-03 → T-04 (paralelo) → T-05
```

---

## Tarefa T-01: Scaffolding do app

**Tipo:** chore
**Agente:** frontend
**Depende de:** nada

Criar a estrutura inicial do app `apps/metronome` no monorepo Turborepo.

**O que criar:**

`package.json`:
```json
{
  "name": "@nico.dev/metronome",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3003",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@nico.dev/ui": "workspace:*",
    "next": "catalog:",
    "react": "catalog:",
    "react-dom": "catalog:"
  },
  "devDependencies": {
    "@nico.dev/config": "workspace:*",
    "@types/node": "catalog:",
    "@types/react": "catalog:",
    "@types/react-dom": "catalog:",
    "typescript": "catalog:"
  }
}
```

`tsconfig.json`: extends `@nico.dev/config/typescript/nextjs`.
`next.config.ts`: configuração mínima Next.js, transpilePackages `["@nico.dev/ui"]`.
`tailwind.config.ts`: extends preset de `@nico.dev/config`, content incluindo `../../packages/ui/src/**`.
`src/app/globals.css`: importar tokens do design system.
`src/app/layout.tsx`: `RootLayout` com font Inter, metadata básica.
Adicionar o app em `turbo.json` (pipeline `dev`, `build`).

**Critérios de aceite:**
- [ ] `pnpm --filter @nico.dev/metronome dev` sobe sem erros
- [ ] `pnpm --filter @nico.dev/metronome build` passa
- [ ] Imports de `@nico.dev/ui` funcionam

---

## Tarefa T-02: Engine de áudio — useMetronome

**Tipo:** feature
**Agente:** frontend
**Depende de:** T-01

Hook central. Encapsula todo o estado do metrônomo e o scheduler de áudio.

### Interface pública do hook

```typescript
interface MetronomeState {
  bpm: number               // 20–300, padrão 100
  beats: number             // 1–12, padrão 4
  isPlaying: boolean
  currentBeat: number       // 0-based, atualizado via rAF
  stressFirstBeat: boolean  // padrão true
  subdivision: SubdivisionId // padrão 'none'
  timerEnabled: boolean
  timerSeconds: number      // total em segundos
  timerRemaining: number    // segundos restantes, só conta quando playing
}

interface MetronomeActions {
  setBpm: (bpm: number) => void
  setBeats: (beats: number) => void
  toggle: () => void           // start/stop
  setStressFirstBeat: (v: boolean) => void
  setSubdivision: (id: SubdivisionId) => void
  setTimerEnabled: (v: boolean) => void
  setTimerSeconds: (s: number) => void
}
```

### Arquitetura do scheduler (Web Audio API)

```
┌─────────────────────────────────────────────────────────────┐
│  setTimeout(scheduler, 25ms)  ← loop de lookahead           │
│    while nextNoteTime < audioCtx.currentTime + 0.1s:        │
│      scheduleClick(beat, nextNoteTime)                       │
│      scheduleSubdivisions(beat, nextNoteTime, bpm)           │
│      advance nextNoteTime by (60/bpm) seconds               │
│      advance beat counter                                    │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│  requestAnimationFrame(draw) ← sync visual                  │
│    para cada nota agendada já passada:                       │
│      setCurrentBeat(beat)   ← atualiza estado React         │
│      remove da fila                                          │
└─────────────────────────────────────────────────────────────┘
```

**`audio-engine.ts` — helper:**
```typescript
export function createClick(
  ctx: AudioContext,
  freq: number,      // Hz
  duration: number,  // seconds
  time: number       // AudioContext.currentTime offset
): void {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.value = freq
  gain.gain.setValueAtTime(0.8, time)
  gain.gain.exponentialRampToValueAtTime(0.001, time + duration)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(time)
  osc.stop(time + duration)
}
```

**Frequências:**
- Beat 1 com stress: 900 Hz, 0.015s
- Beats normais: 600 Hz, 0.010s
- Subdivisões: 400 Hz, 0.008s

**`subdivisions.ts`:**
```typescript
export type SubdivisionId = 'none' | 'duplets' | 'triplets' | 'quadruplets'
  | 'dotted-long' | 'dotted-short' | 'quad-variant' | 'sextuplets'

export interface SubdivisionPattern {
  id: SubdivisionId
  label: string       // unicode musical
  offsets: number[]   // frações de 1 beat (ex: [0, 0.5] = dois clicks)
}
```

**Timer:** dentro do hook, um `useEffect` decrementa `timerRemaining` a cada segundo via `setTimeout` quando `isPlaying && timerEnabled`. Ao zerar, chama `toggle()`.

**iOS AudioContext:** no handler de `toggle()`, antes de iniciar: `audioCtx.resume()`.

**Critérios de aceite:**
- [ ] Metrônomo toca sem drift perceptível em 60, 120 e 200 BPM
- [ ] Mudar BPM durante a execução não reinicia o beat 1
- [ ] Stop cancela imediatamente todos os sons futuros agendados
- [ ] `currentBeat` atualiza visualmente em sincronia com o áudio

---

## Tarefa T-03: Hook useTapBpm

**Tipo:** feature
**Agente:** frontend
**Depende de:** T-01

```typescript
export function useTapBpm(onBpmChange: (bpm: number) => void) {
  // Armazena timestamps dos últimos taps
  // Se intervalo > 3000ms → resetar
  // Com 2+ taps válidos → calcular média e chamar onBpmChange
  // Clamp resultado entre 20 e 300
  return { tap: () => void }
}
```

**Critérios de aceite:**
- [ ] 4 taps regulares a 120 BPM detectam ~120 BPM (±2)
- [ ] Tap após pausa > 3s reinicia sem herdar intervalo anterior
- [ ] Resultado clampado em [20, 300]

---

## Tarefa T-04: Componentes de UI (paralelo após T-01)

**Tipo:** feature
**Agente:** frontend
**Depende de:** T-01

Cada componente é `'use client'`, recebe props tipadas, sem estado próprio.
Usar `@nico.dev/ui`: `Button`, `Checkbox`, `Input`, `Label`.
**Sem Slider no @nico.dev/ui** → usar `<input type="range">` nativo estilizado com Tailwind.

### T-04a: BpmDisplay

```typescript
interface BpmDisplayProps {
  bpm: number
  tempoName: string  // derivado de lib/tempo-names.ts
}
```
Layout: número grande centralizado (`text-8xl font-bold`) + `text-muted-foreground` para o nome.

### T-04b: BpmSlider

```typescript
interface BpmSliderProps {
  bpm: number
  onChange: (bpm: number) => void
}
```
`<input type="range" min="20" max="300">` centralizado, com botões `-` e `+` nas extremidades.
Hold contínuo: `onMouseDown` com `setInterval` de 100ms, `onMouseUp` cancela.

### T-04c: BeatIndicators

```typescript
interface BeatIndicatorsProps {
  beats: number
  currentBeat: number  // 0-based
  stressFirstBeat: boolean
  isPlaying: boolean
}
```
N círculos `w-8 h-8 rounded-full`. Beat ativo: `bg-primary`. Beat 1 (stress): tamanho ligeiramente maior.
Respeitar `prefers-reduced-motion`: sem transição de cor se preferência for reduzida.

### T-04d: MetronomeControls

```typescript
interface MetronomeControlsProps {
  isPlaying: boolean
  onToggle: () => void
  onTap: () => void
}
```
Dois botões lado a lado. Start/Stop usa variante `default` do Button. Tap BPM usa variante `secondary`.

### T-04e: BeatsControl

```typescript
interface BeatsControlProps {
  beats: number
  onChange: (beats: number) => void
}
```
Label "Beats" + botões `-` / `+` com valor centralizado. Min 1, max 12.

### T-04f: StressFirstBeat

```typescript
interface StressFirstBeatProps {
  checked: boolean
  onChange: (v: boolean) => void
}
```
`Checkbox` + `Label` do `@nico.dev/ui`.

### T-04g: TimerControl

```typescript
interface TimerControlProps {
  enabled: boolean
  onEnabledChange: (v: boolean) => void
  totalSeconds: number
  onTotalSecondsChange: (s: number) => void
  remainingSeconds: number
  isPlaying: boolean
}
```
`Checkbox` + `Label`. Quando enabled: exibir input `MM:SS`.
Quando isPlaying: exibir `remainingSeconds` formatado como contagem regressiva em vez do input.
Parsing/formatação do input: `"1:30"` → 90s.

### T-04h: SubdivisionPicker

```typescript
interface SubdivisionPickerProps {
  selected: SubdivisionId
  onChange: (id: SubdivisionId) => void
}
```
Grade de botões icon-only com figuras musicais unicode (♩ ♪♪ ♩♪♪♪ ♬♬ …).
Selecionado: fundo `bg-primary text-primary-foreground`. Não selecionado: `bg-muted`.
Ícones: caracteres unicode musicais — Lucide não possui figuras; usar `<span>` com `text-xl`.

---

## Tarefa T-05: Página principal

**Tipo:** feature
**Agente:** frontend
**Depende de:** T-02, T-03, T-04 (todos)

`src/app/page.tsx` — composição final.

```tsx
'use client'

export default function MetronomePage() {
  const metronome = useMetronome()
  const { tap } = useTapBpm(metronome.setBpm)
  const tempoName = getTempoName(metronome.bpm)

  return (
    <main className="flex flex-col items-center gap-6 px-4 py-8 max-w-lg mx-auto">
      <BpmDisplay bpm={metronome.bpm} tempoName={tempoName} />
      <BpmSlider bpm={metronome.bpm} onChange={metronome.setBpm} />
      <BeatIndicators
        beats={metronome.beats}
        currentBeat={metronome.currentBeat}
        stressFirstBeat={metronome.stressFirstBeat}
        isPlaying={metronome.isPlaying}
      />
      <MetronomeControls
        isPlaying={metronome.isPlaying}
        onToggle={metronome.toggle}
        onTap={tap}
      />
      {/* Settings panel */}
      <div className="w-full flex flex-col gap-3 border border-border rounded-lg p-4">
        <BeatsControl beats={metronome.beats} onChange={metronome.setBeats} />
        <StressFirstBeat
          checked={metronome.stressFirstBeat}
          onChange={metronome.setStressFirstBeat}
        />
        <TimerControl
          enabled={metronome.timerEnabled}
          onEnabledChange={metronome.setTimerEnabled}
          totalSeconds={metronome.timerSeconds}
          onTotalSecondsChange={metronome.setTimerSeconds}
          remainingSeconds={metronome.timerRemaining}
          isPlaying={metronome.isPlaying}
        />
        <SubdivisionPicker
          selected={metronome.subdivision}
          onChange={metronome.setSubdivision}
        />
      </div>
    </main>
  )
}
```

**Critérios de aceite:**
- [ ] Todos os FRs do spec verificados manualmente no browser
- [ ] Funciona em Chrome, Firefox e Safari (desktop)
- [ ] Sem erros de TypeScript (`pnpm typecheck`)
- [ ] Layout responsivo (mobile 375px e desktop 1280px)

---

## Notas técnicas

- **Cleanup no unmount:** `useEffect` de `useMetronome` deve cancelar o `setTimeout` do scheduler, o `requestAnimationFrame` e fechar o `AudioContext` no cleanup.
- **Não usar `setInterval` para o clock** — usar `setTimeout` de 25ms + lookahead de 100ms conforme spec.
- **`useRef` para variáveis do scheduler** — `bpm`, `beats`, `subdivision` e `stressFirstBeat` devem ser `useRef` dentro do scheduler para evitar closures stale.
- **`'use client'`** — a página inteira e todos os componentes são client components (Web Audio API é browser-only).
