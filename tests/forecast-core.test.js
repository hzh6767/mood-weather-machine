const { test } = require('node:test');
const assert = require('node:assert');
const { getForecast, getAvailableMoods, profiles } = require('../forecast-core.js');

test('getForecast returns correct profile for valid mood', () => {
  const forecast = getForecast('serene');
  assert.strictEqual(forecast.temp, 72);
  assert.strictEqual(forecast.condition, 'softly luminous');
  assert.strictEqual(forecast.cls, 'mood-serene');
  assert.strictEqual(forecast.wind, 4);
  assert.strictEqual(forecast.chance, 18);
  assert.strictEqual(forecast.visibility, '∞');
  assert.ok(forecast.summary.includes('calm front'));
});

test('getForecast returns null for invalid mood', () => {
  const forecast = getForecast('nonexistent');
  assert.strictEqual(forecast, null);
});

test('getAvailableMoods returns all five moods', () => {
  const moods = getAvailableMoods();
  assert.strictEqual(moods.length, 5);
  assert.ok(moods.includes('serene'));
  assert.ok(moods.includes('chaotic'));
  assert.ok(moods.includes('cozy'));
  assert.ok(moods.includes('electric'));
  assert.ok(moods.includes('wistful'));
});

test('all moods have required fields', () => {
  const required = ['temp', 'condition', 'summary', 'wind', 'chance', 'visibility', 'cls'];
  for (const mood of getAvailableMoods()) {
    const forecast = getForecast(mood);
    for (const field of required) {
      assert.ok(field in forecast, `${mood} missing ${field}`);
    }
  }
});

test('temperature values are numeric', () => {
  for (const mood of getAvailableMoods()) {
    const forecast = getForecast(mood);
    assert.strictEqual(typeof forecast.temp, 'number');
    assert.ok(forecast.temp > 0 && forecast.temp < 120);
  }
});

test('wind and chance are numeric', () => {
  for (const mood of getAvailableMoods()) {
    const forecast = getForecast(mood);
    assert.strictEqual(typeof forecast.wind, 'number');
    assert.strictEqual(typeof forecast.chance, 'number');
    assert.ok(forecast.wind >= 0);
    assert.ok(forecast.chance >= 0 && forecast.chance <= 100);
  }
});

test('class names match mood', () => {
  for (const mood of getAvailableMoods()) {
    const forecast = getForecast(mood);
    assert.strictEqual(forecast.cls, `mood-${mood}`);
  }
});
