"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import type { QuotaData } from "@/lib/campaigns/types-v3"

interface QuotaDisplayPanelProps {
  quota: QuotaData
  showCampaignEstimate?: boolean
}

export function QuotaDisplayPanel({ quota, showCampaignEstimate = false }: QuotaDisplayPanelProps) {
  return (
    <Card className="shadow-[var(--shadow-sm)] transition-nilo">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">
          Cota Contratual de Mensagens - {quota.currentMonth}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Quota breakdown */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Cota mensal:</span>
            <span className="font-medium">{quota.monthlyQuota.toLocaleString("pt-BR")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Já enviadas (este mês):</span>
            <span className="font-medium">{quota.alreadySent.toLocaleString("pt-BR")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Agendadas (outras campanhas):</span>
            <span className="font-medium">{quota.scheduled.toLocaleString("pt-BR")}</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between font-semibold">
              <span>Disponíveis:</span>
              <span className="text-primary">{quota.available.toLocaleString("pt-BR")} mensagens</span>
            </div>
          </div>
        </div>

        {/* Campaign estimate by month - only show when config is complete */}
        {showCampaignEstimate && (
          <div className="border-t pt-3 animate-in fade-in-0 slide-in-from-top-2 duration-300">
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Estimativa desta campanha:
            </p>
            <div className="space-y-1 text-sm">
              {quota.campaignEstimateByMonth.slice(0, 3).map((item) => (
                <div key={item.month} className="flex justify-between text-muted-foreground">
                  <span className="pl-3">{item.month}:</span>
                  <span>{item.messages.toLocaleString("pt-BR")}</span>
                </div>
              ))}
              {quota.campaignEstimateByMonth.length > 3 && (
                <div className="text-xs text-muted-foreground pl-3">
                  ...e mais {quota.campaignEstimateByMonth.length - 3} meses
                </div>
              )}
            </div>
            <div className="flex justify-between font-medium mt-2 pt-2 border-t">
              <span>Total:</span>
              <span>~{quota.totalCampaignEstimate.toLocaleString("pt-BR")} mensagens</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
