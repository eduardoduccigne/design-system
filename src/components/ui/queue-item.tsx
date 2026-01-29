"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const queueItemVariants = cva(
  "flex items-center gap-2.5 px-4 py-3 cursor-pointer transition-nilo-fast border-l-[3px] border-transparent",
  {
    variants: {
      active: {
        true: "bg-primary-50 border-l-primary-500",
        false: "hover:bg-neutral-200",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
)

const dotVariants = cva("w-2 h-2 rounded-full shrink-0", {
  variants: {
    variant: {
      critical: "bg-destructive",
      warning: "bg-amber-500",
      ok: "bg-success",
      neutral: "bg-neutral-500",
      none: "hidden",
    },
  },
  defaultVariants: {
    variant: "none",
  },
})

export interface QueueItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof queueItemVariants> {
  /** Count to display (can be number or formatted string like "1.9k") */
  count?: number | string
  /** Status dot color variant */
  dotVariant?: VariantProps<typeof dotVariants>["variant"]
}

const QueueItem = React.forwardRef<HTMLDivElement, QueueItemProps>(
  ({ className, active, count, dotVariant, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(queueItemVariants({ active }), className)}
        role="option"
        aria-selected={active ?? false}
        tabIndex={active ? 0 : -1}
        {...props}
      >
        <span
          className={cn(
            "text-[13px] flex-1 overflow-hidden text-ellipsis whitespace-nowrap",
            active ? "font-semibold text-foreground" : "font-medium text-foreground"
          )}
        >
          {children}
        </span>
        {count !== undefined && (
          <span
            className={cn(
              "text-[13px] font-semibold shrink-0 min-w-6 text-right",
              active ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {count}
          </span>
        )}
        {dotVariant && dotVariant !== "none" && (
          <span className={cn(dotVariants({ variant: dotVariant }))} aria-hidden="true" />
        )}
      </div>
    )
  }
)
QueueItem.displayName = "QueueItem"

export interface QueueListProps extends React.HTMLAttributes<HTMLDivElement> {}

const QueueList = React.forwardRef<HTMLDivElement, QueueListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="listbox"
        className={cn("flex-1 overflow-y-auto py-2", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
QueueList.displayName = "QueueList"

export { QueueItem, QueueList, queueItemVariants, dotVariants }
