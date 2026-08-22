import fs from 'node:fs';

const FILE='data/r38-master-2792.json';
const OUT='audit/GM3-REPAIR.json';
const data=JSON.parse(fs.readFileSync(FILE,'utf8'));
const wanted=['rank','cost','resource','range','duration','requirement','limit'];
const alias={rank:['rank'],cost:['cost','custo'],resource:['resource','recurso'],range:['range','alcance'],duration:['duration','duracao','duração'],requirement:['requirement','requisito'],limit:['limit','limite']};
const aliasesFlat=new Set(Object.values(alias).flat());
const slug=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,'');

function ownMapped(obj,key){return alias[key].find(k=>Object.prototype.hasOwnProperty.call(obj,k));}
function addCounts(a,b){for(const k of wanted)a[k]=(a[k]||0)+(b[k]||0);return a;}
function subtreeCounts(v){
  const c=Object.fromEntries(wanted.map(k=>[k,0]));
  if(!v||typeof v!=='object')return c;
  if(Array.isArray(v)){for(const x of v)addCounts(c,subtreeCounts(x));return c;}
  for(const k of wanted)if(ownMapped(v,k))c[k]++;
  for(const [k,x] of Object.entries(v))if(!aliasesFlat.has(k))addCounts(c,subtreeCounts(x));
  return c;
}
const countCache=new WeakMap();
function counts(v){if(!v||typeof v!=='object')return Object.fromEntries(wanted.map(k=>[k,0]));if(countCache.has(v))return countCache.get(v);const c=subtreeCounts(v);countCache.set(v,c);return c;}
function complete(c){return wanted.every(k=>(c[k]||0)>=1);}
function minimalContainers(v,path='$',out=[]){
  if(!v||typeof v!=='object')return out;
  const c=counts(v);
  if(!complete(c))return out;
  const children=Array.isArray(v)?v:Object.values(v).filter(x=>x&&typeof x==='object');
  let childComplete=false;
  for(let i=0;i<children.length;i++)if(complete(counts(children[i]))){childComplete=true;minimalContainers(children[i],`${path}/${i}`,out);}
  if(!childComplete&&!Array.isArray(v))out.push({obj:v,path,counts:c});
  return out;
}
function findDeep(obj,names){
  const seen=new Set();
  function walk(v){
    if(!v||typeof v!=='object'||seen.has(v))return undefined;seen.add(v);
    if(!Array.isArray(v))for(const k of names)if(Object.prototype.hasOwnProperty.call(v,k)&&v[k]!=null&&String(v[k]).trim()!=='')return v[k];
    for(const x of Object.values(v)){const r=walk(x);if(r!==undefined)return r;}
  }
  return walk(obj);
}
function profile(obj){
  const blob=JSON.stringify(obj).toLowerCase();
  if(/genjutsu|ilusion|ilusão/.test(blob))return {test:'TERION 2D10 + Mente/Espírito + Genjutsu',countermeasure:'Teste oposto de Mente/Espírito; Kai/liberação de genjutsu, quebra de concentração ou contramedida descrita.'};
  if(/taijutsu|melee|corpo a corpo/.test(blob))return {test:'TERION 2D10 + Corpo/Técnica + Taijutsu',countermeasure:'Esquiva ou Bloqueio válido; reação técnica quando aplicável.'};
  if(/medic|iry[oō]|cura|healing/.test(blob))return {test:'TERION 2D10 + Técnica/Mente + Ninjutsu Médico',countermeasure:'Interromper contato/conjuração; resistência do alvo quando a técnica for hostil.'};
  if(/f[uū]injutsu|selamento|seal/.test(blob))return {test:'TERION 2D10 + Técnica/Mente + Fūinjutsu',countermeasure:'Evitar requisito de contato/área, romper selo válido ou usar contrasselo conforme efeito.'};
  if(/ninjutsu|katon|suiton|raiton|doton|fuuton|futon|mokuton|jiton/.test(blob))return {test:'TERION 2D10 + Técnica + Ninjutsu',countermeasure:'Esquiva, Cobertura, Bloqueio permitido ou técnica defensiva/reação válida conforme alcance e efeito.'};
  return {test:'TERION 2D10 + Técnica + perícia/categoria aplicável',countermeasure:'Esquiva, Bloqueio, Cobertura ou técnica de reação válida conforme descrição, alcance e efeito.'};
}
function cdFromRank(rank){const r=String(rank??'').toUpperCase();if(/(^|\W)S(\W|$)|S-RANK/.test(r))return16;if(/(^|\W)A(\W|$)|A-RANK/.test(r))return14;if(/(^|\W)B(\W|$)|B-RANK/.test(r))return13;if(/(^|\W)C(\W|$)|C-RANK/.test(r))return12;if(/(^|\W)D(\W|$)|D-RANK/.test(r))return11;if(/(^|\W)E(\W|$)|E-RANK/.test(r))return10;return12;}

let containers=minimalContainers(data);
// If one wrapper contains an array of all techniques, descend into array members that carry at least one rank/cost/resource trio.
if(containers.length!==2792){
  containers=[];
  const seen=new Set();
  function walk(v,path='$'){
    if(!v||typeof v!=='object'||seen.has(v))return;seen.add(v);
    if(!Array.isArray(v)){
      const c=counts(v);const triple=(c.rank||0)>0&&(c.cost||0)>0&&(c.resource||0)>0;
      if(triple&&c.rank===1&&c.cost===1&&c.resource===1&&c.range===1&&c.duration===1&&c.requirement===1&&c.limit===1){containers.push({obj:v,path,counts:c});return;}
    }
    if(Array.isArray(v))v.forEach((x,i)=>walk(x,`${path}/${i}`));else for(const [k,x] of Object.entries(v))walk(x,`${path}/${k}`);
  }
  walk(data);
}

const techniqueAliases={};
for(const c of containers){
  const o=c.obj,p=profile(o),rank=findDeep(o,['rank']);
  if(o.test==null)o.test=p.test;
  if(o.cd==null)o.cd=cdFromRank(rank);
  if(o.countermeasure==null)o.countermeasure=p.countermeasure;
  const name=findDeep(o,['name','nome','title','titulo','título','canonicalName','displayName','jutsu','technique']);
  const id=slug(findDeep(o,['canonicalId','id','slug'])??name??c.path);
  if(name)techniqueAliases[String(name)]=id;
  if(id)techniqueAliases[id]=id;
}

fs.writeFileSync(FILE,JSON.stringify(data,null,2)+'\n');
fs.writeFileSync('data/aliases/jutsu.json',JSON.stringify(techniqueAliases,null,2)+'\n');
const finalText=fs.readFileSync(FILE,'utf8');
const count=re=>(finalText.match(re)||[]).length;
const report={generatedAt:new Date().toISOString(),containers:containers.length,aliases:Object.keys(techniqueAliases).length,counts:{rank:count(/"rank"\s*:/g),cost:count(/"(?:cost|custo)"\s*:/g),resource:count(/"(?:resource|recurso)"\s*:/g),test:count(/"(?:test|teste)"\s*:/g),cd:count(/"(?:cd|difficulty|dificuldade)"\s*:/g),range:count(/"(?:range|alcance)"\s*:/g),duration:count(/"(?:duration|duracao|duração)"\s*:/g),requirement:count(/"(?:requirement|requisito)"\s*:/g),limit:count(/"(?:limit|limite)"\s*:/g),countermeasure:count(/"(?:countermeasure|contramedida)"\s*:/g)},sampleContainers:containers.slice(0,12).map(x=>({path:x.path,keys:Object.keys(x.obj),name:findDeep(x.obj,['name','nome','title','titulo','displayName']),rank:findDeep(x.obj,['rank'])}))};
fs.mkdirSync('audit',{recursive:true});fs.writeFileSync(OUT,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
if(containers.length!==2792||report.counts.test<2792||report.counts.cd<2792||report.counts.countermeasure<2792)process.exitCode=2;
