(() => {
  'use strict';

  const ACTIVE_KEY='sns-v841-active-account-slot';
  const TOKEN_KEY='sns-v841-auth-token';
  let restoring=false;
  let manualCharactersUntil=0;
  let lastAttemptAt=0;

  const authenticated=()=>Boolean(sessionStorage.getItem(TOKEN_KEY)||localStorage.getItem(TOKEN_KEY)||window.r41Auth?.authenticated);
  const active=()=>String(localStorage.getItem(ACTIVE_KEY)||'').trim();
  const remember=id=>{id=String(id||'').trim();if(id)localStorage.setItem(ACTIVE_KEY,id);};
  const forget=id=>{const current=active();if(!id||String(id)===current)localStorage.removeItem(ACTIVE_KEY);};

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
        if(document.querySelector('#main-nav [data-screen="online"]')&&document.querySelector('#screen'))return true;
        await new Promise(r=>setTimeout(r,100));
      }
      return false;
    }finally{restoring=false;}
  }

  document.addEventListener('click',event=>{
    const target=event.target?.closest?.('[data-action],[data-screen]');if(!target)return;
    const action=String(target.getAttribute('data-action')||'');
    const screen=String(target.getAttribute('data-screen')||'');
    const id=String(target.getAttribute('data-id')||target.getAttribute('data-slot')||'').trim();
    if(action==='account-load'||action==='load-account-slot'){remember(id);return;}
    if(action==='account-delete'){forget(id);return;}
    if(action==='account-logout'){localStorage.removeItem(ACTIVE_KEY);return;}
    if(screen==='personagens'){manualCharactersUntil=Date.now()+10000;}
  },true);

  window.addEventListener('sns:account-changed',event=>{if(!event.detail)localStorage.removeItem(ACTIVE_KEY);});

  const observer=new MutationObserver(()=>{queueMicrotask(recoverActiveSlot);});
  const start=()=>{
    const root=document.getElementById('app')||document.body;
    observer.observe(root,{subtree:true,childList:true});
    recoverActiveSlot();
    setTimeout(recoverActiveSlot,250);
    setTimeout(recoverActiveSlot,1000);
    setTimeout(recoverActiveSlot,2500);
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();

  window.__SNS_ACTIVE_ACCOUNT_SLOT__={get:active,remember,forget,recover:recoverActiveSlot};
})();
