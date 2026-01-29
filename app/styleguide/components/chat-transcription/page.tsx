"use client"

import { ChatTranscription } from "@/components/ui/chat-transcription"
import { ChatAudio } from "@/components/ui/chat-audio"
import { ChatBubbleGroup, ChatBubbleTime } from "@/components/ui/chat-bubble"

// Static waveform data to avoid hydration mismatch
const sampleWaveform = [
  0.3, 0.5, 0.7, 0.4, 0.6, 0.8, 0.5, 0.3, 0.6, 0.7,
  0.4, 0.5, 0.8, 0.6, 0.3, 0.5, 0.7, 0.4, 0.6, 0.5,
  0.3, 0.7, 0.5, 0.4, 0.6, 0.8, 0.5, 0.3, 0.6, 0.4,
  0.5, 0.7, 0.6, 0.4, 0.5
]

export default function ChatTranscriptionPage() {

  const shortText = "Olá, gostaria de confirmar a consulta de amanhã às 14h."
  const longText = "Bom dia, estou ligando para remarcar minha consulta que estava agendada para amanhã. Infelizmente surgiu um compromisso de trabalho que não posso adiar. Seria possível reagendar para a próxima semana, de preferência na parte da manhã? Agradeço a compreensão."

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Chat Transcription</h1>
        <p className="text-muted-foreground">
          AI-powered transcription display for voice messages with expandable text and confidence indicators.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { ChatTranscription } from "@/components/ui/chat-transcription"`}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Variants</h2>
        <div className="space-y-4 p-6 bg-neutral-100 rounded-lg border">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Received</p>
              <ChatTranscription
                text={shortText}
                variant="received"
                confidence={0.95}
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Sent</p>
              <ChatTranscription
                text={shortText}
                variant="sent"
                confidence={0.92}
              />
            </div>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<ChatTranscription
  text="Olá, gostaria de confirmar a consulta..."
  variant="received"
  confidence={0.95}
/>

<ChatTranscription
  text="Olá, gostaria de confirmar a consulta..."
  variant="sent"
  confidence={0.92}
/>`}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Expandable Text</h2>
        <div className="space-y-4 p-6 bg-card rounded-lg border">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Collapsed (default)</p>
              <ChatTranscription
                text={longText}
                variant="received"
                defaultExpanded={false}
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Expanded</p>
              <ChatTranscription
                text={longText}
                variant="received"
                defaultExpanded={true}
              />
            </div>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`// Long text will be collapsed by default
<ChatTranscription
  text={longText}
  variant="received"
  collapsedLength={100}  // Characters before truncation
/>`}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Language Detection</h2>
        <div className="p-6 bg-card rounded-lg border">
          <ChatTranscription
            text={shortText}
            variant="received"
            confidence={0.95}
            language="pt-BR"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Audio Message</h2>
        <div className="space-y-4 p-6 bg-neutral-100 rounded-lg border">
          <ChatBubbleGroup align="start">
            <ChatAudio
              src="/audio/sample.mp3"
              duration={32}
              variant="received"
              waveformData={sampleWaveform}
            />
            <ChatTranscription
              text={longText}
              variant="received"
              confidence={0.93}
              language="pt-BR"
            />
            <ChatBubbleTime>10:32</ChatBubbleTime>
          </ChatBubbleGroup>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<ChatBubbleGroup align="start">
  <ChatAudio
    src="/audio/voice.mp3"
    duration={32}
    variant="received"
  />
  <ChatTranscription
    text="Bom dia, estou ligando..."
    variant="received"
    confidence={0.93}
    language="pt-BR"
  />
  <ChatBubbleTime>10:32</ChatBubbleTime>
</ChatBubbleGroup>`}</code>
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
                <td className="py-2 pr-4 font-mono text-xs">text</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Transcribed text content</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">confidence</td>
                <td className="py-2 pr-4 font-mono text-xs">number</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">AI confidence score (0-1)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">language</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Detected language code</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">variant</td>
                <td className="py-2 pr-4 font-mono text-xs">&quot;sent&quot; | &quot;received&quot;</td>
                <td className="py-2 pr-4 font-mono text-xs">&quot;received&quot;</td>
                <td className="py-2 text-muted-foreground">Visual variant</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">expanded</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Controlled expanded state</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">defaultExpanded</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 pr-4 font-mono text-xs">false</td>
                <td className="py-2 text-muted-foreground">Default expanded state</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">collapsedLength</td>
                <td className="py-2 pr-4 font-mono text-xs">number</td>
                <td className="py-2 pr-4 font-mono text-xs">100</td>
                <td className="py-2 text-muted-foreground">Characters before truncation</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">onExpandedChange</td>
                <td className="py-2 pr-4 font-mono text-xs">function</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Callback when expanded state changes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
