# Spec: Página do Metrônomo

**Status:** approved
**Data:** 2026-05-28
**Autor:** planner-agent
**App:** apps/metronome
**Referência visual:** apps/metronome/refs/metronomo-ref.png

---

## Problema

Músicos precisam de um metrônomo preciso, acessível de qualquer dispositivo sem instalação. A página deve oferecer controle completo de tempo com feedback audiovisual imediato, seguindo a referência visual fornecida.

---

## Cenários de Usuário

- **P1 (crítico):** Como músico, quero iniciar um metrônomo com BPM e número de beats definidos, para praticar com marcação de tempo precisa.
- **P1 (crítico):** Como músico, quero ouvir e ver cada batida claramente diferenciada, para não perder o tempo durante a prática.
- **P2 (importante):** Como músico, quero definir um timer de prática, para saber quando parar sem olhar o relógio.
- **P2 (importante):** Como músico, quero escolher subdivisões rítmicas, para praticar colcheias, tercinas ou semicolcheias junto com o tempo.
- **P3 (nice-to-have):** Como músico, quero usar Tap BPM para detectar o tempo de uma música que estou ouvindo.

---

## Requisitos Funcionais

### BPM

- **FR-001:** O BPM deve ser exibido em destaque no topo da página (tipografia grande).
- **FR-002:** Abaixo do valor, exibir o nome do andamento musical correspondente ao BPM (ver tabela de andamentos).
- **FR-003:** Um slider horizontal deve controlar o BPM. Botões `-` e `+` nas extremidades ajustam ±1 BPM por clique (hold para ajuste contínuo).
- **FR-004:** Range de BPM: mínimo 20, máximo 300. Padrão: 100.
- **FR-005:** O slider deve ter track preenchida proporcionalmente ao valor atual.

**Tabela de andamentos (BPM → nome):**

| BPM | Nome |
|-----|------|
| 20–39 | Larghissimo |
| 40–59 | Largo |
| 60–65 | Larghetto |
| 66–75 | Adagio |
| 76–107 | Andante |
| 108–119 | Moderato |
| 120–139 | Allegretto |
| 140–167 | Allegro |
| 168–199 | Vivace |
| 200–300 | Presto |

### Visualização de Beats

- **FR-006:** Exibir N círculos (N = beats configurados) abaixo do slider, com label "BEATS" acima.
- **FR-007:** O círculo correspondente ao beat atual deve ser destacado visualmente (cor primária) durante a batida.
- **FR-008:** O beat 1 (primeiro tempo) deve ter destaque diferenciado dos demais quando "Stress first beat" estiver ativo.

### Controles Principais

- **FR-009:** Botão "Start" inicia o metrônomo. Ao clicar novamente, muda para "Stop" e para o metrônomo.
- **FR-010:** Botão "Tap BPM" — ao clicar repetidamente, calcula o BPM pela média do intervalo entre os últimos 4 taps. Descarta taps com intervalo > 3s (reset).

### Painel de Configurações

- **FR-011 — Beats:** Controle numérico com botões `-` e `+`. Range: 1–12. Padrão: 4.
- **FR-012 — Stress first beat:** Checkbox. Quando marcado, o primeiro beat do compasso emite som mais grave/alto e destaque visual diferenciado. Padrão: marcado.
- **FR-013 — Timer:** Checkbox + input de tempo no formato `MM:SS`. Quando ativo e o metrônomo iniciado, faz contagem regressiva. Ao chegar em 0:00, o metrônomo para automaticamente. Padrão: desmarcado, valor padrão "1:00".
- **FR-014 — Subdivisions:** Grade de ícones de figuras musicais (ver lista abaixo). Ao selecionar, o metrônomo emite cliques adicionais nas subdivisões dentro de cada beat.

**Subdivisões disponíveis (em ordem na grade):**

| Ícone | Descrição | Clicks por beat |
|-------|-----------|-----------------|
| ♩ | Sem subdivisão (padrão) | 1 |
| ♪♪ | Colcheias (2) | 2 |
| ♪♪♪ | Tercina de colcheias (3) | 3 |
| ♬♬ | Semicolcheias (4) | 4 |
| ♩. ♪ | Colcheia pontuada + colcheia | 2 (desigual) |
| ♪ ♩. | Colcheia + colcheia pontuada | 2 (desigual) |
| ♬♬♬♬ | Quatro semicolcheias variante | 4 |
| ³♬♬♬ | Sextilha (6) | 6 |

### Áudio

- **FR-015:** Usar Web Audio API (`AudioContext`) para todos os sons — sem arquivos de áudio externos.
- **FR-016:** Beat 1 com stress: oscilador a 900 Hz, 15ms de duração, envelope ADSR (ramp up/down).
- **FR-017:** Beats normais: oscilador a 600 Hz, 10ms.
- **FR-018:** Clicks de subdivisão: oscilador a 400 Hz, 8ms.
- **FR-019:** O clock de timing deve usar `AudioContext.currentTime` com lookahead scheduling (~25ms ahead) — não usar `setInterval` ou `setTimeout` como clock principal.
- **FR-020:** O áudio deve funcionar em mobile (iOS requer `AudioContext.resume()` em resposta a um gesto do usuário — tratar no clique de Start).

---

## Critérios de Sucesso

- [ ] BPM slider ajusta e o metrônomo responde imediatamente (sem reiniciar do beat 1)
- [ ] Beats visuais piscam em sincronia com o áudio (drift < 5ms perceptível)
- [ ] Stress first beat sonoro e visual claramente distinguível dos demais beats
- [ ] Timer conta regressivamente e para o metrônomo ao zerar
- [ ] Tap BPM calcula corretamente após 4+ taps
- [ ] Subdivisões soam dentro do tempo correto do beat
- [ ] Start/Stop funciona sem recarregar a página
- [ ] Funciona em Chrome, Firefox, Safari (desktop e mobile)
- [ ] `prefers-reduced-motion`: animações visuais desativadas, áudio mantido

---

## Fora do Escopo

- Salvar presets de configuração (sem localStorage nesta iteração)
- Polirritmia (dois compassos simultâneos)
- Upload de samples de áudio customizados
- Metrônomo visual em forma de pêndulo animado
- Modo offline / PWA

---

## Riscos e Premissas

- **Premissa:** `@nico.dev/ui` possui `Checkbox`, `Input`, `Button` e `Slider` (ou primitiva equivalente) utilizáveis para os controles.
- **Risco:** iOS Safari requer gesto do usuário para iniciar `AudioContext` → Mitigação: chamar `audioContext.resume()` dentro do handler do botão Start.
- **Risco:** Drift de timing em abas em background (browsers throttle timers) → Mitigação: lookahead scheduling com Web Audio API elimina este problema.
- **Risco:** Ícones de figuras musicais não disponíveis no Lucide React → Mitigação: usar SVG embutido para as figuras musicais das subdivisões, ou representar com texto unicode (♩ ♪ ♬).

---

<!-- 
GATE DE APROVAÇÃO
Para desbloquear a criação do plano técnico, altere o Status acima de "draft" para "approved".
O agente planner NÃO deve criar tasks de implementação enquanto Status for "draft".
-->
