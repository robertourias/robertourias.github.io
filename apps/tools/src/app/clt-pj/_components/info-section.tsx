import { CheckCircle2, XCircle, Check, X } from "lucide-react"

export default function InfoSection() {
  return (
    <section className="mt-12 space-y-8">

      {/* Vantagens e desvantagens */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Vantagens e desvantagens</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ProConCard
            type="pro"
            title="Vantagens CLT"
            items={CLT_PROS}
          />
          <ProConCard
            type="pro"
            title="Vantagens PJ"
            items={PJ_PROS}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ProConCard
            type="con"
            title="Desvantagens CLT"
            items={CLT_CONS}
          />
          <ProConCard
            type="con"
            title="Desvantagens PJ"
            items={PJ_CONS}
          />
        </div>
      </div>

      {/* Como funciona o cálculo */}
      <div className="border-t border-border pt-8">
        <h2 className="text-xl font-semibold text-foreground mb-6">
          Como funciona o cálculo
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-base font-semibold text-foreground mb-3">Regime CLT</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">INSS progressivo 2026:</strong> calculado por faixas
                — 7,5% até R$ 1.621, 9% até R$ 2.902,84, 12% até R$ 4.354,27 e 14% até o teto de
                R$ 8.475,55. Cada faixa incide apenas sobre o valor dentro dela.
              </p>
              <p>
                <strong className="text-foreground">IRRF 2026 — nova isenção até R$ 5.000:</strong>{" "}
                calculado sobre o salário bruto menos o INSS e a dedução por dependente
                (R$ 189,59/dependente). A partir de 2026, aplica-se um desconto progressivo que
                zera o imposto para bases de cálculo equivalentes a ~R$ 5.000 bruto, com redução
                parcial até R$ 7.350. Acima disso, a tabela progressiva padrão se aplica normalmente.
              </p>
              <p>
                <strong className="text-foreground">Benefícios não contabilizados no líquido:</strong>{" "}
                13º salário, FGTS (8% do bruto) e férias (1/3 adicional) representam
                aproximadamente 4 salários extras por ano — uma vantagem real do CLT que
                este cálculo não inclui no mensal.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground mb-3">Regime PJ</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Simples Nacional (Anexo III):</strong> carga de
                ~6% sobre o faturamento para atividades de TI e consultoria (faixa 1, até
                R$ 180k/ano). A alíquota efetiva sobe em faixas superiores.
              </p>
              <p>
                <strong className="text-foreground">Simples Nacional (Anexo V):</strong> carga de
                ~15,5% para serviços profissionais mais intensivos em capital.
              </p>
              <p>
                <strong className="text-foreground">Lucro Presumido:</strong> tributação sobre
                lucro presumido de 32% para serviços — IRPJ + CSLL + PIS + COFINS + ISS,
                resultando em ~17% de carga total sobre o faturamento.
              </p>
              <p>
                <strong className="text-foreground">INSS do sócio (pró-labore):</strong> 11% sobre
                o pró-labore como contribuinte individual, limitado ao teto previdenciário.
                O IRRF do sócio incide sobre o pró-labore líquido de INSS.
              </p>
              <p>
                <strong className="text-foreground">MEI 2026:</strong> DAS fixo de R$ 86,05/mês
                para serviços (R$ 81,05 de INSS + R$ 5,00 de ISS). Faturamento máximo de
                R$ 81.000/ano (R$ 6.750/mês).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Principais diferenças */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Principais diferenças</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DIFFERENCES.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-surface p-4 space-y-1"
            >
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.clt}</p>
              <p className="text-xs text-primary">{item.pj}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground border-t border-border pt-4">
        <strong>Aviso:</strong> Este cálculo é uma estimativa baseada nas tabelas vigentes de 2026
        (INSS: Portaria MPS, teto R$ 8.475,55; IRRF: nova tabela com isenção até ~R$ 5.000 bruto).
        Alíquotas do Simples Nacional variam conforme o faturamento acumulado dos últimos 12 meses.
        Consulte um contador para decisões financeiras importantes.
      </p>
    </section>
  )
}

// ─── ProConCard ───────────────────────────────────────────────────────────────

interface ProConCardProps {
  type: "pro" | "con"
  title: string
  items: readonly string[]
}

function ProConCard({ type, title, items }: ProConCardProps) {
  const isPro = type === "pro"

  return (
    <div className={`rounded-xl border p-5 ${isPro ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/40 dark:bg-emerald-950/20" : "border-red-200 bg-red-50/50 dark:border-red-900/40 dark:bg-red-950/20"}`}>
      <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
        {isPro
          ? <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
          : <XCircle className="size-4 text-red-500 dark:text-red-400 shrink-0" aria-hidden="true" />
        }
        {title}
      </h3>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
            {isPro
              ? <Check className="size-3 mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              : <X className="size-3 mt-0.5 shrink-0 text-red-500 dark:text-red-400" aria-hidden="true" />
            }
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CLT_PROS = [
  "13º salário e férias garantidos por lei",
  "FGTS (8% do bruto) depositado pelo empregador",
  "Seguro-desemprego em demissão sem justa causa",
  "Contribuição previdenciária automática",
  "Plano de saúde geralmente custeado pela empresa",
] as const

const PJ_PROS = [
  "Remuneração bruta potencialmente maior",
  "Autonomia de horário, local e clientes",
  "Despesas operacionais dedutíveis do faturamento",
  "Possibilidade de múltiplos contratos simultâneos",
  "Flexibilidade para escalar receita",
] as const

const CLT_CONS = [
  "Salário bruto geralmente menor que o PJ equivalente",
  "Menor autonomia de horário e local de trabalho",
  "Vínculo com um único empregador",
  "Sem poder de negociação de contrato",
] as const

const PJ_CONS = [
  "Sem 13º, férias remuneradas ou FGTS",
  "Sem seguro-desemprego",
  "Custos fixos: contador, DAS, guias fiscais",
  "Renda variável e risco de inadimplência",
  "Sem proteções da CLT em rescisão",
] as const

const DIFFERENCES = [
  {
    title: "13º salário e férias",
    clt: "CLT: garantidos por lei — equivalem a 2,33 salários/ano extras",
    pj: "PJ: não existem — o valor precisa ser provisionado pelo profissional",
  },
  {
    title: "FGTS",
    clt: "CLT: 8% do salário bruto depositado pelo empregador mensalmente",
    pj: "PJ: não existe — pode ser compensado com maior taxa horária",
  },
  {
    title: "Previdência social",
    clt: "CLT: contribuição automática via folha, garante aposentadoria e auxílio",
    pj: "PJ: INSS sobre pró-labore. Cobertura limitada — considerar previdência privada",
  },
  {
    title: "Risco financeiro",
    clt: "CLT: salário garantido, seguro-desemprego em caso de demissão sem justa causa",
    pj: "PJ: renda variável, sem seguro-desemprego, responsabilidade sobre inadimplência",
  },
  {
    title: "Plano de saúde",
    clt: "CLT: frequentemente oferecido pelo empregador com custo compartilhado",
    pj: "PJ: pessoa física ou pelo CNPJ. Pode ser deduzido do faturamento",
  },
  {
    title: "Flexibilidade e autonomia",
    clt: "CLT: jornada e localização definidas pelo empregador",
    pj: "PJ: maior autonomia de horário, local e escolha de clientes",
  },
] as const
