"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Calendar, ClipboardList, UserCheck, Megaphone, CircleDashed } from "lucide-react"

const iconMap = {
  Heart,
  Calendar,
  ClipboardList,
  UserCheck,
  Megaphone,
  CircleDashed,
}

interface ObjectiveCardV1Props {
  name: string
  description: string
  icon: keyof typeof iconMap
  selected: boolean
  onSelect: () => void
}

export function ObjectiveCardV1({ name, description, icon, selected, onSelect }: ObjectiveCardV1Props) {
  const Icon = iconMap[icon]

  return (
    <Card
      className={cn(
        "cursor-pointer transition-nilo hover:shadow-[var(--shadow-sm)]",
        selected
          ? "ring-2 ring-primary border-primary bg-primary/5"
          : "hover:border-primary/50"
      )}
      onClick={onSelect}
    >
      <CardContent className="pt-6 text-center space-y-3">
        <div className={cn(
          "mx-auto w-12 h-12 rounded-full flex items-center justify-center",
          selected ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
        )}>
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
