import { next } from "@vercel/functions";

const PRODUCTION_HOSTS = new Set(["raflainsurance.com", "www.raflainsurance.com"]);
const COMING_SOON_ENABLED = true;

export const config = {
  runtime: "nodejs",
  // Static assets remain available to the holding page. Everything else is
  // gated only on the two public custom domains; localhost and Vercel preview
  // deployments continue to serve the complete site.
  matcher: ["/((?!api|assets|images|favicon.svg|logo.svg).*)"],
};

const comingSoonHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#0B2146">
  <meta name="robots" content="noindex,nofollow,noarchive">
  <title>Rafla Insurance Agency | New Website Coming Soon</title>
  <style>
    :root{--navy:#0B2146;--blue:#163B70;--gold:#D5A11F;--dark-gold:#7D5900;--paper:#F5F1E8;--paper-2:#EBE5D8;--white:#FFFEFB;--ink:#18263B;--muted:#566377;--rule:#D4CCBD}
    *{box-sizing:border-box}
    html{min-width:20rem;background:var(--navy)}
    body{min-height:100svh;margin:0;border-block:6px solid var(--navy);overflow-x:hidden;color:var(--ink);background:var(--paper);font-family:"Segoe UI",Arial,sans-serif}
    body:before{content:"";position:fixed;z-index:0;inset:0;pointer-events:none;background-image:linear-gradient(rgba(11,33,70,.035) 1px,transparent 1px);background-size:100% 2.45rem}
    main{position:relative;z-index:1;width:min(100% - 2rem,72rem);margin-inline:auto;padding:clamp(1rem,4vw,3.5rem) 0}
    .folio{overflow:hidden;border:1px solid var(--rule);border-top:6px solid var(--gold);background:var(--white);box-shadow:1rem 1rem 0 rgba(11,33,70,.08),0 2rem 5rem rgba(11,33,70,.12)}
    .masthead{display:flex;align-items:center;justify-content:space-between;gap:2rem;padding:1rem clamp(1.25rem,4vw,3rem);border-bottom:1px solid var(--rule)}
    .logo{display:block;width:min(12.5rem,52vw);height:auto}
    .record{display:grid;gap:.2rem;color:var(--muted);font-size:.68rem;text-align:right}.record strong{color:var(--navy);font-size:.7rem;letter-spacing:.08em;text-transform:uppercase}
    .content{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(19rem,.72fr);gap:clamp(2rem,6vw,6rem);align-items:center;padding:clamp(2.25rem,6vw,5.25rem) clamp(1.25rem,5vw,4.5rem)}
    .eyebrow{display:flex;align-items:center;gap:.7rem;margin:0 0 1.2rem;color:var(--dark-gold);font-size:.68rem;font-weight:800;letter-spacing:.16em;text-transform:uppercase}.eyebrow:before{content:"";width:2.5rem;height:3px;background:var(--gold)}
    h1{max-width:12ch;margin:0;color:var(--navy);font-family:Georgia,"Times New Roman",serif;font-size:clamp(2.85rem,6.4vw,5.8rem);font-weight:600;line-height:.96;letter-spacing:-.045em;text-wrap:balance}
    .lede{max-width:38rem;margin:1.5rem 0 0;color:var(--muted);font-size:clamp(1rem,1.5vw,1.15rem);line-height:1.7}
    .scope{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));max-width:38rem;margin:2rem 0 0;border-block:1px solid var(--rule)}
    .scope span{min-height:3.7rem;padding:.85rem 1rem .85rem 0;color:var(--navy);font-size:.76rem;font-weight:700;line-height:1.4}.scope span+span{padding-left:1rem;border-left:1px solid var(--rule)}
    .contact-file{position:relative;padding:1.6rem;border-left:5px solid var(--gold);color:white;background:var(--navy)}
    .contact-file:before{content:"RIA / CONTACT";position:absolute;top:.65rem;right:.75rem;color:rgba(255,255,255,.3);font-size:.48rem;font-weight:800;letter-spacing:.14em}
    .label{margin:0;color:var(--gold);font-size:.63rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase}
    .contact-file h2{margin:.7rem 0 .5rem;font-family:Georgia,"Times New Roman",serif;font-size:clamp(1.8rem,3vw,2.4rem);font-weight:600;line-height:1.05}.contact-file>p:not(.label){margin:0;color:rgba(255,255,255,.7);font-size:.85rem;line-height:1.55}
    .contact{display:grid;margin-top:1.3rem;border-top:1px solid rgba(255,255,255,.22)}
    .contact a{display:grid;grid-template-columns:4.5rem minmax(0,1fr);gap:.75rem;align-items:center;min-height:3.35rem;padding:.72rem 0;border-bottom:1px solid rgba(255,255,255,.22);color:#fff;text-decoration:none;transition:color 160ms ease,background-color 160ms ease}.contact a:hover{color:var(--gold);background:rgba(255,255,255,.045)}
    .contact small{color:var(--gold);font-size:.58rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.contact strong{min-width:0;overflow-wrap:anywhere;font-size:.82rem;font-weight:700;text-align:right}
    footer{display:grid;grid-template-columns:1.35fr 1fr .8fr;gap:1.25rem;padding:1.1rem clamp(1.25rem,4vw,3rem);border-top:1px solid var(--rule);color:var(--muted);background:var(--paper-2);font-size:.72rem;line-height:1.45}footer span:nth-child(2){text-align:center}footer span:last-child{text-align:right}
    a:focus-visible{outline:3px solid var(--gold);outline-offset:3px}
    @keyframes file-settle{from{transform:translate3d(0,5px,0)}to{transform:none}}
    @keyframes rule-register{from{transform:scaleX(.05)}to{transform:scaleX(1)}}
    .folio{animation:file-settle 420ms cubic-bezier(.2,.78,.28,1) backwards}.contact-file{animation:file-settle 360ms 80ms cubic-bezier(.2,.78,.28,1) backwards}.eyebrow:before{transform-origin:left center;animation:rule-register 620ms 80ms cubic-bezier(.22,.72,.16,1) backwards}
    @media(max-width:760px){main{width:min(100% - 1rem,42rem);padding:.75rem 0 1.25rem}.masthead{align-items:flex-start;padding:1rem}.record{font-size:.6rem}.content{grid-template-columns:1fr;gap:2rem;padding:2.25rem 1rem 1rem}.eyebrow{font-size:.6rem}h1{font-size:clamp(2.55rem,13vw,4rem)}.scope{margin-top:1.5rem}.contact-file{padding:1.25rem}.contact a{min-height:3.5rem}footer{grid-template-columns:1fr;gap:.35rem;padding:1rem}footer span:nth-child(2),footer span:last-child{text-align:left}.folio{box-shadow:.5rem .5rem 0 rgba(11,33,70,.08)}}
    @media(max-width:390px){.record span{display:none}.scope{grid-template-columns:1fr}.scope span+span{padding-left:0;border-top:1px solid var(--rule);border-left:0}.contact a{grid-template-columns:3.25rem minmax(0,1fr);gap:.5rem}.contact strong{font-size:.68rem;letter-spacing:-.01em}}
    @media(prefers-reduced-motion:reduce){*,*:before,*:after{scroll-behavior:auto!important;transition:none!important;animation:none!important;transform:none!important}}
    @media(forced-colors:active){.folio,.contact-file,.contact a{border:1px solid CanvasText}.eyebrow:before{background:Highlight}.contact a:focus-visible{outline-color:Highlight}}
  </style>
</head>
<body>
  <main>
    <section class="folio" aria-labelledby="coming-title">
      <header class="masthead">
        <img class="logo" src="/logo.svg" alt="Rafla Insurance Agency">
        <div class="record"><strong>Independent since 2003</strong><span>Mar Vista · Los Angeles</span></div>
      </header>
      <div class="content">
        <div>
          <p class="eyebrow">Website update in progress</p>
          <h1 id="coming-title">Our new website is being prepared.</h1>
          <p class="lede">Rafla Insurance Agency remains available from its Venice Boulevard office for personal and commercial property-and-casualty insurance assistance throughout California.</p>
          <div class="scope" aria-label="Agency overview"><span>Independent insurance guidance for individuals, families, drivers, and property owners.</span><span>Commercial support for contractors, vehicles, property, and small businesses.</span></div>
        </div>
        <aside class="contact-file" aria-label="Contact Rafla Insurance Agency">
          <p class="label">Agency services continue</p>
          <h2>Reach the broker desk.</h2>
          <p>Call, text, email, or get directions to the Mar Vista office.</p>
          <div class="contact">
            <a href="tel:+13105727246"><small>Office</small><strong>(310) 572-7246</strong></a>
            <a href="sms:+13109187007"><small>Text</small><strong>(310) 918-7007</strong></a>
            <a href="mailto:contact@raflainsurance.com"><small>Email</small><strong>contact@raflainsurance.com</strong></a>
            <a href="https://maps.google.com/maps?q=12240+Venice+Blvd+Suite+2+Los+Angeles+CA+90066" target="_blank" rel="noopener noreferrer"><small>Visit</small><strong>12240 Venice Blvd, Suite 2</strong></a>
          </div>
        </aside>
      </div>
      <footer><span>Monday–Friday, 10am–5pm · Saturday–Sunday closed</span><span>English · Spanish · Arabic</span><span>CA Agency License 0D95584</span></footer>
    </section>
  </main>
</body>
</html>`;

export default function middleware(request) {
  const url = new URL(request.url);
  const isPublicDomain = PRODUCTION_HOSTS.has(url.hostname.toLowerCase());

  // The site does not use query-string state. Remove all query parameters
  // before rendering so accidental personal data and tracking values are not
  // retained in the address bar, logs, analytics URLs, or shared links.
  if (url.search) {
    url.search = "";
    return Response.redirect(url, 308);
  }

  if (COMING_SOON_ENABLED && isPublicDomain) {
    if (url.pathname === "/robots.txt") {
      return new Response("User-agent: *\nDisallow: /\n", {
        headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
      });
    }

    return new Response(comingSoonHtml, {
      status: 200,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store, max-age=0",
        "x-robots-tag": "noindex, nofollow, noarchive",
      },
    });
  }

  return next();
}
