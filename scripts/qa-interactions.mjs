import { chromium, webkit } from "playwright";

const base = process.env.QA_BASE_URL ?? "http://127.0.0.1:4174";
const failures = [];
let checks = 0;

function check(condition, message) {
  checks += 1;
  if (!condition) failures.push(message);
}

async function focusReached(page, selector) {
  return page.waitForFunction(
    (targetSelector) => document.activeElement?.matches(targetSelector),
    selector,
    { timeout: 1_000 },
  ).then(() => true).catch(() => false);
}

const webkitBrowser = await webkit.launch({ headless: true });
const mobile = await webkitBrowser.newPage({ viewport: { width: 390, height: 844 } });
mobile.setDefaultTimeout(10_000);
await mobile.goto(`${base}/contact`, { waitUntil: "networkidle" });

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
check(await mobile.locator("main").getAttribute("inert") === "", "Mobile menu did not make page content inert");
check(await mobile.evaluate(() => document.documentElement.classList.contains("nav-open") && document.body.classList.contains("nav-open")), "Mobile menu did not lock background scroll");
await mobile.keyboard.press("Escape");
check(await mobile.locator("#mobile-nav").getAttribute("aria-hidden") === "true", "Mobile menu did not close");
check(await focusReached(mobile, ".atlas-nav__menu"), "Escape did not restore focus to the mobile-menu trigger");
check(await mobile.locator("main").getAttribute("inert") === null, "Mobile-menu background remained inert after close");

await mobile.locator(".atlas-nav__menu").click();
await mobile.locator(".mobile-nav__main").getByRole("link", { name: "Contact", exact: true }).click();
await mobile.waitForFunction(() => document.querySelector("#mobile-nav")?.getAttribute("aria-hidden") === "true");
check(await mobile.locator("main").getAttribute("inert") === null, "Current-page menu link left the page inert");
check(await focusReached(mobile, ".atlas-nav__menu"), "Current-page menu link did not close and restore focus");

await mobile.locator(".atlas-nav__menu").click();
await mobile.locator(".mobile-nav-backdrop").click({ position: { x: 5, y: 180 } });
check(await mobile.locator("#mobile-nav").getAttribute("aria-hidden") === "true", "Mobile-menu backdrop did not close the menu");
check(await focusReached(mobile, ".atlas-nav__menu"), "Backdrop close did not restore focus to the mobile-menu trigger");

await mobile.locator(".atlas-nav__menu").click();
await mobile.locator(".mobile-nav__quote").click();
await mobile.waitForURL("**/contact#quote-request");
check(await mobile.locator("#mobile-nav").getAttribute("aria-hidden") === "true", "Quote navigation left the mobile menu open");
check(await focusReached(mobile, "#quote-request"), "Mobile menu quote link did not focus the form section");
check(await mobile.locator("main").getAttribute("inert") === null, "Mobile quote navigation left the page inert");

await mobile.locator(".contact-switchboard__grid").scrollIntoViewIfNeeded();
await mobile.evaluate(() => scrollBy(0, 220));
await mobile.waitForTimeout(450);
check(await mobile.locator(".contact-switchboard__grid").evaluate((node) => node.scrollWidth <= node.clientWidth + 1 && getComputedStyle(node).display === "grid" && node.querySelectorAll("a").length === 4), "Mobile contact channels should show all four choices without horizontal scrolling");
const quickActionMetrics = await mobile.locator(".mobile-quick-actions").evaluate((node) => ({
  visible: node.classList.contains("is-visible") && node.getAttribute("aria-hidden") === "false",
  targets: Array.from(node.querySelectorAll("a,button"), (target) => {
    const rect = target.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  }),
}));
check(quickActionMetrics.visible, "Mobile call/quote actions did not appear after the introduction");
check(quickActionMetrics.targets.every(({ width, height }) => width >= 44 && height >= 44), `Mobile quick-action targets are too small: ${JSON.stringify(quickActionMetrics.targets)}`);

const quickQuoteBox = await mobile.locator(".mobile-quick-actions__quote").boundingBox();
check(Boolean(quickQuoteBox), "Mobile quote action does not have a visible click target");
await mobile.locator(".mobile-quick-actions__quote").click();
check(await focusReached(mobile, "#quote-request"), "Repeated same-page quote navigation did not focus the form");
await mobile.waitForTimeout(250);
check(await mobile.locator(".mobile-quick-actions").getAttribute("aria-hidden") === "true", "Mobile quick actions did not yield to the quote form");
check(await mobile.evaluate(() => document.body.style.overflow !== "hidden" && !document.querySelector("main").inert), "Quote form navigation locked the page");
check(await mobile.locator('#quote-request input[type="file"]').count() === 0, "Contact request unexpectedly accepts uploads");
check(await mobile.evaluate(() => localStorage.length === 0 && sessionStorage.length === 0), "Quote navigation wrote to browser storage");

const landscape = await webkitBrowser.newPage({ viewport: { width: 844, height: 390 } });
landscape.setDefaultTimeout(10_000);
await landscape.goto(`${base}/`, { waitUntil: "networkidle" });
await landscape.locator(".atlas-nav__menu").click();
const landscapeMenuMetrics = await landscape.locator("#mobile-nav").evaluate((node) => ({
  height: node.getBoundingClientRect().height,
  viewport: innerHeight,
  overflowY: getComputedStyle(node).overflowY,
}));
check(Math.abs(landscapeMenuMetrics.height - landscapeMenuMetrics.viewport) < 2, `Landscape menu is not viewport-height: ${JSON.stringify(landscapeMenuMetrics)}`);
check(landscapeMenuMetrics.overflowY === "auto", `Landscape menu is not independently scrollable: ${landscapeMenuMetrics.overflowY}`);
await landscape.locator("#mobile-nav").evaluate((node) => node.scrollTo({ top: node.scrollHeight, behavior: "instant" }));
check(await landscape.locator(".mobile-nav__quote").isVisible(), "Landscape menu cannot reach the quote action");
await landscape.keyboard.press("Escape");
check(await focusReached(landscape, ".atlas-nav__menu"), "Landscape-menu Escape did not restore focus");
await landscape.locator(".ria-hero__actions .atlas-button").click();
check(await focusReached(landscape, "#quote-request"), "Landscape quote navigation did not focus form");
const landscapeFormMetrics = await landscape.locator("#quote-request").evaluate(node => ({ width: node.getBoundingClientRect().width, viewport: innerWidth, overflow: document.documentElement.scrollWidth - innerWidth }));
check(landscapeFormMetrics.overflow <= 1, `Landscape quote form overflows: ${JSON.stringify(landscapeFormMetrics)}`);
await landscape.locator('#quote-request button[type="submit"]').scrollIntoViewIfNeeded();
check(await landscape.locator('#quote-request button[type="submit"]').isVisible(), "Landscape cannot reach the quote submit action");
await landscape.close();
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
check(await reduced.locator(".ria-service-strip").evaluate((node) => node.getBoundingClientRect().height < 100), "Mobile coverage shortcuts are still using a tall multi-row layout");
check(await reduced.locator(".ria-reviews__ledger").evaluate((node) => node.scrollWidth > node.clientWidth && node.tabIndex === 0), "Mobile reviews are not a keyboard-focusable compact rail");
check(await reduced.evaluate(() => document.body.scrollHeight < 11_000), "Mobile homepage remains excessively long after content prioritization");

const claimTab = reduced.getByRole("tab", { name: /Claim next steps/ });
await claimTab.click();
check(await claimTab.getAttribute("aria-selected") === "true", "Broker service desk did not select the claim file");
const serviceDeskPanel = reduced.locator(".broker-cases").getByRole("tabpanel");
check(await serviceDeskPanel.getByRole("heading", { level: 3 }).textContent() === "A local person can help you find the next step.", "Broker service desk claim content did not update");
check(await serviceDeskPanel.locator('img[src*="desk-claim"]').isVisible(), "People-free claims paperwork image did not load in the service desk");
await reduced.keyboard.press("ArrowRight");
const certificateTab = reduced.getByRole("tab", { name: /Certificate or bond/ });
check(await certificateTab.getAttribute("aria-selected") === "true", "Broker service desk arrow-key navigation failed");

await reduced.locator(".ria-hero__actions .atlas-button").click();
const reducedFormStyle = await reduced.locator("#quote-request").evaluate(node => ({ opacity: getComputedStyle(node).opacity, transform: getComputedStyle(node).transform }));
check(reducedFormStyle.opacity === "1" && reducedFormStyle.transform === "none", "Reduced-motion quote form was not immediately readable");
check(await focusReached(reduced, "#quote-request"), "Reduced-motion quote navigation lost focus");
await reduced.goto(`${base}/`, { waitUntil: "networkidle" });
await reduced.locator(".quote-band").scrollIntoViewIfNeeded();
await reduced.waitForTimeout(250);
check(await reduced.locator(".mobile-quick-actions").getAttribute("aria-hidden") === "true", "Mobile quick actions did not yield to the page quote band");

await reduced.goto(`${base}/services`, { waitUntil: "networkidle" });
check(await reduced.locator(".services-briefs__list").evaluate((node) => node.scrollWidth <= node.clientWidth + 1), "Mobile coverage guides require sideways scrolling");

await reduced.goto(`${base}/about`, { waitUntil: "networkidle" });
check(await reduced.locator(".agency-principles__grid").evaluate((node) => node.scrollWidth <= node.clientWidth + 1), "Mobile agency principles require sideways scrolling");

await reduced.goto(`${base}/auto-insurance-los-angeles-ca`, { waitUntil: "networkidle" });
check(await reduced.locator('img[src*="guide-auto"]').first().isVisible(), "People-free auto image is not referenced on the auto coverage page");

await reduced.goto(`${base}/privacy`, { waitUntil: "networkidle" });
check(await reduced.getByRole("heading", { name: "Quote-request form" }).isVisible(), "Privacy notice does not explain the quote-request form");
check(await reduced.getByText(/Vercel hosts the site and provides Web Analytics and Speed Insights/).isVisible(), "Analytics disclosure is missing");
check(await reduced.getByRole("heading", { name: "Browser privacy signals and online tracking" }).isVisible(), "Browser privacy-signal disclosure is missing");
check(await reduced.getByText(/Do Not Track and Global Privacy Control signals do not change its current behavior/).isVisible(), "Do Not Track and Global Privacy Control behavior is unclear");
check(await reduced.locator("form").count() === 0, "A data-collection form appeared on the privacy route");

await reduced.goto(`${base}/accessibility`, { waitUntil: "networkidle" });
check(await reduced.getByText(/WCAG 2.2 Level AA is the site’s working accessibility target/).isVisible(), "WCAG 2.2 working target is missing");
check(await reduced.getByRole("heading", { name: "Testing and limitations" }).isVisible(), "Accessibility testing limitations are missing");
await reducedContext.close();

const motionContext = await chromiumBrowser.newContext({ viewport: { width: 1440, height: 900 } });
const motionPage = await motionContext.newPage();
motionPage.setDefaultTimeout(10_000);
await motionPage.goto(`${base}/`, { waitUntil: "networkidle" });
await motionPage.waitForTimeout(1_500);
check(await motionPage.locator(".route-frame").evaluate((node) => node.classList.contains("motion-managed")), "GSAP enhancement did not initialize for standard motion");
await motionPage.locator(".ria-editorial").scrollIntoViewIfNeeded();
await motionPage.waitForTimeout(1_200);
const coverageMotionState = await motionPage.locator(".ria-editorial__grid").evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).transform));
check(coverageMotionState.every((transform) => transform === "none"), `Coverage links entrance did not settle cleanly: ${JSON.stringify(coverageMotionState)}`);
await motionPage.locator(".ria-reviews").scrollIntoViewIfNeeded();
await motionPage.waitForTimeout(1_500);
const reviewMotionState = await motionPage.locator(".ria-reviews blockquote").evaluateAll((nodes) => nodes.map((node) => ({ opacity: getComputedStyle(node).opacity, transform: getComputedStyle(node).transform })));
check(reviewMotionState.every((state) => state.opacity === "1" && state.transform === "none"), `Review scroll animation did not settle cleanly: ${JSON.stringify(reviewMotionState)}`);
check(await motionPage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), "Homepage has horizontal overflow at 1440px");
await motionContext.close();

const journeyContext = await chromiumBrowser.newContext({ viewport: { width: 1366, height: 768 }, reducedMotion: "reduce" });
const journey = await journeyContext.newPage();
journey.setDefaultTimeout(10_000);
await journey.goto(`${base}/`, { waitUntil: "networkidle" });
await journey.keyboard.press("Tab");
check(await journey.locator(".skip-link").evaluate((node) => document.activeElement === node), "Skip link is not the first keyboard stop");
await journey.keyboard.press("Enter");
check(await journey.locator("main").evaluate((node) => document.activeElement === node), "Skip link did not move focus to main content");

const journeyNavHrefs = await journey.locator(".atlas-nav__links a").evaluateAll((links) => links.map((link) => link.getAttribute("href")));
check(JSON.stringify(journeyNavHrefs) === JSON.stringify(["/services", "/about", "/locations", "/faq", "/contact"]), `Desktop navigation hrefs changed: ${JSON.stringify(journeyNavHrefs)}`);
check((await journey.locator(".atlas-nav__quote").textContent())?.includes("Get a quote"), "Primary quote action label is incorrect");
check(await journey.locator('.ria-service-strip a[href="/services#work"]').count() === 2, "Broad business service shortcuts do not lead to the complete business section");

check(await journey.locator('.ria-story').count() === 2, "Personal and business coverage entry points are missing");
check(await journey.locator('.ria-story').first().getAttribute('href') === '/auto-insurance-los-angeles-ca', "Personal coverage entry point is incorrect");

await journey.locator(".atlas-nav__links").getByRole("link", { name: "Insurance", exact: true }).click();
await journey.waitForURL("**/services");
await journey.waitForTimeout(100);
check(await journey.locator("main").evaluate((node) => document.activeElement === node), "SPA navigation did not focus the destination main content");
await journey.goBack({ waitUntil: "networkidle" });
check(await journey.getByRole("heading", { level: 1 }).textContent().then((value) => value?.includes("Insurance for Los Angeles")), "Browser Back did not restore the homepage");
await journey.goForward({ waitUntil: "networkidle" });
check(await journey.getByRole("heading", { level: 1 }).textContent().then((value) => value?.includes("Insurance for what you own")), "Browser Forward did not restore the services page");
const serviceIndexHrefs = await journey.locator(".services-ledger__index a").evaluateAll((links) => links.map((link) => link.getAttribute("href")));
check(JSON.stringify(serviceIndexHrefs) === JSON.stringify(["#drive", "#property", "#work", "#weekend"]), `Services coverage index is incomplete: ${JSON.stringify(serviceIndexHrefs)}`);
for (const [category, expected] of [["drive","auto"],["property","home"],["work","business"],["weekend","specialty"]]) {
  await journey.goto(`${base}/services`, { waitUntil: "networkidle" });
  await journey.locator(`#${category} > .service-ledger__quote`).click();
  await journey.waitForURL(`**/contact?coverage=${expected}#quote-request`);
  await journey.waitForFunction(value => document.querySelector("#quote-coverage")?.value === value, expected, { timeout: 1000 }).catch(() => {});
  check(await journey.locator("#quote-coverage").inputValue() === expected, `${category} quote link did not preselect ${expected}`);
  check(await focusReached(journey, "#quote-request"), `${category} quote link did not focus the form`);
}

await journey.goto(`${base}/`, { waitUntil: "networkidle" });
await journey.locator('.ria-service-strip a[href="/services#work"]').first().click();
await journey.waitForURL("**/services#work");
await journey.waitForTimeout(100);
check(await journey.locator("#work").evaluate((node) => document.activeElement === node), "Business shortcut did not focus the complete business-services section");

await journey.goto(`${base}/commercial-auto-insurance-los-angeles`, { waitUntil: "networkidle" });
check(await journey.locator('.atlas-nav__links a[href="/services"]').evaluate((node) => node.classList.contains("is-active")), "Commercial-auto route lost its Insurance navigation context");

await journey.goto(`${base}/faq`, { waitUntil: "networkidle" });
const firstDisclosure = journey.locator(".answer-drawer").first();
await firstDisclosure.locator("summary").click();
check(await firstDisclosure.getAttribute("open") === "", "FAQ disclosure did not open");
await firstDisclosure.locator("summary").click();
check(await firstDisclosure.getAttribute("open") === null, "FAQ disclosure did not close");
await journey.reload({ waitUntil: "networkidle" });
check(await journey.getByRole("heading", { level: 1 }).textContent().then((value) => value?.includes("Insurance questions, answered.")), "Direct FAQ refresh rendered the wrong page");

await journey.goto(`${base}/this-page-does-not-exist`, { waitUntil: "networkidle" });
check(await journey.getByRole("heading", { level: 1 }).textContent().then((value) => value?.includes("couldn’t find")), "Custom 404 did not render on an unknown URL");
check(await journey.locator(".not-found-atlas__actions a").count() === 4, "Custom 404 recovery actions are incomplete");
await journeyContext.close();

await chromiumBrowser.close();

console.log(JSON.stringify({ checks, failures, mobileNavMetrics, landscapeMenuMetrics, landscapeFormMetrics, quickActionMetrics, reducedFormStyle, coverageMotionState, reviewMotionState, journeyNavHrefs }, null, 2));
if (failures.length) process.exitCode = 1;
