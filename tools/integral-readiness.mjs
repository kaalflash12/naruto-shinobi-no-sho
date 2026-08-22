import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd();
const OUT='audit/INTEGRAL-READINESS.json';
const failures=[];
const checks={};
const evidence={};
const read=(p)=>fs.existsSync(p)?fs.readFileSync(p,'utf8'):'';
const json=(p)=>{try{return JSON.parse(read(p));}catch{return null;}};
const exists=(p)=>fs.existsSync(p);
const files=(dir,exts=null)=>{
  if(!exists(dir))return [];
  const out=[];
  for(const e of fs.readdirSync(dir,{withFileTypes:true})){
    const p=path.join(dir,e.name);
    if(e.isDirectory())out.push(...files(p,exts));
    else if(!exts||exts.some(x=>e.name.toLowerCase().endsWith(x)))out.push(p.replaceAll('\\','/'));
  }
  return out;
};
function gate(name,ok,detail={}){
  checks[name]={ok:!!ok,...detail};
  if(!ok)failures.push(name+(detail.missing?`: ${detail.missing}`:''));
}
function has(text,...patterns){return patterns.every(p=>p instanceof RegExp?p.test(text):text.includes(p));}
function any(text,...patterns){return patterns.some(p=>p instanceof RegExp?p.test(text):text.includes(p));}
function count(text,re){return (text.match(re)||[]).length;}

const app=read('app.js');
const html=read('index.html');
const dataText=files('data',['.js','.json','.md']).map(read).join('\n');
const docsText=files('docs',['.md','.json']).map(read).join('\n');
const corpus=[app,html,dataText,docsText].join('\n');

// Existing factual gates: these remain mandatory but are not sufficient by themselves.
const finalOld=json('audit/FINAL-READINESS.json');
const account=json('audit/ACCOUNT-LIVE-E2E.json');
const browserAccount=json('audit/BROWSER-ACCOUNT-LIVE.json');
const supabase=json('audit/SUPABASE-LIVE-E2E.json');
const browserLive=json('audit/BROWSER-LIVE-API.json');
const browserSmoke=json('audit/BROWSER-SMOKE.json');
gate('legacyFinalGate',finalOld?.ok===true&&finalOld?.status==='PASS_FINAL_READINESS',{status:finalOld?.status||null});
gate('accountBackendLive',account?.ok===true&&account?.status==='PASS_ACCOUNT_LIVE_E2E',{status:account?.status||null});
gate('accountBrowserLive',browserAccount?.ok===true&&browserAccount?.status==='PASS_BROWSER_ACCOUNT_LIVE',{status:browserAccount?.status||null});
gate('supabaseOnlineLive',supabase?.ok===true&&supabase?.status==='PASS_SUPABASE_LIVE_E2E',{status:supabase?.status||null});
gate('browserApiLive',browserLive?.ok===true&&browserLive?.status==='PASS_BROWSER_LIVE_API',{status:browserLive?.status||null});
gate('browserSmoke',browserSmoke?.ok===true&&browserSmoke?.status==='PASS_BROWSER_SMOKE',{status:browserSmoke?.status||null});

// Single-state universal save contract required by the operational MD.
const saveKeys=['character','appearance','resources','conditions','injuries','inventory','equipment','techniques','missions','relationships','world','time','training','combat','triggers'];
const saveMissing=saveKeys.filter(k=>!new RegExp(`(?:["']${k}["']|\\b${k}\\s*:)`,'i').test(corpus));
gate('universalSaveState',saveMissing.length===0,{required:saveKeys,missing:saveMissing.join(', ')||null});

// Narrative authority: action/intention -> scene routing -> TERION -> confirmed fact -> narration/save.
const sceneDirector=any(corpus,/SceneDirector/i,/sceneDirector/i,/routeScene/i,/resolveScene/i,/scene.*(?:dialog|explor|train|minigame|combat)/i);
const terion=any(corpus,/TERION/i,/2d10/i);
const confirmedFacts=any(corpus,/confirmed facts/i,/fatos confirmados/i,/confirmedFacts/i,/facts-only/i);
const narrativeIntent=any(corpus,/ActionIntent/i,/player.*intent/i,/intenção/i,/intent:/i);
const narrativeSave=any(corpus,/autosave/i,/scheduleCloudSave/i,/cloudFlush/i,/SavePoint/i);
gate('narrativeAuthorityPipeline',sceneDirector&&terion&&confirmedFacts&&narrativeIntent&&narrativeSave,{sceneDirector,terion,confirmedFacts,narrativeIntent,narrativeSave});

// Nine mandatory mission gameplay families.
const missionFamilies={
  infiltration:[/infiltra/i,/stealth/i], pursuit:[/persegui/i,/pursuit/i,/chase/i], investigation:[/investiga/i,/investigation/i],
  escort:[/escolta/i,/escort/i], defense:[/defesa/i,/defense/i], rescue:[/resgate/i,/rescue/i], tracking:[/rastream/i,/tracking/i],
  traps:[/armadilh/i,/trap/i], genjutsu:[/genjutsu/i]
};
const missionFamilyState={};
for(const [k,rs] of Object.entries(missionFamilies))missionFamilyState[k]=rs.some(r=>r.test(corpus));
gate('missionGameplayFamilies',Object.values(missionFamilyState).every(Boolean),{families:missionFamilyState,missing:Object.entries(missionFamilyState).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});

// Twelve mandatory minigame/training families.
const miniFamilies={
  chakra:[/controle.{0,20}chakra/i,/chakra.{0,20}control/i], seals:[/selos/i,/hand.?seals/i], weapons:[/shuriken/i,/kunai/i,/weapons/i],
  tree:[/árvore/i,/arvore/i,/tree.?climb/i], water:[/água/i,/agua/i,/water.?walk/i], taijutsu:[/taijutsu/i], ninjutsu:[/ninjutsu/i],
  genjutsu:[/genjutsu/i], sensory:[/sensorial/i,/sensory/i], medical:[/médic/i,/medic/i,/iryo/i], fuinjutsu:[/f[uū]injutsu/i,/fuinjutsu/i], dojutsu:[/d[oō]jutsu/i,/dojutsu/i,/sharingan/i]
};
const miniState={};
for(const [k,rs] of Object.entries(miniFamilies))miniState[k]=rs.some(r=>r.test(corpus));
const minigameEngine=any(corpus,/MinigameEngine/i,/r41OpenMinigame/i,/minigame.{0,30}(score|errors|time)/i);
gate('minigameFamilies',minigameEngine&&Object.values(miniState).every(Boolean),{engine:minigameEngine,families:miniState,missing:Object.entries(miniState).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});

// Training must use time, TERION, progress/state and save.
const trainingTime=any(corpus,/treino.{0,100}(60|90|180).{0,30}min/i,/training.{0,80}minutes/i,/advance.*time/i);
const trainingProgress=any(corpus,/training.{0,80}progress/i,/treino.{0,80}progresso/i,/dom[ií]nio/i,/mastery/i);
gate('trainingOperational',trainingTime&&trainingProgress&&terion&&narrativeSave,{trainingTime,trainingProgress,terion,save:narrativeSave});

// Resources/injuries/hospital/rest/world tick.
const pools={kurai:/Kurai/i.test(corpus),kusenro:/K[uū]senr[oō]/i.test(corpus),senjutsu:/Senjutsu/i.test(corpus),baseChakra:/Chakra/i.test(corpus)};
gate('multiResourceHudAndSave',Object.values(pools).every(Boolean)&&any(corpus,/HUD/i,/hud/i),{pools,missing:Object.entries(pools).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});
const injuries=any(corpus,/persistent.*injur/i,/ferimento persistente/i,/r41PersistentRecoveryCap/i)&&any(corpus,/injured.*limb/i,/membro lesionado/i,/injuries/i);
gate('persistentInjuries',injuries,{missing:injuries?null:'persistent injury + injured limb separation'});
const hospital=any(corpus,/r41HospitalPlan/i,/diagn[oó]stico/i)&&any(corpus,/hospital/i)&&any(corpus,/World Tick/i,/worldTick/i);
gate('hospitalOperational',hospital,{missing:hospital?null:'diagnosis/treatment/time/world tick'});
const rest=any(corpus,/r27RestUnified/i,/descanso/i)&&any(corpus,/deadline/i,/agenda/i,/schedule/i)&&any(corpus,/World Tick/i,/worldTick/i)&&any(corpus,/embosc/i,/interrupt/i,/risk/i,/risco/i);
gate('restConsequences',rest,{missing:rest?null:'time/world tick/schedules/deadline/risk'});

// Combat presentation contract.
const combatPieces={intent:any(corpus,/ActionIntent/i,/action intent/i,/intent:/i),technique:any(corpus,/TechniqueValidation/i,/validateTechnique/i,/t[eé]cnica.{0,20}valid/i),resource:any(corpus,/ResourceValidation/i,/validateResource/i,/chakra.{0,20}(cost|custo)/i),target:any(corpus,/TargetValidation/i,/validateTarget/i,/alvo.{0,20}valid/i),terion,damage:any(corpus,/damage/i,/dano/i),conditions:any(corpus,/conditions/i,/condi[cç][aã]o/i),result:any(corpus,/CombatResult/i,/combat result/i),events:any(corpus,/CombatEvent/i,/combat event/i),visual:any(corpus,/VisualStateEngine/i,/r41VisualState/i,/r41InferVisualState/i),animation:any(corpus,/AnimationRegistry/i,/animation registry/i,/VFX/i),save:narrativeSave};
gate('combatFullPipeline',Object.values(combatPieces).every(Boolean),{pieces:combatPieces,missing:Object.entries(combatPieces).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});

// Persistent modular character appearance.
const appearanceLayers=['body','face','hair','eyes','clothes','headband','weapon','accessories','aura','transform'];
const appearanceState={};
for(const k of appearanceLayers)appearanceState[k]=new RegExp(k,'i').test(corpus);
const appearanceEngine=any(corpus,/CharacterAppearanceSystem/i,/CharacterAppearance/i,/appearance.{0,60}(equipment|equip)/i,/equip.{0,60}appearance/i);
gate('characterAppearancePersistent',appearanceEngine&&Object.values(appearanceState).every(Boolean)&&saveKeys.includes('appearance'),{engine:appearanceEngine,layers:appearanceState,missing:Object.entries(appearanceState).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});

// Dojutsu/transformations need mechanical + visual + narrative state.
const transformMechanic=any(corpus,/transform.{0,80}(bonus|cost|mechanic|estado|state)/i,/d[oō]jutsu.{0,80}(cost|custo|bonus|stage|est[aá]gio)/i);
const transformVisual=any(corpus,/DOJUTSU/i,/TRANSFORM/i,/transformations/i,/eyes.{0,40}(overlay|replace|state)/i);
const transformNarrative=any(corpus,/transform.{0,100}narrat/i,/d[oō]jutsu.{0,100}narrat/i,/narrat.{0,100}(transform|d[oō]jutsu)/i);
gate('transformationThreeLayers',transformMechanic&&transformVisual&&transformNarrative,{mechanical:transformMechanic,visual:transformVisual,narrative:transformNarrative});

// Canonical NPC graph.
const npcGraph={canonicalId:/canonicalId/i.test(corpus),identity:/identity/i.test(corpus),appearance:/appearance/i.test(corpus),location:/location/i.test(corpus),schedule:/schedule|agenda/i.test(corpus),relationships:/relationships|rela[cç][oõ]es/i.test(corpus),services:/services|servi[cç]os/i.test(corpus),training:/training|treino/i.test(corpus),missions:/missions|miss[oõ]es/i.test(corpus),worldState:/worldState|world state/i.test(corpus)};
gate('canonicalNpcGraph',Object.values(npcGraph).every(Boolean),{fields:npcGraph,missing:Object.entries(npcGraph).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});

// Asset manifest must cover physical image assets, not only a small verified subset.
const manifest=json('data/assets/asset-manifest.json');
const imageExt=['.png','.jpg','.jpeg','.webp','.gif','.svg','.avif'];
const physicalAssets=files('assets').filter(p=>imageExt.some(x=>p.toLowerCase().endsWith(x)));
const manifestAssets=Array.isArray(manifest?.assets)?manifest.assets:[];
const manifestFiles=new Set(manifestAssets.map(x=>String(x.file||'').replace(/^\//,'')));
const physicalSet=new Set(physicalAssets.map(x=>x.replace(/^\//,'')));
const manifestMissingPhysical=physicalAssets.filter(p=>!manifestFiles.has(p)).slice(0,50);
const manifestBroken=manifestAssets.filter(x=>!x.id||!x.canonicalId||!x.type||!x.file||!Array.isArray(x.semanticTags)||!x.semanticTags.length||x.approved!==true||!physicalSet.has(String(x.file).replace(/^\//,''))).slice(0,50);
gate('assetManifestComplete',manifestAssets.length===physicalAssets.length&&manifestMissingPhysical.length===0&&manifestBroken.length===0,{manifestCount:manifestAssets.length,physicalCount:physicalAssets.length,missingCount:Math.max(0,physicalAssets.length-manifestAssets.length),missingSamples:manifestMissingPhysical,brokenSamples:manifestBroken.map(x=>x.id||x.file||'?')});

// All alias registries must be non-empty and functional.
const aliasFiles=['characters','npcs','jutsu','items','locations'];
const aliasState={};
for(const k of aliasFiles){const v=json(`data/aliases/${k}.json`); aliasState[k]=!!v&&(Array.isArray(v)?v.length>0:Object.keys(v).length>0);}
gate('aliasRegistriesComplete',Object.values(aliasState).every(Boolean),{registries:aliasState,missing:Object.entries(aliasState).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});

// External reconciliation staging is mandatory.
const external={raw:exists('data/external/raw')&&files('data/external/raw').length>0,normalized:exists('data/external/normalized')&&files('data/external/normalized').length>0,conflicts:exists('data/external/conflicts')&&files('data/external/conflicts').length>0,importers:exists('tools/importers')&&files('tools/importers',['.mjs','.js']).length>0};
gate('externalReconciliationPipeline',Object.values(external).every(Boolean),{parts:external,missing:Object.entries(external).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});

// GM3 metadata coverage across the 2792-technique master: every required key must occur at least 2792 times.
const jutsuMaster=read('data/r38-master-2792.json');
const gm3Keys={rank:/"rank"\s*:/g,cost:/"(?:cost|custo)"\s*:/g,resource:/"(?:resource|recurso)"\s*:/g,test:/"(?:test|teste)"\s*:/g,cd:/"(?:cd|difficulty|dificuldade)"\s*:/g,range:/"(?:range|alcance)"\s*:/g,duration:/"(?:duration|duracao|duração)"\s*:/g,requirement:/"(?:requirement|requisito)"\s*:/g,limit:/"(?:limit|limite)"\s*:/g,countermeasure:/"(?:countermeasure|contramedida)"\s*:/g};
const gm3Counts={}; for(const [k,r] of Object.entries(gm3Keys))gm3Counts[k]=count(jutsuMaster,r);
gate('jutsuGm3Complete',Object.values(gm3Counts).every(n=>n>=2792),{expectedPerField:2792,counts:gm3Counts,missing:Object.entries(gm3Counts).filter(([,n])=>n<2792).map(([k,n])=>`${k}:${n}/2792`).join(', ')||null});

// Story/arcs must be substantial and contain choices/consequences, not only menu labels.
const missionScripts=read('data/r33-mission-scripts.js');
const story={substantial:missionScripts.length>1000000,choice:any(missionScripts,/choice/i,/escolha/i),consequence:any(missionScripts,/consequence/i,/consequ[eê]ncia/i),precondition:any(missionScripts,/precondition/i,/pr[eé].?condi/i,/requirement/i),worldChange:any(missionScripts,/worldState/i,/world.*change/i,/mudan[cç]a.{0,20}mundo/i)};
gate('storyArcsPlayable',Object.values(story).every(Boolean),{parts:story,bytes:missionScripts.length,missing:Object.entries(story).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});

// Mobile compact UX.
const mobile={responsive:/@media\s*\([^)]*(max-width|max-device-width)/i.test(corpus),portrait:/portrait/i.test(corpus),pv:/\bPV\b/i.test(corpus),chakra:/chakra/i.test(corpus),actions:/actions|a[cç][oõ]es/i.test(corpus),movement:/movement|movimento/i.test(corpus),reaction:/reaction|rea[cç][aã]o/i.test(corpus),effects:/effects|efeitos/i.test(corpus)};
gate('mobileCompactUx',Object.values(mobile).every(Boolean),{parts:mobile,missing:Object.entries(mobile).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});

const ok=failures.length===0;
const report={generatedAt:new Date().toISOString(),status:ok?'PASS_INTEGRAL_READINESS':'FAIL_INTEGRAL_READINESS',ok,authority:'MD operacional integral do NARUTO SHINOBI NO SHO',checks,evidence:{...evidence,physicalAssets:physicalAssets.length,manifestAssets:manifestAssets.length},failures};
fs.mkdirSync(path.dirname(OUT),{recursive:true});
fs.writeFileSync(OUT,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
if(!ok)process.exitCode=1;
