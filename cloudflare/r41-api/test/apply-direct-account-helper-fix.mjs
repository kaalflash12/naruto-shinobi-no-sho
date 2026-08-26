import fs from 'node:fs';

const read=(p)=>fs.readFileSync(p,'utf8');
const write=(p,s)=>fs.writeFileSync(p,s.replace(/\r\n/g,'\n'),'utf8');
const replaceOnce=(s,before,after,label)=>{
  const i=s.indexOf(before);
  if(i<0)throw new Error(`${label}_NOT_FOUND`);
  if(s.indexOf(before,i+before.length)>=0)throw new Error(`${label}_NOT_UNIQUE`);
  return s.slice(0,i)+after+s.slice(i+before.length);
};

let index=read('src/index.js');
index=replaceOnce(
  index,
  'async function requireUser(req,env,db){return verifyToken(env,db,bearer(req));}',
  'async function requireUser(req,env,db){return verifyToken(env,db,bearer(req));}\nexport async function accountFromRequest(req,env){const db=await mongo(env);await ensureIndexes(db);const user=await requireUser(req,env,db);return user?safeAccount(user):null;}',
  'INDEX_ACCOUNT_HELPER'
);
write('src/index.js',index);

let entry=read('src/entry.js');
entry=replaceOnce(
  entry,
  'import worker, { GameRoom } from "./index.js";',
  'import worker, { GameRoom, accountFromRequest } from "./index.js";',
  'ENTRY_ACCOUNT_HELPER_IMPORT'
);
entry=replaceOnce(
  entry,
  'async function currentAccount(req,env,ctx){const u=new URL(req.url);u.pathname="/api/auth/me";u.search="";const r=await worker.fetch(new Request(u.toString(),{method:"POST",headers:req.headers}),env,ctx),d=await r.json().catch(()=>({}));return r.ok&&d.ok&&d.account?.id?d.account:null;}',
  'async function currentAccount(req,env,ctx){return accountFromRequest(req,env);}',
  'ENTRY_CURRENT_ACCOUNT_LOOPBACK'
);
write('src/entry.js',entry);

let contract=read('test/cloudflare-runtime-contract.test.mjs');
const anchor='assert.match(authority,/NamespaceNotFound/);';
if(!contract.includes(anchor))throw new Error('RUNTIME_CONTRACT_ANCHOR_NOT_FOUND');
contract=contract.replace(anchor,`${anchor}\nassert.match(index,/export async function accountFromRequest/);\nassert.match(entry,/accountFromRequest\\(req,env\\)/);\nassert.doesNotMatch(entry,/pathname=\\"\\/api\\/auth\\/me\\"/);`);
write('test/cloudflare-runtime-contract.test.mjs',contract);

console.log('PASS_APPLY_DIRECT_ACCOUNT_HELPER_FIX');
