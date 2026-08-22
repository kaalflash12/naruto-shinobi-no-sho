import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const writeJson=(p,v)=>{fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,JSON.stringify(v,null,2)+'\n');};
const readJson=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const slug=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,'')||'unknown';
const walkFiles=dir=>{if(!fs.existsSync(dir))return[];const out=[];for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())out.push(...walkFiles(p));else out.push(p.replaceAll('\\','/'));}return out;};
const imageExt=new Set(['.png','.jpg','.jpeg','.webp','.gif','.svg','.avif']);

function inferAsset(file){
  const rel=file.replaceAll('\\','/');
  const lower=rel.toLowerCase();
  const base=path.basename(rel,path.extname(rel));
  const canonicalId=slug(base);
  let type='visual',entityType='generic';
  if(/\/jutsu|technique|skills?\//.test(lower)){type='jutsu';entityType='technique';}
  else if(/\/items?|weapons?|equipment/.test(lower)){type='item';entityType='item';}
  else if(/\/maps?|locations?|world/.test(lower)){type='location';entityType='location';}
  else if(/portraits?|characters?|npcs?/.test(lower)){type='portrait';entityType='character_or_npc';}
  else if(/enemies?/.test(lower)){type='portrait';entityType='enemy';}
  else if(/ui|icon|hud/.test(lower)){type='ui';entityType='interface';}
  else if(/events?/.test(lower)){type='event';entityType='event';}
  const semanticTags=[...new Set(rel.replace(/^assets\//,'').replace(/\.[^.]+$/,'').split(/[\/_.\-\s]+/).map(x=>slug(x)).filter(x=>x&&x!=='assets'))];
  return {id:slug(rel.replace(/^assets\//,'').replace(/\.[^.]+$/,'')),canonicalId,type,entityType,state:'default',variant:'project',file:rel,semanticTags,source:'local-project-inventory',license:'project',approved:true};
}

function rebuildAssetManifest(){
  const old=fs.existsSync('data/assets/asset-manifest.json')?readJson('data/assets/asset-manifest.json'):{assets:[]};
  const byFile=new Map((old.assets||[]).map(x=>[String(x.file||'').replace(/^\//,''),x]));
  const physical=walkFiles('assets').filter(f=>imageExt.has(path.extname(f).toLowerCase())).sort();
  const assets=physical.map(file=>{
    const prev=byFile.get(file);
    const inferred=inferAsset(file);
    return prev?{...inferred,...prev,file,semanticTags:Array.isArray(prev.semanticTags)&&prev.semanticTags.length?prev.semanticTags:inferred.semanticTags,approved:prev.approved!==false}:inferred;
  });
  writeJson('data/assets/asset-manifest.json',{version:'R42-INTEGRAL-ASSET-MANIFEST-2026-08-22',policy:'Asset local aprovado vence alias, externo e placeholder. Todos os assets físicos são inventariados; fallback conhecido é telemetrado.',count:assets.length,assets});
  return assets;
}

function nameOf(o){
  if(!o||typeof o!=='object')return'';
  for(const k of ['name','nome','title','titulo','título','canonicalName','displayName','jutsu','technique'])if(typeof o[k]==='string'&&o[k].trim())return o[k].trim();
  return'';
}
function isTechnique(o){return o&&typeof o==='object'&&['rank','cost','resource','range','duration','requirement','limit'].every(k=>Object.prototype.hasOwnProperty.call(o,k));}
function rankCd(rank){const r=String(rank??'').toUpperCase(); if(/\bS\b|S-RANK/.test(r))return16;if(/\bA\b|A-RANK/.test(r))return14;if(/\bB\b|B-RANK/.test(r))return13;if(/\bC\b|C-RANK/.test(r))return12;if(/\bD\b|D-RANK/.test(r))return11;if(/\bE\b|E-RANK/.test(r))return10;return12;}
function mechanicalProfile(o){
  const blob=JSON.stringify(o).toLowerCase();
  if(/genjutsu|ilusion|ilusão/.test(blob))return {test:'TERION 2D10 + Mente/Espírito + Genjutsu',countermeasure:'Teste oposto de Mente/Espírito, Kai/liberação de genjutsu, quebra de concentração ou contramedida descrita.'};
  if(/taijutsu|corpo a corpo|melee/.test(blob))return {test:'TERION 2D10 + Corpo/Técnica + Taijutsu',countermeasure:'Esquiva ou Bloqueio válido; reação técnica quando aplicável.'};
  if(/medic|iry[oō]|cura|healing/.test(blob))return {test:'TERION 2D10 + Técnica/Mente + Ninjutsu Médico',countermeasure:'Interromper contato/conjuração; resistência do alvo quando a técnica for hostil.'};
  if(/f[uū]injutsu|selamento|seal/.test(blob))return {test:'TERION 2D10 + Técnica/Mente + Fūinjutsu',countermeasure:'Evitar requisito de contato/área, romper selo válido ou usar contrasselo conforme efeito.'};
  if(/ninjutsu|katon|suiton|raiton|doton|fuuton|futon|jiton|mokuton/.test(blob))return {test:'TERION 2D10 + Técnica + Ninjutsu',countermeasure:'Esquiva, Cobertura, Bloqueio permitido ou técnica defensiva/reação válida conforme alcance e efeito.'};
  return {test:'TERION 2D10 + Técnica + perícia/categoria aplicável',countermeasure:'Esquiva, Bloqueio, Cobertura ou técnica de reação válida conforme descrição, alcance e efeito.'};
}
function normalizeMasterAndJutsuAliases(){
  const p='data/r38-master-2792.json';
  const rootData=readJson(p); let techniques=0; const aliases={};
  const visit=v=>{
    if(Array.isArray(v)){for(const x of v)visit(x);return;}
    if(!v||typeof v!=='object')return;
    if(isTechnique(v)){
      techniques++;
      const profile=mechanicalProfile(v);
      if(v.test==null)v.test=profile.test;
      if(v.cd==null)v.cd=rankCd(v.rank);
      if(v.countermeasure==null)v.countermeasure=profile.countermeasure;
      const n=nameOf(v); if(n){const id=slug(v.canonicalId??v.id??n);aliases[n]=id;aliases[id]=id;}
    }
    for(const x of Object.values(v))visit(x);
  };
  visit(rootData);
  fs.writeFileSync(p,JSON.stringify(rootData,null,2)+'\n');
  writeJson('data/aliases/jutsu.json',aliases);
  return {techniques,aliases:Object.keys(aliases).length};
}

function buildItemAliases(assetManifest){
  const aliases={};
  for(const a of assetManifest){
    if(a.entityType!=='item'&&a.type!=='item')continue;
    const base=path.basename(a.file,path.extname(a.file)).replace(/[_-]+/g,' ').trim();
    const pretty=base.replace(/\b\w/g,c=>c.toUpperCase());
    aliases[pretty]=a.canonicalId; aliases[base]=a.canonicalId; aliases[a.canonicalId]=a.canonicalId;
  }
  writeJson('data/aliases/items.json',aliases);
  return Object.keys(aliases).length;
}

function buildExternalPipeline(){
  const sources=[
    {id:'narutodb',kind:'api',url:'https://narutodb.xyz/api/character',repo:'https://github.com/sriniously/narutodb-website',use:'identity roster relations codex'},
    {id:'naruto-api',kind:'api',url:'https://naruto-api.gustanobre.com.br/api/v1/characters',repo:'https://github.com/gustavonobreza/naruto-api',use:'characters clans biju metadata'},
    {id:'naruto-br-api',kind:'repository',url:'https://api.github.com/repos/WillianDDaniel/naruto-br-api',repo:'https://github.com/WillianDDaniel/naruto-br-api',use:'PT-BR characters villages metadata'},
    {id:'characters-api',kind:'repository',url:'https://api.github.com/repos/muhammadpauzi/naruto-api',repo:'https://github.com/muhammadpauzi/naruto-api',use:'character candidate metadata'}
  ];
  writeJson('data/external/raw/source-registry.json',{generatedAt:new Date().toISOString(),rule:'External data never overwrites validated SNS directly.',sources});
  writeJson('data/external/normalized/baseline.json',{generatedAt:new Date().toISOString(),canonicalAuthority:'NARUTO SHINOBI NO SHO',normalization:{canonicalId:'unicode-normalized lower snake_case',aliases:'source names resolve to SNS canonical ids',precedence:['validated-sns','approved-local','external-candidate']},sources:sources.map(x=>x.id)});
  writeJson('data/external/conflicts/policy.json',{generatedAt:new Date().toISOString(),policy:'Every external conflict is explicit. Existing validated SNS values win unless manually approved.',statuses:['candidate','same','conflict','approved','rejected'],silentOverwrite:false});
  const shared=`import fs from 'node:fs';import path from 'node:path';\nexport async function fetchJson(url){const r=await fetch(url,{headers:{accept:'application/json','user-agent':'Naruto-Shinobi-No-Sho-Importer'}});if(!r.ok)throw new Error(\`HTTP \${r.status} \${url}\`);return r.json();}\nexport function writeRaw(id,data){const p=path.join('data','external','raw',id+'.json');fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,JSON.stringify({source:id,fetchedAt:new Date().toISOString(),data},null,2)+'\\n');return p;}\n`;
  fs.mkdirSync('tools/importers',{recursive:true}); fs.writeFileSync('tools/importers/_shared.mjs',shared);
  fs.writeFileSync('tools/importers/narutodb.mjs',`import{fetchJson,writeRaw}from './_shared.mjs';let page=1,characters=[];for(;;){const d=await fetchJson('https://narutodb.xyz/api/character?page='+page+'&limit=100');const rows=d.characters||[];characters.push(...rows);if(!rows.length||characters.length>=Number(d.totalCharacters||0)||page>=50)break;page++;}console.log(writeRaw('narutodb',{characters,count:characters.length}));\n`);
  fs.writeFileSync('tools/importers/naruto-api.mjs',`import{fetchJson,writeRaw}from './_shared.mjs';const d=await fetchJson('https://naruto-api.gustanobre.com.br/api/v1/characters');console.log(writeRaw('naruto-api',d));\n`);
  fs.writeFileSync('tools/importers/naruto-br-api.mjs',`import{fetchJson,writeRaw}from './_shared.mjs';const d=await fetchJson('https://api.github.com/repos/WillianDDaniel/naruto-br-api');console.log(writeRaw('naruto-br-api',{repository:d.full_name,defaultBranch:d.default_branch,description:d.description,updatedAt:d.updated_at}));\n`);
  fs.writeFileSync('tools/importers/characters-api.mjs',`import{fetchJson,writeRaw}from './_shared.mjs';const d=await fetchJson('https://api.github.com/repos/muhammadpauzi/naruto-api');console.log(writeRaw('characters-api',{repository:d.full_name,defaultBranch:d.default_branch,description:d.description,updatedAt:d.updated_at}));\n`);
}

function buildContentPacks(){
  const packs=['core','naruto','boruto','missions','animations','minigames'];
  for(const id of packs){const dir=path.join('content-packs',id);fs.mkdirSync(dir,{recursive:true});const data=id==='core'?['app.js','data/catalogo.json']:id==='missions'?['data/r33-mission-scripts.js']:[];writeJson(path.join(dir,'manifest.json'),{id:id==='core'?'core-naruto':id,version:'1.0.0',dependencies:id==='core'?[]:['core-naruto'],assets:[],data,checksum:'generated-by-integrity-gate'});}
}

function buildAuditInventories(assetManifest){
  fs.mkdirSync('audit/inventory',{recursive:true});
  writeJson('audit/inventory/assets.json',{count:assetManifest.length,items:assetManifest.map(x=>({id:x.id,file:x.file,type:x.type,canonicalId:x.canonicalId,status:x.approved?'functional':'incomplete'}))});
  for(const name of ['npcs','characters','jutsu','items','missions','screens','buttons']){
    const existing=fs.existsSync(`audit/${name}.json`)?readJson(`audit/${name}.json`):null;
    writeJson(`audit/inventory/${name}.json`,existing??{status:'inventory-derived',source:name==='jutsu'?'data/r38-master-2792.json':name==='missions'?'data/r33-mission-scripts.js':'runtime/generated',items:[]});
  }
}

const manifest=rebuildAssetManifest();
const gm3=normalizeMasterAndJutsuAliases();
const itemAliasCount=buildItemAliases(manifest);
buildExternalPipeline();
buildContentPacks();
buildAuditInventories(manifest);
console.log(JSON.stringify({ok:true,assets:manifest.length,gm3,itemAliasCount},null,2));
