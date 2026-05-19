/**
 * history.js — localStorage-based reading history
 * Saves and displays past readings
 */

const ReadingHistory = {
  STORAGE_KEY: 'fortune-teller-history',
  MAX_ENTRIES: 20,

  init() {
    this.historySection = document.getElementById('history-section');
    this.historyContainer = document.getElementById('history-content');
    this.render();
  },

  /**
   * Get all saved readings
   */
  getAll() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  /**
   * Save a new reading
   */
  save(entry) {
    const readings = this.getAll();
    readings.unshift({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      timestamp: new Date().toISOString(),
      ...entry,
    });

    // Cap at MAX_ENTRIES
    if (readings.length > this.MAX_ENTRIES) {
      readings.length = this.MAX_ENTRIES;
    }

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(readings));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }

    this.render();
  },

  /**
   * Clear all history
   */
  clearAll() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.render();
  },

  /**
   * Render the history section
   */
  render() {
    if (!this.historySection || !this.historyContainer) return;

    const readings = this.getAll();

    if (readings.length === 0) {
      this.historySection.style.display = 'none';
      return;
    }

    this.historySection.style.display = 'block';

    const entriesHTML = readings.map((r) => {
      const date = new Date(r.timestamp);
      const dateStr = date.toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit',
      });

      return `
        <div class="history-entry" data-id="${r.id}">
          <div class="history-entry-header">
            <span class="history-method">${r.methodCn || ''} ${r.methodName || r.method}</span>
            <span class="history-date">${dateStr}</span>
          </div>
          <p class="history-summary">${r.inputSummary || ''}</p>
          ${r.demo ? '<span class="history-demo-badge">Demo</span>' : ''}
          <button class="history-view-btn" onclick="ReadingHistory.viewEntry('${r.id}')">
            View Reading 查看解读
          </button>
        </div>
      `;
    }).join('');

    this.historyContainer.innerHTML = `
      <div class="history-list">
        ${entriesHTML}
      </div>
      <div class="history-actions">
        <button class="history-clear-btn" onclick="ReadingHistory.confirmClear()">
          Clear History 清除历史
        </button>
      </div>
    `;
  },

  /**
   * View a past reading
   */
  viewEntry(id) {
    const readings = this.getAll();
    const entry = readings.find((r) => r.id === id);
    if (!entry) return;

    const method = {
      cn: entry.methodCn || entry.method,
      name: entry.methodName || entry.method,
    };

    if (typeof ResultsDisplay !== 'undefined') {
      ResultsDisplay.showReading(entry.readingHTML, method);
    }
  },

  /**
   * Confirm before clearing
   */
  confirmClear() {
    if (confirm('Clear all reading history?\n清除所有解读历史？')) {
      this.clearAll();
    }
  },
};
