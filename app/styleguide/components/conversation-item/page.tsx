"use client"

import {
  ConversationItem,
  ConversationItemAvatar,
  ConversationItemContent,
  ConversationItemHeader,
  ConversationItemName,
  ConversationItemMeta,
  ConversationItemPreview,
  ConversationItemTags,
  ConversationList,
  UnreadBadge,
} from "@/components/ui/conversation-item"
import { SLABadge } from "@/components/ui/sla-badge"
import { CareLineTag } from "@/components/ui/tag"

export default function ConversationItemPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Conversation Item</h1>
        <p className="text-muted-foreground">
          List items for conversation lists with avatar, preview, tags, and status indicators.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
          <code>{`import {
  ConversationItem,
  ConversationItemAvatar,
  ConversationItemContent,
  ConversationItemHeader,
  ConversationItemName,
  ConversationItemMeta,
  ConversationItemPreview,
  ConversationItemTags,
  ConversationList,
  UnreadBadge,
} from "@/components/ui/conversation-item"`}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Basic Usage</h2>
        <div className="w-80 bg-card rounded-lg border overflow-hidden">
          <ConversationList>
            <ConversationItem active>
              <ConversationItemAvatar variant="patient">MC</ConversationItemAvatar>
              <ConversationItemContent>
                <ConversationItemHeader>
                  <ConversationItemName>Maria Clara Santos</ConversationItemName>
                  <ConversationItemMeta>
                    <SLABadge variant="ok">Agora</SLABadge>
                  </ConversationItemMeta>
                </ConversationItemHeader>
                <ConversationItemPreview>
                  Olá, gostaria de saber sobre minha consulta...
                </ConversationItemPreview>
                <ConversationItemTags>
                  <CareLineTag size="sm">Diabetes</CareLineTag>
                </ConversationItemTags>
              </ConversationItemContent>
            </ConversationItem>

            <ConversationItem unread>
              <ConversationItemAvatar variant="patient">JP</ConversationItemAvatar>
              <ConversationItemContent>
                <ConversationItemHeader>
                  <ConversationItemName>João Pedro Oliveira</ConversationItemName>
                  <ConversationItemMeta>
                    <SLABadge variant="critical">35 min</SLABadge>
                    <UnreadBadge count={2} />
                  </ConversationItemMeta>
                </ConversationItemHeader>
                <ConversationItemPreview unread>
                  Preciso remarcar minha consulta de amanhã
                </ConversationItemPreview>
                <ConversationItemTags>
                  <CareLineTag size="sm">Saúde Mental</CareLineTag>
                </ConversationItemTags>
              </ConversationItemContent>
            </ConversationItem>

            <ConversationItem>
              <ConversationItemAvatar variant="patient">TS</ConversationItemAvatar>
              <ConversationItemContent>
                <ConversationItemHeader>
                  <ConversationItemName>Teresa Santos</ConversationItemName>
                  <ConversationItemMeta>
                    <SLABadge variant="warning">15 min</SLABadge>
                  </ConversationItemMeta>
                </ConversationItemHeader>
                <ConversationItemPreview>
                  A nutricionista me passou a dieta nova
                </ConversationItemPreview>
                <ConversationItemTags>
                  <CareLineTag size="sm">Cardíaco</CareLineTag>
                </ConversationItemTags>
              </ConversationItemContent>
            </ConversationItem>
          </ConversationList>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Avatar Variants</h2>
        <div className="flex gap-4 p-6 bg-card rounded-lg border">
          <div className="flex flex-col items-center gap-2">
            <ConversationItemAvatar variant="patient">MC</ConversationItemAvatar>
            <span className="text-xs text-muted-foreground">Patient</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ConversationItemAvatar variant="professional">DR</ConversationItemAvatar>
            <span className="text-xs text-muted-foreground">Professional</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ConversationItemAvatar variant="patient" online>MC</ConversationItemAvatar>
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">States</h2>
        <div className="w-80 bg-card rounded-lg border overflow-hidden">
          <ConversationList>
            <ConversationItem active>
              <ConversationItemAvatar variant="patient">AC</ConversationItemAvatar>
              <ConversationItemContent>
                <ConversationItemHeader>
                  <ConversationItemName>Active State</ConversationItemName>
                  <ConversationItemMeta>
                    <SLABadge variant="ok">Agora</SLABadge>
                  </ConversationItemMeta>
                </ConversationItemHeader>
                <ConversationItemPreview>Selected conversation</ConversationItemPreview>
              </ConversationItemContent>
            </ConversationItem>

            <ConversationItem unread>
              <ConversationItemAvatar variant="patient">UN</ConversationItemAvatar>
              <ConversationItemContent>
                <ConversationItemHeader>
                  <ConversationItemName>Unread State</ConversationItemName>
                  <ConversationItemMeta>
                    <UnreadBadge count={5} />
                  </ConversationItemMeta>
                </ConversationItemHeader>
                <ConversationItemPreview unread>New message preview</ConversationItemPreview>
              </ConversationItemContent>
            </ConversationItem>

            <ConversationItem>
              <ConversationItemAvatar variant="patient">DE</ConversationItemAvatar>
              <ConversationItemContent>
                <ConversationItemHeader>
                  <ConversationItemName>Default State</ConversationItemName>
                </ConversationItemHeader>
                <ConversationItemPreview>Regular conversation</ConversationItemPreview>
              </ConversationItemContent>
            </ConversationItem>
          </ConversationList>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">ConversationItem Props</h2>
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
                <td className="py-2 text-muted-foreground">Selected state with accent border</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">unread</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 pr-4 font-mono text-xs">false</td>
                <td className="py-2 text-muted-foreground">Unread message indicator</td>
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

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">ConversationItemAvatar Props</h2>
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
                <td className="py-2 pr-4 font-mono text-xs">&quot;patient&quot; | &quot;professional&quot;</td>
                <td className="py-2 pr-4 font-mono text-xs">&quot;patient&quot;</td>
                <td className="py-2 text-muted-foreground">Avatar color scheme</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">online</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 pr-4 font-mono text-xs">false</td>
                <td className="py-2 text-muted-foreground">Show online status dot</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
