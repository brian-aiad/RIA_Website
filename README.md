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

## Contact-form configuration

Set `VITE_WEB3FORMS_KEY` to enable direct form submission. Without it, the contact form opens a prefilled email to `brinsurance3@msn.com`.

## Production settings

The canonical production domain is `https://raflainsurance.com`.

### Temporary public-domain holding page

`middleware.js` currently has `COMING_SOON_ENABLED = true`. While enabled:

- `raflainsurance.com` and `www.raflainsurance.com` show the branded holding page.
- Vercel preview deployments and `localhost:3002` continue to show the complete website.
- Public-domain responses use `noindex` and `no-store`, and `robots.txt` temporarily disallows crawling.

No DNS changes are needed. For launch, change `COMING_SOON_ENABLED` to `false`, run the validation commands, and deploy.

## Visual assets

Original product and neighborhood photography lives in `public/images/rafla`. Real client-provided storefront photos live in `public/images/client`. The primary brand colors are sampled from the supplied business card and logo: navy `#102653` and gold `#E3A719`.
