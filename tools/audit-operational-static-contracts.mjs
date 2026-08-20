import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'docs', 'generated');
const INV = path.join(OUT, 'TECHNICAL-INVENTORY.json');
if (!fs.existsSync(INV)) throw new Error('TECHNICAL-INVENTORY.json ausente');
const inv = JSON.parse(fs.readFileSync(INV, 'utf8'));

const runtimeFiles = (inv.files || [])
  .map(x => x.path)
  .filter(p => /\.(?:js|mjs|cjs|html)$/i.test(p) && !p.startsWith('docs/') && !p.startsWith('tools/') && !p.startsWith('.github/'))
  .filter(p => fs.existsSync(path.join(ROOT, p)));
const runtimeText = runtimeFiles.map(p => `\n/* FILE:${p} */\n${fs.readFileSync(path.join(ROOT, p), 'utf8')}`).join('\n');

const contracts = [
  ['save_autosave', ['r41ScheduleCloudSave','r41CloudFlush']],
  ['kurai_hud_resource', ['kurai']],
  ['persistent_injuries', ['r41ActiveInjuries','r41PersistentRecoveryCap']],
  ['hospital_treatment', ['r41HospitalPlan','r41HospitalTreat']],
  ['rest_consequences', ['r27RestUnified']],
  ['world_tick', ['v83WorldTick']],
  ['minigame_engine', ['r41RecordMinigame','r41OpenMinigame']],
  ['mission_choice_resolution', ['resolveMissionChoice']],
  ['combat_pipeline', ['r41CombatSnapshot','r41CombatVisual']],
  ['online_intent_state', ['r41OnlineAction','r41SendOnlineIntent']],
  ['visual_state', ['r41SetVisualState','r41AvatarComposite']]
];

const contractResults = contracts.map(([id, needles]) => ({
  id,
  requiredSymbols: needles,
  foundSymbols: needles.filter(n => runtimeText.includes(n)),
  status: needles.every(n => runtimeText.includes(n)) ? 'PASS_STATIC_TRACE' : 'FAIL_MISSING_STATIC_TRACE'
}));

const forbiddenRuntimeReferences = [
  'assets/user-provided/reference-ui/'
].flatMap(token => runtimeFiles.flatMap(file => {
  const text = fs.readFileSync(path.join(ROOT, file), 'utf8');
  return text.includes(token) ? [{token,file}] : [];
}));

const assetAudit = inv.assetAudit || {};
const assetGate = assetAudit.status === 'PASS';
const contractGate = contractResults.every(x => x.status === 'PASS_STATIC_TRACE');
const referenceUiGate = forbiddenRuntimeReferences.length === 0;
const ok = assetGate && contractGate && referenceUiGate;
const report = {
  generatedAt: new Date().toISOString(),
  status: ok ? 'PASS_OPERATIONAL_STATIC_CONTRACTS' : 'FAIL_OPERATIONAL_STATIC_CONTRACTS',
  ok,
  evidenceScope: 'STATIC_ONLY',
  liveExecution: 'UNVERIFIED',
  browserInteraction: 'UNVERIFIED',
  workersLive: 'UNVERIFIED',
  mongodbLive: 'UNVERIFIED',
  gameplayE2E: 'UNVERIFIED',
  gates: {
    assetPaths: assetGate ? 'PASS' : 'FAIL',
    requiredRuntimeSymbols: contractGate ? 'PASS' : 'FAIL',
    referenceUiNotUsedAsRuntimeArt: referenceUiGate ? 'PASS' : 'FAIL'
  },
  assetAudit,
  contracts: contractResults,
  forbiddenRuntimeReferences
};
fs.writeFileSync(path.join(OUT, 'OPERATIONAL-STATIC-AUDIT.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
if (!ok) process.exit(1);
