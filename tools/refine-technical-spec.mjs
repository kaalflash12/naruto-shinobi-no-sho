import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'docs','generated');
const INV=path.join(OUT,'TECHNICAL-INVENTORY.json');
const SOURCE_EXT=new Set(['.js','.mjs','.cjs','.html','.json','.toml','.css','.ps1','.yml','.yaml']);
const NON_FUNCTION=new Set(['if','for','while','switch','catch','with','return','throw','else','do','try','finally']);

if(!fs.existsSync(INV))throw new Error('TECHNICAL-INVENTORY.json ausente');
const inv=JSON.parse(fs.readFileSync(INV,'utf8'));
const sourceFile=file=>SOURCE_EXT.has(path.extname(String(file||'')).toLowerCase())&&!String(file||'').startsWith('docs/');
const code=s=>'`'+String(s??'').replace(/`/g,'\\`')+'`';
const clean=s=>String(s??'').replace(/\|/g,'\\|').replace(/\r?\n/g,' ').trim();
const srcs=a=>(a||[]).map(x=>code(x.file+':'+x.line)).join(', ');
const listCodes=a=>a?.length?a.map(code).join(', '):'—';
const header=(title,desc)=>['# '+title,'',desc,'','Gerado em: '+code(inv.generatedAt),''].join('\n');

function filterGrouped(items){
  const out=[];
  for(const item of items||[]){
    const sources=(item.sources||[]).filter(s=>sourceFile(s.file));
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

inv.functions=(inv.functions||[]).filter(f=>sourceFile(f.file)&&!NON_FUNCTION.has(String(f.name||'')));
inv.routes=filterGrouped(inv.routes);
inv.models=filterGrouped(inv.models);
inv.collections=filterGrouped(inv.collections);
inv.storage=(inv.storage||[]).filter(x=>sourceFile(x.file));
inv.uiActions=filterGrouped(inv.uiActions);
inv.events=filterGrouped(inv.events);
inv.movement=(inv.movement||[]).filter(x=>sourceFile(x.file));
inv.assets=(inv.assets||[]).filter(x=>sourceFile(x.file));
inv.environment=(inv.environment||[]).filter(x=>sourceFile(x.file));

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
  const r=assetByPath.get(a.value);r.exists=r.exists&&(a.exists!==false);r.sources.push({file:a.file,line:a.line});
}
const assetReferences=[...assetByPath.values()].sort((a,b)=>a.value.localeCompare(b.value));

inv.counts={
  ...inv.counts,
  functions:inv.functions.length,
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
  sourceFiles:(inv.files||[]).filter(f=>sourceFile(f.path)).length
};
inv.refinement={
  mode:'source-runtime-only',
  sourceExtensions:[...SOURCE_EXT],
  excludedDocumentation:true,
  before,
  after:{functions:inv.functions.length,routes:inv.routes.length,models:inv.models.length,collections:inv.collections.length,storage:inv.storage.length,uiActions:inv.uiActions.length,events:inv.events.length,movement:inv.movement.length,assets:inv.assets.length,environment:inv.environment.length}
};
fs.writeFileSync(INV,JSON.stringify(inv,null,2)+'\n');

let lines=[header('INVENTÁRIO TÉCNICO — NARUTO SHINOBI NO SHO','Inventário refinado para fonte/runtime. Documentação Markdown não participa da descoberta de funções, rotas, IA, persistência, UI ou movimento.'),'## Totais','','| Item | Total |','|---|---:|'];
for(const [k,v] of Object.entries(inv.counts||{}))lines.push('| '+k+' | '+v+' |');
lines.push('','Modo: '+code('source-runtime-only')+'.','Status dos itens: '+code('STATICALLY_TRACED')+'.');
fs.writeFileSync(path.join(OUT,'00-INVENTORY-SUMMARY.md'),lines.join('\n')+'\n');

lines=[header('FUNÇÕES E MÉTODOS','Funções/métodos detectados somente em arquivos de fonte/configuração executável.')];
for(const f of inv.functions){
  lines.push('## '+f.id+' — '+code(f.name),'',
    '- **Fonte:** '+code(f.file+':'+f.line),
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

lines=[header('API E ROTAS','Rotas /api encontradas somente em fonte/runtime.')];
for(const r of inv.routes)lines.push('## '+r.id+' — '+code(r.route),'','- **Referências:** '+srcs(r.sources),'- **Status:** '+code('STATICALLY_TRACED'),'');
fs.writeFileSync(path.join(OUT,'02-API.md'),lines.join('\n')+'\n');

lines=[header('IA — MODELOS','Modelos @cf encontrados somente em fonte/runtime; textos de documentação são excluídos.')];
for(const a of inv.models)lines.push('## '+a.id+' — '+code(a.model),'','- **Fontes:** '+srcs(a.sources),'- **Status:** '+code('STATICALLY_TRACED'),'');
fs.writeFileSync(path.join(OUT,'03-AI.md'),lines.join('\n')+'\n');

lines=[header('PERSISTÊNCIA','Coleções MongoDB e storage do navegador detectados em fonte/runtime.'),'## Coleções MongoDB',''];
for(const c of inv.collections)lines.push('- **'+c.id+'** '+code(c.name)+' — '+srcs(c.sources));
lines.push('','## localStorage / sessionStorage','','| ID | Escopo | Operação | Chave | Fonte |','|---|---|---|---|---|');
for(const s of inv.storage)lines.push('| '+s.id+' | '+s.scope+' | '+s.operation+' | '+code(s.value)+' | '+code(s.file+':'+s.line)+' |');
fs.writeFileSync(path.join(OUT,'04-PERSISTENCE.md'),lines.join('\n')+'\n');

lines=[header('INTERAÇÕES DE UI E EVENTOS','Ações e eventos detectados somente em fonte/runtime.'),'## Ações',''];
for(const a of inv.uiActions)lines.push('- **'+a.id+'** '+code(a.value)+' — '+srcs(a.sources));
lines.push('','## Eventos','');for(const e of inv.events)lines.push('- **'+e.id+'** '+code(e.value)+' — '+srcs(e.sources));
fs.writeFileSync(path.join(OUT,'05-UI-INTERACTIONS.md'),lines.join('\n')+'\n');

lines=[header('SCRIPTS E ORDEM DE CARREGAMENTO','Ordem real das tags script de index.html e hashes dos arquivos de runtime/configuração.'),'| Ordem | Script | Existe | Linha |','|---:|---|---|---:|'];
for(const s of inv.scripts||[])lines.push('| '+s.order+' | '+code(s.local)+' | '+(s.exists?'SIM':'NÃO')+' | '+s.line+' |');
lines.push('','## Arquivos de runtime/configuração','');
for(const f of (inv.files||[]).filter(x=>x.runtime&&sourceFile(x.path)))lines.push('- '+code(f.path)+' — '+f.size+' bytes — SHA-256 '+code(f.sha256));
fs.writeFileSync(path.join(OUT,'06-SCRIPTS.md'),lines.join('\n')+'\n');

lines=[header('AÇÕES, MOVIMENTO, MAPA E POSIÇÃO','Evidências retiradas somente de fonte/runtime. Não inclui descrições deste manual.')];
for(const x of inv.movement)lines.push('- **'+x.id+'** '+code(x.file+':'+x.line)+' — '+clean(x.text));
fs.writeFileSync(path.join(OUT,'07-MOVEMENT-ACTIONS.md'),lines.join('\n')+'\n');

lines=[header('RASTREABILIDADE GERADA','Cada item descoberto em fonte/runtime aponta para evidência concreta.'),'| ID | Tipo | Elemento | Evidência | Status |','|---|---|---|---|---|'];
for(const f of inv.functions)lines.push('| '+f.id+' | função | '+code(f.name)+' | '+code(f.file+':'+f.line)+' | STATICALLY_TRACED |');
for(const r of inv.routes)lines.push('| '+r.id+' | API | '+code(r.route)+' | '+srcs(r.sources)+' | STATICALLY_TRACED |');
for(const a of inv.models)lines.push('| '+a.id+' | IA | '+code(a.model)+' | '+srcs(a.sources)+' | STATICALLY_TRACED |');
for(const c of inv.collections)lines.push('| '+c.id+' | persistência | '+code(c.name)+' | '+srcs(c.sources)+' | STATICALLY_TRACED |');
for(const a of inv.uiActions)lines.push('| '+a.id+' | UI | '+code(a.value)+' | '+srcs(a.sources)+' | STATICALLY_TRACED |');
fs.writeFileSync(path.join(OUT,'08-TRACEABILITY.md'),lines.join('\n')+'\n');

lines=[header('REFERÊNCIAS DE ASSETS','Referências literais de assets encontradas em fonte/runtime. Ausência aqui é evidência de caminho não materializado, não é automaticamente tratada como asset semanticamente correto.'),'## Ausentes',''];
const missing=assetReferences.filter(x=>!x.exists);
if(!missing.length)lines.push('Nenhuma referência literal ausente.');
for(const a of missing)lines.push('- '+code(a.value)+' — '+srcs(a.sources));
lines.push('','## Todas as referências únicas','');
for(const a of assetReferences)lines.push('- '+(a.exists?'PASS_PATH':'MISSING_PATH')+' '+code(a.value)+' — '+srcs(a.sources));
fs.writeFileSync(path.join(OUT,'10-ASSET-REFERENCES.md'),lines.join('\n')+'\n');

console.log(JSON.stringify({ok:true,mode:'source-runtime-only',before,after:inv.refinement.after,counts:inv.counts,missingAssetPaths:missing.length},null,2));
