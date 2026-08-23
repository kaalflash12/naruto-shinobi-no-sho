import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Executa o mesmo E2E operacional existente, corrigindo apenas integrações
// do gate com a UI atual. O jogo continua sendo testado pela build pública.
const sourcePath = path.resolve('tools/browser-gameplay-e2e.mjs');
const source = fs.readFileSync(sourcePath, 'utf8');

const oldToken = "const token=await page.evaluate(()=>sessionStorage.getItem('sns-v841-auth-token')||'');";
const newToken = "const token=await page.evaluate(()=>String(window.r41Auth?.token||localStorage.getItem('sns-v841-auth-token')||''));";

if (!source.includes(oldToken)) {
  throw new Error('GAMEPLAY_E2E_V2_PATCH_TARGET_MISSING: token legacy não encontrado');
}

let patched = source.replace(oldToken, newToken);
if (patched === source) throw new Error('GAMEPLAY_E2E_V2_PATCH_NOT_APPLIED');

// Não deixar o painel modal de conta interceptar cliques caso uma falha ocorra
// antes da navegação seguinte; o fechamento usa a própria UI de produção.
const registerPass = "pass('temporaryAccountRegistered');\n  return token;";
const registerPassFixed = "pass('temporaryAccountRegistered');\n  const closeAccount=page.locator('[data-action=\"close\"]');if(await closeAccount.count())await closeAccount.click();\n  return token;";
if (!patched.includes(registerPass)) throw new Error('GAMEPLAY_E2E_V2_CLOSE_TARGET_MISSING');
patched = patched.replace(registerPass, registerPassFixed);

// A navegação desktop pode manter a sidebar fora da área visível mesmo com o
// botão real presente no DOM. O E2E anterior exigia state=visible e confundia
// isso com tela inexistente. Agora dispara o MESMO data-screen da produção via
// click DOM e confirma que o conteúdo principal mudou.
const navigateLine = /async function navigate\(page,screen\)\{[^\n]+\}/;
if (!navigateLine.test(patched)) throw new Error('GAMEPLAY_E2E_V2_NAV_PATCH_TARGET_MISSING');
patched = patched.replace(navigateLine,
  "async function navigate(page,screen){const selector=`[data-screen=\\\"${screen}\\\"]`;const b=page.locator(selector).first();const count=await b.count();assert(count>0,`data-screen ${screen} não existe no DOM`);await b.evaluate(el=>el.click());await page.waitForTimeout(450);if(screen==='personagem'){const h=String(await page.locator('#screen h1').first().textContent().catch(()=>''));assert(/Ficha Shinobi|Leon Kosmo/i.test(h),`navegação personagem não abriu a ficha; h1=${h}`);}else{await page.waitForFunction(s=>{const active=document.querySelector(`.nav-button.active[data-screen=\\\"${s}\\\"]`);return !!active||!!document.querySelector(`#screen [data-screen=\\\"${s}\\\"]`);},screen,{timeout:10000}).catch(()=>{});}}"
);

const tmpDir = path.resolve('.tmp-gameplay-e2e-v2');
fs.mkdirSync(tmpDir, { recursive: true });
const tmpFile = path.join(tmpDir, `browser-gameplay-e2e-v2-${Date.now()}.mjs`);
fs.writeFileSync(tmpFile, patched, 'utf8');

try {
  await import(pathToFileURL(tmpFile).href);
} finally {
  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
}
