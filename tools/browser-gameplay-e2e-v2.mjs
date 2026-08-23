import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const sourcePath = path.resolve('tools/browser-gameplay-e2e.mjs');
const source = fs.readFileSync(sourcePath, 'utf8');

const oldToken = "const token=await page.evaluate(()=>sessionStorage.getItem('sns-v841-auth-token')||'');";
const newToken = "const token=await page.evaluate(()=>String(window.r41Auth?.token||localStorage.getItem('sns-v841-auth-token')||''));";
if (!source.includes(oldToken)) throw new Error('GAMEPLAY_E2E_V2_PATCH_TARGET_MISSING: token legacy não encontrado');
let patched = source.replace(oldToken, newToken);
if (patched === source) throw new Error('GAMEPLAY_E2E_V2_PATCH_NOT_APPLIED');

const registerPass = "pass('temporaryAccountRegistered');\n  return token;";
const registerPassFixed = "pass('temporaryAccountRegistered');\n  const closeAccount=page.locator('#sns-account-overlay [data-action=\"close\"]');if(await closeAccount.count())await closeAccount.click();\n  await page.waitForTimeout(150);\n  return token;";
if (!patched.includes(registerPass)) throw new Error('GAMEPLAY_E2E_V2_CLOSE_TARGET_MISSING');
patched = patched.replace(registerPass, registerPassFixed);

// A UI de produção usa data-screen=personagem no app.js atual. Se a entrada não
// existir, o problema real é que o chrome/nav não foi renderizado. O gate agora
// registra a estrutura real em vez de confundir isso com um ID renomeado.
const navigateLine = /async function navigate\(page,screen\)\{[^\n]+\}/;
if (!navigateLine.test(patched)) throw new Error('GAMEPLAY_E2E_V2_NAV_PATCH_TARGET_MISSING');
patched = patched.replace(navigateLine,
  "async function navigate(page,screen){const selector=`[data-screen=\\\"${screen}\\\"]`;const b=page.locator(selector).first();const count=await b.count();if(!count){const diag=await page.evaluate(()=>({ready:document.readyState,title:document.title,mainNavExists:!!document.querySelector('#main-nav'),mainNavHtml:(document.querySelector('#main-nav')?.innerHTML||'').slice(0,1800),screenHtml:(document.querySelector('#screen')?.innerHTML||'').slice(0,1800),appExists:!!document.querySelector('#app'),r41:window.__NARUTO_R41__?.version||'',accountOpen:!!document.querySelector('#sns-account-overlay'),scripts:[...document.scripts].map(s=>s.src).filter(Boolean).slice(-8)}));throw new Error(`NAV_NOT_RENDERED ${screen}: ${JSON.stringify(diag)}`);}await b.evaluate(el=>el.click());await page.waitForTimeout(450);if(screen==='personagem'){const h=String(await page.locator('#screen h1').first().textContent().catch(()=>''));assert(/Ficha Shinobi|Leon Kosmo/i.test(h),`navegação personagem não abriu a ficha; h1=${h}`);}}"
);

const tmpDir = path.resolve('.tmp-gameplay-e2e-v2');
fs.mkdirSync(tmpDir, { recursive: true });
const tmpFile = path.join(tmpDir, `browser-gameplay-e2e-v2-${Date.now()}.mjs`);
fs.writeFileSync(tmpFile, patched, 'utf8');
try { await import(pathToFileURL(tmpFile).href); }
finally { try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {} }
