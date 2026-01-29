"use client"

import * as React from "react"
import { Search, Check, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  type DialogContentProps,
} from "../dialog"
import { Button } from "../button"
import { Input } from "../input"
import { ScrollArea } from "../scroll-area"
import { cn } from "../../../lib/utils"

function CheckboxIndicator({ checked }: { checked: boolean }) {
  return (
    <div
      className={cn(
        "grid place-content-center h-4 w-4 shrink-0 rounded-[3px] border shadow-[var(--shadow-xs)] transition-nilo-fast",
        checked
          ? "border-primary bg-primary text-primary-foreground"
          : "border-input bg-background"
      )}
    >
      {checked && <Check className="h-3 w-3" />}
    </div>
  )
}

type ModalSize = DialogContentProps["size"]

export interface ListModalItem {
  id: string
  label: string
  description?: string
  disabled?: boolean
}

export interface ListModalProps<T extends ListModalItem = ListModalItem> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title: string
  description?: string
  size?: ModalSize
  items: T[]
  selectedIds?: string[]
  onSelect?: (ids: string[]) => void
  onConfirm?: (selectedItems: T[]) => void
  multiple?: boolean
  searchPlaceholder?: string
  emptyMessage?: string
  confirmLabel?: string
  cancelLabel?: string
  trigger?: React.ReactNode
  renderItem?: (item: T, selected: boolean) => React.ReactNode
  filterFn?: (item: T, searchQuery: string) => boolean
  maxHeight?: number
}

export function ListModal<T extends ListModalItem = ListModalItem>({
  open,
  onOpenChange,
  title,
  description,
  size = "md",
  items,
  selectedIds: controlledSelectedIds,
  onSelect,
  onConfirm,
  multiple = false,
  searchPlaceholder = "Search...",
  emptyMessage = "No items found",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  trigger,
  renderItem,
  filterFn,
  maxHeight = 320,
}: ListModalProps<T>) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [internalSelectedIds, setInternalSelectedIds] = React.useState<
    string[]
  >([])

  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen
  const setIsOpen = isControlled ? onOpenChange! : setInternalOpen

  const selectedIds = controlledSelectedIds ?? internalSelectedIds
  const setSelectedIds = onSelect ?? setInternalSelectedIds

  React.useEffect(() => {
    if (!isOpen) {
      setSearchQuery("")
    }
  }, [isOpen])

  const defaultFilterFn = (item: T, query: string) => {
    const q = query.toLowerCase()
    return (
      item.label.toLowerCase().includes(q) ||
      (item.description?.toLowerCase().includes(q) ?? false)
    )
  }

  const filteredItems = React.useMemo(() => {
    if (!searchQuery) return items
    const filterFunction = filterFn ?? defaultFilterFn
    return items.filter((item) => filterFunction(item, searchQuery))
  }, [items, searchQuery, filterFn])

  const handleItemClick = (item: T) => {
    if (item.disabled) return

    if (multiple) {
      const newSelectedIds = selectedIds.includes(item.id)
        ? selectedIds.filter((id) => id !== item.id)
        : [...selectedIds, item.id]
      setSelectedIds(newSelectedIds)
    } else {
      setSelectedIds([item.id])
    }
  }

  const handleConfirm = () => {
    const selectedItems = items.filter((item) => selectedIds.includes(item.id))
    onConfirm?.(selectedItems as T[])
    setIsOpen(false)
  }

  const handleClearSelection = () => {
    setSelectedIds([])
  }

  const defaultRenderItem = (item: T, selected: boolean) => (
    <div className="flex items-center gap-3">
      {multiple && <CheckboxIndicator checked={selected} />}
      <div className="flex-1 min-w-0">
        <div
          className={cn(
            "text-sm font-medium truncate",
            item.disabled && "text-muted-foreground"
          )}
        >
          {item.label}
        </div>
        {item.description && (
          <div className="text-xs text-muted-foreground truncate">
            {item.description}
          </div>
        )}
      </div>
      {!multiple && selected && (
        <Check className="h-4 w-4 text-primary shrink-0" />
      )}
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent size={size} className="flex flex-col max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {multiple && selectedIds.length > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {selectedIds.length} selected
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearSelection}
              className="h-auto py-1 px-2 text-xs"
            >
              Clear all
            </Button>
          </div>
        )}

        <ScrollArea className="flex-1" style={{ maxHeight }}>
          <div className="space-y-1" role="listbox" aria-multiselectable={multiple}>
            {filteredItems.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </div>
            ) : (
              filteredItems.map((item) => {
                const selected = selectedIds.includes(item.id)
                return (
                  <div
                    key={item.id}
                    role="option"
                    aria-selected={selected}
                    aria-disabled={item.disabled}
                    tabIndex={item.disabled ? -1 : 0}
                    onClick={() => handleItemClick(item)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        handleItemClick(item)
                      }
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg transition-nilo-fast cursor-pointer",
                      "hover:bg-accent focus:bg-accent focus:outline-none",
                      selected &&
                        !multiple &&
                        "bg-primary/5 border border-primary/20",
                      item.disabled && "opacity-50 cursor-not-allowed pointer-events-none"
                    )}
                  >
                    {renderItem
                      ? renderItem(item, selected)
                      : defaultRenderItem(item, selected)}
                  </div>
                )
              })
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="pt-4 border-t border-border/60">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {cancelLabel}
          </Button>
          <Button onClick={handleConfirm} disabled={selectedIds.length === 0}>
            {confirmLabel}
            {multiple && selectedIds.length > 0 && ` (${selectedIds.length})`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
