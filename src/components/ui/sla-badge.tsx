import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const slaBadgeVariants = cva(
  "inline-flex items-center justify-center min-w-[52px] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded-full border-[1.5px] whitespace-nowrap",
  {
    variants: {
      variant: {
        critical: "text-destructive border-destructive bg-destructive/5",
        warning: "text-amber-600 border-amber-600 bg-amber-600/5",
        ok: "text-success border-success bg-success/5",
      },
    },
    defaultVariants: {
      variant: "ok",
    },
  }
)

export interface SLABadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof slaBadgeVariants> {}

const SLABadge = React.forwardRef<HTMLSpanElement, SLABadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(slaBadgeVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
SLABadge.displayName = "SLABadge"

export { SLABadge, slaBadgeVariants }
