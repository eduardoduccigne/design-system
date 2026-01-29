import * as React from "react"

import { cn } from "../../lib/utils"

interface CountBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number
  max?: number
  showZero?: boolean
  dot?: boolean
  variant?: "default" | "destructive"
  children: React.ReactNode
}

function CountBadge({
  count = 0,
  max = 99,
  showZero = false,
  dot = false,
  variant = "default",
  className,
  children,
  ...props
}: CountBadgeProps) {
  const displayCount = count > max ? `${max}+` : count
  const visible = dot || count > 0 || showZero

  return (
    <div className={cn("relative inline-flex", className)} {...props}>
      {children}
      {visible && (
        <span
          className={cn(
            "absolute flex items-center justify-center rounded-full ring-2 ring-background",
            variant === "destructive"
              ? "bg-destructive text-destructive-foreground"
              : "bg-neutral-900 text-white",
            dot
              ? "h-2 w-2 top-0 right-0"
              : "h-5 min-w-5 -top-1.5 -right-1.5 px-1 text-[10px] font-semibold leading-none"
          )}
        >
          {!dot && displayCount}
        </span>
      )}
    </div>
  )
}

export { CountBadge }
export type { CountBadgeProps }
