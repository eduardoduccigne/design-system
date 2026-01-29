"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Check, Heart, Calendar, FileText, ClipboardList, UserCheck, Megaphone } from "lucide-react"
import type { CampaignObjective } from "@/lib/campaigns/types"

// Icon mapping
const iconMap = {
  Heart,
  Calendar,
  FileText,
  ClipboardList,
  UserCheck,
  Megaphone,
}

interface ObjectiveCardProps {
  id: CampaignObjective
  name: string
  description: string
  icon: keyof typeof iconMap
  selected: boolean
  onSelect: () => void
}

export function ObjectiveCard({
  name,
  description,
  icon,
  selected,
  onSelect,
}: ObjectiveCardProps) {
  const Icon = iconMap[icon]

  return (
    <Card
      interactive
      onClick={onSelect}
      className={cn(
        "relative p-5 cursor-pointer transition-all",
        selected && "ring-2 ring-primary border-primary bg-primary-50"
      )}
    >
      {/* Check mark */}
      <div
        className={cn(
          "absolute top-4 right-4 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center transition-all",
          selected ? "opacity-100 scale-100" : "opacity-0 scale-75"
        )}
      >
        <Check className="w-3.5 h-3.5" />
      </div>

      {/* Icon */}
      <div
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors",
          !selected && "bg-primary-100 text-primary-700",
          selected && "bg-primary text-primary-foreground"
        )}
      >
        <Icon className="w-6 h-6" />
      </div>

      {/* Content */}
      <h3 className="font-semibold text-foreground mb-1">{name}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Card>
  )
}
