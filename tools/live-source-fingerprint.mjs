import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const pathspecs = [
  'cloudflare/r41-api',
  'tools/live-worker-e2e.mjs',
  'tools/browser-live-api.mjs',
  'tools/live-source-fingerprint.mjs',
  'r41-github-api.js',
  '.github/workflows/live-backend-e2e.yml'
];

const raw = execFileSync('git', ['ls-files', '-z', '--', ...pathspecs]);
const files = raw.toString('utf8').split('\0').filter(Boolean).sort();
if (!files.length) throw new Error('LIVE_SOURCE_FINGERPRINT_EMPTY');

const hash = createHash('sha256');
for (const file of files) {
  if (!fs.existsSync(file)) throw new Error(`LIVE_SOURCE_FILE_MISSING ${file}`);
  hash.update(file, 'utf8');
  hash.update('\0');
  hash.update(fs.readFileSync(file));
  hash.update('\0');
}

process.stdout.write(hash.digest('hex'));
