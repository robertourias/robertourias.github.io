"use client"

import { useMemo, useState } from "react"
import { Info } from "lucide-react"
import {
  Button,
  Input,
  FormGroup,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Alert,
  AlertTitle,
  AlertDescription,
} from "@ui"
import {
  calculateCLT,
  calculatePJ,
  estimateCLTEquivalent,
  estimateCLTEffectiveEquivalent,
  estimatePJEquivalent,
  formatBRL,
  isMEIOverLimit,
  DEFAULT_PROLABORE,
  TAX_REGIME_LABELS,
  TAX_REGIME_DESCRIPTIONS,
  type CLTResult,
  type PJResult,
  type TaxRegime,
} from "@/lib/salary-calculator"
import ResultTables from "./result-tables"
import InfoSection from "./info-section"

interface CalculationResult {
  clt: CLTResult
  pj: PJResult
  cltIsEstimate: boolean
  pjIsEstimate: boolean
  cltIsSource: boolean
  pjIsSource: boolean
  equivalentGross: number | null
}

export default function CalculatorForm() {
  const [cltGross, setCltGross] = useState("")
  const [cltDependents, setCltDependents] = useState("0")
  const [cltOtherDeductions, setCltOtherDeductions] = useState("")

  const [cltVa, setCltVa] = useState("")
  const [cltVt, setCltVt] = useState("")
  const [cltOtherBenefits, setCltOtherBenefits] = useState("")

  const [pjRevenue, setPjRevenue] = useState("")
  const [pjRegime, setPjRegime] = useState<TaxRegime>("simples-iii")
  const [pjProlabore, setPjProlabore] = useState(String(DEFAULT_PROLABORE))
  const [pjExpenses, setPjExpenses] = useState("")
  const [pjHealthInsurance, setPjHealthInsurance] = useState("")
  const [pjOtherBenefits, setPjOtherBenefits] = useState("")

  // Tracks which field was the user's manual entry (the other is auto-mirrored)
  const [cltIsSource, setCltIsSource] = useState(false)
  const [pjIsSource, setPjIsSource] = useState(false)

  const [result, setResult] = useState<CalculationResult | null>(null)
  const [formError, setFormError] = useState("")

  const hasCLT = parseFloat(cltGross) > 0
  const hasPJ = parseFloat(pjRevenue) > 0
  const canCalculate = hasCLT || hasPJ

  // Auto-mirror: when one field is filled and the other hasn't been manually set,
  // copy the same gross value so both fields reflect identical starting points.
  function handleCltGrossChange(value: string) {
    const hasValue = value !== "" && parseFloat(value) > 0
    setCltGross(value)
    setCltIsSource(hasValue)
    if (!pjIsSource) {
      setPjRevenue(hasValue ? value : "")
    }
  }

  function handlePjRevenueChange(value: string) {
    const hasValue = value !== "" && parseFloat(value) > 0
    setPjRevenue(value)
    setPjIsSource(hasValue)
    if (!cltIsSource) {
      setCltGross(hasValue ? value : "")
    }
  }

  // Live equivalence hint: shown before calculation, below the Calcular button.
  // Uses effectiveIncome (net + benefits) so the equivalence accounts for all compensation.
  const equivalenceHint = useMemo(() => {
    const gross = parseFloat(cltGross) || 0
    const revenue = parseFloat(pjRevenue) || 0
    const deps = parseInt(cltDependents) || 0
    const otherDed = parseFloat(cltOtherDeductions) || 0
    const prolabore = parseFloat(pjProlabore) || DEFAULT_PROLABORE
    const vaVal = parseFloat(cltVa) || 0
    const vtVal = parseFloat(cltVt) || 0
    const cltOtherBen = parseFloat(cltOtherBenefits) || 0
    const pjOtherBen = parseFloat(pjOtherBenefits) || 0

    if (cltIsSource && !pjIsSource && gross > 0) {
      const cltResult = calculateCLT({ grossSalary: gross, dependents: deps, otherDeductions: otherDed, va: vaVal, vt: vtVal, otherBenefits: cltOtherBen })
      // Target PJ net = CLT effective income minus PJ benefits (so total effective incomes match)
      const targetPJNet = cltResult.effectiveIncome - pjOtherBen
      const equiv = estimatePJEquivalent(targetPJNet, { regime: pjRegime, prolabore, fixedExpenses: 0, healthInsurance: 0 })
      return { source: "clt" as const, sourceEffective: cltResult.effectiveIncome, equivalentGross: equiv.revenue }
    }

    if (pjIsSource && !cltIsSource && revenue > 0) {
      const pjResult = calculatePJ({
        revenue,
        regime: pjRegime,
        prolabore,
        fixedExpenses: parseFloat(pjExpenses) || 0,
        healthInsurance: parseFloat(pjHealthInsurance) || 0,
        otherBenefits: pjOtherBen,
      })
      // Find CLT gross where effectiveIncome (including FGTS, 13th, vacation) equals PJ effective
      const cltConfig = { dependents: deps, otherDeductions: otherDed, va: vaVal, vt: vtVal, otherBenefits: cltOtherBen }
      const equiv = estimateCLTEffectiveEquivalent(pjResult.effectiveIncome, cltConfig)
      return { source: "pj" as const, sourceEffective: pjResult.effectiveIncome, equivalentGross: equiv.gross }
    }

    return null
  }, [cltGross, pjRevenue, cltIsSource, pjIsSource, cltDependents, cltOtherDeductions, cltVa, cltVt, cltOtherBenefits, pjRegime, pjProlabore, pjExpenses, pjHealthInsurance, pjOtherBenefits])

  function handleCalculate() {
    if (!canCalculate) {
      setFormError(
        "Preencha o salário bruto (CLT) ou o faturamento mensal (PJ) para calcular."
      )
      return
    }
    setFormError("")

    const gross = parseFloat(cltGross) || 0
    const revenue = parseFloat(pjRevenue) || 0
    const deps = parseInt(cltDependents) || 0
    const otherDed = parseFloat(cltOtherDeductions) || 0
    const prolabore = parseFloat(pjProlabore) || DEFAULT_PROLABORE
    const expenses = parseFloat(pjExpenses) || 0
    const health = parseFloat(pjHealthInsurance) || 0
    const vaVal = parseFloat(cltVa) || 0
    const vtVal = parseFloat(cltVt) || 0
    const cltOtherBen = parseFloat(cltOtherBenefits) || 0
    const pjOtherBen = parseFloat(pjOtherBenefits) || 0

    const pjConfig = {
      regime: pjRegime,
      prolabore,
      fixedExpenses: expenses,
      healthInsurance: health,
      otherBenefits: pjOtherBen,
    }

    let cltResult: CLTResult
    let pjResult: PJResult
    let cltIsEstimate = false
    let pjIsEstimate = false

    if (hasCLT && hasPJ) {
      cltResult = calculateCLT({ grossSalary: gross, dependents: deps, otherDeductions: otherDed, va: vaVal, vt: vtVal, otherBenefits: cltOtherBen })
      pjResult = calculatePJ({ revenue, ...pjConfig })
    } else if (hasCLT) {
      cltResult = calculateCLT({ grossSalary: gross, dependents: deps, otherDeductions: otherDed, va: vaVal, vt: vtVal, otherBenefits: cltOtherBen })
      const equiv = estimatePJEquivalent(cltResult.netSalary, { ...pjConfig, fixedExpenses: 0, healthInsurance: 0 })
      pjResult = equiv.result
      pjIsEstimate = true
    } else {
      pjResult = calculatePJ({ revenue, ...pjConfig })
      const equiv = estimateCLTEquivalent(pjResult.netValue)
      cltResult = equiv.result
      cltIsEstimate = true
    }

    // Compute equivalent gross for the results panel
    let equivalentGross: number | null = null
    const cltConfig = { dependents: deps, otherDeductions: otherDed, va: vaVal, vt: vtVal, otherBenefits: cltOtherBen }

    if (cltIsSource && !pjIsSource) {
      // Single source CLT → find PJ gross for same effective income (no fixed expenses for clean answer)
      const targetPJNet = cltResult.effectiveIncome - pjOtherBen
      equivalentGross = estimatePJEquivalent(targetPJNet, { ...pjConfig, fixedExpenses: 0, healthInsurance: 0 }).revenue
    } else if (pjIsSource && !cltIsSource) {
      // Single source PJ → find CLT gross for same effective income
      equivalentGross = estimateCLTEffectiveEquivalent(pjResult.effectiveIncome, cltConfig).gross
    } else if (cltIsSource && pjIsSource) {
      // Both filled → find equivalent gross for the loser
      const diff = pjResult.effectiveIncome - cltResult.effectiveIncome
      if (diff > 0) {
        // PJ wins: show what CLT gross would match PJ effective income
        equivalentGross = estimateCLTEffectiveEquivalent(pjResult.effectiveIncome, cltConfig).gross
      } else if (diff < 0) {
        // CLT wins: show what PJ gross would match CLT effective income (using full config)
        const targetPJNet = cltResult.effectiveIncome - pjOtherBen
        equivalentGross = estimatePJEquivalent(targetPJNet, pjConfig).revenue
      }
    }

    setResult({ clt: cltResult, pj: pjResult, cltIsEstimate, pjIsEstimate, cltIsSource, pjIsSource, equivalentGross })
  }

  function handleReset() {
    setCltGross("")
    setCltDependents("0")
    setCltOtherDeductions("")
    setCltVa("")
    setCltVt("")
    setCltOtherBenefits("")
    setPjRevenue("")
    setPjRegime("simples-iii")
    setPjProlabore(String(DEFAULT_PROLABORE))
    setPjExpenses("")
    setPjHealthInsurance("")
    setPjOtherBenefits("")
    setCltIsSource(false)
    setPjIsSource(false)
    setResult(null)
    setFormError("")
  }

  const showMeiWarning =
    result !== null && pjRegime === "mei" && isMEIOverLimit(result.pj.revenue)

  return (
    <div className="space-y-8">
      {result === null && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* CLT Section */}
            <Card>
              <CardHeader>
                <CardTitle>CLT — Regime Celetista</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormGroup
                  label="Salário bruto mensal"
                  htmlFor="clt-gross"
                  hint="Valor registrado em carteira, antes de qualquer desconto"
                >
                  <CurrencyInput
                    id="clt-gross"
                    placeholder="0,00"
                    value={cltGross}
                    onChange={handleCltGrossChange}
                  />
                </FormGroup>

                <FormGroup
                  label="Dependentes (para IRRF)"
                  htmlFor="clt-dependents"
                  hint="Cada dependente deduz R$ 189,59 da base do IRRF"
                >
                  <Input
                    id="clt-dependents"
                    type="number"
                    min="0"
                    step="1"
                    value={cltDependents}
                    onChange={(e) => setCltDependents(e.target.value)}
                  />
                </FormGroup>

                <FormGroup
                  label="Outros descontos em folha"
                  htmlFor="clt-other"
                  hint="Plano de saúde descontado, vale-transporte, etc."
                >
                  <CurrencyInput
                    id="clt-other"
                    placeholder="0,00"
                    value={cltOtherDeductions}
                    onChange={setCltOtherDeductions}
                  />
                </FormGroup>

                <div className="border-t border-border/50 pt-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Benefícios (opcionais)</p>
                  <div className="space-y-4">
                    <FormGroup
                      label="Vale alimentação"
                      htmlFor="clt-va"
                      hint="Valor líquido que você recebe mensalmente"
                    >
                      <CurrencyInput
                        id="clt-va"
                        placeholder="0,00"
                        value={cltVa}
                        onChange={setCltVa}
                      />
                    </FormGroup>

                    <FormGroup
                      label="Vale transporte"
                      htmlFor="clt-vt"
                      hint="Valor efetivo recebido (desconto do colaborador já deduzido)"
                    >
                      <CurrencyInput
                        id="clt-vt"
                        placeholder="0,00"
                        value={cltVt}
                        onChange={setCltVt}
                      />
                    </FormGroup>

                    <FormGroup
                      label="Outros benefícios"
                      htmlFor="clt-other-benefits"
                      hint="Gym pass, auxílio home office, etc."
                    >
                      <CurrencyInput
                        id="clt-other-benefits"
                        placeholder="0,00"
                        value={cltOtherBenefits}
                        onChange={setCltOtherBenefits}
                      />
                    </FormGroup>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* PJ Section */}
            <Card>
              <CardHeader>
                <CardTitle>PJ — Pessoa Jurídica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormGroup
                  label="Faturamento mensal (valor do contrato)"
                  htmlFor="pj-revenue"
                  hint="Valor total do contrato antes de impostos ou custos"
                >
                  <CurrencyInput
                    id="pj-revenue"
                    placeholder="0,00"
                    value={pjRevenue}
                    onChange={handlePjRevenueChange}
                  />
                </FormGroup>

                <FormGroup
                  label="Regime tributário"
                  htmlFor="pj-regime"
                  hint={TAX_REGIME_DESCRIPTIONS[pjRegime]}
                >
                  <Select
                    value={pjRegime}
                    onValueChange={(v) => setPjRegime(v as TaxRegime)}
                  >
                    <SelectTrigger id="pj-regime">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(
                        Object.entries(TAX_REGIME_LABELS) as [TaxRegime, string][]
                      ).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormGroup>

                <FormGroup
                  label="Pró-labore mensal"
                  htmlFor="pj-prolabore"
                  hint="Base para cálculo de INSS (11%) e IRRF do sócio"
                >
                  <CurrencyInput
                    id="pj-prolabore"
                    placeholder="1.518,00"
                    value={pjProlabore}
                    onChange={setPjProlabore}
                  />
                </FormGroup>

                <FormGroup
                  label="Despesas fixas mensais"
                  htmlFor="pj-expenses"
                  hint="Contador, infraestrutura, softwares, etc."
                >
                  <CurrencyInput
                    id="pj-expenses"
                    placeholder="0,00"
                    value={pjExpenses}
                    onChange={setPjExpenses}
                  />
                </FormGroup>

                <FormGroup
                  label="Plano de saúde (pago pelo CNPJ)"
                  htmlFor="pj-health"
                >
                  <CurrencyInput
                    id="pj-health"
                    placeholder="0,00"
                    value={pjHealthInsurance}
                    onChange={setPjHealthInsurance}
                  />
                </FormGroup>
                <div className="flex items-start gap-2 rounded-lg bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                  <Info className="mt-0.5 size-3 shrink-0" aria-hidden="true" />
                  <span>Média individual em SP: <strong className="text-foreground">R$ 400 – R$ 700/mês</strong> (plano básico a intermediário, 2025)</span>
                </div>

                <FormGroup
                  label="Outros benefícios"
                  htmlFor="pj-other-benefits"
                  hint="Gym pass, equipamentos, auxílio home office, etc."
                >
                  <CurrencyInput
                    id="pj-other-benefits"
                    placeholder="0,00"
                    value={pjOtherBenefits}
                    onChange={setPjOtherBenefits}
                  />
                </FormGroup>
              </CardContent>
            </Card>
          </div>

          {formError && (
            <Alert variant="destructive">
              <AlertTitle>Atenção</AlertTitle>
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}

          <Button
            size="lg"
            onClick={handleCalculate}
            disabled={!canCalculate}
            className="w-full sm:w-auto"
          >
            Calcular
          </Button>

          {equivalenceHint !== null && (
            <Card className="border-primary/25 bg-primary/5">
              <CardContent className="flex items-start gap-3 pt-4 pb-4">
                <Info className="size-4 mt-0.5 text-primary shrink-0" aria-hidden="true" />
                <div className="space-y-1">
                  <p className="text-sm text-foreground">
                    {equivalenceHint.source === "clt" ? (
                      <>Para receber a mesma renda efetiva de <strong>{formatBRL(equivalenceHint.sourceEffective)}</strong> como PJ, você precisaria faturar:</>
                    ) : (
                      <>Para receber a mesma renda efetiva de <strong>{formatBRL(equivalenceHint.sourceEffective)}</strong> como CLT, você precisaria de um salário bruto de:</>
                    )}
                  </p>
                  <p className="text-2xl font-bold text-primary font-mono tabular-nums">
                    {formatBRL(equivalenceHint.equivalentGross)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {equivalenceHint.source === "clt"
                      ? `Estimado com ${TAX_REGIME_LABELS[pjRegime]}, sem despesas fixas`
                      : "Estimado sem dependentes e sem outros descontos"}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {result !== null && (
        <div className="space-y-6">
          {showMeiWarning && (
            <Alert variant="warning">
              <AlertTitle>Limite do MEI ultrapassado</AlertTitle>
              <AlertDescription>
                O faturamento estimado supera R$ 6.750/mês (R$ 81.000/ano), que é o teto do MEI.
                Considere migrar para Simples Nacional ou Lucro Presumido.
              </AlertDescription>
            </Alert>
          )}

          <ResultTables
            clt={result.clt}
            pj={result.pj}
            cltIsEstimate={result.cltIsEstimate}
            pjIsEstimate={result.pjIsEstimate}
            pjRegime={pjRegime}
            cltIsSource={result.cltIsSource}
            pjIsSource={result.pjIsSource}
            equivalentGross={result.equivalentGross}
          />

          <Button variant="outline" onClick={handleReset}>
            Refazer cálculo
          </Button>

          <InfoSection />
        </div>
      )}
    </div>
  )
}

// ─── Currency Input helper ────────────────────────────────────────────────────

interface CurrencyInputProps {
  id: string
  placeholder: string
  value: string
  onChange: (value: string) => void
}

function CurrencyInput({ id, placeholder, value, onChange }: CurrencyInputProps) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none select-none">
        R$
      </span>
      <Input
        id={id}
        type="number"
        min="0"
        step="any"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  )
}
