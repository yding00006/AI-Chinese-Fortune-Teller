/**
 * demo-readings.js — High-quality demo readings for when no API key is present
 */

function getDemoReading(data) {
  const generators = {
    bazi: getBaziDemo,
    ziwei: getZiweiDemo,
    iching: getIChingDemo,
    face: getFaceDemo,
  };

  const generator = generators[data.method];
  if (!generator) return '<p>Demo reading not available for this method.</p>';
  return generator(data);
}

function getBaziDemo(data) {
  const year = data.birthDate ? new Date(data.birthDate).getFullYear() : 2000;
  const zodiacAnimals = ['Rat 鼠','Ox 牛','Tiger 虎','Rabbit 兔','Dragon 龙','Snake 蛇','Horse 马','Goat 羊','Monkey 猴','Rooster 鸡','Dog 狗','Pig 猪'];
  const stems = ['甲 Jiǎ Wood Yang','乙 Yǐ Wood Yin','丙 Bǐng Fire Yang','丁 Dīng Fire Yin','戊 Wù Earth Yang','己 Jǐ Earth Yin','庚 Gēng Metal Yang','辛 Xīn Metal Yin','壬 Rén Water Yang','癸 Guǐ Water Yin'];
  const zodiac = zodiacAnimals[(year - 4) % 12];
  const stem = stems[(year - 4) % 10];

  return `
    <div class="reading-header">
      <h3>四柱八字 — Four Pillars of Destiny</h3>
      <p class="reading-meta">Birth: ${data.birthDate || 'N/A'} | Time: ${data.birthTime || 'Unknown'} | Gender: ${data.gender || 'N/A'}</p>
      <p class="reading-meta" style="color: var(--color-gold); margin-top: 0.5rem;">✦ Demo Reading 演示解读 ✦</p>
    </div>

    <div class="reading-section">
      <h4>Birth Information 出生信息</h4>
      <p>Based on your birth year of <strong>${year}</strong>, your Chinese zodiac animal is the <strong>${zodiac}</strong>, and your Year Heavenly Stem (年天干) is <strong>${stem}</strong>.</p>
    </div>

    <div class="reading-section">
      <h4>Year Pillar 年柱</h4>
      <p>The Year Pillar represents your ancestral energy and the broader societal currents that shaped your early life. Your zodiac sign suggests natural charisma and a strong sense of purpose. The associated element colors your approach to the world — grounding your ambitions or fueling your creativity.</p>
    </div>

    <div class="reading-section">
      <h4>Five Elements Balance 五行平衡</h4>
      <p>A preliminary assessment suggests an emphasis on the element associated with your birth year. True Five Elements balance requires all four pillars (Year, Month, Day, Hour) to be calculated precisely. In general, seeking balance between Wood (木), Fire (火), Earth (土), Metal (金), and Water (水) is key to harmony.</p>
    </div>

    <div class="reading-section">
      <h4>Life Themes 人生主题</h4>
      <p><strong>Career 事业:</strong> Your birth chart suggests a natural inclination toward leadership and creative problem-solving. Trust your instincts when navigating career decisions.</p>
      <p><strong>Relationships 感情:</strong> Harmony in relationships comes from understanding your own elemental nature. Seek partners and friends whose energies complement yours.</p>
      <p><strong>Health 健康:</strong> Pay attention to the organ systems associated with your dominant elements. Balance activity with rest.</p>
      <p><strong>Wealth 财运:</strong> Financial fortune flows when your actions align with your natural strengths. Patience and timing are your allies.</p>
    </div>

    <div class="reading-section" style="background: var(--color-gold-muted); padding: 1rem; border-radius: 8px;">
      <p style="color: var(--color-gold); font-style: italic;">⚡ This is a demo reading. Connect an Anthropic API key to receive a personalized AI-generated Bazi analysis.</p>
      <p style="color: var(--color-gold); font-style: italic;">这是演示解读。连接 Anthropic API 密钥以获取个性化的 AI 八字分析。</p>
    </div>`;
}

function getZiweiDemo(data) {
  return `
    <div class="reading-header">
      <h3>紫微斗数 — Purple Star Astrology</h3>
      <p class="reading-meta">Birth: ${data.birthDate || 'N/A'} | Time: ${data.birthTime || 'Unknown'} | Gender: ${data.gender || 'N/A'}</p>
      <p class="reading-meta" style="color: var(--color-gold); margin-top: 0.5rem;">✦ Demo Reading 演示解读 ✦</p>
    </div>

    <div class="reading-section">
      <h4>Life Palace 命宫</h4>
      <p>Your Life Palace is the foundation of your Zi Wei Dou Shu chart. It represents your core personality, life direction, and innate potential. Based on the time and date provided, you carry the energy of determination and quiet strength — qualities that serve you well in both personal and professional pursuits.</p>
    </div>

    <div class="reading-section">
      <h4>Career Palace 官禄宫</h4>
      <p>Your career palace suggests a talent for roles that combine analytical thinking with creative expression. You may thrive in environments that value both structure and innovation. Leadership positions come naturally, though you may prefer to lead through influence rather than authority.</p>
    </div>

    <div class="reading-section">
      <h4>Wealth Palace 财帛宫</h4>
      <p>The stars influencing your wealth palace indicate steady accumulation rather than sudden windfalls. Your financial wisdom grows with experience. Investments in knowledge and skills yield the greatest long-term returns.</p>
    </div>

    <div class="reading-section">
      <h4>Relationships Palace 夫妻宫</h4>
      <p>Your relationships palace reveals a deep capacity for meaningful connection. You value loyalty and intellectual compatibility. Partnerships flourish when both parties maintain their individual growth alongside shared goals.</p>
    </div>

    <div class="reading-section" style="background: var(--color-gold-muted); padding: 1rem; border-radius: 8px;">
      <p style="color: var(--color-gold); font-style: italic;">⚡ This is a demo reading. Connect an Anthropic API key to receive a full AI-generated Zi Wei Dou Shu interpretation with star placements.</p>
      <p style="color: var(--color-gold); font-style: italic;">这是演示解读。连接 Anthropic API 密钥以获取完整的 AI 紫微斗数星盘解读。</p>
    </div>`;
}

function getIChingDemo(data) {
  const hexNames = [
    { num: 1, cn: '乾', en: 'The Creative', pin: 'Qián' },
    { num: 11, cn: '泰', en: 'Peace', pin: 'Tài' },
    { num: 15, cn: '谦', en: 'Modesty', pin: 'Qiān' },
    { num: 24, cn: '复', en: 'Return', pin: 'Fù' },
    { num: 42, cn: '益', en: 'Increase', pin: 'Yì' },
    { num: 46, cn: '升', en: 'Pushing Upward', pin: 'Shēng' },
  ];
  const hex = hexNames[Math.floor(Math.random() * hexNames.length)];

  return `
    <div class="reading-header">
      <h3>易经 — I Ching Reading</h3>
      <p class="reading-meta">Question: "${data.question || 'General guidance'}"</p>
      <p class="reading-meta" style="color: var(--color-gold); margin-top: 0.5rem;">✦ Demo Reading 演示解读 ✦</p>
    </div>

    <div class="reading-section">
      <h4>Your Hexagram 卦象: #${hex.num} ${hex.cn} (${hex.pin}) — ${hex.en}</h4>
      <p>The I Ching has offered you Hexagram ${hex.num}, <strong>${hex.cn} (${hex.pin})</strong> — "${hex.en}." This hexagram speaks to a time of ${hex.en.toLowerCase()} in your life.</p>
    </div>

    <div class="reading-section">
      <h4>Judgment 彖辞</h4>
      <p>This hexagram counsels patience and attentiveness. The ancient sages recognized that timing is everything — action taken at the right moment succeeds effortlessly, while premature effort exhausts itself. Consider how this applies to your question.</p>
    </div>

    <div class="reading-section">
      <h4>Image 象辞</h4>
      <p>Like water finding its natural path downhill, the wise person aligns their actions with the natural flow of circumstances. This hexagram invites you to observe where energy is already moving in your life and to work with it rather than against it.</p>
    </div>

    <div class="reading-section">
      <h4>Practical Guidance 实用指引</h4>
      <p>In relation to your question, this hexagram suggests a period of thoughtful preparation. Gather information, build alliances, and clarify your intentions before taking decisive action. The path forward will reveal itself through patience.</p>
    </div>

    <div class="reading-section" style="background: var(--color-gold-muted); padding: 1rem; border-radius: 8px;">
      <p style="color: var(--color-gold); font-style: italic;">⚡ This is a demo reading with a randomly selected hexagram. Connect an Anthropic API key to receive a full AI-generated I Ching consultation with coin-toss hexagram, changing lines, and transformed hexagram analysis.</p>
      <p style="color: var(--color-gold); font-style: italic;">这是演示解读。连接 Anthropic API 密钥以获取完整的 AI 易经占卜。</p>
    </div>`;
}

function getFaceDemo(data) {
  return `
    <div class="reading-header">
      <h3>面相 — Face Reading</h3>
      <p class="reading-meta">Face Shape: ${data.faceShape || 'Not specified'} | Focus: ${data.interestArea || 'General'}</p>
      <p class="reading-meta" style="color: var(--color-gold); margin-top: 0.5rem;">✦ Demo Reading 演示解读 ✦</p>
    </div>

    <div class="reading-section">
      <h4>Face Shape Interpretation 脸型解读</h4>
      <p>In traditional Chinese physiognomy (面相学), your ${data.faceShape || 'described'} face shape is associated with balance, adaptability, and a harmonious temperament. This shape traditionally suggests a person who navigates social situations with grace and possesses natural diplomatic abilities.</p>
    </div>

    <div class="reading-section">
      <h4>Feature Analysis 五官分析</h4>
      <p>${data.features ? `Based on your described features — "${data.features}" — traditional face reading suggests a blend of intellectual curiosity and emotional depth.` : 'A general reading suggests balance across the Three Zones (三停): the upper zone (forehead) relating to early life and intellect, the middle zone (eyes to nose) relating to career and willpower, and the lower zone (mouth to chin) relating to later life and fortune.'}</p>
    </div>

    <div class="reading-section">
      <h4>Focus Area: ${data.interestArea || 'General'}</h4>
      <p>Traditional face reading in this area of focus suggests favorable tendencies. Your features indicate a natural capacity for growth, resilience, and meaningful achievement. The traditional interpretation emphasizes potential rather than fixed destiny.</p>
    </div>

    <div class="reading-section">
      <h4>Strengths & Growth 优势与成长</h4>
      <p>Your described features suggest strengths in communication, perceptiveness, and adaptability. Areas for growth include trusting your instincts more and allowing yourself to pursue ambitious goals with confidence.</p>
    </div>

    <div class="reading-section" style="background: var(--color-gold-muted); padding: 1rem; border-radius: 8px;">
      <p style="color: var(--color-gold); font-style: italic;">⚡ This is a demo reading. Connect an Anthropic API key to receive a detailed AI-generated face reading interpretation.</p>
      <p style="color: var(--color-gold); font-style: italic;">这是演示解读。连接 Anthropic API 密钥以获取详细的 AI 面相解读。</p>
    </div>`;
}

module.exports = { getDemoReading };
