(() => {
  'use strict';

  const ACTIVE_KEY='sns-v841-active-account-slot';
  const LEGACY_KEY='narutoShinobiNoShoPcV4';
  const ACCOUNT_PREFIX='sns-v841-account-save:';
  const RETURN_SCREEN_KEY='sns-v841-return-screen';
  const RELOAD_MARKER='sns-r41-online-bridge-reload';
  const BOOT_AT=Date.now();
  let reloadQueued=false;
  let lastRoom='';

  const parse=raw=>{try{return raw?JSON.parse(raw):null}catch{return null}};

  function activeEntry(){
    const id=String(localStorage.getItem(ACTIVE_KEY)||'').trim();
    if(!id)return {id:'',save:null};
    for(let i=0;i<localStorage.length;i++){
      const key=localStorage.key(i)||'';
      if(!key.startsWith(ACCOUNT_PREFIX)||!key.endsWith(`:${id}`))continue;
      const save=parse(localStorage.getItem(key));
      if(save&&typeof save==='object')return {id,save};
    }
    return {id,save:null};
  }

  function roomContext(){
    const entry=activeEntry();
    const legacy=parse(localStorage.getItem(LEGACY_KEY));
    const accountRoom=String(entry.save?.online?.roomId||'').trim();
    const legacyRoom=String(legacy?.online?.roomId||'').trim();
    return {id:entry.id,roomId:accountRoom||legacyRoom,accountRoom,legacyRoom};
  }

  function bridge(){
    try{
      const online=window.__NARUTO_R41__?.state?.()?.online||{};
      return {ready:online.ready===true,roomId:String(online.roomId||'').trim(),actionCursor:Number(online.actionCursor||0)};
    }catch{return {ready:false,roomId:'',actionCursor:0}}
  }

  function marker(ctx){return `${ctx.id||'legacy'}:${ctx.roomId}`;}

  function clearSatisfied(ctx,b){
    if(!ctx.roomId)return false;
    if(b.ready&&(b.roomId===ctx.roomId||!b.roomId)){
      sessionStorage.removeItem(RELOAD_MARKER);
      reloadQueued=false;
      return true;
    }
    return false;
  }

  function requestOneRecovery(ctx){
    if(reloadQueued||!ctx.roomId)return false;
    const key=marker(ctx);
    if(sessionStorage.getItem(RELOAD_MARKER)===key)return false;
    sessionStorage.setItem(RELOAD_MARKER,key);
    sessionStorage.setItem(RETURN_SCREEN_KEY,'online');
    reloadQueued=true;
    window.dispatchEvent(new CustomEvent('sns:online-bridge-recovery',{detail:{roomId:ctx.roomId,slotId:ctx.id||null,reason:'persisted_room_bridge_not_ready'}}));
    setTimeout(()=>location.reload(),25);
    return true;
  }

  function tick(){
    const ctx=roomContext(),b=bridge();
    if(!ctx.roomId){
      sessionStorage.removeItem(RELOAD_MARKER);
      lastRoom='';
      return;
    }
    if(clearSatisfied(ctx,b)){lastRoom=ctx.roomId;return;}
    if(Date.now()-BOOT_AT<1800)return;
    if(lastRoom!==ctx.roomId)lastRoom=ctx.roomId;
    requestOneRecovery(ctx);
  }

  const start=()=>{
    tick();
    setInterval(tick,250);
    window.addEventListener('sns:account-changed',()=>setTimeout(tick,50));
    window.addEventListener('storage',e=>{if(e.key===ACTIVE_KEY||e.key===LEGACY_KEY||String(e.key||'').startsWith(ACCOUNT_PREFIX))setTimeout(tick,25);});
    const observer=new MutationObserver(()=>setTimeout(tick,0));
    observer.observe(document.documentElement,{subtree:true,childList:true});
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();

  window.__SNS_ONLINE_BRIDGE_RECOVERY__={
    state:()=>({context:roomContext(),bridge:bridge(),reloadMarker:sessionStorage.getItem(RELOAD_MARKER)||'',reloadQueued}),
    check:tick
  };
})();
