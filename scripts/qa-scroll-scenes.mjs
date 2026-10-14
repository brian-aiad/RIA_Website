import { chromium, webkit } from 'playwright';
import { readFileSync } from 'node:fs';

const base = process.env.QA_BASE_URL ?? 'http://127.0.0.1:4174';
const routes = [...readFileSync('public/sitemap.xml', 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname).concat('/404');
const failures = [];
let checks = 0;
const check = (condition, message) => { checks++; if (!condition) failures.push(message); };
for (const [engine, width] of [[chromium, 1440], [webkit, 390]]) {
  const browser = await engine.launch();
  try {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const route of routes) {
      await page.goto(base + route);
      await page.locator('.route-frame[data-motion-state="ready"]').waitFor();
      await page.evaluate(async () => {
        document.documentElement.style.scrollBehavior = 'auto';
        const distance = document.documentElement.scrollHeight - innerHeight;
        for (let step = 0; step <= 32; step++) {
          scrollTo(0, distance * step / 32);
          await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        }
      });
      await page.waitForTimeout(1150);
      const state = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - innerWidth,
        stale: [...document.querySelectorAll('.motion-reveal')].filter(n => getComputedStyle(n).transform !== 'none').map(n => n.className),
        hidden: [...document.querySelectorAll('main h1,main h2,main p')].filter(n => getComputedStyle(n).opacity === '0' || getComputedStyle(n).visibility === 'hidden').length,
        progress: new DOMMatrixReadOnly(getComputedStyle(document.querySelector('.page-scroll-progress')).transform).a,
        progressVisible: getComputedStyle(document.querySelector('.page-scroll-progress')).display !== 'none',
      }));
      check(state.overflow <= 1, `${width} ${route}: horizontal overflow ${state.overflow}`);
      check(!state.stale.length, `${width} ${route}: unfinished section motion ${state.stale}`);
      check(!state.hidden, `${width} ${route}: meaningful content hidden`);
      if (width > 959) check(state.progress > .98, `${width} ${route}: reading indicator did not finish (${state.progress})`);
      else check(!state.progressVisible, `${width} ${route}: compact layout retained a scroll-linked indicator`);
    }
    await page.goto(base + '/services');
    await page.locator('.route-frame[data-motion-state="ready"]').waitFor();
    const cards = page.locator('.service-ledger');
    await cards.first().evaluate(n => scrollTo({ top: scrollY + n.getBoundingClientRect().top - innerHeight * .8, behavior: "instant" }));
    await page.waitForTimeout(1000);
    check(await cards.last().evaluate(n => getComputedStyle(n).transform !== 'none'), `${width}: last service card animated before entering view`);
    await cards.last().scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    check(await cards.last().evaluate(n => getComputedStyle(n).transform === 'none'), `${width}: last service card did not settle after entering`);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(100);
    check(await page.locator('.motion-managed').count() === 0, `${width}: reduced motion did not remove active animations`);
    check(await page.locator('.page-scroll-progress').evaluate(n => getComputedStyle(n).display === 'none'), `${width}: reduced motion retained decorative progress`);
    check(!errors.length, `${width}: runtime errors ${errors.join(' | ')}`);
  } finally { await browser.close(); }
}
console.log(JSON.stringify({ routes: routes.length, checks, failures }, null, 2));
if (failures.length) process.exitCode = 1;
