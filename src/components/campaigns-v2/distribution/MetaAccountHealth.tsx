"use client"

import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react"
import type { MetaAccountHealth as MetaAccountHealthType } from "@/lib/campaigns/types-v2"

interface MetaAccountHealthProps {
  health: MetaAccountHealthType
}

// Using design system semantic colors (from globals.css)
const qualityConfig = {
  green: {
    label: "Saudável",
    variant: "success" as const,
    Icon: CheckCircle2,
    iconColor: "text-primary-600 dark:text-primary-400",
  },
  yellow: {
    label: "Atenção",
    variant: "warning" as const,
    Icon: AlertCircle,
    iconColor: "text-warning",
  },
  red: {
    label: "Crítico",
    variant: "destructive" as const,
    Icon: XCircle,
    iconColor: "text-destructive",
  },
}

// Map daily limit to tier number
function getTierFromLimit(limit: number): number {
  if (limit >= 100000) return 4
  if (limit >= 10000) return 3
  if (limit >= 1000) return 2
  return 1
}

export function MetaAccountHealth({ health }: MetaAccountHealthProps) {
  const config = qualityConfig[health.qualityRating]
  const Icon = config.Icon
  const tier = getTierFromLimit(health.dailySendingLimit)

  return (
    <div
      className="flex items-center justify-between gap-4 p-4 rounded-xl border border-border/60 bg-card shadow-[var(--shadow-sm)] transition-nilo"
    >
      {/* Left side: Icon + Info */}
      <div className="flex items-center gap-3">
        <div className={`flex-shrink-0 ${config.iconColor}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="font-semibold text-foreground">Conta Meta WhatsApp</p>
          <p className="text-sm text-muted-foreground">
            Tier {tier} • {health.dailySendingLimit.toLocaleString("pt-BR")} msgs/dia •{" "}
            {health.sentToday.toLocaleString("pt-BR")} enviadas hoje
          </p>
        </div>
      </div>

      {/* Right side: Badge */}
      <Badge variant={config.variant} className="flex-shrink-0">
        {config.label}
      </Badge>
    </div>
  )
}
