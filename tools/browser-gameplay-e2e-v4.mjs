import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// V4 mantém os adapters V2/V3 e corrige o contrato de pós-registro da UI atual.
// O sucesso de registro é sessão real (r41Auth/token), não uma tela específica.
const tmpDir=path.resolve('.tmp-gameplay-e2e-v4');
fs.mkdirSync(tmpDir,{recursive:true});

const v2Path=path.resolve('tools/browser-gameplay-e2e-v2.mjs');
let v2=fs.readFileSync(v2Path,'utf8');
const oldWait="  await page.waitForFunction(()=>!!document.querySelector('[data-action=\"account-new\"]')||!!document.querySelector('.creation-shell'),{timeout:30000});";
const newWait=`  await page.waitForFunction(()=>Boolean(window.r41Auth?.authenticated&&(window.r41Auth?.token||localStorage.getItem('sns-v841-auth-token')||sessionStorage.getItem('sns-v841-auth-token'))),{timeout:30000});\n  await page.evaluate(()=>window.SNS_ACCOUNT_UI?.close?.()).catch(()=>{});\n  const accountClose=page.locator('#sns-account-overlay [data-action=\"close\"],.sns-account-close').first();\n  if(await accountClose.count())await accountClose.evaluate(el=>el.click()).catch(()=>{});\n  await page.waitForTimeout(250);`;
if(!v2.includes(oldWait))throw new Error('GAMEPLAY_E2E_V4_REGISTER_WAIT_TARGET_MISSING');
v2=v2.replace(oldWait,newWait);
const patchedV2=path.join(tmpDir,'browser-gameplay-e2e-v2-patched.mjs');
fs.writeFileSync(patchedV2,v2,'utf8');

const v3Path=path.resolve('tools/browser-gameplay-e2e-v3.mjs');
let v3=fs.readFileSync(v3Path,'utf8');
const oldSource="const sourcePath = path.resolve('tools/browser-gameplay-e2e-v2.mjs');";
const newSource=`const sourcePath = ${JSON.stringify(patchedV2)};`;
if(!v3.includes(oldSource))throw new Error('GAMEPLAY_E2E_V4_V3_SOURCE_TARGET_MISSING');
v3=v3.replace(oldSource,newSource);
const patchedV3=path.join(tmpDir,'browser-gameplay-e2e-v3-patched.mjs');
fs.writeFileSync(patchedV3,v3,'utf8');

try{
  await import(pathToFileURL(patchedV3).href);
}finally{
  try{fs.rmSync(tmpDir,{recursive:true,force:true});}catch{}
}
