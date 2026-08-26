import { useMemo } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";
import { getOfficeStatus } from "../data/hours";

const serviceLinks = [
  { label: "Auto Insurance", to: "/auto-insurance-los-angeles-ca" },
  { label: "SR-22 Filing", to: "/sr22-insurance-los-angeles" },
  { label: "No-License Auto", to: "/no-license-auto-insurance-los-angeles" },
  { label: "Commercial Auto", to: "/commercial-auto-insurance-los-angeles" },
  { label: "Home & Renters", to: "/services" },
  { label: "Motorcycle, RV & Boat", to: "/services" },
];

const companyLinks = [
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "FAQ", to: "/faq" },
  { label: "Location", to: "/locations" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy", to: "/privacy" },
  { label: "Accessibility", to: "/accessibility" },
];

const cityLinks = [
  { name: "Mar Vista", slug: "mar-vista" },
  { name: "Culver City", slug: "culver-city" },
  { name: "Santa Monica", slug: "santa-monica" },
  { name: "Venice", slug: "venice" },
  { name: "Marina del Rey", slug: "marina-del-rey" },
  { name: "West LA", slug: "west-los-angeles" },
  { name: "Inglewood", slug: "inglewood" },
  { name: "Westchester", slug: "westchester" },
];

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <h4 className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">
      {children}
    </h4>
  );
}

function FooterLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="text-sm text-white/68 transition-colors hover:text-white">
      {children}
    </Link>
  );
}

export default function Footer() {
  const { open, label, holidayWarning } = useMemo(() => getOfficeStatus(), []);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-950 text-white">
      <div className="border-y border-white/[0.07] bg-white/[0.025]">
        <div className="container flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Compare coverage with a local broker.</p>
            <p className="mt-0.5 text-xs text-white/55">Walk-ins welcome in Los Angeles. English, Spanish, and Arabic service.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={site.contact.phoneHref} className="btn btn-ghost-light btn-sm">
              Call {site.contact.phone}
            </a>
            <button onClick={openQuoteModal} className="btn btn-accent btn-sm">
              Free Quote
            </button>
          </div>
        </div>
      </div>

      <div className="container py-9 md:py-10">
        <div className="grid gap-8 lg:grid-cols-[1.3fr,0.9fr,0.8fr,1fr]">
          <section>
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="" className="h-12 w-auto rounded-md bg-white object-contain" />
              <div>
                <div className="text-sm font-bold text-white">Rafla Insurance Agency</div>
                <div className="text-xs text-white/52">Independent broker since 2003</div>
              </div>
            </div>

            <div className="mt-4 grid gap-2 text-sm text-white/68">
              <a href={site.contact.phoneHref} className="font-semibold text-white transition-colors hover:text-gold-300">
                {site.contact.phone}
              </a>
              <span>Fax {site.contact.fax}</span>
              <a href={site.contact.emailHref} className="transition-colors hover:text-white">
                {site.contact.email}
              </a>
              <a
                href={site.contact.mapsHref}
                target="_blank"
                rel="noreferrer"
                className="max-w-[17rem] leading-snug transition-colors hover:text-white"
              >
                12240 Venice Blvd, Suite 2, Los Angeles, CA 90066
              </a>
            </div>

            <div className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs ring-1 ${open ? "bg-gold-500/10 text-gold-300 ring-gold-400/30" : "bg-white/[0.04] text-white/60 ring-white/10"}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${open ? "bg-gold-400" : "bg-white/45"}`} />
              {label}
            </div>
            {holidayWarning && <p className="mt-1.5 text-xs text-amber-300/75">{holidayWarning}</p>}
          </section>

          <nav aria-label="Footer services">
            <FooterHeading>Coverage</FooterHeading>
            <ul className="grid gap-2">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink to={link.to}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer company">
            <FooterHeading>Company</FooterHeading>
            <ul className="grid gap-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink to={link.to}>{link.label}</FooterLink>
                </li>
              ))}
              <li>
                <button onClick={openQuoteModal} className="text-sm text-white/68 transition-colors hover:text-white">
                  Get a Quote
                </button>
              </li>
            </ul>
          </nav>

          <nav aria-label="Footer service areas">
            <FooterHeading>Nearby Areas</FooterHeading>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {cityLinks.map((city) => (
                <li key={city.slug}>
                  <FooterLink to={`/insurance/${city.slug}`}>{city.name}</FooterLink>
                </li>
              ))}
            </ul>
            <Link to="/locations" className="mt-3 inline-flex text-xs font-semibold text-gold-300/85 transition-colors hover:text-gold-200">
              Office details
            </Link>
          </nav>
        </div>

        <div className="mt-8 border-t border-white/[0.07] pt-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-medium text-white/45">
              <span>CA DOI Licensed</span>
              <span>CA Agency Lic. No. 0D95584</span>
              <span>English / Spanish / Arabic</span>
            </div>

            <div className="flex items-center gap-4 text-xs text-white/50">
              <a href={site.reviews.googleUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">Google reviews</a>
              <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="transition-colors hover:text-white">
                Top
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-white/38">
            <span>&copy; {year} Rafla Insurance Agency, Inc. All rights reserved.</span>
            <Link to="/privacy" className="transition-colors hover:text-white/70">Privacy &amp; data handling</Link>
            <Link to="/accessibility" className="transition-colors hover:text-white/70">Accessibility</Link>
          </div>
          <p className="mt-3 max-w-4xl text-[10px] leading-relaxed text-white/30">
            Coverage, eligibility, discounts, pricing, and processing times vary by carrier and policy. Website content is general information and does not bind, amend, or guarantee coverage; coverage is effective only when confirmed by the carrier or agency in writing.
          </p>
        </div>
      </div>
    </footer>
  );
}
