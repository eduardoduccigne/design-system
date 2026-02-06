"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

/* ─── Footer (root) ───────────────────────────────────────────────────────── */

const Footer = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <footer
    ref={ref}
    className={cn(
      "w-full flex items-center justify-center gap-3 px-6 py-6 text-xs text-muted-foreground",
      className
    )}
    {...props}
  />
))
Footer.displayName = "Footer"

/* ─── FooterSeparator ─────────────────────────────────────────────────────── */

const FooterSeparator = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("text-border", className)}
    aria-hidden="true"
    {...props}
  >
    ·
  </span>
))
FooterSeparator.displayName = "FooterSeparator"

/* ─── FooterLink ──────────────────────────────────────────────────────────── */

export interface FooterLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const FooterLink = React.forwardRef<HTMLAnchorElement, FooterLinkProps>(
  ({ className, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        "text-xs text-muted-foreground hover:text-foreground transition-nilo-fast",
        className
      )}
      {...props}
    />
  )
)
FooterLink.displayName = "FooterLink"

/* ─── Exports ─────────────────────────────────────────────────────────────── */

export {
  Footer,
  FooterSeparator,
  FooterLink,
}
