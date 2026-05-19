/**
 * reading-store.js — Server-side persistent storage for reading history
 *
 * Stores readings as JSON on disk so they survive browser clears and
 * server restarts. Lightweight MVP — no database required.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATA_DIR = path.join(__dirname, '..', 'data');
const HISTORY_FILE = path.join(DATA_DIR, 'readings.json');
const MAX_ENTRIES = 50;

/**
 * Ensure data directory exists
 */
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

/**
 * Load all readings from disk
 */
function loadReadings() {
  ensureDataDir();
  if (!fs.existsSync(HISTORY_FILE)) return [];
  try {
    const raw = fs.readFileSync(HISTORY_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Save readings to disk
 */
function saveReadings(readings) {
  ensureDataDir();
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(readings, null, 2), 'utf-8');
}

/**
 * Add a new reading to the store
 */
function addReading(entry) {
  const readings = loadReadings();
  const record = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    method: entry.method,
    methodName: entry.methodName || entry.method,
    methodCn: entry.methodCn || '',
    inputSummary: entry.inputSummary || '',
    isDemo: entry.isDemo || false,
    // Store a truncated version of HTML to avoid bloating disk
    readingPreview: (entry.readingHTML || '').replace(/<[^>]*>/g, ' ').trim().substring(0, 200),
    readingHTML: entry.readingHTML || '',
  };

  readings.unshift(record);

  // Cap entries
  if (readings.length > MAX_ENTRIES) {
    readings.length = MAX_ENTRIES;
  }

  saveReadings(readings);
  return record;
}

/**
 * Get recent readings, optionally filtered by method
 */
function getReadings({ limit = 20, method = null } = {}) {
  let readings = loadReadings();
  if (method) {
    readings = readings.filter((r) => r.method === method);
  }
  return {
    entries: readings.slice(0, limit),
    total_count: readings.length,
  };
}

/**
 * Get a single reading by ID
 */
function getReadingById(id) {
  const readings = loadReadings();
  return readings.find((r) => r.id === id) || null;
}

/**
 * Get summary stats
 */
function getStats() {
  const readings = loadReadings();
  const methodCounts = {};
  for (const r of readings) {
    methodCounts[r.method] = (methodCounts[r.method] || 0) + 1;
  }

  const today = new Date().toISOString().slice(0, 10);
  const todayCount = readings.filter((r) => r.timestamp.startsWith(today)).length;

  return {
    total_readings: readings.length,
    today_readings: todayCount,
    by_method: methodCounts,
    last_reading: readings.length > 0 ? readings[0].timestamp : null,
  };
}

/**
 * Delete a reading by ID
 */
function deleteReading(id) {
  const readings = loadReadings();
  const index = readings.findIndex((r) => r.id === id);
  if (index === -1) return false;
  readings.splice(index, 1);
  saveReadings(readings);
  return true;
}

/**
 * Clear all readings
 */
function clearAll() {
  saveReadings([]);
  return true;
}

module.exports = {
  addReading,
  getReadings,
  getReadingById,
  getStats,
  deleteReading,
  clearAll,
};
