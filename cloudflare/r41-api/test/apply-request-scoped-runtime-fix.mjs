import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());
const file = (rel) => path.join(root, rel);
const read = (rel) => fs.readFileSync(file(rel), 'utf8');
const write = (rel, value) => fs.writeFileSync(file(rel), value.replace(/\r\n/g, '\n'), 'utf8');
const replaceOnce = (source, before, after, label) => {
  const at = source.indexOf(before);
  if (at < 0) throw new Error(`${label}_NOT_FOUND`);
  if (source.indexOf(before, at + before.length) >= 0) throw new Error(`${label}_NOT_UNIQUE`);
  return source.slice(0, at) + after + source.slice(at + before.length);
};

write('src/mongo-request.js', `import { MongoClient } from "mongodb";

export const R41_MONGO_REQUEST_SCOPE = Symbol.for("r41.mongo.request.scope.v1");

export function createMongoRequestEnv(env){
  const scope={client:null,clientPromise:null};
  return new Proxy(env,{get(target,prop){if(prop===R41_MONGO_REQUEST_SCOPE)return scope;return target[prop];}});
}

function requestScope(env){
  const scope=env?.[R41_MONGO_REQUEST_SCOPE];
  if(!scope)throw new Error("MONGO_REQUEST_SCOPE_MISSING");
  return scope;
}

export async function requestMongoDb(env,fallbackDb="naruto_shinobi_no_sho"){
  const scope=requestScope(env);
  if(!scope.clientPromise){
    scope.clientPromise=(async()=>{
      const client=new MongoClient(env.MONGODB_URI,{maxPoolSize:1,minPoolSize:0,maxIdleTimeMS:0,serverSelectionTimeoutMS:6000,connectTimeoutMS:6000});
      await client.connect();
      scope.client=client;
      return client;
    })().catch(e=>{scope.client=null;scope.clientPromise=null;throw e;});
  }
  const client=await scope.clientPromise;
  return client.db(env.MONGODB_DB||fallbackDb);
}

export async function closeMongoRequestEnv(env){
  const scope=env?.[R41_MONGO_REQUEST_SCOPE];
  if(!scope)return;
  let client=scope.client;
  if(!client&&scope.clientPromise){try{client=await scope.clientPromise;}catch{}}
  scope.client=null;
  scope.clientPromise=null;
  if(client){try{await client.close();}catch{}}
}
`);

let index = read('src/index.js');
index = replaceOnce(index,
  'import { MongoClient, ObjectId } from "mongodb";',
  'import { ObjectId } from "mongodb";\nimport { requestMongoDb } from "./mongo-request.js";',
  'INDEX_MONGO_IMPORT');
index = replaceOnce(index,
  'let sharedClient = null;\nlet sharedUri = "";\nlet indexesPromise = null;',
  'let indexesReady = false;',
  'INDEX_GLOBAL_CLIENT');
index = replaceOnce(index,
`async function mongo(env){
  if(!env.MONGODB_URI)throw new Error("MONGODB_URI_MISSING");
  if(!sharedClient || sharedUri!==env.MONGODB_URI){sharedUri=env.MONGODB_URI;sharedClient=new MongoClient(env.MONGODB_URI,{maxPoolSize:6,minPoolSize:0,maxIdleTimeMS:45000,serverSelectionTimeoutMS:6000,connectTimeoutMS:6000});await sharedClient.connect();indexesPromise=null;}
  return sharedClient.db(env.MONGODB_DB||"naruto_shinobi_r41");
}`,
`async function mongo(env){
  if(!env.MONGODB_URI)throw new Error("MONGODB_URI_MISSING");
  return requestMongoDb(env,"naruto_shinobi_r41");
}`,
  'INDEX_MONGO_FUNCTION');
index = replaceOnce(index,
  'async function ensureIndexes(db){\n  if(!indexesPromise) indexesPromise=Promise.all([',
  'async function ensureIndexes(db){\n  if(indexesReady)return;\n  await Promise.all([',
  'INDEX_ENSURE_START');
index = replaceOnce(index,
  '  ]).catch(e=>{indexesPromise=null;throw e;});\n  return indexesPromise;\n}',
  '  ]);\n  indexesReady=true;\n}',
  'INDEX_ENSURE_END');
for (const [before, after] of [
  ['iterations=210000','iterations=100000'],
  ['passIter:210000','passIter:100000'],
  ['hashPassword(recoveryCode,recoverySalt,120000)','hashPassword(recoveryCode,recoverySalt,100000)'],
  ['iterations:120000','iterations:100000'],
  ['u.passIter||210000','u.passIter||100000'],
  ['rc.iterations||120000','rc.iterations||100000'],
]) {
  if (!index.includes(before)) throw new Error(`INDEX_AUTH_LITERAL_NOT_FOUND:${before}`);
  index = index.split(before).join(after);
}
write('src/index.js', index);

let entry = read('src/entry.js');
entry = replaceOnce(entry,
  'import { MongoClient, ObjectId } from "mongodb";',
  'import { ObjectId } from "mongodb";\nimport { requestMongoDb } from "./mongo-request.js";',
  'ENTRY_MONGO_IMPORT');
entry = replaceOnce(entry,
  'let guardClient = null;\nlet guardUri = "";\nlet guardIndex = null;',
  'let guardIndexReady = false;',
  'ENTRY_GLOBAL_CLIENT');
entry = replaceOnce(entry,
  'async function guardDb(env){if(!env.MONGODB_URI)throw new Error("MONGODB_URI_MISSING");if(!guardClient||guardUri!==env.MONGODB_URI){guardUri=env.MONGODB_URI;guardClient=new MongoClient(env.MONGODB_URI,{maxPoolSize:3,minPoolSize:0,maxIdleTimeMS:45000,serverSelectionTimeoutMS:6000,connectTimeoutMS:6000});await guardClient.connect();guardIndex=null;}const db=guardClient.db(env.MONGODB_DB||"naruto_shinobi_r41");if(!guardIndex)guardIndex=db.collection("room_memberships").createIndex({roomId:1,userId:1},{unique:true,name:"uq_room_membership"}).catch(e=>{guardIndex=null;throw e;});await guardIndex;return db;}',
  'async function guardDb(env){if(!env.MONGODB_URI)throw new Error("MONGODB_URI_MISSING");const db=await requestMongoDb(env,"naruto_shinobi_r41");if(!guardIndexReady){await db.collection("room_memberships").createIndex({roomId:1,userId:1},{unique:true,name:"uq_room_membership"});guardIndexReady=true;}return db;}',
  'ENTRY_GUARD_DB');
if (!entry.includes('iterations=120000')) throw new Error('ENTRY_RECOVERY_ITERATION_NOT_FOUND');
entry = entry.split('iterations=120000').join('iterations=100000');
write('src/entry.js', entry);

let authority = read('src/entry-authoritative.js');
authority = replaceOnce(authority,
  'import { MongoClient, ObjectId } from "mongodb";',
  'import { ObjectId } from "mongodb";\nimport { createMongoRequestEnv, requestMongoDb, closeMongoRequestEnv } from "./mongo-request.js";',
  'AUTHORITY_MONGO_IMPORT');
authority = replaceOnce(authority,
  'let client=null,clientUri="",authorityIndexesPromise=null;',
  'let authorityIndexesReady=false;',
  'AUTHORITY_GLOBAL_CLIENT');
authority = replaceOnce(authority,
  '    try{await profiles.dropIndex("uq_mechanical_profile_user");}catch(e){if(Number(e?.code)!==27&&String(e?.codeName||"")!=="IndexNotFound")throw e;}',
  '    try{await profiles.dropIndex("uq_mechanical_profile_user");}catch(e){const code=Number(e?.code),codeName=String(e?.codeName||"");if(code!==26&&code!==27&&codeName!=="NamespaceNotFound"&&codeName!=="IndexNotFound")throw e;}',
  'AUTHORITY_NAMESPACE');
authority = replaceOnce(authority,
  'async function ensureAuthorityIndexes(store){\n  if(!authorityIndexesPromise)authorityIndexesPromise=(async()=>{',
  'async function ensureAuthorityIndexes(store){\n  if(authorityIndexesReady)return;\n  await (async()=>{',
  'AUTHORITY_INDEX_START');
authority = replaceOnce(authority,
  '  })().catch(e=>{authorityIndexesPromise=null;throw e;});\n  await authorityIndexesPromise;\n}',
  '  })();\n  authorityIndexesReady=true;\n}',
  'AUTHORITY_INDEX_END');
authority = replaceOnce(authority,
`async function db(env){
  if(!env.MONGODB_URI)throw new Error("MONGODB_URI_MISSING");
  if(!client||clientUri!==env.MONGODB_URI){clientUri=env.MONGODB_URI;client=new MongoClient(env.MONGODB_URI,{maxPoolSize:4,minPoolSize:0,maxIdleTimeMS:45000,serverSelectionTimeoutMS:6000,connectTimeoutMS:6000});await client.connect();authorityIndexesPromise=null;}
  const store=client.db(env.MONGODB_DB||"naruto_shinobi_no_sho");await ensureAuthorityIndexes(store);return store;
}`,
`async function db(env){
  if(!env.MONGODB_URI)throw new Error("MONGODB_URI_MISSING");
  const store=await requestMongoDb(env,"naruto_shinobi_no_sho");
  await ensureAuthorityIndexes(store);
  return store;
}`,
  'AUTHORITY_DB_FUNCTION');

const exportMarker = 'export default {async fetch(req,env,ctx){try{';
const exportAt = authority.lastIndexOf(exportMarker);
if (exportAt < 0) throw new Error('AUTHORITY_EXPORT_MARKER_NOT_FOUND');
authority = authority.slice(0, exportAt) + `export default {async fetch(req,env,ctx){
  const requestEnv=createMongoRequestEnv(env);
  try{
    const path=new URL(req.url).pathname.replace(/\\/+$/g,"")||"/";
    if(path==="/"||path==="/api/status")return status(req,requestEnv,ctx);
    if(path==="/api/auth/me")return augmentAccountEmail(req,requestEnv,await base.fetch(req,requestEnv,ctx));
    const auth=await emailAwareAuth(req,requestEnv,ctx,path);if(auth)return auth;
    const deletion=await authoritativeAccountDelete(req,requestEnv,ctx,path);if(deletion)return deletion;
    const slotDelete=await authoritativeSlotDelete(req,requestEnv,ctx,path);if(slotDelete)return slotDelete;
    const membership=await authoritativeMembership(req,requestEnv,ctx,path);if(membership)return membership;
    if(path==="/api/online/action"||/^\\/api\\/(pvp|coop)\\/action$/.test(path))return authoritativeAction(req,requestEnv,ctx);
    const world=await authoritativeWorld(req,requestEnv,ctx,path);if(world)return world;
    const leaderboard=await authoritativeLeaderboard(req,requestEnv,ctx,path);if(leaderboard)return leaderboard;
    return base.fetch(req,requestEnv,ctx);
  }catch(e){
    console.error("R41_AUTHORITATIVE_ENTRY_ERROR",e);
    return json(req,requestEnv,500,{ok:false,error:"AUTHORITATIVE_ENTRY_FAILED"});
  }finally{
    await closeMongoRequestEnv(requestEnv);
  }
}};
`;
write('src/entry-authoritative.js', authority);

write('test/cloudflare-runtime-contract.test.mjs', `import assert from "node:assert/strict";
import fs from "node:fs";

const index=fs.readFileSync(new URL("../src/index.js",import.meta.url),"utf8");
const entry=fs.readFileSync(new URL("../src/entry.js",import.meta.url),"utf8");
const authority=fs.readFileSync(new URL("../src/entry-authoritative.js",import.meta.url),"utf8");
const mongoRequest=fs.readFileSync(new URL("../src/mongo-request.js",import.meta.url),"utf8");
const wrangler=fs.readFileSync(new URL("../wrangler.toml",import.meta.url),"utf8");

for(const [name,source] of [["index",index],["entry",entry],["authority",authority]]){
  assert.doesNotMatch(source,/new MongoClient\\s*\\(/,name+": MongoClient must not be created/cached by a route module");
}
assert.match(mongoRequest,/createMongoRequestEnv/);
assert.match(mongoRequest,/maxPoolSize:1/);
assert.match(mongoRequest,/client\\.close\\(\\)/);
assert.match(authority,/finally\\s*\\{\\s*await closeMongoRequestEnv\\(requestEnv\\)/s);
assert.match(authority,/code!==26&&code!==27/);
assert.match(authority,/NamespaceNotFound/);
assert.match(wrangler,/no_throw_on_not_implemented_tls_options/);
for(const [name,source] of [["index",index],["entry",entry]]){
  const nums=[...source.matchAll(/(?:iterations\\s*=|iterations\\s*:|passIter\\s*:|iterations\\s*\\|\\||passIter\\s*\\|\\|)\\s*(\\d+)/g)].map(m=>Number(m[1]));
  assert.ok(nums.length>0,name+": PBKDF2 iteration contracts missing");
  assert.ok(nums.every(n=>n<=100000),name+": PBKDF2 exceeds Workers WebCrypto limit: "+nums.join(","));
}
console.log("PASS_CLOUDFLARE_REQUEST_SCOPED_MONGODB_CONTRACT");
`);

const pkg = JSON.parse(read('package.json'));
pkg.scripts.check = 'node --check src/terion-mechanics.js && node --check src/mongo-request.js && node --check src/index.js && node --check src/entry.js && node --check src/entry-authoritative.js && node --check test/mongodb-live-preflight.mjs';
pkg.scripts.test = 'node test/terion-mechanics.test.mjs && node test/cloudflare-runtime-contract.test.mjs';
write('package.json', JSON.stringify(pkg, null, 2) + '\n');

console.log('PASS_APPLY_REQUEST_SCOPED_RUNTIME_FIX');
