(() => {
  'use strict';

  const ACTIVE_KEY='sns-v841-active-account-slot';
  const TOKEN_KEY='sns-v841-auth-token';
  const LEGACY_KEY='narutoShinobiNoShoPcV4';
  const ACCOUNT_PREFIX='sns-v841-account-save:';
  const ONLINE_RECOVERY_KEY='sns-v841-online-room-recovery';
  let restoring=false;
  let reconciling=false;
  let reloadQueued=false;
  let manualCharactersUntil=0;
  let lastAttemptAt=0;

  const parse=raw=>{try{return raw?JSON.parse(raw):null}catch{return null}};
  const authenticated=()=>Boolean(sessionStorage.getItem(TOKEN_KEY)||localStorage.getItem(TOKEN_KEY)||window.r41Auth?.authenticated);
  const active=()=>String(localStorage.getItem(ACTIVE_KEY)||'').trim();
  const remember=id=>{id=String(id||'').trim();if(id)localStorage.setItem(ACTIVE_KEY,id);};
  const forget=id=>{const current=active();if(!id||String(id)===current)localStorage.removeItem(ACTIVE_KEY);};

  function activeAccountEntry(id=active()){
    if(!id)return null;
    for(let i=0;i<localStorage.length;i++){
      const key=localStorage.key(i)||'';
      if(!key.startsWith(ACCOUNT_PREFIX)||!key.endsWith(`:${id}`))continue;
      const save=parse(localStorage.getItem(key));
      if(save&&typeof save==='object')return {key,save};
    }
    return null;
  }

  function sameCharacter(a,b){
    if(!a?.character||!b?.character)return false;
    const ap=String(a.character.privateCharacter||''),bp=String(b.character.privateCharacter||'');
    if(ap||bp)return ap===bp;
    const an=String(a.character.name||a.character.nome||'').trim().toLowerCase();
    const bn=String(b.character.name||b.character.nome||'').trim().toLowerCase();
    return Boolean(an&&bn&&an===bn);
  }

  function reconcileOnlineRoomMirror(){
    if(reconciling||!authenticated())return false;
    const id=active(),entry=activeAccountEntry(id),legacy=parse(localStorage.getItem(LEGACY_KEY));
    if(!id||!entry||!legacy||!sameCharacter(entry.save,legacy))return false;
    const legacyRoom=String(legacy.online?.roomId||'').trim(),accountRoom=String(entry.save.online?.roomId||'').trim();
    if(!legacyRoom||accountRoom===legacyRoom)return false;
    const legacyUpdated=Number(legacy.updatedAt||legacy.r41?.autosave?.localAt||0),accountUpdated=Number(entry.save.updatedAt||entry.save.r41?.autosave?.localAt||0);
    if(accountRoom&&accountUpdated>legacyUpdated)return false;
    reconciling=true;
    try{
      const merged=structuredClone?structuredClone(legacy):JSON.parse(JSON.stringify(legacy));
      if(entry.save.account&&!merged.account)merged.account=entry.save.account;
      merged.updatedAt=Math.max(Date.now(),legacyUpdated,accountUpdated);
      localStorage.setItem(entry.key,JSON.stringify(merged));
      const marker=`${id}:${legacyRoom}`;
      if(sessionStorage.getItem(ONLINE_RECOVERY_KEY)!==marker&&!reloadQueued){
        sessionStorage.setItem(ONLINE_RECOVERY_KEY,marker);
        reloadQueued=true;
        setTimeout(()=>location.reload(),25);
      }
      return true;
    }catch(e){console.error('[R41_ACCOUNT_ROOM_REPAIR]',e);return false;}
    finally{reconciling=false;}
  }

  function clearSatisfiedRecovery(){
    const id=active(),entry=activeAccountEntry(id),legacy=parse(localStorage.getItem(LEGACY_KEY));
    const ar=String(entry?.save?.online?.roomId||''),lr=String(legacy?.online?.roomId||'');
    if(ar&&ar===lr){sessionStorage.removeItem(ONLINE_RECOVERY_KEY);reloadQueued=false;}
  }

  function slotControl(id){
    if(!id)return null;
    const safe=globalThis.CSS?.escape?CSS.escape(id):id.replace(/["\\]/g,'\\$&');
    return document.querySelector(`[data-action="account-load"][data-id="${safe}"]`)
      ||document.querySelector(`[data-action="load-account-slot"][data-id="${safe}"]`)
      ||document.querySelector(`[data-action="account-load"][data-slot="${safe}"]`);
  }

  function accountChooserVisible(){
    const nav=document.getElementById('main-nav'),screen=document.getElementById('screen');
    if(!nav||!screen)return false;
    return !nav.querySelector('[data-screen="online"]')
      && Boolean(screen.querySelector('[data-action="account-load"],[data-action="load-account-slot"]'));
  }

  async function recoverActiveSlot(){
    if(restoring||Date.now()<manualCharactersUntil||!authenticated()||!accountChooserVisible())return false;
    const id=active();if(!id)return false;
    const control=slotControl(id);if(!control)return false;
    const now=Date.now();if(now-lastAttemptAt<750)return false;lastAttemptAt=now;
    restoring=true;
    try{
      control.click();
      const deadline=Date.now()+8000;
      while(Date.now()<deadline){
        if(document.querySelector('#main-nav [data-screen="online"]')&&document.querySelector('#screen')){clearSatisfiedRecovery();return true;}
        await new Promise(r=>setTimeout(r,100));
      }
      return false;
    }finally{restoring=false;}
  }

  function repairAndRecover(){
    if(reconcileOnlineRoomMirror())return;
    clearSatisfiedRecovery();
    recoverActiveSlot();
  }

  document.addEventListener('click',event=>{
    const target=event.target?.closest?.('[data-action],[data-screen]');if(!target)return;
    const action=String(target.getAttribute('data-action')||'');
    const screen=String(target.getAttribute('data-screen')||'');
    const id=String(target.getAttribute('data-id')||target.getAttribute('data-slot')||'').trim();
    if(action==='account-load'||action==='load-account-slot'){remember(id);return;}
    if(action==='account-delete'){forget(id);return;}
    if(action==='account-logout'){localStorage.removeItem(ACTIVE_KEY);sessionStorage.removeItem(ONLINE_RECOVERY_KEY);return;}
    if(screen==='personagens'){manualCharactersUntil=Date.now()+10000;}
  },true);

  window.addEventListener('sns:account-changed',event=>{if(!event.detail){localStorage.removeItem(ACTIVE_KEY);sessionStorage.removeItem(ONLINE_RECOVERY_KEY);}});

  const observer=new MutationObserver(()=>{queueMicrotask(repairAndRecover);});
  const start=()=>{
    const root=document.getElementById('app')||document.body;
    observer.observe(root,{subtree:true,childList:true});
    repairAndRecover();
    setTimeout(repairAndRecover,250);
    setTimeout(repairAndRecover,1000);
    setTimeout(repairAndRecover,2500);
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();

  window.__SNS_ACTIVE_ACCOUNT_SLOT__={get:active,remember,forget,recover:recoverActiveSlot,reconcile:reconcileOnlineRoomMirror};
})();
