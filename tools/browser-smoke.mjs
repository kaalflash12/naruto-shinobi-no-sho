import fs from 'node:fs';
import { chromium } from 'playwright';

const baseURL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const outPath = process.env.BROWSER_REPORT || 'audit/BROWSER-SMOKE.json';
const startedAt = new Date().toISOString();
const failures = [];
const pageErrors = [];
const consoleErrors = [];
const failedRuntimeRequests = [];

function fail(message) { failures.push(String(message)); }
function assert(condition, message) { if (!condition) fail(message); }

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();

page.on('pageerror', err => pageErrors.push(String(err?.stack || err?.message || err)));
page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
page.on('requestfailed', req => {
  const url = req.url();
  if (url.startsWith(baseURL) && /\.(?:js|css|json)(?:\?|$)/i.test(url)) failedRuntimeRequests.push({ url, error: req.failure()?.errorText || 'request failed' });
});
page.on('response', response => {
  const url = response.url();
  if (url.startsWith(baseURL) && response.status() >= 400 && /\.(?:js|css|json)(?:\?|$)/i.test(url)) failedRuntimeRequests.push({ url, status: response.status() });
});

try {
  const response = await page.goto(baseURL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  assert(response && response.ok(), `HTTP inicial inválido: ${response?.status() ?? 'sem resposta'}`);
  await page.waitForTimeout(2500);

  const title = await page.title();
  assert(title === 'NARUTO SHINOBI NO SHO • TERION 2D10', `Título inesperado: ${title}`);
  const brand = (await page.locator('.brand').innerText().catch(() => '')).trim();
  assert(/NARUTO SHINOBI NO SHO/i.test(brand), `Brand principal ausente: ${brand}`);

  const runtime = await page.evaluate(() => ({
    r41: !!window.__NARUTO_R41__,
    reset: typeof window.__SNS_LOCAL_RESET__?.run === 'function',
    resetKeys: typeof window.__SNS_LOCAL_RESET__?.keys === 'function',
    apiBuild: window.NARUTO_R41_API_BUILD || '',
    apiOrigin: window.NARUTO_R41_API_ORIGIN || '',
    backend: window.__R41_GITHUB_API__?.backend || ''
  }));
  assert(runtime.r41, 'window.__NARUTO_R41__ não foi inicializado');
  assert(runtime.reset && runtime.resetKeys, 'handler de reset local não foi carregado');
  assert(runtime.apiBuild === 'NARUTO-SHINOBI-NO-SHO-SUPABASE-POSTGRES', `API build inesperado: ${runtime.apiBuild}`);
  assert(runtime.backend === 'supabase-edge-postgres', `backend runtime inesperado: ${runtime.backend}`);
  assert(/^https:\/\/rlyiwlwzrdgvcwawrnpl\.supabase\.co\/functions\/v1\/shinobi-api\/?$/i.test(runtime.apiOrigin), `API origin Supabase inesperado: ${runtime.apiOrigin}`);

  await page.evaluate(() => {
    localStorage.setItem('sns-v841-account-save:e2e-browser:slot', 'e2e');
    const b = document.createElement('button');
    b.id = 'e2e-reset-button';
    b.dataset.action = 'reset';
    b.textContent = 'E2E reset';
    document.body.appendChild(b);
  });

  const beforeReset = await page.evaluate(() => ({
    hasKey: localStorage.getItem('sns-v841-account-save:e2e-browser:slot') === 'e2e',
    listed: window.__SNS_LOCAL_RESET__.keys().includes('sns-v841-account-save:e2e-browser:slot')
  }));
  assert(beforeReset.hasKey && beforeReset.listed, 'chave E2E não entrou no conjunto de progresso local');

  page.once('dialog', async dialog => { await dialog.accept(); });
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 30000 }),
    page.locator('#e2e-reset-button').click()
  ]);
  await page.waitForTimeout(1000);

  const afterReset = await page.evaluate(() => ({
    key: localStorage.getItem('sns-v841-account-save:e2e-browser:slot'),
    resetLoaded: typeof window.__SNS_LOCAL_RESET__?.run === 'function'
  }));
  assert(afterReset.key === null, 'reset local não removeu a chave de progresso E2E');
  assert(afterReset.resetLoaded, 'runtime de reset não voltou após reload');

  if (pageErrors.length) fail(`Exceções JavaScript no navegador: ${pageErrors.join(' | ')}`);
  if (failedRuntimeRequests.length) fail(`Recursos JS/CSS/JSON falharam: ${JSON.stringify(failedRuntimeRequests)}`);
  const fatalConsole = consoleErrors.filter(x => /uncaught|referenceerror|syntaxerror|typeerror|failed to load module/i.test(x));
  if (fatalConsole.length) fail(`Console fatal: ${fatalConsole.join(' | ')}`);

  const backendIdentity = runtime.apiBuild === 'NARUTO-SHINOBI-NO-SHO-SUPABASE-POSTGRES' &&
    runtime.backend === 'supabase-edge-postgres' &&
    /^https:\/\/rlyiwlwzrdgvcwawrnpl\.supabase\.co\/functions\/v1\/shinobi-api\/?$/i.test(runtime.apiOrigin);

  const report = {
    generatedAt: new Date().toISOString(), startedAt,
    status: failures.length ? 'FAIL_BROWSER_SMOKE' : 'PASS_BROWSER_SMOKE',
    ok: failures.length === 0,
    scope: 'LOCAL_HTTP_CHROMIUM_GITHUB_ACTIONS', baseURL,
    checks: {
      httpLoad: response?.ok() === true,
      publicIdentity: title === 'NARUTO SHINOBI NO SHO • TERION 2D10' && /NARUTO SHINOBI NO SHO/i.test(brand),
      r41RuntimeLoaded: runtime.r41,
      localResetHandlerLoaded: runtime.reset && runtime.resetKeys,
      localResetClickReload: afterReset.key === null && afterReset.resetLoaded,
      runtimeRequests: failedRuntimeRequests.length === 0,
      pageExceptions: pageErrors.length === 0,
      backendIdentity
    },
    api: { build: runtime.apiBuild, backend: runtime.backend, originConfigured: !!runtime.apiOrigin, origin: runtime.apiOrigin || null, liveBackendTestedElsewhere: true },
    failures,pageErrors,consoleErrors: consoleErrors.slice(0, 50),failedRuntimeRequests
  };

  fs.mkdirSync(new URL('../audit/', import.meta.url), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
  if (!report.ok) process.exitCode = 1;
} finally {
  await browser.close();
}
