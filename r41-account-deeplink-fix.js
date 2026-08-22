(function(){
  "use strict";
  const url=new URL(location.href);
  if(url.searchParams.get("account")!=="1")return;
  const tab=url.searchParams.get("tab")||undefined;
  url.searchParams.delete("account");
  url.searchParams.delete("tab");
  history.replaceState(null,"",url.pathname+(url.search?url.search:"")+(url.hash||""));
  const openOnce=()=>{
    if(window.SNS_ACCOUNT_UI?.open)window.SNS_ACCOUNT_UI.open(tab);
    else setTimeout(openOnce,25);
  };
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",openOnce,{once:true});
  else openOnce();
})();