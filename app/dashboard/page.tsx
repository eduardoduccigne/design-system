"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Types
interface KPIMetric {
  label: string
  value: string | number
  description: string
  status?: "normal" | "warning" | "critical"
}

interface Professional {
  id: string
  name: string
  role: string
  avatarUrl?: string
  currentConversations: number
  maxConversations: number
}

// Mock data for demonstration
const mockMetrics: KPIMetric[] = [
  {
    label: "Team Occupancy",
    value: "78%",
    description: "Average workload across team",
    status: "normal",
  },
  {
    label: "Waiting for Response",
    value: 12,
    description: "Conversations in queue",
    status: "warning",
  },
  {
    label: "Overloaded Professionals",
    value: 2,
    description: "At or above capacity",
    status: "critical",
  },
  {
    label: "Avg. Resolution Time",
    value: "4.2h",
    description: "Time to resolve conversations",
    status: "normal",
  },
]

const mockProfessionals: Professional[] = [
  {
    id: "1",
    name: "Ana Silva",
    role: "Nurse",
    currentConversations: 8,
    maxConversations: 8,
  },
  {
    id: "2",
    name: "Carlos Mendes",
    role: "Care Coordinator",
    currentConversations: 6,
    maxConversations: 10,
  },
  {
    id: "3",
    name: "Beatriz Costa",
    role: "Nurse",
    currentConversations: 10,
    maxConversations: 10,
  },
  {
    id: "4",
    name: "Diego Ferreira",
    role: "Health Advisor",
    currentConversations: 3,
    maxConversations: 8,
  },
  {
    id: "5",
    name: "Elena Santos",
    role: "Nurse",
    currentConversations: 5,
    maxConversations: 10,
  },
  {
    id: "6",
    name: "Felipe Oliveira",
    role: "Care Coordinator",
    currentConversations: 7,
    maxConversations: 8,
  },
]

// Helper function to get status color classes
function getStatusColor(status?: "normal" | "warning" | "critical") {
  switch (status) {
    case "warning":
      return "text-warning"
    case "critical":
      return "text-destructive"
    default:
      return "text-foreground"
  }
}

function getCapacityStatus(current: number, max: number) {
  const percentage = (current / max) * 100
  if (percentage >= 100) return "critical"
  if (percentage >= 80) return "warning"
  return "normal"
}

function getProgressColor(status: "normal" | "warning" | "critical") {
  switch (status) {
    case "critical":
      return "bg-destructive"
    case "warning":
      return "bg-warning"
    default:
      return "bg-primary"
  }
}

// KPI Card Component
function KPICard({ metric }: { metric: KPIMetric }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {metric.label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-bold ${getStatusColor(metric.status)}`}>
          {metric.value}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {metric.description}
        </p>
      </CardContent>
    </Card>
  )
}

// KPI Loading Skeleton
function KPICardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-4 w-24" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-9 w-16 mb-1" />
        <Skeleton className="h-3 w-32" />
      </CardContent>
    </Card>
  )
}

// Professional Card Component
function ProfessionalCard({ professional }: { professional: Professional }) {
  const capacityPercentage = Math.round(
    (professional.currentConversations / professional.maxConversations) * 100
  )
  const status = getCapacityStatus(
    professional.currentConversations,
    professional.maxConversations
  )
  const initials = professional.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)

  return (
    <Card className="p-4">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={professional.avatarUrl} alt={professional.name} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground truncate">
              {professional.name}
            </span>
            {status === "critical" && (
              <Badge variant="destructive" className="text-xs">
                Overloaded
              </Badge>
            )}
            {status === "warning" && (
              <Badge
                variant="secondary"
                className="text-xs bg-warning/10 text-warning border-warning/20"
              >
                High Load
              </Badge>
            )}
          </div>
          <span className="text-sm text-muted-foreground">
            {professional.role}
          </span>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-32 flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Capacity</span>
                  <span className={getStatusColor(status)}>
                    {professional.currentConversations}/
                    {professional.maxConversations}
                  </span>
                </div>
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className={`h-full transition-all ${getProgressColor(status)}`}
                    style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
                  />
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {professional.currentConversations} of{" "}
                {professional.maxConversations} conversations ({capacityPercentage}
                %)
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </Card>
  )
}

// Professional Card Skeleton
function ProfessionalCardSkeleton() {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-5 w-32 mb-1" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="w-32">
          <Skeleton className="h-3 w-full mb-1" />
          <Skeleton className="h-2 w-full" />
        </div>
      </div>
    </Card>
  )
}

// Empty State Component
function EmptyState() {
  return (
    <Card className="p-8">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <svg
            className="h-8 w-8 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-1">
          No Active Professionals
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          There are no professionals currently handling conversations. Team
          members will appear here when they start their shifts.
        </p>
      </div>
    </Card>
  )
}

// Error State Component
function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <Alert variant="destructive">
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <AlertTitle>Failed to load dashboard data</AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <span>
          Unable to fetch team workload information. Please try again.
        </span>
        <Button variant="outline" size="sm" onClick={onRetry} className="ml-4">
          Retry
        </Button>
      </AlertDescription>
    </Alert>
  )
}

// Main Dashboard Component
export default function TeamWorkloadDashboard() {
  // State for demo purposes - in production, this would come from data fetching
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)
  const [metrics] = React.useState<KPIMetric[]>(mockMetrics)
  const [professionals] = React.useState<Professional[]>(mockProfessionals)

  // Simulated retry handler
  const handleRetry = () => {
    setHasError(false)
    setIsLoading(true)
    // Simulate data fetch
    setTimeout(() => setIsLoading(false), 1500)
  }

  // Last updated timestamp
  const lastUpdated = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                Team Workload
              </h1>
              <p className="text-sm text-muted-foreground">
                Monitor team capacity and conversation distribution
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Last updated: {lastUpdated}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRetry}
                disabled={isLoading}
              >
                <svg
                  className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </header>

        {/* Error State */}
        {hasError && (
          <div className="mb-6">
            <ErrorState onRetry={handleRetry} />
          </div>
        )}

        {/* KPI Metrics Grid */}
        <section className="mb-8">
          <h2 className="sr-only">Key Performance Indicators</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <KPICardSkeleton key={i} />
                ))
              : metrics.map((metric, index) => (
                  <KPICard key={index} metric={metric} />
                ))}
          </div>
        </section>

        {/* Team Members Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-foreground">
              Team Members
            </h2>
            {!isLoading && professionals.length > 0 && (
              <span className="text-sm text-muted-foreground">
                {professionals.length} active
              </span>
            )}
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <ProfessionalCardSkeleton key={i} />
              ))}
            </div>
          ) : professionals.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-3">
              {professionals
                .sort((a, b) => {
                  // Sort by capacity percentage descending (most loaded first)
                  const aPercent = a.currentConversations / a.maxConversations
                  const bPercent = b.currentConversations / b.maxConversations
                  return bPercent - aPercent
                })
                .map((professional) => (
                  <ProfessionalCard
                    key={professional.id}
                    professional={professional}
                  />
                ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
