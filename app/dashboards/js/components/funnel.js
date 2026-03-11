// ========== Funnel Component (CSS Flex) ==========

import { fmt } from '../app.js';

/**
 * Create a horizontal-bar funnel visualization.
 * Each step has a left label, proportional bar with count+pct, and a
 * drop-off connector between steps.
 * @param {Array<{label: string, value: number, color?: string}>} steps
 * @returns {HTMLElement} DOM element with .funnel class
 */
export function createFunnel(steps) {
  const funnel = document.createElement('div');
  funnel.className = 'funnel';

  if (!steps || steps.length === 0) return funnel;

  const maxValue = Math.max(...steps.map(s => s.value));

  steps.forEach((step, i) => {
    // Row: label + bar track
    const row = document.createElement('div');
    row.className = 'funnel__row';

    const labelEl = document.createElement('div');
    labelEl.className = 'funnel__step-label';
    labelEl.textContent = step.label;

    const track = document.createElement('div');
    track.className = 'funnel__bar-track';

    const widthPct = maxValue > 0 ? Math.max((step.value / maxValue) * 100, 12) : 100;
    const bar = document.createElement('div');
    bar.className = 'funnel__bar';
    bar.style.width = `${widthPct}%`;
    bar.style.background = step.color || '#037AE5';

    const countEl = document.createElement('span');
    countEl.className = 'funnel__bar-count';
    countEl.textContent = fmt.number.format(step.value);

    const pctEl = document.createElement('span');
    pctEl.className = 'funnel__bar-pct';
    pctEl.textContent = `${(step.value / maxValue * 100).toFixed(1)}%`;

    bar.appendChild(countEl);
    bar.appendChild(pctEl);
    track.appendChild(bar);
    row.appendChild(labelEl);
    row.appendChild(track);
    funnel.appendChild(row);

    // Connector between steps showing drop-off
    if (i < steps.length - 1) {
      const next = steps[i + 1];
      const drop = step.value - next.value;
      const dropPct = step.value > 0 ? (drop / step.value * 100).toFixed(1) : 0;

      const connector = document.createElement('div');
      connector.className = 'funnel__connector';

      const line = document.createElement('div');
      line.className = 'funnel__connector-line';

      const connLabel = document.createElement('span');
      connLabel.className = 'funnel__connector-label';
      connLabel.textContent = `↓ ${fmt.number.format(drop)} (-${dropPct}%)`;

      connector.appendChild(line);
      connector.appendChild(connLabel);
      funnel.appendChild(connector);
    }
  });

  return funnel;
}
