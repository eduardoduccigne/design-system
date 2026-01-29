import * as React from "react"

import { cn } from "../../lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-base shadow-[var(--shadow-xs)]",
          "ring-offset-background transition-nilo",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          "placeholder:text-muted-foreground/60",
          "hover:border-neutral-400 hover:shadow-[var(--shadow-sm)]",
          "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20 focus-visible:shadow-[var(--shadow-sm)]",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-input disabled:hover:shadow-[var(--shadow-xs)]",
          "md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
