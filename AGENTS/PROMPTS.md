# Prompts Úteis

Coleção de prompts para facilitar o desenvolvimento do projeto.

---

## Prompt 1: Atualizar Contexto do Projeto

```
Atualize o arquivo AGENTS/PROJECT_CONTEXT.md com o contexto atual do projeto.
Inclua:
- O que é o projeto (breve descrição)
- Stack tecnológico atual
- Estrutura dos arquivos principais
- Estado atual do projeto (últimas alterações feitas)
- Regras e padrões adotados
- Observação para continuar a partir do último commit

Mantenha o arquivo conciso e atualize apenas as informações que mudaram.
```

---

## Prompt 2: Planejar Antes de Executar

```
Antes de executar qualquer alteração no código:

1. Crie/atualize o arquivo AGENTS/PLANO.md com:
   - ## Pedido Original: [descreva o que você solicitou]
   - ## Passos Planejados: lista numerada dos passos necessários
   - ## Observações: quaisquer considerações relevantes
   - **Status**: Pendente | Aprovado | Em Execução | Concluído

2. Apresente o plano ao usuário para revisão

3. Execute APENAS após aprovação explícita (sim, execute, etc.)

4. Após concluir, marque o status como "Concluído" no PLANO.md
```

---

## Prompt 3: Obter Contexto do Projeto

```
Leia o arquivo AGENTS/PROJECT_CONTEXT.md para entender mais sobre o projeto e me forneça um resumo do:
- O que é o projeto
- Stack tecnológico
- Estrutura principal
- Estado atual
- Regras e padrões
```

---

## Prompt 4: Executar Plano Manual

```
Leia o arquivo AGENTS/PLANO.md atual.
Execute cada passo listed em ## Passos Planejados, marcando conforme avança:
- [ ] → [x] quando concluir cada passo
- Atualize o status para "Em Execução" no início
- Marque como "Concluído" ao final
```

---

## Como Usar

Copie e cole o prompt desejado quando precisar. O prompt será executado e os arquivos serão criados/atualizados automaticamente.

---

_Prompts adicionados em: Abril 2026_
