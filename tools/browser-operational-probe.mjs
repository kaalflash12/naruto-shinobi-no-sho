import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const site = process.env.PUBLIC_GAME_URL || 'https://kaalflash12.github.io/naruto-shinobi-no-sho/';
const out = process.env.OPERATIONAL_PROBE_REPORT || 'audit/BROWSER-OPERATIONAL-PROBE.json';
const suffix = `${Date.now().toString(36)}${Math.random().toString(36).slice(2,7)}`;
const username = `op_${suffix}`.slice(0,28);
const email = `${username}@example.com`;
const password = `Aa!7_${suffix}_pw`;
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
const pageErrors = [];
const consoleErrors = [];
page.on('pageerror', e => pageErrors.push(String(e?.stack || e)));
page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });

const patterns = /r41|r27|rest|hospital|mini|combat|mission|kurai|world|injur|wound|save|online|visual|chakra|terion/i;
const result = { generatedAt: new Date().toISOString(), site, ok: false, status: 'PROBE_STARTED', pageErrors, consoleErrors };

const buttonSnapshot = async (limit = 500) => page.locator('button, [role="button"], input[type="button"], input[type="submit"], a').evaluateAll((nodes, limit) => nodes.slice(0, limit).map((el, i) => ({
  i,
  tag: el.tagName,
  id: el.id || null,
  cls: typeof el.className === 'string' ? el.className.slice(0,160) : null,
  testid: el.getAttribute('data-testid'),
  action: el.getAttribute('data-action'),
  href: el.getAttribute('href'),
  text: (el.innerText || el.value || el.getAttribute('aria-label') || el.getAttribute('title') || '').trim().replace(/\s+/g, ' ').slice(0, 220),
  visible: !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length)
})), limit);

const summarize = await page.evaluateHandle(() => null).catch(() => null);
if (summarize) await summarize.dispose();

try {
  const resp = await page.goto(`${site}?account=1&tab=register&operationalProbe=2&v=${Date.now()}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  if (!resp?.ok()) throw new Error(`site HTTP ${resp?.status()}`);
  await page.waitForSelector('[data-testid="sns-account-panel"]', { timeout: 30000 });
  await page.waitForTimeout(2500);

  result.title = await page.title();
  result.runtime = await page.evaluate(() => ({
    r41: !!window.__NARUTO_R41__,
    apiBuild: window.NARUTO_R41_API_BUILD || null,
    apiOrigin: window.NARUTO_R41_API_ORIGIN || null,
    accountBuild: window.SNS_ACCOUNT_UI?.build || null,
    readyState: document.readyState
  }));

  const form = page.locator('[data-form="register"]');
  await form.locator('[data-field="username"]').fill(username);
  await form.locator('[data-field="displayName"]').fill('Operational Probe');
  await form.locator('[data-field="email"]').fill(email);
  await form.locator('[data-field="password"]').fill(password);
  await form.locator('[data-field="confirm"]').fill(password);
  await form.locator('button[type="submit"]').click();
  await page.waitForSelector('[data-testid="sns-account-authenticated"]', { timeout: 30000 });
  result.accountRegistered = true;
  result.buttonsAuthenticatedPanel = await buttonSnapshot();
  result.authenticatedText = (await page.locator('body').innerText()).split(/\n+/).map(x=>x.trim()).filter(Boolean).slice(0,350);

  // Fecha o painel pela mesma UI pública, sem chamar mecânica do jogo.
  const accountButton = page.locator('#sns-account-button');
  if (await accountButton.count()) {
    await accountButton.click().catch(() => {});
    await page.waitForTimeout(1200);
  }
  await page.keyboard.press('Escape').catch(() => {});
  await page.waitForTimeout(1200);

  result.buttonsAfterAccount = (await buttonSnapshot()).filter(x => x.visible);
  result.gameplayButtons = result.buttonsAfterAccount.filter(x => /novo|continu|jogar|campanha|personagem|mundo|mapa|descans|hospital|trein|mini|combate|miss|quest|kurai|chakra|online|duelo|salvar|save|jutsu|ataque|defesa|mov|invent|ficha/i.test(`${x.id||''} ${x.testid||''} ${x.action||''} ${x.text||''}`));
  result.visibleTextAfterAccount = (await page.locator('body').innerText()).split(/\n+/).map(x=>x.trim()).filter(Boolean).slice(0,500);

  result.globals = await page.evaluate(source => {
    const re = new RegExp(source, 'i');
    return Object.getOwnPropertyNames(window).filter(k => re.test(k)).sort().slice(0, 500).map(k => {
      let type = 'unknown'; try { type = typeof window[k]; } catch {}
      return { name: k, type };
    });
  }, patterns.source);

  result.runtimeObjects = await page.evaluate(() => {
    function snap(v, depth=0) {
      if (v == null || typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') return v;
      if (typeof v === 'function') return '[function]';
      if (depth >= 3) return `[${Array.isArray(v)?'array':'object'}]`;
      if (Array.isArray(v)) return v.slice(0,20).map(x=>snap(x,depth+1));
      const out = {};
      for (const k of Object.keys(v).slice(0,80)) {
        try { out[k] = snap(v[k], depth+1); } catch { out[k] = '[unreadable]'; }
      }
      return out;
    }
    return {
      r41: snap(window.__NARUTO_R41__),
      r27: snap(window.__NARUTO_R27__),
      savePoint: snap(window.SNSSavePointManager),
      minigame: snap(window.SNSMinigameEngine),
      visual: snap(window.SNSVisualStateEngine),
      combatPresentation: snap(window.SNSCombatPresentationEngine)
    };
  });

  result.storage = await page.evaluate(() => ({
    localStorage: Object.fromEntries(Object.keys(localStorage).sort().map(k => [k, String(localStorage.getItem(k)).slice(0,1200)])),
    sessionStorage: Object.fromEntries(Object.keys(sessionStorage).sort().map(k => [k, String(sessionStorage.getItem(k)).slice(0,500)]))
  }));

  result.domIds = await page.locator('[id]').evaluateAll(nodes => nodes.map(x => x.id).filter(Boolean).filter(x => /rest|hospital|train|mini|combat|mission|kurai|chakra|world|save|online|battle|quest|character|campaign|map/i.test(x)).slice(0,500));
  result.dataActions = await page.locator('[data-action]').evaluateAll(nodes => nodes.map(x => ({ action:x.getAttribute('data-action'), text:(x.innerText||'').trim().replace(/\s+/g,' ').slice(0,180), visible:!!(x.offsetWidth||x.offsetHeight||x.getClientRects().length) })).filter(x => /rest|hospital|train|mini|combat|mission|kurai|chakra|world|save|online|battle|quest|character|campaign|map/i.test(`${x.action} ${x.text}`)).slice(0,500));

  result.status = 'PASS_BROWSER_OPERATIONAL_PROBE_AUTHENTICATED';
  result.ok = true;
} catch (error) {
  result.status = 'FAIL_BROWSER_OPERATIONAL_PROBE_AUTHENTICATED';
  result.error = String(error?.stack || error);
  process.exitCode = 1;
} finally {
  try { if (await page.evaluate(() => !!window.r41Auth?.authenticated)) await page.evaluate(() => window.r41Auth.deleteAccount()); } catch {}
  result.pageErrors = pageErrors;
  result.consoleErrors = consoleErrors.slice(0, 100);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(result, null, 2) + '\n');
  console.log('=== OPERATIONAL PROBE AUTHENTICATED SUMMARY ===');
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
}
