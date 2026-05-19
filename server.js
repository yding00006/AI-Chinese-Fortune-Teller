/**
 * server.js — Express backend for AI Chinese Fortune Teller
 * Serves static frontend and provides API endpoints:
 *   POST /api/reading        — generate a divination reading
 *   GET  /api/health          — health check with feature detection
 *   GET  /api/calendar/:date  — Chinese lunar calendar lookup
 *   GET  /api/history         — server-side reading history
 *   GET  /api/history/:id     — single reading by ID
 *   GET  /api/history/stats   — reading statistics
 *   DELETE /api/history/:id   — delete a reading
 *   DELETE /api/history       — clear all history
 */

require('dotenv').config();
const express = require('express');
const path = require('path');
const { buildPrompt } = require('./server/prompt-builder');
const { getDemoReading } = require('./server/demo-readings');
const { validateReadingRequest, formatValidationErrors } = require('./server/validator');
const readingStore = require('./server/reading-store');
const lunarCalendar = require('./server/lunar-calendar');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

/** Determine if API key is configured */
function hasApiKey() {
  const k = process.env.ANTHROPIC_API_KEY;
  return !!(k && k !== 'your_api_key_here' && k.trim() !== '');
}

// ─── POST /api/reading ──────────────────────────────────────────────
app.post('/api/reading', async (req, res) => {
  try {
    const data = req.body;

    // Structured validation
    const errors = validateReadingRequest(data);
    if (errors.length > 0) {
      return res.status(400).json(formatValidationErrors(errors));
    }

    // Enrich bazi/ziwei with lunar calendar data
    if ((data.method === 'bazi' || data.method === 'ziwei') && data.birthDate) {
      const calInfo = lunarCalendar.getCalendarInfo(data.birthDate);
      if (calInfo) {
        data.calendarInfo = calInfo;
      }
    }

    const isDemo = !hasApiKey();
    let readingHTML;

    if (isDemo) {
      console.log(`[Demo Mode] Generating demo reading for method: ${data.method}`);
      readingHTML = getDemoReading(data);
    } else {
      // Build the prompt (now enriched with calendar data)
      const prompt = buildPrompt(data);
      const model = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514';

      console.log(`[API] Calling ${model} for method: ${data.method}`);

      const Anthropic = require('@anthropic-ai/sdk');
      const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

      const message = await client.messages.create({
        model,
        max_tokens: 8192,
        system: prompt.system,
        messages: [{ role: 'user', content: prompt.user }],
      });

      readingHTML = message.content
        .filter((block) => block.type === 'text')
        .map((block) => block.text)
        .join('');

      if (!readingHTML) {
        throw new Error('Empty response from AI API');
      }

      console.log(`[API] Reading generated successfully for method: ${data.method}`);
    }

    // Build input summary for history
    const summaryParts = [];
    if (data.birthDate) summaryParts.push(`Born: ${data.birthDate}`);
    if (data.birthTime && data.birthTime !== 'unknown') summaryParts.push(`Time: ${data.birthTime}`);
    if (data.gender) summaryParts.push(`Gender: ${data.gender}`);
    if (data.question) summaryParts.push(`Q: ${data.question.substring(0, 60)}`);
    if (data.faceShape) summaryParts.push(`Shape: ${data.faceShape}`);

    // Method display names
    const METHOD_NAMES = {
      bazi: { name: 'Bazi', cn: '八字' },
      ziwei: { name: 'Zi Wei Dou Shu', cn: '紫微斗数' },
      iching: { name: 'I Ching', cn: '易经' },
      face: { name: 'Face Reading', cn: '面相' },
    };
    const methodInfo = METHOD_NAMES[data.method] || { name: data.method, cn: '' };

    // Save to server-side history
    readingStore.addReading({
      method: data.method,
      methodName: methodInfo.name,
      methodCn: methodInfo.cn,
      inputSummary: summaryParts.join(' | '),
      readingHTML,
      isDemo,
    });

    return res.json({
      success: true,
      readingHTML,
      demo: isDemo,
      calendarInfo: data.calendarInfo || null,
    });
  } catch (err) {
    console.error('[API Error]', err.message || err);

    let errorMsg = 'The reading could not be generated. Please try again.';
    if (err.status === 401) {
      errorMsg = 'Invalid API key. Please check your ANTHROPIC_API_KEY in .env.';
    } else if (err.status === 429) {
      errorMsg = 'Rate limit reached. Please wait a moment and try again.';
    } else if (err.status === 529 || err.status === 503) {
      errorMsg = 'The AI service is temporarily busy. Please try again in a moment.';
    }

    return res.status(500).json({ success: false, error: errorMsg });
  }
});

// ─── GET /api/calendar/:date ────────────────────────────────────────
app.get('/api/calendar/:date', (req, res) => {
  const info = lunarCalendar.getCalendarInfo(req.params.date);
  if (!info) {
    return res.status(400).json({
      error: 'Invalid date. Use YYYY-MM-DD format, between 1900 and 2100.',
    });
  }
  res.json(info);
});

// ─── GET /api/history/stats ─────────────────────────────────────────
// NOTE: must be before /api/history/:id so "stats" isn't treated as an ID
app.get('/api/history/stats', (req, res) => {
  res.json(readingStore.getStats());
});

// ─── GET /api/history ───────────────────────────────────────────────
app.get('/api/history', (req, res) => {
  const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 50);
  const method = req.query.method || null;
  res.json(readingStore.getReadings({ limit, method }));
});

// ─── GET /api/history/:id ───────────────────────────────────────────
app.get('/api/history/:id', (req, res) => {
  const reading = readingStore.getReadingById(req.params.id);
  if (!reading) {
    return res.status(404).json({ error: 'Reading not found.' });
  }
  res.json(reading);
});

// ─── DELETE /api/history/:id ────────────────────────────────────────
app.delete('/api/history/:id', (req, res) => {
  const deleted = readingStore.deleteReading(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Reading not found.' });
  }
  res.json({ success: true });
});

// ─── DELETE /api/history ────────────────────────────────────────────
app.delete('/api/history', (req, res) => {
  readingStore.clearAll();
  res.json({ success: true });
});

// ─── GET /api/health — with feature detection ───────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    version: '0.2.0',
    mode: hasApiKey() ? 'ai' : 'demo',
    model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514',
    features: ['readings', 'history', 'calendar', 'validation'],
  });
});

// Fallback: serve index.html for SPA-like behavior
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🏮 Chinese Fortune Teller running at http://localhost:${PORT}`);
  console.log(`   Mode: ${hasApiKey() ? '🤖 AI (Claude API)' : '📖 Demo (no API key)'}`);
  console.log(`   Features: readings, history, calendar, validation`);
  if (!hasApiKey()) {
    console.log('   → Add ANTHROPIC_API_KEY to .env for AI-generated readings\n');
  }
});
