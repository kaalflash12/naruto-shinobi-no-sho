import fs from 'node:fs';
import crypto from 'node:crypto';

const base=String(process.env.PUBLIC_GAME_URL||'https://kaalflash12.github.io/naruto-shinobi-no-sho/').replace(/\/+$/,'')+'/';
const reportPath=process.env.PUBLIC_RELEASE_REPORT||'audit/PUBLIC-RELEASE-COHERENCE.json';
const html=fs.readFileSync('index.html','utf8');
const refs=[...html.matchAll(/(?:src|href)="([^"#]+)"/g)]
  .map(m=>m[1].split('?')[0].replace(/^\.\//,''))
  .filter(v=>v&&!/^(?:https?:|data:|\/\/)/i.test(v));
const files=[...new Set(['index.html',...refs])].filter(p=>fs.existsSync(p));
const sha256=b=>crypto.createHash('sha256').update(b).digest('hex');
const checks=[];
const failures=[];
const nonce=`${Date.now()}-${Math.random().toString(16).slice(2)}`;

for(const file of files){
  const local=fs.readFileSync(file);
  const url=new URL(file,base);
  url.searchParams.set('release-check',nonce);
  try{
    const response=await fetch(url,{headers:{'cache-control':'no-cache','pragma':'no-cache'}});
    const remote=Buffer.from(await response.arrayBuffer());
    const localSha256=sha256(local);
    const remoteSha256=sha256(remote);
    const ok=response.ok&&localSha256===remoteSha256;
    checks.push({file,status:response.status,ok,localSha256,remoteSha256,bytesLocal:local.length,bytesRemote:remote.length});
    if(!ok)failures.push(`${file}: HTTP ${response.status}, local=${localSha256}, public=${remoteSha256}`);
  }catch(error){
    checks.push({file,status:null,ok:false,error:String(error?.message||error)});
    failures.push(`${file}: ${String(error?.message||error)}`);
  }
}

const report={generatedAt:new Date().toISOString(),status:failures.length?'FAIL_PUBLIC_RELEASE_COHERENCE':'PASS_PUBLIC_RELEASE_COHERENCE',ok:failures.length===0,site:base,files:files.length,checks,failures};
fs.mkdirSync('audit',{recursive:true});
fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({status:report.status,files:report.files,failures:report.failures},null,2));
if(!report.ok)process.exitCode=1;
