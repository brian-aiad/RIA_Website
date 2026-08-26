import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";

function cx(...v: (string | false | null | undefined)[]) {
  return v.filter(Boolean).join(" ");
}

const LINKS = [
  { to: "/",          label: "Home" },
  { to: "/services",  label: "Services" },
  { to: "/about",     label: "About" },
  { to: "/faq",       label: "FAQ" },
  { to: "/locations", label: "Location" },
  { to: "/contact",   label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();

  /* close on route change */
  useEffect(() => setOpen(false), [pathname]);

  /* scroll shadow */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* lock body */
  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", open);
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [open]);

  /* keyboard navigation and focus containment */
  useEffect(() => {
    if (!open) return;
    const focusTimer = window.setTimeout(() => sheetRef.current?.querySelector<HTMLElement>("a[href], button")?.focus(), 0);
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = [
        btnRef.current,
        ...Array.from(sheetRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []),
      ].filter((item): item is HTMLElement => Boolean(item));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", fn);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", fn);
    };
  }, [open]);

  /* outside click */
  useEffect(() => {
    if (!open) return;
    const fn = (e: Event) => {
      const t = e.target as Node;
      if (sheetRef.current?.contains(t) || btnRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      {/* skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-white focus:text-slate-900 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
      >
        Skip to content
      </a>

      {/* ── Top utility strip (desktop) ── */}
      <div className="hidden lg:block bg-brand-950 text-[12px] text-white/60">
        <div className="container flex items-center justify-between py-1.5">
          <div className="flex items-center divide-x divide-white/10">
            <span className="pr-4 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Mon - Fri 10am-7pm &middot; Sat 10am-3pm
            </span>
            <span className="px-4">{site.contact.address}</span>
            <span className="pl-4">Arabic &middot; Spanish &middot; English</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={site.contact.phoneHref} className="hover:text-white transition-colors">{site.contact.phone}</a>
            <a href={site.contact.emailHref} className="hover:text-white transition-colors">{site.contact.email}</a>
          </div>
        </div>
      </div>

      {/* ── Main bar ── */}
      <div
        className={cx(
          "transition-all duration-300 border-b",
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-soft border-slate-200/80"
            : "bg-white border-transparent"
        )}
      >
        <div className="container flex items-center justify-between h-16 md:h-[68px]">
          {/* Brand */}
          <NavLink to="/" className="flex items-center gap-2.5 group shrink-0">
            <img
              src="/logo.svg"
              alt="Rafla Insurance Agency"
              className="h-11 w-auto max-w-[210px] object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
            <div className="hidden leading-tight">
              <div className="text-[15px] font-bold text-brand-900 tracking-tight">Rafla Insurance</div>
              <div className="text-[11px] text-slate-500 font-medium">Est. 2003 &middot; Los Angeles, CA</div>
            </div>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cx(
                    "relative px-3 py-1.5 rounded-lg text-[13.5px] font-medium transition-colors",
                    isActive
                      ? "text-brand-800"
                      : "text-slate-500 hover:text-slate-800"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && <span className="absolute inset-0 rounded-lg bg-brand-50 -z-10" />}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href={site.contact.phoneHref}
              className="text-[13px] font-medium text-slate-500 hover:text-brand-700 transition-colors flex items-center gap-1.5"
              aria-label={`Call ${site.contact.phone}`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.3 2.6 3.4 4.7 6 6l2-2c.2-.2.6-.3.9-.2 1 .3 2 .5 3.1.5.5 0 .9.4.9.9V20c0 .5-.4.9-.9.9C9.6 20.9 3.1 14.4 3.1 6.9c0-.5.4-.9.9-.9h2.2c.5 0 .9.4.9.9 0 1.1.2 2.1.5 3.1.1.3 0 .6-.2.9l-1.8 1.8z" /></svg>
              Call
            </a>
            <a
              href={site.contact.textHref}
              className="text-[13px] font-medium text-slate-500 hover:text-brand-700 transition-colors flex items-center gap-1.5"
              aria-label={`Text ${site.contact.text}`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>
              Text
            </a>
            <button onClick={openQuoteModal} className="btn btn-primary btn-sm">
              Free Quote
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            ref={btnRef}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 -mr-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <svg className="w-6 h-6 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              {open ? (
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* ── Mobile sheet ── */}
        {open && (
            <div
              ref={sheetRef}
              className="mobile-menu-sheet lg:hidden overflow-hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl"
            >
              <div className="container py-5 space-y-2">
                {LINKS.map((l) => (
                  <div
                    key={l.to}
                  >
                    <NavLink
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cx(
                          "block px-4 py-3 rounded-xl text-[15px] font-medium transition-colors",
                          isActive
                            ? "bg-brand-50 text-brand-800"
                            : "text-slate-600 hover:bg-slate-50"
                        )
                      }
                    >
                      {l.label}
                    </NavLink>
                  </div>
                ))}

                <div className="pt-3 grid grid-cols-3 gap-2">
                  <a href={site.contact.phoneHref} className="btn btn-outline btn-sm justify-center">
                    Call
                  </a>
                  <a href={site.contact.textHref} className="btn btn-outline btn-sm justify-center">
                    Text
                  </a>
                  <button onClick={() => { setOpen(false); openQuoteModal(); }} className="btn btn-primary btn-sm justify-center">
                    Quote
                  </button>
                </div>

                <div className="pt-2 text-[12px] text-slate-400 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Mon-Fri 10-7 &middot; Sat 10-3
                </div>
              </div>
            </div>
          )}
      </div>
    </header>
  );
}
