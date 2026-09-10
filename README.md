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

`middleware.js` currently has `COMING_SOON_ENABLED = true`. While enabled,
`raflainsurance.com` and `www.raflainsurance.com` serve the branded holding
page with `noindex`, `noarchive`, and `no-store` protections. Local development
and Vercel preview hosts continue to expose the complete website for review.
Middleware also removes query strings that the application does not use.

Vercel receives exact app-shell rewrites for every sitemap route because its
hosted build skips the local Playwright prerender step. These are retained for
the eventual launch; while the gate is enabled, production-domain requests are
intercepted before app-shell routing. Unknown paths are not catch-all rewritten.

## Visual assets

Original product and neighborhood photography lives in `public/images/rafla`. Real client-provided storefront photos live in `public/images/client`. The primary brand colors are sampled from the supplied business card and logo: navy `#102653` and gold `#E3A719`.
