// ========== Section 6 — Carteiras / Portfolios (US-19 to US-20) ==========
import { createKPICard } from '../components/kpi-card.js';
import { createChart, destroyChart } from '../components/chart-factory.js';
import { createDataTable } from '../components/data-table.js';
import { createTrendBadge, createStatusBadge, createIntegrationBadge } from '../components/badge.js';
import { fmt } from '../app.js';

const CHART_IDS = [
  'chart-company-engagement',
  'chart-sinistralidade-evolucao',
];

export const SectionPortfolios = {
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

  _buildContent(container, _data, rawData) {
    // Merge beneficiaries count from companies into indicators
    const companyMap = {};
    (rawData.companies || []).forEach(c => { companyMap[c.id] = c.beneficiaries; });
    const indicators = (rawData.companyIndicators || []).map(ind => ({
      ...ind,
      beneficiaries: ind.beneficiaries || companyMap[ind.companyId] || 0,
    }));

    // KPI Overview
    this._renderOverview(container, indicators);

    // Evolucao da Sinistralidade
    container.appendChild(this._renderSinistralidadeEvolucao(rawData));

    // Utilization stats cards
    const statsRow = this._renderUtilizationStats(rawData);
    if (statsRow) container.appendChild(statsRow);

    // Indice por capita
    container.appendChild(this._renderIndicePerCapita(rawData));

    // US-19: Company comparison table
    container.appendChild(this._renderCompanyComparison(indicators, rawData));

    // Empresas com piora de indicadores (moved from Alertas)
    container.appendChild(this._renderCompanyIndicators(indicators, rawData));
  },

  // ========== KPI Overview ==========
  _renderOverview(container, indicators) {
    const kpiRow = document.createElement('div');
    kpiRow.className = 'kpi-row';

    const totalLives = indicators.reduce((sum, c) => sum + (c.beneficiaries || 0), 0);

    // Card 1: Total de vidas (unchanged)
    kpiRow.appendChild(createKPICard({
      label: 'Total de vidas',
      value: totalLives,
      trend: { value: 0, positive: true },
      sparklineData: null,
    }));

    // Card 2: Pacientes em acompanhamento
    kpiRow.appendChild(createKPICard({
      label: 'Pacientes em acompanhamento',
      value: 847,
      trend: { value: 2.3, positive: true },
      sparklineData: null,
    }));

    // Card 3: Sinistralidade média
    kpiRow.appendChild(createKPICard({
      label: 'Sinistralidade media',
      value: 75.1,
      formatType: 'percent',
      trend: { value: -3.2, positive: false },
      sparklineData: null,
    }));

    // Card 4: Prêmio médio por vida
    kpiRow.appendChild(createKPICard({
      label: 'Premio medio',
      value: 721.90,
      formatType: 'currency',
      trend: { value: 2.5, positive: false },
      sparklineData: null,
    }));

    container.appendChild(kpiRow);
  },

  // ========== Indice por capita ==========
  _renderIndicePerCapita(rawData) {
    const rows = rawData.indicePerCapita || [];

    const card = document.createElement('div');
    card.className = 'card card--full mt-6';

    card.innerHTML = `
      <div class="card__header">
        <div>
          <div class="card__title">Indice por Capita</div>
          <div class="card__subtitle">Frequencia de utilizacao por beneficiario vs. benchmark de mercado</div>
        </div>
      </div>
      <div class="card__body">
        <table style="width:100%;border-collapse:collapse">
          <thead>
            <tr>
              <th style="text-align:left;font-size:var(--text-xs);font-weight:600;color:var(--muted-foreground);padding:0 var(--space-3) var(--space-2);text-transform:uppercase;letter-spacing:0.05em">Classificacao</th>
              <th style="text-align:left;font-size:var(--text-xs);font-weight:600;color:var(--muted-foreground);padding:0 var(--space-3) var(--space-2);text-transform:uppercase;letter-spacing:0.05em">Atual</th>
              <th style="text-align:left;font-size:var(--text-xs);font-weight:600;color:var(--muted-foreground);padding:0 var(--space-3) var(--space-2);text-transform:uppercase;letter-spacing:0.05em">Benchmark</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((row, i) => {
              const isAbove = row.atual > row.benchmark;
              const bg = i % 2 === 0 ? 'var(--muted)' : 'transparent';
              const radiusL = i % 2 === 0 ? 'var(--radius-lg) 0 0 var(--radius-lg)' : '0';
              const radiusR = i % 2 === 0 ? '0 var(--radius-lg) var(--radius-lg) 0' : '0';
              return `
                <tr>
                  <td style="padding:var(--space-3);background:${bg};border-radius:${radiusL};font-weight:700;color:var(--foreground)">${row.classification}</td>
                  <td style="padding:var(--space-3);background:${bg};color:${isAbove ? 'var(--destructive)' : 'var(--success)'};font-weight:600">${fmt.decimal.format(row.atual)}</td>
                  <td style="padding:var(--space-3);background:${bg};border-radius:${radiusR};color:var(--muted-foreground)">${fmt.decimal.format(row.benchmark)}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;

    return card;
  },

  // ========== US-19: Comparativo entre Empresas ==========
  _renderCompanyComparison(indicators, rawData) {
    const card = document.createElement('div');
    card.className = 'card card--full mt-6';

    card.innerHTML = `
      <div class="card__header">
        <div>
          <div class="card__title">Comparativo entre Empresas</div>
          <div class="card__subtitle">Clique em uma empresa para ver os beneficiarios de maior custo estimado</div>
        </div>
      </div>
      <div class="card__body"></div>
    `;

    const bestEngagement = indicators.length > 0
      ? indicators.reduce((a, b) => a.engagement > b.engagement ? a : b)
      : null;
    const worstEngagement = indicators.length > 0
      ? indicators.reduce((a, b) => a.engagement < b.engagement ? a : b)
      : null;

    const statusLabels = { good: 'Bom', attention: 'Atencao', critical: 'Critico', stable: 'Estavel' };
    const riskColors = {
      critical: 'var(--destructive-600)',
      high: 'var(--warning-600)',
      medium: 'var(--muted-foreground)',
    };

    const tbody = document.createElement('tbody');
    const table = document.createElement('table');
    table.className = 'data-table';

    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th></th>
        <th>Empresa</th>
        <th class="text-center">Beneficiarios</th>
        <th>Engajamento</th>
        <th>Saude Mental</th>
        <th>Uso de PA</th>
        <th>Status</th>
      </tr>
    `;
    table.appendChild(thead);

    indicators.forEach(company => {
      const isBest = bestEngagement && company.companyId === bestEngagement.companyId;
      const isWorst = worstEngagement && company.companyId === worstEngagement.companyId;
      const engStyle = isBest ? 'color:var(--success-500);font-weight:700'
        : isWorst ? 'color:var(--destructive-500);font-weight:700'
        : 'font-weight:600';
      const engSuffix = '';

      const engTrend = company.prevEngagement !== undefined
        ? ((company.engagement - company.prevEngagement) / company.prevEngagement * 100)
        : null;
      const engTrendHtml = engTrend !== null
        ? `<span class="trend-badge trend-badge--${engTrend > 0 ? 'up' : engTrend < 0 ? 'down' : 'stable'}" style="font-size:0.7rem;margin-left:4px">${engTrend > 0 ? '↑' : engTrend < 0 ? '↓' : '→'} ${fmt.decimal.format(Math.abs(engTrend))}%</span>`
        : '';

      const statusLabel = statusLabels[company.status] || company.status || 'Estavel';
      const tr = document.createElement('tr');
      tr.className = 'expandable-row';
      tr.style.cursor = 'pointer';
      tr.innerHTML = `
        <td>
          <span class="expandable-row__icon">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </span>
        </td>
        <td class="font-semibold">${company.companyName}</td>
        <td class="text-center">${fmt.number.format(company.beneficiaries || 0)}</td>
        <td><span style="${engStyle}">${fmt.decimal.format(company.engagement)}%${engSuffix}</span>${engTrendHtml}</td>
        <td>${fmt.decimal.format(company.mentalHealthRate || 0)}%</td>
        <td>${fmt.decimal.format(company.erUsage || 0)}%</td>
        <td></td>
      `;

      // Inject status badge into last cell
      const statusCell = tr.querySelectorAll('td')[6];
      statusCell.appendChild(createStatusBadge(company.status || 'stable', statusLabel));

      // Detail row — top 5 cost beneficiaries
      const detailTr = document.createElement('tr');
      detailTr.className = 'expandable-row__detail';
      detailTr.style.display = 'none';

      const detailTd = document.createElement('td');
      detailTd.colSpan = 7;
      detailTd.className = 'expandable-row__detail-content';

      const topCost = (rawData.topCostBeneficiaries?.[company.companyId] || []);
      const rowsHtml = topCost.map((b, i) => `
        <tr>
          <td style="color:var(--muted-foreground);font-size:0.8rem">${i + 1}</td>
          <td class="font-semibold">${b.name}</td>
          <td class="text-center" style="color:var(--muted-foreground)">${b.age} anos</td>
          <td>${b.condition}</td>
          <td class="text-right"><strong style="color:${riskColors[b.riskLevel] || 'var(--foreground)'}">${fmt.currency.format(b.estimatedCost)}</strong></td>
        </tr>
      `).join('');

      detailTd.innerHTML = `
        <div style="padding:var(--space-3) var(--space-4)">
          <div class="text-sm font-semibold mb-3" style="color:var(--muted-foreground)">Top 5 beneficiarios de maior custo estimado — ${company.companyName}</div>
          <table class="data-table" style="width:100%">
            <thead>
              <tr>
                <th style="width:32px">#</th>
                <th>Beneficiario</th>
                <th class="text-center">Idade</th>
                <th>Condicao principal</th>
                <th class="text-right">Custo estimado</th>
              </tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
          </table>
        </div>
      `;
      detailTr.appendChild(detailTd);

      // Toggle
      let isOpen = false;
      tr.addEventListener('click', () => {
        isOpen = !isOpen;
        detailTr.style.display = isOpen ? '' : 'none';
        tr.classList.toggle('expandable-row--open', isOpen);
        const icon = tr.querySelector('.expandable-row__icon svg');
        if (icon) {
          icon.style.transform = isOpen ? 'rotate(90deg)' : '';
          icon.style.transition = 'transform 0.2s ease';
        }
      });

      tbody.appendChild(tr);
      tbody.appendChild(detailTr);
    });

    table.appendChild(tbody);

    const wrapper = document.createElement('div');
    wrapper.className = 'overflow-auto';
    wrapper.appendChild(table);

    card.querySelector('.card__body').appendChild(wrapper);


    return card;
  },

  // ========== Evolucao da Sinistralidade ==========
  _renderSinistralidadeEvolucao(rawData) {
    const dataset = rawData.sinistralidadeEvolucao;
    const months = dataset?.months || [];
    const breakeven = dataset?.breakeven ?? 70;

    const totalSinistro = months.reduce((s, m) => s + m.sinistro, 0);
    const totalPremio = months.reduce((s, m) => s + m.premio, 0);

    const card = document.createElement('div');
    card.className = 'card card--full mt-6';

    card.innerHTML = `
      <div class="card__header" style="align-items:flex-start;flex-wrap:wrap;gap:var(--space-4)">
        <div class="card__title" style="font-size:1.5rem">Evolucao da Sinistralidade</div>
        <div style="display:flex;gap:var(--space-4);margin-left:auto;flex-wrap:wrap">
          <div style="border:1px solid var(--border);border-radius:var(--radius-lg);padding:var(--space-3) var(--space-5);min-width:180px">
            <div style="font-size:var(--text-sm);color:var(--muted-foreground);margin-bottom:2px">Sinistro total</div>
            <div style="font-size:1.35rem;font-weight:700;letter-spacing:-0.02em">${fmt.currency.format(totalSinistro)}</div>
          </div>
          <div style="border:1px solid var(--border);border-radius:var(--radius-lg);padding:var(--space-3) var(--space-5);min-width:180px">
            <div style="font-size:var(--text-sm);color:var(--muted-foreground);margin-bottom:2px">Premio total</div>
            <div style="font-size:1.35rem;font-weight:700;letter-spacing:-0.02em">${fmt.currency.format(totalPremio)}</div>
          </div>
        </div>
      </div>
      <div class="card__body">
        <div id="chart-sinistralidade-evolucao" class="chart-container chart-container--lg"></div>
      </div>
      <div class="card__footer" id="sinistralidade-evolucao-footer"></div>
    `;

    requestAnimationFrame(() => {
      const footerSlot = card.querySelector('#sinistralidade-evolucao-footer');
      if (footerSlot) footerSlot.appendChild(createIntegrationBadge('Dados de sinistralidade requerem integracao com dados de utilizacao do cliente.', 'Ultima atualizacao de contas medicas em 28/02'));

      createChart('chart-sinistralidade-evolucao', {
        chart: { type: 'line', height: 360, toolbar: { show: false } },
        series: [
          { name: 'Sinistro',       type: 'bar',  data: months.map(m => m.sinistro) },
          { name: 'Premio',         type: 'bar',  data: months.map(m => m.premio) },
          { name: 'Sinistralidade', type: 'line', data: months.map(m => m.taxa) },
          { name: 'Breakeven',      type: 'line', data: months.map(() => breakeven) },
        ],
        xaxis: { categories: months.map(m => m.label) },
        yaxis: [
          {
            // [0] → series[0] Sinistro bars: RIGHT money axis (visible)
            seriesName: 'Sinistro',
            opposite: true,
            min: 0, max: 1500000, tickAmount: 6,
            labels: {
              formatter: (val) => {
                if (val === 0) return 'R$ 0';
                return `R$ ${(val / 1000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}.000`;
              },
              style: { colors: 'var(--muted-foreground)' },
            },
          },
          {
            // [1] → series[1] Premio bars: RIGHT money axis (hidden, shares scale)
            seriesName: 'Premio',
            opposite: true, show: false,
            min: 0, max: 1500000,
          },
          {
            // [2] → series[2] Sinistralidade line: LEFT % axis (visible)
            seriesName: 'Sinistralidade',
            min: 0, max: 160, tickAmount: 8,
            labels: {
              formatter: (val) => `${fmt.decimal.format(val)}%`,
              style: { colors: '#1e2a4a' },
            },
          },
          {
            // [3] → series[3] Breakeven line: LEFT % axis (hidden, shares scale)
            seriesName: 'Breakeven',
            show: false,
            min: 0, max: 160,
          },
        ],
        colors: ['#5b7db1', '#a8c4e0', '#1e2a4a', '#999'],
        stroke: { width: [0, 0, 2.5, 1.5], curve: 'smooth', dashArray: [0, 0, 0, 6] },
        plotOptions: { bar: { columnWidth: '65%', borderRadius: 2 } },
        markers: {
          size: [0, 0, 5, 0],
          colors: ['#fff'],
          strokeColors: '#1e2a4a',
          strokeWidth: 2,
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [2],
          formatter: (val) => `${fmt.decimal.format(val)}%`,
          style: { fontSize: '11px', colors: ['#1e2a4a'], fontWeight: '600' },
          background: { enabled: false },
          offsetY: -8,
        },
        tooltip: {
          shared: true,
          y: [
            { formatter: (val) => fmt.currency.format(val) },
            { formatter: (val) => fmt.currency.format(val) },
            { formatter: (val) => `${fmt.decimal.format(val)}%` },
            { formatter: (val) => `${fmt.decimal.format(val)}%` },
          ],
        },
        legend: { position: 'top', horizontalAlign: 'center' },
        fill: { opacity: [0.85, 0.45, 1, 1] },
        grid: { borderColor: 'var(--border)' },
      });
    });

    return card;
  },

  // ========== Custos por tipo de utilizacao e Utilizacao do plano ==========
  _renderUtilizationStats(rawData) {
    const stats = rawData.planUtilizationStats;
    if (!stats) return null;

    const wrapper = document.createElement('div');
    wrapper.className = 'section-grid mt-6';

    // ---- Card 1: Custos por tipo de utilizacao ----
    const { costsByType } = stats;
    const card1 = document.createElement('div');
    card1.className = 'card';
    card1.innerHTML = `
      <div class="card__header">
        <div class="card__title">Custos por tipo de utilizacao</div>
      </div>
      <div class="card__body">
        <div style="display:flex;gap:var(--space-8);justify-content:center;padding:var(--space-6) 0">
          ${[
            { label: 'Rede', value: costsByType.rede, color: 'var(--foreground)' },
            { label: 'Reembolso', value: costsByType.reembolso, color: 'var(--foreground)' },
          ].map(({ label, value, color }) => `
            <div style="text-align:center;flex:1">
              <div style="font-size:var(--text-sm);color:var(--muted-foreground);margin-bottom:var(--space-2)">${label}</div>
              <div style="font-size:2.25rem;font-weight:700;letter-spacing:-0.02em;color:${color};line-height:1">
                ${fmt.decimal.format(value)}<span style="font-size:1.25rem;font-weight:500">%</span>
              </div>
            </div>
          `).join('<div style="width:1px;background:var(--border);align-self:stretch"></div>')}
        </div>
      </div>
      <div class="card__footer" style="color:var(--muted-foreground);font-size:var(--text-sm)">
        ${costsByType.benchmark}
      </div>
    `;

    // ---- Card 2: O plano foi utilizado nos ultimos 12 meses? ----
    const { planUsedLast12Months } = stats;
    const card2 = document.createElement('div');
    card2.className = 'card';
    card2.innerHTML = `
      <div class="card__header">
        <div class="card__title">O plano foi utilizado nos ultimos 12 meses?</div>
      </div>
      <div class="card__body">
        <div style="display:flex;gap:var(--space-8);justify-content:center;padding:var(--space-6) 0">
          ${[
            { label: 'Sim', value: planUsedLast12Months.sim, color: 'var(--foreground)' },
            { label: 'Nao', value: planUsedLast12Months.nao, color: 'var(--foreground)' },
          ].map(({ label, value, color }) => `
            <div style="text-align:center;flex:1">
              <div style="font-size:var(--text-sm);color:var(--muted-foreground);margin-bottom:var(--space-2)">${label}</div>
              <div style="font-size:2.25rem;font-weight:700;letter-spacing:-0.02em;color:${color};line-height:1">
                ${fmt.decimal.format(value)}<span style="font-size:1.25rem;font-weight:500">%</span>
              </div>
            </div>
          `).join('<div style="width:1px;background:var(--border);align-self:stretch"></div>')}
        </div>
      </div>
      <div class="card__footer" style="color:var(--muted-foreground);font-size:var(--text-sm);text-align:center">
        ${planUsedLast12Months.benchmark}
      </div>
    `;

    wrapper.appendChild(card1);
    wrapper.appendChild(card2);
    return wrapper;
  },

  // ========== Empresas com piora de indicadores ==========
  _renderCompanyIndicators(indicators, _rawData) {
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
