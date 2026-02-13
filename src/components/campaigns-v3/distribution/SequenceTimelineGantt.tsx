"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
import type { SequenceTimeline, TimelineBatch } from "@/lib/campaigns/types-v3"

interface SequenceTimelineGanttProps {
  timeline: SequenceTimeline
  audienceSize: number
  messageCount: number
}

// Chart color tokens from design system
const markerColors = {
  primary: "bg-[var(--chart-1)]",
  secondary: "bg-[var(--chart-2)]",
  tertiary: "bg-[var(--chart-3)]",
}

function formatShortDate(isoDate: string): string {
  const date = new Date(isoDate + "T12:00:00")
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })
}

export function SequenceTimelineGantt({
  timeline,
  audienceSize,
  messageCount,
}: SequenceTimelineGanttProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { batches, totalBatchCount } = timeline

  // Calculate global date range for positioning markers
  const allDates = batches.flatMap((b) =>
    b.messages.map((m) => new Date(m.calendarDate + "T12:00:00").getTime())
  )
  const globalStartMs = Math.min(...allDates)
  const globalEndMs = Math.max(...allDates)
  const globalRangeMs = globalEndMs - globalStartMs

  // Position a date as percentage within global range
  function dateToPercent(isoDate: string): number {
    if (globalRangeMs === 0) return 50 // Single point — center everything
    const ms = new Date(isoDate + "T12:00:00").getTime()
    const pct = ((ms - globalStartMs) / globalRangeMs) * 100
    // Add padding so edge markers aren't clipped (5% - 95% range)
    return 5 + pct * 0.9
  }

  // Get unique message types for the legend (from first batch)
  const legendItems = batches[0]?.messages ?? []

  // Determine which batches to show
  let visibleBatches: TimelineBatch[]
  let collapsedCount = 0

  if (totalBatchCount <= 4 || isExpanded) {
    visibleBatches = batches
  } else {
    visibleBatches = [...batches.slice(0, 2), batches[batches.length - 1]]
    collapsedCount = totalBatchCount - 3
  }

  return (
    <Card className="shadow-[var(--shadow-sm)] transition-nilo">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">
          Timeline da Campanha
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          {audienceSize.toLocaleString("pt-BR")} pacientes •{" "}
          {messageCount} mensagens cada •{" "}
          ~{timeline.totalMessages.toLocaleString("pt-BR")} mensagens totais
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Color Legend */}
        {legendItems.length > 0 && (
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            {legendItems.map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${markerColors[item.color]}`}
                />
                <span>
                  {item.label} {item.description}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Batch Rows */}
        <TooltipProvider>
          <div className="space-y-4">
            {visibleBatches.map((batch, visibleIndex) => {
              const isLastVisible =
                visibleIndex === visibleBatches.length - 1
              const showCollapsedBefore =
                !isExpanded && collapsedCount > 0 && isLastVisible

              return (
                <div key={batch.id}>
                  {showCollapsedBefore && (
                    <div className="mb-4 flex items-center justify-between border border-dashed border-border rounded-lg px-4 py-3">
                      <span className="text-sm text-muted-foreground">
                        ...e mais {collapsedCount}{" "}
                        {collapsedCount === 1 ? "lote" : "lotes"}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsExpanded(true)}
                      >
                        Mostrar todos
                      </Button>
                    </div>
                  )}
                  <BatchRow batch={batch} dateToPercent={dateToPercent} />
                </div>
              )
            })}

            {isExpanded && totalBatchCount > 4 && (
              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(false)}
                >
                  Mostrar menos
                </Button>
              </div>
            )}
          </div>
        </TooltipProvider>

        {/* Summary */}
        <div className="border-t pt-4 space-y-2">
          <p className="text-sm font-medium">Resumo</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-muted-foreground">Duração total:</div>
            <div className="font-medium">{timeline.totalDuration} dias</div>

            <div className="text-muted-foreground">Envios iniciais:</div>
            <div className="font-medium">{timeline.initialSendsRange}</div>

            <div className="text-muted-foreground">Último follow-up:</div>
            <div className="font-medium">{timeline.lastFollowupDate}</div>

            <div className="text-muted-foreground">Total de mensagens:</div>
            <div className="font-medium">
              ~{timeline.totalMessages.toLocaleString("pt-BR")}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// --- Batch Row ---

function BatchRow({
  batch,
  dateToPercent,
}: {
  batch: TimelineBatch
  dateToPercent: (iso: string) => number
}) {
  const firstPct = dateToPercent(batch.startDate)
  const lastPct = dateToPercent(batch.endDate)
  const fillWidth = Math.max(2, lastPct - firstPct)

  return (
    <div className="space-y-1.5">
      {/* Label */}
      <div className="flex items-baseline gap-2">
        <span className="text-sm font-medium">{batch.label}</span>
        <span className="text-xs text-muted-foreground">
          {batch.patientCount.toLocaleString("pt-BR")} pacientes
        </span>
      </div>

      {/* Bar with markers */}
      <div className="relative h-8 bg-muted/50 rounded-full">
        {/* Fill between first and last marker */}
        <div
          className="absolute top-0 h-full bg-primary/10 rounded-full"
          style={{ left: `${firstPct}%`, width: `${fillWidth}%` }}
        />

        {/* Message markers (colored dots) */}
        {batch.messages.map((marker) => {
          const pct = dateToPercent(marker.calendarDate)
          return (
            <Tooltip key={marker.label}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full ${markerColors[marker.color]} border-2 border-background shadow-sm cursor-default transition-transform hover:scale-125`}
                  style={{ left: `${pct}%` }}
                />
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                <p className="font-medium">
                  {marker.label} — {marker.description}
                </p>
                <p>{formatShortDate(marker.calendarDate)}</p>
                <p>
                  {batch.patientCount.toLocaleString("pt-BR")} pacientes
                </p>
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>

      {/* Date labels below markers */}
      <div className="relative h-4">
        {batch.messages.map((marker) => {
          const pct = dateToPercent(marker.calendarDate)
          return (
            <span
              key={marker.label}
              className="absolute -translate-x-1/2 text-[10px] text-muted-foreground whitespace-nowrap"
              style={{ left: `${pct}%` }}
            >
              {formatShortDate(marker.calendarDate)}
            </span>
          )
        })}
      </div>
    </div>
  )
}
