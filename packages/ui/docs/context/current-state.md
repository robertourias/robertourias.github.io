# Status — @nico.dev/ui (packages/ui)

**Última atualização:** 2026-05-30
**Resumo:** Rebalanceamento de paleta de cores (light + dark) e correção de contraste do componente Alert no dark mode.

---

## Feature em andamento

**Spec ativo:** packages/ui/docs/specs/2026-05-30-palette-rebalance.md (Status: approved — implementado)
**Plano ativo:** packages/ui/docs/plans/2026-05-30-palette-rebalance.md (todas as tasks concluídas)

---

## Tasks

### ✅ Concluídas
- Rebalanceamento de paleta dark mode: `--background` de ~4% para ~10% L (charcoal-indigo, ref. Rocketseat)
- Hierarquia de surfaces dark claramente distinguível (4+ pontos de L entre camadas)
- Light mode: `--foreground` ajustado de ~18:1 para ~14:1 de contraste (conforto de leitura)
- `tokens.css` e `colors.ts` atualizados em sincronia
- Correção de contraste do Alert dark mode:
  - `default`: borda `dark:border-accent-foreground/50` (era `/25` — contraste 1.65:1 → 2.88:1)
  - `success/destructive/warning`: removidos overrides `dark:bg-[color]/15` — agora usa tokens badge-bg corretos (~8:1 de contraste)

### 🔄 Em progresso
- Validação visual no Storybook (rodar `pnpm dev --filter @nico.dev/storybook`)

### ⏭ Próximos passos
1. Validar paleta alternando light/dark no Storybook
2. Atualizar arquivo Pencil (`docs/nico.dev.br.pen`) com novos valores — fora do escopo desta spec
3. Verificar outros componentes que possam ter contraste insuficiente no dark mode

---

## Decisões desta sessão

- Paleta dark inspirada em Rocketseat: charcoal com toque indigo/roxo (não preto puro)
- Badge-bg tokens dark (`#0E2418`, `#2D1215`, `#261A00`) são a referência correta para Alert, não `[color]/15`
- Nenhum token foi renomeado — apenas valores hex alterados
