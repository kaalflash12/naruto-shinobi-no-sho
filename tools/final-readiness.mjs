import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const readJson = p => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));
const failures = [];
const pass = (cond, msg) => { if (!cond) failures.push(msg); };

const canonical = readJson('docs/generated/FINAL-CANONICAL-AUDIT.json');
const operational = readJson('docs/generated/OPERATIONAL-STATIC-AUDIT.json');
const documentation = readJson('docs/generated/DOCUMENTATION-AUDIT.json');
const live = readJson('audit/SUPABASE-LIVE-E2E.json');
const browserLive = readJson('audit/BROWSER-LIVE-API.json');
const browserSmoke = readJson('audit/BROWSER-SMOKE.json');
const apiConfig = fs.readFileSync(path.join(ROOT, 'r41-api-config.js'), 'utf8');

pass(canonical.ok === true && canonical.status === 'PASS_FINAL_CANONICAL_SPEC', 'canonical spec sem PASS_FINAL_CANONICAL_SPEC');
pass(canonical.counts?.functions === canonical.counts?.functionsWithExactCode, 'funções sem código exato');
pass(canonical.counts?.unresolvedConcreteUIActions === 0, 'ações UI concretas sem handler');
pass(canonical.counts?.concreteUIActions === canonical.counts?.concreteUIActionsWithHandler, 'cobertura de handlers UI incompleta');

pass(documentation.ok === true && documentation.status === 'PASS_STATIC_COVERAGE', 'documentação/cobertura estática sem PASS');
pass(documentation.staticCoverage?.missingLiteralAssetReferences === 0, 'assets literais ausentes');
pass(documentation.staticCoverage?.uniqueAssetReferences >= 5400, 'inventário de assets inesperadamente reduzido');

pass(operational.ok === true && operational.status === 'PASS_OPERATIONAL_STATIC_CONTRACTS', 'contratos operacionais estáticos sem PASS');
pass(operational.assetAudit?.status === 'PASS', 'auditoria de assets sem PASS');
pass(operational.assetAudit?.missingLiteralReferences === 0, 'referências literais ausentes');
pass(operational.assetAudit?.missingHardAssetReferences === 0, 'assets obrigatórios ausentes');
pass(Array.isArray(operational.contracts) && operational.contracts.every(x => x.status === 'PASS_STATIC_TRACE'), 'há contrato operacional sem rastreio PASS');

pass(browserSmoke.ok === true && browserSmoke.status === 'PASS_BROWSER_SMOKE', 'browser smoke sem PASS');
pass(Array.isArray(browserSmoke.failures) && browserSmoke.failures.length === 0, 'browser smoke possui falhas');

pass(live.ok === true && live.status === 'PASS_SUPABASE_LIVE_E2E', 'Supabase live E2E sem PASS');
const liveRequired = [
  'statusConfigured','bootstrapPublic','registerTwoAccounts','authenticatedSessions','unauthorizedRejected',
  'saveLoadRoundTrip','kuraiPersisted','slotListing','roomCreate','roomJoinSecondAccount','roomHeartbeat',
  'roomMessaging','intentActionAccepted','clientMechanicalResultRejected','roomStateSynchronized','worldTickPersisted',
  'savePointPersisted','factsOnlyNarrator','saveCleanup','sessionRevocation'
];
for (const key of liveRequired) pass(live.checks?.[key] === true, `gate live ausente: ${key}`);

pass(browserLive.ok === true && browserLive.status === 'PASS_BROWSER_LIVE_API', 'browser live API sem PASS');
pass(browserLive.backendStatus?.status === 200 && browserLive.backendStatus?.ok === true, 'browser não recebeu HTTP 200 do backend');
pass(browserLive.backendStatus?.data?.storage === 'supabase-postgres', 'browser não confirmou Supabase Postgres');
pass(browserLive.backendStatus?.cors === 'https://kaalflash12.github.io', 'CORS GitHub Pages não confirmado');
pass(browserLive.backendStatus?.corsEnforcedByBrowser === true, 'CORS não foi provado por browser real');
pass(Array.isArray(browserLive.pageErrors) && browserLive.pageErrors.length === 0, 'browser live possui exceções JS');
pass(Array.isArray(browserLive.failures) && browserLive.failures.length === 0, 'browser live possui falhas');

const expectedOrigin = 'https://rlyiwlwzrdgvcwawrnpl.supabase.co/functions/v1/shinobi-api';
pass(apiConfig.includes(`const baked = "${expectedOrigin}"`), 'r41-api-config não aponta para Supabase live');
pass(apiConfig.includes('NARUTO-SHINOBI-NO-SHO-SUPABASE-ONLINE'), 'identidade da API pública incorreta');
pass(apiConfig.includes('sb_publishable_'), 'publishable key Supabase ausente da configuração pública');

const report = {
  generatedAt: new Date().toISOString(),
  status: failures.length ? 'FAIL_FINAL_READINESS' : 'PASS_FINAL_READINESS',
  ok: failures.length === 0,
  repository: 'kaalflash12/naruto-shinobi-no-sho',
  publicGame: 'https://kaalflash12.github.io/naruto-shinobi-no-sho/',
  backend: expectedOrigin,
  stack: 'GitHub Pages + Supabase Postgres + Supabase Edge Function',
  gates: {
    canonical: canonical.status,
    documentation: documentation.status,
    operationalStatic: operational.status,
    assetPaths: operational.assetAudit?.status,
    browserSmoke: browserSmoke.status,
    supabaseLive: live.status,
    browserLive: browserLive.status
  },
  coverage: {
    functions: canonical.counts?.functions,
    functionsWithExactCode: canonical.counts?.functionsWithExactCode,
    concreteUIActions: canonical.counts?.concreteUIActions,
    concreteUIActionsWithHandler: canonical.counts?.concreteUIActionsWithHandler,
    unresolvedConcreteUIActions: canonical.counts?.unresolvedConcreteUIActions,
    routes: canonical.counts?.routes,
    models: canonical.counts?.models,
    collections: canonical.counts?.collections,
    assetFiles: canonical.counts?.assetFiles,
    uniqueAssetReferences: documentation.staticCoverage?.uniqueAssetReferences,
    missingLiteralAssetReferences: documentation.staticCoverage?.missingLiteralAssetReferences
  },
  operationalContracts: operational.contracts?.map(x => ({ id: x.id, status: x.status })) || [],
  liveChecks: live.checks || {},
  failures
};

fs.mkdirSync(path.join(ROOT, 'audit'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'audit/FINAL-READINESS.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
if (!report.ok) process.exitCode = 1;
