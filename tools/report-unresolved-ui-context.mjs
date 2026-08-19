import fs from 'node:fs';
import path from 'node:path';
import * as acorn from 'acorn';

const ROOT=process.cwd();
const INV=JSON.parse(fs.readFileSync(path.join(ROOT,'docs','generated','TECHNICAL-INVENTORY.json'),'utf8'));
const targets=(INV.uiActionResolvedCrosswalk||[]).filter(x=>!x.dynamicTemplate&&!x.handlerFunctionIds?.length);
const text=fs.readFileSync(path.join(ROOT,'app.js'),'utf8');
const lines=text.split(/\r?\n/);

function escRe(s){return String(s).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
function printRange(start,end,prefix='  '){
  const a=Math.max(1,start),b=Math.min(lines.length,end);
  for(let n=a;n<=b;n++)console.log(prefix+String(n).padStart(5,' ')+' | '+lines[n-1]);
}
function parse(){
  for(const sourceType of ['script','module']){
    try{return acorn.parse(text,{ecmaVersion:'latest',sourceType,locations:true,ranges:true,allowReturnOutsideFunction:true,allowAwaitOutsideFunction:true});}catch{}
  }
  throw new Error('app.js AST parse failed');
}
const ast=parse();
function isNode(v){return v&&typeof v==='object'&&typeof v.type==='string'&&Number.isInteger(v.start)&&Number.isInteger(v.end);}
function isFn(n){return ['FunctionDeclaration','FunctionExpression','ArrowFunctionExpression'].includes(n?.type);}
function walk(n,parent=null,cb){
  if(!isNode(n))return;
  cb(n,parent);
  for(const [k,v] of Object.entries(n)){
    if(['start','end','loc','range'].includes(k))continue;
    if(Array.isArray(v))for(const x of v)if(isNode(x))walk(x,n,cb);
    else if(isNode(v))walk(v,n,cb);
  }
}
const fnNodes=[];
walk(ast,null,(n,p)=>{if(isFn(n))fnNodes.push({n,p});});
function containingFns(idx){
  return fnNodes.filter(x=>x.n.start<=idx&&x.n.end>=idx).sort((a,b)=>(a.n.end-a.n.start)-(b.n.end-b.n.start));
}
function fnName(item){
  const {n,p}=item;
  if(n.id?.name)return n.id.name;
  if(p?.type==='VariableDeclarator'&&p.id?.name)return p.id.name;
  if(p?.type==='Property')return String(p.key?.name??p.key?.value??'<property>');
  if(p?.type==='CallExpression')return '<callback@'+n.loc.start.line+'>';
  return '<anonymous@'+n.loc.start.line+'>';
}
function literalOccurrences(value){
  const re=new RegExp('(["\'`])'+escRe(value)+'\\1','g');
  const out=[];let m;while((m=re.exec(text)))out.push(m.index);return out;
}

console.log('=== UNRESOLVED UI SOURCE CONTEXT ===');
console.log('COUNT='+targets.length);
for(const t of targets){
  console.log('\n============================================================');
  console.log('ACTION '+t.id+' '+JSON.stringify(t.action));
  console.log('DECLARED SOURCES '+JSON.stringify(t.sources));
  const occ=literalOccurrences(t.action);
  console.log('LITERAL_OCCURRENCES='+occ.length);
  for(const idx of occ){
    const pre=text.slice(0,idx);const line=pre.split(/\n/).length;
    console.log('\n-- literal @ app.js:'+line+' --');
    printRange(line-5,line+7);
    const c=containingFns(idx).slice(0,4);
    console.log('CONTAINING_FUNCTIONS='+JSON.stringify(c.map(x=>({name:fnName(x),start:x.n.loc.start.line,end:x.n.loc.end.line,type:x.n.type}))));
  }
}

console.log('\n\n=== ACTION SOURCE / DISPATCH CONTEXT ===');
const patterns=[
  /dataset\.(?:action|go)/g,
  /getAttribute\(\s*["']data-(?:action|go)["']\s*\)/g,
  /closest\([^\n]{0,160}data-(?:action|go)/g,
  /\[data-(?:action|go)/g
];
const seen=new Set();
for(const re of patterns){
  let m;while((m=re.exec(text))){
    const line=text.slice(0,m.index).split(/\n/).length;
    const key=line+':'+m[0];if(seen.has(key))continue;seen.add(key);
    console.log('\n-- action source @ app.js:'+line+' '+JSON.stringify(m[0])+' --');
    printRange(line-8,line+16);
    const c=containingFns(m.index).slice(0,4);
    console.log('CONTAINING_FUNCTIONS='+JSON.stringify(c.map(x=>({name:fnName(x),start:x.n.loc.start.line,end:x.n.loc.end.line,type:x.n.type}))));
  }
}

console.log('\n\n=== AST RESOLVER DISPATCHERS ===');
for(const d of INV.uiDispatchers||[]){
  if(d.file!=='app.js')continue;
  console.log('\nDISPATCHER '+JSON.stringify(d));
  printRange(d.line-3,d.line+15);
}
