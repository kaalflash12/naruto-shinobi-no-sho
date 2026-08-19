import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'docs','generated');
const INV_PATH=path.join(OUT,'TECHNICAL-INVENTORY.json');
if(!fs.existsSync(INV_PATH))throw new Error('TECHNICAL-INVENTORY.json ausente; execute geração/refino primeiro');
const inv=JSON.parse(fs.readFileSync(INV_PATH,'utf8'));

const sha=s=>crypto.createHash('sha256').update(String(s)).digest('hex');
const code=s=>'`'+String(s??'').replace(/`/g,'\\`')+'`';
const clean=s=>String(s??'').replace(/\r?\n/g,' ').replace(/\s+/g,' ').trim();
const uniq=a=>[...new Set((a||[]).filter(Boolean))];
const escTable=s=>clean(s).replace(/\|/g,'\\|');
const sourceCache=new Map();

function read(file){
  if(sourceCache.has(file))return sourceCache.get(file);
  const p=path.join(ROOT,file);
  const text=fs.existsSync(p)?fs.readFileSync(p,'utf8'):'';
  sourceCache.set(file,text);
  return text;
}

function lineStarts(text){
  const out=[0];
  for(let i=0;i<text.length;i++)if(text.charCodeAt(i)===10)out.push(i+1);
  return out;
}
function lineAt(starts,idx){
  let lo=0,hi=starts.length-1;
  while(lo<=hi){const m=(lo+hi)>>1;if(starts[m]<=idx)lo=m+1;else hi=m-1;}
  return hi+1;
}

function balancedBlock(text,open){
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
    else if(c==='}'){
      depth--;
      if(depth===0)return {text:text.slice(open,i+1),end:i};
    }
  }
  return {text:text.slice(open),end:text.length-1};
}

function expressionBody(text,start){
  let quote='',escape=false,paren=0,bracket=0;
  for(let i=start;i<Math.min(text.length,start+4000);i++){
    const c=text[i];
    if(quote){
      if(escape){escape=false;continue;}
      if(c==='\\'){escape=true;continue;}
      if(c===quote)quote='';
      continue;
    }
    if(c==='"'||c==="'"||c==='`'){quote=c;continue;}
    if(c==='(')paren++;
    else if(c===')')paren=Math.max(0,paren-1);
    else if(c==='[')bracket++;
    else if(c===']')bracket=Math.max(0,bracket-1);
    if(paren===0&&bracket===0&&(c===';'||c==='\n'))return {text:text.slice(start,i),end:i};
  }
  return {text:text.slice(start,start+4000),end:Math.min(text.length-1,start+3999)};
}

function extractFunctionBody(f){
  const text=read(f.file);
  if(!text)return {status:'SOURCE_MISSING',body:'',start:0,end:0,startLine:f.line,endLine:f.line};
  const starts=lineStarts(text);
  const lineStart=starts[Math.max(0,(f.line||1)-1)]??0;
  const searchEnd=Math.min(text.length,lineStart+3000);
  let anchor=lineStart;
  const name=String(f.name||'');
  if(name){
    const idx=text.indexOf(name,lineStart);
    if(idx>=lineStart&&idx<searchEnd)anchor=idx;
  }
  if(String(f.kind||'').startsWith('arrow')){
    const arrow=text.indexOf('=>',anchor);
    if(arrow>=0&&arrow<searchEnd){
      let p=arrow+2;while(/\s/.test(text[p]||''))p++;
      if(text[p]==='{'){
        const b=balancedBlock(text,p);
        return {status:'OK_BLOCK',body:b.text,start:p,end:b.end,startLine:lineAt(starts,p),endLine:lineAt(starts,b.end)};
      }
      const e=expressionBody(text,p);
      return {status:'OK_EXPRESSION',body:e.text,start:p,end:e.end,startLine:lineAt(starts,p),endLine:lineAt(starts,e.end)};
    }
  }
  const open=text.indexOf('{',anchor);
  if(open>=0&&open<searchEnd){
    const b=balancedBlock(text,open);
    return {status:'OK_BLOCK',body:b.text,start:open,end:b.end,startLine:lineAt(starts,open),endLine:lineAt(starts,b.end)};
  }
  return {status:'BODY_NOT_FOUND',body:'',start:anchor,end:anchor,startLine:f.line,endLine:f.line};
}

function captures(text,re,group=1,max=80){
  const out=[];let m;re.lastIndex=0;
  while((m=re.exec(text))){out.push(clean(m[group]));if(out.length>=max)break;}
  return uniq(out);
}

const DB_OPS=['findOne','find','insertOne','insertMany','updateOne','updateMany','replaceOne','deleteOne','deleteMany','countDocuments','createIndex','createIndexes','aggregate','distinct','bulkWrite'];
const MOVEMENT_TERMS=['move','movement','travel','location','position','map','route','distance','range','alcance','desloc','mover','movimento','viajar','localiza','posição','posicao'];

function analyzeBody(body){
  const routeRefs=captures(body,/["'`]((?:\/api\/)[A-Za-z0-9_./:-]+)["'`]/g);
  const collectionRefs=captures(body,/\.collection\(\s*["'`]([^"'`]+)["'`]\s*\)/g);
  const modelRefs=captures(body,/["'`](@cf\/[A-Za-z0-9_.\-/]+)["'`]/g);
  const domIds=uniq([
    ...captures(body,/getElementById\(\s*["'`]([^"'`]+)["'`]\s*\)/g),
    ...captures(body,/querySelector\(\s*["'`]#([^"'`\s>+~.\[]+)["'`]\s*\)/g)
  ]);
  const storageOps=[];let sm;
  const sr=/(localStorage|sessionStorage)\.(getItem|setItem|removeItem)\(\s*["'`]([^"'`]+)["'`]/g;
  while((sm=sr.exec(body)))storageOps.push({scope:sm[1],operation:sm[2],key:sm[3]});
  const dbOps=DB_OPS.filter(op=>new RegExp('\\.'+op+'\\s*\\(').test(body));
  const httpMethods=uniq(captures(body,/\bmethod\s*:\s*["'`](GET|POST|PUT|PATCH|DELETE|OPTIONS|HEAD)["'`]/gi).map(x=>x.toUpperCase()));
  const methodComparisons=uniq(captures(body,/\.method\s*(?:===|==|!==|!=)\s*["'`](GET|POST|PUT|PATCH|DELETE|OPTIONS|HEAD)["'`]/gi).map(x=>x.toUpperCase()));
  const sideEffects=[];
  if(routeRefs.length||/\bfetch\s*\(/.test(body))sideEffects.push('NETWORK');
  if(collectionRefs.length||dbOps.length)sideEffects.push('DATABASE');
  if(storageOps.length)sideEffects.push('BROWSER_STORAGE');
  if(/\bdocument\.|querySelector\s*\(|getElementById\s*\(|\.innerHTML\b|\.textContent\b|\.classList\b/.test(body))sideEffects.push('DOM');
  if(/\bMath\.random\s*\(|crypto\.getRandomValues\s*\(|crypto\.randomUUID\s*\(/.test(body))sideEffects.push('RNG');
  if(/\bDate\.now\s*\(|new\s+Date\s*\(|setTimeout\s*\(|setInterval\s*\(/.test(body))sideEffects.push('TIME');
  if(/\bhistory\.|\blocation\.|window\.location/.test(body))sideEffects.push('NAVIGATION');
  if(/\bAudio\s*\(|\.play\s*\(|\.pause\s*\(/.test(body))sideEffects.push('AUDIO_MEDIA');
  if(/\bGAME_ROOMS\b|DurableObject|ctx\.storage/.test(body))sideEffects.push('DURABLE_OBJECT');
  if(/\.writeText\s*\(|\.clipboard\b/.test(body))sideEffects.push('CLIPBOARD');
  const stateWrites=captures(body,/\b([A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*){1,4})\s*(?:=|\+=|-=|\*=|\/=|\+\+|--)(?!=)/g,1,120);
  const mutationCalls=[];let mm;
  const mr=/\b([A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*){0,4})\.(push|pop|splice|shift|unshift|set|delete|add|clear)\s*\(/g;
  while((mm=mr.exec(body)))mutationCalls.push(mm[1]+'.'+mm[2]+'()');
  const returns=captures(body,/\breturn\s+([^;\n}]{1,220})/g,1,20);
  const throwMessages=uniq([
    ...captures(body,/throw\s+new\s+Error\s*\(\s*["'`]([^"'`]+)["'`]/g,1,20),
    ...captures(body,/throw\s+["'`]([^"'`]+)["'`]/g,1,20)
  ]);
  const errorCodes=captures(body,/["'`]([A-Z][A-Z0-9_]{3,})["'`]/g,1,60);
  const authSignals=[];
  if(/\bAuthorization\b|Bearer\s|authRequired|currentUser|currentAccount|verifyToken|session/i.test(body))authSignals.push('AUTH_OR_SESSION');
  if(/membership|room_memberships/i.test(body))authSignals.push('ROOM_MEMBERSHIP');
  if(/LEON_PRIVATE_CODE|claim-leon|PRIVATE_ACCESS/i.test(body))authSignals.push('PRIVATE_CLAIM');
  const movementTerms=MOVEMENT_TERMS.filter(term=>new RegExp(term,'i').test(body));
  const timers=uniq([
    ...(body.match(/setTimeout\s*\(/g)||[]).map(()=> 'setTimeout'),
    ...(body.match(/setInterval\s*\(/g)||[]).map(()=> 'setInterval')
  ]);
  const envRefs=captures(body,/\benv\.([A-Z][A-Z0-9_]*)\b/g);
  return {
    bodySha256:sha(body),
    bodyChars:body.length,
    returnCount:(body.match(/\breturn\b/g)||[]).length,
    returnSamples:returns,
    throwCount:(body.match(/\bthrow\b/g)||[]).length,
    throwMessages,
    errorCodes,
    sideEffects:uniq(sideEffects),
    stateWrites:uniq(stateWrites).slice(0,120),
    mutationCalls:uniq(mutationCalls).slice(0,120),
    httpMethods:uniq([...httpMethods,...methodComparisons]),
    dbOperations:dbOps,
    storageOperations:storageOps,
    authSignals:uniq(authSignals),
    domIds,
    routeRefs,
    collectionRefs,
    modelRefs,
    envRefs,
    timers,
    movementTerms
  };
}

const functionBodies=new Map();
let bodyFailures=0;
for(const f of inv.functions||[]){
  const ex=extractFunctionBody(f);
  const behavior=analyzeBody(ex.body);
  f.behavior={
    extractionStatus:ex.status,
    sourceSpan:{startLine:ex.startLine,endLine:ex.endLine},
    ...behavior
  };
  functionBodies.set(f.id,ex.body);
  if(!String(ex.status).startsWith('OK_'))bodyFailures++;
}

function literalPattern(value){
  const q=String(value).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  return new RegExp('["\'`]'+q+'["\'`]');
}
function actionHandlerPattern(value){
  const q=String(value).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  return new RegExp('(?:case\\s*["\'`]'+q+'["\'`]|(?:action|act|cmd|command|go|type|key)\\s*(?:===|==|!==|!=)\\s*["\'`]'+q+'["\'`]|["\'`]'+q+'["\'`]\\s*:)','i');
}

const uiCrosswalk=[];
for(const a of inv.uiActions||[]){
  const mentions=[],handlers=[],emitters=[];
  const lp=literalPattern(a.value),hp=actionHandlerPattern(a.value);
  for(const f of inv.functions||[]){
    const body=functionBodies.get(f.id)||'';
    if(!lp.test(body))continue;
    mentions.push(f.id);
    if(hp.test(body))handlers.push(f.id);
    if(new RegExp('data-(?:action|go)=["\']'+String(a.value).replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'["\']','i').test(body))emitters.push(f.id);
  }
  const status=handlers.length?'STATIC_HANDLER_CANDIDATE':(mentions.length?'STATIC_LITERAL_MENTION_ONLY':'NO_FUNCTION_LITERAL_MATCH');
  uiCrosswalk.push({id:a.id,action:a.value,sources:a.sources,handlerCandidates:uniq(handlers),emitterFunctions:uniq(emitters),mentionFunctions:uniq(mentions),status});
}

const apiCrosswalk=[];
for(const r of inv.routes||[]){
  const handlers=[];
  for(const f of inv.functions||[]){
    if((f.behavior?.routeRefs||[]).includes(r.route))handlers.push({functionId:f.id,name:f.name,file:f.file,line:f.line,httpMethods:f.behavior.httpMethods,authSignals:f.behavior.authSignals,sideEffects:f.behavior.sideEffects});
  }
  apiCrosswalk.push({id:r.id,route:r.route,sources:r.sources,handlerCandidates:handlers,status:handlers.length?'STATIC_HANDLER_CANDIDATE':'NO_FUNCTION_ROUTE_OWNER'});
}

const persistenceCrosswalk=[];
for(const c of inv.collections||[]){
  const functions=[];
  for(const f of inv.functions||[]){
    if((f.behavior?.collectionRefs||[]).includes(c.name))functions.push({functionId:f.id,name:f.name,file:f.file,line:f.line,dbOperations:f.behavior.dbOperations,authSignals:f.behavior.authSignals});
  }
  persistenceCrosswalk.push({id:c.id,collection:c.name,sources:c.sources,functions,status:functions.length?'STATIC_OPERATION_OWNER':'NO_FUNCTION_COLLECTION_OWNER'});
}

const movementFunctions=(inv.functions||[])
  .filter(f=>(f.behavior?.movementTerms||[]).length)
  .map(f=>({functionId:f.id,name:f.name,file:f.file,line:f.line,domain:f.domain,terms:f.behavior.movementTerms,sideEffects:f.behavior.sideEffects,stateWrites:f.behavior.stateWrites,calls:f.calls||[]}));

const fileFunctionMap=new Map();
for(const f of inv.functions||[]){if(!fileFunctionMap.has(f.file))fileFunctionMap.set(f.file,[]);fileFunctionMap.get(f.file).push(f);}
const scriptResponsibilities=[];
for(const s of inv.scripts||[]){
  const text=read(s.local);
  const fsFor=fileFunctionMap.get(s.local)||[];
  const windowExports=captures(text,/\bwindow\.([A-Za-z_$][\w$]*)\s*=/g,1,120);
  const globalAssignments=captures(text,/^\s*(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=/gm,1,120);
  const routeRefs=uniq(fsFor.flatMap(f=>f.behavior?.routeRefs||[]));
  const modelRefs=uniq(fsFor.flatMap(f=>f.behavior?.modelRefs||[]));
  const collectionRefs=uniq(fsFor.flatMap(f=>f.behavior?.collectionRefs||[]));
  const sideEffects=uniq(fsFor.flatMap(f=>f.behavior?.sideEffects||[]));
  scriptResponsibilities.push({id:s.id,order:s.order,script:s.local,exists:s.exists,line:s.line,functionCount:fsFor.length,functionIds:fsFor.map(f=>f.id),windowExports,globalAssignments,routeRefs,modelRefs,collectionRefs,sideEffects,movementFunctionCount:fsFor.filter(f=>(f.behavior?.movementTerms||[]).length).length});
}

const interactionMatrix=uiCrosswalk.map(x=>{
  const relatedFunctions=uniq([...x.handlerCandidates,...x.mentionFunctions]);
  const funcs=relatedFunctions.map(id=>(inv.functions||[]).find(f=>f.id===id)).filter(Boolean);
  return {
    uiId:x.id,
    action:x.action,
    status:x.status,
    handlerCandidates:x.handlerCandidates,
    relatedFunctions,
    routes:uniq(funcs.flatMap(f=>f.behavior?.routeRefs||[])),
    collections:uniq(funcs.flatMap(f=>f.behavior?.collectionRefs||[])),
    storageKeys:uniq(funcs.flatMap(f=>(f.behavior?.storageOperations||[]).map(o=>o.key))),
    domIds:uniq(funcs.flatMap(f=>f.behavior?.domIds||[])),
    sideEffects:uniq(funcs.flatMap(f=>f.behavior?.sideEffects||[])),
    movementTerms:uniq(funcs.flatMap(f=>f.behavior?.movementTerms||[]))
  };
});

inv.enrichment={
  generatedAt:new Date().toISOString(),
  version:'behavior-crosswalk-v1',
  functionBehavior:{total:(inv.functions||[]).length,extractionFailures:bodyFailures},
  uiCrosswalk:{total:uiCrosswalk.length,handlerCandidates:uiCrosswalk.filter(x=>x.handlerCandidates.length).length,unresolved:uiCrosswalk.filter(x=>!x.handlerCandidates.length).length},
  apiCrosswalk:{total:apiCrosswalk.length,handlerCandidates:apiCrosswalk.filter(x=>x.handlerCandidates.length).length,unresolved:apiCrosswalk.filter(x=>!x.handlerCandidates.length).length},
  persistenceCrosswalk:{total:persistenceCrosswalk.length,operationOwners:persistenceCrosswalk.filter(x=>x.functions.length).length,unresolved:persistenceCrosswalk.filter(x=>!x.functions.length).length},
  movementFunctions:movementFunctions.length,
  scripts:scriptResponsibilities.length
};
inv.uiActionCrosswalk=uiCrosswalk;
inv.apiCrosswalk=apiCrosswalk;
inv.persistenceCrosswalk=persistenceCrosswalk;
inv.movementFunctions=movementFunctions;
inv.scriptResponsibilities=scriptResponsibilities;
inv.interactionMatrix=interactionMatrix;
fs.writeFileSync(INV_PATH,JSON.stringify(inv,null,2)+'\n');

function header(title,desc){return ['# '+title,'',desc,'','Gerado em: '+code(inv.enrichment.generatedAt),''].join('\n');}
function refs(a){return (a||[]).map(x=>code(x.file+':'+x.line)).join(', ')||'—';}
function list(a){return a?.length?a.map(code).join(', '):'—';}

let lines=[header('COMPORTAMENTO OBSERVÁVEL DE CADA FUNÇÃO','Derivado do corpo real de cada função/método. Não atribui intenção não observável; registra side effects, retornos, erros, writes, operações e referências.')];
for(const f of inv.functions||[]){
  const b=f.behavior||{};
  lines.push('## '+f.id+' — '+code(f.name),'',
    '- **Fonte:** '+code(f.file+':'+f.line),
    '- **Domínio:** '+code(f.domain),
    '- **Extração:** '+code(b.extractionStatus),
    '- **Span do corpo:** '+code(String(b.sourceSpan?.startLine)+'–'+String(b.sourceSpan?.endLine)),
    '- **SHA-256 do corpo:** '+code(b.bodySha256),
    '- **Parâmetros:** '+code(f.params||'(nenhum explícito)'),
    '- **Side effects observáveis:** '+list(b.sideEffects),
    '- **Chamadas internas:** '+list(f.calls),
    '- **Rotas:** '+list(b.routeRefs),
    '- **Métodos HTTP observados:** '+list(b.httpMethods),
    '- **Sinais de autenticação:** '+list(b.authSignals),
    '- **Coleções:** '+list(b.collectionRefs),
    '- **Operações DB:** '+list(b.dbOperations),
    '- **Storage:** '+(b.storageOperations?.length?b.storageOperations.map(o=>code(o.scope+'.'+o.operation+'('+o.key+')')).join(', '):'—'),
    '- **DOM IDs:** '+list(b.domIds),
    '- **Env:** '+list(b.envRefs),
    '- **Writes detectados:** '+list((b.stateWrites||[]).slice(0,40)),
    '- **Mutações detectadas:** '+list((b.mutationCalls||[]).slice(0,40)),
    '- **Retornos:** '+String(b.returnCount||0)+(b.returnSamples?.length?' — '+b.returnSamples.slice(0,6).map(code).join(', '):''),
    '- **Throws:** '+String(b.throwCount||0)+(b.throwMessages?.length?' — '+b.throwMessages.slice(0,6).map(code).join(', '):''),
    '- **Códigos/constantes de erro:** '+list((b.errorCodes||[]).slice(0,20)),
    '- **Timers:** '+list(b.timers),
    '- **Movimento/mapa:** '+list(b.movementTerms),
    '- **Status documental:** '+code('STATIC_BEHAVIOR_EVIDENCE'),'');
}
fs.writeFileSync(path.join(OUT,'11-FUNCTION-BEHAVIORS.md'),lines.join('\n')+'\n');

lines=[header('CROSSWALK DE AÇÕES DA INTERFACE','Cada data-action/data-go é ligado a fontes, emissões e candidatos de handler por evidência literal no corpo de funções.')];
for(const x of uiCrosswalk){
  lines.push('## '+x.id+' — '+code(x.action),'',
    '- **Fontes UI:** '+refs(x.sources),
    '- **Candidatos de handler:** '+list(x.handlerCandidates),
    '- **Funções emissoras:** '+list(x.emitterFunctions),
    '- **Menções em funções:** '+list(x.mentionFunctions),
    '- **Status:** '+code(x.status),'');
}
fs.writeFileSync(path.join(OUT,'12-UI-ACTION-CROSSWALK.md'),lines.join('\n')+'\n');

lines=[header('EVIDÊNCIA DE CONTRATO DAS ROTAS API','Rotas literais ligadas às funções que as referenciam, com método/auth/side effects observáveis.')];
for(const x of apiCrosswalk){
  lines.push('## '+x.id+' — '+code(x.route),'','- **Fontes literais:** '+refs(x.sources),'- **Status:** '+code(x.status));
  for(const h of x.handlerCandidates)lines.push('  - '+code(h.functionId+' '+h.name)+' @ '+code(h.file+':'+h.line)+' — métodos '+list(h.httpMethods)+' — auth '+list(h.authSignals)+' — efeitos '+list(h.sideEffects));
  lines.push('');
}
fs.writeFileSync(path.join(OUT,'13-API-CONTRACT-EVIDENCE.md'),lines.join('\n')+'\n');

lines=[header('OPERAÇÕES DE PERSISTÊNCIA','Cada coleção MongoDB é ligada às funções que a referenciam e às operações de banco observadas nesses corpos.')];
for(const x of persistenceCrosswalk){
  lines.push('## '+x.id+' — '+code(x.collection),'','- **Fontes literais:** '+refs(x.sources),'- **Status:** '+code(x.status));
  for(const h of x.functions)lines.push('  - '+code(h.functionId+' '+h.name)+' @ '+code(h.file+':'+h.line)+' — operações '+list(h.dbOperations)+' — auth '+list(h.authSignals));
  lines.push('');
}
fs.writeFileSync(path.join(OUT,'14-PERSISTENCE-OPERATIONS.md'),lines.join('\n')+'\n');

lines=[header('RESPONSABILIDADE DOS SCRIPTS CARREGADOS','Para cada script do index: funções, exports globais, rotas, modelos, coleções, side effects e evidência de movimento.')];
for(const s of scriptResponsibilities){
  lines.push('## '+s.id+' — ordem '+s.order+' — '+code(s.script),'',
    '- **Existe:** '+(s.exists?'SIM':'NÃO'),
    '- **Linha no index:** '+s.line,
    '- **Funções:** '+s.functionCount+(s.functionIds.length?' — '+list(s.functionIds):''),
    '- **window exports:** '+list(s.windowExports),
    '- **Declarações globais:** '+list(s.globalAssignments),
    '- **Rotas:** '+list(s.routeRefs),
    '- **Modelos IA:** '+list(s.modelRefs),
    '- **Coleções:** '+list(s.collectionRefs),
    '- **Side effects:** '+list(s.sideEffects),
    '- **Funções com evidência de movimento:** '+s.movementFunctionCount,'');
}
fs.writeFileSync(path.join(OUT,'15-SCRIPT-RESPONSIBILITIES.md'),lines.join('\n')+'\n');

lines=[header('FUNÇÕES RELACIONADAS A MOVIMENTO/MAPA','Funções cujo corpo contém evidência lexical de movimento, mapa, localização, posição, alcance ou viagem.')];
for(const m of movementFunctions){
  lines.push('- **'+m.functionId+' '+m.name+'** — '+code(m.file+':'+m.line)+' — domínio '+code(m.domain)+' — termos '+list(m.terms)+' — efeitos '+list(m.sideEffects)+' — writes '+list(m.stateWrites.slice(0,20))+' — chamadas '+list(m.calls));
}
fs.writeFileSync(path.join(OUT,'16-MOVEMENT-FUNCTIONS.md'),lines.join('\n')+'\n');

lines=[header('MATRIZ OPERACIONAL DE INTERAÇÕES','Ação de UI → funções relacionadas → rotas/DB/storage/DOM/side effects/movimento detectados.')];
lines.push('| UI | Ação | Status | Handlers | Rotas | Coleções | Storage | DOM | Efeitos | Movimento |','|---|---|---|---|---|---|---|---|---|---|');
for(const x of interactionMatrix)lines.push('| '+x.uiId+' | '+code(x.action)+' | '+x.status+' | '+list(x.handlerCandidates)+' | '+list(x.routes)+' | '+list(x.collections)+' | '+list(x.storageKeys)+' | '+list(x.domIds)+' | '+list(x.sideEffects)+' | '+list(x.movementTerms)+' |');
fs.writeFileSync(path.join(OUT,'17-INTERACTION-MATRIX.md'),lines.join('\n')+'\n');

console.log(JSON.stringify({ok:true,enrichment:inv.enrichment},null,2));
