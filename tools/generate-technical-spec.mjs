import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'docs','generated');
const SKIP=new Set(['.git','node_modules']);
const TEXT_EXT=new Set(['.js','.mjs','.cjs','.html','.json','.toml','.md','.txt','.css','.ps1','.yml','.yaml']);
const RUNTIME_EXT=new Set(['.js','.mjs','.cjs','.html','.json','.toml','.ps1']);
const NON_FUNCTION=new Set(['if','for','while','switch','catch','with','return','throw','else','do','try','finally']);
const MAX_TEXT=12*1024*1024;

const px=p=>p.split(path.sep).join('/');
const rel=p=>px(path.relative(ROOT,p));
const code=s=>'`'+String(s??'').replace(/`/g,'\\`')+'`';
const clean=s=>String(s??'').replace(/\|/g,'\\|').replace(/\r?\n/g,' ').trim();
const uniq=a=>[...new Set(a.filter(Boolean))];
const ident=(prefix,n)=>prefix+'-'+String(n).padStart(5,'0');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');

function walk(dir=ROOT,out=[]){
  for(const ent of fs.readdirSync(dir,{withFileTypes:true})){
    const full=path.join(dir,ent.name),r=rel(full);
    if(ent.isDirectory()){
      if(SKIP.has(ent.name)||r==='docs/generated')continue;
      walk(full,out);
    }else out.push(full);
  }
  return out;
}

function lineLocator(text){
  const starts=[0];
  for(let i=0;i<text.length;i++)if(text.charCodeAt(i)===10)starts.push(i+1);
  return idx=>{
    let lo=0,hi=starts.length-1;
    while(lo<=hi){const mid=(lo+hi)>>1;if(starts[mid]<=idx)lo=mid+1;else hi=mid-1;}
    return hi+1;
  };
}

function readText(file){
  const st=fs.statSync(file),ext=path.extname(file).toLowerCase();
  if(st.size>MAX_TEXT||!TEXT_EXT.has(ext))return null;
  return fs.readFileSync(file,'utf8');
}

function blockEnd(text,open){
  let depth=0,quote='',lineComment=false,blockComment=false,escape=false;
  for(let i=open;i<text.length;i++){
    const c=text[i],n=text[i+1];
    if(lineComment){if(c==='\n')lineComment=false;continue;}
    if(blockComment){if(c==='*'&&n==='/'){blockComment=false;i++;}continue;}
    if(quote){
      if(escape){escape=false;continue;}
      if(c==='\\'){escape=true;continue;}
      if(c===quote)quote='';
      continue;
    }
    if(c==='/'&&n==='/'){lineComment=true;i++;continue;}
    if(c==='/'&&n==='*'){blockComment=true;i++;continue;}
    if(c==='"'||c==="'"||c==='`'){quote=c;continue;}
    if(c==='{')depth++;
    else if(c==='}'){depth--;if(depth===0)return i;}
  }
  return text.length-1;
}

function bodyAt(text,start){
  const open=text.indexOf('{',start);
  if(open<0||open-start>1000)return '';
  return text.slice(open,blockEnd(text,open)+1);
}

function captures(text,re,group=1){
  const out=[];let m;re.lastIndex=0;
  while((m=re.exec(text)))out.push(m[group]);
  return uniq(out);
}

function refs(text){
  return {
    routes:captures(text,/["'`]((?:\/api\/)[A-Za-z0-9_./:-]+)["'`]/g),
    collections:captures(text,/\.collection\(\s*["'`]([^"'`]+)["'`]\s*\)/g),
    models:captures(text,/["'`](@cf\/[A-Za-z0-9_.\-/]+)["'`]/g),
    storageKeys:captures(text,/(?:localStorage|sessionStorage)\.(?:getItem|setItem|removeItem)\(\s*["'`]([^"'`]+)["'`]/g),
    env:captures(text,/\benv\.([A-Z][A-Z0-9_]*)\b/g),
    domIds:uniq([
      ...captures(text,/getElementById\(\s*["'`]([^"'`]+)["'`]\s*\)/g),
      ...captures(text,/querySelector\(\s*["'`]#([^"'`\s>+~.\[]+)["'`]\s*\)/g)
    ]),
    actions:uniq([
      ...captures(text,/data-action=["']([^"']+)["']/g),
      ...captures(text,/data-go=["']([^"']+)["']/g)
    ])
  };
}

function extractFunctions(file,text,lineAt){
  const patterns=[
    {kind:'declaration',re:/(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(([^)]*)\)/gm,name:1,params:2},
    {kind:'arrow',re:/(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?\(([^)]*)\)\s*=>/gm,name:1,params:2},
    {kind:'arrow-one',re:/(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?([A-Za-z_$][\w$]*)\s*=>/gm,name:1,params:2},
    {kind:'function-expression',re:/(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?function(?:\s+[A-Za-z_$][\w$]*)?\s*\(([^)]*)\)/gm,name:1,params:2},
    {kind:'method',re:/^\s{0,12}(?:async\s+)?([A-Za-z_$][\w$]*)\s*\(([^)]*)\)\s*\{/gm,name:1,params:2}
  ];
  const out=[],seen=new Set();
  for(const p of patterns){
    let m;p.re.lastIndex=0;
    while((m=p.re.exec(text))){
      const name=m[p.name];
      if(NON_FUNCTION.has(name))continue;
      const key=m.index+':'+name;
      if(seen.has(key))continue;
      seen.add(key);
      const body=bodyAt(text,m.index);
      out.push({file,line:lineAt(m.index),name,kind:p.kind,params:clean(m[p.params]),body,refs:refs(body)});
    }
  }
  return out;
}

const absolute=walk();
const files=[];
const texts=new Map();
const lineAtByFile=new Map();
for(const f of absolute){
  const r=rel(f),buf=fs.readFileSync(f),ext=path.extname(f).toLowerCase();
  files.push({path:r,size:buf.length,sha256:hash(buf),extension:ext,runtime:RUNTIME_EXT.has(ext),asset:r.startsWith('assets/')});
  const text=readText(f);
  if(text!==null){texts.set(r,text);lineAtByFile.set(r,lineLocator(text));}
}
files.sort((a,b)=>a.path.localeCompare(b.path));

let functions=[];
for(const [file,text] of texts){if(/\.(?:m?js|cjs)$/.test(file))functions.push(...extractFunctions(file,text,lineAtByFile.get(file)));}
functions.sort((a,b)=>a.file.localeCompare(b.file)||a.line-b.line||a.name.localeCompare(b.name));
const knownNames=new Set(functions.map(f=>f.name));
for(const f of functions){
  const callNames=[];let m;const re=/\b([A-Za-z_$][\w$]*)\s*\(/g;
  while((m=re.exec(f.body)))if(knownNames.has(m[1])&&m[1]!==f.name)callNames.push(m[1]);
  f.calls=uniq(callNames);delete f.body;
}
functions.forEach((f,i)=>f.id=ident('FUNC',i+1));

const occ={routes:[],models:[],collections:[],storage:[],ui:[],events:[],movement:[],assets:[],env:[]};
for(const [file,text] of texts){
  const lineAt=lineAtByFile.get(file);
  const add=(bucket,re,map)=>{let m;re.lastIndex=0;while((m=re.exec(text)))bucket.push(map(m,lineAt(m.index)));};
  add(occ.routes,/["'`]((?:\/api\/)[A-Za-z0-9_./:-]+)["'`]/g,(m,line)=>({file,line,value:m[1]}));
  add(occ.models,/["'`](@cf\/[A-Za-z0-9_.\-/]+)["'`]/g,(m,line)=>({file,line,value:m[1]}));
  add(occ.collections,/\.collection\(\s*["'`]([^"'`]+)["'`]\s*\)/g,(m,line)=>({file,line,value:m[1]}));
  add(occ.storage,/(localStorage|sessionStorage)\.(getItem|setItem|removeItem)\(\s*["'`]([^"'`]+)["'`]/g,(m,line)=>({file,line,scope:m[1],operation:m[2],value:m[3]}));
  add(occ.ui,/data-(action|go)=["']([^"']+)["']/g,(m,line)=>({file,line,kind:m[1],value:m[2]}));
  add(occ.events,/\.addEventListener\(\s*["'`]([^"'`]+)["'`]/g,(m,line)=>({file,line,value:m[1]}));
  add(occ.assets,/["'`]((?:assets\/)[^"'`?#]+)["'`]/g,(m,line)=>({file,line,value:m[1]}));
  add(occ.env,/\benv\.([A-Z][A-Z0-9_]*)\b/g,(m,line)=>({file,line,value:m[1]}));
  text.split(/\r?\n/).forEach((ln,i)=>{
    if(/\b(move|movement|travel|location|position|map|route|distance|range|alcance|desloc|mover|movimento|viajar|localiza|posi[cç][aã]o)\b/i.test(ln))occ.movement.push({file,line:i+1,text:clean(ln).slice(0,500)});
  });
}

function grouped(list,prefix){
  const map=new Map();
  for(const x of list){if(!map.has(x.value))map.set(x.value,[]);map.get(x.value).push({file:x.file,line:x.line,...(x.kind?{kind:x.kind}:{})});}
  return [...map.entries()].sort((a,b)=>a[0].localeCompare(b[0])).map(([value,sources],i)=>({id:ident(prefix,i+1),value,sources}));
}
const routes=grouped(occ.routes,'API').map(x=>({id:x.id,route:x.value,sources:x.sources}));
const models=grouped(occ.models,'AI').map(x=>({id:x.id,model:x.value,sources:x.sources}));
const collections=grouped(occ.collections,'DB').map(x=>({id:x.id,name:x.value,sources:x.sources}));
const uiActions=grouped(occ.ui,'UI');
const events=grouped(occ.events,'EVENT');
occ.storage.forEach((x,i)=>x.id=ident('STORE',i+1));
occ.movement.forEach((x,i)=>x.id=ident('MOVE',i+1));
occ.assets.forEach((x,i)=>x.id=ident('ASSETREF',i+1));
occ.env.forEach((x,i)=>x.id=ident('ENV',i+1));

const index=texts.get('index.html')||'';
const indexLine=lineAtByFile.get('index.html')||(()=>1);
const scripts=[];let sm;const sr=/<script\s+[^>]*src=["']([^"']+)["'][^>]*><\/script>/gi;
while((sm=sr.exec(index))){
  const src=sm[1],local=src.split('?')[0];
  scripts.push({id:ident('SCRIPT',scripts.length+1),order:scripts.length+1,src,local,exists:fs.existsSync(path.join(ROOT,local)),line:indexLine(sm.index)});
}

const assetFiles=new Set(files.filter(f=>f.asset).map(f=>f.path));
const assetRefs=occ.assets.map(x=>({...x,exists:assetFiles.has(x.value)}));

const inventory={
  generatedAt:new Date().toISOString(),
  repository:'kaalflash12/naruto-shinobi-no-sho',
  methodology:{type:'static-source-inventory',rule:'Nao inferir comportamento ausente. Rastrear elementos detectados ate arquivo e linha.'},
  counts:{
    files:files.length,
    runtimeFiles:files.filter(f=>f.runtime).length,
    assetFiles:files.filter(f=>f.asset).length,
    textFiles:texts.size,
    functions:functions.length,
    routes:routes.length,
    models:models.length,
    collections:collections.length,
    storageOccurrences:occ.storage.length,
    uiActions:uiActions.length,
    events:events.length,
    movementEvidence:occ.movement.length,
    scriptTags:scripts.length,
    assetReferences:assetRefs.length,
    missingLiteralAssetReferences:assetRefs.filter(x=>!x.exists).length
  },
  files,functions,routes,models,collections,storage:occ.storage,uiActions,events,movement:occ.movement,scripts,assets:assetRefs,environment:occ.env
};

fs.mkdirSync(OUT,{recursive:true});
fs.writeFileSync(path.join(OUT,'TECHNICAL-INVENTORY.json'),JSON.stringify(inventory,null,2)+'\n');

function header(title,desc){return ['# '+title,'',desc,'','Gerado em: '+code(inventory.generatedAt),''].join('\n');}
function sources(a){return a.map(x=>code(x.file+':'+x.line)).join(', ');}
function listCodes(a){return a?.length?a.map(code).join(', '):'—';}

let lines=[header('INVENTÁRIO TÉCNICO — NARUTO SHINOBI NO SHO','Gerado diretamente do código. Cobertura estática não equivale a teste de execução.'),'## Totais','','| Item | Total |','|---|---:|'];
for(const [k,v] of Object.entries(inventory.counts))lines.push('| '+k+' | '+v+' |');
lines.push('','Status dos itens: '+code('STATICALLY_TRACED')+'.');
fs.writeFileSync(path.join(OUT,'00-INVENTORY-SUMMARY.md'),lines.join('\n')+'\n');

lines=[header('FUNÇÕES E MÉTODOS','Lista de funções/métodos detectados, com evidências observáveis no corpo localizado.')];
for(const f of functions){
  lines.push('## '+f.id+' — '+code(f.name),'',
    '- **Fonte:** '+code(f.file+':'+f.line),
    '- **Forma:** '+f.kind,
    '- **Parâmetros:** '+code(f.params||'(nenhum explícito)'),
    '- **Chamadas internas detectadas:** '+listCodes(f.calls),
    '- **Rotas referidas:** '+listCodes(f.refs.routes),
    '- **Coleções MongoDB:** '+listCodes(f.refs.collections),
    '- **Modelos IA:** '+listCodes(f.refs.models),
    '- **DOM IDs:** '+listCodes(f.refs.domIds),
    '- **Storage keys:** '+listCodes(f.refs.storageKeys),
    '- **Env:** '+listCodes(f.refs.env),
    '- **Ações UI literais:** '+listCodes(f.refs.actions),
    '- **Status:** '+code('STATICALLY_TRACED'),'');
}
fs.writeFileSync(path.join(OUT,'01-FUNCTIONS.md'),lines.join('\n')+'\n');

lines=[header('API E ROTAS','Rotas /api literais encontradas em todo o código.')];
for(const r of routes)lines.push('## '+r.id+' — '+code(r.route),'','- **Referências:** '+sources(r.sources),'- **Status:** '+code('STATICALLY_TRACED'),'');
fs.writeFileSync(path.join(OUT,'02-API.md'),lines.join('\n')+'\n');

lines=[header('IA — MODELOS','Identificadores de modelo @cf encontrados literalmente no código.')];
for(const a of models)lines.push('## '+a.id+' — '+code(a.model),'','- **Fontes:** '+sources(a.sources),'- **Status:** '+code('STATICALLY_TRACED'),'');
fs.writeFileSync(path.join(OUT,'03-AI.md'),lines.join('\n')+'\n');

lines=[header('PERSISTÊNCIA','Coleções MongoDB e chaves de localStorage/sessionStorage detectadas.'),'## Coleções MongoDB',''];
for(const c of collections)lines.push('- **'+c.id+'** '+code(c.name)+' — '+sources(c.sources));
lines.push('','## Storage do navegador','','| ID | Escopo | Operação | Chave | Fonte |','|---|---|---|---|---|');
for(const s of occ.storage)lines.push('| '+s.id+' | '+s.scope+' | '+s.operation+' | '+code(s.value)+' | '+code(s.file+':'+s.line)+' |');
fs.writeFileSync(path.join(OUT,'04-PERSISTENCE.md'),lines.join('\n')+'\n');

lines=[header('INTERAÇÕES DE UI E EVENTOS','Ações data-action/data-go e listeners literais detectados.'),'## Ações',''];
for(const a of uiActions)lines.push('- **'+a.id+'** '+code(a.value)+' — '+sources(a.sources));
lines.push('','## Eventos','');for(const e of events)lines.push('- **'+e.id+'** '+code(e.value)+' — '+sources(e.sources));
fs.writeFileSync(path.join(OUT,'05-UI-INTERACTIONS.md'),lines.join('\n')+'\n');

lines=[header('SCRIPTS E ORDEM DE CARREGAMENTO','Ordem real das tags script de index.html e hashes dos arquivos de runtime.'),'| Ordem | Script | Existe | Linha |','|---:|---|---|---:|'];
for(const s of scripts)lines.push('| '+s.order+' | '+code(s.local)+' | '+(s.exists?'SIM':'NÃO')+' | '+s.line+' |');
lines.push('','## Arquivos de runtime/configuração','');
for(const f of files.filter(x=>x.runtime))lines.push('- '+code(f.path)+' — '+f.size+' bytes — SHA-256 '+code(f.sha256));
fs.writeFileSync(path.join(OUT,'06-SCRIPTS.md'),lines.join('\n')+'\n');

lines=[header('AÇÕES, MOVIMENTO, MAPA E POSIÇÃO','Índice amplo de evidências de movimento/localização/mapa. Não inventa custo, distância ou regra.')];
for(const x of occ.movement)lines.push('- **'+x.id+'** '+code(x.file+':'+x.line)+' — '+clean(x.text));
fs.writeFileSync(path.join(OUT,'07-MOVEMENT-ACTIONS.md'),lines.join('\n')+'\n');

lines=[header('RASTREABILIDADE GERADA','Cada item descoberto aponta para evidência concreta.'),'| ID | Tipo | Elemento | Evidência | Status |','|---|---|---|---|---|'];
for(const f of functions)lines.push('| '+f.id+' | função | '+code(f.name)+' | '+code(f.file+':'+f.line)+' | STATICALLY_TRACED |');
for(const r of routes)lines.push('| '+r.id+' | API | '+code(r.route)+' | '+sources(r.sources)+' | STATICALLY_TRACED |');
for(const a of models)lines.push('| '+a.id+' | IA | '+code(a.model)+' | '+sources(a.sources)+' | STATICALLY_TRACED |');
for(const c of collections)lines.push('| '+c.id+' | persistência | '+code(c.name)+' | '+sources(c.sources)+' | STATICALLY_TRACED |');
for(const a of uiActions)lines.push('| '+a.id+' | UI | '+code(a.value)+' | '+sources(a.sources)+' | STATICALLY_TRACED |');
fs.writeFileSync(path.join(OUT,'08-TRACEABILITY.md'),lines.join('\n')+'\n');

console.log(JSON.stringify({ok:true,counts:inventory.counts},null,2));
