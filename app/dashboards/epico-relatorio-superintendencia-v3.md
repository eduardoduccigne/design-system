# Épico: Dashboard Estratégico para Superintendência Médica
**Versão:** 3.0  
**Produto:** Nilo Saúde — Relatório para Superintendente Médico

---

## Objetivo do Produto

Construir um dashboard interativo com dados 100% fictícios que demonstre o valor estratégico da Nilo para o Superintendente Médico — válido para validação interna e apresentação a clientes.

**Critério de sucesso:** Um Superintendente Médico que nunca viu a Nilo consegue, em menos de 10 minutos com o relatório, identificar 3 ações concretas para levar para a Diretoria de Operações ou Comercial.

---

## Contexto e Premissas

### Persona principal

Superintendente/Gerente Médico de operadora de médio porte (50k–300k vidas). Médico que virou gestor, não naturalmente estratégico. Precisa se viabilizar com dois públicos:
- **Diretoria de Operações** — linguagem de sinistro
- **Diretoria Comercial** — linguagem de benefício e retenção

### Dados disponíveis no MVP

Apenas dados que a Nilo já possui hoje: conversas GSP, atividade de enfermeiros, cadastro de beneficiários. Dados de desfecho clínico (internação/PA) aparecem simulados com nota explícita de que requerem integração com o cliente.

### Stack

Dashboard web interativo, dados fictícios hardcoded ou gerados via script, sem backend real. Responsivo para telas 1280px+.

---

## Conceito Central: As Duas Camadas de Engajamento

Este conceito deve ser explicitado no próprio produto. É a diferenciação central do relatório Nilo — não só o número financeiro, mas a camada explicativa que vem das conversas.

**Engajado no chat** — beneficiário que teve pelo menos uma conversa com o enfermeiro nos últimos 3 meses. Camada mais ampla. Indica presença e contato, mas não necessariamente acompanhamento estruturado.

**Em acompanhamento (linha de cuidado)** — beneficiário cadastrado em um protocolo ativo: crônico controlado, pós-cirúrgico, gestante, etc. Camada mais profunda. Pressupõe plano de cuidado, metas, follow-up programado.

### Matriz dos Quatro Quadrantes

A relação entre as duas camadas define quatro quadrantes. Cada beneficiário se enquadra em um deles:

| | Em Acompanhamento: SIM | Em Acompanhamento: NÃO |
|---|---|---|
| **Engajado no chat: SIM** | ✅ **IDEAL** — Engajado + acompanhado ativamente | 💛 **ENGAJADO SEM PLANO** — Tem contato, mas fora de protocolo estruturado |
| **Engajado no chat: NÃO** | ⚠️ **EM PLANO MAS SILENCIOSO** — Cadastrado em protocolo, mas sem resposta | 🚨 **INVISÍVEL / ALTO RISCO** — Fora do chat e fora de acompanhamento. Crítico se alto custo |

> **Nota de implementação:** Esta matriz deve aparecer como card fixo no relatório. É o módulo mais poderoso para o superintendente ver de imediato o tamanho do "buraco" na carteira. As US-02, US-14 e US-16 devem referenciar estes quadrantes.

---

## Arquitetura das Seções

| # | Seção | Pergunta respondida |
|---|---|---|
| 1 | Alertas e Oportunidades | Onde agir agora? O que não posso deixar passar? |
| 2 | Pulso da População | O que está acontecendo agora na minha carteira? |
| 3 | Performance da Equipe | A equipe está operando bem? Qual é a qualidade das interações? |
| 4 | Efetividade do Programa | O programa está funcionando? Tenho evidência de impacto na sinistralidade? |
| 5 | Análise de Prestadores | Para quais prestadores devo encaminhar? Quem está causando reclamações? |
| 6 | Carteiras — Análise de Clientes | Quais empresas estão bem? Onde há risco de churn ou conversa difícil com o RH? |

---

## Histórias de Usuário

> **Estrutura de cada US:**
> - **História** — formato "Como / quero / para"
> - **Dados usados** — fontes e campos necessários para a visualização
> - **Possíveis insights** — o que o superintendente pode descobrir
> - **Possíveis ações** — o que ele pode fazer a partir do insight
> - **Wireframe** — representação textual do componente

---

### Seção 1 — Alertas e Oportunidades
*Responde: "Onde agir agora? O que não posso deixar passar?"*

---

#### US-01 — Morning Brief Gerado por IA

**História**
```
Como Superintendente, quero ver um parágrafo gerado por IA resumindo o foco
da operação no dia, para iniciar minha sessão com contexto imediato sem
precisar navegar por todas as seções.
```

**Dados usados**
- Contagem de pacientes em alerta de risco nas últimas 24h (GSP)
- Prestadores com crescimento de reclamações no período ativo
- Empresas empregadoras com piora de indicador vs. mês anterior
- Variação de engajamento no chat vs. semana anterior

**Possíveis insights**
- "Hoje há 3 pacientes invisíveis de alto custo sem contato há mais de 30 dias"
- "O Prestador X teve aumento de 40% em reclamações esta semana — possível NIP se não agido"
- "A empresa Alfa caiu 12p.p. de engajamento em relação ao mês passado"

**Possíveis ações**
- Acionar a equipe de enfermagem para busca ativa dos pacientes sinalizados
- Encaminhar alerta sobre o prestador para a área de credenciamento
- Agendar contato com RH da empresa Alfa antes da reunião mensal

**Wireframe**
```
┌─────────────────────────────────────────────────────────────┐
│ 🤖 RESUMO DO DIA — gerado em 04/03/2025 às 08:12           │
│─────────────────────────────────────────────────────────────│
│ Sua carteira apresenta 3 pontos de atenção hoje: 8          │
│ pacientes de alto custo estão fora do radar do programa      │
│ (sem chat e sem acompanhamento), o Clínica São Lucas         │
│ registrou 12 novas reclamações de acesso esta semana —       │
│ crescimento de 38% — e a empresa Construtora Alfa caiu de    │
│ 61% para 49% de engajamento em fevereiro.                   │
│                                                             │
│                          [Ver detalhes →]                   │
└─────────────────────────────────────────────────────────────┘
```

---

#### US-02 — Pacientes de Alto Risco sem Acompanhamento Ativo

**História**
```
Como Superintendente, quero ver os pacientes com sinais de risco identificados
nas conversas que não estão sendo acompanhados ativamente, para priorizar a
ação da equipe onde o impacto clínico e financeiro é maior.
```

**Dados usados**
- Classificação de cada beneficiário nos 4 quadrantes (chat + acompanhamento)
- Último tema de risco identificado nas conversas GSP (classificação automática)
- Data do último contato com enfermeiro
- Condição crônica ou diagnóstico registrado no cadastro
- Custo acumulado do beneficiário no período `[requer dados do cliente]`

**Possíveis insights**
- Pacientes no quadrante Invisível com histórico de internação recente são os de maior risco iminente
- Pacientes Em Plano mas Silenciosos indicam falha de adesão — o protocolo existe mas o paciente não responde
- Concentração de pacientes de risco em uma mesma empresa pode indicar problema de engajamento estrutural

**Possíveis ações**
- Delegar busca ativa para o enfermeiro responsável pela empresa do paciente
- Escalar pacientes Invisíveis de alto custo para revisão pelo médico coordenador
- Acionar campanha de reengajamento segmentada para a empresa com maior concentração de risco

**Wireframe**
```
┌─────────────────────────────────────────────────────────────────────┐
│ 🚨 PACIENTES DE ALTO RISCO SEM ACOMPANHAMENTO ATIVO                 │
│ Mostrando 10 de 34 pacientes identificados   [Ver todos]            │
│─────────────────────────────────────────────────────────────────────│
│ Quadrante  │ Paciente       │ Idade │ Sinal              │ Último   │
│            │                │       │ de risco           │ contato  │
│────────────┼────────────────┼───────┼────────────────────┼──────────│
│ 🚨 Invisív.│ João M.        │  58   │ Mencionou dor no   │ 47 dias  │
│            │                │       │ peito              │          │
│ 🚨 Invisív.│ Maria S.       │  62   │ Intenção de ir ao  │ 39 dias  │
│            │                │       │ PS                 │          │
│ ⚠️ Silenc. │ Carlos R.      │  45   │ Não responde há    │ 28 dias  │
│            │                │       │ 4 semanas          │          │
│ 💛 S/ plano│ Ana P.         │  51   │ Ansiedade relatada │ 3 dias   │
│            │                │       │ recorrente         │          │
│─────────────────────────────────────────────────────────────────────│
│                                    [Delegar →]  [Ver conversa →]    │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### US-03 — Análise de Sentimento — Pacientes com NIP

**História**
```
Como Superintendente, quero ver o padrão de sentimento nas conversas de
beneficiários que abriram NIP formal na ANS, para entender se havia sinais
de insatisfação que poderiam ter sido tratados antes da reclamação chegar
ao regulador.
```

**Dados usados**
- Lista de NIPs abertos no período por beneficiário `[requer dados do cliente]`
- Histórico de conversas GSP dos beneficiários com NIP
- Score de sentimento por conversa (positivo / neutro / negativo)
- Tema das conversas anteriores ao NIP
- Data de abertura do NIP vs. data das conversas

**Possíveis insights**
- Em X% dos NIPs havia sentimento negativo nas conversas nos 30 dias anteriores — o sinal estava disponível
- Os temas mais frequentes antes do NIP são: acesso negado a especialista, demora em autorizações, cobrança indevida
- Beneficiários com NIP que tiveram intervenção do enfermeiro nas semanas anteriores representam menor % do total — o programa intercepta parte dos casos

**Possíveis ações**
- Criar protocolo de escala para beneficiários com 2+ conversas de sentimento negativo consecutivo
- Usar padrão de temas pré-NIP como input para o modelo de risco proativo (US-04)
- Apresentar evidência para a ANS de que o programa atua como mecanismo de detecção precoce

**Wireframe**
```
┌─────────────────────────────────────────────────────────────────────┐
│ 📋 PACIENTES COM NIP — Histórico conversacional    [requer dados    │
│                                                     do cliente]     │
│─────────────────────────────────────────────────────────────────────│
│ NIPs no período: 7   │  Com sinal prévio no chat: 5 (71%)          │
│─────────────────────────────────────────────────────────────────────│
│ Beneficiário │ NIP aberto │ Sinal no chat │ Tema pré-NIP            │
│──────────────┼────────────┼───────────────┼─────────────────────────│
│ Benef. A     │ 14/02      │ 🔴 negativo   │ Acesso negado ortopedia │
│              │            │ (desde 28/01) │                         │
│ Benef. B     │ 02/03      │ 🔴 negativo   │ Cobrança indevida       │
│              │            │ (desde 15/02) │                         │
│ Benef. C     │ 22/02      │ 🟡 neutro     │ Dúvida sobre cobertura  │
│─────────────────────────────────────────────────────────────────────│
│ Temas mais frequentes antes do NIP:                                 │
│ ████████████ Acesso negado (43%)                                    │
│ ███████      Cobrança indevida (28%)                                │
│ █████        Demora em autorização (21%)                            │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### US-04 — Pacientes Insatisfeitos sem NIP — Risco Proativo

**História**
```
Como Superintendente, quero ver beneficiários com padrão de sentimento negativo
nas conversas que ainda não abriram NIP, para que a equipe possa agir antes que
a insatisfação vire uma reclamação formal na ANS.
```

**Dados usados**
- Score de sentimento por conversa nos últimos 60 dias (GSP)
- Frequência e recência de conversas com sentimento negativo
- Tema das conversas negativas (acesso, qualidade, cobrança, atendimento)
- Empresa empregadora do beneficiário
- Histórico de NIP do beneficiário `[requer dados do cliente]`

**Possíveis insights**
- Existem N beneficiários com 3+ conversas negativas consecutivas sem nenhuma intervenção registrada
- Temas de acesso a especialista concentram o maior risco pré-NIP não endereçado
- Uma empresa específica concentra desproporcionalmente beneficiários com sentimento negativo

**Possíveis ações**
- Acionar enfermeiro responsável para contato ativo com os beneficiários no topo da lista
- Investigar se há um problema estrutural de rede prestadora afetando o acesso daquela população
- Disparar comunicação proativa de resolução antes que o beneficiário recorra à ANS

**Wireframe**
```
┌─────────────────────────────────────────────────────────────────────┐
│ ⚠️ RISCO PROATIVO — Insatisfeitos sem NIP                           │
│ Beneficiários com padrão negativo nas conversas — sem NIP aberto    │
│─────────────────────────────────────────────────────────────────────│
│ Intensidade do risco: [Alta ●] [Média ●] [Baixa ●]                 │
│─────────────────────────────────────────────────────────────────────│
│ Beneficiário │ Empresa      │ Conversas  │ Tema dominante  │ Risco  │
│              │              │ negativas  │                 │        │
│──────────────┼──────────────┼────────────┼─────────────────┼────────│
│ Benef. D     │ Construtora  │ 4 (21 dias)│ Acesso ortopedi.│ ● Alta │
│ Benef. E     │ TechCorp     │ 3 (14 dias)│ Cobrança        │ ● Alta │
│ Benef. F     │ Construtora  │ 3 (30 dias)│ Acesso ortopedi.│ ● Méd. │
│─────────────────────────────────────────────────────────────────────│
│ Padrão: Construtora Alfa concentra 58% dos alertas desta lista      │
│                                      [Acionar enfermeiro →]         │
└─────────────────────────────────────────────────────────────────────┘
```

---

### Seção 2 — Pulso da População
*Responde: "O que está acontecendo agora na minha carteira?"*

---

#### US-05 — Mapa de Temas Conversacionais

**História**
```
Como Superintendente, quero ver os principais temas identificados nas conversas
para entender o que minha população está sentindo e demandando neste período,
e identificar variações em relação ao mês anterior.
```

**Dados usados**
- Classificação temática de cada conversa GSP (NLP/categorização automática)
- Volume de conversas por tema no período ativo e no período anterior
- Empresa empregadora e faixa etária do beneficiário por conversa
- Flag de tema de risco clínico (intenção de PS, dor aguda, saúde mental)

**Possíveis insights**
- "Dificuldade de acesso a ortopedista" subiu 35% em relação ao mês anterior — pode ser gargalo de rede
- Temas de ansiedade/depressão concentram-se na faixa 30–45 anos da empresa TechCorp
- Dúvidas sobre medicação são o tema mais frequente e crescente — oportunidade para conteúdo educativo

**Possíveis ações**
- Acionar área de credenciamento para investigar capacidade da rede ortopédica
- Criar campanha de saúde mental direcionada à empresa TechCorp, faixa 30–45 anos
- Desenvolver FAQ ou protocolo de enfermagem para dúvidas de medicação

**Wireframe**
```
┌─────────────────────────────────────────────────────────────────────┐
│ 💬 MAPA DE TEMAS CONVERSACIONAIS          Filtros: [Empresa ▾] [Idade ▾]│
│─────────────────────────────────────────────────────────────────────│
│ Top temas — Jan a Mar 2025            vs. período anterior          │
│                                                                     │
│ Dor crônica / ortopedia    ████████████████████  312  ▲ +35%  🔴  │
│ Dúvida sobre medicação     ██████████████████    287  ▲ +18%       │
│ Acesso a especialista      ████████████████      251  ▲ +22%  🔴  │
│ Saúde mental / ansiedade   ████████████          198  ▲ +41%  🔴  │
│ Dúvida sobre cobertura     ████████              147  ▼ -8%        │
│ Gestação / pré-natal       ██████                112  → 0%         │
│ Diabetes / controle glicê. █████                  89  ▲ +5%        │
│ Intenção de ir ao PS       ████                   67  ▲ +12%  🔴  │
│                                                                     │
│ 🔴 Tema de risco clínico                                            │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### US-06 — Engajados no Chat ao Longo do Tempo + Campanhas

**História**
```
Como Superintendente, quero ver a tendência de engajamento no chat ao longo
dos últimos 6 meses com sobreposição das campanhas enviadas, para avaliar
se as ações de ativação estão gerando resultado e onde há queda de tração.
```

**Dados usados**
- Contagem de beneficiários com ao menos 1 conversa no mês (GSP), por mês
- Total de beneficiários ativos na carteira (denominador para % de engajamento)
- Data e tipo de cada campanha enviada no período
- Empresa empregadora (para filtro)

**Possíveis insights**
- A campanha de saúde masculina em março gerou pico de +18p.p. de engajamento que decaiu nas 4 semanas seguintes — o efeito é de curto prazo
- A empresa Indústria Beta nunca ultrapassou 30% de engajamento, independente das campanhas — pode indicar barreira cultural ou de acesso ao WhatsApp
- O engajamento geral está em trajetória de queda há 3 meses

**Possíveis ações**
- Redesenhar a estratégia de manutenção de engajamento pós-campanha (sequências de mensagens)
- Investigar barreiras específicas da Indústria Beta (perfil etário, uso de smartphone, idioma)
- Propor meta de engajamento por empresa como KPI de contrato

**Wireframe**
```
┌─────────────────────────────────────────────────────────────────────┐
│ 📈 ENGAJADOS NO CHAT AO LONGO DO TEMPO     Filtro: [Empresa ▾]      │
│─────────────────────────────────────────────────────────────────────│
│ % beneficiários                                                     │
│ com ≥1 conversa                                                     │
│                     📍 Camp.         📍 Camp.                       │
│  70% │              saúde masc.      diabetes                       │
│  60% │         ●────●       ●────●────●                             │
│  50% │    ●────●                          ●                         │
│  40% │●                                       ●────●                │
│  30% │                                                              │
│       └────────────────────────────────────────────                 │
│         Out   Nov   Dez   Jan   Fev   Mar                           │
│                                                                     │
│ ● Total carteira   ─ ─ Meta (55%)                                   │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### US-07 — Temas de Risco no Chat ao Longo do Tempo

**História**
```
Como Superintendente, quero ver a evolução dos temas de risco clínico nas
conversas ao longo do tempo, para identificar tendências, sazonalidades e
janelas de intervenção preventiva antes que virem uso de serviço.
```

**Dados usados**
- Volume mensal de conversas classificadas como tema de risco (GSP)
- Subtipo de risco: intenção de PS, intenção de internação, saúde mental aguda, acesso negado
- Empresa empregadora e faixa etária (para drill-down)
- Eventos externos anotados manualmente (fictícios no MVP)

**Possíveis insights**
- Menções a intenção de PS sobem sistematicamente em janeiro e julho — padrão sazonal identificável
- O pico de temas de saúde mental em fevereiro coincide com o período de avaliações de desempenho nas empresas
- A queda de temas de risco em março correlaciona com a campanha de crônicos iniciada no final de fevereiro

**Possíveis ações**
- Programar campanhas preventivas antes dos picos sazonais identificados (dezembro para janela de janeiro)
- Criar protocolo de saúde mental específico para o período de avaliações anuais nas empresas clientes
- Documentar a correlação campanha–queda de risco como evidência de efetividade para a diretoria

**Wireframe**
```
┌─────────────────────────────────────────────────────────────────────┐
│ 🔴 TEMAS DE RISCO NO CHAT — Evolução mensal   Filtro: [Tipo ▾]      │
│─────────────────────────────────────────────────────────────────────│
│ Nº de conversas                                                     │
│ com tema de risco                                                   │
│               📍 Pico acesso     📍 Camp.                           │
│  120 │         ortopedista        crônicos ↓                        │
│   90 │    ●────●                                                     │
│   60 │●            ●────●────●                ●                     │
│   30 │                           ●────●────●                        │
│       └────────────────────────────────────────────                 │
│         Out   Nov   Dez   Jan   Fev   Mar                           │
│                                                                     │
│ ● Intenção de PS   ● Saúde mental   ● Acesso negado                 │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### US-08 — Loop do PA: Intervenções e Desfecho + Economia

**História**
```
Como Superintendente, quero ver quantos pacientes sinalizaram intenção de ir
ao pronto-atendimento, quantos foram interceptados pelo enfermeiro e qual foi
o desfecho estimado, para quantificar em reais a economia gerada pelo programa
e defender seu custo para a diretoria financeira.
```

**Dados usados**
- Conversas com menção a intenção de uso de PS/PA (classificação GSP)
- Registro de intervenção do enfermeiro vinculado à conversa de risco (GSP)
- Uso efetivo de PS/PA no período pelo mesmo beneficiário `[requer dados do cliente]`
- Custo médio de atendimento em PS (configurável — padrão: R$ 850)

**Possíveis insights**
- Das 847 menções a intenção de PA, o enfermeiro interveio em 37% — 63% ficaram sem resposta
- A taxa de não-uso de PA após intervenção é de 79% — forte evidência de interceptação
- A economia estimada de R$ 209.950 em um trimestre representa X vezes o custo mensal do programa

**Possíveis ações**
- Aumentar a cobertura de resposta do enfermeiro nas menções de risco (hoje 37% → meta 60%)
- Usar o cálculo de economia como argumento central na renovação de contrato
- Refinar o modelo de classificação de intenção de PA para reduzir falsos positivos

**Wireframe**
```
┌─────────────────────────────────────────────────────────────────────┐
│ 💰 LOOP DO PA — Intervenções e economia estimada  [requer dados     │
│                                                    do cliente]      │
│─────────────────────────────────────────────────────────────────────│
│                                                                     │
│   847 pacientes       312 interceptados      247 não usaram PA      │
│   citaram PA    ────▶  pelo enfermeiro  ────▶  no período           │
│   nas conversas        (37% de cobertura)     (79% de sucesso)      │
│                                                                     │
│─────────────────────────────────────────────────────────────────────│
│ 💵 Economia estimada no período                                     │
│    247 casos × R$ 850 (custo médio PS) = R$ 209.950                │
│                                                                     │
│    Custo médio PS: [R$ 850  ▾]  (configurável)                      │
│                                                                     │
│    ℹ️ Metodologia: contrafactual baseado em intenção explícita      │
│    registrada na conversa. Desfecho real requer integração com       │
│    dados de utilização do cliente.                                  │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### US-09 — Radar de Saúde Mental

**História**
```
Como Superintendente, quero ver a prevalência agregada de indicadores de saúde
mental na minha carteira para dimensionar o problema e orientar a alocação de
recursos, sem expor dados individuais de beneficiários.
```

**Dados usados**
- Classificação de conversas com padrão sugestivo de ansiedade ou depressão (GSP, dado agregado)
- Segmentação por faixa etária (cadastro de beneficiários)
- Segmentação por empresa empregadora
- Comparação com mês anterior

**Possíveis insights**
- 18% da carteira apresenta padrão conversacional sugestivo de ansiedade — acima da média esperada para a faixa etária
- A faixa 25–40 anos da empresa TechCorp concentra 40% dos sinais, com aumento de 22% em fevereiro
- O crescimento de sinais de saúde mental correlaciona com o período de avaliações de desempenho (jan–fev)

**Possíveis ações**
- Propor programa de saúde mental dirigido para a TechCorp em parceria com RH
- Ativar protocolo de acompanhamento de saúde mental para beneficiários identificados (ação individual pelo enfermeiro responsável)
- Levar dado para a Diretoria Comercial como argumento de valor em renovações com empresas de perfil similar

**Wireframe**
```
┌─────────────────────────────────────────────────────────────────────┐
│ 🧠 RADAR DE SAÚDE MENTAL — Visão agregada e anonimizada             │
│─────────────────────────────────────────────────────────────────────│
│  18% da carteira com padrão sugestivo de ansiedade/depressão        │
│  ▲ +4p.p. vs. mês anterior                                         │
│─────────────────────────────────────────────────────────────────────│
│ Por faixa etária:                                                   │
│  18–25  ██            8%                                            │
│  26–40  ████████████  24%  ← maior concentração                    │
│  41–55  ██████        16%                                           │
│  56+    ████          11%                                           │
│─────────────────────────────────────────────────────────────────────│
│ Por empresa:                                                        │
│  TechCorp            ████████  22%  ▲ +8p.p.                       │
│  Construtora Alfa    █████     14%  ▲ +2p.p.                       │
│  Indústria Beta      ████      11%  → 0p.p.                        │
│─────────────────────────────────────────────────────────────────────│
│ ℹ️ Dado agregado e anonimizado. Identificação individual disponível  │
│    apenas para o enfermeiro responsável pelo beneficiário.          │
└─────────────────────────────────────────────────────────────────────┘
```

---

### Seção 3 — Performance da Equipe
*Responde: "A equipe está operando bem? Qual é a qualidade das interações?"*

---

#### US-10 — Qualidade das Interações + Tendência

**História**
```
Como Superintendente, quero ver indicadores de qualidade das interações da
equipe de enfermagem ao longo do tempo, para garantir que o padrão de
atendimento está sendo mantido e identificar onde é preciso intervir.
```

**Dados usados**
- Score de qualidade por interação (critérios: completude da resposta, tempo de resposta, identificação de risco, follow-up agendado) — calculado a partir de metadados GSP
- Agregação mensal por período
- Threshold configurável de alerta

**Possíveis insights**
- A qualidade média caiu de 82% para 71% em março — coincide com a entrada de 2 novos enfermeiros
- O indicador de follow-up agendado é o mais baixo (45%) — a equipe responde mas não programa retorno
- Interações em períodos de alta demanda (segunda-feira manhã) têm qualidade 15% menor

**Possíveis ações**
- Iniciar onboarding reforçado para os novos enfermeiros com foco no protocolo de follow-up
- Criar alerta automático para o coordenador quando qualidade cai abaixo de 70% por 3 dias consecutivos
- Redistribuir carga de segunda-feira para equilibrar volume e manter qualidade

**Wireframe**
```
┌─────────────────────────────────────────────────────────────────────┐
│ ⭐ QUALIDADE DAS INTERAÇÕES — Tendência mensal                       │
│─────────────────────────────────────────────────────────────────────│
│ Score médio                                                         │
│ de qualidade                                                        │
│                                                                     │
│  90% │                                                              │
│  80% │●────●────●────●                                              │
│  70% │                 ●────●     ← 🔴 Abaixo do threshold (75%)   │
│  60% │                                                              │
│       └──────────────────────────                                   │
│         Out  Nov  Dez  Jan  Fev  Mar                                │
│                                                                     │
│ Componentes do score (Mar):                                         │
│  Tempo de resposta    ████████████  88%                             │
│  Completude           ████████      72%                             │
│  Identificação risco  ███████       68%                             │
│  Follow-up agendado   █████         45%  ← mais baixo              │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### US-11 — Sentimento das Interações + Tendência

**História**
```
Como Superintendente, quero ver o sentimento predominante nas interações entre
enfermeiros e beneficiários ao longo do tempo, para identificar deterioração
na experiência percebida e agir antes que vire reclamação.
```

**Dados usados**
- Score de sentimento por conversa (positivo / neutro / negativo), calculado por NLP sobre as mensagens do beneficiário
- Agregação mensal por empresa e por profissional
- Variação vs. período anterior

**Possíveis insights**
- O percentual de interações com sentimento negativo dobrou de 8% para 16% em fevereiro
- A empresa Construtora Alfa concentra 60% das interações negativas do período
- Interações com o Enfermeiro X têm 3x mais sentimento negativo que a média da equipe — possível problema de abordagem

**Possíveis ações**
- Investigar causa-raiz do aumento de sentimento negativo na Construtora Alfa (problema de rede? expectativa de cobertura?)
- Realizar supervisão das interações do Enfermeiro X e oferecer feedback estruturado
- Criar alerta de sentimento negativo consecutivo para escala ao coordenador clínico

**Wireframe**
```
┌─────────────────────────────────────────────────────────────────────┐
│ 😊 SENTIMENTO DAS INTERAÇÕES — Evolução mensal   Filtro: [Empresa ▾]│
│─────────────────────────────────────────────────────────────────────│
│         Out    Nov    Dez    Jan    Fev    Mar                      │
│ Positivo  72%    75%    78%    74%    61%    63%                    │
│ Neutro    20%    18%    16%    18%    23%    22%                    │
│ Negativo   8%     7%     6%     8%    16%    15%  🔴                │
│                                                                     │
│ [Barras empilhadas por mês]                                         │
│                                                                     │
│ ⚠️ Fevereiro: pico de sentimento negativo (+8p.p. vs. Jan)         │
│    Empresa com maior concentração: Construtora Alfa (60%)           │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### US-12 — Volume de Tarefas e Pacientes por Profissional

**História**
```
Como Superintendente, quero ver o volume de trabalho por enfermeiro nos últimos
30 dias para avaliar distribuição de carga, identificar sobrecargas e garantir
que nenhum paciente está sendo negligenciado por falta de capacidade.
```

**Dados usados**
- Tarefas registradas por profissional no GSP (abertas, concluídas, em atraso)
- Volume de pacientes com interação por profissional (reativas + proativas)
- Distinção entre interação iniciada pelo beneficiário vs. pelo enfermeiro
- Filtro por período: 30/60/90 dias

**Possíveis insights**
- O Enfermeiro A tem 3x o volume de tarefas do Enfermeiro C — desequilíbrio de distribuição
- 40% das tarefas em atraso estão concentradas em 2 profissionais
- A proporção de interações proativas é de apenas 18% — a equipe é majoritariamente reativa

**Possíveis ações**
- Redistribuir carteira de pacientes para equilibrar carga entre enfermeiros
- Definir meta de % de interações proativas por profissional (ex.: 30% mínimo)
- Revisar critério de atribuição de tarefas no GSP para evitar concentração

**Wireframe**
```
┌─────────────────────────────────────────────────────────────────────┐
│ 👩‍⚕️ VOLUME POR PROFISSIONAL — Últimos 30 dias   Filtro: [Período ▾] │
│─────────────────────────────────────────────────────────────────────│
│ Profissional   │ Pacientes │ Interações │ Proativas │ Tarefas       │
│                │ ativos    │ totais     │           │ em atraso     │
│────────────────┼───────────┼────────────┼───────────┼───────────────│
│ Enf. Ana S.    │    87     │    312     │   22%     │    4          │
│ Enf. Bruno M.  │    43     │    98      │   14%     │   12  🔴      │
│ Enf. Carla R.  │    29     │    67      │   31%     │    1          │
│ Enf. Diego F.  │    81     │    287     │   18%     │    9  🔴      │
│─────────────────────────────────────────────────────────────────────│
│ ⚠️ Bruno M. e Diego F. concentram 84% das tarefas em atraso         │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### US-13 — Ranking de Profissionais

**História**
```
Como Superintendente, quero ver um ranking comparativo dos profissionais por
indicadores de performance para identificar boas práticas replicáveis,
reconhecer os melhores e agir nos casos de baixo desempenho.
```

**Dados usados**
- Score de qualidade de interação por profissional (US-10)
- Score de sentimento das interações por profissional (US-11)
- Volume de pacientes atendidos e tarefas concluídas (US-12)
- Taxa de resolução (tarefas concluídas / total de tarefas abertas)

**Possíveis insights**
- O Enfermeiro C tem o menor volume mas o maior score de qualidade e melhor sentimento — possível referência de boas práticas
- Há correlação negativa entre volume de pacientes e score de qualidade — a sobrecarga prejudica o atendimento
- A dispersão de performance entre profissionais é alta — gap de 40p.p. entre melhor e pior score

**Possíveis ações**
- Realizar sessão de compartilhamento de práticas com o Enfermeiro C para o resto da equipe
- Definir teto de pacientes por enfermeiro para proteger a qualidade
- Criar plano de desenvolvimento individual para os profissionais no quartil inferior

**Wireframe**
```
┌─────────────────────────────────────────────────────────────────────┐
│ 🏆 RANKING DE PROFISSIONAIS                    [Anonimizar para     │
│                                                 apresentação]       │
│─────────────────────────────────────────────────────────────────────│
│ #  │ Profissional  │ Qualidade │ Sentimento │ Resolução │ Score     │
│    │               │           │ (% posit.) │           │ geral     │
│────┼───────────────┼───────────┼────────────┼───────────┼───────────│
│ 1  │ Enf. Carla R. │    91%    │    81%     │    97%    │  ★★★★★   │
│ 2  │ Enf. Ana S.   │    84%    │    76%     │    92%    │  ★★★★☆   │
│ 3  │ Enf. Diego F. │    73%    │    63%     │    78%    │  ★★★☆☆   │
│ 4  │ Enf. Bruno M. │    61%    │    54%     │    59%    │  ★★☆☆☆   │
│─────────────────────────────────────────────────────────────────────│
│ Gap melhor → pior: 30p.p. em qualidade, 27p.p. em sentimento        │
└─────────────────────────────────────────────────────────────────────┘
```

---

### Seção 4 — Efetividade do Programa
*Responde: "O programa está funcionando? Tenho evidência de impacto na sinistralidade?"*

> **Nota de design:** Esta seção é a de maior impacto para a Diretoria de Operações. O diferencial do relatório Nilo é combinar o número financeiro (sinistralidade) com a camada explicativa das conversas — mostrando *por que* os números estão se comportando como estão.

---

#### US-14 — Engajados vs. Não-Engajados no Cuidado (Quatro Quadrantes)

**História**
```
Como Superintendente, quero comparar o comportamento de uso de serviços entre
os quatro quadrantes de engajamento para ter evidência granular e defensável
do impacto do programa na utilização de serviços.
```

**Dados usados**
- Classificação de cada beneficiário nos 4 quadrantes (GSP)
- Taxa de uso de PS por quadrante `[requer dados do cliente]`
- Taxa de internação por quadrante `[requer dados do cliente]`
- Taxa de reinternação em 30 dias por quadrante `[requer dados do cliente]`
- Benchmark de referência de mercado (valor configurável)

**Possíveis insights**
- Beneficiários no quadrante Ideal (engajados + acompanhados) têm per capita de PS 40% menor que os do quadrante Invisível
- A maior diferença está no indicador de internação — engajados têm 68% menos internações que não-engajados
- Os beneficiários Em Plano mas Silenciosos têm métricas piores que os Engajados sem Plano — protocolo sem adesão é pior que sem protocolo

**Possíveis ações**
- Priorizar ativação de adesão dos beneficiários Em Plano mas Silenciosos — estão custando mais do que os sem protocolo
- Usar comparativo de per capita como evidência central na apresentação para a diretoria de operações
- Definir meta de migração de beneficiários do quadrante Invisível para Engajado sem Plano como KPI de programa

**Wireframe**
```
┌─────────────────────────────────────────────────────────────────────┐
│ 📊 ENGAJADOS vs. NÃO-ENGAJADOS — Per capita por procedimento        │
│                                              [requer dados cliente] │
│─────────────────────────────────────────────────────────────────────│
│ Procedimento  │ Geral  │ ✅ Ideal │ 💛 S/plano │ ⚠️ Silenc│ 🚨 Invis│
│───────────────┼────────┼──────────┼────────────┼──────────┼─────────│
│ Consulta      │  5,31  │   3,80   │    4,20    │   5,90   │   7,10  │
│ Exame         │ 34,37  │  18,40   │   22,10    │  38,70   │  48,50  │
│ Internação    │  2,01  │   0,70   │    1,10    │   2,80   │   3,40  │
│ Pronto-socorro│  2,17  │   0,90   │    1,30    │   2,50   │   3,80  │
│ Benchmark     │  —     │   —      │    —       │   —      │   —     │
│───────────────┴────────┴──────────┴────────────┴──────────┴─────────│
│ ▼ expandir: Pronto-Socorro                                          │
│   💡 Temas conversacionais associados ao uso de PS:                 │
│      • 43% mencionaram dor aguda sem conseguir consulta             │
│      • 28% relataram dificuldade de acesso a ortopedista            │
│      • 18% sinalizaram intenção de ir ao PS antes de ir             │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### US-15 — Evolução da Sinistralidade × Acompanhamento

**História**
```
Como Superintendente, quero ver a curva de sinistralidade com sobreposição do
percentual da carteira em acompanhamento ativo, para construir narrativa causal
sobre o impacto do programa e apresentá-la para a diretoria com dados.
```

**Dados usados**
- % de sinistralidade mensal da carteira `[requer dados do cliente]`
- % da carteira em acompanhamento ativo por mês (GSP)
- Linha de break-even (valor configurável pela operadora)
- Eventos anotados manualmente: campanhas, picos de reclamação, sazonalidades

**Possíveis insights**
- Meses com +15% da carteira em acompanhamento correlacionam com queda média de 8p.p. na sinistralidade
- O pico de sinistralidade em outubro coincide com a queda de acompanhamento em setembro — lag de ~30 dias
- A linha de break-even foi cruzada em 2 meses — os outros 4 meses estão acima, exigindo ação

**Possíveis ações**
- Apresentar correlação sinistralidade–acompanhamento como principal argumento de ROI para a diretoria financeira
- Definir meta mínima de % da carteira em acompanhamento para manter sinistralidade abaixo do break-even
- Usar as anotações de eventos para construir narrativa causal (ex.: "a campanha de crônicos em março reduziu sinistralidade em abril")

**Wireframe**
```
┌─────────────────────────────────────────────────────────────────────┐
│ 📉 SINISTRALIDADE × ACOMPANHAMENTO          [requer dados cliente]  │
│                                             Filtro: [Período ▾]     │
│─────────────────────────────────────────────────────────────────────│
│ %sinistral.    📍 Pico reclamações    📍 Campanha crônicos          │
│                   ortopedista ↓           GSP ↓                    │
│  130% │                                                             │
│  100% │    ●────●                                                   │
│   70% │- - - - - -●- - ●- - ●- - ●- - ●- -  ← break-even         │
│   45% │                           ●                                 │
│        │                                                            │
│   40%  ╠   ▲    ▲    ▲    ▲    ▲    ▲   ← % em acompanhamento     │
│   20%  ╠   ▲    ▲    ▲    ▲    ▲    ▲                              │
│         └───────────────────────────────                            │
│           J    F    M    A    M    J                                │
│                                                                     │
│ ● Sinistralidade   ▲ Em acompanhamento   - - Break-even             │
│                                                                     │
│ 💡 Insight: meses com +15% em acompanhamento correlacionam          │
│    com queda média de 8p.p. na sinistralidade                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### US-16 — Top Beneficiários por Custo + Camada Conversacional

**História**
```
Como Superintendente, quero ver os maiores geradores de custo do período com
o resumo das suas interações no chat, para que a tabela de custo vire uma
fila de ação clínica e não apenas um relatório de sinistro passivo.
```

**Dados usados**
- Top beneficiários por custo acumulado no período `[requer dados do cliente]`
- Tipo de procedimento gerador de custo `[requer dados do cliente]`
- Classificação do caso (crônico / pontual / oncológico / pós-cirúrgico)
- Status GSP do beneficiário (ativo / sem contato / em risco)
- Histórico de conversas: último contato, nº de intervenções, sinais identificados

**Possíveis insights**
- 3 dos 10 maiores geradores de custo estão sem contato há mais de 30 dias — alto custo e fora do radar
- Pac. B (R$ 316k, cirurgia de coluna) nunca teve interação no GSP — oportunidade de inclusão no programa pós-cirúrgico
- Pac. A (R$ 612k, oncologia) sinalizou intenção de ir ao PS 2x em fevereiro — possível custo adicional evitável

**Possíveis ações**
- Acionar busca ativa imediata para os top geradores de custo sem contato GSP
- Incluir pacientes pós-cirúrgicos de alto custo no protocolo de acompanhamento estruturado
- Usar o resumo conversacional do Pac. A para antecipar necessidade de suporte psicológico antes da próxima sessão oncológica

**Wireframe**
```
┌─────────────────────────────────────────────────────────────────────┐
│ 💸 TOP BENEFICIÁRIOS POR CUSTO    Jan–Mar 2025  [requer dados cli.] │
│─────────────────────────────────────────────────────────────────────│
│ # │ Benef.  │  Valor  │  % │ Procedimento  │ Caso  │ GSP │ Alerta  │
│───┼─────────┼─────────┼────┼───────────────┼───────┼─────┼─────────│
│ 1 │ Pac. A  │ R$612k  │12% │ Onco mama     │ Crôn. │  ✅ │ 💡 ativo│
│ 2 │ Pac. B  │ R$316k  │ 6% │ Cirurgia col. │ Pont. │  ❌ │ ⚠️ s/ct.│
│ 3 │ Pac. C  │ R$233k  │ 4% │ Cirurgia col. │ Pont. │  ✅ │ 💡 ativo│
│ 4 │ Pac. D  │ R$187k  │ 3% │ Cirurgia mand.│ Crôn. │  ✅ │ ⚠️ risco│
│─────────────────────────────────────────────────────────────────────│
│ ▼ Pac. A — expandido                                                │
│   Último contato: 3 dias atrás  │  Intervenções no período: 8      │
│   Sinais identificados nas conversas:                               │
│   🔴 Mencionou intenção de ir ao PS (2x em fevereiro)              │
│   🟡 Relatou efeitos colaterais de quimioterapia                   │
│   🟡 Pediu indicação de oncologista fora da rede                   │
│   🟢 Confirmou adesão ao protocolo de tratamento                   │
│   Ação sugerida: avaliar necessidade de suporte psicológico         │
│─────────────────────────────────────────────────────────────────────│
│ ▼ Pac. B — expandido                                                │
│   ⚠️ Sem contato GSP nos últimos 47 dias                           │
│   Último sinal: mencionou dor lombar recorrente em janeiro          │
│   Nenhuma intervenção registrada no período                         │
│   Ação sugerida: busca ativa — paciente de alto custo fora do radar │
└─────────────────────────────────────────────────────────────────────┘
```

---

### Seção 5 — Análise de Prestadores
*Responde: "Para quais prestadores devo encaminhar? Quem está causando reclamações?"*

---

#### US-17 — Radar de Reclamações de Prestadores (Pré-NIP)

**História**
```
Como Superintendente, quero ver padrões de reclamação de prestadores identificados
nas conversas do chat para agir sobre problemas de rede antes que virem NIP
formal na ANS e exponham a operadora a penalidades regulatórias.
```

**Dados usados**
- Conversas GSP com menção a prestador específico em contexto negativo (classificação automática)
- Nome do prestador mencionado e tipo de reclamação (acesso, qualidade, cobrança, atendimento)
- Comparação de volume de reclamações vs. mês anterior por prestador
- Histórico de NIPs por prestador `[requer dados do cliente]`

**Possíveis insights**
- O Clínica São Lucas teve aumento de 38% em reclamações de acesso em 2 semanas — padrão de deterioração acelerada
- 70% das reclamações de 3 prestadores são do mesmo tipo (demora em agendamento) — possível problema sistêmico de processo
- Prestadores com mais reclamações no chat geram NIP em 60 dias em 40% dos casos — valor preditivo do sinal

**Possíveis ações**
- Contatar proativamente o Clínica São Lucas para entender gargalo de agendamento antes do NIP
- Levar evidência para a área de credenciamento para revisão dos SLAs de prestadores em deterioração
- Criar protocolo de escala: prestador com crescimento >30% em reclamações em 2 semanas → abertura de investigação automática

**Wireframe**
```
┌─────────────────────────────────────────────────────────────────────┐
│ 🏥 RADAR DE RECLAMAÇÕES DE PRESTADORES — Pré-NIP                    │
│─────────────────────────────────────────────────────────────────────│
│ Prestador           │ Reclamações │ vs. mês ant. │ Tipo dominante   │
│─────────────────────┼─────────────┼──────────────┼──────────────────│
│ Clínica São Lucas   │     47      │  ▲ +38%  🔴  │ Acesso (72%)    │
│ Lab Diagnósticos X  │     31      │  ▲ +15%      │ Qualidade (61%) │
│ Hospital Regional Y │     28      │  ▲ +22%  🔴  │ Cobrança (54%)  │
│ UPA Centro          │     19      │  ▼ -8%       │ Atendimento(48%)│
│─────────────────────────────────────────────────────────────────────│
│ 🔴 Alerta: crescimento acelerado (>20% em 2 semanas)                │
│                               [Ver conversas originais →]           │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### US-18 — Prestadores em Destaque e em Atenção

**História**
```
Como Superintendente, quero ver um ranking de prestadores por performance
conversacional — do melhor ao pior — para embasar decisões de encaminhamento
preferencial e de revisão ou exclusão de rede.
```

**Dados usados**
- Volume de reclamações por prestador (GSP — mesmo da US-17)
- Volume de referências positivas por prestador (conversas com menção elogiosa ou de satisfação)
- Custo médio por procedimento por prestador `[requer dados do cliente]`
- Especialidade e tipo de prestador (hospital, clínica, laboratório)

**Possíveis insights**
- O Consultório Dr. Mendes tem 0 reclamações e 12 referências positivas em ortopedia — candidato a prestador preferencial
- Há correlação entre baixo custo e alto volume de reclamações em 2 laboratórios — possível trade-off de qualidade
- A distribuição de encaminhamentos é desigual: 3 prestadores concentram 70% do volume sem critério claro

**Possíveis ações**
- Incluir prestadores em destaque em lista de encaminhamento preferencial no protocolo do enfermeiro
- Iniciar processo de revisão de contrato com prestadores em atenção crítica
- Apresentar ranking como argumento para revisão da rede para a diretoria médica

**Wireframe**
```
┌─────────────────────────────────────────────────────────────────────┐
│ 🌟 PRESTADORES EM DESTAQUE E EM ATENÇÃO     [requer dados cliente]  │
│─────────────────────────────────────────────────────────────────────│
│ EM DESTAQUE (baixa reclamação + boa referência)                     │
│  ✅ Consultório Dr. Mendes   │ Ortopedia │ 0 reclam. │ 12 ref. pos. │
│  ✅ Clínica Vida Saúde       │ Geral     │ 2 reclam. │  8 ref. pos. │
│                                                                     │
│ EM ATENÇÃO (alto volume de reclamações)                             │
│  🔴 Clínica São Lucas        │ Geral     │ 47 reclam.│ ▲ +38%      │
│  🔴 Hospital Regional Y      │ Urgência  │ 28 reclam.│ ▲ +22%      │
│  🟡 Lab Diagnósticos X       │ Exames    │ 31 reclam.│ ▲ +15%      │
│─────────────────────────────────────────────────────────────────────│
│ Custo médio por procedimento disponível com integração de dados.    │
│                                    [requer dados do cliente]        │
└─────────────────────────────────────────────────────────────────────┘
```

---

### Seção 6 — Carteiras: Análise dos Clientes da Operadora
*Responde: "Quais empresas estão bem? Onde há risco de churn ou conversa difícil com o RH?"*

---

#### US-19 — Comparativo entre Empresas Empregadoras

**História**
```
Como Superintendente, quero comparar o desempenho entre as empresas empregadoras
para identificar onde o programa está gerando mais valor e replicar essas
práticas nas demais, e para preparar a equipe comercial para conversas de
renovação.
```

**Dados usados**
- % de engajamento no chat por empresa (GSP)
- Top 3 temas conversacionais por empresa (GSP)
- Taxa simulada de uso de PS por empresa `[requer dados do cliente]`
- Variação dos indicadores vs. mês anterior

**Possíveis insights**
- A TechCorp tem o maior engajamento (68%) e menor uso de PS simulado — correlação positiva com o programa
- A Indústria Beta tem o menor engajamento (29%) apesar de 12 meses de programa — possível desalinhamento com o RH
- Os temas conversacionais da Construtora Alfa são 80% de ortopedia — oportunidade de programa específico de saúde musculoesquelética

**Possíveis ações**
- Replicar a estratégia de engajamento da TechCorp para outras empresas (investigar o que foi feito diferente)
- Agendar reunião com RH da Indústria Beta para revisão da estratégia de comunicação do programa
- Propor programa de saúde ocupacional musculoesquelética para a Construtora Alfa como upsell

**Wireframe**
```
┌─────────────────────────────────────────────────────────────────────┐
│ 🏢 COMPARATIVO ENTRE EMPRESAS                                        │
│─────────────────────────────────────────────────────────────────────│
│ Empresa          │ Engaj. │ vs.mês │ Top tema           │ PS sim.  │
│──────────────────┼────────┼────────┼────────────────────┼──────────│
│ TechCorp         │  68%   │ ▲ +3p  │ Saúde mental       │  1,1%   │
│ Construtora Alfa │  51%   │ ▼ -12p │ Ortopedia/dor      │  2,3%   │
│ Indústria Beta   │  29%   │ → 0p   │ Dúvida medicação   │  3,4%   │
│─────────────────────────────────────────────────────────────────────│
│ ✅ Melhor performer: TechCorp   🔴 Pior performer: Indústria Beta   │
│                                                                     │
│ [Drill-down por empresa →]                                          │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### US-20 — Empresas com Piora de Indicador

**História**
```
Como Superintendente, quero identificar quais empresas clientes estão com piora
de indicadores para antecipar conversas difíceis com o RH e com a Diretoria
Comercial, chegando à reunião com análise e proposta de ação — não só com o
problema.
```

**Dados usados**
- Variação de engajamento no chat por empresa vs. mês anterior (GSP)
- Variação de temas de risco por empresa vs. mês anterior (GSP)
- Variação de uso de PS simulado por empresa `[requer dados do cliente]`
- Top temas de conversa da empresa no período atual

**Possíveis insights**
- A Construtora Alfa caiu 12p.p. de engajamento e subiu 35% em temas de ortopedia — possível problema de absenteísmo se não endereçado
- A Indústria Beta mantém engajamento estável mas com crescimento de temas de saúde mental — risco silencioso
- As empresas em piora no mês têm em comum alta taxa de temas de acesso negado — problema de rede, não de programa

**Possíveis ações**
- Preparar memo para o RH da Construtora Alfa com análise de risco de afastamento por ortopedia
- Propor para a Diretoria Comercial revisão proativa do contrato da Indústria Beta com inclusão de protocolo de saúde mental
- Investigar se o problema de acesso negado em múltiplas empresas é um gargalo de rede específico (ex.: ortopedia, dermatologia)

**Wireframe**
```
┌─────────────────────────────────────────────────────────────────────┐
│ 📉 EMPRESAS COM PIORA DE INDICADOR                                   │
│─────────────────────────────────────────────────────────────────────│
│ Empresa          │ Indicador em piora      │ Variação  │ Ação suger.│
│──────────────────┼─────────────────────────┼───────────┼────────────│
│ Construtora Alfa │ Engajamento             │ ▼ -12p.p. │ Contatar  │
│                  │ Temas de risco (ortop.) │ ▲ +35%    │ RH         │
│──────────────────┼─────────────────────────┼───────────┼────────────│
│ Indústria Beta   │ Temas saúde mental      │ ▲ +28%    │ Propor    │
│                  │ (engajamento estável)   │           │ protocolo  │
│─────────────────────────────────────────────────────────────────────│
│ ▼ Drill-down: Construtora Alfa                                      │
│   Top temas de conversa no período:                                 │
│   ████████████ Dor lombar / ortopedia (48%)                         │
│   ██████       Acesso a especialista (24%)                          │
│   ████         Saúde mental (16%)                                   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Histórias Transversais (UX e Infraestrutura)

---

#### US-21 — Seletor de Período e Filtros Globais

**História**
```
Como usuário, quero filtrar todo o relatório por período e empresa empregadora
para adaptar a visão ao contexto da minha reunião sem precisar reconfigurar
cada seção individualmente.
```

**Dados usados**
- Metadados de todas as conversas e registros GSP (data, empresa)
- Lista de empresas empregadoras ativas na carteira

**Possíveis insights**
- Permite isolar o período de uma campanha específica para medir impacto pontual
- Permite preparar visão customizada por empresa para a reunião com cada RH

**Possíveis ações**
- Preparar visão "Últimos 3 meses / Construtora Alfa" antes de reunião de renovação
- Comparar mês de campanha vs. mês anterior para medir ROI de ação específica

**Wireframe**
```
┌─────────────────────────────────────────────────────────────────────┐
│ [Logo Nilo]   DASHBOARD SUPERINTENDÊNCIA MÉDICA                     │
│─────────────────────────────────────────────────────────────────────│
│ Período: [Mês atual ▾] [Mês anterior] [Últ. 3 meses] [Últ. 6 meses]│
│ Empresa: [Todas as empresas ▾]  [TechCorp ×] [+ adicionar]         │
│ ─────────────────────────────────────────────────────────────────── │
│ Filtros ativos: Jan–Mar 2025 | Todas as empresas          [Limpar]  │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### US-22 — Navegação e Identidade Visual

**História**
```
Como usuário, quero navegar entre as seções de forma clara e reconhecer que
estou usando um produto Nilo, para que o relatório transmita credibilidade
ao ser apresentado para clientes.
```

**Dados usados**
- N/A — história de UX/frontend

**Possíveis insights**
- N/A

**Possíveis ações**
- N/A

**Wireframe**
```
┌──────────────┬──────────────────────────────────────────────────────┐
│  [Logo Nilo] │  Filtros globais: [Período ▾] [Empresa ▾]           │
│──────────────│──────────────────────────────────────────────────────│
│              │                                                      │
│ 1. Alertas   │  [Conteúdo da seção ativa]                          │
│    e Opor.   │                                                      │
│              │                                                      │
│ 2. Pulso da  │                                                      │
│    Populaç.  │                                                      │
│              │                                                      │
│ 3. Perform.  │                                                      │
│    da Equipe │                                                      │
│              │                                                      │
│ 4. Efetivid. │                                                      │
│    Programa  │                                                      │
│              │                                                      │
│ 5. Analise   │                                                      │
│    Prestador │                                                      │
│              │                                                      │
│ 6. Carteiras │                                                      │
│              │                                                      │
└──────────────┴──────────────────────────────────────────────────────┘
```

---

#### US-23 — Copiloto de Análise com IA

**História**
```
Como Superintendente, quero poder fazer perguntas sobre os gráficos e receber
insights gerados por IA, para aprofundar análises sem precisar de um analista
de dados presente na reunião.
```

**Dados usados**
- Estado atual do gráfico/módulo sendo visualizado (dados filtrados e período ativo)
- Histórico de perguntas e respostas da sessão
- Contexto do dataset (empresa, período, métricas disponíveis)

**Possíveis insights**
- "Por que o uso de PS desta empresa subiu em março?" → IA cruza temas de conversa com o período e identifica pico de reclamações de acesso a ortopedista
- "Qual é a empresa com maior potencial de melhoria de engajamento?" → IA compara volume de beneficiários não engajados com histórico de resposta a campanhas

**Possíveis ações**
- Usar respostas salvas na aba Insights para preparar narrativa da apresentação para a diretoria
- Gerar perguntas de análise de sentimento contextualizado por empresa ou período específico

**Wireframe**
```
┌─────────────────────────────────────────────────────────────────────┐
│ 🤖 COPILOTO DE ANÁLISE                              [Aba: Insights] │
│─────────────────────────────────────────────────────────────────────│
│ Sobre o gráfico atual: Mapa de Temas Conversacionais (Jan–Mar 2025) │
│                                                                     │
│ Você: Por que ortopedia subiu tanto em fevereiro?                   │
│                                                                     │
│ IA: Em fevereiro, 47 pacientes da Construtora Alfa mencionaram dor  │
│     lombar ou dificuldade de agendar ortopedista. Isso coincide com │
│     o aumento de reclamações do Clínica São Lucas (US-17). A hipó-  │
│     tese mais provável é gargalo de capacidade no prestador, não    │
│     aumento real de incidência.                                     │
│                                                                     │
│ [💾 Salvar insight]  [Fazer outra pergunta...]                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### US-24 — Dados Fictícios Realistas e Dataset Documentado

**História**
```
Como time Nilo, queremos que os dados fictícios sejam coerentes e realistas
para que o relatório seja convincente em uma apresentação para cliente e
os desenvolvedores saibam exatamente onde substituir por dados reais.
```

**Dados usados (a gerar/mockar)**
- Operadora: "Saúde Exemplo S/A" — 12.000 beneficiários
- 3 empresas empregadoras: TechCorp (3.200 vidas), Construtora Alfa (4.800 vidas), Indústria Beta (4.000 vidas)
- Período: janeiro a março de 2025
- Distribuição de condições crônicas: diabetes (18%), hipertensão (24%), ortopedia (31%), saúde mental (14%), oncologia (4%), TEA (2%), outros (7%)
- Todos os números das US devem ser internamente consistentes (subtotais batem com totais)

**Possíveis insights**
- N/A — história técnica

**Possíveis ações**
- Comentários no código indicando `// DADO REAL: substituir por query na tabela X`

**Wireframe**
- N/A — história técnica

---

#### US-25 — Sinalizações de Dado que Requer Integração

**História**
```
Como time Nilo, queremos sinalizar claramente quais dados do relatório requerem
integração com o cliente vs. o que já temos hoje, para que a conversa de
vendas seja honesta e para que o cliente entenda o que precisa fornecer para
ativar cada módulo.
```

**Dados usados**
- Mapeamento de cada campo/métrica por fonte: GSP (disponível hoje) vs. dados do cliente (requer integração)

**Possíveis insights**
- Clareza sobre o que é entregável no dia 1 vs. o que requer projeto de integração

**Possíveis ações**
- Usar o mapa de integração como insumo para proposta comercial e escopo de projeto técnico

**Wireframe**
```
┌─────────────────────────────────────────────────────────────────────┐
│ Módulo com dado de integração:                                      │
│                                                                     │
│  Taxa de internação: 2,01 por beneficiário                          │
│  ⓘ [requer dados do cliente]  ──────────────────────────────────   │
│     Este dado requer o envio mensal do arquivo de utilização        │
│     (TISS ou layout acordado). Entre em contato com seu executivo   │
│     de conta para ativar este módulo.                               │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Dependências e Ordem de Desenvolvimento

### Sprint 1 — Fundação
- US-24 — Dataset fictício e documentação
- US-21 — Filtros globais e seletor de período
- US-22 — Navegação e identidade visual

### Sprint 2 — Maior impacto visual (demo)
- US-01 — Morning brief com IA
- US-05 — Mapa de temas conversacionais
- US-08 — Loop do PA (argumento financeiro)
- US-17 — Radar de reclamações pré-NIP

### Sprint 3 — Alertas e Efetividade
- US-02 — Pacientes de alto risco (com quadrantes)
- US-14 — Engajados vs. não-engajados (quatro quadrantes)
- US-15 — Sinistralidade × acompanhamento
- US-16 — Top beneficiários por custo + conversas
- US-09 — Radar de saúde mental

### Sprint 4 — Performance e Completude
- US-10 a US-13 — Performance da equipe
- US-03 / US-04 — NIP e risco proativo
- US-06 / US-07 — Séries temporais de engajamento e risco
- US-19 / US-20 — Análise de carteiras

### Sprint 5 — Refinamento e Copiloto
- US-18 — Prestadores destaque/atenção
- US-23 — Copiloto de análise com IA
- US-25 — Sinalizações de integração
- Revisão geral de UX e consistência de dados

---

## Critérios de Pronto do Épico

- [ ] Dashboard abre em browser sem instalação (HTML/React deployável)
- [ ] Todas as 6 seções navegáveis e com dados fictícios coerentes
- [ ] Filtros globais funcionando
- [ ] Matriz de quadrantes de engajamento presente e legível
- [ ] Wireframes de sinistralidade × acompanhamento e top beneficiários implementados
- [ ] Sinalizações `[requer dados do cliente]` presentes nas seções relevantes
- [ ] Morning brief com IA presente como destaque na seção de alertas
- [ ] Testado com pelo menos 1 pessoa externa ao time (idealmente Superintendente Médico ou perfil similar)
- [ ] Time consegue apresentar o relatório em 15 minutos sem precisar explicar a interface

---

## O que Este Épico NÃO Inclui

- Backend real ou integração com dados de produção
- Autenticação/login
- Exportação de PDF (pode ser adicionado como épico futuro)
- Versão mobile
- Dados reais de qualquer cliente

---

*Referência: épico v2.0 + estrutura enriquecida com dados, insights e ações por US*
