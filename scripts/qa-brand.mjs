import assert from 'node:assert/strict';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';
import { site } from '../src/lib/site.ts';

const social = readFileSync('public/images/brand/rafla-social.png');
assert.equal(social.readUInt32BE(16), 1200, 'Social artwork width');
assert.equal(social.readUInt32BE(20), 630, 'Social artwork height');
const documentHead = readFileSync('index.html', 'utf8');
assert.equal((documentHead.match(/content="https:\/\/www\.raflainsurance\.com\/images\/brand\/rafla-social\.png"/g) ?? []).length, 2, 'Both sharing platforms use the reviewed final brand artwork');
const origin = process.env.QA_BASE_URL || process.env.QA_BASE || 'http://127.0.0.1:4174';
const routes = [...readFileSync('public/sitemap.xml', 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname).concat('/404');
const browser = await chromium.launch();
const findings = [];
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(`${origin}${route}`);
      const result = await page.evaluate(() => {
        const sms = [...document.querySelectorAll('a[href^="sms:"]')].map(a => ({ href: a.getAttribute('href'), text: a.textContent.replace(/\s+/g, ' ').trim() }));
        const logos = [...document.querySelectorAll('img[src="/logo.svg"]')].map(img => ({ width: img.getAttribute('width'), height: img.getAttribute('height'), renderedRatio: img.getBoundingClientRect().width / img.getBoundingClientRect().height }));
        return { sms, logos, obsoleteText: /Text\s+Mark/i.test(document.body.innerText), overflow: document.documentElement.scrollWidth > innerWidth };
      });
      assert(result.sms.length > 0, `${route}: no SMS contact`);
      for (const link of result.sms) {
        assert.equal(link.href, 'sms:+12138795955', `${route}: incorrect SMS destination`);
        assert(link.text.includes('Text Ash') && link.text.includes('(213) 879-5955'), `${route}: inconsistent SMS label: ${link.text}`);
      }
      for (const logo of result.logos) {
        assert.equal(logo.width, '1185');
        assert.equal(logo.height, '460');
      }
      assert(!result.obsoleteText, `${route}: obsolete Text Mark`);
      assert(!result.overflow, `${route}: overflow after brand changes`);
      findings.push({ route, width, ...result });
    }
  }
  await page.goto(origin);
  await page.locator('.ria-award').scrollIntoViewIfNeeded();
  await page.locator('.ria-award img').evaluate(img => img.decode());
  const award = await page.locator('.ria-award').evaluate(figure => {
    const img = figure.querySelector('img');
    return { heading: figure.querySelector('h3').textContent, links: [...figure.querySelectorAll('a')].map(a => a.href), currentSrc: img.currentSrc, naturalWidth: img.naturalWidth, width: img.getAttribute('width'), height: img.getAttribute('height') };
  });
  assert.equal(award.heading, 'BusinessRate Ranked #1 Award Winner — 2026');
  assert(award.links.length === 2 && award.links.every(link => link === award.links[0]), 'Award links must use same configured Google reviews destination');
  assert.equal(award.links[0], site.reviews.googleUrl, 'Award must use the configured Google destination');
  assert.match(award.currentSrc, /businessrate-2026-(320|640|960)\.webp$/);
  assert.equal(award.width, '3000'); assert.equal(award.height, '3754');
  const red = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--agency-red').trim());
  assert.equal(red, '#803e46', 'The muted red token must remain consistent');
  const luminance = hex => { const rgb = hex.match(/[a-f0-9]{2}/gi).map(v => parseInt(v,16)/255).map(v => v <= .04045 ? v/12.92 : ((v+.055)/1.055)**2.4); return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722; };
  const redContrast = (1.05)/(luminance(red)+.05);
  assert(redContrast >= 4.5, 'Muted red text and white button labels need AA contrast');
  mkdirSync('output/playwright/brand', { recursive: true });
  writeFileSync('output/playwright/brand/audit.json', JSON.stringify({ findings, award, red, redContrast }, null, 2));
  console.log(`Brand checks passed: ${findings.length} route/view combinations; SMS destination/label, intrinsic logo ratio, award caption/links/responsive source.`);
} finally { await browser.close(); }
