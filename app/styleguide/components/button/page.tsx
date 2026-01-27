"use client"

import { Button } from "@/components/ui/button"
import { Loader2, Mail, ChevronRight, Download } from "lucide-react"

export default function ButtonPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Button</h1>
        <p className="text-muted-foreground">
          Displays a button or a component that looks like a button.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { Button } from "@/components/ui/button"`}</code>
        </pre>
      </section>

      {/* Variants */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Variants</h2>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`}</code>
        </pre>
      </section>

      {/* AI Variants */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">AI Variants</h2>
        <p className="text-muted-foreground">
          Special variants for AI-powered features. Use these to distinguish AI functionality from standard actions.
        </p>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <Button variant="ai">
            <svg viewBox="0 0 80 80" fill="currentColor" className="h-4 w-4">
              <path d="M80 40C57.908 40 40 57.91 40 80C40 57.91 22.09 40 0 40C22.09 40 40 22.092 40 0C40 22.092 57.908 40 80 40Z" />
            </svg>
            AI
          </Button>
          <Button variant="ai-secondary">
            <svg viewBox="0 0 80 80" fill="currentColor" className="h-4 w-4">
              <path d="M80 40C57.908 40 40 57.91 40 80C40 57.91 22.09 40 0 40C22.09 40 40 22.092 40 0C40 22.092 57.908 40 80 40Z" />
            </svg>
            AI Secondary
          </Button>
          <Button variant="ai-outline">
            <svg viewBox="0 0 80 80" fill="currentColor" className="h-4 w-4">
              <path d="M80 40C57.908 40 40 57.91 40 80C40 57.91 22.09 40 0 40C22.09 40 40 22.092 40 0C40 22.092 57.908 40 80 40Z" />
            </svg>
            AI Outline
          </Button>
          <Button variant="ai-ghost">
            <svg viewBox="0 0 80 80" fill="currentColor" className="h-4 w-4">
              <path d="M80 40C57.908 40 40 57.91 40 80C40 57.91 22.09 40 0 40C22.09 40 40 22.092 40 0C40 22.092 57.908 40 80 40Z" />
            </svg>
            AI Ghost
          </Button>
          <Button variant="ai-link">
            <svg viewBox="0 0 80 80" fill="currentColor" className="h-4 w-4">
              <path d="M80 40C57.908 40 40 57.91 40 80C40 57.91 22.09 40 0 40C22.09 40 40 22.092 40 0C40 22.092 57.908 40 80 40Z" />
            </svg>
            AI Link
          </Button>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Button variant="ai">AI</Button>
<Button variant="ai-secondary">AI Secondary</Button>
<Button variant="ai-outline">AI Outline</Button>
<Button variant="ai-ghost">AI Ghost</Button>
<Button variant="ai-link">AI Link</Button>`}</code>
        </pre>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Sizes</h2>
        <div className="flex flex-wrap items-center gap-4 p-6 bg-card rounded-lg border">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon"><Mail className="h-4 w-4" /></Button>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Mail className="h-4 w-4" /></Button>`}</code>
        </pre>
      </section>

      {/* With Icon */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Icon</h2>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <Button>
            <Mail className="mr-2 h-4 w-4" /> Login with Email
          </Button>
          <Button variant="secondary">
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
          <Button variant="outline">
            Continue <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Button>
  <Mail className="mr-2 h-4 w-4" /> Login with Email
</Button>`}</code>
        </pre>
      </section>

      {/* Loading State */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Loading State</h2>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Please wait
</Button>`}</code>
        </pre>
      </section>

      {/* Disabled */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Disabled</h2>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <Button disabled>Default</Button>
          <Button variant="secondary" disabled>Secondary</Button>
          <Button variant="destructive" disabled>Destructive</Button>
          <Button variant="outline" disabled>Outline</Button>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Button disabled>Disabled</Button>`}</code>
        </pre>
      </section>

      {/* As Child */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">As Link</h2>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <Button asChild>
            <a href="#">Link Button</a>
          </Button>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Button asChild>
  <a href="#">Link Button</a>
</Button>`}</code>
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
                <td className="py-2 pr-4 font-mono text-xs">default | destructive | outline | secondary | ghost | link | ai | ai-secondary | ai-outline | ai-ghost | ai-link</td>
                <td className="py-2 pr-4 font-mono text-xs">default</td>
                <td className="py-2 text-muted-foreground">The visual style of the button</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">size</td>
                <td className="py-2 pr-4 font-mono text-xs">default | sm | lg | icon</td>
                <td className="py-2 pr-4 font-mono text-xs">default</td>
                <td className="py-2 text-muted-foreground">The size of the button</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">asChild</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 pr-4 font-mono text-xs">false</td>
                <td className="py-2 text-muted-foreground">Render as a child component</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
