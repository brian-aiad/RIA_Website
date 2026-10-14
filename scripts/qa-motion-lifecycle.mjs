import { chromium, webkit } from "playwright";
import { mkdir } from "node:fs/promises";

const base = process.env.QA_BASE_URL ?? "http://127.0.0.1:4174";
const output = "output/playwright/motion-lifecycle";
await mkdir(output, { recursive: true });
const failures = [];
let checks = 0;
const check = (condition, message) => { checks++; if (!condition) failures.push(message); };

for (const profile of [
  { engine: chromium, name: "desktop", width: 1440, height: 1000, touch: false },
  { engine: webkit, name: "phone", width: 390, height: 844, touch: true },
]) {
  const browser = await profile.engine.launch();
  try {
    const context = await browser.newContext({ viewport: { width: profile.width, height: profile.height }, hasTouch: profile.touch, isMobile: profile.touch });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(`${base}/services`);
    await page.screenshot({ path: `${output}/${profile.name}-initial.png` });
    check(await page.locator("h1").evaluate(n => getComputedStyle(n).opacity === "1" && n.getBoundingClientRect().height > 0), `${profile.name}: initial heading is hidden`);
    await page.locator('.route-frame[data-motion-state="ready"]').waitFor();
    const register = page.locator(".service-ledger [data-register-line]").first();
    check(await register.count() > 0, `${profile.name}: service drawing registration detail missing`);
    if (await register.count()) {
      const before = await register.evaluate(n => parseFloat(getComputedStyle(n).strokeDashoffset));
      check(before > 0, `${profile.name}: upcoming drawing completed before entering view`);
      await register.evaluate(n => scrollTo(0, scrollY + n.getBoundingClientRect().top - innerHeight * .8));
      await page.waitForTimeout(130);
      await page.screenshot({ path: `${output}/${profile.name}-active.png` });
      await page.waitForTimeout(1100);
      check(await register.evaluate(n => n.style.strokeDashoffset === "" && Number.parseFloat(getComputedStyle(n).strokeDashoffset) === 0), `${profile.name}: drawing did not finish and clear animation styles`);
      await page.screenshot({ path: `${output}/${profile.name}-settled.png` });
    }

    // A pointer/keyboard target must stop moving as soon as it is used, even
    // when the entrance would otherwise still be running.
    const lastCard = page.locator(".service-ledger").last();
    await lastCard.evaluate(n => scrollTo(0, scrollY + n.getBoundingClientRect().top - innerHeight * .8));
    await page.waitForTimeout(40);
    await lastCard.locator(".service-ledger__quote").focus();
    check(await lastCard.evaluate(n => getComputedStyle(n).transform === "none"), `${profile.name}: focused quote link sits in a moving card`);

    // Fast travel in both directions cannot leave text hidden or parked off-axis.
    await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(1200);
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(400);
    check(await page.locator(".service-ledger").evaluateAll(nodes => nodes.every(n => getComputedStyle(n).transform === "none")), `${profile.name}: reverse scroll resurrected finished entrances`);
    check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${profile.name}: animation introduced horizontal overflow`);

    // Keep a detached node reference to prove route cleanup restores its styles.
    await page.evaluate(() => { window.__previousMotionNode = document.querySelector(".service-ledger"); });
    await page.locator('.atlas-nav__brand').click();
    await page.waitForURL(`${base}/`);
    await page.waitForFunction(() => !window.__previousMotionNode.isConnected);
    await page.locator('.route-frame[data-motion-state="ready"]').waitFor();
    check(await page.evaluate(() => !window.__previousMotionNode.isConnected && window.__previousMotionNode.style.transform === ""), `${profile.name}: navigation did not revert the old scene`);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForTimeout(500);
    check(await page.locator(".motion-managed").count() === 0, `${profile.name}: reduced-motion preference did not clean up`);
    check(await page.locator("[data-register-line]").evaluateAll(nodes => nodes.every(n => !n.style.strokeDashoffset)), `${profile.name}: reduced motion left drawings partially registered`);
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.locator('.route-frame[data-motion-state="ready"]').waitFor();
    if (profile.touch) {
      await page.locator(".atlas-nav__menu").click();
      await page.locator(".mobile-nav.is-open").waitFor();
      await page.setViewportSize({ width: 1024, height: 768 });
      await page.waitForTimeout(350);
      check(await page.evaluate(() => !document.documentElement.classList.contains("nav-open") && !document.querySelector("main")?.hasAttribute("inert") && document.activeElement?.classList.contains("atlas-nav__brand")), "Mobile navigation stayed trapped after widening to desktop");
    }
    await page.setViewportSize({ width: profile.touch ? 844 : 1024, height: profile.touch ? 390 : 768 });
    await page.waitForTimeout(500);
    check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${profile.name}: resized scene overflows`);
    await page.setViewportSize({ width: profile.width, height: profile.height });
    const background = await context.newPage();
    await background.goto(`${base}/faq`);
    await background.close();
    await page.bringToFront();
    await page.waitForTimeout(350);
    check(await page.locator(".route-frame").count() === 1, `${profile.name}: background return duplicated the scene`);
    if (profile.touch) check(await page.locator(".page-scroll-progress").evaluate(n => getComputedStyle(n).display === "none"), "Phone retained scroll-linked decoration");
    check(errors.length === 0, `${profile.name}: runtime errors ${errors.join(" | ")}`);
  } finally { await browser.close(); }
}
console.log(JSON.stringify({ checks, failures, screenshots: output }, null, 2));
if (failures.length) process.exitCode = 1;
