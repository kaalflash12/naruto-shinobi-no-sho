import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const site = process.env.PUBLIC_GAME_URL || 'https://kaalflash12.github.io/naruto-shinobi-no-sho/';
const out = process.env.OPERATIONAL_PROBE_REPORT || 'audit/BROWSER-OPERATIONAL-PROBE.json';
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
const pageErrors = [];
const consoleErrors = [];
page.on('pageerror', e => pageErrors.push(String(e?.stack || e)));
page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });

const patterns = /r41|r27|rest|hospital|mini|combat|mission|kurai|world|injur|wound|save|online|visual|chakra|terion/i;
const result = { generatedAt: new Date().toISOString(), site, ok: false, status: 'PROBE_STARTED', pageErrors, consoleErrors };

try {
  const resp = await page.goto(`${site}?operationalProbe=1&v=${Date.now()}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  if (!resp?.ok()) throw new Error(`site HTTP ${resp?.status()}`);
  await page.waitForTimeout(6000);

  result.title = await page.title();
  result.url = page.url();
  result.runtime = await page.evaluate(() => ({
    r41: !!window.__NARUTO_R41__,
    apiBuild: window.NARUTO_R41_API_BUILD || null,
    apiOrigin: window.NARUTO_R41_API_ORIGIN || null,
    accountBuild: window.SNS_ACCOUNT_UI?.build || null,
    readyState: document.readyState
  }));

  result.globals = await page.evaluate(source => {
    const re = new RegExp(source, 'i');
    return Object.getOwnPropertyNames(window)
      .filter(k => re.test(k))
      .sort()
      .slice(0, 500)
      .map(k => {
        let type = 'unknown';
        try { type = typeof window[k]; } catch {}
        return { name: k, type };
      });
  }, patterns.source);

  result.buttons = await page.locator('button, [role="button"], input[type="button"], input[type="submit"]').evaluateAll(nodes => nodes.slice(0, 800).map((el, i) => ({
    i,
    tag: el.tagName,
    id: el.id || null,
    testid: el.getAttribute('data-testid'),
    action: el.getAttribute('data-action'),
    text: (el.innerText || el.value || el.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 180),
    visible: !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length)
  })).filter(x => /descans|hospital|trein|mini|combate|miss|quest|kurai|chakra|online|duelo|mundo|mapa|salvar|save|jutsu|ataque|defesa|mov/i.test(`${x.id||''} ${x.testid||''} ${x.action||''} ${x.text||''}`)));

  result.inputs = await page.locator('input,select,textarea').evaluateAll(nodes => nodes.slice(0, 500).map(el => ({
    tag: el.tagName, id: el.id || null, name: el.getAttribute('name'), testid: el.getAttribute('data-testid'), placeholder: el.getAttribute('placeholder'), type: el.getAttribute('type')
  })).filter(x => /rest|hospital|train|mini|combat|mission|kurai|chakra|online|save|jutsu|attack|target/i.test(JSON.stringify(x))));

  result.relevantText = await page.locator('body').innerText().then(t => t.split(/\n+/).map(x => x.trim()).filter(Boolean).filter(x => /descans|hospital|trein|minijog|combate|miss[aã]o|quest|kurai|chakra|online|duelo|ferimento|mundo|salvar|jutsu/i.test(x)).slice(0, 300));

  result.storage = await page.evaluate(() => ({
    localStorage: Object.keys(localStorage).sort(),
    sessionStorage: Object.keys(sessionStorage).sort()
  }));

  result.stateCandidates = await page.evaluate(source => {
    const re = new RegExp(source, 'i');
    const out = {};
    for (const k of Object.getOwnPropertyNames(window).filter(k => re.test(k)).slice(0, 250)) {
      try {
        const v = window[k];
        if (v && typeof v === 'object' && !Array.isArray(v)) {
          const keys = Object.keys(v).slice(0, 80);
          if (keys.length) out[k] = { keys, constructor: v?.constructor?.name || null };
        }
      } catch {}
    }
    return out;
  }, patterns.source);

  result.status = 'PASS_BROWSER_OPERATIONAL_PROBE';
  result.ok = true;
} catch (error) {
  result.status = 'FAIL_BROWSER_OPERATIONAL_PROBE';
  result.error = String(error?.stack || error);
  process.exitCode = 1;
} finally {
  result.pageErrors = pageErrors;
  result.consoleErrors = consoleErrors.slice(0, 100);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(result, null, 2) + '\n');
  console.log('=== OPERATIONAL PROBE SUMMARY ===');
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
}
