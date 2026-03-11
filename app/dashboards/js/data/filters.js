// ========== Filter State with Observer Pattern ==========

const PERIOD_RANGES = {
  current:  ['2025-03'],
  previous: ['2025-02'],
  last3:    ['2025-01', '2025-02', '2025-03'],
  last6:    ['2024-10', '2024-11', '2024-12', '2025-01', '2025-02', '2025-03'],
  last12:   ['2024-10', '2024-11', '2024-12', '2025-01', '2025-02', '2025-03'],
  all:      ['2024-10', '2024-11', '2024-12', '2025-01', '2025-02', '2025-03'],
};

// V2 company names
// emp1 = 'TechCorp Brasil', emp2 = 'Construtora Alfa', emp3 = 'Industria Beta'

export const FilterState = {
  period: 'last3',
  selectedCompanies: [], // empty = all
  _subscribers: [],

  // Get current month range based on period
  getMonthRange() {
    return PERIOD_RANGES[this.period] || PERIOD_RANGES.last3;
  },

  // Get the current period's display months
  getCurrentMonth() {
    const range = this.getMonthRange();
    return range[range.length - 1];
  },

  // Get previous month for comparison
  getPreviousMonth() {
    const allMonths = ['2024-10', '2024-11', '2024-12', '2025-01', '2025-02', '2025-03'];
    const range = this.getMonthRange();
    const firstMonth = range[0];
    const idx = allMonths.indexOf(firstMonth);
    return idx > 0 ? allMonths[idx - 1] : null;
  },

  // Check if a company is selected (empty = all selected)
  isCompanySelected(companyId) {
    return this.selectedCompanies.length === 0 || this.selectedCompanies.includes(companyId);
  },

  // Filter the full dataset based on current state
  filterData(data) {
    const months = this.getMonthRange();
    const companies = this.selectedCompanies.length > 0
      ? data.companies.filter(c => this.selectedCompanies.includes(c.id))
      : data.companies;

    const companyIds = companies.map(c => c.id);

    return {
      ...data,
      _filtered: true,
      _months: months,
      _companyIds: companyIds,
      _companies: companies,
      _currentMonth: this.getCurrentMonth(),
      _previousMonth: this.getPreviousMonth(),
    };
  },

  // Set period and notify
  setPeriod(period) {
    if (this.period === period) return;
    this.period = period;
    this._notify();
  },

  // Toggle company selection
  toggleCompany(companyId) {
    const idx = this.selectedCompanies.indexOf(companyId);
    if (idx === -1) {
      this.selectedCompanies.push(companyId);
    } else {
      this.selectedCompanies.splice(idx, 1);
    }
    this._notify();
  },

  // Set all companies (or clear for "all")
  setCompanies(companyIds) {
    this.selectedCompanies = [...companyIds];
    this._notify();
  },

  // Observer pattern
  subscribe(callback) {
    this._subscribers.push(callback);
  },

  _notify() {
    this._subscribers.forEach(fn => fn());
  },
};
