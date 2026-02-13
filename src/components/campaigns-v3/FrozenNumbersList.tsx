"use client"

import * as React from "react"
import { Accordion } from "@/components/ui/accordion"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Info, Search } from "lucide-react"
import { ClientAccordionSection } from "./ClientAccordionSection"
import { groupPatientsByClient, calculateDaysInaccessible, exportClientCSV } from "@/lib/campaigns/frozen-numbers-utils"
import type { FrozenPatientEnhanced, PhoneEditRequest, UnfreezeRequest } from "@/lib/campaigns/types-contact-sanitization"

// Mock data with client companies
const mockFrozenPatients: FrozenPatientEnhanced[] = [
  {
    id: "p1",
    name: "Maria Silva",
    cpf: "12345678901",
    phone: "(11) 99999-1234",
    clientName: "Banco Safra",
    clientId: "client-safra",
    attemptCount: 3,
    frozenSince: "2025-12-15", // ~60 days ago (red)
    daysInaccessible: 0, // Calculated
    lastDelivery: "2025-12-10",
    lastPatientMessage: "2025-11-15",
  },
  {
    id: "p2",
    name: "João Santos",
    cpf: "98765432109",
    phone: "(11) 98888-5678",
    clientName: "Banco Safra",
    clientId: "client-safra",
    attemptCount: 4,
    frozenSince: "2026-02-01", // ~12 days ago (yellow)
    daysInaccessible: 0,
    lastDelivery: null,
    lastPatientMessage: "2025-10-20",
  },
  {
    id: "p3",
    name: "Ana Costa",
    cpf: "45678912345",
    phone: "(21) 97777-9012",
    clientName: "Disney",
    clientId: "client-disney",
    attemptCount: 3,
    frozenSince: "2026-01-05", // ~39 days ago (red)
    daysInaccessible: 0,
    lastDelivery: "2025-12-01",
    lastPatientMessage: null,
  },
  {
    id: "p4",
    name: "Pedro Lima",
    cpf: "23456789123",
    phone: "(31) 96666-3456",
    clientName: "Disney",
    clientId: "client-disney",
    attemptCount: 5,
    frozenSince: "2026-01-28", // ~16 days ago (yellow)
    daysInaccessible: 0,
    lastDelivery: null,
    lastPatientMessage: null,
  },
  {
    id: "p5",
    name: "Carla Oliveira",
    cpf: "34567891234",
    phone: "(11) 95555-7890",
    clientName: "Banco Safra",
    clientId: "client-safra",
    attemptCount: 3,
    frozenSince: "2025-12-28", // ~47 days ago (red)
    daysInaccessible: 0,
    lastDelivery: "2025-11-28",
    lastPatientMessage: "2025-12-05",
  },
  {
    id: "p6",
    name: "Ricardo Mendes",
    cpf: "56789123456",
    phone: "(11) 94444-1111",
    clientName: "Magazine Luiza",
    clientId: "client-magalu",
    attemptCount: 6,
    frozenSince: "2025-11-20", // ~85 days ago (red)
    daysInaccessible: 0,
    lastDelivery: "2025-11-15",
    lastPatientMessage: "2025-10-30",
  },
  {
    id: "p7",
    name: "Fernanda Souza",
    cpf: "67788899911",
    phone: "(11) 93333-2222",
    clientName: "Banco Safra",
    clientId: "client-safra",
    attemptCount: 3,
    frozenSince: "2026-02-05", // ~8 days ago (yellow)
    daysInaccessible: 0,
    lastDelivery: "2026-01-20",
    lastPatientMessage: "2026-01-15",
  },
  {
    id: "p8",
    name: "Lucas Oliveira",
    cpf: "78899911122",
    phone: "(21) 92222-3333",
    clientName: "Disney",
    clientId: "client-disney",
    attemptCount: 4,
    frozenSince: "2026-01-10", // ~34 days ago (red)
    daysInaccessible: 0,
    lastDelivery: "2025-12-25",
    lastPatientMessage: null,
  },
]

export function FrozenNumbersList() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [patients] = React.useState<FrozenPatientEnhanced[]>(mockFrozenPatients)

  // Calculate days inaccessible for all patients
  const enhancedPatients = patients.map(p => ({
    ...p,
    daysInaccessible: calculateDaysInaccessible(p.frozenSince),
  }))

  // Filter by search query (name, phone, or client name)
  const filteredPatients = enhancedPatients.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.phone.includes(searchQuery) ||
    p.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Group by client
  const clientGroups = groupPatientsByClient(filteredPatients)

  const handleDownloadClient = (clientId: string) => {
    const client = clientGroups.find(c => c.clientId === clientId)
    if (client) {
      exportClientCSV(client.clientName, client.patients)
    }
  }

  const handleEditPhone = async (request: PhoneEditRequest) => {
    console.log("Edit phone:", request)
    // TODO: API call to update phone number
  }

  const handleUnfreeze = async (request: UnfreezeRequest) => {
    console.log("Unfreeze:", request)
    // TODO: API call to unfreeze patient number
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Pacientes com WhatsApp inacessível</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {filteredPatients.length} pacientes distribuídos em {clientGroups.length} clientes
        </p>
      </div>

      {/* Info Alert */}
      <Alert variant="info">
        <Info className="h-4 w-4" />
        <AlertTitle>Como resolver números inacessíveis</AlertTitle>
        <AlertDescription>
          Entre em contato com a empresa cliente para corrigir os dados cadastrais dos
          pacientes listados. Use o botão "Baixar CSV" para exportar a lista de cada cliente.
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
          <ClientAccordionSection
            key={client.clientId}
            client={client}
            onDownloadCSV={handleDownloadClient}
            onEditPhone={handleEditPhone}
            onUnfreeze={handleUnfreeze}
          />
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
