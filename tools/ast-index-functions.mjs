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
const sha=s=>crypto.createHash('sha256').update(String(s)).digest('hex');
const uniq=a=>[...new Set((a||[]).filter(Boolean))];
const clean=s=>String(s??'').replace(/\r?\n/g,' ').replace(/\s+/g,' ').trim();
const code=s=>'`'+String(s??'').replace(/`/g,'\\`')+'`';

function norm(p){return String(p||'').replace(/\\/g,'/');}
function isJsSource(p){
  const n=norm(p);
  return JS_EXT.has(path.extname(n).toLowerCase())&&!n.startsWith('docs/');
}
function read(file){return fs.readFileSync(path.join(ROOT,file),'utf8');}

function parseJs(file,text){
  const ext=path.extname(file).toLowerCase();
  const first=ext==='.mjs'?'module':'script';
  const second=first==='module'?'script':'module';
  const opts=sourceType=>({
    ecmaVersion:'latest',sourceType,locations:true,ranges:true,
    allowHashBang:true,allowAwaitOutsideFunction:true,allowReturnOutsideFunction:true
  });
  try{return {ast:acorn.parse(text,opts(first)),sourceType:first};}
  catch(firstError){
    try{return {ast:acorn.parse(text,opts(second)),sourceType:second};}
    catch(secondError){
      const e=new Error(file+': AST parse failed in '+first+' and '+second+': '+secondError.message);
      e.firstError=firstError.message;e.secondError=secondError.message;throw e;
    }
  }
}

function isNode(v){return v&&typeof v==='object'&&typeof v.type==='string'&&Number.isInteger(v.start)&&Number.isInteger(v.end);}
function walk(node,parent=null,parentKey=null,index=null,visit){
  if(!isNode(node))return;
  visit(node,parent,parentKey,index);
  for(const [key,val] of Object.entries(node)){
    if(['start','end','loc','range'].includes(key))continue;
    if(Array.isArray(val)){
      for(let i=0;i<val.length;i++)if(isNode(val[i]))walk(val[i],node,key,i,visit);
    }else if(isNode(val))walk(val,node,key,null,visit);
  }
}

function walkLocal(node,visit){
  function rec(n,isRoot=false){
    if(!isNode(n))return;
    if(!isRoot&&isFunctionNode(n))return;
    visit(n);
    for(const [key,val] of Object.entries(n)){
      if(['start','end','loc','range'].includes(key))continue;
      if(Array.isArray(val))for(const x of val)if(isNode(x))rec(x,false);
      else if(isNode(val))rec(val,false);
    }
  }
  rec(node,true);
}

function isFunctionNode(n){return ['FunctionDeclaration','FunctionExpression','ArrowFunctionExpression'].includes(n?.type);}
function literalString(n,text){
  if(!n)return null;
  if(n.type==='Literal'&&typeof n.value==='string')return n.value;
  if(n.type==='TemplateLiteral'){
    if(n.expressions.length===0)return n.quasis.map(q=>q.value.cooked??q.value.raw).join('');
    return text.slice(n.start,n.end);
  }
  return null;
}
function propertyName(n,text){
  if(!n)return '';
  if(n.type==='Identifier')return n.name;
  if(n.type==='PrivateIdentifier')return '#'+n.name;
  const s=literalString(n,text);if(s!==null)return s;
  return clean(text.slice(n.start,n.end));
}
function exprName(n,text){
  if(!n)return '';
  if(n.type==='Identifier')return n.name;
  if(n.type==='ThisExpression')return 'this';
  if(n.type==='Super')return 'super';
  if(n.type==='MemberExpression'||n.type==='OptionalMemberExpression'){
    const obj=exprName(n.object,text);
    const prop=n.computed?'['+clean(text.slice(n.property.start,n.property.end))+']':propertyName(n.property,text);
    return obj+(n.computed?prop:'.'+prop);
  }
  if(n.type==='ChainExpression')return exprName(n.expression,text);
  if(n.type==='CallExpression'||n.type==='NewExpression')return exprName(n.callee,text)+'()';
  return clean(text.slice(n.start,n.end)).slice(0,120);
}
function patternName(n,text){
  if(!n)return '';
  if(n.type==='Identifier')return n.name;
  if(n.type==='RestElement')return '...'+patternName(n.argument,text);
  if(n.type==='AssignmentPattern')return patternName(n.left,text)+'='+clean(text.slice(n.right.start,n.right.end));
  return clean(text.slice(n.start,n.end));
}
function functionContext(node,parent,parentKey,index,text){
  if(node.type==='FunctionDeclaration'&&node.id?.name)return node.id.name;
  if(node.type==='FunctionExpression'&&node.id?.name)return node.id.name;
  if(parent?.type==='VariableDeclarator'&&parent.init===node)return patternName(parent.id,text);
  if(parent?.type==='AssignmentExpression'&&parent.right===node)return exprName(parent.left,text);
  if(parent?.type==='Property'&&parent.value===node)return propertyName(parent.key,text);
  if(parent?.type==='MethodDefinition'&&parent.value===node)return propertyName(parent.key,text);
  if(parent?.type==='PropertyDefinition'&&parent.value===node)return propertyName(parent.key,text);
  if(parent?.type==='CallExpression'&&parentKey==='arguments')return '<callback:'+exprName(parent.callee,text)+'#'+String(index)+'>';
  if(parent?.type==='NewExpression'&&parentKey==='arguments')return '<callback:new '+exprName(parent.callee,text)+'#'+String(index)+'>';
  if(parent?.type==='ExportDefaultDeclaration')return '<default-export>';
  return '<anonymous@'+node.loc.start.line+':'+node.loc.start.column+'>';
}
function functionKind(node,parent){
  if(parent?.type==='MethodDefinition')return 'class-method';
  if(parent?.type==='Property'&&parent.method)return 'object-method';
  if(node.type==='FunctionDeclaration')return 'declaration';
  if(node.type==='ArrowFunctionExpression')return 'arrow';
  return 'function-expression';
}
function calleeName(n,text){return exprName(n,text);}

function refs(body){
  const cap=(re,g=1)=>{const a=[];let m;re.lastIndex=0;while((m=re.exec(body)))a.push(m[g]);return uniq(a);};
  return {
    routes:cap(/["'`]((?:\/api\/)[A-Za-z0-9_./:-]+)["'`]/g),
    collections:cap(/\.collection\(\s*["'`]([^"'`]+)["'`]\s*\)/g),
    models:cap(/["'`](@cf\/[A-Za-z0-9_.\-/]+)["'`]/g),
    storageKeys:cap(/(?:localStorage|sessionStorage)\.(?:getItem|setItem|removeItem)\(\s*["'`]([^"'`]+)["'`]/g),
    env:cap(/\benv\.([A-Z][A-Z0-9_]*)\b/g),
    domIds:uniq([
      ...cap(/getElementById\(\s*["'`]([^"'`]+)["'`]\s*\)/g),
      ...cap(/querySelector\(\s*["'`]#([^"'`\s>+~.\[]+)["'`]\s*\)/g)
    ]),
    actions:uniq([
      ...cap(/data-action=["']([^"']+)["']/g),
      ...cap(/data-go=["']([^"']+)["']/g)
    ])
  };
}

function actionishName(n,text){
  const s=exprName(n,text).toLowerCase();
  return /(^|\.|\[)(action|act|cmd|command|go|type|key|dataset\.action|dataset\.go)(\]|$|\.)/.test(s)||/data-action|data-go/.test(s);
}
function analyzeAstFunction(node,text){
  const bodyNode=node.body;
  const directCalls=[];
  const handlerLiterals=[];
  const dispatchSignals=[];
  const stringLiterals=[];
  const sourceSignals=[];
  const eventTypes=[];
  walkLocal(bodyNode,n=>{
    if(n.type==='CallExpression'||n.type==='NewExpression'){
      directCalls.push(calleeName(n.callee,text));
      const cal=calleeName(n.callee,text);
      if(/addEventListener$/.test(cal)){
        const ev=literalString(n.arguments?.[0],text);if(ev)eventTypes.push(ev);
      }
      if(/closest$|matches$|querySelector$|querySelectorAll$|getAttribute$/.test(cal)){
        for(const arg of n.arguments||[]){
          const s=literalString(arg,text);if(s&&(/data-action|data-go/.test(s)))sourceSignals.push(cal+'('+s+')');
        }
      }
    }
    if(n.type==='MemberExpression'){
      const nm=exprName(n,text);
      if(/dataset\.(action|go)$/.test(nm)||/dataset\[(?:'|")?(action|go)/.test(nm))sourceSignals.push(nm);
    }
    if(n.type==='Literal'&&typeof n.value==='string')stringLiterals.push(n.value);
    if(n.type==='TemplateLiteral'){
      const s=literalString(n,text);if(s!==null)stringLiterals.push(s);
    }
    if(n.type==='BinaryExpression'&&['==','===','!=','!=='].includes(n.operator)){
      const l=literalString(n.left,text),r=literalString(n.right,text);
      if(l!==null&&actionishName(n.right,text)){handlerLiterals.push(l);dispatchSignals.push('compare:'+exprName(n.right,text));}
      if(r!==null&&actionishName(n.left,text)){handlerLiterals.push(r);dispatchSignals.push('compare:'+exprName(n.left,text));}
    }
    if(n.type==='SwitchStatement'&&actionishName(n.discriminant,text)){
      dispatchSignals.push('switch:'+exprName(n.discriminant,text));
      for(const c of n.cases||[]){const s=literalString(c.test,text);if(s!==null)handlerLiterals.push(s);}
    }
    if(n.type==='Property'){
      const k=propertyName(n.key,text);
      if(k&&typeof k==='string'&&!/^\d+$/.test(k)&&isFunctionNode(n.value))handlerLiterals.push(k);
    }
  });
  return {
    directCalls:uniq(directCalls),
    handlerLiterals:uniq(handlerLiterals),
    dispatchSignals:uniq(dispatchSignals),
    actionSourceSignals:uniq(sourceSignals),
    eventTypes:uniq(eventTypes),
    stringLiteralCount:uniq(stringLiterals).length
  };
}

const files=(inv.files||[]).filter(f=>isJsSource(f.path));
const functions=[];
const parseReports=[];
const parseFailures=[];
for(const f of files){
  const file=f.path,text=read(file);
  let parsed;
  try{parsed=parseJs(file,text);}
  catch(e){parseFailures.push({file,error:e.message,firstError:e.firstError,secondError:e.secondError});continue;}
  let count=0;
  walk(parsed.ast,null,null,null,(node,parent,parentKey,index)=>{
    if(!isFunctionNode(node))return;
    count++;
    const name=functionContext(node,parent,parentKey,index,text);
    const bodyText=text.slice(node.body.start,node.body.end);
    const functionText=text.slice(node.start,node.end);
    const a=analyzeAstFunction(node,text);
    functions.push({
      file,
      line:node.loc.start.line,
      endLine:node.loc.end.line,
      column:node.loc.start.column,
      endColumn:node.loc.end.column,
      name,
      kind:functionKind(node,parent),
      params:(node.params||[]).map(p=>patternName(p,text)).join(', '),
      calls:a.directCalls,
      refs:refs(bodyText),
      ast:{
        parser:'acorn',ecmaVersion:'latest',sourceType:parsed.sourceType,
        nodeType:node.type,start:node.start,end:node.end,
        bodyStart:node.body.start,bodyEnd:node.body.end,
        async:Boolean(node.async),generator:Boolean(node.generator),expressionBody:node.body.type!=='BlockStatement',
        parentType:parent?.type||null,parentKey:parentKey??null,parentIndex:index,
        functionSha256:sha(functionText),bodySha256:sha(bodyText),
        handlerLiterals:a.handlerLiterals,dispatchSignals:a.dispatchSignals,actionSourceSignals:a.actionSourceSignals,
        eventTypes:a.eventTypes,stringLiteralCount:a.stringLiteralCount
      }
    });
  });
  parseReports.push({file,sourceType:parsed.sourceType,functions:count,bytes:Buffer.byteLength(text)});
}

functions.sort((a,b)=>a.file.localeCompare(b.file)||a.ast.start-b.ast.start||a.name.localeCompare(b.name));
functions.forEach((f,i)=>f.id='FUNC-'+String(i+1).padStart(5,'0'));
inv.functions=functions;
inv.counts={...(inv.counts||{}),functions:functions.length,astParsedJsFiles:parseReports.length,astParseFailures:parseFailures.length};
inv.astIndex={
  generatedAt:new Date().toISOString(),parser:'acorn',parserVersion:acorn.version||null,ecmaVersion:'latest',
  sourceFiles:files.length,parsedFiles:parseReports.length,parseFailures:parseFailures.length,
  functions:functions.length,anonymousFunctions:functions.filter(f=>f.name.startsWith('<')).length,
  callbackFunctions:functions.filter(f=>f.name.startsWith('<callback:')).length,
  files:parseReports,failures:parseFailures
};
fs.writeFileSync(INV_PATH,JSON.stringify(inv,null,2)+'\n');

let md=['# ÍNDICE AST DE FUNÇÕES','','Parser: '+code('Acorn '+(acorn.version||''))+'. Funções e callbacks são delimitados pela árvore sintática, não por balanceamento de texto.','',
  '- Arquivos JS candidatos: **'+files.length+'**',
  '- Arquivos parseados: **'+parseReports.length+'**',
  '- Falhas de parse: **'+parseFailures.length+'**',
  '- Funções/callbacks: **'+functions.length+'**',
  '- Anônimas: **'+inv.astIndex.anonymousFunctions+'**',
  '- Callbacks nomeados por contexto: **'+inv.astIndex.callbackFunctions+'**','',
  '## Funções','','| ID | Nome/contexto | Fonte | Tipo | Parent | Dispatch/ações |','|---|---|---|---|---|---|'];
for(const f of functions){
  const d=uniq([...(f.ast.dispatchSignals||[]),...(f.ast.actionSourceSignals||[]),...(f.ast.handlerLiterals||[])]).slice(0,12).join(', ');
  md.push('| '+f.id+' | '+code(f.name)+' | '+code(f.file+':'+f.line+'-'+f.endLine)+' | '+f.kind+' | '+code(f.ast.parentType||'—')+' | '+clean(d).replace(/\|/g,'\\|')+' |');
}
if(parseFailures.length){
  md.push('','## Falhas de parse','');
  for(const x of parseFailures)md.push('- '+code(x.file)+' — '+clean(x.error));
}
fs.writeFileSync(path.join(OUT,'18-AST-FUNCTION-INDEX.md'),md.join('\n')+'\n');

console.log(JSON.stringify({ok:parseFailures.length===0,parser:'acorn',version:acorn.version,files:files.length,parsed:parseReports.length,parseFailures:parseFailures.length,functions:functions.length,anonymous:inv.astIndex.anonymousFunctions,callbacks:inv.astIndex.callbackFunctions},null,2));
if(parseFailures.length)process.exit(1);
