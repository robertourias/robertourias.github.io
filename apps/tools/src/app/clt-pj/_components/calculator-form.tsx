"use client"

import { useState } from "react"
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
} from "@nico.dev/ui"
import {
  calculateCLT,
  calculatePJ,
  estimateCLTEquivalent,
  estimatePJEquivalent,
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
}

export default function CalculatorForm() {
  const [cltGross, setCltGross] = useState("")
  const [cltDependents, setCltDependents] = useState("0")
  const [cltOtherDeductions, setCltOtherDeductions] = useState("")

  const [pjRevenue, setPjRevenue] = useState("")
  const [pjRegime, setPjRegime] = useState<TaxRegime>("simples-iii")
  const [pjProlabore, setPjProlabore] = useState(String(DEFAULT_PROLABORE))
  const [pjExpenses, setPjExpenses] = useState("")
  const [pjHealthInsurance, setPjHealthInsurance] = useState("")

  const [result, setResult] = useState<CalculationResult | null>(null)
  const [formError, setFormError] = useState("")

  const hasCLT = parseFloat(cltGross) > 0
  const hasPJ = parseFloat(pjRevenue) > 0
  const canCalculate = hasCLT || hasPJ

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

    const pjConfig = {
      regime: pjRegime,
      prolabore,
      fixedExpenses: expenses,
      healthInsurance: health,
    }

    let cltResult: CLTResult
    let pjResult: PJResult
    let cltIsEstimate = false
    let pjIsEstimate = false

    if (hasCLT && hasPJ) {
      cltResult = calculateCLT({ grossSalary: gross, dependents: deps, otherDeductions: otherDed })
      pjResult = calculatePJ({ revenue, ...pjConfig })
    } else if (hasCLT) {
      cltResult = calculateCLT({ grossSalary: gross, dependents: deps, otherDeductions: otherDed })
      // Estimate PJ equivalent: uses form regime/prolabore, but zeroes expenses for a clean "what should I charge" answer
      const equiv = estimatePJEquivalent(cltResult.netSalary, {
        ...pjConfig,
        fixedExpenses: 0,
        healthInsurance: 0,
      })
      pjResult = equiv.result
      pjIsEstimate = true
    } else {
      pjResult = calculatePJ({ revenue, ...pjConfig })
      // Estimate CLT equivalent: baseline (0 dependents, 0 other deductions)
      const equiv = estimateCLTEquivalent(pjResult.netValue)
      cltResult = equiv.result
      cltIsEstimate = true
    }

    setResult({ clt: cltResult, pj: pjResult, cltIsEstimate, pjIsEstimate })
  }

  function handleReset() {
    setCltGross("")
    setCltDependents("0")
    setCltOtherDeductions("")
    setPjRevenue("")
    setPjRegime("simples-iii")
    setPjProlabore(String(DEFAULT_PROLABORE))
    setPjExpenses("")
    setPjHealthInsurance("")
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
                    onChange={setCltGross}
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
                    onChange={setPjRevenue}
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
