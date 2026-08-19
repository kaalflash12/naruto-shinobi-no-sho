import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd();
const GEN=path.join(ROOT,'docs','generated');
const invPath=path.join(GEN,'TECHNICAL-INVENTORY.json');
const failures=[];
const warnings=[];

function fail(x){failures.push(x);}
function warn(x){warnings.push(x);}
function exists(p){return fs.existsSync(path.join(ROOT,p));}

if(!fs.existsSync(invPath)) fail('TECHNICAL-INVENTORY.json ausente: execute node tools/generate-technical-spec.mjs');
let inv={};
if(!failures.length){ try{inv=JSON.parse(fs.readFileSync(invPath,'utf8'));}catch(e){fail(`inventario JSON invalido: ${e.message}`);} }

const requiredGenerated=[
  'docs/generated/00-INVENTORY-SUMMARY.md',
  'docs/generated/01-FUNCTIONS.md',
  'docs/generated/02-API.md',
  'docs/generated/03-AI.md',
  'docs/generated/04-PERSISTENCE.md',
  'docs/generated/05-UI-INTERACTIONS.md',
  'docs/generated/06-SCRIPTS.md',
  'docs/generated/07-MOVEMENT-ACTIONS.md',
  'docs/generated/08-TRACEABILITY.md'
];
for(const p of requiredGenerated) if(!exists(p)) fail(`arquivo gerado ausente: ${p}`);

if(inv.counts){
  if(!(inv.counts.files>0))fail('nenhum arquivo inventariado');
  if(!(inv.counts.functions>0))fail('nenhuma funcao/metodo inventariado');
  if(!(inv.counts.routes>0))fail('nenhuma rota /api inventariada');
  if(!(inv.counts.scriptTags>0))fail('nenhum script do index inventariado');
}else if(!failures.length) fail('counts ausente do inventario');

for(const s of inv.scripts||[]){
  if(!s.exists)fail(`script carregado por index.html nao existe: ${s.local}`);
}
for(const f of inv.functions||[]){
  if(!f.id||!f.file||!f.line||!f.name)fail(`funcao sem rastreabilidade completa: ${JSON.stringify(f).slice(0,250)}`);
}
for(const r of inv.routes||[]){
  if(!r.id||!r.route||!r.sources?.length)fail(`rota sem fonte: ${JSON.stringify(r).slice(0,250)}`);
}
for(const a of inv.models||[]){
  if(!a.id||!a.model||!a.sources?.length)fail(`modelo IA sem fonte: ${JSON.stringify(a).slice(0,250)}`);
}
for(const c of inv.collections||[]){
  if(!c.id||!c.name||!c.sources?.length)fail(`colecao sem fonte: ${JSON.stringify(c).slice(0,250)}`);
}
for(const a of inv.uiActions||[]){
  if(!a.id||!a.value||!a.sources?.length)fail(`acao UI sem fonte: ${JSON.stringify(a).slice(0,250)}`);
}

const runtime=(inv.files||[]).filter(x=>x.runtime);
for(const f of runtime){ if(!f.sha256||f.sha256.length!==64)fail(`runtime sem SHA-256: ${f.path}`); }

const entry='cloudflare/r41-api/src/entry.js';
const wrangler='cloudflare/r41-api/wrangler.toml';
if(!exists(entry))fail(`${entry} ausente`);
if(!exists(wrangler))fail(`${wrangler} ausente`);
if(exists(wrangler)){
  const w=fs.readFileSync(path.join(ROOT,wrangler),'utf8');
  if(!/^main\s*=\s*["']src\/entry\.js["']/m.test(w))fail('wrangler.toml nao aponta main para src/entry.js');
  if(!/binding\s*=\s*["']AI["']/m.test(w))fail('binding AI nao declarado em wrangler.toml');
  if(!/name\s*=\s*["']GAME_ROOMS["']/m.test(w))fail('binding GAME_ROOMS nao declarado em wrangler.toml');
}
if(exists(entry)){
  const e=fs.readFileSync(path.join(ROOT,entry),'utf8');
  if(!/TERION[^\n]{0,120}autoridade mec[aâ]nica/i.test(e))warn('frase de autoridade TERION nao localizada literalmente no entry.js');
  if(!/CLIENT_MECHANICAL_RESULT_FORBIDDEN/.test(e))fail('guard CLIENT_MECHANICAL_RESULT_FORBIDDEN ausente do entry.js');
  if(!/env\.AI\.run/.test(e))fail('entry.js nao possui chamada env.AI.run');
}

const staticCoverage={
  functions:(inv.functions||[]).length,
  routes:(inv.routes||[]).length,
  models:(inv.models||[]).length,
  collections:(inv.collections||[]).length,
  storage:(inv.storage||[]).length,
  uiActions:(inv.uiActions||[]).length,
  events:(inv.events||[]).length,
  movementEvidence:(inv.movement||[]).length,
  scripts:(inv.scripts||[]).length,
  runtimeFiles:runtime.length,
};

const report={
  generatedAt:new Date().toISOString(),
  ok:failures.length===0,
  status:failures.length===0?'PASS_STATIC_COVERAGE':'FAIL',
  meaning:'PASS_STATIC_COVERAGE prova cobertura do inventario estatico; nao equivale a PASS de runtime, jogabilidade ou completude semantica.',
  staticCoverage,
  failures,
  warnings,
  gates:{
    staticInventory:failures.length===0?'PASS':'FAIL',
    runtimeExecution:'UNVERIFIED',
    browserInteraction:'UNVERIFIED',
    workersLive:'UNVERIFIED',
    mongodbLive:'UNVERIFIED',
    semanticCompleteness:'REQUIRES_TRACEABLE_EVIDENCE',
  }
};
fs.mkdirSync(GEN,{recursive:true});
fs.writeFileSync(path.join(GEN,'DOCUMENTATION-AUDIT.json'),JSON.stringify(report,null,2)+'\n');
let md='# AUDITORIA DE COBERTURA DA DOCUMENTAÇÃO\n\n';
md+=`Status: **${report.status}**\n\n`;
md+='`PASS_STATIC_COVERAGE` significa somente que os elementos descobertos pelo gerador foram documentados e rastreados até o código. Não significa teste vivo.\n\n';
md+='## Cobertura\n\n| Categoria | Total |\n|---|---:|\n';
for(const [k,v] of Object.entries(staticCoverage))md+=`| ${k} | ${v} |\n`;
md+='\n## Gates\n\n';
for(const [k,v] of Object.entries(report.gates))md+=`- **${k}:** ${v}\n`;
if(warnings.length)md+='\n## Avisos\n\n'+warnings.map(x=>`- ${x}`).join('\n')+'\n';
if(failures.length)md+='\n## Falhas\n\n'+failures.map(x=>`- ${x}`).join('\n')+'\n';
fs.writeFileSync(path.join(GEN,'09-DOCUMENTATION-AUDIT.md'),md);

console.log(JSON.stringify(report,null,2));
if(failures.length)process.exit(1);
