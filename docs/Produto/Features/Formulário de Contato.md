---
tags: [feature, contato]
status: em-andamento
---

# Feature: Formulário de Contato

**Status:** 🔄 Em andamento

## O que é

Canal direto de contato para oportunidades e colaborações. O visitante preenche nome, e-mail e mensagem; o sistema envia o e-mail via **Resend**.

## Pendências

- [ ] Configurar `RESEND_API_KEY` nas variáveis de ambiente da Vercel
- [ ] Verificar domínio `nico.dev.br` no painel do Resend (atualmente e-mails saem de `onboarding@resend.dev`)
- [ ] Deploy em produção

## Spec relacionada

- [[Índice de Specs#2026-05-16 Formulário de Contato com Resend]]

## Decisões técnicas

- **Resend** como provedor de e-mail transacional — API simples, SDK TypeScript, generoso free tier
- Validação com **Zod** + **React Hook Form**
- **Server Action** para envio — sem API route separada

## Links

- [[Roadmap]]
- [[Decisões Frontend]]
