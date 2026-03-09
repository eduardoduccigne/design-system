// ========== Section 6 — Carteiras / Portfolios (US-19 to US-20) ==========
import { createKPICard } from '../components/kpi-card.js';
import { createChart, destroyChart } from '../components/chart-factory.js';
import { createDataTable } from '../components/data-table.js';
import { createTrendBadge, createStatusBadge } from '../components/badge.js';
import { fmt, MONTH_LABELS, tk } from '../app.js';

const CHART_IDS = [
  'chart-company-engagement',
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

  _buildContent(container, data, rawData) {
    // Merge beneficiaries count from companies into indicators
    const companyMap = {};
    (rawData.companies || []).forEach(c => { companyMap[c.id] = c.beneficiaries; });
    const indicators = (rawData.companyIndicators || []).map(ind => ({
      ...ind,
      beneficiaries: ind.beneficiaries || companyMap[ind.companyId] || 0,
    }));

    // KPI Overview
    this._renderOverview(container, indicators);

    // US-19: Company comparison table
    container.appendChild(this._renderCompanyComparison(indicators));

    // US-20: Companies with worsening indicators
    container.appendChild(this._renderAttentionCompanies(indicators, rawData));
  },

  // ========== KPI Overview ==========
  _renderOverview(container, indicators) {
    const kpiRow = document.createElement('div');
    kpiRow.className = 'kpi-row';

    const totalLives = indicators.reduce((sum, c) => sum + (c.beneficiaries || 0), 0);
    const avgEngagement = indicators.length > 0
      ? indicators.reduce((sum, c) => sum + c.engagement, 0) / indicators.length
      : 0;
    const avgMentalHealth = indicators.length > 0
      ? indicators.reduce((sum, c) => sum + (c.mentalHealthRate || 0), 0) / indicators.length
      : 0;
    const avgErUsage = indicators.length > 0
      ? indicators.reduce((sum, c) => sum + (c.erUsage || 0), 0) / indicators.length
      : 0;

    kpiRow.appendChild(createKPICard({
      label: 'Total de vidas',
      value: totalLives,
      trend: { value: 0, positive: true },
      sparklineData: null,
    }));

    kpiRow.appendChild(createKPICard({
      label: 'Engajamento medio',
      value: avgEngagement,
      formatType: 'percent',
      trend: { value: 0, positive: true },
      sparklineData: null,
    }));

    kpiRow.appendChild(createKPICard({
      label: 'Saude mental media',
      value: avgMentalHealth,
      formatType: 'percent',
      trend: { value: 0, positive: true },
      sparklineData: null,
    }));

    kpiRow.appendChild(createKPICard({
      label: 'Uso de PA medio',
      value: avgErUsage,
      formatType: 'percent',
      trend: { value: 0, positive: false },
      sparklineData: null,
    }));

    container.appendChild(kpiRow);
  },

  // ========== US-19: Comparativo entre Empresas ==========
  _renderCompanyComparison(indicators) {
    const card = document.createElement('div');
    card.className = 'card card--full mt-6';

    card.innerHTML = `
      <div class="card__header">
        <div>
          <div class="card__title">Comparativo entre Empresas</div>
          <div class="card__subtitle">Indicadores por carteira para identificar oportunidades de melhoria</div>
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

    const table = createDataTable({
      columns: [
        { key: 'companyName', label: 'Empresa' },
        {
          key: 'beneficiaries', label: 'Beneficiarios', align: 'center',
          render: (val) => `<span class="font-semibold">${fmt.number.format(val || 0)}</span>`,
        },
        {
          key: 'engagement', label: 'Engajamento',
          render: (val, row) => {
            const div = document.createElement('span');
            div.className = 'flex items-center gap-2';

            const isBest = bestEngagement && row.companyId === bestEngagement.companyId;
            const isWorst = worstEngagement && row.companyId === worstEngagement.companyId;
            const style = isBest ? 'color:var(--success-500);font-weight:700' : isWorst ? 'color:var(--destructive-500);font-weight:700' : 'font-weight:600';
            const icon = isBest ? ' *' : isWorst ? ' !' : '';

            const span = document.createElement('span');
            span.style.cssText = style;
            span.textContent = `${fmt.decimal.format(val)}%${icon}`;
            div.appendChild(span);

            if (row.prevEngagement !== undefined) {
              const trend = ((val - row.prevEngagement) / row.prevEngagement * 100);
              div.appendChild(createTrendBadge(trend, true));
            }
            return div;
          },
        },
        {
          key: 'mentalHealthRate', label: 'Saude Mental',
          render: (val, row) => {
            const div = document.createElement('span');
            div.className = 'flex items-center gap-2';
            div.innerHTML = `<span class="font-semibold">${fmt.decimal.format(val || 0)}%</span>`;
            if (row.prevMentalHealthRate !== undefined) {
              const trend = row.prevMentalHealthRate > 0
                ? ((val - row.prevMentalHealthRate) / row.prevMentalHealthRate * 100)
                : 0;
              div.appendChild(createTrendBadge(trend, false));
            }
            return div;
          },
        },
        {
          key: 'erUsage', label: 'Uso de PA',
          render: (val, row) => {
            const div = document.createElement('span');
            div.className = 'flex items-center gap-2';
            div.innerHTML = `<span class="font-semibold">${fmt.decimal.format(val || 0)}%</span>`;
            if (row.prevErUsage !== undefined) {
              const trend = row.prevErUsage > 0
                ? ((val - row.prevErUsage) / row.prevErUsage * 100)
                : 0;
              div.appendChild(createTrendBadge(trend, false));
            }
            return div;
          },
        },
        {
          key: 'status', label: 'Status',
          render: (val) => {
            const label = statusLabels[val] || val || 'Estavel';
            return createStatusBadge(val || 'stable', label);
          },
        },
      ],
      rows: indicators,
      highlightCondition: (row) => {
        if (row.status === 'critical') return 'danger';
        if (row.status === 'attention') return 'warning';
        return null;
      },
    });

    card.querySelector('.card__body').appendChild(table);

    // Legend
    const legend = document.createElement('div');
    legend.className = 'mt-3 text-xs text-secondary flex gap-4';
    legend.innerHTML = `
      <span><strong style="color:var(--success-500)">*</strong> Melhor desempenho</span>
      <span><strong style="color:var(--destructive-500)">!</strong> Menor desempenho</span>
    `;
    card.querySelector('.card__body').appendChild(legend);

    return card;
  },

  // ========== US-20: Empresas com Indicadores em Piora ==========
  _renderAttentionCompanies(indicators, rawData) {
    const card = document.createElement('div');
    card.className = 'card card--full mt-6';

    card.innerHTML = `
      <div class="card__header">
        <div>
          <div class="card__title">Empresas com Indicadores em Atencao</div>
          <div class="card__subtitle">Carteiras que requerem intervencao prioritaria</div>
        </div>
      </div>
      <div class="card__body"></div>
    `;

    const attentionCompanies = indicators.filter(c => c.status === 'attention');

    if (attentionCompanies.length === 0) {
      card.querySelector('.card__body').innerHTML = `
        <div class="text-sm text-secondary" style="padding:var(--space-4);text-align:center">
          Nenhuma empresa com indicadores em atencao no periodo
        </div>
      `;
      return card;
    }

    const engagementByCompany = rawData.engagementByCompany || {};

    const tbody = document.createElement('tbody');
    const table = document.createElement('table');
    table.className = 'data-table';

    // Header
    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th></th>
        <th>Empresa</th>
        <th class="text-center">Beneficiarios</th>
        <th>Engajamento</th>
        <th>Saude Mental</th>
        <th>Uso de PA</th>
        <th>Temas Predominantes</th>
      </tr>
    `;
    table.appendChild(thead);

    attentionCompanies.forEach(company => {
      // Main row
      const tr = document.createElement('tr');
      tr.className = 'expandable-row row--warning';
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
        <td><strong style="color:var(--destructive-500)">${fmt.decimal.format(company.engagement)}%</strong></td>
        <td>${fmt.decimal.format(company.mentalHealthRate || 0)}%</td>
        <td>${fmt.decimal.format(company.erUsage || 0)}%</td>
        <td class="text-xs text-secondary">${(company.topThemes || []).join(', ')}</td>
      `;

      // Detail row with engagement evolution chart
      const detailTr = document.createElement('tr');
      detailTr.className = 'expandable-row__detail';
      detailTr.style.display = 'none';

      const detailTd = document.createElement('td');
      detailTd.colSpan = 7;
      detailTd.className = 'expandable-row__detail-content';

      const chartId = `chart-company-engagement-${company.companyId}`;
      detailTd.innerHTML = `
        <div style="padding:var(--space-3)">
          <div class="text-sm font-semibold mb-2">Evolucao de engajamento - ${company.companyName}</div>
          <div id="${chartId}" class="chart-container" style="height:220px"></div>
          ${(company.topThemes || []).length > 0 ? `
            <div class="mt-3">
              <div class="text-xs font-semibold mb-1">Temas predominantes</div>
              <div class="flex gap-2 flex-wrap">
                ${company.topThemes.map(t => `<span class="badge badge--warning">${t}</span>`).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      `;
      detailTr.appendChild(detailTd);

      // Toggle handler
      let isOpen = false;
      let chartRendered = false;

      tr.addEventListener('click', () => {
        isOpen = !isOpen;
        detailTr.style.display = isOpen ? '' : 'none';
        tr.classList.toggle('expandable-row--open', isOpen);

        const icon = tr.querySelector('.expandable-row__icon svg');
        if (icon) {
          icon.style.transform = isOpen ? 'rotate(90deg)' : '';
          icon.style.transition = 'transform 0.2s ease';
        }

        // Lazy render chart on first open
        if (isOpen && !chartRendered) {
          chartRendered = true;
          const companyEngagement = engagementByCompany[company.companyId] || [];
          if (companyEngagement.length > 0) {
            requestAnimationFrame(() => {
              createChart(chartId, {
                chart: { type: 'line', height: 200 },
                series: [{ name: 'Engajamento', data: companyEngagement.map(d => d.value) }],
                xaxis: { categories: companyEngagement.map(d => MONTH_LABELS[d.month] || d.month) },
                yaxis: { labels: { formatter: (val) => `${fmt.decimal.format(val)}%` } },
                colors: [tk.primary],
                stroke: { width: 3, curve: 'smooth' },
                markers: { size: 5 },
                tooltip: { y: { formatter: (val) => `${fmt.decimal.format(val)}%` } },
              });
            });
          }
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
};
