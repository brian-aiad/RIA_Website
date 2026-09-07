import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import middleware from "../middleware.js";

const failures = [];
let checks = 0;
const check = (condition, message) => {
  checks += 1;
  if (!condition) failures.push(message);
};

const source = readFileSync(resolve("middleware.js"), "utf8");
const robots = readFileSync(resolve("public/robots.txt"), "utf8");
const homepage = readFileSync(resolve("index.html"), "utf8");
const static404 = readFileSync(resolve("public/404.html"), "utf8");

check(!source.includes("COMING_SOON_ENABLED"), "Obsolete Coming Soon flag remains in middleware");
check(!source.toLowerCase().includes("coming soon"), "Coming Soon content remains in middleware");
check(!source.includes("PRODUCTION_HOSTS"), "Production-domain gate remains in middleware");
check(robots.includes("Allow: /"), "Production robots.txt does not allow the public site");
check(robots.includes("Sitemap: https://raflainsurance.com/sitemap.xml"), "Production sitemap directive is missing");
check(!homepage.includes('name="robots" content="noindex'), "Homepage contains a noindex directive");
check(static404.includes('content="noindex, nofollow, noarchive"'), "Static 404 robots meta is incomplete");
check((static404.match(/<a\s/g) ?? []).length === 4, "Static 404 recovery links are incomplete");

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
