import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'docs','generated');
const INV_PATH=path.join(OUT,'TECHNICAL-INVENTORY.json');
const FINAL_MD=path.join(OUT,'NARUTO_SHINOBI_NO_SHO_ESPECIFICACAO_FINAL_COMPLETA.md');
const FINAL_JSON=path.join(OUT,'FINAL-CANONICAL-AUDIT.json');
const MANUAL_DOCS=[
  'docs/00-ESPECIFICACAO-MESTRA.md',
  'docs/01-IA-TERION-E-AUTORIDADE.md',
  'docs/02-ARQUITETURA-API-PERSISTENCIA-ONLINE.md',
  'docs/03-JOGABILIDADE-ACOES-MOVIMENTO-INTERACOES.md',
  'docs/04-RASTREABILIDADE-E-VALIDACAO.md'
];
const SOURCE_EXT=new Set(['.js','.mjs','.cjs','.html','.json','.toml','.css','.ps1','.yml','.yaml']);
const sha256=d=>crypto.createHash('sha256').update(d).digest('hex');
const norm=p=>String(p||'').replace(/\\/g,'/');
const isDocs=p=>norm(p).startsWith('docs/');
const isSource=p=>SOURCE_EXT.has(path.extname(norm(p)).toLowerCase())&&!isDocs(p);
const isGameRuntime=p=>isSource(p)&&!norm(p).startsWith('tools/')&&!norm(p).startsWith('.github/');
const code=s=>'`'+String(s??'').replace(/`/g,'\\`')+'`';
const fence=(text,lang='text')=>`\n\n\`\`\`${lang}\n${String(text).replace(/\n?$/,'\n')}\`\`\`\n`;
const langFor=p=>({'.js':'javascript','.mjs':'javascript','.cjs':'javascript','.html':'html','.json':'json','.toml':'toml','.css':'css','.ps1':'powershell','.yml':'yaml','.yaml':'yaml'}[path.extname(p).toLowerCase()]||'text');
const escRe=s=>String(s).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');

if(!fs.existsSync(INV_PATH))throw new Error('TECHNICAL-INVENTORY.json ausente');
const inv=JSON.parse(fs.readFileSync(INV_PATH,'utf8'));
if(!inv.astIndex||inv.astIndex.parser!=='acorn')throw new Error('AST Acorn ausente no inventario. Execute ast-index-functions.mjs antes.');
if(Number(inv.astIndex.parseFailures||0)!==0)throw new Error('AST possui falhas de parse: '+inv.astIndex.parseFailures);

const textByFile=new Map();
for(const f of inv.files||[]){
  if(!isSource(f.path))continue;
  const abs=path.join(ROOT,f.path);
  if(fs.existsSync(abs))textByFile.set(f.path,fs.readFileSync(abs,'utf8'));
}

function exactFunctionRecord(f){
  const text=textByFile.get(f.file);
  const start=Number(f.ast?.start),end=Number(f.ast?.end);
  if(!text||!Number.isInteger(start)||!Number.isInteger(end)||start<0||end<=start||end>text.length){
    return {...f,exactCode:false,snippet:'',snippetSha256:null,astHashMatch:false};
  }
  const snippet=text.slice(start,end);
  const digest=sha256(snippet);
  const astHash=String(f.ast?.functionSha256||'');
  const astHashMatch=Boolean(astHash)&&digest===astHash;
  return {...f,exactCode:astHashMatch,snippet,snippetSha256:digest,astHashMatch};
}

const functionRecords=(inv.functions||[]).map(exactFunctionRecord);
const missingFunctionCode=functionRecords.filter(f=>!f.exactCode).map(f=>({id:f.id,file:f.file,line:f.line,endLine:f.endLine,name:f.name,astHash:f.ast?.functionSha256||null,snippetSha256:f.snippetSha256}));

function selectorEvidence(source,value){
  const v=escRe(value);
  const exactSelector=new RegExp(`\\[data-(?:action|go)=(?:"|')${v}(?:"|')\\]`);
  const attrSelector=new RegExp(`(?:closest|matches)\\s*\\??\\.??\\s*\\(\\s*(?:"|'|\\\`)[^\\n]*(?:data-action|data-go)[^\\n]*${v}`);
  return exactSelector.test(source)||attrSelector.test(source);
}

function handlerEvidence(action){
  const value=String(action.value||'');
  if(/\$\{[^}]+\}/.test(value))return {dynamic:true,status:'DYNAMIC_TEMPLATE_TRACE',evidence:[]};
  const evidence=[];
  for(const f of functionRecords){
    if(!f.exactCode||!isGameRuntime(f.file))continue;
    const ast=f.ast||{};
    if((ast.handlerLiterals||[]).includes(value)){
      evidence.push({functionId:f.id,file:f.file,line:f.line,endLine:f.endLine,kind:'ast-handler-literal'});
      continue;
    }
    const callback=/^<callback:.*addEventListener/i.test(String(f.name||'')) || (ast.eventTypes||[]).length>0;
    if(callback&&selectorEvidence(f.snippet,value)){
      evidence.push({functionId:f.id,file:f.file,line:f.line,endLine:f.endLine,kind:'event-selector-handler'});
      continue;
    }
  }
  if(!evidence.length){
    const allGo=(action.sources||[]).length>0&&(action.sources||[]).every(s=>s.kind==='go');
    if(allGo){
      for(const f of functionRecords){
        if(!f.exactCode||!isGameRuntime(f.file))continue;
        if((f.ast?.actionSourceSignals||[]).some(x=>/dataset\.go|data-go/.test(String(x)))){
          evidence.push({functionId:f.id,file:f.file,line:f.line,endLine:f.endLine,kind:'generic-data-go-dispatch'});
          break;
        }
      }
    }
  }
  const uniq=[];const seen=new Set();
  for(const e of evidence){const k=[e.functionId,e.kind].join(':');if(!seen.has(k)){seen.add(k);uniq.push(e);}}
  return {dynamic:false,status:uniq.length?'HANDLER_TRACED':'UNHANDLED_CONCRETE_ACTION',evidence:uniq};
}

const uiTraces=(inv.uiActions||[]).map(a=>({...a,...handlerEvidence(a)}));
const unresolvedUIActions=uiTraces.filter(x=>!x.dynamic&&x.status!=='HANDLER_TRACED');
const manualDocs=MANUAL_DOCS.map(p=>({path:p,exists:fs.existsSync(path.join(ROOT,p)),content:fs.existsSync(path.join(ROOT,p))?fs.readFileSync(path.join(ROOT,p),'utf8'):''}));
const missingManualDocs=manualDocs.filter(x=>!x.exists).map(x=>x.path);
const sourceFiles=(inv.files||[]).filter(f=>isSource(f.path)&&fs.existsSync(path.join(ROOT,f.path)));
const assetFiles=(inv.files||[]).filter(f=>f.asset);
const concreteActions=uiTraces.filter(x=>!x.dynamic);

const pass=missingFunctionCode.length===0&&unresolvedUIActions.length===0&&missingManualDocs.length===0;
const status=pass?'PASS_FINAL_CANONICAL_SPEC':'FAIL_FINAL_CANONICAL_SPEC';
const gate=list=>list.length===0?'PASS':'FAIL';
const report={
  generatedAt:new Date().toISOString(),status,ok:pass,repository:inv.repository,sourceInventoryGeneratedAt:inv.generatedAt,
  methodology:{functionBoundary:'Acorn AST start/end + SHA-256 match',uiHandlers:'AST handler literals + event-listener selector handlers + generic data-go',noInventedPass:true},
  counts:{functions:functionRecords.length,functionsWithExactCode:functionRecords.filter(x=>x.exactCode).length,anonymousFunctions:functionRecords.filter(x=>String(x.name||'').startsWith('<')).length,callbackFunctions:functionRecords.filter(x=>String(x.name||'').startsWith('<callback:')).length,routes:(inv.routes||[]).length,models:(inv.models||[]).length,collections:(inv.collections||[]).length,uiActions:(inv.uiActions||[]).length,concreteUIActions:concreteActions.length,dynamicUIActionTemplates:uiTraces.filter(x=>x.dynamic).length,concreteUIActionsWithHandler:concreteActions.filter(x=>x.status==='HANDLER_TRACED').length,unresolvedConcreteUIActions:unresolvedUIActions.length,sourceFiles:sourceFiles.length,assetFiles:assetFiles.length,manualDocs:manualDocs.length},
  gates:{manualSpecification:gate(missingManualDocs),exactFunctionCode:gate(missingFunctionCode),concreteUIActionHandlers:gate(unresolvedUIActions),runtimeExecution:'UNVERIFIED',browserInteraction:'UNVERIFIED',workersLive:'UNVERIFIED',mongodbLive:'UNVERIFIED',gameplayE2E:'UNVERIFIED'},
  missingManualDocs,missingFunctionCode,unresolvedUIActions:unresolvedUIActions.map(x=>({id:x.id,value:x.value,sources:x.sources})),
  functionHashes:functionRecords.map(x=>({id:x.id,file:x.file,line:x.line,endLine:x.endLine,name:x.name,exactCode:x.exactCode,snippetSha256:x.snippetSha256,astFunctionSha256:x.ast?.functionSha256||null})),
  uiTraces:uiTraces.map(x=>({id:x.id,value:x.value,dynamic:x.dynamic,status:x.status,sources:x.sources,evidence:x.evidence})),sourceFiles:sourceFiles.map(x=>({path:x.path,size:x.size,sha256:x.sha256})),assetFiles:assetFiles.map(x=>({path:x.path,size:x.size,sha256:x.sha256}))
};
fs.mkdirSync(OUT,{recursive:true});
fs.writeFileSync(FINAL_JSON,JSON.stringify(report,null,2)+'\n');

const md=[];
md.push('# NARUTO SHINOBI NO SHO — ESPECIFICAÇÃO FINAL COMPLETA','', '> Arquivo canônico gerado diretamente do repositório. Une especificação humana, AST exato, código final, rastreabilidade de UI, APIs, IA, persistência, scripts e hashes de assets.','', `- **Status canônico estático:** ${code(status)}`,`- **Inventário-base:** ${code(inv.generatedAt)}`,`- **Gerado em:** ${code(report.generatedAt)}`,`- **Delimitação de funções:** ${code('Acorn AST start/end + SHA-256')}`,`- **Execução/browser/Workers/MongoDB/E2E:** ${code('UNVERIFIED')} neste gate estático.`,'','## 1. RESUMO DE COBERTURA','','| Item | Total |','|---|---:|',`| Funções/callbacks AST | ${report.counts.functions} |`,`| Funções/callbacks com código exato | ${report.counts.functionsWithExactCode} |`,`| Callbacks contextualizados | ${report.counts.callbackFunctions} |`,`| Rotas API | ${report.counts.routes} |`,`| Modelos IA | ${report.counts.models} |`,`| Coleções | ${report.counts.collections} |`,`| Ações UI | ${report.counts.uiActions} |`,`| Ações concretas sem handler | ${report.counts.unresolvedConcreteUIActions} |`,`| Arquivos fonte/config/tooling | ${report.counts.sourceFiles} |`,`| Assets | ${report.counts.assetFiles} |`,'');
md.push('## 2. ESPECIFICAÇÃO HUMANA INCORPORADA','');
for(const d of manualDocs){md.push(`<!-- MANUAL:${d.path} -->`,`### ${d.path}`,'');if(!d.exists)md.push('**AUSENTE**','');else md.push(d.content.trim(),'');}
md.push('## 3. FUNÇÕES E CALLBACKS — CÓDIGO EXATO POR AST','');
for(const f of functionRecords){md.push(`<!-- FUNCTION:${f.id} -->`,`### ${f.id} — ${code(f.name)}`,'',`- Fonte: ${code(`${f.file}:${f.line}-${f.endLine}`)}`,`- Domínio: ${code(f.domain||'unknown')}`,`- Nó AST: ${code(f.ast?.nodeType||f.kind)}`,`- Código exato localizado: ${f.exactCode?'SIM':'NÃO'}`,`- SHA-256 do trecho: ${code(f.snippetSha256||'AUSENTE')}`,`- SHA-256 registrado pelo AST: ${code(f.ast?.functionSha256||'AUSENTE')}`,'');if(f.exactCode)md.push(fence(f.snippet,langFor(f.file)));}
md.push('## 4. API, IA E PERSISTÊNCIA','','### 4.1 Rotas API','');
for(const r of inv.routes||[])md.push(`<!-- API:${r.id} -->`,`#### ${r.id} — ${code(r.route)}`,'',`- Evidência: ${(r.sources||[]).map(s=>code(`${s.file}:${s.line}`)).join(', ')}`,'');
md.push('### 4.2 Modelos IA','');
for(const a of inv.models||[])md.push(`<!-- AI:${a.id} -->`,`#### ${a.id} — ${code(a.model)}`,'',`- Evidência: ${(a.sources||[]).map(s=>code(`${s.file}:${s.line}`)).join(', ')}`,'');
md.push('### 4.3 Coleções','');
for(const d of inv.collections||[])md.push(`<!-- DB:${d.id} -->`,`#### ${d.id} — ${code(d.name)}`,'',`- Evidência: ${(d.sources||[]).map(s=>code(`${s.file}:${s.line}`)).join(', ')}`,'');
md.push('## 5. INTERAÇÕES DE UI — EMISSOR → HANDLER','');
for(const u of uiTraces){md.push(`<!-- UI:${u.id} -->`,`### ${u.id} — ${code(u.value)}`,'',`- Status: ${code(u.status)}`,`- Template dinâmico: ${u.dynamic?'SIM':'NÃO'}`,`- Emissores: ${(u.sources||[]).map(s=>code(`${s.file}:${s.line}`)).join(', ')||'—'}`,`- Evidência de handler: ${(u.evidence||[]).map(e=>code(`${e.kind}:${e.file}:${e.line}-${e.endLine}`)).join(', ')||'—'}`,'');}
md.push('## 6. EVENTOS','');for(const e of inv.events||[])md.push(`<!-- EVENT:${e.id} -->`,`### ${e.id} — ${code(e.value)}`,'',`- Evidência: ${(e.sources||[]).map(s=>code(`${s.file}:${s.line}`)).join(', ')}`,'');
md.push('## 7. MOVIMENTO / MAPA / POSIÇÃO — EVIDÊNCIAS','');for(const m of inv.movement||[])md.push(`<!-- MOVE:${m.id} -->`,`- ${m.id} — ${code(`${m.file}:${m.line}`)} — ${String(m.text||'').replace(/\n/g,' ')}`);
md.push('','## 8. SCRIPTS E ORDEM DE CARREGAMENTO','');for(const s of inv.scripts||[])md.push(`<!-- SCRIPT:${s.id} -->`,`### ${s.id} — ${code(s.local||s.src)}`,'',`- Ordem: ${s.order}`,'- Existe: '+(s.exists?'SIM':'NÃO'),`- Linha do index: ${s.line}`,'');
md.push('## 9. ARQUIVOS FONTE/CONFIG/TOOLING — CÓDIGO FINAL INTEGRAL','', '> Esta seção incorpora integralmente os arquivos textuais de fonte/config/tooling usados pelo gate. O SHA-256 permite comparar o documento com o arquivo real.','');
for(const f of sourceFiles){const abs=path.join(ROOT,f.path),txt=fs.readFileSync(abs,'utf8');md.push(`<!-- SOURCE:${f.path} -->`,`### ${f.path}`,'',`- Bytes inventariados: ${f.size}`,`- SHA-256: ${code(f.sha256)}`,'',fence(txt,langFor(f.path)));}
md.push('## 10. ASSETS BINÁRIOS — CAMINHO / TAMANHO / HASH','', '> Binários não são fingidos como código textual. Cada asset fica rastreável por caminho, tamanho e SHA-256.','');for(const f of assetFiles)md.push(`- ${code(f.path)} — ${f.size} bytes — SHA-256 ${code(f.sha256)}`);
md.push('','## 11. GATE FINAL','',`- Status: ${code(status)}`,`- Manual: ${code(report.gates.manualSpecification)}`,`- Código exato AST: ${code(report.gates.exactFunctionCode)}`,`- Handlers de UI: ${code(report.gates.concreteUIActionHandlers)}`,'- Browser/Workers/MongoDB/E2E permanecem `UNVERIFIED` até teste vivo.','');
if(unresolvedUIActions.length){md.push('### Ações concretas ainda sem handler provado','');for(const x of unresolvedUIActions)md.push(`- ${x.id} — ${code(x.value)} — ${(x.sources||[]).map(s=>code(`${s.file}:${s.line}`)).join(', ')}`);md.push('');}
if(missingFunctionCode.length){md.push('### Funções/callbacks sem código AST exato','');for(const x of missingFunctionCode)md.push(`- ${x.id} — ${code(x.name)} — ${code(`${x.file}:${x.line}-${x.endLine}`)}`);md.push('');}
fs.writeFileSync(FINAL_MD,md.join('\n')+'\n');
console.log(JSON.stringify({ok:pass,status,counts:report.counts,gates:report.gates,unresolvedUIActions:report.unresolvedUIActions},null,2));
