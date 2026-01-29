"use client"

import { ChatAudio } from "@/components/ui/chat-audio"
import { ChatBubbleGroup, ChatBubbleTime } from "@/components/ui/chat-bubble"
import { ChatTranscription } from "@/components/ui/chat-transcription"

// Static waveform data to avoid hydration mismatch
const sampleWaveform = [
  0.3, 0.5, 0.7, 0.4, 0.6, 0.8, 0.5, 0.3, 0.6, 0.7,
  0.4, 0.5, 0.8, 0.6, 0.3, 0.5, 0.7, 0.4, 0.6, 0.5,
  0.3, 0.7, 0.5, 0.4, 0.6, 0.8, 0.5, 0.3, 0.6, 0.4,
  0.5, 0.7, 0.6, 0.4, 0.5
]

export default function ChatAudioPage() {

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Chat Audio</h1>
        <p className="text-muted-foreground">
          Audio message player for voice messages with waveform or progress bar visualization.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { ChatAudio } from "@/components/ui/chat-audio"`}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Variants</h2>
        <div className="space-y-4 p-6 bg-neutral-100 rounded-lg border">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Received</p>
              <ChatAudio
                src="/audio/sample.mp3"
                duration={45}
                variant="received"
                waveformData={sampleWaveform}
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Sent</p>
              <ChatAudio
                src="/audio/sample.mp3"
                duration={32}
                variant="sent"
                waveformData={sampleWaveform}
              />
            </div>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<ChatAudio
  src="/audio/voice-message.mp3"
  duration={45}
  variant="received"
  waveformData={[0.2, 0.5, 0.8, ...]}
/>

<ChatAudio
  src="/audio/voice-message.mp3"
  duration={32}
  variant="sent"
  waveformData={[0.3, 0.6, 0.4, ...]}
/>`}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Visualizer Styles</h2>
        <div className="space-y-4 p-6 bg-card rounded-lg border">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Waveform (WhatsApp style)</p>
              <ChatAudio
                src="/audio/sample.mp3"
                duration={45}
                visualizer="waveform"
                waveformData={sampleWaveform}
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Progress Bar (Simple)</p>
              <ChatAudio
                src="/audio/sample.mp3"
                duration={45}
                visualizer="progress"
              />
            </div>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`// Waveform style
<ChatAudio
  src="/audio/voice.mp3"
  duration={45}
  visualizer="waveform"
  waveformData={waveformArray}
/>

// Progress bar style
<ChatAudio
  src="/audio/voice.mp3"
  duration={45}
  visualizer="progress"
/>`}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">States</h2>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">Complete</span>
            <ChatAudio
              src="/audio/sample.mp3"
              duration={30}
              status="complete"
              waveformData={sampleWaveform}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">Uploading</span>
            <ChatAudio
              src="/audio/sample.mp3"
              duration={30}
              status="uploading"
              progress={65}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">Error</span>
            <ChatAudio
              src="/audio/sample.mp3"
              duration={30}
              status="error"
              error="Falha no envio"
              onRetry={() => {}}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Chat Bubble Group</h2>
        <div className="space-y-4 p-6 bg-neutral-100 rounded-lg border">
          <ChatBubbleGroup align="start">
            <ChatAudio
              src="/audio/sample.mp3"
              duration={45}
              variant="received"
              waveformData={sampleWaveform}
            />
            <ChatBubbleTime>10:32</ChatBubbleTime>
          </ChatBubbleGroup>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Transcription</h2>
        <p className="text-sm text-muted-foreground">
          Pass a transcription component to enable the transcribe button. Click the button to toggle visibility.
        </p>
        <div className="space-y-4 p-6 bg-neutral-100 rounded-lg border">
          <ChatBubbleGroup align="start">
            <ChatAudio
              src="/audio/sample.mp3"
              duration={32}
              variant="received"
              waveformData={sampleWaveform}
              defaultShowTranscription={true}
              transcription={
                <ChatTranscription
                  text="Bom dia, estou ligando para remarcar minha consulta que estava agendada para amanhã. Infelizmente surgiu um compromisso de trabalho."
                  variant="received"
                  confidence={0.93}
                />
              }
            />
            <ChatBubbleTime>10:32</ChatBubbleTime>
          </ChatBubbleGroup>

          <ChatBubbleGroup align="end">
            <ChatAudio
              src="/audio/sample.mp3"
              duration={18}
              variant="sent"
              waveformData={sampleWaveform}
              transcription={
                <ChatTranscription
                  text="Claro, sem problemas! Podemos reagendar para quinta-feira às 14h?"
                  variant="sent"
                  confidence={0.95}
                />
              }
            />
            <ChatBubbleTime status="read">10:35</ChatBubbleTime>
          </ChatBubbleGroup>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<ChatAudio
  src="/audio/voice.mp3"
  duration={32}
  variant="received"
  transcription={
    <ChatTranscription
      text="Transcribed text here..."
      variant="received"
      confidence={0.93}
    />
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
                <td className="py-2 pr-4 font-mono text-xs">src</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Audio source URL</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">duration</td>
                <td className="py-2 pr-4 font-mono text-xs">number</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Total duration in seconds</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">visualizer</td>
                <td className="py-2 pr-4 font-mono text-xs">&quot;waveform&quot; | &quot;progress&quot;</td>
                <td className="py-2 pr-4 font-mono text-xs">&quot;waveform&quot;</td>
                <td className="py-2 text-muted-foreground">Visualization style</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">waveformData</td>
                <td className="py-2 pr-4 font-mono text-xs">number[]</td>
                <td className="py-2 pr-4 font-mono text-xs">[]</td>
                <td className="py-2 text-muted-foreground">Array of amplitude values (0-1)</td>
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
                <td className="py-2 pr-4 font-mono text-xs">transcription</td>
                <td className="py-2 pr-4 font-mono text-xs">React.ReactNode</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Transcription content (enables transcribe button)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">showTranscription</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Controlled transcription visibility</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">onTranscriptionToggle</td>
                <td className="py-2 pr-4 font-mono text-xs">function</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Callback when transcription visibility changes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
