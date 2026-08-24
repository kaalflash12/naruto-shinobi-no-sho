import fs from 'node:fs';

const origin=String(process.env.API_ORIGIN||'https://rlyiwlwzrdgvcwawrnpl.supabase.co/functions/v1/shinobi-api').replace(/\/+$/,'');
const apikey=String(process.env.SUPABASE_PUBLISHABLE_KEY||'sb_publishable_S9LtSpLhLKFOU9iSd8b4yQ_EziH1Arr');
const suffix=`${Date.now().toString(36)}${Math.random().toString(36).slice(2,8)}`;
const userA=`livea_${suffix}`.slice(0,30),userB=`liveb_${suffix}`.slice(0,30);
const emailA=`${userA}@example.com`,emailB=`${userB}@example.com`;
const passA=`Aa!7_${suffix}_old`,passB=`Bb!8_${suffix}_pw`,passNew=`Cc!9_${suffix}_new`;
const checks={},evidence={},failures=[];
let tokenA='',tokenB='',roomId='';
const mark=(k,v=true)=>{checks[k]=v;return v;};
function assert(cond,msg){if(!cond)throw new Error(msg);}
async function api(route,{method='GET',body,token}={}){
  const headers={apikey,'content-type':'application/json'};if(token)headers.authorization=`Bearer ${token}`;
  const r=await fetch(origin+route,{method,headers,body:body===undefined?undefined:JSON.stringify(body)});
  const data=await r.json().catch(()=>({}));return {status:r.status,ok:r.ok,data,headers:r.headers};
}
async function cleanup(){
  for(const t of [tokenA,tokenB]){if(!t)continue;try{await api('/api/auth/delete-account',{method:'POST',body:{},token:t});}catch{}}
}
try{
  const status=await api('/api/status');
  assert(status.ok&&status.data?.ok===true,'/api/status falhou');
  assert(status.data.storage==='supabase-postgres','status não confirmou Supabase Postgres');
  assert(String(status.data.backend||'').startsWith('shinobi-api-'),'backend identity inválida');
  mark('statusConfigured');mark('supabasePostgres');evidence.status=status.data;

  const boot=await api('/api/v84/bootstrap');assert(boot.ok&&boot.data?.ok===true,'bootstrap falhou');mark('bootstrap');

  const regA=await api('/api/auth/register',{method:'POST',body:{username:userA,email:emailA,displayName:'Live A',password:passA}});
  const regB=await api('/api/auth/register',{method:'POST',body:{username:userB,email:emailB,displayName:'Live B',password:passB}});
  assert(regA.status===201&&regA.data?.token,'registro A falhou');assert(regB.status===201&&regB.data?.token,'registro B falhou');
  tokenA=regA.data.token;tokenB=regB.data.token;mark('registerTwoAccounts');mark('register');evidence.initialRecoveryCode=Boolean(regA.data.recoveryCode);

  const meA=await api('/api/auth/me',{token:tokenA});assert(meA.ok&&meA.data?.account?.username===userA,'me A falhou');mark('authenticatedSessions');mark('meAfterRegister');
  const unauth=await api('/api/account/slots');assert(unauth.status===401,'rota protegida aceitou anônimo');mark('unauthorizedRejected');

  const fixture={character:{name:'Live E2E',level:8,hp:17,maxHp:30,chakra:12,maxChakra:30,kurai:{chakra:8,maxChakra:8}},world:{tick:7},missions:{active:'e2e'}};
  const slotId=`slot-${suffix}`;
  const saved=await api('/api/account/save',{method:'POST',token:tokenA,body:{slotId,save:fixture,gameVersion:'SUPABASE-LIVE-E2E'}});assert(saved.ok&&saved.data?.saved===true,'save falhou');mark('saveRoundTrip');mark('savePostgres');
  const loaded=await api('/api/account/load',{method:'POST',token:tokenA,body:{slotId}});assert(loaded.ok&&loaded.data?.save?.character?.kurai?.chakra===8,'load/Kurai falhou');mark('loadRoundTrip');mark('kuraiPersisted');
  const slots=await api('/api/account/slots',{token:tokenA});assert(slots.ok&&slots.data?.slots?.some(s=>s.slotId===slotId),'slot listing falhou');mark('slotListing');

  const create=await api('/api/online/create',{method:'POST',token:tokenA,body:{title:'Sala Live E2E',campaignId:`camp-${suffix}`,playerId:'player-a',character:{name:'A',level:8,hp:20,maxHp:20,chakra:15,maxChakra:15}}});
  assert(create.status===201&&create.data?.roomId,'room create falhou');roomId=create.data.roomId;mark('roomCreate');
  const join=await api('/api/online/join',{method:'POST',token:tokenB,body:{roomId,playerId:'player-b',character:{name:'B',level:8,hp:19,maxHp:20,chakra:14,maxChakra:15}}});assert(join.ok&&join.data?.members?.length>=2,'room join falhou');mark('roomJoinSecondAccount');
  const hb=await api('/api/online/heartbeat',{method:'POST',token:tokenB,body:{roomId,playerId:'player-b',character:{name:'B',level:8,hp:18,maxHp:20,chakra:13,maxChakra:15}}});assert(hb.ok,'heartbeat falhou');mark('roomHeartbeat');
  const msg=await api('/api/online/message',{method:'POST',token:tokenA,body:{roomId,playerId:'player-a',characterName:'A',message:'teste sincronizado'}});assert(msg.ok&&msg.data?.message?.message==='teste sincronizado','message falhou');
  const msgs=await api('/api/online/messages',{method:'POST',token:tokenB,body:{roomId,afterId:0}});assert(msgs.ok&&msgs.data?.messages?.some(m=>m.message==='teste sincronizado'),'message sync falhou');mark('roomMessaging');
  const intent=await api('/api/online/action',{method:'POST',token:tokenA,body:{roomId,playerId:'player-a',action:{type:'intent',intent:'atacar',target:'player-b'}}});assert(intent.ok&&intent.data?.accepted===true,'intent válida recusada');mark('intentActionAccepted');
  const fake=await api('/api/online/action',{method:'POST',token:tokenA,body:{roomId,playerId:'player-a',action:{type:'attack',damage:999,xp:999}}});assert(fake.status===400&&fake.data?.error==='CLIENT_MECHANICAL_RESULT_FORBIDDEN','resultado mecânico do cliente não foi bloqueado');mark('clientMechanicalResultRejected');
  const state=await api('/api/online/state',{method:'POST',token:tokenB,body:{roomId}});assert(state.ok&&state.data?.members?.length>=2&&state.data?.messages?.length>=1&&state.data?.actions?.length>=1,'room state não sincronizou');mark('roomStateSynchronized');

  const world=await api('/api/v84/world/tick',{method:'POST',token:tokenA,body:{campaignId:`camp-${suffix}`,minutes:20,source:'live-e2e',detail:{reason:'rest'}}});assert(world.ok&&world.data?.event?.minutes===20,'world tick falhou');mark('worldEventPersisted');
  const sp=await api('/api/v84/world/savepoint',{method:'POST',token:tokenA,body:{campaignId:`camp-${suffix}`,label:'Live E2E',changes:[{type:'time',minutes:20}],character:{name:'Live E2E',hp:17,chakra:12}}});assert(sp.ok&&sp.data?.savepoint?.id,'savepoint falhou');mark('worldSavePointPersisted');
  const ai=await api('/api/ai',{method:'POST',token:tokenA,body:{mode:'game_master',gameContext:{facts:['TERION confirmou sucesso parcial.']}}});assert(ai.ok&&ai.data?.authority==='TERION_RESOLVES_MECHANICS'&&String(ai.data?.result||'').includes('TERION confirmou'),'IA facts-only falhou');mark('terionFactsOnlyAi');

  const rotate=await api('/api/auth/recovery-code',{method:'POST',token:tokenA,body:{}});assert(rotate.ok&&rotate.data?.recoveryCode,'rotação recovery-code falhou');mark('rotateRecoveryCode');
  const logoutA=await api('/api/auth/logout',{method:'POST',token:tokenA,body:{}});assert(logoutA.ok,'logout A falhou');mark('sessionRevocation');
  const oldMe=await api('/api/auth/me',{token:tokenA});assert(oldMe.status===401,'sessão A não foi revogada');
  tokenA='';

  const recover=await api('/api/auth/recover',{method:'POST',body:{identifier:emailA,recoveryCode:rotate.data.recoveryCode,newPassword:passNew}});assert(recover.ok&&recover.data?.recovered===true,'recuperação por e-mail falhou');mark('recoverPassword');
  const oldLogin=await api('/api/auth/login',{method:'POST',body:{identifier:userA,password:passA}});assert(oldLogin.status===401,'senha antiga ainda funcionou');mark('oldPasswordRejected');
  const newLogin=await api('/api/auth/login',{method:'POST',body:{identifier:emailA,password:passNew}});assert(newLogin.ok&&newLogin.data?.token,'login por e-mail após recuperação falhou');tokenA=newLogin.data.token;mark('loginAfterRecovery');mark('loginByEmail');
  const reloadSave=await api('/api/account/load',{method:'POST',token:tokenA,body:{slotId}});assert(reloadSave.ok&&reloadSave.data?.save?.character?.name==='Live E2E','save não sobreviveu relogin');mark('saveSurvivesRelogin');
  const delSave=await api('/api/account/delete',{method:'POST',token:tokenA,body:{slotId}});assert(delSave.ok,'delete save falhou');mark('deleteSave');

  const delA=await api('/api/auth/delete-account',{method:'POST',token:tokenA,body:{}});assert(delA.ok,'delete account A falhou');tokenA='';mark('deleteAccount');
  const delB=await api('/api/auth/delete-account',{method:'POST',token:tokenB,body:{}});assert(delB.ok,'delete account B falhou');tokenB='';
  const deleted=await api('/api/auth/login',{method:'POST',body:{identifier:userA,password:passNew}});assert(deleted.status===401,'conta excluída ainda autentica');mark('deletedAccountRejected');mark('cleanupAccounts');
}catch(error){failures.push(String(error?.stack||error));}
finally{await cleanup();}

const ok=failures.length===0;
const live={generatedAt:new Date().toISOString(),status:ok?'PASS_LIVE_BACKEND_E2E':'FAIL_LIVE_BACKEND_E2E',ok,backend:'supabase-edge-postgres',apiOrigin:origin,checks,evidence,failures};
const accountChecks={apiOriginConfigured:!!origin,backendStatus:!!checks.statusConfigured,supabasePostgres:!!checks.supabasePostgres,register:!!checks.register,meAfterRegister:!!checks.meAfterRegister,savePostgres:!!checks.savePostgres,logout:!!checks.sessionRevocation,loginByEmail:!!checks.loginByEmail,rotateRecoveryCode:!!checks.rotateRecoveryCode,recoverPassword:!!checks.recoverPassword,oldPasswordRejected:!!checks.oldPasswordRejected,loginAfterRecovery:!!checks.loginAfterRecovery,saveSurvivesRelogin:!!checks.saveSurvivesRelogin,deleteSave:!!checks.deleteSave,deleteAccount:!!checks.deleteAccount,deletedAccountRejected:!!checks.deletedAccountRejected};
const accountOk=ok&&Object.values(accountChecks).every(Boolean);
const account={generatedAt:new Date().toISOString(),status:accountOk?'PASS_ACCOUNT_LIVE_E2E':'FAIL_ACCOUNT_LIVE_E2E',ok:accountOk,backend:'supabase-edge-postgres',apiOrigin:origin,checks:accountChecks,failures};
fs.mkdirSync('audit',{recursive:true});
fs.writeFileSync(process.env.LIVE_BACKEND_REPORT||'audit/LIVE-BACKEND.json',JSON.stringify(live,null,2)+'\n');
fs.writeFileSync(process.env.ACCOUNT_REPORT||'audit/ACCOUNT-LIVE-E2E.json',JSON.stringify(account,null,2)+'\n');
console.log(JSON.stringify({live:live.status,account:account.status,checks},null,2));
if(!ok||!accountOk)process.exitCode=1;
