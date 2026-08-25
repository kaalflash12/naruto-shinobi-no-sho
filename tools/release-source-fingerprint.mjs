import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const backendFingerprint = execFileSync(process.execPath, ['tools/live-source-fingerprint.mjs'], { encoding: 'utf8' }).trim();
if (!/^[a-f0-9]{64}$/.test(backendFingerprint)) throw new Error('RELEASE_BACKEND_FINGERPRINT_INVALID');

const publicRuntime = [
  'index.html',
  'app.js',
  'styles.css',
  'r31.css',
  'r41-map-hitfix.css',
  'r41-api-config.js',
  'r41-github-api.js',
  'r41-account-ui.js',
  'r41-account-deeplink-fix.js',
  'data',
  'src',
  'assets'
];
const evidenceSources = [
  'package.json',
  'tools/release-source-fingerprint.mjs',
  'tools/check-public-release-fingerprint.mjs',
  'tools/public-release-coherence.mjs',
  'tools/wait-public-release-coherence.mjs',
  'tools/account-live-e2e.mjs',
  'tools/browser-account-live.mjs',
  'tools/browser-smoke.mjs',
  'tools/browser-combat-local-e2e.mjs',
  'tools/browser-gameplay-local-e2e.mjs',
  'tools/browser-gameplay-e2e.mjs',
  'tools/browser-gameplay-e2e-v2.mjs',
  'tools/browser-gameplay-e2e-v3.mjs',
  'tools/browser-gameplay-e2e-v4.mjs',
  'tools/test-online-bridge-recovery.mjs',
  'tools/gameplay-live-provenance.mjs',
  'tools/backend-presence-audit.mjs',
  'tools/final-readiness-orchestration-gate.mjs',
  'tools/final-readiness.mjs',
  '.github/workflows/runtime-integrity.yml',
  '.github/workflows/browser-e2e.yml',
  '.github/workflows/backend-secret-presence.yml',
  '.github/workflows/account-live-e2e.yml',
  '.github/workflows/browser-gameplay-e2e.yml',
  '.github/workflows/post-live-backend-orchestration.yml',
  '.github/workflows/final-readiness-orchestration.yml',
  '.github/workflows/final-readiness.yml'
];
const pathspecs = [...new Set([...publicRuntime, ...evidenceSources])];
const raw = execFileSync('git', ['ls-files', '-s', '-z', '--', ...pathspecs]);
const records = raw.toString('utf8').split('\0').filter(Boolean).sort();
if (!records.length) throw new Error('RELEASE_SOURCE_FINGERPRINT_EMPTY');

const trackedPaths = new Set(records.map(record => record.slice(record.indexOf('\t') + 1)));
const requiredFiles = [...publicRuntime.filter(p => !['data','src','assets'].includes(p)), ...evidenceSources];
const missingFiles = requiredFiles.filter(file => !trackedPaths.has(file));
if (missingFiles.length) throw new Error(`RELEASE_SOURCE_UNTRACKED ${missingFiles.join(',')}`);
for (const dir of ['data','src','assets']) {
  if (![...trackedPaths].some(file => file.startsWith(`${dir}/`))) throw new Error(`RELEASE_SOURCE_EMPTY_DIR ${dir}`);
}

const hash = createHash('sha256');
hash.update('backend-fingerprint\0', 'utf8');
hash.update(backendFingerprint, 'utf8');
hash.update('\0', 'utf8');
for (const record of records) {
  hash.update(record, 'utf8');
  hash.update('\0', 'utf8');
}
process.stdout.write(hash.digest('hex'));
