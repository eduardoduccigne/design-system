"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

/* ─── Header (root) ───────────────────────────────────────────────────────── */

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** When true, hides header on scroll down and reveals on scroll up */
  autoHide?: boolean
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ className, autoHide = false, ...props }, ref) => {
    const [visible, setVisible] = React.useState(true)
    const [isSticky, setIsSticky] = React.useState(false)
    const lastScrollY = React.useRef(0)

    React.useEffect(() => {
      if (!autoHide) return

      const handleScroll = () => {
        const currentY = window.scrollY
        const headerHeight = 56

        if (currentY <= headerHeight) {
          setVisible(true)
          setIsSticky(false)
        } else if (currentY < lastScrollY.current) {
          setVisible(true)
          setIsSticky(true)
        } else {
          setVisible(false)
        }

        lastScrollY.current = currentY
      }

      window.addEventListener("scroll", handleScroll, { passive: true })
      return () => window.removeEventListener("scroll", handleScroll)
    }, [autoHide])

    return (
      <header
        ref={ref}
        className={cn(
          "w-full border-b border-border bg-[var(--card)]",
          autoHide && "transition-transform duration-300",
          autoHide && isSticky && "sticky top-0 z-50 shadow-sm",
          autoHide && !visible && isSticky && "-translate-y-full",
          className
        )}
        {...props}
      />
    )
  }
)
Header.displayName = "Header"

/* ─── HeaderContent ───────────────────────────────────────────────────────── */

const HeaderContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mx-auto flex items-center justify-between h-14 px-6",
      className
    )}
    {...props}
  />
))
HeaderContent.displayName = "HeaderContent"

/* ─── HeaderGroup (left/right sections) ───────────────────────────────────── */

const HeaderGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-3", className)}
    {...props}
  />
))
HeaderGroup.displayName = "HeaderGroup"

/* ─── HeaderSeparator ─────────────────────────────────────────────────────── */

const HeaderSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("h-5 w-px bg-border mx-1", className)}
    aria-hidden="true"
    {...props}
  />
))
HeaderSeparator.displayName = "HeaderSeparator"

/* ─── HeaderNav ───────────────────────────────────────────────────────────── */

const HeaderNav = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn("flex items-center gap-1", className)}
    {...props}
  />
))
HeaderNav.displayName = "HeaderNav"

/* ─── HeaderNavItem ───────────────────────────────────────────────────────── */

export interface HeaderNavItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean
}

const HeaderNavItem = React.forwardRef<HTMLAnchorElement, HeaderNavItemProps>(
  ({ className, isActive, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        "relative flex items-center gap-1 px-3 py-1.5 rounded-md text-sm transition-nilo-fast",
        isActive
          ? "bg-[var(--accent)]/50 text-foreground font-medium"
          : "text-muted-foreground hover:bg-[var(--accent)]/50 hover:text-foreground",
        className
      )}
      {...props}
    />
  )
)
HeaderNavItem.displayName = "HeaderNavItem"

/* ─── HeaderAction (icon button) ──────────────────────────────────────────── */

const HeaderAction = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "relative h-8 w-8 rounded-md flex items-center justify-center text-muted-foreground hover:bg-[var(--accent)]/50 hover:text-foreground transition-nilo-fast",
      className
    )}
    {...props}
  />
))
HeaderAction.displayName = "HeaderAction"

/* ─── HeaderBadge (notification dot) ──────────────────────────────────────── */

const HeaderBadge = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "absolute top-1 right-1 h-2 w-2 rounded-full bg-[var(--destructive)]",
      className
    )}
    {...props}
  />
))
HeaderBadge.displayName = "HeaderBadge"

/* ─── HeaderProductBadge ──────────────────────────────────────────────────── */

export interface HeaderProductBadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  label: string
}

const HeaderProductBadge = React.forwardRef<
  HTMLDivElement,
  HeaderProductBadgeProps
>(({ className, icon, label, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center gap-2 text-sm font-medium text-foreground",
      className
    )}
    {...props}
  >
    {icon && (
      <span className="text-muted-foreground">{icon}</span>
    )}
    <span>{label}</span>
  </div>
))
HeaderProductBadge.displayName = "HeaderProductBadge"

/* ─── Exports ─────────────────────────────────────────────────────────────── */

export {
  Header,
  HeaderContent,
  HeaderGroup,
  HeaderSeparator,
  HeaderNav,
  HeaderNavItem,
  HeaderAction,
  HeaderBadge,
  HeaderProductBadge,
}
