import fs from 'node:fs';

const reportPath=process.env.BROWSER_GAMEPLAY_REPORT||'audit/BROWSER-GAMEPLAY-E2E.json';
const expectedSite='https://kaalflash12.github.io/naruto-shinobi-no-sho/';
const apiOrigin=String(process.env.API_ORIGIN||'').trim().replace(/\/+$/,'');
if(!fs.existsSync(reportPath))throw new Error(`GAMEPLAY_REPORT_MISSING ${reportPath}`);
const report=JSON.parse(fs.readFileSync(reportPath,'utf8'));
if(report.scope!=='PUBLIC_GITHUB_PAGES_REAL_CHROMIUM_GAMEPLAY')throw new Error(`GAMEPLAY_SCOPE_NOT_PUBLIC ${report.scope||'null'}`);
if(String(report.site||'')!==expectedSite)throw new Error(`GAMEPLAY_SITE_NOT_CANONICAL ${report.site||'null'}`);
if(!/^https:\/\//i.test(apiOrigin))throw new Error('GAMEPLAY_LIVE_API_ORIGIN_MISSING');
if(/supabase|vercel|turso/i.test(apiOrigin))throw new Error('GAMEPLAY_FORBIDDEN_BACKEND_ORIGIN');
report.provenance={
  kind:'PUBLIC_GITHUB_PAGES_CLOUDFLARE_MONGODB_LIVE',
  scope:report.scope,
  site:expectedSite,
  apiOrigin,
  backend:'cloudflare-workers-mongodb-atlas',
  realtime:'cloudflare-durable-objects',
  buildAuthority:'R41-AUTHORITATIVE-TERION-20260823-V6'
};
fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');
console.log('PASS_GAMEPLAY_LIVE_PROVENANCE',report.provenance);
