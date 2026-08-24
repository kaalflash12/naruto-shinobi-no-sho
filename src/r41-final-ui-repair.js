(function(){
  "use strict";
  const BUILD="R41-CLOUDFLARE-MONGODB-UI-REPAIR-20260824";
  const legacyProvider=["Supa","base"].join("");
  const replacements=new Map([
    ["Servidor R27 + Cloudflare Tunnel","Cloudflare Workers + MongoDB Atlas"],
    ["Cloudflare Workers + Durable Objects","Cloudflare Workers + Durable Objects + MongoDB Atlas"],
    ["Salas persistentes no servidor local; quando o mesmo servidor é publicado por Cloudflare Tunnel, jogadores externos entram pelo mesmo endereço.","Salas online coordenadas pelo Cloudflare Worker e persistidas no MongoDB Atlas."],
    ["Online indisponível. O servidor Node precisa estar ativo. Worker/D1 é opcional; sem ele as salas persistem localmente no host.","Online indisponível. O Cloudflare Worker precisa estar configurado e conectado ao MongoDB Atlas."],
    ["Save local, D1 e Drive confirmados.","Save local e MongoDB Atlas confirmados."],
    ["Save confirmado no computador, D1 e Drive.","Save confirmado no computador e MongoDB Atlas."],
    ["Save privado confirmado no computador, D1 e Drive.","Save privado confirmado no computador e MongoDB Atlas."]
  ]);
  function activeSave(){
    try{
      const id=localStorage.getItem("narutoShinobiNoShoPcV5Active")||"";
      const raw=(id&&localStorage.getItem(`narutoShinobiNoShoPcV5:${id}`))||localStorage.getItem("narutoShinobiNoShoPcV4")||"";
      return raw?JSON.parse(raw):null;
    }catch{return null;}
  }
  function ensureKuraiResource(){
    const host=document.getElementById("top-resources");
    if(!host)return;
    const save=activeSave();
    const name=String(save?.character?.name||"").trim().toLowerCase();
    const existing=host.querySelector('[data-r41-resource="kurai"]');
    if(name!=="leon kosmo"){
      existing?.remove();
      return;
    }
    const k=save?.character?.kurai||save?.character?.specialProfile?.kurai||window.NARUTO_LEON_STATE_V821?.character?.kurai||{};
    const current=Number(save?.character?.kuraiChakra??k?.Chakra?.atual??save?.kurai?.chakra??8);
    const max=Number(save?.character?.kuraiMaxChakra??k?.Chakra?.maximo??save?.kurai?.maxChakra??8);
    const chip=existing||document.createElement("div");
    chip.dataset.r41Resource="kurai";
    chip.className=chip.className||"resource-pill";
    chip.setAttribute("title","Chakra próprio de Kurai — reserva independente");
    chip.textContent=`Kurai ${current}/${max}`;
    if(!existing)host.appendChild(chip);
  }
  function repair(root=document.body){
    if(!root)return;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[];
    while(walker.nextNode())nodes.push(walker.currentNode);
    for(const n of nodes){
      const original=n.nodeValue;
      if(!original||!original.trim())continue;
      let next=original;
      for(const [from,to] of replacements)next=next.split(from).join(to);
      next=next.split(legacyProvider+" Edge Function + Postgres").join("Cloudflare Workers + MongoDB Atlas");
      next=next.split(legacyProvider+" Postgres").join("MongoDB Atlas");
      next=next.split(legacyProvider).join("Cloudflare/MongoDB");
      next=next.replace(/\bWorker\/D1\b/g,"Cloudflare Worker + MongoDB").replace(/\bD1 e Drive\b/g,"MongoDB Atlas");
      if(next!==original)n.nodeValue=next;
    }
    document.documentElement.dataset.r41Backend=window.NARUTO_R41_API_ORIGIN?"cloudflare-mongodb":"unconfigured";
    ensureKuraiResource();
  }
  let queued=false;
  const schedule=()=>{if(queued)return;queued=true;queueMicrotask(()=>{queued=false;repair();});};
  new MutationObserver(schedule).observe(document.documentElement,{subtree:true,childList:true,characterData:true});
  window.addEventListener("DOMContentLoaded",schedule,{once:true});
  window.addEventListener("storage",schedule);
  window.addEventListener("sns:account-changed",schedule);
  schedule();
  window.__R41_FINAL_REPAIR__={build:BUILD,backend:"cloudflare-mongodb",repair};
})();
