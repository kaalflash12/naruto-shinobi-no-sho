import fs from 'node:fs';
import path from 'node:path';
import * as acorn from 'acorn';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'docs','generated');
const INV_PATH=path.join(OUT,'TECHNICAL-INVENTORY.json');
if(!fs.existsSync(INV_PATH))throw new Error('TECHNICAL-INVENTORY.json ausente');
const inv=JSON.parse(fs.readFileSync(INV_PATH,'utf8'));
if(inv.astIndex?.parser!=='acorn'||Number(inv.astIndex?.parseFailures)!==0)throw new Error('AST Acorn válido obrigatório');
if(inv.uiDispatchResolution?.version!=='ast-dispatch-v3')throw new Error('Execute ast-resolve-ui-dispatch.mjs antes do resolvedor de seletores');

const isNode=v=>v&&typeof v==='object'&&typeof v.type==='string'&&Number.isInteger(v.start)&&Number.isInteger(v.end);
const norm=p=>String(p||'').replace(/\\/g,'/');
const uniq=a=>[...new Set((a||[]).filter(Boolean))];
const clean=s=>String(s??'').replace(/\r?\n/g,' ').replace(/\s+/g,' ').trim();
const q=s=>'`'+String(s??'').replace(/`/g,'\\`')+'`';
function walk(node,visit){if(!isNode(node))return;visit(node);for(const [k,v] of Object.entries(node)){if(['start','end','loc','range'].includes(k))continue;if(Array.isArray(v)){for(const x of v)if(isNode(x))walk(x,visit);}else if(isNode(v))walk(v,visit);}}
function unwrap(n){return n?.type==='ChainExpression'?unwrap(n.expression):n;}
function lit(n){n=unwrap(n);if(!n)return null;if(n.type==='Literal'&&typeof n.value==='string')return n.value;if(n.type==='TemplateLiteral'&&n.expressions.length===0)return n.quasis.map(q=>q.value.cooked??q.value.raw).join('');return null;}
function memberMethod(n){n=unwrap(n);if(n?.type!=='MemberExpression')return '';if(n.computed)return lit(n.property)||'';return n.property?.name||'';}
function parse(file){const text=fs.readFileSync(path.join(ROOT,file),'utf8');const ext=path.extname(file).toLowerCase();let last;for(const sourceType of (ext==='.mjs'?['module','script']:['script','module'])){try{return {text,ast:acorn.parse(text,{ecmaVersion:'latest',sourceType,locations:true,ranges:true,allowHashBang:true,allowAwaitOutsideFunction:true,allowReturnOutsideFunction:true})};}catch(e){last=e;}}throw new Error(file+': '+last.message);}
function selectorActions(selector){const out=[];const re=/\[\s*data-(action|go)\s*=\s*(["'])(.*?)\2\s*\]/g;let m;while((m=re.exec(String(selector))))if(m[3])out.push(m[3]);return uniq(out);}

const functions=(inv.functions||[]).filter(f=>f.ast&&f.file);
const byFile=new Map();for(const f of functions){const file=norm(f.file);if(!byFile.has(file))byFile.set(file,[]);byFile.get(file).push(f);}for(const arr of byFile.values())arr.sort((a,b)=>(a.ast.end-a.ast.start)-(b.ast.end-b.ast.start));
const actionRows=inv.uiActionResolvedCrosswalk||[];
const rowByAction=new Map();for(const row of actionRows){if(!rowByAction.has(row.action))rowByAction.set(row.action,[]);rowByAction.get(row.action).push(row);}
const selectorEvidence=[];const methods=new Set(['closest','matches','querySelector','querySelectorAll']);

for(const [file,fileFunctions] of byFile){const {ast}=parse(file);walk(ast,n=>{if(n.type!=='CallExpression'&&n.type!=='NewExpression')return;const method=memberMethod(n.callee);if(!methods.has(method))return;const selector=lit(n.arguments?.[0]);if(selector===null)return;const actions=selectorActions(selector);if(!actions.length)return;const owner=fileFunctions.find(f=>Number(f.ast.start)<=n.start&&Number(f.ast.end)>=n.end)||null;for(const action of actions){for(const row of rowByAction.get(action)||[]){const evidence=`selector:${method}@${n.loc.start.line}:${clean(selector)}`;const handler={functionId:owner?.id||null,file,line:n.loc.start.line,method,selector,evidence:[evidence]};row.handlers=Array.isArray(row.handlers)?row.handlers:[];if(!row.handlers.some(h=>h.functionId===handler.functionId&&h.file===file&&h.line===n.loc.start.line))row.handlers.push(handler);if(owner){row.handlerFunctionIds=uniq([...(row.handlerFunctionIds||[]),owner.id]);if(!row.dynamicTemplate){row.status='AST_SELECTOR_HANDLER';row.handlerType='selector';}}selectorEvidence.push({action,file,line:n.loc.start.line,functionId:owner?.id||null,method,selector});}}});}

const concrete=actionRows.filter(x=>!x.dynamicTemplate),unresolved=concrete.filter(x=>!(x.handlerFunctionIds||[]).length),resolved=concrete.filter(x=>(x.handlerFunctionIds||[]).length);
inv.uiDispatchResolution={...(inv.uiDispatchResolution||{}),version:'ast-dispatch-v3',resolved:resolved.length,unresolved:unresolved.length,selector:actionRows.filter(x=>x.status==='AST_SELECTOR_HANDLER').length,selectorEvidence:selectorEvidence.length};
inv.uiSelectorResolution={version:'ast-selector-v1',generatedAt:new Date().toISOString(),selectorEvidence:selectorEvidence.length,resolved:resolved.length,concrete:concrete.length,unresolved:unresolved.length};
inv.enrichment={...(inv.enrichment||{}),uiResolverVersion:'ast-dispatch-v3',uiSelectorResolverVersion:'ast-selector-v1',uiDispatchResolution:inv.uiDispatchResolution};
inv.uiActionResolvedCrosswalk=actionRows;inv.uiSelectorHandlerEvidence=selectorEvidence;
fs.writeFileSync(INV_PATH,JSON.stringify(inv,null,2)+'\n');
let md='# HANDLERS DE UI POR SELETOR — AST\n\n';md+='Camada adicional: `ast-selector-v1` sobre `ast-dispatch-v3`. `closest`, `matches`, `querySelector` e `querySelectorAll` só contam quando o AST encontra seletor literal e função/callback proprietária.\n\n';md+=`- Evidências de seletor: **${selectorEvidence.length}**\n- Concretas resolvidas: **${resolved.length}/${concrete.length}**\n- Não resolvidas: **${unresolved.length}**\n\n`;md+='| Ação | Função AST | Fonte | Método | Seletor |\n|---|---|---|---|---|\n';for(const x of selectorEvidence)md+=`| ${q(x.action)} | ${q(x.functionId||'SEM_FUNCAO')} | ${q(x.file+':'+x.line)} | ${q(x.method)} | ${q(x.selector)} |\n`;if(unresolved.length){md+='\n## Ainda não resolvidas\n\n';for(const x of unresolved)md+=`- ${x.id} ${q(x.action)}\n`;}fs.writeFileSync(path.join(OUT,'24-UI-SELECTOR-HANDLERS.md'),md);
console.log(JSON.stringify({ok:true,baseVersion:'ast-dispatch-v3',selectorVersion:'ast-selector-v1',selectorEvidence:selectorEvidence.length,resolved:resolved.length,concrete:concrete.length,unresolved:unresolved.map(x=>({id:x.id,action:x.action}))},null,2));
