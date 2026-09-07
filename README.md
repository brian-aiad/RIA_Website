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

The canonical production domain is `https://raflainsurance.com`.

The complete website is intended to be public on `raflainsurance.com` and
`www.raflainsurance.com`. Middleware removes query strings that the site does
not use, while clean production-domain requests continue to the full site.
`robots.txt` allows crawling and declares the production sitemap.

Vercel receives exact app-shell rewrites for every sitemap route because its
hosted build skips the local Playwright prerender step. Unknown paths are not
rewritten, so the static noindex 404 response remains intact.

## Visual assets

Original product and neighborhood photography lives in `public/images/rafla`. Real client-provided storefront photos live in `public/images/client`. The primary brand colors are sampled from the supplied business card and logo: navy `#102653` and gold `#E3A719`.
