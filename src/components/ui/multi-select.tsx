"use client"

import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Badge } from "./badge"
import { cn } from "../../lib/utils"

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

export interface MultiSelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface MultiSelectProps {
  options: MultiSelectOption[]
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  maxDisplayedItems?: number
  initialDisplayCount?: number
  displayIncrement?: number
  disabled?: boolean
  className?: string
}

export function MultiSelect({
  options,
  value: controlledValue,
  defaultValue = [],
  onValueChange,
  placeholder = "Select options...",
  searchPlaceholder = "Search...",
  emptyMessage = "No options found",
  maxDisplayedItems = 3,
  initialDisplayCount = 10,
  displayIncrement = 10,
  disabled = false,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue)
  const [displayCount, setDisplayCount] = React.useState(initialDisplayCount)

  const isControlled = controlledValue !== undefined
  const selectedValues = isControlled ? controlledValue : internalValue

  const handleValueChange = (newValue: string[]) => {
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }

  const filteredOptions = React.useMemo(() => {
    if (!searchQuery) return options
    const query = searchQuery.toLowerCase()
    return options.filter((option) =>
      option.label.toLowerCase().includes(query)
    )
  }, [options, searchQuery])

  const selectedOptions = React.useMemo(() => {
    return options.filter((option) => selectedValues.includes(option.value))
  }, [options, selectedValues])

  const handleToggle = (optionValue: string) => {
    const option = options.find((o) => o.value === optionValue)
    if (option?.disabled) return

    const newValue = selectedValues.includes(optionValue)
      ? selectedValues.filter((v) => v !== optionValue)
      : [...selectedValues, optionValue]
    handleValueChange(newValue)
  }

  const handleRemove = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation()
    handleValueChange(selectedValues.filter((v) => v !== optionValue))
  }

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation()
    handleValueChange([])
  }

  React.useEffect(() => {
    if (!open) {
      setSearchQuery("")
      setDisplayCount(initialDisplayCount)
    }
  }, [open, initialDisplayCount])

  React.useEffect(() => {
    setDisplayCount(initialDisplayCount)
  }, [searchQuery, initialDisplayCount])

  const displayedItems = selectedOptions.slice(0, maxDisplayedItems)
  const remainingCount = selectedOptions.length - maxDisplayedItems

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          disabled={disabled}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        >
          <div className="flex gap-1 flex-1 items-center min-w-0">
            {selectedOptions.length === 0 ? (
              <span className="text-muted-foreground">{placeholder}</span>
            ) : (
              <>
                <div className="flex gap-1 items-center overflow-hidden">
                  {displayedItems.map((option) => (
                    <Badge
                      key={option.value}
                      variant="secondary"
                      className="shrink-0 gap-1 pr-1"
                    >
                      {option.label}
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => handleRemove(option.value, e)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            handleRemove(option.value, e as unknown as React.MouseEvent)
                          }
                        }}
                        className="rounded-sm hover:bg-muted-foreground/20 cursor-pointer"
                      >
                        <X className="h-3 w-3" />
                      </span>
                    </Badge>
                  ))}
                </div>
                {remainingCount > 0 && (
                  <Badge variant="secondary" className="shrink-0">+{remainingCount}</Badge>
                )}
              </>
            )}
          </div>
          <div className="flex items-center gap-1 ml-2">
            {selectedOptions.length > 0 && (
              <span
                role="button"
                tabIndex={0}
                onClick={handleClearAll}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleClearAll(e as unknown as React.MouseEvent)
                  }
                }}
                className="rounded-sm p-0.5 hover:bg-muted cursor-pointer"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </span>
            )}
            <ChevronDown className="h-4 w-4 opacity-50 shrink-0" />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
      >
        <div className="p-2 border-b border-border/60">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="max-h-60 overflow-y-auto p-1">
          {filteredOptions.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              {emptyMessage}
            </div>
          ) : (
            <>
              {filteredOptions.slice(0, displayCount).map((option) => {
                const isSelected = selectedValues.includes(option.value)
                return (
                  <div
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={option.disabled}
                    tabIndex={option.disabled ? -1 : 0}
                    onClick={() => handleToggle(option.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        handleToggle(option.value)
                      }
                    }}
                    className={cn(
                      "flex cursor-pointer select-none items-center gap-2 rounded-sm py-1.5 px-2 text-sm outline-none transition-colors",
                      "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                      option.disabled && "pointer-events-none opacity-50"
                    )}
                  >
                    <CheckboxIndicator checked={isSelected} />
                    {option.label}
                  </div>
                )
              })}
              {displayCount < filteredOptions.length && (
                <button
                  type="button"
                  onClick={() => setDisplayCount((prev) => prev + displayIncrement)}
                  className="w-full py-1.5 px-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-sm transition-colors cursor-pointer"
                >
                  Load more ({filteredOptions.length - displayCount} remaining)
                </button>
              )}
            </>
          )}
        </div>
        {selectedValues.length > 0 && (
          <div className="border-t border-border/60 p-1">
            <button
              type="button"
              onClick={handleClearAll}
              className="w-full py-1.5 px-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-sm transition-colors cursor-pointer"
            >
              Clear selection
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
