"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from "lucide-react"

export default function CollapsiblePage() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Collapsible</h1>
        <p className="text-muted-foreground">
          An interactive component which expands/collapses a panel.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"`}</code>
        </pre>
      </section>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-[350px] space-y-2"
          >
            <div className="flex items-center justify-between space-x-4 px-4">
              <h4 className="text-sm font-semibold">
                @shadcn starred 3 repositories
              </h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                  <ChevronsUpDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <div className="rounded-md border px-4 py-3 font-mono text-sm">
              @radix-ui/primitives
            </div>
            <CollapsibleContent className="space-y-2">
              <div className="rounded-md border px-4 py-3 font-mono text-sm">
                @radix-ui/colors
              </div>
              <div className="rounded-md border px-4 py-3 font-mono text-sm">
                @stitches/react
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`const [isOpen, setIsOpen] = useState(false)

<Collapsible
  open={isOpen}
  onOpenChange={setIsOpen}
  className="w-[350px] space-y-2"
>
  <div className="flex items-center justify-between">
    <h4 className="text-sm font-semibold">Title</h4>
    <CollapsibleTrigger asChild>
      <Button variant="ghost" size="sm">
        <ChevronsUpDown className="h-4 w-4" />
      </Button>
    </CollapsibleTrigger>
  </div>
  <div className="rounded-md border px-4 py-3">
    Always visible content
  </div>
  <CollapsibleContent className="space-y-2">
    <div className="rounded-md border px-4 py-3">
      Hidden content 1
    </div>
    <div className="rounded-md border px-4 py-3">
      Hidden content 2
    </div>
  </CollapsibleContent>
</Collapsible>`}</code>
        </pre>
      </section>

      {/* Simple Example */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Simple Toggle</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Collapsible className="w-[350px]">
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                Show more details
                <ChevronsUpDown className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 p-4 border rounded-md">
              <p className="text-sm text-muted-foreground">
                This is additional content that can be expanded or collapsed.
                It provides more details when needed without cluttering the initial view.
              </p>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </section>

      {/* Default Open */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default Open</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Collapsible defaultOpen className="w-[350px]">
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                Open by default
                <ChevronsUpDown className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 p-4 border rounded-md">
              <p className="text-sm text-muted-foreground">
                This content is visible by default when the component loads.
              </p>
            </CollapsibleContent>
          </Collapsible>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Collapsible defaultOpen>
  {/* content */}
</Collapsible>`}</code>
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
                <td className="py-2 pr-4 font-mono text-xs">Collapsible</td>
                <td className="py-2 text-muted-foreground">The root component</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">CollapsibleTrigger</td>
                <td className="py-2 text-muted-foreground">The element that toggles the content</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">CollapsibleContent</td>
                <td className="py-2 text-muted-foreground">The collapsible content</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Props</h2>
        <h3 className="text-lg font-medium mt-6">Collapsible</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Prop</th>
                <th className="text-left py-2 pr-4">Type</th>
                <th className="text-left py-2 pr-4">Default</th>
                <th className="text-left py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">open</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Controlled open state</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">defaultOpen</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 pr-4 font-mono text-xs">false</td>
                <td className="py-2 text-muted-foreground">Uncontrolled initial open state</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">onOpenChange</td>
                <td className="py-2 pr-4 font-mono text-xs">(open: boolean) =&gt; void</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Called when open state changes</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">disabled</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 pr-4 font-mono text-xs">false</td>
                <td className="py-2 text-muted-foreground">Disables the collapsible</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Collapsible vs Accordion */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Collapsible vs Accordion</h2>
        <div className="p-4 bg-muted rounded-lg">
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li><strong className="text-foreground">Collapsible:</strong> Single expandable section, standalone use</li>
            <li><strong className="text-foreground">Accordion:</strong> Multiple expandable sections, can control how many are open at once</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
