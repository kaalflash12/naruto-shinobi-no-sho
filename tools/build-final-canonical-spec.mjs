import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'docs', 'generated');
const INV_PATH = path.join(OUT, 'TECHNICAL-INVENTORY.json');
const FINAL_MD = path.join(OUT, 'NARUTO_SHINOBI_NO_SHO_ESPECIFICACAO_FINAL_COMPLETA.md');
const FINAL_JSON = path.join(OUT, 'FINAL-CANONICAL-AUDIT.json');
const MANUAL_DOCS = [
  'docs/00-ESPECIFICACAO-MESTRA.md',
  'docs/01-IA-TERION-E-AUTORIDADE.md',
  'docs/02-ARQUITETURA-API-PERSISTENCIA-ONLINE.md',
  'docs/03-JOGABILIDADE-ACOES-MOVIMENTO-INTERACOES.md',
  'docs/04-RASTREABILIDADE-E-VALIDACAO.md'
];
const SOURCE_EXT = new Set(['.js','.mjs','.cjs','.html','.json','.toml','.css','.ps1','.yml','.yaml']);
const NON_FUNCTION = new Set(['if','for','while','switch','catch','with','return','throw','else','do','try','finally']);
const sha256 = data => crypto.createHash('sha256').update(data).digest('hex');
const norm = p => String(p || '').replace(/\\/g, '/');
const isDocs = p => norm(p).startsWith('docs/');
const isSource = p => SOURCE_EXT.has(path.extname(norm(p)).toLowerCase()) && !isDocs(p);
const esc = s => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const code = s => '`' + String(s ?? '').replace(/`/g, '\\`') + '`';
const fence = (text, lang='text') => `\n\n\`\`\`${lang}\n${text.replace(/\n?$/, '\n')}\`\`\`\n`;
const langFor = p => ({'.js':'javascript','.mjs':'javascript','.cjs':'javascript','.html':'html','.json':'json','.toml':'toml','.css':'css','.ps1':'powershell','.yml':'yaml','.yaml':'yaml'}[path.extname(p).toLowerCase()] || 'text');

if (!fs.existsSync(INV_PATH)) throw new Error('TECHNICAL-INVENTORY.json ausente');
const inv = JSON.parse(fs.readFileSync(INV_PATH, 'utf8'));

function lineLocator(text) {
  const starts = [0];
  for (let i = 0; i < text.length; i++) if (text.charCodeAt(i) === 10) starts.push(i + 1);
  return idx => {
    let lo = 0, hi = starts.length - 1;
    while (lo <= hi) { const mid = (lo + hi) >> 1; if (starts[mid] <= idx) lo = mid + 1; else hi = mid - 1; }
    return hi + 1;
  };
}

function blockEnd(text, open) {
  let depth=0, quote='', lineComment=false, blockComment=false, escape=false;
  for (let i=open; i<text.length; i++) {
    const c=text[i], n=text[i+1];
    if (lineComment) { if (c==='\n') lineComment=false; continue; }
    if (blockComment) { if (c==='*' && n==='/') { blockComment=false; i++; } continue; }
    if (quote) {
      if (escape) { escape=false; continue; }
      if (c==='\\') { escape=true; continue; }
      if (c===quote) quote='';
      continue;
    }
    if (c==='/' && n==='/') { lineComment=true; i++; continue; }
    if (c==='/' && n==='*') { blockComment=true; i++; continue; }
    if (c==='"' || c==="'" || c==='`') { quote=c; continue; }
    if (c==='{') depth++;
    else if (c==='}') { depth--; if (depth===0) return i; }
  }
  return text.length - 1;
}

function snippetAt(text, start) {
  const open = text.indexOf('{', start);
  if (open >= 0 && open - start <= 1000) return text.slice(start, blockEnd(text, open) + 1).trim();
  let end = text.indexOf(';', start);
  const nl = text.indexOf('\n', start);
  if (end < 0 || (nl >= 0 && nl < end)) end = nl;
  if (end < 0) end = Math.min(text.length, start + 1200);
  return text.slice(start, end + 1).trim();
}

function scanFunctions(file, text) {
  const lineAt = lineLocator(text);
  const patterns = [
    {kind:'declaration',re:/(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(([^)]*)\)/gm,name:1},
    {kind:'arrow',re:/(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?\(([^)]*)\)\s*=>/gm,name:1},
    {kind:'arrow-one',re:/(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?([A-Za-z_$][\w$]*)\s*=>/gm,name:1},
    {kind:'function-expression',re:/(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?function(?:\s+[A-Za-z_$][\w$]*)?\s*\(([^)]*)\)/gm,name:1},
    {kind:'method',re:/^\s{0,12}(?:async\s+)?([A-Za-z_$][\w$]*)\s*\(([^)]*)\)\s*\{/gm,name:1}
  ];
  const out=[], seen=new Set();
  for (const p of patterns) {
    let m; p.re.lastIndex=0;
    while ((m=p.re.exec(text))) {
      const name=m[p.name];
      if (NON_FUNCTION.has(name)) continue;
      const key=m.index+':'+name;
      if (seen.has(key)) continue;
      seen.add(key);
      const snippet=snippetAt(text,m.index);
      out.push({file,line:lineAt(m.index),name,kind:p.kind,snippet,sha256:sha256(snippet)});
    }
  }
  return out;
}

const textByFile = new Map();
for (const f of inv.files || []) {
  if (!isSource(f.path)) continue;
  const abs=path.join(ROOT,f.path);
  if (!fs.existsSync(abs)) continue;
  textByFile.set(f.path, fs.readFileSync(abs,'utf8'));
}

const scanned=[];
for (const [file,text] of textByFile) if (/\.(?:m?js|cjs)$/.test(file)) scanned.push(...scanFunctions(file,text));
const fnMap=new Map();
for (const f of scanned) {
  const key=`${f.file}:${f.line}:${f.name}`;
  if (!fnMap.has(key)) fnMap.set(key,f);
}

const functionRecords=[];
const missingFunctionCode=[];
for (const f of inv.functions || []) {
  const key=`${f.file}:${f.line}:${f.name}`;
  const hit=fnMap.get(key);
  if (!hit || !hit.snippet) {
    missingFunctionCode.push({id:f.id,file:f.file,line:f.line,name:f.name});
    functionRecords.push({...f,exactCode:false,snippet:'',snippetSha256:null});
  } else {
    functionRecords.push({...f,exactCode:true,snippet:hit.snippet,snippetSha256:hit.sha256});
  }
}

function actionHandlerEvidence(action) {
  const value=String(action.value || '');
  const dynamic=/\$\{[^}]+\}/.test(value);
  if (dynamic) return {dynamic:true,status:'DYNAMIC_TEMPLATE_TRACE',evidence:[]};
  const lit=esc(value);
  const explicit=[
    new RegExp(`\\bcase\\s+['\"\\\`]${lit}['\"\\\`]`),
    new RegExp(`(?:===|==|!==|!=)\\s*['\"\\\`]${lit}['\"\\\`]`),
    new RegExp(`['\"\\\`]${lit}['\"\\\`]\\s*(?:===|==|!==|!=)`),
    new RegExp(`\\.(?:includes|has)\\(\\s*['\"\\\`]${lit}['\"\\\`]\\s*\\)`),
    new RegExp(`['\"\\\`]${lit}['\"\\\`]\\s*:`)
  ];
  const evidence=[];
  for (const [file,text] of textByFile) {
    if (!/\.(?:m?js|cjs|html)$/.test(file)) continue;
    const lines=text.split(/\r?\n/);
    for (let i=0;i<lines.length;i++) {
      if (!lines[i].includes(value)) continue;
      const context=lines.slice(Math.max(0,i-2),Math.min(lines.length,i+3)).join('\n');
      const emitter=/data-(?:action|go)\s*=/.test(lines[i]);
      if (!emitter && explicit.some(re=>re.test(context))) evidence.push({file,line:i+1,kind:'explicit-branch'});
    }
  }
  if (!evidence.length) {
    const allGo=(action.sources||[]).length>0 && (action.sources||[]).every(s=>s.kind==='go');
    if (allGo) {
      for (const [file,text] of textByFile) {
        if (!/\.(?:m?js|cjs)$/.test(file)) continue;
        const lines=text.split(/\r?\n/);
        for (let i=0;i<lines.length;i++) {
          if (/dataset\.go|getAttribute\(\s*['\"]data-go['\"]/.test(lines[i])) evidence.push({file,line:i+1,kind:'generic-data-go-dispatch'});
        }
      }
    }
  }
  return {dynamic:false,status:evidence.length?'HANDLER_TRACED':'UNHANDLED_CONCRETE_ACTION',evidence};
}

const uiTraces=(inv.uiActions||[]).map(a=>({...a,...actionHandlerEvidence(a)}));
const unresolvedUIActions=uiTraces.filter(x=>!x.dynamic && x.status!=='HANDLER_TRACED');

const manualDocs=MANUAL_DOCS.map(p=>({path:p,exists:fs.existsSync(path.join(ROOT,p)),content:fs.existsSync(path.join(ROOT,p))?fs.readFileSync(path.join(ROOT,p),'utf8'):''}));
const missingManualDocs=manualDocs.filter(x=>!x.exists).map(x=>x.path);
const sourceFiles=(inv.files||[]).filter(f=>isSource(f.path) && fs.existsSync(path.join(ROOT,f.path)));
const assetFiles=(inv.files||[]).filter(f=>f.asset);
const concreteActions=uiTraces.filter(x=>!x.dynamic);

const pass=missingFunctionCode.length===0 && unresolvedUIActions.length===0 && missingManualDocs.length===0;
const status=pass?'PASS_FINAL_CANONICAL_SPEC':'FAIL_FINAL_CANONICAL_SPEC';
function gate(list){ return list.length===0?'PASS':'FAIL'; }
const report={
  generatedAt:new Date().toISOString(),
  status,
  ok:pass,
  repository:inv.repository,
  sourceInventoryGeneratedAt:inv.generatedAt,
  counts:{
    functions:(inv.functions||[]).length,
    functionsWithExactCode:functionRecords.filter(x=>x.exactCode).length,
    routes:(inv.routes||[]).length,
    models:(inv.models||[]).length,
    collections:(inv.collections||[]).length,
    uiActions:(inv.uiActions||[]).length,
    concreteUIActions:concreteActions.length,
    dynamicUIActionTemplates:uiTraces.filter(x=>x.dynamic).length,
    concreteUIActionsWithHandler:concreteActions.filter(x=>x.status==='HANDLER_TRACED').length,
    unresolvedConcreteUIActions:unresolvedUIActions.length,
    sourceFiles:sourceFiles.length,
    assetFiles:assetFiles.length,
    manualDocs:manualDocs.length
  },
  gates:{
    manualSpecification:gate(missingManualDocs),
    exactFunctionCode:gate(missingFunctionCode),
    concreteUIActionHandlers:gate(unresolvedUIActions),
    runtimeExecution:'UNVERIFIED',
    browserInteraction:'UNVERIFIED',
    workersLive:'UNVERIFIED',
    mongodbLive:'UNVERIFIED',
    gameplayE2E:'UNVERIFIED'
  },
  missingManualDocs,
  missingFunctionCode,
  unresolvedUIActions:unresolvedUIActions.map(x=>({id:x.id,value:x.value,sources:x.sources})),
  functionHashes:functionRecords.map(x=>({id:x.id,file:x.file,line:x.line,name:x.name,exactCode:x.exactCode,snippetSha256:x.snippetSha256})),
  uiTraces:uiTraces.map(x=>({id:x.id,value:x.value,dynamic:x.dynamic,status:x.status,sources:x.sources,evidence:x.evidence})),
  sourceFiles:sourceFiles.map(x=>({path:x.path,size:x.size,sha256:x.sha256})),
  assetFiles:assetFiles.map(x=>({path:x.path,size:x.size,sha256:x.sha256}))
};
fs.mkdirSync(OUT,{recursive:true});
fs.writeFileSync(FINAL_JSON,JSON.stringify(report,null,2)+'\n');

const md=[];
md.push('# NARUTO SHINOBI NO SHO — ESPECIFICAÇÃO FINAL COMPLETA','',
  '> Arquivo canônico gerado diretamente do repositório. Une especificação humana, inventário técnico, código exato, rastreabilidade de UI, APIs, IA, persistência, scripts e hashes de assets.','',
  `- **Status canônico estático:** ${code(status)}`,
  `- **Inventário-base:** ${code(inv.generatedAt)}`,
  `- **Gerado em:** ${code(report.generatedAt)}`,
  `- **Execução/browser/Workers/MongoDB/E2E:** ${code('UNVERIFIED')} neste gate estático.`,
  '', '## 1. RESUMO DE COBERTURA','',
  '| Item | Total |','|---|---:|',
  `| Funções | ${report.counts.functions} |`,
  `| Funções com código exato | ${report.counts.functionsWithExactCode} |`,
  `| Rotas API | ${report.counts.routes} |`,
  `| Modelos IA | ${report.counts.models} |`,
  `| Coleções | ${report.counts.collections} |`,
  `| Ações UI | ${report.counts.uiActions} |`,
  `| Ações concretas sem handler | ${report.counts.unresolvedConcreteUIActions} |`,
  `| Arquivos fonte/config/tooling | ${report.counts.sourceFiles} |`,
  `| Assets | ${report.counts.assetFiles} |`,'');

md.push('## 2. ESPECIFICAÇÃO HUMANA INCORPORADA','');
for (const d of manualDocs) {
  md.push(`<!-- MANUAL:${d.path} -->`,`### ${d.path}`,'');
  if (!d.exists) md.push('**AUSENTE**',''); else md.push(d.content.trim(),'');
}

md.push('## 3. FUNÇÕES E MÉTODOS — CÓDIGO EXATO','');
for (const f of functionRecords) {
  md.push(`<!-- FUNCTION:${f.id} -->`,`### ${f.id} — ${code(f.name)}`,'',
    `- Fonte: ${code(`${f.file}:${f.line}`)}`,
    `- Domínio: ${code(f.domain || 'unknown')}`,
    `- Forma: ${code(f.kind)}`,
    `- Código exato localizado: ${f.exactCode?'SIM':'NÃO'}`,
    `- SHA-256 do trecho: ${code(f.snippetSha256 || 'AUSENTE')}`,'');
  if (f.exactCode) md.push(fence(f.snippet,langFor(f.file)));
}

md.push('## 4. API, IA E PERSISTÊNCIA','', '### 4.1 Rotas API','');
for (const r of inv.routes||[]) md.push(`<!-- API:${r.id} -->`,`- **${r.id}** ${code(r.route)} — ${(r.sources||[]).map(s=>code(`${s.file}:${s.line}`)).join(', ')}`);
md.push('', '### 4.2 Modelos de IA','');
for (const a of inv.models||[]) md.push(`<!-- AI:${a.id} -->`,`- **${a.id}** ${code(a.model)} — ${(a.sources||[]).map(s=>code(`${s.file}:${s.line}`)).join(', ')}`);
md.push('', '### 4.3 Coleções MongoDB','');
for (const c of inv.collections||[]) md.push(`<!-- DB:${c.id} -->`,`- **${c.id}** ${code(c.name)} — ${(c.sources||[]).map(s=>code(`${s.file}:${s.line}`)).join(', ')}`);
md.push('', '### 4.4 Storage do navegador','');
for (const s of inv.storage||[]) md.push(`<!-- STORE:${s.id} -->`,`- **${s.id}** ${code(`${s.scope}.${s.operation}(${s.value})`)} — ${code(`${s.file}:${s.line}`)}`);

md.push('', '## 5. CROSSWALK DE UI — EMISSOR → HANDLER','');
for (const a of uiTraces) {
  md.push(`<!-- UI:${a.id} -->`,`### ${a.id} — ${code(a.value)}`,'',
    `- Tipo: ${a.dynamic?'template dinâmico':'ação concreta'}`,
    `- Status: ${code(a.status)}`,
    `- Emissores: ${(a.sources||[]).map(s=>code(`${s.file}:${s.line}${s.kind?` [${s.kind}]`:''}`)).join(', ') || '—'}`,
    `- Handler/dispatcher: ${(a.evidence||[]).map(e=>code(`${e.file}:${e.line} [${e.kind}]`)).join(', ') || '—'}`,'');
}

md.push('## 6. EVENTOS, MOVIMENTO E ORDEM DE SCRIPTS','', '### 6.1 Eventos','');
for (const e of inv.events||[]) md.push(`<!-- EVENT:${e.id} -->`,`- **${e.id}** ${code(e.value)} — ${(e.sources||[]).map(s=>code(`${s.file}:${s.line}`)).join(', ')}`);
md.push('', '### 6.2 Evidências de movimento/mapa/posição','');
for (const m of inv.movement||[]) md.push(`<!-- MOVE:${m.id} -->`,`- **${m.id}** ${code(`${m.file}:${m.line}`)} — ${String(m.text||'').replace(/\s+/g,' ').trim()}`);
md.push('', '### 6.3 Ordem dos scripts','');
for (const s of inv.scripts||[]) md.push(`<!-- SCRIPT:${s.id} -->`,`- **${s.order}.** ${code(s.local)} — existe=${s.exists?'SIM':'NÃO'} — index.html:${s.line}`);

md.push('', '## 7. MANIFESTO DE ASSETS','', 'Binários não são reproduzidos como texto. Cada asset é registrado por caminho, tamanho e SHA-256.','', '| Caminho | Bytes | SHA-256 |','|---|---:|---|');
for (const a of assetFiles) md.push(`| ${code(a.path)} | ${a.size} | ${code(a.sha256)} |`);

md.push('', '## 8. CÓDIGO-FONTE INTEGRAL DO REPOSITÓRIO','', 'Abaixo está o conteúdo textual integral de cada arquivo de fonte/configuração/tooling não documental usado pelo inventário.','');
for (const f of sourceFiles) {
  const abs=path.join(ROOT,f.path), text=fs.readFileSync(abs,'utf8');
  md.push(`<!-- SOURCE:${f.path} -->`,`### ${f.path}`,'',`- Bytes: ${f.size}` , `- SHA-256: ${code(f.sha256)}`,'',fence(text,langFor(f.path)));
}

md.push('## 9. RESULTADO DO GATE CANÔNICO','',
  `- Manual incorporado: ${code(report.gates.manualSpecification)}`,
  `- Código exato de todas as funções: ${code(report.gates.exactFunctionCode)}`,
  `- Ações concretas com handler/dispatcher rastreado: ${code(report.gates.concreteUIActionHandlers)}`,
  `- **STATUS:** ${code(status)}`,'');
if (unresolvedUIActions.length) {
  md.push('### Ações concretas ainda sem handler provado','');
  for (const a of unresolvedUIActions) md.push(`- ${a.id} ${code(a.value)} — ${(a.sources||[]).map(s=>code(`${s.file}:${s.line}`)).join(', ')}`);
}
if (missingFunctionCode.length) {
  md.push('', '### Funções sem trecho exato localizado','');
  for (const f of missingFunctionCode) md.push(`- ${f.id} ${code(f.name)} — ${code(`${f.file}:${f.line}`)}`);
}

fs.writeFileSync(FINAL_MD,md.join('\n')+'\n');
console.log(JSON.stringify({ok:pass,status,counts:report.counts,unresolvedConcreteUIActions:report.unresolvedUIActions,missingFunctionCode:report.missingFunctionCode},null,2));
