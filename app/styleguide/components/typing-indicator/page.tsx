"use client"

import { TypingIndicator } from "@/components/ui/typing-indicator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function TypingIndicatorPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Typing Indicator</h1>
        <p className="text-muted-foreground">
          Animated indicator showing that someone is typing a message.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { TypingIndicator } from "@/components/ui/typing-indicator"`}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Basic Usage</h2>
        <div className="p-6 bg-neutral-100 rounded-lg border">
          <TypingIndicator />
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<TypingIndicator />`}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Avatar</h2>
        <div className="p-6 bg-neutral-100 rounded-lg border">
          <TypingIndicator
            avatar={
              <Avatar className="w-6 h-6">
                <AvatarFallback variant="patient" className="text-[9px]">MC</AvatarFallback>
              </Avatar>
            }
          />
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<TypingIndicator
  avatar={
    <Avatar className="w-6 h-6">
      <AvatarFallback variant="patient" className="text-[9px]">MC</AvatarFallback>
    </Avatar>
  }
/>`}</code>
        </pre>
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
                <td className="py-2 pr-4 font-mono text-xs">avatar</td>
                <td className="py-2 pr-4 font-mono text-xs">React.ReactNode</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Optional avatar to display alongside the indicator</td>
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
