/**
 * homepage.js — Landing page logic
 * Handles the hero section and navigation to method selection
 */

const Homepage = {
  init() {
    this.heroSection = document.getElementById('hero');
    this.enterBtn = document.getElementById('enter-btn');
    this.bindEvents();
  },

  bindEvents() {
    if (this.enterBtn) {
      this.enterBtn.addEventListener('click', () => {
        this.navigateToMethods();
      });
    }
  },

  navigateToMethods() {
    // Scroll to method selection section
    const methodSection = document.getElementById('method-selection');
    if (methodSection) {
      methodSection.scrollIntoView({ behavior: 'smooth' });
    }
  },

  show() {
    if (this.heroSection) {
      this.heroSection.style.display = 'flex';
    }
  },

  hide() {
    if (this.heroSection) {
      this.heroSection.style.display = 'none';
    }
  },
};
