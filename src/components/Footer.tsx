import { ArrowUp, ArrowUpRight, Clock3, ExternalLink, Languages, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { cities, coverageEntries } from "../data/atlas";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";

export default function Footer() {
  return (
    <footer className="atlas-footer">
      <div className="atlas-container">
        <div className="atlas-footer__mast">
          <div className="atlas-footer__identity">
            <img src="/logo.svg" alt="Rafla Insurance Agency" width="240" height="64" />
            <p>Personal, independent insurance guidance from our Mar Vista office.</p>
          </div>
          <button type="button" onClick={openQuoteModal}>Request a quote <ArrowUpRight size={18} /></button>
        </div>

        <div className="atlas-footer__grid">
          <section>
            <span className="atlas-footer__label">Insurance services</span>
            {coverageEntries.slice(0, 4).map((entry) => <Link key={entry.key} to={entry.href}>{entry.title}</Link>)}
            <Link to="/services">View all services</Link>
          </section>
          <section>
            <span className="atlas-footer__label">Communities we serve</span>
            <div className="atlas-footer__cities">
              {cities.slice(0, 8).map((city) => <Link key={city.slug} to={`/insurance/${city.slug}`}>{city.name}</Link>)}
            </div>
            <Link to="/locations">Explore service areas</Link>
          </section>
          <section className="atlas-footer__office">
            <span className="atlas-footer__label">Mar Vista office</span>
            <a href={site.contact.mapsHref} target="_blank" rel="noreferrer"><MapPin size={15} /> {site.contact.address}</a>
            <a href={site.contact.phoneHref}><Phone size={15} /> {site.contact.phone}</a>
            <a href={site.contact.emailHref}><Mail size={15} /> {site.contact.email}</a>
            <p><Clock3 size={15} /> {site.hours.short}</p>
            <p><Languages size={15} /> English · Spanish · Arabic</p>
          </section>
        </div>

        <div className="atlas-footer__legal">
          <div><a href={site.license.verifyUrl} target="_blank" rel="noreferrer">{site.license.label} <ExternalLink aria-hidden="true" size={12} /></a><span>© {new Date().getFullYear()} Rafla Insurance Agency, Inc.</span></div>
          <div><Link to="/privacy">Privacy</Link><Link to="/accessibility">Accessibility</Link><button type="button" onClick={() => window.scrollTo({ top: 0 })}>Top <ArrowUp size={13} /></button></div>
        </div>
        <p className="atlas-footer__disclaimer">Coverage, eligibility, discounts, pricing, and processing times vary by carrier and policy. Website content is general information and does not bind, amend, or guarantee coverage. Coverage is effective only when confirmed by the carrier or agency in writing.</p>
      </div>
    </footer>
  );
}
