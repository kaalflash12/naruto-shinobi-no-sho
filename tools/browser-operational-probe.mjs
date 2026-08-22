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

const result = { generatedAt: new Date().toISOString(), site, ok: false, status: 'PROBE_STARTED', pageErrors, consoleErrors };
const safe = value => JSON.parse(JSON.stringify(value, (_k, v) => typeof v === 'function' ? '[function]' : v));

async function snapshotButtons(onlyVisible = false) {
  return page.locator('button, [role="button"], input[type="button"], input[type="submit"], a').evaluateAll((nodes, onlyVisible) => nodes.slice(0, 1200).map((el, i) => ({
    i,
    tag: el.tagName,
    id: el.id || null,
    cls: typeof el.className === 'string' ? el.className.slice(0,180) : null,
    testid: el.getAttribute('data-testid'),
    action: el.getAttribute('data-action'),
    screen: el.getAttribute('data-screen'),
    tab: el.getAttribute('data-tab'),
    href: el.getAttribute('href'),
    text: (el.innerText || el.value || el.getAttribute('aria-label') || el.getAttribute('title') || '').trim().replace(/\s+/g, ' ').slice(0,240),
    visible: !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length)
  })).filter(x => !onlyVisible || x.visible), onlyVisible);
}

async function waitGameplay() {
  for (let i=0; i<30; i++) {
    const state = await page.evaluate(() => {
      const buttons = [...document.querySelectorAll('button,[role="button"],a')].filter(el => !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length));
      const text = document.body?.innerText || '';
      return {
        hasGameplayText: /Missões|Combate|Inventário|Treino|Mundo|Mapa|Personagem|Jutsus|Descans/i.test(text),
        visibleButtonCount: buttons.length,
        hasMain: !!document.querySelector('main, #app, .app-shell, .game-shell, .main-content')
      };
    });
    if (state.hasGameplayText && state.visibleButtonCount > 8) return state;
    await page.waitForTimeout(1000);
  }
  return null;
}

try {
  const resp = await page.goto(`${site}?account=1&tab=register&operationalProbe=3&v=${Date.now()}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  if (!resp?.ok()) throw new Error(`site HTTP ${resp?.status()}`);
  await page.waitForSelector('[data-testid="sns-account-panel"]', { timeout: 30000 });

  const form = page.locator('[data-form="register"]');
  await form.locator('[data-field="username"]').fill(username);
  await form.locator('[data-field="displayName"]').fill('Operational Probe');
  await form.locator('[data-field="email"]').fill(email);
  await form.locator('[data-field="password"]').fill(password);
  await form.locator('[data-field="confirm"]').fill(password);
  await form.locator('button[type="submit"]').click();
  await page.waitForSelector('[data-testid="sns-account-authenticated"]', { timeout: 30000 });
  result.accountRegistered = true;

  const close = page.locator('[data-testid="sns-account-panel"] [data-action="close"]');
  if (await close.count()) await close.click();
  await page.waitForTimeout(1000);
  result.accountPanelClosed = await page.locator('[data-testid="sns-account-panel"]').evaluate(el => getComputedStyle(el).display === 'none' || !el.offsetParent).catch(() => true);

  result.landingButtons = await snapshotButtons(true);

  let campaignClick = false;
  const candidates = [
    page.getByRole('button', { name: /Continuar campanha/i }),
    page.getByText(/Continuar campanha/i, { exact: true }),
    page.locator('[data-action="continue-campaign"]'),
    page.locator('[data-action="continue"]')
  ];
  for (const loc of candidates) {
    if (await loc.count()) {
      const first = loc.first();
      if (await first.isVisible().catch(() => false)) {
        await first.click();
        campaignClick = true;
        break;
      }
    }
  }
  result.continueCampaignClicked = campaignClick;
  if (!campaignClick) throw new Error('Botão público Continuar campanha não encontrado/visível após autenticação.');

  const gameReady = await waitGameplay();
  result.gameReady = gameReady;
  await page.waitForTimeout(1500);

  result.gameplayButtons = await snapshotButtons(true);
  result.gameplayRelevantButtons = result.gameplayButtons.filter(x => /descans|hospital|trein|mini|combate|miss|quest|kurai|chakra|online|duelo|mundo|mapa|salvar|save|jutsu|ataque|defesa|mov|invent|ficha|personagem|campanha|ferimento|cura/i.test(`${x.id||''} ${x.testid||''} ${x.action||''} ${x.screen||''} ${x.tab||''} ${x.text||''}`));
  result.gameplayText = (await page.locator('body').innerText()).split(/\n+/).map(x=>x.trim()).filter(Boolean).filter(x => /descans|hospital|trein|minijog|combate|miss[aã]o|quest|kurai|chakra|online|duelo|ferimento|mundo|mapa|salvar|jutsu|invent[aá]rio|personagem/i.test(x)).slice(0,500);

  result.domIds = await page.locator('[id]').evaluateAll(nodes => nodes.map(x => ({ id:x.id, visible:!!(x.offsetWidth||x.offsetHeight||x.getClientRects().length) })).filter(x => /rest|hospital|train|mini|combat|mission|kurai|chakra|world|save|online|battle|quest|character|campaign|map|injur|wound/i.test(x.id)).slice(0,800));
  result.dataActions = await page.locator('[data-action]').evaluateAll(nodes => nodes.map(x => ({ action:x.getAttribute('data-action'), text:(x.innerText||'').trim().replace(/\s+/g,' ').slice(0,200), visible:!!(x.offsetWidth||x.offsetHeight||x.getClientRects().length) })).filter(x => /rest|hospital|train|mini|combat|mission|kurai|chakra|world|save|online|battle|quest|character|campaign|map|injur|wound/i.test(`${x.action} ${x.text}`)).slice(0,800));

  result.productionState = await page.evaluate(() => {
    const out = {};
    const call = (name, fn) => {
      try { out[name] = fn(); } catch (e) { out[name] = { error: String(e?.message || e) }; }
    };
    call('r41State', () => window.__NARUTO_R41__?.state?.());
    call('r41Injuries', () => window.__NARUTO_R41__?.injuries?.());
    call('r41Gates', () => window.__NARUTO_R41__?.gates?.());
    call('r41Appearance', () => window.__NARUTO_R41__?.appearance?.());
    call('r27Snapshot', () => window.__NARUTO_R27__?.snapshot?.());
    call('r27World', () => window.__NARUTO_R27__?.world?.());
    call('savepointsRecent', () => window.SNSSavePointManager?.recent?.());
    return out;
  });

  result.functionSources = await page.evaluate(() => {
    const cut = fn => typeof fn === 'function' ? Function.prototype.toString.call(fn).slice(0,5000) : null;
    return {
      playMinigame: cut(window.__NARUTO_R41__?.playMinigame),
      flushSave: cut(window.__NARUTO_R41__?.flushSave),
      r41State: cut(window.__NARUTO_R41__?.state),
      r41Injuries: cut(window.__NARUTO_R41__?.injuries),
      minigameNormalize: cut(window.SNSMinigameEngine?.normalizeResult),
      minigameTraining: cut(window.SNSMinigameEngine?.trainingResult),
      visualFromCombat: cut(window.SNSVisualStateEngine?.fromCombatResult),
      combatPresentation: cut(window.SNSCombatPresentationEngine?.fromResult),
      savepointRecord: cut(window.SNSSavePointManager?.record)
    };
  });

  result.storageKeys = await page.evaluate(() => ({ localStorage: Object.keys(localStorage).sort(), sessionStorage: Object.keys(sessionStorage).sort() }));
  result.runtime = await page.evaluate(() => ({
    r41: !!window.__NARUTO_R41__,
    version: window.__NARUTO_R41__?.version || null,
    minigames: window.__NARUTO_R41__?.minigames || [],
    apiBuild: window.NARUTO_R41_API_BUILD || null,
    accountBuild: window.SNS_ACCOUNT_UI?.build || null
  }));

  result.status = 'PASS_BROWSER_OPERATIONAL_PROBE_GAMEPLAY';
  result.ok = true;
} catch (error) {
  result.status = 'FAIL_BROWSER_OPERATIONAL_PROBE_GAMEPLAY';
  result.error = String(error?.stack || error);
  process.exitCode = 1;
} finally {
  try {
    if (await page.evaluate(() => !!window.r41Auth?.authenticated)) await page.evaluate(() => window.r41Auth.deleteAccount());
  } catch {}
  result.pageErrors = pageErrors;
  result.consoleErrors = consoleErrors.slice(0,100);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(result, null, 2) + '\n');
  console.log('=== OPERATIONAL GAMEPLAY PROBE SUMMARY ===');
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
}
