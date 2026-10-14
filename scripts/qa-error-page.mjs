import { chromium, webkit } from 'playwright';
import assert from 'node:assert/strict';
const base = process.env.QA_BASE_URL ?? 'http://127.0.0.1:4177';
let checks = 0;
for (const engine of [chromium, webkit]) {
  const browser = await engine.launch();
  try {
    for (const javaScriptEnabled of [true, false]) {
      const page = await browser.newPage({ viewport: {width: 390, height: 844}, javaScriptEnabled, reducedMotion: 'reduce' });
      await page.goto(`${base}/404`);
      assert.equal(await page.locator('h1').textContent(), 'We couldn’t find that page.'); checks++;
      assert.match(await page.locator('meta[name="robots"]').getAttribute('content'), /noindex/); checks++;
      assert(await page.locator('a[href="sms:+12138795955"]').count() > 0); checks++;
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false); checks++;
      await page.getByRole('link', {name: 'Back home', exact: true}).click();
      await page.waitForURL(`${base}/`);
      await page.getByRole('heading', {level: 1}).filter({hasText: 'Insurance for Los Angeles'}).waitFor();
      await page.waitForFunction(() => !document.querySelector('meta[name="robots"]')?.content.includes('noindex')); checks++;
      await page.close();
    }
  } finally { await browser.close(); }
}
console.log(JSON.stringify({checks, failures: []}, null, 2));
