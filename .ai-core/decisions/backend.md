# Decisões Backend

Escolhas específicas deste projeto que substituem padrões gerais.
Carregue junto com `agents/backend.agent.md`.

## Arquitetura

- Feature-first, organizado por módulo (não por camada técnica)
- Clean Architecture com limites de camada estritos
- Domínio isolado do NestJS — zero imports de framework na camada de domínio
- Módulos comunicam-se apenas via services públicos (sem acesso cross-module a repositories)

```
src/
  modules/
  common/
  infra/
  config/

module/
  controllers/
  services/
  repositories/
  domain/
  dto/
```

## Regras invioláveis

- Sem lógica de negócio em controllers
- Prisma apenas dentro de repositories
- DTOs apenas na camada de transporte
- Services contêm os use-cases
- Sem acesso cross-module a repositories

## ORM e banco

- Prisma ORM com PostgreSQL
- `synchronize: false` em produção — migrations obrigatórias para toda mudança de schema
- Sem concatenação de SQL raw

## Autenticação

- NextAuth / Auth.js
- HTTP-only cookies para sessão
- Guards obrigatórios em todas as rotas privadas

## Eventos e filas

- Nenhum por enquanto
- Jobs pesados devem usar filas quando implementados (não bloqueiam resposta HTTP)

## Cache

- Redis via NestJS CacheModule

## API

- REST com Swagger (`@nestjs/swagger`)
- Versionamento via prefixo de URL: `/api/v1/`
- Breaking changes exigem nova versão
- Paginação obrigatória em listagens (evitar N+1)

## Tratamento de erros

- Todos os erros estendem `AppException`
- Sem stacktrace exposto ao cliente
- Tratamento centralizado via HTTP exception filter global
- Erros de domínio exigem código único identificador

## Logging

- Pino logger
- Logs JSON estruturados
- `requestId` obrigatório em todos os logs
- Proibido `console.log`
- Nunca logar dados sensíveis

## Segurança

- Validação com Zod obrigatória em todas as entradas
- Nunca confiar em input do cliente
- Helmet habilitado
- Rate limiting habilitado

## Testes

- Unit: Jest para services (use-cases)
- e2e: Supertest para fluxos HTTP

## Naming

- `camelCase` para variáveis
- `PascalCase` para classes
- `kebab-case` para arquivos

## AI Rules

- Não adicionar lógica de negócio em controllers
- Não acessar Prisma fora de repositories
- Não duplicar DTOs
- Seguir a estrutura de módulo existente
