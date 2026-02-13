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
import type { SingleBatchConfig as SingleBatchConfigType } from "@/lib/campaigns/types-v3"

interface SingleBatchConfigProps {
  config: Partial<SingleBatchConfigType>
  audienceSize: number
  onChange: (config: Partial<SingleBatchConfigType>) => void
}

export function SingleBatchConfig({ config, audienceSize, onChange }: SingleBatchConfigProps) {
  const minDate = getMinDate()

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
        <div className="grid grid-cols-2 gap-4">
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
            <Label>Horário de início</Label>
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
            <p className="text-xs text-muted-foreground">Horário de Brasília (GMT-3)</p>
          </div>
        </div>

        {/* Summary */}
        {config.startDate && config.startTime && (
          <div className="border-t pt-4 space-y-1 text-sm animate-in fade-in-0 slide-in-from-top-2 duration-300">
            <p className="font-medium">Resumo:</p>
            <p className="text-muted-foreground">
              • {audienceSize.toLocaleString("pt-BR")} pacientes receberão a Mensagem 1 em{" "}
              {new Date(config.startDate).toLocaleDateString("pt-BR")} as {config.startTime}
            </p>
            <p className="text-muted-foreground">
              • Follow-ups enviados automaticamente conforme a sequência
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
