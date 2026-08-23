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
assert.equal(result.dice.hope,8);
assert.equal(result.dice.doom,3);
assert.equal(result.modifier.total,6);
assert.equal(result.dc,15);
assert.equal(result.total,17);
assert.equal(result.success,true);
assert.equal(result.outcome,'success_hope');

assert.equal(hasClientResult({type:'jutsu',targetId:'x'}),false);
assert.equal(hasClientResult({type:'jutsu',damage:9999}),true);
assert.equal(hasClientResult({type:'jutsu',payload:{mechanicalResult:{success:true}}}),true);
console.log('PASS_TERION_SERVER_AUTHORITY_UNIT');
