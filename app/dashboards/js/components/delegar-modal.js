// ========== Delegar Modal ==========

const _tasks = [];

function _roleLabel(role) {
  return { nurse: 'Enfermeiro(a)', admin: 'Administrativo', provider: 'Médico' }[role] || role;
}

function _buildContextLines(patient, patientType, rawData) {
  const companyName = rawData.companies.find(c => c.id === patient.companyId)?.name || patient.companyId;
  if (patientType === 'nip') {
    const lines = [
      `Paciente: ${patient.name}`,
      `Empresa: ${companyName}`,
      `NIP: ${patient.nipDate} — ${patient.nipReason}`,
    ];
    if (patient.lastConversationTopic) lines.push(`Última conversa: ${patient.lastConversationTopic}`);
    if (patient.lastConversationSentiment) {
      const map = { very_negative: 'Muito negativo', negative: 'Negativo', neutral: 'Neutro', positive: 'Positivo' };
      lines.push(`Sentimento: ${map[patient.lastConversationSentiment] || patient.lastConversationSentiment}`);
    }
    return lines;
  } else if (patientType === 'highRisk') {
    const riskMap = { critical: 'Crítico', high: 'Alto', medium: 'Médio' };
    const quadrantMap = { silent: 'Silencioso', invisible: 'Invisível', engaged: 'Engajado', ideal: 'Ideal' };
    return [
      `Paciente: ${patient.name}`,
      `Empresa: ${companyName}`,
      `Condição: ${patient.condition}`,
      `Risco: ${riskMap[patient.riskLevel] || patient.riskLevel} (score ${patient.riskScore})`,
      `Quadrante: ${quadrantMap[patient.quadrant] || patient.quadrant}`,
      `Último contato: ${new Date(patient.lastContact).toLocaleDateString('pt-BR')}`,
    ];
  } else {
    const riskMap = { high: 'Alto', medium: 'Médio', low: 'Baixo' };
    const trendMap = { worsening: 'Piorando', stable: 'Estável', improving: 'Melhorando' };
    return [
      `Paciente: ${patient.name}`,
      `Empresa: ${companyName}`,
      `Risco NIP: ${riskMap[patient.nipRisk] || patient.nipRisk}`,
      `Tema principal: ${patient.mainTopic}`,
      `Tendência de sentimento: ${trendMap[patient.sentimentTrend] || patient.sentimentTrend}`,
      `NPS: ${patient.nps}`,
    ];
  }
}

function _showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'delegar-toast';
  toast.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('delegar-toast--show'));
  setTimeout(() => {
    toast.classList.remove('delegar-toast--show');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

export const DelegarModal = {
  open(patient, patientType, rawData, onDelegated) {
    // Remove any existing instance
    document.getElementById('delegar-modal-overlay')?.remove();

    const members = (rawData.teamPerformance?.members || [])
      .filter(m => m.role === 'nurse' || m.role === 'admin')
      .sort((a, b) => a.taskDetails.pendingTasks - b.taskDetails.pendingTasks);

    const contextLines = _buildContextLines(patient, patientType, rawData);

    const overlay = document.createElement('div');
    overlay.id = 'delegar-modal-overlay';
    overlay.className = 'delegar-overlay';

    overlay.innerHTML = `
      <div class="delegar-modal" role="dialog" aria-modal="true" aria-labelledby="delegar-title">
        <div class="delegar-modal__header">
          <div>
            <div class="delegar-modal__title" id="delegar-title">Delegar Paciente</div>
            <div class="delegar-modal__subtitle">Atribua um profissional e crie uma tarefa de acompanhamento</div>
          </div>
          <button class="delegar-modal__close" aria-label="Fechar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div class="delegar-modal__body">

          <div class="delegar-modal__context">
            <div class="delegar-modal__context-label">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Contexto do paciente
            </div>
            <div class="delegar-modal__context-grid">
              ${contextLines.map(l => {
                const [label, ...rest] = l.split(': ');
                return `<div class="delegar-modal__context-row">
                  <span class="delegar-modal__context-key">${label}</span>
                  <span class="delegar-modal__context-val">${rest.join(': ')}</span>
                </div>`;
              }).join('')}
            </div>
          </div>

          <div class="delegar-modal__field">
            <label class="delegar-modal__label" for="delegar-professional">Profissional responsável</label>
            <select class="delegar-modal__select" id="delegar-professional">
              <option value="">Selecionar profissional...</option>
              ${members.map(m => {
                const pending = m.taskDetails.pendingTasks;
                return `<option value="${m.id}">${m.name} — ${_roleLabel(m.role)} · ${pending} tarefa${pending !== 1 ? 's' : ''} pendente${pending !== 1 ? 's' : ''}</option>`;
              }).join('')}
            </select>
          </div>

          <div class="delegar-modal__field">
            <label class="delegar-modal__label" for="delegar-message">Mensagem / instruções</label>
            <textarea class="delegar-modal__textarea" id="delegar-message" rows="3"
              placeholder="Descreva o que o profissional deve fazer ou verificar com este paciente..."></textarea>
          </div>

        </div>

        <div class="delegar-modal__footer">
          <button class="btn btn--ghost btn--sm" id="delegar-cancel">Cancelar</button>
          <button class="btn btn--primary btn--sm" id="delegar-submit">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Criar Tarefa
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('delegar-overlay--open'));

    const close = () => {
      overlay.classList.remove('delegar-overlay--open');
      setTimeout(() => overlay.remove(), 200);
    };

    overlay.querySelector('.delegar-modal__close').addEventListener('click', close);
    overlay.querySelector('#delegar-cancel').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function onKey(e) {
      if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); }
    });

    const select = overlay.querySelector('#delegar-professional');
    const submitBtn = overlay.querySelector('#delegar-submit');

    select.addEventListener('change', () => {
      select.style.outline = '';
    });

    submitBtn.addEventListener('click', () => {
      const professionalId = select.value;
      const message = overlay.querySelector('#delegar-message').value.trim();

      if (!professionalId) {
        select.style.outline = '2px solid var(--destructive-500, #EF4444)';
        select.focus();
        return;
      }

      const professional = members.find(m => m.id === professionalId);

      const task = {
        id: `task-${Date.now()}`,
        patientName: patient.name,
        patientType,
        professionalId,
        professionalName: professional?.name,
        message: message || null,
        createdAt: new Date().toISOString(),
        status: 'pending',
      };
      _tasks.push(task);

      close();
      _showToast(`Tarefa criada para ${professional?.name}`);
      if (onDelegated) onDelegated(task);
    });

    setTimeout(() => select.focus(), 80);
  },

  getTasks() { return [..._tasks]; },
};
