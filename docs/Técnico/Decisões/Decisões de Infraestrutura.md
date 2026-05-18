---
tags: [técnico, decisões, infraestrutura, deploy]
---

# Decisões de Infraestrutura

---

## Hosting

| App | Serviço | Motivo |
|-----|---------|--------|
| Frontend (Next.js) | **Vercel** | Zero-config para Next.js, edge network, preview deployments automáticos |
| Backend (NestJS) | **Railway** | Fácil deploy de Node.js + PostgreSQL gerenciado no mesmo lugar |
| Banco de dados | **PostgreSQL** via Railway | Relacional, gerenciado, mesma plataforma do backend |
| Cache | **Redis** | Opcional no MVP; Railway também oferece |

---

## CI/CD

- **GitHub Actions** como pipeline principal
- CI bloqueia merge se lint, type-check ou testes falharem
- Deploy automático para produção ao merge na `main`

---

## Ambientes

| Ambiente | Frontend | Backend |
|----------|----------|---------|
| Development | `localhost:3000` | `localhost:3001` |
| Production | `nico.dev` via Vercel | Railway |

---

## Secrets & Variáveis de Ambiente

- Frontend: gerenciadas no painel da **Vercel** (por ambiente)
- Backend: gerenciadas no painel do **Railway**
- Nunca commitar `.env` com dados reais no repositório

**Variáveis críticas pendentes:**
- `RESEND_API_KEY` — precisa ser configurada na Vercel para o formulário de contato funcionar em produção

---

## Estratégia de Deploy — Subprojetos

Cada subprojeto tem deploy independente em seu próprio subdomínio:

```
nico.dev           → Vercel project: nico-web
tools.nico.dev     → Vercel project: nico-tools (futuro)
projeto.nico.dev   → Vercel/Railway conforme necessidade
```

Turborepo garante que apenas os apps afetados por uma mudança sejam re-buildados.

---

## Links

- [[Arquitetura]]
- [[Stack Técnica]]
