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
const UI_EXT=new Set(['.js','.mjs','.cjs','.html']);

if(!fs.existsSync(invPath))fail('TECHNICAL-INVENTORY.json ausente');
let inv={};
if(!failures.length){try{inv=JSON.parse(fs.readFileSync(invPath,'utf8'));}catch(e){fail('inventario JSON invalido: '+e.message);}}

const required=[
  'docs/generated/00-INVENTORY-SUMMARY.md','docs/generated/01-FUNCTIONS.md','docs/generated/02-API.md',
  'docs/generated/03-AI.md','docs/generated/04-PERSISTENCE.md','docs/generated/05-UI-INTERACTIONS.md',
  'docs/generated/06-SCRIPTS.md','docs/generated/07-MOVEMENT-ACTIONS.md','docs/generated/08-TRACEABILITY.md',
  'docs/generated/10-ASSET-REFERENCES.md','docs/generated/11-FUNCTION-BEHAVIORS.md','docs/generated/12-UI-ACTION-CROSSWALK.md',
  'docs/generated/13-API-CONTRACT-EVIDENCE.md','docs/generated/14-PERSISTENCE-OPERATIONS.md','docs/generated/15-SCRIPT-RESPONSIBILITIES.md',
  'docs/generated/16-MOVEMENT-FUNCTIONS.md','docs/generated/17-INTERACTION-MATRIX.md','docs/generated/18-AST-FUNCTION-INDEX.md',
  'docs/generated/19-UNRESOLVED-UI-ACTIONS.md','docs/generated/20-UI-SOURCE-FILTER.md',
  'docs/generated/21-UI-DISPATCH-RESOLUTION.md','docs/generated/22-UI-DISPATCHERS.md','docs/generated/23-UNRESOLVED-UI-ACTIONS-AST.md'
];
for(const p of required)if(!exists(p))fail('arquivo gerado ausente: '+p);

if(inv.astIndex?.parser!=='acorn')fail('parser AST canônico não é Acorn');
if(Number(inv.astIndex?.parseFailures)!==0)fail('AST possui falhas de parse: '+String(inv.astIndex?.parseFailures));
if(Number(inv.astIndex?.functions)!==(inv.functions||[]).length)fail('contagem AST de funções diverge do inventário');
if(!(Number(inv.astIndex?.anonymousFunctions)>0))fail('AST não encontrou funções anônimas/callbacks');
if(inv.refinement?.semanticDiscovery!=='game-runtime-only')fail('semântica do jogo não está restrita ao runtime');
if(inv.refinement?.excludedDocumentation!==true)fail('docs/ não estão formalmente excluídos da descoberta');
if(inv.refinement?.excludedToolingFromGameSemantics!==true)fail('tooling não está formalmente excluído da semântica do jogo');
if(inv.uiActionSourceFilter?.mode!=='executable-ui-sources-only')fail('filtro de fontes UI executable-ui-sources-only ausente');
if(inv.enrichment?.version!=='ast-behavior-crosswalk-v2')fail('enriquecimento AST v2 ausente');
if(inv.enrichment?.uiResolverVersion!=='ast-dispatch-v3')fail('resolvedor UI ast-dispatch-v3 ausente');
if(inv.uiDispatchResolution?.version!=='ast-dispatch-v3')fail('resolução UI v3 ausente do inventário');
if(Number(inv.enrichment?.functionBehavior?.total||0)!==(inv.functions||[]).length)fail('comportamento não cobre todas as funções AST');
if(Number(inv.enrichment?.functionBehavior?.exactAstBodies||0)!==(inv.functions||[]).length)fail('nem todos os corpos são spans AST exatos');
if(Number(inv.enrichment?.functionBehavior?.extractionFailures||0)!==0)fail('houve falha na extração exata de corpos');
if(Number(inv.enrichment?.uiCrosswalk?.total||0)!==(inv.uiActions||[]).length)fail('crosswalk UI base não cobre todas as ações filtradas');
if(Number(inv.uiDispatchResolution?.total||0)!==(inv.uiActions||[]).length)fail('resolvedor UI v3 não cobre todas as ações filtradas');
if((inv.uiActionResolvedCrosswalk||[]).length!==(inv.uiActions||[]).length)fail('crosswalk resolvido v3 incompleto');
if(Number(inv.enrichment?.apiCrosswalk?.total||0)!==(inv.routes||[]).length)fail('crosswalk API não cobre todas as rotas');
if(Number(inv.enrichment?.persistenceCrosswalk?.total||0)!==(inv.collections||[]).length)fail('crosswalk DB não cobre todas as coleções');
if(Number(inv.enrichment?.scripts||0)!==(inv.scripts||[]).length)fail('responsabilidade de scripts incompleta');

for(const f of inv.functions||[]){
  if(!f.id||!f.file||!f.line||!f.name)fail('função sem rastreabilidade: '+JSON.stringify(f).slice(0,220));
  if(isDoc(f.file))fail('função contaminada por docs: '+f.id+' '+f.file);
  if(!f.ast||f.ast.parser!=='acorn')fail('função sem AST Acorn: '+f.id);
  if(!(Number(f.ast.start)>=0)||!(Number(f.ast.end)>Number(f.ast.start)))fail('span AST inválido: '+f.id);
  if(!(Number(f.ast.bodyStart)>=Number(f.ast.start))||!(Number(f.ast.bodyEnd)<=Number(f.ast.end)))fail('span de corpo AST inválido: '+f.id);
  if(!f.ast.functionSha256||f.ast.functionSha256.length!==64||!f.ast.bodySha256||f.ast.bodySha256.length!==64)fail('hash AST ausente: '+f.id);
  if(!f.behavior||f.behavior.extractionStatus!=='OK_AST_EXACT')fail('comportamento não usa span AST exato: '+f.id);
  if(f.behavior.bodySha256!==f.ast.bodySha256)fail('hash do corpo diverge entre AST e comportamento: '+f.id);
}

function auditGameGrouped(items,label){for(const item of items||[]){if(!item.id||!(item.sources||[]).length)fail(label+' sem fonte');for(const src of item.sources||[])if(!isGameRuntime(src.file))fail(label+' contaminado por docs/tooling: '+item.id+' '+src.file);}}
auditGameGrouped(inv.routes,'rota');auditGameGrouped(inv.models,'modelo IA');auditGameGrouped(inv.collections,'coleção');auditGameGrouped(inv.uiActions,'ação UI');auditGameGrouped(inv.events,'evento');

for(const action of inv.uiActions||[]){
  for(const src of action.sources||[]){
    const ext=path.extname(src.file||'').toLowerCase();
    if(!UI_EXT.has(ext))fail('fonte UI não executável permaneceu após filtro: '+action.id+' '+src.file+':'+src.line);
  }
}
for(const row of inv.uiActionResolvedCrosswalk||[]){
  if(!row.id||!row.action||!row.status||!Array.isArray(row.handlerFunctionIds))fail('linha de resolução UI inválida: '+JSON.stringify(row).slice(0,220));
  for(const id of row.handlerFunctionIds){if(!(inv.functions||[]).some(f=>f.id===id))fail('handler UI aponta para função inexistente: '+row.id+' -> '+id);}
}

const escFn=(inv.functions||[]).find(f=>f.file==='app.js'&&f.name==='esc');
if(!escFn)fail('função app.js::esc não encontrada pelo AST');
else{
  if((escFn.endLine-escFn.line)>8)fail('sanity check: esc() ainda engoliu código demais: '+escFn.line+'-'+escFn.endLine);
  if((escFn.behavior?.routeRefs||[]).length)fail('sanity check: esc() contém rotas indevidas');
  if((escFn.behavior?.handlerLiterals||[]).length)fail('sanity check: esc() contém handlers UI indevidos');
}

const entry='cloudflare/r41-api/src/entry.js',wrangler='cloudflare/r41-api/wrangler.toml';
if(!exists(entry))fail(entry+' ausente');if(!exists(wrangler))fail(wrangler+' ausente');
if(exists(wrangler)){const w=fs.readFileSync(path.join(ROOT,wrangler),'utf8');if(!/^main\s*=\s*["']src\/entry\.js["']/m.test(w))fail('wrangler não aponta para src/entry.js');if(!/binding\s*=\s*["']AI["']/m.test(w))fail('binding AI ausente');if(!/name\s*=\s*["']GAME_ROOMS["']/m.test(w))fail('binding GAME_ROOMS ausente');}
if(exists(entry)){const e=fs.readFileSync(path.join(ROOT,entry),'utf8');if(!/const\s+AI_MODEL\s*=\s*["']@cf\/zai-org\/glm-4\.7-flash["']/.test(e))fail('GLM-4.7-Flash principal não localizado');if(!/CLIENT_MECHANICAL_RESULT_FORBIDDEN/.test(e))fail('guard mecânico do cliente ausente');if(!/env\.AI\.run/.test(e))fail('env.AI.run ausente');}
const modelNames=(inv.models||[]).map(x=>x.model).sort();
if(modelNames.some(x=>x.includes('...')))fail('placeholder de modelo contaminou runtime');
if(!modelNames.includes('@cf/zai-org/glm-4.7-flash'))fail('GLM principal ausente do inventário');

const unresolvedConcrete=(inv.uiActionResolvedCrosswalk||[]).filter(x=>!x.dynamicTemplate&&!x.handlerFunctionIds?.length);
if(unresolvedConcrete.length)warn(unresolvedConcrete.length+' ações UI concretas ainda sem handler AST resolvido; ver 23-UNRESOLVED-UI-ACTIONS-AST.md');
const missingAssets=Number(inv.counts?.missingLiteralAssetReferences||0);if(missingAssets)warn(missingAssets+' referências literais de assets não materializadas');

const staticCoverage={
  sourceFiles:Number(inv.counts?.sourceFiles||0),gameRuntimeSourceFiles:Number(inv.counts?.gameRuntimeSourceFiles||0),toolingSourceFiles:Number(inv.counts?.toolingSourceFiles||0),
  astParsedJsFiles:Number(inv.astIndex?.parsedFiles||0),astFunctions:(inv.functions||[]).length,anonymousFunctions:Number(inv.astIndex?.anonymousFunctions||0),callbackFunctions:Number(inv.astIndex?.callbackFunctions||0),
  exactFunctionBodies:Number(inv.enrichment?.functionBehavior?.exactAstBodies||0),routes:(inv.routes||[]).length,models:(inv.models||[]).length,collections:(inv.collections||[]).length,
  uiActions:(inv.uiActions||[]).length,uiNonExecutableSourcesRemoved:Number(inv.uiActionSourceFilter?.removedSources?.length||0),dynamicUiTemplates:Number(inv.uiDispatchResolution?.dynamicTemplates||0),concreteUiActions:Number(inv.uiDispatchResolution?.concrete||0),resolvedUiHandlers:Number(inv.uiDispatchResolution?.resolved||0),unresolvedConcreteUi:unresolvedConcrete.length,
  exactUiHandlers:Number(inv.uiDispatchResolution?.exact||0),dispatchTableUiHandlers:Number(inv.uiDispatchResolution?.table||0),prefixUiHandlers:Number(inv.uiDispatchResolution?.prefix||0),
  events:(inv.events||[]).length,movementEvidence:(inv.movement||[]).length,movementFunctions:(inv.movementFunctions||[]).length,scripts:(inv.scripts||[]).length,uniqueAssetReferences:Number(inv.counts?.uniqueAssetReferences||0),missingLiteralAssetReferences:missingAssets
};

const astFailure=failures.some(x=>/AST|span|hash|esc\(\)/i.test(x));
const uiFailure=failures.some(x=>/UI|handler|resolvedor|crosswalk/i.test(x));
const semanticFailure=failures.some(x=>/contamin|semântica|runtime/i.test(x));
const report={generatedAt:new Date().toISOString(),ok:failures.length===0,status:failures.length===0?'PASS_AST_STATIC_DOCUMENTATION':'FAIL',meaning:'PASS_AST_STATIC_DOCUMENTATION prova limites exatos de funções/callbacks por AST, fontes UI executáveis e resolução estática de dispatchers. Não equivale a runtime/E2E.',parser:{name:'acorn',version:inv.astIndex?.parserVersion||null},uiResolver:{version:inv.uiDispatchResolution?.version||null,aliasPropagationRounds:inv.uiDispatchResolution?.aliasPropagationRounds||0},staticCoverage,modelNames,failures,warnings,gates:{astParsing:astFailure?'FAIL':'PASS',functionBehaviorDocumentation:astFailure?'FAIL':'PASS',runtimeSemanticIsolation:semanticFailure?'FAIL':'PASS',uiSourceFiltering:uiFailure?'FAIL':'PASS',uiDispatchResolution:uiFailure?'FAIL':'PASS',uiHandlerCompleteness:unresolvedConcrete.length===0?'PASS':'PARTIAL',runtimeExecution:'UNVERIFIED',browserInteraction:'UNVERIFIED',workersLive:'UNVERIFIED',mongodbLive:'UNVERIFIED',gameplayE2E:'UNVERIFIED',assetPathCompleteness:missingAssets===0?'PASS':'FAIL_OR_EXTERNAL_OVERLAY_REQUIRED'}};
fs.writeFileSync(path.join(GEN,'DOCUMENTATION-AUDIT.json'),JSON.stringify(report,null,2)+'\n');
let md='# AUDITORIA DE COBERTURA DA DOCUMENTAÇÃO\n\nStatus: **'+report.status+'**\n\nParser: **Acorn AST**. Resolvedor UI: **ast-dispatch-v3**. Fontes UI: apenas JS/MJS/CJS/HTML.\n\n## Cobertura\n\n| Categoria | Total |\n|---|---:|\n';for(const [k,v] of Object.entries(staticCoverage))md+='| '+k+' | '+v+' |\n';md+='\n## Gates\n\n';for(const [k,v] of Object.entries(report.gates))md+='- **'+k+':** '+v+'\n';if(warnings.length)md+='\n## Avisos\n\n'+warnings.map(x=>'- '+x).join('\n')+'\n';if(failures.length)md+='\n## Falhas\n\n'+failures.map(x=>'- '+x).join('\n')+'\n';fs.writeFileSync(path.join(GEN,'09-DOCUMENTATION-AUDIT.md'),md);
console.log(JSON.stringify(report,null,2));if(failures.length)process.exit(1);
