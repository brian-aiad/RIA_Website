import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";
import { images, srcset } from "../lib/images";
import { useImagePreload, usePageMeta } from "../lib/seo";
import { Reveal, Stagger, StaggerChild } from "../components/AnimatedSection";
import { MagneticButton } from "../components/MagneticButton";
import LocalBusinessSchema from "../components/seo/LocalBusinessSchema";
import ReviewBadge from "../components/seo/ReviewBadge";
import PageTestimonials from "../components/PageTestimonials";
import TrustStrip from "../components/seo/TrustStrip";
import { CTASection, Section, SectionHeader } from "../design-system";
import InsuranceWorkflow from "../components/InsuranceWorkflow";

/* ═══════════════════════════════════════════════
   HERO — Photo-based with full-bleed consultation background
   ═══════════════════════════════════════════════ */
function Hero() {
  useImagePreload(images.hero.consultation);

  return (
    <section className="home-hero relative overflow-hidden bg-brand-950">
      <div className="home-hero-media absolute inset-0 overflow-hidden">
        <img
          src={images.hero.consultation}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
          fetchPriority="high"
          width={1680}
          height={945}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/58 to-brand-950/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_24%,rgba(245,166,35,0.18),transparent_30%)]" />
      </div>
      <div aria-hidden="true" className="absolute -left-28 bottom-0 h-80 w-80 rounded-full border border-white/[.06] shadow-[inset_0_0_0_38px_rgba(245,158,11,.025)]" />
      <div aria-hidden="true" className="absolute left-10 top-16 h-px w-28 bg-gradient-to-r from-gold-400/70 to-transparent" />

      <div className="container relative pt-24 pb-20 lg:pt-28 lg:pb-24">
        {/* ── Left: Copy ── */}
        <div className="hero-copy-enter max-w-xl relative z-[2]">
          {/* Trust badge pill */}
          <span className="inline-flex items-center gap-2 border-l-2 border-gold-400 pl-3 mb-6">
            <span className="text-gold-300 text-[11px] font-bold uppercase tracking-[.18em]">Mar Vista · Independent since 2003</span>
          </span>

          <h1 className="display-1 text-white">
            Coverage for <span className="text-gradient-gold">real life</span> in Los Angeles.
          </h1>

          <p className="mt-6 text-lg text-white/85 leading-relaxed">
            Personal and commercial coverage with independent guidance from a local Los Angeles agency.
          </p>

          <p
            className="mt-4 text-gold-400 font-semibold text-[15px]"
            style={{ borderLeft: "3px solid #E3A719", paddingLeft: "12px" }}
          >
            Ask about options for nonstandard license situations.
          </p>

          <div className="mt-5">
            <ReviewBadge compact />
          </div>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <MagneticButton as="div" className="inline-block">
              <button onClick={openQuoteModal} className="btn btn-accent btn-lg group">
                Get Your Free Quote
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
              </button>
            </MagneticButton>
            <MagneticButton as="div" className="inline-block" strength={0.2}>
              <a href={site.contact.phoneHref} className="btn btn-ghost-light btn-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                Call {site.contact.phone}
              </a>
            </MagneticButton>
          </div>

          {/* Trust signals — compact inline */}
          <div className="mt-8 flex flex-wrap items-center gap-y-2">
            {[
              { icon: <svg className="w-4 h-4 text-gold-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 4 6v6c0 5 3.6 8.7 8 10 4.4-1.3 8-5 8-10V6l-8-4z" /></svg>, text: "Licensed CA Broker" },
              { icon: <svg className="w-4 h-4 text-gold-400" viewBox="0 0 24 24" fill="currentColor"><path d="m12 17.3 6 3.6-1.6-6.9 5.3-4.5-7-.6L12 2 9.3 8.9l-7 .6 5.3 4.5L6 20.9z" /></svg>, text: "Personal Local Service" },
              { icon: <svg className="w-4 h-4 text-gold-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93z" /></svg>, text: "3 Languages" },
            ].map((b, i) => (
              <span key={i} className="flex items-center">
                <span className="flex items-center gap-2 text-[13px] font-medium text-white/85 px-3 first:pl-0 cursor-default">
                  {b.icon}
                  {b.text}
                </span>
                {i < 2 && <span className="text-white/30 select-none" aria-hidden>|</span>}
              </span>
            ))}
          </div>
        </div>

      </div>

      <div aria-hidden="true" className="home-hero-cut absolute inset-x-0 bottom-0 h-12 bg-white" />
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SERVICES — Masonry / staggered grid
   ═══════════════════════════════════════════════ */
type Svc = { key: string; title?: string; name?: string; blurb?: string; desc?: string };

const serviceImages: Record<string, { src: string; alt: string }> = {
  auto: { src: images.services.auto, alt: "Auto insurance coverage from Rafla Insurance in Los Angeles, CA" },
  home: { src: images.services.home, alt: "Home and renters insurance for California homeowners" },
  workers: { src: images.services.workers, alt: "Workers’ compensation and business insurance" },
  commercial: { src: images.services.commercial, alt: "Commercial and business insurance for Los Angeles CA businesses" },
  moto: { src: images.services.motorcycle, alt: "Motorcycle insurance coverage for California riders" },
  rec: { src: images.services.rv, alt: "RV, boat and recreational vehicle insurance" },
};

function ServicesMasonry() {
  // All 6 core services in deliberate order
  const items = useMemo(() => {
    const order = ["auto", "home", "workers", "commercial", "moto", "rec"];
    const map = new Map((site.services as Svc[]).map((s) => [s.key, s]));
    return order.map((k) => map.get(k)).filter(Boolean) as Svc[];
  }, []);

  const renderCard = (s: Svc, idx: number) => {
    const title = s.title ?? s.name ?? s.key;
    const blurb = s.blurb ?? s.desc ?? "";
    const img = serviceImages[s.key];
    const featured = idx === 0;

    return (
      <button
        type="button"
        onClick={openQuoteModal}
        aria-label={`Get a quote for ${title}`}
        className="service-card group relative flex flex-col justify-end overflow-hidden rounded-2xl ring-1 ring-slate-200/80 hover:ring-slate-300 hover:shadow-lifted transition-all duration-300 text-left w-full"
        style={{ aspectRatio: "4 / 3", background: "linear-gradient(135deg, #193b6b 0%, #102653 100%)" }}
      >
        {img && (
          <div className="img-duotone absolute inset-0">
            <img
              src={img.src}
              srcSet={srcset(img.src)}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
              alt={img.alt}
              loading="lazy"
              decoding="async"
              width={800}
              height={600}
              style={{ background: "linear-gradient(135deg, #193b6b 0%, #102653 100%)" }}
            />
          </div>
        )}
        {/* Bottom navy fade for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/40 to-brand-950/5 z-[2]" />

        {featured && (
          <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 bg-gold-400 text-brand-950 text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="m12 17.3 6 3.6-1.6-6.9 5.3-4.5-7-.6L12 2 9.3 8.9l-7 .6 5.3 4.5L6 20.9z" /></svg>
            Most Popular
          </span>
        )}

        <div className="relative z-10 p-5">
          <h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
          <p className="mt-1.5 text-[13px] text-white/75 leading-relaxed line-clamp-2">{blurb}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-gold-400 group-hover:gap-2 transition-all">
            Get a quote
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
          </span>
        </div>
      </button>
    );
  };

  return (
    <section className="sp" style={{ background: "var(--surface-gray)" }}>
      <div className="container">
        <Reveal>
          <span className="eyebrow">What We Cover</span>
          <h2 className="mt-3 display-2 text-slate-900 max-w-xl">
            Personal &amp; commercial coverage, tailored to&nbsp;you
          </h2>
          <p className="mt-3 text-slate-500 max-w-lg">
            We compare available programs to find coverage that fits your life and business.
          </p>
        </Reveal>

        {/* 3 × 2 equal grid */}
        <Stagger className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5" gap={0.06}>
          {items.map((s, i) => (
            <StaggerChild key={s.key}>{renderCard(s, i)}</StaggerChild>
          ))}
        </Stagger>

        <Reveal delay={0.2} className="mt-7">
          <NavLink to="/services" className="btn btn-outline group">
            View All Services
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
          </NavLink>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   ABOUT SPLIT — Asymmetric 2-col
   ═══════════════════════════════════════════════ */
function AboutSplit() {
  return (
    <section className="sp bg-white overflow-hidden cv-auto-tall">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal direction="left" className="relative">
            <div className="rounded-3xl overflow-hidden shadow-heavy ring-1 ring-slate-100 aspect-[4/3]">
              <img
                src={images.home.why}
                srcSet={srcset(images.home.why)}
                sizes="(max-width: 1024px) 100vw, 600px"
                alt="Rafla Insurance broker reviewing coverage options with Los Angeles clients"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
                width={800}
                height={600}
              />
            </div>
            <div
              className="absolute -bottom-6 -right-4 lg:-right-8 rounded-2xl overflow-hidden shadow-heavy w-60 h-44 lg:w-72 lg:h-48"
              style={{ border: "2px solid rgba(245,166,35,0.45)" }}
            >
              <img src={images.hero.storefront} alt="Rafla Insurance Agency office building on Venice Boulevard in Los Angeles" className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-brand-950/85 via-brand-950/40 to-transparent px-4 py-3">
                <p className="text-[11px] font-bold uppercase tracking-wider text-gold-300">Our Mar Vista office</p>
                <p className="text-[11px] text-white/80">12240 Venice Blvd, Suite 2</p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right">
            <span className="eyebrow">Why Rafla Insurance</span>
            <h2 className="mt-3 display-2 text-slate-900">
              Local service backed by an independent point of view
            </h2>
            <p className="mt-3 text-slate-500 leading-relaxed text-[15px]">
              {site.description}
            </p>

            <div className="mt-6 space-y-3">
              {[
                "We compare available programs and explain the tradeoffs clearly",
                "Multilingual staff — Arabic, Spanish, and English",
                "Claims guidance and advocacy when you need it most",
                "Foreign-license and nontraditional ownership situations reviewed carefully",
              ].map((t) => (
                <div key={t} className="flex gap-3">
                  <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-gold-50 ring-1 ring-gold-200 grid place-items-center">
                    <svg className="w-3 h-3 text-gold-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-slate-600 text-[15px]">{t}</span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <NavLink to="/about" className="btn btn-outline group">
                More About Us
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
              </NavLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════
   FAQ — Accordion
   ═══════════════════════════════════════════════ */
function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const qa = [
    { q: "How fast can I get a quote?", a: "Timing depends on the coverage and the details required. Call with what you have and we will explain the next step." },
    { q: "Can you help with an SR-22?", a: "Yes. We can help you quote qualifying auto coverage and coordinate the carrier's SR-22 filing with the California DMV." },
    { q: "Can you help me after I buy?", a: "Absolutely. Policy changes, claims guidance, renewal checkups — we're here." },
    { q: "Which carriers do you work with?", a: "We work with multiple carrier programs across personal and commercial lines. Availability varies by risk and location." },
    { q: "Can you help with a foreign or nontraditional license situation?", a: "Some lawful situations may have coverage options, including foreign-license holders or a vehicle owner who is not the driver. Every person operating the vehicle must be properly licensed." },
  ];

  return (
    <Section tone="light" className="cv-auto-tall">
      <div className="container max-w-2xl">
        <SectionHeader eyebrow="FAQ" title="Common questions" align="center" className="mb-10" />

        <div>
          {qa.map((item, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div style={{ borderBottom: "1px solid var(--border-light)" }}>
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex items-center justify-between text-left group"
                  style={{ padding: "20px 0" }}
                >
                  <span
                    className="pr-4 group-hover:text-brand-800 transition-colors"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "1rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 w-8 h-8 grid place-items-center text-brand-800 transition-transform duration-200 ${openIdx === i ? "rotate-45" : ""}`}
                    aria-hidden
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300"
                  style={{ gridTemplateRows: openIdx === i ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p
                      style={{
                        fontSize: "0.95rem",
                        lineHeight: 1.75,
                        color: "var(--text-secondary)",
                        paddingBottom: "20px",
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   STICKY RIBBON
   ═══════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════
   SERVICE AREAS — City landing page hub
   ═══════════════════════════════════════════════ */
function ServiceAreas() {
  const cities = [
    { name: "Mar Vista", slug: "mar-vista", note: "Our home base — walk-ins welcome" },
    { name: "Culver City", slug: "culver-city", note: "Personal & commercial coverage" },
    { name: "Santa Monica", slug: "santa-monica", note: "Auto, renters & property" },
    { name: "Venice", slug: "venice", note: "Local Westside service" },
    { name: "Marina del Rey", slug: "marina-del-rey", note: "Home, auto & watercraft" },
    { name: "West Los Angeles", slug: "west-los-angeles", note: "Households & businesses" },
    { name: "Palms", slug: "palms", note: "Minutes from our office" },
    { name: "Sawtelle", slug: "sawtelle", note: "Renters, auto & small business" },
    { name: "Playa Vista", slug: "playa-vista", note: "Renters, condos & business" },
    { name: "Westchester", slug: "westchester", note: "Nearby insurance guidance" },
    { name: "Inglewood", slug: "inglewood", note: "Business and personal lines" },
    { name: "Ladera Heights", slug: "ladera-heights", note: "Home, auto & professional risks" },
  ];

  return (
    <section className="sp bg-white" id="service-areas">
      <div className="container">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">Service Areas</span>
          <h2 className="mt-3 display-2 text-slate-900">
            Serving Los Angeles' Westside and nearby communities
          </h2>
          <p className="mt-3 text-slate-500">
            One local office serves households and businesses across Los Angeles' Westside and nearby communities.
          </p>
        </Reveal>

        <Stagger className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3" gap={0.03}>
          {cities.map((city) => (
            <StaggerChild key={city.slug}>
              <NavLink
                to={`/insurance/${city.slug}`}
                className="block h-full bg-slate-50 rounded-2xl p-4 ring-1 ring-slate-200/80 hover:ring-brand-300 hover:shadow-soft hover:-translate-y-0.5 transition-all"
              >
                <div className="font-bold text-slate-900 text-[15px]">
                  {city.name}
                </div>
                <div className="mt-1 text-[12px] text-slate-500 leading-snug">{city.note}</div>
                <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-brand-700">
                  See coverage
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
                </div>
              </NavLink>
            </StaggerChild>
          ))}
        </Stagger>

        <Reveal delay={0.2} className="mt-7 text-center">
          <NavLink to="/locations" className="btn btn-outline group">
            View our Los Angeles office location
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
          </NavLink>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PAGE ASSEMBLY
   ═══════════════════════════════════════════════ */
export default function Home() {
  usePageMeta({
    title: "Insurance Broker Los Angeles CA — Free Quote | Rafla Insurance",
    description: "Independent Los Angeles insurance broker for auto, home, renters, business, workers' compensation, bonds, SR-22, motorcycle, RV and boat coverage.",
    canonical: "https://raflainsurance.com/",
  });


  return (
    <main id="main-content">
      <LocalBusinessSchema />
      <Hero />
      <div className="bg-white border-b border-slate-100 py-4 text-slate-600">
        <div className="container">
          <TrustStrip />
        </div>
      </div>
      <ServicesMasonry />
      <InsuranceWorkflow tone="light" />
      <AboutSplit />
      <PageTestimonials />
      <ServiceAreas />
      <FAQ />
      <CTASection
        title="Ready to review your coverage?"
        lede="Talk with a licensed Los Angeles broker by phone, text, email, or in person."
        secondaryLabel={`Call ${site.contact.phone}`}
      />
    </main>
  );
}
