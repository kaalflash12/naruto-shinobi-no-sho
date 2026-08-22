import{fetchJson,writeRaw}from './_shared.mjs';const d=await fetchJson('https://naruto-api.gustanobre.com.br/api/v1/characters');console.log(writeRaw('naruto-api',d));
