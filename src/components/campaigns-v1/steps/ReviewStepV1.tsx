"use client"

import * as React from "react"
import { useCampaignV1 } from "../CampaignWizardV1"
import { MessageTimeline } from "@/components/campaigns/MessageTimeline"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Info } from "lucide-react"

export function ReviewStepV1() {
  const { state, dispatch } = useCampaignV1()

  // Auto-suggested campaign name
  const autoSuggestedName = React.useMemo(() => {
    const objectivePart = state.objectiveName ?? "Campanha"
    const datePart = state.schedule?.startDate
      ? new Date(state.schedule.startDate + "T00:00:00").toLocaleDateString("pt-BR")
      : ""
    return datePart ? `${objectivePart} ${datePart}` : objectivePart
  }, [state.objectiveName, state.schedule?.startDate])

  return (
    <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          Revisão final
        </h1>
        <p className="text-muted-foreground">
          Confira todos os detalhes antes de lançar a campanha.
        </p>
      </div>

      <div className="space-y-4 max-w-3xl">
        {/* Campaign Name */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Nome da Campanha
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="campaign-name">Nome</Label>
              <Input
                id="campaign-name"
                value={state.campaignName ?? autoSuggestedName}
                onChange={(e) => dispatch({ type: "SET_CAMPAIGN_NAME", payload: e.target.value })}
                placeholder={autoSuggestedName}
              />
              <p className="text-xs text-muted-foreground">
                Sugestão automática: {autoSuggestedName}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Objective Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Objetivo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="py-2">
              <span className="text-sm text-muted-foreground">Objetivo selecionado</span>
              <p className="font-medium text-foreground mt-1">
                {state.objectiveName ?? "—"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Audience Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Público
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-muted-foreground">Total de pacientes</span>
              <span className="font-medium text-foreground">
                {state.audienceValidation?.total.toLocaleString("pt-BR") ?? "—"}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-muted-foreground">Válidos para envio</span>
              <span className="font-medium text-primary">
                {state.audienceValidation?.valid.toLocaleString("pt-BR") ?? "—"}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-muted-foreground">Arquivo</span>
              <span className="font-medium text-foreground">
                {state.audienceFileName ?? "—"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Message Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Mensagem
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-muted-foreground">Campanha</span>
              <span className="font-medium text-foreground">
                {state.selectedCampaign?.name ?? "—"}
              </span>
            </div>

            {/* Message Preview */}
            {state.selectedCampaign && (
              <div className="pt-2">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs font-medium text-muted-foreground mb-3">
                    Mensagens que serão enviadas
                  </p>
                  <MessageTimeline messages={state.selectedCampaign.messages} />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Schedule Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Agendamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-muted-foreground">Data de início</span>
              <span className="font-medium text-foreground">
                {state.schedule?.startDate
                  ? new Date(state.schedule.startDate + "T00:00:00").toLocaleDateString("pt-BR")
                  : "—"}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-muted-foreground">Horário</span>
              <span className="font-medium text-foreground">
                {state.schedule?.startTime ?? "—"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Info Alert */}
        <Alert variant="info">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Ao lançar a campanha, as mensagens serão enviadas automaticamente de acordo
            com o agendamento configurado.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
