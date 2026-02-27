import type { CampaignTemplate } from "./types"
import type { AudienceValidationV1, CampaignObjectiveV1 } from "./types-v1"
import { campaignsByObjective as baseCampaignsByObjective } from "./data"

// V1 objectives: no "Resultados de Exames", added "Sem Objetivo" at the end
export const objectivesV1: {
  id: CampaignObjectiveV1
  name: string
  description: string
  icon: string
}[] = [
  {
    id: "preventive_care",
    name: "Captação para programa",
    description: "Capture pacientes para programas de saúde e acompanhamento",
    icon: "Heart",
  },
  {
    id: "appointment_reminder",
    name: "Agendamento de consulta",
    description: "Convide pacientes para agendar consultas",
    icon: "Calendar",
  },
  {
    id: "treatment_followup",
    name: "Questionário / rastreio",
    description: "Envie questionários e rastreios de saúde aos pacientes",
    icon: "ClipboardList",
  },
  {
    id: "patient_onboarding",
    name: "Reengajamento",
    description: "Reengaje pacientes inativos ou que abandonaram tratamento",
    icon: "UserCheck",
  },
  {
    id: "general_announcement",
    name: "Conscientização",
    description: "Conscientize pacientes sobre temas de saúde e prevenção",
    icon: "Megaphone",
  },
  {
    id: "no_objective",
    name: "Sem Objetivo",
    description: "Crie uma campanha sem um objetivo específico",
    icon: "CircleDashed",
  },
]

// V1 campaigns by objective: reuse base + add "no_objective"
export const campaignsByObjectiveV1: Partial<Record<CampaignObjectiveV1, CampaignTemplate[]>> = {
  preventive_care: baseCampaignsByObjective.preventive_care,
  appointment_reminder: baseCampaignsByObjective.appointment_reminder,
  treatment_followup: baseCampaignsByObjective.treatment_followup,
  patient_onboarding: baseCampaignsByObjective.patient_onboarding,
  general_announcement: baseCampaignsByObjective.general_announcement,
  no_objective: [
    {
      id: "no-obj-generic",
      name: "Mensagem Genérica",
      messages: [
        { id: "m1", day: 0, label: "D0 - Envio", content: "Olá {nome}, temos uma mensagem importante para você." },
      ],
    },
  ],
}

// Simulate file validation (mock) — simplified, no optedOut/frozen
export function simulateFileValidationV1(): AudienceValidationV1 {
  return {
    total: 2847,
    valid: 2650,
    invalid: 112,
    duplicates: 45,
  }
}

// Working hours time slots (08:00–18:00, 30-min increments)
export const scheduleTimeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00",
]

// Get today's date as ISO string (for min date on date picker)
export function getMinDate(): string {
  return new Date().toISOString().split("T")[0]
}
