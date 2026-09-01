import { chromium } from "playwright";

const base = process.env.QA_BASE_URL ?? "http://127.0.0.1:4174";
const profiles = [
  { name: "desktop-uncached", width: 1440, height: 900 },
  { name: "mobile-uncached", width: 390, height: 844 },
  { name: "mobile-slow-network", width: 390, height: 844, slow: true },
];
const failures = [];
const measurements = [];
const browser = await chromium.launch({ headless: true });

for (const profile of profiles) {
  const context = await browser.newContext({
    viewport: { width: profile.width, height: profile.height },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  if (profile.slow) {
    await cdp.send("Network.emulateNetworkConditions", {
      offline: false,
      latency: 150,
      downloadThroughput: 210_000,
      uploadThroughput: 96_000,
    });
  }

  await page.addInitScript(() => {
    window.__qaPerformance = { cls: 0, lcp: 0, longTasks: 0, longTaskDuration: 0 };
    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) window.__qaPerformance.cls += entry.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries.at(-1);
        if (last) window.__qaPerformance.lcp = last.startTime;
      }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          window.__qaPerformance.longTasks += 1;
          window.__qaPerformance.longTaskDuration += entry.duration;
        }
      }).observe({ type: "longtask", buffered: true });
    } catch {
      // A missing observer type is reported as a zero metric, not a page error.
    }
  });

  const consoleErrors = [];
  const failedRequests = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("pageerror", (error) => consoleErrors.push(error.message));
  page.on("requestfailed", (request) => failedRequests.push(request.url()));

  try {
    await page.goto(base, { waitUntil: "networkidle", timeout: 45_000 });
    await page.waitForTimeout(1_500);
    const result = await page.evaluate(() => {
      const navigation = performance.getEntriesByType("navigation")[0];
      const paints = Object.fromEntries(performance.getEntriesByType("paint").map((entry) => [entry.name, entry.startTime]));
      const resources = performance.getEntriesByType("resource");
      const bytesByType = {};
      for (const resource of resources) {
        const type = resource.initiatorType || "other";
        bytesByType[type] = (bytesByType[type] ?? 0) + (resource.encodedBodySize || resource.transferSize || 0);
      }
      return {
        responseEnd: navigation.responseEnd,
        domContentLoaded: navigation.domContentLoadedEventEnd,
        load: navigation.loadEventEnd,
        firstContentfulPaint: paints["first-contentful-paint"] ?? 0,
        ...window.__qaPerformance,
        resources: resources.length,
        encodedBytes: Object.values(bytesByType).reduce((sum, value) => sum + value, 0),
        bytesByType,
        domNodes: document.getElementsByTagName("*").length,
        fonts: document.fonts.status,
        h1Visible: Boolean(document.querySelector("main h1")?.getBoundingClientRect().height),
        brokenImages: Array.from(document.images).filter((image) => {
          const rect = image.getBoundingClientRect();
          const inViewport = rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth;
          return inViewport && image.complete && image.naturalWidth === 0;
        }).length,
      };
    });
    measurements.push({ profile: profile.name, ...result });
    if (!result.h1Visible) failures.push(`${profile.name}: H1 was not immediately visible`);
    if (result.brokenImages) failures.push(`${profile.name}: ${result.brokenImages} broken visible images`);
    if (result.cls > 0.1) failures.push(`${profile.name}: CLS ${result.cls.toFixed(4)} exceeds 0.1`);
    if (consoleErrors.length) failures.push(`${profile.name}: console ${consoleErrors.join(" | ")}`);
    if (failedRequests.length) failures.push(`${profile.name}: failed requests ${failedRequests.join(", ")}`);
  } catch (error) {
    failures.push(`${profile.name}: ${error.message}`);
  } finally {
    await context.close();
  }
}

await browser.close();
console.log(JSON.stringify({ profiles: measurements.length, measurements, failures }, null, 2));
if (failures.length) process.exitCode = 1;
