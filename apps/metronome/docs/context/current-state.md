# Status — Metronome (apps/metronome)

**Última atualização:** 2026-05-28
**Resumo:** Implementação completa da página do metrônomo — scaffolding, engine de áudio, hooks e todos os componentes de UI.

---

## Feature em andamento

**Spec ativo:** apps/metronome/docs/specs/2026-05-28-metronome-page.md (Status: approved)
**Plano ativo:** apps/metronome/docs/plans/2026-05-28-metronome-page.md

---

## Tasks

### ✅ Concluídas
- T-01: Scaffolding (package.json, tsconfig, next.config, postcss, eslint, layout, page placeholder)
- T-02: `useMetronome` hook — Web Audio API + lookahead scheduler + timer
- T-03: `useTapBpm` hook — média de até 8 taps, reset em 3s
- T-04: Componentes de UI — BpmDisplay, BpmSlider, BeatIndicators, MetronomeControls, BeatsControl, StressFirstBeat, TimerControl, SubdivisionPicker
- T-05: Página principal — composição final, verificação em browser (Playwright)

### 🔄 Em progresso
- (nenhuma)

### ⏭ Próximos passos
1. Testar em mobile (iOS Safari — AudioContext.resume())
2. Avaliar tamanho/contraste do beat 1 (stress first beat pode ter destaque adicional de cor)
3. Testar auto-stop do timer manualmente com timer curto (ex: 0:05)
4. Adicionar metrônomo à página de portfólio (product.md)
5. Deploy no Vercel como subdomínio `metronome.nico.dev`

---

## Decisões desta sessão

- `AudioContext` criado lazy no primeiro toggle (iOS-safe)
- `setTimeout` 25ms + lookahead 100ms para o scheduler — não `setInterval`
- Refs duplicam estado para scheduler evitar stale closures
- `<input type="range">` nativo estilizado com CSS linear-gradient (sem Slider no @nico.dev/ui)
- Figuras musicais via unicode (♩ ♪ ♬) — Lucide não tem notas musicais
