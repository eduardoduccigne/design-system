// Mock data for campaign detail view (after clicking a running campaign)

import type { CampaignMessage } from "./types"

export interface CampaignMetrics {
  totalAudience: number
  sent: number
  delivered: number
  read: number
  failed: number
  pending: number
}

export interface CampaignDetail {
  id: string
  name: string
  objective: string
  status: "running" | "completed" | "paused"
  startDate: string
  distributionType: string
  metrics: CampaignMetrics
  messages: CampaignMessage[]
  failureCount: number
}

export const mockCampaignDetail: CampaignDetail = {
  id: "camp-123",
  name: "1585 - teste 12/fev",
  objective: "Cuidado Preventivo",
  status: "running",
  startDate: "2026-02-12",
  distributionType: "Diário (dias úteis)",
  metrics: {
    totalAudience: 2561,
    sent: 2483,
    delivered: 2405,
    read: 1890,
    failed: 78,
    pending: 0,
  },
  messages: [
    {
      id: "m1",
      day: 0,
      label: "D0 - Inicial",
      content:
        "Olá {nome}, está na hora do seu check-up anual! Agende sua consulta.",
    },
    {
      id: "m2",
      day: 5,
      label: "D5 - Follow-up",
      content:
        "Olá {nome}, você já agendou seu check-up? Estamos disponíveis para ajudar.",
    },
    {
      id: "m3",
      day: 12,
      label: "D12 - Lembrete",
      content:
        "Olá {nome}, último lembrete: seu check-up anual é importante para sua saúde.",
    },
  ],
  failureCount: 10,
}
