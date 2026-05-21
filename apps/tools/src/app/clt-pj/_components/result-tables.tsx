import { Badge } from "@ui"
import { formatBRL, type CLTResult, type PJResult, type TaxRegime, TAX_REGIME_LABELS } from "@/lib/salary-calculator"

interface ResultTablesProps {
  clt: CLTResult
  pj: PJResult
  cltIsEstimate: boolean
  pjIsEstimate: boolean
  pjRegime: TaxRegime
}

export default function ResultTables({
  clt,
  pj,
  cltIsEstimate,
  pjIsEstimate,
  pjRegime,
}: ResultTablesProps) {
  const diff = pj.netValue - clt.netSalary
  const diffPct = clt.netSalary > 0 ? (diff / clt.netSalary) * 100 : 0
  const winner = diff > 0 ? "PJ" : diff < 0 ? "CLT" : null

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ResultCard
          title="CLT"
          isEstimate={cltIsEstimate}
          estimateNote="Estimado sem dependentes e sem outros descontos"
          rows={[
            { label: "Salário Bruto", value: clt.grossSalary },
            { label: "(−) INSS", value: -clt.inss, variant: "deduction" },
            { label: "(−) IRRF", value: -clt.irrf, variant: "deduction" },
            ...(clt.otherDeductions > 0
              ? [{ label: "(−) Outros descontos", value: -clt.otherDeductions, variant: "deduction" as const }]
              : []),
          ]}
          total={clt.netSalary}
          totalLabel="Salário Líquido"
        />

        <ResultCard
          title="PJ"
          subtitle={TAX_REGIME_LABELS[pjRegime]}
          isEstimate={pjIsEstimate}
          estimateNote={`Estimado com ${TAX_REGIME_LABELS[pjRegime]}, sem despesas fixas`}
          rows={[
            { label: "Faturamento Bruto", value: pj.revenue },
            { label: "(−) Impostos PJ", value: -pj.taxOnRevenue, variant: "deduction" },
            { label: "(−) INSS (pró-labore)", value: -pj.inss, variant: "deduction" },
            { label: "(−) IRRF (pró-labore)", value: -pj.irrf, variant: "deduction" },
            ...(pj.fixedExpenses > 0
              ? [{ label: "(−) Despesas fixas", value: -pj.fixedExpenses, variant: "deduction" as const }]
              : []),
            ...(pj.healthInsurance > 0
              ? [{ label: "(−) Plano de saúde", value: -pj.healthInsurance, variant: "deduction" as const }]
              : []),
          ]}
          total={pj.netValue}
          totalLabel="Valor Líquido"
        />
      </div>

      {winner && (
        <div className="rounded-xl border border-border bg-surface-raised px-5 py-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="font-semibold text-foreground">{winner} é mais vantajoso:</span>
          <span className="text-primary font-semibold">{formatBRL(Math.abs(diff))}</span>
          <span className="text-muted-foreground">
            ({Math.abs(diffPct).toFixed(1)}%{" "}
            {diff > 0 ? "acima" : "abaixo"} do CLT)
          </span>
        </div>
      )}
    </div>
  )
}

interface TableRow {
  label: string
  value: number
  variant?: "deduction"
}

interface ResultCardProps {
  title: string
  subtitle?: string
  isEstimate: boolean
  estimateNote: string
  rows: TableRow[]
  total: number
  totalLabel: string
}

function ResultCard({
  title,
  subtitle,
  isEstimate,
  estimateNote,
  rows,
  total,
  totalLabel,
}: ResultCardProps) {
  return (
    <div className="rounded-xl border border-border bg-surface overflow-hidden">
      <div className="px-5 py-4 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
        {isEstimate && (
          <Badge variant="default" className="shrink-0 text-xs">
            Equivalente estimado
          </Badge>
        )}
      </div>

      <div className="border-t border-border">
        <table className="w-full text-sm">
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-border/50">
                <td className="px-5 py-2.5 text-muted-foreground">{row.label}</td>
                <td className="px-5 py-2.5 text-right font-mono tabular-nums text-foreground">
                  {formatBRL(Math.abs(row.value))}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-surface-raised">
              <td className="px-5 py-3 font-semibold text-foreground">{totalLabel}</td>
              <td className="px-5 py-3 text-right font-mono tabular-nums font-bold text-primary text-base">
                {formatBRL(total)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {isEstimate && (
        <p className="px-5 py-2.5 text-xs text-muted-foreground border-t border-border/50 bg-muted/30">
          {estimateNote}
        </p>
      )}
    </div>
  )
}
