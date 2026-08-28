import { chromium, webkit } from "playwright";

const base = process.env.QA_BASE_URL ?? "http://127.0.0.1:4174";
const failures = [];
let checks = 0;

function check(condition, message) {
  checks += 1;
  if (!condition) failures.push(message);
}

const webkitBrowser = await webkit.launch({ headless: true });
const mobile = await webkitBrowser.newPage({ viewport: { width: 390, height: 844 } });
mobile.setDefaultTimeout(10_000);
await mobile.goto(`${base}/contact/`, { waitUntil: "networkidle" });

const emailHref = await mobile.locator('a[href^="mailto:"]').first().getAttribute("href");
check(emailHref === "mailto:contact@raflainsurance.com", `Public mail link mismatch: ${emailHref}`);

await mobile.locator(".atlas-nav__menu").click();
check(await mobile.locator("#mobile-nav").getAttribute("aria-hidden") === "false", "Mobile menu did not open");
await mobile.getByRole("button", { name: "Close navigation" }).click();
check(await mobile.locator("#mobile-nav").getAttribute("aria-hidden") === "true", "Mobile menu did not close");

await mobile.locator(".contact-switchboard button").click();
const dialog = mobile.getByRole("dialog");
await dialog.waitFor({ state: "visible" });
check(await mobile.evaluate(() => document.activeElement?.getAttribute("aria-label")) === "Close", "Quote dialog did not receive initial focus");
check(await mobile.evaluate(() => document.body.style.overflow) === "hidden", "Quote dialog did not lock background scroll");
await mobile.keyboard.press("Escape");
await dialog.waitFor({ state: "hidden" });
check(await mobile.evaluate(() => document.body.style.overflow) === "", "Quote dialog did not restore background scroll");
await webkitBrowser.close();

const chromiumBrowser = await chromium.launch({ headless: true });
const reducedContext = await chromiumBrowser.newContext({
  viewport: { width: 390, height: 844 },
  reducedMotion: "reduce",
});
const reduced = await reducedContext.newPage();
reduced.setDefaultTimeout(10_000);
await reduced.goto(`${base}/`, { waitUntil: "networkidle" });
await reduced.waitForTimeout(1_400);
check(!await reduced.locator(".route-frame").evaluate((node) => node.classList.contains("motion-managed")), "GSAP initialized under reduced motion");
await reduced.locator(".ria-hero__actions button").click();
const reducedDialog = reduced.getByRole("dialog");
await reducedDialog.waitFor({ state: "visible" });
const reducedDialogStyle = await reducedDialog.evaluate((node) => ({
  opacity: getComputedStyle(node).opacity,
  transform: getComputedStyle(node).transform,
}));
check(reducedDialogStyle.opacity === "1", "Reduced-motion quote dialog was not immediately visible");
await chromiumBrowser.close();

console.log(JSON.stringify({ checks, failures, reducedDialogStyle }, null, 2));
if (failures.length) process.exitCode = 1;
