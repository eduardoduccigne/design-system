"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function RadioGroupPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Radio Group</h1>
        <p className="text-muted-foreground">
          A set of checkable buttons where only one can be checked at a time.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"`}</code>
        </pre>
      </section>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default</h2>
        <div className="p-6 bg-card rounded-lg border">
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">Option One</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">Option Two</Label>
            </div>
          </RadioGroup>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<RadioGroup defaultValue="option-one">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Option One</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-two" id="option-two" />
    <Label htmlFor="option-two">Option Two</Label>
  </div>
</RadioGroup>`}</code>
        </pre>
      </section>

      {/* With Description */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Description</h2>
        <div className="p-6 bg-card rounded-lg border">
          <RadioGroup defaultValue="comfortable" className="space-y-3">
            <div className="flex items-start space-x-3">
              <RadioGroupItem value="default" id="r1" className="mt-1" />
              <div className="grid gap-1">
                <Label htmlFor="r1">Default</Label>
                <p className="text-sm text-muted-foreground">
                  The default spacing between items.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <RadioGroupItem value="comfortable" id="r2" className="mt-1" />
              <div className="grid gap-1">
                <Label htmlFor="r2">Comfortable</Label>
                <p className="text-sm text-muted-foreground">
                  More space between items for better readability.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <RadioGroupItem value="compact" id="r3" className="mt-1" />
              <div className="grid gap-1">
                <Label htmlFor="r3">Compact</Label>
                <p className="text-sm text-muted-foreground">
                  Less space between items for denser layouts.
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<RadioGroup defaultValue="comfortable" className="space-y-3">
  <div className="flex items-start space-x-3">
    <RadioGroupItem value="default" id="r1" className="mt-1" />
    <div className="grid gap-1">
      <Label htmlFor="r1">Default</Label>
      <p className="text-sm text-muted-foreground">
        The default spacing between items.
      </p>
    </div>
  </div>
  {/* ... more options */}
</RadioGroup>`}</code>
        </pre>
      </section>

      {/* Horizontal Layout */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Horizontal Layout</h2>
        <div className="p-6 bg-card rounded-lg border">
          <RadioGroup defaultValue="all" className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unread" id="unread" />
              <Label htmlFor="unread">Unread</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="archived" id="archived" />
              <Label htmlFor="archived">Archived</Label>
            </div>
          </RadioGroup>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<RadioGroup defaultValue="all" className="flex space-x-4">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="all" id="all" />
    <Label htmlFor="all">All</Label>
  </div>
  {/* ... more options */}
</RadioGroup>`}</code>
        </pre>
      </section>

      {/* Disabled */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Disabled</h2>
        <div className="p-6 bg-card rounded-lg border">
          <RadioGroup defaultValue="option-one" disabled>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="d1" />
              <Label htmlFor="d1" className="text-muted-foreground">Option One</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="d2" />
              <Label htmlFor="d2" className="text-muted-foreground">Option Two</Label>
            </div>
          </RadioGroup>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<RadioGroup defaultValue="option-one" disabled>
  {/* options */}
</RadioGroup>`}</code>
        </pre>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Props</h2>
        <h3 className="text-lg font-medium mt-6">RadioGroup</h3>
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
                <td className="py-2 pr-4 font-mono text-xs">value</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Controlled value</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">defaultValue</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Uncontrolled initial value</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">onValueChange</td>
                <td className="py-2 pr-4 font-mono text-xs">(value: string) =&gt; void</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Called when value changes</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">disabled</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 pr-4 font-mono text-xs">false</td>
                <td className="py-2 text-muted-foreground">Disables all radio items</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium mt-6">RadioGroupItem</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Prop</th>
                <th className="text-left py-2 pr-4">Type</th>
                <th className="text-left py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">value</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 text-muted-foreground">The value of this radio item</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">disabled</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 text-muted-foreground">Disables this specific item</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
