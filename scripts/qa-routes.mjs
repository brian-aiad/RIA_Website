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
];

const viewports = [
  { name: "compact", width: 320, height: 568 },
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 950 },
  { name: "wide", width: 1920, height: 1080 },
];

const failures = [];
let checked = 0;

const suites = [
  { name: "chromium", engine: chromium, viewports },
  { name: "webkit", engine: webkit, viewports: viewports.filter(({ name }) => name === "compact" || name === "mobile") },
  { name: "reduced", engine: chromium, viewports: [{ name: "mobile", width: 390, height: 844 }], reducedMotion: "reduce" },
];

for (const suite of suites) {
  const browser = await suite.engine.launch({ headless: true });

  for (const viewport of suite.viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      reducedMotion: suite.reducedMotion ?? "no-preference",
    });

    for (const route of routes) {
      const page = await context.newPage();
      const previewPath = route === "/" ? route : `${route}/`;
      const consoleErrors = [];
      page.on("console", (message) => {
        if (message.type() === "error") consoleErrors.push(message.text());
      });
      page.on("pageerror", (error) => consoleErrors.push(error.message));

    try {
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
        await Promise.all(
          Array.from(document.images, (image) =>
            typeof image.decode === "function" ? image.decode().catch(() => undefined) : undefined,
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
      if (route !== "/" && result.h1Text.includes("Coverage for Los Angeles")) problems.push("homepage fallback rendered for a deep route");
      if (result.horizontalOverflow > 1) problems.push(`${result.horizontalOverflow}px horizontal overflow`);
      if (result.brokenImages.length) problems.push(`broken images: ${result.brokenImages.join(", ")}`);
      if (result.hiddenContent.length) problems.push(`hidden content: ${result.hiddenContent.join(", ")}`);
      if (result.clippedText.length) problems.push(`clipped text: ${result.clippedText.join(", ")}`);
      if (consoleErrors.length) problems.push(`console: ${consoleErrors.join(" | ")}`);
      if (problems.length) failures.push(`${suite.name}/${viewport.name} ${route}: ${problems.join("; ")}`);
      checked += 1;
    } catch (error) {
      failures.push(`${suite.name}/${viewport.name} ${route}: ${error.message}`);
    } finally {
      await page.close();
    }
  }

    await context.close();
  }

  await browser.close();
}
console.log(JSON.stringify({ checked, failures }, null, 2));
if (failures.length) process.exitCode = 1;
