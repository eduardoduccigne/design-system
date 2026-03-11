// ========== AI Discussion Panel (Drawer) -- Nilo Styling ==========

export const AIPanel = {
  _panelEl: null,
  _overlayEl: null,
  _messagesEl: null,
  _inputEl: null,
  _sendBtn: null,
  _suggestionsEl: null,
  _isOpen: false,
  _currentContext: null,
  _conversationHistory: [], // tracks user/assistant turns for multi-turn context

  /** Create the panel DOM and append to body. Called once at app init. */
  init() {
    this._buildPanel();
    document.body.appendChild(this._overlayEl);
    document.body.appendChild(this._panelEl);

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this._isOpen) this.close();
    });
  },

  /** Open the panel with brief context metrics. */
  open(briefContext) {
    this._messagesEl.innerHTML = '';
    this._conversationHistory = [];
    this._currentContext = briefContext;

    // Build system message from brief context
    const lines = [];
    lines.push(`Voce tem **${briefContext.criticalCount} pacientes criticos** aguardando acompanhamento.`);
    lines.push(`**${briefContext.avoidableNips} NIPs** poderiam ter sido interceptados pela equipe.`);
    lines.push(`Economia estimada de **R$ ${Math.round(briefContext.totalSavings / 1000)}k** com intervencoes no PA.`);
    const satDir = briefContext.satDelta >= 0 ? 'subiu' : 'caiu';
    lines.push(`Satisfacao ${satDir} **${Math.abs(briefContext.satDelta).toFixed(1)}%** (atualmente ${briefContext.satCurrent.toFixed(1)}/5.0).`);
    lines.push(`Taxa de engajamento atual: **${briefContext.engRate.toFixed(1)}%**.`);

    this._addMessage(
      `Bom dia! Aqui esta o resumo do seu painel:\n\n` +
      lines.map(l => `- ${l}`).join('\n') +
      `\n\nEm que posso ajudar? Podemos discutir qualquer um desses pontos.`,
      'system'
    );

    // Show context-aware suggested questions
    this._showSuggestedQuestions(briefContext);

    this._panelEl.classList.add('ai-panel--open');
    this._overlayEl.classList.add('ai-panel-overlay--open');
    this._isOpen = true;

    // Focus input
    requestAnimationFrame(() => this._inputEl.focus());
  },

  /** Open the panel with section-specific context. */
  openWithSection(sectionId, sectionContext) {
    this._messagesEl.innerHTML = '';
    this._conversationHistory = [];
    this._currentContext = { sectionId, ...sectionContext };

    const sectionNames = {
      alerts: 'Alertas',
      pulse: 'Pulso',
      team: 'Equipe',
      effectiveness: 'Efetividade',
      providers: 'Rede Credenciada',
      portfolios: 'Carteiras',
    };

    const sectionName = sectionNames[sectionId] || sectionId;

    this._addMessage(
      `Voce esta na secao **${sectionName}**. Como posso ajudar com a analise desses dados?`,
      'system'
    );

    // Show section-aware suggested questions
    this._showSectionSuggestions(sectionId);

    this._panelEl.classList.add('ai-panel--open');
    this._overlayEl.classList.add('ai-panel-overlay--open');
    this._isOpen = true;

    requestAnimationFrame(() => this._inputEl.focus());
  },

  /** Close the panel. */
  close() {
    this._panelEl.classList.remove('ai-panel--open');
    this._overlayEl.classList.remove('ai-panel-overlay--open');
    this._isOpen = false;
  },

  /** Show context-aware suggested questions based on brief metrics. */
  _showSuggestedQuestions(briefContext) {
    if (!this._suggestionsEl) return;
    this._suggestionsEl.innerHTML = '';

    const suggestions = [];

    if (briefContext.criticalCount > 0) {
      suggestions.push('Quais pacientes criticos precisam de atencao imediata?');
    }
    if (briefContext.avoidableNips > 0) {
      suggestions.push('Como reduzir os NIPs evitaveis?');
    }
    if (briefContext.totalSavings > 0) {
      suggestions.push('Detalhe as economias com intervencoes no PA.');
    }
    if (briefContext.satDelta < 0) {
      suggestions.push('Por que a satisfacao caiu? O que pode ser feito?');
    }
    if (briefContext.engRate < 10) {
      suggestions.push('Como melhorar a taxa de engajamento?');
    }

    // Always add a general question
    suggestions.push('Resuma os principais pontos de atencao.');

    suggestions.forEach(text => {
      const btn = document.createElement('button');
      btn.className = 'ai-panel__suggestion';
      btn.textContent = text;
      btn.addEventListener('click', () => {
        this._inputEl.value = text;
        this._sendBtn.disabled = false;
        this._suggestionsEl.innerHTML = '';
        // Auto-send
        this._handleSend();
      });
      this._suggestionsEl.appendChild(btn);
    });
  },

  /** Show section-specific suggested questions. */
  _showSectionSuggestions(sectionId) {
    if (!this._suggestionsEl) return;
    this._suggestionsEl.innerHTML = '';

    const sectionSuggestions = {
      alerts: [
        'Quais pacientes criticos precisam de acompanhamento urgente?',
        'Quais NIPs poderiam ter sido evitados?',
        'Qual o perfil dos pacientes de alto risco?',
      ],
      pulse: [
        'Como esta a evolucao do engajamento por empresa?',
        'Quais programas tem melhor adesao?',
        'Compare o engajamento entre as carteiras.',
      ],
      team: [
        'Como melhorar a produtividade da equipe?',
        'Qual profissional tem melhor desempenho?',
        'O que explica a variacao na satisfacao?',
      ],
      effectiveness: [
        'Qual o ROI das intervencoes no PA?',
        'Como otimizar a economia com o loop de PA?',
        'Qual empresa tem maior custo por beneficiario?',
      ],
      providers: [
        'Quais prestadores tem melhor avaliacao?',
        'Onde ha oportunidade de renegociacao?',
        'Compare a rede por especialidade.',
      ],
      portfolios: [
        'Qual carteira tem maior risco?',
        'Como esta a distribuicao por quadrante?',
        'Quais carteiras precisam de atencao?',
      ],
    };

    const suggestions = sectionSuggestions[sectionId] || ['Resuma os dados desta secao.'];

    suggestions.forEach(text => {
      const btn = document.createElement('button');
      btn.className = 'ai-panel__suggestion';
      btn.textContent = text;
      btn.addEventListener('click', () => {
        this._inputEl.value = text;
        this._sendBtn.disabled = false;
        this._suggestionsEl.innerHTML = '';
        this._handleSend();
      });
      this._suggestionsEl.appendChild(btn);
    });
  },

  /** Handle sending a message — streams from Claude API. */
  async _handleSend() {
    const text = this._inputEl.value.trim();
    if (!text) return;

    this._addMessage(text, 'user');
    this._inputEl.value = '';
    this._sendBtn.disabled = true;

    if (this._suggestionsEl) this._suggestionsEl.innerHTML = '';

    // Add user turn to history
    this._conversationHistory.push({ role: 'user', content: text });

    // Create streaming AI message bubble
    const { msgEl, contentEl } = this._addStreamingMessage();

    let fullText = '';

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: this._conversationHistory,
          context: this._currentContext,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop(); // keep incomplete line

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]' || !data) continue;

          try {
            const event = JSON.parse(data);
            if (event.type === 'content_block_delta' && event.delta?.type === 'text_delta') {
              fullText += event.delta.text;
              contentEl.textContent = fullText;
              this._messagesEl.scrollTop = this._messagesEl.scrollHeight;
            }
          } catch { /* skip malformed SSE events */ }
        }
      }

      // Finalize: apply markdown formatting to the complete response
      this._finalizeStreamingMessage(contentEl, fullText);

      // Add assistant turn to history
      this._conversationHistory.push({ role: 'assistant', content: fullText });

    } catch (err) {
      const needsProxy = err.message.includes('fetch') || err.message.includes('Failed') || err.message.includes('404');
      contentEl.textContent = needsProxy
        ? 'O painel de IA requer o servidor proxy. Abra um terminal na pasta do dashboard e execute:\n\nANTHROPIC_API_KEY=sua-chave node server.js\n\nDepois acesse: http://localhost:3456'
        : `Erro: ${err.message}`;
      msgEl.style.opacity = '0.7';
    }

    this._sendBtn.disabled = false;
    requestAnimationFrame(() => this._inputEl.focus());
  },

  /** Add an empty AI message bubble for streaming into. Returns { msgEl, contentEl }. */
  _addStreamingMessage() {
    const msg = document.createElement('div');
    msg.className = 'ai-panel__message ai-panel__message--system';

    const avatar = document.createElement('div');
    avatar.className = 'ai-panel__message-avatar';
    avatar.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>';

    const content = document.createElement('div');
    content.className = 'ai-panel__message-content';
    content.style.cssText = 'white-space:pre-wrap;min-height:1.2em';

    msg.appendChild(avatar);
    msg.appendChild(content);
    this._messagesEl.appendChild(msg);
    this._messagesEl.scrollTop = this._messagesEl.scrollHeight;

    return { msgEl: msg, contentEl: content };
  },

  /** Apply markdown rendering to the finished streamed message. */
  _finalizeStreamingMessage(contentEl, text) {
    contentEl.style.whiteSpace = '';
    let html = text
      .split('\n')
      .map(line => {
        if (line.startsWith('- ')) return `<li>${line.slice(2)}</li>`;
        if (line.trim() === '') return '';
        return `<p>${line}</p>`;
      })
      .join('');
    html = html.replace(/(<li>[\s\S]*?<\/li>)+/g, match => `<ul>${match}</ul>`);
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    contentEl.innerHTML = html;
    this._messagesEl.scrollTop = this._messagesEl.scrollHeight;
  },

  /** Build the full panel DOM structure. */
  _buildPanel() {
    // Overlay
    this._overlayEl = document.createElement('div');
    this._overlayEl.className = 'ai-panel-overlay';
    this._overlayEl.addEventListener('click', () => this.close());

    // Panel
    this._panelEl = document.createElement('div');
    this._panelEl.className = 'ai-panel';

    // --- Header ---
    const header = document.createElement('div');
    header.className = 'ai-panel__header';

    const headerLeft = document.createElement('div');
    headerLeft.className = 'ai-panel__header-left';
    headerLeft.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z"/>
        <path d="M20 3v4"/><path d="M22 5h-4"/>
        <path d="M4 17v2"/><path d="M5 18H3"/>
      </svg>
      <h3>Discutir com IA</h3>
    `;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'ai-panel__close';
    closeBtn.setAttribute('aria-label', 'Fechar');
    closeBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
    closeBtn.addEventListener('click', () => this.close());

    header.appendChild(headerLeft);
    header.appendChild(closeBtn);
    this._panelEl.appendChild(header);

    // --- Messages body ---
    this._messagesEl = document.createElement('div');
    this._messagesEl.className = 'ai-panel__body';
    this._panelEl.appendChild(this._messagesEl);

    // --- Suggested questions area ---
    this._suggestionsEl = document.createElement('div');
    this._suggestionsEl.className = 'ai-panel__suggestions';
    this._panelEl.appendChild(this._suggestionsEl);

    // --- Input area ---
    const inputArea = document.createElement('div');
    inputArea.className = 'ai-panel__input-area';

    this._inputEl = document.createElement('input');
    this._inputEl.type = 'text';
    this._inputEl.className = 'ai-panel__input';
    this._inputEl.placeholder = 'Pergunte sobre os dados...';

    this._sendBtn = document.createElement('button');
    this._sendBtn.className = 'ai-panel__send';
    this._sendBtn.disabled = true;
    this._sendBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;

    this._sendBtn.addEventListener('click', () => this._handleSend());
    this._inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this._handleSend();
    });
    this._inputEl.addEventListener('input', () => {
      this._sendBtn.disabled = !this._inputEl.value.trim();
    });

    inputArea.appendChild(this._inputEl);
    inputArea.appendChild(this._sendBtn);
    this._panelEl.appendChild(inputArea);

    // --- Disclaimer ---
    const disclaimer = document.createElement('div');
    disclaimer.className = 'ai-panel__disclaimer';
    disclaimer.textContent = 'Respostas geradas por IA com base nos dados do painel. Verifique informacoes criticas.';
    this._panelEl.appendChild(disclaimer);
  },

  /** Add a message to the chat. @param sender 'system' | 'user' */
  _addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.className = `ai-panel__message ai-panel__message--${sender}`;

    const avatar = document.createElement('div');
    avatar.className = 'ai-panel__message-avatar';
    avatar.innerHTML = sender === 'system'
      ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>'
      : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';

    const content = document.createElement('div');
    content.className = 'ai-panel__message-content';

    // Convert simple markdown-like formatting to HTML
    let html = text
      .split('\n')
      .map(line => {
        if (line.startsWith('- ')) return `<li>${line.slice(2)}</li>`;
        if (line.trim() === '') return '';
        return `<p>${line}</p>`;
      })
      .join('');

    // Wrap consecutive <li> in <ul>
    html = html.replace(/(<li>[\s\S]*?<\/li>)+/g, (match) => `<ul>${match}</ul>`);

    // Bold markers: **text**
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    content.innerHTML = html;

    msg.appendChild(avatar);
    msg.appendChild(content);
    this._messagesEl.appendChild(msg);

    // Scroll to bottom
    this._messagesEl.scrollTop = this._messagesEl.scrollHeight;
  },
};
