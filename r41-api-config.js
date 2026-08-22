(function(){
  "use strict";
  const params = new URLSearchParams(location.search);
  const fromQuery = String(params.get("api") || "").trim().replace(/\/+$/g, "");
  const fromStorage = String(localStorage.getItem("sns-api-origin") || localStorage.getItem("sns-r41-api-origin") || "").trim().replace(/\/+$/g, "");
  const baked = "https://rlyiwlwzrdgvcwawrnpl.supabase.co/functions/v1/shinobi-api";
  const authBaked = "https://rlyiwlwzrdgvcwawrnpl.supabase.co/functions/v1/shinobi-auth";
  const publishableKey = "sb_publishable_S9LtSpLhLKFOU9iSd8b4yQ_EziH1Arr";
  const origin = fromQuery || fromStorage || baked;
  if (fromQuery) localStorage.setItem("sns-api-origin", fromQuery);

  window.NARUTO_R41_API_ORIGIN = origin;
  window.NARUTO_R41_AUTH_ORIGIN = authBaked;
  window.NARUTO_R41_API_BUILD = "NARUTO-SHINOBI-NO-SHO-SUPABASE-ONLINE-AUTH-V1";
  window.NARUTO_R41_SUPABASE_PUBLISHABLE_KEY = publishableKey;

  // A chave publishable identifica o projeto Supabase; nao concede acesso direto
  // as tabelas SNS, que continuam protegidas por RLS e pela Edge Function.
  if (!window.__SNS_SUPABASE_FETCH_PATCHED__) {
    const nativeFetch = window.fetch.bind(window);
    window.fetch = function(input, init){
      const rawUrl = typeof input === "string" ? input : (input && input.url ? String(input.url) : String(input));
      if (publishableKey && rawUrl.indexOf("https://rlyiwlwzrdgvcwawrnpl.supabase.co/") === 0) {
        const baseHeaders = init && init.headers ? init.headers : (input instanceof Request ? input.headers : undefined);
        const headers = new Headers(baseHeaders || {});
        if (!headers.has("apikey")) headers.set("apikey", publishableKey);
        if (input instanceof Request) {
          return nativeFetch(new Request(input, Object.assign({}, init || {}, { headers })));
        }
        return nativeFetch(input, Object.assign({}, init || {}, { headers }));
      }
      return nativeFetch(input, init);
    };
    window.__SNS_SUPABASE_FETCH_PATCHED__ = true;
  }
})();