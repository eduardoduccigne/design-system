import { DASHBOARD_DATA } from './data/dataset.js';
import { FilterState } from './data/filters.js';
import { renderFilterBar } from './components/filter-bar.js';
import { SectionAlerts } from './sections/section1-alerts.js';
import { SectionPulse } from './sections/section2-pulse.js';
import { SectionTeam } from './sections/section3-team.js';
import { SectionEffectiveness } from './sections/section4-effectiveness.js';
import { SectionProviders } from './sections/section5-providers.js';
import { SectionPortfolios } from './sections/section6-portfolios.js';
import { MorningBrief } from './components/morning-brief.js';
import { AIPanel } from './components/ai-panel.js';

// ========== Section Registry ==========
const SECTIONS = {
  alerts:        { module: SectionAlerts,        containerId: 'alerts-content' },
  pulse:         { module: SectionPulse,         containerId: 'pulse-content' },
  team:          { module: SectionTeam,          containerId: 'team-content' },
  effectiveness: { module: SectionEffectiveness, containerId: 'effectiveness-content' },
  providers:     { module: SectionProviders,     containerId: 'providers-content' },
  portfolios:    { module: SectionPortfolios,    containerId: 'portfolios-content' },
};

const SECTION_IDS = Object.keys(SECTIONS);

// ========== Number Formatting (pt-BR) ==========
export const fmt = {
  number: new Intl.NumberFormat('pt-BR'),
  decimal: new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }),
  percent: new Intl.NumberFormat('pt-BR', { style: 'percent', minimumFractionDigits: 1 }),
  currency: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }),
};

// ========== Design Token Reader (Nilo palette) ==========
/** Reads CSS custom properties from :root so charts use the Nilo token palette. */
const _tokenCache = {};
function _readToken(name) {
  if (_tokenCache[name]) return _tokenCache[name];
  const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  _tokenCache[name] = val;
  return val;
}

export const tk = {
  get primary()      { return _readToken('--primary'); },
  get accent()       { return _readToken('--accent'); },
  get success()      { return _readToken('--success-500') || '#22C55E'; },
  get warning()      { return _readToken('--warning-500') || '#F59E0B'; },
  get danger()       { return _readToken('--destructive-500') || '#EF4444'; },
  get purple()       { return '#8B5CF6'; },
  get ai()           { return _readToken('--accent'); },
  get neutral()      { return _readToken('--neutral-400') || '#A3A39E'; },
  get neutralLight() { return _readToken('--neutral-200') || '#E5E5E0'; },
  get white()        { return '#FFFFFF'; },
};

export const MONTH_LABELS = {
  '2024-10': 'Out/24', '2024-11': 'Nov/24', '2024-12': 'Dez/24',
  '2025-01': 'Jan/25', '2025-02': 'Fev/25', '2025-03': 'Mar/25',
};

// ========== Navigation / Router ==========
let currentSection = null;

function navigateTo(sectionId) {
  if (!SECTION_IDS.includes(sectionId)) sectionId = 'alerts';
  if (sectionId === currentSection) return;

  // Toggle section visibility
  SECTION_IDS.forEach(id => {
    const sectionEl = document.getElementById(`section-${id}`);
    const navItem = document.querySelector(`[data-nav="${id}"]`);
    if (!sectionEl || !navItem) return;

    if (id === sectionId) {
      sectionEl.classList.remove('hidden');
      navItem.classList.add('active');
    } else {
      sectionEl.classList.add('hidden');
      navItem.classList.remove('active');
    }
  });

  // Update hash without triggering hashchange
  if (window.location.hash !== `#${sectionId}`) {
    history.replaceState(null, '', `#${sectionId}`);
  }

  currentSection = sectionId;

  // Lazy render or refresh section
  const section = SECTIONS[sectionId];
  if (section) {
    const container = document.getElementById(section.containerId);
    const filteredData = FilterState.filterData(DASHBOARD_DATA);
    if (!section.module.rendered) {
      section.module.render(container, filteredData, DASHBOARD_DATA);
    } else if (section.module.needsRefresh) {
      section.module.refresh(container, filteredData, DASHBOARD_DATA);
    }
  }
}

// ========== Sidebar Footer Update ==========
const PERIOD_LABELS = {
  current:  'Mar 2025',
  previous: 'Fev 2025',
  last3:    'Jan \u2013 Mar 2025',
  last6:    'Out 2024 \u2013 Mar 2025',
};

function updateSidebarFooter() {
  const periodEl = document.getElementById('sidebar-period');
  const livesEl = document.getElementById('sidebar-lives');
  if (periodEl) periodEl.textContent = PERIOD_LABELS[FilterState.period] || '';

  if (livesEl) {
    const filteredData = FilterState.filterData(DASHBOARD_DATA);
    const total = filteredData._companies.reduce((sum, c) => sum + c.beneficiaries, 0);
    livesEl.textContent = `${fmt.number.format(total)} beneficiarios`;
  }
}

// ========== Filter Change Handler ==========
function onFilterChange() {
  const filteredData = FilterState.filterData(DASHBOARD_DATA);

  // Update sidebar footer and morning brief
  updateSidebarFooter();
  MorningBrief.refresh(filteredData, DASHBOARD_DATA);

  // Refresh only the current visible section
  if (currentSection) {
    const section = SECTIONS[currentSection];
    if (section && section.module.rendered) {
      const container = document.getElementById(section.containerId);
      section.module.refresh(container, filteredData, DASHBOARD_DATA);
    }
  }

  // Mark other rendered sections as needing refresh
  SECTION_IDS.forEach(id => {
    if (id !== currentSection) {
      const section = SECTIONS[id];
      if (section && section.module.rendered) {
        section.module.needsRefresh = true;
      }
    }
  });
}

// ========== Init ==========
document.addEventListener('DOMContentLoaded', () => {
  // Render filter bar
  renderFilterBar(
    document.getElementById('filter-bar'),
    DASHBOARD_DATA.companies,
    FilterState
  );

  // Initialize AI Panel and Morning Brief
  AIPanel.init();
  const briefContainer = document.getElementById('morning-brief');
  const initialFilteredData = FilterState.filterData(DASHBOARD_DATA);
  MorningBrief.init(briefContainer, initialFilteredData, DASHBOARD_DATA, navigateTo);

  // Subscribe to filter changes
  FilterState.subscribe(onFilterChange);

  // Setup nav click handlers
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = item.getAttribute('data-nav');
      navigateTo(sectionId);
      history.pushState(null, '', `#${sectionId}`);
    });
  });

  // Handle browser back/forward
  window.addEventListener('popstate', () => {
    const hash = window.location.hash.replace('#', '') || 'alerts';
    navigateTo(hash);
  });

  // Navigate to initial section
  const initialSection = window.location.hash.replace('#', '') || 'alerts';
  navigateTo(initialSection);
});
