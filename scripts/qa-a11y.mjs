import AxeBuilder from "@axe-core/playwright";
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
const viewports = [
  { name: "modern-phone", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
];
const failures = [];
let scans = 0;
let rulePasses = 0;

const browser = await chromium.launch({ headless: true });
for (const viewport of viewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    reducedMotion: "reduce",
  });

  for (const route of routes) {
    const page = await context.newPage();
    try {
      await page.goto(`${base}${route}`, { waitUntil: "networkidle", timeout: 20_000 });
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      scans += 1;
      rulePasses += results.passes.length;
      for (const violation of results.violations) {
        const nodes = violation.nodes.slice(0, 4).map((node) => node.target.join(" ")).join(", ");
        failures.push(`${viewport.name} ${route}: ${violation.id} (${violation.impact ?? "unknown"}) — ${nodes}`);
      }
    } catch (error) {
      failures.push(`${viewport.name} ${route}: ${error.message}`);
    } finally {
      await page.close();
    }
  }
  await context.close();
}
await browser.close();

console.log(JSON.stringify({ scans, rulePasses, violations: failures.length, failures }, null, 2));
if (failures.length) process.exitCode = 1;
