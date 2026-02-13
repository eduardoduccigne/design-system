"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { CampaignSummaryTab } from "./CampaignSummaryTab"
import { CampaignMessagesTab } from "./CampaignMessagesTab"
import { CampaignFailureList } from "./CampaignFailureList"
import { mockCampaignDetail } from "@/lib/campaigns/mock-campaign-detail"

const statusConfig = {
  running: { label: "Em andamento", variant: "warning" as const },
  completed: { label: "Concluída", variant: "success" as const },
  paused: { label: "Pausada", variant: "secondary" as const },
}

export function CampaignDetailView() {
  const campaign = mockCampaignDetail
  const status = statusConfig[campaign.status]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Campanhas
          </Button>
          <h1 className="text-lg font-semibold text-foreground">
            {campaign.name}
          </h1>
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Tabs defaultValue="summary" className="w-full">
          <TabsList>
            <TabsTrigger value="summary">Resumo</TabsTrigger>
            <TabsTrigger value="messages">Mensagens</TabsTrigger>
            <TabsTrigger value="failures">
              Falhas de Entrega
              {campaign.failureCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {campaign.failureCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="mt-6">
            <CampaignSummaryTab metrics={campaign.metrics} />
          </TabsContent>

          <TabsContent value="messages" className="mt-6">
            <CampaignMessagesTab
              messages={campaign.messages}
              campaignName={campaign.objective}
            />
          </TabsContent>

          <TabsContent value="failures" className="mt-6">
            <CampaignFailureList campaignId={campaign.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
