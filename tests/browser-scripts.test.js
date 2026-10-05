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

test('forecast-core.js and app.js run together in a shared global scope', () => {
  const context = vm.createContext({
    document: {
      body: fakeElement(),
      querySelectorAll: () => [],
      querySelector: () => fakeElement()
    }
  });
  const core = fs.readFileSync(path.join(__dirname, '..', 'forecast-core.js'), 'utf8');
  const app = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
  vm.runInContext(core, context);
  vm.runInContext(app, context);
  assert.ok(context.ForecastCore, 'ForecastCore global should be exposed');
});
