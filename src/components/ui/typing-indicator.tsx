"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

export interface TypingIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional avatar element to display alongside the indicator */
  avatar?: React.ReactNode
}

const TypingIndicator = React.forwardRef<HTMLDivElement, TypingIndicatorProps>(
  ({ className, avatar, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        {avatar && (
          <div className="w-6 h-6 rounded-full overflow-hidden shrink-0">
            {avatar}
          </div>
        )}
        <div className="flex gap-1 bg-card border border-border px-3.5 py-2 rounded-2xl shadow-[var(--shadow-xs)]">
          <span
            className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-[typing-bounce_1.4s_ease-in-out_infinite]"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-[typing-bounce_1.4s_ease-in-out_infinite]"
            style={{ animationDelay: "200ms" }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-[typing-bounce_1.4s_ease-in-out_infinite]"
            style={{ animationDelay: "400ms" }}
          />
        </div>
      </div>
    )
  }
)
TypingIndicator.displayName = "TypingIndicator"

export { TypingIndicator }
