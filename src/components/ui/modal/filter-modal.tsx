"use client"

import * as React from "react"
import { Filter, RotateCcw } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogBody,
  DialogTrigger,
} from "../dialog"
import { Button } from "../button"
import { Badge } from "../badge"
import { cn } from "../../../lib/utils"

export interface FilterModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  description?: string
  onApply?: () => void
  onReset?: () => void
  activeFilterCount?: number
  applyLabel?: string
  resetLabel?: string
  cancelLabel?: string
  trigger?: React.ReactNode
  children: React.ReactNode
}

export function FilterModal({
  open,
  onOpenChange,
  title = "Filters",
  description,
  onApply,
  onReset,
  activeFilterCount = 0,
  applyLabel = "Apply Filters",
  resetLabel = "Reset",
  cancelLabel = "Cancel",
  trigger,
  children,
}: FilterModalProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)

  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen
  const setIsOpen = isControlled ? onOpenChange! : setInternalOpen

  const handleApply = () => {
    onApply?.()
    setIsOpen(false)
  }

  const handleReset = () => {
    onReset?.()
  }

  const defaultTrigger = (
    <Button variant="outline" className="gap-2">
      <Filter className="h-4 w-4" />
      Filters
      {activeFilterCount > 0 && (
        <Badge variant="secondary" className="ml-1 h-5 px-1.5">
          {activeFilterCount}
        </Badge>
      )}
    </Button>
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent size="md" scrollBehavior="scrollable">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              {title}
              {activeFilterCount > 0 && (
                <Badge variant="secondary">{activeFilterCount} active</Badge>
              )}
            </DialogTitle>
            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                {resetLabel}
              </Button>
            )}
          </div>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <DialogBody className="space-y-6">{children}</DialogBody>

        <DialogFooter className="pt-4 border-t border-border/60">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {cancelLabel}
          </Button>
          <Button onClick={handleApply}>{applyLabel}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export interface FilterSectionProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function FilterSection({
  title,
  children,
  className,
}: FilterSectionProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <h4 className="text-sm font-medium text-foreground">{title}</h4>
      {children}
    </div>
  )
}
