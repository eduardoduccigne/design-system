// ========== Quadrant Matrix Component (2x2 Engagement Grid) ==========

import { QUADRANT_LABELS, QUADRANT_COLORS } from '../data/quadrants.js';
import { fmt } from '../app.js';

/**
 * Create a 2x2 quadrant matrix visualization.
 * @param {{ ideal: {count, pct}, engaged: {count, pct}, silent: {count, pct}, invisible: {count, pct} }} data
 * @returns {HTMLElement} DOM element with .quadrant-matrix class
 */
export function createQuadrantMatrix(data) {
  const matrix = document.createElement('div');
  matrix.className = 'quadrant-matrix';

  // Axis labels
  const yAxisLabel = document.createElement('div');
  yAxisLabel.className = 'quadrant-matrix__y-axis';
  yAxisLabel.innerHTML = '<span>Engajamento</span>';
  matrix.appendChild(yAxisLabel);

  // Grid container (2x2)
  const grid = document.createElement('div');
  grid.className = 'quadrant-matrix__grid';

  // Layout:
  // Top-left:    engaged (has engagement, no plan)
  // Top-right:   ideal   (has engagement, has plan)
  // Bottom-left: invisible (no engagement, no plan)
  // Bottom-right: silent  (no engagement, has plan)
  const quadrantOrder = ['engaged', 'ideal', 'invisible', 'silent'];

  quadrantOrder.forEach(key => {
    const cell = document.createElement('div');
    cell.className = `quadrant-matrix__cell quadrant-matrix__cell--${key}`;
    cell.style.borderColor = QUADRANT_COLORS[key];

    const indicator = document.createElement('div');
    indicator.className = 'quadrant-matrix__indicator';
    indicator.style.backgroundColor = QUADRANT_COLORS[key];

    const label = document.createElement('div');
    label.className = 'quadrant-matrix__label';
    label.textContent = QUADRANT_LABELS[key];

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

  matrix.appendChild(grid);

  // X-axis label
  const xAxisLabel = document.createElement('div');
  xAxisLabel.className = 'quadrant-matrix__x-axis';
  xAxisLabel.innerHTML = '<span>Plano de Cuidado</span>';
  matrix.appendChild(xAxisLabel);

  return matrix;
}
