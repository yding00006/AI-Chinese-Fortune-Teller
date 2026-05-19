/**
 * iching-hexagrams.js — Complete 64 hexagram lookup
 * Binary key: bottom line to top line, 1=yang 0=yin
 */

const HEXAGRAMS_64 = {
  '111111': { number: 1, name: '乾', pinyin: 'Qián', english: 'The Creative', trigrams: 'Heaven over Heaven' },
  '000000': { number: 2, name: '坤', pinyin: 'Kūn', english: 'The Receptive', trigrams: 'Earth over Earth' },
  '100010': { number: 3, name: '屯', pinyin: 'Zhūn', english: 'Difficulty at the Beginning', trigrams: 'Water over Thunder' },
  '010001': { number: 4, name: '蒙', pinyin: 'Méng', english: 'Youthful Folly', trigrams: 'Mountain over Water' },
  '111010': { number: 5, name: '需', pinyin: 'Xū', english: 'Waiting', trigrams: 'Water over Heaven' },
  '010111': { number: 6, name: '讼', pinyin: 'Sòng', english: 'Conflict', trigrams: 'Heaven over Water' },
  '010000': { number: 7, name: '师', pinyin: 'Shī', english: 'The Army', trigrams: 'Earth over Water' },
  '000010': { number: 8, name: '比', pinyin: 'Bǐ', english: 'Holding Together', trigrams: 'Water over Earth' },
  '111011': { number: 9, name: '小畜', pinyin: 'Xiǎo Chù', english: 'Small Taming', trigrams: 'Wind over Heaven' },
  '110111': { number: 10, name: '履', pinyin: 'Lǚ', english: 'Treading', trigrams: 'Heaven over Lake' },
  '111000': { number: 11, name: '泰', pinyin: 'Tài', english: 'Peace', trigrams: 'Earth over Heaven' },
  '000111': { number: 12, name: '否', pinyin: 'Pǐ', english: 'Standstill', trigrams: 'Heaven over Earth' },
  '101111': { number: 13, name: '同人', pinyin: 'Tóng Rén', english: 'Fellowship', trigrams: 'Heaven over Fire' },
  '111101': { number: 14, name: '大有', pinyin: 'Dà Yǒu', english: 'Great Possession', trigrams: 'Fire over Heaven' },
  '001000': { number: 15, name: '谦', pinyin: 'Qiān', english: 'Modesty', trigrams: 'Earth over Mountain' },
  '000100': { number: 16, name: '豫', pinyin: 'Yù', english: 'Enthusiasm', trigrams: 'Thunder over Earth' },
  '100110': { number: 17, name: '随', pinyin: 'Suí', english: 'Following', trigrams: 'Lake over Thunder' },
  '011001': { number: 18, name: '蛊', pinyin: 'Gǔ', english: 'Work on the Decayed', trigrams: 'Mountain over Wind' },
  '110000': { number: 19, name: '临', pinyin: 'Lín', english: 'Approach', trigrams: 'Earth over Lake' },
  '000011': { number: 20, name: '观', pinyin: 'Guān', english: 'Contemplation', trigrams: 'Wind over Earth' },
  '100101': { number: 21, name: '噬嗑', pinyin: 'Shì Kè', english: 'Biting Through', trigrams: 'Fire over Thunder' },
  '101001': { number: 22, name: '贲', pinyin: 'Bì', english: 'Grace', trigrams: 'Mountain over Fire' },
  '000001': { number: 23, name: '剥', pinyin: 'Bō', english: 'Splitting Apart', trigrams: 'Mountain over Earth' },
  '100000': { number: 24, name: '复', pinyin: 'Fù', english: 'Return', trigrams: 'Earth over Thunder' },
  '100111': { number: 25, name: '无妄', pinyin: 'Wú Wàng', english: 'Innocence', trigrams: 'Heaven over Thunder' },
  '111001': { number: 26, name: '大畜', pinyin: 'Dà Chù', english: 'Great Taming', trigrams: 'Mountain over Heaven' },
  '100001': { number: 27, name: '颐', pinyin: 'Yí', english: 'Nourishment', trigrams: 'Mountain over Thunder' },
  '011110': { number: 28, name: '大过', pinyin: 'Dà Guò', english: 'Great Excess', trigrams: 'Lake over Wind' },
  '010010': { number: 29, name: '坎', pinyin: 'Kǎn', english: 'The Abysmal Water', trigrams: 'Water over Water' },
  '101101': { number: 30, name: '离', pinyin: 'Lí', english: 'The Clinging Fire', trigrams: 'Fire over Fire' },
  '001110': { number: 31, name: '咸', pinyin: 'Xián', english: 'Influence', trigrams: 'Lake over Mountain' },
  '011100': { number: 32, name: '恒', pinyin: 'Héng', english: 'Duration', trigrams: 'Thunder over Wind' },
  '001111': { number: 33, name: '遁', pinyin: 'Dùn', english: 'Retreat', trigrams: 'Heaven over Mountain' },
  '111100': { number: 34, name: '大壮', pinyin: 'Dà Zhuàng', english: 'Great Power', trigrams: 'Thunder over Heaven' },
  '000101': { number: 35, name: '晋', pinyin: 'Jìn', english: 'Progress', trigrams: 'Fire over Earth' },
  '101000': { number: 36, name: '明夷', pinyin: 'Míng Yí', english: 'Darkening of the Light', trigrams: 'Earth over Fire' },
  '101011': { number: 37, name: '家人', pinyin: 'Jiā Rén', english: 'The Family', trigrams: 'Wind over Fire' },
  '110101': { number: 38, name: '睽', pinyin: 'Kuí', english: 'Opposition', trigrams: 'Fire over Lake' },
  '001010': { number: 39, name: '蹇', pinyin: 'Jiǎn', english: 'Obstruction', trigrams: 'Water over Mountain' },
  '010100': { number: 40, name: '解', pinyin: 'Xiè', english: 'Deliverance', trigrams: 'Thunder over Water' },
  '110001': { number: 41, name: '损', pinyin: 'Sǔn', english: 'Decrease', trigrams: 'Mountain over Lake' },
  '100011': { number: 42, name: '益', pinyin: 'Yì', english: 'Increase', trigrams: 'Wind over Thunder' },
  '111110': { number: 43, name: '夬', pinyin: 'Guài', english: 'Breakthrough', trigrams: 'Lake over Heaven' },
  '011111': { number: 44, name: '姤', pinyin: 'Gòu', english: 'Coming to Meet', trigrams: 'Heaven over Wind' },
  '000110': { number: 45, name: '萃', pinyin: 'Cuì', english: 'Gathering Together', trigrams: 'Lake over Earth' },
  '011000': { number: 46, name: '升', pinyin: 'Shēng', english: 'Pushing Upward', trigrams: 'Earth over Wind' },
  '010110': { number: 47, name: '困', pinyin: 'Kùn', english: 'Oppression', trigrams: 'Lake over Water' },
  '011010': { number: 48, name: '井', pinyin: 'Jǐng', english: 'The Well', trigrams: 'Water over Wind' },
  '101110': { number: 49, name: '革', pinyin: 'Gé', english: 'Revolution', trigrams: 'Lake over Fire' },
  '011101': { number: 50, name: '鼎', pinyin: 'Dǐng', english: 'The Cauldron', trigrams: 'Fire over Wind' },
  '100100': { number: 51, name: '震', pinyin: 'Zhèn', english: 'The Arousing Thunder', trigrams: 'Thunder over Thunder' },
  '001001': { number: 52, name: '艮', pinyin: 'Gèn', english: 'Keeping Still Mountain', trigrams: 'Mountain over Mountain' },
  '001011': { number: 53, name: '渐', pinyin: 'Jiàn', english: 'Development', trigrams: 'Wind over Mountain' },
  '110100': { number: 54, name: '归妹', pinyin: 'Guī Mèi', english: 'The Marrying Maiden', trigrams: 'Thunder over Lake' },
  '101100': { number: 55, name: '丰', pinyin: 'Fēng', english: 'Abundance', trigrams: 'Thunder over Fire' },
  '001101': { number: 56, name: '旅', pinyin: 'Lǚ', english: 'The Wanderer', trigrams: 'Fire over Mountain' },
  '011011': { number: 57, name: '巽', pinyin: 'Xùn', english: 'The Gentle Wind', trigrams: 'Wind over Wind' },
  '110110': { number: 58, name: '兑', pinyin: 'Duì', english: 'The Joyous Lake', trigrams: 'Lake over Lake' },
  '010011': { number: 59, name: '涣', pinyin: 'Huàn', english: 'Dispersion', trigrams: 'Wind over Water' },
  '110010': { number: 60, name: '节', pinyin: 'Jié', english: 'Limitation', trigrams: 'Water over Lake' },
  '110011': { number: 61, name: '中孚', pinyin: 'Zhōng Fú', english: 'Inner Truth', trigrams: 'Wind over Lake' },
  '001100': { number: 62, name: '小过', pinyin: 'Xiǎo Guò', english: 'Small Excess', trigrams: 'Thunder over Mountain' },
  '010101': { number: 63, name: '既济', pinyin: 'Jì Jì', english: 'After Completion', trigrams: 'Water over Fire' },
  '101010': { number: 64, name: '未济', pinyin: 'Wèi Jì', english: 'Before Completion', trigrams: 'Fire over Water' },
};

/**
 * Look up a hexagram by its binary string (bottom to top)
 */
function lookupHexagram(binary) {
  return HEXAGRAMS_64[binary] || null;
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { HEXAGRAMS_64, lookupHexagram };
}
