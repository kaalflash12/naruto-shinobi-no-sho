import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'docs', 'generated');
const INV = path.join(OUT, 'TECHNICAL-INVENTORY.json');
const ASSET_EXT = /\.(?:png|jpe?g|webp|gif|svg|avif|bmp|ico|mp3|ogg|wav|m4a|mp4|webm)$/i;

if (!fs.existsSync(INV)) throw new Error('TECHNICAL-INVENTORY.json ausente');
const inv = JSON.parse(fs.readFileSync(INV, 'utf8'));
const norm = value => String(value || '').replace(/\\/g, '/').trim();
const isDynamic = value => {
  const v = norm(value);
  return /\$\{|\{\{|<%|\*/.test(v) || /\[[^\]]+\]/.test(v) || !ASSET_EXT.test(v);
};
const existsLiteral = value => {
  const v = norm(value);
  if (!v || isDynamic(v)) return null;
  return fs.existsSync(path.join(ROOT, v));
};
const code = value => '`' + String(value ?? '').replace(/`/g, '\\`') + '`';
const srcs = refs => (refs || []).map(x => code(`${x.file}:${x.line}`)).join(', ');

const byPath = new Map();
for (const a of inv.assets || []) {
  const value = norm(a.value);
  if (!value) continue;
  if (!byPath.has(value)) byPath.set(value, { value, sources: [] });
  byPath.get(value).sources.push({ file: a.file, line: a.line });
}

const refs = [...byPath.values()].sort((a,b) => a.value.localeCompare(b.value));
for (const ref of refs) {
  ref.dynamic = isDynamic(ref.value);
  ref.literal = !ref.dynamic;
  ref.userOverlay = ref.literal && ref.value.startsWith('assets/user-provided/');
  ref.exists = ref.literal ? Boolean(existsLiteral(ref.value)) : null;
  ref.status = ref.dynamic ? 'DYNAMIC_REFERENCE' : (ref.exists ? 'PASS_PATH' : (ref.userOverlay ? 'MISSING_USER_OVERLAY' : 'MISSING_HARD_PATH'));
}

const literal = refs.filter(x => x.literal);
const dynamic = refs.filter(x => x.dynamic);
const missingOverlay = literal.filter(x => !x.exists && x.userOverlay);
const missingHard = literal.filter(x => !x.exists && !x.userOverlay);
const missingAll = [...missingOverlay, ...missingHard];

inv.assetAudit = {
  mode: 'literal-vs-dynamic-reconciliation',
  dynamicReferencesIgnoredAsPhysicalFiles: true,
  uniqueReferences: refs.length,
  literalReferences: literal.length,
  dynamicReferences: dynamic.length,
  missingLiteralReferences: missingAll.length,
  missingExternalUserOverlayReferences: missingOverlay.length,
  missingHardAssetReferences: missingHard.length,
  status: missingHard.length ? 'FAIL_HARD_ASSET_PATHS' : (missingOverlay.length ? 'USER_OVERLAY_REQUIRED' : 'PASS')
};
inv.counts = {
  ...(inv.counts || {}),
  uniqueAssetReferences: refs.length,
  literalAssetReferences: literal.length,
  dynamicAssetReferences: dynamic.length,
  missingLiteralAssetReferences: missingAll.length,
  missingExternalUserOverlayReferences: missingOverlay.length,
  missingHardAssetReferences: missingHard.length
};
inv.gates = {
  ...(inv.gates || {}),
  assetPathCompleteness: inv.assetAudit.status === 'PASS' ? 'PASS' : inv.assetAudit.status
};
fs.writeFileSync(INV, JSON.stringify(inv, null, 2) + '\n');

const lines = [
  '# REFERÊNCIAS DE ASSETS', '',
  'Auditoria reconciliada: referências dinâmicas/templates não são tratadas como arquivos físicos ausentes. Referências literais precisam existir no repositório.', '',
  `- Referências únicas: **${refs.length}**`,
  `- Referências literais: **${literal.length}**`,
  `- Referências dinâmicas/templates: **${dynamic.length}**`,
  `- Literais ausentes no overlay do usuário: **${missingOverlay.length}**`,
  `- Literais ausentes fora do overlay: **${missingHard.length}**`,
  `- Gate de caminhos: **${inv.assetAudit.status}**`, '',
  '## Ausentes — overlay do usuário', ''
];
if (!missingOverlay.length) lines.push('Nenhuma referência literal ausente no overlay do usuário.');
for (const a of missingOverlay) lines.push(`- ${code(a.value)} — ${srcs(a.sources)}`);
lines.push('', '## Ausentes — caminhos obrigatórios do repositório', '');
if (!missingHard.length) lines.push('Nenhuma referência literal obrigatória ausente fora do overlay.');
for (const a of missingHard) lines.push(`- ${code(a.value)} — ${srcs(a.sources)}`);
lines.push('', '## Referências dinâmicas/templates — não auditadas como arquivo físico literal', '');
if (!dynamic.length) lines.push('Nenhuma referência dinâmica detectada.');
for (const a of dynamic) lines.push(`- ${code(a.value)} — ${srcs(a.sources)}`);
lines.push('', '## Todas as referências literais', '');
for (const a of literal) lines.push(`- ${a.status} ${code(a.value)} — ${srcs(a.sources)}`);
fs.writeFileSync(path.join(OUT, '10-ASSET-REFERENCES.md'), lines.join('\n') + '\n');

console.log(JSON.stringify(inv.assetAudit, null, 2));
if (missingHard.length) process.exit(1);
