// ========== Nilo Dashboard — Proxy Server ==========
// Serves static files + streams Claude API for the AI Panel
// Usage: ANTHROPIC_API_KEY=your-key node server.js
//        Then open http://localhost:3456

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 3456;
const API_KEY = process.env.ANTHROPIC_API_KEY;
const STATIC_DIR = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
};

// ========== System prompt — context about the Nilo dashboard ==========
const SYSTEM_PROMPT = `Você é um assistente especializado em gestão de saúde corporativa, integrado ao painel Nilo da operadora "Saúde Exemplo S/A".

CONTEXTO DA OPERADORA:
- Total de beneficiários: 12.000
- Empresas contratantes:
  • TechCorp Brasil — 3.200 vidas, setor Tecnologia
  • Construtora Alfa — 4.800 vidas, setor Construção (status: Em Atenção)
  • Indústria Beta — 4.000 vidas, setor Indústria
- Período do relatório: Jan–Mar 2025 (histórico desde Out/2024)

DADOS PRINCIPAIS (Mar/2025):
- Beneficiários em acompanhamento GSP: 1.085 = 9,0% da carteira (+6,4% vs mês anterior)
- Conversas no período: 2.340 (+11,3% vs mês anterior)
- Menções a PA (Pronto Atendimento): 98
- Economia estimada com intervenções no PA: R$ 245.000 no trimestre
- Satisfação geral da equipe: 4,3/5,0
- Taxa de resolução no 1º contato: 78%
- Tempo médio de resposta: 14 minutos

TEMAS PREDOMINANTES (Jan–Mar/2025):
1. Saúde Mental — 312 menções, prevalente em Fev/Mar
2. Dor Crônica — 295 menções, distribuído entre carteiras
3. Acesso a Especialista — 278 menções, crescimento constante
4. Dúvidas sobre Medicação — 172 menções
5. Saúde Preventiva — 156 menções

INDICADORES POR CARTEIRA (Mar/2025):
- TechCorp Brasil: Engajamento 9,3% | Saúde Mental 18,2% | Uso PA 3,1% — Status: Estável
- Construtora Alfa: Engajamento 8,7% | Saúde Mental 22,4% | Uso PA 4,8% — Status: Em Atenção
- Indústria Beta: Engajamento 9,0% | Saúde Mental 19,1% | Uso PA 3,8% — Status: Estável

ALERTAS ATIVOS:
- 3 pacientes críticos aguardando acompanhamento ativo há mais de 15 dias
- 12 NIPs nos últimos 30 dias, 4 potencialmente evitáveis com intervenção prévia da equipe GSP
- Construtora Alfa com maior uso de PA e menor engajamento entre as carteiras

EQUIPE (Performance da Equipe):
- Composição: enfermeiros e administrativos
- Melhor desempenho: Ana Santos (satisfação 4,8/5,0, tendência de melhora)
- Atenção: Carlos Lima (satisfação 3,2/5,0, tendência de queda)
- Volume de interações: distribuído entre 6 profissionais ativos

EFETIVIDADE DO PROGRAMA:
- Loop de intervenção no PA: 312 menções → 289 qualificadas → 187 com suporte → 98 com resolução ativa
- Economia estimada evitando NIPs desnecessários: R$ 245.000 / trimestre
- Taxa de conversão das intervenções GSP: 52%

INSTRUÇÕES DE COMPORTAMENTO:
- Responda SEMPRE em português brasileiro
- Seja conciso, direto e focado em insights acionáveis para o gestor de saúde
- Use os dados numéricos acima quando relevante
- Sugira ações concretas e priorizadas quando apropriado
- Se perguntarem sobre dados não disponíveis neste contexto, diga claramente que não tem acesso a esses dados específicos
- Nunca invente dados que não estão no contexto fornecido
- Mantenha um tom profissional mas acessível`;

// ========== HTTP Server ==========
http.createServer((req, res) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    });
    res.end();
    return;
  }

  // Chat API endpoint
  if (req.method === 'POST' && req.url === '/api/chat') {
    handleChat(req, res);
    return;
  }

  // Static file serving
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';

  const filePath = path.join(STATIC_DIR, urlPath);

  // Security: prevent path traversal
  if (!filePath.startsWith(STATIC_DIR + path.sep) && filePath !== STATIC_DIR) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found: ' + urlPath);
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`\n  Nilo Dashboard  →  http://localhost:${PORT}\n`);
  if (!API_KEY) {
    console.warn('  AVISO: ANTHROPIC_API_KEY nao definida — o painel de IA nao funcionara.\n');
    console.warn('  Execute com: ANTHROPIC_API_KEY=sk-ant-... node server.js\n');
  } else {
    console.log('  API key detectada. Painel de IA pronto.\n');
  }
});

// ========== Chat handler — streams Claude response ==========
function handleChat(req, res) {
  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => {
    let parsed;
    try {
      parsed = JSON.parse(body);
    } catch {
      res.writeHead(400);
      res.end('Bad request');
      return;
    }

    const { messages = [], context = {} } = parsed;

    if (!API_KEY) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'ANTHROPIC_API_KEY not set on server' }));
      return;
    }

    const sectionNames = {
      alerts:        'Alertas e Oportunidades',
      pulse:         'Pulso da População',
      team:          'Performance da Equipe',
      effectiveness: 'Efetividade do Programa',
      providers:     'Análise de Prestadores',
      portfolios:    'Carteiras',
    };

    const sectionNote = context.sectionId
      ? `\n\nO usuário está atualmente na seção "${sectionNames[context.sectionId] || context.sectionId}" do painel.`
      : '';

    const payload = JSON.stringify({
      model: 'claude-opus-4-6',
      max_tokens: 1024,
      stream: true,
      system: SYSTEM_PROMPT + sectionNote,
      messages,
    });

    const options = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    });

    const apiReq = https.request(options, apiRes => {
      apiRes.pipe(res);
    });

    apiReq.on('error', err => {
      res.write(`data: ${JSON.stringify({ type: 'error', message: err.message })}\n\n`);
      res.end();
    });

    apiReq.write(payload);
    apiReq.end();
  });
}
