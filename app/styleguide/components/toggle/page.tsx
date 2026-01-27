"use client"

import { Toggle } from "@/components/ui/toggle"
import { Bold, Italic, Underline } from "lucide-react"

export default function TogglePage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Toggle</h1>
        <p className="text-muted-foreground">
          A two-state button that can be either on or off.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { Toggle } from "@/components/ui/toggle"`}</code>
        </pre>
      </section>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Toggle aria-label="Toggle bold">
            <Bold className="h-4 w-4" />
          </Toggle>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Toggle aria-label="Toggle bold">
  <Bold className="h-4 w-4" />
</Toggle>`}</code>
        </pre>
      </section>

      {/* Variants */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Variants</h2>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <Toggle variant="default" aria-label="Toggle default">
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle variant="outline" aria-label="Toggle outline">
            <Italic className="h-4 w-4" />
          </Toggle>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Toggle variant="default" aria-label="Toggle default">
  <Bold className="h-4 w-4" />
</Toggle>
<Toggle variant="outline" aria-label="Toggle outline">
  <Italic className="h-4 w-4" />
</Toggle>`}</code>
        </pre>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Sizes</h2>
        <div className="flex flex-wrap items-center gap-4 p-6 bg-card rounded-lg border">
          <Toggle size="sm" aria-label="Toggle small">
            <Bold className="h-3 w-3" />
          </Toggle>
          <Toggle size="default" aria-label="Toggle default">
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle size="lg" aria-label="Toggle large">
            <Bold className="h-5 w-5" />
          </Toggle>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Toggle size="sm" aria-label="Toggle small">
  <Bold className="h-3 w-3" />
</Toggle>
<Toggle size="default" aria-label="Toggle default">
  <Bold className="h-4 w-4" />
</Toggle>
<Toggle size="lg" aria-label="Toggle large">
  <Bold className="h-5 w-5" />
</Toggle>`}</code>
        </pre>
      </section>

      {/* With Text */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Text</h2>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <Toggle aria-label="Toggle bold">
            <Bold className="mr-2 h-4 w-4" />
            Bold
          </Toggle>
          <Toggle aria-label="Toggle italic">
            <Italic className="mr-2 h-4 w-4" />
            Italic
          </Toggle>
          <Toggle aria-label="Toggle underline">
            <Underline className="mr-2 h-4 w-4" />
            Underline
          </Toggle>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Toggle aria-label="Toggle bold">
  <Bold className="mr-2 h-4 w-4" />
  Bold
</Toggle>`}</code>
        </pre>
      </section>

      {/* States */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">States</h2>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <Toggle aria-label="Default">
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle defaultPressed aria-label="Pressed">
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle disabled aria-label="Disabled">
            <Bold className="h-4 w-4" />
          </Toggle>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Toggle aria-label="Default">
  <Bold className="h-4 w-4" />
</Toggle>
<Toggle defaultPressed aria-label="Pressed">
  <Bold className="h-4 w-4" />
</Toggle>
<Toggle disabled aria-label="Disabled">
  <Bold className="h-4 w-4" />
</Toggle>`}</code>
        </pre>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Props</h2>
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
                <td className="py-2 pr-4 font-mono text-xs">variant</td>
                <td className="py-2 pr-4 font-mono text-xs">default | outline</td>
                <td className="py-2 pr-4 font-mono text-xs">default</td>
                <td className="py-2 text-muted-foreground">The visual style</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">size</td>
                <td className="py-2 pr-4 font-mono text-xs">default | sm | lg</td>
                <td className="py-2 pr-4 font-mono text-xs">default</td>
                <td className="py-2 text-muted-foreground">The size</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">pressed</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Controlled pressed state</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">defaultPressed</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 pr-4 font-mono text-xs">false</td>
                <td className="py-2 text-muted-foreground">Uncontrolled initial pressed state</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">onPressedChange</td>
                <td className="py-2 pr-4 font-mono text-xs">(pressed: boolean) =&gt; void</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Called when pressed changes</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">disabled</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 pr-4 font-mono text-xs">false</td>
                <td className="py-2 text-muted-foreground">Disables the toggle</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
