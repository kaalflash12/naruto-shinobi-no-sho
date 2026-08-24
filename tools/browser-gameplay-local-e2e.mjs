import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const tmpDir=path.resolve('.tmp-gameplay-local-e2e');
fs.mkdirSync(tmpDir,{recursive:true});

const baseSourcePath=path.resolve('tools/browser-gameplay-e2e.mjs');
let base=fs.readFileSync(baseSourcePath,'utf8');
const pageMarker="  const page=await context.newPage();cleanupPage=page;";
if(!base.includes(pageMarker))throw new Error('LOCAL_GAMEPLAY_PAGE_MARKER_MISSING');

const fixtureCode=String.raw`
  const localApiOrigin='https://local-gameplay-e2e.workers.dev';
  const localAccount={id:'account-local-gameplay-e2e',username,role:'player',displayName:'Gameplay E2E'};
  const localToken='local-gameplay-e2e-token';
  const localSaves=new Map();
  let localRoom=null;
  let localActionId=0;
  let localMessageId=0;
  const localActions=[];
  const localMessages=[];
  const cloneLocal=v=>v==null?v:JSON.parse(JSON.stringify(v));
  const slotSummaryLocal=(slotId,save)=>({
    slotId,id:slotId,name:save?.character?.name||'Shinobi',campaign:save?.campaign?.name||save?.story?.campaign||'Campanha',
    level:Number(save?.character?.level||1),graduation:save?.character?.graduation||'Genin',village:save?.character?.village||'folha',
    origin:save?.character?.origin||'sem_cla',avatar:save?.character?.avatar||'assets/ui/avatar.png',updatedAt:new Date().toISOString(),
    playerId:save?.playerId||'',campaignId:save?.campaignId||''
  });
  await page.addInitScript(origin=>{
    localStorage.setItem('sns-api-origin',origin);
    localStorage.setItem('sns-r41-api-origin',origin);
  },localApiOrigin);
  await page.route('**/api/**',async route=>{
    const req=route.request(),url=new URL(req.url()),p=url.pathname;
    let body={};try{body=JSON.parse(req.postData()||'{}')}catch{}
    const reply=(data,status=200)=>route.fulfill({status,contentType:'application/json; charset=utf-8',body:JSON.stringify(data)});
    if(p==='/api/status')return reply({ok:true,configured:true,enabled:false,provider:'offline-test',model:'local-fixture',cloudSave:true,onlineRooms:true,memory:true,rulesDatabase:true,storage:'mongodb-atlas',realtime:'cloudflare-durable-objects',buildAuthority:'R41-AUTHORITATIVE-TERION-20260823-V6',providers:[],routes:{}});
    if(p==='/api/auth/register'||p==='/api/auth/login')return reply({ok:true,token:localToken,account:localAccount,mirrors:{cloud:true}});
    if(p==='/api/auth/me')return reply({ok:true,account:localAccount});
    if(p==='/api/auth/logout')return reply({ok:true});
    if(p==='/api/auth/delete-account'){localSaves.clear();return reply({ok:true,deleted:true});}
    if(p==='/api/account/save'){
      const slotId=String(body.slotId||'slot-principal');
      localSaves.set(slotId,cloneLocal(body.save));
      return reply({ok:true,saved:true,slotId,updatedAt:new Date().toISOString(),mirrors:{cloud:true,drive:false}});
    }
    if(p==='/api/account/slots')return reply({ok:true,slots:[...localSaves.entries()].map(([id,save])=>slotSummaryLocal(id,save)),mirrors:{cloud:true}});
    if(p==='/api/account/load'){
      const slotId=String(body.slotId||'slot-principal'),save=localSaves.get(slotId);
      return save?reply({ok:true,slotId,save:cloneLocal(save),mirrors:{cloud:true}}):reply({ok:false,error:'SAVE_NOT_FOUND'},404);
    }
    if(p==='/api/account/delete'){localSaves.delete(String(body.slotId||''));return reply({ok:true,deleted:true});}
    if(p==='/api/v84/bootstrap')return reply({ok:true,world:{npcs:[],arcs:[],missions:[],locations:[]},savePoints:[]});
    if(p.startsWith('/api/v84/'))return reply({ok:true,event:{at:new Date().toISOString()}});
    if(p==='/api/online/create'){
      const roomId='room-local-gameplay-e2e';
      localRoom={id:roomId,roomId,title:String(body.title||'Gameplay E2E'),campaignId:String(body.campaignId||'campaign-local'),hostPlayerId:String(body.playerId||''),createdAt:new Date().toISOString()};
      return reply({ok:true,roomId,title:localRoom.title,campaignId:localRoom.campaignId});
    }
    if(p==='/api/online/join'){
      if(!localRoom)localRoom={id:String(body.roomId||'room-local-gameplay-e2e'),roomId:String(body.roomId||'room-local-gameplay-e2e'),title:'Gameplay E2E',campaignId:String(body.campaignId||'campaign-local')};
      return reply({ok:true,roomId:localRoom.roomId,title:localRoom.title,campaignId:localRoom.campaignId});
    }
    if(p==='/api/online/heartbeat')return reply({ok:true});
    if(p==='/api/online/room')return reply({ok:true,room:localRoom||{roomId:String(body.roomId||''),title:'Gameplay E2E',campaignId:'campaign-local'},members:[{playerId:String(body.playerId||'player-e2e'),character:{name:'Gameplay E2E'}}]});
    if(p==='/api/online/messages')return reply({ok:true,messages:localMessages.filter(x=>Number(x.id)>Number(body.afterId||0))});
    if(p==='/api/online/message'){
      const item={id:++localMessageId,roomId:String(body.roomId||''),playerId:String(body.playerId||''),characterName:String(body.characterName||'Shinobi'),message:String(body.message||''),at:new Date().toISOString()};
      localMessages.push(item);return reply({ok:true,message:item});
    }
    if(p==='/api/online/action'){
      const item={id:++localActionId,roomId:String(body.roomId||''),playerId:String(body.playerId||''),characterName:String(body.characterName||'Shinobi'),action:String(body.action||'intent'),payload:cloneLocal(body.payload||{}),character:cloneLocal(body.character||{}),at:new Date().toISOString()};
      localActions.push(item);return reply({ok:true,action:item});
    }
    if(p==='/api/online/state')return reply({ok:true,actions:localActions.filter(x=>Number(x.id)>Number(body.afterId||0)),shared:{roomId:String(body.roomId||''),actionCount:localActions.length}});
    if(p==='/api/ai')return reply({ok:false,error:'LOCAL_AI_DISABLED'},503);
    return reply({ok:true});
  });`;

base=base.replace(pageMarker,pageMarker+fixtureCode);

const kuraiOpen=`async function testKurai(browser){\n  const context=await browser.newContext({viewport:{width:1365,height:900}});\n  const page=await context.newPage();\n  try{`;
if(!base.includes(kuraiOpen))throw new Error('LOCAL_GAMEPLAY_KURAI_CONTEXT_TARGET_MISSING');
base=base.replace(kuraiOpen,`async function testKurai(page){\n  try{`);
const kuraiSeed=`    await page.evaluate(({key,fixture})=>localStorage.setItem(key,JSON.stringify(fixture)),{key:SAVE_KEY,fixture});`;
if(!base.includes(kuraiSeed))throw new Error('LOCAL_GAMEPLAY_KURAI_SEED_TARGET_MISSING');
base=base.replace(kuraiSeed,`    await page.evaluate(async ({key,slot,fixture})=>{\n      const json=JSON.stringify(fixture);\n      localStorage.setItem(key,json);\n      localStorage.setItem('sns-v841-active-account-slot',slot);\n      localStorage.setItem('narutoShinobiNoShoPcV5Active',slot);\n      for(let i=0;i<localStorage.length;i++){\n        const k=localStorage.key(i)||'';\n        if(k.startsWith('sns-v841-account-save:')&&k.endsWith(\`:\${slot}\`))localStorage.setItem(k,json);\n      }\n      await fetch('/api/account/save',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({slotId:slot,save:fixture,gameVersion:'R41-KURAI-E2E'})});\n    },{key:SAVE_KEY,slot:SLOT_ID,fixture});`);
const kuraiClose=`  } finally {await context.close();}\n}`;
if(!base.includes(kuraiClose))throw new Error('LOCAL_GAMEPLAY_KURAI_CLOSE_TARGET_MISSING');
base=base.replace(kuraiClose,`  } finally {}\n}`);
if(!base.includes('    await testKurai(browser);'))throw new Error('LOCAL_GAMEPLAY_KURAI_CALL_TARGET_MISSING');
base=base.replace('    await testKurai(browser);','    await testKurai(page);');

const consoleMarker="  page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text());});";
if(!base.includes(consoleMarker))throw new Error('LOCAL_GAMEPLAY_CONSOLE_MARKER_MISSING');
base=base.replace(consoleMarker,consoleMarker+"\n  page.on('response',r=>{if(r.status()===404)consoleErrors.push(`HTTP_404 ${r.url()}`);});");

const patchedBase=path.join(tmpDir,'browser-gameplay-e2e-local-base.mjs');
fs.writeFileSync(patchedBase,base,'utf8');

const v4Path=path.resolve('tools/browser-gameplay-e2e-v4.mjs');
let v4=fs.readFileSync(v4Path,'utf8');
const baseMarker="const basePath=path.resolve('tools/browser-gameplay-e2e.mjs');";
if(!v4.includes(baseMarker))throw new Error('LOCAL_GAMEPLAY_V4_BASE_MARKER_MISSING');
v4=v4.replace(baseMarker,`const basePath=${JSON.stringify(patchedBase)};`);
const patchedV4=path.join(tmpDir,'browser-gameplay-e2e-v4-local.mjs');
fs.writeFileSync(patchedV4,v4,'utf8');

try{
  await import(pathToFileURL(patchedV4).href);
}finally{
  try{fs.rmSync(tmpDir,{recursive:true,force:true});}catch{}
}
