"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const conversationItemVariants = cva(
  "flex gap-3 px-4 py-3 cursor-pointer transition-nilo-fast relative",
  {
    variants: {
      active: {
        true: "bg-primary-50",
        false: "hover:bg-neutral-200",
      },
      unread: {
        true: "bg-card",
        false: "",
      },
    },
    defaultVariants: {
      active: false,
      unread: false,
    },
  }
)

export interface ConversationItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof conversationItemVariants> {}

const ConversationItem = React.forwardRef<HTMLDivElement, ConversationItemProps>(
  ({ className, active, unread, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(conversationItemVariants({ active, unread }), className)}
        role="option"
        aria-selected={active ?? false}
        tabIndex={active ? 0 : -1}
        {...props}
      >
        {/* Active indicator bar */}
        <div
          className={cn(
            "absolute left-0 top-2 bottom-2 w-[3px] rounded-r-sm transition-colors",
            active ? "bg-primary-500" : "bg-transparent"
          )}
          aria-hidden="true"
        />
        {children}
      </div>
    )
  }
)
ConversationItem.displayName = "ConversationItem"

const avatarVariants = cva(
  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 relative",
  {
    variants: {
      variant: {
        patient: "bg-info text-info-foreground",
        professional: "bg-primary text-primary-foreground",
      },
    },
    defaultVariants: {
      variant: "patient",
    },
  }
)

export interface ConversationItemAvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  /** Show online status dot */
  online?: boolean
}

const ConversationItemAvatar = React.forwardRef<HTMLDivElement, ConversationItemAvatarProps>(
  ({ className, variant, online, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ variant }), className)}
        aria-hidden="true"
        {...props}
      >
        {children}
        {online && (
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success border-2 border-card rounded-full" />
        )}
      </div>
    )
  }
)
ConversationItemAvatar.displayName = "ConversationItemAvatar"

export interface ConversationItemContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const ConversationItemContent = React.forwardRef<HTMLDivElement, ConversationItemContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-1 min-w-0", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ConversationItemContent.displayName = "ConversationItemContent"

export interface ConversationItemHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const ConversationItemHeader = React.forwardRef<HTMLDivElement, ConversationItemHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-between mb-px", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ConversationItemHeader.displayName = "ConversationItemHeader"

export interface ConversationItemNameProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

const ConversationItemName = React.forwardRef<HTMLSpanElement, ConversationItemNameProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "text-[13px] font-semibold text-foreground whitespace-nowrap overflow-hidden text-ellipsis",
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)
ConversationItemName.displayName = "ConversationItemName"

export interface ConversationItemMetaProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const ConversationItemMeta = React.forwardRef<HTMLDivElement, ConversationItemMetaProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-1.5 shrink-0 ml-2", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ConversationItemMeta.displayName = "ConversationItemMeta"

export interface ConversationItemPreviewProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the message is unread (changes styling) */
  unread?: boolean
}

const ConversationItemPreview = React.forwardRef<HTMLDivElement, ConversationItemPreviewProps>(
  ({ className, unread, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "text-xs whitespace-nowrap overflow-hidden text-ellipsis",
          unread ? "text-neutral-800 font-medium" : "text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ConversationItemPreview.displayName = "ConversationItemPreview"

export interface ConversationItemTagsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const ConversationItemTags = React.forwardRef<HTMLDivElement, ConversationItemTagsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex gap-1 flex-wrap mt-1", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ConversationItemTags.displayName = "ConversationItemTags"

export interface UnreadBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  count: number
}

const UnreadBadge = React.forwardRef<HTMLSpanElement, UnreadBadgeProps>(
  ({ className, count, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "w-[18px] h-[18px] rounded-full bg-foreground text-white text-[10px] font-bold flex items-center justify-center",
          className
        )}
        aria-label={`${count} unread message${count > 1 ? "s" : ""}`}
        {...props}
      >
        {count > 99 ? "99+" : count}
      </span>
    )
  }
)
UnreadBadge.displayName = "UnreadBadge"

export interface ConversationListProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const ConversationList = React.forwardRef<HTMLDivElement, ConversationListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="listbox"
        className={cn("flex-1 overflow-y-auto overflow-x-hidden", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ConversationList.displayName = "ConversationList"

export {
  ConversationItem,
  ConversationItemAvatar,
  ConversationItemContent,
  ConversationItemHeader,
  ConversationItemName,
  ConversationItemMeta,
  ConversationItemPreview,
  ConversationItemTags,
  ConversationList,
  UnreadBadge,
  conversationItemVariants,
  avatarVariants,
}
