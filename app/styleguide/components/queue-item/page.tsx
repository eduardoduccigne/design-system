"use client"

import { QueueItem, QueueList } from "@/components/ui/queue-item"

export default function QueueItemPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Queue Item</h1>
        <p className="text-muted-foreground">
          Sidebar list items for queue navigation with status indicators and counts.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { QueueItem, QueueList } from "@/components/ui/queue-item"`}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Basic Usage</h2>
        <div className="w-64 bg-card rounded-lg border overflow-hidden">
          <QueueList>
            <QueueItem active count={94} dotVariant="critical">
              Meus atendimentos
            </QueueItem>
            <QueueItem count={204} dotVariant="warning">
              Triagem
            </QueueItem>
            <QueueItem count={87} dotVariant="warning">
              Urgências
            </QueueItem>
            <QueueItem count={33} dotVariant="ok">
              Agendamentos
            </QueueItem>
            <QueueItem count="1.9k">
              Finalizadas
            </QueueItem>
          </QueueList>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<QueueList>
  <QueueItem active count={94} dotVariant="critical">
    Meus atendimentos
  </QueueItem>
  <QueueItem count={204} dotVariant="warning">
    Triagem
  </QueueItem>
  <QueueItem count={33} dotVariant="ok">
    Agendamentos
  </QueueItem>
  <QueueItem count="1.9k">
    Finalizadas
  </QueueItem>
</QueueList>`}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Status Dot Variants</h2>
        <div className="w-64 bg-card rounded-lg border overflow-hidden">
          <QueueList>
            <QueueItem count={12} dotVariant="critical">
              Critical
            </QueueItem>
            <QueueItem count={8} dotVariant="warning">
              Warning
            </QueueItem>
            <QueueItem count={45} dotVariant="ok">
              OK
            </QueueItem>
            <QueueItem count={3} dotVariant="neutral">
              Neutral
            </QueueItem>
            <QueueItem count={100}>
              No dot
            </QueueItem>
          </QueueList>
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
                <td className="py-2 pr-4 font-mono text-xs">active</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 pr-4 font-mono text-xs">false</td>
                <td className="py-2 text-muted-foreground">Whether the item is selected</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">count</td>
                <td className="py-2 pr-4 font-mono text-xs">number | string</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Count display (can be formatted like &quot;1.9k&quot;)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">dotVariant</td>
                <td className="py-2 pr-4 font-mono text-xs">&quot;critical&quot; | &quot;warning&quot; | &quot;ok&quot; | &quot;neutral&quot; | &quot;none&quot;</td>
                <td className="py-2 pr-4 font-mono text-xs">&quot;none&quot;</td>
                <td className="py-2 text-muted-foreground">Status dot color</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">children</td>
                <td className="py-2 pr-4 font-mono text-xs">React.ReactNode</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Queue name text</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">onClick</td>
                <td className="py-2 pr-4 font-mono text-xs">function</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Click handler</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
