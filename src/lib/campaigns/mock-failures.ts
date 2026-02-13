// Mock data for campaign delivery failures
// Based on real error patterns from Meta WhatsApp API and Botmaker

import type { CampaignFailure } from "./types-contact-sanitization"

export const mockCampaignFailures: CampaignFailure[] = [
  {
    id: "f1",
    campaignId: "camp-123",
    patient: { id: "p1", name: "Maria Silva", phone: "(11) 99999-1234" },
    errorCode: "131026",
    errorMessage: "Message undeliverable",
    errorMessagePT: "Mensagem não entregue",
    attemptCount: 3,
    source: "meta",
    lastAttemptDate: "2026-02-10",
  },
  {
    id: "f2",
    campaignId: "camp-123",
    patient: { id: "p2", name: "João Santos", phone: "(11) 98888-5678" },
    errorCode: "131049",
    errorMessage:
      "This message was not delivered to maintain healthy ecosystem engagement.",
    errorMessagePT:
      "Mensagem não entregue para manter engajamento saudável do ecossistema",
    attemptCount: 2,
    source: "meta",
    lastAttemptDate: "2026-02-11",
  },
  {
    id: "f3",
    campaignId: "camp-123",
    patient: { id: "p3", name: "Ana Costa", phone: "(21) 97777-9012" },
    errorCode: "130472",
    errorMessage: "User's number is part of an experiment",
    errorMessagePT: "Número do usuário faz parte de um experimento",
    attemptCount: 1,
    source: "meta",
    lastAttemptDate: "2026-02-09",
  },
  {
    id: "f4",
    campaignId: "camp-123",
    patient: { id: "p4", name: "Pedro Lima", phone: "(11) 96666-3456" },
    errorCode: "131049",
    errorMessage:
      "This message was not delivered to maintain healthy ecosystem engagement.",
    errorMessagePT:
      "Mensagem não entregue para manter engajamento saudável do ecossistema",
    attemptCount: 1,
    source: "meta",
    lastAttemptDate: "2026-02-12",
  },
  {
    id: "f5",
    campaignId: "camp-123",
    patient: { id: "p5", name: "Carla Oliveira", phone: "(31) 95555-7890" },
    errorCode: "131026",
    errorMessage: "Message undeliverable",
    errorMessagePT: "Mensagem não entregue",
    attemptCount: 3,
    source: "meta",
    lastAttemptDate: "2026-02-08",
  },
  {
    id: "f6",
    campaignId: "camp-123",
    patient: { id: "p6", name: "Roberto Alves", phone: "(11) 94444-2345" },
    errorCode: "130472",
    errorMessage: "User's number is part of an experiment",
    errorMessagePT: "Número do usuário faz parte de um experimento",
    attemptCount: 1,
    source: "meta",
    lastAttemptDate: "2026-02-11",
  },
  {
    id: "f7",
    campaignId: "camp-123",
    patient: { id: "p7", name: "Juliana Mendes", phone: "(21) 93333-6789" },
    errorCode: "131026",
    errorMessage: "Message undeliverable",
    errorMessagePT: "Mensagem não entregue",
    attemptCount: 2,
    source: "meta",
    lastAttemptDate: "2026-02-10",
  },
  {
    id: "f8",
    campaignId: "camp-123",
    patient: {
      id: "p8",
      name: "Fernando Costa",
      phone: "(11) 92222-1234",
    },
    errorCode: "SCHEMA_ENUM",
    errorMessage:
      "Your request has violated JSON schema constraint 'enum' for the JSON field 'category'",
    errorMessagePT: "Erro de esquema JSON no campo 'category'",
    attemptCount: 1,
    source: "botmaker",
    lastAttemptDate: "2026-02-09",
  },
  {
    id: "f9",
    campaignId: "camp-123",
    patient: { id: "p9", name: "Luciana Pereira", phone: "(11) 91111-5678" },
    errorCode: "GENERIC",
    errorMessage: "error",
    errorMessagePT: "Erro genérico do botmaker",
    attemptCount: 1,
    source: "botmaker",
    lastAttemptDate: "2026-02-11",
  },
  {
    id: "f10",
    campaignId: "camp-123",
    patient: { id: "p10", name: "Ricardo Souza", phone: "(31) 90000-9876" },
    errorCode: "131026",
    errorMessage: "Message undeliverable",
    errorMessagePT: "Mensagem não entregue",
    attemptCount: 3,
    source: "meta",
    lastAttemptDate: "2026-02-12",
  },
]

export function getCampaignFailures(campaignId: string): CampaignFailure[] {
  return mockCampaignFailures.filter((f) => f.campaignId === campaignId)
}
