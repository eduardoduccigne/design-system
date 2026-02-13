import * as React from "react"
import { ConfirmationModal } from "@/components/ui/modal/confirmation-modal"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import type { FrozenPatientEnhanced, UnfreezeRequest } from "@/lib/campaigns/types-contact-sanitization"

interface UnfreezeConfirmationModalProps {
  patient: FrozenPatientEnhanced
  onConfirm: (request: UnfreezeRequest) => Promise<void>
}

export function UnfreezeConfirmationModal({ patient, onConfirm }: UnfreezeConfirmationModalProps) {
  const handleConfirm = async () => {
    await onConfirm({ patientId: patient.id })
  }

  return (
    <ConfirmationModal
      title="Descongelar número?"
      description={`Tem certeza que deseja descongelar o número de ${patient.name}? Novas tentativas de envio serão realizadas.`}
      intent="destructive"
      confirmLabel="Descongelar"
      onConfirm={handleConfirm}
      trigger={
        <Button variant="ghost" size="sm">
          <RotateCcw className="h-4 w-4" />
        </Button>
      }
    />
  )
}
