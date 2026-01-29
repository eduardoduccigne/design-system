"use client"

import * as React from "react"
import { AlertTriangle, Info, AlertCircle, CheckCircle } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "../dialog"
import { Button } from "../button"
import { cn } from "../../../lib/utils"

const confirmationIconVariants = cva(
  "h-12 w-12 rounded-full flex items-center justify-center mb-4",
  {
    variants: {
      intent: {
        default: "bg-primary/10 text-primary",
        destructive: "bg-destructive/10 text-destructive",
        warning: "bg-warning/10 text-warning",
        info: "bg-info/10 text-info",
      },
    },
    defaultVariants: {
      intent: "default",
    },
  }
)

const iconMap = {
  default: CheckCircle,
  destructive: AlertTriangle,
  warning: AlertCircle,
  info: Info,
}

export interface ConfirmationModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title: string
  description?: string
  intent?: "default" | "destructive" | "warning" | "info"
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void
  loading?: boolean
  trigger?: React.ReactNode
  hideIcon?: boolean
}

export function ConfirmationModal({
  open,
  onOpenChange,
  title,
  description,
  intent = "default",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
  trigger,
  hideIcon = false,
}: ConfirmationModalProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen
  const setIsOpen = isControlled ? onOpenChange! : setInternalOpen

  const Icon = iconMap[intent]

  const handleConfirm = async () => {
    try {
      setIsLoading(true)
      await onConfirm?.()
      setIsOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    onCancel?.()
    setIsOpen(false)
  }

  const confirmButtonVariant = intent === "destructive" ? "destructive" : "default"
  const isLoadingState = loading || isLoading

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent size="sm" hideCloseButton>
        <DialogHeader className="sm:text-center">
          {!hideIcon && (
            <div className="flex justify-center">
              <div className={cn(confirmationIconVariants({ intent }))}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          )}
          <DialogTitle className="text-center">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-center">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter className="sm:justify-center gap-2 pt-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isLoadingState}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={confirmButtonVariant}
            onClick={handleConfirm}
            disabled={isLoadingState}
          >
            {isLoadingState ? "Loading..." : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
