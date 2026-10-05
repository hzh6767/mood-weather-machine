const profiles = {
  serene: { temp: 72, condition: 'softly luminous', summary: 'A calm front is moving through. Expect long exhales and one excellent idea arriving without an appointment.', wind: 4, chance: 18, visibility: '∞', cls: 'mood-serene' },
  chaotic: { temp: 91, condition: 'scattered plot twists', summary: 'High-energy pockets are colliding near your calendar. Carry water, snacks, and a backup plan for the backup plan.', wind: 26, chance: 87, visibility: '??', cls: 'mood-chaotic' },
  cozy: { temp: 68, condition: 'blanket overcast', summary: 'A warm pressure system has settled behind your ribs. Excellent conditions for soup, soft socks, and ignoring one notification.', wind: 2, chance: 9, visibility: 'near', cls: 'mood-cozy' },
  electric: { temp: 84, condition: 'ideas with a charge', summary: 'Static is building along the edges of your attention. Lightning thoughts may arrive before the sentence is ready for them.', wind: 18, chance: 64, visibility: 'bright', cls: 'mood-electric' },
  wistful: { temp: 61, condition: 'blue-hour drizzle', summary: 'A slow-moving memory is passing overhead. It may feel cinematic. Keep a window nearby and let the soundtrack happen.', wind: 8, chance: 52, visibility: 'soft', cls: 'mood-wistful' }
};

function getForecast(mood) {
  return Object.prototype.hasOwnProperty.call(profiles, mood) ? profiles[mood] : null;
}

function getAvailableMoods() {
  return Object.keys(profiles);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getForecast, getAvailableMoods, profiles };
} else if (typeof globalThis !== 'undefined') {
  globalThis.ForecastCore = { getForecast, getAvailableMoods, profiles };
}
