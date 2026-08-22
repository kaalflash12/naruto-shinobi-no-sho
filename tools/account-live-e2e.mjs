import fs from "node:fs";
import path from "node:path";
const authOrigin=(process.env.AUTH_ORIGIN||"https://rlyiwlwzrdgvcwawrnpl.supabase.co/functions/v1/shinobi-auth").replace(/\/+$/,"");
const apiOrigin=(process.env.API_ORIGIN||"https://rlyiwlwzrdgvcwawrnpl.supabase.co/functions/v1/shinobi-api").replace(/\/+$/,"");
const apikey=process.env.SUPABASE_PUBLISHABLE_KEY||"sb_publishable_S9LtSpLhLKFOU9iSd8b4yQ_EziH1Arr";
const reportPath=process.env.ACCOUNT_REPORT||"audit/ACCOUNT-LIVE-E2E.json";
const failures=[],checks={},evidence={};
const suffix=`${Date.now().toString(36)}${Math.random().toString(36).slice(2,8)}`;
const username=`acct_${suffix}`.slice(0,30),email=`${username}@example.com`,password=`Aa!9_${suffix}_old`,newPassword=`Bb!8_${suffix}_new`;
let token="",recoveryCode="";
function ok(name,cond,msg=name){if(!cond)throw new Error(msg);checks[name]=true;}
async function call(origin,route,{method="POST",body,auth="",expected=[200]}={}){const headers={accept:"application/json",apikey};if(body!==undefined)headers["content-type"]="application/json";if(auth)headers.authorization=`Bearer ${auth}`;const res=await fetch(origin+route,{method,headers,body:body===undefined?undefined:JSON.stringify(body)});const text=await res.text();let data={};try{data=text?JSON.parse(text):{};}catch{data={raw:text};}if(!expected.includes(res.status))throw new Error(`${route} HTTP ${res.status}: ${text.slice(0,600)}`);return {res,data};}
function write(status){const doc={generatedAt:new Date().toISOString(),status,ok:failures.length===0,authOrigin,apiOrigin,checks,evidence,failures};fs.mkdirSync(path.dirname(reportPath),{recursive:true});fs.writeFileSync(reportPath,JSON.stringify(doc,null,2)+"\n");console.log(JSON.stringify(doc,null,2));}
try{
 const status=await call(authOrigin,"/api/auth/status",{method:"GET"});evidence.authStatus=status.data;ok("authStatus",status.data?.ok===true&&status.data?.nativeEmailBridge===true,"auth status inválido");ok("authV2LegacyBridge",status.data?.build==="NARUTO-SHINOBI-NO-SHO-AUTH-20260822-V2"&&status.data?.legacyUsernameBridge===true,"shinobi-auth v2/legacyUsernameBridge não está ativo");
 const reg=await call(authOrigin,"/api/auth/register",{body:{username,email,displayName:"E2E Account",password},expected:[201]});ok("register",reg.data?.ok===true&&reg.data?.token&&reg.data?.recoveryCode,"registro não retornou sessão/código");token=reg.data.token;recoveryCode=reg.data.recoveryCode;evidence.account={username:reg.data.account?.username,emailLinked:reg.data.emailLinked===true};
 const me=await call(authOrigin,"/api/auth/me",{method:"GET",auth:token});ok("meAfterRegister",me.data?.account?.username===username,"me não reconheceu conta criada");
 const save=await call(apiOrigin,"/api/account/save",{auth:token,body:{slotId:`acct-${suffix}`,gameVersion:"ACCOUNT-E2E",save:{character:{name:"Account E2E",level:2},resources:{kurai:8},world:{marker:suffix}}}});ok("sharedSessionWithGameApi",save.data?.saved===true,"sessão da auth não foi aceita pela API do jogo");
 await call(authOrigin,"/api/auth/logout",{auth:token,body:{}});token="";checks.logout=true;
 const loginUser=await call(authOrigin,"/api/auth/login",{body:{identifier:username,password}});ok("loginByUsername",!!loginUser.data?.token,"login por usuário falhou");token=loginUser.data.token;
 const rotate=await call(authOrigin,"/api/auth/recovery-code",{auth:token,body:{}});ok("rotateRecoveryCode",!!rotate.data?.recoveryCode,"rotação de código falhou");recoveryCode=rotate.data.recoveryCode;
 await call(authOrigin,"/api/auth/logout",{auth:token,body:{}});token="";
 const recover=await call(authOrigin,"/api/auth/recover",{body:{identifier:username,recoveryCode,newPassword}});ok("recoverPassword",recover.data?.recovered===true,"recuperação falhou");
 const oldLogin=await call(authOrigin,"/api/auth/login",{body:{identifier:username,password},expected:[401]});ok("oldPasswordRejected",oldLogin.data?.error==="LOGIN_INVALID","senha antiga ainda funciona");
 const loginEmail=await call(authOrigin,"/api/auth/login",{body:{identifier:email,password:newPassword}});ok("loginByEmailAfterRecovery",!!loginEmail.data?.token,"login por e-mail com nova senha falhou");token=loginEmail.data.token;
 const load=await call(apiOrigin,"/api/account/load",{auth:token,body:{slotId:`acct-${suffix}`}});ok("saveSurvivesRelogin",load.data?.save?.world?.marker===suffix&&load.data?.save?.resources?.kurai===8,"save não sobreviveu ao relogin");
 await call(apiOrigin,"/api/account/delete",{auth:token,body:{slotId:`acct-${suffix}`}});await call(authOrigin,"/api/auth/delete-account",{auth:token,body:{}});token="";checks.deleteAccount=true;
 const deletedLogin=await call(authOrigin,"/api/auth/login",{body:{identifier:email,password:newPassword},expected:[401]});ok("deletedAccountRejected",deletedLogin.data?.error==="LOGIN_INVALID","conta excluída ainda autentica");
 write("PASS_ACCOUNT_LIVE_E2E");
}catch(err){failures.push(String(err?.stack||err));if(token){try{await call(authOrigin,"/api/auth/delete-account",{auth:token,body:{}});}catch{}}write("FAIL_ACCOUNT_LIVE_E2E");process.exitCode=1;}