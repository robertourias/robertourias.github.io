# Spec: Página de Currículo Web

**Status:** approved
**Data:** 2026-05-16
**Autor:** planner-agent

---

## Problema

O site não possui uma página de currículo acessível diretamente pela navegação. Recrutadores que chegam ao portfólio precisam sair do site para acessar o LinkedIn ou solicitar o PDF separadamente — fricção que reduz o tempo de engajamento e a chance de contato qualificado. A feature "Currículo" está listada como "Em andamento" no `product.md` e é parte central da jornada do recrutador descrita no produto.

---

## Cenários de Usuário

- **P1 (crítico):** Como recrutador, quero acessar o currículo completo de Roberto diretamente pelo site, sem precisar ir ao LinkedIn ou pedir o PDF, para avaliar a experiência e tomar uma decisão de contato mais rápida.
- **P1 (crítico):** Como recrutador, quero baixar o PDF do currículo com um clique, para salvar localmente ou enviar internamente.
- **P2 (importante):** Como recrutador, quero ver as referências/recomendações do LinkedIn diretamente linkadas, para validar a reputação profissional de forma ágil.
- **P3 (nice-to-have):** Como visitante, quero navegar para o currículo a partir do Hero e do Navbar, para encontrar a informação independente de onde estou na página.

---

## Requisitos Funcionais

### Página `/curriculo`

- **FR-001:** A rota `/curriculo` deve renderizar a versão web do currículo como página estática (RSC, sem fetch de API).
- **FR-002:** A página deve conter as seguintes seções, na ordem abaixo, com o conteúdo extraído do PDF `Curriculo-Fullstack.pdf`:
  1. **Cabeçalho:** nome, título profissional, localização, e-mail, telefone, links GitHub e LinkedIn
  2. **Resumo profissional:** parágrafo de apresentação (~3 linhas)
  3. **Habilidades técnicas:** 4 grupos — Frontend, Backend & Infra, Arquitetura & Qualidade, Performance & Analytics — com tags visuais por tecnologia
  4. **Diferenciais:** lista de 4 itens em destaque
  5. **Experiência profissional:** 9 cargos em ordem cronológica reversa, cada um com empresa, cargo, período, duração e bullets de responsabilidades
  6. **Formação:** instituição, curso, período
  7. **Referências LinkedIn:** bloco com link direto para `https://www.linkedin.com/in/robertourias/details/recommendations/`
- **FR-003:** A página deve ter um botão "Download PDF" que abre `public/Curriculo-Fullstack.pdf` em nova aba com `download` attribute.
- **FR-004:** A página deve usar o Navbar e Footer existentes do site (sem criar layout separado).
- **FR-005:** O Navbar existente (`Navbar.tsx`) deve ganhar um item "Currículo" que navega para `/curriculo` (link `<a href="/curriculo">`, não âncora de seção).
- **FR-006:** O componente `Hero.tsx` deve ganhar um botão CTA secundário "Ver currículo" ao lado do CTA principal existente, apontando para `/curriculo`.

### Design & Acessibilidade

- **FR-007:** O layout da página deve seguir o design system existente: tokens de cor CSS, fontes Manrope/Inter, escala de espaçamento Tailwind, dark mode via variáveis CSS.
- **FR-008:** Cada seção da página deve ter um `id` semântico e um `<h2>` ou `<h3>` com `aria-labelledby` para navegação por leitores de tela.
- **FR-009:** Tags de habilidades devem ter contraste mínimo 4.5:1 em ambos os temas (light e dark).

---

## Critérios de Sucesso

- [ ] Rota `/curriculo` acessível e renderiza sem erro 404 nem hidratação incorreta
- [ ] Todas as 7 seções listadas no FR-002 estão presentes e com conteúdo correto do PDF
- [ ] Botão "Download PDF" baixa ou abre `Curriculo-Fullstack.pdf` com sucesso
- [ ] Link para referências LinkedIn aponta para `https://www.linkedin.com/in/robertourias/details/recommendations/` e abre em nova aba
- [ ] Item "Currículo" aparece no Navbar desktop e no menu mobile
- [ ] Botão CTA "Ver currículo" aparece no Hero ao lado do CTA existente
- [ ] Dark mode aplicado corretamente em todas as seções da nova página
- [ ] TypeScript sem erros (`tsc --noEmit` passa)

---

## Fora do Escopo

- Edição dinâmica do conteúdo do currículo via CMS ou painel admin
- Geração de PDF pelo servidor (o PDF já existe em `public/`)
- Internacionalização (versão em inglês) — iteração futura
- Print stylesheet específico para impressão da página
- Animações de entrada por seção (scroll reveal) — pode ser adicionado depois

---

## Riscos e Premissas

- **Premissa:** O arquivo `public/Curriculo-Fullstack.pdf` permanece em `public/` e é servido estaticamente pela Vercel.
- **Premissa:** O Navbar atual (`Navbar.tsx`) usa `<a href="...">` para âncoras — o novo item de rota `/curriculo` usa o mesmo padrão sem `handleNavClick` (que aplica `preventDefault` apenas para âncoras `#section`).
- **Risco:** O item "Currículo" no Navbar pode desalinhar o layout do menu se os itens existentes já estiverem próximos do limite de espaço no breakpoint `md`. → Mitigação: avaliar espaçamento no breakpoint `md:` e reduzir `gap` se necessário.
- **Risco:** Conteúdo do PDF tem caracteres especiais com encoding quebrado na extração de texto (ex: `ç`, `ã`). → Mitigação: digitar o conteúdo manualmente no arquivo de dados ao invés de copiar do pdftotext.

---

<!-- 
GATE DE APROVAÇÃO
Para desbloquear a criação do plano técnico, altere o Status acima de "draft" para "approved".
O agente planner NÃO deve criar tasks de implementação enquanto Status for "draft".
-->
