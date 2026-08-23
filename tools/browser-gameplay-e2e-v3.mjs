import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// V3: mantém as adaptações canônicas do V2 e remove a suposição frágil
// de que o botão de carregar slot precisa ter data-action="account-load".
const sourcePath = path.resolve('tools/browser-gameplay-e2e-v2.mjs');
let source = fs.readFileSync(sourcePath, 'utf8');

async function seedNormalV3(page){
  const fixture=normalFixture();

  const saved=await page.evaluate(async ({slot,fixture})=>{
    const r=await fetch('/api/account/save',{
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({slotId:slot,save:fixture,gameVersion:'R41-GAMEPLAY-E2E'})
    });
    const data=await r.json().catch(()=>({}));
    return {status:r.status,data};
  },{slot:SLOT_ID,fixture});

  assert(
    saved.status===200 && saved.data?.saved===true,
    `fixture cloud save falhou: ${saved.status} ${JSON.stringify(saved.data)}`
  );
  pass('cloudFixtureSaved');

  // Confirma pelo backend que o slot existe antes de testar a UI.
  const slots=await page.evaluate(async ()=>{
    const r=await fetch('/api/account/slots',{method:'GET'});
    const data=await r.json().catch(()=>({}));
    return {status:r.status,data};
  });
  assert(
    slots.status===200 &&
    Array.isArray(slots.data?.slots) &&
    slots.data.slots.some(s=>String(s.slotId||s.slot_id||s.id||'')===SLOT_ID),
    `slot salvo nao apareceu em /api/account/slots: ${slots.status} ${JSON.stringify(slots.data)}`
  );
  pass('cloudFixtureListed');

  await page.reload({waitUntil:'domcontentloaded',timeout:90000});
  await page.waitForFunction(()=>!!window.__NARUTO_R41__?.version,{timeout:30000});

  // A UI canônica pode mudar o nome interno da ação, mas o slotId é contrato estável.
  // Procuramos qualquer controle realmente associado ao slot.
  await page.waitForFunction(slot=>{
    return [...document.querySelectorAll('[data-id],[data-slot-id],[data-slot]')].some(el=>
      [el.getAttribute('data-id'),el.getAttribute('data-slot-id'),el.getAttribute('data-slot')]
        .some(v=>String(v||'')===String(slot))
    );
  },SLOT_ID,{timeout:30000}).catch(()=>{});

  const candidates=[
    `[data-id="${SLOT_ID}"]`,
    `[data-slot-id="${SLOT_ID}"]`,
    `[data-slot="${SLOT_ID}"]`
  ];

  let slotButton=null;
  for(const selector of candidates){
    const list=page.locator(selector);
    const n=await list.count();
    for(let i=0;i<n;i++){
      const el=list.nth(i);
      const tag=await el.evaluate(node=>node.tagName.toLowerCase()).catch(()=>'');
      const role=await el.getAttribute('role').catch(()=>null);
      if(tag==='button'||tag==='a'||role==='button'){
        slotButton=el;
        break;
      }
      const inner=el.locator('button,a,[role="button"]').first();
      if(await inner.count()){
        slotButton=inner;
        break;
      }
    }
    if(slotButton)break;
  }

  if(!slotButton){
    const diag=await page.evaluate(slot=>({
      slot,
      title:document.title,
      r41:window.__NARUTO_R41__?.version||'',
      auth:!!window.r41Auth?.authenticated,
      mainNav:(document.querySelector('#main-nav')?.innerText||'').slice(0,1600),
      screen:(document.querySelector('#screen')?.innerText||'').slice(0,6000),
      controls:[...document.querySelectorAll('button,a,[role="button"]')].slice(0,250).map(el=>({
        tag:el.tagName,
        action:el.getAttribute('data-action'),
        id:el.getAttribute('data-id'),
        slotId:el.getAttribute('data-slot-id'),
        slot:el.getAttribute('data-slot'),
        text:(el.textContent||'').trim().slice(0,180)
      }))
    }),SLOT_ID);
    throw new Error(`ACCOUNT_SLOT_NOT_RENDERED ${SLOT_ID}: ${JSON.stringify(diag)}`);
  }

  await slotButton.evaluate(el=>el.click());

  await page.waitForFunction(()=>{
    const nav=document.querySelector('#main-nav');
    return !!nav?.querySelector('[data-screen="personagem"]') &&
      !!document.querySelector('#screen');
  },{timeout:30000});

  await page.waitForTimeout(900);
  const s=await readSave(page);
  assert(
    s?.character?.name==='Gameplay E2E',
    `fixture da conta nao carregou no runtime local: ${JSON.stringify({
      character:s?.character?.name||null,
      active:localStorage.getItem('narutoShinobiNoShoPcV5Active')
    })}`
  );
  pass('cloudFixtureLoadedIntoRuntime');
  return s;
}

const seedBlock=/async function seedNormalV2\(page\)\{[\s\S]*?\n\}\n\nasync function navigateV2/;
if(!seedBlock.test(source)){
  throw new Error('GAMEPLAY_E2E_V3_SEED_BLOCK_MISSING');
}
source=source.replace(
  seedBlock,
  seedNormalV3.toString().replace('seedNormalV3','seedNormalV2')+'\n\nasync function navigateV2'
);

const tmpDir=path.resolve('.tmp-gameplay-e2e-v3');
fs.mkdirSync(tmpDir,{recursive:true});
const tmpFile=path.join(tmpDir,`browser-gameplay-e2e-v3-${Date.now()}.mjs`);
fs.writeFileSync(tmpFile,source,'utf8');

try{
  await import(pathToFileURL(tmpFile).href);
}finally{
  try{fs.rmSync(tmpDir,{recursive:true,force:true});}catch{}
}
