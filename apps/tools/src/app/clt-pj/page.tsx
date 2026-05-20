import type { Metadata } from "next"
import ToolPageHeader from "@/components/tool-page-header"
import CalculatorForm from "./_components/calculator-form"

export const metadata: Metadata = {
  title: "Calculadora CLT vs PJ | tools.nico.dev",
  description:
    "Compare salário líquido entre regime CLT e PJ. Preencha um regime e o equivalente do outro é calculado automaticamente.",
}

export default function CltPjPage() {
  return (
    <main className="flex-1 px-6 py-12 max-w-5xl mx-auto w-full">
      <ToolPageHeader
        name="Calculadora CLT vs PJ"
        description="Compare o salário líquido entre regime CLT e PJ. Preencha um ou ambos os campos — o equivalente do outro é calculado automaticamente."
      />
      <CalculatorForm />
    </main>
  )
}
