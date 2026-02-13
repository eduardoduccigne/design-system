"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { workHours, getMinDate } from "@/lib/campaigns/data-v3"
import type { WorkdayDailyConfig as WorkdayDailyConfigType } from "@/lib/campaigns/types-v3"

interface WorkdayDailyConfigProps {
  config: Partial<WorkdayDailyConfigType>
  audienceSize: number
  onChange: (config: Partial<WorkdayDailyConfigType>) => void
}

// Calculate workdays and completion
function calculateDistribution(startDate: string, audienceSize: number, sendsPerDay: number) {
  const totalWorkdays = Math.ceil(audienceSize / sendsPerDay)

  // Calculate completion date (add workdays)
  const start = new Date(startDate)
  let daysAdded = 0
  const current = new Date(start)

  while (daysAdded < totalWorkdays) {
    current.setDate(current.getDate() + 1)
    const day = current.getDay()
    if (day !== 0 && day !== 6) daysAdded++
  }

  return {
    totalWorkdays,
    completionDate: current.toLocaleDateString("pt-BR"),
  }
}

export function WorkdayDailyConfig({ config, audienceSize, onChange }: WorkdayDailyConfigProps) {
  const minDate = getMinDate()

  // Auto-suggest default sendsPerDay (spec 5.4.2: audience ÷ available workdays)
  const suggestedDefault = Math.ceil(audienceSize / 10) // ~10 workdays in 2 weeks

  const distribution = config.startDate && config.sendsPerDay
    ? calculateDistribution(config.startDate, audienceSize, config.sendsPerDay)
    : null

  // Filter times if today is selected
  const getAvailableTimes = () => {
    if (config.startDate !== minDate) return workHours

    const now = new Date()
    const currentMinutes = now.getHours() * 60 + now.getMinutes()

    return workHours.filter((time) => {
      const [hours, minutes] = time.split(":").map(Number)
      return hours * 60 + minutes > currentMinutes
    })
  }

  const availableTimes = getAvailableTimes()

  return (
    <Card className="shadow-[var(--shadow-sm)] transition-nilo">
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Envios por dia</Label>
            <Input
              type="number"
              min={1}
              max={audienceSize}
              placeholder={`Sugerido: ${suggestedDefault.toLocaleString("pt-BR")}`}
              value={config.sendsPerDay ?? ""}
              onChange={(e) => onChange({ ...config, sendsPerDay: parseInt(e.target.value) || 0 })}
              onFocus={(e) => {
                if (!config.sendsPerDay) onChange({ ...config, sendsPerDay: suggestedDefault })
              }}
            />
          </div>
          <div className="space-y-2">
            <Label>Data de início</Label>
            <Input
              type="date"
              min={minDate}
              value={config.startDate ?? ""}
              onChange={(e) => onChange({ ...config, startDate: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Horário</Label>
            <Select
              value={config.startTime ?? ""}
              onValueChange={(value) => onChange({ ...config, startTime: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                {availableTimes.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">GMT-3</p>
          </div>
        </div>

        {/* Calculated distribution summary */}
        {distribution && config.startTime && config.sendsPerDay && (
          <div className="border-t pt-4 space-y-1 text-sm animate-in fade-in-0 slide-in-from-top-2 duration-300">
            <p className="font-medium">Distribuição calculada:</p>
            <p className="text-muted-foreground">
              • {config.sendsPerDay.toLocaleString("pt-BR")} envios/dia
            </p>
            <p className="text-muted-foreground">
              • {distribution.totalWorkdays} dias úteis (Seg-Sex)
            </p>
            <p className="text-muted-foreground">
              • Envios iniciais completos até: {distribution.completionDate}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
