import { createServer } from "node:http";
import { mkdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright";
import middleware from "../middleware.js";

const failures = [];
let checks = 0;
const check = (condition, message) => {
  checks += 1;
  if (!condition) failures.push(message);
};

const source = readFileSync(resolve("middleware.js"), "utf8");
const static404 = readFileSync(resolve("public/404.html"), "utf8");
check(source.includes("const COMING_SOON_ENABLED = true;"), "COMING_SOON_ENABLED is not true");
check(static404.includes('content="noindex, nofollow, noarchive"'), "Static 404 robots meta is incomplete");
check((static404.match(/<a\s/g) ?? []).length === 4, "Static 404 recovery links are incomplete");

const queryResponse = await middleware(new Request("https://raflainsurance.com/insurance/mar-vista?q=private&utm_source=test"));
check(queryResponse.status === 308, `Query cleanup returned ${queryResponse.status}`);
check(queryResponse.headers.get("location") === "https://raflainsurance.com/insurance/mar-vista", `Query cleanup location is ${queryResponse.headers.get("location")}`);

const response = await middleware(new Request("https://raflainsurance.com/insurance/mar-vista"));
const html = await response.text();
check(response.status === 200, `Public gate returned ${response.status}`);
check(response.headers.get("x-robots-tag") === "noindex, nofollow, noarchive", "Public gate X-Robots-Tag is incorrect");
check(response.headers.get("cache-control")?.includes("no-store"), "Public gate is cacheable");
check(html.includes('<meta name="robots" content="noindex,nofollow,noarchive">'), "Holding page robots meta is missing");
check(html.includes("Rafla Insurance Agency remains available"), "Holding page agency status is missing");
check(html.includes("CA Agency License 0D95584"), "Holding page agency license is missing");
check(!html.includes("Coverage for Los Angeles"), "Full-site homepage leaked through the production gate");

const robotsResponse = await middleware(new Request("https://www.raflainsurance.com/robots.txt"));
check((await robotsResponse.text()) === "User-agent: *\nDisallow: /\n", "Production robots response does not disallow the site");
check(robotsResponse.headers.get("cache-control") === "no-store", "Production robots response is cacheable");

const logo = readFileSync(resolve("public/logo.svg"));
const server = createServer((request, serverResponse) => {
  if (request.url === "/logo.svg") {
    serverResponse.writeHead(200, { "content-type": "image/svg+xml" });
    serverResponse.end(logo);
    return;
  }
  if (request.url === "/404.html") {
    serverResponse.writeHead(404, { "content-type": "text/html; charset=utf-8" });
    serverResponse.end(static404);
    return;
  }
  serverResponse.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  serverResponse.end(html);
});
await new Promise((resolveListen) => server.listen(0, "127.0.0.1", resolveListen));
const address = server.address();
const base = `http://127.0.0.1:${address.port}`;
const output = resolve("output/playwright");
mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const viewports = [
  { name: "compact", width: 320, height: 568 },
  { name: "modern", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
  { name: "wide", width: 1920, height: 1080 },
];

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, reducedMotion: "reduce" });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(base, { waitUntil: "networkidle" });
  const result = await page.evaluate(() => ({
    h1s: document.querySelectorAll("h1").length,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    forms: document.forms.length,
    brokenImages: Array.from(document.images).filter((image) => image.naturalWidth === 0).length,
    hrefs: Array.from(document.querySelectorAll(".contact a"), (anchor) => anchor.getAttribute("href")),
    unsafeBlank: Array.from(document.querySelectorAll('a[target="_blank"]')).some((anchor) => {
      const rel = new Set((anchor.getAttribute("rel") ?? "").split(/\s+/));
      return !rel.has("noopener") || !rel.has("noreferrer");
    }),
  }));
  check(result.h1s === 1, `${viewport.name}: expected one H1, found ${result.h1s}`);
  check(result.overflow <= 1, `${viewport.name}: ${result.overflow}px root overflow`);
  check(result.forms === 0, `${viewport.name}: unexpected form`);
  check(result.brokenImages === 0, `${viewport.name}: broken image`);
  check(result.hrefs.includes("tel:+13105727246"), `${viewport.name}: office phone link missing`);
  check(result.hrefs.includes("sms:+13109187007"), `${viewport.name}: text link missing`);
  check(result.hrefs.includes("mailto:contact@raflainsurance.com"), `${viewport.name}: email link missing`);
  check(!result.unsafeBlank, `${viewport.name}: unsafe new-window link`);
  check(errors.length === 0, `${viewport.name}: console errors: ${errors.join(" | ")}`);
  if (viewport.name === "modern") {
    const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    check(axe.violations.length === 0, `Holding-page WCAG violations: ${axe.violations.map((item) => item.id).join(", ")}`);
  }
  if (viewport.name === "compact" || viewport.name === "desktop") {
    await page.screenshot({ path: resolve(output, `coming-soon-${viewport.name}.png`), fullPage: true });
  }
  await context.close();
}

const notFoundContext = await browser.newContext({ viewport: { width: 320, height: 568 }, reducedMotion: "reduce" });
const notFoundPage = await notFoundContext.newPage();
const staticResponse = await notFoundPage.goto(`${base}/404.html`, { waitUntil: "networkidle" });
const staticResult = await notFoundPage.evaluate(() => ({
  h1s: document.querySelectorAll("h1").length,
  overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  links: document.querySelectorAll("nav a").length,
  brokenImages: Array.from(document.images).filter((image) => image.naturalWidth === 0).length,
}));
check(staticResponse?.status() === 404, `Static 404 returned ${staticResponse?.status() ?? "no response"}`);
check(staticResult.h1s === 1, `Static 404 expected one H1, found ${staticResult.h1s}`);
check(staticResult.overflow <= 1, `Static 404 has ${staticResult.overflow}px root overflow`);
check(staticResult.links === 4, `Static 404 has ${staticResult.links} recovery links`);
check(staticResult.brokenImages === 0, "Static 404 has a broken image");
const staticAxe = await new AxeBuilder({ page: notFoundPage }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
check(staticAxe.violations.length === 0, `Static 404 WCAG violations: ${staticAxe.violations.map((item) => item.id).join(", ")}`);
await notFoundPage.screenshot({ path: resolve(output, "static-404-compact.png"), fullPage: true });
await notFoundContext.close();

const forcedColorsContext = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce", forcedColors: "active" });
const forcedColorsPage = await forcedColorsContext.newPage();
await forcedColorsPage.goto(base, { waitUntil: "networkidle" });
const forcedColorsLink = forcedColorsPage.locator(".contact a").first();
await forcedColorsLink.focus();
const forcedColorsResult = await forcedColorsLink.evaluate((node) => {
  const style = getComputedStyle(node);
  return {
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    visible: node.getBoundingClientRect().height >= 44,
    focus: style.outlineStyle !== "none" && parseFloat(style.outlineWidth) >= 2,
  };
});
check(forcedColorsResult.overflow <= 1, `Holding-page forced colors has ${forcedColorsResult.overflow}px root overflow`);
check(forcedColorsResult.visible, "Holding-page forced-colors contact target is not visible");
check(forcedColorsResult.focus, "Holding-page forced-colors focus indicator is missing");
await forcedColorsPage.screenshot({ path: resolve(output, "coming-soon-forced-colors.png"), fullPage: true });
await forcedColorsContext.close();

await browser.close();
await new Promise((resolveClose) => server.close(resolveClose));

console.log(JSON.stringify({ checks, viewportChecks: viewports.length, failures }, null, 2));
if (failures.length) process.exitCode = 1;
