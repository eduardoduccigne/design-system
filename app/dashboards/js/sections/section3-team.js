// ========== Section 3 — Performance da Equipe (US-10 to US-13) ==========
import { createKPICard } from '../components/kpi-card.js';
import { createChart, destroyChart } from '../components/chart-factory.js';
import { createDataTable } from '../components/data-table.js';
import { createTrendBadge } from '../components/badge.js';
import { fmt, MONTH_LABELS, tk } from '../app.js';

const CHART_IDS = [
  'chart-team-quality-trend', 'chart-team-quality-type',
  'chart-team-sentiment-trend', 'chart-team-sentiment-role',
];

export const SectionTeam = {
  rendered: false,
  needsRefresh: false,

  render(container, filteredData, rawData) {
    container.innerHTML = '';
    this._buildContent(container, filteredData, rawData);
    this.rendered = true;
  },

  refresh(container, filteredData, rawData) {
    container.innerHTML = '';
    CHART_IDS.forEach(destroyChart);
    this._buildContent(container, filteredData, rawData);
    this.needsRefresh = false;
  },

  _buildContent(container, data, rawData) {
    const tp = rawData.teamPerformance;

    // A) Overview KPIs
    this._renderOverview(container, tp);

    // B) US-10: Qualidade das Interacoes
    container.appendChild(this._renderQuality(tp));

    // C) US-11: Sentimento das Interacoes
    container.appendChild(this._renderSentiment(tp));

    // D) US-12: Volume por Profissional
    container.appendChild(this._renderVolume(tp));

    // E) US-13: Ranking da Equipe
    container.appendChild(this._renderRanking(tp));
  },

  // ========== KPIs Overview ==========
  _renderOverview(container, tp) {
    const o = tp.overview;
    const kpiRow = document.createElement('div');
    kpiRow.className = 'kpi-row';

    const satTrend = ((o.satisfactionScore - o.prevSatisfaction) / o.prevSatisfaction * 100);
    kpiRow.appendChild(createKPICard({
      label: 'Satisfacao geral',
      value: o.satisfactionScore,
      unit: '/ 5.0',
      formatType: 'decimal',
      trend: { value: satTrend, positive: true },
      sparklineData: tp.qualityTrend.map(q => q.score),
    }));

    const rtTrend = ((o.avgResponseTime - o.prevResponseTime) / o.prevResponseTime * 100);
    kpiRow.appendChild(createKPICard({
      label: 'Tempo medio de resposta',
      value: o.avgResponseTime,
      unit: 'min',
      trend: { value: rtTrend, positive: false },
      sparklineData: null,
    }));

    const fcrTrend = ((o.firstContactResolution - o.prevResolution) / o.prevResolution * 100);
    kpiRow.appendChild(createKPICard({
      label: 'Resolucao no 1o contato',
      value: o.firstContactResolution,
      formatType: 'percent',
      trend: { value: fcrTrend, positive: true },
      sparklineData: null,
    }));

    const intTrend = ((o.totalInteractions - o.prevInteractions) / o.prevInteractions * 100);
    kpiRow.appendChild(createKPICard({
      label: 'Interacoes no periodo',
      value: o.totalInteractions,
      trend: { value: intTrend, positive: true },
      sparklineData: tp.sentimentTrend.map(s => s.positive + s.neutral + s.negative),
    }));

    container.appendChild(kpiRow);
  },

  // ========== US-10: Qualidade das Interacoes ==========
  _renderQuality(tp) {
    const card = document.createElement('div');
    card.className = 'card card--full mt-6';

    card.innerHTML = `
      <div class="card__header">
        <div>
          <div class="card__title">Qualidade das Interacoes</div>
          <div class="card__subtitle">Tendencia de qualidade e distribuicao por tipo de atendimento</div>
        </div>
      </div>
      <div class="card__body">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-6)">
          <div>
            <div class="text-sm font-semibold mb-2">Tendencia de qualidade (score medio mensal)</div>
            <div id="chart-team-quality-trend" class="chart-container"></div>
          </div>
          <div>
            <div class="text-sm font-semibold mb-2">Distribuicao de qualidade por tipo</div>
            <div id="chart-team-quality-type" class="chart-container"></div>
          </div>
        </div>
      </div>
    `;

    requestAnimationFrame(() => {
      // Quality trend line chart
      createChart('chart-team-quality-trend', {
        chart: { type: 'line', height: 280 },
        series: [{ name: 'Score Medio', data: tp.qualityTrend.map(q => q.score) }],
        xaxis: { categories: tp.qualityTrend.map(q => MONTH_LABELS[q.month] || q.month) },
        yaxis: { min: 3.0, max: 5.0, labels: { formatter: (val) => val.toFixed(1) } },
        colors: [tk.primary],
        stroke: { width: 3, curve: 'smooth' },
        markers: { size: 5 },
        tooltip: { y: { formatter: (val) => `${val.toFixed(1)} / 5.0` } },
      });

      // Quality by type stacked bar chart
      createChart('chart-team-quality-type', {
        chart: { type: 'bar', stacked: true, height: 280 },
        series: [
          { name: 'Excelente', data: tp.qualityByType.map(q => q.excelente) },
          { name: 'Bom', data: tp.qualityByType.map(q => q.bom) },
          { name: 'Regular', data: tp.qualityByType.map(q => q.regular) },
          { name: 'Ruim', data: tp.qualityByType.map(q => q.ruim) },
        ],
        xaxis: { categories: tp.qualityByType.map(q => q.type) },
        colors: [tk.success, tk.accent, tk.warning, tk.danger],
        plotOptions: { bar: { horizontal: true, barHeight: '65%', borderRadius: 3 } },
        legend: { position: 'top' },
        tooltip: { y: { formatter: (val) => fmt.number.format(val) } },
      });
    });

    return card;
  },

  // ========== US-11: Sentimento das Interacoes ==========
  _renderSentiment(tp) {
    const card = document.createElement('div');
    card.className = 'card card--full mt-6';

    card.innerHTML = `
      <div class="card__header">
        <div>
          <div class="card__title">Sentimento das Interacoes</div>
          <div class="card__subtitle">Tendencia de sentimento, topicos negativos e analise por funcao</div>
        </div>
      </div>
      <div class="card__body">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-6)">
          <div>
            <div class="text-sm font-semibold mb-2">Tendencia de sentimento mensal</div>
            <div id="chart-team-sentiment-trend" class="chart-container"></div>
          </div>
          <div>
            <div class="text-sm font-semibold mb-2">Sentimento por funcao</div>
            <div id="chart-team-sentiment-role" class="chart-container"></div>
          </div>
        </div>
        <div class="mt-6">
          <div class="text-sm font-semibold mb-2">Topicos de sentimento negativo</div>
          <div id="table-negative-topics"></div>
        </div>
      </div>
    `;

    requestAnimationFrame(() => {
      // Sentiment stacked bar chart (trend)
      createChart('chart-team-sentiment-trend', {
        chart: { type: 'bar', stacked: true, height: 280 },
        series: [
          { name: 'Positivo', data: tp.sentimentTrend.map(s => s.positive) },
          { name: 'Neutro', data: tp.sentimentTrend.map(s => s.neutral) },
          { name: 'Negativo', data: tp.sentimentTrend.map(s => s.negative) },
        ],
        xaxis: { categories: tp.sentimentTrend.map(s => MONTH_LABELS[s.month] || s.month) },
        colors: [tk.success, tk.neutral, tk.danger],
        plotOptions: { bar: { columnWidth: '60%', borderRadius: 3 } },
        legend: { position: 'top' },
        tooltip: { y: { formatter: (val) => fmt.number.format(val) } },
      });

      // Sentiment by role stacked 100% bar
      const sr = tp.sentimentByRole;
      const roleLabels = ['Enfermeiro(a)', 'Administrativo'];
      const roleKeys = ['nurse', 'admin'];
      createChart('chart-team-sentiment-role', {
        chart: { type: 'bar', stacked: true, stackType: '100%', height: 280 },
        series: [
          { name: 'Positivo', data: roleKeys.map(k => sr[k].positive) },
          { name: 'Neutro', data: roleKeys.map(k => sr[k].neutral) },
          { name: 'Negativo', data: roleKeys.map(k => sr[k].negative) },
        ],
        xaxis: { categories: roleLabels },
        colors: [tk.success, tk.neutral, tk.danger],
        plotOptions: { bar: { horizontal: true, barHeight: '50%', borderRadius: 3 } },
        legend: { position: 'top' },
        tooltip: { y: { formatter: (val) => fmt.number.format(val) } },
      });

      // Negative sentiment topics table
      const topicsContainer = card.querySelector('#table-negative-topics');
      const topicsTable = createDataTable({
        columns: [
          { key: 'topic', label: 'Topico' },
          {
            key: 'count', label: 'Ocorrencias', align: 'center',
            render: (val) => `<span class="font-semibold">${fmt.number.format(val)}</span>`,
          },
          {
            key: 'percentage', label: '% do Total', align: 'center',
            render: (val) => {
              const color = val > 20 ? 'var(--destructive-500)' : val > 10 ? 'var(--warning-500)' : 'var(--muted-foreground)';
              return `<span style="color:${color};font-weight:600">${fmt.decimal.format(val)}%</span>`;
            },
          },
        ],
        rows: tp.negativeSentimentTopics,
      });
      topicsContainer.appendChild(topicsTable);
    });

    return card;
  },

  // ========== US-12: Volume por Profissional ==========
  _renderVolume(tp) {
    const card = document.createElement('div');
    card.className = 'card card--full mt-6';

    const roleLabels = { nurse: 'Enfermeiro(a)', admin: 'Administrativo' };

    card.innerHTML = `
      <div class="card__header">
        <div>
          <div class="card__title">Volume por Profissional</div>
          <div class="card__subtitle">Detalhamento de interacoes por membro da equipe</div>
        </div>
      </div>
      <div class="card__body"></div>
    `;

    const sorted = [...tp.members].filter(m => m.role !== 'provider').sort((a, b) => b.interactionsCount - a.interactionsCount);

    const table = createDataTable({
      columns: [
        { key: 'name', label: 'Profissional' },
        {
          key: 'role', label: 'Funcao',
          render: (val) => {
            const badgeClass = val === 'nurse' ? 'badge--success' : val === 'admin' ? 'badge--neutral' : 'badge--warning';
            return `<span class="badge ${badgeClass}">${roleLabels[val] || val}</span>`;
          },
        },
        {
          key: 'interactionsCount', label: 'Interacoes', align: 'center',
          render: (val) => `<span class="font-semibold">${fmt.number.format(val)}</span>`,
        },
        {
          key: 'avgResponseTime', label: 'Tempo Resp.', align: 'center',
          render: (val) => `<span class="font-semibold">${val} min</span>`,
        },
        {
          key: 'resolutionRate', label: 'Taxa de Resolucao', align: 'center',
          render: (val) => {
            const color = val >= 80 ? 'var(--success-500)' : val >= 60 ? 'var(--warning-500)' : 'var(--destructive-500)';
            return `<span style="color:${color};font-weight:600">${val}%</span>`;
          },
        },
      ],
      rows: sorted,
    });

    card.querySelector('.card__body').appendChild(table);

    return card;
  },

  // ========== US-13: Ranking da Equipe ==========
  _renderRanking(tp) {
    const card = document.createElement('div');
    card.className = 'card card--full mt-6';

    const sorted = [...tp.members].filter(m => m.role !== 'provider').sort((a, b) => b.satisfactionScore - a.satisfactionScore);
    const top3Ids = sorted.slice(0, 3).map(m => m.id);
    const bottom2Ids = sorted.slice(-2).map(m => m.id);

    const trendIcons = { improving: '\u2191', stable: '\u2192', worsening: '\u2193' };
    const trendColors = {
      improving: 'var(--success-500)',
      stable: 'var(--muted-foreground)',
      worsening: 'var(--destructive-500)',
    };

    card.innerHTML = `
      <div class="card__header">
        <div>
          <div class="card__title">Ranking da Equipe</div>
          <div class="card__subtitle">Membros ordenados por satisfacao, com destaque para melhores e piores desempenhos</div>
        </div>
      </div>
      <div class="card__body"></div>
    `;

    const table = createDataTable({
      columns: [
        {
          key: 'rank', label: '#',
          render: (val, row) => {
            const idx = sorted.indexOf(row) + 1;
            return `<span class="font-semibold">${idx}</span>`;
          },
        },
        { key: 'name', label: 'Membro' },
        {
          key: 'satisfactionScore', label: 'Satisfacao',
          render: (val) => {
            const color = val >= 4.5 ? 'var(--success-500)' : val >= 3.5 ? 'var(--primary)' : 'var(--destructive-500)';
            return `<strong style="color:${color}">${fmt.decimal.format(val)}</strong>`;
          },
        },
        {
          key: 'trend', label: 'Tendencia',
          render: (val) => {
            const div = document.createElement('span');
            div.className = 'flex items-center gap-2';
            const icon = document.createElement('span');
            icon.style.cssText = `color:${trendColors[val]};font-weight:600`;
            icon.textContent = trendIcons[val];
            div.appendChild(icon);
            div.appendChild(createTrendBadge(
              val === 'improving' ? 5 : val === 'worsening' ? -5 : 0,
              true
            ));
            return div;
          },
        },
        {
          key: 'sentimentScore', label: 'Sentimento',
          render: (val) => {
            const pct = Math.round(val * 100);
            const color = pct >= 70 ? 'var(--success-500)' : pct >= 50 ? 'var(--warning-500)' : 'var(--destructive-500)';
            return `<span style="color:${color};font-weight:600">${pct}%</span>`;
          },
        },
      ],
      rows: sorted,
      highlightCondition: (row) => {
        if (top3Ids.includes(row.id)) return 'success';
        if (bottom2Ids.includes(row.id)) return 'danger';
        return null;
      },
    });

    card.querySelector('.card__body').appendChild(table);

    return card;
  },
};
