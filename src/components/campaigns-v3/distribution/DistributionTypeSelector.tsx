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
}[] = [
  { value: "single_batch", label: "Envio lote único" },
  { value: "workday_daily", label: "Lotes diários (dias úteis)" },
  { value: "weekly", label: "Lotes semanais" },
  { value: "monthly", label: "Lotes mensais" },
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
            <div className="font-medium text-foreground">{option.label}</div>
          </label>
        ))}
      </RadioGroup>
    </div>
  )
}
