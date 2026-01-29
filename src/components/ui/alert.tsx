import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const alertVariants = cva(
  "relative w-full rounded-xl border p-4 shadow-[var(--shadow-xs)] [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4",
  {
    variants: {
      variant: {
        default:
          "bg-card border-border text-foreground [&>svg]:text-foreground",
        destructive:
          "border-red-200/50 bg-red-50 text-red-900 [&>svg]:text-red-600 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-100 dark:[&>svg]:text-red-400",
        success:
          "border-green-200/50 bg-green-50 text-green-900 [&>svg]:text-green-600 dark:border-green-900/50 dark:bg-green-950/50 dark:text-green-100 dark:[&>svg]:text-green-400",
        warning:
          "border-amber-200/50 bg-amber-50 text-amber-900 [&>svg]:text-amber-600 dark:border-amber-900/50 dark:bg-amber-950/50 dark:text-amber-100 dark:[&>svg]:text-amber-400",
        info:
          "border-blue-200/50 bg-blue-50 text-blue-900 [&>svg]:text-blue-600 dark:border-blue-900/50 dark:bg-blue-950/50 dark:text-blue-100 dark:[&>svg]:text-blue-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
