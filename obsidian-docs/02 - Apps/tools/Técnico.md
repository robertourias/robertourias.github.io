---
tags: [técnico, tools, nextjs, clt-pj, dark-mode]
created: 2026-05-21
app: tools
package: "@nico.dev/tools"
relacionados:
  - "[[Visão Geral]]"
  - "[[../../03 - Packages/ui/Técnico — Componentes e Design System]]"
---

# tools — Técnico

---

## Identificação

| Campo | Valor |
|-------|-------|
| Package name | `@nico.dev/tools` |
| Versão | 0.1.0 |
| Diretório | `apps/tools/` |
| Dev server | `pnpm --filter @nico.dev/tools dev` (porta 3001) |
| URL produção | `tools.nico.dev` |
| Hosting | Vercel |

---

## Stack

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| Next.js | 16.2.1 | Framework principal (App Router) |
| React | 19.2.4 | UI |
| TypeScript | ^5 | Linguagem |
| Tailwind CSS | ^4 | Estilização |
| `@nico.dev/ui` | workspace | Design System compartilhado |
| Lucide React | ^0.511.0 | Ícones |
| Anthropic SDK | ^0.96.0 | IA (para futuras ferramentas de AI) |

---

## Estrutura de arquivos

```
apps/tools/
├── src/
│   ├── app/
│   │   ├── layout.tsx             → Layout raiz (SiteHeader, dark mode)
│   │   ├── page.tsx               → Home / listagem de ferramentas
│   │   └── clt-pj/
│   │       ├── page.tsx           → Página da calculadora CLT vs PJ
│   │       └── _components/       → Componentes específicos da ferramenta
│   │           ├── calculator-form.tsx
│   │           ├── results-panel.tsx
│   │           ├── info-section.tsx
│   │           └── site-header.tsx
│   ├── components/                → Componentes globais do app
│   └── lib/                       → Utilitários e lógica de negócio
├── next.config.ts
├── tsconfig.json
└── .env / .env.example
```

---

## Arquitetura da calculadora CLT vs PJ

### Lógica de cálculo (`src/lib/`)

```
lib/
├── clt-calculator.ts     → Cálculo de líquido CLT (INSS + IRPF + encargos)
├── pj-calculator.ts      → Cálculo de líquido PJ (impostos + despesas)
└── equivalence.ts        → Busca binária para equivalência de renda efetiva
```

**Funções principais:**

| Função | Descrição |
|--------|-----------|
| `calculateCLT(config)` | Calcula líquido, FGTS, 13º, férias e renda efetiva CLT |
| `calculatePJ(config)` | Calcula líquido e renda efetiva PJ |
| `estimateCLTEffectiveEquivalent(pjEffective)` | Busca binária → salário CLT bruto com renda efetiva equivalente ao PJ |
| `estimatePJEquivalent(cltEffective)` | Busca binária → valor PJ bruto equivalente |

**Algoritmo de equivalência:**
- Usa busca binária sobre o campo `effectiveIncome` (não `netSalary`)
- Garante comparação justa incluindo todos os benefícios implícitos

### Decisões de implementação

| Decisão | Escolha | Motivo |
|---------|---------|--------|
| Busca binária para equivalência | `estimateCLTEffectiveEquivalent` separado de `estimateCLTEquivalent` | A função antiga busca por `netSalary`; a nova por `effectiveIncome` — coexistem para não quebrar o fallback |
| FGTS/13º/Abono automáticos | Sempre computados no card CLT | São benefícios estatutários — tornam o comparativo mais justo |
| Abono de férias | `netSalary / 3 / 12` | 1/3 do salário líquido, rateado em 12 meses |
| Dark mode padrão | Script inline no `layout.tsx` | Só usa light se `localStorage.theme === 'light'`; qualquer outro valor = dark |

---

## Dark Mode

Implementado via **script inline no `<head>`** (before hydration) para evitar flash:

```html
<!-- layout.tsx — inline script -->
<script>
  if (localStorage.theme === 'light') {
    document.documentElement.classList.remove('dark')
  } else {
    document.documentElement.classList.add('dark')
  }
</script>
```

Toggle via `SiteHeader` com ícones `Sun`/`Moon` do Lucide.

---

## Dependências de packages internos

```json
{
  "dependencies": {
    "@nico.dev/ui": "workspace:*"
  },
  "devDependencies": {
    "@nico.dev/config": "workspace:*"
  }
}
```

---

## Como adicionar uma nova ferramenta

1. Criar diretório `src/app/<nome-da-ferramenta>/`
2. Adicionar `page.tsx` com a ferramenta
3. Criar `_components/` para componentes específicos
4. Adicionar lógica em `src/lib/<nome-da-ferramenta>.ts`
5. Registrar na home (`src/app/page.tsx`) com card de navegação
6. Criar spec em `.ai-core/specs/YYYY-MM-DD-<nome>.md` antes de implementar

---

## Ver também

- [[Visão Geral]]
- [[../../03 - Packages/ui/Técnico — Componentes e Design System]]
- [[../../04 - AI Core/Fluxo de Entrega Spec-Driven]]
