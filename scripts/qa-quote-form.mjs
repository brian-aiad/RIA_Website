import {chromium,webkit} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
const base=process.env.QA_BASE_URL??'http://127.0.0.1:4174';let checks=0;const failures=[];
function check(ok,label){checks++;if(!ok)failures.push(label)}
for(const [name,engine,width] of [['desktop',chromium,1440],['iphone',webkit,390]]){
 const browser=await engine.launch();const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});const page=await context.newPage();
 await page.goto(`${base}/contact?coverage=business#quote-request`,{waitUntil:'networkidle'});
 check(await page.locator('#quote-coverage').inputValue()==='business',`${name}: preselection`);
 await page.getByRole('button',{name:'Send quote request'}).click();check(await page.locator('#quote-name').getAttribute('aria-invalid')==='true',`${name}: required validation`);check(await page.locator('#quote-name').evaluate(e=>e===document.activeElement),`${name}: error focus`);
 let requests=[];let allowSuccess=false;let delay=false;
 await page.route('**/api/quote',async route=>{requests.push(route.request().postDataJSON());if(delay)await new Promise(r=>setTimeout(r,200));await route.fulfill({status:allowSuccess?200:503,contentType:'application/json',body:JSON.stringify({ok:allowSuccess})});});
 await page.locator('#quote-name').fill('Test Visitor');await page.locator('#quote-email').fill('visitor@example.com');await page.locator('#quote-message').fill('A test request that will never leave this browser.');
 await page.getByRole('button',{name:'Send quote request'}).click();await page.getByText('Online requests are temporarily unavailable.',{exact:false}).waitFor();check(await page.locator('#quote-name').inputValue()==='Test Visitor',`${name}: preserve error input`);
 allowSuccess=true;delay=true;await page.getByRole('button',{name:'Send quote request'}).click();check(await page.getByRole('button',{name:'Sending request',exact:true}).isDisabled(),`${name}: pending duplicate guard`);await page.getByRole('heading',{name:'Thank you for reaching out.'}).waitFor();check(requests.length===2,`${name}: request count`);check(requests[0].idempotencyKey===requests[1].idempotencyKey,`${name}: retry key`);check(await page.locator('.quote-request__success').evaluate(e=>e===document.activeElement),`${name}: success focus`);
 const scan=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();check(scan.violations.length===0,`${name}: success accessibility ${JSON.stringify(scan.violations.map(v=>v.id))}`);
 await page.reload({waitUntil:'networkidle'});const initial=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();check(initial.violations.length===0,`${name}: form accessibility ${JSON.stringify(initial.violations.map(v=>v.id))}`);
 check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${name}: overflow`);
 await browser.close();
}
console.log(JSON.stringify({checks,failures},null,2));if(failures.length)process.exitCode=1;
