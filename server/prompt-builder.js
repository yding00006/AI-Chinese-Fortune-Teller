/**
 * prompt-builder.js — Builds method-specific prompts for the AI API
 */

const SYSTEM_PROMPT = `You are a knowledgeable and culturally respectful interpreter of traditional Chinese divination systems. You provide readings that are insightful, symbolic, and reflective — never deterministic or authoritative.

Important guidelines:
- Frame all insights as symbolic, reflective, and for cultural exploration
- Use bilingual Chinese/English terminology naturally (e.g. 天干 Heavenly Stems)
- Never make medical, legal, financial, or psychological claims
- Never present readings as factual predictions
- Be warm, thoughtful, and encouraging
- Output well-structured HTML (use <h3>, <h4>, <p>, <div> tags) suitable for direct insertion into a web page
- Do NOT include <html>, <head>, <body>, or <style> tags
- Add CSS class "reading-section" to major section divs
- Add CSS class "reading-header" to the header div
- Keep the tone mystical yet grounded`;

function buildBaziPrompt(data) {
  // Include computed calendar data if available
  let calendarContext = '';
  if (data.calendarInfo) {
    const cal = data.calendarInfo;
    if (cal.lunar) {
      calendarContext += `\nLunar Date (computed): ${cal.lunar.displayCn} (Lunar month ${cal.lunar.lunarMonth}, day ${cal.lunar.lunarDay}${cal.lunar.isLeapMonth ? ', leap month' : ''})`;
    }
    if (cal.solarTerm) {
      calendarContext += `\nNearest Solar Term: ${cal.solarTerm.cn} (${cal.solarTerm.name})${cal.solarTerm.isExact ? ' — on this date' : ''}`;
    }
    if (cal.dayIndicator) {
      calendarContext += `\nDay Indicator (建除十二直): ${cal.dayIndicator.name} (${cal.dayIndicator.pinyin} / ${cal.dayIndicator.english}) — ${cal.dayIndicator.note}`;
    }
  }

  return `Provide a Bazi (八字 Four Pillars of Destiny) reading based on the following information:

Birth Date: ${data.birthDate}
Birth Time (Chinese hour): ${data.birthTime || 'Unknown'}
Gender: ${data.gender || 'Not specified'}${calendarContext}
${data.optionalQuestion ? `Additional Question: ${data.optionalQuestion}` : ''}

Please structure your reading as HTML with these sections:

1. **Birth Information Summary** (出生信息概要) — restate the birth details and the corresponding Chinese calendar elements you can determine.

2. **Year Pillar Discussion** (年柱) — discuss the Heavenly Stem (天干) and Earthly Branch (地支) for the birth year, including the zodiac animal and associated element.

3. **Day Master Discussion** (日主) — if you can estimate the Day Master from the provided information, discuss it. If the birth time is unknown or the calculation is approximate, clearly state this limitation.

4. **Five Elements Balance** (五行平衡) — discuss the likely elemental tendencies based on what can be determined. Note which elements may be strong or lacking.

5. **Life Themes** — provide reflective insights on:
   - Career & Purpose (事业)
   - Relationships & Harmony (感情)
   - Health & Vitality (健康)
   - Wealth & Prosperity (财运)

6. **Limitations Note** — clearly state if any part of the reading is simplified or approximate due to missing information (e.g., unknown birth time prevents exact hour pillar calculation).

Remember: this is for entertainment and cultural exploration only. Do not make deterministic predictions.`;
}

function buildZiweiPrompt(data) {
  // Include computed calendar data if available
  let calendarContext = '';
  if (data.calendarInfo) {
    const cal = data.calendarInfo;
    if (cal.lunar) {
      calendarContext += `\nLunar Date (computed): ${cal.lunar.displayCn} (Lunar month ${cal.lunar.lunarMonth}, day ${cal.lunar.lunarDay}${cal.lunar.isLeapMonth ? ', leap month' : ''})`;
    }
    if (cal.solarTerm) {
      calendarContext += `\nNearest Solar Term: ${cal.solarTerm.cn} (${cal.solarTerm.name})`;
    }
  }

  return `Provide a Zi Wei Dou Shu (紫微斗数 Purple Star Astrology) reading based on the following information:

Birth Date: ${data.birthDate}
Birth Time (Chinese hour): ${data.birthTime || 'Unknown'}
Gender: ${data.gender || 'Not specified'}${calendarContext}
${data.optionalQuestion ? `Additional Question: ${data.optionalQuestion}` : ''}

Please structure your reading as HTML with these sections:

1. **Birth Information Summary** (出生信息) — restate the birth details.

2. **Life Palace Interpretation** (命宫解读) — discuss likely personality traits and life direction based on the birth information. Note that without full lunar calendar conversion and star placement algorithms, this is an interpretive reading.

3. **Key Palace Themes**:
   - Career Palace (官禄宫) — work style, career tendencies
   - Wealth Palace (财帛宫) — financial patterns and attitudes
   - Relationships Palace (夫妻宫) — partnership dynamics
   - Health Palace (疾厄宫) — wellness tendencies

4. **Personality Insights** (性格特质) — strengths, growth areas, and natural inclinations.

5. **Interpretive Note** — clearly state that this is an interpretive reading based on general Zi Wei Dou Shu principles, and that a full reading would require precise lunar calendar conversion and star chart computation.

Remember: this is for entertainment and cultural exploration only.`;
}

function buildIChingPrompt(data) {
  // Parse hexagram data if provided
  let hexagramInfo = '';
  if (data.hexagramLines) {
    hexagramInfo = `
Hexagram lines (bottom to top): ${data.hexagramLines.map(l => `${l.value} (${l.type}${l.changing ? ', changing' : ''})`).join(', ')}
Hexagram binary (bottom to top): ${data.hexagramLines.map(l => l.type === 'yang' ? '1' : '0').join('')}
${data.hexagramName ? `Identified as: Hexagram #${data.hexagramName.number} ${data.hexagramName.name} (${data.hexagramName.pinyin}) — ${data.hexagramName.english}` : ''}
${data.changingLines && data.changingLines.length > 0 ? `Changing lines at positions: ${data.changingLines.join(', ')} (counting from bottom)` : 'No changing lines'}
${data.transformedHexagram ? `Transformed hexagram binary: ${data.transformedHexagram}` : ''}
`;
  }

  return `Provide an I Ching (易经 Book of Changes) reading for the following:

Question: "${data.question || 'General guidance sought'}"
${hexagramInfo}

Please structure your reading as HTML with these sections:

1. **The Question** (问题) — reflect on the question and its deeper themes.

2. **Primary Hexagram** (本卦) — identify and interpret the hexagram. Discuss:
   - The hexagram's name, number, and meaning
   - The Judgment (彖辞)
   - The Image (象辞)
   - Core wisdom of this hexagram

3. **Changing Lines Analysis** (变爻分析) — if there are changing lines, discuss each one and what transformation it suggests. If no changing lines, note that the situation is stable.

4. **Transformed Hexagram** (变卦) — if applicable, discuss the hexagram the reading transforms into and what this evolution means.

5. **Practical Guidance** (实用指引) — offer thoughtful, reflective advice that connects the ancient wisdom to the person's modern situation.

6. **Modern Application** (现代应用) — how might this hexagram's wisdom apply to contemporary life decisions?

Remember: this is for entertainment and cultural exploration only.`;
}

function buildFacePrompt(data) {
  return `Provide a Chinese Face Reading (面相 Miànxiàng / Physiognomy) interpretation based on the following self-described features:

Face Shape: ${data.faceShape || 'Not specified'}
Notable Features: ${data.features || 'Not described'}
Area of Interest: ${data.interestArea || 'General overview'}
${data.optionalQuestion ? `Additional Question: ${data.optionalQuestion}` : ''}

Please structure your reading as HTML with these sections:

1. **Face Shape Interpretation** (脸型解读) — discuss the traditional Chinese face reading interpretation of the described face shape, including associated personality tendencies and fortune themes.

2. **Notable Features Analysis** (五官分析) — interpret any described features using traditional physiognomy frameworks (Five Officers 五官, Three Zones 三停, etc.).

3. **Area of Interest Focus** (${data.interestArea || 'General'}) — provide focused insights related to the person's area of interest.

4. **Strengths & Growth Areas** (优势与成长) — highlight positive tendencies and areas for personal development.

CRITICAL guidelines for Face Reading:
- Use ONLY the self-described text features provided — do NOT reference any images
- Do NOT infer race, ethnicity, age, or any sensitive identity traits
- Do NOT make medical or health diagnoses
- Do NOT judge attractiveness or make comparative statements
- Do NOT make deterministic claims about fate
- Keep all language respectful, empowering, and non-judgmental
- Frame everything as traditional cultural symbolism, not fact
- No face images are stored or analyzed by this application

Remember: this is for entertainment and cultural exploration only.`;
}

/**
 * Main prompt builder function
 */
function buildPrompt(data) {
  const builders = {
    bazi: buildBaziPrompt,
    ziwei: buildZiweiPrompt,
    iching: buildIChingPrompt,
    face: buildFacePrompt,
  };

  const builder = builders[data.method];
  if (!builder) {
    throw new Error(`Unknown divination method: ${data.method}`);
  }

  return {
    system: SYSTEM_PROMPT,
    user: builder(data),
  };
}

module.exports = { buildPrompt };
