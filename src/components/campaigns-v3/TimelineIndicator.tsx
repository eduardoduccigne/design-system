import { AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

interface TimelineIndicatorProps {
  daysInaccessible: number
  frozenSince: string
}

export function TimelineIndicator({ daysInaccessible, frozenSince }: TimelineIndicatorProps) {
  // Simple urgency: 30+ days = red + icon, <30 days = yellow
  const isUrgent = daysInaccessible >= 30
  const textColor = isUrgent ? "text-red-600" : "text-amber-600"

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 cursor-help">
            <span className={cn("text-sm font-semibold tabular-nums", textColor)}>
              {daysInaccessible}d
            </span>
            {isUrgent && <AlertTriangle className="h-4 w-4 text-red-600" />}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Inacessível desde {new Date(frozenSince).toLocaleDateString("pt-BR")}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
