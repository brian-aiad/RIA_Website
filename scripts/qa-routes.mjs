import { chromium, webkit } from "playwright";

const base = process.env.QA_BASE_URL ?? "http://127.0.0.1:4174";
const routes = [
  "/",
  "/services",
  "/about",
  "/locations",
  "/contact",
  "/faq",
  "/privacy",
  "/accessibility",
  "/auto-insurance-los-angeles-ca",
  "/sr22-insurance-los-angeles",
  "/home-insurance-los-angeles-ca",
  "/no-license-auto-insurance-los-angeles",
  "/commercial-auto-insurance-los-angeles",
  "/insurance/mar-vista",
  "/insurance/culver-city",
  "/insurance/santa-monica",
  "/insurance/venice",
  "/insurance/marina-del-rey",
  "/insurance/west-los-angeles",
  "/insurance/palms",
  "/insurance/sawtelle",
  "/insurance/playa-vista",
  "/insurance/westchester",
  "/insurance/inglewood",
  "/insurance/ladera-heights",
  "/this-page-does-not-exist",
];

const viewports = [
  { name: "compact-phone", width: 320, height: 568 },
  { name: "small-phone", width: 360, height: 640 },
  { name: "classic-phone", width: 375, height: 667 },
  { name: "modern-phone", width: 390, height: 844 },
  { name: "large-phone", width: 412, height: 915 },
  { name: "max-phone", width: 430, height: 932 },
  { name: "portrait-tablet", width: 768, height: 1024 },
  { name: "landscape-tablet", width: 1024, height: 768 },
  { name: "compact-laptop", width: 1280, height: 720 },
  { name: "laptop", width: 1366, height: 768 },
  { name: "desktop", width: 1440, height: 900 },
  { name: "wide", width: 1920, height: 1080 },
  { name: "short-landscape", width: 844, height: 390 },
];

const webkitViewportNames = new Set(["compact-phone", "modern-phone", "portrait-tablet", "desktop", "wide"]);

const failures = [];
let checked = 0;

const deadline = (promise, milliseconds, label) =>
  Promise.race([
    promise,
    new Promise((_, reject) => {
      const timer = setTimeout(() => reject(new Error(`${label} timed out after ${milliseconds}ms`)), milliseconds);
      timer.unref?.();
    }),
  ]);

const suites = [
  { name: "chromium", engine: chromium, viewports },
  { name: "webkit", engine: webkit, viewports: viewports.filter(({ name }) => webkitViewportNames.has(name)) },
  { name: "reduced", engine: chromium, viewports: [{ name: "modern-phone", width: 390, height: 844 }], reducedMotion: "reduce" },
];

for (const suite of suites) {
  for (const viewport of suite.viewports) {
    // A fresh browser per viewport avoids a WebKit process-reuse deadlock that
    // can otherwise occur after several context teardown cycles.
    const browser = await deadline(
      suite.engine.launch({ headless: true }),
      15_000,
      `${suite.name}/${viewport.name} browser launch`,
    );
    const context = await deadline(browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      reducedMotion: suite.reducedMotion ?? "no-preference",
    }), 10_000, `${suite.name}/${viewport.name} context creation`);

    for (const route of routes) {
      let page;
      const previewPath = route === "/" ? route : `${route}/`;
      const consoleErrors = [];

    try {
      page = await deadline(context.newPage(), 8_000, `${suite.name}/${viewport.name} page creation`);
      page.on("console", (message) => {
        if (message.type() === "error") consoleErrors.push(message.text());
      });
      page.on("pageerror", (error) => consoleErrors.push(error.message));
      await deadline((async () => {
      const response = await page.goto(`${base}${previewPath}`, {
        waitUntil: "networkidle",
        timeout: 20_000,
      });
      if (!response?.ok()) throw new Error(`HTTP ${response?.status() ?? "no response"}`);

      await page.evaluate(async () => {
        const maximum = document.documentElement.scrollHeight - innerHeight;
        for (let y = 0; y <= maximum; y += Math.max(260, innerHeight * 0.7)) {
          scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 28));
        }
        scrollTo(0, maximum);
        await new Promise((resolve) => setTimeout(resolve, 180));

        // Horizontal mobile ledgers intentionally lazy-load offscreen artwork.
        // Traverse them like a user swipe before evaluating image health.
        const horizontalRails = Array.from(document.querySelectorAll('[role="region"], [role="tablist"]'))
          .filter((element) => element.scrollWidth > element.clientWidth + 2);
        for (const rail of horizontalRails) {
          rail.scrollIntoView({ block: "center", inline: "nearest" });
          rail.scrollTo({ left: rail.scrollWidth, behavior: "instant" });
          await new Promise((resolve) => setTimeout(resolve, 75));
        }

        await Promise.all(
          Array.from(document.images, (image) =>
            typeof image.decode === "function"
              ? Promise.race([
                  image.decode().catch(() => undefined),
                  new Promise((resolve) => setTimeout(resolve, 1_200)),
                ])
              : undefined,
          ),
        );
      });

      const result = await page.evaluate(() => {
        const root = document.documentElement;
        const brokenImages = Array.from(document.images)
          .filter((image) => image.getBoundingClientRect().width > 0 && image.naturalWidth === 0)
          .map((image) => image.currentSrc || image.src);
        const hiddenContent = Array.from(
          document.querySelectorAll("main h1, main h2, main h3, main p, main a, main img"),
        )
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            if (rect.width < 4 || rect.height < 4) return false;
            const style = getComputedStyle(element);
            return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) < 0.05;
          })
          .slice(0, 5)
          .map((element) => `${element.tagName}.${element.className}`);
        const clippedText = Array.from(
          document.querySelectorAll("main h1, main h2, main h3, main summary, main button, .atlas-nav a, .atlas-nav button"),
        )
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            if (rect.width < 4 || rect.height < 4) return false;
            const style = getComputedStyle(element);
            if (style.display === "none" || style.visibility === "hidden") return false;
            const clipsInline = style.overflowX !== "visible" && element.scrollWidth > element.clientWidth + 3;
            const clipsBlock = style.overflowY !== "visible" && element.scrollHeight > element.clientHeight + 3;
            return clipsInline || clipsBlock;
          })
          .slice(0, 8)
          .map((element) => `${element.tagName}.${element.className}`);

        return {
          h1Count: document.querySelectorAll("main h1").length,
          h1Text: document.querySelector("main h1")?.textContent?.trim() ?? "",
          horizontalOverflow: root.scrollWidth - root.clientWidth,
          brokenImages,
          hiddenContent,
          clippedText,
        };
      });

      const problems = [];
      if (result.h1Count !== 1) problems.push(`${result.h1Count} H1 elements`);
      if (route === "/" && !result.h1Text.includes("Coverage for Los Angeles")) problems.push(`unexpected home H1: ${result.h1Text}`);
      if (route === "/this-page-does-not-exist" && !result.h1Text.includes("couldn’t find")) problems.push(`unexpected 404 H1: ${result.h1Text}`);
      if (route !== "/" && result.h1Text.includes("Coverage for Los Angeles")) problems.push("homepage fallback rendered for a deep route");
      if (result.horizontalOverflow > 1) problems.push(`${result.horizontalOverflow}px horizontal overflow`);
      if (result.brokenImages.length) problems.push(`broken images: ${result.brokenImages.join(", ")}`);
      if (result.hiddenContent.length) problems.push(`hidden content: ${result.hiddenContent.join(", ")}`);
      if (result.clippedText.length) problems.push(`clipped text: ${result.clippedText.join(", ")}`);
      if (consoleErrors.length) problems.push(`console: ${consoleErrors.join(" | ")}`);
      if (problems.length) failures.push(`${suite.name}/${viewport.name} ${route}: ${problems.join("; ")}`);
      })(), 30_000, `${suite.name}/${viewport.name} ${route}`);
    } catch (error) {
      failures.push(`${suite.name}/${viewport.name} ${route}: ${error.message}`);
    } finally {
      checked += 1;
      if (page) {
        await deadline(page.close(), 5_000, `${suite.name}/${viewport.name} page close`).catch((error) => {
          failures.push(`${suite.name}/${viewport.name} ${route}: ${error.message}`);
        });
      }
    }
  }

    await deadline(context.close(), 8_000, `${suite.name}/${viewport.name} context close`).catch((error) => {
      failures.push(`${suite.name}/${viewport.name}: ${error.message}`);
    });
    console.log(`${suite.name}/${viewport.name}: ${checked} route checks complete`);
    await deadline(browser.close(), 8_000, `${suite.name}/${viewport.name} browser close`).catch((error) => {
      failures.push(`${suite.name}/${viewport.name}: ${error.message}`);
    });
  }
}
console.log(JSON.stringify({ checked, failures }, null, 2));
if (failures.length) process.exitCode = 1;
