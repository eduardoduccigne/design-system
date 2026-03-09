// ========== Data Table Component ==========

export function createDataTable({ columns, rows, highlightCondition, onRowClick, className }) {
  const wrapper = document.createElement('div');
  wrapper.className = 'overflow-auto';

  const table = document.createElement('table');
  table.className = `data-table${className ? ` ${className}` : ''}`;

  // Header
  const thead = document.createElement('thead');
  thead.innerHTML = `<tr>${columns.map(col =>
    `<th class="${col.align ? `text-${col.align}` : ''} ${col.className || ''}">${col.label}${col.headerBadge ? col.headerBadge : ''}</th>`
  ).join('')}</tr>`;
  table.appendChild(thead);

  // Body
  const tbody = document.createElement('tbody');
  rows.forEach(row => {
    const tr = document.createElement('tr');
    const highlight = highlightCondition ? highlightCondition(row) : null;
    if (highlight) tr.classList.add(`row--${highlight}`);

    columns.forEach(col => {
      const td = document.createElement('td');
      td.className = `${col.align ? `text-${col.align}` : ''} ${col.cellClassName || ''}`;

      if (col.render) {
        // Custom render function returns DOM element or HTML string
        const content = col.render(row[col.key], row);
        if (typeof content === 'string') {
          td.innerHTML = content;
        } else if (content instanceof HTMLElement) {
          td.appendChild(content);
        } else {
          td.textContent = content;
        }
      } else if (col.format) {
        td.textContent = col.format(row[col.key], row);
      } else {
        td.textContent = row[col.key] ?? '\u2014';
      }

      tr.appendChild(td);
    });

    if (onRowClick) {
      tr.style.cursor = 'pointer';
      tr.addEventListener('click', () => onRowClick(row));
    }

    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  wrapper.appendChild(table);
  return wrapper;
}
