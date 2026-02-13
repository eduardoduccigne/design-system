"use client"

import * as React from "react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Info, Search, Download } from "lucide-react"
import { EditPhoneModal } from "./EditPhoneModal"
import type { InvalidPatient, InvalidPatientsByClient, PhoneEditRequest } from "@/lib/campaigns/types-contact-sanitization"

// Mock data for invalid patients
const mockInvalidPatients: InvalidPatient[] = [
  {
    id: "inv1",
    name: "Carlos Ferreira",
    cpf: "11122233344",
    phone: "99999-9999",
    clientName: "Banco Safra",
    clientId: "client-safra",
    invalidReason: "DDD ausente",
    detectedDate: "2026-01-15",
  },
  {
    id: "inv2",
    name: "Beatriz Alves",
    cpf: "22233344455",
    phone: "(11) 12345",
    clientName: "Banco Safra",
    clientId: "client-safra",
    invalidReason: "Número incompleto",
    detectedDate: "2026-01-20",
  },
  {
    id: "inv3",
    name: "Fernando Rocha",
    cpf: "33344455566",
    phone: "(21) 00000-0000",
    clientName: "Disney",
    clientId: "client-disney",
    invalidReason: "Número inválido",
    detectedDate: "2026-01-18",
  },
  {
    id: "inv4",
    name: "Juliana Costa",
    cpf: "44455566677",
    phone: "11 99999-9999",
    clientName: "Magazine Luiza",
    clientId: "client-magalu",
    invalidReason: "Formato incorreto",
    detectedDate: "2026-02-01",
  },
  {
    id: "inv5",
    name: "Roberto Mendes",
    cpf: "55566677788",
    phone: "11999999999",
    clientName: "Disney",
    clientId: "client-disney",
    invalidReason: "Sem formatação",
    detectedDate: "2026-01-25",
  },
  {
    id: "inv6",
    name: "Patrícia Lima",
    cpf: "66677788899",
    phone: "(11) 11111-1111",
    clientName: "Banco Safra",
    clientId: "client-safra",
    invalidReason: "Número inválido",
    detectedDate: "2026-02-05",
  },
  {
    id: "inv7",
    name: "Marcos Santos",
    cpf: "77788899900",
    phone: "88888-8888",
    clientName: "Magazine Luiza",
    clientId: "client-magalu",
    invalidReason: "DDD ausente",
    detectedDate: "2026-02-08",
  },
]

function groupInvalidPatientsByClient(patients: InvalidPatient[]): InvalidPatientsByClient[] {
  const grouped = patients.reduce((acc, patient) => {
    const key = patient.clientId
    if (!acc[key]) {
      acc[key] = {
        clientId: patient.clientId,
        clientName: patient.clientName,
        patients: [],
        patientCount: 0,
      }
    }
    acc[key].patients.push(patient)
    acc[key].patientCount++
    return acc
  }, {} as Record<string, InvalidPatientsByClient>)

  return Object.values(grouped)
}

function exportInvalidClientCSV(clientName: string, patients: InvalidPatient[]): void {
  const csv = [
    "patient_id,nome,cpf,telefone,motivo_invalido,data_deteccao",
    ...patients.map(p =>
      `${p.id},${p.name},${p.cpf},${p.phone},${p.invalidReason},${p.detectedDate}`
    )
  ].join("\n")

  const blob = new Blob([csv], { type: "text/csv" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `numeros-invalidos-${clientName.toLowerCase().replace(/\s+/g, '-')}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export function InvalidNumbersList() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [patients] = React.useState<InvalidPatient[]>(mockInvalidPatients)

  // Filter by search query (name, phone, or client name)
  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.phone.includes(searchQuery) ||
    p.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Group by client
  const clientGroups = groupInvalidPatientsByClient(filteredPatients)

  const handleDownloadClient = (clientId: string) => {
    const client = clientGroups.find(c => c.clientId === clientId)
    if (client) {
      exportInvalidClientCSV(client.clientName, client.patients)
    }
  }

  const handleEditPhone = async (request: PhoneEditRequest) => {
    console.log("Edit invalid phone:", request)
    // TODO: API call to update phone number
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">Pacientes com números inválidos</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {filteredPatients.length} pacientes distribuídos em {clientGroups.length} clientes
        </p>
      </div>

      {/* Info Alert */}
      <Alert variant="info">
        <Info className="h-4 w-4" />
        <AlertTitle>Números que nunca funcionaram</AlertTitle>
        <AlertDescription>
          Estes números são inválidos ou malformados e nunca puderam receber mensagens.
          Entre em contato com a empresa cliente para obter os números corretos.
        </AlertDescription>
      </Alert>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome, telefone ou cliente..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Client Accordions */}
      <Accordion type="multiple" className="space-y-4">
        {clientGroups.map((client) => (
          <AccordionItem key={client.clientId} value={client.clientId} className="border rounded-lg px-4">
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
                    handleDownloadClient(client.clientId)
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
                    <TableHead>Telefone</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {client.patients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell className="font-mono text-sm">{patient.phone}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{patient.clientName}</TableCell>
                      <TableCell>
                        <Badge variant="destructive" className="text-xs">
                          {patient.invalidReason}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <EditPhoneModal
                          patient={{
                            ...patient,
                            attemptCount: 0,
                            frozenSince: patient.detectedDate,
                            daysInaccessible: 0,
                            lastDelivery: null,
                            lastPatientMessage: null,
                          }}
                          onSave={handleEditPhone}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Empty State */}
      {filteredPatients.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Nenhum paciente encontrado
        </div>
      )}
    </div>
  )
}
