export default function InfoSection() {
  return (
    <section className="mt-12 space-y-8">
      <div className="border-t border-border pt-8">
        <h2 className="text-xl font-semibold text-foreground mb-6">
          Como funciona o cálculo
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-base font-semibold text-foreground mb-3">Regime CLT</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">INSS progressivo:</strong> calculado por faixas
                — 7,5% até R$ 1.518, 9% até R$ 2.793,88, 12% até R$ 4.190,83 e 14% até o teto de
                R$ 8.157,41. Cada faixa incide apenas sobre o valor dentro dela.
              </p>
              <p>
                <strong className="text-foreground">IRRF:</strong> calculado sobre o salário bruto
                menos o INSS e a dedução por dependente (R$ 189,59/dependente). Também é progressivo,
                com isenção até R$ 2.259,20.
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
                <strong className="text-foreground">MEI:</strong> valor fixo de R$ 75,90/mês.
                Faturamento máximo de R$ 81.000/ano (R$ 6.750/mês).
              </p>
            </div>
          </div>
        </div>
      </div>

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
        <strong>Aviso:</strong> Este cálculo é uma estimativa baseada nas tabelas vigentes de 2025.
        Alíquotas do Simples Nacional variam conforme o faturamento acumulado dos últimos 12 meses.
        Consulte um contador para decisões financeiras importantes.
      </p>
    </section>
  )
}

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
