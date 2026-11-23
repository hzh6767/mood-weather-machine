const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// The browser loads forecast-core.js and app.js as two classic scripts that
// share one global lexical scope, so a top-level `const` in each file must not
// collide. Node's `require` gives every module its own scope and hides that,
// so run both files as scripts in a single shared context to model the page.
function fakeElement() {
  return {
    dataset: {},
    classList: { toggle() {} },
    setAttribute() {},
    addEventListener() {},
    animate() {},
    textContent: '',
    className: ''
  };
}

function loadPage(document, window = {}) {
  const context = vm.createContext({
    document, window
  });
  const core = fs.readFileSync(path.join(__dirname, '..', 'forecast-core.js'), 'utf8');
  const app = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
  vm.runInContext(core, context);
  vm.runInContext(app, context);
  return context;
}

test('forecast-core.js and app.js run together in a shared global scope', () => {
  const context = loadPage({
    body: fakeElement(),
    querySelectorAll: () => [],
    querySelector: fakeElement
  });
  assert.ok(context.ForecastCore, 'ForecastCore global should be exposed');
});

test('replay refreshes the forecast and only animates when motion is enabled', () => {
  const elements = new Map();
  function querySelector(selector) {
    if (!elements.has(selector)) elements.set(selector, fakeElement());
    return elements.get(selector);
  }
  let replay;
  let reduced = true;
  let animations = 0;
  querySelector('#forecast').addEventListener = (_, handler) => { replay = handler; };
  querySelector('.forecast').animate = () => { animations++; };
  loadPage({ body: fakeElement(), querySelectorAll: () => [], querySelector }, {
    matchMedia: query => ({ matches: query === '(prefers-reduced-motion: reduce)' && reduced })
  });
  querySelector('#temperature').textContent = '';
  replay();
  assert.strictEqual(querySelector('#temperature').textContent, '72°');
  assert.strictEqual(animations, 0);
  reduced = false;
  replay();
  assert.strictEqual(animations, 1);
  delete querySelector('.forecast').animate;
  assert.doesNotThrow(replay);
});
