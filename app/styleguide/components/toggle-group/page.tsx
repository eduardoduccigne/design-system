"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react"

export default function ToggleGroupPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Toggle Group</h1>
        <p className="text-muted-foreground">
          A set of two-state buttons that can be toggled on or off.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"`}</code>
        </pre>
      </section>

      {/* Single Selection */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Single Selection</h2>
        <div className="p-6 bg-card rounded-lg border">
          <ToggleGroup type="single" defaultValue="center">
            <ToggleGroupItem value="left" aria-label="Align left">
              <AlignLeft className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
              <AlignCenter className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <AlignRight className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<ToggleGroup type="single" defaultValue="center">
  <ToggleGroupItem value="left" aria-label="Align left">
    <AlignLeft className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Align center">
    <AlignCenter className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Align right">
    <AlignRight className="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>`}</code>
        </pre>
      </section>

      {/* Multiple Selection */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Multiple Selection</h2>
        <div className="p-6 bg-card rounded-lg border">
          <ToggleGroup type="multiple" defaultValue={["bold"]}>
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
              <Underline className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<ToggleGroup type="multiple" defaultValue={["bold"]}>
  <ToggleGroupItem value="bold" aria-label="Toggle bold">
    <Bold className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Toggle italic">
    <Italic className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Toggle underline">
    <Underline className="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>`}</code>
        </pre>
      </section>

      {/* Variants */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Variants</h2>
        <div className="space-y-4 p-6 bg-card rounded-lg border">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Default</p>
            <ToggleGroup type="single" variant="default">
              <ToggleGroupItem value="left"><AlignLeft className="h-4 w-4" /></ToggleGroupItem>
              <ToggleGroupItem value="center"><AlignCenter className="h-4 w-4" /></ToggleGroupItem>
              <ToggleGroupItem value="right"><AlignRight className="h-4 w-4" /></ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Outline</p>
            <ToggleGroup type="single" variant="outline">
              <ToggleGroupItem value="left"><AlignLeft className="h-4 w-4" /></ToggleGroupItem>
              <ToggleGroupItem value="center"><AlignCenter className="h-4 w-4" /></ToggleGroupItem>
              <ToggleGroupItem value="right"><AlignRight className="h-4 w-4" /></ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<ToggleGroup type="single" variant="default">
  {/* items */}
</ToggleGroup>
<ToggleGroup type="single" variant="outline">
  {/* items */}
</ToggleGroup>`}</code>
        </pre>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Sizes</h2>
        <div className="space-y-4 p-6 bg-card rounded-lg border">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Small</p>
            <ToggleGroup type="single" size="sm">
              <ToggleGroupItem value="left"><AlignLeft className="h-3 w-3" /></ToggleGroupItem>
              <ToggleGroupItem value="center"><AlignCenter className="h-3 w-3" /></ToggleGroupItem>
              <ToggleGroupItem value="right"><AlignRight className="h-3 w-3" /></ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Default</p>
            <ToggleGroup type="single" size="default">
              <ToggleGroupItem value="left"><AlignLeft className="h-4 w-4" /></ToggleGroupItem>
              <ToggleGroupItem value="center"><AlignCenter className="h-4 w-4" /></ToggleGroupItem>
              <ToggleGroupItem value="right"><AlignRight className="h-4 w-4" /></ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Large</p>
            <ToggleGroup type="single" size="lg">
              <ToggleGroupItem value="left"><AlignLeft className="h-5 w-5" /></ToggleGroupItem>
              <ToggleGroupItem value="center"><AlignCenter className="h-5 w-5" /></ToggleGroupItem>
              <ToggleGroupItem value="right"><AlignRight className="h-5 w-5" /></ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<ToggleGroup type="single" size="sm">...</ToggleGroup>
<ToggleGroup type="single" size="default">...</ToggleGroup>
<ToggleGroup type="single" size="lg">...</ToggleGroup>`}</code>
        </pre>
      </section>

      {/* Disabled */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Disabled</h2>
        <div className="p-6 bg-card rounded-lg border">
          <ToggleGroup type="single" disabled>
            <ToggleGroupItem value="left"><AlignLeft className="h-4 w-4" /></ToggleGroupItem>
            <ToggleGroupItem value="center"><AlignCenter className="h-4 w-4" /></ToggleGroupItem>
            <ToggleGroupItem value="right"><AlignRight className="h-4 w-4" /></ToggleGroupItem>
          </ToggleGroup>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<ToggleGroup type="single" disabled>
  {/* items */}
</ToggleGroup>`}</code>
        </pre>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Props</h2>
        <h3 className="text-lg font-medium mt-6">ToggleGroup</h3>
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
                <td className="py-2 pr-4 font-mono text-xs">type</td>
                <td className="py-2 pr-4 font-mono text-xs">single | multiple</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Selection type (required)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">variant</td>
                <td className="py-2 pr-4 font-mono text-xs">default | outline</td>
                <td className="py-2 pr-4 font-mono text-xs">default</td>
                <td className="py-2 text-muted-foreground">Visual style</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">size</td>
                <td className="py-2 pr-4 font-mono text-xs">default | sm | lg</td>
                <td className="py-2 pr-4 font-mono text-xs">default</td>
                <td className="py-2 text-muted-foreground">Size of toggle items</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">value</td>
                <td className="py-2 pr-4 font-mono text-xs">string | string[]</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Controlled value</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">defaultValue</td>
                <td className="py-2 pr-4 font-mono text-xs">string | string[]</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Uncontrolled initial value</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">disabled</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 pr-4 font-mono text-xs">false</td>
                <td className="py-2 text-muted-foreground">Disables all items</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
