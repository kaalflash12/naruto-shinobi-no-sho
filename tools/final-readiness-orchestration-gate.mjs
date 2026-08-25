import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const read = p => {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch { return null; }
};
const normalize = v => String(v || '').replace(/\/+$/, '');
const isHash = v => /^[a-f0-9]{64}$/.test(String(v || ''));
const runHash = script => {
  try { return execFileSync(process.execPath, [script], { encoding: 'utf8' }).trim(); }
  catch { return ''; }
};

const live = read('audit/LIVE-BACKEND.json');
const account = read('audit/ACCOUNT-LIVE-E2E.json');
const browserAccount = read('audit/BROWSER-ACCOUNT-LIVE.json');
const gameplay = read('audit/BROWSER-GAMEPLAY-E2E.json');
const currentFingerprint = runHash('tools/live-source-fingerprint.mjs');
const currentReleaseFingerprint = runHash('tools/release-source-fingerprint.mjs');
const liveFingerprint = String(live?.sourceFingerprint || '');
const liveFresh = live?.ok === true && live?.status === 'PASS_LIVE_BACKEND_E2E' && isHash(currentFingerprint) && liveFingerprint === currentFingerprint;
const releaseValid = isHash(currentReleaseFingerprint);
const accountApi = normalize(account?.provenance?.apiOrigin);
const browserAccountApi = normalize(browserAccount?.provenance?.apiOrigin);
const gameplayApi = normalize(gameplay?.provenance?.apiOrigin);

const accountOk = account?.ok === true &&
  account?.status === 'PASS_ACCOUNT_LIVE_E2E' &&
  browserAccount?.ok === true &&
  browserAccount?.status === 'PASS_BROWSER_ACCOUNT_LIVE' &&
  account?.provenance?.kind === 'ACCOUNT_LIVE_CLOUDFLARE_MONGODB' &&
  browserAccount?.provenance?.kind === 'BROWSER_ACCOUNT_LIVE_CLOUDFLARE_MONGODB' &&
  account?.provenance?.sourceFingerprint === liveFingerprint &&
  browserAccount?.provenance?.sourceFingerprint === liveFingerprint &&
  account?.provenance?.releaseFingerprint === currentReleaseFingerprint &&
  browserAccount?.provenance?.releaseFingerprint === currentReleaseFingerprint &&
  account?.provenance?.publicReleaseCoherence === 'PASS_PUBLIC_RELEASE_COHERENCE' &&
  browserAccount?.provenance?.publicReleaseCoherence === 'PASS_PUBLIC_RELEASE_COHERENCE' &&
  account?.provenance?.backend === 'cloudflare-workers-mongodb-atlas' &&
  browserAccount?.provenance?.backend === 'cloudflare-workers-mongodb-atlas' &&
  account?.provenance?.realtime === 'cloudflare-durable-objects' &&
  browserAccount?.provenance?.realtime === 'cloudflare-durable-objects' &&
  account?.provenance?.buildAuthority === 'R41-AUTHORITATIVE-TERION-20260823-V6' &&
  browserAccount?.provenance?.buildAuthority === 'R41-AUTHORITATIVE-TERION-20260823-V6' &&
  /^https:\/\//i.test(accountApi) && accountApi === browserAccountApi;

const gameplayOk = gameplay?.ok === true &&
  gameplay?.status === 'PASS_BROWSER_GAMEPLAY_E2E' &&
  gameplay?.scope === 'PUBLIC_GITHUB_PAGES_REAL_CHROMIUM_GAMEPLAY' &&
  gameplay?.site === 'https://kaalflash12.github.io/naruto-shinobi-no-sho/' &&
  gameplay?.provenance?.kind === 'PUBLIC_GITHUB_PAGES_CLOUDFLARE_MONGODB_LIVE' &&
  gameplay?.provenance?.sourceFingerprint === liveFingerprint &&
  gameplay?.provenance?.releaseFingerprint === currentReleaseFingerprint &&
  gameplay?.provenance?.publicReleaseCoherence === 'PASS_PUBLIC_RELEASE_COHERENCE' &&
  gameplay?.provenance?.backend === 'cloudflare-workers-mongodb-atlas' &&
  gameplay?.provenance?.realtime === 'cloudflare-durable-objects' &&
  gameplay?.provenance?.buildAuthority === 'R41-AUTHORITATIVE-TERION-20260823-V6' &&
  /^https:\/\//i.test(gameplayApi) &&
  gameplay?.checks?.temporaryAccountRegistered === true &&
  gameplay?.checks?.temporaryAccountDeleted === true &&
  Array.isArray(gameplay?.contracts) && gameplay.contracts.length >= 11 && gameplay.contracts.every(x => x.status === 'PASS_GAMEPLAY_E2E');

const sameBackend = accountOk && gameplayOk && accountApi === gameplayApi;
const ready = liveFresh && releaseValid && accountOk && gameplayOk && sameBackend;
const result = {
  ready,
  liveFresh,
  releaseValid,
  currentFingerprint,
  liveFingerprint,
  currentReleaseFingerprint,
  accountOk,
  gameplayOk,
  sameBackend,
  accountFingerprint: account?.provenance?.sourceFingerprint || null,
  browserAccountFingerprint: browserAccount?.provenance?.sourceFingerprint || null,
  gameplayFingerprint: gameplay?.provenance?.sourceFingerprint || null,
  accountReleaseFingerprint: account?.provenance?.releaseFingerprint || null,
  browserAccountReleaseFingerprint: browserAccount?.provenance?.releaseFingerprint || null,
  gameplayReleaseFingerprint: gameplay?.provenance?.releaseFingerprint || null,
  accountApi: accountApi || null,
  browserAccountApi: browserAccountApi || null,
  gameplayApi: gameplayApi || null
};

if (process.env.GITHUB_OUTPUT) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT,
    `ready=${ready ? 'true' : 'false'}\n` +
    `live=${liveFresh ? 'true' : 'false'}\n` +
    `release=${releaseValid ? 'true' : 'false'}\n` +
    `account=${accountOk ? 'true' : 'false'}\n` +
    `gameplay=${gameplayOk ? 'true' : 'false'}\n` +
    `same_backend=${sameBackend ? 'true' : 'false'}\n`);
}
console.log(JSON.stringify(result, null, 2));
if (process.env.REQUIRE_FINAL_READY === '1' && !ready) process.exitCode = 1;
