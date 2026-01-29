"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogBody,
  DialogTrigger,
  type DialogContentProps,
} from "../dialog"
import { Button } from "../button"

type ModalSize = DialogContentProps["size"]

export interface FormModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title: string
  description?: string
  size?: ModalSize
  submitLabel?: string
  cancelLabel?: string
  onSubmit?: () => void | Promise<void>
  onCancel?: () => void
  loading?: boolean
  disabled?: boolean
  trigger?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  hideDefaultFooter?: boolean
}

export function FormModal({
  open,
  onOpenChange,
  title,
  description,
  size = "md",
  submitLabel = "Save",
  cancelLabel = "Cancel",
  onSubmit,
  onCancel,
  loading = false,
  disabled = false,
  trigger,
  children,
  footer,
  hideDefaultFooter = false,
}: FormModalProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen
  const setIsOpen = isControlled ? onOpenChange! : setInternalOpen

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      await onSubmit?.()
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    onCancel?.()
    setIsOpen(false)
  }

  const handleOpenChange = (open: boolean) => {
    if (!open && !loading && !isLoading) {
      onCancel?.()
    }
    setIsOpen(open)
  }

  const isLoadingState = loading || isLoading

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent size={size} scrollBehavior="scrollable">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>

          <DialogBody>{children}</DialogBody>

          {!hideDefaultFooter && (
            <DialogFooter className="pt-4 border-t border-border/60">
              {footer || (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isLoadingState}
                  >
                    {cancelLabel}
                  </Button>
                  <Button type="submit" disabled={isLoadingState || disabled}>
                    {isLoadingState ? "Saving..." : submitLabel}
                  </Button>
                </>
              )}
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
