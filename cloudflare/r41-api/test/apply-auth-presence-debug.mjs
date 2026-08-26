import fs from 'node:fs';

const p='src/entry.js';
let s=fs.readFileSync(p,'utf8');
const before='async function currentAccount(req,env,ctx){return accountFromRequest(req,env);}';
const after='async function currentAccount(req,env,ctx){const hasAuth=!!req.headers.get("authorization");const account=await accountFromRequest(req,env);console.log("R41_CURRENT_ACCOUNT_DIAG",JSON.stringify({path:new URL(req.url).pathname,hasAuth,accountFound:!!account?.id}));return account;}';
if(!s.includes(before))throw new Error('CURRENT_ACCOUNT_DIRECT_HELPER_NOT_FOUND');
s=s.replace(before,after);
fs.writeFileSync(p,s,'utf8');
console.log('PASS_APPLY_AUTH_PRESENCE_DEBUG');
