// ========== KPI Card Component (Nilo palette) ==========
import { fmt } from '../app.js';

export function createKPICard({ label, value, unit, trend, sparklineData, formatType }) {
  const card = document.createElement('div');
  card.className = 'kpi-card';

  // Format value
  let formattedValue;
  if (formatType === 'currency') {
    formattedValue = fmt.currency.format(value);
  } else if (formatType === 'percent') {
    formattedValue = fmt.decimal.format(value) + '%';
  } else if (formatType === 'decimal') {
    formattedValue = fmt.decimal.format(value);
  } else {
    formattedValue = fmt.number.format(value);
  }

  // Trend direction
  const trendDir = trend.value > 0 ? 'up' : trend.value < 0 ? 'down' : 'stable';
  const trendArrow = trendDir === 'up' ? '\u2191' : trendDir === 'down' ? '\u2193' : '\u2192';
  const trendClass = trend.positive
    ? (trendDir === 'up' ? 'up' : trendDir === 'down' ? 'down' : 'stable')
    : (trendDir === 'up' ? 'down' : trendDir === 'down' ? 'up' : 'stable');

  card.innerHTML = `
    <div class="kpi-card__label">${label}</div>
    <div class="kpi-card__value">${formattedValue}${unit ? `<span class="kpi-card__unit">${unit}</span>` : ''}</div>
    <div class="kpi-card__trend kpi-card__trend--${trendClass}">
      <span>${trendArrow}</span>
      <span>${fmt.decimal.format(Math.abs(trend.value))}% vs. mes anterior</span>
    </div>
    ${sparklineData ? `<div class="kpi-card__sparkline" id="sparkline-${label.replace(/\s+/g, '-').toLowerCase()}"></div>` : ''}
  `;

  // Render sparkline after DOM insertion (uses Nilo --primary color)
  if (sparklineData) {
    requestAnimationFrame(() => {
      const sparkContainer = card.querySelector('.kpi-card__sparkline');
      if (sparkContainer && typeof ApexCharts !== 'undefined') {
        const primaryColor = getComputedStyle(document.documentElement)
          .getPropertyValue('--primary').trim() || '#34AA6E';
        const spark = new ApexCharts(sparkContainer, {
          chart: {
            type: 'area',
            height: 40,
            sparkline: { enabled: true },
            animations: { enabled: false },
          },
          series: [{ data: sparklineData }],
          stroke: { curve: 'smooth', width: 2 },
          fill: {
            type: 'gradient',
            gradient: { shadeIntensity: 1, opacityFrom: 0.3, opacityTo: 0.05 },
          },
          colors: [primaryColor],
          tooltip: { enabled: false },
        });
        spark.render();
      }
    });
  }

  return card;
}
