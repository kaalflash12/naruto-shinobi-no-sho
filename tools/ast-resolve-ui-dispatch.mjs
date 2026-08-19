import fs from 'node:fs';
import path from 'node:path';
import * as acorn from 'acorn';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'docs','generated');
const INV_PATH=path.join(OUT,'TECHNICAL-INVENTORY.json');
if(!fs.existsSync(INV_PATH))throw new Error('TECHNICAL-INVENTORY.json ausente');
const inv=JSON.parse(fs.readFileSync(INV_PATH,'utf8'));
if(inv.astIndex?.parser!=='acorn'||Number(inv.astIndex?.parseFailures)!==0)throw new Error('AST Acorn válido obrigatório');
if(inv.uiActionSourceFilter?.mode!=='executable-ui-sources-only')throw new Error('Filtro executable-ui-sources-only obrigatório');

const JS_EXT=new Set(['.js','.mjs','.cjs']);
const cache=new Map();
const parsed=new Map();
const clean=s=>String(s??'').replace(/\r?\n/g,' ').replace(/\s+/g,' ').trim();
const code=s=>'`'+String(s??'').replace(/`/g,'\\`')+'`';
const uniq=a=>[...new Set((a||[]).filter(Boolean))];
const norm=p=>String(p||'').replace(/\\/g,'/');
const isJs=p=>JS_EXT.has(path.extname(norm(p)).toLowerCase());
const isNode=v=>v&&typeof v==='object'&&typeof v.type==='string'&&Number.isInteger(v.start)&&Number.isInteger(v.end);
const isFn=n=>['FunctionDeclaration','FunctionExpression','ArrowFunctionExpression'].includes(n?.type);
function read(file){if(cache.has(file))return cache.get(file);const t=fs.readFileSync(path.join(ROOT,file),'utf8');cache.set(file,t);return t;}
function parse(file){
  if(parsed.has(file))return parsed.get(file);
  const text=read(file),ext=path.extname(file).toLowerCase();
  const order=ext==='.mjs'?['module','script']:['script','module'];
  let last;
  for(const sourceType of order){try{const ast=acorn.parse(text,{ecmaVersion:'latest',sourceType,locations:true,ranges:true,allowHashBang:true,allowAwaitOutsideFunction:true,allowReturnOutsideFunction:true});const r={ast,text,sourceType};parsed.set(file,r);return r;}catch(e){last=e;}}
  throw new Error(file+': '+last.message);
}
function walk(node,visit,{skipNestedFunctions=false,root=null}={}){
  if(!isNode(node))return;
  const rec=(n,parent=null,key=null,index=null)=>{
    if(!isNode(n))return;
    if(skipNestedFunctions&&n!==root&&isFn(n))return;
    visit(n,parent,key,index);
    for(const [k,v] of Object.entries(n)){
      if(['start','end','loc','range'].includes(k))continue;
      if(Array.isArray(v)){for(let i=0;i<v.length;i++)if(isNode(v[i]))rec(v[i],n,k,i);}
      else if(isNode(v))rec(v,n,k,null);
    }
  };
  rec(node);
}
function lit(n,text){
  if(!n)return null;
  if(n.type==='Literal'&&typeof n.value==='string')return n.value;
  if(n.type==='TemplateLiteral'&&n.expressions.length===0)return n.quasis.map(q=>q.value.cooked??q.value.raw).join('');
  return null;
}
function prop(n,text){if(!n)return '';if(n.type==='Identifier'||n.type==='PrivateIdentifier')return n.name;const s=lit(n,text);if(s!==null)return s;return clean(text.slice(n.start,n.end));}
function exprName(n,text){
  if(!n)return '';
  if(n.type==='ChainExpression')return exprName(n.expression,text);
  if(n.type==='Identifier')return n.name;
  if(n.type==='ThisExpression')return 'this';
  if(n.type==='MemberExpression'){
    const o=exprName(n.object,text),p=n.computed?'['+clean(text.slice(n.property.start,n.property.end))+']':'.'+prop(n.property,text);
    return o+p;
  }
  return clean(text.slice(n.start,n.end)).slice(0,160);
}
function memberProp(n,text){
  if(n?.type==='ChainExpression')return memberProp(n.expression,text);
  if(n?.type!=='MemberExpression')return '';
  return n.computed?(lit(n.property,text)??prop(n.property,text)):prop(n.property,text);
}
function unwrap(n){return n?.type==='ChainExpression'?unwrap(n.expression):n;}
function isActionMember(n,text){
  n=unwrap(n);if(n?.type!=='MemberExpression')return false;
  const p=memberProp(n,text);if(!['action','go'].includes(p))return false;
  const o=unwrap(n.object);if(o?.type==='MemberExpression')return memberProp(o,text)==='dataset';
  return /\.dataset$/.test(exprName(o,text));
}
function isGetAttrAction(n,text){
  n=unwrap(n);if(n?.type!=='CallExpression')return false;
  const cal=unwrap(n.callee);if(cal?.type!=='MemberExpression'||memberProp(cal,text)!=='getAttribute')return false;
  const a=lit(n.arguments?.[0],text);return a==='data-action'||a==='data-go';
}
function arrayStrings(n,text){
  n=unwrap(n);if(n?.type!=='ArrayExpression')return null;
  const vals=[];for(const e of n.elements||[]){const s=lit(e,text);if(s===null)return null;vals.push(s);}return vals;
}
function objectKeys(n,text){
  n=unwrap(n);if(n?.type!=='ObjectExpression')return null;
  const vals=[];for(const p of n.properties||[]){if(p.type!=='Property'&&p.type!=='MethodDefinition')continue;const k=p.computed?lit(p.key,text):prop(p.key,text);if(k===null||k==='')continue;vals.push(k);}return vals;
}
function simpleRegexPrefix(n){
  n=unwrap(n);if(n?.type!=='Literal'||!n.regex?.pattern)return null;
  const p=n.regex.pattern;
  const m=p.match(/^\^([A-Za-z0-9_-]+)(?:\.|\[|\(|\$|$)/);return m?m[1]:null;
}
function functionNodeMap(ast){const m=new Map();walk(ast,n=>{if(isFn(n))m.set(n.start+':'+n.end,n);});return m;}

const funcs=(inv.functions||[]).filter(f=>isJs(f.file));
const nodeByFunction=new Map();
for(const file of uniq(funcs.map(f=>f.file))){
  const p=parse(file),map=functionNodeMap(p.ast);
  for(const f of funcs.filter(x=>x.file===file)){const n=map.get(f.ast.start+':'+f.ast.end);if(!n)throw new Error('Nó AST não reencontrado: '+f.id+' '+file+':'+f.line);nodeByFunction.set(f.id,n);}
}

const byName=new Map();
for(const f of funcs){if(!f.name.startsWith('<')){if(!byName.has(f.name))byName.set(f.name,[]);byName.get(f.name).push(f);}}

const analysis=new Map();
function baseAnalysis(f){
  const {text}=parse(f.file),fn=nodeByFunction.get(f.id);const aliases=new Set();const aliasEvidence=[];const tableDefs=new Map();const setDefs=new Map();const calls=[];
  const body=fn.body;
  walk(body,(n,parent,key,index)=>{
    if(n.type==='VariableDeclarator'){
      if(n.id?.type==='Identifier'&&(isActionMember(n.init,text)||isGetAttrAction(n.init,text))){aliases.add(n.id.name);aliasEvidence.push('source:'+n.id.name);}
      if(n.id?.type==='ObjectPattern'){
        const src=unwrap(n.init);const dataset=src?.type==='MemberExpression'&&memberProp(src,text)==='dataset';
        if(dataset)for(const p of n.id.properties||[]){const k=prop(p.key,text);if(['action','go'].includes(k)){const name=p.value?.name||p.key?.name;if(name){aliases.add(name);aliasEvidence.push('destructure:'+name);}}}
      }
      if(n.id?.type==='Identifier'){
        const vals=arrayStrings(n.init,text);if(vals)setDefs.set(n.id.name,vals);
        const keys=objectKeys(n.init,text);if(keys)tableDefs.set(n.id.name,keys);
      }
    }
    if(n.type==='AssignmentExpression'&&n.left?.type==='Identifier'&&(isActionMember(n.right,text)||isGetAttrAction(n.right,text))){aliases.add(n.left.name);aliasEvidence.push('assign-source:'+n.left.name);}
    if(n.type==='CallExpression')calls.push(n);
  },{skipNestedFunctions:true,root:body});
  return {f,fn,text,aliases,aliasEvidence,forcedParamAliases:new Set(),tableDefs,setDefs,calls,exact:new Map(),prefix:new Map(),suffix:new Map(),substring:new Map(),regexPrefix:new Map(),table:new Map(),evidence:[]};
}
for(const f of funcs)analysis.set(f.id,baseAnalysis(f));

function exprUsesAlias(n,a,text){
  n=unwrap(n);if(!n)return false;
  if(n.type==='Identifier')return a.aliases.has(n.name)||a.forcedParamAliases.has(n.name);
  if(n.type==='LogicalExpression'||n.type==='BinaryExpression')return exprUsesAlias(n.left,a,text)||exprUsesAlias(n.right,a,text);
  if(n.type==='ConditionalExpression')return exprUsesAlias(n.consequent,a,text)||exprUsesAlias(n.alternate,a,text)||exprUsesAlias(n.test,a,text);
  if(n.type==='AssignmentExpression')return exprUsesAlias(n.right,a,text);
  return isActionMember(n,text)||isGetAttrAction(n,text);
}
function markParamAlias(target,index,reason){
  const ta=analysis.get(target.id),node=nodeByFunction.get(target.id),p=node.params?.[index];if(!ta||!p)return false;
  if(p.type==='Identifier'&&!ta.forcedParamAliases.has(p.name)){ta.forcedParamAliases.add(p.name);ta.aliasEvidence.push('param:'+p.name+' <= '+reason);return true;}return false;
}

let changed=true,round=0;
while(changed&&round<12){changed=false;round++;
  for(const a of analysis.values()){
    for(const call of a.calls){
      const cal=unwrap(call.callee);if(cal?.type!=='Identifier')continue;
      const targets=byName.get(cal.name)||[];if(targets.length!==1)continue;
      call.arguments?.forEach((arg,i)=>{if(exprUsesAlias(arg,a,a.text))if(markParamAlias(targets[0],i,a.f.id+'→'+cal.name))changed=true;});
    }
  }
}

function add(map,key,e){if(key===null||key===undefined||key==='')return;if(!map.has(key))map.set(key,[]);map.get(key).push(e);}
function analyzeHandlers(a){
  const {fn,text}=a;const body=fn.body;
  const aliases=new Set([...a.aliases,...a.forcedParamAliases]);
  const uses=n=>exprUsesAlias(n,a,text);
  walk(body,(n,parent,key,index)=>{
    if(n.type==='VariableDeclarator'&&n.id?.type==='Identifier'&&uses(n.init)){aliases.add(n.id.name);a.aliases.add(n.id.name);a.aliasEvidence.push('propagate:'+n.id.name);}
    if(n.type==='AssignmentExpression'&&n.left?.type==='Identifier'&&uses(n.right)){aliases.add(n.left.name);a.aliases.add(n.left.name);a.aliasEvidence.push('propagate-assign:'+n.left.name);}
    if(n.type==='BinaryExpression'&&['==','===','!=','!=='].includes(n.operator)){
      const l=lit(n.left,text),r=lit(n.right,text);if(l!==null&&uses(n.right))add(a.exact,l,'compare@'+n.loc.start.line);if(r!==null&&uses(n.left))add(a.exact,r,'compare@'+n.loc.start.line);
    }
    if(n.type==='SwitchStatement'&&uses(n.discriminant))for(const c of n.cases||[]){const s=lit(c.test,text);if(s!==null)add(a.exact,s,'switch@'+c.loc.start.line);}
    if(n.type==='CallExpression'){
      const cal=unwrap(n.callee);
      if(cal?.type==='MemberExpression'){
        const method=memberProp(cal,text),obj=unwrap(cal.object);
        if(['startsWith','endsWith','includes'].includes(method)&&uses(obj)){
          const s=lit(n.arguments?.[0],text);if(s!==null){if(method==='startsWith')add(a.prefix,s,method+'@'+n.loc.start.line);else if(method==='endsWith')add(a.suffix,s,method+'@'+n.loc.start.line);else add(a.substring,s,method+'@'+n.loc.start.line);}
        }
        if(method==='includes'&&uses(n.arguments?.[0])){
          const vals=arrayStrings(obj,text)||(obj?.type==='Identifier'?a.setDefs.get(obj.name):null);if(vals)for(const s of vals)add(a.exact,s,'includes-set@'+n.loc.start.line);
        }
        if(method==='has'&&uses(n.arguments?.[0])&&obj?.type==='Identifier'){
          const vals=a.setDefs.get(obj.name);if(vals)for(const s of vals)add(a.exact,s,'set.has@'+n.loc.start.line);
        }
        if(method==='test'&&uses(n.arguments?.[0])){
          const p=simpleRegexPrefix(obj);if(p)add(a.regexPrefix,p,'regex@'+n.loc.start.line);
        }
      }
    }
    if(n.type==='MemberExpression'&&n.computed&&uses(n.property)&&n.object?.type==='Identifier'){
      const keys=a.tableDefs.get(n.object.name);if(keys)for(const s of keys)add(a.table,s,'table:'+n.object.name+'@'+n.loc.start.line);
    }
  },{skipNestedFunctions:true,root:body});
  a.evidence=uniq([...a.aliasEvidence,...[...a.exact.entries()].flatMap(([k,v])=>v.map(x=>'exact:'+k+':'+x)),...[...a.prefix.entries()].flatMap(([k,v])=>v.map(x=>'prefix:'+k+':'+x)),...[...a.table.entries()].flatMap(([k,v])=>v.map(x=>'table:'+k+':'+x))]);
}
for(const a of analysis.values())analyzeHandlers(a);

const actionRows=[];
for(const ui of inv.uiActions||[]){
  const value=ui.value,dynamic=/\$\{[^}]+\}/.test(value);const exact=[],prefix=[],suffix=[],substring=[],regexPrefix=[],table=[],sourceDispatchers=[];
  for(const a of analysis.values()){
    if(a.aliases.size||a.forcedParamAliases.size)sourceDispatchers.push(a.f.id);
    if(a.exact.has(value))exact.push({functionId:a.f.id,evidence:a.exact.get(value)});
    if(a.table.has(value))table.push({functionId:a.f.id,evidence:a.table.get(value)});
    for(const [p,e] of a.prefix)if(value.startsWith(p))prefix.push({functionId:a.f.id,pattern:p,evidence:e});
    for(const [p,e] of a.regexPrefix)if(value.startsWith(p))regexPrefix.push({functionId:a.f.id,pattern:p,evidence:e});
    for(const [p,e] of a.suffix)if(value.endsWith(p))suffix.push({functionId:a.f.id,pattern:p,evidence:e});
    for(const [p,e] of a.substring)if(value.includes(p))substring.push({functionId:a.f.id,pattern:p,evidence:e});
  }
  let status='NO_AST_HANDLER';let handlerType=null;let handlers=[];
  if(dynamic){status='DYNAMIC_ACTION_TEMPLATE';}
  else if(exact.length){status='AST_EXACT_HANDLER';handlerType='exact';handlers=exact;}
  else if(table.length){status='AST_DISPATCH_TABLE_HANDLER';handlerType='table';handlers=table;}
  else if(prefix.length||regexPrefix.length){status='AST_PREFIX_HANDLER';handlerType='prefix';handlers=[...prefix,...regexPrefix];}
  else if(suffix.length){status='AST_SUFFIX_HANDLER';handlerType='suffix';handlers=suffix;}
  else if(substring.length){status='AST_SUBSTRING_HANDLER';handlerType='substring';handlers=substring;}
  actionRows.push({id:ui.id,action:value,sources:ui.sources,dynamicTemplate:dynamic,status,handlerType,handlers,handlerFunctionIds:uniq(handlers.map(x=>x.functionId)),genericActionSourceFunctions:uniq(sourceDispatchers)});
}

const unresolved=actionRows.filter(x=>!x.dynamicTemplate&&!x.handlerFunctionIds.length);
const resolved=actionRows.filter(x=>!x.dynamicTemplate&&x.handlerFunctionIds.length);
inv.uiDispatchResolution={
  generatedAt:new Date().toISOString(),version:'ast-dispatch-v3',aliasPropagationRounds:round,
  total:actionRows.length,dynamicTemplates:actionRows.filter(x=>x.dynamicTemplate).length,concrete:actionRows.filter(x=>!x.dynamicTemplate).length,
  resolved:resolved.length,unresolved:unresolved.length,
  exact:actionRows.filter(x=>x.status==='AST_EXACT_HANDLER').length,
  table:actionRows.filter(x=>x.status==='AST_DISPATCH_TABLE_HANDLER').length,
  prefix:actionRows.filter(x=>x.status==='AST_PREFIX_HANDLER').length,
  suffix:actionRows.filter(x=>x.status==='AST_SUFFIX_HANDLER').length,
  substring:actionRows.filter(x=>x.status==='AST_SUBSTRING_HANDLER').length
};
inv.uiDispatchers=[...analysis.values()].filter(a=>a.aliases.size||a.forcedParamAliases.size).map(a=>({functionId:a.f.id,name:a.f.name,file:a.f.file,line:a.f.line,aliases:uniq([...a.aliases,...a.forcedParamAliases]),evidence:a.evidence,exact:[...a.exact.keys()],prefix:[...a.prefix.keys()],regexPrefix:[...a.regexPrefix.keys()],suffix:[...a.suffix.keys()],substring:[...a.substring.keys()],table:[...a.table.keys()]}));
inv.uiActionResolvedCrosswalk=actionRows;
inv.enrichment={...(inv.enrichment||{}),uiResolverVersion:'ast-dispatch-v3',uiDispatchResolution:inv.uiDispatchResolution};
fs.writeFileSync(INV_PATH,JSON.stringify(inv,null,2)+'\n');

function refs(a){return (a||[]).map(x=>code(x.file+':'+x.line)).join(', ')||'—';}
function hlist(a){return a?.length?a.map(x=>code(x.functionId)+(x.pattern?' ['+x.pattern+']':'')).join(', '):'—';}
let md='# RESOLUÇÃO AST DOS DISPATCHERS DE UI\n\n';
md+='Versão: `ast-dispatch-v3`. O resolvedor rastreia `dataset.action/go`, `getAttribute`, aliases locais, propagação para parâmetros, `switch`, comparações, `startsWith`, regex de prefixo, arrays/sets e tabelas `handlers[action]`.\n\n';
md+='- Ações: **'+actionRows.length+'**\n- Templates dinâmicos: **'+inv.uiDispatchResolution.dynamicTemplates+'**\n- Concretas: **'+inv.uiDispatchResolution.concrete+'**\n- Resolvidas: **'+resolved.length+'**\n- Não resolvidas: **'+unresolved.length+'**\n\n';
md+='| UI | Ação | Status | Handler(s) | Fonte UI |\n|---|---|---|---|---|\n';
for(const x of actionRows)md+='| '+x.id+' | '+code(x.action)+' | '+x.status+' | '+hlist(x.handlers)+' | '+refs(x.sources)+' |\n';
fs.writeFileSync(path.join(OUT,'21-UI-DISPATCH-RESOLUTION.md'),md);

md='# DISPATCHERS DE UI DETECTADOS POR AST\n\n';
for(const d of inv.uiDispatchers){
  md+='## '+d.functionId+' — '+code(d.name)+'\n\n';
  md+='- Fonte: '+code(d.file+':'+d.line)+'\n';
  md+='- Aliases de ação: '+(d.aliases.length?d.aliases.map(code).join(', '):'—')+'\n';
  md+='- Exatos: '+(d.exact.length?d.exact.map(code).join(', '):'—')+'\n';
  md+='- Prefixos: '+([...d.prefix,...d.regexPrefix].length?[...d.prefix,...d.regexPrefix].map(code).join(', '):'—')+'\n';
  md+='- Tabela: '+(d.table.length?d.table.map(code).join(', '):'—')+'\n';
  md+='- Evidências: '+(d.evidence.length?d.evidence.slice(0,80).map(code).join(', '):'—')+'\n\n';
}
fs.writeFileSync(path.join(OUT,'22-UI-DISPATCHERS.md'),md);

md='# AÇÕES DE UI AINDA SEM HANDLER AST\n\n';
if(!unresolved.length)md+='Nenhuma ação concreta permaneceu sem resolução AST.\n';
for(const x of unresolved)md+='- **'+x.id+'** '+code(x.action)+' — fontes '+refs(x.sources)+'\n';
fs.writeFileSync(path.join(OUT,'23-UNRESOLVED-UI-ACTIONS-AST.md'),md);

console.log(JSON.stringify({ok:true,resolution:inv.uiDispatchResolution,unresolved:unresolved.map(x=>({id:x.id,action:x.action,sources:x.sources}))},null,2));
