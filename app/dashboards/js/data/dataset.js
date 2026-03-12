// ========== V2 Dataset — Saude Exemplo S/A ==========
// Operadora ficticia, 12.000 beneficiarios, 3 empresas empregadoras
// Periodo: Out/2024 a Mar/2025 (6 meses)
//
// NOTA: em producao, estes dados viriam de APIs do backend Nilo.
// Comentarios [REAL] indicam onde dados reais substituiriam os ficticios.
// Flag requiresIntegration = true indica dados que dependem de integracao com o cliente.

export const DASHBOARD_DATA = {

  // ========== Operadora ==========
  operator: {
    name: 'Saude Exemplo S/A',
    totalBeneficiaries: 12000,
    reportPeriod: { start: '2025-01', end: '2025-03' },
  },

  // ========== Empresas Empregadoras ==========
  // [REAL] viria do cadastro de beneficiarios
  companies: [
    { id: 'emp1', name: 'TechCorp Brasil', beneficiaries: 3200, sector: 'Tecnologia' },
    { id: 'emp2', name: 'Construtora Alfa', beneficiaries: 4800, sector: 'Construcao' },
    { id: 'emp3', name: 'Industria Beta', beneficiaries: 4000, sector: 'Industria' },
  ],
  // Soma: 3200 + 4800 + 4000 = 12000

  // ========== Meses disponiveis ==========
  months: ['2024-10', '2024-11', '2024-12', '2025-01', '2025-02', '2025-03'],

  // ========== US-01: KPIs mensais da carteira ==========
  // [REAL] viria de agregacoes das conversas GSP
  monthlyKPIs: {
    '2024-10': { conversations: 1420, gspActive: 815, gspRate: 6.8, erMentions: 89, topThemeId: 'chronic_pain' },
    '2024-11': { conversations: 1580, gspActive: 852, gspRate: 7.1, erMentions: 95, topThemeId: 'medication_doubt' },
    '2024-12': { conversations: 1310, gspActive: 890, gspRate: 7.4, erMentions: 78, topThemeId: 'specialist_access' },
    '2025-01': { conversations: 1847, gspActive: 980, gspRate: 8.2, erMentions: 134, topThemeId: 'chronic_pain' },
    '2025-02': { conversations: 2103, gspActive: 1020, gspRate: 8.5, erMentions: 121, topThemeId: 'mental_health' },
    '2025-03': { conversations: 2340, gspActive: 1085, gspRate: 9.0, erMentions: 98, topThemeId: 'mental_health' },
  },

  // KPIs por empresa por mes (para filtro por empresa)
  monthlyKPIsByCompany: {
    emp1: {
      '2025-01': { conversations: 812, gspActive: 430, gspRate: 8.3 },
      '2025-02': { conversations: 935, gspActive: 460, gspRate: 8.8 },
      '2025-03': { conversations: 1050, gspActive: 485, gspRate: 9.3 },
    },
    emp2: {
      '2025-01': { conversations: 650, gspActive: 340, gspRate: 7.9 },
      '2025-02': { conversations: 730, gspActive: 350, gspRate: 8.1 },
      '2025-03': { conversations: 800, gspActive: 375, gspRate: 8.7 },
    },
    emp3: {
      '2025-01': { conversations: 385, gspActive: 210, gspRate: 8.4 },
      '2025-02': { conversations: 438, gspActive: 210, gspRate: 8.4 },
      '2025-03': { conversations: 490, gspActive: 225, gspRate: 9.0 },
    },
  },

  // ========== US-02: Temas Conversacionais ==========
  // [REAL] viria da classificacao de conversas GSP por NLP/tags
  themes: [
    {
      id: 'chronic_pain', label: 'Dor Cronica',
      monthly: { '2025-01': 287, '2025-02': 312, '2025-03': 295 },
      byCompany: { emp1: 130, emp2: 105, emp3: 60 },
      byAge: { '18-29': 32, '30-44': 98, '45-59': 112, '60+': 53 },
      patients: 185, patientsByCompany: { emp1: 82, emp2: 65, emp3: 38 },
    },
    {
      id: 'specialist_access', label: 'Acesso a Especialista',
      monthly: { '2025-01': 234, '2025-02': 251, '2025-03': 278 },
      byCompany: { emp1: 120, emp2: 95, emp3: 63 },
      byAge: { '18-29': 45, '30-44': 88, '45-59': 95, '60+': 50 },
      patients: 168, patientsByCompany: { emp1: 72, emp2: 58, emp3: 38 },
    },
    {
      id: 'medication_doubt', label: 'Duvida sobre Medicacao',
      monthly: { '2025-01': 198, '2025-02': 185, '2025-03': 172 },
      byCompany: { emp1: 75, emp2: 62, emp3: 35 },
      byAge: { '18-29': 18, '30-44': 42, '45-59': 65, '60+': 47 },
      patients: 112, patientsByCompany: { emp1: 48, emp2: 40, emp3: 24 },
    },
    {
      id: 'mental_health', label: 'Saude Mental',
      monthly: { '2025-01': 156, '2025-02': 201, '2025-03': 245 },
      byCompany: { emp1: 115, emp2: 78, emp3: 52 },
      byAge: { '18-29': 72, '30-44': 95, '45-59': 55, '60+': 23 },
      patients: 152, patientsByCompany: { emp1: 70, emp2: 50, emp3: 32 },
    },
    {
      id: 'exam_scheduling', label: 'Agendamento de Exames',
      monthly: { '2025-01': 145, '2025-02': 152, '2025-03': 160 },
      byCompany: { emp1: 68, emp2: 55, emp3: 37 },
      byAge: { '18-29': 30, '30-44': 48, '45-59': 52, '60+': 30 },
      patients: 105, patientsByCompany: { emp1: 45, emp2: 36, emp3: 24 },
    },
    {
      id: 'diabetes_mgmt', label: 'Manejo de Diabetes',
      monthly: { '2025-01': 132, '2025-02': 128, '2025-03': 135 },
      byCompany: { emp1: 50, emp2: 52, emp3: 33 },
      byAge: { '18-29': 8, '30-44': 28, '45-59': 55, '60+': 44 },
      patients: 88, patientsByCompany: { emp1: 32, emp2: 34, emp3: 22 },
    },
    {
      id: 'hypertension', label: 'Hipertensao',
      monthly: { '2025-01': 118, '2025-02': 122, '2025-03': 115 },
      byCompany: { emp1: 42, emp2: 45, emp3: 28 },
      byAge: { '18-29': 5, '30-44': 22, '45-59': 48, '60+': 40 },
      patients: 78, patientsByCompany: { emp1: 28, emp2: 30, emp3: 20 },
    },
    {
      id: 'orthopedic', label: 'Ortopedia / Reabilitacao',
      monthly: { '2025-01': 95, '2025-02': 88, '2025-03': 102 },
      byCompany: { emp1: 45, emp2: 35, emp3: 22 },
      byAge: { '18-29': 20, '30-44': 32, '45-59': 30, '60+': 20 },
      patients: 65, patientsByCompany: { emp1: 30, emp2: 22, emp3: 13 },
    },
    {
      id: 'tea_autism', label: 'TEA / Neurodesenvolvimento',
      monthly: { '2025-01': 78, '2025-02': 82, '2025-03': 91 },
      byCompany: { emp1: 38, emp2: 30, emp3: 23 },
      byAge: { '18-29': 35, '30-44': 42, '45-59': 12, '60+': 2 },
      patients: 52, patientsByCompany: { emp1: 25, emp2: 16, emp3: 11 },
    },
    {
      id: 'preventive_care', label: 'Cuidado Preventivo',
      monthly: { '2025-01': 65, '2025-02': 72, '2025-03': 85 },
      byCompany: { emp1: 35, emp2: 30, emp3: 20 },
      byAge: { '18-29': 22, '30-44': 28, '45-59': 20, '60+': 15 },
      patients: 58, patientsByCompany: { emp1: 24, emp2: 20, emp3: 14 },
    },
  ],

  // ========== US-03: Saude Mental (agregado) ==========
  // [REAL] viria da classificacao de padroes conversacionais por NLP
  mentalHealth: {
    overall: { anxiety: 4.2, depression: 2.8, burnout: 1.9, insomnia: 1.3 },
    byAge: {
      '18-29': { anxiety: 6.8, depression: 3.5, burnout: 3.2, insomnia: 1.8, subtypes: { anxiety: { leve: 3.2, moderado: 2.5, grave: 1.1 }, depression: { leve: 1.8, moderado: 1.2, grave: 0.5 } } },
      '30-44': { anxiety: 5.1, depression: 3.2, burnout: 2.5, insomnia: 1.5, subtypes: { anxiety: { leve: 2.4, moderado: 1.8, grave: 0.9 }, depression: { leve: 1.6, moderado: 1.1, grave: 0.5 } } },
      '45-59': { anxiety: 3.0, depression: 2.5, burnout: 1.2, insomnia: 1.1, subtypes: { anxiety: { leve: 1.5, moderado: 1.0, grave: 0.5 }, depression: { leve: 1.3, moderado: 0.8, grave: 0.4 } } },
      '60+':   { anxiety: 2.1, depression: 2.0, burnout: 0.5, insomnia: 0.9, subtypes: { anxiety: { leve: 1.1, moderado: 0.7, grave: 0.3 }, depression: { leve: 1.0, moderado: 0.7, grave: 0.3 } } },
    },
    byCompany: {
      emp1: { anxiety: 5.8, depression: 3.1, burnout: 3.0, insomnia: 1.6, subtypes: { anxiety: { leve: 2.6, moderado: 2.1, grave: 1.1 }, depression: { leve: 1.5, moderado: 1.1, grave: 0.5 } } },
      emp2: { anxiety: 3.5, depression: 2.8, burnout: 1.2, insomnia: 1.2, subtypes: { anxiety: { leve: 1.8, moderado: 1.2, grave: 0.5 }, depression: { leve: 1.4, moderado: 1.0, grave: 0.4 } } },
      emp3: { anxiety: 3.2, depression: 2.4, burnout: 1.0, insomnia: 1.0, subtypes: { anxiety: { leve: 1.6, moderado: 1.1, grave: 0.5 }, depression: { leve: 1.2, moderado: 0.8, grave: 0.4 } } },
    },
    // Tendencia mensal (% da carteira)
    monthly: {
      '2024-10': 3.2, '2024-11': 3.5, '2024-12': 3.8,
      '2025-01': 4.0, '2025-02': 4.4, '2025-03': 4.8,
    },
  },

  // ========== US-04: Engajados vs Nao-engajados ==========
  // [REQUER INTEGRACAO] dados de desfecho clinico (PA, internacao) vem do cliente
  engagedComparison: {
    requiresIntegration: true,
    integrationNote: 'Dados de uso de PA e internacao requerem cruzamento com dados de desfecho clinico do cliente.',
    engaged: {
      erUsageRate: 12.3,
      hospitalizationRate: 3.1,
      readmission30d: 1.2,
      avgCostPerCapita: 420,
    },
    nonEngaged: {
      erUsageRate: 28.7,
      hospitalizationRate: 8.4,
      readmission30d: 4.5,
      avgCostPerCapita: 890,
    },
  },

  // ========== US-05: Loop do PA ==========
  // [PARCIALMENTE REQUER INTEGRACAO] intencao de PA vem da conversa, desfecho e simulado
  erLoop: {
    requiresIntegration: true,
    integrationNote: 'O desfecho "nao utilizou PA" e estimado. Confirmacao exata requer cruzamento com dados de utilizacao do cliente.',
    // Funil
    mentionedER: 134,
    nurseIntervened: 98,
    didNotUseER: 71,
    // Calculo de economia
    avgERCost: 850,
    estimatedSavings: 60350,
    // Metodologia
    methodology: 'A economia estimada e calculada multiplicando o numero de pacientes que expressaram intencao de ir ao PA, foram interceptados pelo enfermeiro e nao utilizaram o PA no periodo subsequente, pelo custo medio de uma visita ao PA. O contrafactual baseia-se na intencao explicita registrada na conversa.',
    // Por mes
    monthly: {
      '2024-10': { mentioned: 89, intervened: 62, avoided: 43, savings: 36550 },
      '2024-11': { mentioned: 95, intervened: 68, avoided: 48, savings: 40800 },
      '2024-12': { mentioned: 78, intervened: 55, avoided: 38, savings: 32300 },
      '2025-01': { mentioned: 134, intervened: 98, avoided: 71, savings: 60350 },
      '2025-02': { mentioned: 121, intervened: 89, avoided: 65, savings: 55250 },
      '2025-03': { mentioned: 98, intervened: 75, avoided: 56, savings: 47600 },
    },
  },

  // ========== US-06: Evolucao mensal do engajamento ==========
  // [REAL] taxa GSP viria do backend; taxa PA requer integracao
  engagementEvolution: [
    { month: '2024-10', gspRate: 6.8, erRate: 3.2, internacoes: 1.8, gspActive: 815 },
    { month: '2024-11', gspRate: 7.1, erRate: 3.0, internacoes: 1.6, gspActive: 852 },
    { month: '2024-12', gspRate: 7.4, erRate: 2.8, internacoes: 1.4, gspActive: 890 },
    { month: '2025-01', gspRate: 8.2, erRate: 2.5, internacoes: 1.2, gspActive: 980 },
    { month: '2025-02', gspRate: 8.5, erRate: 2.3, internacoes: 0.9, gspActive: 1020 },
    { month: '2025-03', gspRate: 9.0, erRate: 2.1, internacoes: 0.7, gspActive: 1085 },
  ],

  // Por empresa
  engagementByCompany: {
    emp1: [
      { month: '2024-10', gspRate: 7.2 }, { month: '2024-11', gspRate: 7.5 },
      { month: '2024-12', gspRate: 7.8 }, { month: '2025-01', gspRate: 8.3 },
      { month: '2025-02', gspRate: 8.8 }, { month: '2025-03', gspRate: 9.3 },
    ],
    emp2: [
      { month: '2024-10', gspRate: 6.5 }, { month: '2024-11', gspRate: 6.8 },
      { month: '2024-12', gspRate: 7.0 }, { month: '2025-01', gspRate: 7.9 },
      { month: '2025-02', gspRate: 8.1 }, { month: '2025-03', gspRate: 8.7 },
    ],
    emp3: [
      { month: '2024-10', gspRate: 6.5 }, { month: '2024-11', gspRate: 6.8 },
      { month: '2024-12', gspRate: 7.2 }, { month: '2025-01', gspRate: 8.4 },
      { month: '2025-02', gspRate: 8.4 }, { month: '2025-03', gspRate: 9.0 },
    ],
  },

  // ========== Campanhas (anotacoes para evolucao de engajamento) ==========
  campaigns: [
    { month: '2024-11', label: 'Inicio do programa GSP', color: '#34AA6E' },
    { month: '2025-01', label: 'Campanha Diabetes', color: '#037AE5' },
    { month: '2025-02', label: 'Campanha Saude Mental', color: '#8B5CF6' },
  ],

  // ========== Quadrantes de Engajamento ==========
  quadrants: {
    ideal: { count: 3200, pct: 26.7, label: 'Ideal', desc: 'Engajado + Com Plano de Cuidado' },
    engaged: { count: 2100, pct: 17.5, label: 'Engajado sem Plano', desc: 'Engajado + Sem Plano de Cuidado' },
    silent: { count: 1800, pct: 15.0, label: 'Em Plano mas Silencioso', desc: 'Nao-engajado + Com Plano de Cuidado' },
    invisible: { count: 4900, pct: 40.8, label: 'Invisivel', desc: 'Nao-engajado + Sem Plano de Cuidado' },
    byCompany: {
      emp1: { ideal: 960, engaged: 640, silent: 480, invisible: 1120 },
      emp2: { ideal: 1200, engaged: 816, silent: 720, invisible: 2064 },
      emp3: { ideal: 1040, engaged: 644, silent: 600, invisible: 1716 },
    },
  },

  // ========== US-07: Pacientes de alto risco ==========
  // [REAL] viria da analise de conversas + atividade do enfermeiro
  highRiskPatients: [
    { id: 'p001', name: 'Maria S.', age: 72, companyId: 'emp2', riskLevel: 'critical', riskScore: 92, condition: 'Diabetes descompensada + isolamento social', lastContact: '2025-02-12', daysSinceContact: 18, quadrant: 'silent' },
    { id: 'p002', name: 'Joao P.', age: 68, companyId: 'emp1', riskLevel: 'critical', riskScore: 88, condition: 'DPOC com exacerbacoes frequentes', lastContact: '2025-02-18', daysSinceContact: 12, quadrant: 'silent' },
    { id: 'p003', name: 'Ana C.', age: 45, companyId: 'emp1', riskLevel: 'critical', riskScore: 85, condition: 'Depressao grave + ideacao passiva', lastContact: '2025-02-20', daysSinceContact: 10, quadrant: 'engaged' },
    { id: 'p004', name: 'Carlos R.', age: 58, companyId: 'emp2', riskLevel: 'high', riskScore: 78, condition: 'Hipertensao resistente + falta a consultas', lastContact: '2025-02-22', daysSinceContact: 8, quadrant: 'invisible' },
    { id: 'p005', name: 'Francisca L.', age: 80, companyId: 'emp3', riskLevel: 'high', riskScore: 75, condition: 'Polimedicacao + quedas recorrentes', lastContact: '2025-02-15', daysSinceContact: 15, quadrant: 'silent' },
    { id: 'p006', name: 'Roberto M.', age: 52, companyId: 'emp1', riskLevel: 'high', riskScore: 72, condition: 'Obesidade + apneia + pre-diabetes', lastContact: '2025-02-25', daysSinceContact: 5, quadrant: 'invisible' },
    { id: 'p007', name: 'Lucia F.', age: 35, companyId: 'emp1', riskLevel: 'medium', riskScore: 65, condition: 'Ansiedade generalizada + insonia cronica', lastContact: '2025-02-28', daysSinceContact: 2, quadrant: 'engaged' },
    { id: 'p008', name: 'Pedro A.', age: 62, companyId: 'emp2', riskLevel: 'medium', riskScore: 62, condition: 'Diabetes tipo 2 + neuropatia', lastContact: '2025-02-26', daysSinceContact: 4, quadrant: 'silent' },
    { id: 'p009', name: 'Sandra K.', age: 28, companyId: 'emp3', riskLevel: 'medium', riskScore: 58, condition: 'Gestacao de risco + hipertensao gestacional', lastContact: '2025-02-27', daysSinceContact: 3, quadrant: 'engaged' },
    { id: 'p010', name: 'Marcos V.', age: 55, companyId: 'emp2', riskLevel: 'medium', riskScore: 55, condition: 'Lombalgia cronica + uso excessivo de opioides', lastContact: '2025-02-24', daysSinceContact: 6, quadrant: 'invisible' },
  ],

  // ========== US-08: Reclamacoes de prestadores (pre-NIP) ==========
  // [REAL] viria da classificacao de conversas que mencionam prestadores
  providerComplaints: [
    { provider: 'Hospital Santa Clara', complaints: 23, prevMonth: 15, trend: 'worsening', growthRate: 53.3, topIssues: ['Tempo de espera', 'Cobranca indevida', 'Falta de leito'] },
    { provider: 'Clinica Vida Plena', complaints: 18, prevMonth: 16, trend: 'worsening', growthRate: 12.5, topIssues: ['Agendamento dificil', 'Demora no retorno'] },
    { provider: 'Laboratorio DiagMais', complaints: 15, prevMonth: 12, trend: 'worsening', growthRate: 25.0, topIssues: ['Resultado atrasado', 'Atendimento ruim'] },
    { provider: 'Centro Medico Esperanca', complaints: 12, prevMonth: 14, trend: 'improving', growthRate: -14.3, topIssues: ['Qualidade do atendimento'] },
    { provider: 'Hospital Sao Lucas', complaints: 10, prevMonth: 10, trend: 'stable', growthRate: 0, topIssues: ['Acesso ao estacionamento', 'Comunicacao'] },
    { provider: 'Clinica OrthoVida', complaints: 8, prevMonth: 5, trend: 'worsening', growthRate: 60.0, topIssues: ['Cobranca indevida', 'Tempo de espera'] },
    { provider: 'Rede Odonto Sorriso', complaints: 6, prevMonth: 7, trend: 'improving', growthRate: -14.3, topIssues: ['Agendamento'] },
    { provider: 'Centro de Imagem Avancada', complaints: 4, prevMonth: 3, trend: 'stable', growthRate: 33.3, topIssues: ['Demora no laudo'] },
  ],

  // ========== US-09: Empresas com piora de indicadores ==========
  companyIndicators: [
    {
      companyId: 'emp1', companyName: 'TechCorp Brasil',
      engagement: 9.3, prevEngagement: 8.8, engagementTrend: 'improving',
      riskThemes: 3.8, prevRiskThemes: 3.1, riskTrend: 'worsening',
      erUsage: 2.1, prevErUsage: 2.3, erTrend: 'improving',
      mentalHealthRate: 5.8, prevMentalHealthRate: 4.9, mhTrend: 'worsening',
      topThemes: ['Saude Mental', 'Burnout', 'Acesso a Especialista'],
      status: 'attention',
    },
    {
      companyId: 'emp2', companyName: 'Construtora Alfa',
      engagement: 8.7, prevEngagement: 8.1, engagementTrend: 'improving',
      riskThemes: 2.5, prevRiskThemes: 2.6, riskTrend: 'improving',
      erUsage: 2.4, prevErUsage: 2.5, erTrend: 'improving',
      mentalHealthRate: 3.5, prevMentalHealthRate: 3.3, mhTrend: 'stable',
      topThemes: ['Dor Cronica', 'Diabetes', 'Agendamento'],
      status: 'good',
    },
    {
      companyId: 'emp3', companyName: 'Industria Beta',
      engagement: 9.0, prevEngagement: 8.4, engagementTrend: 'improving',
      riskThemes: 2.2, prevRiskThemes: 1.8, riskTrend: 'worsening',
      erUsage: 1.8, prevErUsage: 1.6, erTrend: 'worsening',
      mentalHealthRate: 3.2, prevMentalHealthRate: 2.9, mhTrend: 'worsening',
      topThemes: ['TEA/Neurodesenvolvimento', 'Gestacao', 'Cuidado Preventivo'],
      status: 'attention',
    },
  ],

  // ========== Analise de sentimento — Pacientes com NIP ==========
  // [REAL] viria do cruzamento de NIPs (ANS) com conversas GSP
  nipSentimentAnalysis: [
    {
      id: 'nip1', name: 'Carlos M.', age: 54, companyId: 'emp1',
      nipDate: '2025-03-08', nipReason: 'Demora no atendimento',
      lastConversationDate: '2025-02-25', lastConversationSentiment: 'negative',
      lastConversationTopic: 'Reclamou de espera de 45 dias para ortopedista',
      daysBeforeNip: 11, interceptable: true,
    },
    {
      id: 'nip2', name: 'Ana Paula S.', age: 38, companyId: 'emp2',
      nipDate: '2025-03-12', nipReason: 'Negativa de cobertura',
      lastConversationDate: '2025-03-10', lastConversationSentiment: 'negative',
      lastConversationTopic: 'Frustrada com negativa de exame PET-CT',
      daysBeforeNip: 2, interceptable: true,
    },
    {
      id: 'nip3', name: 'Roberto F.', age: 67, companyId: 'emp3',
      nipDate: '2025-03-15', nipReason: 'Qualidade do atendimento',
      lastConversationDate: '2025-01-20', lastConversationSentiment: 'neutral',
      lastConversationTopic: 'Pediu orientacao sobre medicamentos',
      daysBeforeNip: 54, interceptable: false,
    },
    {
      id: 'nip4', name: 'Fernanda L.', age: 42, companyId: 'emp1',
      nipDate: '2025-03-18', nipReason: 'Demora no atendimento',
      lastConversationDate: '2025-03-05', lastConversationSentiment: 'very_negative',
      lastConversationTopic: 'Relatou piora de dor cronica sem retorno do medico',
      daysBeforeNip: 13, interceptable: true,
    },
    {
      id: 'nip5', name: 'Pedro H.', age: 29, companyId: 'emp2',
      nipDate: '2025-03-20', nipReason: 'Cobranca indevida',
      lastConversationDate: null, lastConversationSentiment: null,
      lastConversationTopic: null,
      daysBeforeNip: null, interceptable: false,
    },
  ],

  // ========== Pacientes insatisfeitos sem NIP (risco proativo) ==========
  // [REAL] viria do cruzamento de NPS + analise de sentimento GSP
  irritatedNoNip: [
    {
      id: 'irr1', name: 'Marcia T.', age: 51, companyId: 'emp1',
      nps: 3, sentimentTrend: 'worsening', currentSentiment: 'negative',
      mainTopic: 'Dificuldade com autorizacoes',
      conversationsLast30d: 4, lastContactDate: '2025-03-18',
      nipRisk: 'high',
    },
    {
      id: 'irr2', name: 'Joao V.', age: 45, companyId: 'emp2',
      nps: 4, sentimentTrend: 'stable', currentSentiment: 'negative',
      mainTopic: 'Insatisfacao com rede credenciada',
      conversationsLast30d: 2, lastContactDate: '2025-03-10',
      nipRisk: 'medium',
    },
    {
      id: 'irr3', name: 'Lucia R.', age: 33, companyId: 'emp1',
      nps: 2, sentimentTrend: 'worsening', currentSentiment: 'very_negative',
      mainTopic: 'Demora em autorizacao cirurgica',
      conversationsLast30d: 6, lastContactDate: '2025-03-22',
      nipRisk: 'high',
    },
    {
      id: 'irr4', name: 'Marcos A.', age: 58, companyId: 'emp3',
      nps: 5, sentimentTrend: 'improving', currentSentiment: 'neutral',
      mainTopic: 'Duvidas sobre coparticipacao',
      conversationsLast30d: 3, lastContactDate: '2025-03-15',
      nipRisk: 'low',
    },
    {
      id: 'irr5', name: 'Patricia N.', age: 40, companyId: 'emp2',
      nps: 3, sentimentTrend: 'worsening', currentSentiment: 'negative',
      mainTopic: 'Experiencia ruim com prestador',
      conversationsLast30d: 5, lastContactDate: '2025-03-20',
      nipRisk: 'high',
    },
    {
      id: 'irr6', name: 'Ricardo B.', age: 62, companyId: 'emp3',
      nps: 4, sentimentTrend: 'stable', currentSentiment: 'negative',
      mainTopic: 'Tempo de espera para consultas',
      conversationsLast30d: 1, lastContactDate: '2025-03-05',
      nipRisk: 'medium',
    },
  ],

  // ========== US-10/US-11: Dados de benchmark e historico ==========
  // Reutiliza companyIndicators para US-10

  // US-11: Indicadores historicos com anotacoes
  historicalIndicators: {
    engagement: [
      { month: '2024-10', value: 6.8 }, { month: '2024-11', value: 7.1 },
      { month: '2024-12', value: 7.4 }, { month: '2025-01', value: 8.2 },
      { month: '2025-02', value: 8.5 }, { month: '2025-03', value: 9.0 },
    ],
    // Dual-axis: interacoes de pacientes com temas de risco vs uso de PA
    riskThemes: [
      { month: '2024-10', interactions: 85, erUsage: 42, hospitalizations: 18 },
      { month: '2024-11', interactions: 102, erUsage: 38, hospitalizations: 16 },
      { month: '2024-12', interactions: 118, erUsage: 35, hospitalizations: 14 },
      { month: '2025-01', interactions: 145, erUsage: 30, hospitalizations: 12 },
      { month: '2025-02', interactions: 172, erUsage: 25, hospitalizations: 9 },
      { month: '2025-03', interactions: 198, erUsage: 21, hospitalizations: 7 },
    ],
    providerComplaints: [
      { month: '2024-10', value: 68 }, { month: '2024-11', value: 72 },
      { month: '2024-12', value: 65 }, { month: '2025-01', value: 78 },
      { month: '2025-02', value: 85 }, { month: '2025-03', value: 96 },
    ],
    // Dual-axis: conversas de saude mental vs eventos de crise
    mentalHealth: [
      { month: '2024-10', conversations: 95, crisisEvents: 18 },
      { month: '2024-11', conversations: 112, crisisEvents: 15 },
      { month: '2024-12', conversations: 128, crisisEvents: 14 },
      { month: '2025-01', conversations: 156, crisisEvents: 11 },
      { month: '2025-02', conversations: 201, crisisEvents: 8 },
      { month: '2025-03', conversations: 245, crisisEvents: 6 },
    ],
    annotations: [
      { month: '2024-11', label: 'Inicio do programa GSP', color: '#0D9488' },
      { month: '2025-02', label: 'Campanha de saude mental', color: '#8B5CF6' },
    ],
  },

  // ========== Performance da Equipe ==========
  teamPerformance: {
    overview: {
      satisfactionScore: 4.2, avgResponseTime: 8,
      firstContactResolution: 72, totalInteractions: 6290,
      prevSatisfaction: 4.0, prevResponseTime: 10,
      prevResolution: 68, prevInteractions: 5840,
    },

    qualityDistribution: { excelente: 1887, bom: 2516, regular: 1258, ruim: 629 },
    qualityByType: [
      { type: 'Acompanhamento Agendado', excelente: 680, bom: 850, regular: 320, ruim: 120 },
      { type: 'Urgente', excelente: 350, bom: 480, regular: 290, ruim: 180 },
      { type: 'Administrativo', excelente: 420, bom: 620, regular: 380, ruim: 210 },
      { type: 'Orientacao Medicamentosa', excelente: 280, bom: 380, regular: 168, ruim: 72 },
      { type: 'Saude Mental', excelente: 157, bom: 186, regular: 100, ruim: 47 },
    ],
    qualityTrend: [
      { month: '2024-10', score: 3.6 }, { month: '2024-11', score: 3.7 },
      { month: '2024-12', score: 3.8 }, { month: '2025-01', score: 3.9 },
      { month: '2025-02', score: 4.0 }, { month: '2025-03', score: 4.2 },
    ],

    sentimentDistribution: { positive: 3145, neutral: 2201, negative: 944 },
    sentimentTrend: [
      { month: '2024-10', positive: 420, neutral: 340, negative: 180 },
      { month: '2024-11', positive: 460, neutral: 350, negative: 170 },
      { month: '2024-12', positive: 480, neutral: 330, negative: 150 },
      { month: '2025-01', positive: 560, neutral: 380, negative: 145 },
      { month: '2025-02', positive: 610, neutral: 400, negative: 155 },
      { month: '2025-03', positive: 615, neutral: 401, negative: 144 },
    ],
    sentimentByRole: {
      nurse: { positive: 1820, neutral: 1150, negative: 430 },
      admin: { positive: 680, neutral: 620, negative: 350 },
      provider: { positive: 645, neutral: 431, negative: 164 },
    },
    negativeSentimentTopics: [
      { topic: 'Tempo de espera longo', count: 245, percentage: 26.0 },
      { topic: 'Informacao incorreta', count: 178, percentage: 18.9 },
      { topic: 'Falta de retorno', count: 156, percentage: 16.5 },
      { topic: 'Dificuldade de agendamento', count: 132, percentage: 14.0 },
      { topic: 'Comunicacao pouco empatica', count: 118, percentage: 12.5 },
      { topic: 'Problema com autorizacao', count: 72, percentage: 7.6 },
      { topic: 'Outros', count: 43, percentage: 4.5 },
    ],

    responseTime: {
      byUrgency: [
        { level: 'Urgente', avg: 4, target: 15, withinSla: 92.3 },
        { level: 'Alta', avg: 12, target: 30, withinSla: 87.1 },
        { level: 'Normal', avg: 28, target: 120, withinSla: 94.5 },
        { level: 'Administrativa', avg: 45, target: 240, withinSla: 96.2 },
      ],
      trend: [
        { month: '2024-10', avg: 12, p95: 38 },
        { month: '2024-11', avg: 11, p95: 35 },
        { month: '2024-12', avg: 10, p95: 32 },
        { month: '2025-01', avg: 9, p95: 30 },
        { month: '2025-02', avg: 8, p95: 28 },
        { month: '2025-03', avg: 8, p95: 26 },
      ],
      overallSlaCompliance: 91.8,
    },

    members: [
      // Enfermeiros (6)
      { id: 'tm01', name: 'Carla Mendes', role: 'nurse', companyId: null, satisfactionScore: 4.7, avgResponseTime: 5, interactionsCount: 680, resolutionRate: 82, sentimentScore: 0.78, prevSatisfaction: 4.5, trend: 'improving', taskDetails: { pendingTasks: 8, completedTasks: 72, avgTaskTime: 15 } },
      { id: 'tm02', name: 'Rafael Oliveira', role: 'nurse', companyId: null, satisfactionScore: 4.5, avgResponseTime: 6, interactionsCount: 645, resolutionRate: 78, sentimentScore: 0.74, prevSatisfaction: 4.3, trend: 'improving', taskDetails: { pendingTasks: 12, completedTasks: 65, avgTaskTime: 18 } },
      { id: 'tm03', name: 'Juliana Santos', role: 'nurse', companyId: null, satisfactionScore: 4.3, avgResponseTime: 7, interactionsCount: 610, resolutionRate: 75, sentimentScore: 0.71, prevSatisfaction: 4.3, trend: 'stable', taskDetails: { pendingTasks: 10, completedTasks: 58, avgTaskTime: 20 } },
      { id: 'tm04', name: 'Bruno Costa', role: 'nurse', companyId: null, satisfactionScore: 4.1, avgResponseTime: 8, interactionsCount: 590, resolutionRate: 70, sentimentScore: 0.65, prevSatisfaction: 4.2, trend: 'stable', taskDetails: { pendingTasks: 14, completedTasks: 52, avgTaskTime: 22 } },
      { id: 'tm05', name: 'Fernanda Lima', role: 'nurse', companyId: null, satisfactionScore: 3.8, avgResponseTime: 11, interactionsCount: 575, resolutionRate: 64, sentimentScore: 0.58, prevSatisfaction: 3.9, trend: 'worsening', taskDetails: { pendingTasks: 18, completedTasks: 45, avgTaskTime: 28 } },
      { id: 'tm06', name: 'Diego Almeida', role: 'nurse', companyId: null, satisfactionScore: 3.6, avgResponseTime: 13, interactionsCount: 550, resolutionRate: 60, sentimentScore: 0.52, prevSatisfaction: 3.8, trend: 'worsening', taskDetails: { pendingTasks: 20, completedTasks: 38, avgTaskTime: 32 } },
      // Administrativos (4)
      { id: 'tm07', name: 'Patricia Rocha', role: 'admin', companyId: null, satisfactionScore: 4.0, avgResponseTime: 4, interactionsCount: 520, resolutionRate: 68, sentimentScore: 0.60, prevSatisfaction: 3.9, trend: 'improving', taskDetails: { pendingTasks: 6, completedTasks: 78, avgTaskTime: 12 } },
      { id: 'tm08', name: 'Lucas Ferreira', role: 'admin', companyId: null, satisfactionScore: 3.7, avgResponseTime: 5, interactionsCount: 480, resolutionRate: 62, sentimentScore: 0.55, prevSatisfaction: 3.7, trend: 'stable', taskDetails: { pendingTasks: 9, completedTasks: 68, avgTaskTime: 14 } },
      { id: 'tm09', name: 'Amanda Souza', role: 'admin', companyId: null, satisfactionScore: 3.5, avgResponseTime: 6, interactionsCount: 440, resolutionRate: 58, sentimentScore: 0.48, prevSatisfaction: 3.6, trend: 'worsening', taskDetails: { pendingTasks: 15, completedTasks: 42, avgTaskTime: 25 } },
      { id: 'tm10', name: 'Roberto Dias', role: 'admin', companyId: null, satisfactionScore: 3.3, avgResponseTime: 7, interactionsCount: 410, resolutionRate: 55, sentimentScore: 0.45, prevSatisfaction: 3.4, trend: 'worsening', taskDetails: { pendingTasks: 17, completedTasks: 35, avgTaskTime: 30 } },
      // Prestadores (4)
      { id: 'tm11', name: 'Dr. Marcos Pereira', role: 'provider', companyId: 'emp1', satisfactionScore: 4.8, avgResponseTime: 45, interactionsCount: 180, resolutionRate: 88, sentimentScore: 0.85, prevSatisfaction: 4.7, trend: 'improving', taskDetails: { pendingTasks: 5, completedTasks: 80, avgTaskTime: 35 } },
      { id: 'tm12', name: 'Dra. Ana Beatriz', role: 'provider', companyId: 'emp2', satisfactionScore: 4.6, avgResponseTime: 52, interactionsCount: 150, resolutionRate: 84, sentimentScore: 0.80, prevSatisfaction: 4.5, trend: 'stable', taskDetails: { pendingTasks: 7, completedTasks: 70, avgTaskTime: 38 } },
      { id: 'tm13', name: 'Dr. Ricardo Lopes', role: 'provider', companyId: 'emp1', satisfactionScore: 4.2, avgResponseTime: 68, interactionsCount: 95, resolutionRate: 76, sentimentScore: 0.70, prevSatisfaction: 4.3, trend: 'worsening', taskDetails: { pendingTasks: 11, completedTasks: 48, avgTaskTime: 42 } },
      { id: 'tm14', name: 'Dra. Lucia Campos', role: 'provider', companyId: 'emp3', satisfactionScore: 3.9, avgResponseTime: 78, interactionsCount: 65, resolutionRate: 70, sentimentScore: 0.62, prevSatisfaction: 3.8, trend: 'stable', taskDetails: { pendingTasks: 13, completedTasks: 40, avgTaskTime: 45 } },
    ],
  },

  // ========== Ranking de Prestadores ==========
  providerRankings: [
    { id: 'pr01', name: 'Centro Medico Esperanca', specialty: 'Clinica Geral', satisfactionScore: 4.7, complaintRate: 2.1, resolutionRate: 91, patientVolume: 385, trend: 'improving', recommendation: 'recommend', topStrengths: ['Atendimento humanizado', 'Pontualidade', 'Comunicacao clara'], topIssues: [] },
    { id: 'pr02', name: 'Hospital Sao Lucas', specialty: 'Multiclinica', satisfactionScore: 4.5, complaintRate: 3.2, resolutionRate: 87, patientVolume: 520, trend: 'stable', recommendation: 'recommend', topStrengths: ['Infraestrutura moderna', 'Equipe qualificada', 'Acesso rapido'], topIssues: [] },
    { id: 'pr03', name: 'Rede Odonto Sorriso', specialty: 'Odontologia', satisfactionScore: 4.4, complaintRate: 2.8, resolutionRate: 85, patientVolume: 290, trend: 'improving', recommendation: 'recommend', topStrengths: ['Agendamento facil', 'Custo-beneficio', 'Rede ampla'], topIssues: [] },
    { id: 'pr04', name: 'Centro de Imagem Avancada', specialty: 'Diagnostico', satisfactionScore: 4.1, complaintRate: 4.5, resolutionRate: 80, patientVolume: 310, trend: 'stable', recommendation: 'neutral', topStrengths: ['Equipamentos modernos'], topIssues: ['Demora no laudo'] },
    { id: 'pr05', name: 'Lab Saude Total', specialty: 'Laboratorio', satisfactionScore: 4.0, complaintRate: 5.0, resolutionRate: 78, patientVolume: 445, trend: 'stable', recommendation: 'neutral', topStrengths: ['Cobertura ampla'], topIssues: ['Filas longas'] },
    { id: 'pr06', name: 'Clinica Bem-Estar', specialty: 'Ortopedia', satisfactionScore: 3.9, complaintRate: 5.2, resolutionRate: 76, patientVolume: 210, trend: 'stable', recommendation: 'neutral', topStrengths: ['Especialistas reconhecidos'], topIssues: ['Tempo de espera'] },
    { id: 'pr07', name: 'Nucleo de Fisioterapia', specialty: 'Fisioterapia', satisfactionScore: 3.8, complaintRate: 5.8, resolutionRate: 74, patientVolume: 175, trend: 'improving', recommendation: 'neutral', topStrengths: ['Atendimento personalizado'], topIssues: ['Localizacao limitada'] },
    { id: 'pr08', name: 'Rede CardioPulse', specialty: 'Cardiologia', satisfactionScore: 3.7, complaintRate: 6.0, resolutionRate: 72, patientVolume: 260, trend: 'stable', recommendation: 'neutral', topStrengths: ['Exames avancados'], topIssues: ['Comunicacao'] },
    { id: 'pr09', name: 'Hospital Santa Clara', specialty: 'Multiclinica', satisfactionScore: 3.2, complaintRate: 12.8, resolutionRate: 58, patientVolume: 480, trend: 'worsening', recommendation: 'attention', topStrengths: [], topIssues: ['Tempo de espera excessivo', 'Cobranca indevida', 'Falta de leito'] },
    { id: 'pr10', name: 'Clinica Vida Plena', specialty: 'Clinica Geral', satisfactionScore: 3.0, complaintRate: 10.5, resolutionRate: 55, patientVolume: 350, trend: 'worsening', recommendation: 'attention', topStrengths: [], topIssues: ['Agendamento dificil', 'Demora no retorno', 'Descaso no atendimento'] },
    { id: 'pr11', name: 'Clinica OrthoVida', specialty: 'Ortopedia', satisfactionScore: 2.8, complaintRate: 14.2, resolutionRate: 50, patientVolume: 145, trend: 'worsening', recommendation: 'attention', topStrengths: [], topIssues: ['Cobranca indevida', 'Tempo de espera', 'Falta de comunicacao'] },
  ],

  // ========== US-16: Top Beneficiarios por Custo ==========
  topBeneficiariesByCost: [
    { id: 'ben01', name: 'Maria S.', age: 72, companyId: 'emp2', totalCost: 128500, claimsCount: 23, lastClaim: '2025-03-10', followUpCount: 8, mainConditions: ['Diabetes', 'Cardiopatia'], gspEngaged: true },
    { id: 'ben02', name: 'Joao P.', age: 68, companyId: 'emp1', totalCost: 95200, claimsCount: 18, lastClaim: '2025-03-05', followUpCount: 12, mainConditions: ['DPOC', 'Hipertensao'], gspEngaged: true },
    { id: 'ben03', name: 'Roberto F.', age: 67, companyId: 'emp2', totalCost: 87300, claimsCount: 15, lastClaim: '2025-02-28', followUpCount: 3, mainConditions: ['Cancer', 'Diabetes'], gspEngaged: false },
    { id: 'ben04', name: 'Francisca L.', age: 80, companyId: 'emp3', totalCost: 76800, claimsCount: 20, lastClaim: '2025-03-12', followUpCount: 5, mainConditions: ['Polimedicacao', 'Quedas'], gspEngaged: true },
    { id: 'ben05', name: 'Ana C.', age: 45, companyId: 'emp1', totalCost: 62400, claimsCount: 12, lastClaim: '2025-03-08', followUpCount: 15, mainConditions: ['Depressao grave', 'Fibromialgia'], gspEngaged: true },
    { id: 'ben06', name: 'Carlos R.', age: 58, companyId: 'emp2', totalCost: 55100, claimsCount: 14, lastClaim: '2025-02-20', followUpCount: 1, mainConditions: ['Hipertensao', 'Obesidade'], gspEngaged: false },
    { id: 'ben07', name: 'Pedro A.', age: 62, companyId: 'emp2', totalCost: 48900, claimsCount: 11, lastClaim: '2025-03-01', followUpCount: 6, mainConditions: ['Diabetes tipo 2', 'Neuropatia'], gspEngaged: true },
    { id: 'ben08', name: 'Sandra K.', age: 28, companyId: 'emp3', totalCost: 42300, claimsCount: 9, lastClaim: '2025-03-15', followUpCount: 10, mainConditions: ['Gestacao de risco'], gspEngaged: true },
  ],

  // ========== US-18: Prestadores em Destaque (referencias positivas) ==========
  providerHighlights: [
    { provider: 'Centro Medico Esperanca', positiveRefs: 45, topics: ['Atendimento humanizado', 'Pontualidade'], trend: 'improving' },
    { provider: 'Hospital Sao Lucas', positiveRefs: 38, topics: ['Infraestrutura', 'Equipe qualificada'], trend: 'stable' },
    { provider: 'Rede Odonto Sorriso', positiveRefs: 32, topics: ['Agendamento facil', 'Custo-beneficio'], trend: 'improving' },
  ],

  // ========== Evolucao da Sinistralidade ==========
  sinistralidadeEvolucao: {
    breakeven: 70,
    months: [
      { month: '2021-06', label: 'jun./21', sinistro: 870000, premio: 665000, taxa: 130.11 },
      { month: '2021-07', label: 'jul./21', sinistro: 625000, premio: 663000, taxa: 94.21  },
      { month: '2021-08', label: 'ago./21', sinistro: 445000, premio: 688000, taxa: 64.67  },
      { month: '2021-09', label: 'set./21', sinistro: 578000, premio: 723000, taxa: 80.00  },
      { month: '2021-10', label: 'out./21', sinistro: 555000, premio: 691000, taxa: 80.36  },
      { month: '2021-11', label: 'nov./21', sinistro: 670000, premio: 1464000, taxa: 45.74 },
      { month: '2021-12', label: 'dez./21', sinistro: 635000, premio: 826000, taxa: 76.93  },
      { month: '2022-01', label: 'jan./22', sinistro: 575000, premio: 856000, taxa: 67.20  },
      { month: '2022-02', label: 'fev./22', sinistro: 620000, premio: 951000, taxa: 65.19  },
      { month: '2022-03', label: 'mar./22', sinistro: 635000, premio: 879000, taxa: 72.20  },
      { month: '2022-04', label: 'abr./22', sinistro: 650000, premio: 949000, taxa: 68.52  },
      { month: '2022-05', label: 'mai./22', sinistro: 685000, premio: 1052000, taxa: 80.41 },
    ],
  },

  // ========== Indice por capita ==========
  indicePerCapita: [
    { classification: 'Consulta',      atual: 5.31,  benchmark: 3.50  },
    { classification: 'Exame',          atual: 34.37, benchmark: 13.89 },
    { classification: 'Internacao',     atual: 2.01,  benchmark: 0.18  },
    { classification: 'Pronto Socorro', atual: 2.17,  benchmark: 1.14  },
  ],

  // ========== Custos por tipo de utilizacao e utilizacao do plano ==========
  planUtilizationStats: {
    costsByType: {
      rede: 78.7,
      reembolso: 12.3,
      benchmark: 'Reembolso esperado: 10-12%',
    },
    planUsedLast12Months: {
      sim: 84.14,
      nao: 15.86,
      benchmark: 'Benchmark esperado: Sim: 80 a 85% | Nao: 15 a 20%',
    },
  },

  // ========== Top beneficiarios por custo estimado (por empresa) ==========
  topCostBeneficiaries: {
    emp1: [
      { name: 'Joao M.', age: 62, condition: 'Doenca coronariana', estimatedCost: 18500, riskLevel: 'critical', type: 'BE' },
      { name: 'Maria F.', age: 58, condition: 'Diabetes tipo 2 + Hipertensao', estimatedCost: 15200, riskLevel: 'high', type: 'BE' },
      { name: 'Carlos R.', age: 71, condition: 'Insuficiencia renal cronica', estimatedCost: 12800, riskLevel: 'critical', type: 'DP' },
      { name: 'Ana P.', age: 45, condition: 'Cancer em tratamento', estimatedCost: 11400, riskLevel: 'high', type: 'BE' },
      { name: 'Paulo S.', age: 55, condition: 'DPOC + Tabagismo', estimatedCost: 9600, riskLevel: 'high', type: 'DP' },
    ],
    emp2: [
      { name: 'Regina O.', age: 67, condition: 'Insuficiencia cardiaca congestiva', estimatedCost: 22100, riskLevel: 'critical', type: 'DP' },
      { name: 'Marcos T.', age: 53, condition: 'Diabetes + Nefropatia', estimatedCost: 17400, riskLevel: 'critical', type: 'BE' },
      { name: 'Lucia B.', age: 61, condition: 'Doenca pulmonar obstrutiva', estimatedCost: 13900, riskLevel: 'high', type: 'BE' },
      { name: 'Fernando N.', age: 48, condition: 'Lesao ortopedica + Cirurgia', estimatedCost: 10200, riskLevel: 'medium', type: 'DP' },
      { name: 'Claudia M.', age: 59, condition: 'Artrite reumatoide', estimatedCost: 8900, riskLevel: 'medium', type: 'BE' },
    ],
    emp3: [
      { name: 'Sebastiao A.', age: 70, condition: 'Doenca coronariana + Marca-passo', estimatedCost: 19800, riskLevel: 'critical', type: 'BE' },
      { name: 'Vera C.', age: 64, condition: 'Neoplasia maligna', estimatedCost: 16500, riskLevel: 'critical', type: 'BE' },
      { name: 'Renato G.', age: 57, condition: 'Acidente vascular cerebral', estimatedCost: 14100, riskLevel: 'high', type: 'DP' },
      { name: 'Helena S.', age: 52, condition: 'Esclerose multipla', estimatedCost: 12300, riskLevel: 'high', type: 'BE' },
      { name: 'Gilberto F.', age: 66, condition: 'Insuficiencia renal + Dialise', estimatedCost: 11700, riskLevel: 'critical', type: 'DP' },
    ],
  },

  // ========== ROI do Programa Nilo ==========
  programROI: {
    avoidedER: {
      count: 71,
      avgCost: 850,
      savings: 60350,
    },
    avoidedHospitalizations: {
      count: 12,
      avgCost: 8500,
      savings: 102000,
    },
    totalSavings: 162350,
  },

  // ========== Benchmark de Engajamento GSP ==========
  engagementBenchmark: 7.5,

  // ========== NPS trend (para Resumo Executivo) ==========
  npsTrend: 5.0,

  // ========== Top 5 prestadores acima da mediana por custo ==========
  providerCostAboveMedian: [
    {
      id: 'pr09', name: 'Hospital Santa Clara', specialty: 'Multiclinica', aboveMedianPct: 42.3,
      costs: [
        { classification: 'Consulta',      atual: 144.24,   benchmark: 92.06   },
        { classification: 'Exame',          atual: 54.11,    benchmark: 43.18   },
        { classification: 'Internacao',     atual: 10099.89, benchmark: 10654.02 },
        { classification: 'Pronto Socorro', atual: 288.33,   benchmark: 250.49  },
      ],
    },
    {
      id: 'pr11', name: 'Clinica OrthoVida', specialty: 'Ortopedia', aboveMedianPct: 38.1,
      costs: [
        { classification: 'Consulta',      atual: 128.50,  benchmark: 92.06  },
        { classification: 'Exame',          atual: 61.80,   benchmark: 43.18  },
        { classification: 'Internacao',     atual: 8940.00, benchmark: 8200.00 },
        { classification: 'Pronto Socorro', atual: 312.40,  benchmark: 250.49 },
      ],
    },
    {
      id: 'pr10', name: 'Clinica Vida Plena', specialty: 'Clinica Geral', aboveMedianPct: 31.7,
      costs: [
        { classification: 'Consulta',      atual: 118.90,  benchmark: 92.06  },
        { classification: 'Exame',          atual: 57.40,   benchmark: 43.18  },
        { classification: 'Internacao',     atual: 9350.00, benchmark: 8200.00 },
        { classification: 'Pronto Socorro', atual: 271.60,  benchmark: 250.49 },
      ],
    },
    {
      id: 'pr08', name: 'Rede CardioPulse', specialty: 'Cardiologia', aboveMedianPct: 24.5,
      costs: [
        { classification: 'Consulta',      atual: 210.00,  benchmark: 92.06  },
        { classification: 'Exame',          atual: 89.50,   benchmark: 43.18  },
        { classification: 'Internacao',     atual: 11200.00, benchmark: 10654.02 },
        { classification: 'Pronto Socorro', atual: 260.00,  benchmark: 250.49 },
      ],
    },
    {
      id: 'pr06', name: 'Clinica Bem-Estar', specialty: 'Ortopedia', aboveMedianPct: 18.2,
      costs: [
        { classification: 'Consulta',      atual: 105.30,  benchmark: 92.06  },
        { classification: 'Exame',          atual: 48.70,   benchmark: 43.18  },
        { classification: 'Internacao',     atual: 8650.00, benchmark: 8200.00 },
        { classification: 'Pronto Socorro', atual: 258.90,  benchmark: 250.49 },
      ],
    },
  ],
};
