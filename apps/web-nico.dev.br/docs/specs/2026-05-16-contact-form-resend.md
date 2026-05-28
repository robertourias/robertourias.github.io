# Spec: Formulário de contato funcional com Resend e campo de telefone

**Status:** approved
**Data:** 2026-05-16
**Autor:** planner-agent

---

## Problema

A seção "Vamos Conversar" possui um formulário de contato que, ao ser submetido, apenas gera um redirect para um link `mailto:` — abrindo o cliente de e-mail do visitante em vez de enviar a mensagem diretamente. Isso quebra o fluxo esperado (principalmente em mobile e em ambientes corporativos sem cliente de e-mail configurado), e não oferece nenhum feedback confiável de que a mensagem foi recebida.

Além disso, o formulário não possui campo de telefone, o que dificulta o contato direto com recrutadores ou empresas que preferem responder por ligação ou WhatsApp.

---

## Cenários de Usuário

- **P1 (crítico):** Como recrutador, quero preencher o formulário de contato e receber confirmação de que minha mensagem foi enviada, para ter certeza de que Roberto a receberá.
- **P1 (crítico):** Como Roberto, quero receber um e-mail com os dados do contato (nome, e-mail, telefone e mensagem) sempre que alguém preencher o formulário, para poder responder rapidamente.
- **P2 (importante):** Como visitante, quero informar meu telefone no formulário para que Roberto possa me contatar por ligação ou WhatsApp, além do e-mail.

---

## Requisitos Funcionais

- **FR-001:** O formulário deve conter os campos: Nome, E-mail, Telefone e Mensagem. Todos obrigatórios.
- **FR-002:** O campo Telefone deve aplicar máscara automática no formato `(XX) XXXX-XXXX` para fixo (8 dígitos) e `(XX) XXXXX-XXXX` para celular (9 dígitos), detectando o tipo à medida que o usuário digita.
- **FR-003:** Ao submeter o formulário com todos os campos válidos, a API `/api/contact` deve enviar um e-mail para `roberto.urias@gmail.com` usando o serviço Resend.
- **FR-004:** O e-mail recebido deve conter: nome, e-mail, telefone e mensagem do visitante, com remetente identificado como o próprio formulário (ex: `onboarding@resend.dev` ou domínio verificado).
- **FR-005:** Após o envio bem-sucedido, o formulário deve exibir uma mensagem de sucesso inline (sem redirecionamento) informando que a mensagem foi enviada e que Roberto entrará em contato em breve.
- **FR-006:** Em caso de erro no envio (falha na API do Resend, campos inválidos), o formulário deve exibir mensagem de erro clara e manter os dados preenchidos para o usuário tentar novamente.
- **FR-007:** O botão de envio deve ser desabilitado e exibir estado de carregamento ("Enviando...") enquanto a requisição estiver em andamento.
- **FR-008:** A validação de campos obrigatórios deve ocorrer no frontend antes do envio e também no backend (API route), retornando HTTP 400 se campos estiverem ausentes ou inválidos.

---

## Critérios de Sucesso

- [ ] Visitante preenche todos os campos e clica em Enviar → e-mail chega na caixa de entrada de `roberto.urias@gmail.com` com todos os dados
- [ ] Campo de telefone aplica máscara automaticamente: `(11) 9999-9999` (fixo) e `(11) 99999-9999` (celular)
- [ ] Mensagem de sucesso aparece inline após envio, sem abrir cliente de e-mail ou redirecionar
- [ ] Formulário exibe erro claro se a API falhar, sem perder os dados preenchidos
- [ ] Submissão com campos vazios é bloqueada no frontend e na API (retorna 400)
- [ ] Estado de carregamento visível durante o envio (botão desabilitado + spinner)

---

## Fora do Escopo

- Validação de e-mail por regex avançado ou verificação de MX record
- Rate limiting ou proteção anti-spam (CAPTCHA)
- Template HTML rico para o e-mail recebido (texto simples é suficiente nesta iteração)
- Internacionalização da máscara de telefone (apenas formato brasileiro)
- Armazenamento das mensagens em banco de dados

---

## Riscos e Premissas

- **Premissa:** A chave `RESEND_API_KEY` será configurada em `.env.local` e nas variáveis de ambiente da Vercel antes da implementação. Sem ela, o envio falha.
- **Premissa:** O domínio `nico.dev.br` será verificado no painel do Resend para uso como remetente — caso contrário, usar `onboarding@resend.dev` (domínio de teste do Resend) até verificação.
- **Risco:** Resend pode rejeitar envios sem domínio verificado → Mitigação: usar domínio de teste na primeira iteração e documentar o passo de verificação.
- **Risco:** A máscara de telefone sem biblioteca pode ter edge cases → Mitigação: implementar com lógica simples e testar os dois formatos manualmente.

---

<!-- 
GATE DE APROVAÇÃO
Para desbloquear a criação do plano técnico, altere o Status acima de "draft" para "approved".
O agente planner NÃO deve criar tasks de implementação enquanto Status for "draft".
-->
