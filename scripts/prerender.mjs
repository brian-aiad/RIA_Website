/**
 * prerender.mjs — Static-render every route so Googlebot gets unique HTML
 * with correct <title>, <meta description>, <link rel="canonical">, and JSON-LD.
 *
 * Runs AFTER `vite build`. Uses Playwright (already a devDependency) to load
 * each route in a headless Chromium, wait for React to hydrate, then snapshot
 * the fully-rendered <html> to disk.
 *
 * Usage:  node scripts/prerender.mjs
 */

// Vercel build sandbox lacks the system libs Chromium needs (libnspr4 etc).
// Skip prerendering there — Vercel serves the React SPA and Google crawls JS.
// Run locally with `node scripts/prerender.mjs` or `npm run build:full`.
if (process.env.VERCEL) {
  console.log("  Skipping prerender on Vercel (run locally for prerendered HTML).");
  process.exit(0);
}

import { chromium } from "playwright";
import { createServer } from "http";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const PROD_ORIGIN = "https://raflainsurance.com";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");

// Render "/" LAST so the homepage prerender never contaminates the shell
// that other routes use as their SPA fallback.
const ROUTES = [
  "/services",
  "/about",
  "/locations",
  "/contact",
  "/faq",
  "/privacy",
  "/accessibility",
  // Money pages — prerendered before city pages so they have priority
  "/auto-insurance-los-angeles-ca",
  "/sr22-insurance-los-angeles",
  "/home-insurance-los-angeles-ca",
  "/no-license-auto-insurance-los-angeles",
  "/commercial-auto-insurance-los-angeles",
  // City landing pages
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
  "/",
];

function prioritizeHeroPreloads(html) {
  const preloadPattern = /\s*<link\s+rel="preload"\s+as="image"[^>]*data-hero-preload="true"[^>]*>/g;
  const heroPreloads = html.match(preloadPattern);
  if (!heroPreloads?.length) return html;

  const withoutHeroPreloads = html.replace(preloadPattern, "");
  const uniquePreloads = [...new Set(heroPreloads.map((tag) => tag.trim()))];
  const preloadHtml = uniquePreloads.join("\n");
  const charsetMatch = withoutHeroPreloads.match(/<meta\s+charset="UTF-8">/);

  if (charsetMatch) {
    return withoutHeroPreloads.replace(
      charsetMatch[0],
      `${charsetMatch[0]}\n${preloadHtml}`
    );
  }

  return withoutHeroPreloads.replace("<head>", `<head>\n${preloadHtml}`);
}

function keepAppRuntimeInteractive(html) {
  // Keep the Vite module script and its preloads in the prerendered document.
  // Deferring them until pointerdown caused the first tap on a phone to load
  // React without activating the control the visitor actually touched.
  return html.replace(
    /\s*<script[^>]+src="\/_vercel\/(?:insights|speed-insights)\/script\.js"[^>]*><\/script>/g,
    ""
  );
}

function addPrerenderMarker(html) {
  const marker = "<!-- prerendered by scripts/prerender.mjs -->";
  if (html.includes(marker)) return html;

  const charsetMatch = html.match(/<meta\s+charset="UTF-8">/);
  if (charsetMatch) {
    return html.replace(charsetMatch[0], `${charsetMatch[0]}\n${marker}`);
  }

  return html.replace("<head>", `<head>\n${marker}`);
}

/**
 * Minimal static file server for the dist folder.
 * Falls back to index.html for SPA routes (just like Firebase rewrites).
 */
function startServer() {
  const mime = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".woff2": "font/woff2",
    ".woff": "font/woff",
    ".ico": "image/x-icon",
    ".xml": "application/xml",
    ".txt": "text/plain",
  };

  const server = createServer((req, res) => {
    let url = req.url.split("?")[0];

    // The Vite build uses base "./" so asset paths in the HTML are relative.
    // When Playwright loads /insurance/santa-monica, the browser resolves
    // ./assets/foo.js to /insurance/santa-monica/assets/foo.js — but the real
    // files live at /assets/foo.js. Normalize nested paths back to root so
    // all depth-2+ routes can load their JS/CSS/image bundles correctly.
    url = url.replace(/^.*(\/assets\/)/, "$1")
             .replace(/^.*(\/images\/)/, "$1");

    let filePath = resolve(DIST, "." + url);

    // Try exact file, then file + .html, then fallback to index.html (SPA)
    if (!existsSync(filePath) || !filePath.includes(".")) {
      // Try with index.html in subdirectory
      const withIndex = resolve(filePath, "index.html");
      if (existsSync(withIndex)) {
        filePath = withIndex;
      } else {
        filePath = resolve(DIST, "index.html");
      }
    }

    const ext = "." + filePath.split(".").pop();
    const contentType = mime[ext] || "application/octet-stream";

    try {
      const data = readFileSync(filePath);
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  });

  return new Promise((ok) => {
    server.listen(0, "127.0.0.1", () => {
      const port = server.address().port;
      console.log(`  Preview server on http://127.0.0.1:${port}`);
      ok({ server, port });
    });
  });
}

async function prerender() {
  console.log("\n--- Prerendering routes ---\n");

  const { server, port } = await startServer();
  const origin = `http://127.0.0.1:${port}`;

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    javaScriptEnabled: true,
    userAgent: "prerender-bot",
  });

  for (const route of ROUTES) {
    const page = await context.newPage();

    // Block analytics / external scripts to speed up rendering
    await page.route("**/*", (r) => {
      const url = r.request().url();
      if (
        url.includes("googletagmanager.com") ||
        url.includes("google-analytics.com") ||
        url.includes("fonts.googleapis.com") ||
        url.includes("fonts.gstatic.com")
      ) {
        return r.abort();
      }
      return r.continue();
    });

    await page.goto(`${origin}${route}`, { waitUntil: "networkidle" });

    // Wait for React to fully render — h1 appearing means the lazy chunk
    // has loaded, the component has mounted, and useEffect has fired.
    await page.waitForSelector("h1", { timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(800);

    // Grab the full rendered HTML
    let html = await page.content();

    // Inject a prerender marker once — guard prevents double-stamping when
    // the script runs against an already-prerendered dist folder.
    html = addPrerenderMarker(html);

    // Determine output path
    let outPath;
    if (route === "/") {
      outPath = resolve(DIST, "index.html");
    } else {
      // /about → dist/about/index.html
      const dir = resolve(DIST, route.slice(1));
      mkdirSync(dir, { recursive: true });
      outPath = resolve(dir, "index.html");
    }

    // Replace any localhost origin that crept into JSON-LD via window.location.origin
    html = html.replace(/http:\/\/127\.0\.0\.1:\d+/g, PROD_ORIGIN);
    html = prioritizeHeroPreloads(html);
    html = keepAppRuntimeInteractive(html);

    writeFileSync(outPath, html, "utf-8");
    console.log(`  ✓ ${route} → ${outPath.replace(DIST, "dist")}`);

    await page.close();
  }

  await browser.close();
  server.close();

  console.log(`\n  Done — ${ROUTES.length} pages prerendered.\n`);
}

prerender().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
