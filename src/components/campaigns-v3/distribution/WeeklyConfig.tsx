"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { workHours, getMinDate } from "@/lib/campaigns/data-v3"
import type { WeeklyConfig as WeeklyConfigType, Weekday } from "@/lib/campaigns/types-v3"

interface WeeklyConfigProps {
  config: Partial<WeeklyConfigType>
  audienceSize: number
  onChange: (config: Partial<WeeklyConfigType>) => void
}

const weekdays: { value: Weekday; label: string; short: string }[] = [
  { value: "mon", label: "Segunda", short: "Seg" },
  { value: "tue", label: "Terça", short: "Ter" },
  { value: "wed", label: "Quarta", short: "Qua" },
  { value: "thu", label: "Quinta", short: "Qui" },
  { value: "fri", label: "Sexta", short: "Sex" },
]

// Calculate distribution for weekly config
function calculateDistribution(
  startDate: string,
  selectedDays: Weekday[],
  audienceSize: number,
  sendsPerDay: number
) {
  if (selectedDays.length === 0) return null

  const totalSendDays = selectedDays.length
  const totalSendsPerWeek = sendsPerDay * totalSendDays
  const weeksNeeded = Math.ceil(audienceSize / totalSendsPerWeek)

  // Calculate completion date
  const start = new Date(startDate)
  const completionDate = new Date(start)
  completionDate.setDate(completionDate.getDate() + (weeksNeeded * 7))

  return {
    totalSendDays,
    weeksNeeded,
    selectedDaysLabel: selectedDays.map((d) => weekdays.find((w) => w.value === d)?.short).join(", "),
    completionDate: completionDate.toLocaleDateString("pt-BR"),
  }
}

export function WeeklyConfig({ config, audienceSize, onChange }: WeeklyConfigProps) {
  const minDate = getMinDate()
  const selectedDays = config.selectedDays ?? []

  const distribution = config.startDate && selectedDays.length > 0 && config.sendsPerDay
    ? calculateDistribution(config.startDate, selectedDays, audienceSize, config.sendsPerDay)
    : null

  // Map weekday labels to JS Date day numbers (0=Sun, 1=Mon, ...6=Sat)
  const weekdayToJsDay: Record<Weekday, number> = {
    mon: 1, tue: 2, wed: 3, thu: 4, fri: 5,
  }

  // Check if a date string falls on one of the selected weekdays
  const isDateOnSelectedDay = (dateStr: string, days: Weekday[]) => {
    if (days.length === 0) return true
    const date = new Date(dateStr + "T12:00:00") // noon to avoid timezone issues
    const jsDay = date.getDay()
    return days.some((d) => weekdayToJsDay[d] === jsDay)
  }

  const handleDayToggle = (day: Weekday, checked: boolean) => {
    const newDays = checked
      ? [...selectedDays, day]
      : selectedDays.filter((d) => d !== day)

    // Reset start date if it no longer falls on a selected day (spec 5.4.3)
    const updatedConfig: Partial<WeeklyConfigType> = { ...config, selectedDays: newDays }
    if (config.startDate && newDays.length > 0 && !isDateOnSelectedDay(config.startDate, newDays)) {
      updatedConfig.startDate = undefined
    }

    onChange(updatedConfig)
  }

  // Validate date selection: only accept dates matching selected weekdays
  const handleDateChange = (dateStr: string) => {
    if (selectedDays.length > 0 && !isDateOnSelectedDay(dateStr, selectedDays)) {
      // Reject invalid date — find the next valid date from the selected one
      const date = new Date(dateStr + "T12:00:00")
      for (let i = 1; i <= 7; i++) {
        const next = new Date(date)
        next.setDate(next.getDate() + i)
        const nextStr = next.toISOString().split("T")[0]
        if (isDateOnSelectedDay(nextStr, selectedDays)) {
          onChange({ ...config, startDate: nextStr })
          return
        }
      }
    }
    onChange({ ...config, startDate: dateStr })
  }

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

  // Auto-suggest default sendsPerDay (spec 5.4.3: audience ÷ estimated send days)
  const suggestedDefault = selectedDays.length > 0
    ? Math.ceil(audienceSize / (selectedDays.length * 4)) // ~4 weeks
    : Math.ceil(audienceSize / 8) // fallback

  return (
    <Card className="shadow-[var(--shadow-sm)] transition-nilo">
      <CardContent className="pt-6 space-y-4">
        {/* Weekday selection — shown FIRST per spec 5.4.3 */}
        <div className="space-y-2">
          <Label>Enviar em:</Label>
          <div className="flex gap-4 flex-wrap">
            {weekdays.map((day) => (
              <label key={day.value} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={selectedDays.includes(day.value)}
                  onCheckedChange={(checked) => handleDayToggle(day.value, !!checked)}
                />
                <span className="text-sm">{day.short}</span>
              </label>
            ))}
          </div>
          {selectedDays.length === 0 && (
            <p className="text-xs text-destructive">Selecione pelo menos um dia</p>
          )}
        </div>

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
              onChange={(e) => handleDateChange(e.target.value)}
            />
            {selectedDays.length > 0 && (
              <p className="text-xs text-muted-foreground">
                Apenas {selectedDays.map((d) => weekdays.find((w) => w.value === d)?.short).join(", ")}
              </p>
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
              • {config.sendsPerDay.toLocaleString("pt-BR")} envios/dia ({distribution.selectedDaysLabel})
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
