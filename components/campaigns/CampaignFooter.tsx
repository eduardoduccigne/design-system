"use client"

import { Button } from "@/components/ui/button"
import { useCampaign } from "./CampaignWizard"
import { ArrowLeft, ArrowRight, Rocket } from "lucide-react"

interface CampaignFooterProps {
  canProceed: boolean
  onBack: () => void
  onNext: () => void
}

export function CampaignFooter({ canProceed, onBack, onNext }: CampaignFooterProps) {
  const { state } = useCampaign()

  // Generate footer info text
  const getInfoText = () => {
    switch (state.step) {
      case 1:
        return state.objective
          ? `Objetivo: ${state.objectiveName}`
          : "Selecione um objetivo"
      case 2:
        return state.audienceValidation
          ? `${state.audienceValidation.valid.toLocaleString("pt-BR")} pacientes válidos`
          : "Faça upload da lista de pacientes"
      case 3:
        return state.selectedCampaign && state.scheduleDate && state.scheduleTime
          ? `Campanha configurada para ${state.scheduleDate} às ${state.scheduleTime}`
          : "Configure a mensagem e agendamento"
      case 4:
        return "Revise e lance a campanha"
      default:
        return ""
    }
  }

  const isReviewStep = state.step === 4

  return (
    <footer className="sticky bottom-0 z-40 border-t bg-card">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Info */}
        <div className="flex items-center gap-2 text-sm">
          {canProceed ? (
            <span className="text-primary font-medium">{getInfoText()}</span>
          ) : (
            <span className="text-muted-foreground">{getInfoText()}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {state.step > 1 && (
            <Button variant="secondary" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          )}
          <Button onClick={onNext} disabled={!canProceed}>
            {isReviewStep ? (
              <>
                Lançar Campanha
                <Rocket className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Continuar
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </footer>
  )
}
