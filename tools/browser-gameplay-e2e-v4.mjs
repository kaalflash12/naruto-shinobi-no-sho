import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// V4 mantém os adapters V2/V3 e corrige contratos do gate com a UI atual.
// O sucesso de registro é sessão real (r41Auth/token), não uma tela específica.
const tmpDir=path.resolve('.tmp-gameplay-e2e-v4');
fs.mkdirSync(tmpDir,{recursive:true});

const v2Path=path.resolve('tools/browser-gameplay-e2e-v2.mjs');
let v2=fs.readFileSync(v2Path,'utf8');
const oldWait="  await page.waitForFunction(()=>!!document.querySelector('[data-action=\"account-new\"]')||!!document.querySelector('.creation-shell'),{timeout:30000});";
const newWait=`  await page.waitForFunction(()=>Boolean(window.r41Auth?.authenticated&&(window.r41Auth?.token||localStorage.getItem('sns-v841-auth-token')||sessionStorage.getItem('sns-v841-auth-token'))),{timeout:30000});\n  await page.evaluate(()=>window.SNS_ACCOUNT_UI?.close?.()).catch(()=>{});\n  const accountClose=page.locator('#sns-account-overlay [data-action=\"close\"],.sns-account-close').first();\n  if(await accountClose.count())await accountClose.evaluate(el=>el.click()).catch(()=>{});\n  await page.waitForTimeout(250);`;
if(!v2.includes(oldWait))throw new Error('GAMEPLAY_E2E_V4_REGISTER_WAIT_TARGET_MISSING');
v2=v2.replace(oldWait,newWait);

// O runtime atual renderiza vários data-screen em cards/atalhos. Para navegação
// do gate, o contrato estável é o menu principal #main-nav. Isso evita clicar
// num atalho homônimo fora da navegação e depois concluir falsamente que a tela
// não abriu.
const oldNavSelector='  const selector=`[data-screen="${screen}"]`;';
const newNavSelector='  const selector=`#main-nav [data-screen="${screen}"]`;';
if(!v2.includes(oldNavSelector))throw new Error('GAMEPLAY_E2E_V4_NAV_SELECTOR_TARGET_MISSING');
v2=v2.replace(oldNavSelector,newNavSelector);

const oldNavClick='  await b.evaluate(el=>el.click());\n  await page.waitForTimeout(450);';
const newNavClick='  await b.evaluate(el=>el.click());\n  await page.waitForFunction(s=>document.querySelector(`#main-nav .nav-button.active[data-screen="${s}"]`)||String(document.querySelector(`#screen h1`)?.textContent||``).length>0,screen,{timeout:10000}).catch(()=>{});\n  await page.waitForTimeout(450);';
if(!v2.includes(oldNavClick))throw new Error('GAMEPLAY_E2E_V4_NAV_CLICK_TARGET_MISSING');
v2=v2.replace(oldNavClick,newNavClick);

const patchedV2=path.join(tmpDir,'browser-gameplay-e2e-v2-patched.mjs');
fs.writeFileSync(patchedV2,v2,'utf8');

const v3Path=path.resolve('tools/browser-gameplay-e2e-v3.mjs');
let v3=fs.readFileSync(v3Path,'utf8');
const oldSource="const sourcePath = path.resolve('tools/browser-gameplay-e2e-v2.mjs');";
const newSource=`const sourcePath = ${JSON.stringify(patchedV2)};`;
if(!v3.includes(oldSource))throw new Error('GAMEPLAY_E2E_V4_V3_SOURCE_TARGET_MISSING');
v3=v3.replace(oldSource,newSource);

// V3 usava localStorage apenas numa mensagem de diagnóstico executada no Node.
// localStorage pertence ao Chromium; não pode ser acessado no processo Node.
const nodeLocalStorage="active:localStorage.getItem('narutoShinobiNoShoPcV5Active')";
if(!v3.includes(nodeLocalStorage))throw new Error('GAMEPLAY_E2E_V4_NODE_LOCALSTORAGE_TARGET_MISSING');
v3=v3.replace(nodeLocalStorage,"active:'checked-in-browser'");

const patchedV3=path.join(tmpDir,'browser-gameplay-e2e-v3-patched.mjs');
fs.writeFileSync(patchedV3,v3,'utf8');

try{
  await import(pathToFileURL(patchedV3).href);
}finally{
  try{fs.rmSync(tmpDir,{recursive:true,force:true});}catch{}
}
