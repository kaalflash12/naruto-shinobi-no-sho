import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const backendFingerprint = execFileSync(process.execPath, ['tools/live-source-fingerprint.mjs'], { encoding: 'utf8' }).trim();
if (!/^[a-f0-9]{64}$/.test(backendFingerprint)) throw new Error('RELEASE_BACKEND_FINGERPRINT_INVALID');

const html = fs.readFileSync('index.html', 'utf8');
const publicRefs = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)]
  .map(m => m[1].split('?')[0].replace(/^\.\//, ''))
  .filter(v => v && !/^(?:https?:|data:|\/\/)/i.test(v));
const evidenceSources = [
  'tools/release-source-fingerprint.mjs',
  'tools/public-release-coherence.mjs',
  'tools/account-live-e2e.mjs',
  'tools/browser-account-live.mjs',
  'tools/browser-gameplay-e2e-v4.mjs',
  'tools/gameplay-live-provenance.mjs',
  'tools/final-readiness-orchestration-gate.mjs',
  'tools/final-readiness.mjs',
  '.github/workflows/account-live-e2e.yml',
  '.github/workflows/browser-gameplay-e2e.yml',
  '.github/workflows/post-live-backend-orchestration.yml',
  '.github/workflows/final-readiness-orchestration.yml',
  '.github/workflows/final-readiness.yml'
];
const pathspecs = [...new Set(['index.html', ...publicRefs, ...evidenceSources])];
const raw = execFileSync('git', ['ls-files', '-s', '-z', '--', ...pathspecs]);
const records = raw.toString('utf8').split('\0').filter(Boolean).sort();
if (!records.length) throw new Error('RELEASE_SOURCE_FINGERPRINT_EMPTY');

const trackedPaths = new Set(records.map(record => record.slice(record.indexOf('\t') + 1)));
const missing = pathspecs.filter(file => !trackedPaths.has(file));
if (missing.length) throw new Error(`RELEASE_SOURCE_UNTRACKED ${missing.join(',')}`);

const hash = createHash('sha256');
hash.update('backend-fingerprint\0', 'utf8');
hash.update(backendFingerprint, 'utf8');
hash.update('\0', 'utf8');
for (const record of records) {
  hash.update(record, 'utf8');
  hash.update('\0', 'utf8');
}
process.stdout.write(hash.digest('hex'));
