import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT=process.cwd();
const GEN=path.join(ROOT,'docs','generated');
const INV=path.join(GEN,'TECHNICAL-INVENTORY.json');
const OUT=path.join(GEN,'AST-FUNCTION-AUDIT.json');
const failures=[];
const sha=s=>crypto.createHash('sha256').update(String(s)).digest('hex');
const fail=s=>failures.push(s);

let inv={};
try{inv=JSON.parse(fs.readFileSync(INV,'utf8'));}catch(e){fail('TECHNICAL-INVENTORY.json invalido/ausente: '+e.message);}
const idx=inv.astIndex||{};
if(idx.parser!=='acorn')fail('AST parser deve ser acorn');
if(idx.parserVersion!=='8.15.0')fail('Acorn deve estar pinado em 8.15.0; atual='+String(idx.parserVersion||'ausente'));
if(Number(idx.parseFailures)!==0)fail('AST parseFailures='+String(idx.parseFailures));
if(Number(idx.sourceFiles)!==Number(idx.parsedFiles))fail(`AST arquivos nao totalmente parseados: ${idx.parsedFiles}/${idx.sourceFiles}`);
if(Number(idx.functions)!==Number((inv.functions||[]).length))fail('contagem AST de funcoes diverge do inventario');

let exact=0,callbacks=0,anonymous=0;
for(const f of inv.functions||[]){
  const a=f.ast||{};
  if(a.parser!=='acorn')fail(`funcao sem AST Acorn: ${f.id} ${f.file}:${f.line}`);
  if(!Number.isInteger(a.start)||!Number.isInteger(a.end)||a.end<=a.start)fail(`span AST invalido: ${f.id}`);
  if(!Number.isInteger(a.bodyStart)||!Number.isInteger(a.bodyEnd)||a.bodyEnd<=a.bodyStart)fail(`body span AST invalido: ${f.id}`);
  if(!Number.isInteger(f.line)||!Number.isInteger(f.endLine)||f.endLine<f.line)fail(`linhas AST invalidas: ${f.id}`);
  if(!/^[a-f0-9]{64}$/.test(String(a.functionSha256||''))||!/^[a-f0-9]{64}$/.test(String(a.bodySha256||'')))fail(`hash AST ausente/invalido: ${f.id}`);
  const p=path.join(ROOT,String(f.file||''));
  if(!fs.existsSync(p)){fail(`fonte AST ausente: ${f.id} ${f.file}`);continue;}
  const text=fs.readFileSync(p,'utf8');
  if(a.end>text.length||a.bodyEnd>text.length){fail(`span AST fora do arquivo: ${f.id}`);continue;}
  if(sha(text.slice(a.start,a.end))!==a.functionSha256)fail(`functionSha256 nao corresponde ao fonte: ${f.id}`);
  if(sha(text.slice(a.bodyStart,a.bodyEnd))!==a.bodySha256)fail(`bodySha256 nao corresponde ao fonte: ${f.id}`);
  exact++;
  if(String(f.name||'').startsWith('<callback:'))callbacks++;
  if(String(f.name||'').startsWith('<anonymous@'))anonymous++;
}
if(!(exact>0))fail('nenhuma funcao AST exata auditada');
if(callbacks!==Number(idx.callbackFunctions||0))fail(`contagem de callbacks diverge: ${callbacks}/${idx.callbackFunctions}`);
if(anonymous!==Number(idx.anonymousFunctions||0))fail(`contagem de anonimas diverge: ${anonymous}/${idx.anonymousFunctions}`);

const report={generatedAt:new Date().toISOString(),ok:failures.length===0,status:failures.length===0?'PASS_AST_FUNCTION_INDEX':'FAIL_AST_FUNCTION_INDEX',parser:idx.parser||null,parserVersion:idx.parserVersion||null,sourceFiles:Number(idx.sourceFiles||0),parsedFiles:Number(idx.parsedFiles||0),parseFailures:Number(idx.parseFailures||0),functions:(inv.functions||[]).length,exactFunctions:exact,callbacks,anonymous,failures};
fs.writeFileSync(OUT,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
if(failures.length)process.exit(1);
