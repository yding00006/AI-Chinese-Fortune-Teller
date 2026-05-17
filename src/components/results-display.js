/**
 * results-display.js — Reading results renderer
 * Currently shows placeholder/static results
 * Will be replaced with Claude API responses after integration
 */

const ResultsDisplay = {
  init() {
    this.section = document.getElementById('results-section');
    this.container = document.getElementById('results-content');
    this.titleEl = document.getElementById('results-title');
  },

  /**
   * Show placeholder results (pre-API integration)
   * TODO: Replace with actual Claude API call
   */
  showPlaceholder(formData, method) {
    if (!this.section || !this.container) return;

    this.section.style.display = 'block';
    this.titleEl.textContent = `${method.cn} Reading — ${method.name}`;

    const placeholderContent = this.getPlaceholderReading(formData, method);
    this.container.innerHTML = placeholderContent;

    this.section.scrollIntoView({ behavior: 'smooth' });
  },

  getPlaceholderReading(data, method) {
    switch (method.id) {
      case 'bazi':
        return this.getBaziPlaceholder(data);
      case 'ziwei':
        return this.getZiweiPlaceholder(data);
      case 'iching':
        return this.getIChingPlaceholder(data);
      case 'face':
        return this.getFacePlaceholder(data);
      default:
        return '<p>Reading not available.</p>';
    }
  },

  getBaziPlaceholder(data) {
    const birthDate = new Date(data.birthDate);
    const year = birthDate.getFullYear();
    const zodiac = typeof getZodiacAnimal !== 'undefined' ? getZodiacAnimal(year) : null;
    const stem = typeof getYearStem !== 'undefined' ? getYearStem(year) : null;
    const branch = typeof getYearBranch !== 'undefined' ? getYearBranch(year) : null;

    return `
      <div class="reading-result">
        <div class="reading-header">
          <h3>四柱八字 — Four Pillars Analysis</h3>
          <p class="reading-meta">Birth: ${data.birthDate} | Time: ${data.birthTime || 'Unknown'} | Gender: ${data.gender || 'N/A'}</p>
        </div>

        ${
          zodiac
            ? `
        <div class="reading-section">
          <h4>Chinese Zodiac 生肖</h4>
          <p class="zodiac-display">${zodiac.cn} — ${zodiac.name}</p>
          <p>Element: ${zodiac.element}</p>
        </div>
        `
            : ''
        }

        ${
          stem && branch
            ? `
        <div class="reading-section">
          <h4>Year Pillar 年柱</h4>
          <div class="pillar-display">
            <div class="pillar">
              <span class="pillar-label">Heavenly Stem 天干</span>
              <span class="pillar-char">${stem.name}</span>
              <span class="pillar-info">${stem.pinyin} · ${stem.element} · ${stem.polarity}</span>
            </div>
            <div class="pillar">
              <span class="pillar-label">Earthly Branch 地支</span>
              <span class="pillar-char">${branch.name}</span>
              <span class="pillar-info">${branch.pinyin} · ${branch.animal}</span>
            </div>
          </div>
        </div>
        `
            : ''
        }

        <div class="reading-section placeholder-notice">
          <h4>Full Reading 完整解读</h4>
          <p class="placeholder-text">⏳ Claude API integration pending — full personalized Bazi reading will appear here, including:</p>
          <ul>
            <li>Complete Four Pillars chart (Year, Month, Day, Hour)</li>
            <li>Day Master (日主) element and strength analysis</li>
            <li>Five Elements balance (五行平衡)</li>
            <li>Career, relationships, health, and wealth insights</li>
            <li>10-year luck cycle overview</li>
          </ul>
        </div>

        <div class="disclaimer">
          ⚠️ This reading is for entertainment and cultural exploration purposes only.
          <br>本解读仅供娱乐和文化探索之用。
        </div>
      </div>
    `;
  },

  getZiweiPlaceholder(data) {
    return `
      <div class="reading-result">
        <div class="reading-header">
          <h3>紫微斗数 — Purple Star Astrology</h3>
          <p class="reading-meta">Birth: ${data.birthDate} | Time: ${data.birthTime || 'Unknown'} | Gender: ${data.gender || 'N/A'}</p>
        </div>

        <div class="reading-section">
          <h4>Star Chart Overview 星盘概览</h4>
          <div class="star-chart-placeholder">
            <div class="palace-grid">
              ${['巳 財帛', '午 疾厄', '未 遷移', '申 交友', '辰 子女', '', '', '酉 官祿', '卯 夫妻', '', '', '戌 田宅', '寅 兄弟', '丑 命宮', '子 父母', '亥 福德']
                .map(
                  (p, i) =>
                    `<div class="palace-cell ${p === '' ? 'palace-center' : ''}">${
                      p || (i === 5 || i === 6 ? '' : i === 9 || i === 10 ? '' : '')
                    }</div>`
                )
                .join('')}
            </div>
          </div>
        </div>

        <div class="reading-section placeholder-notice">
          <h4>Full Reading 完整解读</h4>
          <p class="placeholder-text">⏳ Claude API integration pending — full Zi Wei Dou Shu reading will include:</p>
          <ul>
            <li>Life Palace (命宫) primary star analysis</li>
            <li>Key palace readings (Career, Wealth, Relationships)</li>
            <li>Star combination interpretations</li>
            <li>Personality and destiny insights</li>
          </ul>
        </div>

        <div class="disclaimer">
          ⚠️ This reading is for entertainment and cultural exploration purposes only.
          <br>本解读仅供娱乐和文化探索之用。
        </div>
      </div>
    `;
  },

  getIChingPlaceholder(data) {
    // Generate a random hexagram for demo
    const lines = [];
    for (let i = 0; i < 6; i++) {
      lines.push(Math.random() > 0.5 ? 'yang' : 'yin');
    }

    return `
      <div class="reading-result">
        <div class="reading-header">
          <h3>易经 — I Ching Reading</h3>
          <p class="reading-meta">Question: "${data.question || 'General guidance'}"</p>
        </div>

        <div class="reading-section">
          <h4>Your Hexagram 你的卦象</h4>
          <div class="hexagram-display">
            ${lines
              .reverse()
              .map(
                (line) => `
              <div class="hexagram-line ${line}">
                ${line === 'yang' ? '<div class="line-solid"></div>' : '<div class="line-broken"><span></span><span></span></div>'}
              </div>
            `
              )
              .join('')}
          </div>
        </div>

        <div class="reading-section placeholder-notice">
          <h4>Full Reading 完整解读</h4>
          <p class="placeholder-text">⏳ Claude API integration pending — full I Ching reading will include:</p>
          <ul>
            <li>Hexagram identification and meaning</li>
            <li>Judgment (彖辞) interpretation</li>
            <li>Image (象辞) wisdom</li>
            <li>Changing lines analysis</li>
            <li>Specific guidance for your question</li>
          </ul>
        </div>

        <div class="disclaimer">
          ⚠️ This reading is for entertainment and cultural exploration purposes only.
          <br>本解读仅供娱乐和文化探索之用。
        </div>
      </div>
    `;
  },

  getFacePlaceholder(data) {
    return `
      <div class="reading-result">
        <div class="reading-header">
          <h3>面相 — Face Reading</h3>
          <p class="reading-meta">
            Face Shape: ${data.faceShape || 'Not specified'} |
            Focus: ${data.interestArea || 'General'}
          </p>
        </div>

        <div class="reading-section">
          <h4>Three Zones 三停分析</h4>
          <div class="face-zones">
            <div class="zone">
              <span class="zone-label">上停 Upper Zone</span>
              <span class="zone-area">Forehead — Early Life & Intelligence</span>
            </div>
            <div class="zone">
              <span class="zone-label">中停 Middle Zone</span>
              <span class="zone-area">Eyebrows to Nose — Middle Age & Willpower</span>
            </div>
            <div class="zone">
              <span class="zone-label">下停 Lower Zone</span>
              <span class="zone-area">Mouth to Chin — Later Life & Fortune</span>
            </div>
          </div>
        </div>

        <div class="reading-section placeholder-notice">
          <h4>Full Reading 完整解读</h4>
          <p class="placeholder-text">⏳ Claude API integration pending — full face reading will include:</p>
          <ul>
            <li>Face shape personality analysis</li>
            <li>Five Officers (五官) interpretation</li>
            <li>Life phase predictions</li>
            <li>Strengths and growth areas</li>
          </ul>
        </div>

        <div class="disclaimer">
          ⚠️ This reading is for entertainment and cultural exploration purposes only.
          <br>本解读仅供娱乐和文化探索之用。
        </div>
      </div>
    `;
  },

  /**
   * Future: Show actual API reading
   * @param {string} readingHTML — formatted response from Claude API
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

  hide() {
    if (this.section) {
      this.section.style.display = 'none';
    }
  },
};
