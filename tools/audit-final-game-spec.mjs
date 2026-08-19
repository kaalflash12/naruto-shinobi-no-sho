import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT=process.cwd();
const GEN=path.join(ROOT,'docs','generated');
const INV_PATH=path.join(GEN,'TECHNICAL-INVENTORY.json');
const SPEC_PATH=path.join(GEN,'NARUTO_SHINOBI_NO_SHO_ESPECIFICACAO_FINAL_COMPLETA.md');
const OUT=path.join(GEN,'FINAL-SPEC-AUDIT.json');
const norm=p=>String(p||'').replace(/\\/g,'/');
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
const exists=p=>fs.existsSync(path.join(ROOT,norm(p)));
const isDoc=p=>norm(p).startsWith('docs/');
const isTool=p=>norm(p).startsWith('tools/')||norm(p).startsWith('.github/');
const isRuntime=p=>!isDoc(p)&&!isTool(p)&&!norm(p).startsWith('node_modules/')&&!norm(p).startsWith('.git/');
const TEXT_EXT=new Set(['.js','.mjs','.cjs','.html','.css','.json','.toml','.yml','.yaml','.ps1','.cmd','.bat','.sh','.md','.txt','.tsv','.csv','.xml','.svg']);
const isText=p=>TEXT_EXT.has(path.extname(norm(p)).toLowerCase());

const failures=[];
const warnings=[];
const fail=x=>failures.push(x);
const warn=x=>warnings.push(x);
if(!fs.existsSync(INV_PATH)) fail('TECHNICAL-INVENTORY.json ausente');
if(!fs.existsSync(SPEC_PATH)) fail('arquivo canônico final ausente');

let inv={},spec='';
if(!failures.length){
  try{inv=JSON.parse(fs.readFileSync(INV_PATH,'utf8'));}catch(e){fail('inventário inválido: '+e.message);}
  try{spec=fs.readFileSync(SPEC_PATH,'utf8');}catch(e){fail('spec ilegível: '+e.message);}
}

function requireMarker(marker,label){if(!spec.includes(marker))fail(label+' ausente do arquivo canônico: '+marker);}
function exactFunctionSlice(f){
  if(!exists(f.file))return null;
  const text=fs.readFileSync(path.join(ROOT,f.file),'utf8');
  const start=Number(f?.ast?.start),end=Number(f?.ast?.end);
  if(!Number.isInteger(start)||!Number.isInteger(end)||start<0||end<=start||end>text.length)return null;
  return text.slice(start,end);
}

const functions=inv.functions||[];
const routes=inv.routes||[];
const models=inv.models||[];
const collections=inv.collections||[];
const ui=inv.uiActions||[];
const events=inv.events||[];
const scripts=inv.scripts||[];
const movementFunctions=inv.movementFunctions||[];
const unresolved=(inv.uiActionResolvedCrosswalk||[]).filter(x=>!x.dynamicTemplate&&!x.handlerFunctionIds?.length);

if(inv.astIndex?.parser!=='acorn')fail('parser AST canônico não é Acorn');
if(Number(inv.astIndex?.parseFailures||0)!==0)fail('existem falhas AST');
if(inv.uiDispatchResolution?.version!=='ast-dispatch-v3')fail('resolvedor UI final não é ast-dispatch-v3');
if(unresolved.length)fail('existem '+unresolved.length+' ações UI concretas sem handler/dispatcher provado: '+unresolved.map(x=>x.action).join(', '));

for(const f of functions){
  requireMarker('FUNC-ID::'+f.id,'função '+f.id);
  const code=exactFunctionSlice(f);
  if(code===null){fail('função sem código exato extraível: '+f.id+' '+f.file+':'+f.line);continue;}
  const h=sha(code);
  requireMarker(h,'SHA da função '+f.id);
}
for(const r of routes)requireMarker('API-ID::'+r.id,'rota '+r.id);
for(const m of models)requireMarker('AI-ID::'+m.id,'modelo IA '+m.id);
for(const c of collections)requireMarker('DB-ID::'+c.id,'coleção '+c.id);
for(const a of ui)requireMarker('UI-ID::'+a.id,'ação UI '+a.id);
for(const e of events)requireMarker('EVENT-ID::'+e.id,'evento '+e.id);
for(const s of scripts)requireMarker('SCRIPT-LOAD::'+s.order,'script carregado '+s.order);
for(const m of movementFunctions){const id=m.functionId||m.id||'SEM-ID';requireMarker('MOVE-FUNC-ID::'+id,'função de movimento '+id);}

const allFiles=(inv.files||[]).map(f=>norm(f.path)).filter(Boolean);
const runtimeText=[...new Set(allFiles.filter(p=>isRuntime(p)&&isText(p)&&exists(p)))].sort();
const toolingText=[...new Set(allFiles.filter(p=>isTool(p)&&isText(p)&&exists(p)))].sort();
for(const p of runtimeText){
  requireMarker('SOURCE-RUNTIME::'+p,'fonte runtime '+p);
  const h=crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT,p))).digest('hex');
  requireMarker(h,'SHA runtime '+p);
}
for(const p of toolingText){
  requireMarker('SOURCE-TOOLING::'+p,'fonte tooling '+p);
  const h=crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT,p))).digest('hex');
  requireMarker(h,'SHA tooling '+p);
}

for(const required of [
  '# NARUTO SHINOBI NO SHO — ESPECIFICAÇÃO FINAL COMPLETA',
  '# 1. MODELO FINAL OBRIGATÓRIO DO JOGO',
  '# 3. CADA FUNÇÃO / CALLBACK — COMPORTAMENTO E CÓDIGO FINAL',
  '# 4. CADA IA — MODELO, FONTE, AUTORIDADE E USO',
  '# 7. CADA INTERAÇÃO / AÇÃO DE UI — EMISSOR → DISPATCHER → HANDLER',
  '# 13. FONTE FINAL INTEGRAL DO RUNTIME',
  '# 16. GATES FINAIS E PENDÊNCIAS'
]) requireMarker(required,'seção obrigatória');

const manualDocs=[
  'docs/00-MODELO-FINAL-ARQUITETURA.md',
  'docs/01-MODELO-FINAL-IA-E-AUTORIDADE.md',
  'docs/02-MODELO-FINAL-GAMEPLAY-E-INTERACOES.md',
  'docs/03-MODELO-FINAL-DADOS-API-TESTES.md',
  'docs/04-MODELO-FINAL-SCRIPTS-FONTES-VALIDACAO.md'
];
for(const p of manualDocs){
  if(!exists(p))fail('manual canônico ausente: '+p);
  requireMarker('### '+p,'manual incorporado '+p);
}

if(!spec.includes('https://github.com/gamedev-skills/awesome-gamedev-agent-skills'))fail('referência de skills Game Dev ausente');
if(!spec.includes('https://github.com/base44/skills'))fail('referência Base44 ausente');
if(!spec.includes('https://github.com/anthropics/skills'))fail('referência Anthropic skills ausente');
if(!spec.includes('Vercel e Supabase não são dependências finais'))fail('arquitetura final sem exclusão explícita de Vercel/Supabase');
if(!spec.includes('TERION 2D10'))fail('autoridade TERION 2D10 ausente');
if(!spec.includes('@cf/zai-org/glm-4.7-flash'))fail('modelo principal GLM ausente da spec');
if(!spec.includes('PASS_STATIC — nenhuma ação concreta de UI ficou sem handler/dispatcher estático provado.'))fail('declaração de UI completa ausente');

const bytes=fs.existsSync(SPEC_PATH)?fs.statSync(SPEC_PATH).size:0;
if(bytes<100000)warn('arquivo canônico ficou menor que 100 KB; revisar se a fonte integral foi incluída');
if(bytes>95*1024*1024)fail('arquivo canônico excede limite de segurança de 95 MiB: '+bytes);

const report={
  generatedAt:new Date().toISOString(),
  ok:failures.length===0,
  status:failures.length===0?'PASS_FINAL_CANONICAL_SPEC':'FAIL_FINAL_CANONICAL_SPEC',
  meaning:'PASS_FINAL_CANONICAL_SPEC prova cobertura estática, AST, rastreabilidade e inclusão do código textual final no arquivo único. Gates runtime/E2E continuam separados.',
  spec:{path:norm(path.relative(ROOT,SPEC_PATH)),bytes,sha256:fs.existsSync(SPEC_PATH)?crypto.createHash('sha256').update(fs.readFileSync(SPEC_PATH)).digest('hex'):null},
  coverage:{functions:functions.length,routes:routes.length,models:models.length,collections:collections.length,uiActions:ui.length,events:events.length,scripts:scripts.length,movementFunctions:movementFunctions.length,runtimeTextFiles:runtimeText.length,toolingTextFiles:toolingText.length,unresolvedConcreteUi:unresolved.length},
  gates:{exactFunctionCode:failures.some(x=>x.includes('função sem código exato')||x.includes('SHA da função'))?'FAIL':'PASS',allIdentifiersPresent:failures.some(x=>/ausente do arquivo canônico/.test(x))?'FAIL':'PASS',uiHandlerCompleteness:unresolved.length===0?'PASS':'FAIL',runtimeE2E:'UNVERIFIED',browserE2E:'UNVERIFIED',workersLive:'UNVERIFIED',mongodbLive:'UNVERIFIED'},
  failures,warnings
};
fs.writeFileSync(OUT,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
if(failures.length)process.exit(1);
