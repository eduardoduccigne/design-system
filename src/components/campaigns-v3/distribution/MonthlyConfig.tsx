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
import {
  workHours,
  ordinalOptions,
  weekdayOptions,
  getAvailableMonths,
  getNthWeekdayOfMonth,
  formatOrdinalWeekday,
} from "@/lib/campaigns/data-v3"
import type { MonthlyConfig as MonthlyConfigType } from "@/lib/campaigns/types-v3"

interface MonthlyConfigProps {
  config: Partial<MonthlyConfigType>
  audienceSize: number
  onChange: (config: Partial<MonthlyConfigType>) => void
}

// Calculate distribution for monthly config
function calculateDistribution(
  ordinal: number,
  weekday: number,
  startMonth: string,
  audienceSize: number,
  sendsPerDay: number
) {
  // How many months needed to send all patients
  const monthsNeeded = Math.max(1, Math.ceil(audienceSize / sendsPerDay))

  // Calculate send dates
  const [year, month] = startMonth.split("-").map(Number)
  const sendDates: string[] = []

  for (let i = 0; i < Math.min(monthsNeeded, 6); i++) {
    const yearMonth = `${year + Math.floor((month - 1 + i) / 12)}-${String(((month - 1 + i) % 12) + 1).padStart(2, "0")}`
    const date = getNthWeekdayOfMonth(yearMonth, ordinal, weekday)
    sendDates.push(date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }))
  }

  // Calculate completion date
  const lastYearMonth = `${year + Math.floor((month - 1 + monthsNeeded - 1) / 12)}-${String(((month - 1 + monthsNeeded - 1) % 12) + 1).padStart(2, "0")}`
  const completionDate = getNthWeekdayOfMonth(lastYearMonth, ordinal, weekday)

  return {
    monthsNeeded,
    sendDates,
    completionDate: completionDate.toLocaleDateString("pt-BR"),
  }
}

export function MonthlyConfig({ config, audienceSize, onChange }: MonthlyConfigProps) {
  const availableMonths = getAvailableMonths()

  const distribution =
    config.ordinal && config.weekday && config.startMonth && config.sendsPerDay
      ? calculateDistribution(config.ordinal, config.weekday, config.startMonth, audienceSize, config.sendsPerDay)
      : null

  return (
    <Card className="shadow-[var(--shadow-sm)] transition-nilo">
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Envios por dia</Label>
            <Input
              type="number"
              min={1}
              max={audienceSize}
              placeholder="Ex: 500"
              value={config.sendsPerDay ?? ""}
              onChange={(e) => onChange({ ...config, sendsPerDay: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div className="space-y-2 col-span-2 sm:col-span-1">
            <Label>Dia do envio</Label>
            <div className="flex gap-2">
              <Select
                value={config.ordinal?.toString() ?? ""}
                onValueChange={(value) => onChange({ ...config, ordinal: parseInt(value) })}
              >
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="Ord." />
                </SelectTrigger>
                <SelectContent>
                  {ordinalOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value.toString()}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={config.weekday?.toString() ?? ""}
                onValueChange={(value) => onChange({ ...config, weekday: parseInt(value) })}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Dia da semana..." />
                </SelectTrigger>
                <SelectContent>
                  {weekdayOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value.toString()}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
                {workHours.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">GMT-3</p>
          </div>
        </div>

        {/* Starting month */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>A partir de</Label>
            <Select
              value={config.startMonth ?? ""}
              onValueChange={(value) => onChange({ ...config, startMonth: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Mês..." />
              </SelectTrigger>
              <SelectContent>
                {availableMonths.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Calculated distribution summary */}
        {distribution && config.startTime && config.sendsPerDay && config.ordinal && config.weekday && (
          <div className="border-t pt-4 space-y-1 text-sm animate-in fade-in-0 slide-in-from-top-2 duration-300">
            <p className="font-medium">Distribuição calculada:</p>
            <p className="text-muted-foreground">
              • Envio na {formatOrdinalWeekday(config.ordinal, config.weekday)} de cada mês
            </p>
            <p className="text-muted-foreground">
              • {config.sendsPerDay.toLocaleString("pt-BR")} envios/dia
            </p>
            <p className="text-muted-foreground">
              • Datas de envio: {distribution.sendDates.join(", ")}{distribution.monthsNeeded > 6 ? "..." : ""}
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
