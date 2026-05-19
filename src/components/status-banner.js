/**
 * status-banner.js — Backend status & feature detection banner
 *
 * On page load, pings /api/health and verifies all expected features
 * are available. Shows a banner if something is missing.
 * Inspired by the CS153 project's BackendStatusBanner pattern.
 */

const StatusBanner = {
  REQUIRED_FEATURES: ['readings', 'history', 'calendar', 'validation'],

  init() {
    this.banner = document.getElementById('status-banner');
    this.check();
  },

  async check() {
    try {
      const res = await fetch('/api/health');
      const data = await res.json();

      if (!res.ok) {
        this.show(
          'warning',
          data.detail || 'Backend is not responding correctly. Make sure the server is running: npm run dev',
          '后端响应异常，请确认服务器正在运行：npm run dev'
        );
        return;
      }

      // Check for missing features
      const features = data.features || [];
      const missing = this.REQUIRED_FEATURES.filter((f) => !features.includes(f));

      if (missing.length > 0) {
        this.show(
          'warning',
          `Server is missing features: ${missing.join(', ')}. You may be running an old version — restart with npm run dev.`,
          `服务器缺少功能模块：${missing.join(', ')}。可能正在运行旧版本，请重新启动：npm run dev`
        );
        return;
      }

      // Show mode info if in demo mode
      if (data.mode === 'demo') {
        this.show(
          'info',
          'Running in demo mode — readings use pre-written samples. Add your ANTHROPIC_API_KEY to .env for AI-generated readings.',
          '当前为演示模式——解读使用预设内容。在 .env 中添加 ANTHROPIC_API_KEY 可启用 AI 生成解读。'
        );
      } else {
        // All good — hide banner
        this.hide();
      }
    } catch {
      this.show(
        'error',
        'Cannot reach the server. Make sure it is running: npm run dev',
        '无法连接服务器，请确认服务器正在运行：npm run dev'
      );
    }
  },

  show(type, messageEn, messageCn) {
    if (!this.banner) return;
    const icons = { info: '📖', warning: '⚠️', error: '🔌' };
    this.banner.className = `status-banner status-banner--${type}`;
    this.banner.innerHTML = `
      <span class="status-banner-icon">${icons[type] || ''}</span>
      <div class="status-banner-text">
        <p>${messageEn}</p>
        <p class="status-banner-cn">${messageCn}</p>
      </div>
      <button class="status-banner-close" onclick="StatusBanner.hide()" aria-label="Close">✕</button>
    `;
    this.banner.style.display = 'flex';
  },

  hide() {
    if (this.banner) {
      this.banner.style.display = 'none';
    }
  },
};
