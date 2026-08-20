import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const gameBase = String(process.env.PUBLIC_GAME_URL || 'https://kaalflash12.github.io/naruto-shinobi-no-sho/').trim();
const apiOrigin = String(process.env.API_ORIGIN || 'https://rlyiwlwzrdgvcwawrnpl.supabase.co/functions/v1/shinobi-api').trim().replace(/\/+$/g, '');
const apiKey = String(process.env.SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_S9LtSpLhLKFOU9iSd8b4yQ_EziH1Arr').trim();
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
page.on('pageerror', e => pageErrors.push(String(e?.stack || e?.message || e)));
page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });

let runtime = {};
let status = null;
let unauthorized = null;
try {
  assert(/^https:\/\/[^/]+/i.test(apiOrigin), 'API_ORIGIN inválido.');
  assert(/^sb_publishable_/i.test(apiKey) || /^eyJ/i.test(apiKey), 'SUPABASE_PUBLISHABLE_KEY inválida.');

  let response = null;
  for (let i = 0; i < 20; i++) {
    response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 }).catch(() => null);
    if (response?.ok()) break;
    await page.waitForTimeout(3000);
  }
  assert(response?.ok(), `GitHub Pages HTTP inválido: ${response?.status() ?? 'sem resposta'}`);
  await page.waitForTimeout(3000);

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
  assert(runtime.apiBuild === 'NARUTO-SHINOBI-NO-SHO-SUPABASE-ONLINE', `API build inesperado: ${runtime.apiBuild}`);
  assert(runtime.apiOrigin === apiOrigin, `Frontend não adotou API live. Esperado ${apiOrigin}; obtido ${runtime.apiOrigin}`);

  status = await page.evaluate(async ({ origin, key }) => {
    const pageOrigin = location.origin;
    const r = await fetch(`${origin}/api/status`, {
      mode: 'cors',
      headers: { accept: 'application/json', apikey: key }
    });
    let data = null;
    try { data = await r.json(); } catch {}
    return {
      status: r.status,
      ok: r.ok,
      data,
      cors: pageOrigin,
      corsEnforcedByBrowser: r.type === 'cors' || r.type === 'basic'
    };
  }, { origin: apiOrigin, key: apiKey });

  assert(status.ok && status.status === 200, `CORS/status live falhou: ${JSON.stringify(status)}`);
  assert(status.corsEnforcedByBrowser === true, `Navegador não confirmou CORS: ${JSON.stringify(status)}`);
  assert(status.data?.configured === true, `Backend live não configurado: ${JSON.stringify(status.data)}`);
  assert(status.data?.cloudSave === true, 'Frontend viu backend sem cloudSave.');
  assert(status.data?.onlineRooms === true, 'Frontend viu backend sem onlineRooms.');
  assert(status.data?.storage === 'supabase-postgres', `Storage inesperado: ${status.data?.storage}`);
  assert(status.cors === 'https://kaalflash12.github.io', `Origem pública inesperada: ${status.cors}`);

  unauthorized = await page.evaluate(async ({ origin, key }) => {
    const r = await fetch(`${origin}/api/account/slots`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'content-type': 'application/json', apikey: key },
      body: '{}'
    });
    let data = null;
    try { data = await r.json(); } catch {}
    return { status: r.status, data };
  }, { origin: apiOrigin, key: apiKey });

  assert(unauthorized.status === 401 && unauthorized.data?.error === 'UNAUTHORIZED', `Rota protegida não retornou 401: ${JSON.stringify(unauthorized)}`);

  if (pageErrors.length) failures.push(`Exceções JS: ${pageErrors.join(' | ')}`);
  const fatal = consoleErrors.filter(x => /uncaught|referenceerror|syntaxerror|typeerror|failed to load module/i.test(x));
  if (fatal.length) failures.push(`Console fatal: ${fatal.join(' | ')}`);
} catch (error) {
  failures.push(String(error?.stack || error?.message || error));
} finally {
  const report = {
    generatedAt: new Date().toISOString(),
    startedAt,
    status: failures.length ? 'FAIL_BROWSER_LIVE_API' : 'PASS_BROWSER_LIVE_API',
    ok: failures.length === 0,
    scope: 'PUBLIC_GITHUB_PAGES_TO_SUPABASE_EDGE',
    gameURL: gameBase,
    apiOrigin,
    runtime,
    backendStatus: status,
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
