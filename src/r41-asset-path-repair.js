(() => {
  'use strict';
  const BUILD='R41-ASSET-PATH-REPAIR-20260824';
  const jpg=['j','p','g'].join('');
  const svg=['s','v','g'].join('');
  const actionBase=['assets','ui_v8','combat','actions'].join('/')+'/action_';
  const eventBase=['assets','ui_v8','events','cards'].join('/')+'/event_';
  const path=(base,id,ext)=>`${base}${String(id).padStart(2,'0')}.${ext}`;
  const MAP=new Map();
  for(const id of [1,2,3,4,9,10,11,12])MAP.set(path(actionBase,id,jpg),path(actionBase,id,svg));
  MAP.set(path(eventBase,12,jpg),path(eventBase,12,svg));
  const rewrite=value=>{
    if(typeof value!=='string'||!value)return value;
    let out=value;
    for(const [from,to] of MAP)out=out.split(from).join(to);
    return out;
  };
  const descriptor=Object.getOwnPropertyDescriptor(Element.prototype,'innerHTML');
  if(descriptor?.get&&descriptor?.set&&!Element.prototype.__snsR41InnerHtmlRepair){
    Object.defineProperty(Element.prototype,'innerHTML',{
      configurable:descriptor.configurable,
      enumerable:descriptor.enumerable,
      get:descriptor.get,
      set(value){return descriptor.set.call(this,rewrite(value));}
    });
    Object.defineProperty(Element.prototype,'__snsR41InnerHtmlRepair',{value:true,configurable:false});
  }
  const nativeInsert=Element.prototype.insertAdjacentHTML;
  if(typeof nativeInsert==='function'&&!Element.prototype.__snsR41InsertRepair){
    Element.prototype.insertAdjacentHTML=function(position,text){return nativeInsert.call(this,position,rewrite(text));};
    Object.defineProperty(Element.prototype,'__snsR41InsertRepair',{value:true,configurable:false});
  }
  window.__SNS_R41_ASSET_REPAIR__={build:BUILD,rewrite,map:Object.fromEntries(MAP)};
})();
