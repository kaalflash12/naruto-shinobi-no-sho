import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'docs', 'generated');
const REPORT_PATH = path.join(OUT, 'FINAL-CANONICAL-AUDIT.json');
const FINAL_PATH = path.join(OUT, 'NARUTO_SHINOBI_NO_SHO_ESPECIFICACAO_FINAL_COMPLETA.md');
const BUILD = path.join(ROOT, 'tools', 'build-final-canonical-spec.mjs');

if (!fs.existsSync(REPORT_PATH) || !fs.existsSync(FINAL_PATH)) {
  throw new Error('Saídas do resolvedor canônico ausentes.');
}

// O estágio anterior já resolveu os handlers e é a autoridade para esse resultado.
const resolved = JSON.parse(fs.readFileSync(REPORT_PATH, 'utf8'));
if (resolved.status !== 'PASS_FINAL_CANONICAL_SPEC' || resolved.ok !== true) {
  throw new Error(`Não é permitido reparar Markdown com relatório não-PASS: ${resolved.status}`);
}
if (Number(resolved.counts?.unresolvedConcreteUIActions || 0) !== 0) {
  throw new Error('Relatório resolvido ainda contém ações UI sem handler.');
}

// Regenera o documento integral pelo construtor-base. O construtor pode sair 1 aqui
// porque, sozinho, ainda não conhece os handlers delegados; os arquivos gerados são
// justamente a base integral que receberá abaixo o relatório já comprovado.
const rebuilt = spawnSync(process.execPath, [BUILD], {
  cwd: ROOT,
  encoding: 'utf8',
  maxBuffer: 32 * 1024 * 1024
});
if (rebuilt.error) throw rebuilt.error;
if (!fs.existsSync(REPORT_PATH) || !fs.existsSync(FINAL_PATH)) {
  throw new Error('Construtor-base não regenerou os arquivos canônicos.');
}

let md = fs.readFileSync(FINAL_PATH, 'utf8');

// Reaplica o crosswalk já resolvido ao documento completo recém-regenerado.
for (const trace of resolved.uiTraces || []) {
  const marker = `<!-- UI:${trace.id} -->`;
  const start = md.indexOf(marker);
  if (start < 0) throw new Error(`Marcador UI desapareceu na regeneração: ${trace.id}`);
  let end = md.indexOf('<!-- UI:', start + marker.length);
  const section6 = md.indexOf('\n## 6. EVENTOS, MOVIMENTO E ORDEM DE SCRIPTS', start + marker.length);
  if (end < 0 || (section6 >= 0 && section6 < end)) end = section6;
  if (end < 0) end = md.length;
  let block = md.slice(start, end);
  block = block.replace(/- Status: `[^`]+`/, `- Status: \`${trace.status}\``);
  const ev = (trace.evidence || [])
    .map(e => `\`${e.file}:${e.line} [${e.kind}]\``)
    .join(', ') || '—';
  block = block.replace(/- Handler\/dispatcher: .*?(?=\n|$)/, `- Handler/dispatcher: ${ev}`);
  md = md.slice(0, start) + block + md.slice(end);
}

md = md.replace(
  /- \*\*Status canônico estático:\*\* `(?:PASS|FAIL)_FINAL_CANONICAL_SPEC`/,
  `- **Status canônico estático:** \`${resolved.status}\``
);
md = md.replace(
  /\| Ações concretas sem handler \| \d+ \|/,
  `| Ações concretas sem handler | ${resolved.counts.unresolvedConcreteUIActions} |`
);

// Procura um cabeçalho Markdown REAL, sozinho na linha. Nunca usa indexOf em uma
// string que também pode existir dentro do código-fonte incorporado no próprio manual.
const heading = '## 9. RESULTADO DO GATE CANÔNICO';
const headingRx = /^## 9\. RESULTADO DO GATE CANÔNICO\s*$/gm;
let gatePos = -1;
let match;
while ((match = headingRx.exec(md))) gatePos = match.index;
if (gatePos < 0) throw new Error('Cabeçalho real da seção 9 não encontrado.');

const before = md.slice(0, gatePos);
const tail = [
  heading,
  '',
  `- Manual incorporado: \`${resolved.gates.manualSpecification}\``,
  `- Código exato de todas as funções: \`${resolved.gates.exactFunctionCode}\``,
  `- Ações concretas com handler/dispatcher rastreado: \`${resolved.gates.concreteUIActionHandlers}\``,
  `- **STATUS:** \`${resolved.status}\``,
  ''
];
md = before + tail.join('\n') + '\n';

fs.writeFileSync(FINAL_PATH, md);
// Restaura o relatório PASS do resolvedor, pois o construtor-base o reescreveu durante a regeneração.
fs.writeFileSync(REPORT_PATH, JSON.stringify(resolved, null, 2) + '\n');

console.log(JSON.stringify({
  ok: true,
  status: resolved.status,
  repair: 'anchored-final-heading-regeneration-v1',
  concreteUIActions: resolved.counts.concreteUIActions,
  concreteUIActionsWithHandler: resolved.counts.concreteUIActionsWithHandler,
  unresolvedConcreteUIActions: resolved.counts.unresolvedConcreteUIActions,
  rebuiltExitCode: rebuilt.status,
  canonicalBytes: Buffer.byteLength(md)
}, null, 2));
