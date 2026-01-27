"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SwitchPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Switch</h1>
        <p className="text-muted-foreground">
          A control that allows the user to toggle between on and off states.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { Switch } from "@/components/ui/switch"`}</code>
        </pre>
      </section>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Switch />
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Switch />`}</code>
        </pre>
      </section>

      {/* With Label */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Label</h2>
        <div className="p-6 bg-card rounded-lg border">
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Airplane Mode</Label>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>`}</code>
        </pre>
      </section>

      {/* States */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">States</h2>
        <div className="p-6 bg-card rounded-lg border space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="off" />
            <Label htmlFor="off">Off</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="on" defaultChecked />
            <Label htmlFor="on">On</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="disabled-off" disabled />
            <Label htmlFor="disabled-off" className="text-muted-foreground">Disabled Off</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="disabled-on" disabled defaultChecked />
            <Label htmlFor="disabled-on" className="text-muted-foreground">Disabled On</Label>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Switch id="off" />
<Switch id="on" defaultChecked />
<Switch id="disabled" disabled />
<Switch id="disabled-on" disabled defaultChecked />`}</code>
        </pre>
      </section>

      {/* Settings Example */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Settings Example</h2>
        <div className="p-6 bg-card rounded-lg border">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications about new messages</p>
              </div>
              <Switch id="notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketing">Marketing emails</Label>
                <p className="text-sm text-muted-foreground">Receive emails about new products and features</p>
              </div>
              <Switch id="marketing" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="security">Security emails</Label>
                <p className="text-sm text-muted-foreground">Receive emails about your account security</p>
              </div>
              <Switch id="security" defaultChecked />
            </div>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<div className="flex items-center justify-between">
  <div className="space-y-0.5">
    <Label htmlFor="notifications">Notifications</Label>
    <p className="text-sm text-muted-foreground">
      Receive notifications about new messages
    </p>
  </div>
  <Switch id="notifications" defaultChecked />
</div>`}</code>
        </pre>
      </section>

      {/* AI Variant */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">AI Variant</h2>
        <p className="text-muted-foreground">
          Uses the AI gradient when checked, matching the AI design language used across buttons and other components.
        </p>
        <div className="p-6 bg-card rounded-lg border space-y-4">
          <div className="flex items-center space-x-2">
            <Switch variant="ai" id="ai-off" />
            <Label htmlFor="ai-off">Off</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch variant="ai" id="ai-on" defaultChecked />
            <Label htmlFor="ai-on">On</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch variant="ai" id="ai-disabled" disabled defaultChecked />
            <Label htmlFor="ai-disabled" className="text-muted-foreground">Disabled On</Label>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Switch variant="ai" />
<Switch variant="ai" defaultChecked />
<Switch variant="ai" disabled defaultChecked />`}</code>
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
                <td className="py-2 pr-4 font-mono text-xs">&quot;default&quot; | &quot;ai&quot;</td>
                <td className="py-2 pr-4 font-mono text-xs">&quot;default&quot;</td>
                <td className="py-2 text-muted-foreground">Visual style variant. AI uses gradient colors when checked.</td>
              </tr>
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
                <td className="py-2 text-muted-foreground">Disables the switch</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
