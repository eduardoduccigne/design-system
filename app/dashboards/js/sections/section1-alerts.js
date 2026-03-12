// ========== Section 1 — Alertas e Oportunidades (US-01 a US-04) ==========
import { createDataTable } from '../components/data-table.js';
import { DelegarModal } from '../components/delegar-modal.js';
import { createIntegrationBadge } from '../components/badge.js';
import { createQuadrantMatrix } from '../components/quadrant-matrix.js';
import { QUADRANT_LABELS, QUADRANT_COLORS } from '../data/quadrants.js';
import { fmt, navigateTo } from '../app.js';

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
    // Resumo Executivo status bar
    container.appendChild(this._renderResumoExecutivo(data, rawData));

    // Sinistralidade summary + ROI cards
    container.appendChild(this._renderExecutiveCards(rawData));

    // US-02: Quadrant overview + High-risk patients table (merged card)
    container.appendChild(this._renderQuadrantAndHighRisk(data, rawData));

    // US-03: NIP sentiment analysis
    container.appendChild(this._renderNipSentiment(data, rawData));

    // US-04: Proactive risk — irritated without NIP
    container.appendChild(this._renderIrritatedNoNip(data, rawData));
  },

  // ========== Resumo Executivo — status bar ==========
  _renderResumoExecutivo(data, rawData) {
    const bar = document.createElement('div');
    bar.className = 'resumo-exec';

    const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    const criticalCount = (rawData.highRiskPatients || [])
      .filter(p => data._companyIds.includes(p.companyId) && (p.riskLevel === 'critical'))
      .length;

    const nipCount = (rawData.nipSentimentAnalysis || [])
      .filter(p => data._companyIds.includes(p.companyId))
      .length;

    const roi = rawData.programROI;
    const roiLabel = `R$ ${Math.round(roi.totalSavings / 1000)}k`;

    const gspRate = rawData.monthlyKPIs[data._currentMonth]?.gspRate ?? 0;
    const npsTrend = rawData.npsTrend ?? 0;

    const pills = [
      { icon: '●', value: criticalCount, label: 'pacientes críticos', type: 'danger',   action: () => scroll('alertas-quadrant') },
      { icon: '△', value: nipCount,      label: 'NIPs evitáveis',     type: 'warning',  action: () => scroll('alertas-nip') },
      { icon: '$', value: roiLabel,      label: 'economia',           type: 'success',  action: () => scroll('alertas-roi') },
      { icon: '↗', value: `+${fmt.decimal.format(npsTrend)}%`, label: 'satisfação', type: 'success', action: () => navigateTo('pulse') },
      { icon: '↗', value: `${fmt.decimal.format(gspRate)}%`,   label: 'engajamento', type: 'neutral', action: () => navigateTo('pulse') },
    ];

    pills.forEach((pill, i) => {
      if (i > 0) {
        const div = document.createElement('span');
        div.className = 'resumo-exec__divider';
        div.textContent = '|';
        bar.appendChild(div);
      }
      const btn = document.createElement('button');
      btn.className = `resumo-exec__pill resumo-exec__pill--${pill.type}`;
      btn.innerHTML = `<span>${pill.icon}</span><strong>${pill.value}</strong><span>${pill.label}</span>`;
      btn.addEventListener('click', pill.action);
      bar.appendChild(btn);
    });

    return bar;
  },

  // ========== Executive Cards — Sinistralidade + ROI ==========
  _renderExecutiveCards(rawData) {
    const grid = document.createElement('div');
    grid.className = 'section-grid';
    grid.style.cssText = 'grid-template-columns:1fr 1fr 1fr;margin-bottom:var(--space-6)';
    grid.appendChild(this._renderSinistralidadeSummary(rawData));
    grid.appendChild(this._renderROICard(rawData));
    grid.appendChild(this._renderGSPCard(rawData));
    return grid;
  },

  _renderGSPCard(rawData) {
    const card = document.createElement('div');
    card.className = 'card';

    const months = Object.keys(rawData.monthlyKPIs).sort();
    const cur = months[months.length - 1];
    const prev = months[months.length - 2];
    const gspCur = rawData.monthlyKPIs[cur]?.gspRate ?? 0;
    const gspPrev = rawData.monthlyKPIs[prev]?.gspRate ?? gspCur;
    const delta = +(gspCur - gspPrev).toFixed(1);
    const benchmark = rawData.engagementBenchmark ?? 7.5;
    const sparkline = months.map(m => rawData.monthlyKPIs[m]?.gspRate ?? 0);

    const deltaColor = delta >= 0 ? 'var(--success)' : 'var(--destructive)';
    const deltaArrow = delta >= 0 ? '↑' : '↓';
    const vsBenchmark = +(gspCur - benchmark).toFixed(1);
    const vsColor = vsBenchmark >= 0 ? 'var(--success)' : 'var(--warning)';

    card.innerHTML = `
      <div class="card__header">
        <div>
          <div class="card__title">Pacientes em acompanhamento</div>
          <div class="card__subtitle">vs ${fmt.decimal.format(benchmark)}% benchmark de mercado</div>
        </div>
      </div>
      <div class="card__body">
        <div style="font-size:var(--font-size-3xl);font-weight:var(--font-weight-bold);color:var(--foreground);line-height:1">
          ${fmt.decimal.format(gspCur)}%
        </div>
        <div style="font-size:var(--font-size-sm);color:${deltaColor};margin-top:var(--space-1)">
          ${deltaArrow} ${fmt.decimal.format(Math.abs(delta))}pp vs. mês anterior
        </div>
        <div id="alertas-gsp-sparkline" style="margin-top:var(--space-3);height:40px"></div>
        <div style="font-size:var(--font-size-xs);color:${vsColor};margin-top:var(--space-2)">
          ${vsBenchmark >= 0 ? '+' : ''}${fmt.decimal.format(vsBenchmark)}pp vs ${fmt.decimal.format(benchmark)}% mercado
        </div>
      </div>
    `;

    requestAnimationFrame(() => {
      const sparkContainer = card.querySelector('#alertas-gsp-sparkline');
      if (sparkContainer && typeof ApexCharts !== 'undefined') {
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#34AA6E';
        new ApexCharts(sparkContainer, {
          chart: { type: 'area', height: 40, sparkline: { enabled: true }, animations: { enabled: false } },
          series: [{ data: sparkline }],
          stroke: { curve: 'smooth', width: 2 },
          fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.3, opacityTo: 0.05 } },
          colors: [primaryColor],
          tooltip: { enabled: false },
        }).render();
      }
    });

    return card;
  },

  _renderSinistralidadeSummary(rawData) {
    const card = document.createElement('div');
    card.className = 'card';
    card.id = 'alertas-sinistralidade';

    const months = rawData.sinistralidadeEvolucao.months;
    const breakeven = rawData.sinistralidadeEvolucao.breakeven;
    const latest = months[months.length - 1];
    const prev = months[months.length - 2];
    const delta = latest.taxa - prev.taxa;
    const absDelta = Math.abs(delta);

    const color = latest.taxa > breakeven
      ? 'var(--destructive)'
      : latest.taxa > breakeven - 5
      ? 'var(--warning)'
      : 'var(--success)';

    const deltaColor = delta > 0 ? 'var(--destructive)' : 'var(--success)';
    const deltaPrefix = delta > 0 ? '+' : '';
    const deltaArrow = delta > 0 ? '↑' : '↓';

    card.innerHTML = `
      <div class="card__header">
        <div>
          <div class="card__title">Sinistralidade</div>
          <div class="card__subtitle">vs meta de ${breakeven}%</div>
        </div>
      </div>
      <div class="card__body">
        <div style="font-size:var(--font-size-3xl);font-weight:var(--font-weight-bold);color:${color};line-height:1">
          ${fmt.decimal.format(latest.taxa)}%
        </div>
        <div style="margin-top:var(--space-2);font-size:var(--font-size-sm);color:${deltaColor};font-weight:600">
          ${deltaArrow} ${deltaPrefix}${fmt.decimal.format(absDelta)}pp vs mês anterior
        </div>
        <div style="margin-top:var(--space-1);font-size:var(--font-size-xs);color:var(--muted-foreground)">
          ${latest.label} — Meta: ${breakeven}%
        </div>
        <button style="margin-top:var(--space-4);font-size:var(--font-size-xs);color:var(--primary);background:none;border:none;cursor:pointer;padding:0;font-weight:600"
          id="btn-ver-sinistralidade">
          Ver evolução completa →
        </button>
      </div>
    `;

    requestAnimationFrame(() => {
      const btn = card.querySelector('#btn-ver-sinistralidade');
      if (btn) btn.addEventListener('click', () => navigateTo('portfolios'));
    });

    return card;
  },

  _renderROICard(rawData) {
    const card = document.createElement('div');
    card.className = 'card';
    card.id = 'alertas-roi';

    const roi = rawData.programROI;
    const rows = [
      { label: `PA evitados (${roi.avoidedER.count} visitas)`, value: roi.avoidedER.savings },
      { label: `Internações evitadas (${roi.avoidedHospitalizations.count})`, value: roi.avoidedHospitalizations.savings },
    ];

    const tableRows = rows.map((r) => `
        <tr>
          <td style="padding:var(--space-3);font-size:var(--font-size-sm);color:var(--foreground)">${r.label}</td>
          <td style="padding:var(--space-3);color:var(--success);font-weight:600;text-align:right">${fmt.currency.format(r.value)}</td>
        </tr>
      `).join('');

    card.innerHTML = `
      <div class="card__header">
        <div>
          <div class="card__title">Economia do Programa</div>
          <div class="card__subtitle">Economia estimada gerada pelo programa Nilo</div>
        </div>
      </div>
      <div class="card__body">
        <table style="width:100%;border-collapse:collapse">
          <tbody>
            ${tableRows}
            <tr>
              <td style="padding:var(--space-3);font-weight:700;font-size:var(--font-size-sm);border-top:1px solid var(--border);color:var(--foreground)">Total estimado</td>
              <td style="padding:var(--space-3);color:var(--success);font-weight:700;font-size:var(--font-size-base);text-align:right;border-top:1px solid var(--border)">${fmt.currency.format(roi.totalSavings)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    return card;
  },

  // ========== Helper: post-delegation cell ==========
  _buildDelegatedCell(task, cell) {
    cell.innerHTML = '';

    const initials = (task.professionalName || '?')
      .split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    const avatar = document.createElement('div');
    avatar.style.cssText = [
      'width:28px;height:28px;border-radius:50%',
      'background:var(--primary);color:#fff',
      'font-size:10px;font-weight:700',
      'display:flex;align-items:center;justify-content:center;flex-shrink:0',
    ].join(';');
    avatar.textContent = initials;

    const name = document.createElement('span');
    name.style.cssText = 'font-size:var(--font-size-xs);font-weight:600;color:var(--foreground);display:block';
    name.textContent = (task.professionalName || '').split(' ')[0];

    const statusBadge = document.createElement('span');
    statusBadge.className = 'badge badge--stable';
    statusBadge.style.cssText = 'font-size:10px;padding:1px 6px;display:block;width:fit-content;margin-top:2px';
    statusBadge.textContent = 'Em andamento';

    const info = document.createElement('div');
    info.style.cssText = 'display:flex;flex-direction:column';
    info.appendChild(name);
    info.appendChild(statusBadge);

    const chip = document.createElement('div');
    chip.style.cssText = 'display:flex;align-items:center;gap:var(--space-2)';
    chip.appendChild(avatar);
    chip.appendChild(info);
    cell.appendChild(chip);
  },

  // ========== US-02: Quadrant Overview + High-risk patients (merged card) ==========
  _renderQuadrantAndHighRisk(data, rawData) {
    const card = document.createElement('div');
    card.className = 'card card--full mt-6';
    card.id = 'alertas-quadrant';

    // Count patients per quadrant
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
          <div class="card__title" style="display:flex;align-items:center;gap:var(--space-2)">
            Pacientes de Alto Risco — Visao por Quadrante
            <span class="info-tooltip-anchor" style="position:relative;display:inline-flex;align-items:center">
              <span class="info-tooltip-trigger" tabindex="0" style="
                width:16px;height:16px;border-radius:50%;
                background:var(--muted);border:1px solid var(--border);
                color:var(--muted-foreground);font-size:10px;font-weight:700;
                display:inline-flex;align-items:center;justify-content:center;
                cursor:default;flex-shrink:0;line-height:1
              ">i</span>
              <span class="info-tooltip-content" style="
                display:none;position:absolute;left:0;top:calc(100% + 6px);
                background:var(--foreground);color:var(--background);
                font-size:var(--font-size-xs);font-weight:400;
                padding:var(--space-3) var(--space-4);
                border-radius:var(--radius-md);
                width:260px;line-height:1.5;z-index:50;
                box-shadow:0 4px 12px rgba(0,0,0,0.15)
              ">
                <strong style="display:block;margin-bottom:4px">Como definimos alto risco</strong>
                Pacientes classificados com base em padrão de uso assistencial:
                <ul style="margin:6px 0 0;padding-left:16px;display:flex;flex-direction:column;gap:2px">
                  <li>Internações recentes ou recorrentes</li>
                  <li>Uso frequente de pronto-atendimento (PA)</li>
                  <li>Realização de exames de alta complexidade</li>
                  <li>Doenças crônicas ou condições conhecidas de risco</li>
                  <li>Baixo engajamento com plano de cuidado ativo</li>
                </ul>
              </span>
            </span>
          </div>
          <div class="card__subtitle">Distribuicao por engajamento e plano de cuidado, com lista priorizada de pacientes sem acompanhamento ativo</div>
        </div>
      </div>
      <div class="card__body" id="quadrant-overview-body"></div>
      <div style="border-top:1px solid var(--border);margin:0 var(--spacing-4)"></div>
      <div class="card__body" id="high-risk-table"></div>
    `;

    // Info tooltip behaviour
    const trigger = card.querySelector('.info-tooltip-trigger');
    const tooltip = card.querySelector('.info-tooltip-content');
    if (trigger && tooltip) {
      const show = () => { tooltip.style.display = 'block'; };
      const hide = () => { tooltip.style.display = 'none'; };
      trigger.addEventListener('mouseenter', show);
      trigger.addEventListener('mouseleave', hide);
      trigger.addEventListener('focus', show);
      trigger.addEventListener('blur', hide);
    }

    const matrix = createQuadrantMatrix(quadrantData);

    requestAnimationFrame(() => {
      const matrixBody = card.querySelector('#quadrant-overview-body');
      if (matrixBody) {
        matrixBody.style.display = 'flex';
        matrixBody.style.justifyContent = 'center';
        matrixBody.appendChild(matrix);
      }
    });

    const company = (id) => rawData.companies.find(c => c.id === id)?.name || id;

    // Group by quadrant, ordered by urgency
    const QUADRANT_ORDER = ['invisible', 'silent', 'engaged', 'ideal'];
    const byQuadrant = {};
    QUADRANT_ORDER.forEach(q => {
      byQuadrant[q] = patients
        .filter(p => p.quadrant === q)
        .sort((a, b) => b.riskScore - a.riskScore);
    });

    const columns = [
      { key: 'name', label: 'Paciente' },
      { key: 'age', label: 'Idade', align: 'center' },
      { key: 'companyId', label: 'Empresa', format: (val) => company(val) },
      { key: 'condition', label: 'Condicao sinalizadora' },
      { key: 'lastContact', label: 'Ultimo contato', format: (val) => {
        const d = new Date(val);
        return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      }},
      {
        key: '_action', label: '', align: 'center',
        render: (_, patient) => {
          const btn = document.createElement('button');
          btn.className = 'btn btn--ghost btn--icon-sm';
          btn.title = 'Delegar';
          btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>`;
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            DelegarModal.open(patient, 'highRisk', rawData, (task) => {
              this._buildDelegatedCell(task, btn.closest('td') || btn.parentElement);
            });
          });
          return btn;
        },
      },
    ];

    requestAnimationFrame(() => {
      const tableBody = card.querySelector('#high-risk-table');
      if (!tableBody) return;

      QUADRANT_ORDER.forEach((quadrant, idx) => {
        const group = byQuadrant[quadrant];
        if (!group.length) return;

        const color = QUADRANT_COLORS[quadrant];
        const label = QUADRANT_LABELS[quadrant];
        const startOpen = quadrant === 'invisible';

        // Collapsible wrapper
        const section = document.createElement('div');
        if (idx > 0) section.style.marginTop = 'var(--space-2)';

        const header = document.createElement('button');
        header.style.cssText = [
          'width:100%;display:flex;align-items:center;gap:var(--space-2)',
          'padding:var(--space-3) var(--space-4)',
          'background:var(--muted);border:none;border-radius:var(--radius-md)',
          'cursor:pointer;text-align:left;transition:background var(--transition-fast)',
        ].join(';');
        header.innerHTML = `
          <svg class="collapse-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
            style="flex-shrink:0;transition:transform 0.2s ease;transform:${startOpen ? 'rotate(90deg)' : 'rotate(0deg)'}">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
          <span style="width:10px;height:10px;border-radius:50%;background:${color};flex-shrink:0;display:inline-block"></span>
          <span style="font-size:var(--font-size-sm);font-weight:var(--font-weight-semibold);color:var(--foreground)">${label}</span>
          <span style="font-size:var(--font-size-xs);color:var(--muted-foreground);margin-left:var(--space-1)">${group.length} paciente${group.length !== 1 ? 's' : ''}</span>
        `;
        header.addEventListener('mouseover', () => header.style.background = 'var(--accent)');
        header.addEventListener('mouseout', () => header.style.background = 'var(--muted)');

        const body = document.createElement('div');
        body.style.cssText = `overflow:hidden;transition:max-height 0.25s ease;max-height:${startOpen ? '2000px' : '0px'}`;
        body.appendChild(createDataTable({ columns, rows: group }));

        let isOpen = startOpen;
        header.addEventListener('click', () => {
          isOpen = !isOpen;
          body.style.maxHeight = isOpen ? '2000px' : '0px';
          const chevron = header.querySelector('.collapse-chevron');
          if (chevron) chevron.style.transform = isOpen ? 'rotate(90deg)' : 'rotate(0deg)';
        });

        section.appendChild(header);
        section.appendChild(body);
        tableBody.appendChild(section);
      });
    });

    return card;
  },

  // ========== US-03: Analise de Sentimento — Pacientes com NIP ==========
  _renderNipSentiment(data, rawData) {
    const card = document.createElement('div');
    card.className = 'card card--full mt-6';
    card.id = 'alertas-nip';

    const patients = (rawData.nipSentimentAnalysis || [])
      .filter(p => data._companyIds.includes(p.companyId));

    const interceptable = patients.filter(p => p.interceptable).length;
    const total = patients.length;
    const pct = total > 0 ? Math.round((interceptable / total) * 100) : 0;

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
          <div class="card__title">Pacientes com NIP: análise de conversas</div>
          <div class="card__subtitle">Conversas recentes que poderiam ter sido interceptadas antes da abertura de NIP</div>
        </div>
        <div class="kpi-mini">
            <span class="kpi-mini__value" style="color:var(--warning-600)">${interceptable} de ${total}</span>
            <span class="kpi-mini__label">NIPs interceptaveis (${pct}%)</span>
          </div>
      </div>
      <div class="card__body" id="nip-sentiment-table"></div>
      <div class="card__footer" id="nip-sentiment-footer"></div>
    `;

    requestAnimationFrame(() => {
      const footerSlot = card.querySelector('#nip-sentiment-footer');
      if (footerSlot) footerSlot.appendChild(createIntegrationBadge('Dados de NIP requerem cruzamento com registros do cliente.', 'Última atualização de NIP em 10/04'));
    });

    const table = createDataTable({
      columns: [
        { key: 'name', label: 'Paciente' },
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
        {
          key: '_action', label: '', align: 'center',
          render: (_, patient) => {
            const btn = document.createElement('button');
            btn.className = 'btn btn--ghost btn--icon-sm';
            btn.title = 'Delegar';
            btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>`;
            btn.addEventListener('click', (e) => {
              e.stopPropagation();
              DelegarModal.open(patient, 'nip', rawData, (task) => {
                this._buildDelegatedCell(task, btn.closest('td') || btn.parentElement);
              });
            });
            return btn;
          },
        },
      ],
      rows: patients,
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

    card.innerHTML = `
      <div class="card__header">
        <div>
          <div class="card__title">Pacientes insatisfeitos com risco de NIP</div>
          <div class="card__subtitle">Pacientes com sentimento negativo ou NPS baixo que ainda nao abriram NIP</div>
        </div>
        <div class="kpi-mini">
            <span class="kpi-mini__value" style="color:var(--destructive-600)">${highRiskCount}</span>
            <span class="kpi-mini__label">risco alto de NIP</span>
          </div>
      </div>
      <div class="card__body" id="irritated-no-nip-table"></div>
      <div class="card__footer" id="irritated-no-nip-footer"></div>
    `;

    requestAnimationFrame(() => {
      const footerSlot = card.querySelector('#irritated-no-nip-footer');
      if (footerSlot) footerSlot.appendChild(createIntegrationBadge('Dados de NIP requerem cruzamento com registros do cliente.', 'Última atualização de NIP em 10/04'));
    });

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
        {
          key: 'nipRisk', label: 'Risco NIP', align: 'center',
          render: (val) => `<span class="badge ${riskBadgeClass(val)}">${riskLabel(val)}</span>`,
        },
        {
          key: '_action', label: '', align: 'center',
          render: (_, patient) => {
            const btn = document.createElement('button');
            btn.className = 'btn btn--ghost btn--icon-sm';
            btn.title = 'Delegar';
            btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>`;
            btn.addEventListener('click', (e) => {
              e.stopPropagation();
              DelegarModal.open(patient, 'risk', rawData, (task) => {
                this._buildDelegatedCell(task, btn.closest('td') || btn.parentElement);
              });
            });
            return btn;
          },
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

};
