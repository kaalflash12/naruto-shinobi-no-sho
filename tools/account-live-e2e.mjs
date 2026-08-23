import fs from "node:fs";
import path from "node:path";

const apiOrigin=String(process.env.API_ORIGIN||"").trim().replace(/\/+$/,"");
const reportPath=process.env.ACCOUNT_REPORT||"audit/ACCOUNT-LIVE-E2E.json";
const failures=[],checks={},evidence={};
const suffix=`${Date.now().toString(36)}${Math.random().toString(36).slice(2,8)}`;
const username=`acct_${suffix}`.slice(0,30),password=`Aa!9_${suffix}_old`,newPassword=`Bb!8_${suffix}_new`;
let token="",recoveryCode="";

function ok(name,cond,msg=name){if(!cond)throw new Error(msg);checks[name]=true;}
async function call(route,{method="POST",body,auth="",expected=[200]}={}){
  const headers={accept:"application/json"};
  if(body!==undefined)headers["content-type"]="application/json";
  if(auth)headers.authorization=`Bearer ${auth}`;
  const res=await fetch(apiOrigin+route,{method,headers,body:body===undefined?undefined:JSON.stringify(body)});
  const text=await res.text();let data={};try{data=text?JSON.parse(text):{};}catch{data={raw:text};}
  if(!expected.includes(res.status))throw new Error(`${route} HTTP ${res.status}: ${text.slice(0,800)}`);
  return {res,data};
}
function write(status){const doc={generatedAt:new Date().toISOString(),status,ok:failures.length===0,backend:"cloudflare-workers-mongodb-atlas",apiOrigin,checks,evidence,failures};fs.mkdirSync(path.dirname(reportPath),{recursive:true});fs.writeFileSync(reportPath,JSON.stringify(doc,null,2)+"\n");console.log(JSON.stringify(doc,null,2));}

try{
  ok("apiOriginConfigured",/^https:\/\//.test(apiOrigin),"API_ORIGIN Cloudflare ausente");
  const status=await call("/api/status",{method:"GET"});
  evidence.status={service:status.data?.service,build:status.data?.build,storage:status.data?.storage,realtime:status.data?.realtime};
  ok("backendStatus",status.data?.ok===true&&status.data?.configured===true,"Worker não configurado");
  ok("mongodbAtlas",status.data?.storage==="mongodb-atlas"&&status.data?.cloudSave===true,"MongoDB Atlas não confirmado");
  ok("durableObjects",status.data?.realtime==="cloudflare-durable-objects"&&status.data?.onlineRooms===true,"Durable Objects não confirmados");

  const reg=await call("/api/auth/register",{body:{username,displayName:"E2E Account",password},expected:[201]});
  ok("register",reg.data?.ok===true&&reg.data?.token&&reg.data?.recoveryCode,"registro não retornou sessão/código");
  token=reg.data.token;recoveryCode=reg.data.recoveryCode;evidence.account={username:reg.data.account?.username};

  const me=await call("/api/auth/me",{method:"GET",auth:token});
  ok("meAfterRegister",me.data?.account?.username===username,"me não reconheceu conta criada");

  const save=await call("/api/account/save",{auth:token,body:{slotId:`acct-${suffix}`,gameVersion:"ACCOUNT-E2E",save:{character:{name:"Account E2E",level:2},resources:{kurai:8},world:{marker:suffix}}}});
  ok("saveMongo",save.data?.saved===true,"save MongoDB falhou");

  await call("/api/auth/logout",{auth:token,body:{}});token="";checks.logout=true;
  const loginUser=await call("/api/auth/login",{body:{identifier:username,password}});
  ok("loginByUsername",!!loginUser.data?.token,"login por usuário falhou");token=loginUser.data.token;

  const rotate=await call("/api/auth/recovery-code",{auth:token,body:{}});
  ok("rotateRecoveryCode",!!rotate.data?.recoveryCode,"rotação de código falhou");recoveryCode=rotate.data.recoveryCode;
  await call("/api/auth/logout",{auth:token,body:{}});token="";

  const recover=await call("/api/auth/recover",{body:{identifier:username,recoveryCode,newPassword}});
  ok("recoverPassword",recover.data?.recovered===true,"recuperação falhou");
  const oldLogin=await call("/api/auth/login",{body:{identifier:username,password},expected:[401]});
  ok("oldPasswordRejected",oldLogin.data?.error==="LOGIN_INVALID","senha antiga ainda funciona");

  const loginNew=await call("/api/auth/login",{body:{identifier:username,password:newPassword}});
  ok("loginAfterRecovery",!!loginNew.data?.token,"login com nova senha falhou");token=loginNew.data.token;

  const load=await call("/api/account/load",{auth:token,body:{slotId:`acct-${suffix}`}});
  ok("saveSurvivesRelogin",load.data?.save?.world?.marker===suffix&&load.data?.save?.resources?.kurai===8,"save não sobreviveu ao relogin");

  await call("/api/account/delete",{auth:token,body:{slotId:`acct-${suffix}`}});checks.deleteSave=true;
  await call("/api/auth/delete-account",{auth:token,body:{}});token="";checks.deleteAccount=true;
  const deletedLogin=await call("/api/auth/login",{body:{identifier:username,password:newPassword},expected:[401]});
  ok("deletedAccountRejected",deletedLogin.data?.error==="LOGIN_INVALID","conta excluída ainda autentica");

  write("PASS_ACCOUNT_LIVE_E2E");
}catch(err){
  failures.push(String(err?.stack||err));
  if(token){try{await call("/api/auth/delete-account",{auth:token,body:{}});}catch{}}
  write("FAIL_ACCOUNT_LIVE_E2E");process.exitCode=1;
}
