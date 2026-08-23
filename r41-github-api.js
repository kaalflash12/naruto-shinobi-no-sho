(function(){
  "use strict";
  const transportFetch = window.fetch.bind(window);
  const gameBase = new URL("./", document.baseURI);
  const CLAIM_KEY = "sns-r41-leon-claim";
  const TOKEN_KEY = "sns-v841-auth-token";

  function apiOrigin(){
    return String(window.NARUTO_R41_API_ORIGIN || localStorage.getItem("sns-r41-api-origin") || "").replace(/\/+$/g,"");
  }
  function authOrigin(){
    return String(window.NARUTO_R41_AUTH_ORIGIN || "").replace(/\/+$/g,"") || apiOrigin();
  }
  function token(){
    const persistent = localStorage.getItem(TOKEN_KEY) || "";
    const session = sessionStorage.getItem(TOKEN_KEY) || "";
    const resolved = persistent || session;
    if(resolved){
      if(persistent !== resolved)localStorage.setItem(TOKEN_KEY,resolved);
      if(session !== resolved)sessionStorage.setItem(TOKEN_KEY,resolved);
    }
    return resolved;
  }
  function setToken(value){
    const t=String(value||"").trim();
    if(t){
      localStorage.setItem(TOKEN_KEY,t);
      sessionStorage.setItem(TOKEN_KEY,t);
    }else{
      localStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(TOKEN_KEY);
    }
  }
  function captureClaim(){
    try{
      const u=new URL(location.href),claim=String(u.searchParams.get("leonClaim")||"").trim();
      if(claim){
        sessionStorage.setItem(CLAIM_KEY,claim);
        u.searchParams.delete("leonClaim");
        history.replaceState(null,"",u.pathname+(u.search?u.search:"")+(u.hash||""));
      }
    }catch{}
  }
  captureClaim();

  function mapTarget(raw){
    if(raw.startsWith("/api/auth/")){
      const origin=authOrigin();
      if(!origin)throw new Error("R41_AUTH_ORIGIN_NOT_CONFIGURED");
      return {url:origin+raw,api:true,route:raw,auth:true};
    }
    if(raw.startsWith("/api/")){
      const origin=apiOrigin();
      if(!origin)throw new Error("R41_API_ORIGIN_NOT_CONFIGURED");
      return {url:origin+raw,api:true,route:raw,auth:false};
    }
    if(raw.startsWith("/assets/")||raw.startsWith("/data/")||raw.startsWith("/_r40/")||raw.startsWith("/src/")){
      return {url:new URL(raw.slice(1),gameBase).toString(),api:false,route:"",auth:false};
    }
    return {url:raw,api:false,route:"",auth:false};
  }
  function withAuth(init,api){
    if(!api)return init;
    const out={...(init||{})};
    const headers=new Headers(out.headers||{});
    const t=token();
    if(t&&!headers.has("authorization"))headers.set("authorization",`Bearer ${t}`);
    out.headers=headers;
    return out;
  }
  async function applyLeonClaim(response,mapped){
    if(!mapped.api||!response.ok||!["/api/auth/login","/api/auth/register"].includes(mapped.route))return response;
    const claim=sessionStorage.getItem(CLAIM_KEY)||"";
    if(!claim)return response;
    let data;try{data=await response.clone().json();}catch{return response;}
    if(!data?.ok||!data?.token||!data?.account)return response;
    if(data.account.role==="leon"){sessionStorage.removeItem(CLAIM_KEY);return response;}
    try{
      const origin=apiOrigin();
      const claimed=await transportFetch(origin+"/api/private/claim-leon",{
        method:"POST",
        headers:{"content-type":"application/json","authorization":`Bearer ${data.token}`},
        body:JSON.stringify({code:claim})
      });
      const c=await claimed.json().catch(()=>({}));
      if(!claimed.ok||!c.ok)return response;
      data.account=Object.assign({},data.account,{role:"leon"});
      sessionStorage.removeItem(CLAIM_KEY);
      const headers=new Headers(response.headers);headers.set("content-type","application/json; charset=utf-8");
      return new Response(JSON.stringify(data),{status:response.status,statusText:response.statusText,headers});
    }catch{return response;}
  }

  window.fetch=async function(input,init){
    const raw=typeof input==="string"?input:(input&&input.url?input.url:String(input));
    let mapped;try{mapped=mapTarget(raw);}catch(err){return Promise.reject(err);}
    let response;
    if(typeof input==="string"){
      response=await transportFetch(mapped.url,withAuth(init,mapped.api));
    }else if(input instanceof Request){
      const merged=withAuth(init,mapped.api),headers=new Headers(input.headers);
      if(merged?.headers)for(const [k,v] of merged.headers.entries())headers.set(k,v);
      response=await transportFetch(new Request(mapped.url,input),{...merged,headers});
    }else{
      response=await transportFetch(mapped.url,withAuth(init,mapped.api));
    }
    return applyLeonClaim(response,mapped);
  };

  async function request(route,body,method="POST"){
    const init={method,headers:{"content-type":"application/json"}};
    if(body!==undefined)init.body=JSON.stringify(body);
    const res=await window.fetch(route,init);
    const data=await res.json().catch(()=>({ok:false,error:"INVALID_JSON"}));
    if(!res.ok){
      const err=new Error(data?.error||`HTTP_${res.status}`);
      err.status=res.status;err.data=data;throw err;
    }
    return data;
  }

  window.r41Auth={
    get token(){return token();},
    get authenticated(){return !!token();},
    async register(username,password,displayName,email){
      const payload=typeof username==="object"?username:{username,password,displayName,email};
      const data=await request("/api/auth/register",payload);
      if(data?.token)setToken(data.token);
      window.dispatchEvent(new CustomEvent("sns:account-changed",{detail:data?.account||null}));
      return data;
    },
    async login(identifier,password){
      const data=await request("/api/auth/login",{identifier,password});
      if(data?.token)setToken(data.token);
      window.dispatchEvent(new CustomEvent("sns:account-changed",{detail:data?.account||null}));
      return data;
    },
    async me(){
      if(!token())return {ok:false,error:"UNAUTHORIZED",account:null};
      try{return await request("/api/auth/me",undefined,"GET");}
      catch(err){
        if(err.status===401){setToken("");window.dispatchEvent(new CustomEvent("sns:account-changed",{detail:null}));}
        throw err;
      }
    },
    async logout(){
      try{if(token())await request("/api/auth/logout",{});}finally{
        setToken("");
        window.dispatchEvent(new CustomEvent("sns:account-changed",{detail:null}));
      }
      return {ok:true};
    },
    async recover(identifier,recoveryCode,newPassword){
      return request("/api/auth/recover",{identifier,recoveryCode,newPassword});
    },
    async generateRecoveryCode(){
      return request("/api/auth/recovery-code",{});
    },
    async deleteAccount(){
      const data=await request("/api/auth/delete-account",{});
      setToken("");
      window.dispatchEvent(new CustomEvent("sns:account-changed",{detail:null}));
      return data;
    }
  };

  // Sincroniza imediatamente antes de app.js executar. Isso mantém compatibilidade
  // com o restoreAuth legado do runtime, que ainda lê sessionStorage.
  token();

  window.__R41_GITHUB_API__={
    build:"NARUTO-SHINOBI-NO-SHO-SUPABASE-AUTH-20260822-SYNC",
    get apiOrigin(){return apiOrigin();},
    get authOrigin(){return authOrigin();},
    backend:"supabase-edge-postgres",
    sameOriginStatic:true,
    leonClaimPending:()=>!!sessionStorage.getItem(CLAIM_KEY)
  };
})();