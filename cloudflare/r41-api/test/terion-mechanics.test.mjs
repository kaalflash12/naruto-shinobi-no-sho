import assert from 'node:assert/strict';
import { canonicalAttribute, characterModifier, classifyTerionRoll, resolveTerionIntent, hasClientResult } from '../src/terion-mechanics.js';

assert.equal(canonicalAttribute('', 'attack'), 'tecnica');
assert.equal(canonicalAttribute('corpo', 'attack'), 'corpo');
assert.deepEqual(characterModifier({nivel:8,atributos:{tecnica:4}},'tecnica'),{base:4,level:8,levelBonus:2,total:6});
assert.deepEqual(classifyTerionRoll(1,1,5,12),{outcome:'disaster',success:false,total:7});
assert.deepEqual(classifyTerionRoll(10,10,0,12),{outcome:'critical',success:true,total:20});
assert.equal(classifyTerionRoll(8,3,2,12).outcome,'success_hope');
assert.equal(classifyTerionRoll(3,8,2,12).outcome,'success_doom');
assert.equal(classifyTerionRoll(2,3,0,12).outcome,'failure');

const rolls=[0.75,0.25];let i=0;
const result=resolveTerionIntent({intent:{type:'jutsu',difficulty:'hard'},character:{level:8,attributes:{tecnica:4}},random:()=>rolls[i++]});
assert.equal(result.authority,'server');
assert.equal(result.system,'TERION_2D10');
assert.equal(result.version,'server-authoritative-v2');
assert.equal(result.dice.hope,8);
assert.equal(result.dice.doom,3);
assert.equal(result.modifier.total,6);
assert.equal(result.dc,15);
assert.equal(result.total,17);
assert.equal(result.success,true);
assert.equal(result.outcome,'success_hope');

const allowed=[
  {type:'jutsu',targetId:'x'},
  {type:'intent',text:'Eu observo a entrada e procuro pistas.',scene:'m1',screen:'mission'},
  {type:'move',targetId:'tile-4',description:'avanço até a cobertura'}
];
for(const payload of allowed)assert.equal(hasClientResult(payload),false,`intent legítima bloqueada: ${JSON.stringify(payload)}`);

const forged=[
  {type:'jutsu',damage:9999},
  {type:'jutsu',payload:{mechanicalResult:{success:true}}},
  {type:'intent',payload:{hp:999,pv:999,chakra:999}},
  {type:'intent',payload:{nivel:99,atributos:{tecnica:10}}},
  {type:'intent',payload:{inventario:{item:'x'}}},
  {type:'intent',payload:{equipamento:{arma:'x'}}},
  {type:'intent',payload:{condição:'veneno removido'}},
  {type:'intent',payload:{recompensa:{xp:10000}}},
  {type:'intent',payload:{modificador:99,CD:1}},
  {type:'intent',payload:{nested:{nested:{resultado:'sucesso'}}}}
];
for(const payload of forged)assert.equal(hasClientResult(payload),true,`estado mecânico forjado não bloqueado: ${JSON.stringify(payload)}`);

console.log('PASS_TERION_SERVER_AUTHORITY_UNIT');
