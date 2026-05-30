# Status do Projeto

> Memória de trabalho persistente. Atualizado pelo `/checkpoint`, lido pelo `/retomar`.
> Não edite manualmente durante uma sessão ativa — use `/checkpoint` antes de fechar.

**Última atualização:** 2026-05-30
**Resumo da última sessão:** Rebalanceamento de paleta de cores do design system (packages/ui), correção de contraste no Alert dark mode, melhorias no TimerControl do metronome (presets + gain).

---

## Feature em andamento

**Spec ativo:** packages/ui/docs/specs/2026-05-30-palette-rebalance.md (Status: approved — implementado)
**Plano ativo:** packages/ui/docs/plans/2026-05-30-palette-rebalance.md (tasks 1–3 concluídas; task 4 = validação Storybook pendente)

---

## Tasks

### ✅ Concluídas (esta sessão)
- packages/ui: rebalanceamento de paleta dark/light — `tokens.css` e `colors.ts` atualizados
- packages/ui: correção de contraste Alert dark mode (borda + fundo nas 4 variantes)
- apps/storybook: `Colors.stories.tsx` atualizado com novos hex da paleta
- apps/metronome: TimerControl refatorado com presets de duração (1m/3m/5m/10m/15m) + input controlado
- apps/metronome: `audio-engine.ts` gain do click ajustado de 0.8 → 0.92

### 🔄 Em progresso
- Validação visual da paleta no Storybook (task 4 do plan palette-rebalance)

### ⏭ Próximos passos
1. Validar paleta no Storybook: `pnpm dev --filter @nico.dev/storybook`
2. Testar metronome em mobile / iOS Safari — confirmar `AudioContext.resume()` funciona no toggle
3. Deploy: configurar cada app no Vercel e adicionar os secrets no GitHub (VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID_*)
4. Avaliar destaque visual do beat 1 (stress first beat) — considerar cor distinta além do tamanho
5. Migrar `apps/web-nico.dev.br` para `@nico.dev/ui` (pendente há várias sessões)

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
