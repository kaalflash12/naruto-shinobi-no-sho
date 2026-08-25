(function(){
  "use strict";
  const params=new URLSearchParams(location.search);
  const clean=v=>String(v||"").trim().replace(/\/+$/g,"");
  const allowedWorker=v=>/^https:\/\/[A-Za-z0-9._-]+\.workers\.dev$/i.test(v);
  const workerQuery=clean(params.get("api"));
  const workerStored=clean(localStorage.getItem("sns-api-origin")||localStorage.getItem("sns-r41-api-origin")||"");
  const workerOverride=allowedWorker(workerQuery)?workerQuery:(allowedWorker(workerStored)?workerStored:"");
  const neonDataApi="https://ep-weathered-brook-aydmbds7.apirest.c-5.us-east-2.aws.neon.tech/neondb/rest/v1";
  if(allowedWorker(workerQuery)){
    localStorage.setItem("sns-api-origin",workerQuery);
    localStorage.setItem("sns-r41-api-origin",workerQuery);
  }else if(workerStored&&!allowedWorker(workerStored)){
    localStorage.removeItem("sns-api-origin");
    localStorage.removeItem("sns-r41-api-origin");
  }
  window.NARUTO_R41_BACKEND_MODE=workerOverride?"cloudflare":"neon";
  window.NARUTO_R41_API_ORIGIN=workerOverride;
  window.NARUTO_R41_NEON_DATA_API_URL=neonDataApi;
  window.NARUTO_R41_API_BUILD=workerOverride?"NARUTO-SHINOBI-NO-SHO-CLOUDFLARE-MONGODB":"NARUTO-SHINOBI-NO-SHO-NEON-POSTGRES";
})();