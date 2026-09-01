import { chromium } from "playwright";

const base = process.env.QA_BASE_URL ?? "http://127.0.0.1:4174";
const failures = [];
let checks = 0;

function check(condition, message) {
  checks += 1;
  if (!condition) failures.push(message);
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const consoleErrors = [];
const failedResources = [];
page.on("console", (message) => {
  if (message.type() === "error") consoleErrors.push(message.text());
});
page.on("pageerror", (error) => consoleErrors.push(error.message));
page.on("requestfailed", (request) => failedResources.push(`${request.method()} ${request.url()}`));

await page.goto(`${base}/`, { waitUntil: "networkidle" });
await page.waitForTimeout(1_500);
check(await page.locator(".route-frame").count() === 1, "Initial route rendered more than one motion scope");
check(await page.locator(".route-frame").getAttribute("data-motion-state") === "ready", "Standard motion did not initialize");
check(await page.locator(".route-frame").evaluate((node) => node.classList.contains("motion-managed")), "GSAP scope is not marked as managed");

const heroState = await page.locator(".ria-hero").evaluate((hero) => ({
  copy: getComputedStyle(hero.querySelector(".ria-hero__copy")).transform,
  plate: getComputedStyle(hero.querySelector(".ria-hero__office")).transform,
  h1Visible: hero.querySelector("h1").getBoundingClientRect().height > 0,
}));
check(heroState.copy === "none", `Homepage copy did not settle: ${heroState.copy}`);
check(heroState.plate === "none", `Homepage image plate did not settle: ${heroState.plate}`);
check(heroState.h1Visible, "Homepage headline was not visible after initialization");

for (const selector of [".brokerage-path", ".coverage-motion", ".ria-coverage", ".broker-cases", ".ria-reviews", ".quote-band"]) {
  await page.locator(selector).scrollIntoViewIfNeeded();
  await page.waitForTimeout(850);
  const state = await page.locator(selector).evaluate((section) => ({
    hiddenMeaningful: Array.from(section.querySelectorAll("h2,h3,p,a,button"))
      .some((node) => Number(getComputedStyle(node).opacity) < 0.05 || getComputedStyle(node).visibility === "hidden"),
    overflow: document.documentElement.scrollWidth - innerWidth,
  }));
  check(!state.hiddenMeaningful, `${selector} left meaningful content hidden`);
  check(state.overflow <= 1, `${selector} introduced ${state.overflow}px root overflow`);
}

await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
await page.waitForTimeout(1_000);
const settledState = await page.evaluate(() => ({
  staleReveals: Array.from(document.querySelectorAll(".motion-reveal"))
    .filter((node) => getComputedStyle(node).transform !== "none")
    .map((node) => node.className)
    .slice(0, 8),
  willChange: Array.from(document.querySelectorAll("main *"))
    .filter((node) => !["auto", "contents"].includes(getComputedStyle(node).willChange))
    .map((node) => node.className)
    .slice(0, 8),
}));
check(settledState.staleReveals.length === 0, `Settled homepage retained reveal transforms: ${settledState.staleReveals.join(", ")}`);
check(settledState.willChange.length === 0, `Homepage retained will-change layers: ${settledState.willChange.join(", ")}`);

await page.goto(`${base}/contact/`, { waitUntil: "networkidle" });
await page.locator(".contact-next").scrollIntoViewIfNeeded();
await page.waitForTimeout(1_500);
const contactMotion = await page.locator(".contact-next").evaluate((section) => ({
  line: getComputedStyle(section.querySelector(".contact-next__route")).transform,
  markers: Array.from(section.querySelectorAll("li > span"), (node) => getComputedStyle(node).transform),
}));
check(contactMotion.line === "none", `Contact registration line did not settle: ${contactMotion.line}`);
check(contactMotion.markers.every((value) => value === "none"), `Contact step markers did not settle: ${contactMotion.markers.join(", ")}`);

for (let iteration = 0; iteration < 4; iteration += 1) {
  await page.locator(".atlas-nav__quote").click();
  const dialog = page.getByRole("dialog");
  await dialog.waitFor({ state: "visible" });
  const closeFocused = await page.waitForFunction(
    () => document.activeElement?.classList.contains("quote-dialog__close"),
    undefined,
    { timeout: 1_000 },
  ).then(() => true).catch(() => false);
  check(closeFocused, `Dialog opening ${iteration + 1} did not focus Close`);
  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "hidden" });
  const focusRestored = await page.waitForFunction(
    () => document.activeElement?.classList.contains("atlas-nav__quote"),
    undefined,
    { timeout: 1_000 },
  ).then(() => true).catch(() => false);
  check(focusRestored, `Dialog closing ${iteration + 1} did not restore focus`);
}

await page.goto(`${base}/`, { waitUntil: "networkidle" });
await page.getByRole("link", { name: "Insurance", exact: true }).click();
await page.waitForURL(`${base}/services`);
await page.waitForTimeout(1_350);
check(await page.locator(".route-frame").count() === 1, "SPA navigation retained a duplicate route frame");
check(await page.locator(".route-frame").getAttribute("data-motion-state") === "ready", "Motion did not reinitialize after SPA navigation");
await page.goBack({ waitUntil: "networkidle" });
await page.waitForTimeout(1_350);
check(await page.locator(".route-frame").count() === 1, "Back navigation retained a duplicate route frame");
check(await page.locator("main h1").textContent().then((text) => text?.includes("Coverage for Los Angeles")), "Back navigation did not restore the homepage");
await page.goForward({ waitUntil: "networkidle" });
await page.waitForTimeout(1_350);
check(await page.locator(".route-frame").count() === 1, "Forward navigation retained a duplicate route frame");
check(await page.locator("main h1").textContent().then((text) => text?.includes("Insurance for what you own")), "Forward navigation did not restore Services");

await page.setViewportSize({ width: 844, height: 390 });
await page.waitForTimeout(500);
check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), "Short landscape resize introduced root overflow");
check(await page.locator(".route-frame").count() === 1, "Resize duplicated the motion scope");
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(500);
check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), "Portrait orientation restore introduced root overflow");

const backgroundPage = await context.newPage();
await backgroundPage.goto(`${base}/faq/`, { waitUntil: "networkidle" });
await backgroundPage.close();
await page.bringToFront();
await page.waitForTimeout(350);
check(await page.locator(".route-frame").count() === 1, "Background-tab return duplicated the motion scope");
check(consoleErrors.length === 0, `Motion review produced console errors: ${consoleErrors.join(" | ")}`);
check(failedResources.length === 0, `Motion review produced failed resources: ${failedResources.join(" | ")}`);
await context.close();

const reducedContext = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
const reduced = await reducedContext.newPage();
await reduced.goto(`${base}/`, { waitUntil: "networkidle" });
await reduced.waitForTimeout(1_400);
check(!await reduced.locator(".route-frame").evaluate((node) => node.classList.contains("motion-managed")), "GSAP initialized in reduced-motion mode");
const reducedHero = await reduced.locator(".ria-hero").evaluate((hero) => ({
  copyAnimation: getComputedStyle(hero.querySelector(".ria-hero__copy")).animationName,
  plateAnimation: getComputedStyle(hero.querySelector(".ria-hero__office")).animationName,
  copyTransform: getComputedStyle(hero.querySelector(".ria-hero__copy")).transform,
  plateTransform: getComputedStyle(hero.querySelector(".ria-hero__office")).transform,
}));
check(reducedHero.copyAnimation === "none" && reducedHero.plateAnimation === "none", `Reduced-motion hero retained animation: ${JSON.stringify(reducedHero)}`);
check(reducedHero.copyTransform === "none" && reducedHero.plateTransform === "none", `Reduced-motion hero retained transforms: ${JSON.stringify(reducedHero)}`);
await reduced.locator(".ria-hero__actions button").click();
const reducedDialog = reduced.getByRole("dialog");
check(await reducedDialog.evaluate((node) => getComputedStyle(node).animationName) === "none", "Reduced-motion dialog retained entry animation");
await reduced.keyboard.press("Escape");
await reducedContext.close();

const forcedContext = await browser.newContext({ viewport: { width: 390, height: 844 }, forcedColors: "active", reducedMotion: "reduce" });
const forced = await forcedContext.newPage();
await forced.goto(`${base}/`, { waitUntil: "networkidle" });
await forced.locator(".atlas-nav__menu").click();
check(await forced.locator("#mobile-nav").getAttribute("aria-hidden") === "false", "Forced-colors menu did not open");
check(await forced.locator(".mobile-nav__main .active").count() === 1, "Forced-colors menu lost its active-page state");
await forced.keyboard.press("Escape");
await forcedContext.close();

await browser.close();

console.log(JSON.stringify({ checks, failures }, null, 2));
if (failures.length) process.exitCode = 1;
