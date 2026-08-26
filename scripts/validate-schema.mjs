/**
 * validate-schema.mjs — Pre-flight check for JSON-LD schema in prerendered HTML.
 *
 * Reads every index.html in dist/ and verifies:
 *   1. At least one <script type="application/ld+json"> block exists
 *   2. Required @type values are present per-page category
 *   3. No bare localhost URLs leaked into JSON-LD
 *   4. BreadcrumbList present on non-home pages
 *
 * Usage: node scripts/validate-schema.mjs
 * Exit code 0 = pass, 1 = failures found.
 */

import { readdirSync, readFileSync, existsSync, statSync } from "fs";
import { resolve, relative, join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");
const PROD_ORIGIN = "https://raflainsurance.com";

// Pages that should NOT have BreadcrumbList (home only)
const NO_BREADCRUMB = new Set(["/"]);

// Google is deprecating FAQ rich results and review snippets are not valid for this site.
// Keep visible FAQ/review content, but do not emit these JSON-LD types.
const DEPRECATED_SCHEMA_TYPES = new Set(["FAQPage", "Review", "AggregateRating"]);

// Pages that should have InsuranceAgency schema (homepage, city pages, money pages).
// /faq, /about, /contact, /services explicitly excluded — see SKILL.md schema rules.
const NO_INSURANCE_AGENCY = new Set([
  "/faq",
  "/about",
  "/contact",
  "/services",
  "/privacy",
  "/accessibility",
]);

// Pages where InsuranceAgency url must be the homepage (not the page's own URL).
// City pages (/insurance/*) are allowed to have their own canonical URL.
// All other pages with InsuranceAgency must use the homepage URL.
const HOMEPAGE_URL = "https://raflainsurance.com/";

let totalFiles = 0;
let failures = 0;

/**
 * Collect all index.html files recursively from dist/
 */
function collectHtmlFiles(dir, base = dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...collectHtmlFiles(full, base));
    } else if (entry === "index.html") {
      results.push({ path: full, route: "/" + relative(base, dir).replace(/\\/g, "/") });
    }
  }
  return results;
}

/**
 * Extract all JSON-LD blocks from HTML string.
 */
function extractJsonLd(html) {
  const blocks = [];
  const regex = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    try {
      blocks.push(JSON.parse(match[1]));
    } catch (e) {
      blocks.push({ __parseError: match[1].slice(0, 80) });
    }
  }
  return blocks;
}

function check(route, condition, message) {
  if (!condition) {
    console.error(`  ✗ [${route}] ${message}`);
    failures++;
    return false;
  }
  return true;
}

function pass(route, message) {
  console.log(`  ✓ [${route}] ${message}`);
}

if (!existsSync(DIST)) {
  console.error(`\n  ERROR: dist/ not found at ${DIST}`);
  console.error("  Run 'npm run build' first, then validate.\n");
  process.exit(1);
}

console.log("\n--- Schema validation ---\n");

const files = collectHtmlFiles(DIST);

// Sort so home (/) appears first
files.sort((a, b) => a.route.length - b.route.length);

for (const { path: htmlPath, route } of files) {
  const routeKey = route === "" ? "/" : "/" + route.replace(/^\//, "");
  totalFiles++;

  const html = readFileSync(htmlPath, "utf-8");
  const blocks = extractJsonLd(html);
  const types = blocks.flatMap(b => {
    if (b.__parseError) return ["__parseError"];
    const t = b["@type"];
    return Array.isArray(t) ? t : [t];
  });

  console.log(`\n  📄 ${routeKey} (${blocks.length} JSON-LD blocks)`);

  // 1. Must have at least one JSON-LD block
  check(routeKey, blocks.length > 0, "No JSON-LD found");

  // 2. Must not have parse errors
  check(routeKey, !types.includes("__parseError"), "JSON-LD parse error detected");

  // 3. No localhost URLs in JSON-LD
  const rawJson = blocks.map(b => JSON.stringify(b)).join(" ");
  const hasLocalhost = /http:\/\/(localhost|127\.0\.0\.1)/.test(rawJson);
  check(routeKey, !hasLocalhost, "Localhost URL found in JSON-LD");

  // 4. InsuranceAgency must be present on pages that need it, absent on pages that don't.
  const hasInsuranceAgency = types.some(t =>
    t === "InsuranceAgency" || t === "LocalBusiness" || t === "FinancialService"
  );
  if (NO_INSURANCE_AGENCY.has(routeKey)) {
    check(routeKey, !hasInsuranceAgency, "InsuranceAgency must NOT appear on this page (see SKILL.md)");
  } else {
    check(routeKey, hasInsuranceAgency, "Missing InsuranceAgency schema");
    // For non-city pages, InsuranceAgency url must be homepage, not the page's own URL.
    if (hasInsuranceAgency && !routeKey.startsWith("/insurance/")) {
      const agencyBlock = blocks.find(b => b["@type"] === "InsuranceAgency");
      if (agencyBlock && agencyBlock.url && agencyBlock.url !== HOMEPAGE_URL) {
        check(routeKey, false,
          `InsuranceAgency url="${agencyBlock.url}" must be homepage "${HOMEPAGE_URL}" on non-city pages`);
      } else if (agencyBlock && agencyBlock.url) {
        pass(routeKey, `InsuranceAgency url="${agencyBlock.url}" ✓`);
      }
    }
  }

  // 5. BreadcrumbList required on non-home pages
  if (!NO_BREADCRUMB.has(routeKey)) {
    const hasBreadcrumb = types.includes("BreadcrumbList");
    check(routeKey, hasBreadcrumb, "Missing BreadcrumbList");
    if (hasBreadcrumb) pass(routeKey, "BreadcrumbList present");
  }

  // 6. Deprecated/unsupported rich-result schema must not be emitted.
  for (const blockedType of DEPRECATED_SCHEMA_TYPES) {
    check(routeKey, !types.includes(blockedType), `${blockedType} schema must not be emitted`);
  }

  const hasReviewSnippetFields = rawJson.includes('"aggregateRating"') || rawJson.includes('"reviewRating"');
  check(routeKey, !hasReviewSnippetFields, "Review snippet fields must not be emitted");

  // 7. Home page should have WebSite or LocalBusiness at root level
  if (routeKey === "/") {
    const hasWebSite = types.includes("WebSite");
    if (hasWebSite) pass(routeKey, "WebSite schema present");
    pass(routeKey, `Types found: ${types.join(", ")}`);
  }

  if (blocks.length > 0 && !types.includes("__parseError")) {
    pass(routeKey, `Types: ${types.join(", ")}`);
  }
}

console.log("\n" + "─".repeat(50));
console.log(`\n  Checked ${totalFiles} pages`);

if (failures === 0) {
  console.log("  ✅ All schema checks passed.\n");
  process.exit(0);
} else {
  console.log(`  ❌ ${failures} check(s) failed. Fix before deploying.\n`);
  process.exit(1);
}
