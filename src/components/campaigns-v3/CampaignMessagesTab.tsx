"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { MessageTimeline } from "@/components/campaigns/MessageTimeline"
import type { CampaignMessage } from "@/lib/campaigns/types"

interface CampaignMessagesTabProps {
  messages: CampaignMessage[]
  campaignName?: string
}

export function CampaignMessagesTab({
  messages,
  campaignName,
}: CampaignMessagesTabProps) {
  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Sequência de Mensagens
        </CardTitle>
        {campaignName && (
          <p className="text-sm text-foreground">{campaignName}</p>
        )}
      </CardHeader>
      <CardContent>
        <MessageTimeline messages={messages} />
      </CardContent>
    </Card>
  )
}
