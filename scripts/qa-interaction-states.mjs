import { chromium, webkit } from "playwright";

const base = process.env.QA_BASE_URL ?? "http://127.0.0.1:4174";
const targets = [
  ["/", ".ria-story"],
  ["/locations", ".city-record"],
  ["/contact", ".contact-switchboard__grid > a"],
  ["/insurance/mar-vista", ".city-coverage__grid a, .nearby-files__grid a"],
  ["/services", ".services-briefs__list a"],
];
const failures = [];
let checks = 0;
const check = (ok, message) => { checks++; if (!ok) failures.push(message); };

// Inspect the actual painted text backgrounds, including translucent ancestors.
// Checking interaction states catches defects that an initial-page scan misses.
async function inspect(card) {
  return card.evaluate((element) => {
    const rgba = (value) => {
      const n = value.match(/[\d.]+/g)?.map(Number) ?? [0, 0, 0];
      return [n[0], n[1], n[2], n[3] ?? 1];
    };
    const over = (front, back) => front.slice(0, 3).map((v, i) => v * front[3] + back[i] * (1 - front[3]));
    const background = (node) => {
      const ancestors = [];
      for (let p = node; p; p = p.parentElement) ancestors.unshift(p);
      return ancestors.reduce((color, p) => over(rgba(getComputedStyle(p).backgroundColor), color), [255, 255, 255]);
    };
    const luminance = (rgb) => rgb.map((v) => {
      const c = v / 255;
      return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    }).reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
    const text = [];
    for (const node of [element, ...element.querySelectorAll("*")]) {
      const style = getComputedStyle(node);
      if (node.closest("svg, [aria-hidden='true']") || !node.getClientRects().length || style.visibility === "hidden") continue;
      const directText = [...node.childNodes].filter((n) => n.nodeType === Node.TEXT_NODE).map((n) => n.textContent.trim()).join(" ").trim();
      if (!directText) continue;
      const bg = background(node);
      const fg = over(rgba(style.color), bg);
      const a = luminance(bg), b = luminance(fg);
      const large = parseFloat(style.fontSize) >= 24 || (parseFloat(style.fontSize) >= 18.66 && parseFloat(style.fontWeight) >= 700);
      text.push({ text: directText.slice(0, 55), ratio: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05), minimum: large ? 3 : 4.5 });
    }
    const style = getComputedStyle(element);
    const matrix = new DOMMatrix(style.transform === "none" ? undefined : style.transform);
    return {
      text, shadow: style.boxShadow,
      shift: Math.hypot(matrix.m41, matrix.m42),
      focused: element.matches(":focus-visible"),
      outline: parseFloat(style.outlineWidth) >= 2 && !["none", "hidden"].includes(style.outlineStyle),
    };
  });
}

for (const profile of [
  { name: "desktop", engine: chromium, viewport: { width: 1440, height: 1000 }, touch: false },
  { name: "iphone-webkit", engine: webkit, viewport: { width: 390, height: 844 }, touch: true },
]) {
  const browser = await profile.engine.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: profile.viewport, isMobile: profile.touch, hasTouch: profile.touch });
    page.setDefaultTimeout(10000);
    for (const [route, selector] of targets) {
      await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
      const cards = page.locator(selector);
      check(await cards.count() > 0, `${profile.name} ${route}: no cards matched ${selector}`);
      const storyShadows = { hover: [], focus: [] };
      for (let i = 0; i < await cards.count(); i++) {
        const card = cards.nth(i);
        await card.scrollIntoViewIfNeeded();
        await page.waitForTimeout(750); // Let the section's entry animation finish.
        for (const state of profile.touch ? ["focus"] : ["hover", "focus"]) {
          await page.mouse.move(0, 0);
          await card.evaluate((node) => node.blur());
          if (state === "hover") await card.hover();
          else {
            // WebKit's platform setting may skip links during sequential Tab.
            // Establish keyboard modality, then inspect this link's focus state.
            await page.keyboard.press("Tab");
            await card.focus();
          }
          await page.waitForTimeout(240);
          const result = await inspect(card);
          const label = `${profile.name} ${route} card ${i + 1} ${state}`;
          check(result.shift < 0.5, `${label}: card lifts/shifts ${result.shift.toFixed(2)}px`);
          for (const text of result.text) check(text.ratio >= text.minimum - 0.03, `${label}: contrast ${text.ratio.toFixed(2)} < ${text.minimum} for "${text.text}"`);
          if (state === "focus") {
            check(result.focused, `${label}: keyboard did not reach the card`);
            check(result.outline, `${label}: missing visible focus outline`);
          }
          if (route === "/") storyShadows[state].push(result.shadow);
        }
      }
      if (route === "/") for (const [state, shadows] of Object.entries(storyShadows)) {
        if (shadows.length) check(new Set(shadows).size === 1, `${profile.name} story ${state}: inconsistent shadows ${JSON.stringify(shadows)}`);
      }
      console.log(`${profile.name} ${route}: interaction states inspected`);
    }
  } finally {
    await browser.close();
  }
}
console.log(`Interaction states: ${checks} checks, ${failures.length} failures.`);
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
}
