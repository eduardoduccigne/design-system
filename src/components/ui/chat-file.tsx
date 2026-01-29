"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import {
  File,
  FileText,
  FileImage,
  FileAudio,
  FileVideo,
  FileSpreadsheet,
  Download,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react"
import { Progress } from "./progress"

// ─── Utilities ───────────────────────────────────────────────────────────────

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

function getFileIcon(mimeType?: string) {
  if (!mimeType) return File
  if (mimeType.startsWith("image/")) return FileImage
  if (mimeType.startsWith("audio/")) return FileAudio
  if (mimeType.startsWith("video/")) return FileVideo
  if (mimeType.includes("pdf")) return FileText
  if (mimeType.includes("word") || mimeType.includes("document")) return FileText
  if (mimeType.includes("sheet") || mimeType.includes("excel")) return FileSpreadsheet
  return File
}

// ─── Variants ────────────────────────────────────────────────────────────────

const chatFileVariants = cva(
  "flex items-center gap-3 px-3 py-2.5 rounded-xl max-w-[280px] transition-nilo-fast",
  {
    variants: {
      variant: {
        sent: "bg-primary-600/20 text-white",
        received: "bg-card border border-border shadow-[var(--shadow-xs)]",
      },
    },
    defaultVariants: {
      variant: "received",
    },
  }
)

const iconContainerVariants = cva(
  "flex items-center justify-center w-10 h-10 rounded-lg shrink-0",
  {
    variants: {
      variant: {
        sent: "bg-white/20",
        received: "bg-muted",
      },
      status: {
        uploading: "",
        complete: "",
        error: "bg-destructive/10",
      },
    },
    defaultVariants: {
      variant: "received",
      status: "complete",
    },
  }
)

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ChatFileProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chatFileVariants> {
  /** File name to display */
  name: string
  /** File size in bytes */
  size: number
  /** MIME type for icon selection */
  type?: string
  /** Download URL */
  url?: string
  /** Upload/download status */
  status?: "uploading" | "complete" | "error"
  /** Progress percentage (0-100) for uploading status */
  progress?: number
  /** Error message */
  error?: string
  /** Called when download button is clicked */
  onDownload?: () => void
  /** Called when retry button is clicked */
  onRetry?: () => void
}

// ─── Component ───────────────────────────────────────────────────────────────

const ChatFile = React.forwardRef<HTMLDivElement, ChatFileProps>(
  (
    {
      className,
      variant,
      name,
      size,
      type,
      url,
      status = "complete",
      progress = 0,
      error,
      onDownload,
      onRetry,
      ...props
    },
    ref
  ) => {
    const FileIcon = getFileIcon(type)
    const isSent = variant === "sent"

    return (
      <div
        ref={ref}
        className={cn(chatFileVariants({ variant }), className)}
        {...props}
      >
        {/* Icon container */}
        <div className={cn(iconContainerVariants({ variant, status }))}>
          {status === "uploading" ? (
            <Loader2
              className={cn(
                "w-5 h-5 animate-spin",
                isSent ? "text-white/70" : "text-muted-foreground"
              )}
            />
          ) : status === "error" ? (
            <AlertCircle className="w-5 h-5 text-destructive" />
          ) : (
            <FileIcon
              className={cn(
                "w-5 h-5",
                isSent ? "text-white/90" : "text-muted-foreground"
              )}
            />
          )}
        </div>

        {/* File info */}
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              "text-sm font-medium truncate",
              isSent ? "text-white" : "text-foreground"
            )}
          >
            {name}
          </p>
          {status === "uploading" ? (
            <div className="mt-1">
              <Progress value={progress} className="h-1" />
              <p
                className={cn(
                  "text-xs mt-1",
                  isSent ? "text-white/70" : "text-muted-foreground"
                )}
              >
                {progress}% enviado
              </p>
            </div>
          ) : status === "error" ? (
            <p className="text-xs text-destructive mt-0.5">
              {error || "Erro ao enviar"}
            </p>
          ) : (
            <p
              className={cn(
                "text-xs",
                isSent ? "text-white/70" : "text-muted-foreground"
              )}
            >
              {formatFileSize(size)}
            </p>
          )}
        </div>

        {/* Action button */}
        {status === "complete" && (url || onDownload) && (
          <button
            onClick={onDownload}
            className={cn(
              "p-2 rounded-lg transition-colors shrink-0",
              isSent
                ? "hover:bg-white/20 text-white/90"
                : "hover:bg-muted text-muted-foreground"
            )}
            aria-label="Download file"
          >
            <Download className="w-4 h-4" />
          </button>
        )}
        {status === "error" && onRetry && (
          <button
            onClick={onRetry}
            className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors shrink-0"
            aria-label="Retry upload"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}
      </div>
    )
  }
)
ChatFile.displayName = "ChatFile"

export { ChatFile, chatFileVariants, formatFileSize, getFileIcon }
