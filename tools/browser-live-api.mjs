import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const gameBase = String(process.env.PUBLIC_GAME_URL || 'https://kaalflash12.github.io/naruto-shinobi-no-sho/').trim();
const apiOrigin = String(process.env.API_ORIGIN || '').trim().replace(/\/+$/g, '');
const outPath = process.env.BROWSER_LIVE_REPORT || 'audit/BROWSER-LIVE-API.json';
const startedAt = new Date().toISOString();
const failures = [];
const pageErrors = [];
const consoleErrors = [];

function assert(cond, msg) { if (!cond) failures.push(String(msg)); }

const join = gameBase.includes('?') ? '&' : '?';
const url = `${gameBase}${join}api=${encodeURIComponent(apiOrigin)}`;
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();

page.on('pageerror', err => pageErrors.push(String(err?.stack || err?.message || err)));
page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });

let runtime = {};
let status = null;
let unauthorized = null;
try {
  assert(/^https:\/\/[^/]+/i.test(apiOrigin), 'API_ORIGIN inválido.');
  const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
  assert(response?.ok(), `GitHub Pages HTTP inválido: ${response?.status() ?? 'sem resposta'}`);
  await page.waitForTimeout(3500);

  const title = await page.title();
  const brand = (await page.locator('.brand').innerText().catch(() => '')).trim();
  assert(title === 'NARUTO SHINOBI NO SHO • TERION 2D10', `Título inesperado: ${title}`);
  assert(/NARUTO SHINOBI NO SHO/i.test(brand), `Brand ausente: ${brand}`);

  runtime = await page.evaluate(() => ({
    r41: !!window.__NARUTO_R41__,
    apiBuild: window.NARUTO_R41_API_BUILD || '',
    apiOrigin: window.NARUTO_R41_API_ORIGIN || ''
  }));
  assert(runtime.r41, 'runtime R41 não carregou.');
  assert(runtime.apiBuild === 'NARUTO-SHINOBI-NO-SHO-CLOUDFLARE-MONGODB', `API build inesperado: ${runtime.apiBuild}`);
  assert(runtime.apiOrigin === apiOrigin, `Frontend não adotou API_ORIGIN live. Esperado ${apiOrigin}; obtido ${runtime.apiOrigin}`);

  status = await page.evaluate(async origin => {
    const r = await fetch(`${origin}/api/status`, {
      method: 'GET',
      headers: { accept: 'application/json' }
    });
    let data = null;
    try { data = await r.json(); } catch {}
    return { status: r.status, ok: r.ok, data };
  }, apiOrigin);
  assert(status.ok && status.status === 200, `CORS/status live falhou: ${JSON.stringify(status)}`);
  assert(status.data?.configured === true, `Worker live não configurado: ${JSON.stringify(status.data)}`);
  assert(status.data?.cloudSave === true, 'Frontend viu Worker sem cloudSave.');
  assert(status.data?.onlineRooms === true, 'Frontend viu Worker sem Durable Objects.');

  unauthorized = await page.evaluate(async origin => {
    const r = await fetch(`${origin}/api/account/slots`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{}'
    });
    let data = null;
    try { data = await r.json(); } catch {}
    return { status: r.status, data };
  }, apiOrigin);
  assert(unauthorized.status === 401 && unauthorized.data?.error === 'UNAUTHORIZED',
    `CORS de rota protegida não retornou 401 esperado: ${JSON.stringify(unauthorized)}`);

  if (pageErrors.length) failures.push(`Exceções JS: ${pageErrors.join(' | ')}`);
  const fatalConsole = consoleErrors.filter(x => /uncaught|referenceerror|syntaxerror|typeerror|failed to load module/i.test(x));
  if (fatalConsole.length) failures.push(`Console fatal: ${fatalConsole.join(' | ')}`);
} catch (error) {
  failures.push(String(error?.stack || error?.message || error));
} finally {
  const report = {
    generatedAt: new Date().toISOString(),
    startedAt,
    status: failures.length ? 'FAIL_BROWSER_LIVE_API' : 'PASS_BROWSER_LIVE_API',
    ok: failures.length === 0,
    scope: 'PUBLIC_GITHUB_PAGES_TO_CLOUDFLARE_WORKER',
    gameURL: gameBase,
    apiOrigin: apiOrigin || null,
    runtime,
    workerStatus: status,
    unauthorizedProbe: unauthorized,
    pageErrors,
    consoleErrors: consoleErrors.slice(0, 50),
    failures
  };
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
  if (!report.ok) process.exitCode = 1;
}
