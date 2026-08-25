import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import * as acorn from 'acorn';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'docs','generated');
const INV_PATH=path.join(OUT,'TECHNICAL-INVENTORY.json');
if(!fs.existsSync(INV_PATH))throw new Error('TECHNICAL-INVENTORY.json ausente; execute generate primeiro');
const inv=JSON.parse(fs.readFileSync(INV_PATH,'utf8'));
const JS_EXT=new Set(['.js','.mjs','.cjs']);
const uniq=a=>[...new Set((a||[]).filter(Boolean))];
const clean=s=>String(s??'').replace(/\r?\n/g,' ').replace(/\s+/g,' ').trim();
const sha=s=>crypto.createHash('sha256').update(String(s)).digest('hex');
const code=s=>'`'+String(s??'').replace(/`/g,'\\`')+'`';
const norm=p=>String(p||'').replace(/\\/g,'/');
const isNode=n=>n&&typeof n==='object'&&typeof n.type==='string'&&Number.isInteger(n.start)&&Number.isInteger(n.end);
const isFunction=n=>['FunctionDeclaration','FunctionExpression','ArrowFunctionExpression'].includes(n?.type);
const read=file=>fs.readFileSync(path.join(ROOT,file),'utf8');

function parseJs(file,text){
  const first=path.extname(file).toLowerCase()==='.mjs'?'module':'script';
  const second=first==='module'?'script':'module';
  const opts=sourceType=>({ecmaVersion:'latest',sourceType,locations:true,ranges:true,allowHashBang:true,allowAwaitOutsideFunction:true,allowReturnOutsideFunction:true});
  try{return {ast:acorn.parse(text,opts(first)),sourceType:first};}
  catch(firstError){
    try{return {ast:acorn.parse(text,opts(second)),sourceType:second};}
    catch(secondError){
      const e=new Error(`${file}: AST parse failed: ${secondError.message}`);
      e.firstError=firstError.message;e.secondError=secondError.message;throw e;
    }
  }
}

function walk(node,parent=null,parentKey=null,index=null,visit){
  if(!isNode(node))return;
  visit(node,parent,parentKey,index);
  for(const [key,val] of Object.entries(node)){
    if(['start','end','loc','range'].includes(key))continue;
    if(Array.isArray(val))for(let i=0;i<val.length;i++)if(isNode(val[i]))walk(val[i],node,key,i,visit);
    else if(isNode(val))walk(val,node,key,null,visit);
  }
}

function walkFunctionBody(root,visit){
  function rec(node,isRoot=false){
    if(!isNode(node))return;
    if(!isRoot&&isFunction(node))return;
    visit(node);
    for(const [key,val] of Object.entries(node)){
      if(['start','end','loc','range'].includes(key))continue;
      if(Array.isArray(val))for(const x of val)if(isNode(x))rec(x,false);
      else if(isNode(val))rec(val,false);
    }
  }
  rec(root,true);
}

function literal(n,text){
  if(!n)return null;
  if(n.type==='Literal'&&typeof n.value==='string')return n.value;
  if(n.type==='TemplateLiteral'&&n.expressions.length===0)return n.quasis.map(q=>q.value.cooked??q.value.raw).join('');
  return null;
}
function propName(n,text){
  if(!n)return '';
  if(n.type==='Identifier')return n.name;
  const s=literal(n,text);if(s!==null)return s;
  return clean(text.slice(n.start,n.end));
}
function exprName(n,text){
  if(!n)return '';
  if(n.type==='Identifier')return n.name;
  if(n.type==='ThisExpression')return 'this';
  if(n.type==='MemberExpression'||n.type==='OptionalMemberExpression'){
    const base=exprName(n.object,text);
    return n.computed?`${base}[${clean(text.slice(n.property.start,n.property.end))}]`:`${base}.${propName(n.property,text)}`;
  }
  if(n.type==='ChainExpression')return exprName(n.expression,text);
  return clean(text.slice(n.start,n.end)).slice(0,120);
}
function patternName(n,text){
  if(!n)return '';
  if(n.type==='Identifier')return n.name;
  if(n.type==='RestElement')return '...'+patternName(n.argument,text);
  if(n.type==='AssignmentPattern')return patternName(n.left,text)+'='+clean(text.slice(n.right.start,n.right.end));
  return clean(text.slice(n.start,n.end));
}
function contextName(node,parent,parentKey,index,text){
  if(node.type==='FunctionDeclaration'&&node.id?.name)return node.id.name;
  if(node.type==='FunctionExpression'&&node.id?.name)return node.id.name;
  if(parent?.type==='VariableDeclarator'&&parent.init===node)return patternName(parent.id,text);
  if(parent?.type==='AssignmentExpression'&&parent.right===node)return exprName(parent.left,text);
  if(parent?.type==='Property'&&parent.value===node)return propName(parent.key,text);
  if(parent?.type==='MethodDefinition'&&parent.value===node)return propName(parent.key,text);
  if(parent?.type==='CallExpression'&&parentKey==='arguments')return `<callback:${exprName(parent.callee,text)}#${index}>`;
  if(parent?.type==='NewExpression'&&parentKey==='arguments')return `<callback:new ${exprName(parent.callee,text)}#${index}>`;
  if(parent?.type==='ExportDefaultDeclaration')return '<default-export>';
  return `<anonymous@${node.loc.start.line}:${node.loc.start.column}>`;
}
function kindOf(node,parent){
  if(parent?.type==='MethodDefinition')return 'class-method';
  if(parent?.type==='Property'&&parent.method)return 'object-method';
  if(node.type==='FunctionDeclaration')return 'declaration';
  if(node.type==='ArrowFunctionExpression')return 'arrow';
  return 'function-expression';
}
function refs(body){
  const cap=(re,g=1)=>{const a=[];let m;re.lastIndex=0;while((m=re.exec(body)))a.push(m[g]);return uniq(a);};
  return {
    routes:cap(/["'`]((?:\/api\/)[A-Za-z0-9_./:-]+)["'`]/g),
    collections:cap(/\.collection\(\s*["'`]([^"'`]+)["'`]\s*\)/g),
    models:cap(/["'`](@cf\/[A-Za-z0-9_.\-/]+)["'`]/g),
    storageKeys:cap(/(?:localStorage|sessionStorage)\.(?:getItem|setItem|removeItem)\(\s*["'`]([^"'`]+)["'`]/g),
    env:cap(/\benv\.([A-Z][A-Z0-9_]*)\b/g),
    domIds:uniq([...cap(/getElementById\(\s*["'`]([^"'`]+)["'`]\s*\)/g),...cap(/querySelector\(\s*["'`]#([^"'`\s>+~.\[]+)["'`]\s*\)/g)]),
    actions:uniq([...cap(/data-action=["']([^"']+)["']/g),...cap(/data-go=["']([^"']+)["']/g)])
  };
}
function analyze(node,text){
  const calls=[],eventTypes=[];
  walkFunctionBody(node.body,n=>{
    if(n.type==='CallExpression'||n.type==='NewExpression'){
      calls.push(exprName(n.callee,text));
      if(/addEventListener$/.test(exprName(n.callee,text))){const ev=literal(n.arguments?.[0],text);if(ev)eventTypes.push(ev);}
    }
  });
  return {calls:uniq(calls),eventTypes:uniq(eventTypes)};
}

const candidates=(inv.files||[]).filter(f=>JS_EXT.has(path.extname(norm(f.path)).toLowerCase())&&!norm(f.path).startsWith('docs/'));
const functions=[],parsedFiles=[],failures=[];
for(const row of candidates){
  const file=norm(row.path),text=read(file);let parsed;
  try{parsed=parseJs(file,text);}catch(e){failures.push({file,error:e.message,firstError:e.firstError,secondError:e.secondError});continue;}
  let count=0;
  walk(parsed.ast,null,null,null,(node,parent,parentKey,index)=>{
    if(!isFunction(node))return;
    count++;
    const body=text.slice(node.body.start,node.body.end),full=text.slice(node.start,node.end),a=analyze(node,text);
    functions.push({file,line:node.loc.start.line,endLine:node.loc.end.line,column:node.loc.start.column,endColumn:node.loc.end.column,name:contextName(node,parent,parentKey,index,text),kind:kindOf(node,parent),params:(node.params||[]).map(p=>patternName(p,text)).join(', '),calls:a.calls,refs:refs(body),ast:{parser:'acorn',parserVersion:acorn.version||null,sourceType:parsed.sourceType,nodeType:node.type,start:node.start,end:node.end,bodyStart:node.body.start,bodyEnd:node.body.end,functionSha256:sha(full),bodySha256:sha(body),async:Boolean(node.async),generator:Boolean(node.generator),expressionBody:node.body.type!=='BlockStatement',parentType:parent?.type||null,parentKey:parentKey??null,parentIndex:index,eventTypes:a.eventTypes}});
  });
  parsedFiles.push({file,sourceType:parsed.sourceType,functions:count,bytes:Buffer.byteLength(text)});
}
functions.sort((a,b)=>a.file.localeCompare(b.file)||a.ast.start-b.ast.start||a.name.localeCompare(b.name));
functions.forEach((f,i)=>f.id='FUNC-'+String(i+1).padStart(5,'0'));
inv.functions=functions;
inv.counts={...(inv.counts||{}),functions:functions.length,astParsedJsFiles:parsedFiles.length,astParseFailures:failures.length};
inv.astIndex={generatedAt:new Date().toISOString(),parser:'acorn',parserVersion:acorn.version||null,ecmaVersion:'latest',sourceFiles:candidates.length,parsedFiles:parsedFiles.length,parseFailures:failures.length,functions:functions.length,anonymousFunctions:functions.filter(f=>f.name.startsWith('<anonymous@')).length,callbackFunctions:functions.filter(f=>f.name.startsWith('<callback:')).length,files:parsedFiles,failures};
fs.writeFileSync(INV_PATH,JSON.stringify(inv,null,2)+'\n');

const md=['# ÍNDICE AST EXATO DE FUNÇÕES E CALLBACKS','',`Parser: ${code('Acorn '+(acorn.version||''))}. Delimitação por AST; regex não define início/fim de função.`,'',`- Arquivos JS candidatos: **${candidates.length}**`,`- Arquivos parseados: **${parsedFiles.length}**`,`- Falhas de parse: **${failures.length}**`,`- Funções/callbacks: **${functions.length}**`,`- Callbacks por contexto: **${inv.astIndex.callbackFunctions}**`,'','| ID | Nome/contexto | Fonte | Tipo | SHA corpo |','|---|---|---|---|---|'];
for(const f of functions)md.push(`| ${f.id} | ${code(f.name)} | ${code(`${f.file}:${f.line}-${f.endLine}`)} | ${f.kind} | ${code(f.ast.bodySha256)} |`);
if(failures.length){md.push('','## Falhas de parse','');for(const f of failures)md.push(`- ${code(f.file)} — ${clean(f.error)}`);}
fs.writeFileSync(path.join(OUT,'18-AST-FUNCTION-INDEX.md'),md.join('\n')+'\n');
console.log(JSON.stringify({ok:failures.length===0,parser:'acorn',version:acorn.version,files:candidates.length,parsed:parsedFiles.length,parseFailures:failures.length,functions:functions.length,callbacks:inv.astIndex.callbackFunctions},null,2));
if(failures.length)process.exit(1);
