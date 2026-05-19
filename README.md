# 天命算卦 — AI Chinese Fortune Teller

An AI-powered web application for Chinese fortune-telling readings, combining four traditional divination systems with modern AI interpretation.

## Features

- **Four divination methods:**
  - **八字 Bazi (Four Pillars of Destiny)** — birth chart analysis based on Heavenly Stems & Earthly Branches
  - **紫微斗数 Zi Wei Dou Shu (Purple Star Astrology)** — life palace and star-based personality insights
  - **易经 I Ching (Book of Changes)** — hexagram divination with coin-toss simulation and changing lines
  - **面相 Face Reading (Mian Xiang)** — personality insights from facial features

- **AI-generated readings** via the Anthropic Claude API, with structured bilingual prompts
- **Demo mode** — fully functional without an API key (returns high-quality pre-written readings)
- **Reading history** — past readings saved in localStorage for later review
- **Bilingual Chinese/English** interface throughout
- **Simplified Bazi calculator** — year/month/hour pillar, Five Elements balance
- **Complete 64-hexagram I Ching lookup table**
- **Dark-gold ink wash aesthetic** inspired by traditional Chinese calligraphy

## Tech Stack

- **Frontend:** Vanilla HTML, CSS, JavaScript
- **Backend:** Node.js + Express
- **AI API:** Anthropic Claude (via `@anthropic-ai/sdk`)
- **Storage:** localStorage (no database required)

## Getting Started

### Prerequisites

- Node.js 18+ installed

### Installation

```bash
git clone https://github.com/yding00006/AI-Chinese-Fortune-Teller.git
cd AI-Chinese-Fortune-Teller
npm install
```

### Environment Setup

```bash
cp .env.example .env
```

Edit `.env` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-...
```

If you leave `ANTHROPIC_API_KEY` empty or omit it, the app runs in **demo mode** — every reading returns a high-quality pre-written sample instead of calling the AI.

### Run Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Project Structure

```
├── server.js                 # Express backend (serves static files + API)
├── server/
│   ├── prompt-builder.js     # Method-specific AI prompt templates
│   └── demo-readings.js      # Pre-written demo readings (no API key needed)
├── src/
│   ├── components/
│   │   ├── homepage.js       # Hero section interactions
│   │   ├── method-selector.js# Divination method cards
│   │   ├── input-form.js     # Dynamic form + async API submission
│   │   ├── results-display.js# Loading / error / reading display
│   │   └── history.js        # localStorage reading history
│   ├── styles/
│   │   └── main.css          # Full site styling (dark-gold theme)
│   └── utils/
│       ├── helpers.js         # Zodiac, stems, branches, coin toss
│       ├── iching-hexagrams.js# Complete 64-hexagram lookup table
│       └── bazi-calculator.js # Simplified Four Pillars calculator
├── index.html                # Single-page entry point
├── .env.example              # Environment variable template
├── package.json
└── README.md
```

## API Endpoint

**POST** `/api/reading`

Request body:

```json
{
  "method": "bazi",
  "birthDate": "1990-05-15",
  "birthTime": "14:00",
  "gender": "female"
}
```

Response:

```json
{
  "success": true,
  "readingHTML": "<h3>...</h3><p>...</p>",
  "isDemo": false
}
```

## Demo Mode

When no `ANTHROPIC_API_KEY` is set, the server automatically returns demo readings. Demo readings are clearly labeled with a badge so users know they are sample content. This makes it easy to develop, present, and test the app without incurring API costs.

## Known Limitations

- **Bazi day pillar** requires a full sexagenary-cycle lookup table and is marked as estimated. Year and hour pillars are accurate; month pillar uses the Five Tiger rule.
- **Zi Wei Dou Shu** relies on AI interpretation rather than a full computational star-chart engine.
- **Face Reading** is text-based (describe your features) — no image upload or computer vision.
- **I Ching changing lines** are generated client-side via simulated coin tosses; the transformed hexagram is computed but interpretation depth depends on the AI model.

## Disclaimer

⚠️ **All readings are for entertainment and cultural exploration purposes only.**

This application does not provide medical, legal, financial, or psychological advice. Fortune-telling traditions are presented as cultural heritage and reflective tools, not as factual predictions. Face Reading features do not infer identity traits, make medical claims, or store images.

本网站所有解读仅供娱乐和文化探索之用。

---

Built by [Yu Ding](mailto:yding06@stanford.edu) · Stanford University · 2026
