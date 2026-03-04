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
import type { WeeklyConfig as WeeklyConfigType } from "@/lib/campaigns/types-v3"

interface WeeklyConfigProps {
  config: Partial<WeeklyConfigType>
  audienceSize: number
  onChange: (config: Partial<WeeklyConfigType>) => void
}

const weekdayNames = ["Domingos", "Segundas-feiras", "Terças-feiras", "Quartas-feiras", "Quintas-feiras", "Sextas-feiras", "Sábados"]

// Calculate distribution for weekly config
function calculateDistribution(
  startDate: string,
  audienceSize: number,
  sendsPerDay: number
) {
  const weeksNeeded = Math.ceil(audienceSize / (sendsPerDay * 5)) // 5 workdays/week

  const start = new Date(startDate)
  const completionDate = new Date(start)
  completionDate.setDate(completionDate.getDate() + weeksNeeded * 7)

  return {
    weeksNeeded,
    completionDate: completionDate.toLocaleDateString("pt-BR"),
  }
}

export function WeeklyConfig({ config, audienceSize, onChange }: WeeklyConfigProps) {
  const minDate = getMinDate()

  const distribution = config.startDate && config.sendsPerDay
    ? calculateDistribution(config.startDate, audienceSize, config.sendsPerDay)
    : null

  const startDateWeekday = config.startDate
    ? weekdayNames[new Date(config.startDate + "T12:00:00").getDay()]
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

  const suggestedDefault = Math.ceil(audienceSize / (5 * 4)) // ~4 weeks, 5 days/week

  return (
    <Card className="shadow-[var(--shadow-sm)] transition-nilo">
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Envios por dia de envio</Label>
            <Input
              type="number"
              min={1}
              max={audienceSize}
              placeholder={`Sugerido: ${suggestedDefault.toLocaleString("pt-BR")}`}
              value={config.sendsPerDay ?? ""}
              onChange={(e) => onChange({ ...config, sendsPerDay: parseInt(e.target.value) || 0 })}
              onFocus={() => {
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
            {startDateWeekday && (
              <p className="text-sm text-muted-foreground">Enviado {startDateWeekday}</p>
            )}
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
              • {distribution.weeksNeeded} semanas de envio
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
