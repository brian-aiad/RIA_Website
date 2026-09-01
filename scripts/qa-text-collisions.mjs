import { chromium } from "playwright";

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
  { name: "compact", width: 320, height: 568 },
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
  { name: "short-landscape", width: 844, height: 390 },
];

const browser = await chromium.launch({ headless: true });
const failures = [];
let checked = 0;

for (const viewport of viewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    reducedMotion: "reduce",
  });

  for (const route of routes) {
    const page = await context.newPage();
    const target = route === "/" ? route : `${route}/`;
    try {
      await page.goto(`${base}${target}`, { waitUntil: "networkidle", timeout: 20_000 });
      await page.evaluate(async () => {
        const maximum = document.documentElement.scrollHeight - innerHeight;
        for (let y = 0; y <= maximum; y += Math.max(300, innerHeight * 0.8)) {
          scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 18));
        }
        scrollTo(0, 0);
        await new Promise((resolve) => setTimeout(resolve, 80));
      });

      const collisions = await page.evaluate(() => {
        const main = document.querySelector("main");
        if (!main) return ["main element missing"];

        const fragments = [];
        const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
        let node = walker.nextNode();

        while (node) {
          const text = node.textContent?.replace(/\s+/g, " ").trim() ?? "";
          const owner = node.parentElement;
          const closedDisclosure = owner?.closest("details:not([open])");
          const isClosedAnswer = Boolean(closedDisclosure && !owner?.closest("summary"));
          if (text && owner && !isClosedAnswer && !owner.closest("[aria-hidden='true'], script, style, noscript")) {
            const style = getComputedStyle(owner);
            if (style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) > 0.04) {
              const range = document.createRange();
              range.selectNodeContents(node);
              Array.from(range.getClientRects()).forEach((rect) => {
                if (rect.width > 2 && rect.height > 2) {
                  fragments.push({
                    owner,
                    text: text.slice(0, 70),
                    left: rect.left,
                    right: rect.right,
                    top: rect.top,
                    bottom: rect.bottom,
                  });
                }
              });
              range.detach();
            }
          }
          node = walker.nextNode();
        }

        const hits = [];
        for (let i = 0; i < fragments.length; i += 1) {
          for (let j = i + 1; j < fragments.length; j += 1) {
            const a = fragments[i];
            const b = fragments[j];
            if (a.owner === b.owner || a.owner.contains(b.owner) || b.owner.contains(a.owner)) continue;
            const overlapX = Math.min(a.right, b.right) - Math.max(a.left, b.left);
            const overlapY = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
            // Large display faces can extend a few pixels outside their CSS
            // line box without producing a visible collision. Four pixels
            // filters that glyph overhang while retaining true text overlap.
            if (overlapX > 4 && overlapY > 4) {
              hits.push(`${a.owner.tagName} "${a.text}" ↔ ${b.owner.tagName} "${b.text}"`);
              if (hits.length >= 8) return hits;
            }
          }
        }
        return hits;
      });

      if (collisions.length) failures.push(`${viewport.name} ${route}: ${collisions.join(" | ")}`);
      checked += 1;
    } catch (error) {
      failures.push(`${viewport.name} ${route}: ${error.message}`);
    } finally {
      await page.close();
    }
  }
  await context.close();
}

await browser.close();
console.log(JSON.stringify({ checked, failures }, null, 2));
if (failures.length) process.exitCode = 1;
