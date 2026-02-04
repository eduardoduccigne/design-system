"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CheckCircle2, XCircle, AlertCircle, Users } from "lucide-react"
import type { AudienceValidation } from "@/lib/campaigns/types"

interface ValidationPanelProps {
  validation: AudienceValidation
}

export function ValidationPanel({ validation }: ValidationPanelProps) {
  return (
    <Card className="shadow-[var(--shadow-sm)]">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Users className="w-4 h-4" />
          Validação do Arquivo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center py-1">
          <span className="text-sm text-muted-foreground">Total de registros</span>
          <span className="font-medium">{validation.total.toLocaleString("pt-BR")}</span>
        </div>
        <div className="flex justify-between items-center py-1">
          <span className="text-sm text-muted-foreground flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
            Válidos para envio
          </span>
          <span className="font-semibold text-primary">{validation.valid.toLocaleString("pt-BR")}</span>
        </div>
        {validation.invalid > 0 && (
          <div className="flex justify-between items-center py-1">
            <span className="text-sm text-muted-foreground flex items-center gap-1.5">
              <XCircle className="w-3.5 h-3.5 text-destructive" />
              Inválidos
            </span>
            <span className="font-medium text-destructive">{validation.invalid.toLocaleString("pt-BR")}</span>
          </div>
        )}
        {validation.duplicates > 0 && (
          <div className="flex justify-between items-center py-1">
            <span className="text-sm text-muted-foreground flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-warning" />
              Duplicados
            </span>
            <span className="font-medium">{validation.duplicates.toLocaleString("pt-BR")}</span>
          </div>
        )}
        {validation.optedOut > 0 && (
          <div className="flex justify-between items-center py-1">
            <span className="text-sm text-muted-foreground flex items-center gap-1.5">
              <XCircle className="w-3.5 h-3.5 text-muted-foreground" />
              Opt-out
            </span>
            <span className="font-medium">{validation.optedOut.toLocaleString("pt-BR")}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
