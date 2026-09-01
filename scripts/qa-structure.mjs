import { chromium } from "playwright";

const base = process.env.QA_BASE_URL ?? "http://127.0.0.1:4174";
const routes = [
  "/", "/services", "/about", "/locations", "/contact", "/faq", "/privacy", "/accessibility",
  "/auto-insurance-los-angeles-ca", "/sr22-insurance-los-angeles", "/home-insurance-los-angeles-ca",
  "/no-license-auto-insurance-los-angeles", "/commercial-auto-insurance-los-angeles",
  "/insurance/mar-vista", "/insurance/culver-city", "/insurance/santa-monica", "/insurance/venice",
  "/insurance/marina-del-rey", "/insurance/west-los-angeles", "/insurance/palms", "/insurance/sawtelle",
  "/insurance/playa-vista", "/insurance/westchester", "/insurance/inglewood", "/insurance/ladera-heights",
  "/this-page-does-not-exist",
];
const zoomRoutes = ["/", "/services", "/contact", "/faq", "/auto-insurance-los-angeles-ca", "/insurance/mar-vista", "/privacy", "/this-page-does-not-exist"];
const resilienceRoutes = ["/", "/contact", "/faq", "/privacy"];
const validInternalPaths = new Set(routes.filter((route) => route !== "/this-page-does-not-exist"));
const validContactHrefs = new Set([
  "tel:+13105727246",
  "tel:+13109187007",
  "tel:+12138795955",
  "sms:+13109187007",
  "mailto:contact@raflainsurance.com",
]);
const failures = [];
let pages = 0;
let assertions = 0;

function check(condition, message) {
  assertions += 1;
  if (!condition) failures.push(message);
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });

for (const route of routes) {
  const page = await context.newPage();
  const consoleErrors = [];
  const failedRequests = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("pageerror", (error) => consoleErrors.push(error.message));
  page.on("requestfailed", (request) => failedRequests.push(`${request.method()} ${request.url()} — ${request.failure()?.errorText ?? "failed"}`));

  try {
    await page.goto(`${base}${route}`, { waitUntil: "networkidle", timeout: 20_000 });
    await page.waitForTimeout(50);
    const result = await page.evaluate(() => {
      const text = (selector) => document.querySelector(selector)?.getAttribute("content")?.trim() ?? "";
      const ids = Array.from(document.querySelectorAll("[id]"), (element) => element.id);
      const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
      const ariaRefs = ["aria-labelledby", "aria-describedby", "aria-controls", "aria-owns", "aria-details", "aria-errormessage"];
      const brokenAria = [];
      for (const element of document.querySelectorAll("*")) {
        for (const attribute of ariaRefs) {
          const value = element.getAttribute(attribute);
          if (!value) continue;
          for (const id of value.trim().split(/\s+/)) {
            if (!document.getElementById(id)) brokenAria.push(`${attribute}=${id}`);
          }
        }
      }
      const missingAlts = Array.from(document.images).filter((image) => !image.hasAttribute("alt")).map((image) => image.src);
      const emptyHrefs = Array.from(document.querySelectorAll("a[href]"))
        .filter((anchor) => !anchor.getAttribute("href")?.trim())
        .map((anchor) => anchor.outerHTML.slice(0, 100));
      const unsafeBlanks = Array.from(document.querySelectorAll('a[target="_blank"]'))
        .filter((anchor) => {
          const rel = new Set((anchor.getAttribute("rel") ?? "").split(/\s+/));
          return !rel.has("noopener") || !rel.has("noreferrer");
        })
        .map((anchor) => anchor.getAttribute("href"));
      const brokenHashes = Array.from(document.querySelectorAll('a[href^="#"]'))
        .map((anchor) => anchor.getAttribute("href"))
        .filter((href) => href && href !== "#" && !document.getElementById(decodeURIComponent(href.slice(1))));
      const headings = Array.from(document.querySelectorAll("main h1, main h2, main h3, main h4, main h5, main h6"), (heading) => Number(heading.tagName.slice(1)));
      const headingJumps = headings.flatMap((level, index) => index > 0 && level > headings[index - 1] + 1 ? [`h${headings[index - 1]} to h${level}`] : []);
      const visibleWillChange = Array.from(document.querySelectorAll("main *"))
        .filter((element) => {
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return rect.width > 1 && rect.height > 1 && style.display !== "none" && style.willChange !== "auto";
        })
        .slice(0, 8)
        .map((element) => `${element.tagName}.${element.className}:${getComputedStyle(element).willChange}`);
      const internalPaths = [...new Set(Array.from(document.querySelectorAll("a[href]"))
        .filter((anchor) => !anchor.getAttribute("href")?.startsWith("#"))
        .map((anchor) => new URL(anchor.href, location.href))
        .filter((url) => url.origin === location.origin)
        .map((url) => url.pathname.replace(/\/$/, "") || "/"))];
      const contactHrefs = [...new Set(Array.from(document.querySelectorAll('a[href^="tel:"], a[href^="sms:"], a[href^="mailto:"]'))
        .map((anchor) => anchor.getAttribute("href")))];
      const description = text('meta[name="description"]');
      return {
        lang: document.documentElement.lang,
        mainCount: document.querySelectorAll("main").length,
        mainTabIndex: document.querySelector("main")?.getAttribute("tabindex"),
        h1Count: document.querySelectorAll("main h1").length,
        headingJumps,
        duplicateIds,
        brokenAria,
        missingAlts,
        emptyHrefs,
        unsafeBlanks,
        brokenHashes,
        forms: document.forms.length,
        description,
        canonical: document.querySelector('link[rel="canonical"]')?.href ?? "",
        ogTitle: text('meta[property="og:title"]'),
        ogDescription: text('meta[property="og:description"]'),
        ogUrl: text('meta[property="og:url"]'),
        twitterTitle: text('meta[name="twitter:title"]'),
        twitterDescription: text('meta[name="twitter:description"]'),
        title: document.title,
        robots: text('meta[name="robots"]'),
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        visibleWillChange,
        internalPaths,
        contactHrefs,
      };
    });

    const label = route;
    check(result.lang === "en", `${label}: document language is ${result.lang || "missing"}`);
    check(result.mainCount === 1, `${label}: expected one main, found ${result.mainCount}`);
    check(result.mainTabIndex === "-1", `${label}: main is not programmatically focusable for skip links and route changes`);
    check(result.h1Count === 1, `${label}: expected one H1, found ${result.h1Count}`);
    check(result.headingJumps.length === 0, `${label}: heading level jumps: ${result.headingJumps.join(", ")}`);
    check(result.duplicateIds.length === 0, `${label}: duplicate IDs: ${result.duplicateIds.join(", ")}`);
    check(result.brokenAria.length === 0, `${label}: broken ARIA references: ${result.brokenAria.join(", ")}`);
    check(result.missingAlts.length === 0, `${label}: images without alt: ${result.missingAlts.join(", ")}`);
    check(result.emptyHrefs.length === 0, `${label}: empty hrefs: ${result.emptyHrefs.join(", ")}`);
    check(result.unsafeBlanks.length === 0, `${label}: unsafe new-window links: ${result.unsafeBlanks.join(", ")}`);
    check(result.brokenHashes.length === 0, `${label}: missing hash targets: ${result.brokenHashes.join(", ")}`);
    check(result.forms === 0, `${label}: unexpected form count ${result.forms}`);
    check(result.description.length >= 70 && result.description.length <= 170, `${label}: meta description length ${result.description.length}`);
    check(result.canonical.startsWith("https://raflainsurance.com/"), `${label}: invalid canonical ${result.canonical}`);
    check(result.ogTitle === result.title, `${label}: Open Graph title differs from document title`);
    check(result.twitterTitle === result.title, `${label}: Twitter title differs from document title`);
    check(result.ogDescription === result.description, `${label}: Open Graph description differs from meta description`);
    check(result.twitterDescription === result.description, `${label}: Twitter description differs from meta description`);
    check(result.ogUrl === result.canonical, `${label}: Open Graph URL differs from canonical`);
    check(route === "/this-page-does-not-exist" ? result.robots.includes("noindex") : !result.robots.includes("noindex"), `${label}: incorrect robots meta ${result.robots || "missing"}`);
    check(result.overflow <= 1, `${label}: ${result.overflow}px root overflow`);
    check(result.visibleWillChange.length === 0, `${label}: stale will-change layers: ${result.visibleWillChange.join(", ")}`);
    check(result.internalPaths.every((path) => validInternalPaths.has(path)), `${label}: unknown internal paths: ${result.internalPaths.filter((path) => !validInternalPaths.has(path)).join(", ")}`);
    check(result.contactHrefs.every((href) => validContactHrefs.has(href)), `${label}: unexpected contact hrefs: ${result.contactHrefs.filter((href) => !validContactHrefs.has(href)).join(", ")}`);
    check(consoleErrors.length === 0, `${label}: console errors: ${consoleErrors.join(" | ")}`);
    check(failedRequests.length === 0, `${label}: failed requests: ${failedRequests.join(" | ")}`);
    pages += 1;
  } catch (error) {
    failures.push(`${route}: ${error.message}`);
  } finally {
    await page.close();
  }
}
await context.close();

const zoomContext = await browser.newContext({ viewport: { width: 640, height: 900 }, reducedMotion: "reduce" });
for (const route of zoomRoutes) {
  const page = await zoomContext.newPage();
  try {
    await page.goto(`${base}${route}`, { waitUntil: "networkidle", timeout: 20_000 });
    await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
    await page.waitForTimeout(100);
    const result = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Clipped: (() => {
        const heading = document.querySelector("main h1");
        if (!heading) return true;
        const style = getComputedStyle(heading);
        const clipsInline = style.overflowX !== "visible" && heading.scrollWidth > heading.clientWidth + 2;
        const clipsBlock = style.overflowY !== "visible" && heading.scrollHeight > heading.clientHeight + 2;
        return clipsInline || clipsBlock;
      })(),
    }));
    check(result.overflow <= 1, `200% text ${route}: ${result.overflow}px root overflow`);
    check(!result.h1Clipped, `200% text ${route}: H1 is clipped`);
  } catch (error) {
    failures.push(`200% text ${route}: ${error.message}`);
  } finally {
    await page.close();
  }
}
await zoomContext.close();

// A 320 CSS-pixel layout is the 400%-zoom reflow target for a 1280px viewport.
const reflowContext = await browser.newContext({ viewport: { width: 320, height: 800 }, reducedMotion: "reduce" });
for (const route of zoomRoutes) {
  const page = await reflowContext.newPage();
  try {
    await page.goto(`${base}${route}`, { waitUntil: "networkidle", timeout: 20_000 });
    const result = await page.evaluate(() => {
      const heading = document.querySelector("main h1");
      const style = heading ? getComputedStyle(heading) : null;
      return {
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        h1Clipped: !heading || !style || (style.overflowX !== "visible" && heading.scrollWidth > heading.clientWidth + 2)
          || (style.overflowY !== "visible" && heading.scrollHeight > heading.clientHeight + 2),
      };
    });
    check(result.overflow <= 1, `400%-equivalent reflow ${route}: ${result.overflow}px root overflow`);
    check(!result.h1Clipped, `400%-equivalent reflow ${route}: H1 is clipped`);
  } catch (error) {
    failures.push(`400%-equivalent reflow ${route}: ${error.message}`);
  } finally {
    await page.close();
  }
}
await reflowContext.close();

const spacingContext = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
for (const route of resilienceRoutes) {
  const page = await spacingContext.newPage();
  try {
    await page.goto(`${base}${route}`, { waitUntil: "networkidle", timeout: 20_000 });
    await page.addStyleTag({ content: `
      * { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; }
      p { margin-bottom: 2em !important; }
    ` });
    await page.waitForTimeout(80);
    const result = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      clippedControls: Array.from(document.querySelectorAll("main button, main summary, main a"))
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return rect.width > 2 && rect.height > 2 && style.display !== "none"
            && (element.scrollWidth > element.clientWidth + 2 || element.scrollHeight > element.clientHeight + 2);
        })
        .slice(0, 6)
        .map((element) => `${element.tagName}.${element.className}`),
    }));
    check(result.overflow <= 1, `text spacing ${route}: ${result.overflow}px root overflow`);
    check(result.clippedControls.length === 0, `text spacing ${route}: clipped controls ${result.clippedControls.join(", ")}`);
  } catch (error) {
    failures.push(`text spacing ${route}: ${error.message}`);
  } finally {
    await page.close();
  }
}
await spacingContext.close();

const backgroundContext = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
for (const route of ["/", "/contact"]) {
  const page = await backgroundContext.newPage();
  try {
    await page.goto(`${base}${route}`, { waitUntil: "networkidle", timeout: 20_000 });
    await page.addStyleTag({ content: `*, *::before, *::after { background-image: none !important; }` });
    const result = await page.evaluate(() => ({
      h1Visible: (() => { const node = document.querySelector("main h1"); return Boolean(node && node.getBoundingClientRect().height > 0 && getComputedStyle(node).visibility !== "hidden"); })(),
      actionVisible: (() => { const node = document.querySelector("main button, main a"); return Boolean(node && node.getBoundingClientRect().height >= 24 && getComputedStyle(node).visibility !== "hidden"); })(),
    }));
    check(result.h1Visible, `backgrounds disabled ${route}: H1 is not visible`);
    check(result.actionVisible, `backgrounds disabled ${route}: primary action is not visible`);
  } catch (error) {
    failures.push(`backgrounds disabled ${route}: ${error.message}`);
  } finally {
    await page.close();
  }
}
await backgroundContext.close();

const forcedColorsContext = await browser.newContext({ viewport: { width: 1280, height: 720 }, reducedMotion: "reduce", forcedColors: "active" });
for (const route of ["/", "/contact"]) {
  const page = await forcedColorsContext.newPage();
  try {
    await page.goto(`${base}${route}`, { waitUntil: "networkidle", timeout: 20_000 });
    const primary = page.locator("main button").first();
    await primary.focus();
    const result = await primary.evaluate((node) => {
      const style = getComputedStyle(node);
      return { visible: node.getBoundingClientRect().height >= 24, outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth };
    });
    check(result.visible, `forced colors ${route}: primary button is not visible`);
    check(result.outlineStyle !== "none" && parseFloat(result.outlineWidth) >= 2, `forced colors ${route}: focus outline is ${result.outlineStyle} ${result.outlineWidth}`);
  } catch (error) {
    failures.push(`forced colors ${route}: ${error.message}`);
  } finally {
    await page.close();
  }
}
await forcedColorsContext.close();
await browser.close();

console.log(JSON.stringify({
  pages,
  zoomPages: zoomRoutes.length,
  reflow400Pages: zoomRoutes.length,
  textSpacingPages: resilienceRoutes.length,
  backgroundsDisabledPages: 2,
  forcedColorsPages: 2,
  assertions,
  failures,
}, null, 2));
if (failures.length) process.exitCode = 1;
