"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

/**
 * Tag Component
 *
 * Three main types:
 * 1. Care Lines (careLine variant) - Fixed teal color for all care lines, no icons
 * 2. Custom Tags - Fully customizable colors via bgColor/textColor, supports icons
 * 3. Fixed Tags (solid/outline) - Neutral colors for general use
 */

const tagVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap leading-none",
  {
    variants: {
      size: {
        sm: "px-1.5 pt-[3px] pb-[2px] text-[9px]",
        md: "px-2 pt-[4px] pb-[3px] text-[10px]",
        lg: "px-2.5 pt-[5px] pb-[4px] text-[11px]",
      },
      variant: {
        // Fixed Tags - Neutral colors
        solid: "bg-muted text-muted-foreground",
        outline: "border border-border bg-background text-foreground",
        // Care Line - Consistent teal/healthcare color for all care lines
        careLine: "bg-teal-100 text-teal-700",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "solid",
    },
  }
)

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  /** Icon to display before the label (only for custom tags) */
  icon?: React.ReactNode
  /** Custom background color (for custom tags) */
  bgColor?: string
  /** Custom text color (for custom tags) */
  textColor?: string
  /** Whether to render as a removable tag */
  removable?: boolean
  /** Callback when remove button is clicked */
  onRemove?: () => void
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      className,
      size,
      variant,
      icon,
      bgColor,
      textColor,
      removable,
      onRemove,
      children,
      ...props
    },
    ref
  ) => {
    // Custom colors override variant styles
    const customStyles = bgColor || textColor
      ? {
          backgroundColor: bgColor,
          color: textColor,
        }
      : undefined

    return (
      <span
        ref={ref}
        className={cn(
          tagVariants({ size, variant }),
          removable && "pr-1",
          className
        )}
        style={customStyles}
        {...props}
      >
        {icon && <span className="shrink-0 -ml-0.5 -translate-y-px">{icon}</span>}
        {children}
        {removable && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onRemove?.()
            }}
            className="ml-0.5 shrink-0 rounded-full p-0.5 hover:bg-black/10 transition-colors"
            aria-label="Remove tag"
          >
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </span>
    )
  }
)
Tag.displayName = "Tag"

/**
 * CareLineTag - Convenience component for Care Line tags
 * All care lines have the same consistent teal color, no icons
 */
export interface CareLineTagProps extends Omit<TagProps, "variant" | "icon" | "bgColor" | "textColor"> {}

const CareLineTag = React.forwardRef<HTMLSpanElement, CareLineTagProps>(
  (props, ref) => {
    return <Tag ref={ref} variant="careLine" {...props} />
  }
)
CareLineTag.displayName = "CareLineTag"

/**
 * CustomTag - Convenience component for fully customizable tags
 * Supports icons and custom color combinations (user-defined)
 */
export interface CustomTagProps extends Omit<TagProps, "variant"> {
  bgColor: string
  textColor: string
}

const CustomTag = React.forwardRef<HTMLSpanElement, CustomTagProps>(
  ({ bgColor, textColor, ...props }, ref) => {
    return <Tag ref={ref} bgColor={bgColor} textColor={textColor} {...props} />
  }
)
CustomTag.displayName = "CustomTag"

/**
 * FixedTag - Convenience component for neutral fixed tags
 * Solid or outline variants, no icons
 */
export interface FixedTagProps extends Omit<TagProps, "icon" | "bgColor" | "textColor"> {
  variant?: "solid" | "outline"
}

const FixedTag = React.forwardRef<HTMLSpanElement, FixedTagProps>(
  ({ variant = "solid", ...props }, ref) => {
    return <Tag ref={ref} variant={variant} {...props} />
  }
)
FixedTag.displayName = "FixedTag"

export { Tag, CareLineTag, CustomTag, FixedTag, tagVariants }
