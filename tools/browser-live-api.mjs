import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const gameBase=String(process.env.PUBLIC_GAME_URL||'https://kaalflash12.github.io/naruto-shinobi-no-sho/').trim();
const apiOrigin=String(process.env.API_ORIGIN||'https://rlyiwlwzrdgvcwawrnpl.supabase.co/functions/v1/shinobi-api').trim().replace(/\/+$/g,'');
const outPath=process.env.BROWSER_LIVE_REPORT||'audit/BROWSER-LIVE-API.json';
const startedAt=new Date().toISOString(),failures=[],pageErrors=[],consoleErrors=[];
function assert(cond,msg){if(!cond)failures.push(String(msg));}
const browser=await chromium.launch({headless:true});const context=await browser.newContext({viewport:{width:1440,height:1000}});const page=await context.newPage();
page.on('pageerror',e=>pageErrors.push(String(e?.stack||e?.message||e)));page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text());});
let runtime={},status=null,unauthorized=null;
try{
  let response=null;for(let i=0;i<30;i++){response=await page.goto(`${gameBase}${gameBase.includes('?')?'&':'?'}live-api=${Date.now()}`,{waitUntil:'domcontentloaded',timeout:90000}).catch(()=>null);if(response?.ok())break;await page.waitForTimeout(3000);}
  assert(response?.ok(),`GitHub Pages HTTP inválido: ${response?.status()??'sem resposta'}`);await page.waitForTimeout(2500);
  const title=await page.title(),brand=(await page.locator('.brand').innerText().catch(()=>'' )).trim();
  assert(title==='NARUTO SHINOBI NO SHO • TERION 2D10',`Título inesperado: ${title}`);assert(/NARUTO SHINOBI NO SHO/i.test(brand),`Brand ausente: ${brand}`);
  runtime=await page.evaluate(()=>({r41:!!window.__NARUTO_R41__,apiBuild:window.NARUTO_R41_API_BUILD||'',apiOrigin:window.NARUTO_R41_API_ORIGIN||'',backend:window.__R41_GITHUB_API__?.backend||'',key:window.NARUTO_R41_SUPABASE_PUBLISHABLE_KEY||''}));
  assert(runtime.r41,'runtime R41 não carregou');assert(runtime.apiBuild==='NARUTO-SHINOBI-NO-SHO-SUPABASE-POSTGRES',`API build inesperado: ${runtime.apiBuild}`);assert(runtime.apiOrigin===apiOrigin,`API origin inesperado: ${runtime.apiOrigin}`);assert(runtime.backend==='supabase-edge-postgres',`Backend inesperado: ${runtime.backend}`);assert(runtime.key.startsWith('sb_publishable_'),'publishable key ausente');
  status=await page.evaluate(async()=>{const r=await fetch('/api/status',{headers:{accept:'application/json'}});let data=null;try{data=await r.json();}catch{}return{status:r.status,ok:r.ok,data,cors:r.headers.get('access-control-allow-origin')};});
  assert(status.ok&&status.status===200,`status Supabase falhou: ${JSON.stringify(status)}`);assert(status.data?.configured===true,'backend não configurado');assert(status.data?.storage==='supabase-postgres',`storage inesperado: ${status.data?.storage}`);assert(status.data?.realtime==='supabase-edge-http',`realtime inesperado: ${status.data?.realtime}`);assert(status.cors==='https://kaalflash12.github.io',`CORS inesperado: ${status.cors}`);
  unauthorized=await page.evaluate(async()=>{const r=await fetch('/api/account/slots',{method:'GET'});let data=null;try{data=await r.json();}catch{}return{status:r.status,data};});assert(unauthorized.status===401&&unauthorized.data?.error==='UNAUTHORIZED',`rota protegida não retornou 401: ${JSON.stringify(unauthorized)}`);
  if(pageErrors.length)failures.push(`Exceções JS: ${pageErrors.join(' | ')}`);const fatal=consoleErrors.filter(x=>/uncaught|referenceerror|syntaxerror|typeerror|failed to load module/i.test(x));if(fatal.length)failures.push(`Console fatal: ${fatal.join(' | ')}`);
}catch(error){failures.push(String(error?.stack||error?.message||error));}
finally{const report={generatedAt:new Date().toISOString(),startedAt,status:failures.length?'FAIL_BROWSER_LIVE_API':'PASS_BROWSER_LIVE_API',ok:failures.length===0,scope:'PUBLIC_GITHUB_PAGES_TO_SUPABASE_EDGE_POSTGRES',gameURL:gameBase,apiOrigin,runtime,backendStatus:status,unauthorizedProbe:unauthorized,pageErrors,consoleErrors:consoleErrors.slice(0,50),failures};fs.mkdirSync(path.dirname(outPath),{recursive:true});fs.writeFileSync(outPath,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));await browser.close();if(!report.ok)process.exitCode=1;}
