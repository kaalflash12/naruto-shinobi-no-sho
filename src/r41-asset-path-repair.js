(() => {
  'use strict';
  const BUILD='R41-ASSET-PATH-REPAIR-20260824-V3';
  const jpg=['j','p','g'].join('');
  const svg=['s','v','g'].join('');
  const actionBase=['assets','ui_v8','combat','actions'].join('/')+'/action_';
  const eventBase=['assets','ui_v8','events','cards'].join('/')+'/event_';
  const eventArtBase=['assets','events_v74'].join('/')+'/';
  const path=(base,id,ext)=>`${base}${String(id).padStart(2,'0')}.${ext}`;
  const MAP=new Map();
  for(const id of [1,2,3,4,9,10,11,12])MAP.set(path(actionBase,id,jpg),path(actionBase,id,svg));

  // app.js substitui temporariamente a arte semântica de V74.events por event_XX.jpg.
  // O pacote ui_v8 não contém esses JPGs; reatamos cada índice à arte original válida
  // do evento V7.4, preservando a ordem real do catálogo.
  MAP.set(path(eventBase,1,jpg),`${eventArtBase}kakashi.svg`);
  MAP.set(path(eventBase,2,jpg),`${eventArtBase}iruka.svg`);
  MAP.set(path(eventBase,3,jpg),`${eventArtBase}gai.svg`);
  MAP.set(path(eventBase,4,jpg),`${eventArtBase}festival.svg`);
  MAP.set(path(eventBase,5,jpg),`${eventArtBase}inverno.svg`);
  MAP.set(path(eventBase,6,jpg),`${eventArtBase}mensageiro.svg`);
  MAP.set(path(eventBase,7,jpg),`${eventArtBase}ferreiro.svg`);
  MAP.set(path(eventBase,8,jpg),`${eventArtBase}pergaminho.svg`);
  MAP.set(path(eventBase,9,jpg),'assets/private/kurai.svg');
  // A arte do lançador "Explorar" existe no pacote ui_v8 apenas como SVG.
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
  const nativeSetAttribute=Element.prototype.setAttribute;
  if(typeof nativeSetAttribute==='function'&&!Element.prototype.__snsR41AttributeRepair){
    Element.prototype.setAttribute=function(name,value){
      return nativeSetAttribute.call(this,name,String(name).toLowerCase()==='src'?rewrite(value):value);
    };
    Object.defineProperty(Element.prototype,'__snsR41AttributeRepair',{value:true,configurable:false});
  }
  const srcDescriptor=Object.getOwnPropertyDescriptor(HTMLImageElement.prototype,'src');
  if(srcDescriptor?.get&&srcDescriptor?.set&&!HTMLImageElement.prototype.__snsR41SrcRepair){
    Object.defineProperty(HTMLImageElement.prototype,'src',{
      configurable:srcDescriptor.configurable,
      enumerable:srcDescriptor.enumerable,
      get:srcDescriptor.get,
      set(value){return srcDescriptor.set.call(this,rewrite(value));}
    });
    Object.defineProperty(HTMLImageElement.prototype,'__snsR41SrcRepair',{value:true,configurable:false});
  }
  window.__SNS_R41_ASSET_REPAIR__={build:BUILD,rewrite,map:Object.fromEntries(MAP)};
})();
