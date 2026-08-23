const DC = Object.freeze({ trivial:8, easy:10, facil:10, normal:12, medium:12, medio:12, hard:15, dificil:15, extreme:18, extremo:18 });
const TYPE_ATTRIBUTE = Object.freeze({ attack:"tecnica", ataque:"tecnica", jutsu:"tecnica", technique:"tecnica", tecnica:"tecnica", defend:"corpo", defense:"corpo", defesa:"corpo", block:"corpo", bloqueio:"corpo", move:"corpo", movement:"corpo", movimento:"corpo", investigate:"mente", investigation:"mente", investigar:"mente", perceive:"mente", perception:"mente", perceber:"mente", social:"espirito", persuade:"espirito", persuadir:"espirito", resist:"espirito", resistencia:"espirito" });
const ALIASES = Object.freeze({ corpo:["corpo","body","forca","for","fisico"], mente:["mente","mind","inteligencia","int","percepcao"], espirito:["espirito","spirit","vontade","carisma","cha"], tecnica:["tecnica","technique","tec","controle"] });
const CLIENT_MECHANICAL_KEYS = new Set([
  "damage","damagedealt","dano","hp","pv","health","chakra","stamina","vigor","xp","experience","experiencia",
  "level","nivel","reward","rewards","recompensa","recompensas","ryo","ryos","success","sucesso","result","resultado",
  "roll","rolls","rollresult","rolagem","rolagens","dice","dados","total","critical","critico","critica","hit","acerto",
  "miss","falha","ko","dead","death","morte","heal","healing","cura","condition","conditions","condicao","condicoes",
  "resource","resources","recurso","recursos","stats","attributes","atributos","inventory","inventario","equipment","equipamento",
  "unlock","desbloqueio","progress","progresso","cost","custo","cooldown","cooldowns","mechanicalresult","combatoutcome","serverresult",
  "modifier","modificador","dc","cd"
]);

const num=(v,f=0)=>Number.isFinite(Number(v))?Number(v):f;
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));

export function canonicalAttribute(requested, actionType){
  const n=String(requested||"").trim().toLowerCase();
  for(const [key,names] of Object.entries(ALIASES))if(key===n||names.includes(n))return key;
  return TYPE_ATTRIBUTE[String(actionType||"").trim().toLowerCase()]||"tecnica";
}

export function characterModifier(character={},attribute="tecnica"){
  const names=[attribute,...(ALIASES[attribute]||[])];
  const sources=[character,character.attributes,character.atributos,character.stats,character.status,character.sheet,character.ficha].filter(Boolean);
  let base=0;
  outer: for(const source of sources)for(const name of names)if(source[name]!==undefined&&Number.isFinite(Number(source[name]))){base=Number(source[name]);break outer;}
  const level=Math.max(1,Math.floor(num(character.level??character.nivel,1)));
  const levelBonus=Math.floor(level/4);
  base=clamp(Math.trunc(base),-5,10);
  return {base,level,levelBonus,total:clamp(base+levelBonus,-5,15)};
}

export function serverDifficulty(intent={}){
  const requested=String(intent.difficulty||intent.dificuldade||"normal").trim().toLowerCase();
  const key=Object.prototype.hasOwnProperty.call(DC,requested)?requested:"normal";
  return {key,dc:DC[key]};
}

export function classifyTerionRoll(hope,doom,modifier,dc){
  const total=hope+doom+modifier;
  if(hope===1&&doom===1)return {outcome:"disaster",success:false,total};
  if(hope===doom)return total>=dc?{outcome:"critical",success:true,total}:{outcome:"critical_failure",success:false,total};
  if(total>=dc)return {outcome:hope>doom?"success_hope":"success_doom",success:true,total};
  return {outcome:"failure",success:false,total};
}

function d10(random=Math.random){return Math.floor(clamp(num(random(),0),0,0.999999999999)*10)+1;}

export function resolveTerionIntent({intent={},character={},random=Math.random}={}){
  const actionType=String(intent.type||intent.action||"action").trim().toLowerCase().slice(0,80)||"action";
  const attribute=canonicalAttribute(intent.attribute||intent.atributo,actionType);
  const modifier=characterModifier(character,attribute);
  const difficulty=serverDifficulty(intent);
  const hope=d10(random),doom=d10(random);
  const result=classifyTerionRoll(hope,doom,modifier.total,difficulty.dc);
  return {authority:"server",system:"TERION_2D10",version:"server-authoritative-v2",actionType,attribute,difficulty:difficulty.key,dc:difficulty.dc,dice:{hope,doom},modifier,total:result.total,outcome:result.outcome,success:result.success};
}

function mechanicalKey(key){
  return String(key||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]/g,"");
}
function blockedClientKey(key){return CLIENT_MECHANICAL_KEYS.has(mechanicalKey(key));}

export function hasClientResult(payload){
  if(!payload||typeof payload!=="object")return false;
  const stack=[payload];let seen=0;
  while(stack.length&&seen<1000){
    const current=stack.pop();seen++;
    if(!current||typeof current!=="object")continue;
    for(const [key,value] of Object.entries(current)){
      if(blockedClientKey(key))return true;
      if(value&&typeof value==="object")stack.push(value);
    }
  }
  return false;
}

export function stripClientMechanical(value,depth=0){
  if(depth>10)return null;
  if(Array.isArray(value))return value.slice(0,200).map(v=>stripClientMechanical(v,depth+1)).filter(v=>v!==undefined);
  if(!value||typeof value!=="object")return value;
  const out={};
  for(const [key,child] of Object.entries(value)){
    if(blockedClientKey(key))continue;
    const clean=stripClientMechanical(child,depth+1);
    if(clean!==undefined)out[key]=clean;
  }
  return out;
}
