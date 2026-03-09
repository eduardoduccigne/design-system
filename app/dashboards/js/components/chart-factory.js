// ========== Chart Factory -- ApexCharts wrapper with Nilo palette ==========

const CHART_PALETTE = ['#34AA6E', '#037AE5', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#22C55E', '#A3A39E'];

const BASE_OPTIONS = {
  chart: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    toolbar: { show: false },
    animations: { enabled: true, easing: 'easeinout', speed: 500 },
    background: 'transparent',
  },
  colors: CHART_PALETTE,
  tooltip: {
    theme: 'light',
    style: { fontSize: '12px' },
  },
  grid: {
    borderColor: '#E5E7EB',
    strokeDashArray: 4,
    padding: { left: 8, right: 8 },
  },
  stroke: { curve: 'smooth' },
  dataLabels: { enabled: false },
  legend: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '12px',
    fontWeight: 500,
    labels: { colors: '#6B7280' },
  },
  xaxis: {
    labels: {
      style: { colors: '#6B7280', fontSize: '12px', fontFamily: "'Inter', sans-serif" },
    },
    axisBorder: { color: '#E5E7EB' },
    axisTicks: { color: '#E5E7EB' },
  },
  yaxis: {
    labels: {
      style: { colors: '#6B7280', fontSize: '12px', fontFamily: "'Inter', sans-serif" },
    },
  },
};

// Deep merge utility
function deepMerge(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

// Registry of chart instances for cleanup
const chartRegistry = {};

export function createChart(containerId, userOptions) {
  // Destroy existing chart in same container
  if (chartRegistry[containerId]) {
    chartRegistry[containerId].destroy();
    delete chartRegistry[containerId];
  }

  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`Chart container #${containerId} not found`);
    return null;
  }

  const merged = deepMerge(BASE_OPTIONS, userOptions);
  const chart = new ApexCharts(container, merged);
  chart.render();

  chartRegistry[containerId] = chart;
  return chart;
}

export function destroyChart(containerId) {
  if (chartRegistry[containerId]) {
    chartRegistry[containerId].destroy();
    delete chartRegistry[containerId];
  }
}

export function updateChart(containerId, options) {
  if (chartRegistry[containerId]) {
    chartRegistry[containerId].updateOptions(options, true, true);
  }
}

export function getChart(containerId) {
  return chartRegistry[containerId] || null;
}

export { CHART_PALETTE };
