"use client"

import { Badge } from "@/components/ui/badge"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"
import { CheckCircle2, AlertCircle, XCircle, Info } from "lucide-react"
import type { MetaAccountHealth as MetaAccountHealthType } from "@/lib/campaigns/types-v3"

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

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
        <div className="flex-shrink-0 text-[#25D366]">
          <WhatsAppIcon className="w-6 h-6" />
        </div>
        <div>
          <p className="font-semibold text-foreground flex items-center gap-1">
            Conta Meta WhatsApp
            <HoverCard>
              <HoverCardTrigger asChild>
                <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
              </HoverCardTrigger>
              <HoverCardContent className="w-80" align="start">
                <div className="space-y-3 text-sm">
                  {/* Quality section */}
                  <div>
                    <p className="font-semibold text-foreground mb-1.5">Qualidade da conta</p>
                    <div className="space-y-1">
                      {[
                        { rating: "green" as const, dot: "bg-green-500", label: "Saudável", desc: "Taxa de bloqueio baixa. Elegível para aumento automático de limite." },
                        { rating: "yellow" as const, dot: "bg-yellow-500", label: "Atenção", desc: "Feedbacks negativos detectados. Sem upgrade automático de tier." },
                        { rating: "red" as const, dot: "bg-red-500", label: "Crítico", desc: "Alta taxa de bloqueio. Limite pode ser reduzido pela Meta." },
                      ].map(({ rating, dot, label, desc }) => (
                        <div key={rating} className={`flex gap-2 p-1.5 rounded-md ${health.qualityRating === rating ? "bg-muted" : ""}`}>
                          <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${dot}`} />
                          <span>
                            <span className="font-medium">{label}</span>
                            <span className="text-muted-foreground"> — {desc}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t" />
                  {/* Tier section */}
                  <div>
                    <p className="font-semibold text-foreground mb-1.5">Tier de envio</p>
                    <div className="space-y-1">
                      {[
                        { tier: 1, limit: 1000, label: "até 1.000 msgs/dia" },
                        { tier: 2, limit: 10000, label: "até 10.000 msgs/dia" },
                        { tier: 3, limit: 100000, label: "até 100.000 msgs/dia" },
                        { tier: 4, limit: Infinity, label: "ilimitado" },
                      ].map(({ tier, label }) => (
                        <div key={tier} className={`flex gap-2 p-1.5 rounded-md ${getTierFromLimit(health.dailySendingLimit) === tier ? "bg-muted" : ""}`}>
                          <span className="font-medium w-12 flex-shrink-0">Tier {tier}</span>
                          <span className="text-muted-foreground">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </p>
          <p className="text-sm text-muted-foreground">
            Tier {tier} • {health.dailySendingLimit.toLocaleString("pt-BR")} msgs/dia •{" "}
            {health.sentToday.toLocaleString("pt-BR")} / {health.dailySendingLimit.toLocaleString("pt-BR")} enviadas hoje
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
