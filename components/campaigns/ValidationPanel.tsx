"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle, Info } from "lucide-react"
import type { AudienceValidation } from "@/lib/campaigns/types"
import { cn } from "@/lib/utils"

interface ValidationPanelProps {
  validation: AudienceValidation | null
}

export function ValidationPanel({ validation }: ValidationPanelProps) {
  if (!validation) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            Validação de Público
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            Aguardando upload...
          </p>
        </CardContent>
      </Card>
    )
  }

  const { total, valid, invalidPhone, optOut, missingData } = validation
  const hasErrors = invalidPhone + optOut + missingData > 0

  const rows = [
    { label: "Total no arquivo", value: total, type: "neutral" },
    { label: "Telefone inválido", value: invalidPhone, percent: (invalidPhone / total) * 100, type: "error" },
    { label: "Opt-out", value: optOut, percent: (optOut / total) * 100, type: "error" },
    { label: "Dados faltando", value: missingData, percent: (missingData / total) * 100, type: "warning" },
    { label: "Válidos", value: valid, percent: (valid / total) * 100, type: "success" },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          Validação de Público
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Rows */}
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex justify-between items-center py-2 border-b border-border last:border-0 text-sm"
          >
            <span className="text-muted-foreground">{row.label}</span>
            <span
              className={cn(
                "font-semibold",
                row.type === "success" && "text-success",
                row.type === "error" && "text-destructive",
                row.type === "warning" && "text-warning",
                row.type === "neutral" && "text-foreground"
              )}
            >
              {row.value.toLocaleString("pt-BR")}
              {row.percent !== undefined && ` (${row.percent.toFixed(1)}%)`}
            </span>
          </div>
        ))}

        {/* Error notice */}
        {hasErrors && (
          <Alert variant="warning" className="mt-3">
            <Info className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Alguns registros não puderam ser processados.{" "}
              <button className="font-medium text-primary underline underline-offset-2">
                Baixe o relatório
              </button>{" "}
              para ver os detalhes.
            </AlertDescription>
          </Alert>
        )}

        {/* Success summary */}
        <Alert variant="success" className="mt-3">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>
            <strong>{valid.toLocaleString("pt-BR")}</strong> pacientes prontos para campanha
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}
