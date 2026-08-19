import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'docs','generated');
const INV_PATH=path.join(OUT,'TECHNICAL-INVENTORY.json');
if(!fs.existsSync(INV_PATH))throw new Error('TECHNICAL-INVENTORY.json ausente');
const inv=JSON.parse(fs.readFileSync(INV_PATH,'utf8'));
if(inv.astIndex?.parser!=='acorn'||Number(inv.astIndex?.parseFailures)!==0)throw new Error('AST Acorn valido obrigatorio antes do enriquecimento');

const sha=s=>crypto.createHash('sha256').update(String(s)).digest('hex');
const code=s=>'`'+String(s??'').replace(/`/g,'\\`')+'`';
const clean=s=>String(s??'').replace(/\r?\n/g,' ').replace(/\s+/g,' ').trim();
const uniq=a=>[...new Set((a||[]).filter(Boolean))];
const cache=new Map();
function read(file){if(cache.has(file))return cache.get(file);const p=path.join(ROOT,file);const t=fs.existsSync(p)?fs.readFileSync(p,'utf8'):'';cache.set(file,t);return t;}
function bodyOf(f){const t=read(f.file);if(!t||!f.ast)return '';return t.slice(f.ast.bodyStart,f.ast.bodyEnd);}
function captures(text,re,group=1,max=200){const out=[];let m;re.lastIndex=0;while((m=re.exec(text))){out.push(clean(m[group]));if(out.length>=max)break;}return uniq(out);}

const DB_OPS=['findOne','find','insertOne','insertMany','updateOne','updateMany','replaceOne','deleteOne','deleteMany','countDocuments','createIndex','createIndexes','aggregate','distinct','bulkWrite'];
const MOVEMENT_TERMS=['move','movement','travel','location','position','map','route','distance','range','alcance','desloc','mover','movimento','viajar','localiza','posição','posicao'];

function analyzeBody(f,body){
  const routeRefs=captures(body,/["'`]((?:\/api\/)[A-Za-z0-9_./:-]+)["'`]/g);
  const collectionRefs=captures(body,/\.collection\(\s*["'`]([^"'`]+)["'`]\s*\)/g);
  const modelRefs=captures(body,/["'`](@cf\/[A-Za-z0-9_.\-/]+)["'`]/g);
  const domIds=uniq([
    ...captures(body,/getElementById\(\s*["'`]([^"'`]+)["'`]\s*\)/g),
    ...captures(body,/querySelector\(\s*["'`]#([^"'`\s>+~.\[]+)["'`]\s*\)/g)
  ]);
  const storageOperations=[];let sm;
  const sr=/(localStorage|sessionStorage)\.(getItem|setItem|removeItem)\(\s*["'`]([^"'`]+)["'`]/g;
  while((sm=sr.exec(body)))storageOperations.push({scope:sm[1],operation:sm[2],key:sm[3]});
  const dbOperations=DB_OPS.filter(op=>new RegExp('\\.'+op+'\\s*\\(').test(body));
  const httpMethods=uniq([
    ...captures(body,/\bmethod\s*:\s*["'`](GET|POST|PUT|PATCH|DELETE|OPTIONS|HEAD)["'`]/gi).map(x=>x.toUpperCase()),
    ...captures(body,/\.method\s*(?:===|==|!==|!=)\s*["'`](GET|POST|PUT|PATCH|DELETE|OPTIONS|HEAD)["'`]/gi).map(x=>x.toUpperCase())
  ]);
  const sideEffects=[];
  if(routeRefs.length||/\bfetch\s*\(/.test(body))sideEffects.push('NETWORK');
  if(collectionRefs.length||dbOperations.length)sideEffects.push('DATABASE');
  if(storageOperations.length)sideEffects.push('BROWSER_STORAGE');
  if(/\bdocument\.|querySelector\s*\(|getElementById\s*\(|\.innerHTML\b|\.textContent\b|\.classList\b/.test(body))sideEffects.push('DOM');
  if(/\bMath\.random\s*\(|crypto\.getRandomValues\s*\(|crypto\.randomUUID\s*\(/.test(body))sideEffects.push('RNG');
  if(/\bDate\.now\s*\(|new\s+Date\s*\(|setTimeout\s*\(|setInterval\s*\(/.test(body))sideEffects.push('TIME');
  if(/\bhistory\.|\blocation\.|window\.location/.test(body))sideEffects.push('NAVIGATION');
  if(/\bAudio\s*\(|\.play\s*\(|\.pause\s*\(/.test(body))sideEffects.push('AUDIO_MEDIA');
  if(/\bGAME_ROOMS\b|DurableObject|ctx\.storage/.test(body))sideEffects.push('DURABLE_OBJECT');
  if(/\.writeText\s*\(|\.clipboard\b/.test(body))sideEffects.push('CLIPBOARD');
  const stateWrites=captures(body,/\b([A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*){1,5})\s*(?:=|\+=|-=|\*=|\/=|\+\+|--)(?!=)/g,1,160);
  const mutationCalls=[];let mm;
  const mr=/\b([A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*){0,5})\.(push|pop|splice|shift|unshift|set|delete|add|clear)\s*\(/g;
  while((mm=mr.exec(body)))mutationCalls.push(mm[1]+'.'+mm[2]+'()');
  const returns=captures(body,/\breturn\s+([^;\n}]{1,220})/g,1,30);
  const throwMessages=uniq([
    ...captures(body,/throw\s+new\s+Error\s*\(\s*["'`]([^"'`]+)["'`]/g,1,30),
    ...captures(body,/throw\s+["'`]([^"'`]+)["'`]/g,1,30)
  ]);
  const errorCodes=captures(body,/["'`]([A-Z][A-Z0-9_]{3,})["'`]/g,1,100);
  const authSignals=[];
  if(/\bAuthorization\b|Bearer\s|authRequired|currentUser|currentAccount|verifyToken|session/i.test(body))authSignals.push('AUTH_OR_SESSION');
  if(/membership|room_memberships/i.test(body))authSignals.push('ROOM_MEMBERSHIP');
  if(/LEON_PRIVATE_CODE|claim-leon|PRIVATE_ACCESS/i.test(body))authSignals.push('PRIVATE_CLAIM');
  const movementTerms=MOVEMENT_TERMS.filter(term=>new RegExp(term,'i').test(body));
  const timers=uniq([...(body.match(/setTimeout\s*\(/g)||[]).map(()=> 'setTimeout'),...(body.match(/setInterval\s*\(/g)||[]).map(()=> 'setInterval')]);
  const envRefs=captures(body,/\benv\.([A-Z][A-Z0-9_]*)\b/g);
  return {
    extractionStatus:'OK_AST_EXACT',sourceSpan:{startLine:f.line,endLine:f.endLine},
    bodySha256:sha(body),bodyChars:body.length,
    returnCount:(body.match(/\breturn\b/g)||[]).length,returnSamples:returns,
    throwCount:(body.match(/\bthrow\b/g)||[]).length,throwMessages,errorCodes,
    sideEffects:uniq(sideEffects),stateWrites:uniq(stateWrites),mutationCalls:uniq(mutationCalls),
    httpMethods,dbOperations,storageOperations,authSignals:uniq(authSignals),domIds,
    routeRefs,collectionRefs,modelRefs,envRefs,timers,movementTerms,
    handlerLiterals:uniq(f.ast?.handlerLiterals||[]),dispatchSignals:uniq(f.ast?.dispatchSignals||[]),
    actionSourceSignals:uniq(f.ast?.actionSourceSignals||[]),eventTypes:uniq(f.ast?.eventTypes||[])
  };
}

const bodies=new Map();
for(const f of inv.functions||[]){
  if(!f.ast)throw new Error('funcao sem AST: '+f.id+' '+f.file+':'+f.line);
  const body=bodyOf(f);if(!body)throw new Error('corpo AST vazio: '+f.id+' '+f.file+':'+f.line);
  bodies.set(f.id,body);f.behavior=analyzeBody(f,body);
}

function escaped(s){return String(s).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
function literalMention(body,value){
  const q=escaped(value);
  return new RegExp('(?:["\'`]'+q+'["\'`])').test(body);
}
function emitted(body,value){
  const q=escaped(value);
  return new RegExp('data-(?:action|go)=["\']'+q+'["\']','i').test(body);
}
function isDynamicAction(value){return /\$\{[^}]+\}/.test(String(value));}

const uiCrosswalk=[];
for(const a of inv.uiActions||[]){
  const dynamic=isDynamicAction(a.value);
  const handlers=[],emitters=[],mentions=[],genericDispatchers=[];
  for(const f of inv.functions||[]){
    const body=bodies.get(f.id)||'';
    const handlerByAst=(f.ast?.handlerLiterals||[]).includes(a.value);
    const handlerByName=f.name===a.value;
    if(handlerByAst||handlerByName)handlers.push(f.id);
    if(emitted(body,a.value))emitters.push(f.id);
    if(literalMention(body,a.value))mentions.push(f.id);
    if((f.ast?.actionSourceSignals||[]).length&&(f.ast?.dispatchSignals||[]).length)genericDispatchers.push(f.id);
  }
  let status;
  if(dynamic)status='DYNAMIC_ACTION_TEMPLATE';
  else if(handlers.length)status='AST_HANDLER_CONFIRMED';
  else if(emitters.length)status='EMITTER_WITHOUT_LITERAL_HANDLER';
  else if(mentions.length)status='LITERAL_MENTION_WITHOUT_HANDLER';
  else status='NO_FUNCTION_REFERENCE';
  uiCrosswalk.push({
    id:a.id,action:a.value,sources:a.sources,dynamicTemplate:dynamic,
    handlerCandidates:uniq(handlers),emitterFunctions:uniq(emitters),mentionFunctions:uniq(mentions),
    genericDispatcherFunctions:uniq(genericDispatchers),status
  });
}

const apiCrosswalk=(inv.routes||[]).map(r=>{
  const handlers=[];
  for(const f of inv.functions||[])if((f.behavior?.routeRefs||[]).includes(r.route))handlers.push({functionId:f.id,name:f.name,file:f.file,line:f.line,httpMethods:f.behavior.httpMethods,authSignals:f.behavior.authSignals,sideEffects:f.behavior.sideEffects});
  return {id:r.id,route:r.route,sources:r.sources,handlerCandidates:handlers,status:handlers.length?'AST_SCOPE_ROUTE_OWNER':'NO_FUNCTION_ROUTE_OWNER'};
});

const persistenceCrosswalk=(inv.collections||[]).map(c=>{
  const functions=[];
  for(const f of inv.functions||[])if((f.behavior?.collectionRefs||[]).includes(c.name))functions.push({functionId:f.id,name:f.name,file:f.file,line:f.line,dbOperations:f.behavior.dbOperations,authSignals:f.behavior.authSignals});
  return {id:c.id,collection:c.name,sources:c.sources,functions,status:functions.length?'AST_SCOPE_OPERATION_OWNER':'NO_FUNCTION_COLLECTION_OWNER'};
});

const movementFunctions=(inv.functions||[]).filter(f=>(f.behavior?.movementTerms||[]).length).map(f=>({functionId:f.id,name:f.name,file:f.file,line:f.line,domain:f.domain,terms:f.behavior.movementTerms,sideEffects:f.behavior.sideEffects,stateWrites:f.behavior.stateWrites,calls:f.calls||[]}));

const fileMap=new Map();
for(const f of inv.functions||[]){if(!fileMap.has(f.file))fileMap.set(f.file,[]);fileMap.get(f.file).push(f);}
const scriptResponsibilities=[];
for(const s of inv.scripts||[]){
  const text=read(s.local),funcs=fileMap.get(s.local)||[];
  const windowExports=captures(text,/\bwindow\.([A-Za-z_$][\w$]*)\s*=/g,1,200);
  const globalAssignments=captures(text,/^\s*(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=/gm,1,200);
  scriptResponsibilities.push({
    id:s.id,order:s.order,script:s.local,exists:s.exists,line:s.line,functionCount:funcs.length,functionIds:funcs.map(f=>f.id),
    anonymousFunctions:funcs.filter(f=>f.name.startsWith('<')).length,windowExports,globalAssignments,
    routeRefs:uniq(funcs.flatMap(f=>f.behavior?.routeRefs||[])),modelRefs:uniq(funcs.flatMap(f=>f.behavior?.modelRefs||[])),
    collectionRefs:uniq(funcs.flatMap(f=>f.behavior?.collectionRefs||[])),sideEffects:uniq(funcs.flatMap(f=>f.behavior?.sideEffects||[])),
    movementFunctionCount:funcs.filter(f=>(f.behavior?.movementTerms||[]).length).length
  });
}

const interactionMatrix=uiCrosswalk.map(x=>{
  const related=uniq([...x.handlerCandidates,...x.emitterFunctions,...x.mentionFunctions]);
  const funcs=related.map(id=>(inv.functions||[]).find(f=>f.id===id)).filter(Boolean);
  return {
    uiId:x.id,action:x.action,status:x.status,dynamicTemplate:x.dynamicTemplate,handlerCandidates:x.handlerCandidates,
    emitters:x.emitterFunctions,genericDispatchers:x.genericDispatcherFunctions,relatedFunctions:related,
    routes:uniq(funcs.flatMap(f=>f.behavior?.routeRefs||[])),collections:uniq(funcs.flatMap(f=>f.behavior?.collectionRefs||[])),
    storageKeys:uniq(funcs.flatMap(f=>(f.behavior?.storageOperations||[]).map(o=>o.key))),domIds:uniq(funcs.flatMap(f=>f.behavior?.domIds||[])),
    sideEffects:uniq(funcs.flatMap(f=>f.behavior?.sideEffects||[])),movementTerms:uniq(funcs.flatMap(f=>f.behavior?.movementTerms||[]))
  };
});

const concreteUi=uiCrosswalk.filter(x=>!x.dynamicTemplate);
const unresolvedConcrete=concreteUi.filter(x=>!x.handlerCandidates.length);
inv.enrichment={
  generatedAt:new Date().toISOString(),version:'ast-behavior-crosswalk-v2',
  functionBehavior:{total:(inv.functions||[]).length,exactAstBodies:(inv.functions||[]).filter(f=>f.behavior?.extractionStatus==='OK_AST_EXACT').length,extractionFailures:0},
  uiCrosswalk:{total:uiCrosswalk.length,dynamicTemplates:uiCrosswalk.filter(x=>x.dynamicTemplate).length,concrete:concreteUi.length,handlerConfirmed:concreteUi.filter(x=>x.handlerCandidates.length).length,unresolvedConcrete:unresolvedConcrete.length},
  apiCrosswalk:{total:apiCrosswalk.length,handlerCandidates:apiCrosswalk.filter(x=>x.handlerCandidates.length).length,unresolved:apiCrosswalk.filter(x=>!x.handlerCandidates.length).length},
  persistenceCrosswalk:{total:persistenceCrosswalk.length,operationOwners:persistenceCrosswalk.filter(x=>x.functions.length).length,unresolved:persistenceCrosswalk.filter(x=>!x.functions.length).length},
  movementFunctions:movementFunctions.length,scripts:scriptResponsibilities.length
};
inv.uiActionCrosswalk=uiCrosswalk;inv.apiCrosswalk=apiCrosswalk;inv.persistenceCrosswalk=persistenceCrosswalk;inv.movementFunctions=movementFunctions;inv.scriptResponsibilities=scriptResponsibilities;inv.interactionMatrix=interactionMatrix;
fs.writeFileSync(INV_PATH,JSON.stringify(inv,null,2)+'\n');

function header(title,desc){return ['# '+title,'',desc,'','Gerado em: '+code(inv.enrichment.generatedAt),''].join('\n');}
function refs(a){return (a||[]).map(x=>code(x.file+':'+x.line)).join(', ')||'—';}
function list(a){return a?.length?a.map(code).join(', '):'—';}

let lines=[header('COMPORTAMENTO OBSERVÁVEL DE CADA FUNÇÃO — AST','Cada corpo é recortado pelo span exato do AST Acorn. Callbacks anônimos também são entradas próprias; código posterior não pode contaminar a função anterior.')];
for(const f of inv.functions||[]){const b=f.behavior;lines.push('## '+f.id+' — '+code(f.name),'',
  '- **Fonte:** '+code(f.file+':'+f.line+'-'+f.endLine),'- **Domínio:** '+code(f.domain),'- **AST:** '+code(f.ast.nodeType+' / '+f.ast.parentType),
  '- **Extração:** '+code(b.extractionStatus),'- **SHA-256 do corpo:** '+code(b.bodySha256),'- **Parâmetros:** '+code(f.params||'(nenhum explícito)'),
  '- **Chamadas diretas AST:** '+list(f.calls),'- **Side effects:** '+list(b.sideEffects),'- **Rotas:** '+list(b.routeRefs),'- **Métodos HTTP:** '+list(b.httpMethods),
  '- **Autenticação:** '+list(b.authSignals),'- **Coleções:** '+list(b.collectionRefs),'- **Operações DB:** '+list(b.dbOperations),
  '- **Storage:** '+(b.storageOperations.length?b.storageOperations.map(o=>code(o.scope+'.'+o.operation+'('+o.key+')')).join(', '):'—'),
  '- **DOM IDs:** '+list(b.domIds),'- **Env:** '+list(b.envRefs),'- **Writes:** '+list(b.stateWrites.slice(0,40)),'- **Mutações:** '+list(b.mutationCalls.slice(0,40)),
  '- **Retornos:** '+b.returnCount+(b.returnSamples.length?' — '+b.returnSamples.slice(0,6).map(code).join(', '):''),'- **Throws:** '+b.throwCount+(b.throwMessages.length?' — '+b.throwMessages.slice(0,6).map(code).join(', '):''),
  '- **Handler literals AST:** '+list(b.handlerLiterals),'- **Dispatcher signals AST:** '+list(b.dispatchSignals),'- **Action source signals:** '+list(b.actionSourceSignals),
  '- **Eventos:** '+list(b.eventTypes),'- **Movimento/mapa:** '+list(b.movementTerms),'- **Status:** '+code('STATIC_BEHAVIOR_AST_EXACT'),'');}
fs.writeFileSync(path.join(OUT,'11-FUNCTION-BEHAVIORS.md'),lines.join('\n')+'\n');

lines=[header('CROSSWALK DE AÇÕES DA INTERFACE — AST','Ações data-action/data-go são ligadas a callbacks/handlers por comparações, cases e propriedades detectadas no AST. Templates dinâmicos são separados de ações concretas.')];
for(const x of uiCrosswalk)lines.push('## '+x.id+' — '+code(x.action),'','- **Fontes UI:** '+refs(x.sources),'- **Template dinâmico:** '+(x.dynamicTemplate?'SIM':'NÃO'),'- **Handlers AST:** '+list(x.handlerCandidates),'- **Emissores:** '+list(x.emitterFunctions),'- **Menções:** '+list(x.mentionFunctions),'- **Dispatchers genéricos existentes:** '+list(x.genericDispatcherFunctions),'- **Status:** '+code(x.status),'');
fs.writeFileSync(path.join(OUT,'12-UI-ACTION-CROSSWALK.md'),lines.join('\n')+'\n');

lines=[header('EVIDÊNCIA DE CONTRATO DAS ROTAS API — AST','Rotas ligadas somente a funções/callbacks cujo span AST contém a referência.')];
for(const x of apiCrosswalk){lines.push('## '+x.id+' — '+code(x.route),'','- **Fontes:** '+refs(x.sources),'- **Status:** '+code(x.status));for(const h of x.handlerCandidates)lines.push('  - '+code(h.functionId+' '+h.name)+' @ '+code(h.file+':'+h.line)+' — HTTP '+list(h.httpMethods)+' — auth '+list(h.authSignals)+' — efeitos '+list(h.sideEffects));lines.push('');}
fs.writeFileSync(path.join(OUT,'13-API-CONTRACT-EVIDENCE.md'),lines.join('\n')+'\n');

lines=[header('OPERAÇÕES DE PERSISTÊNCIA — AST','Coleções ligadas somente às funções/callbacks cujo corpo AST contém a referência.')];
for(const x of persistenceCrosswalk){lines.push('## '+x.id+' — '+code(x.collection),'','- **Fontes:** '+refs(x.sources),'- **Status:** '+code(x.status));for(const h of x.functions)lines.push('  - '+code(h.functionId+' '+h.name)+' @ '+code(h.file+':'+h.line)+' — operações '+list(h.dbOperations)+' — auth '+list(h.authSignals));lines.push('');}
fs.writeFileSync(path.join(OUT,'14-PERSISTENCE-OPERATIONS.md'),lines.join('\n')+'\n');

lines=[header('RESPONSABILIDADE DOS SCRIPTS — AST','Cada script carregado é ligado às suas funções AST, incluindo callbacks anônimos.')];
for(const s of scriptResponsibilities)lines.push('## '+s.id+' — ordem '+s.order+' — '+code(s.script),'','- **Existe:** '+(s.exists?'SIM':'NÃO'),'- **Funções AST:** '+s.functionCount,'- **Anônimas/callbacks:** '+s.anonymousFunctions,'- **IDs:** '+list(s.functionIds),'- **window exports:** '+list(s.windowExports),'- **Globais:** '+list(s.globalAssignments),'- **Rotas:** '+list(s.routeRefs),'- **Modelos:** '+list(s.modelRefs),'- **Coleções:** '+list(s.collectionRefs),'- **Efeitos:** '+list(s.sideEffects),'- **Funções de movimento:** '+s.movementFunctionCount,'');
fs.writeFileSync(path.join(OUT,'15-SCRIPT-RESPONSIBILITIES.md'),lines.join('\n')+'\n');

lines=[header('FUNÇÕES RELACIONADAS A MOVIMENTO/MAPA — AST','Funções com corpo AST exato contendo evidência lexical de movimento/localização/mapa.')];
for(const m of movementFunctions)lines.push('- **'+m.functionId+' '+m.name+'** — '+code(m.file+':'+m.line)+' — '+list(m.terms)+' — efeitos '+list(m.sideEffects)+' — writes '+list(m.stateWrites.slice(0,20))+' — chamadas '+list(m.calls));
fs.writeFileSync(path.join(OUT,'16-MOVEMENT-FUNCTIONS.md'),lines.join('\n')+'\n');

lines=[header('MATRIZ OPERACIONAL DE INTERAÇÕES — AST','UI → handler/callback AST → rotas/DB/storage/DOM/efeitos/movimento. Ações sem handler ficam explicitamente visíveis.'),'| UI | Ação | Status | Handler | Emissor | Rotas | DB | Storage | DOM | Efeitos |','|---|---|---|---|---|---|---|---|---|---|'];
for(const x of interactionMatrix)lines.push('| '+x.uiId+' | '+code(x.action)+' | '+x.status+' | '+list(x.handlerCandidates)+' | '+list(x.emitters)+' | '+list(x.routes)+' | '+list(x.collections)+' | '+list(x.storageKeys)+' | '+list(x.domIds)+' | '+list(x.sideEffects)+' |');
fs.writeFileSync(path.join(OUT,'17-INTERACTION-MATRIX.md'),lines.join('\n')+'\n');

lines=[header('AÇÕES CONCRETAS SEM HANDLER AST','Lista bloqueante para revisão. Templates dinâmicos não entram aqui.')];
if(!unresolvedConcrete.length)lines.push('Nenhuma ação concreta sem handler AST.');
for(const x of unresolvedConcrete)lines.push('- **'+x.id+'** '+code(x.action)+' — status '+code(x.status)+' — fontes '+refs(x.sources)+' — emissores '+list(x.emitterFunctions)+' — menções '+list(x.mentionFunctions));
fs.writeFileSync(path.join(OUT,'19-UNRESOLVED-UI-ACTIONS.md'),lines.join('\n')+'\n');

console.log(JSON.stringify({ok:true,enrichment:inv.enrichment,unresolvedConcrete:unresolvedConcrete.map(x=>({id:x.id,action:x.action,status:x.status,sources:x.sources}))},null,2));
