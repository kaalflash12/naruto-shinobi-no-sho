import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'docs', 'generated');
const SKIP_DIRS = new Set(['.git', 'node_modules', 'docs/generated']);
const TEXT_EXT = new Set(['.js','.mjs','.cjs','.html','.json','.toml','.md','.txt','.css','.ps1','.yml','.yaml']);
const RUNTIME_EXT = new Set(['.js','.mjs','.cjs','.html','.json','.toml','.ps1']);
const MAX_READ = 12 * 1024 * 1024;

function posix(p){ return p.split(path.sep).join('/'); }
function rel(p){ return posix(path.relative(ROOT,p)); }
function sha256(buf){ return crypto.createHash('sha256').update(buf).digest('hex'); }
function lineOf(text, idx){ let n=1; for(let i=0;i<idx;i++) if(text.charCodeAt(i)===10)n++; return n; }
function uniq(a){ return [...new Set(a.filter(Boolean))]; }
function esc(s){ return String(s??'').replace(/\|/g,'\\|').replace(/\r?\n/g,' '); }
function id(prefix,n){ return `${prefix}-${String(n).padStart(5,'0')}`; }

function walk(dir=ROOT, out=[]){
  for(const ent of fs.readdirSync(dir,{withFileTypes:true})){
    const full=path.join(dir,ent.name), r=rel(full);
    if(ent.isDirectory()){
      if(SKIP_DIRS.has(ent.name) || r==='docs/generated' || r.startsWith('assets/')) continue;
      walk(full,out);
    }else out.push(full);
  }
  return out;
}

function readText(file){
  const st=fs.statSync(file);
  if(st.size>MAX_READ) return null;
  const ext=path.extname(file).toLowerCase();
  if(!TEXT_EXT.has(ext)) return null;
  return fs.readFileSync(file,'utf8');
}

function blockEnd(text, open){
  let depth=0, quote=null, lineComment=false, blockComment=false, escNext=false;
  for(let i=open;i<text.length;i++){
    const c=text[i], n=text[i+1];
    if(lineComment){ if(c==='\n') lineComment=false; continue; }
    if(blockComment){ if(c==='*'&&n==='/'){ blockComment=false;i++; } continue; }
    if(quote){
      if(escNext){ escNext=false; continue; }
      if(c==='\\'){ escNext=true; continue; }
      if(c===quote){ quote=null; continue; }
      continue;
    }
    if(c==='/'&&n==='/'){ lineComment=true;i++;continue; }
    if(c==='/'&&n==='*'){ blockComment=true;i++;continue; }
    if(c==='"'||c==="'"||c==='`'){ quote=c;continue; }
    if(c==='{') depth++;
    else if(c==='}'){ depth--; if(depth===0)return i; }
  }
  return Math.min(text.length-1,open+8000);
}

function bodyFor(text, start){
  const open=text.indexOf('{',start);
  if(open<0 || open-start>800) return '';
  const end=blockEnd(text,open);
  return text.slice(open,end+1);
}

function strings(re,text){ const a=[]; let m; re.lastIndex=0; while((m=re.exec(text))) a.push(m[1]); return uniq(a); }
function refsIn(text){
  return {
    routes: strings(/["'`]((?:\/api\/)[A-Za-z0-9_./:-]+)["'`]/g,text),
    collections: strings(/\.collection\(\s*["'`]([^"'`]+)["'`]\s*\)/g,text),
    models: strings(/["'`](@cf\/[A-Za-z0-9_.\-/]+)["'`]/g,text),
    domIds: uniq([...strings(/getElementById\(\s*["'`]([^"'`]+)["'`]\s*\)/g,text),...strings(/querySelector\(\s*["'`]#([^"'`\s>+~.[\]]+)["'`]\s*\)/g,text)]),
    storageKeys: strings(/(?:localStorage|sessionStorage)\.(?:getItem|setItem|removeItem)\(\s*["'`]([^"'`]+)["'`]/g,text),
    env: strings(/\benv\.([A-Z][A-Z0-9_]*)\b/g,text),
    actions: uniq([...strings(/data-action=["']([^"']+)["']/g,text),...strings(/data-go=["']([^"']+)["']/g,text)]),
    assetRefs: strings(/["'`]((?:assets\/)[^"'`?#]+)["'`]/g,text),
  };
}

function extractFunctions(file,text){
  const found=[];
  const patterns=[
    {kind:'declaration', re:/(?:^|[^\w$])((?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(([^)]*)\))/gm, name:2, params:3},
    {kind:'arrow', re:/(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?\(([^)]*)\)\s*=>/gm, name:1, params:2},
    {kind:'arrow1', re:/(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?([A-Za-z_$][\w$]*)\s*=>/gm, name:1, params:2},
    {kind:'function-expression', re:/(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?function(?:\s+[A-Za-z_$][\w$]*)?\s*\(([^)]*)\)/gm, name:1, params:2},
    {kind:'class-method', re:/^\s{0,8}(async\s+)?(constructor|fetch|[A-Za-z_$][\w$]*)\s*\(([^)]*)\)\s*\{/gm, name:2, params:3},
  ];
  const seen=new Set();
  for(const p of patterns){
    let m; p.re.lastIndex=0;
    while((m=p.re.exec(text))){
      const name=m[p.name], key=`${m.index}:${name}`;
      if(seen.has(key)) continue; seen.add(key);
      const body=bodyFor(text,m.index), refs=refsIn(body);
      found.push({file,line:lineOf(text,m.index),name,kind:p.kind,params:String(m[p.params]||'').trim(),body,refs});
    }
  }
  return found;
}

const files=walk();
const fileRecords=[];
const texts=new Map();
for(const f of files){
  const r=rel(f), st=fs.statSync(f), buf=fs.readFileSync(f);
  fileRecords.push({path:r,size:st.size,sha256:sha256(buf),extension:path.extname(f).toLowerCase(),runtime:RUNTIME_EXT.has(path.extname(f).toLowerCase())});
  const t=readText(f); if(t!==null) texts.set(r,t);
}

let functions=[];
for(const [file,text] of texts){ if(/\.(?:m?js|cjs)$/.test(file)) functions.push(...extractFunctions(file,text)); }
const functionNames=new Set(functions.map(x=>x.name));
for(const f of functions){
  const calls=[];
  const re=/\b([A-Za-z_$][\w$]*)\s*\(/g; let m;
  while((m=re.exec(f.body))) if(functionNames.has(m[1])&&m[1]!==f.name) calls.push(m[1]);
  f.calls=uniq(calls);
  delete f.body;
}
functions.sort((a,b)=>a.file.localeCompare(b.file)||a.line-b.line);
functions.forEach((x,i)=>x.id=id('FUNC',i+1));

const occurrences={routes:[],models:[],collections:[],storage:[],uiActions:[],events:[],movement:[],assets:[],env:[]};
for(const [file,text] of texts){
  const add=(bucket,re,mapper)=>{ let m; re.lastIndex=0; while((m=re.exec(text))) bucket.push(mapper(m)); };
  add(occurrences.routes,/["'`]((?:\/api\/)[A-Za-z0-9_./:-]+)["'`]/g,m=>({file,line:lineOf(text,m.index),value:m[1]}));
  add(occurrences.models,/["'`](@cf\/[A-Za-z0-9_.\-/]+)["'`]/g,m=>({file,line:lineOf(text,m.index),value:m[1]}));
  add(occurrences.collections,/\.collection\(\s*["'`]([^"'`]+)["'`]\s*\)/g,m=>({file,line:lineOf(text,m.index),value:m[1]}));
  add(occurrences.storage,/(localStorage|sessionStorage)\.(getItem|setItem|removeItem)\(\s*["'`]([^"'`]+)["'`]/g,m=>({file,line:lineOf(text,m.index),scope:m[1],operation:m[2],value:m[3]}));
  add(occurrences.uiActions,/data-(action|go)=["']([^"']+)["']/g,m=>({file,line:lineOf(text,m.index),kind:m[1],value:m[2]}));
  add(occurrences.events,/\.addEventListener\(\s*["'`]([^"'`]+)["'`]/g,m=>({file,line:lineOf(text,m.index),value:m[1]}));
  add(occurrences.assets,/["'`]((?:assets\/)[^"'`?#]+)["'`]/g,m=>({file,line:lineOf(text,m.index),value:m[1]}));
  add(occurrences.env,/\benv\.([A-Z][A-Z0-9_]*)\b/g,m=>({file,line:lineOf(text,m.index),value:m[1]}));
  const lines=text.split(/\r?\n/);
  lines.forEach((ln,idx)=>{ if(/\b(move|movement|travel|location|position|map|route|distance|range|alcance|desloc|mover|movimento|viajar|localiza|posi[cç][aã]o)\b/i.test(ln)) occurrences.movement.push({file,line:idx+1,text:ln.trim().slice(0,500)}); });
}
for(const k of Object.keys(occurrences)) occurrences[k].forEach((x,i)=>x.id=id(k.toUpperCase().slice(0,8),i+1));

const index=texts.get('index.html')||'';
const scripts=[]; let sm;
const sr=/<script\s+[^>]*src=["']([^"']+)["'][^>]*><\/script>/gi;
while((sm=sr.exec(index))){ const raw=sm[1], local=raw.split('?')[0]; scripts.push({id:id('SCRIPT',scripts.length+1),order:scripts.length+1,src:raw,local,exists:fs.existsSync(path.join(ROOT,local)),line:lineOf(index,sm.index)}); }

const routeMap=new Map();
for(const x of occurrences.routes){
  if(!routeMap.has(x.value))routeMap.set(x.value,[]);
  routeMap.get(x.value).push({file:x.file,line:x.line});
}
const routes=[...routeMap].sort((a,b)=>a[0].localeCompare(b[0])).map(([route,sources],i)=>({id:id('API',i+1),route,sources}));

const modelMap=new Map();
for(const x of occurrences.models){ if(!modelMap.has(x.value))modelMap.set(x.value,[]);modelMap.get(x.value).push({file:x.file,line:x.line}); }
const models=[...modelMap].map(([model,sources],i)=>({id:id('AI',i+1),model,sources}));

const collectionMap=new Map();
for(const x of occurrences.collections){ if(!collectionMap.has(x.value))collectionMap.set(x.value,[]);collectionMap.get(x.value).push({file:x.file,line:x.line}); }
const collections=[...collectionMap].sort((a,b)=>a[0].localeCompare(b[0])).map(([name,sources],i)=>({id:id('DB',i+1),name,sources}));

const allActionValues=uniq(occurrences.uiActions.map(x=>x.value)).sort();
const uiActions=allActionValues.map((value,i)=>({id:id('UI',i+1),value,sources:occurrences.uiActions.filter(x=>x.value===value).map(({file,line,kind})=>({file,line,kind}))}));

const allEvents=uniq(occurrences.events.map(x=>x.value)).sort();
const events=allEvents.map((value,i)=>({id:id('EVENT',i+1),value,sources:occurrences.events.filter(x=>x.value===value).map(({file,line})=>({file,line}))}));

const inventory={
  generatedAt:new Date().toISOString(),
  repository:'kaalflash12/naruto-shinobi-no-sho',
  methodology:{type:'static-source-inventory',note:'A descoberta e mecanica. Nenhuma ausencia de evidencia e convertida em comportamento inventado.'},
  counts:{files:fileRecords.length,textFiles:texts.size,functions:functions.length,routes:routes.length,models:models.length,collections:collections.length,storageOccurrences:occurrences.storage.length,uiActions:uiActions.length,events:events.length,movementEvidence:occurrences.movement.length,scriptTags:scripts.length,assetReferences:occurrences.assets.length},
  files:fileRecords,functions,routes,models,collections,storage:occurrences.storage,uiActions,events,movement:occurrences.movement,scripts,assets:occurrences.assets,environment:occurrences.env,
};

fs.mkdirSync(OUT,{recursive:true});
fs.writeFileSync(path.join(OUT,'TECHNICAL-INVENTORY.json'),JSON.stringify(inventory,null,2)+'\n');

function mdHeader(title,desc){ return `# ${title}\n\n${desc}\n\nGerado em: \`${inventory.generatedAt}\`\n\n`; }
function srcs(a){ return a.map(x=>`\`${x.file}:${x.line}\``).join(', '); }

let md=mdHeader('INVENTÁRIO TÉCNICO — NARUTO SHINOBI NO SHO','Inventário gerado diretamente do código do repositório. É evidência estática, não substitui teste de execução.');
md+='## Totais\n\n| Item | Total |\n|---|---:|\n';
for(const [k,v] of Object.entries(inventory.counts))md+=`| ${k} | ${v} |\n`;
md+='\n## Regra de interpretação\n\n`STATICALLY_TRACED` significa que o elemento foi localizado no código e ligado a arquivo/linha. Não significa que o comportamento foi executado em navegador, Worker ou banco.\n';
fs.writeFileSync(path.join(OUT,'00-INVENTORY-SUMMARY.md'),md);

md=mdHeader('FUNÇÕES E MÉTODOS','Cada entrada foi localizada mecanicamente. Efeitos listados abaixo são referências observáveis dentro do corpo da função; quando não há evidência suficiente, a documentação não inventa finalidade.');
for(const f of functions){
  md+=`## ${f.id} — \`${f.name}\`\n\n- **Fonte:** \`${f.file}:${f.line}\`\n- **Forma:** ${f.kind}\n- **Parâmetros:** \`${esc(f.params)||'(nenhum explícito)'}\`\n- **Chamadas internas detectadas:** ${f.calls.length?f.calls.map(x=>`\`${x}\``).join(', '):'nenhuma identificada estaticamente'}\n- **Rotas referidas:** ${f.refs.routes.length?f.refs.routes.map(x=>`\`${x}\``).join(', '):'—'}\n- **Coleções MongoDB:** ${f.refs.collections.length?f.refs.collections.map(x=>`\`${x}\``).join(', '):'—'}\n- **Modelos IA:** ${f.refs.models.length?f.refs.models.map(x=>`\`${x}\``).join(', '):'—'}\n- **DOM IDs:** ${f.refs.domIds.length?f.refs.domIds.map(x=>`\`${x}\``).join(', '):'—'}\n- **Storage keys:** ${f.refs.storageKeys.length?f.refs.storageKeys.map(x=>`\`${x}\``).join(', '):'—'}\n- **Env:** ${f.refs.env.length?f.refs.env.map(x=>`\`${x}\``).join(', '):'—'}\n- **Ações UI literais:** ${f.refs.actions.length?f.refs.actions.map(x=>`\`${x}\``).join(', '):'—'}\n- **Status:** `STATICALLY_TRACED`\n\n`Uso preciso`: consultar a fonte indicada; este inventário não atribui efeito que não esteja observável no corpo da função.\n\n`;
}
fs.writeFileSync(path.join(OUT,'01-FUNCTIONS.md'),md);

md=mdHeader('API E ROTAS','Rotas literais encontradas no frontend/backend, com todos os pontos de referência detectados.');
for(const r of routes)md+=`## ${r.id} — \`${r.route}\`\n\n- **Referências:** ${srcs(r.sources)}\n- **Contrato:** ver implementação nas fontes acima; método, autenticação e payload devem ser determinados pelo código correspondente.\n- **Status:** \`STATICALLY_TRACED\`\n\n`;
fs.writeFileSync(path.join(OUT,'02-API.md'),md);

md=mdHeader('IA — MODELOS E PONTOS DE USO','Modelos encontrados literalmente no código. O modelo efetivo depende do entrypoint configurado no Worker; a especificação mestre explica a precedência.');
for(const a of models)md+=`## ${a.id} — \`${a.model}\`\n\n- **Fontes:** ${srcs(a.sources)}\n- **Status:** \`STATICALLY_TRACED\`\n\n`;
fs.writeFileSync(path.join(OUT,'03-AI.md'),md);

md=mdHeader('PERSISTÊNCIA','Coleções MongoDB e chaves de storage detectadas.');
md+='## Coleções MongoDB\n\n';
for(const c of collections)md+=`- **${c.id}** \`${c.name}\` — ${srcs(c.sources)}\n`;
md+='\n## localStorage / sessionStorage\n\n| ID | Escopo | Operação | Chave | Fonte |\n|---|---|---|---|---|\n';
for(const x of occurrences.storage)md+=`| ${x.id} | ${x.scope} | ${x.operation} | \`${esc(x.value)}\` | \`${x.file}:${x.line}\` |\n`;
fs.writeFileSync(path.join(OUT,'04-PERSISTENCE.md'),md);

md=mdHeader('INTERAÇÕES DE UI E EVENTOS','Ações declaradas via data-action/data-go e eventos registrados via addEventListener.');
md+='## Ações\n\n';
for(const a of uiActions)md+=`- **${a.id}** \`${a.value}\` — ${srcs(a.sources)}\n`;
md+='\n## Eventos DOM\n\n';
for(const e of events)md+=`- **${e.id}** \`${e.value}\` — ${srcs(e.sources)}\n`;
fs.writeFileSync(path.join(OUT,'05-UI-INTERACTIONS.md'),md);

md=mdHeader('SCRIPTS E ORDEM DE CARREGAMENTO','Ordem real dos scripts declarados em index.html.');
md+='| Ordem | Script | Existe | Linha index |\n|---:|---|---|---:|\n';
for(const s of scripts)md+=`| ${s.order} | \`${s.local}\` | ${s.exists?'SIM':'NÃO'} | ${s.line} |\n`;
md+='\n## Todos os arquivos de código/configuração\n\n';
for(const f of fileRecords.filter(x=>x.runtime))md+=`- \`${f.path}\` — ${f.size} bytes — SHA-256 \`${f.sha256}\`\n`;
fs.writeFileSync(path.join(OUT,'06-SCRIPTS.md'),md);

md=mdHeader('AÇÕES, MOVIMENTO, MAPA E POSIÇÃO','Evidências de código contendo termos de movimento/localização/mapa. São pistas rastreáveis para localizar a regra real; não são interpretação narrativa.');
for(const x of occurrences.movement)md+=`- **${x.id}** \`${x.file}:${x.line}\` — ${esc(x.text)}\n`;
fs.writeFileSync(path.join(OUT,'07-MOVEMENT-ACTIONS.md'),md);

md=mdHeader('RASTREABILIDADE GERADA','Cada requisito técnico abaixo aponta para evidência de código.');
md+='| ID | Tipo | Elemento | Evidência | Status |\n|---|---|---|---|---|\n';
for(const f of functions)md+=`| ${f.id} | função | \`${f.name}\` | \`${f.file}:${f.line}\` | STATICALLY_TRACED |\n`;
for(const r of routes)md+=`| ${r.id} | API | \`${r.route}\` | ${srcs(r.sources)} | STATICALLY_TRACED |\n`;
for(const a of models)md+=`| ${a.id} | IA | \`${a.model}\` | ${srcs(a.sources)} | STATICALLY_TRACED |\n`;
for(const c of collections)md+=`| ${c.id} | persistência | \`${c.name}\` | ${srcs(c.sources)} | STATICALLY_TRACED |\n`;
for(const a of uiActions)md+=`| ${a.id} | UI | \`${a.value}\` | ${srcs(a.sources)} | STATICALLY_TRACED |\n`;
fs.writeFileSync(path.join(OUT,'08-TRACEABILITY.md'),md);

console.log(JSON.stringify({ok:true,out:rel(OUT),counts:inventory.counts},null,2));
