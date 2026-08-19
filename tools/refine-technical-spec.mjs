import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'docs','generated');
const INV=path.join(OUT,'TECHNICAL-INVENTORY.json');
const NON_FUNCTION=new Set(['if','for','while','switch','catch','with','return','throw','else','do','try','finally']);

if(!fs.existsSync(INV))throw new Error('TECHNICAL-INVENTORY.json ausente');
const inv=JSON.parse(fs.readFileSync(INV,'utf8'));
const before=(inv.functions||[]).length;
inv.functions=(inv.functions||[]).filter(f=>!NON_FUNCTION.has(String(f.name||'')));
inv.functions.sort((a,b)=>a.file.localeCompare(b.file)||a.line-b.line);
inv.functions.forEach((f,i)=>f.id=`FUNC-${String(i+1).padStart(5,'0')}`);
inv.counts.functions=inv.functions.length;
inv.refinement={removedControlFlowFalsePositives:before-inv.functions.length,nonFunctionTokens:[...NON_FUNCTION]};
fs.writeFileSync(INV,JSON.stringify(inv,null,2)+'\n');

function esc(s){return String(s??'').replace(/\|/g,'\\|').replace(/\r?\n/g,' ');}
function srcs(a){return (a||[]).map(x=>`\`${x.file}:${x.line}\``).join(', ');}
function header(title,desc){return `# ${title}\n\n${desc}\n\nGerado em: \`${inv.generatedAt}\`\n\n`;}

let md=header('INVENTÁRIO TÉCNICO — NARUTO SHINOBI NO SHO','Inventário gerado diretamente do código do repositório e refinado para excluir palavras de controle que não são funções. É evidência estática, não substitui teste de execução.');
md+='## Totais\n\n| Item | Total |\n|---|---:|\n';
for(const [k,v] of Object.entries(inv.counts||{}))md+=`| ${k} | ${v} |\n`;
md+=`\n- Falsos positivos de controle removidos: **${before-inv.functions.length}**\n`;
md+='\n`STATICALLY_TRACED` significa que o elemento foi localizado no código e ligado a arquivo/linha. Não significa execução em navegador, Worker ou banco.\n';
fs.writeFileSync(path.join(OUT,'00-INVENTORY-SUMMARY.md'),md);

md=header('FUNÇÕES E MÉTODOS','Cada entrada foi localizada mecanicamente e refinada para remover construções de controle. As referências listadas são observáveis no corpo localizado; não se atribui efeito que a fonte não sustente.');
for(const f of inv.functions){
  md+=`## ${f.id} — \`${f.name}\`\n\n- **Fonte:** \`${f.file}:${f.line}\`\n- **Forma:** ${f.kind}\n- **Parâmetros:** \`${esc(f.params)||'(nenhum explícito)'}\`\n- **Chamadas internas detectadas:** ${(f.calls||[]).length?f.calls.map(x=>`\`${x}\``).join(', '):'nenhuma identificada estaticamente'}\n- **Rotas referidas:** ${(f.refs?.routes||[]).length?f.refs.routes.map(x=>`\`${x}\``).join(', '):'—'}\n- **Coleções MongoDB:** ${(f.refs?.collections||[]).length?f.refs.collections.map(x=>`\`${x}\``).join(', '):'—'}\n- **Modelos IA:** ${(f.refs?.models||[]).length?f.refs.models.map(x=>`\`${x}\``).join(', '):'—'}\n- **DOM IDs:** ${(f.refs?.domIds||[]).length?f.refs.domIds.map(x=>`\`${x}\``).join(', '):'—'}\n- **Storage keys:** ${(f.refs?.storageKeys||[]).length?f.refs.storageKeys.map(x=>`\`${x}\``).join(', '):'—'}\n- **Env:** ${(f.refs?.env||[]).length?f.refs.env.map(x=>`\`${x}\``).join(', '):'—'}\n- **Ações UI literais:** ${(f.refs?.actions||[]).length?f.refs.actions.map(x=>`\`${x}\``).join(', '):'—'}\n- **Status:** \`STATICALLY_TRACED\`\n\n`;
}
fs.writeFileSync(path.join(OUT,'01-FUNCTIONS.md'),md);

md=header('RASTREABILIDADE GERADA','Cada item aponta para evidência de código.');
md+='| ID | Tipo | Elemento | Evidência | Status |\n|---|---|---|---|---|\n';
for(const f of inv.functions)md+=`| ${f.id} | função | \`${f.name}\` | \`${f.file}:${f.line}\` | STATICALLY_TRACED |\n`;
for(const r of inv.routes||[])md+=`| ${r.id} | API | \`${r.route}\` | ${srcs(r.sources)} | STATICALLY_TRACED |\n`;
for(const a of inv.models||[])md+=`| ${a.id} | IA | \`${a.model}\` | ${srcs(a.sources)} | STATICALLY_TRACED |\n`;
for(const c of inv.collections||[])md+=`| ${c.id} | persistência | \`${c.name}\` | ${srcs(c.sources)} | STATICALLY_TRACED |\n`;
for(const a of inv.uiActions||[])md+=`| ${a.id} | UI | \`${a.value}\` | ${srcs(a.sources)} | STATICALLY_TRACED |\n`;
fs.writeFileSync(path.join(OUT,'08-TRACEABILITY.md'),md);

console.log(JSON.stringify({ok:true,functionsBefore:before,functionsAfter:inv.functions.length,removed:before-inv.functions.length},null,2));
