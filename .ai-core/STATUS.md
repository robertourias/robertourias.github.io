# Status do Projeto

> Memória de trabalho persistente. Atualizado pelo `/checkpoint`, lido pelo `/retomar`.
> Não edite manualmente durante uma sessão ativa — use `/checkpoint` antes de fechar.

**Última atualização:** 2026-05-16
**Resumo da última sessão:** Implementado formulário de contato funcional com envio de e-mail via Resend, campo de telefone com máscara brasileira automática (fixo/celular) e migração do formulário para React Hook Form + Zod.

---

## Feature em andamento

**Spec ativo:** .ai-core/specs/2026-05-16-contact-form-resend.md (Status: approved — implementado e commitado)
**Plano ativo:** .ai-core/plans/2026-05-16-contact-form-resend.md

---

## Tasks

### ✅ Concluídas
- Spec e plano técnico do formulário de contato com Resend
- Instalação de `react-hook-form`, `zod`, `@hookform/resolvers`
- API route `/api/contact` substituída: `mailto:` redirect → envio real via Resend SDK
- `Contact.tsx` migrado para React Hook Form + Zod com campo de Telefone e máscara automática
- Correção: `new Resend(...)` movido para dentro do handler (evita falha em build time)
- Correção: `defaultValues` adicionados ao `useForm` (evita aviso de input não controlado)
- CHANGELOG promovido para `[0.6.0]` com detalhes completos

### 🔄 Em progresso
- (nenhuma)

### ⏭ Próximos passos
1. Confirmar que `RESEND_API_KEY` está configurada nas variáveis de ambiente da Vercel (Settings → Environment Variables) e fazer o deploy de produção
2. Verificar que o e-mail chega em `roberto.urias@gmail.com` após o deploy
3. (Opcional) Verificar domínio `nico.dev.br` no painel do Resend para usar como remetente em vez de `onboarding@resend.dev`
4. Usar `/spec` para próxima feature — sugestões: Blog, animações de entrada nas seções, seção de depoimentos

---

## Decisões desta sessão

- **Resend instanciado dentro do handler:** `new Resend(process.env.RESEND_API_KEY)` no escopo do módulo falha em build time — Vercel não injeta variáveis de runtime durante o build
- **`Controller` do RHF para o campo de telefone:** input controlado necessário para exibir a máscara em tempo real; `register` com `onChange` não atualiza o valor visível no DOM sem `value` prop
- **`defaultValues` obrigatório no `useForm`:** sem valores iniciais, `Controller` começa com `undefined` e React lança aviso de input não controlado → controlado
- **Remetente `onboarding@resend.dev`:** domínio de teste do Resend usado até `nico.dev.br` ser verificado no painel

---

## Bloqueadores / Perguntas abertas

- `RESEND_API_KEY` precisa ser configurada no painel da Vercel antes do próximo deploy de produção
- Domínio `nico.dev.br` não verificado no Resend — e-mails saem com remetente `onboarding@resend.dev` até a verificação
