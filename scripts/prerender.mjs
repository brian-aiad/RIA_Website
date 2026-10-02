/** Build real HTML for every sitemap route, locally and on Vercel.
 * Node-only React rendering avoids a browser dependency in the build image.
 * Flat .html files match Vercel cleanUrls and never require an SPA catch-all.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { pathToFileURL } from "node:url";

const { render } = await import(pathToFileURL(resolve("node_modules/.cache/rafla-ssr/entry-server.js")));
const shell = readFileSync("dist/index.html", "utf8");
const sitemap = readFileSync("public/sitemap.xml", "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]));
const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character]));
const titles = new Set();
const descriptions = new Set();

for (const url of urls) {
  if (url.origin !== "https://www.raflainsurance.com") throw new Error(`Noncanonical sitemap URL: ${url}`);
  const { html: body, meta } = render(url.pathname);
  if (meta.canonical !== url.href) throw new Error(`Canonical mismatch for ${url}: ${meta.canonical}`);
  if (!body.includes("<h1") || !body.includes('id="main-content"')) throw new Error(`Missing rendered content: ${url}`);
  if (titles.has(meta.title) || descriptions.has(meta.description)) throw new Error(`Duplicate page metadata: ${url}`);
  titles.add(meta.title);
  descriptions.add(meta.description);
  let html = shell.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`);
  const attributes = [
    ['name="description"', meta.description],
    ['property="og:title"', meta.title],
    ['property="og:description"', meta.description],
    ['property="og:url"', meta.canonical],
    ['name="twitter:title"', meta.title],
    ['name="twitter:description"', meta.description],
  ];
  for (const [attribute, content] of attributes) {
    html = html.replace(new RegExp(`<meta ${attribute} content="[^"]*"\\s*/?>`), `<meta ${attribute} content="${escapeHtml(content)}" />`);
  }
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${meta.canonical}" />`);
  html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  html = html.replace("</head>", '<!-- prerendered by scripts/prerender.mjs -->\n</head>');
  const output = resolve("dist", url.pathname === "/" ? "index.html" : `${url.pathname.slice(1)}.html`);
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, html);
  console.log(`✓ ${url.pathname} — unique HTML, metadata, and structured data`);
}
console.log(`Prerendered ${urls.length} pages. Vercel builds use the same renderer.`);
