// ========== Expandable Table Row Component ==========

/**
 * Create an expandable table row with a hidden detail row that toggles on click.
 * @param {Array<{label: string, key: string, align?: string, render?: Function, format?: Function}>} columns
 * @param {Object} row - The data object for this row
 * @param {string|HTMLElement} detailContent - HTML string or DOM element for the detail area
 * @returns {{ tr: HTMLTableRowElement, detailTr: HTMLTableRowElement }}
 */
export function createExpandableRow(columns, row, detailContent) {
  // Main row
  const tr = document.createElement('tr');
  tr.className = 'expandable-row';
  tr.style.cursor = 'pointer';

  columns.forEach((col, index) => {
    const td = document.createElement('td');
    td.className = col.align ? `text-${col.align}` : '';

    // Add expand icon to first column
    if (index === 0) {
      const expandIcon = document.createElement('span');
      expandIcon.className = 'expandable-row__icon';
      expandIcon.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      `;
      td.appendChild(expandIcon);
    }

    if (col.render) {
      const content = col.render(row[col.key], row);
      if (typeof content === 'string') {
        const span = document.createElement('span');
        span.innerHTML = content;
        td.appendChild(span);
      } else if (content instanceof HTMLElement) {
        td.appendChild(content);
      } else {
        const span = document.createElement('span');
        span.textContent = content;
        td.appendChild(span);
      }
    } else if (col.format) {
      const span = document.createElement('span');
      span.textContent = col.format(row[col.key], row);
      td.appendChild(span);
    } else {
      const span = document.createElement('span');
      span.textContent = row[col.key] ?? '\u2014';
      td.appendChild(span);
    }

    tr.appendChild(td);
  });

  // Detail row (hidden by default)
  const detailTr = document.createElement('tr');
  detailTr.className = 'expandable-row__detail';
  detailTr.style.display = 'none';

  const detailTd = document.createElement('td');
  detailTd.colSpan = columns.length;
  detailTd.className = 'expandable-row__detail-content';

  if (typeof detailContent === 'string') {
    detailTd.innerHTML = detailContent;
  } else if (detailContent instanceof HTMLElement) {
    detailTd.appendChild(detailContent);
  }

  detailTr.appendChild(detailTd);

  // Toggle handler
  let isOpen = false;
  tr.addEventListener('click', () => {
    isOpen = !isOpen;
    detailTr.style.display = isOpen ? '' : 'none';
    tr.classList.toggle('expandable-row--open', isOpen);

    // Rotate the chevron icon
    const icon = tr.querySelector('.expandable-row__icon svg');
    if (icon) {
      icon.style.transform = isOpen ? 'rotate(90deg)' : '';
      icon.style.transition = 'transform 0.2s ease';
    }
  });

  return { tr, detailTr };
}
