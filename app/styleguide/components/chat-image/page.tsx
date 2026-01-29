"use client"

import { ChatImage } from "@/components/ui/chat-image"
import { ChatBubble, ChatBubbleGroup, ChatBubbleTime } from "@/components/ui/chat-bubble"

export default function ChatImagePage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Chat Image</h1>
        <p className="text-muted-foreground">
          Image message component for displaying photos and images in chat conversations.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { ChatImage } from "@/components/ui/chat-image"`}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Variants</h2>
        <div className="space-y-4 p-6 bg-neutral-100 rounded-lg border">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Received</p>
              <ChatImage
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop"
                alt="Medical consultation"
                variant="received"
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Sent</p>
              <ChatImage
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop"
                alt="Lab results"
                variant="sent"
              />
            </div>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<ChatImage
  src="/path/to/image.jpg"
  alt="Description"
  variant="received"
/>

<ChatImage
  src="/path/to/image.jpg"
  alt="Description"
  variant="sent"
/>`}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Caption</h2>
        <div className="p-6 bg-neutral-100 rounded-lg border">
          <ChatImage
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop"
            alt="Blood test results"
            caption="Resultado do exame de sangue - Janeiro 2024"
            variant="received"
          />
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<ChatImage
  src="/path/to/image.jpg"
  alt="Blood test results"
  caption="Resultado do exame de sangue - Janeiro 2024"
  variant="received"
/>`}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">States</h2>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">Complete</span>
            <ChatImage
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=150&fit=crop"
              alt="Complete"
              status="complete"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">Uploading</span>
            <ChatImage
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=150&fit=crop"
              alt="Uploading"
              status="uploading"
              progress={45}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">Error</span>
            <ChatImage
              src="invalid-url"
              alt="Error"
              status="error"
              error="Falha ao carregar"
              onRetry={() => {}}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Chat Bubble</h2>
        <div className="space-y-4 p-6 bg-neutral-100 rounded-lg border">
          <ChatBubbleGroup align="start">
            <ChatBubble variant="received">
              Aqui está a foto do resultado do exame
            </ChatBubble>
            <ChatImage
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop"
              alt="Exam result"
              variant="received"
              onClick={() => alert("Open lightbox")}
            />
            <ChatBubbleTime>10:30</ChatBubbleTime>
          </ChatBubbleGroup>
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
                <td className="py-2 pr-4 font-mono text-xs">src</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Image source URL</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">alt</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 pr-4 font-mono text-xs">&quot;Image&quot;</td>
                <td className="py-2 text-muted-foreground">Alt text for accessibility</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">caption</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Optional caption below image</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">variant</td>
                <td className="py-2 pr-4 font-mono text-xs">&quot;sent&quot; | &quot;received&quot;</td>
                <td className="py-2 pr-4 font-mono text-xs">&quot;received&quot;</td>
                <td className="py-2 text-muted-foreground">Visual variant</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">status</td>
                <td className="py-2 pr-4 font-mono text-xs">&quot;uploading&quot; | &quot;complete&quot; | &quot;error&quot;</td>
                <td className="py-2 pr-4 font-mono text-xs">&quot;complete&quot;</td>
                <td className="py-2 text-muted-foreground">Upload status</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">onClick</td>
                <td className="py-2 pr-4 font-mono text-xs">function</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Click handler for lightbox</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
