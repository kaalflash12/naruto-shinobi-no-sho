import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT=process.cwd();
const GEN=path.join(ROOT,'docs','generated');
const INV_PATH=path.join(GEN,'TECHNICAL-INVENTORY.json');
const SPEC_PATH=path.join(GEN,'NARUTO_SHINOBI_NO_SHO_ESPECIFICACAO_FINAL_COMPLETA.md');
const OUT=path.join(GEN,'FINAL-SPEC-AUDIT.json');
const norm=p=>String(p||'').replace(/\\/g,'/');
const abs=p=>path.join(ROOT,norm(p));
const exists=p=>fs.existsSync(abs(p));
const hashBuf=b=>crypto.createHash('sha256').update(b).digest('hex');
const fileHash=p=>hashBuf(fs.readFileSync(abs(p)));
const failures=[],warnings=[];const fail=x=>failures.push(x),warn=x=>warnings.push(x);
if(!fs.existsSync(INV_PATH))fail('TECHNICAL-INVENTORY.json ausente');
if(!fs.existsSync(SPEC_PATH))fail('arquivo canônico final ausente');
let inv={},spec='';if(!failures.length){try{inv=JSON.parse(fs.readFileSync(INV_PATH,'utf8'));}catch(e){fail('inventário inválido: '+e.message);}try{spec=fs.readFileSync(SPEC_PATH,'utf8');}catch(e){fail('spec ilegível: '+e.message);}}
const req=(m,l)=>{if(!spec.includes(m))fail(l+' ausente: '+m);};
function functionCode(f){if(!exists(f.file))return null;const t=fs.readFileSync(abs(f.file),'utf8');const s=Number(f?.ast?.start),e=Number(f?.ast?.end);if(!Number.isInteger(s)||!Number.isInteger(e)||s<0||e<=s||e>t.length)return null;return t.slice(s,e);}
const functions=inv.functions||[],routes=inv.routes||[],models=inv.models||[],collections=inv.collections||[],ui=inv.uiActions||[],events=inv.events||[],scripts=inv.scripts||[],moves=inv.movementFunctions||[];
const unresolved=(inv.uiActionResolvedCrosswalk||[]).filter(x=>!x.dynamicTemplate&&!x.handlerFunctionIds?.length);
if(inv.astIndex?.parser!=='acorn')fail('parser AST canônico não é Acorn');
if(Number(inv.astIndex?.parseFailures||0)!==0)fail('existem falhas AST');
if(inv.uiDispatchResolution?.version!=='ast-dispatch-v3')fail('resolvedor UI base não é ast-dispatch-v3');
if(inv.uiSelectorResolution?.version!=='ast-selector-v1')fail('resolvedor de handlers por seletor não é ast-selector-v1');
if(unresolved.length)fail('existem '+unresolved.length+' ações UI concretas sem handler/dispatcher: '+unresolved.map(x=>x.action).join(', '));
for(const f of functions){req('FUNC-ID::'+f.id,'função '+f.id);const c=functionCode(f);if(c===null){fail('função sem span exato: '+f.id);continue;}req(hashBuf(Buffer.from(c)),'SHA função '+f.id);req('SOURCE-CODE::'+norm(f.file),'fonte integral da função '+f.id);req(fileHash(f.file),'SHA arquivo da função '+f.id);}
for(const r of routes)req('API-ID::'+r.id,'API '+r.id);for(const m of models)req('AI-ID::'+m.id,'IA '+m.id);for(const c of collections)req('DB-ID::'+c.id,'DB '+c.id);for(const a of ui)req('UI-ID::'+a.id,'UI '+a.id);for(const e of events)req('EVENT-ID::'+e.id,'evento '+e.id);for(const m of moves)req('MOVE-FUNC-ID::'+(m.functionId||m.id||'SEM-ID'),'movimento');
for(const s of scripts){const p=norm(s.local||s.src||s.path);req('SCRIPT-LOAD::'+s.order,'script '+s.order);if(p&&exists(p)){req('SOURCE-CODE::'+p,'código do script '+p);req(fileHash(p),'SHA script '+p);}}
const allFiles=[...new Set((inv.files||[]).map(f=>norm(f.path)).filter(p=>p&&exists(p)&&!p.startsWith('docs/generated/')))].sort();for(const p of allFiles){req('FILE-MANIFEST::'+p,'manifesto '+p);req(fileHash(p),'SHA manifesto '+p);}
for(const h of ['# NARUTO SHINOBI NO SHO — ESPECIFICAÇÃO FINAL COMPLETA','# 1. MODELO FINAL OBRIGATÓRIO DO JOGO','# 3. CADA FUNÇÃO / CALLBACK — COMPORTAMENTO, SPAN E CÓDIGO FINAL','# 4. CADA IA — MODELO, AUTORIDADE E USO','# 7. CADA INTERAÇÃO / AÇÃO DE UI','# 13. FONTE FINAL TEXTUAL — CÓDIGO/CONFIGURAÇÃO','# 14. GATES FINAIS'])req(h,'seção obrigatória');
for(const p of ['docs/00-MODELO-FINAL-ARQUITETURA.md','docs/01-MODELO-FINAL-IA-E-AUTORIDADE.md','docs/02-MODELO-FINAL-GAMEPLAY-E-INTERACOES.md','docs/03-MODELO-FINAL-DADOS-API-TESTES.md','docs/04-MODELO-FINAL-SCRIPTS-FONTES-VALIDACAO.md']){if(!exists(p))fail('manual ausente: '+p);req('### '+p,'manual incorporado '+p);}
req('https://github.com/gamedev-skills/awesome-gamedev-agent-skills','skills Game Dev');req('https://github.com/base44/skills','skills Base44');req('https://github.com/anthropics/skills','skills Anthropic');req('TERION 2D10','autoridade TERION');req('Vercel e Supabase não são dependências finais','arquitetura final');
if(!unresolved.length)req('PASS_STATIC — nenhuma ação concreta de UI ficou sem handler/dispatcher estático provado.','gate UI');
const bytes=fs.existsSync(SPEC_PATH)?fs.statSync(SPEC_PATH).size:0;if(bytes<100000)warn('spec menor que 100 KB');if(bytes>95*1024*1024)fail('spec excede 95 MiB: '+bytes);
const report={generatedAt:new Date().toISOString(),ok:failures.length===0,status:failures.length===0?'PASS_FINAL_CANONICAL_SPEC':'FAIL_FINAL_CANONICAL_SPEC',meaning:'Prova cobertura estática/AST, rastreabilidade, código textual final reproduzido uma vez por arquivo e hashes de todos os arquivos. Gates live permanecem separados.',spec:{path:norm(path.relative(ROOT,SPEC_PATH)),bytes,sha256:fs.existsSync(SPEC_PATH)?fileHash(norm(path.relative(ROOT,SPEC_PATH))):null},coverage:{functions:functions.length,routes:routes.length,models:models.length,collections:collections.length,uiActions:ui.length,events:events.length,scripts:scripts.length,movementFunctions:moves.length,manifestFiles:allFiles.length,unresolvedConcreteUi:unresolved.length},gates:{exactFunctionCode:failures.some(x=>x.includes('função sem span')||x.includes('SHA função')||x.includes('fonte integral da função'))?'FAIL':'PASS',allIdentifiersPresent:failures.some(x=>x.includes(' ausente: '))?'FAIL':'PASS',uiHandlerCompleteness:unresolved.length===0?'PASS':'FAIL',runtimeE2E:'UNVERIFIED',browserE2E:'UNVERIFIED',workersLive:'UNVERIFIED',mongodbLive:'UNVERIFIED'},failures,warnings};
fs.writeFileSync(OUT,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));if(failures.length)process.exit(1);
