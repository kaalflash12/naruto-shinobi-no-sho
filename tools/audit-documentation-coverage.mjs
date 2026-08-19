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
  'docs/generated/19-UNRESOLVED-UI-ACTIONS.md'
];
for(const p of required)if(!exists(p))fail('arquivo gerado ausente: '+p);

if(inv.astIndex?.parser!=='acorn')fail('parser AST canônico não é Acorn');
if(Number(inv.astIndex?.parseFailures)!==0)fail('AST possui falhas de parse: '+String(inv.astIndex?.parseFailures));
if(Number(inv.astIndex?.functions)!==(inv.functions||[]).length)fail('contagem AST de funções diverge do inventário');
if(!(Number(inv.astIndex?.anonymousFunctions)>0))fail('AST não encontrou funções anônimas/callbacks');
if(inv.refinement?.semanticDiscovery!=='game-runtime-only')fail('semântica do jogo não está restrita ao runtime');
if(inv.refinement?.excludedDocumentation!==true)fail('docs/ não estão formalmente excluídos da descoberta');
if(inv.refinement?.excludedToolingFromGameSemantics!==true)fail('tooling não está formalmente excluído da semântica do jogo');
if(inv.enrichment?.version!=='ast-behavior-crosswalk-v2')fail('enriquecimento AST v2 ausente');
if(Number(inv.enrichment?.functionBehavior?.total||0)!==(inv.functions||[]).length)fail('comportamento não cobre todas as funções AST');
if(Number(inv.enrichment?.functionBehavior?.exactAstBodies||0)!==(inv.functions||[]).length)fail('nem todos os corpos são spans AST exatos');
if(Number(inv.enrichment?.functionBehavior?.extractionFailures||0)!==0)fail('houve falha na extração exata de corpos');
if(Number(inv.enrichment?.uiCrosswalk?.total||0)!==(inv.uiActions||[]).length)fail('crosswalk UI não cobre todas as ações');
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

const unresolvedConcrete=(inv.uiActionCrosswalk||[]).filter(x=>!x.dynamicTemplate&&!x.handlerCandidates?.length);
if(unresolvedConcrete.length)warn(unresolvedConcrete.length+' ações UI concretas ainda sem handler AST confirmado; ver 19-UNRESOLVED-UI-ACTIONS.md');
const missingAssets=Number(inv.counts?.missingLiteralAssetReferences||0);if(missingAssets)warn(missingAssets+' referências literais de assets não materializadas');

const staticCoverage={
  sourceFiles:Number(inv.counts?.sourceFiles||0),gameRuntimeSourceFiles:Number(inv.counts?.gameRuntimeSourceFiles||0),toolingSourceFiles:Number(inv.counts?.toolingSourceFiles||0),
  astParsedJsFiles:Number(inv.astIndex?.parsedFiles||0),astFunctions:(inv.functions||[]).length,anonymousFunctions:Number(inv.astIndex?.anonymousFunctions||0),callbackFunctions:Number(inv.astIndex?.callbackFunctions||0),
  exactFunctionBodies:Number(inv.enrichment?.functionBehavior?.exactAstBodies||0),routes:(inv.routes||[]).length,models:(inv.models||[]).length,collections:(inv.collections||[]).length,
  uiActions:(inv.uiActions||[]).length,dynamicUiTemplates:Number(inv.enrichment?.uiCrosswalk?.dynamicTemplates||0),concreteUiActions:Number(inv.enrichment?.uiCrosswalk?.concrete||0),confirmedUiHandlers:Number(inv.enrichment?.uiCrosswalk?.handlerConfirmed||0),unresolvedConcreteUi:unresolvedConcrete.length,
  events:(inv.events||[]).length,movementEvidence:(inv.movement||[]).length,movementFunctions:(inv.movementFunctions||[]).length,scripts:(inv.scripts||[]).length,uniqueAssetReferences:Number(inv.counts?.uniqueAssetReferences||0),missingLiteralAssetReferences:missingAssets
};

const report={generatedAt:new Date().toISOString(),ok:failures.length===0,status:failures.length===0?'PASS_AST_STATIC_DOCUMENTATION':'FAIL',meaning:'PASS_AST_STATIC_DOCUMENTATION prova limites exatos de funções/callbacks por AST e documentação estática rastreável. Não equivale a runtime/E2E.',parser:{name:'acorn',version:inv.astIndex?.parserVersion||null},staticCoverage,modelNames,failures,warnings,gates:{astParsing:failures.some(x=>/AST|span|hash|esc\(\)/i.test(x))?'FAIL':'PASS',functionBehaviorDocumentation:failures.some(x=>/comportamento|corpo/i.test(x))?'FAIL':'PASS',runtimeSemanticIsolation:failures.some(x=>/contamin|semântica|runtime/i.test(x))?'FAIL':'PASS',uiHandlerCompleteness:unresolvedConcrete.length===0?'PASS':'PARTIAL',runtimeExecution:'UNVERIFIED',browserInteraction:'UNVERIFIED',workersLive:'UNVERIFIED',mongodbLive:'UNVERIFIED',gameplayE2E:'UNVERIFIED',assetPathCompleteness:missingAssets===0?'PASS':'FAIL_OR_EXTERNAL_OVERLAY_REQUIRED'}};
fs.writeFileSync(path.join(GEN,'DOCUMENTATION-AUDIT.json'),JSON.stringify(report,null,2)+'\n');
let md='# AUDITORIA DE COBERTURA DA DOCUMENTAÇÃO\n\nStatus: **'+report.status+'**\n\nParser: **Acorn AST**. Corpos de função são delimitados por posições sintáticas exatas.\n\n## Cobertura\n\n| Categoria | Total |\n|---|---:|\n';for(const [k,v] of Object.entries(staticCoverage))md+='| '+k+' | '+v+' |\n';md+='\n## Gates\n\n';for(const [k,v] of Object.entries(report.gates))md+='- **'+k+':** '+v+'\n';if(warnings.length)md+='\n## Avisos\n\n'+warnings.map(x=>'- '+x).join('\n')+'\n';if(failures.length)md+='\n## Falhas\n\n'+failures.map(x=>'- '+x).join('\n')+'\n';fs.writeFileSync(path.join(GEN,'09-DOCUMENTATION-AUDIT.md'),md);
console.log(JSON.stringify(report,null,2));if(failures.length)process.exit(1);
