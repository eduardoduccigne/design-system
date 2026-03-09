// ========== Morning Brief -- Narrative Paragraph Style ==========
// Barra persistente entre topbar e secoes, sempre visivel.
// V2: Changed from metric buttons to a natural-language narrative paragraph.

import { fmt } from '../app.js';
import { AIPanel } from './ai-panel.js';

export const MorningBrief = {
  _container: null,
  _navigateFn: null,

  /** Initialize: render the brief bar and store the navigate callback. */
  init(container, filteredData, rawData, navigateFn) {
    this._container = container;
    this._navigateFn = navigateFn;
    this._render(filteredData, rawData);
  },

  /** Re-render with new filtered data (called on filter change). */
  refresh(filteredData, rawData) {
    if (!this._container) return;
    this._render(filteredData, rawData);
  },

  /** Internal: full render cycle. */
  _render(filteredData, rawData) {
    const metrics = this._computeMetrics(filteredData, rawData);
    this._container.innerHTML = '';
    this._container.appendChild(this._buildNarrative(metrics));

    // Wire AI button
    const aiBtn = this._container.querySelector('#ai-discuss-btn');
    if (aiBtn) {
      aiBtn.addEventListener('click', () => {
        const context = this._generateBriefContext(metrics);
        AIPanel.open(context);
      });
    }
  },

  /**
   * Compute the 5 brief metrics from filtered + raw data.
   *
   * NOTAS sobre limitacoes de dados:
   * - erLoop e teamPerformance.overview sao agregados, nao filtram por empresa.
   * - engagementByCompany permite filtro por empresa.
   */
  _computeMetrics(data, rawData) {
    // 1. Critical patients (filtered by company)
    const criticalCount = rawData.highRiskPatients
      .filter(p => data._companyIds.includes(p.companyId))
      .filter(p => p.riskLevel === 'critical')
      .length;

    // 2. Avoidable NIPs (filtered by company)
    const avoidableNips = (rawData.nipSentimentAnalysis || [])
      .filter(p => data._companyIds.includes(p.companyId))
      .filter(p => p.interceptable)
      .length;

    // 3. Estimated savings (sum over period months -- aggregate, not per-company)
    const totalSavings = data._months.reduce((sum, m) => {
      const monthData = rawData.erLoop.monthly[m];
      return sum + (monthData ? monthData.savings : 0);
    }, 0);

    // 4. Satisfaction trend (aggregate -- not per-company)
    const satCurrent = rawData.teamPerformance.overview.satisfactionScore;
    const satPrev = rawData.teamPerformance.overview.prevSatisfaction;
    const satDelta = satPrev > 0 ? ((satCurrent - satPrev) / satPrev * 100) : 0;

    // 5. Engagement rate (current month, filtered by company when applicable)
    const currentMonth = data._currentMonth;
    let engRate;
    if (data._companyIds.length < rawData.companies.length) {
      // Company filter active -- average across selected companies
      const rates = data._companyIds.map(cid => {
        const evo = rawData.engagementByCompany[cid];
        const entry = evo ? evo.find(e => e.month === currentMonth) : null;
        return entry ? entry.gspRate : 0;
      }).filter(r => r > 0);
      engRate = rates.length > 0 ? rates.reduce((a, b) => a + b, 0) / rates.length : 0;
    } else {
      const entry = rawData.engagementEvolution.find(e => e.month === currentMonth);
      engRate = entry ? entry.gspRate : 0;
    }

    return { criticalCount, avoidableNips, totalSavings, satDelta, satCurrent, engRate };
  },

  /** Build the narrative paragraph DOM. */
  _buildNarrative(metrics) {
    const wrapper = document.createElement('div');
    wrapper.className = 'morning-brief__inner';

    // Narrative paragraph
    const narrative = document.createElement('div');
    narrative.className = 'morning-brief__narrative';

    // Format savings abbreviation
    const savingsAbbrev = metrics.totalSavings >= 1000
      ? `R$ ${Math.round(metrics.totalSavings / 1000)}k`
      : fmt.currency.format(metrics.totalSavings);

    // Satisfaction direction text
    const satDirection = metrics.satDelta >= 0 ? 'subiu' : 'caiu';
    const satSign = metrics.satDelta >= 0 ? '+' : '';

    // Engagement highlight class
    const engClass = metrics.engRate >= 8 ? 'highlight--success' : metrics.engRate >= 5 ? 'highlight--warning' : 'highlight--danger';

    narrative.innerHTML = `<p>Bom dia. Neste periodo, <strong class="highlight--danger">${metrics.criticalCount} pacientes criticos</strong> aguardam acompanhamento e <strong class="highlight--warning">${metrics.avoidableNips} NIPs</strong> poderiam ter sido evitados. A economia estimada com intervencoes no PA foi de <strong class="highlight--success">${savingsAbbrev}</strong>. A satisfacao da equipe ${satDirection} <strong>${satSign}${fmt.decimal.format(metrics.satDelta)}%</strong> (${fmt.decimal.format(metrics.satCurrent)}/5.0) e o engajamento esta em <strong class="${engClass}">${fmt.decimal.format(metrics.engRate)}%</strong>.</p>`;

    wrapper.appendChild(narrative);

    // Footer row with AI button
    const footer = document.createElement('div');
    footer.className = 'morning-brief__footer';

    const aiBtn = document.createElement('button');
    aiBtn.className = 'morning-brief__ai-btn';
    aiBtn.id = 'ai-discuss-btn';
    aiBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z"/>
        <path d="M20 3v4"/><path d="M22 5h-4"/>
        <path d="M4 17v2"/><path d="M5 18H3"/>
      </svg>
      <span>Discutir com IA</span>
    `;
    footer.appendChild(aiBtn);
    wrapper.appendChild(footer);

    return wrapper;
  },

  /** Generate context object for the AI panel. */
  _generateBriefContext(metrics) {
    return {
      criticalCount: metrics.criticalCount,
      avoidableNips: metrics.avoidableNips,
      totalSavings: metrics.totalSavings,
      satDelta: metrics.satDelta,
      satCurrent: metrics.satCurrent,
      engRate: metrics.engRate,
    };
  },
};
