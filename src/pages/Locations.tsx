import { useEffect, useState } from "react";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";
import { images } from "../lib/images";
import { usePageMeta } from "../lib/seo";
import { Icons } from "../components/Icons";
import { Reveal } from "../components/AnimatedSection";
import PageHero from "../components/PageHero";
import InsuranceWorkflow from "../components/InsuranceWorkflow";
import PageTestimonials from "../components/PageTestimonials";

type HourRow =
  | { label: string; short: string; open: string; close: string; closed?: false }
  | { label: string; short: string; closed: true };

const HOURS: HourRow[] = [
  { label: "Monday",    short: "Mon", open: "10:00 AM", close: "7:00 PM" },
  { label: "Tuesday",   short: "Tue", open: "10:00 AM", close: "7:00 PM" },
  { label: "Wednesday", short: "Wed", open: "10:00 AM", close: "7:00 PM" },
  { label: "Thursday",  short: "Thu", open: "10:00 AM", close: "7:00 PM" },
  { label: "Friday",    short: "Fri", open: "10:00 AM", close: "7:00 PM" },
  { label: "Saturday",  short: "Sat", open: "10:00 AM", close: "3:00 PM" },
  { label: "Sunday",    short: "Sun", closed: true },
];

const SERVICE_AREA = ["Mar Vista", "Culver City", "Santa Monica", "Venice", "Marina del Rey", "West Los Angeles", "Playa Vista", "Westchester", "Inglewood", "Beverly Hills", "El Segundo", "Manhattan Beach"];

function cx(...v: (string | false | null | undefined)[]) {
  return v.filter(Boolean).join(" ");
}

function isClosedHour(row: HourRow): row is Extract<HourRow, { closed: true }> {
  return "closed" in row && row.closed === true;
}

function toSchemaTime(value: string) {
  const [time, meridiem] = value.split(" ");
  const [rawHour, minute] = time.split(":").map(Number);
  const hour = meridiem === "PM" && rawHour !== 12 ? rawHour + 12 : rawHour === 12 && meridiem === "AM" ? 0 : rawHour;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

export default function Locations() {
  usePageMeta({
    title: "Our Los Angeles Office — Hours & Directions | Rafla Insurance",
    description: "Visit Rafla Insurance Agency at 12240 Venice Blvd, Suite 2, Los Angeles CA 90066. Open Mon–Fri 10AM–7PM and Sat 10AM–3PM. Walk-ins welcome.",
    canonical: "https://raflainsurance.com/locations",
  });

  const [copied, setCopied] = useState(false);
  const todayIdx = (new Date().getDay() + 6) % 7;

  /* JSON-LD */
  useEffect(() => {
    const dayMap = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    const spec = HOURS.map((h, i) => {
      if (isClosedHour(h))
        return { "@type": "OpeningHoursSpecification", dayOfWeek: dayMap[i] };
      return { "@type": "OpeningHoursSpecification", dayOfWeek: dayMap[i],
        opens: toSchemaTime(h.open),
        closes: toSchemaTime(h.close) };
    });
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.text = JSON.stringify({
      "@context": "https://schema.org", "@type": "InsuranceAgency",
      name: site.name, url: "https://raflainsurance.com/",
      telephone: site.contact.phone, email: site.contact.email,
      address: { "@type": "PostalAddress", streetAddress: site.contact.address,
        addressLocality: "Los Angeles", addressRegion: "CA", postalCode: "90066", addressCountry: "US" },
      openingHoursSpecification: spec, areaServed: "California",
    });
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(site.contact.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* */ }
  };

  return (
    <main id="main-content">
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://raflainsurance.com/" },
        { name: "Location", url: "https://raflainsurance.com/locations" },
      ]} />
      <PageHero
        title="Our Mar Vista office"
        subtitle="Visit us on Venice Boulevard in Los Angeles. Walk-ins are welcome Monday through Saturday."
        breadcrumb="Location"
        badgeText="Mon–Fri 10 AM–7 PM · Sat 10 AM–3 PM"
        backgroundImage={images.hero.storefront}
        imageFilter="contrast(1.08) saturate(1.04) brightness(0.96)"
        rightContent={
          <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-heavy aspect-[4/3]">
            <img src={images.clients.contactFrontDesk} alt="Rafla Insurance Agency office building on Venice Boulevard" className="w-full h-full object-cover" width={800} height={600} />
          </div>
        }
      >
        <div className="flex flex-wrap gap-3">
          <a href={site.contact.phoneHref} className="btn btn-accent">
            <Icons.Phone className="w-4 h-4" />
            Call {site.contact.phone}
          </a>
          <a href={site.contact.mapsHref} target="_blank" rel="noreferrer" className="btn btn-ghost-light">
            Get Directions
          </a>
        </div>
      </PageHero>

      <InsuranceWorkflow
        tone="offwhite"
        title="Walk in ready — no appointment needed"
        lede="Bring your vehicle info, current coverage, and any specific situation details. We'll compare carriers, explain options, and coordinate binding when a carrier is ready."
      />

      {/* ── Main content: 2-column ── */}
      <section className="sp bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-[1.1fr,1fr] gap-8 lg:gap-12 items-start">
            {/* Left: Map + address */}
            <Reveal direction="left">
              <div className="space-y-6">
                {/* Map */}
                <div className="rounded-2xl overflow-hidden ring-1 ring-slate-200/80 shadow-lifted aspect-[16/10]">
                  <iframe
                    title="Office location"
                    src="https://www.google.com/maps?q=12240%20Venice%20Blvd%20Suite%202%20Los%20Angeles%20CA%2090066&output=embed"
                    width="100%" height="100%" style={{ border: 0 }} loading="lazy"
                  />
                </div>

                {/* Address card */}
                <div className="bg-white rounded-2xl p-6 ring-1 ring-slate-200/80 shadow-soft space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-brand-50 ring-1 ring-brand-100 grid place-items-center shrink-0 mt-0.5">
                      <Icons.MapPin className="w-4 h-4 text-brand-700" />
                    </div>
                    <div>
                      <a href={site.contact.mapsHref} target="_blank" rel="noreferrer" className="font-semibold text-slate-900 hover:text-brand-700 transition-colors">
                        {site.contact.address}
                      </a>
                      <div className="mt-2 flex gap-2">
                        <button onClick={handleCopy} className="text-[12px] font-medium text-slate-500 bg-slate-50 rounded-lg px-2.5 py-1 ring-1 ring-slate-200 hover:ring-slate-300 transition-all">
                          {copied ? "Copied!" : "Copy address"}
                        </button>
                        <a href={site.contact.mapsHref} target="_blank" rel="noreferrer" className="text-[12px] font-medium text-slate-500 bg-slate-50 rounded-lg px-2.5 py-1 ring-1 ring-slate-200 hover:ring-slate-300 transition-all">
                          Open in Maps
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-brand-50 ring-1 ring-brand-100 grid place-items-center shrink-0">
                      <Icons.Phone className="w-4 h-4 text-brand-700" />
                    </div>
                    <div>
                      <a href={site.contact.phoneHref} className="font-semibold text-slate-900 hover:text-brand-700 transition-colors">{site.contact.phone}</a>
                      <p className="mt-1 text-xs text-slate-500">Fax {site.contact.fax}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-brand-50 ring-1 ring-brand-100 grid place-items-center shrink-0">
                      <Icons.Mail className="w-4 h-4 text-brand-700" />
                    </div>
                    <a href={site.contact.emailHref} className="font-semibold text-slate-900 hover:text-brand-700 transition-colors">{site.contact.email}</a>
                  </div>
                </div>

                {/* Parking info */}
                <div className="bg-slate-50 rounded-xl p-5 ring-1 ring-slate-200/60">
                  <h3 className="text-sm font-bold text-slate-800">Parking &amp; Access</h3>
                  <ul className="mt-2 space-y-1.5 text-sm text-slate-500">
                    {["Office is located in Suite 2", "Walk-ins are welcome during regular hours", "Call ahead with parking or accessibility questions"].map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Right: Hours + Languages + Service Area */}
            <Reveal direction="right" delay={0.1}>
              <div className="space-y-6">
                {/* Hours */}
                <div className="bg-white rounded-2xl p-6 ring-1 ring-slate-200/80 shadow-soft">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-brand-50 rounded-xl grid place-items-center ring-1 ring-brand-100">
                      <svg className="w-5 h-5 text-brand-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 6v6l4 2" /></svg>
                    </div>
                    <h2 className="text-lg font-bold text-slate-900">Office Hours</h2>
                  </div>
                  <div className="rounded-xl overflow-hidden ring-1 ring-slate-200/80">
                    <ul className="divide-y divide-slate-100">
                      {HOURS.map((h, i) => {
                        const isToday = i === todayIdx;
                        const isClosed = isClosedHour(h);
                        return (
                          <li key={h.label} className={cx(
                            "px-4 py-3 grid grid-cols-[1fr,auto] text-sm",
                            isToday && "bg-brand-50/60"
                          )}>
                            <span className={cx("font-medium", isToday ? "text-brand-800" : "text-slate-700")}>
                              {h.label}
                              {isToday && <span className="ml-2 text-[10px] font-bold uppercase tracking-widest text-brand-500">Today</span>}
                            </span>
                            <span className={cx(isClosed ? "text-slate-400" : "text-slate-700")}>
                              {isClosedHour(h) ? "Closed" : `${h.open} \u2013 ${h.close}`}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                {/* Languages */}
                <div className="bg-gradient-to-br from-gold-500 to-gold-400 rounded-2xl p-6 text-white shadow-lifted relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                  <h3 className="text-lg font-bold text-brand-950 mb-2">We speak your language</h3>
                  <p className="text-brand-900/70 text-sm mb-3">
                    Tambi&eacute;n hablamos espa&ntilde;ol. &nbsp; نتحدث العربية
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Arabic", "Spanish", "English"].map((l) => (
                      <span key={l} className="text-[11px] font-semibold bg-white/25 text-brand-950 rounded-full px-2.5 py-1">{l}</span>
                    ))}
                  </div>
                </div>

                {/* Service area */}
                <div className="bg-white rounded-2xl p-6 ring-1 ring-slate-200/80 shadow-soft">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Service Area</h3>
                  <p className="text-sm text-slate-500 mb-3">Proudly serving these communities and beyond:</p>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_AREA.map((a) => (
                      <span key={a} className="text-[12px] font-medium bg-slate-50 text-slate-600 rounded-lg px-2.5 py-1 ring-1 ring-slate-200/80">
                        {a}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-[12px] text-slate-400">Phone and email quotes available statewide.</p>
                </div>

                {/* CTA */}
                <div className="grid grid-cols-2 gap-3">
                  <a href={site.contact.phoneHref} className="btn btn-outline justify-center">Call Us</a>
                  <button onClick={openQuoteModal} className="btn btn-primary justify-center">Get a Quote</button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <PageTestimonials />
    </main>
  );
}
