import fs from 'node:fs';
import path from 'node:path';

// O construtor-base continua sendo a autoridade para inventário, funções, hashes e fontes.
// Este estágio só promove uma ação UI quando encontra evidência concreta de handler no
// runtime executável: seletor delegado, comparação explícita de dataset.action/alias,
// switch/case ou tabela de dispatch dentro de um listener.
process.exitCode = 0;
await import('./build-final-canonical-spec.mjs');
process.exitCode = 0;

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'docs', 'generated');
const REPORT_PATH = path.join(OUT, 'FINAL-CANONICAL-AUDIT.json');
const FINAL_PATH = path.join(OUT, 'NARUTO_SHINOBI_NO_SHO_ESPECIFICACAO_FINAL_COMPLETA.md');

if (!fs.existsSync(REPORT_PATH) || !fs.existsSync(FINAL_PATH)) {
  throw new Error('Saída do construtor canônico-base ausente.');
}

const report = JSON.parse(fs.readFileSync(REPORT_PATH, 'utf8'));
let md = fs.readFileSync(FINAL_PATH, 'utf8');
const sourceText = new Map();
const SKIP_DIRS = new Set(['.git', '.github', 'docs', 'tools', 'node_modules']);

function walk(dir, rel = '') {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const nextRel = rel ? `${rel}/${ent.name}` : ent.name;
    const abs = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (!SKIP_DIRS.has(ent.name)) walk(abs, nextRel);
      continue;
    }
    if (!/\.(?:m?js|cjs|html)$/i.test(ent.name)) continue;
    try { sourceText.set(nextRel.replace(/\\/g, '/'), fs.readFileSync(abs, 'utf8')); } catch {}
  }
}
walk(ROOT);

const reEsc = s => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function lineAt(text, index) {
  let n = 1;
  for (let i = 0; i < index; i++) if (text.charCodeAt(i) === 10) n++;
  return n;
}
function occurrences(text, needle) {
  const out = [];
  let at = 0;
  while ((at = text.indexOf(needle, at)) >= 0) {
    out.push(at);
    at += Math.max(1, needle.length);
  }
  return out;
}
function uniqEvidence(items) {
  const seen = new Set();
  return items.filter(e => {
    const k = `${e.file}:${e.line}:${e.kind}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

function aliasesForDatasetAction(text) {
  const aliases = [];
  const rx = /(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*[^;\n]{0,600}?\.dataset\.action\b/g;
  let m;
  while ((m = rx.exec(text))) aliases.push({ name: m[1], index: m.index });
  return aliases;
}

function handlerEvidence(value) {
  const evidence = [];
  const lit = reEsc(value);

  for (const [file, text] of sourceText) {
    // 1) Seletor delegado exato dentro de listener real.
    const selectors = [
      `[data-action="${value}"]`,
      `[data-action='${value}']`
    ];
    for (const selector of selectors) {
      for (const pos of occurrences(text, selector)) {
        const before = text.slice(Math.max(0, pos - 5000), pos);
        const around = text.slice(Math.max(0, pos - 700), Math.min(text.length, pos + selector.length + 700));
        const eventBoundary = /addEventListener\s*\([^)]{0,300}$|\.onclick\s*=|\.onchange\s*=|\.oninput\s*=|\.onsubmit\s*=|\.onkeydown\s*=|\.onpointerdown\s*=/s.test(before.slice(-1800));
        const selectorConsumer = /(?:closest|matches|querySelector|querySelectorAll)\??\.?(?:call)?\s*\(/.test(around);
        if (eventBoundary && selectorConsumer) {
          evidence.push({ file, line: lineAt(text, pos), kind: 'delegated-selector-handler' });
        }
      }
    }

    // 2) Comparação direta de dataset.action com o valor.
    const directRx = new RegExp(`(?:dataset\\.action|dataset\\[['\"]action['\"]\\])\\s*(?:===|==)\\s*['\"\\\`]${lit}['\"\\\`]`, 'g');
    let dm;
    while ((dm = directRx.exec(text))) {
      const before = text.slice(Math.max(0, dm.index - 6000), dm.index);
      if (/addEventListener\s*\(/.test(before)) {
        evidence.push({ file, line: lineAt(text, dm.index), kind: 'direct-dataset-action-branch' });
      }
    }

    // 3) Alias comprovadamente derivado de dataset.action, como const act=t.dataset.action.
    for (const alias of aliasesForDatasetAction(text)) {
      const ar = reEsc(alias.name);
      const branch = new RegExp(`\\b${ar}\\s*(?:===|==)\\s*['\"\\\`]${lit}['\"\\\`]`, 'g');
      branch.lastIndex = alias.index;
      let bm;
      while ((bm = branch.exec(text))) {
        if (bm.index - alias.index > 60000) break;
        const between = text.slice(Math.max(0, alias.index - 4000), Math.min(text.length, bm.index + 500));
        if (!/addEventListener\s*\(/.test(between)) continue;
        evidence.push({ file, line: lineAt(text, bm.index), kind: `generic-data-action-dispatch:${alias.name}` });
      }

      // switch(alias){case 'valor': ...}
      const switchBlock = text.slice(alias.index, Math.min(text.length, alias.index + 60000));
      const caseRx = new RegExp(`\\bcase\\s*['\"\\\`]${lit}['\"\\\`]`, 'g');
      let cm;
      while ((cm = caseRx.exec(switchBlock))) {
        const absolute = alias.index + cm.index;
        const local = text.slice(Math.max(0, absolute - 6000), absolute + 500);
        if (/addEventListener\s*\(/.test(local) && new RegExp(`switch\\s*\\(\\s*${ar}\\s*\\)`).test(local)) {
          evidence.push({ file, line: lineAt(text, absolute), kind: `switch-data-action-dispatch:${alias.name}` });
        }
      }
    }

    // 4) Tabela de dispatch: {'acao': handler} + actions[alias] dentro do mesmo listener.
    const keyRx = new RegExp(`['\"\\\`]${lit}['\"\\\`]\\s*:`, 'g');
    let km;
    while ((km = keyRx.exec(text))) {
      const near = text.slice(Math.max(0, km.index - 12000), Math.min(text.length, km.index + 20000));
      if (/addEventListener\s*\(/.test(near) && /\[[A-Za-z_$][\w$]*\]\s*;?\s*if\s*\(|\[[A-Za-z_$][\w$]*\]\s*\?\.?\s*\(/.test(near)) {
        evidence.push({ file, line: lineAt(text, km.index), kind: 'action-table-dispatch' });
      }
    }
  }

  return uniqEvidence(evidence);
}

const traceById = new Map((report.uiTraces || []).map(x => [x.id, x]));
for (const unresolved of report.unresolvedUIActions || []) {
  const trace = traceById.get(unresolved.id);
  if (!trace) continue;
  const found = handlerEvidence(trace.value);
  if (found.length) {
    trace.status = 'HANDLER_TRACED';
    trace.evidence = uniqEvidence([...(trace.evidence || []), ...found]);
  }
}

const concrete = (report.uiTraces || []).filter(x => !x.dynamic);
const unresolved = concrete.filter(x => x.status !== 'HANDLER_TRACED');
report.unresolvedUIActions = unresolved.map(x => ({ id: x.id, value: x.value, sources: x.sources, evidence: x.evidence || [] }));
report.counts.concreteUIActionsWithHandler = concrete.filter(x => x.status === 'HANDLER_TRACED').length;
report.counts.unresolvedConcreteUIActions = unresolved.length;
report.gates.concreteUIActionHandlers = unresolved.length ? 'FAIL' : 'PASS';
const pass = unresolved.length === 0 && !(report.missingFunctionCode || []).length && !(report.missingManualDocs || []).length;
report.status = pass ? 'PASS_FINAL_CANONICAL_SPEC' : 'FAIL_FINAL_CANONICAL_SPEC';
report.ok = pass;
report.uiHandlerResolution = 'executable-runtime-handler-evidence-v4';
report.generatedAt = new Date().toISOString();
fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2) + '\n');

for (const trace of report.uiTraces || []) {
  const marker = `<!-- UI:${trace.id} -->`;
  const start = md.indexOf(marker);
  if (start < 0) continue;
  let end = md.indexOf('<!-- UI:', start + marker.length);
  const section6 = md.indexOf('## 6.', start + marker.length);
  if (end < 0 || (section6 >= 0 && section6 < end)) end = section6;
  if (end < 0) end = md.length;
  let block = md.slice(start, end);
  block = block.replace(/- Status: `[^`]+`/, `- Status: \`${trace.status}\``);
  const ev = (trace.evidence || []).map(e => `\`${e.file}:${e.line} [${e.kind}]\``).join(', ') || '—';
  block = block.replace(/- Handler\/dispatcher: .*?(?=\n|$)/, `- Handler/dispatcher: ${ev}`);
  md = md.slice(0, start) + block + md.slice(end);
}

md = md.replace(/- \*\*Status canônico estático:\*\* `(?:PASS|FAIL)_FINAL_CANONICAL_SPEC`/, `- **Status canônico estático:** \`${report.status}\``);
md = md.replace(/\| Ações concretas sem handler \| \d+ \|/, `| Ações concretas sem handler | ${unresolved.length} |`);
const gatePos = md.indexOf('## 9. RESULTADO DO GATE CANÔNICO');
if (gatePos >= 0) {
  const before = md.slice(0, gatePos);
  const tail = [
    '## 9. RESULTADO DO GATE CANÔNICO', '',
    `- Manual incorporado: \`${report.gates.manualSpecification}\``,
    `- Código exato de todas as funções: \`${report.gates.exactFunctionCode}\``,
    `- Ações concretas com handler/dispatcher rastreado: \`${report.gates.concreteUIActionHandlers}\``,
    `- **STATUS:** \`${report.status}\``, ''
  ];
  if (unresolved.length) {
    tail.push('### Ações concretas ainda sem handler provado', '');
    for (const a of unresolved) tail.push(`- ${a.id} \`${a.value}\` — ${(a.sources || []).map(s => `\`${s.file}:${s.line}\``).join(', ')}`);
    tail.push('');
  }
  if ((report.missingFunctionCode || []).length) {
    tail.push('### Funções sem trecho exato localizado', '');
    for (const f of report.missingFunctionCode) tail.push(`- ${f.id} \`${f.name}\` — \`${f.file}:${f.line}\``);
    tail.push('');
  }
  md = before + tail.join('\n') + '\n';
}
fs.writeFileSync(FINAL_PATH, md);

console.log(JSON.stringify({
  ok: pass,
  status: report.status,
  resolution: report.uiHandlerResolution,
  runtimeFilesScanned: sourceText.size,
  concreteUIActions: report.counts.concreteUIActions,
  concreteUIActionsWithHandler: report.counts.concreteUIActionsWithHandler,
  unresolvedConcreteUIActions: unresolved.length,
  unresolved: unresolved.map(x => x.value)
}, null, 2));
if (!pass) process.exitCode = 1;
