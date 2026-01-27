"use client"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Plus, Settings, HelpCircle, Info } from "lucide-react"

export default function TooltipPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Tooltip</h1>
        <p className="text-muted-foreground">
          A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"`}</code>
        </pre>
      </section>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default</h2>
        <div className="p-6 bg-card rounded-lg border">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Add to library</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`}</code>
        </pre>
      </section>

      {/* Placement */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Placement</h2>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Top</Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Tooltip on top</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Bottom</Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Tooltip on bottom</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Left</Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Tooltip on left</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Right</Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Tooltip on right</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<TooltipContent side="top">...</TooltipContent>
<TooltipContent side="bottom">...</TooltipContent>
<TooltipContent side="left">...</TooltipContent>
<TooltipContent side="right">...</TooltipContent>`}</code>
        </pre>
      </section>

      {/* Icon Buttons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Icon Buttons</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Tooltips are essential for icon-only buttons to provide context.
        </p>
        <div className="flex gap-2 p-6 bg-card rounded-lg border">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add new item</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Help & Documentation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline" size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Add new item</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`}</code>
        </pre>
      </section>

      {/* Inline Elements */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Inline Elements</h2>
        <div className="p-6 bg-card rounded-lg border">
          <p className="text-sm">
            You can add tooltips to any inline element{" "}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="inline-flex items-center cursor-help">
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This provides additional context</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>{" "}
            to provide more information.
          </p>
        </div>
      </section>

      {/* With Keyboard Shortcut */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Keyboard Shortcut</h2>
        <div className="p-6 bg-card rounded-lg border">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button>Save</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save changes <kbd className="ml-1 text-xs bg-muted px-1 py-0.5 rounded">⌘S</kbd></p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<TooltipContent>
  <p>Save changes <kbd className="ml-1 text-xs">⌘S</kbd></p>
</TooltipContent>`}</code>
        </pre>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Props</h2>
        <h3 className="text-lg font-medium mt-6">TooltipProvider</h3>
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
                <td className="py-2 pr-4 font-mono text-xs">delayDuration</td>
                <td className="py-2 pr-4 font-mono text-xs">number</td>
                <td className="py-2 pr-4 font-mono text-xs">700</td>
                <td className="py-2 text-muted-foreground">Delay before showing (ms)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">skipDelayDuration</td>
                <td className="py-2 pr-4 font-mono text-xs">number</td>
                <td className="py-2 pr-4 font-mono text-xs">300</td>
                <td className="py-2 text-muted-foreground">Time to skip delay when moving between triggers</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium mt-6">TooltipContent</h3>
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
                <td className="py-2 pr-4 font-mono text-xs">side</td>
                <td className="py-2 pr-4 font-mono text-xs">top | right | bottom | left</td>
                <td className="py-2 pr-4 font-mono text-xs">top</td>
                <td className="py-2 text-muted-foreground">Preferred side</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">sideOffset</td>
                <td className="py-2 pr-4 font-mono text-xs">number</td>
                <td className="py-2 pr-4 font-mono text-xs">4</td>
                <td className="py-2 text-muted-foreground">Distance from trigger</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Tooltip content is announced to screen readers</li>
          <li>Tooltips can be triggered via keyboard focus</li>
          <li>Use descriptive text for icon-only buttons</li>
          <li>Avoid putting interactive elements inside tooltips</li>
        </ul>
      </section>
    </div>
  )
}
