import { COMING_SOON_ENABLED } from "./config/release.mjs";
import { next, rewrite } from "@vercel/functions";

export const config = {
  runtime: "nodejs",
  matcher: ["/((?!api|assets|images|favicon.svg|logo.svg).*)"],
};

export function fullSiteMiddleware(request) {
  const url = new URL(request.url);

  // Keep only the non-personal coverage selection used by the contact form.
  // Do not carry arbitrary query values into rendered links or analytics URLs.
  const coverage = url.searchParams.get("coverage");
  const allowedCoverage = url.pathname === "/contact" && ["auto", "home", "business", "specialty"].includes(coverage);
  const cleanSearch = allowedCoverage ? `?coverage=${coverage}` : "";
  if (url.search !== cleanSearch) {
    url.search = cleanSearch;
    return Response.redirect(url, 308);
  }

  return next();
}

export default function middleware(request) {
  if (!COMING_SOON_ENABLED) return fullSiteMiddleware(request);
  const url = new URL(request.url);
  if (["/", "/index.html", "/robots.txt"].includes(url.pathname) && !url.search) return next({ headers: { "X-Robots-Tag": "noindex, nofollow, noarchive" } });
  url.pathname = "/index.html";
  url.search = "";
  return rewrite(url, { headers: { "X-Robots-Tag": "noindex, nofollow, noarchive" } });
}
