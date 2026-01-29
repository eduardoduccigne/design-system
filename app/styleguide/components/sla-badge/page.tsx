"use client"

import { SLABadge } from "@/components/ui/sla-badge"

export default function SLABadgePage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">SLA Badge</h1>
        <p className="text-muted-foreground">
          Status badges for displaying SLA (Service Level Agreement) time indicators with semantic color variants.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { SLABadge } from "@/components/ui/sla-badge"`}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Variants</h2>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <SLABadge variant="critical">+99 min</SLABadge>
          <SLABadge variant="warning">15 min</SLABadge>
          <SLABadge variant="ok">Agora</SLABadge>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<SLABadge variant="critical">+99 min</SLABadge>
<SLABadge variant="warning">15 min</SLABadge>
<SLABadge variant="ok">Agora</SLABadge>`}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Use Cases</h2>
        <div className="space-y-4 p-6 bg-card rounded-lg border">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground w-32">Overdue</span>
            <SLABadge variant="critical">+99 min</SLABadge>
            <SLABadge variant="critical">35 min</SLABadge>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground w-32">At Risk</span>
            <SLABadge variant="warning">15 min</SLABadge>
            <SLABadge variant="warning">5 min</SLABadge>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground w-32">On Time</span>
            <SLABadge variant="ok">Agora</SLABadge>
            <SLABadge variant="ok">2 min</SLABadge>
          </div>
        </div>
      </section>

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
                <td className="py-2 pr-4 font-mono text-xs">&quot;critical&quot; | &quot;warning&quot; | &quot;ok&quot;</td>
                <td className="py-2 pr-4 font-mono text-xs">&quot;ok&quot;</td>
                <td className="py-2 text-muted-foreground">The visual variant of the badge</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">children</td>
                <td className="py-2 pr-4 font-mono text-xs">React.ReactNode</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">The time or status text to display</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">className</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
