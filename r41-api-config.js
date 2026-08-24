(function(){
  "use strict";
  const params=new URLSearchParams(location.search);
  const clean=v=>String(v||"").trim().replace(/\/+$/g,"");
  const allowed=v=>/^https:\/\//i.test(v)&&!/(?:supabase|vercel|turso)/i.test(v);
  const fromQueryRaw=clean(params.get("api"));
  const storedRaw=clean(localStorage.getItem("sns-api-origin")||localStorage.getItem("sns-r41-api-origin")||"");
  const baked=""; // preenchido automaticamente pelo CI apos deploy Cloudflare + MongoDB verificado
  const fromQuery=allowed(fromQueryRaw)?fromQueryRaw:"";
  const fromStorage=allowed(storedRaw)?storedRaw:"";
  const origin=fromQuery||fromStorage||baked;
  if(fromQuery){
    localStorage.setItem("sns-api-origin",fromQuery);
    localStorage.setItem("sns-r41-api-origin",fromQuery);
  }else if(storedRaw&&!fromStorage){
    localStorage.removeItem("sns-api-origin");
    localStorage.removeItem("sns-r41-api-origin");
  }
  window.NARUTO_R41_API_ORIGIN=origin;
  window.NARUTO_R41_API_BUILD="NARUTO-SHINOBI-NO-SHO-CLOUDFLARE-MONGODB";
})();
