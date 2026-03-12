// ========== Section 4 — Efetividade (US-14 to US-16) ==========
import { createChart, destroyChart } from '../components/chart-factory.js';
import { createDataTable } from '../components/data-table.js';
import { createIntegrationBadge, createStatusBadge } from '../components/badge.js';
import { createExpandable } from '../components/tooltip.js';
import { QUADRANT_LABELS, QUADRANT_COLORS } from '../data/quadrants.js';
import { fmt, MONTH_LABELS, tk } from '../app.js';

const CHART_IDS = [
  'chart-claims-followup',
];

export const SectionEffectiveness = {
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
    // US-14: Quadrant comparison
    container.appendChild(this._renderQuadrants(rawData));

    // US-15: Claims x Follow-up dual-axis chart
    container.appendChild(this._renderClaimsFollowUp(rawData));

    // US-16: Top beneficiaries by cost
    container.appendChild(this._renderTopBeneficiaries(rawData));
  },

  // ========== US-14: Comparativo por Quadrante ==========
  _renderQuadrants(rawData) {
    const card = document.createElement('div');
    card.className = 'card card--full';

    card.innerHTML = `
      <div class="card__header">
        <div>
          <div class="card__title">Distribuicao por Quadrante</div>
          <div class="card__subtitle">Classificacao dos beneficiarios por engajamento e plano de cuidado</div>
        </div>
      </div>
      <div class="card__body"></div>
    `;

    const quadrantsObj = rawData.quadrants || {};
    const quadrants = ['ideal', 'engaged', 'silent', 'invisible']
      .filter(k => quadrantsObj[k])
      .map(k => ({ quadrant: k, ...quadrantsObj[k] }));
    const total = quadrants.reduce((sum, q) => sum + q.count, 0);

    const table = createDataTable({
      columns: [
        {
          key: 'quadrant', label: 'Quadrante',
          render: (val) => {
            const color = QUADRANT_COLORS[val] || 'var(--muted-foreground)';
            const label = QUADRANT_LABELS[val] || val;
            return `
              <span class="flex items-center gap-2">
                <span style="width:12px;height:12px;border-radius:50%;background:${color};display:inline-block"></span>
                <span class="font-semibold">${label}</span>
              </span>
            `;
          },
        },
        {
          key: 'count', label: 'Beneficiarios', align: 'center',
          render: (val) => `<span class="font-semibold">${fmt.number.format(val)}</span>`,
        },
        {
          key: 'pct', label: '% do Total', align: 'center',
          render: (val, row) => {
            const pct = total > 0 ? (row.count / total * 100) : 0;
            return `<span class="font-semibold">${fmt.decimal.format(pct)}%</span>`;
          },
        },
        {
          key: 'quadrant', label: 'Distribuicao', cellClassName: 'w-48',
          render: (val, row) => {
            const pct = total > 0 ? (row.count / total * 100) : 0;
            const color = QUADRANT_COLORS[val] || '#A3A39E';
            return `
              <div style="background:var(--neutral-200, #E5E5E0);border-radius:4px;height:20px;position:relative;overflow:hidden">
                <div style="background:${color};height:100%;width:${pct}%;border-radius:4px;transition:width 0.3s ease"></div>
              </div>
            `;
          },
        },
      ],
      rows: quadrants,
      highlightCondition: (row) => {
        if (row.quadrant === 'invisible') return 'danger';
        if (row.quadrant === 'silent') return 'warning';
        return null;
      },
    });

    card.querySelector('.card__body').appendChild(table);

    // Summary row
    const summary = document.createElement('div');
    summary.className = 'mt-3 flex gap-6 text-sm text-secondary';
    summary.innerHTML = `
      <span>Total: <strong>${fmt.number.format(total)}</strong> beneficiarios</span>
      ${quadrants.map(q => {
        const label = QUADRANT_LABELS[q.quadrant] || q.quadrant;
        const color = QUADRANT_COLORS[q.quadrant] || '#A3A39E';
        return `<span><span style="color:${color};font-weight:600">${label}:</span> ${fmt.number.format(q.count)}</span>`;
      }).join('')}
    `;
    card.querySelector('.card__body').appendChild(summary);

    return card;
  },

  // ========== US-15: Sinistralidade x Acompanhamento ==========
  _renderClaimsFollowUp(rawData) {
    const card = document.createElement('div');
    card.className = 'card card--full mt-6';

    card.innerHTML = `
      <div class="card__header">
        <div>
          <div class="card__title">Sinistralidade x Acompanhamento</div>
          <div class="card__subtitle">Correlacao entre interacoes de risco e uso de pronto-atendimento ao longo do tempo</div>
        </div>
      </div>
      <div class="card__body">
        <div id="sinistralidade-legend" class="flex gap-4 mb-3 text-sm"></div>
        <div id="chart-claims-followup" class="chart-container chart-container--lg"></div>
      </div>
      <div class="card__footer" id="sinistralidade-footer"></div>
    `;

    const riskData = rawData.historicalIndicators.riskThemes || [];

    requestAnimationFrame(() => {
      createChart('chart-claims-followup', {
        chart: { type: 'line', height: 340 },
        series: [
          {
            name: 'Interacoes de risco',
            type: 'bar',
            data: riskData.map(d => d.interactions),
          },
          {
            name: 'Uso de PA (visitas)',
            type: 'line',
            data: riskData.map(d => d.erUsage),
          },
          {
            name: 'Internacoes',
            type: 'line',
            data: riskData.map(d => d.hospitalizations ?? null),
          },
        ],
        xaxis: { categories: riskData.map(d => MONTH_LABELS[d.month] || d.month) },
        yaxis: [
          {
            title: { text: 'Interacoes de risco', style: { color: tk.primary } },
            labels: { formatter: (val) => fmt.number.format(val), style: { colors: tk.primary } },
          },
          {
            opposite: true,
            title: { text: 'Eventos clinicos', style: { color: tk.danger } },
            labels: { formatter: (val) => fmt.number.format(val), style: { colors: tk.danger } },
          },
        ],
        colors: [tk.primary, tk.danger, tk.warning],
        stroke: { width: [0, 3, 3], curve: 'smooth' },
        plotOptions: { bar: { columnWidth: '50%', borderRadius: 4 } },
        markers: { size: [0, 5, 5] },
        tooltip: {
          shared: true,
          y: { formatter: (val) => fmt.number.format(val) },
        },
        legend: { show: false },
      });
    });

    requestAnimationFrame(() => {
      const legendRow = card.querySelector('#sinistralidade-legend');
      if (legendRow) {
        const items = [
          { label: 'Interacoes de risco', color: tk.primary, shape: 'bar' },
          { label: 'Uso de PA (visitas)', color: tk.danger, shape: 'line' },
          { label: 'Internacoes', color: tk.warning, shape: 'line' },
        ];
        legendRow.innerHTML = items.map(({ label, color, shape }) => {
          const indicator = shape === 'bar'
            ? `<span style="width:12px;height:12px;border-radius:2px;background:${color};display:inline-block;flex-shrink:0"></span>`
            : `<span style="display:inline-flex;align-items:center;gap:2px;flex-shrink:0"><span style="width:12px;height:2px;background:${color};display:inline-block"></span><span style="width:6px;height:6px;border-radius:50%;background:${color};display:inline-block"></span><span style="width:12px;height:2px;background:${color};display:inline-block"></span></span>`;
          return `<span style="display:inline-flex;align-items:center;gap:6px;color:var(--muted-foreground)">${indicator}<span>${label}</span></span>`;
        }).join('');
      }
    });

    requestAnimationFrame(() => {
      const footerSlot = card.querySelector('#sinistralidade-footer');
      if (footerSlot) footerSlot.appendChild(createIntegrationBadge('Dados de sinistralidade requerem integracao com dados de utilizacao do cliente.', 'Última atualização de contas médicas em 28/02'));
    });

    return card;
  },

  // ========== US-16: Top Beneficiarios por Custo ==========
  _renderTopBeneficiaries(rawData) {
    const card = document.createElement('div');
    card.className = 'card card--full mt-6';

    card.innerHTML = `
      <div class="card__header">
        <div>
          <div class="card__title">Top Beneficiarios por Custo</div>
          <div class="card__subtitle">Beneficiarios com maior custo assistencial no periodo</div>
        </div>
      </div>
      <div class="card__body"></div>
      <div class="card__footer" id="integration-cost-footer"></div>
    `;

    requestAnimationFrame(() => {
      const footerSlot = card.querySelector('#integration-cost-footer');
      if (footerSlot) footerSlot.appendChild(createIntegrationBadge('Dados de custo assistencial requerem integracao com dados do cliente.', 'Última atualização de contas médicas em 28/02'));
    });

    const beneficiaries = rawData.topBeneficiariesByCost || [];
    const companyMap = {};
    (rawData.companies || []).forEach(c => { companyMap[c.id] = c.name; });

    const tbody = document.createElement('tbody');
    const table = document.createElement('table');
    table.className = 'data-table';

    // Header
    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th></th>
        <th>Beneficiario</th>
        <th>Idade</th>
        <th>Empresa</th>
        <th class="text-right">Custo Total</th>
        <th class="text-center">Sinistros</th>
        <th class="text-center">Acompanhamentos</th>
        <th class="text-center">GSP Engajado</th>
      </tr>
    `;
    table.appendChild(thead);

    beneficiaries.forEach(ben => {
      // Main row
      const tr = document.createElement('tr');
      tr.className = 'expandable-row';
      tr.style.cursor = 'pointer';

      const gspClass = ben.gspEngaged ? 'badge--success' : 'badge--danger';
      const gspLabel = ben.gspEngaged ? 'Sim' : 'Nao';

      tr.innerHTML = `
        <td>
          <span class="expandable-row__icon">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </span>
        </td>
        <td class="font-semibold">${ben.name}</td>
        <td>${ben.age} anos</td>
        <td>${companyMap[ben.companyId] || ben.companyId}</td>
        <td class="text-right"><strong style="color:var(--destructive-500)">${fmt.currency.format(ben.totalCost)}</strong></td>
        <td class="text-center">${fmt.number.format(ben.claimsCount)}</td>
        <td class="text-center">${fmt.number.format(ben.followUpCount)}</td>
        <td class="text-center"><span class="badge ${gspClass}">${gspLabel}</span></td>
      `;

      // Detail row (conditions drill-down)
      const detailTr = document.createElement('tr');
      detailTr.className = 'expandable-row__detail';
      detailTr.style.display = 'none';

      const detailTd = document.createElement('td');
      detailTd.colSpan = 8;
      detailTd.className = 'expandable-row__detail-content';

      const conditions = ben.mainConditions || [];
      if (conditions.length > 0) {
        const conditionsList = document.createElement('div');
        conditionsList.style.cssText = 'padding:var(--space-3);background:var(--neutral-100, #F5F5F0);border-radius:var(--radius-md, 8px)';
        conditionsList.innerHTML = `
          <div class="text-sm font-semibold mb-2">Condicoes identificadas</div>
          <div class="flex gap-2 flex-wrap">
            ${conditions.map(c => `<span class="badge badge--neutral">${c}</span>`).join('')}
          </div>
        `;
        detailTd.appendChild(conditionsList);
      } else {
        detailTd.innerHTML = '<div class="text-sm text-secondary" style="padding:var(--space-3)">Nenhuma condicao detalhada disponivel</div>';
      }

      detailTr.appendChild(detailTd);

      // Toggle handler
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
};

// ========== Helper ==========
function createIntegrationMarkerFooter(text) {
  const footer = document.createElement('div');
  footer.className = 'card__footer';
  footer.innerHTML = `
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:middle;margin-right:4px">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
    ${text}
  `;
  return footer;
}
