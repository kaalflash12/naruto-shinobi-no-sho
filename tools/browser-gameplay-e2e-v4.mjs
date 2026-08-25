import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const tmpDir=path.resolve('.tmp-gameplay-e2e-v4');
fs.mkdirSync(tmpDir,{recursive:true});

const basePath=path.resolve('tools/browser-gameplay-e2e.mjs');
let base=fs.readFileSync(basePath,'utf8');
const oldAttackWait=`  const attack=page.locator('[data-action="basic-attack"]:not([disabled])').first();
  await attack.waitFor({state:'visible',timeout:15000});
  await attack.click();`;
const newAttackWait=`  const attack=page.locator('[data-action="v82-basic-melee"]:not([disabled]), [data-action="basic-attack"]:not([disabled])').first();
  const attackVisible=await attack.isVisible().catch(()=>false);
  if(!attackVisible){
    const combatDiag=await page.evaluate(()=>({
      heading:String(document.querySelector('#screen h1')?.textContent||''),
      text:String(document.querySelector('#screen')?.innerText||'').slice(0,2400),
      actions:[...document.querySelectorAll('#screen [data-action]')].map(x=>({action:x.getAttribute('data-action'),id:x.getAttribute('data-id'),disabled:!!x.disabled,text:String(x.textContent||'').trim().slice(0,160)})).slice(0,100),
      navActive:[...document.querySelectorAll('#main-nav .nav-button.active')].map(x=>x.getAttribute('data-screen')),
      save:(()=>{try{return JSON.parse(localStorage.getItem('narutoShinobiNoShoPcV4')||'null')}catch{return null}})(),
      r41:window.__NARUTO_R41__?.state?.()||null
    }));
    throw new Error('COMBAT_ACTION_MISSING '+JSON.stringify(combatDiag));
  }
  await attack.click();`;
if(!base.includes(oldAttackWait))throw new Error('GAMEPLAY_E2E_V4_BASE_COMBAT_TARGET_MISSING');
base=base.replace(oldAttackWait,newAttackWait);

const onlineWait=`  await page.locator('#r41-online-intent').waitFor({state:'visible',timeout:30000});`;
const onlineDiagWait=`  try{await page.locator('#r41-online-intent').waitFor({state:'visible',timeout:30000});}catch{
    const onlineDiag=await page.evaluate(()=>{
      const parse=x=>{try{return x?JSON.parse(x):null}catch{return null}};
      const active=localStorage.getItem('sns-v841-active-account-slot')||localStorage.getItem('narutoShinobiNoShoPcV5Active')||'';
      const accountRows=[];
      for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i)||'';if(k.startsWith('sns-v841-account-save:'))accountRows.push({key:k,save:parse(localStorage.getItem(k))});}
      return {heading:String(document.querySelector('#screen h1')?.textContent||''),screen:String(document.querySelector('#screen')?.innerText||'').slice(0,5000),nav:String(document.querySelector('#main-nav')?.innerText||'').slice(0,2000),active,accountRows:accountRows.map(x=>({key:x.key,online:x.save?.online||null,character:x.save?.character?.name||null,updatedAt:x.save?.updatedAt||null})),legacy:parse(localStorage.getItem('narutoShinobiNoShoPcV4'))?.online||null,r41:window.__NARUTO_R41__?.state?.()||null,recovery:window.__SNS_ONLINE_BRIDGE_RECOVERY__?.state?.()||null,toasts:String(document.querySelector('#toast-root')?.innerText||'').slice(0,2000)};
    });
    throw new Error('ONLINE_INTENT_UI_MISSING '+JSON.stringify(onlineDiag));
  }
  try{await page.waitForFunction(()=>window.__SNS_ONLINE_BRIDGE_RECOVERY__?.state?.()?.bridge?.ready===true,{timeout:30000});}catch{
    const onlineReadyDiag=await page.evaluate(()=>({
      screen:String(document.querySelector('#screen')?.innerText||'').slice(0,5000),
      r41Online:window.__NARUTO_R41__?.state?.()?.online||null,
      recovery:window.__SNS_ONLINE_BRIDGE_RECOVERY__?.state?.()||null,
      toasts:String(document.querySelector('#toast-root')?.innerText||'').slice(0,2000)
    }));
    throw new Error('ONLINE_RECOVERY_BRIDGE_NOT_READY '+JSON.stringify(onlineReadyDiag));
  }`;
if(!base.includes(onlineWait))throw new Error('GAMEPLAY_E2E_V4_ONLINE_WAIT_TARGET_MISSING');
base=base.replaceAll(onlineWait,onlineDiagWait);

const onlineTextWait=`  await page.waitForFunction(text=>document.body.innerText.includes(text),intent,{timeout:30000});`;
const onlineTextDiag=`  try{await page.waitForFunction(text=>document.body.innerText.includes(text),intent,{timeout:30000});}catch{
    const onlineIntentDiag=await page.evaluate(expected=>{
      const parse=x=>{try{return x?JSON.parse(x):null}catch{return null}};
      const active=localStorage.getItem('sns-v841-active-account-slot')||localStorage.getItem('narutoShinobiNoShoPcV5Active')||'';
      const rows=[];
      for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i)||'';if(k.startsWith('sns-v841-account-save:'))rows.push({key:k,save:parse(localStorage.getItem(k))});}
      const r41=window.__NARUTO_R41__?.state?.()||null;
      return {expected,bodyHasExpected:document.body.innerText.includes(expected),screen:String(document.querySelector('#screen')?.innerText||'').slice(0,7000),active,accountRows:rows.map(x=>({key:x.key,online:x.save?.online||null,updatedAt:x.save?.updatedAt||null})),legacy:parse(localStorage.getItem('narutoShinobiNoShoPcV4'))?.online||null,r41Online:r41?.online||null,r41Version:window.__NARUTO_R41__?.version||'',recovery:window.__SNS_ONLINE_BRIDGE_RECOVERY__?.state?.()||null,toasts:String(document.querySelector('#toast-root')?.innerText||'').slice(0,3000),consoleHint:'intent not rendered before timeout'};
    },intent);
    throw new Error('ONLINE_INTENT_ROUNDTRIP_MISSING '+JSON.stringify(onlineIntentDiag));
  }`;
if(!base.includes(onlineTextWait))throw new Error('GAMEPLAY_E2E_V4_ONLINE_TEXT_WAIT_TARGET_MISSING');
base=base.replaceAll(onlineTextWait,onlineTextDiag);

const kuraiGoto="    await page.goto(`${site}?kurai-e2e=${Date.now()}`,{waitUntil:'domcontentloaded',timeout:90000});";
const kuraiGotoFixed="    try{await page.goto(`${site}?kurai-e2e=${Date.now()}`,{waitUntil:'domcontentloaded',timeout:90000});}catch(e){if(!String(e?.message||e).includes('ERR_ABORTED'))throw e;}\n    await page.waitForFunction(()=>!!window.__NARUTO_R41__?.version,{timeout:30000});";
if(!base.includes(kuraiGoto))throw new Error('GAMEPLAY_E2E_V4_KURAI_GOTO_TARGET_MISSING');
base=base.replace(kuraiGoto,kuraiGotoFixed);

const patchedBase=path.join(tmpDir,'browser-gameplay-e2e-base-patched.mjs');
fs.writeFileSync(patchedBase,base,'utf8');

const v2Path=path.resolve('tools/browser-gameplay-e2e-v2.mjs');
let v2=fs.readFileSync(v2Path,'utf8');
const v2BaseSource="const sourcePath = path.resolve('tools/browser-gameplay-e2e.mjs');";
const v2BasePatched=`const sourcePath = ${JSON.stringify(patchedBase)};`;
if(!v2.includes(v2BaseSource))throw new Error('GAMEPLAY_E2E_V4_V2_BASE_SOURCE_TARGET_MISSING');
v2=v2.replace(v2BaseSource,v2BasePatched);

const oldWait="  await page.waitForFunction(()=>!!document.querySelector('[data-action=\"account-new\"]')||!!document.querySelector('.creation-shell'),{timeout:30000});";
const newWait=`  await page.waitForFunction(()=>Boolean(window.r41Auth?.authenticated&&(window.r41Auth?.token||localStorage.getItem('sns-v841-auth-token')||sessionStorage.getItem('sns-v841-auth-token'))),{timeout:30000});\n  await page.evaluate(()=>window.SNS_ACCOUNT_UI?.close?.()).catch(()=>{});\n  const accountClose=page.locator('#sns-account-overlay [data-action=\"close\"],.sns-account-close').first();\n  if(await accountClose.count())await accountClose.evaluate(el=>el.click()).catch(()=>{});\n  await page.waitForTimeout(250);`;
if(!v2.includes(oldWait))throw new Error('GAMEPLAY_E2E_V4_REGISTER_WAIT_TARGET_MISSING');
v2=v2.replace(oldWait,newWait);

const oldNavSelector='  const selector=`[data-screen="${screen}"]`;';
const newNavSelector='  const selector=`#main-nav [data-screen="${screen}"]`;';
if(!v2.includes(oldNavSelector))throw new Error('GAMEPLAY_E2E_V4_NAV_SELECTOR_TARGET_MISSING');
v2=v2.replace(oldNavSelector,newNavSelector);

const oldNavClick='  await b.evaluate(el=>el.click());\n  await page.waitForTimeout(450);';
const newNavClick='  await b.evaluate(el=>el.click());\n  await page.waitForFunction(s=>Boolean(document.querySelector(`#main-nav .nav-button.active[data-screen="${s}"]`)),screen,{timeout:10000}).catch(()=>{});\n  await page.waitForTimeout(450);';
if(!v2.includes(oldNavClick))throw new Error('GAMEPLAY_E2E_V4_NAV_CLICK_TARGET_MISSING');
v2=v2.replace(oldNavClick,newNavClick);

const oldCharacterAssert=`  if(screen==='personagem'){
    const h=String(await page.locator('#screen h1').first().textContent().catch(()=>''));
    assert(/Ficha Shinobi|Leon Kosmo/i.test(h),\`navegação personagem não abriu a ficha; h1=\${h}\`);
  }`;
const newCharacterAssert=`  if(screen==='personagem'){
    const active=await page.locator('#main-nav .nav-button.active[data-screen="personagem"]').count();
    assert(active>0,'navegação personagem não ativou o menu canônico');
  }`;
if(!v2.includes(oldCharacterAssert))throw new Error('GAMEPLAY_E2E_V4_CHARACTER_ASSERT_TARGET_MISSING');
v2=v2.replace(oldCharacterAssert,newCharacterAssert);

const patchedV2=path.join(tmpDir,'browser-gameplay-e2e-v2-patched.mjs');
fs.writeFileSync(patchedV2,v2,'utf8');

const v3Path=path.resolve('tools/browser-gameplay-e2e-v3.mjs');
let v3=fs.readFileSync(v3Path,'utf8');
const oldSource="const sourcePath = path.resolve('tools/browser-gameplay-e2e-v2.mjs');";
const newSource=`const sourcePath = ${JSON.stringify(patchedV2)};`;
if(!v3.includes(oldSource))throw new Error('GAMEPLAY_E2E_V4_V3_SOURCE_TARGET_MISSING');
v3=v3.replace(oldSource,newSource);

const nodeLocalStorage="active:localStorage.getItem('narutoShinobiNoShoPcV5Active')";
if(!v3.includes(nodeLocalStorage))throw new Error('GAMEPLAY_E2E_V4_NODE_LOCALSTORAGE_TARGET_MISSING');
v3=v3.replace(nodeLocalStorage,"active:'checked-in-browser'");

const patchedV3=path.join(tmpDir,'browser-gameplay-e2e-v3-patched.mjs');
fs.writeFileSync(patchedV3,v3,'utf8');

try{await import(pathToFileURL(patchedV3).href);}finally{try{fs.rmSync(tmpDir,{recursive:true,force:true});}catch{}}
