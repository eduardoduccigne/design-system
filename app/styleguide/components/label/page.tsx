"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function LabelPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Label</h1>
        <p className="text-muted-foreground">
          Renders an accessible label associated with controls.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { Label } from "@/components/ui/label"`}</code>
        </pre>
      </section>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default</h2>
        <div className="p-6 bg-card rounded-lg border max-w-sm">
          <Label htmlFor="email">Email</Label>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Label htmlFor="email">Email</Label>`}</code>
        </pre>
      </section>

      {/* With Input */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Input</h2>
        <div className="p-6 bg-card rounded-lg border max-w-sm">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email-input">Email</Label>
            <Input type="email" id="email-input" placeholder="Email" />
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<div className="grid w-full items-center gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Email" />
</div>`}</code>
        </pre>
      </section>

      {/* With Checkbox */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Checkbox</h2>
        <div className="p-6 bg-card rounded-lg border">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`}</code>
        </pre>
      </section>

      {/* Required Field */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Required Field</h2>
        <div className="p-6 bg-card rounded-lg border max-w-sm">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="required-email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input type="email" id="required-email" placeholder="Email" required />
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Label htmlFor="email">
  Email <span className="text-destructive">*</span>
</Label>`}</code>
        </pre>
      </section>

      {/* With Description */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Description</h2>
        <div className="p-6 bg-card rounded-lg border max-w-sm">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input type="text" id="username" placeholder="Username" />
            <p className="text-sm text-muted-foreground">
              This will be your public display name.
            </p>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<div className="grid w-full items-center gap-1.5">
  <Label htmlFor="username">Username</Label>
  <Input type="text" id="username" placeholder="Username" />
  <p className="text-sm text-muted-foreground">
    This will be your public display name.
  </p>
</div>`}</code>
        </pre>
      </section>

      {/* Disabled */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Disabled</h2>
        <div className="p-6 bg-card rounded-lg border max-w-sm">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="disabled-input" className="text-muted-foreground">Disabled Field</Label>
            <Input type="text" id="disabled-input" placeholder="Disabled" disabled />
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Label htmlFor="disabled" className="text-muted-foreground">
  Disabled Field
</Label>
<Input disabled />`}</code>
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
                <th className="text-left py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">htmlFor</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 text-muted-foreground">ID of the associated form element</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">className</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 text-muted-foreground">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Always use the <code className="text-foreground bg-muted px-1 rounded">htmlFor</code> prop to associate labels with form controls</li>
          <li>The label becomes clickable and focuses the associated input</li>
          <li>Screen readers announce the label when the input is focused</li>
          <li>Use descriptive labels that clearly explain the expected input</li>
        </ul>
      </section>
    </div>
  )
}
