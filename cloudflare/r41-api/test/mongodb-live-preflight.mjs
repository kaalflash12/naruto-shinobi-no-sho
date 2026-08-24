import fs from 'node:fs';
import path from 'node:path';
import { MongoClient } from 'mongodb';

const uri=String(process.env.MONGODB_URI||'').trim();
const outPath=path.resolve(process.cwd(),'../../audit/MONGODB-PREFLIGHT.json');
const startedAt=new Date().toISOString();

function classify(error){
  const name=String(error?.name||'');
  const code=Number(error?.code);
  const codeName=String(error?.codeName||'');
  if(name==='MongoParseError'||name==='MongoInvalidArgumentError')return {category:'MONGODB_URI_INVALID',remediation:'CHECK_MONGODB_URI'};
  if(code===18||codeName==='AuthenticationFailed'||/Authentication/i.test(name))return {category:'MONGODB_AUTH_FAILED',remediation:'CHECK_DATABASE_USER_CREDENTIALS'};
  if(['MongoServerSelectionError','MongoNetworkError','MongoNetworkTimeoutError','MongoTopologyClosedError'].includes(name))return {category:'MONGODB_NETWORK_OR_IP_ACCESS',remediation:'CHECK_ATLAS_IP_ACCESS_LIST_AND_CLUSTER_STATE'};
  return {category:'MONGODB_PREFLIGHT_FAILED',remediation:'CHECK_ATLAS_CONFIGURATION'};
}
function write(report){
  fs.mkdirSync(path.dirname(outPath),{recursive:true});
  fs.writeFileSync(outPath,JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report,null,2));
}

if(!uri){
  write({generatedAt:new Date().toISOString(),startedAt,status:'BLOCKED_MISSING_MONGODB_URI',ok:false,scope:'GITHUB_ACTIONS_DIRECT_MONGODB_ATLAS_PREFLIGHT',category:'MONGODB_URI_MISSING',remediation:'CONFIGURE_GITHUB_ACTIONS_MONGODB_URI'});
  process.exit(2);
}
if(!/^mongodb(?:\+srv)?:\/\//i.test(uri)){
  write({generatedAt:new Date().toISOString(),startedAt,status:'BLOCKED_INVALID_MONGODB_URI',ok:false,scope:'GITHUB_ACTIONS_DIRECT_MONGODB_ATLAS_PREFLIGHT',category:'MONGODB_URI_INVALID',remediation:'CHECK_MONGODB_URI'});
  process.exit(3);
}

let client;
try{
  client=new MongoClient(uri,{maxPoolSize:1,minPoolSize:0,maxIdleTimeMS:5000,serverSelectionTimeoutMS:8000,connectTimeoutMS:8000});
  await client.connect();
  const database=String(process.env.MONGODB_DB||'naruto_shinobi_no_sho').trim()||'naruto_shinobi_no_sho';
  const ping=await client.db(database).command({ping:1});
  if(Number(ping?.ok)!==1)throw Object.assign(new Error('PING_NOT_OK'),{name:'MongoPingError'});
  write({generatedAt:new Date().toISOString(),startedAt,status:'PASS_MONGODB_ATLAS_PREFLIGHT',ok:true,scope:'GITHUB_ACTIONS_DIRECT_MONGODB_ATLAS_PREFLIGHT',database,checks:{uriScheme:true,driverConnect:true,ping:true},note:'A URI não é gravada. Este preflight prova Atlas a partir do runner; o E2E do Worker continua obrigatório para provar Cloudflare → Atlas.'});
}catch(error){
  const c=classify(error);
  write({generatedAt:new Date().toISOString(),startedAt,status:'FAIL_MONGODB_ATLAS_PREFLIGHT',ok:false,scope:'GITHUB_ACTIONS_DIRECT_MONGODB_ATLAS_PREFLIGHT',category:c.category,remediation:c.remediation,errorName:String(error?.name||'Error').slice(0,80),errorCode:Number.isFinite(Number(error?.code))?Number(error.code):null,note:'Nenhuma URI, senha, hostname ou mensagem interna do driver é gravada.'});
  process.exitCode=1;
}finally{
  try{await client?.close();}catch{}
}
