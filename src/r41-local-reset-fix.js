(() => {
  'use strict';

  // Corrige o botão legado `data-action="reset"` sem apagar conta, token de sessão,
  // origem da API ou qualquer save que esteja somente no servidor. O objetivo exibido
  // pela UI é estritamente "Excluir progresso local".
  const LOCAL_PROGRESS_EXACT = new Set([
    'narutoShinobiNoShoPcV5Slots',
    'narutoShinobiNoShoPcV5Active',
    'narutoShinobiNoShoPcV5CreationDraft',
    'narutoShinobiNoShoPcV4',
    'narutoShinobiNoShoPcV3',
    'narutoShinobiNoShoPcV2'
  ]);
  const LOCAL_PROGRESS_PREFIXES = [
    'narutoShinobiNoShoPcV5:',
    'sns-v841-account-save:'
  ];

  function localProgressKeys(){
    const keys=[];
    for(let i=0;i<localStorage.length;i++){
      const key=localStorage.key(i);
      if(!key)continue;
      if(LOCAL_PROGRESS_EXACT.has(key)||LOCAL_PROGRESS_PREFIXES.some(prefix=>key.startsWith(prefix)))keys.push(key);
    }
    return keys;
  }

  function resetLocalProgress(){
    const keys=localProgressKeys();
    if(!confirm(`Excluir o progresso LOCAL deste navegador?\n\n${keys.length} registro(s) local(is) serão removidos. A conta, a autenticação e o save do servidor NÃO serão apagados.`))return false;
    for(const key of keys)localStorage.removeItem(key);
    location.reload();
    return true;
  }

  document.addEventListener('click',event=>{
    const button=event.target?.closest?.('[data-action="reset"]');
    if(!button)return;
    event.preventDefault();
    event.stopImmediatePropagation();
    resetLocalProgress();
  },true);

  window.__SNS_LOCAL_RESET__={keys:localProgressKeys,run:resetLocalProgress};
})();
