# Rafla Insurance Agency — Website Handoff

Prepared October 13, 2026. This is the project context and continuation guide for the owner, another developer, or a future coding-agent session. It documents the cumulative website work and the final refinement pass, not only the last code change. Recorded test results refer to the completed refinement run; writing this document did not rerun the browser suites.

## 1. Read this first: current state

**The full website is ready for local design review, but live quote-email delivery is not verified and the full website is not approved for publication.**

- Working branch: `design/rafla-brand-revamp`.
- HEAD at handoff: `4ee81c22116ac58081aef63b3967299418c82cb3`.
- Changes remain in the working tree, including important untracked source files and assets. A fresh checkout of HEAD alone will not contain this work.
- `COMING_SOON_ENABLED = true` in [config/release.mjs](../config/release.mjs).
- Nothing was committed, pushed, deployed, or changed in DNS during the refinement. The latest instruction is **do not commit or push yet**. An earlier “push to main” instruction was followed by “wait” and subsequently explicit no-publish instructions.
- Live email requires a Resend key and verified sender. No actual Gmail delivery is claimed.
- Production dependency audit: zero findings at the recorded run. Full audit: seven development-tool findings remain.
- The complete local results report is [output/premium/final-report.html](../output/premium/final-report.html). The `output/` directory is ignored by Git; transfer it separately when sharing QA evidence.

Last recorded local URLs were full editable development at `http://localhost:4174`, full production-style review at `http://localhost:4177`, and Coming Soon preview at `http://localhost:4175`. These are local processes, not published URLs, and may need restarting.

## 2. Business context and source of truth

Rafla is an independent insurance agency/brokerage in Mar Vista, Los Angeles. The website helps individuals, households, and businesses understand available coverage and contact a local agency. It is not an insurer, online binding platform, customer account portal, or instant-price engine.

Central business configuration is [src/lib/site.ts](../src/lib/site.ts). Preserve the distinction between office telephone, direct SMS, public email, and form-delivery inbox.

| Information | Current value / meaning |
| --- | --- |
| Business | Rafla Insurance Agency |
| Established | Since 2003, as represented by existing project content |
| Office | 12240 Venice Blvd, Suite 2, Los Angeles, CA 90066 |
| Office telephone | `(310) 572-7246` / `tel:+13105727246` |
| Fax | `(310) 572-7247` |
| Direct text contact | **Text Ash** / **`(213) 879-5955`** |
| SMS destination | **`sms:+12138795955`** |
| Public email links | `contact@raflainsurance.com` |
| Quote form recipient | **`raflainsurance@gmail.com`**, fixed server-side |
| Office hours | Monday–Friday 10am–5pm; Saturday–Sunday closed |
| Languages | English, Spanish, Arabic |
| California agency license | `0D95584` — first character is zero |
| Mark Rafla | President; separate call-only number `(310) 918-7007` |
| Ashraf Abdelmalik | Customer service; `CA Lic. 4035040` in team data |
| Canonical domain | `https://www.raflainsurance.com` |

Mark’s legitimate president telephone entry was intentionally retained. A repository search for his old number can therefore find a **call-only** record; that must not be mistaken for an obsolete SMS action. All customer-facing text-message actions use Ash. Existing review quotations mentioning Mark are customer quotations, not text buttons.

The configuration also contains review excerpts and existing rating/count data. These were not newly fabricated or independently refreshed during the refinement. Verify changing business facts with the owner before changing public claims.

## 3. Client direction and decisions that supersede older requests

The approved foundation is a navy, white, warm-paper, and gold editorial insurance dossier design. The client liked the overall layout and image placement. The task was to make that design more polished and distinctive, not replace it with a generic new template.

Important feedback across the engagement:

- The client requested a slightly patriotic feeling in anticipation of future government contracting, then clarified that the current site must remain predominantly navy/white/gold.
- Excessive footer height, giant empty office sections, repeated photos, repeated contact information, inconsistent paired-card hover effects, awkward Text Ash styling, and generic-looking layouts were specifically rejected.
- The existing substantive homepage introduction was preferred over an overly stripped-down, bland replacement. Keep useful content and hierarchy while removing redundant sections.
- Text Ash should align with adjacent contact choices and use the same navy treatment by default. Do not turn it gold just to emphasize it.
- Every page must work well on iPhone, small phones, tablet, desktop, and short landscape screens.
- Motion should make the dossier details respond purposefully, without hiding content or delaying use.
- **The old “Prepare for a quote” preparation guide/dialog was explicitly removed.** The user later confirmed: **“Keep the new Contact quote form.”** References to a preparation dialog in the long original brief are superseded by that decision.
- Current quote actions lead to a simple Contact request form. Do not restore the old guide or its inaccurate “nothing is submitted” language.

### Design boundaries

Keep the supplied final logo’s exact colors and proportions. No AI recreation, redrawing, recoloring, or excessive logo animation.

Muted red is `--agency-red: #803e46`, with `--agency-red-dark: #672f36`. It is a small accent for selected navigation, fine rules, document labels, award details, and chosen interaction states. Recorded contrast against white is **7.79:1**; this does not establish contrast against every possible background. The primary palette must continue to dominate.

Do not add flags, eagles, Capitol stock photography, military clip art, government seals, campaign colors, scattered stars, or ordinary-page patriotic stripes. No SDVOSB/DVBE or federal certification claims/badges are approved. The future government-contracting plugin/page is **deferred and was not built**. Do not add empty navigation or placeholder certification sections.

All visible production imagery must be people-free: no faces, hands, silhouettes, pedestrians, partial bodies, or human reflections. Avoid fake official stamps, invented policy identifiers, misleading generated buildings, or generic floating insurance symbols.

## 4. What was implemented and refined

### Brand and recognition

Client originals are preserved in [public/images/brand/client](../public/images/brand/client): final lockup, wordmark, emblem, and BusinessRate award. The business-card reference informed contact details; it was not inserted as a decorative website image.

- [public/logo.svg](../public/logo.svg): optimized wrapper around supplied raster artwork, with correct `1185 × 460` intrinsic proportion. **It is not a true vector logo.** The embedded optimized artwork is 800 pixels wide; source colors and proportions are retained.
- [public/favicon.svg](../public/favicon.svg): supplied emblem in an optimized raster-backed wrapper.
- [public/images/brand/rafla-social.png](../public/images/brand/rafla-social.png): 1200 × 630 sharing image using the supplied logo with restrained brand rules and factual text. Social metadata dimensions and references were updated.
- Shared desktop/mobile navigation and footer use the consistent logo. Coming Soon and the retained, unused `PolicyReviewSheet` logo dimensions were also aligned. There is no active preparation dialog.
- Logo size: 77,463 bytes; favicon: 18,779 bytes; social image: 185,270 bytes at the recorded build.

The original BusinessRate award appears once in a restrained homepage recognition/review area. Exact caption:

> BusinessRate Ranked #1 Award Winner — 2026

Responsive derivatives are `businessrate-2026-320.webp`, `-640.webp`, and `-960.webp`. They preserve the original portrait aspect ratio and meaning; original dimensions are 3000 × 3754. The presentation has descriptive alternative text, a visible focus state, and safe external-link behavior.

Its configured destination is:

`https://www.google.com/search?q=Rafla+Insurance+Agency+Los+Angeles+CA`

This was the website’s existing agency search/profile destination in `site.reviews.googleUrl`. **A direct Google reviews permalink was not supplied.** Do not describe this as a newly verified direct-review URL or invent one. A supplied true-vector logo and direct review permalink remain useful optional client assets.

### Photography and image system

Earlier image work introduced distinct, people-free scenes for main pages, coverage guides, service categories, city pages, and all four broker-service-desk states. The final pass preserved that work, checked the actual production variants, and found no remaining people in the reviewed imagery. It did not unnecessarily regenerate every existing asset.

The Contact telephone close-up was replaced by a more intentional welcome/office still life: walnut desk, navy seating, natural light and palms, with no people or readable private information. Current files are `contact-welcome.webp` and `contact-welcome-sm.webp`, with a generation-provenance JSON alongside them.

Asset organization:

- [public/images/editorial](../public/images/editorial): people-free generated editorial scenes, normally 1100px and 640px WebP variants, with JSON provenance.
- [public/images/photography](../public/images/photography): commercial workshop scene and responsive derivatives/provenance.
- [public/images/client](../public/images/client): real supplied office photographs. The actual office photo is intentionally shared where directions require it.
- [src/lib/images.ts](../src/lib/images.ts), page configurations, and [BrokerServiceDesk.tsx](../src/components/BrokerServiceDesk.tsx): image assignments.
- [AtlasUI.tsx](../src/components/AtlasUI.tsx): shared `AtlasImage` responsive rendering.

Representative generated scenes are not evidence of actual client premises or exact neighborhood addresses. Do not relabel generated architecture as the real Rafla office.

The reviewed manifest contains **78 exact files**, covering 35 default main image sources, the four service-desk states, responsive candidates, the logo, and three award sizes. See [scripts/fixtures/people-free-images.json](../scripts/fixtures/people-free-images.json) and [its instructions](../scripts/fixtures/README.md). Unused legacy assets remain on disk and are intentionally outside this production manifest.

**Image hashes certify that reviewed bytes are unchanged, not that an algorithm can recognize every person.** To change an image, inspect the full-resolution source and every crop, review its placement and alternative text, then deliberately update the manifest. Never blindly regenerate hashes to force a test pass.

### Layout, content rhythm, and custom detail

The oversized footer became a compact desktop directory and mobile layout. Duplicated closing CTAs and repeated office facts/service summaries were reduced. The very tall office sidebar became a tighter actual-office feature with an original architectural SVG, exact `12240` marker, fine gold rules, and compact office facts.

Paired household/business cards received consistent interaction treatment. Contact actions were aligned. Tablet service-card widths, captions, section spacing, guide indexes, legal-page reading measures, and image crops were refined. The approved homepage introduction and framed-photo direction were preserved.

New [InteriorSignature.tsx](../src/components/InteriorSignature.tsx) provides small original code-native subject drawings: driving, property, work, weekend, office, conversation, correspondence, reading, and route marks. Existing `GuideIndex`, `NeighborhoodSignature`, office linework, and coverage graphics remain part of the visual vocabulary. They add contextual detail without extra raster-image requests or an additional motion library.

| Page family | Specific treatment / behavior |
| --- | --- |
| Home | Approved editorial hero; aligned contact choices; coverage cards; four distinct service-desk images; compact real-office feature and 12240 drawing; review/award record |
| Services | Category linework, coverage indexing, file-card treatments, clear Contact form paths |
| About | Since-2003 agency record, conversation mark, license/history/language detail, usable phone target |
| Locations | Office arrival drawing, real address/photo, neighborhood directory, enlarged map targets without overlap |
| Contact | Correspondence drawing, new welcome scene, document-edged real request form, office/contact information |
| FAQ | Reference-book detail, indexed disclosure topics, local question/answer search, useful empty-state recovery |
| Five coverage guides | Subject-specific drawings/photos, chapter navigation, active-section indicator, document rules and responsible qualifications |
| Twelve city pages | Community and existing ZIP markers, distinct local editorial imagery, explicit relationship to the actual Mar Vista office; no false branch offices |
| Privacy / Accessibility | Calm document hierarchy, controlled spacing and reading width, minimal movement |
| 404 | Misplaced-file/recovery treatment and return-route drawing, useful recovery/contact actions |
| Coming Soon | Isolated branded release document, accurate office/contact information, final logo and restrained details |

Ninety obsolete preparation-dialog CSS rules were removed, totaling 10,433 source characters. This was targeted cleanup, not a claim that every historical selector or unused component has been removed.

## 5. Contact form: actual behavior and remaining setup

Relevant implementation:

- [src/components/QuoteRequestForm.tsx](../src/components/QuoteRequestForm.tsx)
- [server/quote.ts](../server/quote.ts)
- [server/viteQuote.ts](../server/viteQuote.ts)
- [api/quote.ts](../api/quote.ts)
- [.env.example](../.env.example)

All quote CTAs are real links to `/contact#quote-request`. Category links may retain `coverage=auto`, `home`, `business`, or `specialty`. The form is directly after the Contact hero and supports direct-anchor navigation/focus. `QuoteWidget.tsx` and `src/lib/openQuote.ts` were removed.

Fields are name, email, optional phone, coverage choice, and message. Limits are 100 characters for name, 254 for email, 30 for phone, and 2000 for message. A hidden website honeypot and a UUID idempotency key accompany submission. There are no file uploads or browser persistence of personal fields.

The form posts JSON to `/api/quote`. Pending state prevents duplicate submission; errors retain visitor input; success appears only after a successful server response. Unchanged retries reuse the same idempotency key. Validation/success focus and accessible feedback are implemented.

The server validates input and origin, limits request bodies to 12KB, applies a bounded five-requests-per-ten-minutes per-instance guard, checks the honeypot, escapes email content, and imposes a provider timeout. The recipient is fixed to `raflainsurance@gmail.com`; Reply-To is the visitor’s email. Visitors cannot specify recipient or sender. Delivery uses the Resend HTTP API with a branded navy/gold HTML message and a plain-text alternative.

**Delivery is not configured or proven end to end.** Missing configuration returns an honest error, not simulated success. Tests mock delivery and did not send real mail. Required server-only settings:

```dotenv
RESEND_API_KEY=<sending key>
QUOTE_FROM_EMAIL=Rafla Insurance Website <quotes@raflainsurance.com>
```

The sender must belong to a domain verified in the provider account. The example address is not evidence of verification. For authorized local testing, copy `.env.example` to `.env.local`, populate the server-only values, and restart the server. Never use `VITE_` prefixes or commit credentials. Hosted configuration must be set separately when authorized.

Local Vite dev and preview use the shared handler directly. The deployed Vercel function deliberately returns **503 while the release gate is enabled**. Therefore successful local tests do not mean the public gated endpoint accepts requests.

The rate guard is per process/serverless instance, not a distributed abuse-control system. Add an appropriate host-level rate rule before a future public form launch. No contact fields are intentionally logged or stored in browser persistence by this implementation; email providers and the destination mailbox process and retain messages. Privacy copy reflects the real submitting form.

## 6. Motion and interaction engineering

[RouteMotion.tsx](../src/components/RouteMotion.tsx) owns scoped GSAP route motion. It dynamically loads motion code, uses cleanup on route changes, guards asynchronous work after unmount, and responds to reduced-motion/media changes.

`data-register-line`, `data-register-mark`, and `data-document-tab` hooks support line drawing, small marker registration, and file-tab settling. Different page drawings provide different motion moments. Meaningful content remains visible from the first frame; animation is decorative enhancement.

Key fixes and safeguards:

- Focus or pointer interaction settles an in-progress ancestor card immediately, rather than leaving a moving target under the user.
- ScrollTrigger cleanup no longer kills a tween before its intended completion; the relevant cleanup preserves the animation where needed.
- Removed competing CSS transform interpolation on GSAP-owned card transforms.
- Compact/coarse-pointer layouts disable desktop image depth and the reading-progress scrub.
- Reduced motion avoids unnecessary timelines and removes large movement while preserving selected states and full content.
- Visibility/pageshow listeners and route scopes are cleaned up; background return and repeated route use were tested.
- Footer links, logo, and legal content stay stationary; short heading rules provide restrained movement.
- Mobile navigation closes and releases body locking/inert state when resized to desktop, restoring visible focus where appropriate.
- Cards, links, buttons, FAQ indicators and map targets have purpose-specific feedback. Text links move arrows subtly rather than scaling the whole control.

Do not add global unscoped ScrollTriggers, persistent `will-change`, hidden-until-animated content, mobile pinning, scroll hijacking, autoplay carousels, bouncing icons, letter-split headlines, cursor effects, or new animation dependencies without a demonstrated need.

## 7. Application architecture and important files

Stack: React 19, React Router 7, TypeScript 5.9, Vite 7, GSAP 3, Tailwind 3, Lucide icons, locally bundled Source Sans 3 and Newsreader fonts. Package engine is **Node 22.x**. Use the lockfile for the exact installed versions.

| File / directory | Responsibility |
| --- | --- |
| `src/main.tsx` | Browser bootstrap, fonts, ordered styles, router/analytics setup |
| `src/App.tsx` | Shared navigation/footer, route table, route motion boundary |
| `src/entry-server.tsx` | React server rendering and page metadata extraction |
| `src/lib/site.ts` | Central business, SMS, office, team and review configuration |
| `src/lib/seo.ts` | Metadata, canonical/robots defaults and route metadata updates |
| `src/data/atlas.ts` | Shared content/data used by the editorial site |
| `src/pages/` | Main pages, coverage pages and shared city-page template |
| `src/components/AtlasUI.tsx` | Shared editorial components and responsive image helper |
| `src/components/CoverageBriefPage.tsx` | Coverage guide structure |
| `src/components/GuideIndex.tsx` | Coverage chapter navigation/active section |
| `src/components/Navbar.tsx` | Desktop/mobile navigation and menu accessibility |
| `src/components/Footer.tsx` | Compact shared directory/contact/footer |
| `src/components/ScrollToTop.tsx` | Route/anchor scrolling and focus behavior |
| `src/components/RouteMotion.tsx` | Scoped motion and lifecycle handling |
| `scripts/prerender.mjs` | Full static route HTML generation |
| `scripts/build.mjs` | TypeScript and gated-versus-review build selection |
| `scripts/build-coming-soon.mjs` | Isolated release HTML/assets |
| `config/release.mjs` | Publication gate |
| `middleware.js` | Gate and canonical/query handling |
| `vercel.json` | Build output, clean URLs, redirects and headers |
| `scripts/qa-*.mjs` | Browser, build, accessibility and performance checks |

Styles load in this order and depend on that cascade:

1. `src/index.css`
2. `src/ria-revamp.css`
3. `src/refinement.css`
4. `src/premium-pages.css`
5. `src/premium-motion.css`

Avoid “cleanup” that casually reorders these files or deletes apparently repeated rules without checking rendered states. Shared selectors span several page families.

Primary routes are eagerly imported to preserve prerendered content on direct loads instead of replacing it with Suspense fallbacks. The full build creates 25 sitemap pages plus the designed 404. Vercel clean URLs serve flat files such as `about.html` at `/about`. Do not introduce a blanket SPA rewrite that substitutes homepage HTML for interior routes.

The custom 404 previously fell back to obsolete static markup in the built site. It now prerenders from the React recovery page outside the sitemap. Its noindex metadata is replaced correctly, and recovering to a normal page clears noindex. Ordinary robots defaults retain `index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1`.

Full-site middleware retains only supported coverage choices on `/contact` and strips unrelated query parameters. Preserve this behavior when changing quote links. The canonical www HTTPS domain and static metadata matter for eventual SEO; no Search Console submission or indexing guarantee is implied by local validation.

## 8. Complete route inventory

1. `/`
2. `/services`
3. `/locations`
4. `/about`
5. `/contact`
6. `/faq`
7. `/privacy`
8. `/accessibility`
9. `/auto-insurance-los-angeles-ca`
10. `/sr22-insurance-los-angeles`
11. `/home-insurance-los-angeles-ca`
12. `/no-license-auto-insurance-los-angeles`
13. `/commercial-auto-insurance-los-angeles`
14. `/insurance/mar-vista`
15. `/insurance/culver-city`
16. `/insurance/santa-monica`
17. `/insurance/venice`
18. `/insurance/marina-del-rey`
19. `/insurance/west-los-angeles`
20. `/insurance/playa-vista`
21. `/insurance/westchester`
22. `/insurance/inglewood`
23. `/insurance/palms`
24. `/insurance/sawtelle`
25. `/insurance/ladera-heights`

Additionally: unknown paths/custom `/404`, the isolated Coming Soon release, mobile navigation, all service-desk states, FAQ states, footer, and Contact form states. There is no active quote-preparation dialog or government-contracting route.

## 9. Local setup and safe build workflow

From the repository root, use Node 22 and install the lockfile dependencies:

```bash
npm ci
npx playwright install chromium webkit
npm run dev -- --host 127.0.0.1 --port 4174
```

The Vite default dev port is 3002 if no explicit port is supplied. Run preview servers in separate terminals. Ports are conventions, not business configuration; verify terminal output if a port is already occupied.

Full website review:

```bash
npm run build:review
npm run preview:review -- --host 127.0.0.1 --port 4177
```

Safe gated release review:

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4175
```

### Why there are two build outputs

`dist-review/` contains the full website for local review. `dist/` is the configured Vercel release output. With the gate enabled, `dist/` contains exactly:

```text
index.html
404.html
logo.svg
favicon.svg
robots.txt
```

The gated release contains no full-site application JavaScript, internal route HTML, internal imagery or sitemap. Its robots rules disallow crawling and the HTML is noindex. Production middleware also sets restrictive robot headers and keeps document deep links on the gate. The deployed quote endpoint is closed.

`npm run deploy:check` **does not deploy**; it builds and checks this gated output. `npm run review:check` validates the complete review output. Never disable the gate merely to inspect the site locally. Do not change the Vercel output to `dist-review` or copy the full review contents into the release folder.

## 10. Validation results and reproducible commands

The following results are the recorded final refinement baseline, not a promise that later edits will preserve them. Set the browser target to the running **full review** server:

```bash
export QA_BASE_URL=http://127.0.0.1:4177
export QA_GATE_URL=http://127.0.0.1:4175
```

| Suite | Recorded result | Command |
| --- | --- | --- |
| TypeScript / ESLint | Passed | `npm run review:check; npm run lint` |
| Production builds / prerender | 25 public pages + custom 404; isolated gated build | `npm run review:check; npm run deploy:check` |
| SEO / structured data | SEO passed; 25 schema pages | `npm run seo-lint; npm run validate:schema:review` |
| Production routing / metadata | 259 checks passed | `npm run qa:production:review` |
| Route and viewport matrix | 598 checks passed | `npm run qa:routes (or shards below)` |
| Interaction journeys | 90 checks passed | `npm run qa:interactions` |
| Interaction states | 415 checks passed | `npm run qa:interaction-states` |
| Text collisions | 130 route/viewport checks passed | `npm run qa:text` |
| Accessibility | 52 scans; 1,201 rule passes; 0 detected violations | `npm run qa:a11y` |
| Document / reflow / text spacing | 724 assertions passed | `npm run qa:structure` |
| Reading tools | 42 checks passed | `npm run qa:reading-tools` |
| Scroll scenes | 218 checks across 26 routes passed after fixing built 404 | `npm run qa:scroll-scenes` |
| Motion / lifecycle | 47 + 28 checks passed | `npm run qa:motion; npm run qa:motion-lifecycle` |
| Quote form / API | 22 browser checks + 7 API tests passed; delivery mocked | `npm run qa:quote-form; npm run test:quote-api` |
| Brand / SMS / award | 52 route/view combinations passed; contrast 7.79:1 on white | `node scripts/qa-brand.mjs` |
| Reviewed imagery | 26 routes; 35 main image sources; 4 service-desk states; 78 reviewed files, zero exceptions | `npm run qa:imagery` |
| Coming Soon | Artifact/API checks and 19 viewport pairs passed | `npm run qa:gate; npm run qa:gate:browser` |
| Error-page recovery | 20 checks; Chromium/WebKit, JavaScript on/off | `node scripts/qa-error-page.mjs` |
| Performance | 3 profiles passed; no missing images or hidden H1 | `npm run qa:performance` |
| Security / source maps | 130 text files scanned; no secret-pattern matches; no source maps | `Local pattern scan; output/premium/security-scan.json` |
| Production dependency audit | 0 vulnerabilities | `npm audit --omit=dev --json` |
| Full dependency audit | 7 remaining development-tool findings: 5 high, 2 moderate | `npm audit --json` |
| Whitespace integrity | Passed | `git diff --check` |

The route suite was run in three shards (208, 208, and 182 checks):

```bash
QA_SHARD=0 QA_SHARDS=3 node scripts/qa-routes.mjs
QA_SHARD=1 QA_SHARDS=3 node scripts/qa-routes.mjs
QA_SHARD=2 QA_SHARDS=3 node scripts/qa-routes.mjs
```

TypeScript is included in the build pipeline. `review:check` runs SEO lint, full review build/prerender, structured-data checks, and production checks. Run ESLint and the browser suites separately as listed. The security/source-map scan was a local recorded scan, not an invented package script. Its results are in `output/premium/security-scan.json`.

**The complete audit is not green:** `npm audit --json` reports seven findings and exits nonzero. Do not summarize the whole project as “every check passed.” Functional/build/browser suites passed; the dependency exception and unverified live mail are explicit.

### Responsive and visual review coverage

Required viewport pairs tested:

`320×568`, `360×640`, `375×667`, `390×844`, `412×915`, `430×932`, `568×320`, `844×390`, `768×1024`, `820×1180`, `1024×768`, `1180×820`, `1366×768`, `1440×900`, `1536×864`, `1920×1080`.

The route matrix includes an additional 1280×720 desktop case, WebKit phone/orientation cases, and reduced motion, totaling 598 route/viewport checks. Visual captures include 25 routes at five sizes (125 captures), plus dedicated homepage, 404, form, gate, footer and interaction captures. Major long-page sections and settled motion states were inspected, not only source code.

Accessibility checks covered landmarks, headings, keyboard/focus behavior, target sizes, contrast, menu containment, reflow, text spacing, reduced motion and forced colors. Structure coverage included 26 pages, eight 200% text cases, eight 400%-equivalent reflow cases, four text-spacing cases, two background-disabled cases and two forced-color cases. The 52 axe scans found zero detected violations, with 1,201 rule passes.

These are automated checks and browser emulation, **not physical iPhone testing, complete assistive-technology testing, or accessibility certification**. Preserve that distinction in client communication.

### Regressions caught and corrected

- Inconsistent household/business card interaction feedback.
- Card entrance transforms competing with pointer/focus use.
- Mobile menu staying locked or trapping focus after a desktop resize.
- Built 404 rendering an obsolete static page instead of the current design.
- Error-page noindex surviving recovery to a normal route.
- Old quote-guide code/styles and inaccurate non-submitting language remaining after the form change.

## 11. Performance and bundle evidence

These are local single-run comparison profiles from [performance-comparison.json](../output/premium/performance-comparison.json), not field Core Web Vitals or a guarantee for every connection/device. Resource transfer varies with lazy-image timing. The throttled mobile profile used 150ms latency and approximately 210,000 bytes/second.

| Profile | LCP before → after | CLS before → after | Encoded resource bytes before → after |
| --- | --- | --- | --- |
| Desktop uncached | 256 → 80 ms | 0.007184 → 0 | 2,155,115 → 1,680,989 |
| Mobile uncached | 84 → 76 ms | 0.000393 → 0 | 926,367 → 881,511 |
| Mobile slow network | 1608 → 1608 ms | 0.000705 → 0.000336 | 595,967 → 574,562 |

All three final profiles had visible H1 content and zero broken images. The final measured mobile slow-network LCP was unchanged; avoid claiming an improvement there.

| Built asset group, uncompressed | Before | After | Change |
| --- | ---: | ---: | ---: |
| JavaScript | 505,856 B | 511,092 B | +5,236 B |
| CSS | 335,182 B | 336,091 B | +909 B |
| Fonts | 398,564 B | 398,564 B | unchanged |
| Combined | 1,239,602 B | 1,245,747 B | +6,145 B, about 0.50% |

These totals are compiled JS/CSS/font assets, not all photos in `public/` and not the tiny gated release. Logo and award optimization reduced important image payloads while modest code additions supplied details and safeguards.

## 12. Remaining issues and next steps

### Required before claiming the public form works

1. Obtain/configure a real Resend sending key and verify a sender domain.
2. Set the server-only environment values in the authorized local/hosted environment.
3. Test one authorized real submission and confirm receipt, formatting, Reply-To and error handling. No real email was sent by the completed test suites.
4. Add suitable host-level rate limiting before public launch.
5. Keep the production endpoint gated until publication is explicitly approved.

### Dependency findings

Compatible dependency updates changed 23 packages and reduced the complete audit from 16 to seven findings. At the recorded run, the remaining seven were five high and two moderate development-tool findings in the Tailwind 3 chain, including `braces` and `postcss-selector-parser`. Runtime dependencies had zero findings.

A forced Tailwind 4 migration or unproven major-version overrides were deliberately not applied to a visual-refinement task. Audit results were not suppressed. The recorded braces advisory listed no patched release; review current advisories before remediation because that can change. Evidence is in `output/premium/audit-after.json` and `audit-production.json`. Treat any toolchain migration as a separate change with full visual and build verification.

### Optional client assets / future work

- A true-vector version of the final logo, if the client has one. Current raster-backed wrappers are intentional, not invented vectors.
- A direct Google reviews/profile permalink supplied or confidently verified for this agency.
- Real-device iPhone and assistive-technology testing before public launch.
- Government-contracting plugin/page only when actually ready and authorized. Use official certification assets only after approval; no current certification claim is supported.
- Refresh changeable hours, review data, or other business facts only with reliable owner/source confirmation.

### Future release is a separate authorization

Do not infer permission to publish from this handoff or from a passed `deploy:check`. After explicit approval, the responsible engineer must deliberately manage the release switch, configure mail, rerun checks, review hosting configuration and output, and validate hosted canonical redirects/raw HTML/error handling. Search Console submission and indexing requests require access and a published full site. None of those external publication actions were performed here.

## 13. Insurance-content safeguards

Maintain the responsible qualifications already present:

- Website information does not bind, amend, or guarantee coverage; coverage requires appropriate confirmation.
- Pricing, eligibility, discounts and underwriting vary by carrier and policy.
- SR-22 is a filing/certificate, not a standalone insurance policy; insurance does not authorize unlawful driving.
- Certificates do not modify coverage. Claims depend on policy terms and the carrier’s decision.
- Reviews do not guarantee similar outcomes.
- Do not request sensitive private information through ordinary email/text or this simple contact request.
- Health insurance, life insurance, and notary services are not currently offered.
- The current form **does** submit information; do not reinstate the former guide’s “does not submit or store” statement.
- Never imply federal approval or contracting eligibility from the patriotic accent palette.

## 14. Evidence, backups and preserving the working tree

Before the final pass, a baseline archive preserved 339 tracked/untracked nonignored files, alongside a binary diff and Git state. The baseline already included substantial earlier design work. The final diff is cumulative; do not attribute every changed line solely to the last pass.

Important local evidence:

| Path | Contents |
| --- | --- |
| `output/premium/final-report.html` | Human-readable final report and cumulative status |
| `output/premium/verification-final.json` | Exact recorded suite counts, commands and limitations |
| `output/premium/performance-comparison.json` | Raw before/after performance and bundle measurements |
| `output/premium/security-scan.json` | Secret-pattern/source-map scan and HEAD-preservation result |
| `output/premium/audit-after.json` | Remaining complete dependency audit |
| `output/premium/audit-production.json` | Production-only audit |
| `output/premium/git-status-final.txt` | Full status including individual untracked assets |
| `output/premium/git-diff-stat.txt` | Cumulative tracked-file summary |
| `output/premium/obsolete-css-cleanup.json` | Targeted old-dialog CSS cleanup evidence |
| `output/premium/baseline/worktree-before.tar.gz` | Pre-final-pass worktree archive |
| `output/premium/baseline/` | Original diff, HEAD, status, bundle and performance evidence |
| `output/playwright/premium-pages/REVIEW.md` | Page visual-review notes |
| `output/playwright/premium-pages/final/` | Page screenshots |
| `output/playwright/brand/REVIEW.md` | Brand review notes |
| `output/playwright/motion-lifecycle/` | Lifecycle captures |
| `output/quote/email-preview.html` | Fictitious-data email design preview; not sent |
| `output/quote/verification.json` | Earlier form verification evidence |

At documentation time, before adding this file, tracked changes were **53 files, 1,460 insertions and 1,441 deletions**, plus the many untracked implementation/assets listed by Git. `git diff --stat` alone omits those untracked files. This handoff is an additional untracked document until someone deliberately stages it.

Do not run `git reset --hard`, `git clean`, overwrite the working tree with HEAD, or assume untracked assets are disposable. Preserve the branch/worktree and review the complete status before any future commit. `output/`, `dist/`, `dist-review/` and local credentials are not the source-of-truth files to commit.

## 15. Quick continuation checklist for the next engineer

1. Read this file, [README.md](../README.md), central site data and the release constant.
2. Inspect `git status --short` and the complete diff without discarding existing work.
3. Start the full review locally and inspect the real rendered page before changing design.
4. Keep the new Contact form, approved brand, people-free imagery and accurate contact destinations.
5. When changing images, update the reviewed manifest only after visual inspection.
6. When changing motion, test keyboard/touch use, route changes, resize, reduced motion and cleanup.
7. When changing SEO/builds, test raw prerendered interior HTML and 404 recovery, not just SPA navigation.
8. Run relevant checks, then the complete validation cycle for broad changes; report actual failures rather than hiding them.
9. Resolve live email and outstanding audit items explicitly; do not describe mocked tests as delivery proof.
10. Keep Coming Soon enabled and do not commit, push, deploy or touch DNS until separately instructed.

The completed work preserves the established website and adds a coherent layer of custom editorial detail, clearer contact paths, distinct imagery, responsive refinement and tested motion. The remaining limitations above are deliberate, visible handoff items—not silently completed tasks.
