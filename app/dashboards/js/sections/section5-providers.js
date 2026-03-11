// ========== Section 5 — Analise de Prestadores (US-17 to US-18) ==========
import { createDataTable } from '../components/data-table.js';
import { createTrendBadge, createStatusBadge } from '../components/badge.js';
import { fmt, tk } from '../app.js';

export const SectionProviders = {
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
    // US-17: Radar de Reclamacoes de Prestadores
    container.appendChild(this._renderComplaints(rawData));

    // US-18: Prestadores em Destaque e Atencao + Ranking Completo
    container.appendChild(this._renderHighlightsAndAttention(rawData));

    // Provider Rankings table
    container.appendChild(this._renderFullRanking(rawData));

    // Top 5 prestadores acima da mediana de custo
    container.appendChild(this._renderCostAboveMedian(rawData));
  },

  // ========== US-17: Tabela de Reclamacoes de Prestadores ==========
  _renderComplaints(rawData) {
    const card = document.createElement('div');
    card.className = 'card card--full';

    card.innerHTML = `
      <div class="card__header">
        <div>
          <div class="card__title">Reclamacoes de Prestadores</div>
          <div class="card__subtitle">Monitoramento de reclamacoes identificadas nas conversas com pacientes</div>
        </div>
      </div>
      <div class="card__body"></div>
    `;

    const providers = [...(rawData.providerComplaints || [])].sort((a, b) => b.complaints - a.complaints);

    const trendIcons = { improving: '\u2191', stable: '\u2192', worsening: '\u2193' };

    const table = createDataTable({
      columns: [
        { key: 'provider', label: 'Prestador' },
        {
          key: 'complaints', label: 'Reclamacoes', align: 'center',
          render: (val) => {
            const color = val > 20 ? 'var(--destructive-500)' : val > 10 ? 'var(--warning-500)' : 'var(--muted-foreground)';
            return `<strong style="color:${color}">${fmt.number.format(val)}</strong>`;
          },
        },
        {
          key: 'prevMonth', label: 'Mes Anterior', align: 'center',
          render: (val) => fmt.number.format(val),
        },
        {
          key: 'trend', label: 'Tendencia',
          render: (val, row) => {
            const div = document.createElement('span');
            div.className = 'flex items-center gap-2';
            const growthRate = row.prevMonth > 0
              ? ((row.complaints - row.prevMonth) / row.prevMonth * 100)
              : 0;
            div.appendChild(createTrendBadge(growthRate, false));
            return div;
          },
        },
        {
          key: 'topIssues', label: 'Principais Problemas',
          render: (val) => {
            const issues = val || [];
            return `<div class="flex gap-1 flex-wrap">${issues.map(issue =>
              `<span class="badge badge--neutral" style="font-size:11px">${issue}</span>`
            ).join('')}</div>`;
          },
        },
      ],
      rows: providers,
    });

    card.querySelector('.card__body').appendChild(table);

    return card;
  },

  // ========== US-18: Prestadores Destaque e Atencao ==========
  _renderHighlightsAndAttention(rawData) {
    const wrapper = document.createElement('div');
    wrapper.className = 'section-grid mt-6';
    wrapper.style.gridTemplateColumns = '1fr 1fr';

    // --- Card: Em Destaque (positive providers) ---
    const cardGood = document.createElement('div');
    cardGood.className = 'card';
    cardGood.innerHTML = `
      <div class="card__header">
        <div>
          <div class="card__title" style="color:var(--success-500)">Em Destaque</div>
          <div class="card__subtitle">Prestadores com avaliacoes positivas recorrentes</div>
        </div>
      </div>
    `;

    const bodyGood = document.createElement('div');
    bodyGood.className = 'card__body';

    const highlights = rawData.providerHighlights || [];
    if (highlights.length > 0) {
      highlights.forEach((p, i) => {
        const item = document.createElement('div');
        item.style.cssText = 'padding:var(--space-3) 0;' + (i < highlights.length - 1 ? 'border-bottom:1px solid var(--neutral-200, #E5E5E0);' : '');
        item.innerHTML = `
          <div class="flex items-center justify-between mb-1">
            <span class="font-semibold">${p.provider || p.name}</span>
            <span style="color:var(--success-500);font-weight:600">${p.positiveRefs || p.positiveReferences || p.mentions || 0} referencias positivas</span>
          </div>
          <div class="flex gap-2 flex-wrap mt-1">
            ${(p.topics || p.topStrengths || []).map(t => `<span class="badge badge--neutral" style="font-size:11px">${t}</span>`).join('')}
          </div>
        `;
        bodyGood.appendChild(item);
      });
    } else {
      bodyGood.innerHTML = '<div class="text-sm text-secondary" style="padding:var(--space-4)">Nenhum prestador em destaque no periodo</div>';
    }

    cardGood.appendChild(bodyGood);

    // --- Card: Em Atencao (problematic providers) ---
    const cardBad = document.createElement('div');
    cardBad.className = 'card';
    cardBad.innerHTML = `
      <div class="card__header">
        <div>
          <div class="card__title" style="color:var(--destructive-500)">Em Atencao</div>
          <div class="card__subtitle">Prestadores com indicadores que exigem avaliacao</div>
        </div>
      </div>
    `;

    const bodyBad = document.createElement('div');
    bodyBad.className = 'card__body';

    const attention = (rawData.providerRankings || []).filter(p => p.recommendation === 'attention');
    if (attention.length > 0) {
      attention.forEach((p, i) => {
        const item = document.createElement('div');
        item.style.cssText = 'padding:var(--space-3) 0;' + (i < attention.length - 1 ? 'border-bottom:1px solid var(--neutral-200, #E5E5E0);' : '');
        item.innerHTML = `
          <div class="flex items-center justify-between mb-1">
            <div>
              <span class="font-semibold">${p.name}</span>
              <span class="text-secondary text-xs ml-2">${p.specialty || ''}</span>
            </div>
            <span style="color:var(--destructive-500);font-weight:600">${fmt.decimal.format(p.complaintRate)}% reclamacoes</span>
          </div>
          <div class="flex gap-2 flex-wrap mt-1">
            ${(p.topIssues || []).map(issue => `<span class="badge badge--neutral" style="font-size:11px">${issue}</span>`).join('')}
          </div>
        `;
        bodyBad.appendChild(item);
      });
    } else {
      bodyBad.innerHTML = '<div class="text-sm text-secondary" style="padding:var(--space-4)">Nenhum prestador em atencao no periodo</div>';
    }

    cardBad.appendChild(bodyBad);

    wrapper.appendChild(cardGood);
    wrapper.appendChild(cardBad);

    return wrapper;
  },

  // ========== Ranking Completo de Prestadores ==========
  _renderFullRanking(rawData) {
    const card = document.createElement('div');
    card.className = 'card card--full mt-6';

    card.innerHTML = `
      <div class="card__header">
        <div>
          <div class="card__title">Ranking de Prestadores</div>
          <div class="card__subtitle">Todos os prestadores monitorados ordenados por satisfacao</div>
        </div>
      </div>
      <div class="card__body"></div>
    `;

    const sorted = [...(rawData.providerRankings || [])].sort((a, b) => b.satisfactionScore - a.satisfactionScore);

    const recLabels = { recommend: 'Indicar mais', neutral: 'Neutro', attention: 'Avaliar' };
    const recBadgeStatus = { recommend: 'good', neutral: 'stable', attention: 'attention' };

    const table = createDataTable({
      columns: [
        {
          key: 'rank', label: '#',
          render: (val, row) => {
            const idx = sorted.indexOf(row) + 1;
            return `<span class="font-semibold">${idx}</span>`;
          },
        },
        { key: 'name', label: 'Prestador' },
        {
          key: 'satisfactionScore', label: 'Satisfacao',
          render: (val) => {
            const color = val >= 4.0 ? 'var(--success-500)' : val >= 3.5 ? 'var(--primary)' : 'var(--destructive-500)';
            return `<strong style="color:${color}">${val.toFixed(1)}</strong>`;
          },
        },
        {
          key: 'complaintRate', label: 'Taxa Reclamacao', align: 'center',
          render: (val) => `<span style="color:var(--muted-foreground);font-weight:600">${fmt.decimal.format(val)}%</span>`,
        },
        {
          key: 'trend', label: 'Tendencia',
          render: (val) => {
            const div = document.createElement('span');
            div.className = 'flex items-center gap-2';
            const value = val === 'improving' ? 5 : val === 'worsening' ? -5 : 0;
            div.appendChild(createTrendBadge(value, true));
            return div;
          },
        },
        {
          key: 'recommendation', label: 'Recomendacao',
          render: (val) => {
            const status = recBadgeStatus[val] || 'stable';
            const label = recLabels[val] || val;
            return createStatusBadge(status, label);
          },
        },
      ],
      rows: sorted,
      highlightCondition: (row) => {
        if (row.recommendation === 'attention') return 'danger';
        return null;
      },
    });

    card.querySelector('.card__body').appendChild(table);

    return card;
  },

  // ========== Top 5 Prestadores Acima da Mediana de Custo ==========
  _renderCostAboveMedian(rawData) {
    const card = document.createElement('div');
    card.className = 'card card--full mt-6';

    card.innerHTML = `
      <div class="card__header">
        <div>
          <div class="card__title">Top 5 Prestadores Acima da Mediana de Custo</div>
          <div class="card__subtitle">Custo medio por classificacao vs. benchmark de mercado</div>
        </div>
      </div>
      <div class="card__body" id="cost-above-median-body"></div>
    `;

    const providers = rawData.providerCostAboveMedian || [];

    requestAnimationFrame(() => {
      const body = card.querySelector('#cost-above-median-body');
      if (!body) return;

      providers.forEach((provider, providerIdx) => {
        const section = document.createElement('div');
        if (providerIdx > 0) section.style.marginTop = 'var(--space-2)';

        // Collapsible header row
        const trigger = document.createElement('button');
        trigger.style.cssText = [
          'width:100%;display:flex;align-items:center;gap:var(--space-3)',
          'padding:var(--space-3) var(--space-4)',
          'background:var(--muted);border:none;border-radius:var(--radius-md)',
          'cursor:pointer;text-align:left;transition:background var(--transition-fast)',
        ].join(';');
        trigger.innerHTML = `
          <svg class="collapse-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
            style="flex-shrink:0;transition:transform 0.2s ease">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
          <span style="font-weight:700;font-size:var(--font-size-sm);color:var(--foreground);flex:1">${provider.name}</span>
          <span style="color:var(--muted-foreground);font-size:var(--font-size-xs)">${provider.specialty}</span>
          <span style="background:var(--destructive);color:#fff;font-size:var(--font-size-xs);font-weight:700;padding:2px 10px;border-radius:999px;flex-shrink:0">
            +${fmt.decimal.format(provider.aboveMedianPct)}% acima da mediana
          </span>
        `;
        trigger.addEventListener('mouseover', () => trigger.style.background = 'var(--accent)');
        trigger.addEventListener('mouseout', () => trigger.style.background = 'var(--muted)');

        // Collapsible detail (cost table)
        const detail = document.createElement('div');
        detail.style.cssText = 'overflow:hidden;max-height:0;transition:max-height 0.25s ease';

        const table = document.createElement('table');
        table.style.cssText = 'width:100%;border-collapse:collapse;margin-top:var(--space-2)';
        table.innerHTML = `
          <thead>
            <tr>
              <th style="text-align:left;font-size:var(--font-size-xs);font-weight:600;color:var(--muted-foreground);padding:0 var(--space-3) var(--space-2);text-transform:uppercase;letter-spacing:0.05em">Classificacao</th>
              <th style="text-align:left;font-size:var(--font-size-xs);font-weight:600;color:var(--muted-foreground);padding:0 var(--space-3) var(--space-2);text-transform:uppercase;letter-spacing:0.05em">Atual</th>
              <th style="text-align:left;font-size:var(--font-size-xs);font-weight:600;color:var(--muted-foreground);padding:0 var(--space-3) var(--space-2);text-transform:uppercase;letter-spacing:0.05em">Benchmark</th>
            </tr>
          </thead>
          <tbody>
            ${provider.costs.map((row, i) => {
              const isAbove = row.atual > row.benchmark;
              const bg = i % 2 === 0 ? 'var(--muted)' : 'transparent';
              return `
                <tr>
                  <td style="padding:var(--space-3);background:${bg};border-radius:${i % 2 === 0 ? 'var(--radius-lg) 0 0 var(--radius-lg)' : '0'};font-weight:700;color:var(--foreground)">${row.classification}</td>
                  <td style="padding:var(--space-3);background:${bg};color:${isAbove ? 'var(--destructive)' : 'var(--success)'};font-weight:${isAbove ? '600' : '400'}">${fmt.currency.format(row.atual)}</td>
                  <td style="padding:var(--space-3);background:${bg};border-radius:${i % 2 === 0 ? '0 var(--radius-lg) var(--radius-lg) 0' : '0'};color:var(--muted-foreground)">${fmt.currency.format(row.benchmark)}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        `;
        detail.appendChild(table);

        let isOpen = false;
        trigger.addEventListener('click', () => {
          isOpen = !isOpen;
          detail.style.maxHeight = isOpen ? '600px' : '0px';
          const chevron = trigger.querySelector('.collapse-chevron');
          if (chevron) chevron.style.transform = isOpen ? 'rotate(90deg)' : 'rotate(0deg)';
        });

        section.appendChild(trigger);
        section.appendChild(detail);
        body.appendChild(section);
      });
    });

    return card;
  },
};
