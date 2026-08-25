import fs from 'node:fs';

const has=name=>Boolean(String(process.env[name]||'').trim());
const isHash=value=>/^[a-f0-9]{64}$/.test(String(value||''));
const read=p=>{try{return JSON.parse(fs.readFileSync(p,'utf8'));}catch{return null;}};
const secrets={
  CLOUDFLARE_API_TOKEN:has('SECRET_CLOUDFLARE_API_TOKEN'),
  CLOUDFLARE_ACCOUNT_ID:has('SECRET_CLOUDFLARE_ACCOUNT_ID'),
  MONGODB_URI:has('SECRET_MONGODB_URI'),
  AUTH_SECRET:has('SECRET_AUTH_SECRET'),
  LEON_PRIVATE_CODE:has('SECRET_LEON_PRIVATE_CODE')
};
const variables={
  CLOUDFLARE_API_TOKEN:has('VAR_CLOUDFLARE_API_TOKEN'),
  CLOUDFLARE_ACCOUNT_ID:has('VAR_CLOUDFLARE_ACCOUNT_ID'),
  MONGODB_URI:has('VAR_MONGODB_URI'),
  AUTH_SECRET:has('VAR_AUTH_SECRET'),
  LEON_PRIVATE_CODE:has('VAR_LEON_PRIVATE_CODE'),
  LIVE_API_ORIGIN:has('VAR_LIVE_API_ORIGIN')
};
const usable={
  CLOUDFLARE_API_TOKEN:secrets.CLOUDFLARE_API_TOKEN,
  CLOUDFLARE_ACCOUNT_ID:secrets.CLOUDFLARE_ACCOUNT_ID||variables.CLOUDFLARE_ACCOUNT_ID,
  MONGODB_URI:secrets.MONGODB_URI,
  AUTH_SECRET:secrets.AUTH_SECRET,
  LEON_PRIVATE_CODE:secrets.LEON_PRIVATE_CODE,
  LIVE_API_ORIGIN:variables.LIVE_API_ORIGIN
};
const requiredReady=secrets.CLOUDFLARE_API_TOKEN&&secrets.MONGODB_URI;
const currentSourceFingerprint=String(process.env.LIVE_SOURCE_FINGERPRINT||'').trim();
const currentReleaseFingerprint=String(process.env.RELEASE_SOURCE_FINGERPRINT||'').trim();
if(!isHash(currentSourceFingerprint))throw new Error('BACKEND_PRESENCE_SOURCE_FINGERPRINT_INVALID');
if(!isHash(currentReleaseFingerprint))throw new Error('BACKEND_PRESENCE_RELEASE_FINGERPRINT_INVALID');

const live=read('audit/LIVE-BACKEND.json');
const account=read('audit/ACCOUNT-LIVE-E2E.json');
const browserAccount=read('audit/BROWSER-ACCOUNT-LIVE.json');
const gameplay=read('audit/BROWSER-GAMEPLAY-E2E.json');
const liveSourceFingerprint=String(live?.sourceFingerprint||'').trim()||null;
const livePass=live?.ok===true&&live?.status==='PASS_LIVE_BACKEND_E2E'&&liveSourceFingerprint===currentSourceFingerprint;
const accountReleaseFingerprint=String(account?.provenance?.releaseFingerprint||'').trim()||null;
const browserAccountReleaseFingerprint=String(browserAccount?.provenance?.releaseFingerprint||'').trim()||null;
const gameplayReleaseFingerprint=String(gameplay?.provenance?.releaseFingerprint||'').trim()||null;
const accountPass=account?.ok===true&&account?.status==='PASS_ACCOUNT_LIVE_E2E'&&
  browserAccount?.ok===true&&browserAccount?.status==='PASS_BROWSER_ACCOUNT_LIVE'&&
  account?.provenance?.sourceFingerprint===currentSourceFingerprint&&
  browserAccount?.provenance?.sourceFingerprint===currentSourceFingerprint&&
  accountReleaseFingerprint===currentReleaseFingerprint&&
  browserAccountReleaseFingerprint===currentReleaseFingerprint;
const gameplayPass=gameplay?.ok===true&&gameplay?.status==='PASS_BROWSER_GAMEPLAY_E2E'&&
  gameplay?.scope==='PUBLIC_GITHUB_PAGES_REAL_CHROMIUM_GAMEPLAY'&&
  gameplay?.provenance?.sourceFingerprint===currentSourceFingerprint&&
  gameplayReleaseFingerprint===currentReleaseFingerprint;
const consumersPass=livePass&&accountPass&&gameplayPass;

const report={
  generatedAt:new Date().toISOString(),
  status:'BACKEND_CREDENTIAL_PRESENCE_ONLY',
  ok:true,
  secrets,variables,usable,requiredReady,livePass,consumersPass,
  currentSourceFingerprint,liveSourceFingerprint,
  currentReleaseFingerprint,
  consumerReleaseFingerprints:{account:accountReleaseFingerprint,browserAccount:browserAccountReleaseFingerprint,gameplay:gameplayReleaseFingerprint},
  note:'Somente booleanos de presença e fingerprints SHA-256; nenhum valor secreto ou variável foi gravado. Backend e consumidores live só contam como atuais quando correspondem aos fingerprints da fonte backend e da release pública.'
};
let previous=null;
try{previous=JSON.parse(fs.readFileSync('audit/BACKEND-SECRET-PRESENCE.json','utf8'));}catch{}
const semantic=r=>JSON.stringify({status:r?.status,ok:r?.ok,secrets:r?.secrets,variables:r?.variables,usable:r?.usable,requiredReady:r?.requiredReady,livePass:r?.livePass,consumersPass:r?.consumersPass,currentSourceFingerprint:r?.currentSourceFingerprint||null,liveSourceFingerprint:r?.liveSourceFingerprint||null,currentReleaseFingerprint:r?.currentReleaseFingerprint||null,consumerReleaseFingerprints:r?.consumerReleaseFingerprints||null,note:r?.note});
fs.mkdirSync('audit',{recursive:true});
if(!previous||semantic(previous)!==semantic(report))fs.writeFileSync('audit/BACKEND-SECRET-PRESENCE.json',JSON.stringify(report,null,2)+'\n');
if(process.env.GITHUB_OUTPUT){
  fs.appendFileSync(process.env.GITHUB_OUTPUT,`ready=${requiredReady?'true':'false'}\nlive_pass=${livePass?'true':'false'}\nconsumers_pass=${consumersPass?'true':'false'}\n`);
}
console.log(JSON.stringify({requiredReady,livePass,consumersPass,currentSourceFingerprint,liveSourceFingerprint,currentReleaseFingerprint,consumerReleaseFingerprints:report.consumerReleaseFingerprints},null,2));
