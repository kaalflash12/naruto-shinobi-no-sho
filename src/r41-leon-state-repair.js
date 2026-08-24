(function(){
'use strict';
const BUILD='R41-LEON-STATE-REPAIR-20260824';
const state=window.NARUTO_LEON_STATE_V821;
const source=window.NARUTO_LEON_V81?.kurai?.ficha;
if(!state?.character||!source)return;
const stats=source.ficha||{};
const currentChakra=Number(stats.ChakraAtual??state.kurai?.chakra??8);
const maxChakra=Number(stats.ChakraMaximo??state.kurai?.maxChakra??8);
const currentPv=Number(stats.PVAtual??state.kurai?.pv??state.kurai?.hp??8);
const maxPv=Number(stats.PVMaximo??state.kurai?.maxPv??state.kurai?.maxHp??8);
const normalized={
  id:source.id||'ITEM_KURAI',
  nome:source.nome||'Kurai',
  categoria:source.categoria||'Arma espacial viva e companheira',
  status:source.status||'ATIVA_NIVEL_1',
  descricao:source.descricaoObjetiva||'Katana viva espacial vinculada exclusivamente a Leon.',
  PV:{atual:currentPv,maximo:maxPv},
  Defesa:Number(stats.Defesa??state.kurai?.defense??13),
  Chakra:{atual:currentChakra,maximo:maxChakra},
  DanoBasico:Number(stats.danoBasico??state.kurai?.damage??2),
  partilhaMaxPorTecnica:Number(source.partilhaDeChakra?.pagamentoMaximoPorTecnica??state.kurai?.shareMax??3),
  partilha:source.partilhaDeChakra||null
};
state.kurai={
  ...(state.kurai&&typeof state.kurai==='object'?state.kurai:{}),
  hp:currentPv,maxHp:maxPv,pv:currentPv,maxPv,
  defense:normalized.Defesa,
  chakra:currentChakra,maxChakra,
  damage:normalized.DanoBasico,
  shareMax:normalized.partilhaMaxPorTecnica
};
state.character.kurai={...normalized};
state.character.kuraiChakra=currentChakra;
state.character.kuraiMaxChakra=maxChakra;
state.character.kuraiPv=currentPv;
state.character.kuraiMaxPv=maxPv;
state.character.specialProfile=state.character.specialProfile||{};
state.character.specialProfile.kurai={...normalized};
window.__R41_LEON_STATE_REPAIR__={build:BUILD,kurai:true,chakra:`${currentChakra}/${maxChakra}`,pv:`${currentPv}/${maxPv}`};
})();
