import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const markerPath='PUBLIC-RELEASE-FINGERPRINT.txt';
if(!fs.existsSync(markerPath))throw new Error('PUBLIC_RELEASE_FINGERPRINT_MARKER_MISSING');
const expected=execFileSync(process.execPath,['tools/release-source-fingerprint.mjs'],{encoding:'utf8'}).trim();
const actual=fs.readFileSync(markerPath,'utf8').trim();
if(!/^[a-f0-9]{64}$/.test(expected))throw new Error('PUBLIC_RELEASE_FINGERPRINT_EXPECTED_INVALID');
if(actual!==expected)throw new Error(`PUBLIC_RELEASE_FINGERPRINT_STALE expected=${expected} actual=${actual||'EMPTY'}`);
console.log(`PASS_PUBLIC_RELEASE_FINGERPRINT ${expected}`);
