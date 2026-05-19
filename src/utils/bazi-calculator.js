/**
 * bazi-calculator.js — Simplified Bazi (Four Pillars) calculations
 *
 * Provides: Year pillar (exact), Hour branch (exact),
 * and simplified Month/Day pillar estimates.
 *
 * NOTE: Precise Month and Day pillar calculations require
 * full Chinese luni-solar calendar lookup tables, which are
 * beyond the scope of this simplified implementation.
 * Results are labeled as approximate where appropriate.
 */

const BaziCalculator = {
  /**
   * Calculate all available pillar data
   */
  calculate(birthDate, birthTime, gender) {
    const date = new Date(birthDate);
    if (isNaN(date.getTime())) return null;

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 1-12
    const day = date.getDate();

    const result = {
      input: { birthDate, birthTime, gender },
      yearPillar: this.getYearPillar(year),
      zodiac: this.getZodiac(year),
      hourBranch: this.getHourBranch(birthTime),
      monthPillar: this.getSimplifiedMonthPillar(year, month),
      dayPillar: null, // Requires full lookup table — marked as TODO
      fiveElements: this.estimateFiveElements(year, month, birthTime),
      isSimplified: true,
    };

    return result;
  },

  /**
   * Year Pillar — exact calculation
   */
  getYearPillar(year) {
    const stemIndex = (year - 4) % 10;
    const branchIndex = (year - 4) % 12;
    return {
      stem: HEAVENLY_STEMS[stemIndex],
      branch: EARTHLY_BRANCHES[branchIndex],
      display: `${HEAVENLY_STEMS[stemIndex].name}${EARTHLY_BRANCHES[branchIndex].name}`,
      element: HEAVENLY_STEMS[stemIndex].element,
      polarity: HEAVENLY_STEMS[stemIndex].polarity,
    };
  },

  /**
   * Zodiac animal for the year
   */
  getZodiac(year) {
    return ZODIAC_ANIMALS[(year - 4) % 12];
  },

  /**
   * Hour Branch — based on Chinese two-hour blocks
   */
  getHourBranch(birthTime) {
    if (!birthTime || birthTime === 'unknown') return null;

    const hourMap = {
      '23-01': 0, '01-03': 1, '03-05': 2, '05-07': 3,
      '07-09': 4, '09-11': 5, '11-13': 6, '13-15': 7,
      '15-17': 8, '17-19': 9, '19-21': 10, '21-23': 11,
    };

    const index = hourMap[birthTime];
    if (index === undefined) return null;

    return {
      branch: EARTHLY_BRANCHES[index],
      display: EARTHLY_BRANCHES[index].name,
      hours: EARTHLY_BRANCHES[index].hours,
    };
  },

  /**
   * Simplified Month Pillar estimate
   * Uses the solar term approximation method
   * NOTE: This is approximate — true month pillar depends on exact solar terms
   */
  getSimplifiedMonthPillar(year, month) {
    // Approximate solar month mapping (off by a few days at boundaries)
    // Month 1 (Feb) → Branch 寅, Month 2 (Mar) → Branch 卯, etc.
    const monthBranchMap = [null, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1]; // index 1-12
    const branchIndex = monthBranchMap[month];
    if (branchIndex === undefined || branchIndex === null) return null;

    // Month stem depends on year stem using the Five Tiger rule (五虎遁月)
    const yearStemIndex = (year - 4) % 10;
    const monthStemStart = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0]; // Starting stem for each year stem
    const monthStemIndex = (monthStemStart[yearStemIndex] + (month - 1)) % 10;

    return {
      stem: HEAVENLY_STEMS[monthStemIndex],
      branch: EARTHLY_BRANCHES[branchIndex],
      display: `${HEAVENLY_STEMS[monthStemIndex].name}${EARTHLY_BRANCHES[branchIndex].name}`,
      approximate: true,
      note: 'Simplified — exact month pillar depends on solar term boundaries',
    };
  },

  /**
   * Estimate Five Elements presence based on available data
   */
  estimateFiveElements(year, month, birthTime) {
    const elements = { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };

    // Year stem element
    const yearStem = HEAVENLY_STEMS[(year - 4) % 10];
    elements[yearStem.element] += 2;

    // Year branch element (from zodiac)
    const zodiac = ZODIAC_ANIMALS[(year - 4) % 12];
    elements[zodiac.element] += 1;

    // Rough month element cycle
    const monthElements = [null, 'Wood', 'Wood', 'Earth', 'Fire', 'Fire', 'Earth', 'Metal', 'Metal', 'Earth', 'Water', 'Water', 'Earth'];
    if (monthElements[month]) {
      elements[monthElements[month]] += 1;
    }

    return {
      distribution: elements,
      dominant: Object.entries(elements).sort((a, b) => b[1] - a[1])[0][0],
      lacking: Object.entries(elements).filter(([, v]) => v === 0).map(([k]) => k),
      approximate: true,
    };
  },
};
