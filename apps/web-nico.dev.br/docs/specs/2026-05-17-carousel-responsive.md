# Spec: Carrossel de Projetos Responsivo (5 itens, 3 breakpoints)

**Status:** approved
**Data:** 2026-05-17
**Autor:** planner-agent

---

## Problema

O componente `FeaturedProjects` exibe projetos de forma inconsistente entre breakpoints: no mobile usa um carrossel com 3 itens (1 visível por vez), enquanto no desktop exibe um grid estático com apenas 2 projetos — sem movimento, sem carrossel. Não existe tratamento de tablet. O resultado é uma experiência desconexa e com pouca exposição do portfólio: no desktop o visitante não vê mais do que 2 projetos na página inicial sem navegar para `/projetos`.

A mudança torna o carrossel o padrão em todos os tamanhos de tela, com profundidade de 5 projetos e ritmo de navegação adaptado a cada dispositivo.

---

## Cenários de Usuário

- **P1 (crítico):** Como recrutador acessando o portfólio no desktop, quero navegar entre 3 projetos de cada vez para ter uma visão mais ampla sem precisar ir até `/projetos`.
- **P1 (crítico):** Como visitante no tablet, quero ver 2 projetos lado a lado e avançar de 2 em 2 para uma experiência de navegação fluida.
- **P2 (importante):** Como visitante no mobile, quero continuar vendo 1 projeto por vez com swipe, igual à experiência atual, mas com 5 projetos disponíveis no carrossel.
- **P3 (nice-to-have):** Como visitante em qualquer dispositivo, quero indicadores visuais claros (dots/setas) para saber quantos grupos de projetos existem e onde estou.

---

## Requisitos Funcionais

- **FR-001:** O componente deve carregar os primeiros 5 projetos de `projects` (índices 0–4).
- **FR-002:** Em mobile (`< 768px`): exibir 1 card por vez; avançar/recuar 1 card por vez; swipe touch + arrastar mouse habilitados.
- **FR-003:** Em tablet (`768px–1023px`): exibir 2 cards por vez; avançar/recuar 2 cards por vez; botões de seta laterais ou dots habilitados.
- **FR-004:** Em desktop (`>= 1024px`): exibir 3 cards por vez; avançar/recuar 3 cards por vez; botões de seta laterais ou dots habilitados.
- **FR-005:** Os dots devem refletir o número de grupos (pages), não de cards individuais.
  - Mobile: 5 dots (1 card por grupo)
  - Tablet: 3 dots (groups of 2; último grupo pode ter 1 card)
  - Desktop: 2 dots (groups of 3; primeiro com 3, segundo com 2)
- **FR-006:** Navegação por dots: clicar em um dot leva ao início do grupo correspondente.
- **FR-007:** O carrossel NÃO deve fazer loop infinito — chegar ao último grupo desabilita o botão/gesto de avançar.
- **FR-008:** A responsividade dos dots e do step de navegação deve ser detectada via CSS breakpoints (Tailwind), sem JavaScript de `window.innerWidth` no render.
- **FR-009:** O link "Ver todos os projetos" deve ser mantido abaixo do carrossel.
- **FR-010:** Acessibilidade: cada card do carrossel deve ser acessível por teclado; dots devem ter `aria-label` e `aria-current` adequados.

---

## Critérios de Sucesso

- [ ] Em mobile, 5 dots aparecem e navegar entre eles exibe 1 projeto por vez
- [ ] Em tablet, 3 dots aparecem e navegar entre eles exibe 2 projetos por vez (último grupo pode ter 1)
- [ ] Em desktop, 2 dots aparecem e navegar entre eles exibe 3 projetos por vez (segundo grupo com 2)
- [ ] Swipe touch funciona corretamente em mobile e tablet
- [ ] Redimensionar a janela não quebra o carrossel (não trava em índice inválido)
- [ ] Nenhum erro de TypeScript ou lint no build
- [ ] O CTA "Ver todos os projetos" permanece visível e funcional

---

## Fora do Escopo

- Animação de entrada dos cards (fade, slide) além da transição já existente
- Loop infinito / autoplay
- Botões de seta laterais (pode ser adicionado depois como P3)
- Carregamento dinâmico de projetos via API (dados permanecem em `projects.ts`)
- Qualquer mudança na página `/projetos`

---

## Riscos e Premissas

- **Premissa:** Os breakpoints Tailwind padrão (`md: 768px`, `lg: 1024px`) são suficientes para distinguir mobile, tablet e desktop.
- **Premissa:** O `ProjectCard` existente não precisa de alterações — apenas recebe `isCarousel` e `sizes` adequados.
- **Risco:** Detectar o número de itens visíveis via CSS pode exigir uma abordagem de state com `useEffect` + `ResizeObserver` se a lógica de step precisar de JavaScript — isso adiciona complexidade. → Mitigação: usar variáveis CSS ou calcular os dots para cada breakpoint de forma declarativa, mantendo 3 versões de renderização (mobile/tablet/desktop) com `hidden`/`block` classes.
- **Risco:** Redimensionar a janela pode deixar `currentIndex` apontando para um grupo inexistente no novo breakpoint. → Mitigação: clamp o índice ao máximo permitido ao detectar mudança de breakpoint.

---

<!-- 
GATE DE APROVAÇÃO
Para desbloquear a criação do plano técnico, altere o Status acima de "draft" para "approved".
O agente planner NÃO deve criar tasks de implementação enquanto Status for "draft".
-->
