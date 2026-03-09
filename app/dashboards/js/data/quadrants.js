// ========== Quadrant Classification Utilities ==========

export const QUADRANT_LABELS = {
  ideal: 'Ideal',
  engaged: 'Engajado sem Plano',
  silent: 'Em Plano mas Silencioso',
  invisible: 'Invisivel',
};

export const QUADRANT_COLORS = {
  ideal: '#22C55E',
  engaged: '#F59E0B',
  silent: '#F97316',
  invisible: '#EF4444',
};

/**
 * Classify a beneficiary into one of 4 quadrants based on engagement and plan status.
 * @param {boolean} hasEngagement - Whether the beneficiary has engagement activity
 * @param {boolean} hasPlan - Whether the beneficiary has an active care plan
 * @returns {'ideal'|'engaged'|'silent'|'invisible'} The quadrant classification
 */
export function classifyQuadrant(hasEngagement, hasPlan) {
  if (hasEngagement && hasPlan) return 'ideal';
  if (hasEngagement && !hasPlan) return 'engaged';
  if (!hasEngagement && hasPlan) return 'silent';
  return 'invisible';
}
