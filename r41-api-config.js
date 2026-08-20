(function(){
  "use strict";
  const params = new URLSearchParams(location.search);
  const fromQuery = String(params.get("api") || "").trim().replace(/\/+$/g, "");
  const fromStorage = String(localStorage.getItem("sns-api-origin") || localStorage.getItem("sns-r41-api-origin") || "").trim().replace(/\/+$/g, "");
  const baked = "https://rlyiwlwzrdgvcwawrnpl.supabase.co/functions/v1/shinobi-api";
  const origin = fromQuery || fromStorage || baked;
  if (fromQuery) localStorage.setItem("sns-api-origin", fromQuery);
  window.NARUTO_R41_API_ORIGIN = origin;
  window.NARUTO_R41_API_BUILD = "NARUTO-SHINOBI-NO-SHO-SUPABASE-ONLINE";
})();
