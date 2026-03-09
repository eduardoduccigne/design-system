// ========== Section 1 — Alertas e Oportunidades (US-01 a US-04) ==========
import { createDataTable } from '../components/data-table.js';
import { createIntegrationBadge, createRiskDot, createTrendBadge, createStatusBadge } from '../components/badge.js';
import { createQuadrantMatrix } from '../components/quadrant-matrix.js';
import { createIntegrationMarker } from '../components/integration-marker.js';
import { fmt, MONTH_LABELS } from '../app.js';
import { QUADRANT_LABELS, QUADRANT_COLORS } from '../data/quadrants.js';

export const SectionAlerts = {
  rendered: false,
  needsRefresh: false,

  render(container, filteredData, rawData) {
    container.innerHTML = '';
    this._buildContent(container, filteredData, rawData);
    this.rendered = true;
  },

  refresh(container, filteredData, rawData) {
    container.innerHTML = '';
    this._buildContent(container, filteredData, rawData);
    this.needsRefresh = false;
  },

  _buildContent(container, data, rawData) {
    // US-01: Morning Brief note (actual brief is rendered above by MorningBrief component)
    container.appendChild(this._renderMorningBriefNote());

    // US-02: Quadrant overview + High-risk patients table
    container.appendChild(this._renderQuadrantOverview(data, rawData));
    container.appendChild(this._renderHighRisk(data, rawData));

    // US-03: NIP sentiment analysis
    container.appendChild(this._renderNipSentiment(data, rawData));

    // US-04: Proactive risk — irritated without NIP
    container.appendChild(this._renderIrritatedNoNip(data, rawData));

    // Company indicators with worsening trends
    container.appendChild(this._renderCompanyIndicators(data, rawData));
  },

  // ========== US-01: Morning Brief note ==========
  _renderMorningBriefNote() {
    const note = document.createElement('div');
    note.className = 'card card--full';
    note.innerHTML = `
      <div class="card__body" style="padding:var(--spacing-3) var(--spacing-4);display:flex;align-items:center;gap:var(--spacing-3)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
        <span style="color:var(--muted-foreground);font-size:0.875rem">
          O <strong style="color:var(--foreground)">Morning Brief</strong> com os indicadores-chave do dia esta disponivel na barra acima.
          Clique em qualquer metrica para navegar diretamente a secao correspondente.
        </span>
      </div>
    `;
    return note;
  },

  // ========== US-02: Quadrant Overview (2x2 matrix) ==========
  _renderQuadrantOverview(data, rawData) {
    const card = document.createElement('div');
    card.className = 'card card--full mt-6';

    // Count patients per quadrant from filtered high-risk data
    const patients = rawData.highRiskPatients
      .filter(p => data._companyIds.includes(p.companyId));

    const counts = { ideal: 0, engaged: 0, silent: 0, invisible: 0 };
    patients.forEach(p => {
      const q = p.quadrant || 'invisible';
      if (counts[q] !== undefined) counts[q]++;
    });

    const total = patients.length || 1;
    const quadrantData = {
      ideal:     { count: counts.ideal,     pct: (counts.ideal / total) * 100 },
      engaged:   { count: counts.engaged,   pct: (counts.engaged / total) * 100 },
      silent:    { count: counts.silent,     pct: (counts.silent / total) * 100 },
      invisible: { count: counts.invisible,  pct: (counts.invisible / total) * 100 },
    };

    card.innerHTML = `
      <div class="card__header">
        <div>
          <div class="card__title">Visao por Quadrante — Pacientes de Alto Risco</div>
          <div class="card__subtitle">Distribuicao dos pacientes de risco por quadrante de engajamento e plano de cuidado</div>
        </div>
      </div>
      <div class="card__body" id="quadrant-overview-body"></div>
    `;

    const matrix = createQuadrantMatrix(quadrantData);

    requestAnimationFrame(() => {
      const body = card.querySelector('#quadrant-overview-body');
      if (body) {
        body.style.display = 'flex';
        body.style.justifyContent = 'center';
        body.appendChild(matrix);
      }
    });

    return card;
  },

  // ========== US-02: Fila de pacientes de alto risco ==========
  _renderHighRisk(data, rawData) {
    const card = document.createElement('div');
    card.className = 'card card--full mt-6';

    card.innerHTML = `
      <div class="card__header">
        <div>
          <div class="card__title">Pacientes de Alto Risco sem Acompanhamento Ativo</div>
          <div class="card__subtitle">Pacientes com sinais de risco identificados nas conversas, priorizados por urgencia</div>
        </div>
      </div>
      <div class="card__body" id="high-risk-table"></div>
    `;

    const patients = rawData.highRiskPatients
      .filter(p => data._companyIds.includes(p.companyId))
      .sort((a, b) => b.riskScore - a.riskScore);

    const company = (id) => rawData.companies.find(c => c.id === id)?.name || id;

    const quadrantBadge = (quadrant) => {
      if (!quadrant) return '<span class="badge badge--neutral">--</span>';
      const label = QUADRANT_LABELS[quadrant] || quadrant;
      const color = QUADRANT_COLORS[quadrant] || 'var(--muted-foreground)';
      return `<span class="badge" style="color:${color};background:${color}15;border:1px solid ${color}30;font-weight:600">${label}</span>`;
    };

    const table = createDataTable({
      columns: [
        {
          key: 'riskLevel', label: 'Risco', align: 'center',
          render: (val) => { const dot = createRiskDot(val); return dot; },
        },
        { key: 'name', label: 'Paciente' },
        { key: 'age', label: 'Idade', align: 'center' },
        { key: 'companyId', label: 'Empresa', format: (val) => company(val) },
        {
          key: 'quadrant', label: 'Quadrante',
          render: (val) => quadrantBadge(val),
        },
        { key: 'condition', label: 'Condicao sinalizadora' },
        { key: 'lastContact', label: 'Ultimo contato', format: (val) => {
          const d = new Date(val);
          return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        }},
        { key: 'daysSinceContact', label: 'Dias s/ contato', align: 'center',
          render: (val) => {
            const color = val > 14 ? 'var(--destructive-600)' : val > 7 ? 'var(--warning-600)' : 'var(--foreground)';
            return `<strong style="color:${color}">${val}d</strong>`;
          },
        },
        {
          key: 'id', label: '', align: 'center',
          render: () => `<button class="btn btn--ghost btn--sm" disabled title="Funcionalidade disponivel na versao integrada">Delegar</button>`,
        },
      ],
      rows: patients,
      highlightCondition: (row) => row.riskLevel === 'critical' ? 'danger' : null,
    });

    requestAnimationFrame(() => {
      const body = card.querySelector('#high-risk-table');
      if (body) body.appendChild(table);
    });

    return card;
  },

  // ========== US-03: Analise de Sentimento — Pacientes com NIP ==========
  _renderNipSentiment(data, rawData) {
    const card = document.createElement('div');
    card.className = 'card card--full mt-6';

    const patients = (rawData.nipSentimentAnalysis || [])
      .filter(p => data._companyIds.includes(p.companyId));

    const interceptable = patients.filter(p => p.interceptable).length;
    const total = patients.length;
    const pct = total > 0 ? Math.round((interceptable / total) * 100) : 0;

    const company = (id) => rawData.companies.find(c => c.id === id)?.name || id;

    const sentimentLabel = (s) => {
      const map = { very_negative: 'Muito negativo', negative: 'Negativo', neutral: 'Neutro', positive: 'Positivo' };
      return map[s] || '--';
    };
    const sentimentColor = (s) => {
      const map = { very_negative: 'var(--destructive-600)', negative: 'var(--warning-600)', neutral: 'var(--muted-foreground)' };
      return map[s] || 'var(--muted-foreground)';
    };

    card.innerHTML = `
      <div class="card__header">
        <div>
          <div class="card__title">Analise de Sentimento — Pacientes com NIP</div>
          <div class="card__subtitle">Conversas recentes que poderiam ter sido interceptadas antes da abertura de NIP</div>
        </div>
        <div class="kpi-mini">
          <span class="kpi-mini__value" style="color:var(--warning-600)">${interceptable} de ${total}</span>
          <span class="kpi-mini__label">NIPs interceptaveis (${pct}%)</span>
        </div>
      </div>
      <div class="card__body" id="nip-sentiment-table"></div>
    `;

    const table = createDataTable({
      columns: [
        { key: 'name', label: 'Paciente' },
        { key: 'companyId', label: 'Empresa', format: (val) => company(val) },
        { key: 'nipDate', label: 'Data NIP', format: (val) => {
          const d = new Date(val + 'T00:00:00');
          return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        }},
        { key: 'nipReason', label: 'Motivo NIP' },
        { key: 'lastConversationTopic', label: 'Ultima conversa', format: (val) => val || 'Sem conversa registrada' },
        {
          key: 'lastConversationSentiment', label: 'Sentimento',
          render: (val) => {
            if (!val) return '<span class="badge badge--neutral">--</span>';
            return `<span class="badge" style="color:${sentimentColor(val)};background:${sentimentColor(val)}15;border:1px solid ${sentimentColor(val)}30">${sentimentLabel(val)}</span>`;
          },
        },
        { key: 'daysBeforeNip', label: 'Dias antes', align: 'center',
          render: (val) => val != null ? `<strong>${val}d</strong>` : '--',
        },
        {
          key: 'interceptable', label: 'Interceptavel?', align: 'center',
          render: (val) => val
            ? '<span class="badge badge--success">Sim</span>'
            : '<span class="badge badge--neutral">Nao</span>',
        },
      ],
      rows: patients,
      highlightCondition: (row) => row.interceptable ? 'warning' : null,
    });

    requestAnimationFrame(() => {
      const body = card.querySelector('#nip-sentiment-table');
      if (body) body.appendChild(table);
    });

    return card;
  },

  // ========== US-04: Pacientes Insatisfeitos sem NIP — Risco Proativo ==========
  _renderIrritatedNoNip(data, rawData) {
    const card = document.createElement('div');
    card.className = 'card card--full mt-6';

    const riskOrder = { high: 0, medium: 1, low: 2 };
    const trendOrder = { worsening: 0, stable: 1, improving: 2 };

    const patients = (rawData.irritatedNoNip || [])
      .filter(p => data._companyIds.includes(p.companyId))
      .sort((a, b) => (riskOrder[a.nipRisk] - riskOrder[b.nipRisk]) || (trendOrder[a.sentimentTrend] - trendOrder[b.sentimentTrend]));

    const highRiskCount = patients.filter(p => p.nipRisk === 'high').length;

    const company = (id) => rawData.companies.find(c => c.id === id)?.name || id;

    card.innerHTML = `
      <div class="card__header">
        <div>
          <div class="card__title">Pacientes Insatisfeitos sem NIP — Risco Proativo</div>
          <div class="card__subtitle">Pacientes com sentimento negativo ou NPS baixo que ainda nao abriram NIP</div>
        </div>
        <div class="kpi-mini">
          <span class="kpi-mini__value" style="color:var(--destructive-600)">${highRiskCount}</span>
          <span class="kpi-mini__label">risco alto de NIP</span>
        </div>
      </div>
      <div class="card__body" id="irritated-no-nip-table"></div>
    `;

    const trendLabel = (t) => {
      const map = { worsening: '\u2193 Piorando', stable: '\u2192 Estavel', improving: '\u2191 Melhorando' };
      return map[t] || t;
    };
    const trendColor = (t) => {
      const map = { worsening: 'var(--destructive-600)', stable: 'var(--muted-foreground)', improving: 'var(--success-600, #16A34A)' };
      return map[t] || 'var(--muted-foreground)';
    };
    const riskLabel = (r) => {
      const map = { high: 'Alto', medium: 'Medio', low: 'Baixo' };
      return map[r] || r;
    };
    const riskBadgeClass = (r) => {
      const map = { high: 'badge--danger', medium: 'badge--warning', low: 'badge--success' };
      return map[r] || 'badge--neutral';
    };
    const sentimentLabel = (s) => {
      const map = { very_negative: 'Muito negativo', negative: 'Negativo', neutral: 'Neutro' };
      return map[s] || s;
    };
    const sentimentColor = (s) => {
      const map = { very_negative: 'var(--destructive-600)', negative: 'var(--warning-600)', neutral: 'var(--muted-foreground)' };
      return map[s] || 'var(--muted-foreground)';
    };

    const table = createDataTable({
      columns: [
        { key: 'name', label: 'Paciente' },
        { key: 'companyId', label: 'Empresa', format: (val) => company(val) },
        { key: 'nps', label: 'NPS', align: 'center',
          render: (val) => {
            const color = val <= 3 ? 'var(--destructive-600)' : val <= 5 ? 'var(--warning-600)' : 'var(--success-600, #16A34A)';
            return `<strong style="color:${color}">${val}</strong>`;
          },
        },
        {
          key: 'sentimentTrend', label: 'Tendencia',
          render: (val) => `<span style="color:${trendColor(val)};font-weight:600">${trendLabel(val)}</span>`,
        },
        {
          key: 'currentSentiment', label: 'Sentimento',
          render: (val) => `<span style="color:${sentimentColor(val)}">${sentimentLabel(val)}</span>`,
        },
        { key: 'mainTopic', label: 'Tema principal' },
        { key: 'conversationsLast30d', label: 'Conversas 30d', align: 'center' },
        {
          key: 'nipRisk', label: 'Risco NIP', align: 'center',
          render: (val) => `<span class="badge ${riskBadgeClass(val)}">${riskLabel(val)}</span>`,
        },
      ],
      rows: patients,
      highlightCondition: (row) => row.nipRisk === 'high' ? 'danger' : row.nipRisk === 'medium' ? 'warning' : null,
    });

    requestAnimationFrame(() => {
      const body = card.querySelector('#irritated-no-nip-table');
      if (body) body.appendChild(table);
    });

    return card;
  },

  // ========== Empresas com piora de indicadores ==========
  _renderCompanyIndicators(data, rawData) {
    const card = document.createElement('div');
    card.className = 'card card--full mt-6';

    const header = document.createElement('div');
    header.className = 'card__header';

    const titleDiv = document.createElement('div');
    titleDiv.innerHTML = `
      <div class="card__title">Empresas com Piora de Indicadores</div>
      <div class="card__subtitle">Antecipar conversas com RH e Diretoria Comercial</div>
    `;
    header.appendChild(titleDiv);

    card.appendChild(header);

    const body = document.createElement('div');
    body.className = 'card__body';

    const indicators = (rawData.companyIndicators || [])
      .filter(c => data._companyIds.includes(c.companyId));

    const table = createDataTable({
      columns: [
        { key: 'companyName', label: 'Empresa' },
        {
          key: 'engagement', label: 'Engajamento',
          render: (val, row) => {
            const div = document.createElement('span');
            div.className = 'flex items-center gap-2';
            div.innerHTML = `<span class="font-semibold">${fmt.decimal.format(val)}%</span>`;
            div.appendChild(createTrendBadge(
              ((val - row.prevEngagement) / row.prevEngagement * 100),
              true
            ));
            return div;
          },
        },
        {
          key: 'mentalHealthRate', label: 'Saude Mental',
          render: (val, row) => {
            const div = document.createElement('span');
            div.className = 'flex items-center gap-2';
            div.innerHTML = `<span class="font-semibold">${fmt.decimal.format(val)}%</span>`;
            div.appendChild(createTrendBadge(
              ((val - row.prevMentalHealthRate) / row.prevMentalHealthRate * 100),
              false // lower is better
            ));
            return div;
          },
        },
        {
          key: 'status', label: 'Status',
          render: (val) => {
            const labels = { good: 'Estavel', attention: 'Atencao', critical: 'Critico' };
            return createStatusBadge(val, labels[val]);
          },
        },
      ],
      rows: indicators,
      highlightCondition: (row) => row.status === 'attention' ? 'warning' : null,
    });

    body.appendChild(table);

    // Drill-down: top themes per company
    const drillDown = document.createElement('div');
    drillDown.className = 'mt-4';
    indicators.forEach(ind => {
      const row = document.createElement('div');
      row.className = 'py-2 border-b text-sm';
      row.innerHTML = `
        <span class="font-semibold">${ind.companyName}:</span>
        <span class="text-secondary ml-2">${(ind.topThemes || []).join(' \u00B7 ')}</span>
      `;
      drillDown.appendChild(row);
    });
    body.appendChild(drillDown);

    card.appendChild(body);
    return card;
  },
};
