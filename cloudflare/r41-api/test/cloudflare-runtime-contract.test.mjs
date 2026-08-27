import assert from "node:assert/strict";
import fs from "node:fs";

const index=fs.readFileSync(new URL("../src/index.js",import.meta.url),"utf8");
const entry=fs.readFileSync(new URL("../src/entry.js",import.meta.url),"utf8");
const authority=fs.readFileSync(new URL("../src/entry-authoritative.js",import.meta.url),"utf8");
const mongoRequest=fs.readFileSync(new URL("../src/mongo-request.js",import.meta.url),"utf8");
const wrangler=fs.readFileSync(new URL("../wrangler.toml",import.meta.url),"utf8");

for(const [name,source] of [["index",index],["entry",entry],["authority",authority]]){
  assert.doesNotMatch(source,/new MongoClient\s*\(/,name+": MongoClient must not be created/cached by a route module");
}
assert.match(mongoRequest,/createMongoRequestEnv/);
assert.match(mongoRequest,/maxPoolSize:1/);
assert.match(mongoRequest,/client\.close\(\)/);
assert.match(mongoRequest,/const scope=\{clients:\[\]\}/);
assert.doesNotMatch(mongoRequest,/clientPromise|scope\.client\b/);
assert.match(mongoRequest,/scope\.clients\.push\(client\)/);
assert.match(mongoRequest,/Promise\.allSettled\(clients\.map\(client=>client\.close\(\)\)\)/);
assert.match(authority,/finally\s*\{\s*await closeMongoRequestEnv\(requestEnv\)/s);
assert.match(authority,/code!==26&&code!==27/);
assert.match(authority,/NamespaceNotFound/);
assert.match(index,/export async function accountFromRequest/);
assert.match(index,/let data;try\{data=JSON\.parse/);
assert.match(index,/const session=await db\.collection\(\"sessions\"\)\.findOne/);
assert.match(entry,/accountFromRequest\(req,env\)/);
assert.doesNotMatch(entry,/pathname=\"\/api\/auth\/me\"/);
assert.match(authority,/return await base\.fetch\(req,requestEnv,ctx\)/);
assert.match(authority,/return await augmentAccountEmail\(req,requestEnv/);
assert.match(authority,/finally\s*\{\s*await closeMongoRequestEnv\(requestEnv\)/s);
assert.match(wrangler,/no_throw_on_not_implemented_tls_options/);
for(const [name,source] of [["index",index],["entry",entry]]){
  const nums=[...source.matchAll(/(?:iterations\s*=|iterations\s*:|passIter\s*:|iterations\s*\|\||passIter\s*\|\|)\s*(\d+)/g)].map(m=>Number(m[1]));
  assert.ok(nums.length>0,name+": PBKDF2 iteration contracts missing");
  assert.ok(nums.every(n=>n<=100000),name+": PBKDF2 exceeds Workers WebCrypto limit: "+nums.join(","));
}
console.log("PASS_CLOUDFLARE_REQUEST_SCOPED_MONGODB_CONTRACT");
