# Status do Projeto

> Memória de trabalho persistente. Atualizado pelo `/checkpoint`, lido pelo `/retomar`.
> Não edite manualmente durante uma sessão ativa — use `/checkpoint` antes de fechar.

**Última atualização:** 2026-05-28
**Resumo da última sessão:** Subprojeto metronome criado do zero — spec, plano técnico e implementação completa (Web Audio API, 8 componentes, página). Também reorganizados os docs em modelo distribuído (cada app/package tem seu próprio `docs/`) e todos os commands atualizados com suporte a escopo de app.

---

## Feature em andamento

**Spec ativo:** apps/metronome/docs/specs/2026-05-28-metronome-page.md (Status: approved — implementado)
**Plano ativo:** apps/metronome/docs/plans/2026-05-28-metronome-page.md (todas as tasks concluídas)

---

## Tasks

### ✅ Concluídas (esta sessão)
- Init subprojeto metronome em `docs/context/product.md`, `docs/architecture/overview.md`, `docs/context/decisions.md`, `docs/context/conventions.md`
- Reorganização docs distribuída: cada app/package (`web`, `tools`, `challenges`, `storybook`, `metronome`, `packages/ui`, `packages/config`) tem seu próprio `docs/context/`, `docs/plans/`, `docs/specs/`
- `ui-guidelines.md` movido para `packages/ui/docs/context/`
- `architecture/frontend.md` movido para `apps/web-nico.dev.br/docs/architecture/`
- Commands `back`, `front`, `plan`, `review`, `retomar`, `commit` atualizados com suporte a escopo de app/package
- T-01 metronome: scaffolding Next.js no monorepo (package.json, tsconfig, postcss, eslint, layout)
- T-02 metronome: `useMetronome` — Web Audio API + lookahead scheduler (25ms + 100ms), timer, iOS fix
- T-03 metronome: `useTapBpm` — média de 8 taps, reset 3s, clamp [20, 300]
- T-04 metronome: 8 componentes de UI (BpmDisplay, BpmSlider, BeatIndicators, MetronomeControls, BeatsControl, StressFirstBeat, TimerControl, SubdivisionPicker)
- T-05 metronome: página principal composta e verificada via Playwright

### 🔄 Em progresso
- (nenhuma — sessão encerrada com tudo commitado)

### ⏭ Próximos passos
1. Testar metronome em mobile / iOS Safari — confirmar `AudioContext.resume()` funciona no toggle
2. Deploy: configurar `metronome.nico.dev` no Vercel como subdomínio
3. Avaliar destaque visual do beat 1 (stress first beat) — tamanho maior pode não ser suficiente; considerar cor distinta
4. Testar auto-stop do timer com duração curta (ex: 0:05) manualmente
5. Verificar calculadora CLT vs PJ: `pnpm --filter @nico.dev/tools dev`
6. Migrar `apps/web-nico.dev.br` para `@nico.dev/ui` (pendente há várias sessões)

---

## Decisões desta sessão

- **Docs distribuída:** root `docs/` mantém apenas contexto global; cada app/package tem `docs/` próprio
- **Scope nos commands:** sintaxe `apps/<app>` como primeiro argumento — carrega contexto específico e direciona saída de artefatos
- **`tipo(scope): descrição`** no commit quando há escopo de app (Conventional Commits)
- **Web Audio API scheduling:** `setTimeout` 25ms + lookahead 100ms — nunca `setInterval` para o clock
- **Refs stale:** `bpmRef`, `beatsRef`, `subdivisionRef`, `stressFirstBeatRef` duplicam estado React para o scheduler evitar closures stale
- **Slider:** `<input type="range">` nativo com `linear-gradient` via `var(--primary)` — sem Slider no `@nico.dev/ui`
- **Ícones musicais:** unicode `♩ ♪ ♬` — Lucide não tem figuras musicais
- **iOS AudioContext:** criado lazy no primeiro `toggle()` + `resume()` dentro do handler de gesto do usuário

---

## Bloqueadores / Perguntas abertas

- `apps/web-nico.dev.br` ainda não migrado para `@nico.dev/ui` (pendente)
- Metronome não tem deploy configurado ainda (próxima etapa)
