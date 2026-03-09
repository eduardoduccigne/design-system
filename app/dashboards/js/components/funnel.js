// ========== Funnel Component (CSS Flex) ==========

import { fmt } from '../app.js';

/**
 * Create a CSS flex-based funnel visualization for the ER loop.
 * @param {Array<{label: string, value: number, color?: string}>} steps
 * @returns {HTMLElement} DOM element with .funnel class
 */
export function createFunnel(steps) {
  const funnel = document.createElement('div');
  funnel.className = 'funnel';

  if (!steps || steps.length === 0) return funnel;

  const maxValue = Math.max(...steps.map(s => s.value));

  // Default colors for funnel steps (narrowing gradient)
  const defaultColors = ['#037AE5', '#34AA6E', '#F59E0B', '#EF4444', '#8B5CF6'];

  steps.forEach((step, index) => {
    const stepEl = document.createElement('div');
    stepEl.className = 'funnel__step';

    // Calculate width percentage relative to max (narrowing effect)
    const widthPct = maxValue > 0 ? (step.value / maxValue) * 100 : 100;
    const color = step.color || defaultColors[index % defaultColors.length];

    const bar = document.createElement('div');
    bar.className = 'funnel__bar';
    bar.style.width = `${Math.max(widthPct, 15)}%`; // Minimum 15% for visibility
    bar.style.backgroundColor = color;

    const valueEl = document.createElement('span');
    valueEl.className = 'funnel__value';
    valueEl.textContent = fmt.number.format(step.value);
    bar.appendChild(valueEl);

    const labelEl = document.createElement('div');
    labelEl.className = 'funnel__label';
    labelEl.textContent = step.label;

    // Connector arrow between steps (except last)
    stepEl.appendChild(bar);
    stepEl.appendChild(labelEl);
    funnel.appendChild(stepEl);

    if (index < steps.length - 1) {
      const connector = document.createElement('div');
      connector.className = 'funnel__connector';
      connector.innerHTML = `
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <path d="M8 0 L8 18 M3 14 L8 20 L13 14" stroke="#A3A39E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
      funnel.appendChild(connector);
    }
  });

  return funnel;
}
