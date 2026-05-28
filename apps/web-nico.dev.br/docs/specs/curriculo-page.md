# Feature: Página de Currículo

**Status:** Live  
**Data:** 2026-05-16  
**Spec:** `.ai-core/specs/2026-05-16-curriculo-page.md`  
**Rota:** `/curriculo`

---

## O que é

Versão web do currículo PDF de Roberto Nicoletti. Página estática (RSC) com 7 seções, botão de download do PDF original e link para as recomendações no LinkedIn.

---

## Estrutura da página

```
/curriculo
├── Cabeçalho        — nome, título, localização, contatos, download PDF, links
├── Resumo           — 3 parágrafos do perfil profissional
├── Habilidades      — 4 grupos em grid 2 colunas com tags
├── Diferenciais     — lista com ícone check
├── Experiência      — timeline com 9 cargos (ordem cronológica reversa)
├── Formação         — cards por entrada (suporta in_progress + highlights)
└── Referências      — CTA para recomendações LinkedIn
```

---

## Arquivos

| Arquivo | Responsabilidade |
|---------|-----------------|
| `src/app/curriculo/page.tsx` | RSC com metadata e layout completo |
| `src/app/data/curriculum.ts` | Dados tipados (interfaces + `curriculumData`) |
| `public/Curriculo-Fullstack.pdf` | PDF original para download |

---

## Modelo de dados (`curriculum.ts`)

```typescript
interface EducationEntry {
  degree: string
  institution: string
  period: string
  status: "completed" | "in_progress"
  expectedCompletion?: string   // exibido em vez de period quando in_progress
  highlights?: string[]         // competências em tags visuais
}

interface CurriculumData {
  // ...contatos, summary, skillGroups, differentials, experiences
  educationList: EducationEntry[]   // suporta múltiplas formações
}
```

---

## Pontos de entrada

- **Navbar** — item "Currículo" (`href="/curriculo"`, não usa `handleNavClick`)
- **Hero** — botão "Currículo" (redireciona para `/curriculo`, não mais para o PDF)

---

## Notas de implementação

- Página é RSC puro — sem `"use client"`, sem fetch. Dados vêm do import de `curriculum.ts`.
- `educationList` suporta ordenação: in_progress primeiro, completed depois.
- Badge "Em andamento" com `bg-primary/10 text-primary` indica formação em curso.
- O PDF segue servido em `/Curriculo-Fullstack.pdf` para o botão de download direto.
