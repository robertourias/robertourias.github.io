# Plano Técnico: Carrossel Responsivo — FeaturedProjects

**Spec:** `.ai-core/specs/2026-05-17-carousel-responsive.md`  
**Status:** ready  
**Data:** 2026-05-17

---

## Análise do estado atual

| Aspecto | Hoje |
|---|---|
| Arquivo | `apps/web-nico.dev.br/src/app/components/FeaturedProjects.tsx` |
| Mobile | Carrossel: 3 projetos, 1 visível, step 1 |
| Desktop | Grid estático: 2 projetos, sem carrossel |
| Tablet | Sem tratamento (cai no grid desktop) |
| Projetos no carrossel | 3 (mobile) / 2 (desktop) |

## Decisão de design técnico

**Uma única instância de carrossel** — sem render condicional de 3 versões separadas.

Mecanismo:
- **Larguras responsivas via Tailwind** nos cards: `w-full md:w-1/2 lg:w-1/3`
- **`itemsPerView` via `useEffect` + `matchMedia`** (pós-hidratação, SSR-safe, sem `window.innerWidth` no render — atende FR-008)
- **Formula de transform invariante**: `translateX(-pageIndex * 100%)` funciona para qualquer `itemsPerView` porque o flex track tem `computed width = parent width` (block-level flex container), então 100% do track = 100% do parent = 1 viewport de largura
- **Dots dinâmicos**: `Math.ceil(5 / itemsPerView)` → 5 (mobile), 3 (tablet), 2 (desktop)
- **Clamp no resize**: quando `itemsPerView` muda, um segundo `useEffect` limita `pageIndex` ao intervalo válido

### Por que não renderizar 3 carrosséis separados?
Adicionar/remover elementos do DOM na troca de breakpoint (via `hidden md:block`) causa reflow pesado e reseta o estado de scroll. Uma única instância com lógica em JS é mais simples e performática.

---

## Contrato de API

Sem mudanças de API. O componente é puramente frontend.

**Entrada de dados (sem alteração):**
```ts
import { projects } from "../data/projects"
const FEATURED = projects.slice(0, 5) // FR-001
```

---

## Tarefas

### Tarefa 1: Refatorar `FeaturedProjects.tsx` — carrossel responsivo unificado
Tipo: refactor  
Agente: frontend

Reescrever o componente substituindo o carrossel-mobile + grid-desktop por um único carrossel responsivo que exibe 1/2/3 cards por vez dependendo do breakpoint, com `pageIndex` como estado de navegação e `itemsPerView` derivado via `matchMedia` pós-hidratação.

**Critérios de aceite:**
- [ ] `FEATURED = projects.slice(0, 5)` (5 projetos)
- [ ] Cada card recebe `className="shrink-0 w-full md:w-1/2 lg:w-1/3"` e `draggable={false}`
- [ ] Track: `transform: translateX(calc(-${pageIndex * 100}% + ${dragOffset}px))`
- [ ] `itemsPerView` inicializa como `1` (SSR/mobile-first); `useEffect` seta corretamente via `matchMedia`
- [ ] `pages = Math.ceil(5 / itemsPerView)` → 5 | 3 | 2
- [ ] Dots renderizam `pages` itens; clique no dot N seta `pageIndex = N`
- [ ] Dot ativo: `aria-current="true"`, `aria-label="Página N de pages"` em cada dot
- [ ] Swipe touch + arrastar mouse: threshold 60px → pageIndex++ ou pageIndex-- dentro dos limites
- [ ] Resize: `useEffect([itemsPerView])` faz `setPageIndex(p => Math.min(p, pages - 1))`
- [ ] `sizes` do `ProjectCard` atualizado: `"(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"`
- [ ] CTA "Ver todos os projetos" mantido abaixo do carrossel
- [ ] Sem erros de TypeScript ou ESLint no build

**Pseudocódigo da lógica central:**
```tsx
const FEATURED = projects.slice(0, 5)

const [pageIndex, setPageIndex] = useState(0)
const [itemsPerView, setItemsPerView] = useState(1) // SSR default = mobile
const [dragOffset, setDragOffset] = useState(0)
const [isDragging, setIsDragging] = useState(false)
const dragStartX = useRef<number | null>(null)

const pages = Math.ceil(FEATURED.length / itemsPerView) // 5 | 3 | 2

// Detecta breakpoint pós-hidratação
useEffect(() => {
  const update = () => {
    if (window.matchMedia('(min-width: 1024px)').matches) setItemsPerView(3)
    else if (window.matchMedia('(min-width: 768px)').matches) setItemsPerView(2)
    else setItemsPerView(1)
  }
  update()
  window.addEventListener('resize', update)
  return () => window.removeEventListener('resize', update)
}, [])

// Clamp pageIndex ao mudar de breakpoint
useEffect(() => {
  setPageIndex(p => Math.min(p, Math.ceil(FEATURED.length / itemsPerView) - 1))
}, [itemsPerView])

// Track JSX
<div className="flex" style={{ transform: `translateX(calc(${-pageIndex * 100}% + ${dragOffset}px))`, transition: isDragging ? 'none' : 'transform 0.3s ease-out' }} onTouch... onMouse...>
  {FEATURED.map(project => (
    <div key={project.id} className="shrink-0 w-full md:w-1/2 lg:w-1/3" draggable={false}>
      <ProjectCard isCarousel project={project} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
    </div>
  ))}
</div>

// Dots JSX
{Array.from({ length: pages }, (_, i) => (
  <button key={i} onClick={() => setPageIndex(i)}
    aria-label={`Página ${i + 1} de ${pages}`}
    aria-current={pageIndex === i ? 'true' : undefined}
    className={pageIndex === i ? 'w-8 h-2 bg-primary' : 'w-2 h-2 bg-outline-variant/50 hover:bg-outline-variant'}
  />
))}
```

**Notas:**
- `itemsPerView` como estado (não derivado de CSS) é necessário para calcular `pages` e o comportamento de swipe em JS
- `resize` listener é suficiente; `matchMedia.addListener` é obsoleto
- O `overflow-hidden` no wrapper externo deve ser mantido para ocultar os cards fora do viewport
- Não alterar `ProjectCard.tsx` — apenas passar as props corretas

---

## Ordem de execução

1. Tarefa 1 (única tarefa — escopo contido em um único arquivo)

## Riscos mitigados

| Risco | Mitigação aplicada |
|---|---|
| Hydration mismatch SSR | `itemsPerView` inicia em `1` (mobile-first), `useEffect` corrige no cliente |
| Resize deixa pageIndex inválido | `useEffect([itemsPerView])` faz clamp |
| Drag no desktop (mouse) em cards linkados | `stopPropagation` já existe em `ProjectCard` via `stopProp` |
| Acessibilidade dos dots | `aria-label` e `aria-current` em cada dot |
