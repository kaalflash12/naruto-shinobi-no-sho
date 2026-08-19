import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT=process.cwd();
const GEN=path.join(ROOT,'docs','generated');
const INV_PATH=path.join(GEN,'TECHNICAL-INVENTORY.json');
const AUDIT_PATH=path.join(GEN,'DOCUMENTATION-AUDIT.json');
const OUT=path.join(GEN,'NARUTO_SHINOBI_NO_SHO_ESPECIFICACAO_FINAL_COMPLETA.md');

if(!fs.existsSync(INV_PATH)) throw new Error('TECHNICAL-INVENTORY.json ausente');
if(!fs.existsSync(AUDIT_PATH)) throw new Error('DOCUMENTATION-AUDIT.json ausente');

const inv=JSON.parse(fs.readFileSync(INV_PATH,'utf8'));
const audit=JSON.parse(fs.readFileSync(AUDIT_PATH,'utf8'));
const norm=p=>String(p||'').replace(/\\/g,'/');
const abs=p=>path.join(ROOT,norm(p));
const exists=p=>fs.existsSync(abs(p));
const read=p=>fs.readFileSync(abs(p),'utf8');
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
const md=s=>String(s??'').replace(/\|/g,'\\|').replace(/\r?\n/g,' ').trim();
const q=s=>'`'+String(s??'').replace(/`/g,'\\`')+'`';
const uniq=a=>[...new Set((a||[]).filter(Boolean))];
const TEXT_EXT=new Set(['.js','.mjs','.cjs','.html','.css','.json','.toml','.yml','.yaml','.ps1','.cmd','.bat','.sh','.md','.txt','.tsv','.csv','.xml','.svg']);
const CODE_EXT=new Set(['.js','.mjs','.cjs','.html','.css','.json','.toml','.yml','.yaml','.ps1','.cmd','.bat','.sh','.xml','.svg']);
const LANG={'.js':'javascript','.mjs':'javascript','.cjs':'javascript','.html':'html','.css':'css','.json':'json','.toml':'toml','.yml':'yaml','.yaml':'yaml','.ps1':'powershell','.cmd':'bat','.bat':'bat','.sh':'bash','.md':'markdown','.txt':'text','.tsv':'text','.csv':'text','.xml':'xml','.svg':'xml'};
const isGenerated=p=>norm(p).startsWith('docs/generated/');
const isDoc=p=>norm(p).startsWith('docs/');
const isTool=p=>norm(p).startsWith('tools/')||norm(p).startsWith('.github/');
const isRuntime=p=>!isDoc(p)&&!isTool(p)&&!norm(p).startsWith('node_modules/')&&!norm(p).startsWith('.git/');
const isText=p=>TEXT_EXT.has(path.extname(norm(p)).toLowerCase());
const isCode=p=>CODE_EXT.has(path.extname(norm(p)).toLowerCase());

function fence(text,lang='text'){
  const runs=[...(String(text).matchAll(/`+/g))].map(m=>m[0].length);
  const n=Math.max(3,(runs.length?Math.max(...runs):0)+1);
  const f='`'.repeat(n);
  return f+lang+'\n'+String(text).replace(/\r\n/g,'\n')+'\n'+f;
}
function sourceSlice(f){
  if(!f?.file||!exists(f.file)) return {ok:false,reason:'arquivo ausente'};
  const text=read(f.file);
  const start=Number(f?.ast?.start);
  const end=Number(f?.ast?.end);
  if(!Number.isInteger(start)||!Number.isInteger(end)||start<0||end<=start||end>text.length) return {ok:false,reason:'span AST inválido'};
  const code=text.slice(start,end);
  return {ok:true,code,sha256:sha(code)};
}
function list(v){return (v||[]).length?(v||[]).map(x=>q(typeof x==='string'?x:JSON.stringify(x))).join(', '):'—';}
function sources(items){return (items||[]).length?(items||[]).map(s=>q(`${s.file}:${s.line}`)).join(', '):'—';}
function section(title){lines.push('',`# ${title}`,'');}
function sub(title){lines.push('',`## ${title}`,'');}
function kv(k,v){lines.push(`- **${k}:** ${v}`);}
function fileSha(file){const b=fs.readFileSync(abs(file));return crypto.createHash('sha256').update(b).digest('hex');}

const manualDocs=[
  'docs/00-MODELO-FINAL-ARQUITETURA.md',
  'docs/01-MODELO-FINAL-IA-E-AUTORIDADE.md',
  'docs/02-MODELO-FINAL-GAMEPLAY-E-INTERACOES.md',
  'docs/03-MODELO-FINAL-DADOS-API-TESTES.md',
  'docs/04-MODELO-FINAL-SCRIPTS-FONTES-VALIDACAO.md'
];
const skillRefs=[
  ['Base44 oficial','https://github.com/base44/skills'],
  ['Base44 organização','https://github.com/base44'],
  ['Lovable skills comunidade','https://github.com/charanjit-singh/lovable-skills'],
  ['Lovable iniciantes','https://github.com/cporter202/lovable-for-beginners'],
  ['Lovable template','https://github.com/dao42/lovable-template'],
  ['Lovable boilerplate','https://github.com/chihebnabil/lovable-boilerplate'],
  ['Lovable topic','https://github.com/topics/lovable'],
  ['Lovable skills directory','https://lovableskills.com/find-skills-on-github'],
  ['Anthropic skills','https://github.com/anthropics/skills'],
  ['Anthropic cybersecurity skills','https://github.com/mukul975/Anthropic-Cybersecurity-Skills'],
  ['Game Dev agent skills','https://github.com/gamedev-skills/awesome-gamedev-agent-skills'],
  ['Godot GDScript patterns','https://github.com/wshobson/agents/tree/main/skills/godot-gdscript-patterns'],
  ['wshobson agents','https://github.com/wshobson/agents'],
  ['Antigravity skills','https://github.com/rmyndharis/antigravity-skills'],
  ['GitHub awesome-copilot','https://github.com/github/awesome-copilot']
];

const lines=[];
lines.push('# NARUTO SHINOBI NO SHO — ESPECIFICAÇÃO FINAL COMPLETA','','> Arquivo canônico único gerado a partir do código real do repositório. Ele combina modelo humano, inventário técnico, AST exato, rastreabilidade e fonte final utilizada.','');
kv('Gerado em',q(new Date().toISOString()));
kv('Repositório',q(process.env.GITHUB_REPOSITORY||'kaalflash12/naruto-shinobi-no-sho'));
kv('Commit',q(process.env.GITHUB_SHA||'local/indisponível'));
kv('Parser de funções',q(`${inv.astIndex?.parser||'desconhecido'} ${inv.astIndex?.parserVersion||''}`.trim()));
kv('Resolvedor UI',q(inv.uiDispatchResolution?.version||'ausente'));
kv('Status da auditoria-base',q(audit.status||'ausente'));
kv('Regra de autoridade documental','o código executável e os spans AST vencem qualquer descrição textual divergente; divergência vira correção, não interpretação.');

lines.push('','## Como ler o status','','- **PASS_STATIC:** provado pelo código/análise estática.','- **PASS_AST:** provado por AST com span exato.','- **PASS_LIVE:** exige execução real/E2E; nunca é inferido de análise estática.','- **UNVERIFIED:** não existe prova dinâmica suficiente nesta geração.','- **FAIL:** requisito divergente ou ligação ausente.');

section('1. MODELO FINAL OBRIGATÓRIO DO JOGO');
lines.push('A arquitetura canônica operacional é: **frontend estático → Cloudflare Worker API → Durable Objects para sala/presença → MongoDB Atlas para persistência → Workers AI para assistência narrativa → TERION 2D10 como autoridade mecânica**. Vercel e Supabase não são dependências finais do runtime desta especificação.','');
lines.push('O modelo de implementação obrigatório para qualquer sistema é: **entrada/evento → validação → autoridade mecânica/servidor quando aplicável → mutação de estado → persistência → resposta → atualização visual → auditoria/teste**. Nenhuma IA pode substituir a autoridade mecânica do TERION nem inventar resultado mecânico recebido do cliente.');

sub('1.1 Critérios técnicos/skills usados como referência');
lines.push('Estas fontes servem como **critérios de projeto e auditoria**, não como dependências runtime instaladas automaticamente:','');
for(const [name,url] of skillRefs) lines.push(`- **${name}:** ${url}`);
lines.push('','Critérios de Game Dev aplicados na auditoria: RPG systems, save systems, game AI, dialogue systems, game UI/UX, input systems, level design, performance e asset pipeline.');

sub('1.2 Capítulos humanos canônicos incorporados');
for(const file of manualDocs){
  lines.push('',`### ${file}`,'');
  if(!exists(file)){lines.push('**FAIL: arquivo manual ausente.**');continue;}
  lines.push(read(file));
}

section('2. COBERTURA TÉCNICA DA GERAÇÃO');
lines.push('| Categoria | Total |','|---|---:|');
const totals={
  'Funções/métodos AST':(inv.functions||[]).length,
  'Rotas API':(inv.routes||[]).length,
  'Modelos IA':(inv.models||[]).length,
  'Coleções MongoDB':(inv.collections||[]).length,
  'Ocorrências storage':(inv.storage||[]).length,
  'Ações UI executáveis':(inv.uiActions||[]).length,
  'Eventos':(inv.events||[]).length,
  'Funções de movimento':(inv.movementFunctions||[]).length,
  'Evidências movimento/mapa':(inv.movement||[]).length,
  'Scripts carregados':(inv.scripts||[]).length,
  'Referências únicas de assets':Number(inv.counts?.uniqueAssetReferences||0),
  'Ações UI concretas não resolvidas':(inv.uiActionResolvedCrosswalk||[]).filter(x=>!x.dynamicTemplate&&!x.handlerFunctionIds?.length).length
};
for(const [k,v] of Object.entries(totals)) lines.push(`| ${k} | ${v} |`);

section('3. CADA FUNÇÃO / CALLBACK — COMPORTAMENTO E CÓDIGO FINAL');
lines.push('Somente entradas com AST são tratadas como funções executáveis. Cada bloco abaixo contém o **trecho exato do arquivo**, não uma reescrita aproximada.','');
for(const f of inv.functions||[]){
  const slice=sourceSlice(f);
  lines.push(`## FUNC-ID::${f.id} — ${q(f.name)}`,'');
  kv('Fonte',q(`${f.file}:${f.line}-${f.endLine||f.line}`));
  kv('Domínio',q(f.domain||'não classificado'));
  kv('Tipo AST',q(f.ast?.type||f.astType||f.kind||'desconhecido'));
  kv('Parâmetros',q(md(f.params)||'(nenhum explícito)'));
  kv('Async',q(String(Boolean(f.async))));
  kv('Chamadas',list(f.behavior?.calls||f.calls));
  kv('Retornos',list(f.behavior?.returns));
  kv('Throws/erros',list(f.behavior?.throws));
  kv('Rotas/API',list(f.behavior?.routeRefs||f.refs?.routes));
  kv('Coleções DB',list(f.behavior?.collectionRefs||f.refs?.collections));
  kv('Storage',list(f.behavior?.storageRefs||f.refs?.storageKeys));
  kv('DOM',list(f.behavior?.domRefs||f.refs?.domIds));
  kv('Ações/handlers',list(f.behavior?.handlerLiterals||f.refs?.actions));
  kv('Movimento/mapa',list(f.behavior?.movementTerms));
  kv('Timers/RNG',list(f.behavior?.timerRandomRefs));
  if(slice.ok){
    kv('SHA-256 do código exato',q(slice.sha256));
    lines.push('',fence(slice.code,LANG[path.extname(f.file).toLowerCase()]||'javascript'),'');
  }else{
    lines.push('',`**FAIL — código exato não extraído: ${md(slice.reason)}**`,'');
  }
}

section('4. CADA IA — MODELO, FONTE, AUTORIDADE E USO');
for(const a of inv.models||[]){
  lines.push(`## AI-ID::${a.id} — ${q(a.model)}`,'');
  kv('Fontes',sources(a.sources));
  kv('Classificação',q(a.model==='@cf/zai-org/glm-4.7-flash'?'PRIMARY_WORKER_MODEL':'SOURCE_DETECTED_NON_PRIMARY_OR_LEGACY'));
  kv('Regra','IA é assistente narrativa; resultado mecânico é validado pelo TERION/servidor e não pode ser aceito como resultado declarado pelo cliente.');
}

section('5. CADA ROTA/API — CONTRATO E EVIDÊNCIA');
const apiCross=new Map((inv.apiContractCrosswalk||inv.apiCrosswalk||[]).map(x=>[x.id,x]));
for(const r of inv.routes||[]){
  const x=apiCross.get(r.id)||{};
  lines.push(`## API-ID::${r.id} — ${q(r.route)}`,'');
  kv('Fontes',sources(r.sources));
  kv('Métodos detectados',list(x.methods||r.methods));
  kv('Funções consumidoras/handlers',list(x.functionIds||x.handlers));
  kv('Autenticação/evidência',list(x.authEvidence));
  kv('Request/evidência',list(x.requestEvidence));
  kv('Response/evidência',list(x.responseEvidence));
}

section('6. PERSISTÊNCIA — COLEÇÕES, STORAGE E OPERAÇÕES');
const dbCross=new Map((inv.persistenceOperations||inv.persistenceCrosswalk||[]).map(x=>[x.id,x]));
for(const c of inv.collections||[]){
  const x=dbCross.get(c.id)||{};
  lines.push(`## DB-ID::${c.id} — ${q(c.name)}`,'');
  kv('Fontes',sources(c.sources));
  kv('Operações detectadas',list(x.operations));
  kv('Funções relacionadas',list(x.functionIds));
}
sub('Storage do navegador');
for(const s of inv.storage||[]) lines.push(`- **STORE-ID::${s.id}** ${q(s.scope)} / ${q(s.operation)} / chave ${q(s.value)} / fonte ${q(`${s.file}:${s.line}`)}`);

section('7. CADA INTERAÇÃO / AÇÃO DE UI — EMISSOR → DISPATCHER → HANDLER');
const resolvedById=new Map((inv.uiActionResolvedCrosswalk||[]).map(x=>[x.id,x]));
for(const a of inv.uiActions||[]){
  const r=resolvedById.get(a.id)||{};
  lines.push(`## UI-ID::${a.id} — ${q(a.value)}`,'');
  kv('Emissão',sources(a.sources));
  kv('Status AST',q(r.status||'SEM_RESOLUCAO'));
  kv('Template dinâmico',q(String(Boolean(r.dynamicTemplate))));
  kv('Tipo de handler',q(r.handlerType||'—'));
  kv('Handlers/dispatchers',list(r.handlerFunctionIds));
  kv('Evidência do resolvedor',list((r.handlers||[]).flatMap(h=>h.evidence||[])));
  if(!r.dynamicTemplate&&!r.handlerFunctionIds?.length) lines.push('','**FAIL — AÇÃO CONCRETA SEM HANDLER/DISPATCHER PROVADO.**','');
}

section('8. EVENTOS');
for(const e of inv.events||[]) lines.push(`- **EVENT-ID::${e.id}** ${q(e.value)} — ${sources(e.sources)}`);

section('9. MOVIMENTO, MAPA, POSIÇÃO E AÇÕES ESPACIAIS');
for(const f of inv.movementFunctions||[]){
  lines.push(`## MOVE-FUNC-ID::${f.functionId||f.id||'SEM-ID'} — ${q(f.name||f.functionName||'função')}`,'');
  kv('Fonte',q(`${f.file||''}:${f.line||''}`));
  kv('Termos/evidências',list(f.terms||f.evidence||f.movementTerms));
}
sub('Evidências literais de movimento/mapa');
for(const m of inv.movement||[]) lines.push(`- **MOVE-ID::${m.id}** ${q(`${m.file}:${m.line}`)} — ${md(m.text)}`);

section('10. SCRIPTS CARREGADOS — ORDEM E RESPONSABILIDADE');
const scriptResp=new Map((inv.scriptResponsibilities||[]).map(x=>[norm(x.path||x.file||x.script),x]));
for(const s of inv.scripts||[]){
  const key=norm(s.local||s.src||s.path);
  const x=scriptResp.get(key)||{};
  lines.push(`## SCRIPT-LOAD::${s.order} — ${q(key)}`,'');
  kv('Existe',q(String(Boolean(s.exists))));
  kv('Linha no index',q(String(s.line||'')));
  kv('Responsabilidade detectada',md(x.responsibility||x.summary||'derivada pelo código e ordem de carregamento; ver fonte integral abaixo')||'—');
  if(key&&exists(key)) kv('SHA-256',q(fileSha(key)));
}

section('11. ASSETS — REFERÊNCIA, EXISTÊNCIA E HASH');
const assetPaths=new Map();
for(const a of inv.assets||[]){
  const p=norm(a.value);
  if(!assetPaths.has(p))assetPaths.set(p,{path:p,exists:a.exists!==false,sources:[]});
  const row=assetPaths.get(p);row.exists=row.exists&&(a.exists!==false);row.sources.push({file:a.file,line:a.line});
}
for(const row of [...assetPaths.values()].sort((a,b)=>a.path.localeCompare(b.path))){
  const real=exists(row.path);
  lines.push(`- **ASSET::${row.path}** — caminho=${real?'PASS':'MISSING'} — SHA-256=${real?q(fileSha(row.path)):'—'} — fontes=${sources(row.sources)}`);
}
lines.push('','Arquivos binários são representados por **caminho + tamanho + SHA-256**. Não é correto converter PNG/JPG/fontes/binários em “código digitado” fictício.');

section('12. RASTREABILIDADE DOS REQUISITOS');
lines.push('| ID | Tipo | Elemento | Evidência principal |','|---|---|---|---|');
for(const f of inv.functions||[]) lines.push(`| ${f.id} | função | ${q(f.name)} | ${q(`${f.file}:${f.line}-${f.endLine||f.line}`)} |`);
for(const r of inv.routes||[]) lines.push(`| ${r.id} | API | ${q(r.route)} | ${sources(r.sources)} |`);
for(const a of inv.models||[]) lines.push(`| ${a.id} | IA | ${q(a.model)} | ${sources(a.sources)} |`);
for(const c of inv.collections||[]) lines.push(`| ${c.id} | DB | ${q(c.name)} | ${sources(c.sources)} |`);
for(const a of inv.uiActions||[]) lines.push(`| ${a.id} | UI | ${q(a.value)} | ${sources(a.sources)} |`);

section('13. FONTE FINAL INTEGRAL DO RUNTIME');
lines.push('Este apêndice contém os arquivos textuais executáveis/configuração do runtime no estado usado por esta especificação. Assim é possível comparar a especificação com o código final sem depender de trechos omitidos.','');
const allFiles=(inv.files||[]).map(f=>norm(f.path)).filter(p=>p&&!isGenerated(p)&&exists(p));
const runtimeText=uniq(allFiles.filter(p=>isRuntime(p)&&isText(p))).sort();
for(const file of runtimeText){
  const text=read(file);
  lines.push(`## SOURCE-RUNTIME::${file}`,'');
  kv('SHA-256',q(fileSha(file)));
  kv('Bytes',q(String(Buffer.byteLength(text))));
  lines.push('',fence(text,LANG[path.extname(file).toLowerCase()]||'text'),'');
}

section('14. FONTE FINAL DAS FERRAMENTAS DE AUDITORIA/DOCUMENTAÇÃO');
lines.push('Tooling é separado do runtime para não contaminar IA/API/DB/UI do jogo, mas o código é incluído porque também precisa ser auditável.','');
const toolingText=uniq(allFiles.filter(p=>isTool(p)&&isText(p))).sort();
for(const file of toolingText){
  const text=read(file);
  lines.push(`## SOURCE-TOOLING::${file}`,'');
  kv('SHA-256',q(fileSha(file)));
  lines.push('',fence(text,LANG[path.extname(file).toLowerCase()]||'text'),'');
}

section('15. ARQUIVOS BINÁRIOS / NÃO-TEXTUAIS');
const binaryFiles=uniq(allFiles.filter(p=>!isText(p))).sort();
for(const file of binaryFiles){
  const st=fs.statSync(abs(file));
  lines.push(`- **BINARY::${file}** — ${st.size} bytes — SHA-256 ${q(fileSha(file))}`);
}

section('16. GATES FINAIS E PENDÊNCIAS');
const unresolved=(inv.uiActionResolvedCrosswalk||[]).filter(x=>!x.dynamicTemplate&&!x.handlerFunctionIds?.length);
kv('Auditoria AST-base',q(audit.status||'ausente'));
kv('Funções com código exato',q(`${(inv.functions||[]).filter(f=>sourceSlice(f).ok).length}/${(inv.functions||[]).length}`));
kv('Ações UI concretas sem handler',q(String(unresolved.length)));
kv('Runtime/E2E navegador',q(audit.gates?.gameplayE2E||'UNVERIFIED'));
kv('Workers live',q(audit.gates?.workersLive||'UNVERIFIED'));
kv('MongoDB live',q(audit.gates?.mongodbLive||'UNVERIFIED'));
if(unresolved.length){
  lines.push('','## FAIL — ações concretas ainda sem prova de handler','');
  for(const u of unresolved) lines.push(`- ${u.id} — ${q(u.action)} — ${sources(u.sources)}`);
}else lines.push('','**PASS_STATIC — nenhuma ação concreta de UI ficou sem handler/dispatcher estático provado.**');
lines.push('','A existência deste arquivo não converte gates dinâmicos em PASS. Runtime, navegador, Worker e MongoDB só recebem PASS quando houver teste real correspondente.');

const text=lines.join('\n').replace(/\n{4,}/g,'\n\n\n')+'\n';
fs.mkdirSync(GEN,{recursive:true});
fs.writeFileSync(OUT,text);
console.log(JSON.stringify({ok:true,out:norm(path.relative(ROOT,OUT)),bytes:Buffer.byteLength(text),sha256:sha(text),functions:(inv.functions||[]).length,uiActions:(inv.uiActions||[]).length,unresolvedConcreteUi:unresolved.length,runtimeSourceFiles:runtimeText.length,toolingSourceFiles:toolingText.length,binaryFiles:binaryFiles.length},null,2));
