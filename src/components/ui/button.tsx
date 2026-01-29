import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-nilo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[var(--shadow-sm)] hover:bg-primary-600 hover:shadow-[var(--shadow-primary-sm)] active:scale-[0.98] active:shadow-[var(--shadow-xs)]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[var(--shadow-sm)] hover:bg-red-700 hover:shadow-[var(--shadow-sm)] active:scale-[0.98] active:shadow-[var(--shadow-xs)]",
        outline:
          "border border-input bg-transparent shadow-[var(--shadow-xs)] hover:bg-accent hover:border-neutral-400 hover:shadow-[var(--shadow-sm)] active:scale-[0.98]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[var(--shadow-xs)] border border-border/60 hover:bg-neutral-200 hover:shadow-[var(--shadow-sm)] active:scale-[0.98]",
        ghost:
          "hover:bg-accent hover:text-accent-foreground active:bg-accent/80 active:scale-[0.98]",
        link:
          "text-primary underline-offset-4 hover:underline hover:text-primary-600",
        ai:
          "bg-ai-gradient text-white shadow-[var(--shadow-sm)] hover:opacity-90 hover:shadow-[var(--shadow-md)] active:scale-[0.98] active:shadow-[var(--shadow-xs)] [&>*]:relative [&>*]:z-10",
        "ai-secondary":
          "ai-secondary-btn text-[var(--ai-start)] shadow-[var(--shadow-xs)] hover:shadow-[var(--shadow-sm)] active:scale-[0.98]",
        "ai-outline":
          "ai-outline-btn text-[var(--ai-start)] hover:shadow-[var(--shadow-sm)] active:scale-[0.98]",
        "ai-ghost":
          "text-[var(--ai-start)] hover:bg-[var(--ai-start)]/10 active:bg-[var(--ai-start)]/15 active:scale-[0.98]",
        "ai-link":
          "text-[var(--ai-start)] underline underline-offset-4 decoration-[var(--ai-mid)] hover:decoration-[var(--ai-start)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-lg px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
