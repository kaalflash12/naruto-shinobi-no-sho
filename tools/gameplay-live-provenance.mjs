import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT=process.cwd();
const reportPath=process.env.BROWSER_GAMEPLAY_REPORT||'audit/BROWSER-GAMEPLAY-E2E.json';
const expectedSite='https://kaalflash12.github.io/naruto-shinobi-no-sho/';
const apiOrigin=String(process.env.API_ORIGIN||'').trim().replace(/\/+$/,'');
const livePath=path.join(ROOT,'audit/LIVE-BACKEND.json');
if(!fs.existsSync(reportPath))throw new Error(`GAMEPLAY_REPORT_MISSING ${reportPath}`);
if(!fs.existsSync(livePath))throw new Error('GAMEPLAY_LIVE_BACKEND_EVIDENCE_MISSING');
const report=JSON.parse(fs.readFileSync(reportPath,'utf8'));
const live=JSON.parse(fs.readFileSync(livePath,'utf8'));
const currentSourceFingerprint=execFileSync(process.execPath,[path.join(ROOT,'tools/live-source-fingerprint.mjs')],{cwd:ROOT,encoding:'utf8'}).trim();
const currentReleaseFingerprint=execFileSync(process.execPath,[path.join(ROOT,'tools/release-source-fingerprint.mjs')],{cwd:ROOT,encoding:'utf8'}).trim();
if(report.scope!=='PUBLIC_GITHUB_PAGES_REAL_CHROMIUM_GAMEPLAY')throw new Error(`GAMEPLAY_SCOPE_NOT_PUBLIC ${report.scope||'null'}`);
if(String(report.site||'')!==expectedSite)throw new Error(`GAMEPLAY_SITE_NOT_CANONICAL ${report.site||'null'}`);
if(!/^https:\/\//i.test(apiOrigin))throw new Error('GAMEPLAY_LIVE_API_ORIGIN_MISSING');
if(/supabase|vercel|turso/i.test(apiOrigin))throw new Error('GAMEPLAY_FORBIDDEN_BACKEND_ORIGIN');
if(!/^[a-f0-9]{64}$/.test(currentSourceFingerprint))throw new Error('GAMEPLAY_CURRENT_SOURCE_FINGERPRINT_INVALID');
if(!/^[a-f0-9]{64}$/.test(currentReleaseFingerprint))throw new Error('GAMEPLAY_CURRENT_RELEASE_FINGERPRINT_INVALID');
if(live?.ok!==true||live?.status!=='PASS_LIVE_BACKEND_E2E')throw new Error(`GAMEPLAY_LIVE_BACKEND_NOT_PASS ${live?.status||'null'}`);
if(String(live?.sourceFingerprint||'')!==currentSourceFingerprint)throw new Error('GAMEPLAY_LIVE_BACKEND_STALE');
report.provenance={
  kind:'PUBLIC_GITHUB_PAGES_CLOUDFLARE_MONGODB_LIVE',
  scope:report.scope,
  site:expectedSite,
  apiOrigin,
  sourceFingerprint:currentSourceFingerprint,
  releaseFingerprint:currentReleaseFingerprint,
  backend:'cloudflare-workers-mongodb-atlas',
  realtime:'cloudflare-durable-objects',
  buildAuthority:'R41-AUTHORITATIVE-TERION-20260823-V6'
};
fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');
console.log('PASS_GAMEPLAY_LIVE_PROVENANCE',report.provenance);
