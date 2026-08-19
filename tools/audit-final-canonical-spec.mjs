import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'docs','generated');
const INV_PATH=path.join(OUT,'TECHNICAL-INVENTORY.json');
const REPORT_PATH=path.join(OUT,'FINAL-CANONICAL-AUDIT.json');
const FINAL_PATH=path.join(OUT,'NARUTO_SHINOBI_NO_SHO_ESPECIFICACAO_FINAL_COMPLETA.md');
const sha256=d=>crypto.createHash('sha256').update(d).digest('hex');
const fail=[];
for(const p of [INV_PATH,REPORT_PATH,FINAL_PATH]) if(!fs.existsSync(p)) fail.push(`arquivo ausente: ${path.relative(ROOT,p)}`);
if(fail.length){console.error(fail.join('\n'));process.exit(1);}
const inv=JSON.parse(fs.readFileSync(INV_PATH,'utf8'));
const report=JSON.parse(fs.readFileSync(REPORT_PATH,'utf8'));
const md=fs.readFileSync(FINAL_PATH,'utf8');

if(report.status!=='PASS_FINAL_CANONICAL_SPEC'||report.ok!==true) fail.push(`status final=${report.status}`);
if(report.counts?.unresolvedConcreteUIActions!==0) fail.push(`ações concretas sem handler=${report.counts?.unresolvedConcreteUIActions}`);
if((report.missingFunctionCode||[]).length) fail.push(`funções sem código exato=${report.missingFunctionCode.length}`);
if((report.missingManualDocs||[]).length) fail.push(`docs manuais ausentes=${report.missingManualDocs.length}`);

const required=[
  ['FUNCTION',inv.functions||[]],['API',inv.routes||[]],['AI',inv.models||[]],['DB',inv.collections||[]],['UI',inv.uiActions||[]],['EVENT',inv.events||[]],['MOVE',inv.movement||[]],['SCRIPT',inv.scripts||[]]
];
for(const [kind,items] of required){
  for(const x of items){ if(!md.includes(`<!-- ${kind}:${x.id} -->`)) fail.push(`marcador ausente ${kind}:${x.id}`); }
}
for(const f of report.functionHashes||[]){
  if(!f.exactCode||!f.snippetSha256) fail.push(`hash de função ausente ${f.id}`);
  else if(!md.includes(`SHA-256 do trecho: \`${f.snippetSha256}\``)) fail.push(`hash de função não incorporado ${f.id}`);
}
for(const f of report.sourceFiles||[]){
  const abs=path.join(ROOT,f.path);
  if(!fs.existsSync(abs)){ fail.push(`fonte ausente ${f.path}`); continue; }
  const actual=sha256(fs.readFileSync(abs));
  if(actual!==f.sha256) fail.push(`SHA de fonte divergente ${f.path}`);
  if(!md.includes(`<!-- SOURCE:${f.path} -->`)) fail.push(`fonte integral ausente no canônico ${f.path}`);
}
for(const p of ['docs/00-ESPECIFICACAO-MESTRA.md','docs/01-IA-TERION-E-AUTORIDADE.md','docs/02-ARQUITETURA-API-PERSISTENCIA-ONLINE.md','docs/03-JOGABILIDADE-ACOES-MOVIMENTO-INTERACOES.md','docs/04-RASTREABILIDADE-E-VALIDACAO.md']){
  if(!md.includes(`<!-- MANUAL:${p} -->`)) fail.push(`manual não incorporado ${p}`);
}
if(!md.includes('`PASS_FINAL_CANONICAL_SPEC`')) fail.push('marcador PASS_FINAL_CANONICAL_SPEC ausente');

if(fail.length){
  console.error(JSON.stringify({ok:false,status:'FAIL_FINAL_CANONICAL_SPEC',failures:fail.slice(0,200),failureCount:fail.length,unresolvedUIActions:report.unresolvedUIActions||[]},null,2));
  process.exit(1);
}
console.log(JSON.stringify({ok:true,status:'PASS_FINAL_CANONICAL_SPEC',counts:report.counts,canonicalBytes:Buffer.byteLength(md),canonicalSha256:sha256(md)},null,2));
