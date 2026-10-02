# Rafla Insurance Agency Website

React 19 + Vite 7 website for Rafla Insurance Agency in Mar Vista, Los Angeles.

## Local development

```bash
npm install
npm run dev
```

The development server runs at `http://localhost:3002`.

## Validation

```bash
npm run lint
npm run seo-lint
npm run build
npm run validate:schema
```

## Contact email

Public email links use `contact@raflainsurance.com`. Delivery and forwarding are managed by the domain's email provider rather than by the website.

## Production settings

The canonical production domain is `https://www.raflainsurance.com`.
Non-www and HTTP addresses permanently redirect to that preferred address.
Middleware removes unused query strings. `robots.txt` allows public crawling
and declares `https://www.raflainsurance.com/sitemap.xml`.

Every build, including Vercel builds, renders all 25 sitemap routes to static
HTML with React's server renderer. Each page includes its own title,
description, canonical URL, visible content, and JSON-LD before JavaScript runs.
Flat files such as `dist/about.html` are served at `/about` through Vercel's
`cleanUrls` setting. Do not add app-shell rewrites or skip hosted prerendering:
those would replace interior page HTML with the homepage. Unknown paths use
the static noindex 404 response.

Run `npm run deploy:check` before deployment. After deployment, check raw HTML
on the homepage, an insurance guide, and a community page, plus the sitemap and
redirect targets. In Google Search Console, submit
`https://www.raflainsurance.com/sitemap.xml`, then inspect the canonical HTTPS
www homepage and request indexing. Redirect aliases being excluded as “Page
with redirect” is expected; assess indexing on their destination instead.
Sitemap submission and indexing requests require Search Console access and do
not guarantee indexing. Update sitemap last-modified dates only for meaningful
page changes.

## Visual assets

Original product and neighborhood photography lives in `public/images/rafla`. Real client-provided storefront photos live in `public/images/client`. The primary brand colors are sampled from the supplied business card and logo: navy `#102653` and gold `#E3A719`.
