import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT=process.cwd();
const GEN=path.join(ROOT,'docs','generated');
const INV_PATH=path.join(GEN,'TECHNICAL-INVENTORY.json');
const AUDIT_PATH=path.join(GEN,'DOCUMENTATION-AUDIT.json');
const OUT=path.join(GEN,'NARUTO_SHINOBI_NO_SHO_ESPECIFICACAO_FINAL_COMPLETA.md');
if(!fs.existsSync(INV_PATH))throw new Error('TECHNICAL-INVENTORY.json ausente');
if(!fs.existsSync(AUDIT_PATH))throw new Error('DOCUMENTATION-AUDIT.json ausente');
const inv=JSON.parse(fs.readFileSync(INV_PATH,'utf8'));
const audit=JSON.parse(fs.readFileSync(AUDIT_PATH,'utf8'));
const norm=p=>String(p||'').replace(/\\/g,'/');
const abs=p=>path.join(ROOT,norm(p));
const exists=p=>fs.existsSync(abs(p));
const shaBuf=b=>crypto.createHash('sha256').update(b).digest('hex');
const shaText=s=>shaBuf(Buffer.from(String(s)));
const q=s=>'`'+String(s??'').replace(/`/g,'\\`')+'`';
const uniq=a=>[...new Set((a||[]).filter(Boolean))];
const srcs=a=>(a||[]).length?(a||[]).map(x=>q(`${x.file}:${x.line}`)).join(', '):'—';
const list=a=>(a||[]).length?(a||[]).map(x=>q(typeof x==='string'?x:JSON.stringify(x))).join(', '):'—';
fs.mkdirSync(GEN,{recursive:true});
const fd=fs.openSync(OUT,'w');
const w=(...xs)=>fs.writeSync(fd,xs.join('\n')+'\n');
const sec=t=>w('',`# ${t}`,'');
const sub=t=>w('',`## ${t}`,'');
const kv=(k,v)=>w(`- **${k}:** ${v}`);
const fileHash=p=>shaBuf(fs.readFileSync(abs(p)));
const fileSize=p=>fs.statSync(abs(p)).size;
function functionSlice(f){
  if(!f?.file||!exists(f.file))return null;
  const text=fs.readFileSync(abs(f.file),'utf8');
  const start=Number(f?.ast?.start),end=Number(f?.ast?.end);
  if(!Number.isInteger(start)||!Number.isInteger(end)||start<0||end<=start||end>text.length)return null;
  return text.slice(start,end);
}
function fenceFor(text){
  let max=2;for(const m of String(text).matchAll(/~+/g))max=Math.max(max,m[0].length);return '~'.repeat(Math.max(4,max+1));
}
function sourceFile(file){
  const text=fs.readFileSync(abs(file),'utf8');
  const f=fenceFor(text);const ext=path.extname(file).toLowerCase();
  const lang={'.js':'javascript','.mjs':'javascript','.cjs':'javascript','.html':'html','.css':'css','.json':'json','.toml':'toml','.yml':'yaml','.yaml':'yaml','.ps1':'powershell','.cmd':'bat','.bat':'bat','.sh':'bash','.xml':'xml'}[ext]||'text';
  w(`## SOURCE-CODE::${file}`,'');kv('SHA-256',q(fileHash(file)));kv('Bytes',q(String(Buffer.byteLength(text))));w('',f+lang);fs.writeSync(fd,text.replace(/\r\n/g,'\n'));w('',f,'');
}

const manualDocs=['docs/00-MODELO-FINAL-ARQUITETURA.md','docs/01-MODELO-FINAL-IA-E-AUTORIDADE.md','docs/02-MODELO-FINAL-GAMEPLAY-E-INTERACOES.md','docs/03-MODELO-FINAL-DADOS-API-TESTES.md','docs/04-MODELO-FINAL-SCRIPTS-FONTES-VALIDACAO.md'];
const skillRefs=[['Base44','https://github.com/base44/skills'],['Anthropic Skills','https://github.com/anthropics/skills'],['Game Dev Agent Skills','https://github.com/gamedev-skills/awesome-gamedev-agent-skills'],['GitHub Awesome Copilot','https://github.com/github/awesome-copilot'],['Lovable Skills','https://github.com/charanjit-singh/lovable-skills']];

w('# NARUTO SHINOBI NO SHO — ESPECIFICAÇÃO FINAL COMPLETA','', '> Arquivo canônico único: modelo humano + inventário técnico + AST exato + rastreabilidade + código final textual + hashes de todos os arquivos.','');
kv('Gerado em',q(new Date().toISOString()));kv('Repositório',q(process.env.GITHUB_REPOSITORY||'kaalflash12/naruto-shinobi-no-sho'));kv('Commit',q(process.env.GITHUB_SHA||'local'));kv('Parser AST',q(`${inv.astIndex?.parser||'ausente'} ${inv.astIndex?.parserVersion||''}`.trim()));kv('Resolvedor UI',q(inv.uiDispatchResolution?.version||'ausente'));kv('Auditoria-base',q(audit.status||'ausente'));
w('','**Autoridade:** TERION 2D10 resolve mecânica. IA narra/assiste e não substitui resultado mecânico. Código executável + AST + hashes vencem descrição divergente.','');

sec('1. MODELO FINAL OBRIGATÓRIO DO JOGO');
w('Arquitetura final: **frontend → Cloudflare Worker API → Durable Objects → MongoDB Atlas → Workers AI**, com **TERION 2D10** como autoridade mecânica. Vercel e Supabase não são dependências finais do runtime desta especificação.','', 'Fluxo obrigatório: **entrada/evento → validação → TERION/servidor → mutação de estado → persistência → resposta → atualização visual → auditoria/teste**.');
sub('1.1 Skills e referências técnicas');for(const [n,u] of skillRefs)w(`- **${n}:** ${u}`);w('- Critérios aplicados: RPG systems, save systems, game AI, dialogue systems, game UI/UX, input systems, level design, performance e asset pipeline.');
sub('1.2 Modelo humano incorporado');for(const p of manualDocs){w('',`### ${p}`,'');if(!exists(p)){w('**FAIL — arquivo ausente.**');continue;}w(fs.readFileSync(abs(p),'utf8'));}

sec('2. COBERTURA TÉCNICA');
const unresolved=(inv.uiActionResolvedCrosswalk||[]).filter(x=>!x.dynamicTemplate&&!x.handlerFunctionIds?.length);
const totals=[['Funções/callbacks AST',(inv.functions||[]).length],['Rotas API',(inv.routes||[]).length],['Modelos IA',(inv.models||[]).length],['Coleções MongoDB',(inv.collections||[]).length],['Ações UI',(inv.uiActions||[]).length],['Eventos',(inv.events||[]).length],['Funções movimento',(inv.movementFunctions||[]).length],['Scripts carregados',(inv.scripts||[]).length],['Ações UI concretas sem handler',unresolved.length]];
w('| Categoria | Total |','|---|---:|');for(const [k,v] of totals)w(`| ${k} | ${v} |`);

sec('3. CADA FUNÇÃO / CALLBACK — COMPORTAMENTO, SPAN E CÓDIGO FINAL');
w('Cada função abaixo aponta para o **código exato reproduzido uma única vez** em `SOURCE-CODE::<arquivo>`. Isso elimina duplicação de funções aninhadas sem omitir código. O SHA do span AST prova a correspondência.','');
for(const f of inv.functions||[]){const code=functionSlice(f);w(`## FUNC-ID::${f.id} — ${q(f.name)}`,'');kv('Fonte',q(`${f.file}:${f.line}-${f.endLine||f.line}`));kv('Span AST',q(`${f.ast?.start}:${f.ast?.end}`));kv('SHA-256 do código exato',q(code===null?'FAIL':shaText(code)));kv('Parâmetros',q(f.params||'(nenhum explícito)'));kv('Chamadas',list(f.calls||f.behavior?.calls));kv('Rotas',list(f.behavior?.routeRefs||f.refs?.routes));kv('Coleções',list(f.behavior?.collectionRefs||f.refs?.collections));kv('Storage',list(f.behavior?.storageRefs||f.refs?.storageKeys));kv('DOM',list(f.behavior?.domRefs||f.refs?.domIds));kv('Handlers',list(f.ast?.handlerLiterals||f.behavior?.handlerLiterals));kv('Movimento',list(f.behavior?.movementTerms));kv('Código final',code===null?'**FAIL — span não extraível**':`ver ${q('SOURCE-CODE::'+f.file)} neste mesmo arquivo.`);}

sec('4. CADA IA — MODELO, AUTORIDADE E USO');for(const a of inv.models||[]){w(`## AI-ID::${a.id} — ${q(a.model)}`,'');kv('Fontes',srcs(a.sources));kv('Autoridade','assistência/narração; TERION/servidor mantém autoridade mecânica.');}
sec('5. CADA ROTA/API');for(const r of inv.routes||[]){w(`## API-ID::${r.id} — ${q(r.route)}`,'');kv('Fontes',srcs(r.sources));const x=(inv.apiCrosswalk||[]).find(v=>v.id===r.id)||{};kv('Handlers',list(x.functionIds||x.handlers||x.handlerCandidates));kv('Métodos/evidência',list(x.methods||r.methods));}
sec('6. PERSISTÊNCIA');for(const c of inv.collections||[]){w(`## DB-ID::${c.id} — ${q(c.name)}`,'');kv('Fontes',srcs(c.sources));const x=(inv.persistenceCrosswalk||[]).find(v=>v.id===c.id)||{};kv('Funções/operações',list(x.functionIds||x.functions||x.operations));}
sub('6.1 Storage');for(const s of inv.storage||[])w(`- **STORE-ID::${s.id}** ${q(s.scope)} / ${q(s.operation)} / ${q(s.value)} / ${q(`${s.file}:${s.line}`)}`);

sec('7. CADA INTERAÇÃO / AÇÃO DE UI');const byUi=new Map((inv.uiActionResolvedCrosswalk||[]).map(x=>[x.id,x]));for(const a of inv.uiActions||[]){const r=byUi.get(a.id)||{};w(`## UI-ID::${a.id} — ${q(a.value)}`,'');kv('Emissor',srcs(a.sources));kv('Status AST',q(r.status||'SEM_RESOLUCAO'));kv('Handler',list(r.handlerFunctionIds));kv('Evidência',list((r.handlers||[]).flatMap(h=>h.evidence||[])));if(!r.dynamicTemplate&&!r.handlerFunctionIds?.length)w('**FAIL — ação concreta sem handler/dispatcher provado.**');}
sec('8. EVENTOS');for(const e of inv.events||[])w(`- **EVENT-ID::${e.id}** ${q(e.value)} — ${srcs(e.sources)}`);
sec('9. MOVIMENTO / MAPA / POSIÇÃO');for(const m of inv.movementFunctions||[]){const id=m.functionId||m.id||'SEM-ID';w(`## MOVE-FUNC-ID::${id} — ${q(m.name||'função')}`,'');kv('Fonte',q(`${m.file||''}:${m.line||''}`));kv('Evidência',list(m.terms||m.movementTerms||m.evidence));}
sec('10. SCRIPTS CARREGADOS');for(const s of inv.scripts||[]){const p=norm(s.local||s.src||s.path);w(`## SCRIPT-LOAD::${s.order} — ${q(p)}`,'');kv('Existe',q(String(Boolean(s.exists))));if(p&&exists(p))kv('SHA-256',q(fileHash(p)));kv('Código final',p&&exists(p)?`ver ${q('SOURCE-CODE::'+p)}.`:'**FAIL — arquivo ausente**');}

sec('11. MANIFESTO DE TODOS OS ARQUIVOS DO JOGO');
w('Todo arquivo conhecido é registrado por caminho, tamanho e SHA-256. Binários não são convertidos em código fictício. Dados grandes permanecem comparáveis por hash.','');
const allFiles=uniq((inv.files||[]).map(f=>norm(f.path)).filter(p=>p&&exists(p)&&!p.startsWith('docs/generated/'))).sort();
for(const p of allFiles)w(`- **FILE-MANIFEST::${p}** — ${fileSize(p)} bytes — SHA-256 ${q(fileHash(p))}`);

sec('12. RASTREABILIDADE');w('| ID | Tipo | Elemento | Evidência |','|---|---|---|---|');for(const f of inv.functions||[])w(`| ${f.id} | função | ${q(f.name)} | ${q(`${f.file}:${f.line}-${f.endLine||f.line}`)} |`);for(const r of inv.routes||[])w(`| ${r.id} | API | ${q(r.route)} | ${srcs(r.sources)} |`);for(const a of inv.models||[])w(`| ${a.id} | IA | ${q(a.model)} | ${srcs(a.sources)} |`);for(const c of inv.collections||[])w(`| ${c.id} | DB | ${q(c.name)} | ${srcs(c.sources)} |`);for(const a of inv.uiActions||[])w(`| ${a.id} | UI | ${q(a.value)} | ${srcs(a.sources)} |`);

sec('13. FONTE FINAL TEXTUAL — CÓDIGO/CONFIGURAÇÃO');
const codeExt=new Set(['.js','.mjs','.cjs','.html','.css','.toml','.yml','.yaml','.ps1','.cmd','.bat','.sh','.xml']);
const functionFiles=(inv.functions||[]).map(f=>norm(f.file));const scriptFiles=(inv.scripts||[]).map(s=>norm(s.local||s.src||s.path));const configFiles=allFiles.filter(p=>codeExt.has(path.extname(p).toLowerCase())||['package.json','package-lock.json','wrangler.json','wrangler.jsonc'].includes(path.basename(p)));
const sourceFiles=uniq([...functionFiles,...scriptFiles,...configFiles]).filter(p=>p&&exists(p)&&!p.startsWith('docs/generated/')).sort();
for(const p of sourceFiles)sourceFile(p);

sec('14. GATES FINAIS');kv('Auditoria AST-base',q(audit.status||'ausente'));kv('Funções com span exato',q(`${(inv.functions||[]).filter(f=>functionSlice(f)!==null).length}/${(inv.functions||[]).length}`));kv('Ações UI concretas sem handler',q(String(unresolved.length)));kv('Runtime/E2E',q(audit.gates?.gameplayE2E||'UNVERIFIED'));kv('Workers live',q(audit.gates?.workersLive||'UNVERIFIED'));kv('MongoDB live',q(audit.gates?.mongodbLive||'UNVERIFIED'));if(unresolved.length){sub('FAIL — ações UI sem prova de handler');for(const u of unresolved)w(`- ${u.id} — ${q(u.action)} — ${srcs(u.sources)}`);}else w('','**PASS_STATIC — nenhuma ação concreta de UI ficou sem handler/dispatcher estático provado.**');w('','Gates dinâmicos continuam separados: análise estática nunca é promovida para PASS_LIVE sem execução real.');
fs.closeSync(fd);
const bytes=fs.statSync(OUT).size;const specSha=fileHash(norm(path.relative(ROOT,OUT)));console.log(JSON.stringify({ok:true,out:norm(path.relative(ROOT,OUT)),bytes,sha256:specSha,functions:(inv.functions||[]).length,uiActions:(inv.uiActions||[]).length,unresolvedConcreteUi:unresolved.length,sourceFiles:sourceFiles.length,manifestFiles:allFiles.length},null,2));
