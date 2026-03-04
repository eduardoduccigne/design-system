import type { CampaignObjective, CampaignTemplate, AudienceValidation } from "./types"

// Objective definitions
export const objectives: {
  id: CampaignObjective
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

// Campaign templates organized by objective
export const campaignsByObjective: Record<CampaignObjective, CampaignTemplate[]> = {
  preventive_care: [
    {
      id: "prev-checkup",
      name: "Campanha de Check-up Anual",
      messages: [
        { id: "m1", day: 0, label: "D0 - Inicial", content: "Olá {nome}, está na hora do seu check-up anual! Agende sua consulta." },
        { id: "m2", day: 5, label: "D5 - Follow-up", content: "Olá {nome}, você já agendou seu check-up? Estamos disponíveis para ajudar." },
        { id: "m3", day: 12, label: "D12 - Lembrete", content: "Olá {nome}, último lembrete: seu check-up anual é importante para sua saúde." },
      ],
    },
    {
      id: "prev-screening",
      name: "Rastreamento Preventivo",
      description: "Sequência curta para incentivar exames de rastreamento",
      messages: [
        { id: "m1", day: 0, label: "D0 - Convite", content: "Olá {nome}, é hora de realizar seus exames preventivos. Agende pelo app!" },
        { id: "m2", day: 3, label: "D3 - Reforço", content: "Olá {nome}, já agendou seus exames? Prevenir é o melhor caminho." },
        { id: "m3", day: 9, label: "D9 - Último lembrete", content: "Olá {nome}, ainda dá tempo de agendar. Cuide da sua saúde!" },
      ],
    },
  ],
  appointment_reminder: [
    {
      id: "appt-reminder",
      name: "Lembrete de Consulta Padrão",
      messages: [
        { id: "m1", day: 0, label: "D0 - Confirmação", content: "Olá {nome}, sua consulta está agendada para {data}. Confirme sua presença." },
        { id: "m2", day: 1, label: "D1 - Lembrete", content: "Olá {nome}, sua consulta é amanhã! Não se esqueça." },
      ],
    },
  ],
  lab_results: [
    {
      id: "lab-notification",
      name: "Notificação de Resultados",
      messages: [
        { id: "m1", day: 0, label: "D0 - Notificação", content: "Olá {nome}, seus resultados de exames estão disponíveis. Acesse pelo app." },
        { id: "m2", day: 3, label: "D3 - Follow-up", content: "Olá {nome}, você já verificou seus resultados? Em caso de dúvidas, fale conosco." },
      ],
    },
  ],
  treatment_followup: [
    {
      id: "treatment-fu",
      name: "Acompanhamento Pós-Procedimento",
      messages: [
        { id: "m1", day: 0, label: "D0 - Pós-procedimento", content: "Olá {nome}, como você está se sentindo após o procedimento?" },
        { id: "m2", day: 7, label: "D7 - Verificação", content: "Olá {nome}, já faz uma semana. Como está sua recuperação?" },
        { id: "m3", day: 30, label: "D30 - Retorno", content: "Olá {nome}, agende seu retorno para avaliação." },
      ],
    },
    {
      id: "treatment-short",
      name: "Acompanhamento Curto",
      description: "Sequência rápida para procedimentos simples",
      messages: [
        { id: "m1", day: 0, label: "D0 - Pós-procedimento", content: "Olá {nome}, como você está após o procedimento de hoje?" },
        { id: "m2", day: 3, label: "D3 - Verificação", content: "Olá {nome}, como está sua recuperação? Alguma dúvida?" },
        { id: "m3", day: 9, label: "D9 - Retorno", content: "Olá {nome}, hora de agendar seu retorno. Tudo bem com a recuperação?" },
      ],
    },
  ],
  patient_onboarding: [
    {
      id: "onboarding-welcome",
      name: "Boas-vindas ao Paciente",
      messages: [
        { id: "m1", day: 0, label: "D0 - Boas-vindas", content: "Bem-vindo(a) {nome}! Estamos felizes em te receber. Veja como podemos ajudar." },
        { id: "m2", day: 3, label: "D3 - Orientações", content: "Olá {nome}, conheça nossos serviços e como agendar consultas." },
      ],
    },
    {
      id: "onboarding-complete",
      name: "Onboarding Completo",
      description: "Sequência completa de boas-vindas com ativação",
      messages: [
        { id: "m1", day: 0, label: "D0 - Boas-vindas", content: "Bem-vindo(a) {nome}! Estamos felizes em te receber na nossa clínica." },
        { id: "m2", day: 3, label: "D3 - Serviços", content: "Olá {nome}, conheça todos os serviços disponíveis para você." },
        { id: "m3", day: 9, label: "D9 - Primeira consulta", content: "Olá {nome}, que tal agendar sua primeira consulta? Estamos esperando você!" },
      ],
    },
  ],
  general_announcement: [
    {
      id: "general-comm",
      name: "Comunicado Geral",
      messages: [
        { id: "m1", day: 0, label: "D0 - Comunicado", content: "Olá {nome}, temos uma novidade importante para você!" },
      ],
    },
  ],
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

// Simulate file validation (mock)
export function simulateFileValidation(): AudienceValidation {
  const frozenCount = 340

  return {
    total: 10000,
    valid: 10000 - 450 - 180 - 160 - frozenCount,
    invalid: 450,
    duplicates: 180,
    optedOut: 160,
    frozen: frozenCount,
  }
}
