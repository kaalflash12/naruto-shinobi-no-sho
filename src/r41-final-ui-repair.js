(function(){
  "use strict";
  const replacements=new Map([
    ["Servidor R27 + Cloudflare Tunnel","Supabase Online"],
    ["Cloudflare Workers + Durable Objects","Supabase Edge Function + Postgres"],
    ["Cloudflare Workers + MongoDB Atlas","Supabase Edge Function + Postgres"],
    ["Salas coordenadas no Cloudflare Durable Objects, com contas e saves persistidos no MongoDB Atlas.","Salas persistidas no Supabase Postgres e coordenadas pela Edge Function do Shinobi no Sho."],
    ["Salas persistentes no servidor local; quando o mesmo servidor é publicado por Cloudflare Tunnel, jogadores externos entram pelo mesmo endereço.","Salas online persistentes no Supabase, acessíveis pelo mesmo site público."],
    ["O online sincroniza presença, resumo da ficha, chat, saves individuais e contexto de campanha. Ações de sala passam pela autoridade do Worker antes de serem aceitas.","O online sincroniza presença, ficha, chat, saves e contexto de campanha. A Edge Function aceita intenções; TERION continua sendo a autoridade mecânica."],
    ["Online indisponível. O Worker Cloudflare precisa estar configurado e conectado ao MongoDB Atlas.","Online indisponível. A Edge Function Supabase precisa responder antes de liberar a sala."],
    ["Online indisponível. O servidor Node precisa estar ativo. Worker/D1 é opcional; sem ele as salas persistem localmente no host.","Online indisponível. A Edge Function Supabase precisa responder antes de liberar a sala."],
    ["Save local e MongoDB Atlas confirmados.","Save local e Supabase Postgres confirmados."],
    ["Save local, D1 e Drive confirmados.","Save local e Supabase Postgres confirmados."],
    ["Save confirmado no computador e MongoDB Atlas.","Save confirmado no computador e Supabase Postgres."],
    ["Save confirmado no computador, D1 e Drive.","Save confirmado no computador e Supabase Postgres."],
    ["Save privado confirmado no computador e MongoDB Atlas.","Save privado confirmado no computador e Supabase Postgres."],
    ["Save privado confirmado no computador, D1 e Drive.","Save privado confirmado no computador e Supabase Postgres."]
  ]);
  function repair(root=document.body){
    if(!root)return;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    for(const n of nodes){
      const original=n.nodeValue;if(!original||!original.trim())continue;let next=original;
      for(const [from,to] of replacements)next=next.split(from).join(to);
      next=next.replace(/\bD1 e Drive\b/g,"Supabase Postgres").replace(/\bWorker\/D1\b/g,"Supabase").replace(/\bMongoDB Atlas\b/g,"Supabase Postgres").replace(/\bCloudflare\/MongoDB\b/g,"Supabase");
      if(next!==original)n.nodeValue=next;
    }
    document.documentElement.dataset.r41Backend=window.NARUTO_R41_API_ORIGIN?"supabase-postgres":"unconfigured";
  }
  let queued=false;const schedule=()=>{if(queued)return;queued=true;queueMicrotask(()=>{queued=false;repair();});};
  new MutationObserver(schedule).observe(document.documentElement,{subtree:true,childList:true,characterData:true});
  window.addEventListener("DOMContentLoaded",schedule,{once:true});schedule();
  window.__R41_FINAL_REPAIR__={build:"R41-SUPABASE-REPAIR-20260823",repair};
})();
