# Status do Projeto

> Memória de trabalho persistente. Atualizado pelo `/checkpoint`, lido pelo `/retomar`.
> Não edite manualmente durante uma sessão ativa — use `/checkpoint` antes de fechar.

**Última atualização:** 2026-05-17
**Resumo da última sessão:** Carrossel de Projetos em Destaque refeito com Embla Carousel — loop infinito, responsividade por breakpoint, espaçamento entre cards, botões prev/next no tablet/desktop, 6 projetos exibidos.

---

## Feature em andamento

**Spec ativo:** .ai-core/specs/2026-05-17-carousel-responsive.md (Status: approved — implementado e commitado)
**Plano ativo:** .ai-core/plans/2026-05-17-carousel-responsive.md

---

## Tasks

### ✅ Concluídas
- Spec e plano técnico do carrossel responsivo
- Implementação inicial com lógica manual (clone-based infinite loop)
- Refatoração para Embla Carousel (`embla-carousel` + `embla-carousel-react`)
  - Loop infinito nativo
  - Responsividade CSS: `flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%]`
  - Dots dinâmicos via `scrollSnapList()` + evento `reInit`
  - Botões Anterior/Próximo (`hidden md:flex`) com SVG inline
  - 6 projetos exibidos (era 5)
  - Espaçamento com `pl-4 md:pl-5` nos slides e `-ml-4 md:-ml-5` no track
- CHANGELOG promovido para `[0.7.0]`

### 🔄 Em progresso
- (nenhuma)

### ⏭ Próximos passos
1. Deploy de produção e verificar `RESEND_API_KEY` nas variáveis de ambiente da Vercel (pendente da sessão anterior)
2. Verificar domínio `nico.dev.br` no painel do Resend para usar como remetente
3. Usar `/spec` para próxima feature — sugestões: Blog, animações de entrada nas seções, seção de depoimentos

---

## Decisões desta sessão

- **Embla Carousel em vez de implementação manual:** a biblioteca resolve natively o loop infinito (duplicação de slides internamente), drag/swipe, e breakpoints — elimina ~100 linhas de lógica frágil com refs e `transitionend`
- **Responsividade via CSS (não JS):** `flex-[0_0_X%]` nos slides + `breakpoints.slidesToScroll` no Embla — sem `window.innerWidth` nem `useEffect` de resize para calcular layout
- **Dots via `scrollSnapList()`:** Embla calcula automaticamente o número de snaps conforme breakpoint; `reInit` atualiza ao redimensionar
- **Espaçamento padrão Embla:** `pl-4 md:pl-5` nos slides + `-ml-4 md:-ml-5` no track — evita padding externo visível nas bordas do container

---

## Bloqueadores / Perguntas abertas

- `RESEND_API_KEY` precisa ser configurada no painel da Vercel antes do próximo deploy de produção
- Domínio `nico.dev.br` não verificado no Resend — e-mails saem com remetente `onboarding@resend.dev`
