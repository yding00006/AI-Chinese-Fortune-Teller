/**
 * lunar-calendar.js — Chinese Lunar Calendar Calculations
 *
 * Provides deterministic lunar date conversion, solar term lookup,
 * and traditional auspiciousness indicators. This is real computational
 * logic, not AI-generated — similar to how the CS153 project uses
 * MET formulas and kcal math.
 *
 * Based on standard lunar calendar data tables (1900–2100).
 */

/**
 * Lunar calendar data for years 1900–2100
 * Each entry encodes: months' day counts (bits 0–11, 1=30 days, 0=29 days),
 * leap month (bits 12–15), and total days info.
 *
 * This is the standard lookup table used by most Chinese calendar libraries.
 */
const LUNAR_INFO = [
  0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, // 1900-1909
  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, // 1910-1919
  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, // 1920-1929
  0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, // 1930-1939
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, // 1940-1949
  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, // 1950-1959
  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, // 1960-1969
  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, // 1970-1979
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, // 1980-1989
  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0, // 1990-1999
  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, // 2000-2009
  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, // 2010-2019
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, // 2020-2029
  0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, // 2030-2039
  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, // 2040-2049
  0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, // 2050-2059
  0x092e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, // 2060-2069
  0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, // 2070-2079
  0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, // 2080-2089
  0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a4d0, 0x0d150, 0x0f252, // 2090-2099
  0x0d520, // 2100
];

/**
 * 24 Solar Terms (二十四节气) — approximate dates for a typical year
 * Each entry: [month (0-indexed), approximate day, name, chinese]
 */
const SOLAR_TERMS = [
  [1, 4, 'Start of Spring', '立春'],
  [1, 19, 'Rain Water', '雨水'],
  [2, 6, 'Awakening of Insects', '惊蛰'],
  [2, 21, 'Spring Equinox', '春分'],
  [3, 5, 'Clear and Bright', '清明'],
  [3, 20, 'Grain Rain', '谷雨'],
  [4, 6, 'Start of Summer', '立夏'],
  [4, 21, 'Grain Buds', '小满'],
  [5, 6, 'Grain in Ear', '芒种'],
  [5, 21, 'Summer Solstice', '夏至'],
  [6, 7, 'Minor Heat', '小暑'],
  [6, 23, 'Major Heat', '大暑'],
  [7, 7, 'Start of Autumn', '立秋'],
  [7, 23, 'End of Heat', '处暑'],
  [8, 8, 'White Dew', '白露'],
  [8, 23, 'Autumnal Equinox', '秋分'],
  [9, 8, 'Cold Dew', '寒露'],
  [9, 23, 'Frost\'s Descent', '霜降'],
  [10, 7, 'Start of Winter', '立冬'],
  [10, 22, 'Minor Snow', '小雪'],
  [11, 7, 'Major Snow', '大雪'],
  [11, 22, 'Winter Solstice', '冬至'],
  [0, 6, 'Minor Cold', '小寒'],
  [0, 20, 'Major Cold', '大寒'],
];

/**
 * Get the number of days in a lunar year
 */
function lunarYearDays(year) {
  let sum = 348; // 12 months × 29 days
  const info = LUNAR_INFO[year - 1900];
  for (let i = 0x8000; i > 0x8; i >>= 1) {
    sum += (info & i) ? 1 : 0;
  }
  return sum + leapDays(year);
}

/**
 * Get leap month for a year (0 = no leap month)
 */
function leapMonth(year) {
  return LUNAR_INFO[year - 1900] & 0xf;
}

/**
 * Get days in the leap month of a year
 */
function leapDays(year) {
  if (leapMonth(year) === 0) return 0;
  return (LUNAR_INFO[year - 1900] & 0x10000) ? 30 : 29;
}

/**
 * Get days in a given lunar month (1-indexed)
 */
function monthDays(year, month) {
  return (LUNAR_INFO[year - 1900] & (0x10000 >> month)) ? 30 : 29;
}

/**
 * Convert a solar (Gregorian) date to Chinese lunar date
 * Returns { lunarYear, lunarMonth, lunarDay, isLeapMonth, monthCn, dayCn }
 */
function solarToLunar(year, month, day) {
  if (year < 1900 || year > 2100) return null;

  // Days from 1900-01-31 (lunar new year of 1900)
  const baseDate = new Date(1900, 0, 31);
  const targetDate = new Date(year, month - 1, day);
  let offset = Math.floor((targetDate - baseDate) / 86400000);

  if (offset < 0) return null;

  // Determine lunar year
  let lunarYear = 1900;
  let yearDaysCount;
  for (; lunarYear <= 2100 && offset > 0; lunarYear++) {
    yearDaysCount = lunarYearDays(lunarYear);
    offset -= yearDaysCount;
  }
  if (offset < 0) {
    offset += yearDaysCount;
    lunarYear--;
  }

  // Determine lunar month
  const leap = leapMonth(lunarYear);
  let isLeapMonth = false;
  let lunarMonth = 1;

  for (; lunarMonth <= 12 && offset > 0; lunarMonth++) {
    // Check for leap month
    if (leap > 0 && lunarMonth === leap + 1 && !isLeapMonth) {
      --lunarMonth;
      isLeapMonth = true;
      const ld = leapDays(lunarYear);
      if (offset < ld) break;
      offset -= ld;
      isLeapMonth = false;
      lunarMonth++;
      continue;
    }
    const md = monthDays(lunarYear, lunarMonth);
    if (offset < md) break;
    offset -= md;
  }

  const lunarDay = offset + 1;

  // Chinese representations
  const MONTH_CN = ['', '正月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '冬月', '腊月'];

  const DAY_CN_TENS = ['初', '十', '廿', '三十'];
  const DAY_CN_ONES = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

  let dayCn;
  if (lunarDay === 10) dayCn = '初十';
  else if (lunarDay === 20) dayCn = '二十';
  else if (lunarDay === 30) dayCn = '三十';
  else {
    const ten = Math.floor(lunarDay / 10);
    const one = lunarDay % 10;
    dayCn = DAY_CN_TENS[ten] + DAY_CN_ONES[one];
  }

  return {
    lunarYear,
    lunarMonth,
    lunarDay,
    isLeapMonth,
    monthCn: (isLeapMonth ? '闰' : '') + MONTH_CN[lunarMonth],
    dayCn,
    displayCn: `农历${(isLeapMonth ? '闰' : '') + MONTH_CN[lunarMonth]}${dayCn}`,
  };
}

/**
 * Get the current or nearest solar term for a date
 */
function getSolarTerm(month, day) {
  const monthIdx = month - 1; // 0-indexed
  let closest = null;
  let minDist = Infinity;

  for (const [m, d, name, cn] of SOLAR_TERMS) {
    if (m === monthIdx) {
      const dist = Math.abs(day - d);
      if (dist < minDist) {
        minDist = dist;
        closest = { name, cn, day: d, month: m + 1, isExact: dist <= 1 };
      }
    }
  }

  // Also check if we're near a term from adjacent months
  for (const [m, d, name, cn] of SOLAR_TERMS) {
    const adjMonth = (monthIdx + 11) % 12; // previous month
    const nextMonth = (monthIdx + 1) % 12; // next month
    if (m === adjMonth && day <= 5) {
      const dist = day + (30 - d);
      if (dist < minDist) {
        minDist = dist;
        closest = { name, cn, day: d, month: m + 1, isExact: false };
      }
    }
    if (m === nextMonth && day >= 25) {
      const dist = (30 - day) + d;
      if (dist < minDist) {
        minDist = dist;
        closest = { name, cn, day: d, month: m + 1, isExact: false };
      }
    }
  }

  return closest;
}

/**
 * Get traditional auspiciousness indicators for a date
 * Based on the Jianchu twelve-day cycle (建除十二直)
 */
function getDayIndicator(year, month, day) {
  const TWELVE_OFFICERS = [
    { name: '建', pinyin: 'Jiàn', english: 'Establish', auspicious: true, note: 'Good for starting new ventures' },
    { name: '除', pinyin: 'Chú', english: 'Remove', auspicious: true, note: 'Good for clearing obstacles, cleaning' },
    { name: '满', pinyin: 'Mǎn', english: 'Full', auspicious: true, note: 'Good for storage, receiving' },
    { name: '平', pinyin: 'Píng', english: 'Balance', auspicious: null, note: 'Neutral day, good for repairs' },
    { name: '定', pinyin: 'Dìng', english: 'Settle', auspicious: true, note: 'Good for commitments, meetings' },
    { name: '执', pinyin: 'Zhí', english: 'Grasp', auspicious: null, note: 'Mixed — good for collecting debts' },
    { name: '破', pinyin: 'Pò', english: 'Break', auspicious: false, note: 'Avoid major decisions' },
    { name: '危', pinyin: 'Wēi', english: 'Danger', auspicious: false, note: 'Caution advised, good for reflection' },
    { name: '成', pinyin: 'Chéng', english: 'Accomplish', auspicious: true, note: 'Good for completing tasks' },
    { name: '收', pinyin: 'Shōu', english: 'Receive', auspicious: true, note: 'Good for harvest, gathering' },
    { name: '开', pinyin: 'Kāi', english: 'Open', auspicious: true, note: 'Good for beginnings, openings' },
    { name: '闭', pinyin: 'Bì', english: 'Close', auspicious: false, note: 'Good for rest, not for new endeavors' },
  ];

  // Simplified cycle calculation — uses day count from epoch
  const baseDate = new Date(1900, 0, 1);
  const targetDate = new Date(year, month - 1, day);
  const dayCount = Math.floor((targetDate - baseDate) / 86400000);
  const index = ((dayCount % 12) + 12) % 12;

  return TWELVE_OFFICERS[index];
}

/**
 * Get complete calendar info for a date (combines all calculations)
 */
function getCalendarInfo(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return null;

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const lunar = solarToLunar(year, month, day);
  const solarTerm = getSolarTerm(month, day);
  const dayIndicator = getDayIndicator(year, month, day);

  return {
    solar: { year, month, day },
    lunar,
    solarTerm,
    dayIndicator,
  };
}

module.exports = {
  solarToLunar,
  getSolarTerm,
  getDayIndicator,
  getCalendarInfo,
};
