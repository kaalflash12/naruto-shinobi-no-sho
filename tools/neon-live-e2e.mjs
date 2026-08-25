import crypto from 'node:crypto';

const api=String(process.env.NEON_DATA_API_URL||'').trim().replace(/\/+$/,'');
const expectedAuthority='R41-AUTHORITATIVE-TERION-NEON-20260825-V1';
const checks={};
const failures=[];
const evidence={};
const mark=k=>{checks[k]=true;};
const assert=(c,m)=>{if(!c)throw new Error(m);};
const hexSalt=()=>crypto.randomBytes(16).toString('hex');
const derive=(password,salt,iterations=210000)=>crypto.pbkdf2Sync(String(password),Buffer.from(String(salt),'hex'),iterations,32,'sha256').toString('hex');

async function rpc(route,{method='POST',token='',body={}}={}){
  const res=await fetch(`${api}/rpc/sns_api`,{method:'POST',headers:{accept:'application/json','content-type':'application/json'},body:JSON.stringify({p_route:route,p_method:method,p_token:token,p_body:body})});
  const raw=await res.text();let data={};try{data=raw?JSON.parse(raw):{};}catch{data={raw};}
  if(!res.ok)throw new Error(`DATA_API_HTTP_${res.status} ${raw.slice(0,1200)}`);
  const status=Number(data?._status||200);delete data._status;return{status,data,headers:Object.fromEntries(res.headers.entries())};
}
async function register({username,password,displayName,email}){const salt=hexSalt(),iterations=210000,authKey=derive(password,salt,iterations);return rpc('/api/auth/register',{body:{username,displayName,email,authSalt:salt,authKey,authIterations:iterations}});}
async function login(identifier,password){const ch=await rpc('/api/auth/challenge',{body:{identifier}});const authKey=derive(password,ch.data.salt,Number(ch.data.iterations||210000));return rpc('/api/auth/login',{body:{identifier,authKey}});}
async function recover(identifier,recoveryCode,newPassword){const salt=hexSalt(),iterations=210000,authKey=derive(newPassword,salt,iterations);return rpc('/api/auth/recover',{body:{identifier,recoveryCode,authSalt:salt,authKey,authIterations:iterations}});}

let ta='',tb='';
try{
  assert(/^https:\/\//.test(api),'NEON_DATA_API_URL ausente');
  const status=await rpc('/api/status',{method:'GET'});evidence.status=status.data;
  assert(status.status===200&&status.data.ok===true&&status.data.configured===true,'status inválido');
  assert(status.data.storage==='neon-postgres','storage não é Neon Postgres');
  assert(status.data.realtime==='neon-data-api-polling','realtime inesperado');
  assert(status.data.buildAuthority===expectedAuthority,'buildAuthority inesperada');
  assert(status.data.serverMechanicalResolution===true&&status.data.clientAutosaveCannotOverwriteMechanicalProfile===true,'fronteiras mecânicas ausentes');
  mark('statusConfigured');mark('authoritativeBoundariesAdvertised');

  const suffix=`${Date.now().toString(36)}${crypto.randomBytes(4).toString('hex')}`;
  const userA=`neon_a_${suffix}`.slice(0,32),userB=`neon_b_${suffix}`.slice(0,32),emailA=`${userA}@example.test`;
  const password=`Aa!9_${suffix}_old`,newPassword=`Bb!8_${suffix}_new`;
  const playerA=`player-a-${suffix}`,playerAlt=`player-alt-${suffix}`,playerB=`player-b-${suffix}`,campaignA=`campaign-a-${suffix}`,campaignAlt=`campaign-alt-${suffix}`;
  const slotId=`main-${suffix}`,altSlotId=`alt-${suffix}`,marker=`marker-${suffix}`;

  const ra=await register({username:userA,password,displayName:`Neon A ${suffix}`,email:emailA});const rb=await register({username:userB,password,displayName:`Neon B ${suffix}`});
  assert(ra.status===201&&ra.data.ok&&ra.data.token&&ra.data.recoveryCode&&ra.data.account?.id,'registro A inválido');
  assert(rb.status===201&&rb.data.ok&&rb.data.token&&rb.data.account?.id,'registro B inválido');ta=ra.data.token;tb=rb.data.token;let recovery=ra.data.recoveryCode;mark('registerTwoAccounts');
  const me=await rpc('/api/auth/me',{method:'GET',token:ta});assert(me.data.account?.username===userA&&me.data.account?.email===emailA,'me/email inválidos');mark('authenticatedSessions');mark('accountEmailPersisted');
  const unauth=await rpc('/api/account/slots');assert(unauth.status===401&&unauth.data.error==='UNAUTHORIZED','anônimo não recusado');mark('unauthorizedRejected');

  const saveData={version:'NEON-E2E',playerId:playerA,campaignId:campaignA,character:{name:'Neon Shinobi A',level:7,chakra:19,pv:21},stats:{totalXp:700},world:{marker},resources:{chakra:19,kurai:8},missions:{e2e:{state:'active'}}};
  const altSave={version:'NEON-E2E',playerId:playerAlt,campaignId:campaignAlt,character:{name:'Neon ALT',level:12,chakra:31,pv:34},stats:{totalXp:1200},world:{marker:`alt-${marker}`},resources:{chakra:31}};
  const s1=await rpc('/api/account/save',{token:ta,body:{slotId,save:saveData,gameVersion:'NEON-E2E'}});const s2=await rpc('/api/account/save',{token:ta,body:{slotId:altSlotId,save:altSave,gameVersion:'NEON-E2E'}});
  assert(s1.data.saved&&Number(s1.data.revision)>=1&&s2.data.saved,'save falhou');
  const l1=await rpc('/api/account/load',{token:ta,body:{slotId}});assert(l1.data.save?.world?.marker===marker&&Number(l1.data.save?.resources?.kurai)===8,'load falhou');mark('saveRoundTrip');mark('multipleCharacterSlotsPersisted');
  const slots=await rpc('/api/account/slots',{token:ta});assert(slots.data.slots?.some(x=>x.slotId===slotId)&&slots.data.slots?.some(x=>x.slotId===altSlotId),'slots ausentes');mark('slotListing');

  const create=await rpc('/api/online/create',{token:ta,body:{title:`E2E ${suffix}`,campaignId:campaignA,playerId:playerA,character:{name:'FORGED',level:77}}});const roomId=create.data.roomId;
  const memberA=create.data.members?.find(x=>String(x.userId)===String(ra.data.account.id));assert(roomId?.startsWith('room-')&&Number(memberA?.character?.level)===7,'baseline principal não bloqueada');mark('roomCreate');mark('mechanicalBaselineLockedAtFirstAuthorityUse');
  const createAlt=await rpc('/api/online/create',{token:ta,body:{title:`ALT ${suffix}`,campaignId:campaignAlt,playerId:playerAlt,character:{level:88}}});const roomAlt=createAlt.data.roomId;assert(Number(createAlt.data.members?.[0]?.character?.level)===12,'baseline ALT errada');mark('multipleMechanicalProfilesSameAccount');mark('profileSelectorMatchesPlayerAndCampaign');
  const forgedSave=structuredClone(saveData);forgedSave.character.level=99;forgedSave.character.chakra=9999;forgedSave.character.pv=9999;forgedSave.stats.totalXp=999999;await rpc('/api/account/save',{token:ta,body:{slotId,save:forgedSave,gameVersion:'FORGED'}});const continuity=await rpc('/api/account/load',{token:ta,body:{slotId}});assert(Number(continuity.data.save?.character?.level)===99,'continuidade não preservou autosave');mark('continuitySaveSeparatedFromMechanicalAuthority');

  const join=await rpc('/api/online/join',{token:tb,body:{roomId,playerId:playerB,character:{name:'B',level:55}}});assert(join.data.ok===true,'join falhou');mark('roomJoinSecondAccount');
  await rpc('/api/online/heartbeat',{token:ta,body:{roomId,playerId:playerA,character:{name:'FORGED HB',level:99,chakra:9999}}});await rpc('/api/online/heartbeat',{token:tb,body:{roomId,playerId:playerB,character:{name:'B',level:55}}});mark('roomHeartbeat');
  const msg=await rpc('/api/online/message',{token:ta,body:{roomId,playerId:playerA,characterName:'A',message:`message-${suffix}`}});assert(msg.data.message?.message===`message-${suffix}`,'mensagem falhou');const msgs=await rpc('/api/online/messages',{token:tb,body:{roomId,afterId:0}});assert(msgs.data.messages?.some(x=>x.message===`message-${suffix}`),'mensagem não chegou a B');mark('roomMessaging');

  const intent=await rpc('/api/online/action',{token:ta,body:{roomId,playerId:playerA,action:{type:'move',intent:'move',direction:'north',target:'training-field'}}});
  assert(intent.data.accepted&&intent.data.mechanicalResult?.authority==='server'&&intent.data.mechanicalResult?.system==='TERION_2D10','TERION não é server-side');assert(Number(intent.data.mechanicalResult?.modifier?.level)===7&&Number(intent.data.mechanicalResult?.dc)===12,'nível/CD autoritativos errados');assert(intent.data.mechanicalProfileKey===`player:${playerA}`,'perfil principal errado');mark('intentActionAccepted');mark('terionUsesLockedMechanicalProfile');
  const altIntent=await rpc('/api/online/action',{token:ta,body:{roomId:roomAlt,playerId:playerAlt,action:{type:'move',intent:'move',direction:'east'}}});assert(Number(altIntent.data.mechanicalResult?.modifier?.level)===12&&altIntent.data.mechanicalProfileKey===`player:${playerAlt}`,'perfil ALT errado');mark('terionSelectsCorrectProfilePerCharacter');
  const forged=await rpc('/api/online/action',{token:ta,body:{roomId,playerId:playerA,action:{type:'attack',damage:999,success:true,xp:5000,atributos:{tecnica:99},CD:1}}});assert(forged.status===400&&forged.data.error==='CLIENT_MECHANICAL_RESULT_FORBIDDEN','resultado mecânico forjado aceito');mark('clientMechanicalResultRejected');
  const state=await rpc('/api/online/state',{token:tb,body:{roomId}});const stateA=state.data.state?.members?.find(x=>String(x.userId)===String(ra.data.account.id));assert(state.data.state?.members?.length>=2&&state.data.state?.actions?.some(x=>x.type==='move')&&Number(stateA?.character?.level)===7,'estado/heartbeat forjado falhou');mark('roomStateSynchronized');mark('forgedHeartbeatIgnored');

  const lb=await rpc('/api/leaderboard',{token:ta});const rowsA=(lb.data.leaderboard||[]).filter(x=>x.username===userA),mainRank=rowsA.find(x=>x.profileKey===`player:${playerA}`),altRank=rowsA.find(x=>x.profileKey===`player:${playerAlt}`);assert(Number(mainRank?.level)===7&&Number(mainRank?.xp)===700&&Number(altRank?.level)===12&&Number(altRank?.xp)===1200,'leaderboard contaminado por autosave');mark('leaderboardIgnoresForgedAutosave');mark('leaderboardSeparatesCharacters');
  const world=await rpc('/api/v84/world/event',{token:ta,body:{type:'world_tick',campaignId:campaignA,minutes:20,source:'neon-e2e',detail:{marker,hp:9999,recompensa:{xp:99999},nested:{note:'preserved',chakra:9999}}}});assert(world.data.event?.detail?.marker===marker&&!('hp' in world.data.event.detail)&&!('recompensa' in world.data.event.detail)&&world.data.event.detail?.nested?.note==='preserved'&&!('chakra' in world.data.event.detail.nested),'sanitização world falhou');mark('worldEventPersisted');mark('worldMechanicalPayloadSanitizedLive');
  const sp=await rpc('/api/v84/world/savepoint',{token:ta,body:{playerId:playerA,campaignId:campaignA,label:'SP',changes:[{note:'ok',hp:9999}],character:{level:99}}});assert(sp.data.ok&&sp.data.mechanicalProfileKey===`player:${playerA}`,'savepoint não usou perfil');mark('worldSavePointPersisted');

  const del=await rpc('/api/account/delete',{token:ta,body:{slotId}});assert(del.data.deleted&&del.data.mechanicalProfileSlotCleanup&&Number(del.data.mechanicalProfilesDeleted)>=1,'delete seletivo falhou');const lb2=await rpc('/api/leaderboard',{token:ta});const after=(lb2.data.leaderboard||[]).filter(x=>x.username===userA);assert(!after.some(x=>x.profileKey===`player:${playerA}`)&&after.some(x=>x.profileKey===`player:${playerAlt}`&&Number(x.level)===12),'delete removeu perfil errado');mark('slotDeleteCleansOnlyMatchingMechanicalProfile');

  await rpc('/api/auth/logout',{token:ta});const afterLogout=await rpc('/api/auth/me',{method:'GET',token:ta});assert(afterLogout.status===401&&afterLogout.data.error==='UNAUTHORIZED','sessão não revogada');mark('sessionRevocation');
  const emailLogin=await login(emailA,password);assert(emailLogin.data.account?.username===userA&&emailLogin.data.token,'login por email falhou');ta=emailLogin.data.token;mark('emailLoginLive');
  const rotate=await rpc('/api/auth/recovery-code',{token:ta});assert(rotate.data.recoveryCode,'recovery rotate falhou');recovery=rotate.data.recoveryCode;await rpc('/api/auth/logout',{token:ta});ta='';const recovered=await recover(userA,recovery,newPassword);assert(recovered.data.recovered===true,'recover falhou');const oldLogin=await login(userA,password);assert(oldLogin.status===401&&oldLogin.data.error==='LOGIN_INVALID','senha antiga ainda válida');const newLogin=await login(userA,newPassword);assert(newLogin.data.token,'senha nova não autentica');ta=newLogin.data.token;mark('recoveryCodeRotation');mark('passwordRecovery');
  await rpc('/api/auth/delete-account',{token:ta});const deleted=await login(userA,newPassword);assert(deleted.status===401&&deleted.data.error==='LOGIN_INVALID','conta A ainda autentica');const rankAfter=await rpc('/api/leaderboard',{token:tb});assert(!(rankAfter.data.leaderboard||[]).some(x=>x.username===userA),'perfil A sobreviveu à exclusão');mark('accountDeleteCleansMechanicalProfile');await rpc('/api/auth/delete-account',{token:tb});tb='';mark('e2eAccountCleanup');

  console.log(JSON.stringify({ok:true,status:'PASS_NEON_DATA_API_LIVE_E2E',api,checks,evidence},null,2));
}catch(error){failures.push(String(error?.stack||error));console.error(JSON.stringify({ok:false,status:'FAIL_NEON_DATA_API_LIVE_E2E',api,checks,evidence,failures},null,2));try{if(ta)await rpc('/api/auth/delete-account',{token:ta});}catch{}try{if(tb)await rpc('/api/auth/delete-account',{token:tb});}catch{}process.exitCode=1;}
