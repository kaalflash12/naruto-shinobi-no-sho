import { ObjectId } from "mongodb";
import { createMongoRequestEnv, requestMongoDb, closeMongoRequestEnv } from "./mongo-request.js";
import base, { GameRoom } from "./entry.js";
import { resolveTerionIntent, hasClientResult, stripClientMechanical } from "./terion-mechanics.js";
export { GameRoom };

const BUILD="R41-AUTHORITATIVE-TERION-20260823-V6";
let authorityIndexesReady=false;

function originHeaders(req,env){
  const origin=req.headers.get("origin")||"";
  const configured=String(env.ALLOWED_ORIGINS||env.ALLOWED_ORIGIN||"https://kaalflash12.github.io").split(",").map(x=>x.trim()).filter(Boolean);
  const allowed=[...new Set([...configured,"http://localhost:8000","http://127.0.0.1:8000","http://localhost:8787","http://127.0.0.1:8787"])];
  const selected=allowed.includes(origin)?origin:(!origin?(allowed[0]||"*"):"null");
  return {"content-type":"application/json; charset=utf-8","access-control-allow-origin":selected,"access-control-allow-methods":"GET,POST,PUT,PATCH,DELETE,OPTIONS","access-control-allow-headers":"authorization,content-type,x-r41-revision","cache-control":"no-store","vary":"origin"};
}
function json(req,env,status,data){return new Response(JSON.stringify(data),{status,headers:originHeaders(req,env)});}
async function body(req){try{return await req.clone().json();}catch{return{};}}
function oid(value){try{return new ObjectId(String(value));}catch{return null;}}
function text(value,max=120){return String(value??"").trim().slice(0,max);}
function finite(value,fallback=0){const n=Number(value);return Number.isFinite(n)?n:fallback;}
function validEmail(value){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value||"").trim());}
function copyRequest(req,url,data){const headers=new Headers(req.headers);headers.set("content-type","application/json");return new Request(url,{method:req.method,headers,body:JSON.stringify(data)});}
async function ensureAuthorityIndexes(store){
  if(authorityIndexesReady)return;
  await (async()=>{
    const profiles=store.collection("mechanical_profiles");
    try{await profiles.dropIndex("uq_mechanical_profile_user");}catch(e){const code=Number(e?.code),codeName=String(e?.codeName||"");if(code!==26&&code!==27&&codeName!=="NamespaceNotFound"&&codeName!=="IndexNotFound")throw e;}
    await profiles.updateMany({profileKey:{$exists:false}},{$set:{profileKey:"legacy",migration:"v4-single-profile"}});
    await profiles.updateMany({slotId:{$exists:false},baselineSlotId:{$type:"string"}},[{$set:{slotId:"$baselineSlotId"}}]);
    await Promise.all([
      store.collection("users").createIndex({emailLower:1},{unique:true,sparse:true,name:"uq_email"}),
      profiles.createIndex({userId:1,profileKey:1},{unique:true,name:"uq_mechanical_profile_user_key"}),
      profiles.createIndex({userId:1,updatedAt:-1},{name:"ix_mechanical_profile_user_updated"}),
      profiles.createIndex({playerId:1},{sparse:true,name:"ix_mechanical_profile_player"}),
      profiles.createIndex({userId:1,slotId:1},{sparse:true,name:"ix_mechanical_profile_slot"})
    ]);
  })();
  authorityIndexesReady=true;
}
async function db(env){
  if(!env.MONGODB_URI)throw new Error("MONGODB_URI_MISSING");
  const store=await requestMongoDb(env,"naruto_shinobi_no_sho");
  await ensureAuthorityIndexes(store);
  return store;
}
function cloneBounded(value,depth=0){
  if(depth>8)return null;if(value===null||value===undefined||typeof value==="string"||typeof value==="boolean")return value;if(typeof value==="number")return Number.isFinite(value)?value:0;
  if(Array.isArray(value))return value.slice(0,100).map(v=>cloneBounded(v,depth+1));if(typeof value!=="object")return String(value).slice(0,300);
  const out={};for(const [k,v] of Object.entries(value).slice(0,100))out[String(k).slice(0,80)]=cloneBounded(v,depth+1);return out;
}
function mechanicalCharacterSnapshot(character={}){
  const out={};
  for(const key of ["name","nome","avatar","portrait","level","nivel","attributes","atributos","stats","status","sheet","ficha","specialProfile","privateCharacter","clan","cla","graduation","graduacao","hp","pv","maxHp","maxPv","chakra","maxChakra","stamina","maxStamina"]){if(character[key]!==undefined)out[key]=cloneBounded(character[key]);}
  out.level=Math.max(1,Math.floor(finite(character.level??character.nivel,1)));return out;
}
function profileKeyFor(saveData={},source={}){
  const playerId=text(saveData?.playerId||source.playerId||"",180),slotId=text(source.slotId||"",100),campaignId=text(saveData?.campaignId||source.campaignId||"",120);
  if(playerId)return `player:${playerId}`;if(slotId)return `slot:${slotId}`;if(campaignId)return `campaign:${campaignId}`;return "legacy";
}
function mechanicalProfileFromSave(saveData={},source={}){
  const character=saveData?.character&&typeof saveData.character==="object"&&!Array.isArray(saveData.character)?mechanicalCharacterSnapshot(saveData.character):null;if(!character)return null;
  const playerId=text(saveData?.playerId||source.playerId||"",180),campaignId=text(saveData?.campaignId||source.campaignId||"",120),slotId=text(source.slotId||"",100);
  return {profileKey:profileKeyFor(saveData,source),playerId:playerId||null,campaignId:campaignId||null,slotId:slotId||null,character,totalXp:Math.max(0,Math.floor(finite(saveData?.stats?.totalXp??saveData?.stats?.xp??saveData?.character?.xp,0))),baselineSource:text(source.type||"latest-save-at-first-authority-use",80),locked:true,version:2};
}
async function seedMechanicalProfile(store,userId,saveData,source={}){
  const userObjectId=oid(userId),snapshot=mechanicalProfileFromSave(saveData,source);if(!userObjectId||!snapshot)return null;const now=new Date();
  await store.collection("mechanical_profiles").updateOne({userId:userObjectId,profileKey:snapshot.profileKey},{$setOnInsert:{userId:userObjectId,...snapshot,createdAt:now,updatedAt:now}},{upsert:true});
  return store.collection("mechanical_profiles").findOne({userId:userObjectId,profileKey:snapshot.profileKey});
}
async function lockedMechanicalProfile(store,userId,selector={}){
  const userObjectId=oid(userId);if(!userObjectId)return null;const profiles=store.collection("mechanical_profiles"),playerId=text(selector.playerId||"",180),slotId=text(selector.slotId||"",100),campaignId=text(selector.campaignId||"",120);
  if(playerId){const hit=await profiles.findOne({userId:userObjectId,profileKey:`player:${playerId}`});if(hit)return hit;}
  if(slotId){const hit=await profiles.findOne({userId:userObjectId,profileKey:`slot:${slotId}`});if(hit)return hit;}
  if(campaignId){const hit=await profiles.findOne({userId:userObjectId,campaignId},{sort:{updatedAt:-1}});if(hit)return hit;}
  const legacy=await profiles.findOne({userId:userObjectId,profileKey:"legacy"});if(legacy)return legacy;
  if(!playerId&&!slotId&&!campaignId)return profiles.findOne({userId:userObjectId},{sort:{updatedAt:-1}});return null;
}
async function matchingSave(store,userId,selector={}){
  const userObjectId=oid(userId);if(!userObjectId)return null;const playerId=text(selector.playerId||"",180),slotId=text(selector.slotId||"",100),campaignId=text(selector.campaignId||"",120),saves=store.collection("saves");
  if(playerId){const hit=await saves.findOne({userId:userObjectId,"data.playerId":playerId},{sort:{updatedAt:-1},projection:{data:1,slotId:1,updatedAt:1}});if(hit)return hit;}
  if(slotId){const hit=await saves.findOne({userId:userObjectId,slotId},{projection:{data:1,slotId:1,updatedAt:1}});if(hit)return hit;}
  if(campaignId){const hit=await saves.findOne({userId:userObjectId,"data.campaignId":campaignId},{sort:{updatedAt:-1},projection:{data:1,slotId:1,updatedAt:1}});if(hit)return hit;}
  if(playerId||slotId||campaignId)return null;return saves.findOne({userId:userObjectId},{sort:{updatedAt:-1},projection:{data:1,slotId:1,updatedAt:1}});
}
async function trustedProfile(store,userId,selector={}){
  const locked=await lockedMechanicalProfile(store,userId,selector);if(locked?.character)return locked;const save=await matchingSave(store,userId,selector);if(!save?.data?.character)return null;
  return seedMechanicalProfile(store,userId,save.data,{type:"latest-save-at-first-authority-use",slotId:save.slotId,playerId:selector.playerId,campaignId:selector.campaignId});
}
async function trustedCharacter(store,userId,selector={}){return (await trustedProfile(store,userId,selector))?.character||null;}
async function account(req,env,ctx){const u=new URL(req.url);u.pathname="/api/auth/me";u.search="";const r=await base.fetch(new Request(u.toString(),{method:"POST",headers:req.headers}),env,ctx),d=await r.clone().json().catch(()=>({}));return r.ok&&d.ok&&d.account?.id?d.account:null;}
async function augmentAccountEmail(req,env,res){if(!res.ok)return res;let data;try{data=await res.clone().json();}catch{return res;}if(!data?.account?.id)return res;try{const store=await db(env),u=await store.collection("users").findOne({_id:new ObjectId(String(data.account.id))},{projection:{email:1}});if(u?.email)data.account.email=u.email;}catch{}return new Response(JSON.stringify(data),{status:res.status,statusText:res.statusText,headers:originHeaders(req,env)});}
async function emailAwareAuth(req,env,ctx,path){
  if(req.method!=="POST"||!["/api/auth/register","/api/auth/login","/api/auth/recover"].includes(path))return null;if(!env.MONGODB_URI)return base.fetch(req,env,ctx);const payload=await body(req),store=await db(env);
  if(path==="/api/auth/register"){
    const email=String(payload.email||"").trim().toLowerCase();if(email&&!validEmail(email))return json(req,env,400,{ok:false,error:"EMAIL_INVALID"});if(email&&await store.collection("users").findOne({emailLower:email},{projection:{_id:1}}))return json(req,env,409,{ok:false,error:"EMAIL_EXISTS"});
    const res=await base.fetch(copyRequest(req,req.url,payload),env,ctx);if(!res.ok||!email)return augmentAccountEmail(req,env,res);const data=await res.clone().json().catch(()=>({}));
    if(data?.account?.id){try{await store.collection("users").updateOne({_id:new ObjectId(String(data.account.id))},{$set:{email,emailLower:email,updatedAt:new Date()}});data.account.email=email;}catch(e){if(Number(e?.code)===11000)return json(req,env,409,{ok:false,error:"EMAIL_EXISTS"});throw e;}}
    return new Response(JSON.stringify(data),{status:res.status,statusText:res.statusText,headers:originHeaders(req,env)});
  }
  const identifier=String(payload.identifier||payload.username||"").trim();if(identifier.includes("@")){const found=await store.collection("users").findOne({emailLower:identifier.toLowerCase()},{projection:{username:1}});if(found?.username)payload.username=found.username;}
  return augmentAccountEmail(req,env,await base.fetch(copyRequest(req,req.url,payload),env,ctx));
}
function publicCharacterSnapshot(character={},acct={},trusted=false){const out={name:text(character.name||character.nome||acct.displayName||acct.username||"Shinobi",80),avatar:text(character.avatar||character.portrait||"",320),graduation:text(character.graduation||character.graduacao||"",80),clan:text(character.clan||character.cla||"",80),role:text(acct.role||"player",32)};if(trusted){const lv=Number(character.level??character.nivel);if(Number.isFinite(lv))out.level=Math.max(1,Math.floor(lv));}return out;}
async function authoritativeMembership(req,env,ctx,path){
  if(!/^\/api\/(online|pvp|coop)\/(create|join|heartbeat)$/.test(path))return null;if(!env.MONGODB_URI||!env.AUTH_SECRET||!env.GAME_ROOMS)return base.fetch(req,env,ctx);
  const me=await account(req,env,ctx);if(!me)return json(req,env,401,{ok:false,error:"UNAUTHORIZED"});const payload=await body(req),store=await db(env),selector={playerId:payload.playerId,campaignId:payload.campaignId},trusted=await trustedCharacter(store,me.id,selector),safe={...payload};
  if(trusted)safe.character=publicCharacterSnapshot(trusted,me,true);else if(/\/(create|join)$/.test(path))safe.character=publicCharacterSnapshot(payload.character||{},me,false);else delete safe.character;delete safe.userId;delete safe.role;return base.fetch(copyRequest(req,req.url,safe),env,ctx);
}
async function roomSnapshot(req,env,ctx,roomId){const u=new URL(req.url);u.pathname="/api/online/room";u.search="";const headers=new Headers(req.headers);headers.set("content-type","application/json");const r=await base.fetch(new Request(u.toString(),{method:"POST",headers,body:JSON.stringify({roomId})}),env,ctx),data=await r.clone().json().catch(()=>({}));return {response:r,data};}
function actionType(envelope){return String(envelope?.type||envelope?.action||envelope?.intent||"action").trim().toLowerCase().slice(0,80)||"action";}
function serverActionType(envelope){const raw=`${text(envelope?.text,500)} ${text(envelope?.description||envelope?.descricao,500)} ${text(envelope?.type||envelope?.action||envelope?.intent,80)}`.toLowerCase();if(/bloque|block/.test(raw))return "block";if(/defend|defesa|defender|esquiv|dodge/.test(raw))return "defend";if(/investig|examinar|analisar|procurar pista/.test(raw))return "investigate";if(/perceb|observar|vigiar|detectar|sentir/.test(raw))return "perceive";if(/persuad|convenc|negoci|intimid|convers|social/.test(raw))return "social";if(/mover|moviment|correr|saltar|escalar|move/.test(raw))return "move";if(/jutsu|t[eé]cnica|atac|golpe|attack/.test(raw))return "jutsu";return actionType(envelope)==="intent"?"action":actionType(envelope);}
async function authoritativeAction(req,env,ctx){
  if(req.method!=="POST")return json(req,env,405,{ok:false,error:"METHOD_NOT_ALLOWED"});if(!env.MONGODB_URI||!env.AUTH_SECRET||!env.GAME_ROOMS)return base.fetch(req,env,ctx);const payload=await body(req),roomId=String(payload.roomId||"").trim(),envelope=payload.action??payload;if(!roomId)return json(req,env,400,{ok:false,error:"ROOM_ID_REQUIRED"});
  if(hasClientResult(envelope))return json(req,env,400,{ok:false,error:"CLIENT_MECHANICAL_RESULT_FORBIDDEN",rule:"client sends intent only; TERION result is generated server-side"});const rawType=actionType(envelope);if(/grant|award|give.?xp|set.?level|admin/i.test(rawType))return json(req,env,400,{ok:false,error:"CLIENT_AUTHORITY_FORBIDDEN"});
  const me=await account(req,env,ctx);if(!me)return json(req,env,401,{ok:false,error:"UNAUTHORIZED"});const snap=await roomSnapshot(req,env,ctx,roomId);if(!snap.response.ok)return snap.response;const members=Array.isArray(snap.data?.members)?snap.data.members:[];if(!members.some(x=>String(x.userId)===String(me.id)))return json(req,env,403,{ok:false,error:"ROOM_MEMBERSHIP_REQUIRED"});
  const store=await db(env),selector={playerId:payload.playerId,campaignId:snap.data?.room?.campaignId},profile=await trustedProfile(store,me.id,selector),character=profile?.character;if(!character)return json(req,env,409,{ok:false,error:"AUTHORITATIVE_CHARACTER_SAVE_REQUIRED",rule:"online TERION mechanics require a locked MongoDB mechanical baseline for this player/slot"});
  const type=serverActionType(envelope),mechanicalResult=resolveTerionIntent({intent:{type,difficulty:"normal"},character}),serverEnvelope={...envelope,mechanicalResult,mechanicalProfileKey:profile.profileKey};const stub=env.GAME_ROOMS.getByName(roomId),internal=await stub.fetch("https://room.internal/action",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({...payload,userId:String(me.id),action:serverEnvelope})});
  const data=await internal.clone().json().catch(()=>({}));if(!internal.ok)return json(req,env,internal.status,data);data.mechanicalResult=mechanicalResult;data.mechanicalProfileKey=profile.profileKey;if(data.event)data.event={...data.event,mechanicalResult,mechanicalProfileKey:profile.profileKey};return json(req,env,internal.status,data);
}
async function authoritativeWorld(req,env,ctx,path){
  if(!["/api/v84/world/event","/api/v84/world/savepoint"].includes(path))return null;if(!env.MONGODB_URI||!env.AUTH_SECRET)return base.fetch(req,env,ctx);const me=await account(req,env,ctx);if(!me)return json(req,env,401,{ok:false,error:"UNAUTHORIZED"});const payload=await body(req),safe={...payload};delete safe.userId;
  if(path==="/api/v84/world/event"){safe.detail=stripClientMechanical(payload.detail||{});return base.fetch(copyRequest(req,req.url,safe),env,ctx);}
  const store=await db(env),profile=await trustedProfile(store,me.id,{playerId:payload.playerId,campaignId:payload.campaignId}),character=profile?.character;safe.changes=Array.isArray(payload.changes)?payload.changes.slice(-100).map(x=>stripClientMechanical(x)).filter(x=>x!==null&&x!==undefined):[];if(character)safe.character=character;else delete safe.character;return base.fetch(copyRequest(req,req.url,safe),env,ctx);
}
async function authoritativeLeaderboard(req,env,ctx,path){
  if(path!=="/api/leaderboard")return null;if(!env.MONGODB_URI||!env.AUTH_SECRET)return base.fetch(req,env,ctx);const me=await account(req,env,ctx);if(!me)return json(req,env,401,{ok:false,error:"UNAUTHORIZED"});const store=await db(env),profiles=await store.collection("mechanical_profiles").find({locked:true}).sort({updatedAt:-1}).limit(500).toArray(),ids=[...new Map(profiles.map(p=>[String(p.userId),p.userId])).values()],users=ids.length?await store.collection("users").find({_id:{$in:ids}},{projection:{username:1,displayName:1}}).toArray():[],names=new Map(users.map(u=>[String(u._id),u]));
  const leaderboard=profiles.map(p=>{const u=names.get(String(p.userId)),c=p.character||{};return{username:u?.username||"shinobi",displayName:u?.displayName||u?.username||"Shinobi",profileKey:p.profileKey||"legacy",playerId:p.playerId||null,name:c.name||c.nome||null,level:Math.max(1,Math.floor(finite(c.level??c.nivel,1))),xp:Math.max(0,Math.floor(finite(p.totalXp,0))),avatar:c.avatar||c.portrait||"",authority:"locked-mechanical-profile"};}).sort((a,b)=>b.level-a.level||b.xp-a.xp).slice(0,50);return json(req,env,200,{ok:true,leaderboard,authority:"mechanical_profiles",profilesPerCharacter:true,clientSaveRankIgnored:true});
}
async function authoritativeSlotDelete(req,env,ctx,path){
  if(path!=="/api/account/delete")return null;if(!env.MONGODB_URI||!env.AUTH_SECRET)return base.fetch(req,env,ctx);const me=await account(req,env,ctx);if(!me)return json(req,env,401,{ok:false,error:"UNAUTHORIZED"});const payload=await body(req),slotId=text(payload.slotId||"",100);if(!slotId)return base.fetch(req,env,ctx);
  const store=await db(env),userObjectId=oid(me.id),res=await base.fetch(req,env,ctx);if(res.ok&&userObjectId){const removed=await store.collection("mechanical_profiles").deleteMany({userId:userObjectId,$or:[{slotId},{profileKey:`slot:${slotId}`},{baselineSlotId:slotId}]});let data;try{data=await res.clone().json();}catch{return res;}data.mechanicalProfilesDeleted=Number(removed.deletedCount||0);data.mechanicalProfileSlotCleanup=true;return json(req,env,res.status,data);}return res;
}
async function authoritativeAccountDelete(req,env,ctx,path){if(path!=="/api/auth/delete-account")return null;if(!env.MONGODB_URI||!env.AUTH_SECRET)return base.fetch(req,env,ctx);const me=await account(req,env,ctx),res=await base.fetch(req,env,ctx);if(res.ok&&me?.id){const store=await db(env),userObjectId=oid(me.id);if(userObjectId)await store.collection("mechanical_profiles").deleteMany({userId:userObjectId});}return res;}
async function status(req,env,ctx){const res=await base.fetch(req,env,ctx);let data;try{data=await res.clone().json();}catch{return res;}data.authority="server-terion-2d10";data.serverMechanicalResolution=true;data.clientDifficultyIgnored=true;data.clientRoomCharacterIgnored=true;data.mechanicsReadFromMongoProfile=true;data.mechanicalProfilesPerCharacter=true;data.mechanicalProfileIndexMigrationV6=true;data.mechanicalBaselineSeededFromMatchingSave=true;data.clientAutosaveCannotOverwriteMechanicalProfile=true;data.leaderboardUsesMechanicalProfiles=true;data.slotDeleteCleansMechanicalProfile=true;data.worldMechanicalPayloadSanitized=true;data.worldSavepointCharacterFromMechanicalProfile=true;data.emailLogin=true;data.buildAuthority=BUILD;data.routes={...(data.routes||{}),serverMechanicalResolution:true,authoritativeRoomCharacter:true,authoritativeWorldPersistence:true,authoritativeMechanicalProfile:true,authoritativeLeaderboard:true,authoritativeSlotDelete:true,emailLogin:true};return new Response(JSON.stringify(data),{status:res.status,statusText:res.statusText,headers:originHeaders(req,env)});}

export default {async fetch(req,env,ctx){
  const requestEnv=createMongoRequestEnv(env);
  try{
    const path=new URL(req.url).pathname.replace(/\/+$/g,"")||"/";
    if(path==="/"||path==="/api/status")return await status(req,requestEnv,ctx);
    if(path==="/api/auth/me")return await augmentAccountEmail(req,requestEnv,await base.fetch(req,requestEnv,ctx));
    const auth=await emailAwareAuth(req,requestEnv,ctx,path);if(auth)return auth;
    const deletion=await authoritativeAccountDelete(req,requestEnv,ctx,path);if(deletion)return deletion;
    const slotDelete=await authoritativeSlotDelete(req,requestEnv,ctx,path);if(slotDelete)return slotDelete;
    const membership=await authoritativeMembership(req,requestEnv,ctx,path);if(membership)return membership;
    if(path==="/api/online/action"||/^\/api\/(pvp|coop)\/action$/.test(path))return await authoritativeAction(req,requestEnv,ctx);
    const world=await authoritativeWorld(req,requestEnv,ctx,path);if(world)return world;
    const leaderboard=await authoritativeLeaderboard(req,requestEnv,ctx,path);if(leaderboard)return leaderboard;
    return await base.fetch(req,requestEnv,ctx);
  }catch(e){
    console.error("R41_AUTHORITATIVE_ENTRY_ERROR",e);
    return json(req,requestEnv,500,{ok:false,error:"AUTHORITATIVE_ENTRY_FAILED"});
  }finally{
    await closeMongoRequestEnv(requestEnv);
  }
}};
