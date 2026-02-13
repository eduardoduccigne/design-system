"use client"

import { Button } from "@/components/ui/button"
import { useCampaignV3 } from "./CampaignWizardV3"
import { ArrowLeft, ArrowRight, Rocket } from "lucide-react"

interface CampaignFooterV3Props {
  canProceed: boolean
  onBack: () => void
  onNext: () => void
}

export function CampaignFooterV3({ canProceed, onBack, onNext }: CampaignFooterV3Props) {
  const { state } = useCampaignV3()

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
        return state.selectedCampaign
          ? `Campanha: ${state.selectedCampaign.name}`
          : "Selecione uma campanha"
      case 4:
        if (state.validation?.metaTierError) {
          return "Ajuste a distribuição para continuar"
        }
        return state.distributionType
          ? "Distribuição configurada"
          : "Configure a distribuição de envios"
      case 5:
        return "Revise e lance a campanha"
      default:
        return ""
    }
  }

  const isReviewStep = state.step === 5
  const hasMetaError = state.step === 4 && state.validation?.metaTierError

  return (
    <footer className="sticky bottom-0 z-40 border-t bg-card">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Info */}
        <div className="flex items-center gap-2 text-sm">
          {hasMetaError ? (
            <span className="text-destructive font-medium">{getInfoText()}</span>
          ) : canProceed ? (
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
