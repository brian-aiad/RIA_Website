import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { coverageEntries } from "../data/atlas";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";

const navItems = [
  { to: "/services", label: "Coverage" },
  { to: "/about", label: "The agency" },
  { to: "/locations", label: "Westside" },
  { to: "/faq", label: "Answers" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

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
      <div className="atlas-nav atlas-container">
        <NavLink to="/" className="atlas-nav__brand" aria-label="Rafla Insurance Agency home">
          <img src="/logo.svg" alt="Rafla Insurance Agency" width="208" height="52" />
        </NavLink>
        <nav className="atlas-nav__links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? "is-active" : ""}>{item.label}</NavLink>
          ))}
        </nav>
        <div className="atlas-nav__actions">
          <span className="atlas-nav__languages">EN / ES / AR</span>
          <button type="button" onClick={openQuoteModal} className="atlas-nav__quote">Quote <ArrowUpRight size={15} /></button>
          <button ref={triggerRef} type="button" className="atlas-nav__menu" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-nav" aria-label="Open navigation"><Menu /></button>
        </div>
      </div>
      <div className={`mobile-nav-backdrop ${open ? "is-open" : ""}`} aria-hidden={!open} onMouseDown={() => setOpen(false)} />
      <div ref={panelRef} id="mobile-nav" className={`mobile-nav ${open ? "is-open" : ""}`} aria-hidden={!open} inert={!open}>
        <div className="mobile-nav__top"><span>Navigate Rafla</span><button type="button" onClick={() => setOpen(false)} aria-label="Close navigation"><X /></button></div>
        <nav aria-label="Mobile navigation" className="mobile-nav__main">
          <NavLink to="/">Home <span>00</span></NavLink>
          {navItems.map((item, index) => <NavLink key={item.to} to={item.to}>{item.label}<span>0{index + 1}</span></NavLink>)}
        </nav>
        <div className="mobile-nav__coverage"><span>Coverage desk</span>{coverageEntries.slice(0, 4).map((entry) => <NavLink key={entry.key} to={entry.href}>{entry.title}</NavLink>)}</div>
        <div className="mobile-nav__contact"><a href={site.contact.phoneHref}><Phone size={16} /> {site.contact.phone}</a><button type="button" onClick={openQuoteModal}>Start a quote <ArrowUpRight size={16} /></button></div>
      </div>
    </header>
  );
}
