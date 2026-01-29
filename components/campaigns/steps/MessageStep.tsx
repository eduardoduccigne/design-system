"use client"

import * as React from "react"
import { useCampaign } from "../CampaignWizard"
import { MessageTimeline } from "../MessageTimeline"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { campaignsByObjective, scheduleTimes } from "@/lib/campaigns/data"

export function MessageStep() {
  const { state, dispatch } = useCampaign()

  // Get campaigns for selected objective
  const campaigns = state.objective ? campaignsByObjective[state.objective] : []

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0]

  // Filter times if today is selected
  const getAvailableTimes = () => {
    if (state.scheduleDate !== today) return scheduleTimes

    const now = new Date()
    const currentMinutes = now.getHours() * 60 + now.getMinutes()

    return scheduleTimes.filter((time) => {
      const [hours, minutes] = time.split(":").map(Number)
      return hours * 60 + minutes > currentMinutes
    })
  }

  const availableTimes = getAvailableTimes()

  const handleCampaignSelect = (campaignId: string) => {
    const campaign = campaigns.find((c) => c.id === campaignId)
    if (campaign) {
      dispatch({ type: "SELECT_CAMPAIGN", payload: campaign })
    }
  }

  return (
    <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          Selecione a mensagem
        </h1>
        <p className="text-muted-foreground">
          Escolha uma campanha de mensagens pré-configurada.
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardContent className="pt-6 space-y-6">
          {/* Campaign Select */}
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

          {/* Schedule */}
          <div className="space-y-2">
            <Label>
              Agendamento <span className="text-destructive">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Data de Início</Label>
                <Input
                  type="date"
                  min={today}
                  value={state.scheduleDate ?? ""}
                  onChange={(e) =>
                    dispatch({ type: "SET_SCHEDULE_DATE", payload: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Horário</Label>
                <Select
                  value={state.scheduleTime ?? ""}
                  onValueChange={(value) =>
                    dispatch({ type: "SET_SCHEDULE_TIME", payload: value })
                  }
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
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
