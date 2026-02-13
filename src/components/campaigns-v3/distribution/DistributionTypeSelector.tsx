"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { DistributionType } from "@/lib/campaigns/types-v3"

interface DistributionTypeSelectorProps {
  value: DistributionType | null
  onChange: (type: DistributionType) => void
}

const distributionOptions: {
  value: DistributionType
  label: string
  description: string
}[] = [
  {
    value: "single_batch",
    label: "Envio Único",
    description: "Envie para todos de uma vez: ideal para baixo volume",
  },
  {
    value: "workday_daily",
    label: "Diário (dias úteis)",
    description: "Um lote por dia útil: distribui volume ao longo dos dias",
  },
  {
    value: "weekly",
    label: "Semanal",
    description: "Escolha dias da semana: controle fino do ritmo",
  },
  {
    value: "monthly",
    label: "Mensal",
    description: "Um lote por mês: para campanhas de alto volume distribuídas",
  },
]

export function DistributionTypeSelector({ value, onChange }: DistributionTypeSelectorProps) {
  return (
    <div>
      <RadioGroup
        value={value ?? undefined}
        onValueChange={(v) => onChange(v as DistributionType)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        {distributionOptions.map((option) => (
          <label
            key={option.value}
            className={`
              flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-nilo
              shadow-[var(--shadow-xs)] bg-card
              ${value === option.value
                ? "border-primary ring-2 ring-ring/30 bg-primary-50"
                : "border-border/60 hover:border-border hover:shadow-[var(--shadow-sm)]"
              }
            `}
          >
            <RadioGroupItem value={option.value} className="mt-0.5" />
            <div>
              <div className="font-medium text-foreground">{option.label}</div>
              <div className="text-sm text-muted-foreground">{option.description}</div>
            </div>
          </label>
        ))}
      </RadioGroup>
    </div>
  )
}
