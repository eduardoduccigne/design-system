// ========== Quadrant Matrix Component (2x2 Engagement Grid) ==========

import { QUADRANT_LABELS, QUADRANT_COLORS } from '../data/quadrants.js';
import { fmt } from '../app.js';

const QUADRANT_DESCRIPTIONS = {
  engaged:   'Pacientes têm entrado em contato e respondido mensagens, mas ainda não têm um plano de cuidado definido.',
  ideal:     'Paciente engajado e com plano de cuidado em execução.',
  silent:    'Paciente tem executado plano, mas com baixo engajamento no chat.',
  invisible: 'Pacientes com baixo engajamento e sem um plano de cuidado definido.',
};

/**
 * Create a 2x2 quadrant matrix visualization.
 * @param {{ ideal: {count, pct}, engaged: {count, pct}, silent: {count, pct}, invisible: {count, pct} }} data
 * @returns {HTMLElement} DOM element with .quadrant-matrix class
 */
export function createQuadrantMatrix(data) {
  const wrapper = document.createElement('div');
  wrapper.className = 'quadrant-matrix';

  // ── Y-axis (left column, rotated bottom-to-top) ──────────────────
  const yAxis = document.createElement('div');
  yAxis.className = 'quadrant-matrix__y-axis';
  yAxis.innerHTML = `
    <span class="quadrant-matrix__axis-end">Alto</span>
    <span class="quadrant-matrix__axis-label">Engajamento</span>
    <span class="quadrant-matrix__axis-end">Baixo</span>
  `;

  // ── Main row: y-axis + grid ──────────────────────────────────────
  const main = document.createElement('div');
  main.className = 'quadrant-matrix__main';

  // 2x2 grid
  // Top-left:     engaged   (high engagement, no plan)
  // Top-right:    ideal     (high engagement, has plan)
  // Bottom-left:  invisible (low engagement, no plan)
  // Bottom-right: silent    (low engagement, has plan)
  const grid = document.createElement('div');
  grid.className = 'quadrant-matrix__grid';

  ['engaged', 'ideal', 'invisible', 'silent'].forEach(key => {
    const cell = document.createElement('div');
    cell.className = `quadrant-matrix__cell quadrant-matrix__cell--${key}`;

    const indicator = document.createElement('div');
    indicator.className = 'quadrant-matrix__indicator';
    indicator.style.backgroundColor = QUADRANT_COLORS[key];

    const label = document.createElement('div');
    label.className = 'quadrant-matrix__label';
    label.innerHTML = `
      <span>${QUADRANT_LABELS[key]}</span>
      <span class="quadrant-matrix__info tooltip-trigger">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        <span class="tooltip-content">${QUADRANT_DESCRIPTIONS[key]}</span>
      </span>
    `;

    const count = document.createElement('div');
    count.className = 'quadrant-matrix__count';
    count.textContent = fmt.number.format(data[key]?.count ?? 0);

    const pct = document.createElement('div');
    pct.className = 'quadrant-matrix__pct';
    pct.textContent = `${fmt.decimal.format(data[key]?.pct ?? 0)}%`;

    cell.appendChild(indicator);
    cell.appendChild(label);
    cell.appendChild(count);
    cell.appendChild(pct);
    grid.appendChild(cell);
  });

  main.appendChild(yAxis);
  main.appendChild(grid);
  wrapper.appendChild(main);

  // ── X-axis row (below, offset to align with grid) ─────────────────
  const xAxisRow = document.createElement('div');
  xAxisRow.className = 'quadrant-matrix__x-axis-row';

  const xAxis = document.createElement('div');
  xAxis.className = 'quadrant-matrix__x-axis';
  xAxis.innerHTML = `
    <span class="quadrant-matrix__axis-end">Sem plano</span>
    <span class="quadrant-matrix__axis-label">Cuidado Ativo</span>
    <span class="quadrant-matrix__axis-end">Aderente</span>
  `;

  xAxisRow.appendChild(xAxis);
  wrapper.appendChild(xAxisRow);

  return wrapper;
}
