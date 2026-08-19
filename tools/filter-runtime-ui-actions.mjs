import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'docs','generated');
const INV_PATH=path.join(OUT,'TECHNICAL-INVENTORY.json');
if(!fs.existsSync(INV_PATH))throw new Error('TECHNICAL-INVENTORY.json ausente');
const inv=JSON.parse(fs.readFileSync(INV_PATH,'utf8'));

const UI_EXT=new Set(['.js','.mjs','.cjs','.html']);
const executableUiSource=file=>UI_EXT.has(path.extname(String(file||'')).toLowerCase());
const before=(inv.uiActions||[]).length;
const sourceCountBefore=(inv.uiActions||[]).reduce((n,x)=>n+(x.sources||[]).length,0);
const removedSources=[];
const kept=[];

for(const action of inv.uiActions||[]){
  const sources=[];
  for(const src of action.sources||[]){
    if(executableUiSource(src.file))sources.push(src);
    else removedSources.push({action:action.value,file:src.file,line:src.line,kind:src.kind||null});
  }
  if(sources.length)kept.push({...action,sources});
}

kept.sort((a,b)=>String(a.value).localeCompare(String(b.value)));
kept.forEach((x,i)=>x.id='UI-'+String(i+1).padStart(5,'0'));
inv.uiActions=kept;
inv.counts={...(inv.counts||{}),uiActions:kept.length,uiActionExecutableSources:kept.reduce((n,x)=>n+x.sources.length,0),uiActionNonExecutableSourcesRemoved:removedSources.length};
inv.uiActionSourceFilter={
  generatedAt:new Date().toISOString(),
  mode:'executable-ui-sources-only',
  allowedExtensions:[...UI_EXT],
  actionsBefore:before,
  actionsAfter:kept.length,
  sourcesBefore:sourceCountBefore,
  sourcesAfter:kept.reduce((n,x)=>n+x.sources.length,0),
  removedSources
};
fs.writeFileSync(INV_PATH,JSON.stringify(inv,null,2)+'\n');

let md='# FILTRO DE FONTES DAS AÇÕES DE UI\n\n';
md+='Somente `.js`, `.mjs`, `.cjs` e `.html` podem criar ações executáveis. CSS pode selecionar `[data-action]`, mas isso não cria uma interação.\n\n';
md+='- Ações antes: **'+before+'**\n';
md+='- Ações depois: **'+kept.length+'**\n';
md+='- Fontes não executáveis removidas: **'+removedSources.length+'**\n\n';
md+='## Fontes removidas\n\n';
if(!removedSources.length)md+='Nenhuma.\n';
for(const x of removedSources)md+='- `'+x.action.replace(/`/g,'\\`')+'` — `'+x.file+':'+x.line+'`\n';
fs.writeFileSync(path.join(OUT,'20-UI-SOURCE-FILTER.md'),md);
console.log(JSON.stringify({ok:true,actionsBefore:before,actionsAfter:kept.length,removedSources:removedSources.length},null,2));
