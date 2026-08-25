import { spawnSync } from 'node:child_process';

const attempts=Math.max(1,Number(process.env.PUBLIC_RELEASE_MAX_ATTEMPTS||120));
const delayMs=Math.max(250,Number(process.env.PUBLIC_RELEASE_DELAY_MS||5000));
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
let last='';
for(let attempt=1;attempt<=attempts;attempt++){
  const run=spawnSync(process.execPath,['tools/public-release-coherence.mjs'],{
    encoding:'utf8',
    env:{...process.env,PUBLIC_RELEASE_REPORT:process.env.PUBLIC_RELEASE_REPORT||'audit/PUBLIC-RELEASE-COHERENCE.json'}
  });
  last=`${run.stdout||''}${run.stderr||''}`.trim();
  if(run.status===0){
    console.log(`PASS_PUBLIC_RELEASE_COHERENCE_WAIT attempt=${attempt}`);
    if(last)console.log(last);
    process.exit(0);
  }
  if(attempt<attempts)await sleep(delayMs);
}
console.error(`PUBLIC_RELEASE_COHERENCE_TIMEOUT attempts=${attempts}`);
if(last)console.error(last);
process.exit(1);
