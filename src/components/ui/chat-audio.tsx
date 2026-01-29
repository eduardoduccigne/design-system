"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { Loader2, AlertCircle, RefreshCw } from "lucide-react"
import { Progress } from "./progress"

// ─── Icons (Filled) ──────────────────────────────────────────────────────────

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

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  )
}

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  )
}

// ─── Utilities ───────────────────────────────────────────────────────────────

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

// ─── Variants ────────────────────────────────────────────────────────────────

const chatAudioVariants = cva(
  "flex items-center gap-3 px-3 py-2.5 rounded-xl min-w-[240px] max-w-[320px] transition-nilo-fast",
  {
    variants: {
      variant: {
        sent: "bg-primary",
        received: "bg-card border border-border shadow-[var(--shadow-xs)]",
      },
    },
    defaultVariants: {
      variant: "received",
    },
  }
)

const playButtonVariants = cva(
  "flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-colors",
  {
    variants: {
      variant: {
        sent: "bg-white/20 hover:bg-white/30 text-white",
        received: "bg-primary hover:bg-primary-600 text-primary-foreground",
      },
    },
    defaultVariants: {
      variant: "received",
    },
  }
)

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ChatAudioProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chatAudioVariants> {
  /** Audio source URL */
  src: string
  /** Total duration in seconds */
  duration: number
  /** Visualization style */
  visualizer?: "waveform" | "progress"
  /** Waveform amplitude data (array of values 0-1) */
  waveformData?: number[]
  /** Upload status */
  status?: "uploading" | "complete" | "error"
  /** Upload progress (0-100) */
  progress?: number
  /** Error message */
  error?: string
  /** Retry handler */
  onRetry?: () => void
  /** Transcription content to display when toggled */
  transcription?: React.ReactNode
  /** Controlled transcription visibility */
  showTranscription?: boolean
  /** Default transcription visibility (uncontrolled) */
  defaultShowTranscription?: boolean
  /** Callback when transcription visibility changes */
  onTranscriptionToggle?: (show: boolean) => void
}

// ─── Waveform Component ──────────────────────────────────────────────────────

interface WaveformProps {
  data: number[]
  progress: number
  variant: "sent" | "received"
  isPlaying: boolean
}

function Waveform({ data, progress, variant, isPlaying }: WaveformProps) {
  const isSent = variant === "sent"
  const barCount = 35
  // Normalize or generate waveform data
  const bars = React.useMemo(() => {
    if (data.length >= barCount) {
      return data.slice(0, barCount)
    }
    // Generate random data if not provided
    return Array.from({ length: barCount }, (_, i) =>
      data[i] ?? 0.2 + Math.random() * 0.6
    )
  }, [data])

  return (
    <div className="flex items-center gap-[2px] h-6 flex-1">
      {bars.map((amplitude, index) => {
        const playedRatio = progress / 100
        const isPlayed = index / barCount < playedRatio
        const height = Math.max(4, amplitude * 24)

        return (
          <div
            key={index}
            className={cn(
              "w-[3px] rounded-full transition-all duration-100",
              isPlaying && !isPlayed && "animate-[waveform-pulse_1s_ease-in-out_infinite]",
              isPlayed
                ? isSent
                  ? "bg-white"
                  : "bg-primary"
                : isSent
                  ? "bg-white/40"
                  : "bg-neutral-300"
            )}
            style={{
              height: `${height}px`,
              animationDelay: `${index * 30}ms`,
            }}
          />
        )
      })}
    </div>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

const ChatAudio = React.forwardRef<HTMLDivElement, ChatAudioProps>(
  (
    {
      className,
      variant = "received",
      src,
      duration,
      visualizer = "waveform",
      waveformData = [],
      status = "complete",
      progress: uploadProgress = 0,
      error,
      onRetry,
      transcription,
      showTranscription: controlledShowTranscription,
      defaultShowTranscription = false,
      onTranscriptionToggle,
      ...props
    },
    ref
  ) => {
    const audioRef = React.useRef<HTMLAudioElement>(null)
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [currentTime, setCurrentTime] = React.useState(0)
    const [playbackProgress, setPlaybackProgress] = React.useState(0)
    const [internalShowTranscription, setInternalShowTranscription] = React.useState(defaultShowTranscription)

    const isTranscriptionControlled = controlledShowTranscription !== undefined
    const isTranscriptionVisible = isTranscriptionControlled ? controlledShowTranscription : internalShowTranscription

    const isSent = variant === "sent"

    const handleTranscriptionToggle = () => {
      const newState = !isTranscriptionVisible
      if (!isTranscriptionControlled) {
        setInternalShowTranscription(newState)
      }
      onTranscriptionToggle?.(newState)
    }

    // Audio event handlers
    React.useEffect(() => {
      const audio = audioRef.current
      if (!audio) return

      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime)
        setPlaybackProgress((audio.currentTime / audio.duration) * 100)
      }

      const handleEnded = () => {
        setIsPlaying(false)
        setCurrentTime(0)
        setPlaybackProgress(0)
      }

      audio.addEventListener("timeupdate", handleTimeUpdate)
      audio.addEventListener("ended", handleEnded)

      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate)
        audio.removeEventListener("ended", handleEnded)
      }
    }, [])

    const togglePlay = () => {
      const audio = audioRef.current
      if (!audio) return

      if (isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      setIsPlaying(!isPlaying)
    }

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
      const audio = audioRef.current
      if (!audio) return

      const rect = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const newProgress = (clickX / rect.width) * 100
      const newTime = (newProgress / 100) * duration

      audio.currentTime = newTime
      setCurrentTime(newTime)
      setPlaybackProgress(newProgress)
    }

    // Uploading state
    if (status === "uploading") {
      return (
        <div
          ref={ref}
          className={cn(chatAudioVariants({ variant }), className)}
          {...props}
        >
          <div className={cn(playButtonVariants({ variant }), "opacity-50")}>
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
          <div className="flex-1">
            <Progress value={uploadProgress} className="h-1.5" />
            <p
              className={cn(
                "text-xs mt-1",
                isSent ? "text-white/70" : "text-muted-foreground"
              )}
            >
              Enviando... {uploadProgress}%
            </p>
          </div>
        </div>
      )
    }

    // Error state
    if (status === "error") {
      return (
        <div
          ref={ref}
          className={cn(chatAudioVariants({ variant }), className)}
          {...props}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-destructive/10 shrink-0">
            <AlertCircle className="w-5 h-5 text-destructive" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-destructive">{error || "Erro ao enviar"}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="flex items-center gap-1 text-xs text-destructive hover:underline mt-1"
              >
                <RefreshCw className="w-3 h-3" />
                Tentar novamente
              </button>
            )}
          </div>
        </div>
      )
    }

    return (
      <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props}>
        <div className={cn(chatAudioVariants({ variant }))}>
          <audio ref={audioRef} src={src} preload="metadata" />

          {/* Play/Pause button */}
          <button
            onClick={togglePlay}
            className={cn(playButtonVariants({ variant }))}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <PauseIcon className="w-5 h-5" />
            ) : (
              <PlayIcon className="w-5 h-5 ml-0.5" />
            )}
          </button>

          {/* Visualizer */}
          <div className="flex-1 flex flex-col gap-1">
            {visualizer === "waveform" ? (
              <Waveform
                data={waveformData}
                progress={playbackProgress}
                variant={variant!}
                isPlaying={isPlaying}
              />
            ) : (
              <div
                className="relative h-1.5 bg-neutral-200 rounded-full cursor-pointer"
                onClick={handleProgressClick}
              >
                <div
                  className={cn(
                    "absolute inset-y-0 left-0 rounded-full transition-all",
                    isSent ? "bg-white" : "bg-primary"
                  )}
                  style={{ width: `${playbackProgress}%` }}
                />
              </div>
            )}

            {/* Duration */}
            <div
              className={cn(
                "text-xs",
                isSent ? "text-white/70" : "text-muted-foreground"
              )}
            >
              {formatDuration(currentTime)} / {formatDuration(duration)}
            </div>
          </div>

        </div>

        {/* Transcribe link */}
        {transcription && (
          <button
            onClick={handleTranscriptionToggle}
            className={cn(
              "flex items-center gap-1 text-xs font-medium transition-opacity self-start hover:opacity-80",
              isSent
                ? "text-white/90"
                : "text-transparent bg-clip-text"
            )}
            style={!isSent ? { backgroundImage: "var(--ai-gradient)" } : undefined}
          >
            <AISparkle
              className={cn(
                "w-3 h-3 shrink-0",
                isSent ? "text-white/90" : "text-[var(--ai-mid)]"
              )}
            />
            {isTranscriptionVisible ? "Ocultar transcrição" : "Transcrever"}
          </button>
        )}

        {/* Transcription content */}
        {transcription && isTranscriptionVisible && (
          <div className="animate-in fade-in slide-in-from-top-1 duration-200">
            {transcription}
          </div>
        )}
      </div>
    )
  }
)
ChatAudio.displayName = "ChatAudio"

export { ChatAudio, chatAudioVariants, formatDuration }
