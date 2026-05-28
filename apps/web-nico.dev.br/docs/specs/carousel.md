# Feature: Carrossel de Projetos

**Status:** Live  
**Data:** 2026-05-16  
**Componente:** `src/app/components/Projects.tsx`

---

## Comportamento por breakpoint

| Breakpoint | Cards visíveis | Navegação |
|------------|---------------|-----------|
| `< 768px` (mobile) | 1 | Drag/swipe nativo |
| `768–1023px` (tablet) | 2 | Botões no header |
| `≥ 1024px` (desktop) | 3 | Botões no header |

---

## Mobile: drag nativo

Todos os 11 cards renderizados em um flex strip horizontal. A faixa inteira se translada:

```css
transform: translateX(calc(-{currentIndex * 100}% + {dragOffset}px))
transition: none          /* durante o drag */
transition: transform 0.3s ease-out  /* ao soltar — snap */
```

`dragOffset` é atualizado em tempo real via `onTouchMove` + `onMouseMove` (suporte a mouse drag também). O snap para o card mais próximo ocorre em `handleDragEnd` com threshold de 60px.

**Por que renderizar todos os cards (não só o visível):** permite que o card vizinho apareça emergindo durante o arraste, dando a sensação de continuidade física.

---

## Desktop: grid + slice

No desktop, apenas `cardsToShow` cards são renderizados (slice do array). A navegação avança/retrocede por página completa. Botões de seta posicionados no header da seção (fora de qualquer `overflow-hidden`).

---

## Dados dos projetos

`src/app/data/projects.ts` — array de `Project` com campos:
- `id`, `title`, `description`, `category`
- `image` — caminho absoluto de `/projects/projects (N).png`
- `demoUrl`, `repoUrl`

Imagens servidas de `public/projects/` via `next/image` com `fill` + `sizes` responsivo.

---

## Decisões

- **Auto-play removido** — UX: usuário controla o ritmo.
- **Botões no header, não absolutos no carousel** — os botões absolutos com `translate-x-14` eram clipped pelo `overflow-hidden` do container. Mover para o header elimina o problema sem hacks.
- **`overflow-hidden` mantido apenas no track mobile** — necessário para conter o `translateX` do drag.
- **Dots:** mobile = 1 por card (11 total); desktop = 1 por página.
