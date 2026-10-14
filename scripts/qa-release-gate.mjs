import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { COMING_SOON_ENABLED } from '../config/release.mjs';
import middleware from '../middleware.js';
assert.equal(COMING_SOON_ENABLED, true, 'Release gate must remain enabled for this release');
assert.deepEqual(readdirSync('dist').sort(), ['404.html', 'favicon.svg', 'index.html', 'logo.svg', 'robots.txt'], 'Gate output must not expose full site HTML, JavaScript, images, sitemap, or source maps');
const html = readFileSync('dist/index.html', 'utf8');
assert.match(html, /Coming Soon/);
assert.match(html, /<h1[^>]*>/);
assert.match(html, /width="1185" height="460"/);
assert.match(html, /#803e46/);
assert.doesNotMatch(html, /#97504e|#a03f43/);
assert.match(html, /href="sms:\+12138795955"/);
assert.match(html, /Text Ash/);
assert.match(html, /\(213\) 879-5955/);
assert.match(html, /href="tel:\+13105727246"/);
assert.match(html, /href="mailto:contact@raflainsurance.com"/);
assert.doesNotMatch(html, /<script|\/src\/|\/assets\/|SDVOSB|DVBE|Text Mark/i);
assert.equal(readFileSync('dist/logo.svg', 'utf8'), readFileSync('public/logo.svg', 'utf8'), 'Final logo must remain unchanged');
assert.equal(readFileSync('dist/favicon.svg', 'utf8'), readFileSync('public/favicon.svg', 'utf8'));
assert.match(html, /rel="icon" href="\/favicon.svg"/);
assert.equal(readFileSync('dist/404.html', 'utf8'), html);
assert.match(readFileSync('dist/robots.txt', 'utf8'), /Disallow: \//);
for (const route of ['/services', '/contact?coverage=home', '/insurance/mar-vista', '/sitemap.xml', '/unknown', '/?tracking=private']) {
  const response = middleware(new Request(`https://www.raflainsurance.com${route}`));
  assert.equal(response.headers.get('x-middleware-rewrite'), 'https://www.raflainsurance.com/index.html', `Gate bypass: ${route}`);
}
assert.equal(middleware(new Request('https://www.raflainsurance.com/')).headers.get('x-middleware-next'), '1');
console.log('Release gate verified: minimal output, correct contacts, unchanged logo, no full-site payload, deep links gated.');
