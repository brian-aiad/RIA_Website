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
check(await mobile.locator(".contact-desk__hours").getByText("10:00am – 5:00pm").isVisible(), "Updated weekday office hours are missing");
check(await mobile.locator(".contact-desk__hours").getByText("Closed").count() === 2, "Weekend closure hours are inconsistent");

await mobile.locator(".atlas-nav__menu").click();
check(await mobile.locator("#mobile-nav").getAttribute("aria-hidden") === "false", "Mobile menu did not open");
const mobileNavMetrics = await mobile.locator("#mobile-nav").evaluate((node) => {
  const rect = node.getBoundingClientRect();
  return { height: rect.height, viewport: window.innerHeight, overflowY: getComputedStyle(node).overflowY };
});
check(Math.abs(mobileNavMetrics.height - mobileNavMetrics.viewport) < 2, `Mobile menu is not viewport-height: ${JSON.stringify(mobileNavMetrics)}`);
check(mobileNavMetrics.overflowY === "auto", `Mobile menu is not independently scrollable: ${mobileNavMetrics.overflowY}`);
check(await mobile.locator(".mobile-nav__office").isVisible(), "Mobile menu office details are missing");
await mobile.getByRole("button", { name: "Close navigation" }).click();
check(await mobile.locator("#mobile-nav").getAttribute("aria-hidden") === "true", "Mobile menu did not close");

await mobile.locator(".contact-switchboard button").click();
const dialog = mobile.getByRole("dialog");
await dialog.waitFor({ state: "visible" });
const dialogReceivedFocus = await mobile.waitForFunction(
  () => document.activeElement?.getAttribute("aria-label") === "Close",
  undefined,
  { timeout: 2_000 },
).then(() => true).catch(() => false);
check(dialogReceivedFocus, "Quote dialog did not receive initial focus");
check(await mobile.evaluate(() => document.body.style.overflow) === "hidden", "Quote dialog did not lock background scroll");
const businessQuoteTab = dialog.getByRole("tab", { name: "Business", exact: true });
await businessQuoteTab.click();
check(await businessQuoteTab.getAttribute("aria-selected") === "true", "Quote dialog did not select the business file");
check(await dialog.getByText("Business name and a plain description of the work").isVisible(), "Business quote checklist did not update");
await businessQuoteTab.press("ArrowRight");
const specialtyQuoteTab = dialog.getByRole("tab", { name: "Specialty", exact: true });
check(await specialtyQuoteTab.getAttribute("aria-selected") === "true", "Quote dialog arrow-key navigation failed");
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
check(await reduced.locator(".ria-reviews__score").textContent().then((text) => text?.includes("4.9") && text.includes("17 Google reviews")), "Google rating summary is missing or stale");
check(await reduced.locator(".ria-reviews blockquote").count() === 4, "Expected four real Google review excerpts");
check(await reduced.locator(".ria-reviews__note").textContent().then((text) => text?.includes("Selected public review excerpts") && text.includes("Individual experiences vary")), "Review selection or outcome disclosure is missing");
check(await reduced.locator(`a[href="https://cdicloud.insurance.ca.gov/cal"]`).isVisible(), "California license verification link is missing");

const claimTab = reduced.getByRole("tab", { name: /Claim next steps/ });
await claimTab.click();
check(await claimTab.getAttribute("aria-selected") === "true", "Broker service desk did not select the claim file");
const serviceDeskPanel = reduced.locator(".broker-cases").getByRole("tabpanel");
check(await serviceDeskPanel.getByRole("heading", { level: 3 }).textContent() === "A local person can help you find the next step.", "Broker service desk claim content did not update");
check(await serviceDeskPanel.locator('img[src*="claims-service-v8"]').isVisible(), "Corrected claims artwork did not load in the service desk");
await reduced.keyboard.press("ArrowRight");
const certificateTab = reduced.getByRole("tab", { name: /Certificate or bond/ });
check(await certificateTab.getAttribute("aria-selected") === "true", "Broker service desk arrow-key navigation failed");

await reduced.locator(".ria-hero__actions button").click();
const reducedDialog = reduced.getByRole("dialog");
await reducedDialog.waitFor({ state: "visible" });
const reducedDialogStyle = await reducedDialog.evaluate((node) => ({
  opacity: getComputedStyle(node).opacity,
  transform: getComputedStyle(node).transform,
}));
check(reducedDialogStyle.opacity === "1", "Reduced-motion quote dialog was not immediately visible");

await reduced.goto(`${base}/auto-insurance-los-angeles-ca/`, { waitUntil: "networkidle" });
check(await reduced.locator('img[src*="auto-review-v8"]').first().isVisible(), "Corrected auto artwork is not referenced on the auto coverage page");

await reduced.goto(`${base}/privacy/`, { waitUntil: "networkidle" });
check(await reduced.getByRole("heading", { name: "No online insurance submission" }).isVisible(), "Privacy notice does not explain the no-form workflow");
check(await reduced.getByText(/Vercel hosts the site and provides Web Analytics and Speed Insights/).isVisible(), "Analytics disclosure is missing");
check(await reduced.locator("form").count() === 0, "A data-collection form appeared on the privacy route");

await reduced.goto(`${base}/accessibility/`, { waitUntil: "networkidle" });
check(await reduced.getByText(/WCAG 2.2 Level AA is the site’s working accessibility target/).isVisible(), "WCAG 2.2 working target is missing");
check(await reduced.getByRole("heading", { name: "Testing and limitations" }).isVisible(), "Accessibility testing limitations are missing");

const motionContext = await chromiumBrowser.newContext({ viewport: { width: 1440, height: 900 } });
const motionPage = await motionContext.newPage();
motionPage.setDefaultTimeout(10_000);
await motionPage.goto(`${base}/`, { waitUntil: "networkidle" });
await motionPage.waitForTimeout(1_500);
check(await motionPage.locator(".route-frame").evaluate((node) => node.classList.contains("motion-managed")), "GSAP enhancement did not initialize for standard motion");
await motionPage.locator(".ria-reviews").scrollIntoViewIfNeeded();
await motionPage.waitForTimeout(1_500);
const reviewMotionState = await motionPage.locator(".ria-reviews blockquote").evaluateAll((nodes) => nodes.map((node) => ({ opacity: getComputedStyle(node).opacity, transform: getComputedStyle(node).transform })));
check(reviewMotionState.every((state) => state.opacity === "1" && state.transform === "none"), `Review scroll animation did not settle cleanly: ${JSON.stringify(reviewMotionState)}`);
check(await motionPage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), "Homepage has horizontal overflow at 1440px");

await chromiumBrowser.close();

console.log(JSON.stringify({ checks, failures, mobileNavMetrics, reducedDialogStyle, reviewMotionState }, null, 2));
if (failures.length) process.exitCode = 1;
