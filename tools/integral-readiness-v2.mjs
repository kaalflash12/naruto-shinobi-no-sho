import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const OUT='audit/INTEGRAL-READINESS-V2.json';
const failures=[],checks={};
const read=p=>fs.existsSync(p)?fs.readFileSync(p,'utf8'):'';
const json=p=>{try{return JSON.parse(read(p));}catch{return null;}};
const exists=p=>fs.existsSync(p);
const files=(dir,exts=null)=>{if(!exists(dir))return[];const out=[];for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())out.push(...files(p,exts));else if(!exts||exts.some(x=>e.name.toLowerCase().endsWith(x)))out.push(p.replaceAll('\\','/'));}return out;};
const any=(text,...rs)=>rs.some(r=>r instanceof RegExp?r.test(text):text.includes(r));
const count=(text,re)=>(text.match(re)||[]).length;
const gate=(name,ok,detail={})=>{checks[name]={ok:!!ok,...detail};if(!ok)failures.push(name+(detail.missing?`: ${detail.missing}`:''));};
const textFrom=dirs=>dirs.flatMap(([d,e])=>files(d,e).map(read)).join('\n');
const app=read('app.js'),html=read('index.html');
const src=textFrom([['src',['.js','.json','.md']]]),data=textFrom([['data',['.js','.json','.md']]]),docs=textFrom([['docs',['.md','.json']]]),tools=textFrom([['tools',['.mjs','.js']]]),packs=textFrom([['content-packs',['.json','.js','.md']]]);
const corpus=[app,html,src,data,docs,tools,packs].join('\n');

// Live factual evidence.
for(const [name,file,status] of [
  ['legacyFinalGate','audit/FINAL-READINESS.json','PASS_FINAL_READINESS'],['accountBackendLive','audit/ACCOUNT-LIVE-E2E.json','PASS_ACCOUNT_LIVE_E2E'],['accountBrowserLive','audit/BROWSER-ACCOUNT-LIVE.json','PASS_BROWSER_ACCOUNT_LIVE'],['supabaseOnlineLive','audit/SUPABASE-LIVE-E2E.json','PASS_SUPABASE_LIVE_E2E'],['browserApiLive','audit/BROWSER-LIVE-API.json','PASS_BROWSER_LIVE_API'],['browserSmoke','audit/BROWSER-SMOKE.json','PASS_BROWSER_SMOKE']
]){const r=json(file);gate(name,r?.ok===true&&r?.status===status,{status:r?.status??null});}

// Universal save.
const saveKeys=['character','appearance','resources','conditions','injuries','inventory','equipment','techniques','missions','relationships','world','time','training','combat','triggers'];
const saveMissing=saveKeys.filter(k=>!new RegExp(`(?:["']${k}["']|\\b${k}\\s*:)`,'i').test(corpus));
gate('universalSaveState',!saveMissing.length,{missing:saveMissing.join(', ')||null});

// Narrative authority.
const narrative={intent:any(corpus,/ActionIntent/i,/player.*intent/i,/intenção/i,/intent:/i),scene:any(corpus,/class SceneDirector/i,/SceneDirector/i),terion:any(corpus,/TERION/i,/2d10/i),facts:any(corpus,/confirmed facts/i,/fatos confirmados/i,/confirmedFacts/i,/facts-only/i),save:any(corpus,/autosave/i,/scheduleCloudSave/i,/SavePoint/i)};
gate('narrativeAuthorityPipeline',Object.values(narrative).every(Boolean),{parts:narrative,missing:Object.entries(narrative).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});

// Mission families.
const missionFamilies={infiltration:[/infiltra/i,/stealth/i],pursuit:[/persegui/i,/pursuit/i,/chase/i],investigation:[/investiga/i,/investigation/i],escort:[/escolta/i,/escort/i],defense:[/defesa/i,/defense/i],rescue:[/resgate/i,/rescue/i],tracking:[/rastream/i,/tracking/i],traps:[/armadilh/i,/trap/i],genjutsu:[/genjutsu/i]};
const missionState=Object.fromEntries(Object.entries(missionFamilies).map(([k,rs])=>[k,rs.some(r=>r.test(corpus))]));
gate('missionGameplayFamilies',Object.values(missionState).every(Boolean),{families:missionState,missing:Object.entries(missionState).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});
const missionScripts=read('data/r33-mission-scripts.js');
const story={substantial:missionScripts.length>1000000,choice:any(missionScripts,/choice/i,/escolha/i),consequence:any(missionScripts,/consequence/i,/consequ[eê]ncia/i),precondition:any(missionScripts,/precondition/i,/pr[eé].?condi/i)||/class MissionPreconditionRegistry/i.test(src),worldChange:any(missionScripts,/worldState/i,/world.*change/i,/mudan[cç]a.{0,20}mundo/i)};
gate('storyArcsPlayable',Object.values(story).every(Boolean),{parts:story,bytes:missionScripts.length,missing:Object.entries(story).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});

// Minigames/training.
const miniFamilies={chakra:[/controle.{0,20}chakra/i,/chakra.{0,20}control/i],seals:[/selos/i,/hand.?seals/i],weapons:[/shuriken/i,/kunai/i],tree:[/árvore/i,/arvore/i,/tree.?climb/i],water:[/água/i,/agua/i,/water.?walk/i],taijutsu:[/taijutsu/i],ninjutsu:[/ninjutsu/i],genjutsu:[/genjutsu/i],sensory:[/sensorial/i,/sensory/i],medical:[/médic/i,/medic/i,/iryo/i],fuinjutsu:[/f[uū]injutsu/i],dojutsu:[/d[oō]jutsu/i,/sharingan/i]};
const miniState=Object.fromEntries(Object.entries(miniFamilies).map(([k,rs])=>[k,rs.some(r=>r.test(corpus))]));
const miniEngine=any(corpus,/MinigameEngine/i,/r41OpenMinigame/i,/minigame.{0,30}(score|errors|time)/i);
gate('minigameFamilies',miniEngine&&Object.values(miniState).every(Boolean),{engine:miniEngine,families:miniState,missing:Object.entries(miniState).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});
const training={time:any(corpus,/treino.{0,100}(60|90|180).{0,30}min/i,/advance.*time/i),progress:any(corpus,/training.{0,80}progress/i,/dom[ií]nio/i,/mastery/i),terion:narrative.terion,save:narrative.save};
gate('trainingOperational',Object.values(training).every(Boolean),{parts:training,missing:Object.entries(training).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});

// Resources, injury, hospital, rest.
const pools={base:/Chakra/i.test(corpus),kurai:/Kurai/i.test(corpus),kusenro:/K[uū]senr[oō]/i.test(corpus),senjutsu:/Senjutsu/i.test(corpus),hud:/HUD/i.test(corpus)};
gate('multiResourceHudAndSave',Object.values(pools).every(Boolean),{pools,missing:Object.entries(pools).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});
gate('persistentInjuries',any(corpus,/persistent.*injur/i,/ferimento persistente/i,/r41PersistentRecoveryCap/i)&&any(corpus,/injured.*limb/i,/membro lesionado/i,/injuries/i));
gate('hospitalOperational',any(corpus,/r41HospitalPlan/i,/diagn[oó]stico/i)&&/hospital/i.test(corpus)&&any(corpus,/World Tick/i,/worldTick/i));
gate('restConsequences',any(corpus,/r27RestUnified/i,/descanso/i)&&any(corpus,/deadline/i,/agenda/i,/schedule/i)&&any(corpus,/World Tick/i,/worldTick/i)&&any(corpus,/embosc/i,/interrupt/i,/risk/i,/risco/i));

// Combat full pipeline, explicit R42 components count.
const combat={intent:narrative.intent,technique:any(corpus,/TechniqueValidation/i,/validateTechnique/i,/t[eé]cnica.{0,20}valid/i),resource:any(corpus,/ResourceValidation/i,/validateResource/i,/chakra.{0,20}(cost|custo)/i),target:/class TargetValidation/i.test(src),terion:narrative.terion,damage:any(corpus,/damage/i,/dano/i),conditions:any(corpus,/conditions/i,/condi[cç][aã]o/i),result:any(corpus,/CombatResult/i,/combat result/i),events:/class CombatEvent/i.test(src),visual:/class VisualStateEngine/i.test(src)||/r41VisualState/i.test(corpus),animation:/class AnimationRegistry/i.test(src)||/AnimationRegistry/i.test(corpus),save:narrative.save};
gate('combatFullPipeline',Object.values(combat).every(Boolean),{parts:combat,missing:Object.entries(combat).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});

// Character appearance and variant model.
const layers=['body','face','hair','eyes','clothes','vest','headband','weapon','accessories','aura','transformations','damageState'];
const layerState=Object.fromEntries(layers.map(k=>[k,new RegExp(k,'i').test(src)]));
gate('characterAppearancePersistent',/class CharacterAppearanceSystem/i.test(src)&&Object.values(layerState).every(Boolean),{layers:layerState,missing:Object.entries(layerState).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});
const variants={CharacterVariant:/class CharacterVariant/i.test(src),AppearancePreset:/class AppearancePreset/i.test(src),UnlockCondition:/class UnlockCondition/i.test(src),TechniqueLoadout:/class TechniqueLoadout/i.test(src),VisualState:/class VisualStateEngine/i.test(src),save:/appearance/i.test(corpus)};
gate('characterVariants',Object.values(variants).every(Boolean),{parts:variants,missing:Object.entries(variants).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});
const trans={mechanical:any(corpus,/transform.{0,80}(bonus|cost|mechanic|estado|state)/i,/d[oō]jutsu.{0,80}(cost|custo|bonus|stage|est[aá]gio)/i),visual:any(corpus,/DOJUTSU/i,/TRANSFORM/i,/transformations/i),narrative:any(corpus,/transform.{0,100}narrat/i,/d[oō]jutsu.{0,100}narrat/i,/narrat.{0,100}(transform|d[oō]jutsu)/i)};
gate('transformationThreeLayers',Object.values(trans).every(Boolean),{parts:trans,missing:Object.entries(trans).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});

// NPC graph + AssetResolver.
const npcFields=['canonicalId','identity','appearance','location','schedule','relationships','services','training','missions','worldState'];
const npcState=Object.fromEntries(npcFields.map(k=>[k,new RegExp(k,'i').test(src)||new RegExp(k,'i').test(data)]));
gate('canonicalNpcGraph',/class CanonicalNpcState/i.test(src)&&Object.values(npcState).every(Boolean),{fields:npcState,missing:Object.entries(npcState).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});
const assetResolver={class:/class AssetResolver/i.test(src)||/AssetResolver/i.test(corpus),canonical:/canonicalId exato|canonicalId/i.test(corpus),alias:/alias/i.test(corpus),state:/entity.*state|estado/i.test(corpus),variant:/variant/i.test(corpus),fallback:/ASSET_FALLBACK/i.test(corpus)};
gate('assetResolverPolicy',Object.values(assetResolver).every(Boolean),{parts:assetResolver,missing:Object.entries(assetResolver).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});

// Complete asset manifest and aliases.
const manifest=json('data/assets/asset-manifest.json'),imageExt=['.png','.jpg','.jpeg','.webp','.gif','.svg','.avif'];
const physical=files('assets').filter(p=>imageExt.some(x=>p.toLowerCase().endsWith(x))),m=Array.isArray(manifest?.assets)?manifest.assets:[],physicalSet=new Set(physical),manifestSet=new Set(m.map(x=>String(x.file||'').replace(/^\//,'')));
const broken=m.filter(x=>!x.id||!x.canonicalId||!x.type||!x.file||!Array.isArray(x.semanticTags)||!x.semanticTags.length||!physicalSet.has(String(x.file).replace(/^\//,''))).slice(0,20);
gate('assetManifestComplete',m.length===physical.length&&physical.every(x=>manifestSet.has(x))&&!broken.length,{manifest:m.length,physical:physical.length,broken:broken.length});
const aliasNames=['characters','npcs','jutsu','items','locations'],aliasState={};for(const n of aliasNames){const v=json(`data/aliases/${n}.json`);aliasState[n]=!!v&&(Array.isArray(v)?v.length>0:Object.keys(v).length>0);}gate('aliasRegistriesComplete',Object.values(aliasState).every(Boolean),{registries:aliasState,missing:Object.entries(aliasState).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});

// External reconciliation.
const external={raw:files('data/external/raw').length>0,normalized:files('data/external/normalized').length>0,conflicts:files('data/external/conflicts').length>0,importers:files('tools/importers',['.mjs','.js']).length>=4,noSilentOverwrite:/silentOverwrite"?:?\s*false|never overwrites|never overwrite|não sobrescrev/i.test(corpus)};
gate('externalReconciliationPipeline',Object.values(external).every(Boolean),{parts:external,missing:Object.entries(external).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});

// GM3 every technique.
const master=read('data/r38-master-2792.json');const gm3={rank:count(master,/"rank"\s*:/g),cost:count(master,/"(?:cost|custo)"\s*:/g),resource:count(master,/"(?:resource|recurso)"\s*:/g),test:count(master,/"(?:test|teste)"\s*:/g),cd:count(master,/"(?:cd|difficulty|dificuldade)"\s*:/g),range:count(master,/"(?:range|alcance)"\s*:/g),duration:count(master,/"(?:duration|duracao|duração)"\s*:/g),requirement:count(master,/"(?:requirement|requisito)"\s*:/g),limit:count(master,/"(?:limit|limite)"\s*:/g),countermeasure:count(master,/"(?:countermeasure|contramedida)"\s*:/g)};
gate('jutsuGm3Complete',Object.values(gm3).every(n=>n>=2792),{counts:gm3,missing:Object.entries(gm3).filter(([,n])=>n<2792).map(([k,n])=>`${k}:${n}/2792`).join(', ')||null});

// Content packs and updater/checksum integrity.
const requiredPacks=['core','naruto','boruto','missions','animations','minigames'];const packState={};for(const id of requiredPacks){const x=json(`content-packs/${id}/manifest.json`);packState[id]=!!x&&!!x.id&&!!x.version&&Array.isArray(x.dependencies)&&Array.isArray(x.assets)&&Array.isArray(x.data)&&typeof x.checksum==='string'&&x.checksum.length>=16&&!/generated-by/.test(x.checksum);}gate('contentPacks',Object.values(packState).every(Boolean),{packs:packState,missing:Object.entries(packState).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});
const updater={checksum:any(corpus,/checksum/i,/sha256/i),dependencies:/dependencies/i.test(packs),integrity:any(corpus,/integrity/i,/integridade/i),rollback:any(corpus,/rollback/i,/preserv.*version/i)};gate('updaterIntegrity',Object.values(updater).every(Boolean),{parts:updater,missing:Object.entries(updater).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});

// Codex, economy, world visual, environmental animation, safe renderers.
const codex={portrait:/portrait|retrato/i.test(corpus),village:/vila|village/i.test(corpus),clan:/cl[aã]|clan/i.test(corpus),rank:/rank/i.test(corpus),natures:/nature|naturezas/i.test(corpus),dojutsu:/d[oō]jutsu|sharingan/i.test(corpus),relations:/relations|rela[cç][oõ]es/i.test(corpus),jutsu:/jutsu/i.test(corpus),worldState:/worldState|estado no seu mundo/i.test(corpus),lastKnown:/último local conhecido|ultimo local conhecido|lastKnownLocation/i.test(corpus),discovered:/hist[oó]ria descoberta|discoveredHistory/i.test(corpus),related:/miss[oõ]es relacionadas|relatedMissions/i.test(corpus),unknown:/\?\?\?/.test(corpus)};gate('codexDiscovery',Object.values(codex).every(Boolean),{parts:codex,missing:Object.entries(codex).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});
const economy={collect:/coleta|collect/i.test(corpus),craft:/craft|fabrica[cç][aã]o/i.test(corpus),fish:/pesca|fish/i.test(corpus),hunt:/ca[cç]a|hunt/i.test(corpus),delivery:/entrega|delivery/i.test(corpus),market:/mercado|market/i.test(corpus),collectibles:/colecion[aá]veis|collectibles/i.test(corpus),reputation:/reputa[cç][aã]o|reputation/i.test(corpus)};gate('secondaryActivities',Object.values(economy).every(Boolean),{parts:economy,missing:Object.entries(economy).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});
const worldVisual={background:/background/i.test(corpus),map:/interactivePoints|map:/i.test(corpus),interactivePoints:/interactivePoints/i.test(corpus),npcPositions:/NPC positions|npcPositions/i.test(corpus),timeVariants:/timeVariants/i.test(corpus),weatherVariants:/weatherVariants/i.test(corpus),music:/music/i.test(corpus),ambientEffects:/ambientEffects/i.test(corpus)};gate('worldVisualLocations',Object.values(worldVisual).every(Boolean),{parts:worldVisual,missing:Object.entries(worldVisual).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});
const ambient={rain:/chuva|rain/i.test(corpus),wind:/vento|wind/i.test(corpus),leaves:/folhas|leaves/i.test(corpus),water:/água|agua|water/i.test(corpus),fire:/fogo|fire/i.test(corpus),lights:/luzes|lights/i.test(corpus),dust:/poeira|dust/i.test(corpus),crowd:/multid[aã]o|crowd/i.test(corpus),smoke:/fumac|smoke/i.test(corpus),flags:/bandeiras|flags/i.test(corpus),chakra:/chakra ambiente|ambient.*chakra/i.test(corpus),reduced:/reduzir anima[cç][oõ]es|reduce.*animation/i.test(corpus)};gate('environmentalAnimations',Object.values(ambient).every(Boolean),{parts:ambient,missing:Object.entries(ambient).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});
const renderers={scene:/SceneRenderer/i.test(corpus),combat:/CombatRenderer/i.test(corpus),minigame:/MinigameRenderer/i.test(corpus),dialogue:/DialogueRenderer/i.test(corpus)};gate('safeSceneRenderers',Object.values(renderers).every(Boolean),{parts:renderers,missing:Object.entries(renderers).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});

// Mobile compact UX.
const mobile={responsive:/@media\s*\([^)]*(max-width|max-device-width)/i.test(corpus),portrait:/portrait/i.test(corpus),pv:/\bPV\b/i.test(corpus),chakra:/chakra/i.test(corpus),actions:/actions|a[cç][oõ]es/i.test(corpus),movement:/movement|movimento/i.test(corpus),reaction:/reaction|rea[cç][aã]o/i.test(corpus),effects:/effects|efeitos/i.test(corpus)};gate('mobileCompactUx',Object.values(mobile).every(Boolean),{parts:mobile,missing:Object.entries(mobile).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});

// Freeze/inventory and automated tests.
const invNames=['assets','npcs','characters','jutsu','items','missions','screens','buttons'];const inv=Object.fromEntries(invNames.map(n=>[n,exists(`audit/inventory/${n}.json`)]));gate('fullInventory',Object.values(inv).every(Boolean),{parts:inv,missing:Object.entries(inv).filter(([,v])=>!v).map(([k])=>k).join(', ')||null});
const automated={integral:exists('.github/workflows/integral-readiness.yml'),browser:files('.github/workflows',['.yml','.yaml']).some(p=>/browser/i.test(read(p))),runtime:files('.github/workflows',['.yml','.yaml']).some(p=>/runtime/i.test(read(p))),docs:files('.github/workflows',['.yml','.yaml']).some(p=>/document/i.test(read(p)))};gate('automatedTestMatrix',Object.values(automated).every(Boolean),{parts:automated});

const ok=!failures.length;const report={generatedAt:new Date().toISOString(),status:ok?'PASS_INTEGRAL_READINESS_V2':'FAIL_INTEGRAL_READINESS_V2',ok,authority:'MD operacional integral NARUTO SHINOBI NO SHO',checks,evidence:{physicalAssets:physical.length,manifestAssets:m.length,gm3},failures};fs.mkdirSync(path.dirname(OUT),{recursive:true});fs.writeFileSync(OUT,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));if(!ok)process.exitCode=1;
