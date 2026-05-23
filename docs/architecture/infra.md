# Infrastructure

> Ambiente, deploy e dependências externas.

## Ambientes

| Ambiente | URL | Deploy trigger |
|----------|-----|---------------|
| Development | localhost | manual |
| Production | nico.dev / *.nico.dev | push to main (Vercel) |

## Hosting

- Frontend (Next.js): Vercel
- Backend (NestJS): Railway
- Banco de dados (PostgreSQL): Railway
- Subprojetos (Next.js): Vercel (subdomínios separados)

## CI/CD

GitHub Actions — CI bloqueia merge se lint ou type-check falhar.

## Variáveis de ambiente obrigatórias

| Variável | Descrição | Ambientes |
|----------|-----------|-----------|
| DATABASE_URL | Connection string PostgreSQL | staging, prod |
| NEXTAUTH_SECRET | Secret para NextAuth | prod |
| NEXTAUTH_URL | URL base da aplicação | prod |
| RESEND_API_KEY | API key do Resend (formulário de contato) | prod |
| ANTHROPIC_API_KEY | API key Anthropic (chat IA) | prod |

## Serviços externos

| Serviço | Propósito | Crítico? |
|---------|-----------|----------|
| Vercel | Hosting do frontend (Next.js) | Sim |
| Railway | Hosting do backend e banco de dados | Sim |
| GitHub Actions | CI/CD | Sim |
| Redis | Cache | Não (MVP pode operar sem) |
| Resend | Envio de e-mails (formulário de contato) | Não |
| Anthropic | API para chat IA | Não |
