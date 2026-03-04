"use client"

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, XCircle, Info } from "lucide-react"
import type { DistributionValidation as DistributionValidationType } from "@/lib/campaigns/types-v3"

interface DistributionValidationProps {
  validation: DistributionValidationType
  onAcknowledgeWarning: () => void
  quotaWarningAcknowledged: boolean
}

export function DistributionValidation({
  validation,
  onAcknowledgeWarning,
  quotaWarningAcknowledged,
}: DistributionValidationProps) {
  // No validation issues
  if (!validation.quotaWarning && !validation.metaTierError) {
    return null
  }

  return (
    <div className="space-y-3">
      {/* Meta Tier Error - Blocking */}
      {validation.metaTierError && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Limite WhatsApp de envio excedido</AlertTitle>
          <AlertDescription className="space-y-2">
            <p>
              Esta distribuição excede seu limite diário de envio do WhatsApp (
              {validation.metaDailyLimit?.toLocaleString("pt-BR")}/dia) e não será aprovada pela Meta.
            </p>
            <p>
              Por favor, reduza o volume diário escolhendo uma opção de distribuição diferente ou
              estendendo a duração da campanha.
            </p>
            <div className="flex gap-4 text-sm mt-2">
              <span>
                Atual: <strong>{validation.currentDailyVolume?.toLocaleString("pt-BR")} mensagens/dia</strong>
              </span>
              <span>
                Limite: <strong>{validation.metaDailyLimit?.toLocaleString("pt-BR")} mensagens/dia</strong>
              </span>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Quota Warning - Non-blocking */}
      {validation.quotaWarning && !quotaWarningAcknowledged && (
        <Alert variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Alerta de cota Nilo</AlertTitle>
          <AlertDescription>
            <p>
              Esta campanha usará mais mensagens do que sua cota disponível de{" "}
              {validation.exceedsMonth} ({validation.availableQuota?.toLocaleString("pt-BR")}).
              Consulte seu executivo de conta sobre as condições.
              Você pode continuar ou ajustar a distribuição.
            </p>
          </AlertDescription>
        </Alert>
      )}

      {/* Quota Warning Acknowledged */}
      {validation.quotaWarning && quotaWarningAcknowledged && (
        <Alert variant="info">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Você reconheceu que esta campanha pode exceder a cota disponível.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
