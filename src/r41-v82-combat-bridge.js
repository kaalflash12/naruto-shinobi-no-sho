(() => {
  'use strict';

  const SAVE_KEY='narutoShinobiNoShoPcV4';
  const ACTIONS={
    'v82-basic-melee':{source:'v82_basic_melee',label:'Ataque corporal'},
    'v82-basic-ranged':{source:'v82_basic_ranged',label:'Ataque à distância'}
  };
  let installedApiBridge=false;
  const clone=v=>{try{return JSON.parse(JSON.stringify(v));}catch{return v;}};
  const readSave=()=>{try{return JSON.parse(localStorage.getItem(SAVE_KEY)||'null');}catch{return null;}};
  function writeSave(save){if(!save||typeof save!=='object')return false;try{save.updatedAt=Date.now();localStorage.setItem(SAVE_KEY,JSON.stringify(save));return true;}catch(e){console.error('[R41_V82_BRIDGE_SAVE]',e);return false;}}
  function readDomVitals(){
    const text=document.querySelector('.v82-turn-summary')?.innerText||'';
    const value=label=>{const m=text.match(new RegExp(`${label}\\s+(\\d+)\\s*\\/\\s*(\\d+)`,'i'));return m?{current:Number(m[1]),max:Number(m[2])}:null;};
    return {playerHp:value('PV'),playerChakra:value('Chakra'),enemyHp:value('Inimigo'),text};
  }
  function readCharacterVitals(save){const c=save?.character||{};return{playerHp:Number(c.hp??c.pv??0),playerChakra:Number(c.chakra||0),kurai:Number(c.kurai?.chakra||0)};}
  function makeResult(meta,beforeSave,afterSave,beforeDom,afterDom,beforeText,afterText){
    const bc=readCharacterVitals(beforeSave),ac=readCharacterVitals(afterSave);
    const enemyBefore=Number(beforeDom?.enemyHp?.current),enemyAfter=Number(afterDom?.enemyHp?.current);
    const hasEnemy=Number.isFinite(enemyBefore)&&Number.isFinite(enemyAfter);
    const damage=hasEnemy?Math.max(0,enemyBefore-enemyAfter):0;
    const playerDamage=Math.max(0,(Number(beforeDom?.playerHp?.current)||bc.playerHp)-(Number(afterDom?.playerHp?.current)||ac.playerHp));
    const spent=Math.max(0,bc.playerChakra-ac.playerChakra);
    const changed=String(beforeText||'')!==String(afterText||'')||damage>0||playerDamage>0||spent>0||bc.kurai!==ac.kurai;
    if(!changed)return null;
    const beforeLines=String(beforeText||'').split('\n');
    const afterLines=String(afterText||'').split('\n');
    const newLines=afterLines.filter(line=>line&&!beforeLines.includes(line)).join(' ').toLowerCase();
    const blocked=/fora do alcance|exige adjac|não pode|impedido|sem alvo/.test(newLines);
    return {actionType:'attack',source:meta.source,label:meta.label,confirmed:true,hit:damage>0,blocked,damage,playerDamageTaken:playerDamage,resourceSpent:spent,ko:hasEnemy&&enemyAfter<=0,enemyHpBefore:hasEnemy?enemyBefore:null,enemyHpAfter:hasEnemy?enemyAfter:null};
  }
  function makePresentation(result,action){
    const technique={id:action,name:result.label,type:'attack',class:'attack'};
    const events=window.SNSCombatPresentationEngine?.fromResult?.(result)||[];
    const validation=window.SNSCombatPresentationEngine?.validate?.(result,events)||{ok:true,errors:[]};
    const states=window.SNSVisualStateEngine?.fromCombatResult?.(result)||[];
    const animation=window.SNSAnimationRegistry?.infer?.(technique)||null;
    return{at:Date.now(),result:clone(result),events:clone(events),states:clone(states),animation:clone(animation),validation:clone(validation)};
  }
  function renderPresentation(p){
    document.querySelectorAll('.r41-combat-present').forEach(n=>n.remove());const r=p.result||{},n=document.createElement('div');
    n.className=`r41-combat-present ${r.blocked?'miss':Number(r.damage||0)>0?'hit':'miss'}`;
    const detail=r.blocked?'Ação impedida pelas regras do encontro':r.hit?`${r.damage} dano${r.playerDamageTaken?` • resposta: ${r.playerDamageTaken} dano recebido`:''}`:'Sem dano';
    n.innerHTML=`<b>${r.label}</b><small>${detail}</small>`;document.body.appendChild(n);setTimeout(()=>n.remove(),1100);
  }
  function persistPresentation(p){
    const save=readSave();if(!save)return;save.r41=save.r41&&typeof save.r41==='object'?save.r41:{};save.r41.lastCombatPresentation=clone(p);
    save.r41.autosave=save.r41.autosave&&typeof save.r41.autosave==='object'?save.r41.autosave:{localAt:0,cloudAt:0,lastError:'',pending:false};save.r41.autosave.localAt=Date.now();
    save.r41.narrative=save.r41.narrative&&typeof save.r41.narrative==='object'?save.r41.narrative:{freeActions:[],lastConfirmedFact:''};
    save.r41.narrative.lastConfirmedFact=p.result.blocked?`${p.result.label} tentado e impedido pelas regras confirmadas do encontro.`:`${p.result.label} confirmado: ${p.result.damage} de dano${p.result.playerDamageTaken?`; ${p.result.playerDamageTaken} recebido na resposta`:''}.`;
    writeSave(save);
  }
  function installPublicApiBridge(){
    if(installedApiBridge||!window.__NARUTO_R41__?.state)return;const api=window.__NARUTO_R41__,baseState=api.state.bind(api);api.state=()=>{const base=baseState()||{},persisted=readSave()?.r41||{},bp=base.lastCombatPresentation,pp=persisted.lastCombatPresentation;if(pp&&(!bp||Number(pp.at||0)>=Number(bp.at||0)))base.lastCombatPresentation=clone(pp);if(persisted.autosave)base.autosave={...(base.autosave||{}),...clone(persisted.autosave)};return base;};installedApiBridge=true;
  }
  async function finishAction(action,beforeSave,beforeDom,beforeText){
    await new Promise(r=>setTimeout(r,300));installPublicApiBridge();const afterSave=readSave(),afterDom=readDomVitals(),afterText=document.querySelector('#screen')?.innerText||'',meta=ACTIONS[action];
    const result=makeResult(meta,beforeSave,afterSave,beforeDom,afterDom,beforeText,afterText);if(!result)return;const p=makePresentation(result,action);
    try{window.SNSSavePointManager?.record?.('combat_result',{result:clone(result),validation:clone(p.validation),source:'v82_bridge'});}catch{}
    persistPresentation(p);try{document.dispatchEvent(new CustomEvent('sns:r41-combat-result',{detail:clone(p)}));}catch{}renderPresentation(p);if(p.validation?.ok===false)console.error('[R41_V82_COMBAT_GATE]',p.validation.errors,result);
  }
  document.addEventListener('click',event=>{const button=event.target?.closest?.('[data-action]'),action=button?.getAttribute?.('data-action')||'';if(!ACTIONS[action]||button.disabled)return;const beforeSave=readSave(),beforeDom=readDomVitals(),beforeText=document.querySelector('#screen')?.innerText||'';queueMicrotask(()=>finishAction(action,beforeSave,beforeDom,beforeText));},true);
  const boot=()=>installPublicApiBridge();if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();setTimeout(boot,0);
})();
