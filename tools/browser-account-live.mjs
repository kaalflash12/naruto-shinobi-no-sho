import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
const site=process.env.PUBLIC_GAME_URL||"https://kaalflash12.github.io/naruto-shinobi-no-sho/";
const reportPath=process.env.BROWSER_ACCOUNT_REPORT||"audit/BROWSER-ACCOUNT-LIVE.json";
const suffix=`${Date.now().toString(36)}${Math.random().toString(36).slice(2,7)}`;
const username=`ui_${suffix}`.slice(0,28),email=`${username}@example.com`,password=`Aa!7_${suffix}_pw`;
const failures=[],checks={},consoleErrors=[],pageErrors=[];
function assert(cond,msg){if(!cond)throw new Error(msg);}
const browser=await chromium.launch({headless:true});const context=await browser.newContext({viewport:{width:1365,height:900}});const page=await context.newPage();
page.on("pageerror",e=>pageErrors.push(String(e)));page.on("console",m=>{if(m.type()==="error")consoleErrors.push(m.text());});
try{
 const resp=await page.goto(`${site}?account=1&tab=register&v=${Date.now()}`,{waitUntil:"domcontentloaded",timeout:90000});assert(resp?.ok(),`site HTTP ${resp?.status()}`);
 await page.waitForSelector('[data-testid="sns-account-panel"]',{timeout:30000});assert((await page.evaluate(()=>window.SNS_ACCOUNT_UI?.build))==="ACCOUNT-UI-20260822-V2","account UI V2 ausente");checks.publicAccountUiLoaded=true;
 const form=page.locator('[data-form="register"]');await form.locator('[data-field="username"]').fill(username);await form.locator('[data-field="displayName"]').fill("Browser E2E");await form.locator('[data-field="email"]').fill(email);await form.locator('[data-field="password"]').fill(password);await form.locator('[data-field="confirm"]').fill(password);await form.locator('button[type="submit"]').click();await page.waitForSelector('[data-testid="sns-account-authenticated"]',{timeout:30000});checks.registerUi=true;assert((await page.locator('[data-testid="sns-account-message"]').innerText()).includes("CÓDIGO DE RECUPERAÇÃO"),"UI não mostrou código de recuperação");
 await page.reload({waitUntil:"domcontentloaded"});await page.waitForTimeout(2000);const accountButton=page.locator("#sns-account-button");assert((await accountButton.innerText()).startsWith("Conta:"),"sessão não persistiu após reload");checks.sessionPersistsReload=true;assert(await accountButton.isVisible(),"botão da conta não está visível após reload");checks.accountButtonVisibleAfterReload=true;
 await accountButton.click();await page.waitForSelector('[data-testid="sns-account-authenticated"]');await page.locator('[data-action="logout"]').click();await page.waitForSelector('[data-form="login"]');checks.logoutUi=true;
 const login=page.locator('[data-form="login"]');await login.locator('[data-field="identifier"]').fill(username);await login.locator('[data-field="password"]').fill(password);await login.locator('button[type="submit"]').click();await page.waitForSelector('[data-testid="sns-account-authenticated"]',{timeout:30000});checks.loginUi=true;
 page.once("dialog",d=>d.accept());await page.locator('[data-action="delete-account"]').click();await page.waitForSelector('[data-form="register"]',{timeout:30000});checks.deleteUi=true;assert((await page.locator("#sns-account-button").innerText()).includes("Entrar"),"botão não voltou a estado desconectado");
 const fatal=consoleErrors.filter(x=>/uncaught|referenceerror|syntaxerror|typeerror/i.test(x));assert(pageErrors.length===0,`page errors: ${pageErrors.join(" | ")}`);assert(fatal.length===0,`console fatal: ${fatal.join(" | ")}`);
}catch(err){failures.push(String(err?.stack||err));}
finally{const doc={generatedAt:new Date().toISOString(),status:failures.length?"FAIL_BROWSER_ACCOUNT_LIVE":"PASS_BROWSER_ACCOUNT_LIVE",ok:failures.length===0,site,checks,pageErrors,consoleErrors:consoleErrors.slice(0,30),failures};fs.mkdirSync(path.dirname(reportPath),{recursive:true});fs.writeFileSync(reportPath,JSON.stringify(doc,null,2)+"\n");console.log(JSON.stringify(doc,null,2));await browser.close();if(failures.length)process.exitCode=1;}