/**
 * helpers.js — Utility functions for the Chinese Fortune Telling app
 */

/**
 * Chinese Zodiac lookup by birth year
 */
const ZODIAC_ANIMALS = [
  { name: 'Rat', cn: '鼠', element: 'Water' },
  { name: 'Ox', cn: '牛', element: 'Earth' },
  { name: 'Tiger', cn: '虎', element: 'Wood' },
  { name: 'Rabbit', cn: '兔', element: 'Wood' },
  { name: 'Dragon', cn: '龙', element: 'Earth' },
  { name: 'Snake', cn: '蛇', element: 'Fire' },
  { name: 'Horse', cn: '马', element: 'Fire' },
  { name: 'Goat', cn: '羊', element: 'Earth' },
  { name: 'Monkey', cn: '猴', element: 'Metal' },
  { name: 'Rooster', cn: '鸡', element: 'Metal' },
  { name: 'Dog', cn: '狗', element: 'Earth' },
  { name: 'Pig', cn: '猪', element: 'Water' },
];

function getZodiacAnimal(year) {
  const index = (year - 4) % 12;
  return ZODIAC_ANIMALS[index];
}

/**
 * Heavenly Stems (天干)
 */
const HEAVENLY_STEMS = [
  { name: '甲', pinyin: 'Jiǎ', element: 'Wood', polarity: 'Yang' },
  { name: '乙', pinyin: 'Yǐ', element: 'Wood', polarity: 'Yin' },
  { name: '丙', pinyin: 'Bǐng', element: 'Fire', polarity: 'Yang' },
  { name: '丁', pinyin: 'Dīng', element: 'Fire', polarity: 'Yin' },
  { name: '戊', pinyin: 'Wù', element: 'Earth', polarity: 'Yang' },
  { name: '己', pinyin: 'Jǐ', element: 'Earth', polarity: 'Yin' },
  { name: '庚', pinyin: 'Gēng', element: 'Metal', polarity: 'Yang' },
  { name: '辛', pinyin: 'Xīn', element: 'Metal', polarity: 'Yin' },
  { name: '壬', pinyin: 'Rén', element: 'Water', polarity: 'Yang' },
  { name: '癸', pinyin: 'Guǐ', element: 'Water', polarity: 'Yin' },
];

/**
 * Earthly Branches (地支)
 */
const EARTHLY_BRANCHES = [
  { name: '子', pinyin: 'Zǐ', animal: 'Rat', hours: '23:00-01:00' },
  { name: '丑', pinyin: 'Chǒu', animal: 'Ox', hours: '01:00-03:00' },
  { name: '寅', pinyin: 'Yín', animal: 'Tiger', hours: '03:00-05:00' },
  { name: '卯', pinyin: 'Mǎo', animal: 'Rabbit', hours: '05:00-07:00' },
  { name: '辰', pinyin: 'Chén', animal: 'Dragon', hours: '07:00-09:00' },
  { name: '巳', pinyin: 'Sì', animal: 'Snake', hours: '09:00-11:00' },
  { name: '午', pinyin: 'Wǔ', animal: 'Horse', hours: '11:00-13:00' },
  { name: '未', pinyin: 'Wèi', animal: 'Goat', hours: '13:00-15:00' },
  { name: '申', pinyin: 'Shēn', animal: 'Monkey', hours: '15:00-17:00' },
  { name: '酉', pinyin: 'Yǒu', animal: 'Rooster', hours: '17:00-19:00' },
  { name: '戌', pinyin: 'Xū', animal: 'Dog', hours: '19:00-21:00' },
  { name: '亥', pinyin: 'Hài', animal: 'Pig', hours: '21:00-23:00' },
];

/**
 * Get Heavenly Stem for a year
 */
function getYearStem(year) {
  return HEAVENLY_STEMS[(year - 4) % 10];
}

/**
 * Get Earthly Branch for a year
 */
function getYearBranch(year) {
  return EARTHLY_BRANCHES[(year - 4) % 12];
}

/**
 * Get Chinese hour block from Western time
 */
function getChineseHour(hour) {
  if (hour === 23 || hour === 0) return EARTHLY_BRANCHES[0]; // 子
  return EARTHLY_BRANCHES[Math.floor((hour + 1) / 2)];
}

/**
 * I Ching: simulate 3-coin toss for one line
 * Returns: 6 (old yin), 7 (young yang), 8 (young yin), 9 (old yang)
 */
function tossCoinLine() {
  let total = 0;
  for (let i = 0; i < 3; i++) {
    total += Math.random() < 0.5 ? 2 : 3;
  }
  return total;
}

/**
 * I Ching: generate a full hexagram (6 lines)
 */
function generateHexagram() {
  const lines = [];
  for (let i = 0; i < 6; i++) {
    const value = tossCoinLine();
    lines.push({
      value,
      type: value % 2 === 1 ? 'yang' : 'yin',
      changing: value === 6 || value === 9,
    });
  }
  return lines;
}

/**
 * I Ching hexagram names lookup
 * Uses HEXAGRAMS_64 from iching-hexagrams.js if available, otherwise fallback
 */
const HEXAGRAM_NAMES = (typeof HEXAGRAMS_64 !== 'undefined') ? HEXAGRAMS_64 : {
  '111111': { number: 1, name: '乾', pinyin: 'Qián', english: 'The Creative' },
  '000000': { number: 2, name: '坤', pinyin: 'Kūn', english: 'The Receptive' },
  '100010': { number: 3, name: '屯', pinyin: 'Zhūn', english: 'Difficulty at the Beginning' },
  '010001': { number: 4, name: '蒙', pinyin: 'Méng', english: 'Youthful Folly' },
  '111010': { number: 5, name: '需', pinyin: 'Xū', english: 'Waiting' },
  '010111': { number: 6, name: '讼', pinyin: 'Sòng', english: 'Conflict' },
  '010000': { number: 7, name: '师', pinyin: 'Shī', english: 'The Army' },
  '000010': { number: 8, name: '比', pinyin: 'Bǐ', english: 'Holding Together' },
};

/**
 * Format a date to Chinese style
 */
function formatDateChinese(date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${y}年${m}月${d}日`;
}

/**
 * Validate birth date input
 */
function validateBirthDate(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return false;
  if (date > new Date()) return false;
  if (date.getFullYear() < 1900) return false;
  return true;
}

// Export for module usage (future)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getZodiacAnimal,
    getYearStem,
    getYearBranch,
    getChineseHour,
    tossCoinLine,
    generateHexagram,
    formatDateChinese,
    validateBirthDate,
    HEAVENLY_STEMS,
    EARTHLY_BRANCHES,
    ZODIAC_ANIMALS,
    HEXAGRAM_NAMES,
  };
}
