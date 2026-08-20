import fs from 'node:fs';
import { chromium } from 'playwright';

const baseURL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const outPath = process.env.OPERATIONAL_BROWSER_REPORT || 'audit/BROWSER-OPERATIONAL-E2E.json';
const failures = [];
const pageErrors = [];
const consoleErrors = [];

function assert(value, message) { if (!value) failures.push(String(message)); }

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
page.on('pageerror', e => pageErrors.push(String(e?.stack || e?.message || e)));
page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });

async function clickCurrentRound() {
  await page.locator('[data-r41-game]').first().waitFor({ state: 'visible', timeout: 10000 });
  const action = await page.locator('[data-r41-game]').first().getAttribute('data-r41-game');

  if (action === 'seq') {
    // The reveal has already disappeared when seq buttons become visible. The sequence is
    // copied by an init-script MutationObserver below before that happens.
    const seq = await page.evaluate(() => Array.isArray(window.__E2E_LAST_SEQUENCE__) ? [...window.__E2E_LAST_SEQUENCE__] : []);
    if (!seq.length) throw new Error('Sequencia do minijogo nao foi capturada.');
    for (const symbol of seq) {
      await page.locator(`[data-r41-game="seq"][data-symbol="${symbol}"]`).click();
    }
    return;
  }

  if (action === 'timing-hit') {
    await page.locator('[data-r41-game="timing-hit"]').click();
    return;
  }

  const good = page.locator('[data-r41-game][data-good="1"]').first();
  if (await good.count()) {
    await good.click();
    return;
  }

  throw new Error(`Acao de minijogo sem estrategia E2E: ${action}`);
}

async function play(type) {
  await page.evaluate(type => {
    window.__E2E_MINIGAME_RESULT__ = null;
    window.__E2E_MINIGAME_ERROR__ = null;
    Promise.resolve(window.__NARUTO_R41__.playMinigame(type))
      .then(result => { window.__E2E_MINIGAME_RESULT__ = result; })
      .catch(error => { window.__E2E_MINIGAME_ERROR__ = String(error?.stack || error); });
  }, type);

  for (let round = 0; round < 5; round++) {
    // Sequence rounds render the reveal before the interactive buttons.
    const reveal = page.locator('.r41-sequence.reveal');
    if (await reveal.count()) {
      const symbols = await reveal.locator('b').allTextContents();
      await page.evaluate(symbols => { window.__E2E_LAST_SEQUENCE__ = symbols; }, symbols);
    }

    // If sequence reveal appears asynchronously, poll and capture it until buttons exist.
    const deadline = Date.now() + 10000;
    while (Date.now() < deadline) {
      const currentReveal = page.locator('.r41-sequence.reveal');
      if (await currentReveal.count()) {
        const symbols = await currentReveal.locator('b').allTextContents();
        if (symbols.length) await page.evaluate(symbols => { window.__E2E_LAST_SEQUENCE__ = symbols; }, symbols);
      }
      if (await page.locator('[data-r41-game]').count()) break;
      await page.waitForTimeout(60);
    }

    await clickCurrentRound();
    await page.waitForTimeout(80);
  }

  await page.waitForFunction(() => window.__E2E_MINIGAME_RESULT__ || window.__E2E_MINIGAME_ERROR__, null, { timeout: 10000 });
  const result = await page.evaluate(() => ({ result: window.__E2E_MINIGAME_RESULT__, error: window.__E2E_MINIGAME_ERROR__ }));
  if (result.error) throw new Error(`${type}: ${result.error}`);
  if (!result.result || !Number.isFinite(Number(result.result.score)) || !Number.isFinite(Number(result.result.errors))) {
    throw new Error(`${type}: resultado normalizado invalido ${JSON.stringify(result.result)}`);
  }
  return result.result;
}

const results = {};
try {
  const response = await page.goto(baseURL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  assert(response?.ok(), `HTTP inicial invalido: ${response?.status()}`);
  await page.waitForFunction(() => !!window.__NARUTO_R41__, null, { timeout: 30000 });

  const types = await page.evaluate(() => window.__NARUTO_R41__.minigames);
  assert(Array.isArray(types), 'Lista de minijogos R41 ausente.');
  assert(types.length === 20, `Esperados 20 minijogos; encontrados ${types.length}.`);

  for (const type of types) {
    try {
      results[type] = await play(type);
    } catch (error) {
      failures.push(String(error?.stack || error?.message || error));
      // Clear a broken modal so the next test can still expose additional failures.
      await page.evaluate(() => { const root = document.getElementById('modal-root'); if (root) root.innerHTML = ''; });
    }
  }

  const state = await page.evaluate(() => window.__NARUTO_R41__.state());
  const total = Number(state?.minigames?.total || 0);
  assert(total >= types.length, `Historico R41 registrou ${total}; esperado ao menos ${types.length}.`);
  for (const type of types) {
    assert(Number(state?.minigames?.byType?.[type] || 0) >= 1, `Minijogo ${type} nao foi registrado no estado R41.`);
  }

  const fatalConsole = consoleErrors.filter(x => /uncaught|referenceerror|syntaxerror|typeerror|failed to load module/i.test(x));
  if (pageErrors.length) failures.push(`Excecoes JS: ${pageErrors.join(' | ')}`);
  if (fatalConsole.length) failures.push(`Console fatal: ${fatalConsole.join(' | ')}`);

  const report = {
    generatedAt: new Date().toISOString(),
    status: failures.length ? 'FAIL_BROWSER_OPERATIONAL_E2E' : 'PASS_BROWSER_OPERATIONAL_E2E',
    ok: failures.length === 0,
    scope: 'REAL_CHROMIUM_R41_MINIGAME_INTERACTION',
    baseURL,
    expectedMinigames: 20,
    testedMinigames: Object.keys(results).length,
    types,
    results,
    stateEvidence: { total, byType: state?.minigames?.byType || {} },
    pageErrors,
    consoleErrors: consoleErrors.slice(0, 50),
    failures
  };
  fs.mkdirSync('audit', { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
  if (!report.ok) process.exitCode = 1;
} finally {
  await browser.close();
}
