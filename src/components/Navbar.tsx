import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Mail, MapPin, Menu, MessageSquareText, Phone, ShieldCheck, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { coverageEntries } from "../data/atlas";
import { site } from "../lib/site";

const navItems = [
  { to: "/services", label: "Insurance" },
  { to: "/about", label: "About Us" },
  { to: "/locations", label: "Service Areas" },
  { to: "/faq", label: "FAQs" },
  { to: "/contact", label: "Contact" },
];

const insurancePaths = new Set([
  ...coverageEntries.map((entry) => entry.href.split("#")[0]),
  "/commercial-auto-insurance-los-angeles",
  "/no-license-auto-insurance-los-angeles",
]);

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [quickActionsVisible, setQuickActionsVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  const closeForNavigation = (to: string) => {
    // Same-page links do not trigger the pathname effect. Restore focus to
    // the menu button in that case; route changes manage their own focus.
    closeMenu(!to.includes("#") && pathname === to.split("?")[0]);
  };

  const isSectionActive = (to: string) => {
    if (to === "/services") {
      return pathname === to || insurancePaths.has(pathname);
    }
    if (to === "/locations") {
      return pathname === to || pathname.startsWith("/insurance/");
    }
    return pathname === to;
  };

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 901px)");
    const releaseMobilePanel = () => {
      if (!desktop.matches) return;
      const focusWasInPanel = panelRef.current?.contains(document.activeElement);
      closeMenu(false);
      // The mobile trigger is hidden after this breakpoint; return to a visible
      // navigation target rather than leaving focus in an inert, hidden dialog.
      if (focusWasInPanel) window.requestAnimationFrame(() => {
        document.querySelector<HTMLElement>(".atlas-nav__brand")?.focus();
      });
    };
    desktop.addEventListener("change", releaseMobilePanel);
    return () => desktop.removeEventListener("change", releaseMobilePanel);
  }, [closeMenu]);

  useEffect(() => {
    setQuickActionsVisible(false);
    const main = document.querySelector("main");
    const anchor = Array.from(main?.children ?? []).find((node): node is HTMLElement =>
      node instanceof HTMLElement && node.matches("header, section"),
    );
    if (!anchor) return;

    let anchorVisible = true;
    const restingStates = new Map<Element, boolean>();
    const updateVisibility = () => {
      const restingActionVisible = Array.from(restingStates.values()).some(Boolean);
      setQuickActionsVisible(!anchorVisible && !restingActionVisible);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === anchor) anchorVisible = entry.isIntersecting;
          else restingStates.set(entry.target, entry.isIntersecting);
        });
        updateVisibility();
      },
      { threshold: 0.02, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(anchor);
    document.querySelectorAll(".quote-band, #quote-request, .atlas-footer").forEach((element) => {
      restingStates.set(element, false);
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>("a,button")?.focus(), 0);
    document.documentElement.classList.add("nav-open");
    document.body.classList.add("nav-open");
    const background = Array.from(document.querySelectorAll<HTMLElement>(
      "main, .atlas-footer, .ria-utility, .atlas-nav, .mobile-quick-actions",
    ));
    const priorInert = new Map(background.map((element) => [element, element.hasAttribute("inert")]));
    background.forEach((element) => element.setAttribute("inert", ""));
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
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
      document.body.classList.remove("nav-open");
      priorInert.forEach((wasInert, element) => {
        if (!wasInert) element.removeAttribute("inert");
      });
    };
  }, [closeMenu, open]);

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
          <img src="/logo.svg" alt="Rafla Insurance Agency" width="1185" height="460" />
        </NavLink>
        <nav className="atlas-nav__links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={isSectionActive(item.to) ? "is-active" : ""}>{item.label}</NavLink>
          ))}
        </nav>
        <div className="atlas-nav__actions">
          <span className="atlas-nav__languages">EN / ES / AR</span>
          <Link to="/contact#quote-request" className="atlas-nav__quote">Get a quote <ArrowUpRight size={15} /></Link>
          <button ref={triggerRef} type="button" className="atlas-nav__menu" onClick={() => setOpen(true)} aria-expanded={open} aria-haspopup="dialog" aria-controls="mobile-nav" aria-label="Open navigation"><Menu /></button>
        </div>
      </div>
      <div className={`mobile-nav-backdrop ${open ? "is-open" : ""}`} aria-hidden="true" onMouseDown={() => closeMenu()} />
      <div ref={panelRef} id="mobile-nav" className={`mobile-nav ${open ? "is-open" : ""}`} role="dialog" aria-modal={open} aria-label="Navigation menu" aria-hidden={!open} inert={!open}>
        <div className="mobile-nav__top"><span>Menu</span><button type="button" onClick={() => closeMenu()} aria-label="Close navigation"><X /></button></div>
        <nav aria-label="Mobile navigation" className="mobile-nav__main">
          <NavLink to="/" end onClick={() => closeForNavigation("/")} className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
          {navItems.map((item) => <NavLink key={item.to} to={item.to} onClick={() => closeForNavigation(item.to)} className={isSectionActive(item.to) ? "active" : ""}>{item.label}</NavLink>)}
        </nav>
        <div className="mobile-nav__coverage"><span>Popular insurance services</span>{coverageEntries.slice(0, 4).map((entry) => <NavLink key={entry.key} to={entry.href} onClick={() => closeForNavigation(entry.href)}>{entry.title}</NavLink>)}</div>
        <div className="mobile-nav__office">
          <a href={site.contact.mapsHref} target="_blank" rel="noopener noreferrer">
            <MapPin aria-hidden="true" />
            <span><small>Visit the Mar Vista office</small><strong>12240 Venice Blvd, Suite 2</strong></span>
            <ArrowUpRight aria-hidden="true" />
          </a>
          <p>{site.hours.short} <span aria-hidden="true">/</span> English · Spanish · Arabic</p>
        </div>
        <div className="mobile-nav__contact"><a href={site.contact.phoneHref}><Phone size={16} /> {site.contact.phone}</a><a href={site.contact.textHref}><MessageSquareText size={16} /> Text Ash {site.contact.text}</a><a href={site.contact.emailHref}><Mail size={16} /> {site.contact.email}</a><Link className="mobile-nav__quote" to="/contact#quote-request" onClick={() => closeForNavigation("/contact#quote-request")}>Get a quote <ArrowUpRight size={16} /></Link></div>
      </div>
      <nav
        className={`mobile-quick-actions ${quickActionsVisible && !open ? "is-visible" : ""}`}
        aria-label="Quick contact actions"
        aria-hidden={!quickActionsVisible || open}
        inert={!quickActionsVisible || open}
      >
        <a href={site.contact.phoneHref}><Phone aria-hidden="true" /><span><small>Speak with us</small>Call agency</span></a>
        <Link className="mobile-quick-actions__quote" to="/contact#quote-request"><span><small>Start here</small>Get a quote</span><ArrowUpRight aria-hidden="true" /></Link>
      </nav>
    </header>
  );
}
