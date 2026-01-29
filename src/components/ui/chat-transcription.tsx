"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { ChevronDown } from "lucide-react"

// ─── AI Sparkle Icon ─────────────────────────────────────────────────────────

function AISparkle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="currentColor"
      className={className}
    >
      <path d="M80 40C57.908 40 40 57.91 40 80C40 57.91 22.09 40 0 40C22.09 40 40 22.092 40 0C40 22.092 57.908 40 80 40Z" />
    </svg>
  )
}

// ─── Variants ────────────────────────────────────────────────────────────────

const chatTranscriptionVariants = cva(
  "rounded-xl overflow-hidden max-w-[400px] transition-nilo-fast",
  {
    variants: {
      variant: {
        sent: "bg-primary-600/10 border border-primary-500/20",
        received: "bg-[linear-gradient(135deg,rgba(3,122,229,0.06)_0%,rgba(95,178,175,0.06)_50%,rgba(124,196,158,0.06)_100%)] border border-[rgba(95,178,175,0.2)]",
      },
    },
    defaultVariants: {
      variant: "received",
    },
  }
)

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ChatTranscriptionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onToggle">,
    VariantProps<typeof chatTranscriptionVariants> {
  /** Transcribed text content */
  text: string
  /** AI confidence score (0-1) */
  confidence?: number
  /** Detected language code */
  language?: string
  /** Controlled expanded state */
  expanded?: boolean
  /** Default expanded state (uncontrolled) */
  defaultExpanded?: boolean
  /** Callback when expand state changes */
  onExpandedChange?: (expanded: boolean) => void
  /** Character limit before collapsing */
  collapsedLength?: number
}

// ─── Component ───────────────────────────────────────────────────────────────

const ChatTranscription = React.forwardRef<HTMLDivElement, ChatTranscriptionProps>(
  (
    {
      className,
      variant = "received",
      text,
      confidence,
      language,
      expanded: controlledExpanded,
      defaultExpanded = false,
      onExpandedChange,
      collapsedLength = 100,
      ...props
    },
    ref
  ) => {
    const [internalExpanded, setInternalExpanded] = React.useState(defaultExpanded)
    const isControlled = controlledExpanded !== undefined
    const isExpanded = isControlled ? controlledExpanded : internalExpanded

    const isSent = variant === "sent"
    const shouldCollapse = text.length > collapsedLength
    const displayText = shouldCollapse && !isExpanded
      ? text.slice(0, collapsedLength) + "..."
      : text

    const handleToggle = () => {
      const newState = !isExpanded
      if (!isControlled) {
        setInternalExpanded(newState)
      }
      onExpandedChange?.(newState)
    }

    return (
      <div
        ref={ref}
        className={cn(chatTranscriptionVariants({ variant }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-current/10">
          <div
            className={cn(
              "flex items-center justify-center w-5 h-5 rounded",
              isSent ? "bg-primary-500/20" : "bg-ai-gradient"
            )}
          >
            <AISparkle
              className={cn(
                "w-3 h-3",
                isSent ? "text-primary-600" : "text-white"
              )}
            />
          </div>
          <span
            className={cn(
              "text-xs font-semibold uppercase tracking-wide",
              isSent ? "text-primary-700" : "text-ai-gradient bg-clip-text text-transparent bg-ai-gradient"
            )}
            style={
              !isSent
                ? {
                    background: "var(--ai-gradient)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }
                : undefined
            }
          >
            Transcrição
          </span>
          {confidence !== undefined && (
            <span
              className={cn(
                "text-[10px] ml-auto",
                isSent ? "text-primary-600/70" : "text-muted-foreground"
              )}
            >
              {Math.round(confidence * 100)}% confiança
            </span>
          )}
        </div>

        {/* Content */}
        <div className="px-3 py-2.5">
          <p
            className={cn(
              "text-sm leading-relaxed",
              isSent ? "text-primary-900" : "text-foreground"
            )}
          >
            {displayText}
          </p>

          {/* Expand/Collapse button */}
          {shouldCollapse && (
            <button
              onClick={handleToggle}
              className={cn(
                "flex items-center gap-1 mt-2 text-xs font-medium transition-colors",
                isSent
                  ? "text-primary-600 hover:text-primary-700"
                  : "text-[var(--ai-start)] hover:opacity-80"
              )}
            >
              {isExpanded ? "Ver menos" : "Ver mais"}
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 transition-transform",
                  isExpanded && "rotate-180"
                )}
              />
            </button>
          )}

          {/* Language indicator */}
          {language && (
            <p
              className={cn(
                "text-[10px] mt-2",
                isSent ? "text-primary-600/60" : "text-muted-foreground"
              )}
            >
              Idioma detectado: {language}
            </p>
          )}
        </div>
      </div>
    )
  }
)
ChatTranscription.displayName = "ChatTranscription"

export { ChatTranscription, chatTranscriptionVariants }
