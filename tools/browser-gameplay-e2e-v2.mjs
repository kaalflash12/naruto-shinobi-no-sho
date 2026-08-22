import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Executa o mesmo E2E operacional existente, corrigindo apenas a integração
// com a sessão ACCOUNT-UI V2: o token atual é persistido por r41Auth em
// localStorage e exposto por window.r41Auth.token.
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

const tmpDir = path.resolve('.tmp-gameplay-e2e-v2');
fs.mkdirSync(tmpDir, { recursive: true });
const tmpFile = path.join(tmpDir, `browser-gameplay-e2e-v2-${Date.now()}.mjs`);
fs.writeFileSync(tmpFile, patched, 'utf8');

try {
  await import(pathToFileURL(tmpFile).href);
} finally {
  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
}
