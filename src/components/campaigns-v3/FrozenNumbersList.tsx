"use client"

import * as React from "react"
import { Accordion } from "@/components/ui/accordion"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Info, Search, Download, ChevronDown } from "lucide-react"
import { ClientAccordionSection } from "./ClientAccordionSection"
import { groupPatientsByClient, calculateDaysInaccessible, exportClientCSV, exportAllPatientsCSV } from "@/lib/campaigns/frozen-numbers-utils"
import type { FrozenPatientEnhanced, PhoneEditRequest, UnfreezeRequest } from "@/lib/campaigns/types-contact-sanitization"

// Mock data with client companies
const mockFrozenPatients: FrozenPatientEnhanced[] = [
  {
    id: "p1",
    name: "Maria Silva",
    cpf: "12345678901",
    niloId: "NIL-00001",
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
    niloId: "NIL-00002",
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
    niloId: "NIL-00003",
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
    niloId: "NIL-00004",
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
    niloId: "NIL-00005",
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
    niloId: "NIL-00006",
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
    niloId: "NIL-00007",
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
    niloId: "NIL-00008",
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

  const handleDownloadAll = () => {
    exportAllPatientsCSV(filteredPatients)
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
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Pacientes com WhatsApp inacessível</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredPatients.length} pacientes distribuídos em {clientGroups.length} clientes
          </p>
        </div>
        <Button variant="outline" onClick={handleDownloadAll}>
          <Download className="h-4 w-4 mr-2" />
          Baixar todos
        </Button>
      </div>

      {/* Why explanation — collapsible */}
      <Collapsible>
        <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
          <CollapsibleTrigger className="flex w-full items-center justify-between text-left group">
            <div className="flex items-center gap-2 text-sm font-medium text-blue-800">
              <Info className="h-4 w-4 shrink-0" />
              Por que o WhatsApp fica inacessível?
            </div>
            <ChevronDown className="h-4 w-4 text-blue-600 transition-transform group-data-[state=open]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-3 text-sm text-blue-700 space-y-2">
              <p>Pacientes com <strong>3 falhas de entrega repetidas em dias diferentes</strong> têm o WhatsApp marcado como inacessível pela Nilo, para evitar envios desnecessários. <strong>Os erros vêm do WhatsApp/Meta comercial</strong> e os motivos mais comuns são:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Número não está no WhatsApp</li>
                <li>Paciente bloqueou mensagens comerciais</li>
                <li>WhatsApp desatualizado</li>
                <li>Paciente não aceitou novos termos</li>
              </ul>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* How to resolve — collapsible */}
      <Collapsible>
        <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
          <CollapsibleTrigger className="flex w-full items-center justify-between text-left group">
            <div className="flex items-center gap-2 text-sm font-medium text-blue-800">
              <Info className="h-4 w-4 shrink-0" />
              Como resolver números inacessíveis
            </div>
            <ChevronDown className="h-4 w-4 text-blue-600 transition-transform group-data-[state=open]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ul className="mt-3 text-sm text-blue-700 space-y-1 list-disc list-inside">
              <li>Corrigir os dados cadastrais dos pacientes junto à empresa cliente</li>
              <li>Realizar uma campanha de atualização cadastral em outros canais</li>
              <li>Atrelar a negociação de renovação ao saneamento da base</li>
              <li>Use o botão "Baixar CSV" para exportar a lista de cada cliente, altere individualmente no ícone lápis ou tente um novo envio em uma próxima campanha no botão circular</li>
            </ul>
          </CollapsibleContent>
        </div>
      </Collapsible>

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
