"use client"

import {
  ChatBubble,
  ChatBubbleGroup,
  ChatBubbleTime,
  DateSeparator,
  SystemMessage,
} from "@/components/ui/chat-bubble"

export default function ChatBubblePage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Chat Bubble</h1>
        <p className="text-muted-foreground">
          Message bubbles for chat interfaces with support for sent/received variants, timestamps, and delivery status.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import {
  ChatBubble,
  ChatBubbleGroup,
  ChatBubbleTime,
  DateSeparator,
  SystemMessage,
} from "@/components/ui/chat-bubble"`}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Variants</h2>
        <div className="space-y-4 p-6 bg-neutral-100 rounded-lg border">
          <ChatBubbleGroup align="start">
            <ChatBubble variant="received">
              Bom dia, Dra. Camila! Tudo bem?
            </ChatBubble>
            <ChatBubbleTime>09:30</ChatBubbleTime>
          </ChatBubbleGroup>

          <ChatBubbleGroup align="end">
            <ChatBubble variant="sent">
              Bom dia, Maria Clara! Tudo ótimo, e com você? Como está se sentindo?
            </ChatBubble>
            <ChatBubbleTime status="read">09:32</ChatBubbleTime>
          </ChatBubbleGroup>

          <ChatBubbleGroup align="end">
            <ChatBubble variant="professional">
              Este é um exemplo da variante professional - mensagem do profissional.
            </ChatBubble>
            <ChatBubbleTime status="read">09:35</ChatBubbleTime>
          </ChatBubbleGroup>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`// Patient message (white, left-aligned)
<ChatBubbleGroup align="start">
  <ChatBubble variant="received">Patient message</ChatBubble>
  <ChatBubbleTime>09:30</ChatBubbleTime>
</ChatBubbleGroup>

// Sent message (green, right-aligned)
<ChatBubbleGroup align="end">
  <ChatBubble variant="sent">Sent message</ChatBubble>
  <ChatBubbleTime status="read">09:32</ChatBubbleTime>
</ChatBubbleGroup>

// Professional message (green, right-aligned)
<ChatBubbleGroup align="end">
  <ChatBubble variant="professional">Professional message</ChatBubble>
  <ChatBubbleTime status="read">09:35</ChatBubbleTime>
</ChatBubbleGroup>`}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Message Status</h2>
        <div className="space-y-4 p-6 bg-neutral-100 rounded-lg border">
          <ChatBubbleGroup align="end">
            <ChatBubble variant="sent">Mensagem enviada</ChatBubble>
            <ChatBubbleTime status="sent">10:30</ChatBubbleTime>
          </ChatBubbleGroup>
          <ChatBubbleGroup align="end">
            <ChatBubble variant="sent">Mensagem entregue</ChatBubble>
            <ChatBubbleTime status="delivered">10:31</ChatBubbleTime>
          </ChatBubbleGroup>
          <ChatBubbleGroup align="end">
            <ChatBubble variant="sent">Mensagem lida</ChatBubble>
            <ChatBubbleTime status="read">10:32</ChatBubbleTime>
          </ChatBubbleGroup>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Date Separator</h2>
        <div className="space-y-4 p-6 bg-neutral-100 rounded-lg border">
          <DateSeparator>Hoje</DateSeparator>
          <ChatBubbleGroup align="start">
            <ChatBubble variant="received">Bom dia!</ChatBubble>
          </ChatBubbleGroup>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<DateSeparator>Hoje</DateSeparator>`}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">System Message</h2>
        <div className="space-y-4 p-6 bg-neutral-100 rounded-lg border">
          <SystemMessage>Conversa iniciada</SystemMessage>
          <SystemMessage>Dr. Silva entrou na conversa</SystemMessage>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<SystemMessage>Conversa iniciada</SystemMessage>`}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">ChatBubble Props</h2>
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
                <td className="py-2 pr-4 font-mono text-xs">&quot;sent&quot; | &quot;received&quot; | &quot;professional&quot;</td>
                <td className="py-2 pr-4 font-mono text-xs">&quot;received&quot;</td>
                <td className="py-2 text-muted-foreground">Message variant. &quot;received&quot; for patient (white), &quot;sent&quot; and &quot;professional&quot; for professional (green).</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">children</td>
                <td className="py-2 pr-4 font-mono text-xs">React.ReactNode</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Message content</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">ChatBubbleTime Props</h2>
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
                <td className="py-2 pr-4 font-mono text-xs">status</td>
                <td className="py-2 pr-4 font-mono text-xs">&quot;sent&quot; | &quot;delivered&quot; | &quot;read&quot;</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Delivery status indicator</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">channel</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Channel name (e.g., WhatsApp)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">channelIcon</td>
                <td className="py-2 pr-4 font-mono text-xs">React.ReactNode</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Channel icon element</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
