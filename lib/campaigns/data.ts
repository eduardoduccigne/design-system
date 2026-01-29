import type { CampaignObjective, CampaignTemplate, ObjectiveInfo } from "./types"

// Objective metadata
export const objectives: ObjectiveInfo[] = [
  {
    id: "program",
    name: "Captação para Programa",
    description: "Convide pacientes para programas de saúde.",
    icon: "Heart",
  },
  {
    id: "appointment",
    name: "Agendamento de Consulta",
    description: "Incentive agendamento de consultas.",
    icon: "Calendar",
  },
  {
    id: "exam",
    name: "Realização de Exame",
    description: "Lembre pacientes de realizar exames.",
    icon: "FileText",
  },
  {
    id: "survey",
    name: "Questionário / Rastreio",
    description: "Colete informações via questionários.",
    icon: "ClipboardList",
  },
  {
    id: "reengagement",
    name: "Re-engajamento",
    description: "Reconecte com pacientes inativos.",
    icon: "UserCheck",
  },
  {
    id: "awareness",
    name: "Conscientização",
    description: "Comunicações educativas e alertas.",
    icon: "Megaphone",
  },
]

// Campaign templates by objective
export const campaignsByObjective: Record<CampaignObjective, CampaignTemplate[]> = {
  program: [
    {
      id: "prog1",
      name: "Convite Programa Diabetes (3 mensagens)",
      messages: [
        {
          day: 0,
          text: "Olá! Você foi convidado para o Programa de Diabetes da Nilo Saúde. Clique para aceitar e conhecer os benefícios.",
        },
        {
          day: 4,
          text: "Não perca! Seu convite para o Programa de Diabetes expira em breve. Aceite agora e tenha acesso a consultas e acompanhamento.",
        },
        {
          day: 8,
          text: "Última chance! Confirme sua participação no Programa de Diabetes. Clique aqui para começar.",
        },
      ],
    },
    {
      id: "prog2",
      name: "Convite Programa Hipertensão (2 mensagens)",
      messages: [
        {
          day: 0,
          text: "Venha fazer parte do nosso Programa de Hipertensão! Cuidado contínuo e acompanhamento personalizado.",
        },
        {
          day: 7,
          text: "Lembrete: Não deixe sua saúde para depois. Aceite o convite para o Programa de Hipertensão.",
        },
      ],
    },
  ],
  appointment: [
    {
      id: "appt1",
      name: "Lembrete Consulta Preventiva (3 mensagens)",
      messages: [
        { day: 0, text: "Agende sua consulta preventiva! É rápido e fácil. Clique aqui." },
        { day: 3, text: "Sua saúde é prioridade! Ainda não agendou sua consulta? Faça agora." },
        { day: 7, text: "Última chamada: Agende sua consulta preventiva hoje mesmo." },
      ],
    },
    {
      id: "appt2",
      name: "Retorno de Consulta (1 mensagem)",
      messages: [
        { day: 0, text: "Está na hora de agendar sua consulta de retorno. Acesse agora." },
      ],
    },
  ],
  exam: [
    {
      id: "exam1",
      name: "Lembrete Hemoglobina Glicada (2 mensagens)",
      messages: [
        {
          day: 0,
          text: "Não esqueça: está na hora de realizar seu exame de Hemoglobina Glicada. Agende já!",
        },
        {
          day: 5,
          text: "Lembrete: Seu exame de Hemoglobina Glicada está pendente. Agende hoje!",
        },
      ],
    },
    {
      id: "exam2",
      name: "Lembrete Exame Colesterol (1 mensagem)",
      messages: [
        { day: 0, text: "Hora do check-up! Agende seu exame de perfil lipídico." },
      ],
    },
  ],
  survey: [
    {
      id: "survey1",
      name: "Questionário Risco Cardiovascular (2 mensagens)",
      messages: [
        {
          day: 0,
          text: "Responda este breve questionário sobre saúde cardiovascular. Leva apenas 3 minutos!",
        },
        {
          day: 4,
          text: "Lembrete: Seu questionário de saúde ainda está pendente. Responda agora!",
        },
      ],
    },
    {
      id: "survey2",
      name: "NPS - Satisfação (1 mensagem)",
      messages: [
        { day: 0, text: "Ajude-nos a melhorar! Responda nossa pesquisa de satisfação." },
      ],
    },
  ],
  reengagement: [
    {
      id: "reeng1",
      name: "Reconexão - Sentimos sua falta (3 mensagens)",
      messages: [
        {
          day: 0,
          text: "Sentimos sua falta! Estamos aqui para cuidar da sua saúde. Vamos retomar?",
        },
        {
          day: 5,
          text: "A Nilo Saúde está de portas abertas para você! Que tal voltar a cuidar da sua saúde?",
        },
        {
          day: 10,
          text: "Estamos aqui quando você precisar. Retome seu cuidado com a saúde conosco!",
        },
      ],
    },
    {
      id: "reeng2",
      name: "Reconexão - Novidades (1 mensagem)",
      messages: [
        { day: 0, text: "Há novidades na Nilo Saúde! Venha conferir nossos novos serviços." },
      ],
    },
  ],
  awareness: [
    {
      id: "aware1",
      name: "Campanha Outubro Rosa (2 mensagens)",
      messages: [
        {
          day: 0,
          text: "Outubro Rosa: Cuide-se! Agende sua mamografia e ajude na prevenção do câncer de mama.",
        },
        {
          day: 7,
          text: "Ainda dá tempo! Agende sua mamografia neste Outubro Rosa e cuide da sua saúde.",
        },
      ],
    },
    {
      id: "aware2",
      name: "Vacinação Gripe (1 mensagem)",
      messages: [
        { day: 0, text: "Proteja-se! Já tomou sua vacina da gripe este ano? Veja onde vacinar." },
      ],
    },
  ],
}

// Available schedule times
export const scheduleTimes = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00",
]

// Simulate file validation (mock)
export function simulateFileValidation(): {
  total: number
  valid: number
  invalidPhone: number
  optOut: number
  missingData: number
} {
  const total = Math.floor(Math.random() * 1000) + 3000
  const valid = Math.floor(total * 0.9)
  const invalidPhone = Math.floor(total * 0.05)
  const optOut = Math.floor(total * 0.03)
  const missingData = total - valid - invalidPhone - optOut

  return { total, valid, invalidPhone, optOut, missingData }
}
