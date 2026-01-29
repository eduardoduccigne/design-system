"use client"

import type { CampaignMessage } from "@/lib/campaigns/types"
import { cn } from "@/lib/utils"

interface MessageTimelineProps {
  messages: CampaignMessage[]
  className?: string
}

export function MessageTimeline({ messages, className }: MessageTimelineProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Sequência de mensagens
      </h4>
      <div className="space-y-4">
        {messages.map((message, index) => (
          <div key={index} className="flex gap-3 relative">
            {/* Connector line */}
            {index < messages.length - 1 && (
              <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-border -translate-x-1/2" />
            )}

            {/* Day badge */}
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold shrink-0 z-10">
              D{message.day}
            </div>

            {/* Message */}
            <div className="flex-1 bg-card border rounded-lg p-3 text-sm text-foreground">
              {message.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
