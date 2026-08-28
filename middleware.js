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
  <meta name="theme-color" content="#102653">
  <meta name="robots" content="noindex,nofollow,noarchive">
  <title>Rafla Insurance Agency | New Website Coming Soon</title>
  <style>
    :root{--navy:#102653;--deep:#061329;--blue:#193b6b;--gold:#e3a719;--paper:#fbfaf7}
    *{box-sizing:border-box}html,body{margin:0;min-height:100%;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:var(--deep);color:#fff}
    body{min-height:100svh;display:grid;place-items:center;overflow-x:hidden;background:radial-gradient(circle at 82% 18%,rgba(227,167,25,.12),transparent 26rem),linear-gradient(135deg,var(--deep),#0b1d3e 58%,var(--navy))}
    body:before{content:"";position:fixed;inset:0;pointer-events:none;opacity:.42;background-image:linear-gradient(rgba(255,255,255,.026) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.026) 1px,transparent 1px);background-size:68px 68px;mask-image:linear-gradient(105deg,#000,transparent 78%)}
    .rings{position:fixed;right:-10rem;top:-9rem;width:34rem;height:34rem;border:1px solid rgba(227,167,25,.15);border-radius:50%;box-shadow:0 0 0 5rem rgba(255,255,255,.018),0 0 0 10rem rgba(227,167,25,.025);pointer-events:none}
    main{position:relative;z-index:1;width:min(100% - 2rem,72rem);padding:clamp(1rem,4vw,3rem) 0}
    .shell{overflow:hidden;border:1px solid rgba(255,255,255,.12);border-radius:clamp(1.5rem,3vw,2.4rem);background:rgba(8,24,52,.76);box-shadow:0 35px 90px rgba(0,0,0,.34);backdrop-filter:blur(20px)}
    .goldline{height:4px;background:linear-gradient(90deg,var(--gold),#f3ce70 48%,transparent 92%)}
    .content{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(18rem,.72fr);gap:clamp(2rem,6vw,6rem);align-items:center;padding:clamp(2rem,6vw,5.2rem)}
    .logo-wrap{display:inline-flex;align-items:center;border-radius:1rem;background:#fff;padding:.55rem .8rem;box-shadow:0 12px 35px rgba(0,0,0,.18)}
    .logo{display:block;width:min(13rem,54vw);height:auto}
    .eyebrow{margin:2.4rem 0 1rem;color:#f3ce70;font-size:.72rem;font-weight:800;letter-spacing:.2em;text-transform:uppercase}
    h1{max-width:13ch;margin:0;font-family:Georgia,"Times New Roman",serif;font-size:clamp(2.65rem,6.5vw,5.7rem);font-weight:600;line-height:.98;letter-spacing:-.045em;text-wrap:balance}
    .lede{max-width:36rem;margin:1.5rem 0 0;color:rgba(255,255,255,.73);font-size:clamp(1rem,1.7vw,1.2rem);line-height:1.75}
    .status{position:relative;border-radius:1.5rem;padding:1.5rem;background:linear-gradient(145deg,rgba(255,255,255,.1),rgba(255,255,255,.045));box-shadow:inset 0 0 0 1px rgba(255,255,255,.11)}
    .status:before{content:"";position:absolute;inset:-.5rem auto auto -.5rem;width:4rem;height:4rem;border-top:1px solid var(--gold);border-left:1px solid var(--gold);border-radius:1rem 0 0 0;opacity:.8}
    .label{display:flex;align-items:center;gap:.65rem;color:#f3ce70;font-size:.72rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase}
    .dot{width:.55rem;height:.55rem;border-radius:50%;background:var(--gold);box-shadow:0 0 0 .35rem rgba(227,167,25,.12)}
    .status h2{margin:1.1rem 0 .55rem;font-size:1.3rem}.status p{margin:0;color:rgba(255,255,255,.65);font-size:.94rem;line-height:1.65}
    .contact{display:grid;gap:.65rem;margin-top:1.5rem}.contact a{display:flex;align-items:center;justify-content:space-between;gap:1rem;min-height:3.2rem;border-radius:.9rem;padding:.8rem 1rem;color:#fff;text-decoration:none;background:rgba(255,255,255,.065);box-shadow:inset 0 0 0 1px rgba(255,255,255,.09);transition:transform .2s ease,background .2s ease}.contact a:hover{transform:translateY(-2px);background:rgba(255,255,255,.11)}.contact small{color:rgba(255,255,255,.5);font-size:.66rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase}.contact strong{font-size:.87rem;text-align:right}
    footer{display:flex;justify-content:space-between;gap:1.5rem;border-top:1px solid rgba(255,255,255,.09);padding:1.15rem clamp(2rem,6vw,5.2rem);color:rgba(255,255,255,.48);font-size:.76rem}footer span:last-child{text-align:right}
    @media(max-width:760px){body{place-items:start center}.rings{right:-20rem}.content{grid-template-columns:1fr;padding:2rem 1.35rem 1.5rem}.eyebrow{margin-top:1.8rem}h1{font-size:clamp(2.55rem,13vw,4rem)}.status{padding:1.25rem}footer{flex-direction:column;padding:1.1rem 1.35rem}footer span:last-child{text-align:left}.shell{border-radius:1.5rem}}
    @media(prefers-reduced-motion:reduce){*,*:before,*:after{scroll-behavior:auto!important;transition:none!important}}
  </style>
</head>
<body>
  <div class="rings" aria-hidden="true"></div>
  <main>
    <section class="shell" aria-labelledby="coming-title">
      <div class="goldline" aria-hidden="true"></div>
      <div class="content">
        <div>
          <span class="logo-wrap"><img class="logo" src="/logo.svg" alt="Rafla Insurance Agency"></span>
          <p class="eyebrow">Los Angeles · Independent since 2003</p>
          <h1 id="coming-title">A new website is on the way.</h1>
          <p class="lede">We are putting the finishing touches on a new online experience. Rafla Insurance Agency remains open and available for personal and commercial insurance assistance.</p>
        </div>
        <aside class="status" aria-label="Contact Rafla Insurance Agency">
          <div class="label"><span class="dot"></span>Office open as usual</div>
          <h2>Need help today?</h2>
          <p>Call, email, or visit our Mar Vista office during regular business hours.</p>
          <div class="contact">
            <a href="tel:+13105727246"><small>Office</small><strong>(310) 572-7246</strong></a>
            <a href="mailto:contact@raflainsurance.com"><small>Email</small><strong>contact@raflainsurance.com</strong></a>
            <a href="https://maps.google.com/maps?q=12240+Venice+Blvd+Suite+2+Los+Angeles+CA+90066"><small>Visit</small><strong>12240 Venice Blvd, Suite 2</strong></a>
          </div>
        </aside>
      </div>
      <footer><span>Mon–Fri 10am–7pm · Sat 10am–3pm</span><span>English · Spanish · Arabic</span></footer>
    </section>
  </main>
</body>
</html>`;

export default function middleware(request) {
  const url = new URL(request.url);
  const isPublicDomain = PRODUCTION_HOSTS.has(url.hostname.toLowerCase());

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

  // Preserve the prior cleanup for stray Cloudflare-style ?q parameters on
  // preview and local deployments.
  if (url.searchParams.has("q")) {
    url.searchParams.delete("q");
    return Response.redirect(url, 308);
  }

  return next();
}
