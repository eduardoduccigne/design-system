"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { Loader2, AlertCircle, RefreshCw, ZoomIn } from "lucide-react"
import { Progress } from "./progress"

// ─── Variants ────────────────────────────────────────────────────────────────

const chatImageVariants = cva(
  "relative overflow-hidden rounded-xl max-w-[320px] transition-nilo-fast group",
  {
    variants: {
      variant: {
        sent: "shadow-[var(--shadow-sm)]",
        received: "border border-border shadow-[var(--shadow-xs)]",
      },
    },
    defaultVariants: {
      variant: "received",
    },
  }
)

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ChatImageProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick">,
    VariantProps<typeof chatImageVariants> {
  /** Image source URL */
  src: string
  /** Alt text for accessibility */
  alt?: string
  /** Optional caption below image */
  caption?: string
  /** Image width for aspect ratio */
  width?: number
  /** Image height for aspect ratio */
  height?: number
  /** Upload status */
  status?: "uploading" | "complete" | "error"
  /** Upload progress (0-100) */
  progress?: number
  /** Error message */
  error?: string
  /** Click handler for lightbox */
  onClick?: () => void
  /** Retry handler for errors */
  onRetry?: () => void
}

// ─── Component ───────────────────────────────────────────────────────────────

const ChatImage = React.forwardRef<HTMLDivElement, ChatImageProps>(
  (
    {
      className,
      variant,
      src,
      alt = "Image",
      caption,
      width,
      height,
      status = "complete",
      progress = 0,
      error,
      onClick,
      onRetry,
      ...props
    },
    ref
  ) => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [hasError, setHasError] = React.useState(false)

    const aspectRatio = width && height ? width / height : undefined

    return (
      <div
        ref={ref}
        className={cn(chatImageVariants({ variant }), className)}
        {...props}
      >
        {/* Image container */}
        <div
          className="relative"
          style={aspectRatio ? { aspectRatio } : undefined}
        >
          {/* Main image */}
          {status !== "error" && !hasError && (
            <img
              src={src}
              alt={alt}
              className={cn(
                "w-full h-auto object-cover transition-opacity duration-200",
                isLoading && "opacity-0",
                onClick && "cursor-pointer"
              )}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false)
                setHasError(true)
              }}
              onClick={status === "complete" ? onClick : undefined}
            />
          )}

          {/* Loading skeleton */}
          {isLoading && status === "complete" && !hasError && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}

          {/* Uploading overlay */}
          {status === "uploading" && (
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
              <div className="w-3/4">
                <Progress value={progress} className="h-1.5 bg-white/20" />
                <p className="text-xs text-white/80 text-center mt-1.5">
                  {progress}%
                </p>
              </div>
            </div>
          )}

          {/* Error state */}
          {(status === "error" || hasError) && (
            <div className="absolute inset-0 bg-destructive/10 flex flex-col items-center justify-center gap-2 min-h-[120px]">
              <AlertCircle className="w-8 h-8 text-destructive" />
              <p className="text-sm text-destructive">
                {error || "Erro ao carregar imagem"}
              </p>
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="flex items-center gap-1.5 text-sm text-destructive hover:underline"
                >
                  <RefreshCw className="w-4 h-4" />
                  Tentar novamente
                </button>
              )}
            </div>
          )}

          {/* Hover overlay with zoom icon */}
          {status === "complete" && onClick && !hasError && (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-colors cursor-pointer">
              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}
        </div>

        {/* Caption */}
        {caption && status === "complete" && !hasError && (
          <div
            className={cn(
              "px-3 py-2 text-sm",
              variant === "sent"
                ? "bg-primary-600/20 text-white"
                : "bg-card text-muted-foreground"
            )}
          >
            {caption}
          </div>
        )}
      </div>
    )
  }
)
ChatImage.displayName = "ChatImage"

export { ChatImage, chatImageVariants }
