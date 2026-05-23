---
tags: [app, web, nextjs, portfólio, i18n]
created: 2026-05-21
app: web-nico.dev.br
package: "@nico.dev/web-nico.dev.br"
url: https://nico.dev.br
relacionados:
  - "[[Técnico]]"
  - "[[../../01 - Projeto/Visão Geral]]"
---

# web-nico.dev.br — Visão Geral

> Site principal do portfólio de Roberto Nicoletti, hospedado em `nico.dev.br`.

---

## Propósito

O app `web-nico.dev.br` é o hub central do portfólio. Ele apresenta os trabalhos, experiência profissional e canais de contato de Roberto Nicoletti para recrutadores, empresas e a comunidade de desenvolvimento.

---

## Features implementadas / planejadas

| Feature | Descrição | Status |
|---------|-----------|--------|
| **Home** | Apresentação e navegação principal | 🟢 Live |
| **Portfólio de projetos** | Galeria com cards, tecnologias e links | 🟢 Live |
| **Currículo** | Página de CV com experiência e habilidades | 🟡 Em andamento |
| **Formulário de contato** | Envio de email via Resend | 🟡 Em andamento |
| **Blog** | Artigos técnicos autorais | 🔴 Planejado |
| **AI Chat Widget** | Widget de chat com IA integrado | 🔴 Planejado |
| **i18n (pt/en/es)** | Internacionalização via next-intl | 🟢 Implementado |

---

## Internacionalização

O site suporta **3 idiomas** via `next-intl`:
- 🇧🇷 Português (`pt`) — padrão
- 🇺🇸 Inglês (`en`)
- 🇪🇸 Espanhol (`es`)

Os arquivos de tradução ficam em `messages/{locale}.json`.

---

## Jornada do usuário principal

```
Recrutador acessa nico.dev.br
    ↓
Visualiza portfólio de projetos
    ↓
Acessa currículo
    ↓
Visita subprojetos via subdomínios (products em funcionamento)
    ↓
Contata via formulário
```

---

## Integrações externas

| Serviço | Propósito |
|---------|-----------|
| **Resend** | Envio de emails do formulário de contato |
| **Anthropic SDK** | API de chat com IA (widget planejado) |
| **Vercel Analytics** | Analytics de tráfego |
| **Vercel Speed Insights** | Monitoramento de performance |
| **Embla Carousel** | Carrossel responsivo de projetos |

---

## Ver também

- [[Técnico]]
- [[../../01 - Projeto/Visão Geral]]
- [[../../01 - Projeto/Técnico — Arquitetura e Stack]]
