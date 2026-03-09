// ========== Badge Components ==========

export function createIntegrationBadge(tooltipText) {
  const badge = document.createElement('span');
  badge.className = 'badge badge--integration tooltip-trigger';
  badge.innerHTML = `
    <span class="badge__icon">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    </span>
    <span class="badge__text">Requer integracao</span>
    <span class="tooltip-content">${tooltipText || 'Este dado requer cruzamento com dados de desfecho clinico do cliente.'}</span>
  `;
  return badge;
}

export function createTrendBadge(value, positiveIsUp = true) {
  const badge = document.createElement('span');
  const isUp = value > 0;
  const isPositive = positiveIsUp ? isUp : !isUp;
  const direction = isUp ? 'up' : value < 0 ? 'down' : 'stable';
  const arrow = isUp ? '\u2191' : value < 0 ? '\u2193' : '\u2192';
  const className = isPositive ? 'success' : direction === 'stable' ? 'neutral' : 'danger';

  badge.className = `badge badge--${className}`;
  badge.innerHTML = `<span>${arrow} ${Math.abs(value).toFixed(1)}%</span>`;
  return badge;
}

export function createStatusBadge(status, label) {
  const classMap = {
    good: 'success',
    attention: 'warning',
    critical: 'danger',
    stable: 'neutral',
  };
  const badge = document.createElement('span');
  badge.className = `badge badge--${classMap[status] || 'neutral'}`;
  badge.textContent = label || status;
  return badge;
}

export function createRiskDot(level) {
  const dot = document.createElement('span');
  dot.className = `risk-dot risk-dot--${level}`;
  dot.title = level.charAt(0).toUpperCase() + level.slice(1);
  return dot;
}
