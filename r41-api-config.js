(function(){
  "use strict";
  const SUPABASE_ORIGIN="https://rlyiwlwzrdgvcwawrnpl.supabase.co/functions/v1/shinobi-api";
  const SUPABASE_KEY="sb_publishable_S9LtSpLhLKFOU9iSd8b4yQ_EziH1Arr";
  const params=new URLSearchParams(location.search);
  const fromQuery=String(params.get("api")||"").trim().replace(/\/+$/g,"");
  const stored=String(localStorage.getItem("sns-api-origin")||localStorage.getItem("sns-r41-api-origin")||"").trim().replace(/\/+$/g,"");
  const fromStorage=/^https:\/\/rlyiwlwzrdgvcwawrnpl\.supabase\.co\/functions\/v1\/shinobi-api$/i.test(stored)?stored:"";
  const origin=fromQuery||fromStorage||SUPABASE_ORIGIN;
  if(fromQuery){
    localStorage.setItem("sns-api-origin",fromQuery);
    localStorage.setItem("sns-r41-api-origin",fromQuery);
  }else if(!fromStorage){
    localStorage.setItem("sns-api-origin",SUPABASE_ORIGIN);
    localStorage.setItem("sns-r41-api-origin",SUPABASE_ORIGIN);
  }
  window.NARUTO_R41_API_ORIGIN=origin;
  window.NARUTO_R41_SUPABASE_PUBLISHABLE_KEY=SUPABASE_KEY;
  window.NARUTO_R41_API_BUILD="NARUTO-SHINOBI-NO-SHO-SUPABASE-POSTGRES";
})();
