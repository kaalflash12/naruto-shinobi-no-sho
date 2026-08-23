import { MongoClient, ObjectId } from "mongodb";
import base, { GameRoom } from "./entry.js";
import { resolveTerionIntent, hasClientResult } from "./terion-mechanics.js";
export { GameRoom };

const BUILD="R41-AUTHORITATIVE-TERION-20260823-V2";
let client=null,clientUri="",emailIndexPromise=null;

function originHeaders(req,env){
  const origin=req.headers.get("origin")||"";
  const configured=String(env.ALLOWED_ORIGINS||env.ALLOWED_ORIGIN||"https://kaalflash12.github.io").split(",").map(x=>x.trim()).filter(Boolean);
  const allowed=[...new Set([...configured,"http://localhost:8000","http://127.0.0.1:8000","http://localhost:8787","http://127.0.0.1:8787"])];
  const selected=allowed.includes(origin)?origin:(!origin?(allowed[0]||"*"):"null");
  return {"content-type":"application/json; charset=utf-8","access-control-allow-origin":selected,"access-control-allow-methods":"GET,POST,PUT,PATCH,DELETE,OPTIONS","access-control-allow-headers":"authorization,content-type,x-r41-revision","cache-control":"no-store","vary":"origin"};
}
function json(req,env,status,data){return new Response(JSON.stringify(data),{status,headers:originHeaders(req,env)});}
async function body(req){try{return await req.clone().json();}catch{return{};}}
async function db(env){
  if(!env.MONGODB_URI)throw new Error("MONGODB_URI_MISSING");
  if(!client||clientUri!==env.MONGODB_URI){clientUri=env.MONGODB_URI;client=new MongoClient(env.MONGODB_URI,{maxPoolSize:4,minPoolSize:0,maxIdleTimeMS:45000,serverSelectionTimeoutMS:6000,connectTimeoutMS:6000});await client.connect();emailIndexPromise=null;}
  const out=client.db(env.MONGODB_DB||"naruto_shinobi_no_sho");
  if(!emailIndexPromise)emailIndexPromise=out.collection("users").createIndex({emailLower:1},{unique:true,sparse:true,name:"uq_email"}).catch(e=>{emailIndexPromise=null;throw e;});
  await emailIndexPromise;return out;
}
function validEmail(value){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value||"").trim());}
function copyRequest(req,url,data){const headers=new Headers(req.headers);headers.set("content-type","application/json");return new Request(url,{method:req.method,headers,body:JSON.stringify(data)});}
function oid(value){try{return new ObjectId(String(value));}catch{return null;}}
function text(value,max=120){return String(value??"").trim().slice(0,max);}
async function account(req,env,ctx){
  const u=new URL(req.url);u.pathname="/api/auth/me";u.search="";
  const r=await base.fetch(new Request(u.toString(),{method:"POST",headers:req.headers}),env,ctx),d=await r.clone().json().catch(()=>({}));
  return r.ok&&d.ok&&d.account?.id?d.account:null;
}
async function augmentAccountEmail(req,env,res){
  if(!res.ok)return res;let data;try{data=await res.clone().json();}catch{return res;}
  if(!data?.account?.id)return res;
  try{const store=await db(env),u=await store.collection("users").findOne({_id:new ObjectId(String(data.account.id))},{projection:{email:1}});if(u?.email)data.account.email=u.email;}catch{}
  return new Response(JSON.stringify(data),{status:res.status,statusText:res.statusText,headers:originHeaders(req,env)});
}
async function emailAwareAuth(req,env,ctx,path){
  if(req.method!=="POST"||!["/api/auth/register","/api/auth/login","/api/auth/recover"].includes(path))return null;
  if(!env.MONGODB_URI)return base.fetch(req,env,ctx);
  const payload=await body(req),store=await db(env);
  if(path==="/api/auth/register"){
    const email=String(payload.email||"").trim().toLowerCase();
    if(email&&!validEmail(email))return json(req,env,400,{ok:false,error:"EMAIL_INVALID"});
    if(email&&await store.collection("users").findOne({emailLower:email},{projection:{_id:1}}))return json(req,env,409,{ok:false,error:"EMAIL_EXISTS"});
    const res=await base.fetch(copyRequest(req,req.url,payload),env,ctx);
    if(!res.ok||!email)return augmentAccountEmail(req,env,res);
    const data=await res.clone().json().catch(()=>({}));
    if(data?.account?.id){
      try{await store.collection("users").updateOne({_id:new ObjectId(String(data.account.id))},{$set:{email,emailLower:email,updatedAt:new Date()}});data.account.email=email;}
      catch(e){if(Number(e?.code)===11000)return json(req,env,409,{ok:false,error:"EMAIL_EXISTS"});throw e;}
    }
    return new Response(JSON.stringify(data),{status:res.status,statusText:res.statusText,headers:originHeaders(req,env)});
  }
  const identifier=String(payload.identifier||payload.username||"").trim();
  if(identifier.includes("@")){
    const found=await store.collection("users").findOne({emailLower:identifier.toLowerCase()},{projection:{username:1}});
    if(found?.username)payload.username=found.username;
  }
  const res=await base.fetch(copyRequest(req,req.url,payload),env,ctx);
  return augmentAccountEmail(req,env,res);
}

async function trustedCharacter(store,userId){
  const userObjectId=oid(userId);if(!userObjectId)return null;
  const save=await store.collection("saves").findOne({userId:userObjectId},{sort:{updatedAt:-1},projection:{"data.character":1,slotId:1,updatedAt:1}});
  const character=save?.data?.character;
  return character&&typeof character==="object"&&!Array.isArray(character)?character:null;
}
function publicCharacterSnapshot(character={},acct={},trusted=false){
  const out={
    name:text(character.name||character.nome||acct.displayName||acct.username||"Shinobi",80),
    avatar:text(character.avatar||character.portrait||"",320),
    graduation:text(character.graduation||character.graduacao||"",80),
    clan:text(character.clan||character.cla||"",80),
    role:text(acct.role||"player",32)
  };
  if(trusted){const lv=Number(character.level??character.nivel);if(Number.isFinite(lv))out.level=Math.max(1,Math.floor(lv));}
  return out;
}
async function authoritativeMembership(req,env,ctx,path){
  if(!/^\/api\/(online|pvp|coop)\/(create|join|heartbeat)$/.test(path))return null;
  if(!env.MONGODB_URI||!env.AUTH_SECRET||!env.GAME_ROOMS)return base.fetch(req,env,ctx);
  const me=await account(req,env,ctx);if(!me)return json(req,env,401,{ok:false,error:"UNAUTHORIZED"});
  const payload=await body(req),store=await db(env),trusted=await trustedCharacter(store,me.id),safe={...payload};
  if(trusted)safe.character=publicCharacterSnapshot(trusted,me,true);
  else if(/\/(create|join)$/.test(path))safe.character=publicCharacterSnapshot(payload.character||{},me,false);
  else delete safe.character;
  delete safe.userId;
  delete safe.role;
  return base.fetch(copyRequest(req,req.url,safe),env,ctx);
}
async function roomSnapshot(req,env,ctx,roomId){
  const u=new URL(req.url);u.pathname="/api/online/room";u.search="";
  const headers=new Headers(req.headers);headers.set("content-type","application/json");
  const r=await base.fetch(new Request(u.toString(),{method:"POST",headers,body:JSON.stringify({roomId})}),env,ctx),data=await r.clone().json().catch(()=>({}));
  return {response:r,data};
}
function actionType(envelope){return String(envelope?.type||envelope?.action||envelope?.intent||"action").trim().toLowerCase().slice(0,80)||"action";}
function serverActionType(envelope){
  const raw=`${text(envelope?.text,500)} ${text(envelope?.description||envelope?.descricao,500)} ${text(envelope?.type||envelope?.action||envelope?.intent,80)}`.toLowerCase();
  if(/bloque|block/.test(raw))return "block";
  if(/defend|defesa|defender|esquiv|dodge/.test(raw))return "defend";
  if(/investig|examinar|analisar|procurar pista/.test(raw))return "investigate";
  if(/perceb|observar|vigiar|detectar|sentir/.test(raw))return "perceive";
  if(/persuad|convenc|negoci|intimid|convers|social/.test(raw))return "social";
  if(/mover|moviment|correr|saltar|escalar|move/.test(raw))return "move";
  if(/jutsu|t[eé]cnica|atac|golpe|attack/.test(raw))return "jutsu";
  return actionType(envelope)==="intent"?"action":actionType(envelope);
}
async function authoritativeAction(req,env,ctx){
  if(req.method!=="POST")return json(req,env,405,{ok:false,error:"METHOD_NOT_ALLOWED"});
  if(!env.MONGODB_URI||!env.AUTH_SECRET||!env.GAME_ROOMS)return base.fetch(req,env,ctx);
  const payload=await body(req),roomId=String(payload.roomId||"").trim(),envelope=payload.action??payload;
  if(!roomId)return json(req,env,400,{ok:false,error:"ROOM_ID_REQUIRED"});
  if(hasClientResult(envelope))return json(req,env,400,{ok:false,error:"CLIENT_MECHANICAL_RESULT_FORBIDDEN",rule:"client sends intent only; TERION result is generated server-side"});
  const rawType=actionType(envelope);
  if(/grant|award|give.?xp|set.?level|admin/i.test(rawType))return json(req,env,400,{ok:false,error:"CLIENT_AUTHORITY_FORBIDDEN"});
  const me=await account(req,env,ctx);if(!me)return json(req,env,401,{ok:false,error:"UNAUTHORIZED"});
  const snap=await roomSnapshot(req,env,ctx,roomId);if(!snap.response.ok)return snap.response;
  const members=Array.isArray(snap.data?.members)?snap.data.members:[];
  if(!members.some(x=>String(x.userId)===String(me.id)))return json(req,env,403,{ok:false,error:"ROOM_MEMBERSHIP_REQUIRED"});
  const store=await db(env),character=await trustedCharacter(store,me.id);
  if(!character)return json(req,env,409,{ok:false,error:"AUTHORITATIVE_CHARACTER_SAVE_REQUIRED",rule:"online TERION mechanics require a server-side MongoDB save"});
  // Tipo é classificado no servidor; difficulty/attribute/result do cliente NÃO são repassados.
  const type=serverActionType(envelope);
  const mechanicalResult=resolveTerionIntent({intent:{type,difficulty:"normal"},character});
  const serverEnvelope={...envelope,mechanicalResult};
  const stub=env.GAME_ROOMS.getByName(roomId);
  const internal=await stub.fetch("https://room.internal/action",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({...payload,userId:String(me.id),action:serverEnvelope})});
  const data=await internal.clone().json().catch(()=>({}));
  if(!internal.ok)return json(req,env,internal.status,data);
  data.mechanicalResult=mechanicalResult;
  if(data.event)data.event={...data.event,mechanicalResult};
  return json(req,env,internal.status,data);
}
async function status(req,env,ctx){
  const res=await base.fetch(req,env,ctx);let data;try{data=await res.clone().json();}catch{return res;}
  data.authority="server-terion-2d10";data.serverMechanicalResolution=true;data.clientDifficultyIgnored=true;data.clientRoomCharacterIgnored=true;data.mechanicsReadFromMongoSave=true;data.emailLogin=true;data.buildAuthority=BUILD;
  data.routes={...(data.routes||{}),serverMechanicalResolution:true,authoritativeRoomCharacter:true,emailLogin:true};
  return new Response(JSON.stringify(data),{status:res.status,statusText:res.statusText,headers:originHeaders(req,env)});
}

export default {
  async fetch(req,env,ctx){
    try{
      const path=new URL(req.url).pathname.replace(/\/+$/g,"")||"/";
      if(path==="/"||path==="/api/status")return status(req,env,ctx);
      if(path==="/api/auth/me")return augmentAccountEmail(req,env,await base.fetch(req,env,ctx));
      const auth=await emailAwareAuth(req,env,ctx,path);if(auth)return auth;
      const membership=await authoritativeMembership(req,env,ctx,path);if(membership)return membership;
      if(path==="/api/online/action"||/^\/api\/(pvp|coop)\/action$/.test(path))return authoritativeAction(req,env,ctx);
      return base.fetch(req,env,ctx);
    }catch(e){
      console.error("R41_AUTHORITATIVE_ENTRY_ERROR",e);
      return json(req,env,500,{ok:false,error:"AUTHORITATIVE_ENTRY_FAILED"});
    }
  }
};
