import { chromium } from 'playwright';

const base=(process.env.BASE_URL||'http://127.0.0.1:4173').replace(/\/+$/,'');
const SAVE_KEY='narutoShinobiNoShoPcV4';
const ACTIVE_SLOT_KEY='narutoShinobiNoShoPcV5Active';
const SLOT_PREFIX='narutoShinobiNoShoPcV5:';
const SLOT_INDEX_KEY='narutoShinobiNoShoPcV5Slots';
const AUTH_TOKEN_KEY='sns-v841-auth-token';
const SLOT_ID='combat-local-e2e';
const ACCOUNT={id:'account-combat-local-e2e',username:'combat-local-e2e',role:'player',displayName:'Combat Local E2E'};
const fixture={
  version:'8.20.0-r40',
  playerId:'player-combat-local-e2e',campaignId:'campaign-combat-local-e2e',
  campaign:{name:'Regressão de combate',description:'',createdAt:Date.now()},
  settings:{sound:false,autoSave:true,aiStateChanges:true,combatSpeed:'rapido'},
  learned:['defesa_mao','defesa_acrobatica','soco','chute'],aptitudes:[],
  inventory:{kunai:5,shuriken:10,bomba_fumaca:2,tarja_explosiva:2,ramen_simples:2,kit_medico:1},
  equipment:{weapon:'kunai',armor:null},
  stats:{wins:0,losses:0,missions:0,failedMissions:0,criticalHits:0,totalXp:0,aiScenes:0},
  completedMissions:[],story:{reputation:0,chapter:1,flags:{},memorySummary:'',facts:[],npcs:[],missions:[]},
  travel:{currentVillage:'folha',selectedVillage:'folha',villagePos:{x:6,y:6},worldPos:{x:10,y:7},log:[]},
  world:{events:[],rumors:[]},cloud:{lastSync:'',lastLoad:'',enabled:false},online:{roomId:'',title:'',joinedAt:'',campaignId:'',previousCampaignId:''},
  character:{
    name:'Combat Local E2E',age:18,gender:'masculino',appearance:'fixture',personality:'fixture',avatar:'assets/ui/avatar.png',
    village:'folha',originVillage:'folha',origin:'sem_cla',hijutsu:null,variant:null,dualRule:false,ruleMode:'adapted',class:'nin',element:'fogo',profession:'',graduation:'Genin',nc:8,
    level:8,xp:0,ryo:5000,terionCore:{corpo:4,mente:4,espirito:5,tecnica:4},
    baseAttributes:{forca:4,destreza:4,agilidade:4,percepcao:5,inteligencia:4,vigor:5,espirito:5,carisma:3,manipulacao:3},
    attributes:{forca:4,destreza:4,agilidade:4,percepcao:5,inteligencia:4,vigor:5,espirito:5,carisma:3,manipulacao:3},
    combatBase:{cc:4,cd:4,esq:4,lm:4},combat:{cc:4,cd:4,esq:4,lm:4},skills:{rastrear:2,procurar:2,sobrevivencia:2,criacao:2},
    attributePoints:0,skillPoints:0,powerPoints:0,aptitudePoints:0,trainingPoints:4,
    hp:30,maxHp:40,chakra:24,maxChakra:30,stamina:18,maxStamina:24,conditions:[],injuries:[]
  }
};
const slotSummary={slotId:SLOT_ID,id:SLOT_ID,name:fixture.character.name,campaign:fixture.campaign.name,level:fixture.character.level,graduation:fixture.character.graduation,village:fixture.character.village,origin:fixture.character.origin,avatar:fixture.character.avatar,updatedAt:Date.now(),playerId:fixture.playerId,campaignId:fixture.campaignId};

const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1365,height:900}});
const pageErrors=[],failedImages=[];
const isImage=url=>/\.(?:png|jpe?g|webp|gif|svg)(?:\?|$)/i.test(url);
page.on('pageerror',e=>pageErrors.push(String(e?.message||e)));
page.on('requestfailed',req=>{const url=req.url();if(url.startsWith(base)&&isImage(url))failedImages.push({url,error:req.failure()?.errorText||'request failed'});});
page.on('response',response=>{const url=response.url();if(url.startsWith(base)&&isImage(url)&&response.status()>=400)failedImages.push({url,status:response.status()});});
await page.route('**/api/**',async route=>{
  const url=new URL(route.request().url());
  const path=url.pathname;
  const json=value=>route.fulfill({status:200,contentType:'application/json; charset=utf-8',body:JSON.stringify(value)});
  if(path==='/api/auth/me')return json({ok:true,account:ACCOUNT});
  if(path==='/api/account/slots')return json({ok:true,slots:[slotSummary],mirrors:{cloud:false}});
  if(path==='/api/account/load')return json({ok:true,slotId:SLOT_ID,save:fixture,mirrors:{cloud:false}});
  if(path==='/api/v84/bootstrap')return json({ok:true,world:{},savePoints:[]});
  if(path==='/api/status')return json({ok:true,enabled:false,cloudSave:false,providers:[],routes:{}});
  return json({ok:true});
});
try{
  const response=await page.goto(`${base}/?combat-local=${Date.now()}`,{waitUntil:'domcontentloaded',timeout:60000});
  if(!response?.ok())throw new Error(`site HTTP ${response?.status()}`);
  await page.evaluate(({fixture,slotId,saveKey,activeKey,prefix,indexKey,authKey,apiOrigin})=>{
    const json=JSON.stringify(fixture);
    localStorage.setItem('sns-api-origin',apiOrigin);
    localStorage.setItem(saveKey,json);
    localStorage.setItem(activeKey,slotId);
    localStorage.setItem(prefix+slotId,json);
    localStorage.setItem(indexKey,JSON.stringify([{slotId,id:slotId,name:fixture.character.name,campaign:fixture.campaign.name,level:fixture.character.level,graduation:fixture.character.graduation,village:fixture.character.village,origin:fixture.character.origin,avatar:fixture.character.avatar,updatedAt:Date.now(),playerId:fixture.playerId,campaignId:fixture.campaignId}]));
    sessionStorage.setItem(authKey,'local-ci-token');
  },{fixture,slotId:SLOT_ID,saveKey:SAVE_KEY,activeKey:ACTIVE_SLOT_KEY,prefix:SLOT_PREFIX,indexKey:SLOT_INDEX_KEY,authKey:AUTH_TOKEN_KEY,apiOrigin:'https://local-e2e.workers.dev'});
  await page.reload({waitUntil:'domcontentloaded',timeout:60000});
  await page.waitForFunction(()=>!!window.__NARUTO_R41__?.version,{timeout:20000});

  const accountLoad=page.locator(`[data-action="load-account-slot"][data-id="${SLOT_ID}"], [data-action="load-account-slot"][data-slot="${SLOT_ID}"], [data-action="account-load"][data-id="${SLOT_ID}"]`).first();
  try{
    await accountLoad.waitFor({state:'visible',timeout:15000});
  }catch{
    const ui=await page.evaluate(()=>({
      heading:document.querySelector('#screen h1')?.textContent?.trim()||'',
      screen:(document.querySelector('#screen')?.textContent||'').trim().slice(0,3000),
      actions:[...document.querySelectorAll('[data-action]')].map(el=>({
        action:el.getAttribute('data-action'),
        id:el.getAttribute('data-id'),
        slot:el.getAttribute('data-slot'),
        text:(el.textContent||'').trim().slice(0,120)
      }))
    }));
    throw new Error(`ACCOUNT_SLOT_ACTION_MISSING ${JSON.stringify(ui)}`);
  }
  await accountLoad.click();

  const combatNav=page.locator('[data-screen="combate"]').first();
  await combatNav.waitFor({state:'visible',timeout:15000});
  await combatNav.click();
  const start=page.locator('[data-action="start-battle"]:not([disabled])').first();
  await start.waitFor({state:'visible',timeout:15000});
  await start.click();
  await page.waitForTimeout(500);

  const attack=page.locator('[data-action="v82-basic-melee"]:not([disabled])').first();
  await attack.waitFor({state:'visible',timeout:15000});
  await attack.click();
  await page.waitForTimeout(900);

  const publicState=await page.evaluate(()=>window.__NARUTO_R41__?.state?.()||null);
  const persisted=await page.evaluate(({activeKey,prefix,saveKey})=>{try{const id=localStorage.getItem(activeKey)||'',raw=(id&&localStorage.getItem(prefix+id))||localStorage.getItem(saveKey)||'null';return JSON.parse(raw)}catch{return null}},{activeKey:ACTIVE_SLOT_KEY,prefix:SLOT_PREFIX,saveKey:SAVE_KEY});
  const p=publicState?.lastCombatPresentation;
  const pp=persisted?.r41?.lastCombatPresentation;
  if(!p)throw new Error('lastCombatPresentation ausente na API R41 após v82-basic-melee');
  if(!pp)throw new Error('lastCombatPresentation ausente no slot V5 persistido após v82-basic-melee');
  if(p?.result?.source!=='v82_basic_melee')throw new Error(`fonte de combate incorreta: ${p?.result?.source}`);
  if(p?.result?.confirmed!==true)throw new Error('resultado V82 não marcado como confirmado');
  if(p?.validation?.ok===false)throw new Error(`validação TERION falhou: ${JSON.stringify(p.validation.errors||[])}`);
  if(Number(persisted?.r41?.autosave?.localAt||0)<=0)throw new Error('autosave local não foi marcado pela ponte V82');
  if(pageErrors.length)throw new Error(`erros de página: ${JSON.stringify(pageErrors)}`);
  const uniqueBroken=[...new Map(failedImages.map(x=>[x.url,x])).values()];
  if(uniqueBroken.length)throw new Error(`imagens quebradas no fluxo de combate: ${JSON.stringify(uniqueBroken)}`);
  console.log('PASS_V82_TERION_COMBAT',JSON.stringify({result:p.result,validation:p.validation,autosaveLocalAt:persisted.r41.autosave.localAt}));
} finally {
  await browser.close();
}
