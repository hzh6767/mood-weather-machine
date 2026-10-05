const forecastCore = typeof ForecastCore !== 'undefined' ? ForecastCore : require('./forecast-core.js');
const body = document.body;
const cards = [...document.querySelectorAll('.mood-card')];
let selected = 'serene';
function renderForecast() {
  const data = forecastCore.profiles[selected];
  body.className = data.cls;
  const el = {
    temp: document.querySelector('#temperature'),
    cond: document.querySelector('#condition'),
    summ: document.querySelector('#summary'),
    wind: document.querySelector('#wind'),
    chance: document.querySelector('#chance'),
    vis: document.querySelector('#visibility'),
    day: document.querySelector('#day')
  };
  if (Object.values(el).some(v => !v)) return;
  el.temp.textContent = `${data.temp}°`;
  el.cond.textContent = data.condition;
  el.summ.textContent = data.summary;
  el.wind.textContent = data.wind;
  el.chance.textContent = data.chance;
  el.vis.textContent = data.visibility;
  el.day.textContent = new Intl.DateTimeFormat(undefined, { weekday: 'long' }).format(new Date()).toUpperCase();
}
function selectMood(card) {
  selected = card.dataset.mood;
  cards.forEach((item) => {
    const on = item === card;
    item.classList.toggle('selected', on);
    item.setAttribute('aria-checked', String(on));
    item.setAttribute('tabindex', on ? '0' : '-1');
  });
  renderForecast();
}
cards.forEach((card) => {
  card.setAttribute('tabindex', card.classList.contains('selected') ? '0' : '-1');
  card.addEventListener('click', () => selectMood(card));
});
document.querySelector('.mood-grid').addEventListener('keydown', (event) => {
  const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key] || 0;
  if (!step && event.key !== 'Home' && event.key !== 'End') return;
  event.preventDefault();
  const at = Math.max(0, cards.indexOf(document.activeElement));
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? cards.length - 1 : (at + step + cards.length) % cards.length;
  cards[next].focus();
  selectMood(cards[next]);
});
document.querySelector('#forecast').addEventListener('click', () => { renderForecast(); document.querySelector('.forecast').animate([{ transform: 'scale(.985)' }, { transform: 'scale(1)' }], { duration: 360, easing: 'ease-out' }); });
renderForecast();
