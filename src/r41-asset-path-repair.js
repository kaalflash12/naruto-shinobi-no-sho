(() => {
  'use strict';
  const BUILD='R41-ASSET-PATH-REPAIR-20260824';
  const MAP=new Map([
    ['assets/ui_v8/combat/actions/action_01.jpg','assets/ui_v8/combat/actions/action_01.svg'],
    ['assets/ui_v8/combat/actions/action_02.jpg','assets/ui_v8/combat/actions/action_02.svg'],
    ['assets/ui_v8/combat/actions/action_03.jpg','assets/ui_v8/combat/actions/action_03.svg'],
    ['assets/ui_v8/combat/actions/action_04.jpg','assets/ui_v8/combat/actions/action_04.svg'],
    ['assets/ui_v8/combat/actions/action_09.jpg','assets/ui_v8/combat/actions/action_09.svg'],
    ['assets/ui_v8/combat/actions/action_10.jpg','assets/ui_v8/combat/actions/action_10.svg'],
    ['assets/ui_v8/combat/actions/action_11.jpg','assets/ui_v8/combat/actions/action_11.svg'],
    ['assets/ui_v8/combat/actions/action_12.jpg','assets/ui_v8/combat/actions/action_12.svg'],
    ['assets/ui_v8/events/cards/event_12.jpg','assets/ui_v8/events/cards/event_12.svg']
  ]);
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
