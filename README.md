# Rafla Insurance Agency Website

React 19 + Vite 7 website for Rafla Insurance Agency in Mar Vista, Los Angeles.

For the complete client context, implementation history, architecture, validation results,
release restrictions, and remaining setup, read [website handoff](docs/HANDOFF.md).

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
npm run deploy:check
npm run review:check
```

## Contact email

Public email links use `contact@raflainsurance.com`. The quote-request form at `/contact#quote-request` collects name, email, optional phone, coverage choice, and a message for delivery to the agency inbox. It is a contact request, not an insurance application, and has no file uploads. Direct email links continue to use the visitor’s email application.

## Full-site settings after release approval

Full-site publication was authorized on October 14, 2026. `COMING_SOON_ENABLED` is now `false`; the standard production build writes the prerendered full site to `dist`. The isolated Coming Soon builder remains available if the switch is deliberately re-enabled. See [release notes](docs/RELEASE-2026-10-14.md).

The canonical production domain is `https://www.raflainsurance.com`.
Non-www and HTTP addresses permanently redirect to that preferred address.
Middleware removes unused query strings while preserving a supported `coverage` choice on `/contact`. `robots.txt` allows public crawling
and declares `https://www.raflainsurance.com/sitemap.xml`.

The full review build renders all 25 sitemap routes to static
HTML with React's server renderer. Each page includes its own title,
description, canonical URL, visible content, and JSON-LD before JavaScript runs.
Flat files such as `dist-review/about.html` are served at `/about` through Vercel's
`cleanUrls` setting. Do not add app-shell rewrites or skip hosted prerendering:
those would replace interior page HTML with the homepage. Unknown paths use
the static noindex 404 response.

Run `npm run review:check` before approving the full site. After an approved full-site deployment, check raw HTML
on the homepage, an insurance guide, and a community page, plus the sitemap and
redirect targets. In Google Search Console, submit
`https://www.raflainsurance.com/sitemap.xml`, then inspect the canonical HTTPS
www homepage and request indexing. Redirect aliases being excluded as “Page
with redirect” is expected; assess indexing on their destination instead.
Sitemap submission and indexing requests require Search Console access and do
not guarantee indexing. Update sitemap last-modified dates only for meaningful
page changes.

## Visual assets

Client-supplied logo and award originals are preserved in `public/images/brand/client`.
`public/logo.svg` and `public/favicon.svg` frame web-optimized copies of the supplied
artwork, with no recoloring or redrawing. These SVG wrappers contain raster artwork.
The logo lockup is also used for social sharing.

The current visual pass includes a collection of people-free editorial images in
`public/images/editorial`: distinct scenes for each service-desk tab, service group,
coverage guide, neighborhood, and the main informational pages. Each has 640px and
1100px WebP versions and a JSON provenance record describing the generation prompt. These
are representative editorial scenes, not documentary photographs of clients or
specific neighborhood addresses. The commercial workshop asset and its prompt are
in `public/images/photography`, with responsive WebP sizes. Original storefront
photographs are in `public/images/client`. The actual office photograph is deliberately
shared by the homepage and directions page; editorial images do not repeat.

Image references live in `src/lib/images.ts`, the page configurations, and
`BrokerServiceDesk.tsx`. `AtlasImage` selects responsive sources. Legacy assets are
retained on disk but not rendered by current pages or social metadata. Supplied
brand artwork is reused consistently; it is not regenerated.

Navy, white, and gold remain the primary palette. The muted red accent `#803e46`
is limited to small dividers, the award label, and selected hover states
in `src/refinement.css`. The compact footer places brand, services, communities, and
office information in a single desktop tier, then reflows into a mobile directory.
The BusinessRate 2026 award uses the existing Google business-search link from
`site.reviews.googleUrl`; replace that value if a direct review permalink is supplied.

Text actions use **Text Ash — 213-879-5955**, with `sms:+12138795955` configured in
`src/lib/site.ts`. The office phone and Mark's separate president/call listing remain
as provided on the business card.

The government-contracting page is deferred until the plugin is ready. Add SDVOSB/DVBE
icons only after certification approval. Any later federal page should use subtle
stars/stripes and muted red; avoid large flags, eagles, Capitol stock photos, military
clip art, and campaign styling.

## Local design review

This pass stays on `design/rafla-brand-revamp`; it has not been pushed or deployed.
Run `npm run dev -- --host 127.0.0.1 --port 4174` for live edits. For the full built site, run `npm run build:review` then
`npm run preview:review -- --host 127.0.0.1 --port 4176`. Port 4175 is reserved for the release preview.

`npm run qa:imagery` checks all 26 routes, image decoding, alternatives, responsive
files, provenance, repeated editorial images, and distinct service-desk states.
The existing route, interaction, text, accessibility, structure, motion, and production
checks cover navigation, contact requests, horizontal overflow, zoom, reduced motion, and
page metadata. Local visual-review captures are stored under the ignored
`output/playwright/review` directory. Browser emulation is not a substitute for
testing on a physical phone before launch.

The detail refinement adds matching hover/focus treatments across linked cards,
aligned contact choices, compact credential/address strips, wider tablet service
card content, and a quieter closing contact section without a duplicate footer CTA.
The FAQ can search question and answer text locally; no query is submitted or saved.
Coverage guides include chapter links with an active-section indicator and a compact
mobile index. Motion respects reduced-motion preferences.

The homepage retains its full introduction, compact office facts, and framed photo.
Contact labels share a baseline and navy coloring; Text Ash includes its direct number.
Overlapping homepage coverage/process sections were consolidated, and repeated
office facts, contact prompts, and service lists were trimmed from interior pages.
Scroll motion
uses individual entrance triggers so lower cards and stacked mobile sections wait
until they enter view. Framed photos settle gently, the footer arrives by column,
and a thin reading-progress line follows the page. Desktop image depth is disabled
on compact/touch layouts; changing reduced-motion preferences tears down animations.
FAQ search result nodes use native disclosure motion, avoiding stale scroll triggers.

`npm run qa:interaction-states` checks card hover/focus contrast, focus outlines,
stable positioning, and matching story-card shadows in Chromium and phone-size
WebKit. `npm run qa:reading-tools` verifies FAQ search, empty-state recovery,
keyboard focus restoration, chapter links, and active-section updates.
`npm run qa:scroll-scenes` scrolls every route in desktop Chromium and phone-size
WebKit, checking settled content, overflow, progress, individual card timing, and
live reduced-motion cleanup.

The office feature pairs the real building photograph with an original SVG facade
and street-number mark. Office facts form a compact responsive rail instead of
a tall side panel. An original neighborhood SVG signs the footer. Interior service
cards, contact channels, FAQ search, and coverage parts share deliberate navy/gold
components; Contact and legal-page padding follows the surrounding section rhythm.
These vector accents add no image requests or animation-library dependencies.

All quote CTAs are real links to `/contact#quote-request`; category CTAs retain a supported `coverage=auto|home|business|specialty` query value. The former preparation dialog and its lazy-loaded code have been removed. The contact anchor supports direct links, keyboard focus, and repeated navigation from the same page.

### Quote email delivery

The Contact form posts to `/api/quote`. The server validates input, enforces a fixed
recipient (`raflainsurance@gmail.com`), and sends a navy/gold HTML email plus a plain
text alternative. Reply-To is the visitor's email. The endpoint never accepts a
recipient or sender supplied by a visitor. Retrying the same submission reuses an
idempotency key. Failed or unconfigured delivery returns an error, never a simulated
success; the form keeps the visitor's values.

The prepared delivery adapter uses [Resend's email API](https://resend.com/docs/api-reference/emails/send-email).
Before sending real requests, verify a sender domain in Resend and configure these
**server-only** values in `.env.local` for development and in Vercel for deployment:

- `RESEND_API_KEY`: a sending API key.
- `QUOTE_FROM_EMAIL`: a sender on that verified domain, e.g.
  `Rafla Insurance Website <quotes@raflainsurance.com>`.

Never put these values in `VITE_` variables or commit them. Copy `.env.example` for
the names, then restart the dev server after entering the values. There is no email
credential included in the repository. Live Gmail receipt must be verified after
configuration; unit and browser tests use mocked delivery and send no email.

Vite dev/preview and the Vercel API function share `server/quote.ts`. The endpoint
checks origins and body size and includes a honeypot and bounded per-instance rate
guard. Because serverless instances do not share memory, configure a host-level
rate rule for `/api/quote` before public launch. No contact fields are logged or
stored in browser persistence by this implementation. Mail providers and the
recipient mailbox process and retain the submitted message.

`npm run test:quote-api` tests validation, safe email rendering, retry deduplication,
provider failures, missing configuration, origin checks, body limits, and rate limits.
`output/quote/email-preview.html` is a local preview with fictitious contact details;
it is not delivered or deployed.

### Release gate and local review

`config/release.mjs` sets `COMING_SOON_ENABLED = false` following explicit publication approval. Re-enabling it restores the isolated Coming Soon release.

- `npm run dev` runs the complete editable site locally, including the contact form.
- `npm run build` creates the approved full production site in `dist/`. When the gate is re-enabled, it instead creates the minimal Coming Soon artifact.
- `npm run preview -- --port 4175` previews that release locally.
- `npm run build:review` creates the complete prerendered site separately in `dist-review/`; it does not modify the release output.
- `npm run preview:review -- --port 4176` previews the complete review build.
- `npm run deploy:check` builds and validates the selected release mode without deploying it.
- `npm run review:check` runs the full website SEO, build, structured-data, and production checks against the isolated review build. Existing browser QA accepts `QA_BASE_URL` for the selected local server.
- `npm run qa:motion-lifecycle` exercises desktop and iPhone motion cleanup, focus stability, preference changes, and resizing.

Production middleware keeps document deep links on Coming Soon while the gate is enabled. The editable application and quote form remain intact for local review. Vercel remains configured to publish only `dist`; the review directory is ignored by Git. Disabling the release constant is a separate approval decision, not part of local review. No command above pushes, commits, or deploys.


### Final refinement checks

The full review build now prerenders its designed `404.html` as well as the 25 sitemap pages. The error document is noindex; following its recovery link clears that state on ordinary pages. The isolated Coming Soon release continues to use its own gated error document.

- `QA_BASE_URL=http://127.0.0.1:4177 node scripts/qa-brand.mjs` checks current SMS labels/destinations, logo dimensions, award sources/link/caption, and muted-red contrast.
- `QA_BASE_URL=http://127.0.0.1:4177 node scripts/qa-error-page.mjs` checks Chromium/WebKit recovery with and without JavaScript.
- `QA_BASE_URL=http://127.0.0.1:4177 npm run qa:imagery` verifies the manually reviewed imagery manifest and the hashes of served image files.
- `QA_GATE_URL=http://127.0.0.1:4175 npm run deploy:check:browser` checks all 16 requested viewport pairs plus three WebKit phone/orientation pairs.

The full dependency audit still reports Tailwind 3 development-tool findings; the production-only audit has no findings. Compatible updates were applied without forcing a Tailwind 4 migration or suppressing audit results. Live quote email delivery still needs the documented server credentials and a verified sender.
