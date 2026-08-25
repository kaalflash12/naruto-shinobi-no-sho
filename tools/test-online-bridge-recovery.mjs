import fs from 'node:fs';
import vm from 'node:vm';

const source=fs.readFileSync(new URL('../src/r41-online-bridge-recovery.js',import.meta.url),'utf8');

class StorageMock{
  constructor(seed={}){this.map=new Map(Object.entries(seed));}
  get length(){return this.map.size;}
  key(i){return [...this.map.keys()][i]??null;}
  getItem(k){return this.map.has(String(k))?this.map.get(String(k)):null;}
  setItem(k,v){this.map.set(String(k),String(v));}
  removeItem(k){this.map.delete(String(k));}
}

function makeHarness({responseRoomId='room-1',responseOk=true}={}){
  const online={room:{roomId:'room-1'},state:{roomId:'room-1'},leaderboard:[],actionLog:[],ready:false,error:null};
  const localStorage=new StorageMock({'narutoShinobiNoShoPcV4':JSON.stringify({online:{roomId:'room-1'}})});
  const sessionStorage=new StorageMock();
  const windowEvents=[];
  const documentEvents=[];
  let reloads=0;
  const listeners=new Map();
  const documentListeners=new Map();
  const window={
    __NARUTO_R41__:{state:()=>({online})},
    fetch:async()=>({
      ok:responseOk,
      json:async()=>({ok:responseOk,online:false,room:{roomId:responseRoomId,messages:[{id:'m1',text:'ok'}]}})
    }),
    addEventListener:(name,fn)=>listeners.set(name,fn),
    dispatchEvent:event=>{windowEvents.push(event);return true;}
  };
  class CustomEventMock{constructor(type,init={}){this.type=type;this.detail=init.detail;}}
  class MutationObserverMock{constructor(fn){this.fn=fn;}observe(){}disconnect(){}}
  const document={
    readyState:'complete',
    documentElement:{},
    addEventListener:(name,fn)=>documentListeners.set(name,fn),
    dispatchEvent:event=>{documentEvents.push(event);return true;}
  };
  const context=vm.createContext({
    window,document,localStorage,sessionStorage,
    location:{reload:()=>{reloads++;}},
    MutationObserver:MutationObserverMock,
    CustomEvent:CustomEventMock,
    setInterval:()=>0,
    clearInterval:()=>{},
    setTimeout:(fn)=>{fn();return 0;},
    clearTimeout:()=>{},
    console,
    Date,
    encodeURIComponent
  });
  vm.runInContext(source,context,{filename:'src/r41-online-bridge-recovery.js'});
  return {context,window,online,sessionStorage,windowEvents,documentEvents,get reloads(){return reloads;}};
}

function assert(condition,message){if(!condition)throw new Error(message);}

{
  const h=makeHarness();
  const recovered=await h.window.__SNS_ONLINE_BRIDGE_RECOVERY__.recover();
  assert(recovered===true,'recovery should succeed from valid roomState even when data.online=false');
  assert(h.online.ready===true,'bridge must become ready after authoritative room state is recovered');
  assert(h.online.room?.roomId==='room-1'&&h.online.state?.roomId==='room-1','recovered room/state mismatch');
  assert(h.online.error===null,'successful recovery must clear online error');
  assert(h.online.actionLog.length===1,'room messages must be restored into actionLog');
  assert(h.reloads===0,'successful direct recovery must not reload the page');
  assert(h.documentEvents.some(e=>e.type==='r41:online:state'),'recovery must emit r41:online:state');
  assert(h.windowEvents.some(e=>e.type==='sns:online-bridge-recovered'),'recovery must emit sns:online-bridge-recovered');
  assert(h.window.__SNS_ONLINE_BRIDGE_RECOVERY__.version==='R41-ONLINE-BRIDGE-RECOVERY-20260824-V2','recovery version marker mismatch');
}

{
  const h=makeHarness({responseRoomId:'room-other'});
  const recovered=await h.window.__SNS_ONLINE_BRIDGE_RECOVERY__.recover();
  assert(recovered===false,'mismatched room response must not be accepted');
  assert(h.online.ready===false,'mismatched room response must not mark bridge ready');
}

{
  const h=makeHarness({responseOk:false});
  const recovered=await h.window.__SNS_ONLINE_BRIDGE_RECOVERY__.recover();
  assert(recovered===false,'failed backend response must not be accepted');
  assert(h.online.ready===false,'failed backend response must not mark bridge ready');
}

console.log('PASS_ONLINE_BRIDGE_RECOVERY_UNIT');
