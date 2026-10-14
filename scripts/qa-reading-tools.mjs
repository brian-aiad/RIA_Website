import assert from 'node:assert/strict';
import { chromium, webkit } from 'playwright';

const base = process.env.QA_BASE_URL ?? 'http://127.0.0.1:4174';
let checks = 0;
function check(value, message) { assert.ok(value, message); checks++; }
for (const [engine, width] of [[chromium, 1440], [webkit, 390]]) {
  const browser = await engine.launch();
  try {
    const page = await browser.newPage({ viewport: { width, height: 844 }, reducedMotion: 'reduce' });
    await page.goto(`${base}/faq`);
    const search = page.getByRole('searchbox', { name: 'Find an answer' });
    const drawers = page.locator('.answer-drawer');
    const total = await drawers.count();
    check(total === 17, 'All FAQ answers are initially available');
    await search.fill('SPANISH arabic');
    check(await drawers.count() === 1, 'Search matches multiple words in answer text regardless of case');
    check(await drawers.first().getAttribute('open') !== null, 'Matching answer opens automatically');
    check(await page.locator('#faq-search-count').innerText() === '1 answer found', 'Search announces result count');
    await page.getByRole('button', { name: 'Clear search', exact: true }).click();
    check(await drawers.count() === total, 'Clear restores all answers');
    check(await search.evaluate(n => n === document.activeElement), 'Clear returns focus to search');
    await search.fill('no-such-insurance-answer');
    check(await drawers.count() === 0 && await page.getByText('No matching questions yet.').isVisible(), 'Empty search has a useful recovery state');
    await page.getByRole('button', { name: 'Show all questions' }).click();
    check(await drawers.count() === total, 'Empty-state recovery restores questions');
    await drawers.first().locator('summary').click();
    check(await drawers.first().getAttribute('open') !== null, 'Native FAQ disclosure works after search reset');
    await page.goto(`${base}/auto-insurance-los-angeles-ca`);
    const nav = page.getByRole('navigation', { name: 'Coverage guide chapters' });
    for (const id of ['anatomy', 'documents', 'fine-print', 'answers', 'orientation']) {
      await nav.locator(`[href="#${id}"]`).click();
      await page.waitForFunction(target => document.querySelector('.guide-index [aria-current="location"]')?.getAttribute('href') === `#${target}`, id);
      check(new URL(page.url()).hash === `#${id}`, `Guide chapter ${id} retains a linkable hash`);
      check(await page.locator(`#${id}`).evaluate(n => n.getBoundingClientRect().top >= 0 && n.getBoundingClientRect().top < innerHeight / 2), `Guide chapter ${id} scrolls into view`);
    }
    await page.waitForTimeout(500);
    await page.locator('#documents').evaluate(n => scrollTo(0, scrollY + n.getBoundingClientRect().top - 150));
    await page.waitForFunction(() => document.querySelector('.guide-index [aria-current="location"]')?.getAttribute('href') === '#documents');
    check(true, 'Active guide chapter follows manual scrolling');
    check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Reading tools fit viewport');
  } finally { await browser.close(); }
}
console.log(`Reading tools: ${checks} checks passed.`);
