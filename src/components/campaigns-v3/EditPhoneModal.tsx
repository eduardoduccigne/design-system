import * as React from "react"
import { FormModal } from "@/components/ui/modal/form-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Edit } from "lucide-react"
import type { FrozenPatientEnhanced, PhoneEditRequest } from "@/lib/campaigns/types-contact-sanitization"

interface EditPhoneModalProps {
  patient: FrozenPatientEnhanced
  onSave: (request: PhoneEditRequest) => Promise<void>
}

export function EditPhoneModal({ patient, onSave }: EditPhoneModalProps) {
  const [newPhone, setNewPhone] = React.useState(patient.phone)
  const [reason, setReason] = React.useState("")

  const handleSubmit = async () => {
    await onSave({
      patientId: patient.id,
      oldPhone: patient.phone,
      newPhone,
      reason,
    })
  }

  return (
    <FormModal
      title="Editar telefone do paciente"
      description={`Atualize o número de telefone de ${patient.name}`}
      submitLabel="Salvar alteração"
      onSubmit={handleSubmit}
      trigger={
        <Button variant="ghost" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Paciente</Label>
          <div className="text-sm text-muted-foreground">{patient.name}</div>
        </div>

        <div className="space-y-2">
          <Label>Telefone atual</Label>
          <div className="font-mono text-sm text-muted-foreground">{patient.phone}</div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="new-phone">Novo telefone *</Label>
          <Input
            id="new-phone"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            placeholder="(11) 99999-9999"
            className="font-mono"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reason">Motivo (opcional)</Label>
          <Textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Ex: Cliente informou número correto"
            rows={3}
          />
        </div>
      </div>
    </FormModal>
  )
}
