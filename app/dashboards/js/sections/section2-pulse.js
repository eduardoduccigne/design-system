// ========== Section 2 — Pulso da Populacao (US-05, US-06, US-07, US-08, US-09) ==========
import { createKPICard } from '../components/kpi-card.js';
import { createChart, destroyChart } from '../components/chart-factory.js';
import { createInfoFooter, createExpandable } from '../components/tooltip.js';
import { createIntegrationBadge } from '../components/badge.js';
import { createFunnel } from '../components/funnel.js';
import { fmt, MONTH_LABELS, tk } from '../app.js';

const CHART_IDS = [
  'treemap-themes',
  'chart-theme-bars',
  'chart-engagement-evo',
  'chart-risk-themes-ts',
  'chart-mental-health',
];

export const SectionPulse = {
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
    // US-05: Theme Map
    this._renderThemeMap(container, data, rawData);

    // US-06: Engagement Evolution
    this._renderEvolution(container, data, rawData);

    // US-07: Risk Themes Time Series
    this._renderRiskThemesTimeSeries(container, data, rawData);

    const grid = document.createElement('div');
    grid.className = 'section-grid';

    // US-08: ER Loop Funnel
    grid.appendChild(this._renderERLoop(data, rawData));

    // US-09: Mental Health Radar
    grid.appendChild(this._renderMentalHealth(data, rawData));

    container.appendChild(grid);
  },

  // ========== US-05: Mapa de temas conversacionais ==========
  _renderThemeMap(container, data, rawData) {
    const card = document.createElement('div');
    card.className = 'card card--full';

    const currentMonth = data._currentMonth;
    const prevMonth = data._previousMonth;

    // Compute per-theme volumes, applying company filter
    const themes = rawData.themes.map(t => {
      const volume = data._companyIds.length > 0
        ? data._companyIds.reduce((sum, cId) => sum + (t.byCompany[cId] || 0), 0)
        : t.monthly[currentMonth] || 0;
      const prevVolume = prevMonth ? (t.monthly[prevMonth] || 0) : 0;
      const change = prevVolume > 0 ? ((volume - prevVolume) / prevVolume * 100) : 0;
      return { ...t, currentVolume: volume || t.monthly[currentMonth] || 0, change };
    }).sort((a, b) => b.currentVolume - a.currentVolume);

    card.innerHTML = `
      <div class="card__header">
        <div>
          <div class="card__title">Mapa de Temas Conversacionais</div>
          <div class="card__subtitle">Principais temas identificados nas conversas do periodo</div>
        </div>
      </div>
      <div class="card__body">
        <div class="flex flex-wrap gap-2 mb-4" id="theme-pills"></div>
        <div id="chart-theme-bars" class="chart-container chart-container--sm"></div>
        <div id="treemap-themes" class="chart-container mt-4"></div>
      </div>
    `;

    container.appendChild(card);

    // --- Trend pills with risk dots ---
    const pillsContainer = card.querySelector('#theme-pills');
    themes.slice(0, 8).forEach(t => {
      const pill = document.createElement('span');
      const direction = t.change > 5 ? 'rising' : t.change < -5 ? 'falling' : '';
      pill.className = `theme-pill ${direction ? `theme-pill--${direction}` : ''}`;
      const arrow = t.change > 5 ? '\u2191' : t.change < -5 ? '\u2193' : '\u2192';
      pill.innerHTML = `${arrow} ${t.label}`;

      // Risk dot for themes with high growth
      if (Math.abs(t.change) > 20) {
        const dot = document.createElement('span');
        dot.className = 'risk-dot risk-dot--critical';
        dot.title = `Variacao: ${fmt.decimal.format(t.change)}%`;
        dot.style.marginLeft = '4px';
        pill.appendChild(dot);
      } else if (Math.abs(t.change) > 10) {
        const dot = document.createElement('span');
        dot.className = 'risk-dot risk-dot--high';
        dot.title = `Variacao: ${fmt.decimal.format(t.change)}%`;
        dot.style.marginLeft = '4px';
        pill.appendChild(dot);
      }

      pillsContainer.appendChild(pill);
    });

    // --- Horizontal bar chart for top themes ---
    const topThemes = themes.slice(0, 8);
    requestAnimationFrame(() => {
      createChart('chart-theme-bars', {
        chart: { type: 'bar', height: 260 },
        series: [{
          name: 'Conversas',
          data: topThemes.map(t => t.currentVolume),
        }],
        xaxis: {
          categories: topThemes.map(t => t.label),
          labels: { style: { fontSize: '11px' } },
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '65%',
            borderRadius: 3,
            distributed: true,
          },
        },
        colors: [
          tk.primary, tk.accent, '#14B8A6', '#06B6D4',
          '#0891B2', tk.warning, tk.purple, '#0E7490',
        ],
        dataLabels: {
          enabled: true,
          formatter: (val) => fmt.number.format(val),
          style: { fontSize: '11px', fontWeight: 600 },
          offsetX: 4,
        },
        tooltip: {
          y: {
            formatter: (val, { dataPointIndex }) => {
              const theme = topThemes[dataPointIndex];
              const trend = theme.change > 0 ? `+${fmt.decimal.format(theme.change)}%` : `${fmt.decimal.format(theme.change)}%`;
              return `${fmt.number.format(val)} conversas (${trend} vs anterior)`;
            },
          },
        },
        legend: { show: false },
      });
    });

    // --- Treemap chart ---
    const treemapData = themes.map(t => {
      const patients = data._companyIds.length > 0
        ? data._companyIds.reduce((sum, cId) => sum + (t.patientsByCompany?.[cId] || 0), 0)
        : t.patients || 0;
      return {
        x: t.label,
        y: t.currentVolume,
        meta: { patients },
      };
    });

    requestAnimationFrame(() => {
      createChart('treemap-themes', {
        chart: { type: 'treemap', height: 300 },
        series: [{ data: treemapData }],
        colors: [
          tk.primary, tk.accent, '#14B8A6', '#06B6D4',
          '#0891B2', '#0E7490', '#155E75', '#164E63',
          '#115E59', '#134E4A',
        ],
        plotOptions: {
          treemap: {
            distributed: true,
            enableShades: false,
          },
        },
        tooltip: {
          custom: ({ seriesIndex, dataPointIndex, w }) => {
            const dp = w.config.series[seriesIndex].data[dataPointIndex];
            return `<div style="padding:var(--space-2) var(--space-3);font-size:var(--font-size-sm);line-height:var(--line-height-normal)">
              <strong>${dp.x}</strong><br/>
              ${fmt.number.format(dp.y)} conversas<br/>
              ${fmt.number.format(dp.meta.patients)} pacientes
            </div>`;
          },
        },
        dataLabels: {
          enabled: true,
          style: { fontSize: '14px', fontWeight: 600 },
          formatter: (text, op) => `${text}\n${fmt.number.format(op.value)}`,
        },
      });
    });
  },

  // ========== US-06: Evolucao mensal do engajamento ==========
  _renderEvolution(container, data, rawData) {
    const card = document.createElement('div');
    card.className = 'card card--full mt-6';

    const header = document.createElement('div');
    header.className = 'card__header';

    const titleDiv = document.createElement('div');
    titleDiv.innerHTML = `
      <div class="card__title">Evolucao Mensal do Engajamento</div>
      <div class="card__subtitle">Tendencia de engajamento no programa GSP nos ultimos meses</div>
    `;
    header.appendChild(titleDiv);

    // Toggle for ER overlay
    const toggleDiv = document.createElement('div');
    toggleDiv.className = 'flex items-center gap-2';
    toggleDiv.innerHTML = `
      <label class="flex items-center gap-2 cursor-pointer text-sm">
        <input type="checkbox" id="toggle-er-overlay" style="accent-color: var(--color-primary-600)">
        <span>Mostrar uso de PA</span>
      </label>
    `;
    header.appendChild(toggleDiv);

    card.appendChild(header);

    const body = document.createElement('div');
    body.className = 'card__body';
    body.innerHTML = '<div id="chart-engagement-evo" class="chart-container"></div>';
    card.appendChild(body);

    // Integration note for ER data
    card.appendChild(createInfoFooter('Taxa de uso de PA requer integracao com dados de utilizacao do cliente.'));

    container.appendChild(card);

    // --- Build chart data ---
    const evoData = rawData.engagementEvolution.filter(e => data._months.includes(e.month));
    const months = evoData.map(e => MONTH_LABELS[e.month] || e.month);

    // Campaign annotations from rawData.campaigns
    const campaigns = (rawData.campaigns || []).filter(c => data._months.includes(c.month));
    const campaignAnnotations = campaigns.map(c => ({
      x: MONTH_LABELS[c.month] || c.month,
      borderColor: c.color || tk.accent,
      label: {
        text: c.label,
        style: {
          color: '#fff',
          background: c.color || tk.accent,
          fontSize: '11px',
          fontWeight: 600,
          padding: { left: 6, right: 6, top: 2, bottom: 2 },
        },
        orientation: 'horizontal',
        offsetY: -8,
      },
    }));

    const renderChart = (showER) => {
      const series = [{
        name: 'Engajamento GSP (%)',
        type: 'line',
        data: evoData.map(e => e.gspRate),
      }];

      if (showER) {
        series.push({
          name: 'Uso de PA (%)',
          type: 'line',
          data: evoData.map(e => e.erRate),
        });
      }

      createChart('chart-engagement-evo', {
        chart: { type: 'line', height: 340 },
        series,
        xaxis: { categories: months },
        yaxis: [
          {
            title: { text: 'Engajamento GSP (%)' },
            labels: { formatter: (val) => `${val}%` },
          },
          ...(showER ? [{
            opposite: true,
            title: { text: 'Uso de PA (%)' },
            labels: { formatter: (val) => `${val}%` },
          }] : []),
        ],
        stroke: { width: [3, 2], dashArray: [0, 5] },
        colors: [tk.primary, tk.danger],
        markers: { size: 4 },
        annotations: {
          xaxis: campaignAnnotations,
        },
        tooltip: {
          y: { formatter: (val) => `${fmt.decimal.format(val)}%` },
        },
        legend: { position: 'top' },
      });
    };

    requestAnimationFrame(() => {
      renderChart(false);

      card.querySelector('#toggle-er-overlay').addEventListener('change', (e) => {
        renderChart(e.target.checked);
      });
    });
  },

  // ========== US-07: Serie temporal de temas de risco ==========
  _renderRiskThemesTimeSeries(container, data, rawData) {
    const card = document.createElement('div');
    card.className = 'card card--full mt-6';

    const header = document.createElement('div');
    header.className = 'card__header';

    const titleDiv = document.createElement('div');
    titleDiv.innerHTML = `
      <div class="card__title">Temas de Risco: Interacoes vs. Uso de PA</div>
      <div class="card__subtitle">Correlacao entre volume de interacoes em temas de risco e uso de pronto atendimento</div>
    `;
    header.appendChild(titleDiv);
    header.appendChild(createIntegrationBadge('Uso de PA requer cruzamento com dados de utilizacao do cliente.'));

    card.appendChild(header);

    const body = document.createElement('div');
    body.className = 'card__body';
    body.innerHTML = '<div id="chart-risk-themes-ts" class="chart-container"></div>';
    card.appendChild(body);

    // Annotations from historicalIndicators
    const histAnnotations = (rawData.historicalIndicators?.annotations || []);
    const annotationMarkers = histAnnotations
      .filter(a => data._months.includes(a.month))
      .map(a => ({
        x: MONTH_LABELS[a.month] || a.month,
        borderColor: a.color || tk.accent,
        label: {
          text: a.label,
          style: {
            color: '#fff',
            background: a.color || tk.accent,
            fontSize: '11px',
            fontWeight: 600,
            padding: { left: 6, right: 6, top: 2, bottom: 2 },
          },
          orientation: 'horizontal',
          offsetY: -8,
        },
      }));

    container.appendChild(card);

    // --- Build dual-axis chart ---
    const riskData = (rawData.historicalIndicators?.riskThemes || [])
      .filter(d => data._months.includes(d.month));
    const months = riskData.map(d => MONTH_LABELS[d.month] || d.month);

    requestAnimationFrame(() => {
      createChart('chart-risk-themes-ts', {
        chart: { type: 'line', height: 320 },
        series: [
          {
            name: 'Interacoes em temas de risco',
            type: 'area',
            data: riskData.map(d => d.interactions),
          },
          {
            name: 'Uso de PA (visitas)',
            type: 'line',
            data: riskData.map(d => d.erUsage),
          },
        ],
        xaxis: { categories: months },
        yaxis: [
          {
            title: { text: 'Interacoes' },
            labels: { formatter: (val) => fmt.number.format(val) },
          },
          {
            opposite: true,
            title: { text: 'Uso de PA' },
            labels: { formatter: (val) => fmt.number.format(val) },
          },
        ],
        stroke: { width: [2, 3], curve: 'smooth' },
        fill: {
          type: ['gradient', 'solid'],
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.35,
            opacityTo: 0.05,
          },
        },
        colors: [tk.purple, tk.danger],
        markers: { size: [0, 5] },
        annotations: {
          xaxis: annotationMarkers,
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: { formatter: (val) => fmt.number.format(val) },
        },
        legend: { position: 'top' },
      });
    });
  },

  // ========== US-08: Loop do PA (funil) ==========
  _renderERLoop(data, rawData) {
    const card = document.createElement('div');
    card.className = 'card';

    const erLoop = rawData.erLoop;

    // --- Header ---
    const header = document.createElement('div');
    header.className = 'card__header';

    const titleDiv = document.createElement('div');
    titleDiv.innerHTML = `
      <div class="card__title">Loop do PA: Intervencoes e Desfecho</div>
      <div class="card__subtitle">Funil de interceptacao de visitas ao Pronto Atendimento</div>
    `;
    header.appendChild(titleDiv);
    header.appendChild(createIntegrationBadge(erLoop.integrationNote));

    card.appendChild(header);

    // --- Body with CSS funnel ---
    const body = document.createElement('div');
    body.className = 'card__body';

    // Use the current month's data if filtered to a single month, otherwise aggregate
    let mentioned = erLoop.mentionedER;
    let intervened = erLoop.nurseIntervened;
    let avoided = erLoop.didNotUseER;
    let savings = erLoop.estimatedSavings;
    let didNotUseCount = erLoop.didNotUseER;
    const avgCost = erLoop.avgERCost;

    // If we have monthly data and a filtered range, aggregate from that range
    if (erLoop.monthly && data._months.length > 0) {
      const monthlyEntries = data._months
        .map(m => erLoop.monthly[m])
        .filter(Boolean);
      if (monthlyEntries.length > 0) {
        mentioned = monthlyEntries.reduce((s, e) => s + e.mentioned, 0);
        intervened = monthlyEntries.reduce((s, e) => s + e.intervened, 0);
        avoided = monthlyEntries.reduce((s, e) => s + e.avoided, 0);
        savings = monthlyEntries.reduce((s, e) => s + e.savings, 0);
        didNotUseCount = avoided;
      }
    }

    // Build the funnel component
    const funnelEl = createFunnel([
      { label: 'Mencionaram PA', value: mentioned, color: tk.danger },
      { label: 'Enfermeiro interveio', value: intervened, color: tk.warning },
      { label: 'Nao utilizaram PA', value: avoided, color: tk.success },
    ]);

    body.appendChild(funnelEl);

    // Savings highlight
    const savingsDiv = document.createElement('div');
    savingsDiv.className = 'savings-highlight mt-4';
    savingsDiv.innerHTML = `
      <div class="savings-highlight__value">${fmt.currency.format(savings)}</div>
      <div class="savings-highlight__label">economia estimada no periodo</div>
    `;
    body.appendChild(savingsDiv);

    // Calculation breakdown
    const breakdownDiv = document.createElement('div');
    breakdownDiv.className = 'mt-3 flex items-center gap-3 text-xs text-secondary';
    breakdownDiv.innerHTML = `
      <span>${fmt.number.format(didNotUseCount)} pacientes &times; ${fmt.currency.format(avgCost)} custo medio PA</span>
    `;
    body.appendChild(breakdownDiv);

    card.appendChild(body);

    // Methodology expandable
    card.appendChild(createExpandable({
      triggerText: 'Ver metodologia do calculo',
      content: erLoop.methodology,
    }));

    return card;
  },

  // ========== US-09: Radar de saude mental ==========
  _renderMentalHealth(data, rawData) {
    const card = document.createElement('div');
    card.className = 'card';

    // --- Header with toggle ---
    card.innerHTML = `
      <div class="card__header">
        <div>
          <div class="card__title">Radar de Saude Mental</div>
          <div class="card__subtitle">Prevalencia agregada de indicadores de saude mental na carteira</div>
        </div>
        <div class="flex gap-2">
          <button class="btn btn--ghost btn--sm mh-view-btn active" data-view="age">Por faixa etaria</button>
          <button class="btn btn--ghost btn--sm mh-view-btn" data-view="company">Por empresa</button>
        </div>
      </div>
      <div class="card__body">
        <div id="chart-mental-health" class="chart-container"></div>
      </div>
    `;

    // Privacy footer
    card.appendChild(createInfoFooter(
      'Dado agregado e anonimizado. A identificacao individual e disponivel apenas para o enfermeiro responsavel pelo acompanhamento do paciente.'
    ));

    // Render chart — default by age
    const mhData = rawData.mentalHealth;

    requestAnimationFrame(() => {
      this._renderMHChart('age', mhData, data);
    });

    // Toggle buttons
    card.querySelectorAll('.mh-view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        card.querySelectorAll('.mh-view-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this._renderMHChart(btn.dataset.view, mhData, data);
      });
    });

    return card;
  },

  _renderMHChart(view, mhData, filteredData) {
    const conditions = ['anxiety', 'depression', 'burnout', 'insomnia'];
    const conditionLabels = {
      anxiety: 'Ansiedade',
      depression: 'Depressao',
      burnout: 'Burnout',
      insomnia: 'Insonia',
    };

    let categories, series;

    if (view === 'age') {
      categories = ['18-29', '30-44', '45-59', '60+'];
      series = conditions.map(cond => ({
        name: conditionLabels[cond],
        data: categories.map(age => mhData.byAge[age]?.[cond] || 0),
      }));
    } else {
      const companies = filteredData._companies;
      categories = companies.map(c => c.name);
      series = conditions.map(cond => ({
        name: conditionLabels[cond],
        data: companies.map(c => mhData.byCompany[c.id]?.[cond] || 0),
      }));
    }

    createChart('chart-mental-health', {
      chart: { type: 'bar', height: 320 },
      series,
      xaxis: {
        categories,
        labels: { style: { fontSize: '12px' } },
      },
      yaxis: {
        title: { text: '% da carteira' },
        labels: { formatter: (val) => `${val}%` },
      },
      plotOptions: {
        bar: { horizontal: true, barHeight: '60%', borderRadius: 3 },
      },
      tooltip: {
        y: { formatter: (val) => `${fmt.decimal.format(val)}%` },
      },
      legend: { position: 'top' },
      colors: [tk.warning, tk.danger, tk.purple, tk.ai],
    });
  },
};
