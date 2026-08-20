import fs from 'node:fs';
import path from 'node:path';

// O construtor-base continua sendo a autoridade para inventário, funções, hashes e fontes.
// Este estágio corrige somente a classificação de handlers delegados/generic dispatchers
// quando há evidência concreta no código executável.
process.exitCode = 0;
await import('./build-final-canonical-spec.mjs');
process.exitCode = 0;

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'docs', 'generated');
const REPORT_PATH = path.join(OUT, 'FINAL-CANONICAL-AUDIT.json');
const FINAL_PATH = path.join(OUT, 'NARUTO_SHINOBI_NO_SHO_ESPECIFICACAO_FINAL_COMPLETA.md');

if (!fs.existsSync(REPORT_PATH) || !fs.existsSync(FINAL_PATH)) throw new Error('Saída do construtor canônico-base ausente.');

const report = JSON.parse(fs.readFileSync(REPORT_PATH, 'utf8'));
let md = fs.readFileSync(FINAL_PATH, 'utf8');
const sourceText = new Map();
for (const src of report.sourceFiles || []) {
  if (!/\.(?:m?js|cjs|html)$/i.test(src.path)) continue;
  const abs = path.join(ROOT, src.path);
  if (fs.existsSync(abs)) sourceText.set(src.path, fs.readFileSync(abs, 'utf8'));
}

const reEsc = s => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function lineAt(text,index){let n=1;for(let i=0;i<index;i++)if(text.charCodeAt(i)===10)n++;return n;}
function occurrences(text,needle){const out=[];let at=0;while((at=text.indexOf(needle,at))>=0){out.push(at);at+=Math.max(1,needle.length);}return out;}

function aliasesForDatasetAction(text){
  const aliases=[];
  const rx=/(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*[^;\n]{0,300}?\.dataset\.action\b/g;
  let m;while((m=rx.exec(text)))aliases.push({name:m[1],index:m.index});
  return aliases;
}

function delegatedEvidence(value){
  const evidence=[];
  const lit=reEsc(value);
  const exactSelector=new RegExp(`\\[\\s*data-action\\s*=\\s*\\\\?[\"']${lit}\\\\?[\"']\\s*\\]`);
  const literalBranch=[
    new RegExp(`\\bcase\\s+[\"'\\\`]${lit}[\"'\\\`]`),
    new RegExp(`(?:===|==|!==|!=)\\s*[\"'\\\`]${lit}[\"'\\\`]`),
    new RegExp(`[\"'\\\`]${lit}[\"'\\\`]\\s*(?:===|==|!==|!=)`),
    new RegExp(`\\.(?:includes|has)\\(\\s*[\"'\\\`]${lit}[\"'\\\`]\\s*\\)`),
    new RegExp(`[\"'\\\`]${lit}[\"'\\\`]\\s*:`)
  ];

  for(const [file,text] of sourceText){
    const aliases=aliasesForDatasetAction(text);
    for(const pos of occurrences(text,value)){
      const near=text.slice(Math.max(0,pos-1800),Math.min(text.length,pos+2200));
      const selector=exactSelector.test(near);
      const eventBoundary=/addEventListener\s*\(|\.onclick\s*=|\.onchange\s*=|\.oninput\s*=|\.onsubmit\s*=|\.onkeydown\s*=|\.onpointerdown\s*=/.test(near);
      const selectorConsumer=/(?:closest|matches|querySelector|querySelectorAll)\??\.?(?:call)?\s*\(/.test(near);
      if(selector&&eventBoundary&&selectorConsumer){
        evidence.push({file,line:lineAt(text,pos),kind:'delegated-selector-handler'});
        continue;
      }

      // Branch literal dentro de listener com alias comprovadamente vindo de dataset.action.
      // Procuramos somente aliases anteriores e próximos; o valor precisa aparecer no branch.
      const branchWindow=text.slice(Math.max(0,pos-500),Math.min(text.length,pos+900));
      const eligible=aliases.filter(x=>x.index<pos&&pos-x.index<=20000).sort((a,b)=>b.index-a.index);
      let generic=false;
      for(const alias of eligible.slice(0,4)){
        const between=text.slice(Math.max(0,alias.index-1500),Math.min(text.length,pos+900));
        if(!/addEventListener\s*\(/.test(between))continue;
        const ar=reEsc(alias.name);
        const branchRx=[
          new RegExp(`\\b${ar}\\s*(?:===|==|!==|!=)\\s*[\"'\\\`]${lit}[\"'\\\`]`),
          new RegExp(`[\"'\\\`]${lit}[\"'\\\`]\\s*(?:===|==|!==|!=)\\s*${ar}\\b`),
          new RegExp(`\\bcase\\s+[\"'\\\`]${lit}[\"'\\\`]`)
        ];
        if(branchRx.some(rx=>rx.test(branchWindow))){
          evidence.push({file,line:lineAt(text,pos),kind:`generic-data-action-dispatch:${alias.name}`});
          generic=true;break;
        }
      }
      if(generic)continue;

      if(literalBranch.some(rx=>rx.test(near))&&eventBoundary)evidence.push({file,line:lineAt(text,pos),kind:'explicit-event-branch'});
    }
  }

  const seen=new Set();
  return evidence.filter(e=>{const k=`${e.file}:${e.line}:${e.kind}`;if(seen.has(k))return false;seen.add(k);return true;});
}

const traceById=new Map((report.uiTraces||[]).map(x=>[x.id,x]));
for(const unresolved of report.unresolvedUIActions||[]){
  const trace=traceById.get(unresolved.id);if(!trace)continue;
  const found=delegatedEvidence(trace.value);
  if(found.length){trace.status='HANDLER_TRACED';trace.evidence=[...(trace.evidence||[]),...found];}
}

const concrete=(report.uiTraces||[]).filter(x=>!x.dynamic);
const unresolved=concrete.filter(x=>x.status!=='HANDLER_TRACED');
report.unresolvedUIActions=unresolved.map(x=>({id:x.id,value:x.value,sources:x.sources,evidence:x.evidence||[]}));
report.counts.concreteUIActionsWithHandler=concrete.filter(x=>x.status==='HANDLER_TRACED').length;
report.counts.unresolvedConcreteUIActions=unresolved.length;
report.gates.concreteUIActionHandlers=unresolved.length?'FAIL':'PASS';
const pass=unresolved.length===0&&!(report.missingFunctionCode||[]).length&&!(report.missingManualDocs||[]).length;
report.status=pass?'PASS_FINAL_CANONICAL_SPEC':'FAIL_FINAL_CANONICAL_SPEC';
report.ok=pass;
report.uiHandlerResolution='delegated-selector-and-generic-dispatch-evidence-v3';
report.generatedAt=new Date().toISOString();
fs.writeFileSync(REPORT_PATH,JSON.stringify(report,null,2)+'\n');

for(const trace of report.uiTraces||[]){
  const marker=`<!-- UI:${trace.id} -->`,start=md.indexOf(marker);if(start<0)continue;
  let end=md.indexOf('<!-- UI:',start+marker.length);const section6=md.indexOf('## 6.',start+marker.length);
  if(end<0||(section6>=0&&section6<end))end=section6;if(end<0)end=md.length;
  let block=md.slice(start,end);
  block=block.replace(/- Status: `[^`]+`/,`- Status: \`${trace.status}\``);
  const ev=(trace.evidence||[]).map(e=>`\`${e.file}:${e.line} [${e.kind}]\``).join(', ')||'—';
  block=block.replace(/- Handler\/dispatcher: .*?(?=\n|$)/,`- Handler/dispatcher: ${ev}`);
  md=md.slice(0,start)+block+md.slice(end);
}
md=md.replace(/- \*\*Status canônico estático:\*\* `(?:PASS|FAIL)_FINAL_CANONICAL_SPEC`/,`- **Status canônico estático:** \`${report.status}\``);
md=md.replace(/\| Ações concretas sem handler \| \d+ \|/,`| Ações concretas sem handler | ${unresolved.length} |`);
const gatePos=md.indexOf('## 9. RESULTADO DO GATE CANÔNICO');
if(gatePos>=0){
  const before=md.slice(0,gatePos),tail=['## 9. RESULTADO DO GATE CANÔNICO','',`- Manual incorporado: \`${report.gates.manualSpecification}\``,`- Código exato de todas as funções: \`${report.gates.exactFunctionCode}\``,`- Ações concretas com handler/dispatcher rastreado: \`${report.gates.concreteUIActionHandlers}\``,`- **STATUS:** \`${report.status}\``,''];
  if(unresolved.length){tail.push('### Ações concretas ainda sem handler provado','');for(const a of unresolved)tail.push(`- ${a.id} \`${a.value}\` — ${(a.sources||[]).map(s=>`\`${s.file}:${s.line}\``).join(', ')}`);tail.push('');}
  if((report.missingFunctionCode||[]).length){tail.push('### Funções sem trecho exato localizado','');for(const f of report.missingFunctionCode)tail.push(`- ${f.id} \`${f.name}\` — \`${f.file}:${f.line}\``);tail.push('');}
  md=before+tail.join('\n')+'\n';
}
fs.writeFileSync(FINAL_PATH,md);

console.log(JSON.stringify({ok:pass,status:report.status,resolution:report.uiHandlerResolution,concreteUIActions:report.counts.concreteUIActions,concreteUIActionsWithHandler:report.counts.concreteUIActionsWithHandler,unresolvedConcreteUIActions:unresolved.length,unresolved:unresolved.map(x=>x.value)},null,2));
if(!pass)process.exitCode=1;
