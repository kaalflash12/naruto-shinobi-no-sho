import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Adapta o E2E operacional à arquitetura atual de conta obrigatória V8.4.1.
// O teste continua usando somente UI/API públicas reais.
const sourcePath = path.resolve('tools/browser-gameplay-e2e.mjs');
const source = fs.readFileSync(sourcePath, 'utf8');
let patched = source;

const oldToken = "const token=await page.evaluate(()=>sessionStorage.getItem('sns-v841-auth-token')||'');";
const newToken = "const token=await page.evaluate(()=>String(sessionStorage.getItem('sns-v841-auth-token')||window.r41Auth?.token||localStorage.getItem('sns-v841-auth-token')||''));";
if (!patched.includes(oldToken)) throw new Error('GAMEPLAY_E2E_V2_PATCH_TARGET_MISSING: token legacy não encontrado');
patched = patched.replace(oldToken, newToken);

async function registerV2(page){
  const resp=await page.goto(`${site}?gameplay-auth=${Date.now()}`,{waitUntil:'domcontentloaded',timeout:90000});
  assert(resp?.ok(),`site HTTP ${resp?.status()}`);
  await page.locator('.r28-auth-panel').waitFor({state:'visible',timeout:30000});
  const regTab=page.locator('[data-action="auth-mode"][data-id="register"]');
  if(await regTab.count())await regTab.click();
  await page.locator('#auth-username').fill(username);
  await page.locator('#auth-password').fill(password);
  const display=page.locator('#auth-display-name');
  if(await display.count())await display.fill('Gameplay E2E');
  await page.locator('[data-action="auth-submit"]').click();
  await page.waitForFunction(()=>!!document.querySelector('[data-action="account-new"]')||!!document.querySelector('.creation-shell'),{timeout:30000});
  const token=await page.evaluate(()=>String(sessionStorage.getItem('sns-v841-auth-token')||window.r41Auth?.token||localStorage.getItem('sns-v841-auth-token')||''));
  assert(token,'registro canônico não deixou sessão autenticada');
  pass('temporaryAccountRegistered');
  return token;
}

async function seedNormalV2(page){
  const fixture=normalFixture();
  const saved=await page.evaluate(async ({slot,fixture})=>{
    const r=await fetch('/api/account/save',{
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({slotId:slot,save:fixture,gameVersion:'R41-GAMEPLAY-E2E'})
    });
    const data=await r.json().catch(()=>({}));
    return {status:r.status,data};
  },{slot:SLOT_ID,fixture});
  assert(saved.status===200&&saved.data?.saved===true,`fixture cloud save falhou: ${saved.status} ${JSON.stringify(saved.data)}`);
  await page.reload({waitUntil:'domcontentloaded',timeout:90000});
  await page.waitForFunction(()=>!!window.__NARUTO_R41__?.version,{timeout:30000});
  const slotButton=page.locator(`[data-action="account-load"][data-id="${SLOT_ID}"]`);
  await slotButton.waitFor({state:'visible',timeout:30000});
  await slotButton.click();
  await page.waitForFunction(()=>document.querySelector('#main-nav [data-screen="personagem"]')&&document.querySelector('#screen'),{timeout:30000});
  await page.waitForTimeout(700);
  const s=await readSave(page);
  assert(s?.character?.name==='Gameplay E2E','fixture da conta não carregou no runtime local');
  return s;
}

async function navigateV2(page,screen){
  const selector=`[data-screen="${screen}"]`;
  const b=page.locator(selector).first();
  const count=await b.count();
  if(!count){
    const diag=await page.evaluate(()=>({
      title:document.title,
      nav:(document.querySelector('#main-nav')?.innerText||'').slice(0,1200),
      screen:(document.querySelector('#screen')?.innerText||'').slice(0,1200),
      accountOpen:!!document.querySelector('#sns-account-overlay'),
      r41:window.__NARUTO_R41__?.version||''
    }));
    throw new Error(`NAV_NOT_RENDERED ${screen}: ${JSON.stringify(diag)}`);
  }
  await b.evaluate(el=>el.click());
  await page.waitForTimeout(450);
  if(screen==='personagem'){
    const h=String(await page.locator('#screen h1').first().textContent().catch(()=>''));
    assert(/Ficha Shinobi|Leon Kosmo/i.test(h),`navegação personagem não abriu a ficha; h1=${h}`);
  }
}

const registerBlock=/async function register\(page\)\{[\s\S]*?\n\}\n\nasync function seedNormal/;
if(!registerBlock.test(patched))throw new Error('GAMEPLAY_E2E_V2_REGISTER_BLOCK_MISSING');
patched=patched.replace(registerBlock,registerV2.toString().replace('registerV2','register')+'\n\nasync function seedNormal');

const seedBlock=/async function seedNormal\(page\)\{[\s\S]*?\n\}\n\nasync function testNormalGameplay/;
if(!seedBlock.test(patched))throw new Error('GAMEPLAY_E2E_V2_SEED_BLOCK_MISSING');
patched=patched.replace(seedBlock,seedNormalV2.toString().replace('seedNormalV2','seedNormal')+'\n\nasync function testNormalGameplay');

const navigateLine=/async function navigate\(page,screen\)\{[^\n]+\}/;
if(!navigateLine.test(patched))throw new Error('GAMEPLAY_E2E_V2_NAV_PATCH_TARGET_MISSING');
patched=patched.replace(navigateLine,navigateV2.toString().replace('navigateV2','navigate'));

const tmpDir=path.resolve('.tmp-gameplay-e2e-v2');
fs.mkdirSync(tmpDir,{recursive:true});
const tmpFile=path.join(tmpDir,`browser-gameplay-e2e-v2-${Date.now()}.mjs`);
fs.writeFileSync(tmpFile,patched,'utf8');
try{await import(pathToFileURL(tmpFile).href);}
finally{try{fs.rmSync(tmpDir,{recursive:true,force:true});}catch{}}
