"use client"

import { Badge } from "@/components/ui/badge"
import { CountBadge } from "@/components/ui/count-badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, Filter, Mail } from "lucide-react"

export default function BadgePage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Badge</h1>
        <p className="text-muted-foreground">
          Displays a badge or a component that looks like a badge.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { Badge } from "@/components/ui/badge"`}</code>
        </pre>
      </section>

      {/* Variants */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Variants</h2>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>`}</code>
        </pre>
      </section>

      {/* Use Cases */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Use Cases</h2>
        <div className="space-y-4 p-6 bg-card rounded-lg border">
          <div className="flex items-center gap-2">
            <span className="font-medium">Status:</span>
            <Badge className="border-success bg-success text-success-foreground hover:bg-success/90">Active</Badge>
            <Badge className="border-warning bg-warning text-warning-foreground hover:bg-warning/90">Pending</Badge>
            <Badge variant="destructive">Inactive</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Categories:</span>
            <Badge variant="outline">React</Badge>
            <Badge variant="outline">TypeScript</Badge>
            <Badge variant="outline">Tailwind</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Notifications:</span>
            <Badge>3 new</Badge>
            <Badge variant="secondary">99+</Badge>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`{/* Status badges with semantic colors */}
<Badge className="border-success bg-success text-success-foreground">Active</Badge>
<Badge className="border-warning bg-warning text-warning-foreground">Pending</Badge>
<Badge variant="destructive">Inactive</Badge>

{/* Category tags */}
<Badge variant="outline">React</Badge>

{/* Notification count */}
<Badge>3 new</Badge>`}</code>
        </pre>
      </section>

      {/* Custom Colors */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Custom Colors</h2>
        <p className="text-sm text-muted-foreground">
          Use CSS variables to create semantic badge colors.
        </p>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <Badge className="border-success bg-success text-success-foreground hover:bg-success/90">Success</Badge>
          <Badge className="border-warning bg-warning text-warning-foreground hover:bg-warning/90">Warning</Badge>
          <Badge className="border-info bg-info text-info-foreground hover:bg-info/90">Info</Badge>
          <Badge variant="destructive">Error</Badge>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Badge className="border-success bg-success text-success-foreground hover:bg-success/90">
  Success
</Badge>
<Badge className="border-warning bg-warning text-warning-foreground hover:bg-warning/90">
  Warning
</Badge>
<Badge className="border-info bg-info text-info-foreground hover:bg-info/90">
  Info
</Badge>`}</code>
        </pre>
      </section>

      {/* Count Badge */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Count Badge</h2>
        <p className="text-muted-foreground">
          A small circular overlay badge that displays a count on top of avatars, icons, or any element.
        </p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { CountBadge } from "@/components/ui/count-badge"`}</code>
        </pre>
      </section>

      {/* Count Badge - On Avatar */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Count Badge on Avatar</h2>
        <div className="flex items-center gap-6 p-6 bg-card rounded-lg border">
          <CountBadge count={3}>
            <Avatar>
              <AvatarFallback variant="professional">JD</AvatarFallback>
            </Avatar>
          </CountBadge>
          <CountBadge count={12}>
            <Avatar>
              <AvatarFallback variant="patient">AB</AvatarFallback>
            </Avatar>
          </CountBadge>
          <CountBadge count={150}>
            <Avatar>
              <AvatarFallback variant="professional">MK</AvatarFallback>
            </Avatar>
          </CountBadge>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<CountBadge count={3}>
  <Avatar>
    <AvatarFallback variant="professional">JD</AvatarFallback>
  </Avatar>
</CountBadge>

<CountBadge count={150}>
  <Avatar>
    <AvatarFallback>MK</AvatarFallback>
  </Avatar>
</CountBadge>`}</code>
        </pre>
      </section>

      {/* Count Badge - On Icons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Count Badge on Icons</h2>
        <div className="flex items-center gap-6 p-6 bg-card rounded-lg border">
          <CountBadge count={5}>
            <Bell className="h-6 w-6" />
          </CountBadge>
          <CountBadge count={3}>
            <Mail className="h-6 w-6" />
          </CountBadge>
          <CountBadge count={2}>
            <Filter className="h-6 w-6" />
          </CountBadge>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<CountBadge count={5}>
  <Bell className="h-6 w-6" />
</CountBadge>

<CountBadge count={3}>
  <Mail className="h-6 w-6" />
</CountBadge>`}</code>
        </pre>
      </section>

      {/* Count Badge - Dot Variant */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Dot Variant</h2>
        <p className="text-muted-foreground">
          Use the dot variant for a simple presence indicator without a count.
        </p>
        <div className="flex items-center gap-6 p-6 bg-card rounded-lg border">
          <CountBadge dot>
            <Avatar>
              <AvatarFallback variant="professional">JD</AvatarFallback>
            </Avatar>
          </CountBadge>
          <CountBadge dot>
            <Bell className="h-6 w-6" />
          </CountBadge>
          <CountBadge dot variant="default">
            <Mail className="h-6 w-6" />
          </CountBadge>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<CountBadge dot>
  <Avatar>...</Avatar>
</CountBadge>

<CountBadge dot>
  <Bell className="h-6 w-6" />
</CountBadge>

<CountBadge dot variant="default">
  <Mail className="h-6 w-6" />
</CountBadge>`}</code>
        </pre>
      </section>

      {/* Count Badge - Variants */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Count Badge Variants</h2>
        <div className="flex items-center gap-6 p-6 bg-card rounded-lg border">
          <CountBadge count={5}>
            <Bell className="h-6 w-6" />
          </CountBadge>
          <CountBadge count={5} variant="destructive">
            <Bell className="h-6 w-6" />
          </CountBadge>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`{/* Default (dark grey) */}
<CountBadge count={5}>
  <Bell className="h-6 w-6" />
</CountBadge>

{/* Destructive (red) */}
<CountBadge count={5} variant="destructive">
  <Bell className="h-6 w-6" />
</CountBadge>`}</code>
        </pre>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Badge Props</h2>
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
                <td className="py-2 pr-4 font-mono text-xs">default | secondary | destructive | outline</td>
                <td className="py-2 pr-4 font-mono text-xs">default</td>
                <td className="py-2 text-muted-foreground">The visual style of the badge</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">className</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Additional CSS classes for custom styling</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Count Badge Props */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Count Badge Props</h2>
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
                <td className="py-2 pr-4 font-mono text-xs">count</td>
                <td className="py-2 pr-4 font-mono text-xs">number</td>
                <td className="py-2 pr-4 font-mono text-xs">0</td>
                <td className="py-2 text-muted-foreground">The count to display</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">max</td>
                <td className="py-2 pr-4 font-mono text-xs">number</td>
                <td className="py-2 pr-4 font-mono text-xs">99</td>
                <td className="py-2 text-muted-foreground">Maximum count before showing &quot;max+&quot;</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">showZero</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 pr-4 font-mono text-xs">false</td>
                <td className="py-2 text-muted-foreground">Whether to show the badge when count is 0</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">dot</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 pr-4 font-mono text-xs">false</td>
                <td className="py-2 text-muted-foreground">Show a small dot instead of a count</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">variant</td>
                <td className="py-2 pr-4 font-mono text-xs">&quot;default&quot; | &quot;destructive&quot;</td>
                <td className="py-2 pr-4 font-mono text-xs">&quot;default&quot;</td>
                <td className="py-2 text-muted-foreground">Color variant of the count badge</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
