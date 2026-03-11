// ========== Filter Bar Renderer ==========

const PERIOD_OPTIONS = [
  { value: 'current',  label: 'Este mês (Mar/25)' },
  { value: 'previous', label: 'Mês anterior (Fev/25)' },
  { value: 'last3',    label: 'Últimos 3 meses' },
  { value: 'last6',    label: 'Últimos 6 meses' },
  { value: 'last12',   label: 'Últimos 12 meses' },
  { value: 'all',      label: 'Desde o início' },
];

export function renderFilterBar(container, companies, filterState, onAIClick) {
  container.innerHTML = '';

  // Period selector
  const periodSelect = document.createElement('select');
  periodSelect.className = 'filter-select';
  periodSelect.setAttribute('aria-label', 'Período');

  PERIOD_OPTIONS.forEach(opt => {
    const option = document.createElement('option');
    option.value = opt.value;
    option.textContent = opt.label;
    if (opt.value === filterState.period) option.selected = true;
    periodSelect.appendChild(option);
  });

  periodSelect.addEventListener('change', () => {
    filterState.setPeriod(periodSelect.value);
  });

  // Company multi-select
  const multiSelect = document.createElement('div');
  multiSelect.className = 'multiselect';

  const trigger = document.createElement('button');
  trigger.className = 'multiselect__trigger';
  trigger.type = 'button';
  trigger.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3m4-10h2m4 0h2m-8 4h2m4 0h2"/></svg>
    <span class="multiselect__label">Todas as empresas</span>
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style="margin-left:auto"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
  `;

  const dropdown = document.createElement('div');
  dropdown.className = 'multiselect__dropdown';

  companies.forEach(company => {
    const option = document.createElement('label');
    option.className = 'multiselect__option';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = true;
    checkbox.value = company.id;

    checkbox.addEventListener('change', () => {
      const allBoxes = dropdown.querySelectorAll('input[type="checkbox"]');
      const checkedBoxes = dropdown.querySelectorAll('input[type="checkbox"]:checked');

      if (checkedBoxes.length === 0) {
        // None checked → reset to all
        filterState.setCompanies([]);
        allBoxes.forEach(cb => cb.checked = true);
      } else {
        const selected = Array.from(checkedBoxes).map(cb => cb.value);
        // All checked = same as "all"
        filterState.setCompanies(selected.length === allBoxes.length ? [] : selected);
      }

      updateLabel();
    });

    const text = document.createElement('span');
    text.textContent = company.name;

    option.appendChild(checkbox);
    option.appendChild(text);
    dropdown.appendChild(option);
  });

  // Toggle dropdown
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });

  // Close on outside click
  document.addEventListener('click', () => {
    dropdown.classList.remove('open');
  });

  dropdown.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  function updateLabel() {
    const label = trigger.querySelector('.multiselect__label');
    const selected = filterState.selectedCompanies;
    if (selected.length === 0) {
      label.textContent = 'Todas as empresas';
    } else if (selected.length === 1) {
      const company = companies.find(c => c.id === selected[0]);
      label.textContent = company ? company.name : '1 empresa';
    } else {
      label.textContent = `${selected.length} empresas`;
    }
  }

  multiSelect.appendChild(trigger);
  multiSelect.appendChild(dropdown);

  // AI button
  const aiBtn = document.createElement('button');
  aiBtn.className = 'btn btn--ai';
  aiBtn.type = 'button';
  aiBtn.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z"/>
      <path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>
    </svg>
    Discutir com IA
  `;
  if (onAIClick) aiBtn.addEventListener('click', onAIClick);

  container.appendChild(periodSelect);
  container.appendChild(multiSelect);
  container.appendChild(aiBtn);
}
