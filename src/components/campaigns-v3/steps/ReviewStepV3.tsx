"use client"

import { useCampaignV3 } from "../CampaignWizardV3"
import { MessageTimeline } from "@/components/campaigns/MessageTimeline"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Info } from "lucide-react"

const distributionTypeLabels = {
  single_batch: "Envio Único",
  workday_daily: "Diário (dias úteis)",
  weekly: "Semanal",
  monthly: "Mensal",
}

export function ReviewStepV3() {
  const { state } = useCampaignV3()

  // Format distribution details
  const getDistributionDetails = () => {
    if (!state.distributionConfig) return null

    switch (state.distributionConfig.type) {
      case "single_batch":
        return `${new Date(state.distributionConfig.startDate).toLocaleDateString("pt-BR")} as ${state.distributionConfig.startTime}`
      case "workday_daily":
        return `A partir de ${new Date(state.distributionConfig.startDate).toLocaleDateString("pt-BR")} as ${state.distributionConfig.startTime}`
      case "weekly":
        const days = state.distributionConfig.selectedDays?.join(", ") ?? ""
        return `${days} a partir de ${new Date(state.distributionConfig.startDate).toLocaleDateString("pt-BR")} as ${state.distributionConfig.startTime}`
      case "monthly":
        const ordLabels = ["1ª", "2ª", "3ª", "4ª"]
        const wdLabels = ["", "segunda", "terça", "quarta", "quinta", "sexta"]
        return `${ordLabels[state.distributionConfig.ordinal - 1]} ${wdLabels[state.distributionConfig.weekday]} de cada mês às ${state.distributionConfig.startTime}`
      default:
        return null
    }
  }

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

        {/* Distribution Card - NEW */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Distribuição de Envios
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-muted-foreground">Tipo de distribuição</span>
              <span className="font-medium text-foreground">
                {state.distributionType ? distributionTypeLabels[state.distributionType] : "—"}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-muted-foreground">Detalhes</span>
              <span className="font-medium text-foreground">
                {getDistributionDetails() ?? "—"}
              </span>
            </div>
            {state.sequenceTimeline && (
              <>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">Duração total</span>
                  <span className="font-medium text-foreground">
                    {state.sequenceTimeline.totalDuration} dias
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">Total de mensagens estimado</span>
                  <span className="font-medium text-foreground">
                    ~{state.sequenceTimeline.totalMessages.toLocaleString("pt-BR")}
                  </span>
                </div>
              </>
            )}
            {state.validation?.quotaWarning && (
              <div className="pt-2">
                <Badge variant="warning">Excede cota mensal</Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Alert */}
        <Alert variant="info">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Ao lançar a campanha, as mensagens serão enviadas automaticamente de acordo
            com a sequência e distribuição configuradas.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
