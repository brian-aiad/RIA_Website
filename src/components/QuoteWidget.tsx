import { ArrowRight, Building2, CarFront, FileBadge2, House, Mail, MessageSquareText, Phone, X } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { takeQuoteInvoker } from "../lib/openQuote";
import { site } from "../lib/site";

const QUOTE_TYPES = [
  { id: "auto", label: "Auto", icon: CarFront, note: "Drivers, vehicles, garaging, use, and the limits on your current policy.", checklist: ["Driver names and dates of birth", "Vehicle year, make, model, or VIN", "Current declarations page, if available"] },
  { id: "home", label: "Home", icon: House, note: "Homeowners, renters, condo, landlord, or a home-and-auto review.", checklist: ["Property address and occupancy", "Current declarations page, if available", "Loan, lease, association, or landlord requirement"] },
  { id: "business", label: "Business", icon: Building2, note: "Operations, payroll, vehicles, employees, locations, and contract requirements.", checklist: ["Business name and a plain description of the work", "Payroll, sales, property, or vehicle schedule", "Certificate sample, contract, or deadline"] },
  { id: "specialty", label: "Specialty", icon: FileBadge2, note: "SR-22, bonds, motorcycle, RV, boat, and situations that need a closer look.", checklist: ["What needs to be insured, bonded, or filed", "Target effective date and official deadline", "Any current policy, notice, contract, or registration"] },
] as const;

export default function QuoteWidget({ openSignal = 0 }: { openSignal?: number }) {
  const [open, setOpen] = useState(false);
  const [quoteType, setQuoteType] = useState<(typeof QUOTE_TYPES)[number]["id"]>("auto");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const restoreFocusFrameRef = useRef(0);
  const selectedIndex = QUOTE_TYPES.findIndex((item) => item.id === quoteType);
  const selected = QUOTE_TYPES[selectedIndex] ?? QUOTE_TYPES[0];

  const moveTab = (event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const lastIndex = QUOTE_TYPES.length - 1;
    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? lastIndex
        : ["ArrowDown", "ArrowRight"].includes(event.key)
          ? (currentIndex + 1) % QUOTE_TYPES.length
          : (currentIndex - 1 + QUOTE_TYPES.length) % QUOTE_TYPES.length;
    const next = QUOTE_TYPES[nextIndex];
    setQuoteType(next.id);
    window.requestAnimationFrame(() => document.getElementById(`quote-type-${next.id}`)?.focus());
  };

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener("openQuoteModal", handleOpen);
    return () => window.removeEventListener("openQuoteModal", handleOpen);
  }, []);
  useEffect(() => () => window.cancelAnimationFrame(restoreFocusFrameRef.current), []);
  useEffect(() => { if (openSignal > 0) setOpen(true); }, [openSignal]);
  useEffect(() => {
    if (!open) return;
    window.cancelAnimationFrame(restoreFocusFrameRef.current);
    previousFocusRef.current = takeQuoteInvoker()
      ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    const appRoot = document.getElementById("root");
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    appRoot?.setAttribute("inert", "");
    document.documentElement.classList.add("quote-open");
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const dialog = closeButtonRef.current?.closest<HTMLElement>("[role='dialog']");
      const focusable = dialog
        ? Array.from(dialog.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])"))
        : [];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !dialog?.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      appRoot?.removeAttribute("inert");
      document.documentElement.classList.remove("quote-open");
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      const restoreTarget = previousFocusRef.current;
      restoreFocusFrameRef.current = window.requestAnimationFrame(() => {
        if (restoreTarget?.isConnected) restoreTarget.focus();
      });
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
        <div className="quote-dialog-layer">
          <div className="quote-dialog-backdrop" onMouseDown={() => setOpen(false)} aria-hidden="true" />
          <section
            className="quote-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-title"
            aria-describedby="quote-description"
          >
            <header className="quote-dialog__header">
              <div className="quote-dialog__brand">
                <img src="/logo.svg" alt="Rafla Insurance Agency" width="168" height="42" />
                <span>Quote preparation</span>
              </div>
              <div className="quote-dialog__intro">
                <small>Local broker desk · Mar Vista</small>
                <h2 id="quote-title">Start with what needs protecting.</h2>
                <p id="quote-description">Choose the closest coverage file. This preparation guide does not submit or save a quote request.</p>
              </div>
              <button ref={closeButtonRef} type="button" onClick={() => setOpen(false)} className="quote-dialog__close" aria-label="Close"><X /></button>
            </header>

            <div className="quote-dialog__body">
              <aside className="quote-dialog__types">
                <span>Choose a working file</span>
                <div role="tablist" aria-label="Quote coverage type">
                  {QUOTE_TYPES.map((item, index) => {
                    const Icon = item.icon;
                    const active = quoteType === item.id;
                    return (
                      <button
                        id={`quote-type-${item.id}`}
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        aria-controls="quote-file-panel"
                        tabIndex={active ? 0 : -1}
                        onClick={() => setQuoteType(item.id)}
                        onKeyDown={(event) => moveTab(event, index)}
                      >
                        <Icon aria-hidden="true" />
                        <strong>{item.label}</strong>
                        <ArrowRight aria-hidden="true" />
                      </button>
                    );
                  })}
                </div>
                <p key={selected.id}>{selected.note}</p>
                <div className="quote-dialog__hours"><small>Office hours</small><strong>{site.hours.short}</strong><span>English · Spanish · Arabic</span></div>
              </aside>

              <section
                id="quote-file-panel"
                className="quote-dialog__file"
                role="tabpanel"
                aria-labelledby={`quote-type-${selected.id}`}
                aria-live="polite"
              >
                <div className="quote-dialog__paperclip" aria-hidden="true" />
                <span className="quote-dialog__file-label">Working file · {selected.label}</span>
                <h3>Helpful details to have ready.</h3>
                <p>Bring what you have. The office can tell you which details apply to your situation and what can follow later.</p>
                <ul key={selected.id}>
                  {selected.checklist.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}
                </ul>

                <div className="quote-dialog__actions">
                  <a href={site.contact.phoneHref} className="quote-dialog__action quote-dialog__action--primary"><Phone aria-hidden="true" /><span><small>Call the office</small><strong>{site.contact.phone}</strong></span><ArrowRight aria-hidden="true" /></a>
                  <a href={site.contact.emailHref} className="quote-dialog__action"><Mail aria-hidden="true" /><span><small>Email the desk</small><strong>{site.contact.email}</strong></span><ArrowRight aria-hidden="true" /></a>
                  <a href={site.contact.textHref} className="quote-dialog__action"><MessageSquareText aria-hidden="true" /><span><small>Text Mark</small><strong>{site.contact.text}</strong></span><ArrowRight aria-hidden="true" /></a>
                  <Link to="/contact" onClick={() => setOpen(false)} className="quote-dialog__action"><FileBadge2 aria-hidden="true" /><span><small>More ways to reach us</small><strong>Contact options</strong></span><ArrowRight aria-hidden="true" /></Link>
                </div>
                <p className="quote-dialog__privacy">For your privacy, do not email or text Social Security numbers, payment information, or full driver’s-license images.</p>
              </section>
            </div>
          </section>
        </div>,
    document.body,
  );
}
