import { chromium } from "playwright";
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";

const base = process.env.QA_BASE_URL ?? "http://127.0.0.1:4174";
const routes = [...readFileSync("public/sitemap.xml", "utf8").matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname).concat("/404");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
const usage = new Map();
const failures = [];
const manifest = JSON.parse(readFileSync("scripts/fixtures/people-free-images.json", "utf8"));
const reviewedAssets = new Map(manifest.assets.map(asset => [asset.path, asset]));
const renderedAssets = new Set();
// This verifies a recorded visual review; it does not infer whether an image contains people.
for (const asset of manifest.assets) {
  const file = "public" + asset.path;
  if (!existsSync(file)) { failures.push(`Reviewed asset missing: ${asset.path}`); continue; }
  const hash = createHash("sha256").update(readFileSync(file)).digest("hex");
  if (hash !== asset.sha256) failures.push(`Image changed since visual review; inspect it again before updating the manifest: ${asset.path}`);
  if (asset.review !== "visually-reviewed-no-people-observed") failures.push(`Missing people-free visual review: ${asset.path}`);
}
async function checkReviewedImages(route) {
  const paths = await page.locator("img").evaluateAll(nodes => nodes.flatMap(image => [
    image.getAttribute("src"),
    ...(image.getAttribute("srcset")?.split(",").map(candidate => candidate.trim().split(/\s+/)[0]) ?? []),
    image.currentSrc ? new URL(image.currentSrc).pathname : null,
  ]).filter(Boolean));
  for (const path of paths) {
    renderedAssets.add(path);
    if (!reviewedAssets.has(path)) failures.push(`${route}: rendered image or responsive variant has no recorded visual review: ${path}`);
  }
}
for (const route of routes) {
  await page.goto(base + route);
  await checkReviewedImages(route);
  const images = await page.locator("main img").evaluateAll(async nodes => {
    await Promise.all(nodes.map(async image => { image.loading = "eager"; await image.decode().catch(() => {}); }));
    return nodes.map(image => ({ src: image.getAttribute("src"), current: image.currentSrc, alt: image.alt, width: image.naturalWidth }));
  });
  for (const image of images) {
    if (!image.width) failures.push(`${route}: broken image ${image.current}`);
    if (!image.alt) failures.push(`${route}: missing descriptive alternative ${image.src}`);
    if (!usage.has(image.src)) usage.set(image.src, []);
    usage.get(image.src).push(route);
    if (image.src.startsWith("/images/editorial/")) {
      for (const suffix of ["-sm.webp", ".json"]) {
        if (!existsSync("public" + image.src.replace(/\.webp$/, suffix))) failures.push(`Missing responsive asset or provenance: ${image.src} (${suffix})`);
      }
    }
  }
}
// The real office photograph is shared deliberately in location/directions content.
for (const [src, pages] of usage) {
  if (pages.length > 1 && !src.startsWith("/images/client/")) failures.push(`Repeated editorial image ${src}: ${pages.join(", ")}`);
}
await page.goto(base);
const deskImages = new Set();
const deskTabs = page.locator(".broker-cases [role=tab]");
for (let i = 0; i < await deskTabs.count(); i++) {
  await deskTabs.nth(i).click();
  const image = page.locator(".broker-cases__visual img");
  await image.evaluate(node => node.decode());
  await checkReviewedImages(`Home service-desk tab ${i + 1}`);
  deskImages.add(await image.getAttribute("src"));
}
if (deskImages.size !== 4) failures.push(`Service desk has ${deskImages.size} distinct images; expected four.`);
// Verify the served bytes too, so an outdated production build cannot inherit source approval.
for (const path of renderedAssets) {
  const asset = reviewedAssets.get(path);
  if (!asset) continue;
  const response = await page.request.get(base + path);
  const hash = createHash("sha256").update(await response.body()).digest("hex");
  if (!response.ok() || hash !== asset.sha256) failures.push(`Served image differs from its reviewed hash: ${path}`);
}
await browser.close();
console.log(JSON.stringify({ pages: routes.length, uniqueMainImages: usage.size, distinctServiceDeskImages: deskImages.size, visuallyReviewedAssetFiles: reviewedAssets.size, renderedAssetFiles: renderedAssets.size, peopleFreeReviewExceptions: manifest.exceptions, failures }, null, 2));
if (failures.length) process.exitCode = 1;
