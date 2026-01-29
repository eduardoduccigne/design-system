"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

export interface QuickReplyProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const QuickReply = React.forwardRef<HTMLButtonElement, QuickReplyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "px-3.5 py-1.5 text-xs font-medium rounded-full border border-border bg-card text-neutral-800 cursor-pointer whitespace-nowrap transition-nilo-fast",
          "hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
QuickReply.displayName = "QuickReply"

export interface QuickReplyGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const QuickReplyGroup = React.forwardRef<HTMLDivElement, QuickReplyGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap gap-2", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
QuickReplyGroup.displayName = "QuickReplyGroup"

export { QuickReply, QuickReplyGroup }
