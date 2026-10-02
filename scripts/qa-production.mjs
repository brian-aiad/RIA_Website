import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import middleware from "../middleware.js";

const failures = [];
let checks = 0;
const check = (condition, message) => {
  checks += 1;
  if (!condition) failures.push(message);
};

const robots = readFileSync(resolve("public/robots.txt"), "utf8");
const homepage = readFileSync(resolve("index.html"), "utf8");
const static404 = readFileSync(resolve("public/404.html"), "utf8");
const sitemap = readFileSync(resolve("public/sitemap.xml"), "utf8");
const vercelConfig = JSON.parse(readFileSync(resolve("vercel.json"), "utf8"));

check(robots.includes("Allow: /"), "Production robots.txt does not allow the public site");
check(robots.includes("Sitemap: https://www.raflainsurance.com/sitemap.xml"), "Production sitemap directive is missing");
check(!homepage.includes('name="robots" content="noindex'), "Homepage contains a noindex directive");
check(static404.includes('content="noindex, nofollow, noarchive"'), "Static 404 robots meta is incomplete");
check((static404.match(/<a\s/g) ?? []).length === 4, "Static 404 recovery links are incomplete");

const publicRoutes = [...sitemap.matchAll(/<loc>https:\/\/www\.raflainsurance\.com(\/[^<]*)<\/loc>/g)]
  .map((match) => match[1])
  .filter((route) => route !== "/");
const titles = new Set();
const descriptions = new Set();
check(publicRoutes.length === 24, "Sitemap must include all 25 public pages");
check(vercelConfig.cleanUrls === true && vercelConfig.trailingSlash === false, "Clean static routing configuration is missing");
check(!vercelConfig.rewrites?.some(rule => rule.destination === "/index.html"), "App-shell rewrites bypass route HTML");
for (const route of ["/", ...publicRoutes]) {
  const html = readFileSync(resolve("dist", route === "/" ? "index.html" : `${route.slice(1)}.html`), "utf8");
  const canonical = `https://www.raflainsurance.com${route}`;
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]*)"/ )?.[1];
  check(Boolean(title) && !titles.has(title), `${route}: missing or duplicate title`);
  check(Boolean(description) && !descriptions.has(description), `${route}: missing or duplicate description`);
  titles.add(title); descriptions.add(description);
  check(html.includes(`rel="canonical" href="${canonical}"`), `${route}: incorrect canonical`);
  check(html.includes(`property="og:url" content="${canonical}"`), `${route}: incorrect Open Graph URL`);
  check((html.match(/<h1[ >]/g) ?? []).length === 1, `${route}: expected one server-rendered h1`);
  check(html.includes("<main") && html.includes('type="application/ld+json"'), `${route}: crawlable content/schema missing`);
  check(!html.includes('id="root"></div>'), `${route}: empty app shell`);
  check(!/noindex/.test(html), `${route}: unexpected noindex`);
}

for (const host of ["raflainsurance.com", "www.raflainsurance.com"]) {
  const cleanResponse = await middleware(new Request(`https://${host}/insurance/mar-vista`));
  check(cleanResponse.status === 200, `${host}: clean request returned ${cleanResponse.status}`);
  check(cleanResponse.headers.get("x-middleware-next") === "1", `${host}: clean request did not continue to the full site`);
  check(!cleanResponse.headers.has("x-robots-tag"), `${host}: clean request retained a noindex header`);

  const queryResponse = await middleware(new Request(`https://${host}/insurance/mar-vista?q=private&utm_source=test`));
  check(queryResponse.status === 308, `${host}: query cleanup returned ${queryResponse.status}`);
  check(queryResponse.headers.get("location") === `https://${host}/insurance/mar-vista`, `${host}: query cleanup target is incorrect`);
}

console.log(JSON.stringify({ checks, failures }, null, 2));
if (failures.length) process.exitCode = 1;
