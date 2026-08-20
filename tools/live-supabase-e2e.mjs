import fs from 'node:fs';
import path from 'node:path';

const origin = String(process.env.API_ORIGIN || 'https://rlyiwlwzrdgvcwawrnpl.supabase.co/functions/v1/shinobi-api').trim().replace(/\/+$/g, '');
const outPath = process.env.LIVE_BACKEND_REPORT || 'audit/LIVE-SUPABASE.json';
const startedAt = new Date().toISOString();
const checks = {};
const evidence = {};
const failures = [];

function assert(cond, msg) { if (!cond) throw new Error(msg); }
function pass(name) { checks[name] = true; }
async function request(route, { method='POST', token='', body, expected=[200], originHeader='' }={}) {
  const headers = { accept:'application/json' };
  if (body !== undefined) headers['content-type']='application/json';
  if (token) headers.authorization=`Bearer ${token}`;
  if (originHeader) headers.origin=originHeader;
  const res = await fetch(`${origin}${route}`, { method, headers, body:body===undefined?undefined:JSON.stringify(body), redirect:'error' });
  const text = await res.text();
  let data=null; try { data=text?JSON.parse(text):null; } catch { data={raw:text}; }
  if (!expected.includes(res.status)) throw new Error(`${route} HTTP ${res.status}; esperado ${expected.join('/')}; ${text.slice(0,1000)}`);
  return { res, data };
}
function write(status,ok){
  const report={generatedAt:new Date().toISOString(),startedAt,status,ok,scope:'SUPABASE_POSTGRES_EDGE_LIVE',apiOrigin:origin,checks,evidence,failures};
  fs.mkdirSync(path.dirname(outPath),{recursive:true});
  fs.writeFileSync(outPath,JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report,null,2));
}

try {
  assert(/^https:\/\//.test(origin),'API_ORIGIN precisa ser HTTPS.');
  const status=await request('/api/status',{method:'GET'});
  evidence.status=status.data;
  assert(status.data?.ok===true,'status.ok != true');
  assert(status.data?.configured===true,'backend não configurado');
  assert(status.data?.cloudSave===true,'cloudSave inativo');
  assert(status.data?.onlineRooms===true,'onlineRooms inativo');
  assert(status.data?.storage==='supabase-postgres',`storage inesperado: ${status.data?.storage}`);
  assert(status.data?.onlineAuthority==='intent-only-boundary','autoridade online não está em intent-only-boundary');
  pass('statusConfigured');

  const cors=await request('/api/status',{method:'GET',originHeader:'https://kaalflash12.github.io'});
  assert(cors.res.headers.get('access-control-allow-origin')==='https://kaalflash12.github.io','CORS não liberou GitHub Pages explicitamente');
  pass('githubPagesCors');

  const suffix=`${Date.now().toString(36)}${Math.random().toString(36).slice(2,8)}`;
  const password=`E2E!${suffix}Aa9`;
  const userA=`e2e_a_${suffix}`.slice(0,32);
  const userB=`e2e_b_${suffix}`.slice(0,32);
  evidence.testUsers=[userA,userB];

  const regA=await request('/api/auth/register',{body:{username:userA,password,displayName:`E2E A ${suffix}`},expected:[201]});
  const regB=await request('/api/auth/register',{body:{username:userB,password,displayName:`E2E B ${suffix}`},expected:[201]});
  assert(regA.data?.token&&regA.data?.account?.id,'registro A inválido');
  assert(regB.data?.token&&regB.data?.account?.id,'registro B inválido');
  const tokenA=regA.data.token, tokenB=regB.data.token;
  pass('registerTwoAccounts');

  const meA=await request('/api/auth/me',{token:tokenA});
  const meB=await request('/api/auth/me',{token:tokenB});
  assert(meA.data?.account?.username===userA,'auth/me A incorreto');
  assert(meB.data?.account?.username===userB,'auth/me B incorreto');
  pass('authenticatedSessions');

  const login=await request('/api/auth/login',{body:{username:userA,password}});
  assert(login.data?.token&&login.data?.account?.username===userA,'login persistente falhou');
  pass('loginRoundTrip');

  const unauthorized=await request('/api/account/slots',{body:{},expected:[401]});
  assert(unauthorized.data?.error==='UNAUTHORIZED','rota protegida aceitou anônimo');
  pass('unauthorizedRejected');

  const slotId=`e2e-${suffix}`, marker=`marker-${suffix}`;
  const saveData={version:'R41-E2E',playerId:`player-${suffix}`,campaignId:`campaign-${suffix}`,character:{name:'E2E Shinobi',level:7,pv:21,chakra:19},resources:{chakra:19,kurai:8},injuries:{arm:{severity:'grave',persistent:true}},world:{marker},missions:{e2e:{state:'active'}}};
  const saved=await request('/api/account/save',{token:tokenA,body:{slotId,save:saveData,gameVersion:'R41-E2E'}});
  assert(saved.data?.saved===true&&Number(saved.data?.revision)>=1,'save não confirmou revisão');
  const loaded=await request('/api/account/load',{token:tokenA,body:{slotId}});
  assert(loaded.data?.save?.world?.marker===marker,'load não restaurou mundo');
  assert(loaded.data?.save?.resources?.kurai===8,'load não restaurou Kurai');
  assert(loaded.data?.save?.injuries?.arm?.persistent===true,'load não restaurou ferimento persistente');
  pass('saveLoadRoundTrip');

  const slots=await request('/api/account/slots',{token:tokenA,body:{}});
  assert(Array.isArray(slots.data?.slots)&&slots.data.slots.some(x=>x.slotId===slotId),'slot salvo não listado');
  pass('slotListing');

  const created=await request('/api/online/create',{token:tokenA,body:{title:`E2E ${suffix}`,campaignId:`campaign-${suffix}`,playerId:`pa-${suffix}`,character:{name:'Shinobi A',level:7}},expected:[201]});
  const roomId=String(created.data?.roomId||'');
  assert(roomId.startsWith('room-'),'roomId inválido');
  evidence.roomId=roomId;
  pass('roomCreate');

  const joined=await request('/api/online/join',{token:tokenB,body:{roomId,playerId:`pb-${suffix}`,character:{name:'Shinobi B',level:5}}});
  assert(joined.data?.ok===true,'segunda conta não entrou na sala');
  pass('roomJoinSecondAccount');

  await request('/api/online/heartbeat',{token:tokenA,body:{roomId,playerId:`pa-${suffix}`,character:{name:'Shinobi A',level:7}}});
  await request('/api/online/heartbeat',{token:tokenB,body:{roomId,playerId:`pb-${suffix}`,character:{name:'Shinobi B',level:5}}});
  pass('heartbeatBothAccounts');

  const message=`mensagem-${suffix}`;
  await request('/api/online/message',{token:tokenA,body:{roomId,playerId:`pa-${suffix}`,characterName:'Shinobi A',message}});
  const messages=await request('/api/online/messages',{token:tokenB,body:{roomId,afterId:0}});
  assert(messages.data?.messages?.some(x=>x.message===message),'mensagem A → B não sincronizou');
  pass('roomMessaging');

  const intent=await request('/api/online/action',{token:tokenA,body:{roomId,playerId:`pa-${suffix}`,action:{type:'move',intent:'move',direction:'north',target:'training-field'}}});
  assert(intent.data?.accepted===true,'intenção legítima recusada');
  pass('intentActionAccepted');

  const forged=await request('/api/online/action',{token:tokenA,body:{roomId,playerId:`pa-${suffix}`,action:{type:'attack',intent:'attack',damage:999,success:true,xp:5000}},expected:[400]});
  assert(forged.data?.error==='CLIENT_MECHANICAL_RESULT_FORBIDDEN',`resultado mecânico forjado não foi bloqueado: ${JSON.stringify(forged.data)}`);
  pass('clientMechanicalResultRejected');

  const state=await request('/api/online/state',{token:tokenB,body:{roomId}});
  assert((state.data?.state?.members||[]).length>=2,'estado não contém os dois jogadores');
  assert((state.data?.state?.actions||[]).some(x=>x.type==='move'),'ação legítima não sincronizou');
  pass('roomStateSynchronized');

  const event=await request('/api/v84/world/event',{token:tokenA,body:{type:'world_tick',campaignId:`campaign-${suffix}`,minutes:20,source:'github-live-e2e',detail:{marker,verified:true}}});
  assert(event.data?.ok===true&&event.data?.event?.type==='world_tick','World Tick não persistiu');
  pass('worldEventPersisted');

  const savepoint=await request('/api/v84/world/savepoint',{token:tokenA,body:{campaignId:`campaign-${suffix}`,label:`E2E ${suffix}`,changes:['save','online'],character:{name:'E2E Shinobi',level:7}}});
  assert(savepoint.data?.ok===true,'SavePoint não persistiu');
  pass('savePointPersisted');

  const ai=await request('/api/ai',{token:tokenA,body:{mode:'game_master',intent:'narrar consequência',facts:[{text:'O shinobi entrou na área de treino.'}],gameContext:{rules:'TERION resolve mecânica antes da narrativa.',facts:[{text:'O shinobi entrou na área de treino.'}]}}});
  assert(ai.data?.ok===true,'narrador online falhou');
  assert(ai.data?.provider==='supabase-terion-narrator','provider de narração inesperado');
  assert(/Consequência confirmada/i.test(String(ai.data?.result||'')),'narrador não usou fatos confirmados');
  pass('factsOnlyNarrator');

  await request('/api/account/delete',{token:tokenA,body:{slotId}});
  pass('saveCleanup');

  await request('/api/auth/logout',{token:tokenA,body:{}});
  const revoked=await request('/api/auth/me',{token:tokenA,expected:[401]});
  assert(revoked.data?.error==='UNAUTHORIZED','logout não revogou token');
  await request('/api/auth/logout',{token:tokenB,body:{}});
  pass('sessionRevocation');

  write('PASS_LIVE_SUPABASE_E2E',true);
} catch (error) {
  failures.push(String(error?.stack||error?.message||error));
  write('FAIL_LIVE_SUPABASE_E2E',false);
  process.exitCode=1;
}
