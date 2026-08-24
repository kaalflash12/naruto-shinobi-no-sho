(() => {
  'use strict';

  const SAVE_KEY='narutoShinobiNoShoPcV4';
  const ACTIVE_SLOT_KEY='narutoShinobiNoShoPcV5Active';
  const SLOT_PREFIX='narutoShinobiNoShoPcV5:';
  const STATE_BRIDGE_MARK='__snsV82CombatBridgeState';
  const ACTIONS={
    'v82-basic-melee':{source:'v82_basic_melee',label:'Ataque corporal'},
    'v82-basic-ranged':{source:'v82_basic_ranged',label:'Ataque à distância'}
  };
  const BLOCKED_RE=/fora do alcance|mova-se primeiro|exige adjac|não pode|impedido|sem alvo|movimento permitido|terreno custa movimento/i;
  const clone=v=>{try{return JSON.parse(JSON.stringify(v));}catch{return v;}};
  function activeSlotKey(){const id=localStorage.getItem(ACTIVE_SLOT_KEY)||'';return id?`${SLOT_PREFIX}${id}`:'';}
  function parseSave(raw){try{return raw?JSON.parse(raw):null;}catch{return null;}}
  function readRuntimeSave(){
    const runtime=parseSave(localStorage.getItem(SAVE_KEY));
    if(runtime)return runtime;
    const slot=activeSlotKey();
    return slot?parseSave(localStorage.getItem(slot)):null;
  }
  function readPersistedSave(){
    const slot=activeSlotKey();
    const persisted=slot?parseSave(localStorage.getItem(slot)):null;
    return persisted||readRuntimeSave();
  }
  function writeSave(save){
    if(!save||typeof save!=='object')return false;
    try{
      save.updatedAt=Date.now();
      const json=JSON.stringify(save),slot=activeSlotKey();
      localStorage.setItem(SAVE_KEY,json);
      if(slot)localStorage.setItem(slot,json);
      return true;
    }catch(e){console.error('[R41_V82_BRIDGE_SAVE]',e);return false;}
  }
  function readDomVitals(){
    const text=document.querySelector('.v82-turn-summary')?.innerText||'';
    const value=label=>{const m=text.match(new RegExp(`${label}\\s+(\\d+)\\s*\\/\\s*(\\d+)`,'i'));return m?{current:Number(m[1]),max:Number(m[2])}:null;};
    return {playerHp:value('PV'),playerChakra:value('Chakra'),enemyHp:value('Inimigo'),text};
  }
  function readFeedback(){
    return [...document.querySelectorAll('#toast-root,.toast-root,[role="alert"]')]
      .map(n=>String(n.innerText||n.textContent||'').trim())
      .filter(Boolean)
      .join('\n');
  }
  function readCharacterVitals(save){
    const c=save?.character||{};
    return{playerHp:Number(c.hp??c.pv??0),playerChakra:Number(c.chakra||0),kurai:Number(c.kurai?.chakra||0)};
  }
  function makeResult(meta,beforeSave,afterSave,beforeDom,afterDom,beforeText,afterText,beforeFeedback,afterFeedback){
    const bc=readCharacterVitals(beforeSave),ac=readCharacterVitals(afterSave);
    const enemyBefore=Number(beforeDom?.enemyHp?.current),enemyAfter=Number(afterDom?.enemyHp?.current);
    const hasEnemy=Number.isFinite(enemyBefore)&&Number.isFinite(enemyAfter);
    const damage=hasEnemy?Math.max(0,enemyBefore-enemyAfter):0;
    const beforeHp=Number(beforeDom?.playerHp?.current),afterHp=Number(afterDom?.playerHp?.current);
    const playerDamage=Number.isFinite(beforeHp)&&Number.isFinite(afterHp)?Math.max(0,beforeHp-afterHp):Math.max(0,bc.playerHp-ac.playerHp);
    const beforeCh=Number(beforeDom?.playerChakra?.current),afterCh=Number(afterDom?.playerChakra?.current);
    const spent=Number.isFinite(beforeCh)&&Number.isFinite(afterCh)?Math.max(0,beforeCh-afterCh):Math.max(0,bc.playerChakra-ac.playerChakra);
    const beforeLines=String(beforeText||'').split('\n');
    const afterLines=String(afterText||'').split('\n');
    const newScreenLines=afterLines.filter(line=>line&&!beforeLines.includes(line)).join(' ');
    const feedbackChanged=String(beforeFeedback||'')!==String(afterFeedback||'');
    const ruleText=`${newScreenLines} ${feedbackChanged?afterFeedback:''}`.trim();
    const blocked=BLOCKED_RE.test(ruleText);
    const changed=String(beforeText||'')!==String(afterText||'')||feedbackChanged||damage>0||playerDamage>0||spent>0||bc.kurai!==ac.kurai;
    if(!changed&&!blocked)return null;
    return {
      actionType:'attack',source:meta.source,label:meta.label,confirmed:true,
      hit:damage>0,blocked,damage,playerDamageTaken:playerDamage,resourceSpent:spent,
      ko:hasEnemy&&enemyAfter<=0,enemyHpBefore:hasEnemy?enemyBefore:null,enemyHpAfter:hasEnemy?enemyAfter:null,
      reason:blocked?ruleText.slice(0,240):''
    };
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
    document.querySelectorAll('.r41-combat-present').forEach(n=>n.remove());
    const r=p.result||{},n=document.createElement('div');
    n.className=`r41-combat-present ${r.blocked?'miss':Number(r.damage||0)>0?'hit':'miss'}`;
    const detail=r.blocked?(r.reason||'Ação impedida pelas regras do encontro'):r.hit?`${r.damage} dano${r.playerDamageTaken?` • resposta: ${r.playerDamageTaken} dano recebido`:''}`:'Sem dano';
    n.innerHTML=`<b>${r.label}</b><small>${detail}</small>`;
    document.body.appendChild(n);
    setTimeout(()=>n.remove(),1100);
  }
  function persistPresentation(p,afterDom){
    const save=readRuntimeSave()||readPersistedSave();
    if(!save)return false;
    save.r41=save.r41&&typeof save.r41==='object'?save.r41:{};
    save.r41.lastCombatPresentation=clone(p);
    save.r41.autosave=save.r41.autosave&&typeof save.r41.autosave==='object'?save.r41.autosave:{localAt:0,cloudAt:0,lastError:'',pending:false};
    save.r41.autosave.localAt=Date.now();
    save.r41.narrative=save.r41.narrative&&typeof save.r41.narrative==='object'?save.r41.narrative:{freeActions:[],lastConfirmedFact:''};
    save.r41.narrative.lastConfirmedFact=p.result.blocked?`${p.result.label} tentado e impedido pelas regras confirmadas do encontro${p.result.reason?`: ${p.result.reason}`:''}.`:`${p.result.label} confirmado: ${p.result.damage} de dano${p.result.playerDamageTaken?`; ${p.result.playerDamageTaken} recebido na resposta`:''}.`;
    if(save.character&&afterDom?.playerHp){save.character.hp=afterDom.playerHp.current;save.character.maxHp=afterDom.playerHp.max;}
    if(save.character&&afterDom?.playerChakra){save.character.chakra=afterDom.playerChakra.current;save.character.maxChakra=afterDom.playerChakra.max;}
    return writeSave(save);
  }
  function installPublicApiBridge(){
    const api=window.__NARUTO_R41__;
    if(!api||typeof api.state!=='function')return false;
    const current=api.state;
    if(current?.[STATE_BRIDGE_MARK])return true;
    const baseState=current.bind(api);
    const wrapped=()=>{
      const base=baseState()||{},persisted=readPersistedSave()?.r41||{},bp=base.lastCombatPresentation,pp=persisted.lastCombatPresentation;
      if(pp&&(!bp||Number(pp.at||0)>=Number(bp.at||0)))base.lastCombatPresentation=clone(pp);
      if(persisted.autosave)base.autosave={...(base.autosave||{}),...clone(persisted.autosave)};
      return base;
    };
    try{Object.defineProperty(wrapped,STATE_BRIDGE_MARK,{value:true,configurable:false});}catch{wrapped[STATE_BRIDGE_MARK]=true;}
    api.state=wrapped;
    return true;
  }
  async function finishAction(action,beforeSave,beforeDom,beforeText,beforeFeedback){
    await new Promise(r=>setTimeout(r,350));
    installPublicApiBridge();
    const afterSave=readRuntimeSave()||readPersistedSave(),afterDom=readDomVitals(),afterText=document.querySelector('#screen')?.innerText||'',afterFeedback=readFeedback(),meta=ACTIONS[action];
    const result=makeResult(meta,beforeSave,afterSave,beforeDom,afterDom,beforeText,afterText,beforeFeedback,afterFeedback);
    if(!result)return;
    const p=makePresentation(result,action);
    try{window.SNSSavePointManager?.record?.('combat_result',{result:clone(result),validation:clone(p.validation),source:'v82_bridge'});}catch{}
    persistPresentation(p,afterDom);
    installPublicApiBridge();
    try{document.dispatchEvent(new CustomEvent('sns:r41-combat-result',{detail:clone(p)}));}catch{}
    renderPresentation(p);
    if(p.validation?.ok===false)console.error('[R41_V82_COMBAT_GATE]',p.validation.errors,result);
  }
  document.addEventListener('click',event=>{
    const button=event.target?.closest?.('[data-action]'),action=button?.getAttribute?.('data-action')||'';
    if(!ACTIONS[action]||button.disabled)return;
    installPublicApiBridge();
    const beforeSave=readRuntimeSave()||readPersistedSave(),beforeDom=readDomVitals(),beforeText=document.querySelector('#screen')?.innerText||'',beforeFeedback=readFeedback();
    queueMicrotask(()=>finishAction(action,beforeSave,beforeDom,beforeText,beforeFeedback));
  },true);
  const boot=()=>installPublicApiBridge();
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
  setTimeout(boot,0);
  setTimeout(boot,500);
  setTimeout(boot,1500);
})();
