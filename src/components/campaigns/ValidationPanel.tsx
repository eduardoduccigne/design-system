"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CheckCircle2, XCircle, AlertCircle, Users, Snowflake, Info, ExternalLink } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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
              Não encontrados
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
        {validation.frozen > 0 && (
          <div className="flex justify-between items-center py-1">
            <span className="text-sm text-muted-foreground flex items-center gap-1.5">
              <Snowflake className="w-3.5 h-3.5 text-info" />
              WhatsApp inacessível (excluídos)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="inline-flex items-center">
                      <Info className="w-3.5 h-3.5 text-info cursor-help" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <div className="space-y-2 text-sm">
                      <p className="font-semibold">Por que o WhatsApp fica inacessível?</p>
                      <p>Pacientes com 3 falhas de entrega repetidas em dias diferentes têm o WhatsApp marcado como inacessível pela Nilo, para evitar envios desnecessários. Os erros vêm do WhatsApp/Meta comercial e os motivos mais comuns são:</p>
                      <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
                        <li>Número não está no WhatsApp</li>
                        <li>Paciente bloqueou mensagens comerciais</li>
                        <li>WhatsApp desatualizado</li>
                        <li>Paciente não aceitou novos termos</li>
                      </ul>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
            <a
              href="/settings/frozen-numbers"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-info hover:underline inline-flex items-center gap-1"
            >
              {validation.frozen.toLocaleString("pt-BR")}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
