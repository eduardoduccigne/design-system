"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Users,
  Send,
  CheckCircle2,
  Eye,
  AlertTriangle,
  Clock,
} from "lucide-react"
import type { CampaignMetrics } from "@/lib/campaigns/mock-campaign-detail"

interface CampaignSummaryTabProps {
  metrics: CampaignMetrics
}

interface MetricCardProps {
  label: string
  value: number
  percentage?: string
  icon: React.ReactNode
  colorClass: string
}

function MetricCard({
  label,
  value,
  percentage,
  icon,
  colorClass,
}: MetricCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${colorClass}`}>{icon}</div>
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-semibold tabular-nums">
                {value.toLocaleString("pt-BR")}
              </p>
              {percentage && (
                <span className="text-sm text-muted-foreground">
                  {percentage}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function CampaignSummaryTab({ metrics }: CampaignSummaryTabProps) {
  const pctOf = (value: number, total: number) => {
    if (total === 0) return ""
    return `(${((value / total) * 100).toFixed(1)}%)`
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <MetricCard
        label="Total do Público"
        value={metrics.totalAudience}
        icon={<Users className="w-5 h-5 text-foreground" />}
        colorClass="bg-muted"
      />
      <MetricCard
        label="Enviadas"
        value={metrics.sent}
        percentage={pctOf(metrics.sent, metrics.totalAudience)}
        icon={<Send className="w-5 h-5 text-primary" />}
        colorClass="bg-primary/10"
      />
      <MetricCard
        label="Entregues"
        value={metrics.delivered}
        percentage={pctOf(metrics.delivered, metrics.sent)}
        icon={<CheckCircle2 className="w-5 h-5 text-green-600" />}
        colorClass="bg-green-50"
      />
      <MetricCard
        label="Lidas"
        value={metrics.read}
        percentage={pctOf(metrics.read, metrics.delivered)}
        icon={<Eye className="w-5 h-5 text-blue-600" />}
        colorClass="bg-blue-50"
      />
      <MetricCard
        label="Falhas"
        value={metrics.failed}
        percentage={pctOf(metrics.failed, metrics.sent)}
        icon={<AlertTriangle className="w-5 h-5 text-destructive" />}
        colorClass="bg-destructive/10"
      />
      <MetricCard
        label="Pendentes"
        value={metrics.pending}
        icon={<Clock className="w-5 h-5 text-muted-foreground" />}
        colorClass="bg-muted"
      />
    </div>
  )
}
