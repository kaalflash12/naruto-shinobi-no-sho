import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd();
const GEN=path.join(ROOT,'docs','generated');
const invPath=path.join(GEN,'TECHNICAL-INVENTORY.json');
const failures=[];
const warnings=[];

const fail=x=>failures.push(x);
const warn=x=>warnings.push(x);
const exists=p=>fs.existsSync(path.join(ROOT,p));
const norm=p=>String(p||'').replace(/\\/g,'/');
const isDoc=p=>norm(p).startsWith('docs/');
const isTooling=p=>norm(p).startsWith('tools/')||norm(p).startsWith('.github/');
const isGameRuntime=p=>!isDoc(p)&&!isTooling(p);

if(!fs.existsSync(invPath))fail('TECHNICAL-INVENTORY.json ausente: execute npm run docs:generate');
let inv={};
if(!failures.length){
  try{inv=JSON.parse(fs.readFileSync(invPath,'utf8'));}
  catch(e){fail('inventario JSON invalido: '+e.message);}
}

const requiredGenerated=[
  'docs/generated/00-INVENTORY-SUMMARY.md',
  'docs/generated/01-FUNCTIONS.md',
  'docs/generated/02-API.md',
  'docs/generated/03-AI.md',
  'docs/generated/04-PERSISTENCE.md',
  'docs/generated/05-UI-INTERACTIONS.md',
  'docs/generated/06-SCRIPTS.md',
  'docs/generated/07-MOVEMENT-ACTIONS.md',
  'docs/generated/08-TRACEABILITY.md',
  'docs/generated/10-ASSET-REFERENCES.md',
  'docs/generated/11-FUNCTION-BEHAVIORS.md',
  'docs/generated/12-UI-ACTION-CROSSWALK.md',
  'docs/generated/13-API-CONTRACT-EVIDENCE.md',
  'docs/generated/14-PERSISTENCE-OPERATIONS.md',
  'docs/generated/15-SCRIPT-RESPONSIBILITIES.md',
  'docs/generated/16-MOVEMENT-FUNCTIONS.md',
  'docs/generated/17-INTERACTION-MATRIX.md'
];
for(const p of requiredGenerated)if(!exists(p))fail('arquivo gerado ausente: '+p);

if(inv.refinement?.mode!=='runtime-semantics-plus-tooling-functions')fail('modo de refinamento inesperado: '+String(inv.refinement?.mode||'ausente'));
if(inv.refinement?.semanticDiscovery!=='game-runtime-only')fail('semantica de jogo nao esta restrita a game-runtime-only');
if(inv.refinement?.functionDiscovery!=='all-source-except-docs')fail('funcoes nao estao em modo all-source-except-docs');
if(inv.refinement?.excludedDocumentation!==true)fail('inventario nao comprova exclusao de docs/');
if(inv.refinement?.excludedToolingFromGameSemantics!==true)fail('inventario nao comprova exclusao de tools/.github da semantica do jogo');

if(inv.enrichment?.version!=='behavior-crosswalk-v1')fail('enriquecimento behavior-crosswalk-v1 ausente');
if(Number(inv.enrichment?.functionBehavior?.total||0)!==(inv.functions||[]).length)fail('enriquecimento nao cobre todas as funcoes');
if(Number(inv.enrichment?.functionBehavior?.extractionFailures||0)!==0)fail('existem corpos de funcao nao extraidos: '+String(inv.enrichment?.functionBehavior?.extractionFailures));
if(Number(inv.enrichment?.uiCrosswalk?.total||0)!==(inv.uiActions||[]).length)fail('crosswalk UI nao cobre todas as acoes');
if(Number(inv.enrichment?.apiCrosswalk?.total||0)!==(inv.routes||[]).length)fail('crosswalk API nao cobre todas as rotas');
if(Number(inv.enrichment?.persistenceCrosswalk?.total||0)!==(inv.collections||[]).length)fail('crosswalk DB nao cobre todas as colecoes');
if(Number(inv.enrichment?.scripts||0)!==(inv.scripts||[]).length)fail('responsabilidade de scripts nao cobre toda a ordem de carregamento');

if(inv.counts){
  if(!(inv.counts.files>0))fail('nenhum arquivo inventariado');
  if(!(inv.counts.sourceFiles>0))fail('nenhum arquivo fonte inventariado');
  if(!(inv.counts.gameRuntimeSourceFiles>0))fail('nenhum arquivo de runtime do jogo inventariado');
  if(!(inv.counts.functions>0))fail('nenhuma funcao/metodo inventariado');
  if(!(inv.counts.gameRuntimeFunctions>0))fail('nenhuma funcao do runtime do jogo inventariada');
  if(!(inv.counts.routes>0))fail('nenhuma rota /api do jogo inventariada');
  if(!(inv.counts.scriptTags>0))fail('nenhum script do index inventariado');
}else if(!failures.length){
  fail('counts ausente do inventario');
}

for(const s of inv.scripts||[]){if(!s.exists)fail('script carregado por index.html nao existe: '+s.local);}

for(const f of inv.functions||[]){
  if(!f.id||!f.file||!f.line||!f.name)fail('funcao sem rastreabilidade completa: '+JSON.stringify(f).slice(0,250));
  if(isDoc(f.file))fail('funcao contaminada por documentacao: '+f.id+' '+f.file);
  if(!['game-runtime','tooling','other-source'].includes(f.domain))fail('funcao sem dominio valido: '+f.id+' '+String(f.domain));
  const b=f.behavior;
  if(!b)fail('funcao sem comportamento observavel: '+f.id);
  else{
    if(!String(b.extractionStatus||'').startsWith('OK_'))fail('extracao de corpo falhou: '+f.id+' '+String(b.extractionStatus));
    if(!b.bodySha256||b.bodySha256.length!==64)fail('funcao sem hash de corpo: '+f.id);
    if(!(Number(b.sourceSpan?.startLine)>0)||!(Number(b.sourceSpan?.endLine)>=Number(b.sourceSpan?.startLine)))fail('span invalido: '+f.id);
    for(const key of ['sideEffects','stateWrites','mutationCalls','httpMethods','dbOperations','storageOperations','authSignals','domIds','routeRefs','collectionRefs','modelRefs','envRefs','timers','movementTerms']){
      if(!Array.isArray(b[key]))fail('campo behavior ausente/nao-array: '+f.id+' '+key);
    }
  }
}

function auditGameGrouped(items,label){
  for(const item of items||[]){
    if(!item.id||!(item.sources||[]).length)fail(label+' sem ID/fonte: '+JSON.stringify(item).slice(0,250));
    for(const src of item.sources||[])if(!isGameRuntime(src.file))fail(label+' contaminado por docs/tooling: '+item.id+' '+src.file);
  }
}
auditGameGrouped(inv.routes,'rota');
auditGameGrouped(inv.models,'modelo IA');
auditGameGrouped(inv.collections,'colecao');
auditGameGrouped(inv.uiActions,'acao UI');
auditGameGrouped(inv.events,'evento');

for(const x of inv.storage||[]){
  if(!x.id||!x.file||!x.line||!x.value)fail('storage sem rastreabilidade completa: '+JSON.stringify(x).slice(0,250));
  if(!isGameRuntime(x.file))fail('storage contaminado por docs/tooling: '+x.id+' '+x.file);
}
for(const x of inv.movement||[]){
  if(!x.id||!x.file||!x.line)fail('movimento sem rastreabilidade: '+JSON.stringify(x).slice(0,250));
  if(!isGameRuntime(x.file))fail('movimento contaminado por docs/tooling: '+x.id+' '+x.file);
}
for(const x of inv.assets||[]){
  if(!x.id||!x.file||!x.line||!x.value)fail('asset sem rastreabilidade: '+JSON.stringify(x).slice(0,250));
  if(!isGameRuntime(x.file))fail('asset contaminado por docs/tooling: '+x.id+' '+x.file);
}
for(const x of inv.environment||[]){
  if(!x.id||!x.file||!x.line||!x.value)fail('env sem rastreabilidade: '+JSON.stringify(x).slice(0,250));
  if(!isGameRuntime(x.file))fail('env contaminado por docs/tooling: '+x.id+' '+x.file);
}

for(const x of inv.uiActionCrosswalk||[]){
  if(!x.id||!x.action||!Array.isArray(x.handlerCandidates)||!Array.isArray(x.mentionFunctions)||!x.status)fail('entrada UI crosswalk invalida: '+JSON.stringify(x).slice(0,250));
}
for(const x of inv.apiCrosswalk||[]){
  if(!x.id||!x.route||!Array.isArray(x.handlerCandidates)||!x.status)fail('entrada API crosswalk invalida: '+JSON.stringify(x).slice(0,250));
}
for(const x of inv.persistenceCrosswalk||[]){
  if(!x.id||!x.collection||!Array.isArray(x.functions)||!x.status)fail('entrada persistence crosswalk invalida: '+JSON.stringify(x).slice(0,250));
}
for(const x of inv.scriptResponsibilities||[]){
  if(!x.id||!x.script||!Array.isArray(x.functionIds)||!Array.isArray(x.sideEffects))fail('responsabilidade de script invalida: '+JSON.stringify(x).slice(0,250));
}
if((inv.interactionMatrix||[]).length!==(inv.uiActions||[]).length)fail('matriz operacional nao cobre todas as acoes UI');

const runtime=(inv.files||[]).filter(x=>x.runtime&&!isDoc(x.path));
for(const f of runtime)if(!f.sha256||f.sha256.length!==64)fail('runtime/source sem SHA-256: '+f.path);

const entry='cloudflare/r41-api/src/entry.js';
const wrangler='cloudflare/r41-api/wrangler.toml';
if(!exists(entry))fail(entry+' ausente');
if(!exists(wrangler))fail(wrangler+' ausente');
if(exists(wrangler)){
  const w=fs.readFileSync(path.join(ROOT,wrangler),'utf8');
  if(!/^main\s*=\s*["']src\/entry\.js["']/m.test(w))fail('wrangler.toml nao aponta main para src/entry.js');
  if(!/binding\s*=\s*["']AI["']/m.test(w))fail('binding AI nao declarado em wrangler.toml');
  if(!/name\s*=\s*["']GAME_ROOMS["']/m.test(w))fail('binding GAME_ROOMS nao declarado em wrangler.toml');
}
if(exists(entry)){
  const e=fs.readFileSync(path.join(ROOT,entry),'utf8');
  if(!/const\s+AI_MODEL\s*=\s*["']@cf\/zai-org\/glm-4\.7-flash["']/.test(e))fail('modelo principal GLM-4.7-Flash nao localizado no entry.js');
  if(!/CLIENT_MECHANICAL_RESULT_FORBIDDEN/.test(e))fail('guard CLIENT_MECHANICAL_RESULT_FORBIDDEN ausente do entry.js');
  if(!/env\.AI\.run/.test(e))fail('entry.js nao possui chamada env.AI.run');
  if(!/TERION[^\n]{0,180}autoridade mec[aâ]nica/i.test(e))warn('frase de autoridade TERION nao localizada literalmente no entry.js');
}

const modelNames=(inv.models||[]).map(x=>x.model).sort();
if(modelNames.some(x=>x==='@cf/...'||x.includes('...')))fail('modelo ficticio/placeholder contaminou inventario de runtime: '+modelNames.join(', '));
if(!modelNames.includes('@cf/zai-org/glm-4.7-flash'))fail('GLM-4.7-Flash ausente do inventario de runtime');
if(!modelNames.includes('@cf/meta/llama-3.2-1b-instruct'))warn('modelo-base Llama nao apareceu; confirme se foi removido do worker-base');

const unresolvedUi=(inv.uiActionCrosswalk||[]).filter(x=>!x.handlerCandidates.length).length;
const unresolvedApi=(inv.apiCrosswalk||[]).filter(x=>!x.handlerCandidates.length).length;
const unresolvedDb=(inv.persistenceCrosswalk||[]).filter(x=>!x.functions.length).length;
if(unresolvedUi)warn(unresolvedUi+' acoes UI sem candidato de handler literal; estao documentadas como unresolved no crosswalk');
if(unresolvedApi)warn(unresolvedApi+' rotas sem owner de funcao literal; estao documentadas como unresolved no crosswalk');
if(unresolvedDb)warn(unresolvedDb+' colecoes sem owner de funcao literal; estao documentadas como unresolved no crosswalk');

const staticCoverage={
  sourceFiles:Number(inv.counts?.sourceFiles||0),
  gameRuntimeSourceFiles:Number(inv.counts?.gameRuntimeSourceFiles||0),
  toolingSourceFiles:Number(inv.counts?.toolingSourceFiles||0),
  functions:(inv.functions||[]).length,
  functionBodiesDocumented:(inv.functions||[]).filter(f=>String(f.behavior?.extractionStatus||'').startsWith('OK_')).length,
  gameRuntimeFunctions:Number(inv.counts?.gameRuntimeFunctions||0),
  toolingFunctions:Number(inv.counts?.toolingFunctions||0),
  routes:(inv.routes||[]).length,
  routeCrosswalkEntries:(inv.apiCrosswalk||[]).length,
  models:(inv.models||[]).length,
  collections:(inv.collections||[]).length,
  persistenceCrosswalkEntries:(inv.persistenceCrosswalk||[]).length,
  storage:(inv.storage||[]).length,
  uiActions:(inv.uiActions||[]).length,
  uiCrosswalkEntries:(inv.uiActionCrosswalk||[]).length,
  unresolvedUiHandlers:unresolvedUi,
  unresolvedApiOwners:unresolvedApi,
  unresolvedDbOwners:unresolvedDb,
  events:(inv.events||[]).length,
  movementEvidence:(inv.movement||[]).length,
  movementFunctions:(inv.movementFunctions||[]).length,
  scripts:(inv.scripts||[]).length,
  scriptResponsibilityEntries:(inv.scriptResponsibilities||[]).length,
  runtimeFiles:runtime.length,
  uniqueAssetReferences:Number(inv.counts?.uniqueAssetReferences||0),
  missingLiteralAssetReferences:Number(inv.counts?.missingLiteralAssetReferences||0)
};

if(staticCoverage.missingLiteralAssetReferences>0)warn(staticCoverage.missingLiteralAssetReferences+' referencias literais de assets nao materializadas; ver docs/generated/10-ASSET-REFERENCES.md e auditoria especifica de assets');

const contaminationFailure=failures.some(x=>/contamin|semantica de jogo|exclusao|modo de refinamento|placeholder/.test(x));
const behaviorFailure=failures.some(x=>/comportamento|corpo|span|behavior|crosswalk|matriz operacional|responsabilidade de script|enriquecimento/.test(x));
const report={
  generatedAt:new Date().toISOString(),
  ok:failures.length===0,
  status:failures.length===0?'PASS_STATIC_DOCUMENTATION':'FAIL',
  meaning:'PASS_STATIC_DOCUMENTATION prova inventario source-only e documentacao operacional estatica de cada funcao detectada, cada acao UI, rota, colecao, script e evidencia de movimento. Nao equivale a PASS de runtime/jogabilidade/E2E.',
  discoveryMode:'runtime-semantics-plus-tooling-functions',
  semanticDiscovery:'game-runtime-only',
  enrichmentVersion:inv.enrichment?.version||null,
  staticCoverage,
  modelNames,
  failures,
  warnings,
  gates:{
    staticInventory:failures.length===0?'PASS':'FAIL',
    documentationExcludedFromDiscovery:contaminationFailure?'FAIL':'PASS',
    toolingExcludedFromGameSemantics:contaminationFailure?'FAIL':'PASS',
    functionBehaviorDocumentation:behaviorFailure?'FAIL':'PASS',
    interactionCrosswalkDocumentation:behaviorFailure?'FAIL':'PASS',
    apiCrosswalkDocumentation:behaviorFailure?'FAIL':'PASS',
    persistenceCrosswalkDocumentation:behaviorFailure?'FAIL':'PASS',
    scriptResponsibilityDocumentation:behaviorFailure?'FAIL':'PASS',
    runtimeExecution:'UNVERIFIED',
    browserInteraction:'UNVERIFIED',
    workersLive:'UNVERIFIED',
    mongodbLive:'UNVERIFIED',
    gameplayE2E:'UNVERIFIED',
    implementationSemanticCompleteness:'REQUIRES_RUNTIME_EVIDENCE',
    assetPathCompleteness:staticCoverage.missingLiteralAssetReferences===0?'PASS':'FAIL_OR_EXTERNAL_OVERLAY_REQUIRED'
  }
};

fs.mkdirSync(GEN,{recursive:true});
fs.writeFileSync(path.join(GEN,'DOCUMENTATION-AUDIT.json'),JSON.stringify(report,null,2)+'\n');
let md='# AUDITORIA DE COBERTURA DA DOCUMENTAÇÃO\n\n';
md+='Status: **'+report.status+'**\n\n';
md+='Funções: `all-source-except-docs`. Semântica do jogo: `game-runtime-only`. Comportamento por função: `behavior-crosswalk-v1`.\n\n';
md+='`PASS_STATIC_DOCUMENTATION` comprova documentação estática/rastreável; não substitui execução viva.\n\n';
md+='## Modelos de IA detectados no runtime\n\n'+modelNames.map(x=>'- `'+x+'`').join('\n')+'\n\n';
md+='## Cobertura\n\n| Categoria | Total |\n|---|---:|\n';
for(const [k,v] of Object.entries(staticCoverage))md+='| '+k+' | '+v+' |\n';
md+='\n## Gates\n\n';
for(const [k,v] of Object.entries(report.gates))md+='- **'+k+':** '+v+'\n';
if(warnings.length)md+='\n## Avisos\n\n'+warnings.map(x=>'- '+x).join('\n')+'\n';
if(failures.length)md+='\n## Falhas\n\n'+failures.map(x=>'- '+x).join('\n')+'\n';
fs.writeFileSync(path.join(GEN,'09-DOCUMENTATION-AUDIT.md'),md);

console.log(JSON.stringify(report,null,2));
if(failures.length)process.exit(1);
