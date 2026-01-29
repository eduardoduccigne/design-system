import * as React from "react"

import { cn } from "../../lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-base shadow-[var(--shadow-xs)]",
        "ring-offset-background transition-nilo resize-none",
        "placeholder:text-muted-foreground/60",
        "hover:border-neutral-400 hover:shadow-[var(--shadow-sm)]",
        "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20 focus-visible:shadow-[var(--shadow-sm)]",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-input",
        "md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
