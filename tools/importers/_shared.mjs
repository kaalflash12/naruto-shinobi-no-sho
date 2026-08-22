import fs from 'node:fs';import path from 'node:path';
export async function fetchJson(url){const r=await fetch(url,{headers:{accept:'application/json','user-agent':'Naruto-Shinobi-No-Sho-Importer'}});if(!r.ok)throw new Error(`HTTP ${r.status} ${url}`);return r.json();}
export function writeRaw(id,data){const p=path.join('data','external','raw',id+'.json');fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,JSON.stringify({source:id,fetchedAt:new Date().toISOString(),data},null,2)+'\n');return p;}
