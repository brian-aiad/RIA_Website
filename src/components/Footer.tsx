import { ArrowUp, ExternalLink, Mail, MapPin, MessageSquareText, Phone } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { cities, coverageEntries } from "../data/atlas";
import { site } from "../lib/site";
import NeighborhoodSignature from "./NeighborhoodSignature";

export default function Footer() {
  const footer = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  useEffect(() => {
    const root = footer.current;
    if (!root) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    // Animate only the short section rules; brand, links, and legal copy stay put.
    const columns = Array.from(root.querySelectorAll<HTMLElement>(".footer-directory > nav, .footer-directory__office"));
    const reset = () => {
      observer?.disconnect();
      columns.forEach(column => column.classList.remove("footer-column-enter"));
      if (preference.matches) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("footer-column-enter");
          observer?.unobserve(entry.target);
        });
      }, { threshold: .1 });
      columns.forEach(column => observer?.observe(column));
    };
    reset();
    preference.addEventListener("change", reset);
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", reset);
      columns.forEach(column => column.classList.remove("footer-column-enter"));
    };
  }, [pathname]);
  return (
    <footer ref={footer} className="atlas-footer">
      <div className="atlas-container footer-directory">
        <div className="footer-directory__brand">
          <Link to="/" aria-label="Rafla Insurance Agency home"><img src="/logo.svg" alt="Rafla Insurance Agency" width="1185" height="460" loading="lazy" /></Link>
          <p>Independent insurance guidance.<br />Local service since 2003.</p>
          <NeighborhoodSignature />
          <a className="footer-directory__license" href={site.license.verifyUrl} target="_blank" rel="noopener noreferrer">CA agency lic. 0D95584 <ExternalLink aria-hidden="true" size={12} /></a>
        </div>
        <nav className="footer-directory__services" aria-label="Footer insurance services">
          <h2>Insurance</h2>
          {coverageEntries.slice(0, 4).map((entry) => <Link key={entry.key} to={entry.href}>{entry.title}</Link>)}
          <Link to="/services">All services</Link>
        </nav>
        <nav className="footer-directory__areas" aria-label="Footer service areas">
          <h2>Our communities</h2>
          {cities.slice(0, 4).map((city) => <Link key={city.slug} to={`/insurance/${city.slug}`}>{city.name}</Link>)}
          <Link to="/locations">All service areas</Link>
        </nav>
        <section className="footer-directory__office" aria-labelledby="footer-office-title">
          <h2 id="footer-office-title">Contact the office</h2>
          <address>
            <a href={site.contact.mapsHref} target="_blank" rel="noopener noreferrer"><MapPin aria-hidden="true" /><span>12240 Venice Blvd, Suite 2<br />Los Angeles, CA 90066</span></a>
            <a href={site.contact.phoneHref}><Phone aria-hidden="true" /><span>{site.contact.phone}</span></a>
            <a href={site.contact.textHref}><MessageSquareText aria-hidden="true" /><span>Text Ash <span className="footer-directory__text-number">{site.contact.text}</span></span></a>
            <a href={site.contact.emailHref}><Mail aria-hidden="true" /><span>{site.contact.email}</span></a>
          </address>
          <p className="footer-directory__hours">Mon–Fri 10–5 · Weekends closed<br />English · Spanish · Arabic</p>
        </section>
        <div className="footer-directory__bottom">
          <p>© {new Date().getFullYear()} Rafla Insurance Agency, Inc.</p>
          <nav aria-label="Legal and page navigation"><Link to="/privacy">Privacy</Link><Link to="/accessibility">Accessibility</Link><button type="button" onClick={() => window.scrollTo({ top: 0 })}>Back to top <ArrowUp aria-hidden="true" size={13} /></button></nav>
        </div>
        <p className="footer-directory__disclaimer">Coverage, eligibility, discounts, pricing, and processing times vary by carrier and policy. Website content is general information and does not bind, amend, or guarantee coverage. Coverage is effective only when confirmed by the carrier or agency in writing.</p>
      </div>
    </footer>
  );
}
