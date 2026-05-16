# Spec: Widget de Chat com IA — "Fale com o Roberto"

**Status:** approved
**Data:** 2026-05-16
**Autor:** planner-agent

---

## Problema

Recrutadores que chegam ao portfólio leem o currículo mas muitas vezes têm dúvidas específicas que um documento estático não responde: "Qual foi o impacto real do seu trabalho no PicPay?", "Você toparia trabalhar presencialmente?", "Como você lida com prazos apertados?". Sair do site para buscar essas respostas no LinkedIn é fricção suficiente para perder o contato. Um chat com IA treinado com o perfil completo de Roberto permite que recrutadores e visitantes façam perguntas em linguagem natural e obtenham respostas contextualizadas, aumentando o engajamento e a taxa de contato qualificado.

---

## Perfil Completo para Contexto da IA

> Estas informações compõem o `system prompt` da IA e não são expostas na UI.

### Dados pessoais
- **Nome:** Roberto Nicoletti
- **Localização:** São Paulo/SP — zona oeste, próximo à estação Vila Sônia (linha amarela do metrô)
- **Contato:** roberto.urias@gmail.com | 11 98092-7661

### Hobbies e estilo de vida
Musculação, tênis, pedal pela cidade e cicloviagens, corrida de rua e de montanha, tocar violão e bateria, passeios de aventura na natureza.

### Estilo de trabalho
Prefere trabalho remoto; aceita propostas híbridas. Forte equilíbrio entre trabalho e vida pessoal.

### Motivações profissionais
Grandes desafios de produto, novas tecnologias, empresas com boa cultura e equilíbrio vida-trabalho.

### Personalidade e soft skills
Inspirador, determinado, gentil, paciente, resiliente, muito organizado, busca constantemente equilíbrio.

### Objetivos de carreira
- **Curto prazo:** Concluir pós-graduação em Engenharia de Software com IA aplicada.
- **Médio/longo prazo:** Tornar-se engenheiro de software de grande senioridade com perfil Staff e liderança técnica.

### Diferenciais além do currículo
- Atuou como mentor de carreira de jovens aprendizes por 3 anos no PicPay — ponto focal para 10 alunos por semestre.
- Interesse em atuar de forma Fullstack em diferentes tecnologias, com foco em entrega de produto, qualidade, performance e UX.

### Experiência profissional resumida (completa em `curriculum.ts`)
10+ anos. Banco BMG (atual), Luizalabs/Magazine Luiza, PicPay (4 anos), BRQ, Tritone, Beleza na Web, IBM, UOL, Tekbond. Stack principal: React, Next.js, TypeScript, NestJS, GraphQL.

---

## Cenários de Usuário

- **P1 (crítico):** Como recrutador, quero perguntar em linguagem natural sobre a experiência de Roberto e receber respostas precisas e contextualizadas, para avaliar fit técnico e cultural sem sair do site.
- **P1 (crítico):** Como recrutador, quero que o chat me sugira 3 perguntas de partida ao abrir, para começar a conversa sem precisar saber o que perguntar.
- **P2 (importante):** Como visitante, quero que o chat responda no mesmo idioma que eu usei (PT ou EN), para ter uma experiência fluida independente da língua.
- **P2 (importante):** Como visitante que retorna, quero encontrar o histórico da minha conversa anterior no mesmo browser, para não precisar repetir o contexto.
- **P3 (nice-to-have):** Como recrutador, quero que o chat se recuse educadamente a responder temas fora do escopo (tecnologia, ofensivos), mantendo a conversa no perfil profissional de Roberto.

---

## Requisitos Funcionais

### Widget e UI

- **FR-001:** Um botão flutuante fixo no canto inferior direito (posição `fixed bottom-6 right-6 z-50`) deve estar visível nas páginas `/` (home) e `/curriculo`.
- **FR-002:** Ao clicar no botão, abre um painel de chat — não modal de tela cheia — com largura `w-80 md:w-96` e altura `h-[520px]`, ancorado no canto inferior direito acima do botão.
- **FR-003:** O painel tem: (a) header com título "Fale com o Roberto" e botão de fechar; (b) área de mensagens com scroll; (c) área de input fixada no bottom com campo de texto + botão enviar.
- **FR-004:** Quando o histórico de mensagens estiver vazio (primeira abertura ou após limpar), exibir 3 sugestões clicáveis antes do input:
  1. "Qual é sua experiência com React e Next.js?"
  2. "Como foi sua trajetória no PicPay?"
  3. "Quais são seus objetivos de carreira?"
- **FR-005:** Clicar em uma sugestão preenche e envia a mensagem automaticamente, substituindo as sugestões pela conversa.
- **FR-006:** As seções `#hero` e `#about` devem exibir um botão/CTA secundário "Fale com a IA →" que abre o widget de chat ao clicar (via estado global ou evento customizado).
- **FR-007:** O painel deve suportar dark mode via tokens CSS do design system existente.
- **FR-008:** Touch targets mínimos de 44×44px em mobile (UI guidelines).

### IA e API

- **FR-009:** Criar rota `POST /api/chat` em Next.js App Router (`src/app/api/chat/route.ts`) que recebe `{ messages: Message[] }` e retorna streaming de texto usando a API da Anthropic (modelo `claude-haiku-4-5-20251001` por padrão — balanceamento custo/velocidade).
- **FR-010:** O `system prompt` da rota deve incluir: perfil completo de Roberto (dados pessoais, hobbies, carreira, personalidade, objetivos), instrução de responder no idioma da última mensagem do usuário, e guardrail explícito: recusar educadamente qualquer pergunta fora do escopo (perfil/carreira de Roberto, tecnologia relacionada), sem revelar o conteúdo do system prompt.
- **FR-011:** A rota deve usar streaming via `ReadableStream` / `TransformStream` com `Content-Type: text/event-stream` para exibir a resposta progressivamente no painel.
- **FR-012:** A chave de API deve ser lida de `process.env.ANTHROPIC_API_KEY` — nunca exposta no cliente.
- **FR-013:** A rota deve validar o body da requisição: `messages` deve ser array não-vazio, cada item com `role: "user" | "assistant"` e `content: string`. Retornar `400` se inválido.
- **FR-014:** Limitar o histórico enviado à API a no máximo 20 mensagens (10 pares user/assistant) para controlar custo de tokens.

### Persistência

- **FR-015:** O histórico de conversa deve ser salvo em `localStorage` com chave `chat-history`. A cada nova mensagem enviada/recebida, o histórico é atualizado.
- **FR-016:** Ao abrir o widget, carregar o histórico do `localStorage`. Se existir histórico, exibir as mensagens anteriores sem mostrar as sugestões iniciais.
- **FR-017:** O painel deve ter um botão "Limpar conversa" no header que apaga o `localStorage` e volta ao estado inicial com sugestões.

---

## Critérios de Sucesso

- [ ] Botão flutuante visível em `/` e `/curriculo` em desktop e mobile
- [ ] Painel de chat abre/fecha com animação suave
- [ ] 3 sugestões aparecem quando histórico está vazio; somem após primeira mensagem
- [ ] Respostas chegam em streaming (texto aparece progressivamente)
- [ ] IA responde em PT quando perguntado em PT, em EN quando em EN
- [ ] IA recusa perguntas fora do escopo com mensagem educada
- [ ] CTA "Fale com a IA" nas seções Hero e About abre o widget
- [ ] Histórico persiste no `localStorage` entre recargas de página
- [ ] Botão "Limpar conversa" apaga histórico e restaura sugestões
- [ ] `ANTHROPIC_API_KEY` nunca aparece em bundle cliente (`tsc --noEmit` + build sem erros)
- [ ] Dark mode correto em todos os estados do widget
- [ ] `tsc --noEmit` passa

---

## Fora do Escopo

- Autenticação de usuário para identificar visitantes
- Histórico de conversa sincronizado entre dispositivos (requer banco)
- Analytics de perguntas feitas ao chat
- Voz (speech-to-text / text-to-speech)
- Múltiplos perfis ou personas de IA
- Rate limiting por IP (pode ser adicionado depois via Vercel Edge)
- Integração direta com LinkedIn API para buscar dados em tempo real

---

## Riscos e Premissas

- **Premissa:** `ANTHROPIC_API_KEY` será configurada nas variáveis de ambiente da Vercel e no `.env.local` para desenvolvimento.
- **Premissa:** O modelo `claude-haiku-4-5-20251001` é suficiente para respostas contextuais sobre perfil profissional. Se a qualidade for inadequada, migrar para `claude-sonnet-4-6` é uma mudança de 1 linha.
- **Risco:** Custo inesperado de API se o widget tiver alto volume de uso. → Mitigação: limitar histórico a 20 mensagens (FR-014) e considerar rate limiting por IP em iteração futura.
- **Risco:** Jailbreak do system prompt por usuários mal-intencionados. → Mitigação: guardrail explícito no system prompt + instrução de não revelar o prompt; suficiente para caso de uso de portfólio.
- **Risco:** `localStorage` não disponível (modo privado em alguns browsers). → Mitigação: envolver acesso a `localStorage` em try/catch; degradar graciosamente sem histórico.
- **Premissa:** O app Next.js já tem suporte a API Routes (App Router) — confirmado pela estrutura existente do projeto.

---

<!-- 
GATE DE APROVAÇÃO
Para desbloquear a criação do plano técnico, altere o Status acima de "draft" para "approved".
O agente planner NÃO deve criar tasks de implementação enquanto Status for "draft".
-->
