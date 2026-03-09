// ========== Integration Marker Component ==========

/**
 * Create an integration marker badge indicating that a data point
 * requires client data integration.
 * @param {string} [note] - Optional custom note text
 * @returns {HTMLElement} Badge element with integration marker styling
 */
export function createIntegrationMarker(note) {
  const marker = document.createElement('span');
  marker.className = 'badge badge--integration';
  marker.innerHTML = `
    <span class="badge__icon">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    </span>
    <span class="badge__text">${note || '[requer dados do cliente]'}</span>
  `;
  return marker;
}
