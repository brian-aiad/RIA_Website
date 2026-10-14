import { chromium, webkit } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
const base = process.env.QA_GATE_URL ?? 'http://127.0.0.1:4175';
await mkdir('output/playwright', { recursive: true });
const requestedPairs = [[320,568],[360,640],[375,667],[390,844],[412,915],[430,932],[568,320],[768,1024],[820,1180],[1180,820],[1536,864],[1024,768],[1366,768],[1440,900],[1920,1080],[844,390]];
for (const [engine, pairs] of [[chromium, requestedPairs], [webkit, [[390,844],[430,932],[844,390]]]]) {
  const browser = await engine.launch();
  for (const [width, height] of pairs) {
    const context = await browser.newContext({ viewport: { width, height } });
    const page = await context.newPage();
    await page.goto(base);
    assert.match(await page.title(), /Coming Soon/);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Overflow at ${width}`);
    assert.equal(await page.locator('h1').evaluate(n => getComputedStyle(n).opacity), '1');
    await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
    assert.equal(await page.locator('.license').evaluate(n => n.getBoundingClientRect().bottom <= innerHeight + 1), true, `Footer cannot be reached at ${width}×${height}`);
    for (const selector of ['a[href^="tel:"]', 'a[href^="sms:"]', 'a[href^="mailto:"]']) {
      const link = page.locator(selector);
      await link.focus();
      assert.equal(await link.evaluate(n => n === document.activeElement && n.getBoundingClientRect().height >= 38), true, `Contact target at ${width}`);
    }
    if (width === 390 || width === 1440) {
      const audit = await new AxeBuilder({ page }).analyze();
      assert.deepEqual(audit.violations.map(v => v.id), []);
      await page.screenshot({ path: `output/playwright/gate-${engine.name()}-${width}.png`, fullPage: true });
      await page.emulateMedia({ reducedMotion: 'reduce', forcedColors: 'active' });
      assert.equal(await page.locator('h1').isVisible(), true);
      assert.equal(await page.locator('a[href^="sms:"]').isVisible(), true);
    }
    await context.close();
  }
  await browser.close();
}
console.log('Coming Soon: 16 requested viewport pairs plus 3 iPhone WebKit viewport pairs, desktop/iPhone accessibility, keyboard contacts, reduced motion, forced colors passed.');
