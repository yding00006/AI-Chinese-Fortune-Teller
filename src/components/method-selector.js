/**
 * method-selector.js — Divination method selection cards
 * Handles user choice of divination system
 */

const MethodSelector = {
  methods: [
    {
      id: 'bazi',
      name: 'Bazi',
      cn: '八字',
      subtitle: 'Four Pillars of Destiny',
      description: 'Reveal your life path through the cosmic alignment of your birth date and time.',
      icon: '☰',
      inputs: ['birthdate', 'birthtime', 'gender'],
    },
    {
      id: 'ziwei',
      name: 'Zi Wei Dou Shu',
      cn: '紫微斗数',
      subtitle: 'Purple Star Astrology',
      description: 'Map the stars of destiny across the twelve palaces of your life.',
      icon: '✦',
      inputs: ['birthdate', 'birthtime', 'gender'],
    },
    {
      id: 'iching',
      name: 'I Ching',
      cn: '易经',
      subtitle: 'Book of Changes',
      description: 'Consult the ancient hexagrams for wisdom on your deepest questions.',
      icon: '☯',
      inputs: ['question'],
    },
    {
      id: 'face',
      name: 'Face Reading',
      cn: '面相',
      subtitle: 'Physiognomy',
      description: 'Discover what your facial features reveal about personality and fortune.',
      icon: '◎',
      inputs: ['face-description', 'interest-area'],
    },
  ],

  selectedMethod: null,

  init() {
    this.container = document.getElementById('methods-grid');
    this.render();
    this.bindEvents();
  },

  render() {
    if (!this.container) return;
    this.container.innerHTML = this.methods
      .map(
        (method) => `
      <div class="method-card" data-method="${method.id}">
        <div class="method-icon">${method.icon}</div>
        <h3 class="method-name">${method.cn}</h3>
        <p class="method-english">${method.name}</p>
        <p class="method-subtitle">${method.subtitle}</p>
        <p class="method-desc">${method.description}</p>
        <button class="method-select-btn">Begin Reading</button>
      </div>
    `
      )
      .join('');
  },

  bindEvents() {
    if (!this.container) return;
    this.container.addEventListener('click', (e) => {
      const card = e.target.closest('.method-card');
      if (!card) return;

      const methodId = card.dataset.method;
      this.selectMethod(methodId);
    });
  },

  selectMethod(methodId) {
    this.selectedMethod = this.methods.find((m) => m.id === methodId);

    // Highlight selected card
    document.querySelectorAll('.method-card').forEach((card) => {
      card.classList.remove('selected');
    });
    document.querySelector(`[data-method="${methodId}"]`)?.classList.add('selected');

    // Show the appropriate input form
    if (typeof InputForm !== 'undefined') {
      InputForm.showForMethod(this.selectedMethod);
    }
  },

  getSelected() {
    return this.selectedMethod;
  },
};
