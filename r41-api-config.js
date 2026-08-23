(function(){
  "use strict";
  const params = new URLSearchParams(location.search);
  const fromQuery = String(params.get("api") || "").trim().replace(/\/+$/g, "");
  const fromStorage = String(localStorage.getItem("sns-api-origin") || localStorage.getItem("sns-r41-api-origin") || "").trim().replace(/\/+$/g, "");
  const baked = ""; // preenchido automaticamente pelo CI apos deploy Cloudflare + MongoDB verificado
  const origin = fromQuery || fromStorage || baked;
  if (fromQuery) {
    localStorage.setItem("sns-api-origin", fromQuery);
    localStorage.setItem("sns-r41-api-origin", fromQuery);
  }
  window.NARUTO_R41_API_ORIGIN = origin;
  window.NARUTO_R41_API_BUILD = "NARUTO-SHINOBI-NO-SHO-CLOUDFLARE-MONGODB";
})();
