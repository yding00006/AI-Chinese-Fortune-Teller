# Divination Systems Research Notes

## 1. 八字 (Bazi) — Four Pillars of Destiny

### Overview
Bazi uses the Chinese calendar to derive four "pillars" from a person's birth year, month, day, and hour. Each pillar consists of a Heavenly Stem and an Earthly Branch, together encoding the person's destiny blueprint.

### Required Inputs
- Birth date (year, month, day)
- Birth time (2-hour Chinese hour blocks)
- Gender (for luck cycle direction)

### Key Concepts
- Five Elements (五行): Wood, Fire, Earth, Metal, Water
- Ten Heavenly Stems (天干)
- Twelve Earthly Branches (地支)
- Day Master (日主): the stem of the day pillar, representing the self
- Ten Gods (十神): relationships between elements

### Output Structure
- Four Pillars chart
- Day Master analysis
- Element balance assessment
- Major life themes (career, relationships, health, wealth)
- 10-year luck cycles overview

---

## 2. 紫微斗数 (Zi Wei Dou Shu) — Purple Star Astrology

### Overview
A star-chart-based system that maps 14 major stars and dozens of minor stars into 12 palaces, each governing a life domain.

### Required Inputs
- Birth date (lunar calendar)
- Birth time (2-hour blocks)
- Gender

### Key Concepts
- 14 Major Stars (e.g., 紫微, 天机, 太阳, 武曲, etc.)
- 12 Palaces (命宫 Life, 兄弟 Siblings, 夫妻 Spouse, 子女 Children, 财帛 Wealth, 疾厄 Health, 迁移 Travel, 交友 Friends, 官禄 Career, 田宅 Property, 福德 Fortune, 父母 Parents)
- Star brightness levels (庙, 旺, 得, 利, 平, 不, 陷)

### Output Structure
- Star chart with palace placements
- Life Palace (命宫) primary reading
- Key palace analyses
- Notable star combinations and their meanings

---

## 3. 易经 (I Ching) — Book of Changes

### Overview
The I Ching uses 64 hexagrams (each composed of six lines, broken or unbroken) to provide wisdom and guidance for specific questions or situations.

### Required Inputs
- A specific question or situation
- Virtual coin toss (3 coins × 6 times) or yarrow stalk simulation

### Key Concepts
- 8 Trigrams (八卦): ☰ Qian, ☷ Kun, ☳ Zhen, ☴ Xun, ☵ Kan, ☲ Li, ☶ Gen, ☱ Dui
- 64 Hexagrams: combinations of two trigrams
- Changing lines: lines that transform, producing a second hexagram
- Judgment (彖辞) and Image (象辞) texts

### Output Structure
- Primary hexagram with name and number
- Hexagram visual representation
- Judgment and image interpretation
- Individual line readings (especially changing lines)
- Transformed hexagram (if applicable)
- Practical guidance for the question

---

## 4. 面相 (Face Reading) — Physiognomy

### Overview
Face reading analyzes facial features to reveal personality traits, fortune tendencies, and life predictions based on the proportions and characteristics of facial areas.

### Required Inputs
- Face photo (front-facing)
- Optional: specific area of interest (career, relationships, health)

### Key Concepts
- Three Zones: Upper (forehead - early life), Middle (eyebrows to nose - middle age), Lower (mouth to chin - later life)
- Five Officers (五官): eyebrows, eyes, nose, mouth, ears
- Twelve Palaces of the face
- Moles and marks interpretation

### Output Structure
- Overall face shape analysis
- Three Zones balance reading
- Key feature interpretations
- Life phase predictions
- Personality trait analysis

---

## Design Considerations

### Cultural Sensitivity
- Present all methods with respect for their cultural origins
- Avoid trivializing or mocking traditional practices
- Use authentic terminology with clear translations
- Include entertainment disclaimer prominently

### Prompt Engineering Notes
- Each method requires a distinct prompt template
- Prompts must encode the logical rules of each system
- Output should blend traditional language with modern accessibility
- Readings should feel personalized, not generic
- Include both English and Chinese in outputs where appropriate
