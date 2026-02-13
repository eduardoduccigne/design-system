"use client"

import * as React from "react"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FilterModal, FilterSection } from "@/components/ui/modal/filter-modal"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Download } from "lucide-react"
import { getCampaignFailures } from "@/lib/campaigns/mock-failures"
import type {
  FailureSourceFilter,
  FailureAttemptsFilter,
} from "@/lib/campaigns/types-contact-sanitization"

interface CampaignFailureListProps {
  campaignId: string
}

export function CampaignFailureList({ campaignId }: CampaignFailureListProps) {
  const [sourceFilter, setSourceFilter] =
    React.useState<FailureSourceFilter>("all")
  const [attemptsFilter, setAttemptsFilter] =
    React.useState<FailureAttemptsFilter>("all")

  const failures = getCampaignFailures(campaignId)

  const filteredFailures = failures.filter((failure) => {
    if (sourceFilter !== "all" && failure.source !== sourceFilter) return false
    if (attemptsFilter === "1" && failure.attemptCount !== 1) return false
    if (attemptsFilter === "2" && failure.attemptCount !== 2) return false
    if (attemptsFilter === "3+" && failure.attemptCount < 3) return false
    return true
  })

  const handleExportCSV = () => {
    const csv = [
      "Paciente,Telefone,Origem,Erro,Tentativas",
      ...filteredFailures.map(
        (f) =>
          `${f.patient.name},${f.patient.phone},${f.source},${f.errorMessagePT},${f.attemptCount}`
      ),
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `falhas-${campaignId}.csv`
    a.click()
  }

  const activeFilterCount =
    (sourceFilter !== "all" ? 1 : 0) + (attemptsFilter !== "all" ? 1 : 0)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {filteredFailures.length} pacientes não receberam mensagens
        </div>

        <div className="flex gap-2">
          <FilterModal
            title="Filtrar Falhas"
            description="Filtre as falhas de entrega"
            activeFilterCount={activeFilterCount}
            onApply={() => {}}
            onReset={() => {
              setSourceFilter("all")
              setAttemptsFilter("all")
            }}
          >
            <FilterSection title="Origem">
              <RadioGroup
                value={sourceFilter}
                onValueChange={(v) =>
                  setSourceFilter(v as FailureSourceFilter)
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="source-all" />
                  <Label htmlFor="source-all">Todas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="meta" id="source-meta" />
                  <Label htmlFor="source-meta">Meta</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="botmaker" id="source-botmaker" />
                  <Label htmlFor="source-botmaker">Botmaker</Label>
                </div>
              </RadioGroup>
            </FilterSection>

            <FilterSection title="Tentativas">
              <RadioGroup
                value={attemptsFilter}
                onValueChange={(v) =>
                  setAttemptsFilter(v as FailureAttemptsFilter)
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="attempts-all" />
                  <Label htmlFor="attempts-all">Todas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="attempts-1" />
                  <Label htmlFor="attempts-1">1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="attempts-2" />
                  <Label htmlFor="attempts-2">2</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3+" id="attempts-3plus" />
                  <Label htmlFor="attempts-3plus">3+</Label>
                </div>
              </RadioGroup>
            </FilterSection>
          </FilterModal>

          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Paciente</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead className="text-center">Origem</TableHead>
            <TableHead>Erro</TableHead>
            <TableHead className="text-center">Tentativas</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredFailures.map((failure) => (
            <TableRow key={failure.id}>
              <TableCell>{failure.patient.name}</TableCell>
              <TableCell className="font-mono text-sm">
                {failure.patient.phone}
              </TableCell>
              <TableCell className="text-center">
                <Badge
                  variant={failure.source === "meta" ? "info" : "secondary"}
                  className="text-xs"
                >
                  {failure.source}
                </Badge>
              </TableCell>
              <TableCell className="text-sm">
                {failure.errorMessagePT}
              </TableCell>
              <TableCell className="text-center">
                {failure.attemptCount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filteredFailures.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Nenhuma falha encontrada com os filtros selecionados
        </div>
      )}
    </div>
  )
}
