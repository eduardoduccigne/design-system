// ========== Tooltip & Expandable Components ==========

export function createExpandable({ triggerText, content }) {
  const wrapper = document.createElement('div');
  wrapper.className = 'expandable';

  const trigger = document.createElement('button');
  trigger.className = 'expandable__trigger';
  trigger.type = 'button';
  trigger.innerHTML = `
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
    <span>${triggerText}</span>
  `;

  const contentEl = document.createElement('div');
  contentEl.className = 'expandable__content';
  contentEl.textContent = content;

  trigger.addEventListener('click', () => {
    contentEl.classList.toggle('open');
    trigger.querySelector('svg').style.transform = contentEl.classList.contains('open') ? 'rotate(180deg)' : '';
  });

  wrapper.appendChild(trigger);
  wrapper.appendChild(contentEl);
  return wrapper;
}

export function createInfoFooter(text) {
  const footer = document.createElement('div');
  footer.className = 'card__footer';
  footer.innerHTML = `
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:middle;margin-right:4px"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
    ${text}
  `;
  return footer;
}
