import * as React from "react"
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download } from "lucide-react"
import { TimelineIndicator } from "./TimelineIndicator"
import { EditPhoneModal } from "./EditPhoneModal"
import { UnfreezeConfirmationModal } from "./UnfreezeConfirmationModal"
import type { FrozenPatientsByClient, PhoneEditRequest, UnfreezeRequest } from "@/lib/campaigns/types-contact-sanitization"

interface ClientAccordionSectionProps {
  client: FrozenPatientsByClient
  onDownloadCSV: (clientId: string) => void
  onEditPhone: (request: PhoneEditRequest) => Promise<void>
  onUnfreeze: (request: UnfreezeRequest) => Promise<void>
}

export function ClientAccordionSection({
  client,
  onDownloadCSV,
  onEditPhone,
  onUnfreeze,
}: ClientAccordionSectionProps) {
  return (
    <AccordionItem value={client.clientId} className="border rounded-lg px-4">
      <AccordionTrigger className="hover:no-underline">
        <div className="flex items-center justify-between w-full pr-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-medium">{client.clientName}</h3>
            <Badge variant="info" className="text-xs">
              {client.patientCount} pacientes
            </Badge>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onDownloadCSV(client.clientId)
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            Baixar CSV
          </Button>
        </div>
      </AccordionTrigger>

      <AccordionContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Paciente</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>ID Nilo</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Dias inacessível</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {client.patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.name}</TableCell>
                <TableCell className="font-mono text-sm">
                  {patient.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}
                </TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">
                  {patient.niloId ?? "—"}
                </TableCell>
                <TableCell className="font-mono text-sm">{patient.phone}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{patient.clientName}</TableCell>
                <TableCell>
                  <TimelineIndicator
                    daysInaccessible={patient.daysInaccessible}
                    frozenSince={patient.frozenSince}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <EditPhoneModal patient={patient} onSave={onEditPhone} />
                    <UnfreezeConfirmationModal patient={patient} onConfirm={onUnfreeze} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AccordionContent>
    </AccordionItem>
  )
}
