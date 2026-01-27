"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function TextareaPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Textarea</h1>
        <p className="text-muted-foreground">
          Displays a form textarea or a component that looks like a textarea.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { Textarea } from "@/components/ui/textarea"`}</code>
        </pre>
      </section>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default</h2>
        <div className="p-6 bg-card rounded-lg border max-w-md">
          <Textarea placeholder="Type your message here." />
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Textarea placeholder="Type your message here." />`}</code>
        </pre>
      </section>

      {/* With Label */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Label</h2>
        <div className="p-6 bg-card rounded-lg border max-w-md">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="message">Your message</Label>
            <Textarea placeholder="Type your message here." id="message" />
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<div className="grid w-full gap-1.5">
  <Label htmlFor="message">Your message</Label>
  <Textarea placeholder="Type your message here." id="message" />
</div>`}</code>
        </pre>
      </section>

      {/* With Helper Text */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Helper Text</h2>
        <div className="p-6 bg-card rounded-lg border max-w-md">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="bio">Bio</Label>
            <Textarea placeholder="Tell us about yourself" id="bio" />
            <p className="text-sm text-muted-foreground">
              Your bio will be displayed on your profile.
            </p>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<div className="grid w-full gap-1.5">
  <Label htmlFor="bio">Bio</Label>
  <Textarea placeholder="Tell us about yourself" id="bio" />
  <p className="text-sm text-muted-foreground">
    Your bio will be displayed on your profile.
  </p>
</div>`}</code>
        </pre>
      </section>

      {/* With Button */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Button</h2>
        <div className="p-6 bg-card rounded-lg border max-w-md">
          <div className="grid w-full gap-2">
            <Textarea placeholder="Type your message here." />
            <Button>Send message</Button>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<div className="grid w-full gap-2">
  <Textarea placeholder="Type your message here." />
  <Button>Send message</Button>
</div>`}</code>
        </pre>
      </section>

      {/* Disabled */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Disabled</h2>
        <div className="p-6 bg-card rounded-lg border max-w-md">
          <Textarea placeholder="Disabled textarea" disabled />
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Textarea placeholder="Disabled textarea" disabled />`}</code>
        </pre>
      </section>

      {/* Custom Rows */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Custom Rows</h2>
        <div className="p-6 bg-card rounded-lg border max-w-md space-y-4">
          <div className="grid w-full gap-1.5">
            <Label>3 rows (small)</Label>
            <Textarea placeholder="Small textarea" rows={3} />
          </div>
          <div className="grid w-full gap-1.5">
            <Label>8 rows (large)</Label>
            <Textarea placeholder="Large textarea" rows={8} />
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Textarea placeholder="Small textarea" rows={3} />
<Textarea placeholder="Large textarea" rows={8} />`}</code>
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
                <td className="py-2 pr-4 font-mono text-xs">placeholder</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 text-muted-foreground">Placeholder text</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">rows</td>
                <td className="py-2 pr-4 font-mono text-xs">number</td>
                <td className="py-2 text-muted-foreground">Number of visible text lines</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">disabled</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 text-muted-foreground">Disables the textarea</td>
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
    </div>
  )
}
