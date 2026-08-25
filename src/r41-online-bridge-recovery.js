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
  let recovering=false;
  let lastRecoveryAt=0;

  const parse=raw=>{try{return raw?JSON.parse(raw):null}catch{return null}};

  function runtimeOnline(){
    try{return window.__NARUTO_R41__?.state?.()?.online||null}catch{return null}
  }

  function runtimeRoomId(online=runtimeOnline()){
    return String(online?.roomId||online?.room?.roomId||online?.state?.roomId||'').trim();
  }

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
    const runtimeRoom=runtimeRoomId();
    return {id:entry.id,roomId:accountRoom||legacyRoom||runtimeRoom,accountRoom,legacyRoom,runtimeRoom};
  }

  function bridge(){
    const online=runtimeOnline()||{};
    return {ready:online.ready===true,roomId:runtimeRoomId(online),actionCursor:Number(online.actionCursor||0)};
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

  async function recoverBridge(ctx=roomContext()){
    if(recovering||!ctx.roomId||typeof window.fetch!=='function')return false;
    const now=Date.now();
    if(now-lastRecoveryAt<150)return false;
    lastRecoveryAt=now;
    recovering=true;
    try{
      const response=await window.fetch('/api/online/room',{
        method:'POST',
        headers:{'content-type':'application/json','accept':'application/json'},
        body:JSON.stringify({roomId:ctx.roomId})
      });
      const data=await response?.json?.().catch(()=>null);
      const room=data?.room;
      const responseRoomId=String(room?.roomId||room?.id||'').trim();
      if(!response?.ok||data?.ok===false||!room||!responseRoomId||responseRoomId!==ctx.roomId)return false;

      const online=runtimeOnline();
      if(!online)return false;
      online.room=room;
      online.state=room;
      if(!online.roomId)online.roomId=ctx.roomId;
      if(Array.isArray(room.messages))online.actionLog=room.messages.slice(-50).map(payload=>({kind:'message',payload}));
      if(Array.isArray(data.leaderboard))online.leaderboard=data.leaderboard;
      online.error=null;

      // A presença `data.online` é transitória e não define se a bridge está utilizável.
      // Estado válido retornado pela rota canônica /api/online/room é suficiente para liberar a bridge.
      online.ready=true;
      sessionStorage.removeItem(RELOAD_MARKER);
      reloadQueued=false;
      lastRoom=ctx.roomId;
      document.dispatchEvent(new CustomEvent('r41:online:state',{detail:{roomId:ctx.roomId,source:'recovery'}}));
      window.dispatchEvent(new CustomEvent('sns:online-bridge-recovered',{detail:{roomId:ctx.roomId,online:data?.online===true}}));
      return true;
    }catch(error){
      const online=runtimeOnline();
      if(online)online.error=String(error?.message||error||'ONLINE_BRIDGE_RECOVERY_FAILED');
      return false;
    }finally{
      recovering=false;
    }
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

  async function tick(){
    const ctx=roomContext(),b=bridge();
    if(!ctx.roomId){
      sessionStorage.removeItem(RELOAD_MARKER);
      lastRoom='';
      return false;
    }
    if(clearSatisfied(ctx,b)){lastRoom=ctx.roomId;return true;}

    const repaired=await recoverBridge(ctx);
    if(repaired)return true;

    // Reload continua apenas como último recurso e no máximo uma vez por sala.
    if(Date.now()-BOOT_AT<1800)return false;
    if(lastRoom!==ctx.roomId)lastRoom=ctx.roomId;
    requestOneRecovery(ctx);
    return false;
  }

  const start=()=>{
    void tick();
    setInterval(()=>{void tick();},250);
    window.addEventListener('sns:account-changed',()=>setTimeout(()=>{void tick();},50));
    window.addEventListener('storage',e=>{if(e.key===ACTIVE_KEY||e.key===LEGACY_KEY||String(e.key||'').startsWith(ACCOUNT_PREFIX))setTimeout(()=>{void tick();},25);});
    window.addEventListener('online',()=>{void tick();});
    document.addEventListener('r41:online:error',()=>{void tick();});
    const observer=new MutationObserver(()=>setTimeout(()=>{void tick();},0));
    observer.observe(document.documentElement,{subtree:true,childList:true});
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();

  window.__SNS_ONLINE_BRIDGE_RECOVERY__={
    version:'R41-ONLINE-BRIDGE-RECOVERY-20260825-V3',
    state:()=>({context:roomContext(),bridge:bridge(),reloadMarker:sessionStorage.getItem(RELOAD_MARKER)||'',reloadQueued,recovering}),
    check:tick,
    recover:recoverBridge
  };
})();
