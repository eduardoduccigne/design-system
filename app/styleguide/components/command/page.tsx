"use client"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useState, useEffect } from "react"
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react"

export default function CommandPage() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Command</h1>
        <p className="text-muted-foreground">
          Fast, composable, unstyled command menu for React.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"`}</code>
        </pre>
      </section>

      {/* Inline */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Inline Command</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Command className="rounded-lg border shadow-md max-w-[450px]">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                  <Smile className="mr-2 h-4 w-4" />
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem>
                  <Calculator className="mr-2 h-4 w-4" />
                  <span>Calculator</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Command className="rounded-lg border shadow-md">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>
        <Calendar className="mr-2 h-4 w-4" />
        <span>Calendar</span>
      </CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>
        <User className="mr-2 h-4 w-4" />
        <span>Profile</span>
        <CommandShortcut>⌘P</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}</code>
        </pre>
      </section>

      {/* Dialog */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Command Dialog</h2>
        <p className="text-sm text-muted-foreground">
          Press <kbd className="bg-muted px-2 py-0.5 rounded border">⌘K</kbd> to open the command menu.
        </p>
        <div className="p-6 bg-card rounded-lg border">
          <p className="text-sm text-muted-foreground">
            Press{" "}
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>{" "}
            to open
          </p>
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                  <Smile className="mr-2 h-4 w-4" />
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem>
                  <Calculator className="mr-2 h-4 w-4" />
                  <span>Calculator</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`const [open, setOpen] = useState(false)

useEffect(() => {
  const down = (e: KeyboardEvent) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      setOpen((open) => !open)
    }
  }
  document.addEventListener("keydown", down)
  return () => document.removeEventListener("keydown", down)
}, [])

<CommandDialog open={open} onOpenChange={setOpen}>
  {/* Same content as Command */}
</CommandDialog>`}</code>
        </pre>
      </section>

      {/* Components */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Components</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Component</th>
                <th className="text-left py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">Command</td>
                <td className="py-2 text-muted-foreground">The root component</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">CommandDialog</td>
                <td className="py-2 text-muted-foreground">Command in a dialog overlay</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">CommandInput</td>
                <td className="py-2 text-muted-foreground">Search input field</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">CommandList</td>
                <td className="py-2 text-muted-foreground">Container for items</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">CommandEmpty</td>
                <td className="py-2 text-muted-foreground">Shown when no results</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">CommandGroup</td>
                <td className="py-2 text-muted-foreground">Groups items with heading</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">CommandItem</td>
                <td className="py-2 text-muted-foreground">Individual command item</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">CommandSeparator</td>
                <td className="py-2 text-muted-foreground">Visual separator</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">CommandShortcut</td>
                <td className="py-2 text-muted-foreground">Keyboard shortcut hint</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Use Cases */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Use Cases</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Command palette (⌘K menus)</li>
          <li>Search interfaces</li>
          <li>Autocomplete dropdowns</li>
          <li>Quick action menus</li>
        </ul>
      </section>
    </div>
  )
}
