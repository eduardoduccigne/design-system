"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function CheckboxPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Checkbox</h1>
        <p className="text-muted-foreground">
          A control that allows the user to toggle between checked and not checked.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { Checkbox } from "@/components/ui/checkbox"`}</code>
        </pre>
      </section>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Checkbox id="default" />
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Checkbox id="terms" />`}</code>
        </pre>
      </section>

      {/* With Label */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Label</h2>
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

      {/* With Description */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Description</h2>
        <div className="p-6 bg-card rounded-lg border">
          <div className="items-top flex space-x-2">
            <Checkbox id="terms2" />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="terms2">Accept terms and conditions</Label>
              <p className="text-sm text-muted-foreground">
                You agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<div className="items-top flex space-x-2">
  <Checkbox id="terms" />
  <div className="grid gap-1.5 leading-none">
    <Label htmlFor="terms">Accept terms and conditions</Label>
    <p className="text-sm text-muted-foreground">
      You agree to our Terms of Service and Privacy Policy.
    </p>
  </div>
</div>`}</code>
        </pre>
      </section>

      {/* States */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">States</h2>
        <div className="p-6 bg-card rounded-lg border space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="unchecked" />
            <Label htmlFor="unchecked">Unchecked</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="checked" defaultChecked />
            <Label htmlFor="checked">Checked</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="disabled" disabled />
            <Label htmlFor="disabled" className="text-muted-foreground">Disabled</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="disabled-checked" disabled defaultChecked />
            <Label htmlFor="disabled-checked" className="text-muted-foreground">Disabled Checked</Label>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Checkbox id="unchecked" />
<Checkbox id="checked" defaultChecked />
<Checkbox id="disabled" disabled />
<Checkbox id="disabled-checked" disabled defaultChecked />`}</code>
        </pre>
      </section>

      {/* Checkbox Group */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Checkbox Group</h2>
        <div className="p-6 bg-card rounded-lg border">
          <div className="space-y-4">
            <h4 className="font-medium">Select your interests</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="music" />
                <Label htmlFor="music">Music</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="sports" />
                <Label htmlFor="sports">Sports</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="gaming" />
                <Label htmlFor="gaming">Gaming</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="reading" />
                <Label htmlFor="reading">Reading</Label>
              </div>
            </div>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<div className="space-y-2">
  <div className="flex items-center space-x-2">
    <Checkbox id="music" />
    <Label htmlFor="music">Music</Label>
  </div>
  <div className="flex items-center space-x-2">
    <Checkbox id="sports" />
    <Label htmlFor="sports">Sports</Label>
  </div>
  {/* ... more options */}
</div>`}</code>
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
                <td className="py-2 pr-4 font-mono text-xs">checked</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 pr-4 font-mono text-xs">false</td>
                <td className="py-2 text-muted-foreground">Controlled checked state</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">defaultChecked</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 pr-4 font-mono text-xs">false</td>
                <td className="py-2 text-muted-foreground">Uncontrolled initial checked state</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">onCheckedChange</td>
                <td className="py-2 pr-4 font-mono text-xs">(checked: boolean) =&gt; void</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Called when checked state changes</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">disabled</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 pr-4 font-mono text-xs">false</td>
                <td className="py-2 text-muted-foreground">Disables the checkbox</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
