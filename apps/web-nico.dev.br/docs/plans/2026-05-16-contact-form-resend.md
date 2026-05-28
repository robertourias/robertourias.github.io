# Plano Técnico: Formulário de contato com Resend e campo de telefone

**Spec:** `.ai-core/specs/2026-05-16-contact-form-resend.md`
**Data:** 2026-05-16
**Status:** pending

---

## Contrato de API

```
POST /api/contact
Content-Type: application/json

Body:
{
  name: string      // obrigatório, não vazio
  email: string     // obrigatório, formato válido
  phone: string     // obrigatório, mínimo 14 chars com máscara: (XX) XXXX-XXXX
  message: string   // obrigatório, não vazio
}

Respostas:
  200 { success: true }
  400 { error: "Todos os campos são obrigatórios" }
  500 { error: "Erro ao enviar mensagem" }
```

---

## Tarefa 1 — Instalar dependências de formulário

**Tipo:** chore
**Agente:** frontend
**Depende de:** nada

Instalar `react-hook-form` e `zod` no app `web-nico.dev.br`, conforme decisão de frontend documentada em `.ai-core/decisions/frontend.md`.

```
cd apps/web-nico.dev.br
pnpm add react-hook-form zod @hookform/resolvers
```

**Critérios de aceite:**
- [ ] `react-hook-form`, `zod` e `@hookform/resolvers` presentes em `package.json`
- [ ] `pnpm install` roda sem erros no workspace raiz

**Notas:** `resend` já está instalado (`"resend": "^6.10.0"`). Não reinstalar.

---

## Tarefa 2 — Atualizar API route `/api/contact` para Resend

**Tipo:** feature
**Agente:** backend
**Depende de:** Tarefa 1 (nenhuma dependência real — pode rodar em paralelo)

Substituir a lógica de `mailto:` redirect pelo envio real de e-mail via Resend SDK.

**Arquivo:** `apps/web-nico.dev.br/src/app/api/contact/route.ts`

Lógica:
1. Destruturar `{ name, email, phone, message }` do body
2. Validar que todos os 4 campos estão presentes e não são strings vazias → retornar 400 se não
3. Instanciar `new Resend(process.env.RESEND_API_KEY)`
4. Chamar `resend.emails.send(...)` com:
   - `from`: `"Portfólio <onboarding@resend.dev>"` (domínio de teste até nico.dev.br ser verificado no Resend)
   - `to`: `["roberto.urias@gmail.com"]`
   - `subject`: `"[Portfólio] Nova mensagem de ${name}"`
   - `text`: corpo em texto simples com todos os 4 campos
5. Retornar `{ success: true }` em caso de sucesso
6. Capturar erros do Resend e retornar 500

**Critérios de aceite:**
- [ ] Requisição POST com 4 campos válidos → retorna `{ success: true }` com HTTP 200
- [ ] Requisição POST com campo ausente → retorna `{ error: "..." }` com HTTP 400
- [ ] Sem `redirectUrl` na resposta (remover completamente)
- [ ] `RESEND_API_KEY` lida de `process.env` (não hardcodada)

**Notas:** Sem `RESEND_API_KEY` configurada, o Resend retornará erro 401 — este é o comportamento esperado em dev sem a key. Documentar a variável necessária no comentário da PR.

---

## Tarefa 3 — Atualizar Contact.tsx: campo telefone + máscara + React Hook Form

**Tipo:** feature
**Agente:** frontend
**Depende de:** Tarefa 1 (react-hook-form e zod instalados), Tarefa 2 (contrato de API definido)

Reescrever o componente `Contact.tsx` usando React Hook Form + Zod, adicionar campo de telefone com máscara brasileira automática.

**Arquivo:** `apps/web-nico.dev.br/src/app/components/Contact.tsx`

**Schema Zod:**
```ts
const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(14, "Telefone inválido").max(15),
  message: z.string().min(1, "Mensagem é obrigatória"),
})
```

**Máscara de telefone:**
- Implementar como função `formatPhone(value: string): string` pura, sem biblioteca
- Remover tudo que não for dígito
- Aplicar: `(XX) XXXX-XXXX` para ≤ 10 dígitos, `(XX) XXXXX-XXXX` para 11 dígitos
- Chamar no `onChange` do campo via `setValue` do RHF

**Layout do formulário (nova ordem dos campos):**
```
[ Nome           ] [ E-mail          ]   ← grid 2 colunas (existente)
[ Telefone — full width ]               ← novo campo, linha própria
[ Mensagem — full width textarea ]      ← existente
[ Botão Enviar ]
```

**Mudanças no handleSubmit:**
- Remover a lógica de `data.redirectUrl`
- Sucesso → `reset()` do RHF + `setStatus("success")`
- Erro → `setStatus("error")` + manter dados (RHF não reseta em erro)

**Critérios de aceite:**
- [ ] Campo Telefone aparece no formulário com label "Telefone"
- [ ] Máscara aplica `(11) 9999-9999` ao digitar 10 dígitos
- [ ] Máscara aplica `(11) 99999-9999` ao digitar 11 dígitos
- [ ] Submissão bloqueada no frontend se campo vazio (Zod)
- [ ] Após envio bem-sucedido, mensagem de sucesso inline e formulário limpo
- [ ] Em erro, dados preenchidos são preservados
- [ ] Sem chamada a `window.location.href` no componente

---

## Tarefa 4 — Documentar variável de ambiente

**Tipo:** chore
**Agente:** frontend
**Depende de:** Tarefa 2

Adicionar `RESEND_API_KEY` ao arquivo `.env.example` (ou equivalente) e ao STATUS.md como bloqueador resolvido.

**Critérios de aceite:**
- [ ] `.env.example` ou `.env.local.example` contém `RESEND_API_KEY=` com comentário explicativo
- [ ] STATUS.md atualizado: remover bloqueador de `ANTHROPIC_API_KEY` pendente e adicionar instrução para `RESEND_API_KEY`

---

## Ordem de execução

```
Tarefa 1 (instalar deps)
    ↓
Tarefa 2 (API route)  ←→  [paralela possível com Tarefa 3 após Tarefa 1]
Tarefa 3 (Contact.tsx)
    ↓
Tarefa 4 (docs)
```

## Teste manual ao final

1. Sem `RESEND_API_KEY`: formulário exibe erro → comportamento esperado
2. Com `RESEND_API_KEY` válida: e-mail chega em `roberto.urias@gmail.com`
3. Campos vazios: bloqueio no frontend antes de qualquer chamada de rede
4. Telefone: testar `(11) 3333-3333` (fixo) e `(11) 99999-9999` (celular)
