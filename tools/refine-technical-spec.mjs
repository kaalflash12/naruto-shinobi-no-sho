import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'docs','generated');
const INV=path.join(OUT,'TECHNICAL-INVENTORY.json');
const SOURCE_EXT=new Set(['.js','.mjs','.cjs','.html','.json','.toml','.css','.ps1','.yml','.yaml']);
const NON_FUNCTION=new Set(['if','for','while','switch','catch','with','return','throw','else','do','try','finally']);

if(!fs.existsSync(INV))throw new Error('TECHNICAL-INVENTORY.json ausente');
const inv=JSON.parse(fs.readFileSync(INV,'utf8'));

const norm=p=>String(p||'').replace(/\\/g,'/');
const hasSourceExt=p=>SOURCE_EXT.has(path.extname(norm(p)).toLowerCase());
const isDocumentation=p=>norm(p).startsWith('docs/');
const isTooling=p=>norm(p).startsWith('tools/')||norm(p).startsWith('.github/');
const isSource=p=>hasSourceExt(p)&&!isDocumentation(p);
const isGameRuntimeSource=p=>isSource(p)&&!isTooling(p);
const domainOf=p=>isTooling(p)?'tooling':(isGameRuntimeSource(p)?'game-runtime':'other-source');
const code=s=>'`'+String(s??'').replace(/`/g,'\\`')+'`';
const clean=s=>String(s??'').replace(/\|/g,'\\|').replace(/\r?\n/g,' ').trim();
const srcs=a=>(a||[]).map(x=>code(x.file+':'+x.line)).join(', ');
const listCodes=a=>a?.length?a.map(code).join(', '):'—';
const header=(title,desc)=>['# '+title,'',desc,'','Gerado em: '+code(inv.generatedAt),''].join('\n');

function filterGrouped(items,predicate){
  const out=[];
  for(const item of items||[]){
    const sources=(item.sources||[]).filter(s=>predicate(s.file));
    if(sources.length)out.push({...item,sources});
  }
  return out;
}

const before={
  functions:(inv.functions||[]).length,
  routes:(inv.routes||[]).length,
  models:(inv.models||[]).length,
  collections:(inv.collections||[]).length,
  storage:(inv.storage||[]).length,
  uiActions:(inv.uiActions||[]).length,
  events:(inv.events||[]).length,
  movement:(inv.movement||[]).length,
  assets:(inv.assets||[]).length,
  environment:(inv.environment||[]).length
};

// Funções de ferramentas também são documentadas, porque fazem parte do repositório e o requisito é inventariar scripts/funções.
// Porém semântica de JOGO (IA, API, DB, UI, movimento, assets/env) só pode vir do runtime, nunca do auditor/gerador.
inv.functions=(inv.functions||[])
  .filter(f=>isSource(f.file)&&!NON_FUNCTION.has(String(f.name||'')))
  .map(f=>({...f,domain:domainOf(f.file)}));
inv.routes=filterGrouped(inv.routes,isGameRuntimeSource);
inv.models=filterGrouped(inv.models,isGameRuntimeSource);
inv.collections=filterGrouped(inv.collections,isGameRuntimeSource);
inv.storage=(inv.storage||[]).filter(x=>isGameRuntimeSource(x.file));
inv.uiActions=filterGrouped(inv.uiActions,isGameRuntimeSource);
inv.events=filterGrouped(inv.events,isGameRuntimeSource);
inv.movement=(inv.movement||[]).filter(x=>isGameRuntimeSource(x.file));
inv.assets=(inv.assets||[]).filter(x=>isGameRuntimeSource(x.file));
inv.environment=(inv.environment||[]).filter(x=>isGameRuntimeSource(x.file));

inv.functions.sort((a,b)=>a.file.localeCompare(b.file)||a.line-b.line||a.name.localeCompare(b.name));
inv.functions.forEach((f,i)=>f.id='FUNC-'+String(i+1).padStart(5,'0'));
inv.routes.forEach((x,i)=>x.id='API-'+String(i+1).padStart(5,'0'));
inv.models.forEach((x,i)=>x.id='AI-'+String(i+1).padStart(5,'0'));
inv.collections.forEach((x,i)=>x.id='DB-'+String(i+1).padStart(5,'0'));
inv.storage.forEach((x,i)=>x.id='STORE-'+String(i+1).padStart(5,'0'));
inv.uiActions.forEach((x,i)=>x.id='UI-'+String(i+1).padStart(5,'0'));
inv.events.forEach((x,i)=>x.id='EVENT-'+String(i+1).padStart(5,'0'));
inv.movement.forEach((x,i)=>x.id='MOVE-'+String(i+1).padStart(5,'0'));
inv.assets.forEach((x,i)=>x.id='ASSETREF-'+String(i+1).padStart(5,'0'));
inv.environment.forEach((x,i)=>x.id='ENV-'+String(i+1).padStart(5,'0'));

const assetByPath=new Map();
for(const a of inv.assets){
  if(!assetByPath.has(a.value))assetByPath.set(a.value,{value:a.value,exists:a.exists!==false,sources:[]});
  const r=assetByPath.get(a.value);
  r.exists=r.exists&&(a.exists!==false);
  r.sources.push({file:a.file,line:a.line});
}
const assetReferences=[...assetByPath.values()].sort((a,b)=>a.value.localeCompare(b.value));
const functionDomains={
  gameRuntime:inv.functions.filter(f=>f.domain==='game-runtime').length,
  tooling:inv.functions.filter(f=>f.domain==='tooling').length,
  otherSource:inv.functions.filter(f=>f.domain==='other-source').length
};

inv.counts={
  ...inv.counts,
  functions:inv.functions.length,
  gameRuntimeFunctions:functionDomains.gameRuntime,
  toolingFunctions:functionDomains.tooling,
  routes:inv.routes.length,
  models:inv.models.length,
  collections:inv.collections.length,
  storageOccurrences:inv.storage.length,
  uiActions:inv.uiActions.length,
  events:inv.events.length,
  movementEvidence:inv.movement.length,
  assetReferences:inv.assets.length,
  uniqueAssetReferences:assetReferences.length,
  missingLiteralAssetReferences:assetReferences.filter(x=>!x.exists).length,
  sourceFiles:(inv.files||[]).filter(f=>isSource(f.path)).length,
  gameRuntimeSourceFiles:(inv.files||[]).filter(f=>isGameRuntimeSource(f.path)).length,
  toolingSourceFiles:(inv.files||[]).filter(f=>isTooling(f.path)&&hasSourceExt(f.path)).length
};

inv.refinement={
  mode:'runtime-semantics-plus-tooling-functions',
  semanticDiscovery:'game-runtime-only',
  functionDiscovery:'all-source-except-docs',
  sourceExtensions:[...SOURCE_EXT],
  excludedDocumentation:true,
  excludedToolingFromGameSemantics:true,
  functionDomains,
  before,
  after:{
    functions:inv.functions.length,
    routes:inv.routes.length,
    models:inv.models.length,
    collections:inv.collections.length,
    storage:inv.storage.length,
    uiActions:inv.uiActions.length,
    events:inv.events.length,
    movement:inv.movement.length,
    assets:inv.assets.length,
    environment:inv.environment.length
  }
};
fs.writeFileSync(INV,JSON.stringify(inv,null,2)+'\n');

let lines=[
  header('INVENTÁRIO TÉCNICO — NARUTO SHINOBI NO SHO','Funções são inventariadas em toda fonte não documental; semântica do jogo (IA/API/DB/UI/movimento/assets/env) é extraída somente do runtime, excluindo docs, ferramentas e workflows.'),
  '## Totais','',
  '| Item | Total |','|---|---:|'
];
for(const [k,v] of Object.entries(inv.counts||{}))lines.push('| '+k+' | '+v+' |');
lines.push('',
  '- Descoberta semântica: '+code('game-runtime-only')+'.',
  '- Funções: '+code('all-source-except-docs')+' com domínio por entrada.',
  '- Documentação excluída da descoberta: **SIM**.',
  '- Ferramentas excluídas da semântica de jogo: **SIM**.',
  '- Status dos itens: '+code('STATICALLY_TRACED')+'.');
fs.writeFileSync(path.join(OUT,'00-INVENTORY-SUMMARY.md'),lines.join('\n')+'\n');

lines=[header('FUNÇÕES E MÉTODOS','Todas as funções/métodos detectados em fonte não documental. Cada entrada informa se pertence ao runtime do jogo ou ao tooling.')];
for(const f of inv.functions){
  lines.push('## '+f.id+' — '+code(f.name),'',
    '- **Fonte:** '+code(f.file+':'+f.line),
    '- **Domínio:** '+code(f.domain),
    '- **Forma:** '+f.kind,
    '- **Parâmetros:** '+code(clean(f.params)||'(nenhum explícito)'),
    '- **Chamadas internas detectadas:** '+listCodes(f.calls),
    '- **Rotas referidas:** '+listCodes(f.refs?.routes),
    '- **Coleções MongoDB:** '+listCodes(f.refs?.collections),
    '- **Modelos IA:** '+listCodes(f.refs?.models),
    '- **DOM IDs:** '+listCodes(f.refs?.domIds),
    '- **Storage keys:** '+listCodes(f.refs?.storageKeys),
    '- **Env:** '+listCodes(f.refs?.env),
    '- **Ações UI literais:** '+listCodes(f.refs?.actions),
    '- **Status:** '+code('STATICALLY_TRACED'),'');
}
fs.writeFileSync(path.join(OUT,'01-FUNCTIONS.md'),lines.join('\n')+'\n');

lines=[header('API E ROTAS','Rotas /api encontradas somente no runtime do jogo; docs e tooling são excluídos.')];
for(const r of inv.routes)lines.push('## '+r.id+' — '+code(r.route),'','- **Referências:** '+srcs(r.sources),'- **Status:** '+code('STATICALLY_TRACED'),'');
fs.writeFileSync(path.join(OUT,'02-API.md'),lines.join('\n')+'\n');

lines=[header('IA — MODELOS','Modelos @cf encontrados somente no runtime do jogo. Strings presentes em docs/auditores não contam como modelo.')];
for(const a of inv.models)lines.push('## '+a.id+' — '+code(a.model),'','- **Fontes:** '+srcs(a.sources),'- **Status:** '+code('STATICALLY_TRACED'),'');
fs.writeFileSync(path.join(OUT,'03-AI.md'),lines.join('\n')+'\n');

lines=[header('PERSISTÊNCIA','Coleções MongoDB e storage do navegador detectados somente no runtime do jogo.'),'## Coleções MongoDB',''];
for(const c of inv.collections)lines.push('- **'+c.id+'** '+code(c.name)+' — '+srcs(c.sources));
lines.push('','## localStorage / sessionStorage','','| ID | Escopo | Operação | Chave | Fonte |','|---|---|---|---|---|');
for(const s of inv.storage)lines.push('| '+s.id+' | '+s.scope+' | '+s.operation+' | '+code(s.value)+' | '+code(s.file+':'+s.line)+' |');
fs.writeFileSync(path.join(OUT,'04-PERSISTENCE.md'),lines.join('\n')+'\n');

lines=[header('INTERAÇÕES DE UI E EVENTOS','Ações e eventos detectados somente no runtime do jogo.'),'## Ações',''];
for(const a of inv.uiActions)lines.push('- **'+a.id+'** '+code(a.value)+' — '+srcs(a.sources));
lines.push('','## Eventos','');
for(const e of inv.events)lines.push('- **'+e.id+'** '+code(e.value)+' — '+srcs(e.sources));
fs.writeFileSync(path.join(OUT,'05-UI-INTERACTIONS.md'),lines.join('\n')+'\n');

lines=[header('SCRIPTS E ORDEM DE CARREGAMENTO','Ordem real das tags script do index e inventário de fonte/tooling com SHA-256.'),'| Ordem | Script | Existe | Linha |','|---:|---|---|---:|'];
for(const s of inv.scripts||[])lines.push('| '+s.order+' | '+code(s.local)+' | '+(s.exists?'SIM':'NÃO')+' | '+s.line+' |');
lines.push('','## Fonte/configuração/tooling','');
for(const f of (inv.files||[]).filter(x=>isSource(x.path)))lines.push('- '+code(f.path)+' — domínio '+code(domainOf(f.path))+' — '+f.size+' bytes — SHA-256 '+code(f.sha256));
fs.writeFileSync(path.join(OUT,'06-SCRIPTS.md'),lines.join('\n')+'\n');

lines=[header('AÇÕES, MOVIMENTO, MAPA E POSIÇÃO','Evidências retiradas somente do runtime do jogo. Não inclui documentação nem scripts de auditoria.')];
for(const x of inv.movement)lines.push('- **'+x.id+'** '+code(x.file+':'+x.line)+' — '+clean(x.text));
fs.writeFileSync(path.join(OUT,'07-MOVEMENT-ACTIONS.md'),lines.join('\n')+'\n');

lines=[header('RASTREABILIDADE GERADA','Cada item aponta para evidência concreta; funções informam domínio, semântica do jogo vem apenas do runtime.'),'| ID | Tipo | Elemento | Evidência | Domínio/Status |','|---|---|---|---|---|'];
for(const f of inv.functions)lines.push('| '+f.id+' | função | '+code(f.name)+' | '+code(f.file+':'+f.line)+' | '+f.domain+' / STATICALLY_TRACED |');
for(const r of inv.routes)lines.push('| '+r.id+' | API | '+code(r.route)+' | '+srcs(r.sources)+' | game-runtime / STATICALLY_TRACED |');
for(const a of inv.models)lines.push('| '+a.id+' | IA | '+code(a.model)+' | '+srcs(a.sources)+' | game-runtime / STATICALLY_TRACED |');
for(const c of inv.collections)lines.push('| '+c.id+' | persistência | '+code(c.name)+' | '+srcs(c.sources)+' | game-runtime / STATICALLY_TRACED |');
for(const a of inv.uiActions)lines.push('| '+a.id+' | UI | '+code(a.value)+' | '+srcs(a.sources)+' | game-runtime / STATICALLY_TRACED |');
fs.writeFileSync(path.join(OUT,'08-TRACEABILITY.md'),lines.join('\n')+'\n');

lines=[header('REFERÊNCIAS DE ASSETS','Referências literais encontradas somente no runtime do jogo. A existência do caminho não prova adequação semântica da imagem.'),'## Ausentes',''];
const missing=assetReferences.filter(x=>!x.exists);
if(!missing.length)lines.push('Nenhuma referência literal ausente.');
for(const a of missing)lines.push('- '+code(a.value)+' — '+srcs(a.sources));
lines.push('','## Todas as referências únicas','');
for(const a of assetReferences)lines.push('- '+(a.exists?'PASS_PATH':'MISSING_PATH')+' '+code(a.value)+' — '+srcs(a.sources));
fs.writeFileSync(path.join(OUT,'10-ASSET-REFERENCES.md'),lines.join('\n')+'\n');

console.log(JSON.stringify({
  ok:true,
  semanticDiscovery:'game-runtime-only',
  functionDiscovery:'all-source-except-docs',
  before,
  after:inv.refinement.after,
  functionDomains,
  counts:inv.counts,
  models:inv.models.map(x=>x.model),
  missingAssetPaths:missing.length
},null,2));
