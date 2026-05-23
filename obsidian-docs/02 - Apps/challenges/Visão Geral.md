---
tags: [app, challenges, nextjs, portfólio, desafios-técnicos]
created: 2026-05-21
app: challenges
package: "@nico.dev/challenges"
url: https://challenges.nico.dev.br
relacionados:
  - "[[Técnico]]"
  - "[[../../01 - Projeto/Visão Geral]]"
---

# challenges — Visão Geral

> Portfólio visual de desafios técnicos realizados durante processos seletivos. Hospedado em `challenges.nico.dev`.

---

## Propósito

O app `challenges` exibe de forma visual os testes técnicos que Roberto realizou para empresas durante processos seletivos. Cada card representa um desafio com preview, descrição, link de deploy e link para o repositório.

A ideia é demonstrar a qualidade de entrega em contextos de processo seletivo — mostrando não só que passou nos testes, mas como os entregou.

---

## Conceito central

```
Repositório GitHub: robertourias/testes-tecnicos
  └── Cada desafio técnico tem:
        ├── README com descrição
        ├── Seção "## Link Final" com URL do deploy
        ├── Link para o repositório
        └── Preview visual do projeto
```

Os dados são carregados automaticamente do GitHub via API — sem necessidade de atualização manual.

---

## Funcionalidades planejadas

| Feature | Descrição | Status |
|---------|-----------|--------|
| **Cards de desafios** | Grid visual com preview, empresa, tecnologias | 🔴 Planejado |
| **Fetch automático do GitHub** | Lê o repositório `testes-tecnicos` via API do GitHub | 🔴 Planejado |
| **Link de deploy** | Abre o projeto entregue em nova aba | 🔴 Planejado |
| **Link do repositório** | Abre o código no GitHub | 🔴 Planejado |
| **Filtro por empresa/tecnologia** | Filtragem dos cards | 🔴 Planejado |

---

## Glossário relevante

| Termo | Definição |
|-------|-----------|
| **Desafio técnico** | Teste técnico entregue para uma empresa durante processo seletivo, disponibilizado em `robertourias/testes-tecnicos` com código, README e deploy |
| **Link Final** | Seção do README de cada desafio que contém a URL do projeto publicado. Padrão: `## Link Final` seguido de uma URL |

---

## Público-alvo

- Recrutadores avaliando qualidade de entrega técnica
- Empresas com interesse em ver trabalhos práticos em contexto real
- Desenvolvedores curiosos sobre como são os desafios técnicos do mercado

---

## Ver também

- [[Técnico]]
- [[../../01 - Projeto/Visão Geral]]
- [[../../03 - Packages/ui/Visão Geral]]
