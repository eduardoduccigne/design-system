"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Heart, Calendar, ClipboardList, UserCheck, Megaphone, CircleDashed } from "lucide-react"
import type { CampaignObjective } from "@/lib/campaigns/types"

const iconMap = {
  Heart,
  Calendar,
  ClipboardList,
  UserCheck,
  Megaphone,
  CircleDashed,
}

interface ObjectiveCardProps {
  id: CampaignObjective
  name: string
  description: string
  icon: keyof typeof iconMap
  selected: boolean
  onSelect: () => void
}

export function ObjectiveCard({ name, description, icon, selected, onSelect }: ObjectiveCardProps) {
  const Icon = iconMap[icon]

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${
        selected
          ? "ring-2 ring-primary border-primary bg-primary/5"
          : "hover:border-primary/50"
      }`}
      onClick={onSelect}
    >
      <CardContent className="pt-6 text-center space-y-3">
        <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center ${
          selected ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
        }`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-medium text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
