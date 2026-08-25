import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const backendFingerprint = execFileSync(process.execPath, ['tools/live-source-fingerprint.mjs'], {
  encoding: 'utf8'
}).trim();
if (!/^[a-f0-9]{64}$/.test(backendFingerprint)) {
  throw new Error('RELEASE_BACKEND_FINGERPRINT_INVALID');
}

const pathspecs = [
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
  'assets',
  'tools/release-source-fingerprint.mjs',
  'tools/account-live-e2e.mjs',
  'tools/browser-account-live.mjs',
  'tools/browser-gameplay-e2e-v4.mjs',
  'tools/gameplay-live-provenance.mjs',
  'tools/final-readiness.mjs',
  '.github/workflows/account-live-e2e.yml',
  '.github/workflows/browser-gameplay-e2e.yml',
  '.github/workflows/post-live-backend-orchestration.yml',
  '.github/workflows/final-readiness-orchestration.yml',
  '.github/workflows/final-readiness.yml'
];

const raw = execFileSync('git', ['ls-files', '-s', '-z', '--', ...pathspecs]);
const records = raw.toString('utf8').split('\0').filter(Boolean).sort();
if (!records.length) throw new Error('RELEASE_SOURCE_FINGERPRINT_EMPTY');

const hash = createHash('sha256');
hash.update('backend-fingerprint\0', 'utf8');
hash.update(backendFingerprint, 'utf8');
hash.update('\0', 'utf8');
for (const record of records) {
  hash.update(record, 'utf8');
  hash.update('\0', 'utf8');
}

process.stdout.write(hash.digest('hex'));
