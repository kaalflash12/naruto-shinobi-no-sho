import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd();
const GATE_VERSION='CLOUDFLARE-MONGODB-INTEGRATED-V3';
const failures=[];
const pass=(cond,msg)=>{if(!cond)failures.push(msg);};
function readJson(p){
  const full=path.join(ROOT,p);
  if(!fs.existsSync(full)){failures.push(`evidência ausente: ${p}`);return {};}
  try{return JSON.parse(fs.readFileSync(full,'utf8'));}
  catch(e){failures.push(`JSON inválido: ${p}: ${e.message}`);return {};}
}

const canonical=readJson('docs/generated/FINAL-CANONICAL-AUDIT.json');
const operational=readJson('docs/generated/OPERATIONAL-STATIC-AUDIT.json');
const documentation=readJson('docs/generated/DOCUMENTATION-AUDIT.json');
const live=readJson('audit/LIVE-BACKEND.json');
const browserLive=readJson('audit/BROWSER-LIVE-API.json');
const browserSmoke=readJson('audit/BROWSER-SMOKE.json');
const gameplay=readJson('audit/BROWSER-GAMEPLAY-E2E.json');
const apiConfig=fs.readFileSync(path.join(ROOT,'r41-api-config.js'),'utf8');
const githubApi=fs.readFileSync(path.join(ROOT,'r41-github-api.js'),'utf8');

pass(canonical.ok===true&&canonical.status==='PASS_FINAL_CANONICAL_SPEC','canonical spec sem PASS_FINAL_CANONICAL_SPEC');
pass(canonical.counts?.functions===canonical.counts?.functionsWithExactCode,'funções sem código exato');
pass(canonical.counts?.unresolvedConcreteUIActions===0,'ações UI concretas sem handler');
pass(canonical.counts?.concreteUIActions===canonical.counts?.concreteUIActionsWithHandler,'cobertura de handlers UI incompleta');

pass(documentation.ok===true&&documentation.status==='PASS_STATIC_COVERAGE','documentação/cobertura estática sem PASS');
pass(documentation.staticCoverage?.missingLiteralAssetReferences===0,'assets literais ausentes');
pass(documentation.staticCoverage?.uniqueAssetReferences>=5400,'inventário de assets inesperadamente reduzido');

pass(operational.ok===true&&operational.status==='PASS_OPERATIONAL_STATIC_CONTRACTS','contratos operacionais estáticos sem PASS');
pass(operational.assetAudit?.status==='PASS','auditoria de assets sem PASS');
pass(operational.assetAudit?.missingLiteralReferences===0,'referências literais ausentes');
pass(operational.assetAudit?.missingHardAssetReferences===0,'assets obrigatórios ausentes');
pass(Array.isArray(operational.contracts)&&operational.contracts.every(x=>x.status==='PASS_STATIC_TRACE'),'há contrato operacional sem rastreio PASS');

pass(browserSmoke.ok===true&&browserSmoke.status==='PASS_BROWSER_SMOKE','browser smoke sem PASS');
pass(browserSmoke.api?.build==='NARUTO-SHINOBI-NO-SHO-CLOUDFLARE-MONGODB','browser smoke não confirmou identidade Cloudflare+MongoDB');
pass(Array.isArray(browserSmoke.failures)&&browserSmoke.failures.length===0,'browser smoke possui falhas');

pass(live.ok===true&&live.status==='PASS_LIVE_BACKEND_E2E','Cloudflare + MongoDB live E2E sem PASS');
const liveRequired=[
  'statusConfigured','registerTwoAccounts','authenticatedSessions','unauthorizedRejected','mongoSaveRoundTrip','slotListing',
  'roomCreate','roomJoinSecondAccount','roomHeartbeat','roomMessaging','intentActionAccepted','clientMechanicalResultRejected',
  'roomStateSynchronized','worldEventPersisted','worldSavePointPersisted','workersAiLive','e2eSaveCleanup','sessionRevocation'
];
for(const key of liveRequired)pass(live.checks?.[key]===true,`gate Cloudflare/MongoDB ausente: ${key}`);
pass(live.evidence?.status?.storage==='mongodb-atlas','backend live não confirmou MongoDB Atlas');
pass(live.evidence?.status?.realtime==='cloudflare-durable-objects','backend live não confirmou Durable Objects');

pass(browserLive.ok===true&&browserLive.status==='PASS_BROWSER_LIVE_API','browser live API sem PASS');
pass(browserLive.backendStatus?.status===200&&browserLive.backendStatus?.ok===true,'browser não recebeu HTTP 200 do Worker');
pass(browserLive.backendStatus?.data?.storage==='mongodb-atlas','browser não confirmou MongoDB Atlas');
pass(browserLive.backendStatus?.data?.realtime==='cloudflare-durable-objects','browser não confirmou Durable Objects');
pass(browserLive.backendStatus?.cors==='https://kaalflash12.github.io','CORS GitHub Pages → Worker não confirmado');
pass(Array.isArray(browserLive.pageErrors)&&browserLive.pageErrors.length===0,'browser live possui exceções JS');
pass(Array.isArray(browserLive.failures)&&browserLive.failures.length===0,'browser live possui falhas');

pass(gameplay.ok===true&&gameplay.status==='PASS_BROWSER_GAMEPLAY_E2E','gameplay Chromium E2E sem PASS');
pass(Array.isArray(gameplay.contracts)&&gameplay.contracts.length>=11,'gameplay E2E não cobriu os contratos exigidos');
pass(Array.isArray(gameplay.contracts)&&gameplay.contracts.every(x=>x.status==='PASS_GAMEPLAY_E2E'),'há contrato gameplay sem PASS_GAMEPLAY_E2E');
pass(gameplay.checks?.temporaryAccountRegistered===true,'gameplay não provou registro de conta');
pass(gameplay.checks?.temporaryAccountDeleted===true,'gameplay não provou limpeza/exclusão da conta temporária');

pass(!/supabase/i.test(apiConfig),'r41-api-config ainda contém Supabase');
pass(!/vercel/i.test(apiConfig),'r41-api-config ainda contém Vercel');
pass(apiConfig.includes('NARUTO-SHINOBI-NO-SHO-CLOUDFLARE-MONGODB'),'identidade Cloudflare+MongoDB ausente da configuração');
const baked=apiConfig.match(/const baked = "([^"]*)"/)?.[1]||'';
pass(/^https:\/\/[^/]+\.workers\.dev$/i.test(baked),'Worker verificado ainda não foi gravado em r41-api-config.js');
pass(!/supabase-edge-postgres/i.test(githubApi),'r41-github-api ainda identifica Supabase');
pass(githubApi.includes('cloudflare-mongodb-durable-objects'),'r41-github-api não identifica Cloudflare+MongoDB+Durable Objects');

const report={
  generatedAt:new Date().toISOString(),gateVersion:GATE_VERSION,
  status:failures.length?'FAIL_FINAL_READINESS':'PASS_FINAL_READINESS',ok:failures.length===0,
  repository:'kaalflash12/naruto-shinobi-no-sho',
  publicGame:'https://kaalflash12.github.io/naruto-shinobi-no-sho/',
  backend:baked||null,
  stack:'GitHub Pages + Cloudflare Workers + MongoDB Atlas + Durable Objects + Workers AI',
  gates:{
    canonical:canonical.status||null,documentation:documentation.status||null,operationalStatic:operational.status||null,
    assetPaths:operational.assetAudit?.status||null,browserSmoke:browserSmoke.status||null,
    liveBackend:live.status||null,browserLive:browserLive.status||null,gameplay:gameplay.status||null
  },
  coverage:{
    functions:canonical.counts?.functions,functionsWithExactCode:canonical.counts?.functionsWithExactCode,
    concreteUIActions:canonical.counts?.concreteUIActions,concreteUIActionsWithHandler:canonical.counts?.concreteUIActionsWithHandler,
    unresolvedConcreteUIActions:canonical.counts?.unresolvedConcreteUIActions,routes:canonical.counts?.routes,
    models:canonical.counts?.models,collections:canonical.counts?.collections,assetFiles:canonical.counts?.assetFiles,
    uniqueAssetReferences:documentation.staticCoverage?.uniqueAssetReferences,
    missingLiteralAssetReferences:documentation.staticCoverage?.missingLiteralAssetReferences
  },
  liveChecks:live.checks||{},gameplayContracts:gameplay.contracts||[],failures
};

fs.mkdirSync(path.join(ROOT,'audit'),{recursive:true});
fs.writeFileSync(path.join(ROOT,'audit/FINAL-READINESS.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
if(!report.ok)process.exitCode=1;
