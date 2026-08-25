import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root=process.cwd();
const repairPath=path.join(root,'src/r41-asset-path-repair.js');
const source=fs.readFileSync(repairPath,'utf8');

class MockElement {}
class MockImageElement extends MockElement {}
globalThis.window={};
globalThis.Element=MockElement;
globalThis.HTMLImageElement=MockImageElement;

vm.runInThisContext(source,{filename:repairPath});
const repair=globalThis.window.__SNS_R41_ASSET_REPAIR__;
if(!repair||typeof repair.rewrite!=='function')throw new Error('ASSET_REPAIR_EXPORT_MISSING');

const expected=new Map([
  [1,'assets/events_v74/kakashi.svg'],
  [2,'assets/events_v74/iruka.svg'],
  [3,'assets/events_v74/gai.svg'],
  [4,'assets/events_v74/festival.svg'],
  [5,'assets/events_v74/inverno.svg'],
  [6,'assets/events_v74/mensageiro.svg'],
  [7,'assets/events_v74/ferreiro.svg'],
  [8,'assets/events_v74/pergaminho.svg'],
  [9,'assets/private/kurai.svg'],
  [12,'assets/ui_v8/events/cards/event_12.svg']
]);

for(const [id,target] of expected){
  const sourcePath=`assets/ui_v8/events/cards/event_${String(id).padStart(2,'0')}.jpg`;
  const actual=repair.rewrite(sourcePath);
  if(actual!==target)throw new Error(`EVENT_ASSET_REWRITE_${id}: ${actual} != ${target}`);
  const abs=path.join(root,...target.split('/'));
  if(!fs.existsSync(abs)||!fs.statSync(abs).isFile()||fs.statSync(abs).size<=0){
    throw new Error(`EVENT_ASSET_TARGET_MISSING_${id}: ${target}`);
  }
}

for(const id of [1,2,3,4,9,10,11,12]){
  const sourcePath=`assets/ui_v8/combat/actions/action_${String(id).padStart(2,'0')}.jpg`;
  const target=`assets/ui_v8/combat/actions/action_${String(id).padStart(2,'0')}.svg`;
  const actual=repair.rewrite(sourcePath);
  if(actual!==target)throw new Error(`ACTION_ASSET_REWRITE_${id}: ${actual} != ${target}`);
  const abs=path.join(root,...target.split('/'));
  if(!fs.existsSync(abs)||fs.statSync(abs).size<=0)throw new Error(`ACTION_ASSET_TARGET_MISSING_${id}: ${target}`);
}

console.log('PASS_ASSET_PATH_REPAIR',repair.build,`${expected.size} event mappings`);
