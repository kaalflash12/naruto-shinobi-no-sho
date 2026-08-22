import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const site=(process.env.PUBLIC_GAME_URL||'https://kaalflash12.github.io/naruto-shinobi-no-sho/').replace(/\/+$/,'/') ;
const reportPath=process.env.BROWSER_GAMEPLAY_REPORT||'audit/BROWSER-GAMEPLAY-E2E.json';
const SAVE_KEY='narutoShinobiNoShoPcV4';
const ACTIVE_SLOT_KEY='narutoShinobiNoShoPcV5Active';
const SLOT_ID=`gameplay-${Date.now().toString(36)}`;
const suffix=`${Date.now().toString(36)}${Math.random().toString(36).slice(2,7)}`;
const username=`play_${suffix}`.slice(0,28);
const email=`${username}@example.com`;
const password=`Aa!7_${suffix}_pw`;
const failures=[],checks={},evidence={},contracts=[];
const pageErrors=[],consoleErrors=[];
let cleanupPage=null;

function assert(cond,msg){if(!cond)throw new Error(msg);}
function pass(name,value=true){checks[name]=value;return value;}
function contract(id,cond,detail={}){contracts.push({id,status:cond?'PASS_GAMEPLAY_E2E':'FAIL_GAMEPLAY_E2E',evidence:detail});if(!cond)throw new Error(`${id}: ${detail.reason||'prova E2E insuficiente'}`);}
function sleep(ms){return new Promise(r=>setTimeout(r,ms));}

function normalFixture(){
  const attrs={forca:4,destreza:4,agilidade:4,percepcao:5,inteligencia:4,vigor:5,espirito:5,carisma:3,manipulacao:3};
  return {
    version:'8.20.0-r40',
    playerId:`player-e2e-${suffix}`,
    campaignId:`campaign-e2e-${suffix}`,
    settings:{sound:false,autoSave:true,aiStateChanges:true,combatSpeed:'rapido'},
    learned:['defesa_mao','defesa_acrobatica','soco','chute'],
    aptitudes:[],
    inventory:{kunai:5,shuriken:10,bomba_fumaca:2,tarja_explosiva:2,ramen_simples:2,kit_medico:1},
    equipment:{weapon:'kunai',armor:null},
    stats:{wins:0,losses:0,missions:0,failedMissions:0,criticalHits:0,totalXp:0,aiScenes:0},
    completedMissions:[],
    story:{reputation:0,chapter:1,flags:{},memorySummary:'',facts:[],npcs:[],missions:[]},
    travel:{currentVillage:'folha',selectedVillage:'folha',villagePos:{x:6,y:6},worldPos:{x:10,y:7},log:[]},
    world:{events:[],rumors:[]},
    cloud:{lastSync:'',lastLoad:'',enabled:false},
    online:{roomId:'',title:'',joinedAt:'',campaignId:'',previousCampaignId:''},
    character:{
      name:'Gameplay E2E',age:18,gender:'masculino',appearance:'fixture E2E',personality:'teste automatizado',
      avatar:'assets/ui/avatar.png',village:'folha',originVillage:'folha',origin:'sem_cla',hijutsu:null,variant:null,
      dualRule:false,ruleMode:'adapted',class:'nin',element:'fogo',profession:'',level:8,xp:0,ryo:5000,
      terionCore:{corpo:4,mente:4,espirito:5,tecnica:4},baseAttributes:{...attrs},attributes:{...attrs},
      combatBase:{cc:4,cd:4,esq:4,lm:4},combat:{cc:4,cd:4,esq:4,lm:4},skills:{rastrear:2,procurar:2,sobrevivencia:2,criacao:2},
      attributePoints:0,skillPoints:0,powerPoints:0,aptitudePoints:0,trainingPoints:4,
      hp:9,maxHp:40,chakra:10,maxChakra:30,stamina:12,maxStamina:24,
      conditions:['Fratura grave do braço'],
      injuries:[{id:'inj_e2e_fratura',label:'Fratura grave do braço',severity:2,persistent:true,status:'ACTIVE',source:'browser-gameplay-e2e',createdAt:Date.now()}]
    }
  };
}

function leonFixture(){
  return {
    version:'8.20.0-r40',settings:{sound:false,autoSave:false,aiStateChanges:true,combatSpeed:'rapido'},
    inventory:{kunai:1},equipment:{weapon:'kunai',armor:null},stats:{wins:0,losses:0,missions:0,failedMissions:0,criticalHits:0,totalXp:0,aiScenes:0},
    completedMissions:[],story:{reputation:0,chapter:1,flags:{},memorySummary:'',facts:[],npcs:[],missions:[]},
    travel:{currentVillage:'folha',selectedVillage:'folha',villagePos:{x:6,y:6},worldPos:{x:10,y:7},log:[]},world:{events:[],rumors:[]},cloud:{lastSync:'',lastLoad:'',enabled:false},online:{roomId:'',title:'',joinedAt:'',campaignId:'',previousCampaignId:''},
    character:{name:'Leon E2E',privateCharacter:'leon',avatar:'assets/private/leon_kosmo_avatar.jpg',village:'folha',level:8,graduation:'Genin',hp:30,maxHp:30,chakra:20,maxChakra:20,stamina:20,maxStamina:20,ryo:5000,conditions:[],injuries:[],kusenroChakra:6,kusenroMaxChakra:6,kurai:{id:'ITEM_KURAI',name:'Kurai',pv:8,maxPv:8,defense:13,chakra:8,maxChakra:8,damage:2,equipped:true,mode:'guardada'},specialProfile:{identity:'Fixture isolada do gate; não usa o save privado real.',coreAttributes:{Corpo:4,Mente:4,Espírito:5,Técnica:4},skillRatings:{Ninjutsu:4,'Controle Espacial':1,'Kenjutsu/Kurai':4},jutsus:[]}}
  };
}

async function readSave(page){return page.evaluate(key=>{try{return JSON.parse(localStorage.getItem(key)||'null')}catch{return null}},SAVE_KEY);}
async function r41State(page){return page.evaluate(()=>window.__NARUTO_R41__?.state?.()||null);}
async function masterState(page){const s=await readSave(page);return s?.masterV83||s?.masterV84||s?.r27?.master||null;}
async function navigate(page,screen){const b=page.locator(`[data-screen="${screen}"]`).first();await b.waitFor({state:'visible',timeout:20000});await b.click();await page.waitForTimeout(300);}

async function playVisibleMinigame(page){
  await page.locator('.r41-minigame').waitFor({state:'visible',timeout:15000});
  const deadline=Date.now()+25000;
  let clicks=0;
  while(Date.now()<deadline){
    if(await page.locator('.r41-minigame').count()===0)return clicks;
    const good=page.locator('.r41-minigame [data-r41-game][data-good="1"]').first();
    if(await good.count()){await good.click();clicks++;await page.waitForTimeout(80);continue;}
    const timing=page.locator('.r41-minigame [data-r41-game="timing-hit"]').first();
    if(await timing.count()){await timing.click();clicks++;await page.waitForTimeout(80);continue;}
    const seq=page.locator('.r41-minigame [data-r41-game="seq"]').first();
    if(await seq.count()){await seq.click();clicks++;await page.waitForTimeout(60);continue;}
    const any=page.locator('.r41-minigame [data-r41-game]').first();
    if(await any.count()){await any.click();clicks++;await page.waitForTimeout(80);continue;}
    await page.waitForTimeout(120);
  }
  throw new Error('minigame não terminou no prazo');
}

async function register(page){
  const resp=await page.goto(`${site}?account=1&tab=register&gameplay=${Date.now()}`,{waitUntil:'domcontentloaded',timeout:90000});
  assert(resp?.ok(),`site HTTP ${resp?.status()}`);
  await page.waitForSelector('[data-testid="sns-account-panel"]',{timeout:30000});
  const form=page.locator('[data-form="register"]');
  await form.locator('[data-field="username"]').fill(username);
  await form.locator('[data-field="displayName"]').fill('Gameplay E2E');
  await form.locator('[data-field="email"]').fill(email);
  await form.locator('[data-field="password"]').fill(password);
  await form.locator('[data-field="confirm"]').fill(password);
  await form.locator('button[type="submit"]').click();
  await page.waitForSelector('[data-testid="sns-account-authenticated"]',{timeout:30000});
  const token=await page.evaluate(()=>sessionStorage.getItem('sns-v841-auth-token')||'');
  assert(token,'registro não deixou sessão autenticada');
  pass('temporaryAccountRegistered');
  return token;
}

async function seedNormal(page){
  const fixture=normalFixture();
  await page.evaluate(({key,activeKey,slot,fixture})=>{localStorage.setItem(key,JSON.stringify(fixture));localStorage.setItem(activeKey,slot);},{key:SAVE_KEY,activeKey:ACTIVE_SLOT_KEY,slot:SLOT_ID,fixture});
  await page.goto(`${site}?gameplay=1&v=${Date.now()}`,{waitUntil:'domcontentloaded',timeout:90000});
  await page.waitForFunction(()=>!!window.__NARUTO_R41__?.version,{timeout:30000});
  await page.waitForTimeout(1400);
  const s=await readSave(page);
  assert(s?.character?.name==='Gameplay E2E','fixture normal não carregou');
  return s;
}

async function testNormalGameplay(page,token){
  const initial=await readSave(page);
  assert(initial?.character,'personagem E2E ausente');

  // Ferimento persistente + estado visual: prova na ficha renderizada, não apenas no JSON.
  await navigate(page,'personagem');
  await page.locator('.r41-appearance-state').waitFor({state:'visible',timeout:15000});
  const visualText=await page.locator('.r41-appearance-state').innerText();
  const injuriesBefore=await page.evaluate(()=>window.__NARUTO_R41__?.injuries?.()||[]);
  contract('persistent_injuries',injuriesBefore.some(x=>x.id==='inj_e2e_fratura'),{ui:visualText.includes('inj_e2e_fratura'),active:injuriesBefore.map(x=>({id:x.id,status:x.status,severity:x.severity}))});
  contract('visual_state',visualText.includes('APARÊNCIA PERSISTENTE')&&visualText.includes('inj_e2e_fratura'),{uiSection:'r41-appearance-state',damageBadge:'inj_e2e_fratura'});

  // Hospital: abre pelo mapa real, cobra, melhora PV e estabiliza sem apagar lesão grave.
  await navigate(page,'vila');
  const hotspot=page.locator('[data-action="map-hotspot"][data-id="hospital"]').first();
  await hotspot.waitFor({state:'visible',timeout:15000});
  await hotspot.click();
  await page.waitForTimeout(250);
  const enter=page.locator('[data-action="map-enter"][data-id="hospital"]').first();
  if(await enter.count())await enter.click();else await hotspot.click();
  await page.locator('.r41-hospital').waitFor({state:'visible',timeout:15000});
  const hospitalUi=await page.locator('.r41-hospital').innerText();
  const beforeHospital=await readSave(page);
  const masterBeforeHospital=await masterState(page);
  await page.locator('[data-action="r41-hospital-treat"]').click();
  await page.waitForTimeout(700);
  const afterHospital=await readSave(page);
  const masterAfterHospital=await masterState(page);
  const injuryAfter=afterHospital?.character?.injuries?.find(x=>x.id==='inj_e2e_fratura');
  const hpImproved=Number(afterHospital?.character?.hp)>Number(beforeHospital?.character?.hp);
  const paid=Number(afterHospital?.character?.ryo)<Number(beforeHospital?.character?.ryo);
  const persisted=injuryAfter&&injuryAfter.status!=='HEALED';
  const tickHospital=Number(masterAfterHospital?.world?.ticks||0)>Number(masterBeforeHospital?.world?.ticks||0);
  contract('hospital_treatment',hospitalUi.includes('Ferimentos persistentes')&&hpImproved&&paid&&persisted,{before:{hp:beforeHospital?.character?.hp,ryo:beforeHospital?.character?.ryo},after:{hp:afterHospital?.character?.hp,ryo:afterHospital?.character?.ryo,injuryStatus:injuryAfter?.status},ui:hospitalUi.slice(0,500)});
  pass('hospitalWorldTick',tickHospital);

  // Descanso curto e longo pela tela real. Curto: +4 chakra e sem cura de PV; longo: respeita teto do ferimento grave.
  await navigate(page,'descanso-r27');
  const beforeShort=await readSave(page),masterBeforeShort=await masterState(page);
  await page.locator('[data-action="r27-rest"][data-id="short"]').click();
  await page.waitForTimeout(500);
  const afterShort=await readSave(page),masterAfterShort=await masterState(page);
  const expectedShort=Math.min(Number(beforeShort.character.maxChakra),Number(beforeShort.character.chakra)+4);
  const shortOk=Number(afterShort.character.chakra)===expectedShort&&Number(afterShort.character.hp)===Number(beforeShort.character.hp);
  const shortTick=Number(masterAfterShort?.world?.ticks||0)>Number(masterBeforeShort?.world?.ticks||0);
  await page.locator('[data-action="r27-rest"][data-id="long"]').click();
  await page.waitForTimeout(500);
  const afterLong=await readSave(page),masterAfterLong=await masterState(page);
  const cap=Math.max(1,Math.floor(Number(afterLong.character.maxHp||1)*.75));
  const severeStill=(afterLong.character.injuries||[]).some(x=>x.id==='inj_e2e_fratura'&&x.status!=='HEALED');
  const longOk=Number(afterLong.character.hp)<=cap&&Number(afterLong.character.chakra)===Number(afterLong.character.maxChakra)&&severeStill;
  contract('rest_consequences',shortOk&&longOk,{short:{beforeChakra:beforeShort.character.chakra,afterChakra:afterShort.character.chakra,beforeHp:beforeShort.character.hp,afterHp:afterShort.character.hp},long:{hp:afterLong.character.hp,maxHp:afterLong.character.maxHp,cap,injuryPersists:severeStill}});
  pass('restWorldTick',shortTick&&Number(masterAfterLong?.world?.ticks||0)>Number(masterAfterShort?.world?.ticks||0));

  // Minijogo real iniciado por atividade real da vila; depois TERION aplica consequência e World Tick.
  await navigate(page,'vila');
  const miniBefore=await r41State(page),masterBeforeMini=await masterState(page);
  await page.locator('.r41-activities [data-action="r41-activity"][data-id="coleta"]').click();
  const miniClicks=await playVisibleMinigame(page);
  await page.waitForTimeout(1000);
  const miniAfter=await r41State(page),masterAfterMini=await masterState(page);
  const activityHistory=miniAfter?.activities?.history||[];
  const miniHistory=miniAfter?.minigames?.history||[];
  const miniRec=miniHistory.at(-1);
  const activityRec=activityHistory.at(-1);
  contract('minigame_engine',Number(miniAfter?.minigames?.total||0)>Number(miniBefore?.minigames?.total||0)&&miniRec?.context?.source==='world_activity'&&activityRec?.id==='coleta',{clicks:miniClicks,result:miniRec?.result,activity:activityRec});
  pass('minigameWorldTick',Number(masterAfterMini?.world?.ticks||0)>Number(masterBeforeMini?.world?.ticks||0));

  // Combate real: inicia arena, executa ação e exige apresentação R41 + savepoint/autosave local.
  await navigate(page,'combate');
  const startBattle=page.locator('[data-action="start-battle"]:not([disabled])').first();
  await startBattle.waitFor({state:'visible',timeout:15000});
  await startBattle.click();
  await page.waitForTimeout(500);
  const combatBefore=await r41State(page);
  const attack=page.locator('[data-action="basic-attack"]:not([disabled])').first();
  await attack.waitFor({state:'visible',timeout:15000});
  await attack.click();
  await page.locator('.r41-combat-present').waitFor({state:'visible',timeout:5000}).catch(()=>{});
  await page.waitForTimeout(500);
  const combatAfter=await r41State(page);
  const combatPresent=combatAfter?.lastCombatPresentation;
  contract('combat_pipeline',!!combatPresent&&combatPresent?.validation?.ok!==false&&Number(combatAfter?.autosave?.localAt||0)>=Number(combatBefore?.autosave?.localAt||0),{result:combatPresent?.result,validation:combatPresent?.validation,animation:combatPresent?.animation||null});

  // Sair do combate para não bloquear descanso/missão.
  const end=page.locator('[data-action="end-battle"]');if(await end.count())await end.click();

  // Missão designada: escolha real; R41 obriga minijogo antes da resolução TERION.
  await navigate(page,'missoes');
  let missionStart=page.locator('[data-action="start-mission"]:not([disabled])').first();
  if(!(await missionStart.count())){
    const tasks=page.locator('[data-action="r382-board-tab"][data-id="tasks"]');
    if(await tasks.count()){await tasks.click();await page.waitForTimeout(400);missionStart=page.locator('[data-action="start-mission"]:not([disabled])').first();}
  }
  await missionStart.waitFor({state:'visible',timeout:15000});
  const missionId=await missionStart.getAttribute('data-id');
  await missionStart.click();
  await page.waitForTimeout(600);
  const route=page.locator('[data-action="mission-route"]:not([disabled])').first();
  if(await route.count()){await route.click();await page.waitForTimeout(500);}
  let choice=page.locator('[data-action="mission-choice"]:not([disabled])').first();
  if(!(await choice.count())){
    const resume=page.locator('[data-action="r32-resume-mission"]');if(await resume.count()){await resume.click();await page.waitForTimeout(500);choice=page.locator('[data-action="mission-choice"]:not([disabled])').first();}
  }
  await choice.waitFor({state:'visible',timeout:15000});
  const missionMiniBefore=(await r41State(page))?.minigames?.total||0;
  await choice.click();
  let missionMiniClicks=0;
  if(await page.locator('.r41-minigame').count())missionMiniClicks=await playVisibleMinigame(page);
  else {await page.locator('.r41-minigame').waitFor({state:'visible',timeout:5000});missionMiniClicks=await playVisibleMinigame(page);}
  await page.waitForTimeout(1200);
  const missionState=await r41State(page);
  const missionGame=(missionState?.minigames?.history||[]).slice().reverse().find(x=>x?.context?.source==='mission');
  contract('mission_choice_resolution',Number(missionState?.minigames?.total||0)>Number(missionMiniBefore)&&missionGame?.context?.missionId===missionId,{missionId,clicks:missionMiniClicks,minigame:missionGame?.type,result:missionGame?.result,context:missionGame?.context});

  // Online: cria sala pelo UI, envia intenção real, lê de volta do estado compartilhado e prova após reload.
  await navigate(page,'online');
  const roomTitle=page.locator('#online-room-title');
  if(await roomTitle.count())await roomTitle.fill(`E2E ${suffix}`);
  const createRoom=page.locator('[data-action="online-create"]:not([disabled])');
  await createRoom.waitFor({state:'visible',timeout:30000});
  await createRoom.click();
  await page.locator('#r41-online-intent').waitFor({state:'visible',timeout:30000});
  const intent=`Cobrir saída E2E ${suffix}`;
  await page.locator('#r41-online-intent').fill(intent);
  await page.locator('[data-action="r41-online-intent"]').click();
  await page.waitForFunction(text=>document.body.innerText.includes(text),intent,{timeout:30000});
  const onlineState=await r41State(page);
  const intentSeen=(onlineState?.online?.actions||[]).some(a=>(a?.payload?.text||'')===intent&&a?.action==='intent');
  assert(intentSeen,'intenção online não voltou do servidor da sala');
  const saveBeforeReload=await readSave(page);
  await page.reload({waitUntil:'domcontentloaded',timeout:90000});
  await page.waitForFunction(()=>!!window.__NARUTO_R41__?.version,{timeout:30000});
  await navigate(page,'online');
  await page.locator('#r41-online-intent').waitFor({state:'visible',timeout:30000});
  await page.waitForFunction(text=>document.body.innerText.includes(text),intent,{timeout:30000});
  contract('online_intent_state',true,{roomId:saveBeforeReload?.online?.roomId,intent,persistedAcrossReload:true});

  // Visual persistente após reload: lesão grave continua ligada à composição visual.
  await navigate(page,'personagem');
  await page.locator('.r41-appearance-state').waitFor({state:'visible',timeout:15000});
  const visualReload=await page.locator('.r41-appearance-state').innerText();
  assert(visualReload.includes('inj_e2e_fratura'),'estado visual de dano não sobreviveu ao reload');
  checks.visualStateReload=true;

  // World Tick: exige incrementos independentes de hospital, descanso e atividade.
  const masterEnd=await masterState(page);
  const tickEvidence={hospital:tickHospital,shortRest:shortTick,longRest:Number(masterAfterLong?.world?.ticks||0)>Number(masterAfterShort?.world?.ticks||0),activity:Number(masterAfterMini?.world?.ticks||0)>Number(masterBeforeMini?.world?.ticks||0),finalTicks:Number(masterEnd?.world?.ticks||0)};
  contract('world_tick',Object.values(tickEvidence).slice(0,4).every(Boolean),tickEvidence);

  // Autosave: aguarda debounce/throttle real e confere round-trip na API da conta com consequência de gameplay.
  await sleep(14000);
  const auto=await r41State(page);
  assert(Number(auto?.autosave?.localAt||0)>0,'autosave local não marcou execução');
  assert(Number(auto?.autosave?.cloudAt||0)>0,`autosave cloud não confirmou execução: ${auto?.autosave?.lastError||'sem detalhe'}`);
  const cloud=await page.evaluate(async ({slot,token})=>{const r=await fetch('/api/account/load',{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`},body:JSON.stringify({slotId:slot})});return {status:r.status,data:await r.json()};},{slot:SLOT_ID,token});
  const cloudSave=cloud?.data?.save;
  const cloudHasGameplay=cloud.status===200&&cloudSave?.r41?.minigames?.total>0&&(cloudSave?.character?.injuries||[]).some(x=>x.id==='inj_e2e_fratura'&&x.status!=='HEALED');
  contract('save_autosave',cloudHasGameplay,{localAt:auto?.autosave?.localAt,cloudAt:auto?.autosave?.cloudAt,lastError:auto?.autosave?.lastError||'',cloudStatus:cloud.status,cloudMinigames:cloudSave?.r41?.minigames?.total,cloudInjury:cloudSave?.character?.injuries?.find(x=>x.id==='inj_e2e_fratura')?.status});

  // Sai da sala antes da exclusão da conta temporária.
  await navigate(page,'online');
  const leave=page.locator('[data-action="online-leave"]');if(await leave.count())await leave.click();
}

async function testKurai(browser){
  const context=await browser.newContext({viewport:{width:1365,height:900}});
  const page=await context.newPage();
  try{
    await page.goto(`${site}?kurai-e2e=${Date.now()}`,{waitUntil:'domcontentloaded',timeout:90000});
    const fixture=leonFixture();
    await page.evaluate(({key,fixture})=>localStorage.setItem(key,JSON.stringify(fixture)),{key:SAVE_KEY,fixture});
    await page.reload({waitUntil:'domcontentloaded',timeout:90000});
    await page.waitForFunction(()=>!!window.__NARUTO_R41__?.version,{timeout:30000});
    await page.locator('.r41-kurai').waitFor({state:'visible',timeout:15000});
    const hud=await page.locator('.r41-kurai').innerText();
    await navigate(page,'inventario');
    const kuraiPanel=page.locator('.kurai-interactive-v75');
    await kuraiPanel.waitFor({state:'visible',timeout:15000});
    const before=await readSave(page);
    await kuraiPanel.locator('[data-action="kurai-mode"][data-id="empunhada"]').click();
    await page.waitForTimeout(500);
    const after=await readSave(page);
    const uiText=await kuraiPanel.innerText().catch(()=>page.locator('body').innerText());
    await page.reload({waitUntil:'domcontentloaded',timeout:90000});
    const persisted=await readSave(page);
    contract('kurai_hud_resource',/Kurai/i.test(hud)&&/Chakra/i.test(uiText)&&before?.character?.kurai?.mode!==after?.character?.kurai?.mode&&after?.character?.kurai?.mode==='empunhada'&&persisted?.character?.kurai?.mode==='empunhada',{hud,beforeMode:before?.character?.kurai?.mode,afterMode:after?.character?.kurai?.mode,persistedMode:persisted?.character?.kurai?.mode,isolatedFixture:true});
  } finally {await context.close();}
}

async function cleanupAccount(page){
  try{
    if(!page||page.isClosed())return;
    const btn=page.locator('#sns-account-button');
    if(await btn.count()){await btn.click();await page.waitForTimeout(300);}
    const del=page.locator('[data-action="delete-account"]');
    if(await del.count()){
      page.once('dialog',d=>d.accept());await del.click();await page.waitForTimeout(800);checks.temporaryAccountDeleted=true;
    }
  }catch(e){consoleErrors.push(`cleanup: ${e.message}`);}
}

const browser=await chromium.launch({headless:true});
try{
  const context=await browser.newContext({viewport:{width:1365,height:900}});
  const page=await context.newPage();cleanupPage=page;
  page.on('pageerror',e=>pageErrors.push(String(e?.stack||e)));
  page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text());});
  try{
    const token=await register(page);
    await seedNormal(page);
    await testNormalGameplay(page,token);
    await testKurai(browser);
    const required=['save_autosave','kurai_hud_resource','persistent_injuries','hospital_treatment','rest_consequences','world_tick','minigame_engine','mission_choice_resolution','combat_pipeline','online_intent_state','visual_state'];
    const missing=required.filter(id=>!contracts.some(c=>c.id===id&&c.status==='PASS_GAMEPLAY_E2E'));
    assert(missing.length===0,`contratos sem PASS_GAMEPLAY_E2E: ${missing.join(', ')}`);
    pass('allOperationalContractsGameplayE2E');
  } finally {
    await cleanupAccount(page);
    await context.close();
  }
}catch(err){failures.push(String(err?.stack||err));}
finally{
  await browser.close();
  const fatalConsole=consoleErrors.filter(x=>/uncaught|referenceerror|syntaxerror/i.test(x));
  if(pageErrors.length)failures.push(`page errors: ${pageErrors.join(' | ')}`);
  if(fatalConsole.length)failures.push(`console fatal: ${fatalConsole.join(' | ')}`);
  const doc={generatedAt:new Date().toISOString(),status:failures.length?'FAIL_BROWSER_GAMEPLAY_E2E':'PASS_BROWSER_GAMEPLAY_E2E',ok:failures.length===0,scope:'PUBLIC_GITHUB_PAGES_REAL_CHROMIUM_GAMEPLAY',site,temporaryAccount:username,slotId:SLOT_ID,checks,contracts,evidence,pageErrors,consoleErrors:consoleErrors.slice(0,80),failures};
  fs.mkdirSync(path.dirname(reportPath),{recursive:true});
  fs.writeFileSync(reportPath,JSON.stringify(doc,null,2)+'\n');
  console.log(JSON.stringify(doc,null,2));
  if(failures.length)process.exitCode=1;
}
