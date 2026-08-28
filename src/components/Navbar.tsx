import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Mail, MapPin, Menu, Phone, ShieldCheck, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { coverageEntries } from "../data/atlas";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";

const navItems = [
  { to: "/services", label: "Insurance" },
  { to: "/about", label: "About Us" },
  { to: "/locations", label: "Service Areas" },
  { to: "/faq", label: "FAQs" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isSectionActive = (to: string) => {
    if (to === "/services") {
      return pathname === to || coverageEntries.some((entry) => pathname === entry.href);
    }
    if (to === "/locations") {
      return pathname === to || pathname.startsWith("/insurance/");
    }
    return pathname === to;
  };

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>("a,button")?.focus(), 0);
    document.documentElement.classList.add("nav-open");
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const nodes = Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a[href],button:not([disabled])") ?? []);
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("nav-open");
    };
  }, [open]);

  return (
    <header className="atlas-nav-wrap">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="ria-utility">
        <div className="atlas-container">
          <span><MapPin size={13} /> 12240 Venice Blvd, Suite 2 · Mar Vista</span>
          <span><ShieldCheck size={13} /> Independent property &amp; casualty brokerage</span>
          <a href={site.contact.phoneHref}><Phone size={13} /> {site.contact.phone}</a>
        </div>
      </div>
      <div className="atlas-nav atlas-container">
        <NavLink to="/" className="atlas-nav__brand" aria-label="Rafla Insurance Agency home">
          <img src="/logo.svg" alt="Rafla Insurance Agency" width="208" height="52" />
        </NavLink>
        <nav className="atlas-nav__links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={isSectionActive(item.to) ? "is-active" : ""}>{item.label}</NavLink>
          ))}
        </nav>
        <div className="atlas-nav__actions">
          <span className="atlas-nav__languages">EN / ES / AR</span>
          <button type="button" onClick={openQuoteModal} className="atlas-nav__quote">Get a Quote <ArrowUpRight size={15} /></button>
          <button ref={triggerRef} type="button" className="atlas-nav__menu" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-nav" aria-label="Open navigation"><Menu /></button>
        </div>
      </div>
      <div className={`mobile-nav-backdrop ${open ? "is-open" : ""}`} aria-hidden={!open} onMouseDown={() => setOpen(false)} />
      <div ref={panelRef} id="mobile-nav" className={`mobile-nav ${open ? "is-open" : ""}`} aria-hidden={!open} inert={!open}>
        <div className="mobile-nav__top"><span>Menu</span><button type="button" onClick={() => setOpen(false)} aria-label="Close navigation"><X /></button></div>
        <nav aria-label="Mobile navigation" className="mobile-nav__main">
          <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
          {navItems.map((item) => <NavLink key={item.to} to={item.to} className={isSectionActive(item.to) ? "active" : ""}>{item.label}</NavLink>)}
        </nav>
        <div className="mobile-nav__coverage"><span>Popular insurance services</span>{coverageEntries.slice(0, 4).map((entry) => <NavLink key={entry.key} to={entry.href}>{entry.title}</NavLink>)}</div>
        <div className="mobile-nav__office">
          <a href={site.contact.mapsHref} target="_blank" rel="noreferrer">
            <MapPin aria-hidden="true" />
            <span><small>Visit the Mar Vista office</small><strong>12240 Venice Blvd, Suite 2</strong></span>
            <ArrowUpRight aria-hidden="true" />
          </a>
          <p>{site.hours.short} <span aria-hidden="true">/</span> English · Spanish · Arabic</p>
        </div>
        <div className="mobile-nav__contact"><a href={site.contact.phoneHref}><Phone size={16} /> {site.contact.phone}</a><a href={site.contact.emailHref}><Mail size={16} /> {site.contact.email}</a><button type="button" onClick={openQuoteModal}>Request a quote <ArrowUpRight size={16} /></button></div>
      </div>
    </header>
  );
}
