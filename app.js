const profiles = {
  serene: { temp: 72, condition: 'softly luminous', summary: 'A calm front is moving through. Expect long exhales and one excellent idea arriving without an appointment.', wind: 4, chance: 18, visibility: '∞', cls: 'mood-serene' },
  chaotic: { temp: 91, condition: 'scattered plot twists', summary: 'High-energy pockets are colliding near your calendar. Carry water, snacks, and a backup plan for the backup plan.', wind: 26, chance: 87, visibility: '??', cls: 'mood-chaotic' },
  cozy: { temp: 68, condition: 'blanket overcast', summary: 'A warm pressure system has settled behind your ribs. Excellent conditions for soup, soft socks, and ignoring one notification.', wind: 2, chance: 9, visibility: 'near', cls: 'mood-cozy' },
  electric: { temp: 84, condition: 'ideas with a charge', summary: 'Static is building along the edges of your attention. Lightning thoughts may arrive before the sentence is ready for them.', wind: 18, chance: 64, visibility: 'bright', cls: 'mood-electric' },
  wistful: { temp: 61, condition: 'blue-hour drizzle', summary: 'A slow-moving memory is passing overhead. It may feel cinematic. Keep a window nearby and let the soundtrack happen.', wind: 8, chance: 52, visibility: 'soft', cls: 'mood-wistful' }
};
const body = document.body;
const cards = [...document.querySelectorAll('.mood-card')];
let selected = 'serene';
function renderForecast() {
  const data = profiles[selected];
  body.className = data.cls;
  document.querySelector('#temperature').textContent = `${data.temp}°`;
  document.querySelector('#condition').textContent = data.condition;
  document.querySelector('#summary').textContent = data.summary;
  document.querySelector('#wind').textContent = data.wind;
  document.querySelector('#chance').textContent = data.chance;
  document.querySelector('#visibility').textContent = data.visibility;
  document.querySelector('#day').textContent = new Intl.DateTimeFormat(undefined, { weekday: 'long' }).format(new Date()).toUpperCase();
}
cards.forEach((card) => card.addEventListener('click', () => { selected = card.dataset.mood; cards.forEach((item) => item.classList.toggle('selected', item === card)); renderForecast(); }));
document.querySelector('#forecast').addEventListener('click', () => { renderForecast(); document.querySelector('.forecast').animate([{ transform: 'scale(.985)' }, { transform: 'scale(1)' }], { duration: 360, easing: 'ease-out' }); });
renderForecast();
