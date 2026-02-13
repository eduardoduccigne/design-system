"use client"

import { useCampaignV3 } from "../CampaignWizardV3"
import { MessageTimeline } from "@/components/campaigns/MessageTimeline"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { campaignsByObjective } from "@/lib/campaigns/data"

export function MessageStepV3() {
  const { state, dispatch } = useCampaignV3()

  // Get campaigns for selected objective
  const campaigns = state.objective ? campaignsByObjective[state.objective] : []

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
          Escolha uma campanha de mensagens pré-configurada. O agendamento será definido na próxima etapa.
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
        </CardContent>
      </Card>
    </div>
  )
}
