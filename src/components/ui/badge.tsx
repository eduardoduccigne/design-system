import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-nilo-fast focus:outline-none focus:ring-2 focus:ring-ring/30 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-primary-200/50 bg-primary-50 text-primary-700 dark:border-primary-800/50 dark:bg-primary-950 dark:text-primary-300",
        secondary:
          "border-border bg-secondary text-secondary-foreground",
        destructive:
          "border-red-200/50 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950 dark:text-red-300",
        success:
          "border-green-200/50 bg-green-50 text-green-700 dark:border-green-900/50 dark:bg-green-950 dark:text-green-300",
        warning:
          "border-amber-200/50 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950 dark:text-amber-300",
        info:
          "border-blue-200/50 bg-blue-50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-950 dark:text-blue-300",
        outline:
          "border-border text-foreground bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
