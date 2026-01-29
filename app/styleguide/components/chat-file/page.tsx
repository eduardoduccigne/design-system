"use client"

import { ChatFile } from "@/components/ui/chat-file"
import { ChatBubble, ChatBubbleGroup, ChatBubbleTime } from "@/components/ui/chat-bubble"

export default function ChatFilePage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Chat File</h1>
        <p className="text-muted-foreground">
          File attachment component for displaying documents, PDFs, and other files in chat messages.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { ChatFile } from "@/components/ui/chat-file"`}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Variants</h2>
        <div className="space-y-4 p-6 bg-neutral-100 rounded-lg border">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Received</p>
              <ChatFile
                name="resultado-exame.pdf"
                size={524288}
                type="application/pdf"
                variant="received"
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Sent</p>
              <ChatFile
                name="comprovante-pagamento.pdf"
                size={128000}
                type="application/pdf"
                variant="sent"
              />
            </div>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<ChatFile
  name="resultado-exame.pdf"
  size={524288}
  type="application/pdf"
  variant="received"
/>

<ChatFile
  name="comprovante-pagamento.pdf"
  size={128000}
  type="application/pdf"
  variant="sent"
/>`}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">File Types</h2>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <ChatFile name="document.pdf" size={245000} type="application/pdf" />
          <ChatFile name="image.jpg" size={1200000} type="image/jpeg" />
          <ChatFile name="audio.mp3" size={3500000} type="audio/mpeg" />
          <ChatFile name="video.mp4" size={15000000} type="video/mp4" />
          <ChatFile name="spreadsheet.xlsx" size={45000} type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
          <ChatFile name="unknown.dat" size={1000} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">States</h2>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">Complete</span>
            <ChatFile
              name="arquivo.pdf"
              size={245000}
              type="application/pdf"
              status="complete"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">Uploading</span>
            <ChatFile
              name="arquivo.pdf"
              size={245000}
              type="application/pdf"
              status="uploading"
              progress={65}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">Error</span>
            <ChatFile
              name="arquivo.pdf"
              size={245000}
              type="application/pdf"
              status="error"
              error="Falha no envio"
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
              Segue o resultado do exame conforme solicitado
            </ChatBubble>
            <ChatFile
              name="resultado-hemograma-completo.pdf"
              size={524288}
              type="application/pdf"
              variant="received"
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
                <td className="py-2 pr-4 font-mono text-xs">name</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">File name to display</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">size</td>
                <td className="py-2 pr-4 font-mono text-xs">number</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">File size in bytes</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">type</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">MIME type for icon selection</td>
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
                <td className="py-2 pr-4 font-mono text-xs">progress</td>
                <td className="py-2 pr-4 font-mono text-xs">number</td>
                <td className="py-2 pr-4 font-mono text-xs">0</td>
                <td className="py-2 text-muted-foreground">Upload progress (0-100)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">onDownload</td>
                <td className="py-2 pr-4 font-mono text-xs">function</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Download button click handler</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">onRetry</td>
                <td className="py-2 pr-4 font-mono text-xs">function</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Retry button click handler</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
