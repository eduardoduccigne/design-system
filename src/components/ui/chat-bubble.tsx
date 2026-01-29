"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { Check, CheckCheck } from "lucide-react"

const chatBubbleVariants = cva(
  "max-w-[480px] px-3.5 py-2.5 text-sm leading-relaxed",
  {
    variants: {
      variant: {
        sent: "bg-primary text-primary-foreground rounded-2xl rounded-br-sm shadow-[var(--shadow-sm)]",
        received: "bg-card text-foreground rounded-2xl rounded-bl-sm border border-border shadow-[var(--shadow-xs)]",
        professional: "bg-primary text-primary-foreground rounded-2xl rounded-br-sm shadow-[var(--shadow-sm)]",
      },
    },
    defaultVariants: {
      variant: "received",
    },
  }
)

export interface ChatBubbleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chatBubbleVariants> {}

const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(chatBubbleVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ChatBubble.displayName = "ChatBubble"

export interface ChatBubbleGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Alignment of the bubble group */
  align?: "start" | "end"
}

const ChatBubbleGroup = React.forwardRef<HTMLDivElement, ChatBubbleGroupProps>(
  ({ className, align = "start", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-0.5",
          align === "end" ? "items-end" : "items-start",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ChatBubbleGroup.displayName = "ChatBubbleGroup"

export interface ChatBubbleTimeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /** Message delivery status for sent messages */
  status?: "sent" | "delivered" | "read"
  /** Channel indicator (e.g., "WhatsApp", "SMS") */
  channel?: string
  /** Channel icon */
  channelIcon?: React.ReactNode
}

const ChatBubbleTime = React.forwardRef<HTMLSpanElement, ChatBubbleTimeProps>(
  ({ className, status, channel, channelIcon, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "text-[10px] text-muted-foreground mt-0.5 px-1 flex items-center gap-1",
          className
        )}
        {...props}
      >
        {children}
        {status && (
          <span className="inline-flex items-center gap-0.5">
            {status === "sent" && <Check className="w-3 h-3" />}
            {status === "delivered" && <CheckCheck className="w-3 h-3" />}
            {status === "read" && <CheckCheck className="w-3 h-3 text-primary" />}
          </span>
        )}
        {channel && (
          <span className="inline-flex items-center gap-1 ml-1.5">
            {channelIcon && <span className="w-3 h-3">{channelIcon}</span>}
            <span>{channel}</span>
          </span>
        )}
      </span>
    )
  }
)
ChatBubbleTime.displayName = "ChatBubbleTime"

export interface DateSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const DateSeparator = React.forwardRef<HTMLDivElement, DateSeparatorProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-3 py-1",
          className
        )}
        {...props}
      >
        <div className="flex-1 h-px bg-neutral-400" />
        <span className="text-[11px] font-medium text-muted-foreground whitespace-nowrap">
          {children}
        </span>
        <div className="flex-1 h-px bg-neutral-400" />
      </div>
    )
  }
)
DateSeparator.displayName = "DateSeparator"

export interface SystemMessageProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const SystemMessage = React.forwardRef<HTMLDivElement, SystemMessageProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("text-center py-1", className)}
        {...props}
      >
        <span className="text-[11px] text-muted-foreground bg-muted px-2.5 py-1 rounded-lg">
          {children}
        </span>
      </div>
    )
  }
)
SystemMessage.displayName = "SystemMessage"

export {
  ChatBubble,
  ChatBubbleGroup,
  ChatBubbleTime,
  DateSeparator,
  SystemMessage,
  chatBubbleVariants,
}
