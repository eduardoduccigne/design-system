"use client"

import { QuickReply, QuickReplyGroup } from "@/components/ui/quick-reply"

export default function QuickReplyPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Quick Reply</h1>
        <p className="text-muted-foreground">
          Pill-shaped buttons for quick response actions in chat interfaces.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { QuickReply, QuickReplyGroup } from "@/components/ui/quick-reply"`}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Basic Usage</h2>
        <div className="flex flex-wrap gap-2 p-6 bg-card rounded-lg border">
          <QuickReply>Sim</QuickReply>
          <QuickReply>Não</QuickReply>
          <QuickReply>Reagendar</QuickReply>
          <QuickReply>Ver mais opções</QuickReply>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<QuickReply>Sim</QuickReply>
<QuickReply>Não</QuickReply>
<QuickReply>Reagendar</QuickReply>
<QuickReply>Ver mais opções</QuickReply>`}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Group</h2>
        <div className="p-6 bg-card rounded-lg border">
          <QuickReplyGroup>
            <QuickReply>Confirmar consulta</QuickReply>
            <QuickReply>Cancelar consulta</QuickReply>
            <QuickReply>Alterar horário</QuickReply>
          </QuickReplyGroup>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<QuickReplyGroup>
  <QuickReply>Confirmar consulta</QuickReply>
  <QuickReply>Cancelar consulta</QuickReply>
  <QuickReply>Alterar horário</QuickReply>
</QuickReplyGroup>`}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">States</h2>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">Default</span>
            <QuickReply>Default</QuickReply>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">Disabled</span>
            <QuickReply disabled>Disabled</QuickReply>
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
                <td className="py-2 pr-4 font-mono text-xs">children</td>
                <td className="py-2 pr-4 font-mono text-xs">React.ReactNode</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Button label text</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">onClick</td>
                <td className="py-2 pr-4 font-mono text-xs">function</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Click handler</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">disabled</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 pr-4 font-mono text-xs">false</td>
                <td className="py-2 text-muted-foreground">Disable the button</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
