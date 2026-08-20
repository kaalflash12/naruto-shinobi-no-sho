import fs from 'node:fs';
import path from 'node:path';

const API_ORIGIN = String(process.env.API_ORIGIN || 'https://rlyiwlwzrdgvcwawrnpl.supabase.co/functions/v1/shinobi-api').replace(/\/+$/g, '');
const REPORT = process.env.REPORT_PATH || 'audit/SUPABASE-LIVE-E2E.json';
const checks = {};
const failures = [];
const evidence = {};

function assert(value, message){ if(!value) throw new Error(message); }
function pass(name, detail=true){ checks[name] = detail; }
async function request(route,{method='POST',token='',body,expected=[200]}={}){
  const headers={accept:'application/json'};
  if(body!==undefined) headers['content-type']='application/json';
  if(token) headers.authorization=`Bearer ${token}`;
  const r=await fetch(`${API_ORIGIN}${route}`,{method,headers,body:body===undefined?undefined:JSON.stringify(body),redirect:'error'});
  const text=await r.text();
  let data=null; try{data=text?JSON.parse(text):null;}catch{data={raw:text};}
  if(!expected.includes(r.status)) throw new Error(`${route}: HTTP ${r.status}; esperado ${expected.join('/')}; ${text.slice(0,800)}`);
  return {status:r.status,data,headers:r.headers};
}
function write(status,ok){
  fs.mkdirSync(path.dirname(REPORT),{recursive:true});
  const report={generatedAt:new Date().toISOString(),status,ok,apiOrigin:API_ORIGIN,checks,evidence,failures};
  fs.writeFileSync(REPORT,JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report,null,2));
}

let tokenA='', tokenB='', slotId='';
try{
  const status=await request('/api/status',{method:'GET'});
  assert(status.data?.ok===true,'status.ok != true');
  assert(status.data?.configured===true,'backend não configurado');
  assert(status.data?.cloudSave===true,'cloudSave != true');
  assert(status.data?.onlineRooms===true,'onlineRooms != true');
  assert(status.data?.storage==='supabase-postgres',`storage inesperado: ${status.data?.storage}`);
  pass('statusConfigured'); evidence.status=status.data;

  const suffix=`${Date.now().toString(36)}${Math.random().toString(36).slice(2,8)}`;
  const password=`E2E_${suffix}_Aa9!`;
  const userA=`e2e_a_${suffix}`.slice(0,32);
  const userB=`e2e_b_${suffix}`.slice(0,32);

  const regA=await request('/api/auth/register',{body:{username:userA,password,displayName:`E2E A ${suffix}`},expected:[201]});
  const regB=await request('/api/auth/register',{body:{username:userB,password,displayName:`E2E B ${suffix}`},expected:[201]});
  assert(regA.data?.token && regA.data?.account?.id,'registro A inválido');
  assert(regB.data?.token && regB.data?.account?.id,'registro B inválido');
  tokenA=regA.data.token; tokenB=regB.data.token;
  pass('registerTwoAccounts'); evidence.accounts=[regA.data.account.id,regB.data.account.id];

  const meA=await request('/api/auth/me',{token:tokenA});
  const meB=await request('/api/auth/me',{token:tokenB});
  assert(meA.data?.account?.username===userA,'auth/me A divergente');
  assert(meB.data?.account?.username===userB,'auth/me B divergente');
  pass('authenticatedSessions');

  const anon=await request('/api/account/slots',{body:{},expected:[401]});
  assert(anon.data?.error==='UNAUTHORIZED','rota protegida não recusou anônimo');
  pass('unauthorizedRejected');

  slotId=`e2e-${suffix}`;
  const marker=`marker-${suffix}`;
  const saveData={version:'SUPABASE-E2E',character:{name:'E2E Shinobi',level:7,pv:21,chakra:19},resources:{chakra:19,kurai:8},world:{marker},missions:{e2e:{state:'active'}}};
  const save=await request('/api/account/save',{token:tokenA,body:{slotId,save:saveData,gameVersion:'SUPABASE-E2E'}});
  assert(save.data?.saved===true && Number(save.data?.revision)>=1,'save sem confirmação/revisão');
  const load=await request('/api/account/load',{token:tokenA,body:{slotId}});
  assert(load.data?.save?.world?.marker===marker,'load perdeu marcador');
  assert(load.data?.save?.resources?.kurai===8,'load perdeu Kurai');
  const slots=await request('/api/account/slots',{token:tokenA,body:{}});
  assert(Array.isArray(slots.data?.slots) && slots.data.slots.some(x=>x.slotId===slotId),'slot não listado');
  pass('saveLoadRoundTrip'); pass('kuraiPersisted'); pass('slotListing');

  const room=await request('/api/online/create',{token:tokenA,body:{title:`E2E ${suffix}`,campaignId:`campaign-${suffix}`,playerId:`player-a-${suffix}`,character:{name:'Shinobi A',level:7}},expected:[201]});
  const roomId=String(room.data?.roomId||''); assert(roomId.startsWith('room-'),'roomId inválido');
  pass('roomCreate'); evidence.roomId=roomId;

  const join=await request('/api/online/join',{token:tokenB,body:{roomId,playerId:`player-b-${suffix}`,character:{name:'Shinobi B',level:5}}});
  assert(join.data?.ok===true,'join B falhou'); pass('roomJoinSecondAccount');

  await request('/api/online/heartbeat',{token:tokenA,body:{roomId,playerId:`player-a-${suffix}`,character:{name:'Shinobi A',level:7}}});
  await request('/api/online/heartbeat',{token:tokenB,body:{roomId,playerId:`player-b-${suffix}`,character:{name:'Shinobi B',level:5}}});
  pass('roomHeartbeat');

  const msgText=`mensagem-${suffix}`;
  const msg=await request('/api/online/message',{token:tokenA,body:{roomId,playerId:`player-a-${suffix}`,characterName:'Shinobi A',message:msgText}});
  assert(msg.data?.message?.message===msgText,'mensagem não persistiu');
  const messages=await request('/api/online/messages',{token:tokenB,body:{roomId,afterId:0}});
  assert(messages.data?.messages?.some(x=>x.message===msgText),'B não recebeu mensagem de A');
  pass('roomMessaging');

  const intent=await request('/api/online/action',{token:tokenA,body:{roomId,playerId:`player-a-${suffix}`,action:{type:'move',intent:'move',direction:'north',target:'training-field'}}});
  assert(intent.data?.accepted===true,'ação de intenção foi recusada'); pass('intentActionAccepted');

  const forged=await request('/api/online/action',{token:tokenA,body:{roomId,playerId:`player-a-${suffix}`,action:{type:'attack',intent:'attack',damage:999,success:true,xp:5000}},expected:[400]});
  assert(forged.data?.error==='CLIENT_MECHANICAL_RESULT_FORBIDDEN','resultado mecânico forjado não foi bloqueado');
  pass('clientMechanicalResultRejected');

  const state=await request('/api/online/state',{token:tokenB,body:{roomId}});
  assert((state.data?.state?.members||[]).length>=2,'estado não contém dois membros');
  assert((state.data?.state?.actions||[]).some(x=>x.type==='move'),'ação não sincronizada no estado');
  pass('roomStateSynchronized');

  const world=await request('/api/v84/world/tick',{token:tokenA,body:{campaignId:`campaign-${suffix}`,minutes:20,source:'supabase-e2e',detail:{marker}}});
  assert(world.data?.ok===true && world.data?.event?.type==='world_tick','World Tick não persistiu'); pass('worldTickPersisted');

  const sp=await request('/api/v84/world/savepoint',{token:tokenA,body:{campaignId:`campaign-${suffix}`,label:`E2E ${suffix}`,changes:['room joined','intent accepted'],character:{name:'E2E Shinobi',level:7}}});
  assert(sp.data?.ok===true && sp.data?.savepoint?.id,'SavePoint não persistiu'); pass('savePointPersisted');

  const narrator=await request('/api/ai',{token:tokenA,body:{mode:'game_master',intent:'narrar consequência',facts:[{text:'O shinobi entrou na sala de treino.'}],gameContext:{facts:[{text:'O shinobi entrou na sala de treino.'}],rules:'TERION resolve mecânica.'}}});
  assert(narrator.data?.ok===true,'narrador online falhou');
  assert(narrator.data?.provider==='supabase-terion-narrator','provider do narrador inesperado');
  assert(narrator.data?.model==='facts-only-v1','modelo do narrador inesperado');
  pass('factsOnlyNarrator');

  await request('/api/account/delete',{token:tokenA,body:{slotId}}); pass('saveCleanup');
  await request('/api/auth/logout',{token:tokenA,body:{}});
  await request('/api/auth/logout',{token:tokenB,body:{}});
  const loggedOut=await request('/api/auth/me',{token:tokenA,expected:[401]});
  assert(loggedOut.data?.error==='UNAUTHORIZED','logout não revogou sessão'); pass('sessionRevocation');

  write('PASS_SUPABASE_LIVE_E2E',true);
}catch(error){
  failures.push(String(error?.stack||error?.message||error));
  try{ if(tokenA && slotId) await request('/api/account/delete',{token:tokenA,body:{slotId},expected:[200,404]}); }catch{}
  try{ if(tokenA) await request('/api/auth/logout',{token:tokenA,body:{},expected:[200]}); }catch{}
  try{ if(tokenB) await request('/api/auth/logout',{token:tokenB,body:{},expected:[200]}); }catch{}
  write('FAIL_SUPABASE_LIVE_E2E',false);
  process.exitCode=1;
}
