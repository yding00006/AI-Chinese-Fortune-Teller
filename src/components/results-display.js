/**
 * results-display.js — Reading results renderer
 * Handles loading, error, and reading display states
 */

const ResultsDisplay = {
  init() {
    this.section = document.getElementById('results-section');
    this.container = document.getElementById('results-content');
    this.titleEl = document.getElementById('results-title');
  },

  /**
   * Show a mystical loading state
   */
  showLoading(method) {
    if (!this.section || !this.container) return;

    this.section.style.display = 'block';
    this.titleEl.textContent = `${method.cn} Reading — ${method.name}`;

    const loadingMessages = {
      bazi: { en: 'Aligning the Four Pillars…', cn: '正在排列四柱…' },
      ziwei: { en: 'Consulting the stars…', cn: '正在推演命盘…' },
      iching: { en: 'Casting the coins…', cn: '正在掷铜钱…' },
      face: { en: 'Reading the features…', cn: '正在解读面相…' },
    };

    const msg = loadingMessages[method.id] || { en: 'Generating your reading…', cn: '正在生成解读…' };

    this.container.innerHTML = `
      <div class="reading-result loading-state">
        <div class="loading-animation">
          <div class="loading-trigrams">☰ ☷ ☳ ☴ ☵ ☶ ☱ ☲</div>
          <div class="loading-spinner"></div>
        </div>
        <p class="loading-text">${msg.en}</p>
        <p class="loading-text-cn">${msg.cn}</p>
      </div>
    `;

    this.section.scrollIntoView({ behavior: 'smooth' });
  },

  /**
   * Show an error message
   */
  showError(message) {
    if (!this.section || !this.container) return;

    this.section.style.display = 'block';

    this.container.innerHTML = `
      <div class="reading-result error-state">
        <div class="error-icon">⚠</div>
        <h4 style="color: var(--color-gold); text-align: center; margin-bottom: 1rem;">
          Reading Unavailable 解读不可用
        </h4>
        <p style="text-align: center; color: var(--color-text-muted);">${message}</p>
        <p style="text-align: center; color: var(--color-text-dim); margin-top: 0.5rem;">
          解读生成失败，请稍后再试。
        </p>
        <div style="text-align: center; margin-top: 1.5rem;">
          <button class="submit-btn" style="width: auto; display: inline-block; padding: 0.7rem 2rem;" onclick="window.scrollTo({top: document.getElementById('input-section').offsetTop, behavior: 'smooth'})">
            Try Again 重试
          </button>
        </div>
      </div>
    `;
  },

  /**
   * Show the actual AI reading
   */
  showReading(readingHTML, method) {
    if (!this.section || !this.container) return;
    this.section.style.display = 'block';
    this.titleEl.textContent = `${method.cn} Reading — ${method.name}`;
    this.container.innerHTML = `
      <div class="reading-result">
        ${readingHTML}
        <div class="disclaimer">
          ⚠️ This reading is for entertainment and cultural exploration purposes only.
          <br>本解读仅供娱乐和文化探索之用。
        </div>
      </div>
    `;
    this.section.scrollIntoView({ behavior: 'smooth' });
  },

  /**
   * Show placeholder results (fallback / legacy)
   */
  showPlaceholder(formData, method) {
    if (!this.section || !this.container) return;
    this.section.style.display = 'block';
    this.titleEl.textContent = `${method.cn} Reading — ${method.name}`;
    this.container.innerHTML = `
      <div class="reading-result">
        <div class="reading-header">
          <h3>${method.cn} — ${method.name}</h3>
          <p class="reading-meta">Placeholder reading — API not connected</p>
        </div>
        <div class="disclaimer">
          ⚠️ This reading is for entertainment and cultural exploration purposes only.
          <br>本解读仅供娱乐和文化探索之用。
        </div>
      </div>
    `;
    this.section.scrollIntoView({ behavior: 'smooth' });
  },

  hide() {
    if (this.section) {
      this.section.style.display = 'none';
    }
  },
};
