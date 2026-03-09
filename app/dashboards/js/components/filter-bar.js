// ========== Filter Bar Renderer ==========

const PERIOD_OPTIONS = [
  { value: 'current',  label: 'Mes atual (Mar/25)' },
  { value: 'previous', label: 'Mes anterior (Fev/25)' },
  { value: 'last3',    label: 'Ultimos 3 meses' },
  { value: 'last6',    label: 'Ultimos 6 meses' },
];

export function renderFilterBar(container, companies, filterState) {
  container.innerHTML = '';

  // Period selector
  const periodSelect = document.createElement('select');
  periodSelect.className = 'filter-select';
  periodSelect.setAttribute('aria-label', 'Periodo');

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
  multiSelect.className = 'filter-multiselect';

  const trigger = document.createElement('button');
  trigger.className = 'filter-multiselect__trigger';
  trigger.type = 'button';
  trigger.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3m4-10h2m4 0h2m-8 4h2m4 0h2"/></svg>
    <span class="filter-multiselect__label">Todas as empresas</span>
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style="margin-left:auto"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
  `;

  const dropdown = document.createElement('div');
  dropdown.className = 'filter-multiselect__dropdown';

  // V2 company names: TechCorp Brasil, Construtora Alfa, Industria Beta
  companies.forEach(company => {
    const option = document.createElement('label');
    option.className = 'filter-multiselect__option';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = true;
    checkbox.value = company.id;

    checkbox.addEventListener('change', () => {
      const allChecked = dropdown.querySelectorAll('input[type="checkbox"]');
      const checkedBoxes = dropdown.querySelectorAll('input[type="checkbox"]:checked');

      if (checkedBoxes.length === allChecked.length || checkedBoxes.length === 0) {
        // All or none = show all
        filterState.setCompanies([]);
        // Re-check all boxes visually
        allChecked.forEach(cb => cb.checked = true);
      } else {
        const selected = Array.from(checkedBoxes).map(cb => cb.value);
        filterState.setCompanies(selected);
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
    const label = trigger.querySelector('.filter-multiselect__label');
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

  container.appendChild(periodSelect);
  container.appendChild(multiSelect);
}
