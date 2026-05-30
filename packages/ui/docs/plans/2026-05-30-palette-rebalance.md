# Plano Técnico: Rebalanceamento de Paleta de Cores

**Spec:** `packages/ui/docs/specs/2026-05-30-palette-rebalance.md`
**Status:** ready
**Data:** 2026-05-30

---

## Contexto

Dois arquivos são a fonte de verdade dos tokens de cor — ambos devem ser atualizados em sincronia:

| Arquivo | Papel |
|---------|-------|
| `packages/ui/tokens.css` | CSS custom properties consumidas por todos os apps |
| `packages/ui/src/tokens/colors.ts` | Mirror TypeScript, exportado pelo pacote |

Nenhum componente hardcoda hex diretamente — todo uso é via variáveis CSS, portanto a mudança é propagada automaticamente para todos os apps do monorepo.

---

## Paleta Proposta

### Dark Mode (referência: Rocketseat — charcoal-indigo)

| Token | Valor atual | Valor proposto | Razão |
|-------|-------------|----------------|-------|
| `--background` | `#080A12` | `#12131F` | L ~4% → ~10% — elimina o "preto puro" |
| `--foreground` | `#EEEEF8` | `#E6E7F4` | Leve suavização do branco |
| `--surface` | `#0F1120` | `#191A2C` | L ~13.5%, +3.9pts acima do bg |
| `--surface-raised` | `#171A2E` | `#21233A` | L ~17.8%, +4.3pts acima do surface |
| `--surface-overlay` | `#20243C` | `#2C2F52` | L ~24.7%, +6.9pts acima do surface-raised |
| `--secondary-foreground` | `#080A12` | `#12131F` | Acompanha novo background |
| `--muted` | `#171A2E` | `#191A2C` | Alinhado com surface |
| `--muted-foreground` | `#7B7E9E` | `#8A8CB0` | Contraste 6.1:1 sobre novo bg ✓ |
| `--accent` | `#1B1E38` | `#1D2040` | Ajuste fino de luminosidade |
| `--border` | `#1E2240` | `#262850` | Mais visível sobre o novo bg |
| `--input` | `#1E2240` | `#262850` | Idem border |
| `--success-foreground` | `#080A12` | `#12131F` | Acompanha novo background |
| `--warning-foreground` | `#080A12` | `#12131F` | Acompanha novo background |
| `--badge-destructive-bg` | `#220808` | `#2D1215` | Mais luminoso para legibilidade |
| `--badge-success-bg` | `#0C2218` | `#0E2418` | Mais luminoso para legibilidade |
| `--badge-warning-bg` | `#231800` | `#261A00` | Mais luminoso para legibilidade |

Tokens sem alteração no dark: `--primary`, `--primary-foreground`, `--primary-hover`, `--secondary`, `--accent-foreground`, `--destructive`, `--destructive-foreground`, `--success`, `--warning`, `--ring`.

### Light Mode

| Token | Valor atual | Valor proposto | Razão |
|-------|-------------|----------------|-------|
| `--foreground` | `#0A0C1A` | `#252742` | Contraste ~18:1 → ~13.9:1 (12–15:1 ✓) |
| `--surface-raised` | `#F0F1FA` | `#EDEDF8` | Alinhamento de matiz |
| `--muted` | `#F0F1FA` | `#EDEDF8` | Alinhado com surface-raised |
| `--muted-foreground` | `#64658A` | `#5A5C82` | Ajuste fino, contraste 6.0:1 ✓ |

Tokens sem alteração no light: todos os demais.

### Verificação de contraste (pares críticos)

| Par | Contraste | WCAG |
|-----|-----------|------|
| dark `foreground` / `background` | ~14.1:1 | AAA ✓ |
| dark `muted-foreground` / `background` | ~6.1:1 | AA ✓ |
| dark `primary` / `background` | verificar pós-implementação | — |
| light `foreground` / `background` | ~13.9:1 | AAA ✓ |
| light `muted-foreground` / `background` | ~6.0:1 | AA ✓ |

---

## Tarefas

### Tarefa 1: Verificar hardcoded hex nos apps
Tipo: chore
Agente: frontend

Antes de alterar os tokens, confirmar que nenhum app no monorepo usa valores hex diretamente em JSX/TSX (o que faria a mudança não ter efeito nesses pontos). Grep por `#[0-9A-Fa-f]{6}` excluindo `tokens.css` e `colors.ts`.

Critérios de aceite:
- [ ] Grep retorna apenas os dois arquivos de tokens — nenhum outro arquivo com hex hardcoded relevante
- [ ] Caso encontre, documentar as ocorrências antes de prosseguir

Notas: Ocorrências em arquivos de teste ou Storybook stories são aceitáveis; o risco é em componentes de produção.

---

### Tarefa 2: Atualizar `tokens.css` com paleta rebalanceada
Tipo: refactor
Agente: frontend

Aplicar os novos valores hex definidos na tabela acima em `packages/ui/tokens.css`, seções `:root` (light) e `.dark`. Manter todos os token names inalterados; apenas os valores mudam.

Critérios de aceite:
- [ ] Seção `:root` atualizada com novos valores de `--foreground`, `--surface-raised`, `--muted`, `--muted-foreground`
- [ ] Seção `.dark` atualizada com todos os tokens listados na tabela dark
- [ ] Nenhum token removido ou renomeado
- [ ] Arquivo válido (sem erros de sintaxe CSS)

Notas: Depende da Tarefa 1. Usar exatamente os valores hex da tabela "Paleta Proposta".

---

### Tarefa 3: Atualizar `colors.ts` em sincronia com `tokens.css`
Tipo: refactor
Agente: frontend

Aplicar os mesmos valores em `packages/ui/src/tokens/colors.ts` (objetos `light` e `dark`), mantendo os dois arquivos como espelhos fiéis um do outro.

Critérios de aceite:
- [ ] Objeto `light` em `colors.ts` tem os mesmos valores que `:root` em `tokens.css`
- [ ] Objeto `dark` em `colors.ts` tem os mesmos valores que `.dark` em `tokens.css`
- [ ] TypeScript compila sem erros (`tsc --noEmit` no workspace `packages/ui`)

Notas: Depende da Tarefa 2. Verificar diff entre os dois arquivos para garantir sincronia total.

---

### Tarefa 4: Validar visualmente no Storybook
Tipo: chore
Agente: frontend

Rodar o Storybook e verificar que a paleta atualizada está correta em ambos os temas, sem regressões visuais em componentes.

Critérios de aceite:
- [ ] Storybook sobe sem erros (`pnpm dev --filter @nico.dev/storybook`)
- [ ] Tema dark visualmente mais claro e com hierarquia de camadas visível
- [ ] Tema light com texto legível e menos contrastante que o anterior
- [ ] Componentes de feedback (Badge, Alert) legíveis em ambos os temas
- [ ] Nenhum componente com fundo ou texto invisível

Notas: Depende das Tarefas 2 e 3. Testar alternando manualmente entre light/dark no Storybook.
