"use client"

import { useCampaignV1 } from "../CampaignWizardV1"
import { MessageTimeline } from "@/components/campaigns/MessageTimeline"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { campaignsByObjectiveV1, scheduleTimeSlots, getMinDate } from "@/lib/campaigns/data-v1"
import type { ScheduleConfig } from "@/lib/campaigns/types-v1"

export function MessageStepV1() {
  const { state, dispatch } = useCampaignV1()

  // Get campaigns for selected objective
  const campaigns = state.objective ? (campaignsByObjectiveV1[state.objective] ?? []) : []

  const handleCampaignSelect = (campaignId: string) => {
    const campaign = campaigns.find((c) => c.id === campaignId)
    if (campaign) {
      dispatch({ type: "SELECT_CAMPAIGN", payload: campaign })
    }
  }

  const handleScheduleChange = (partial: Partial<ScheduleConfig>) => {
    const current = state.schedule ?? { startDate: "", startTime: "" }
    dispatch({
      type: "SET_SCHEDULE",
      payload: { ...current, ...partial },
    })
  }

  // Filter out past times if today is selected
  const getAvailableTimeSlots = () => {
    const minDate = getMinDate()
    if (state.schedule?.startDate !== minDate) return scheduleTimeSlots
    const now = new Date()
    const currentMinutes = now.getHours() * 60 + now.getMinutes()
    return scheduleTimeSlots.filter((time) => {
      const [hours, minutes] = time.split(":").map(Number)
      return hours * 60 + minutes > currentMinutes
    })
  }

  return (
    <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          Selecione a mensagem
        </h1>
        <p className="text-muted-foreground">
          Escolha uma campanha de mensagens pré-configurada e defina a data e horário de início dos envios.
        </p>
      </div>

      {/* Campaign Selector */}
      <Card className="max-w-2xl">
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label>
              Campanha de Mensagens <span className="text-destructive">*</span>
            </Label>
            <Select
              value={state.selectedCampaign?.id ?? ""}
              onValueChange={handleCampaignSelect}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma campanha..." />
              </SelectTrigger>
              <SelectContent>
                {campaigns.map((campaign) => (
                  <SelectItem key={campaign.id} value={campaign.id}>
                    {campaign.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Message Preview */}
          {state.selectedCampaign && (
            <div className="p-4 bg-muted/50 rounded-lg">
              <MessageTimeline messages={state.selectedCampaign.messages} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Scheduling Section */}
      <Card className="max-w-2xl mt-6">
        <CardContent className="pt-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Agendamento</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Data de Início <span className="text-destructive">*</span>
              </Label>
              <Input
                type="date"
                min={getMinDate()}
                value={state.schedule?.startDate ?? ""}
                onChange={(e) => handleScheduleChange({ startDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>
                Horário <span className="text-destructive">*</span>
              </Label>
              <Select
                value={state.schedule?.startTime ?? ""}
                onValueChange={(value) => handleScheduleChange({ startTime: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableTimeSlots().map((time) => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Horário de Brasília (GMT-3)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
