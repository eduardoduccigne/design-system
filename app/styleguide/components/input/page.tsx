"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Search, Mail, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export default function InputPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Input</h1>
        <p className="text-muted-foreground">
          Displays a form input field or a component that looks like an input field.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { Input } from "@/components/ui/input"`}</code>
        </pre>
      </section>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default</h2>
        <div className="p-6 bg-card rounded-lg border max-w-sm">
          <Input type="text" placeholder="Enter text..." />
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Input type="text" placeholder="Enter text..." />`}</code>
        </pre>
      </section>

      {/* Input Types */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Input Types</h2>
        <div className="space-y-4 p-6 bg-card rounded-lg border max-w-sm">
          <div className="space-y-2">
            <Label htmlFor="text">Text</Label>
            <Input id="text" type="text" placeholder="Enter text" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="email@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="number">Number</Label>
            <Input id="number" type="number" placeholder="0" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="file">File</Label>
            <Input id="file" type="file" />
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Input type="text" placeholder="Enter text" />
<Input type="email" placeholder="email@example.com" />
<Input type="password" placeholder="Enter password" />
<Input type="number" placeholder="0" />
<Input type="file" />`}</code>
        </pre>
      </section>

      {/* With Label */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Label</h2>
        <div className="p-6 bg-card rounded-lg border max-w-sm">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email-label">Email</Label>
            <Input type="email" id="email-label" placeholder="Email" />
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<div className="grid w-full items-center gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Email" />
</div>`}</code>
        </pre>
      </section>

      {/* With Button */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Button</h2>
        <div className="p-6 bg-card rounded-lg border max-w-sm">
          <div className="flex w-full items-center space-x-2">
            <Input type="email" placeholder="Email" />
            <Button type="submit">Subscribe</Button>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<div className="flex w-full items-center space-x-2">
  <Input type="email" placeholder="Email" />
  <Button type="submit">Subscribe</Button>
</div>`}</code>
        </pre>
      </section>

      {/* With Icon */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Icon</h2>
        <div className="space-y-4 p-6 bg-card rounded-lg border max-w-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-10" placeholder="Search..." />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-10" type="email" placeholder="Email" />
          </div>
          <div className="relative">
            <Input
              className="pr-10"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
  <Input className="pl-10" placeholder="Search..." />
</div>`}</code>
        </pre>
      </section>

      {/* Disabled */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Disabled</h2>
        <div className="p-6 bg-card rounded-lg border max-w-sm">
          <Input disabled type="text" placeholder="Disabled input" />
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Input disabled type="text" placeholder="Disabled input" />`}</code>
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
                <td className="py-2 pr-4 font-mono text-xs">type</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 text-muted-foreground">HTML input type (text, email, password, etc.)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">placeholder</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 text-muted-foreground">Placeholder text</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">disabled</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 text-muted-foreground">Disables the input</td>
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
