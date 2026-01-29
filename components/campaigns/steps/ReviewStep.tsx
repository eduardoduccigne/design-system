"use client"

import { useCampaign } from "../CampaignWizard"
import { MessageTimeline } from "../MessageTimeline"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"

export function ReviewStep() {
  const { state } = useCampaign()

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

        {/* Message & Schedule Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Mensagem e Agendamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-muted-foreground">Campanha</span>
              <span className="font-medium text-foreground">
                {state.selectedCampaign?.name ?? "—"}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-muted-foreground">Data e horário de início</span>
              <span className="font-medium text-foreground">
                {state.scheduleDate && state.scheduleTime
                  ? `${state.scheduleDate} às ${state.scheduleTime}`
                  : "—"}
              </span>
            </div>

            {/* Message Preview */}
            {state.selectedCampaign && (
              <div className="pt-2">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs font-medium text-muted-foreground mb-3">
                    Mensagem que será enviada
                  </p>
                  <MessageTimeline messages={state.selectedCampaign.messages} />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Alert */}
        <Alert variant="info">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Ao lançar a campanha, as mensagens serão enviadas automaticamente de acordo
            com a sequência e agendamento configurados.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
