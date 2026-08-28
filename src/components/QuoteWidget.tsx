import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Mail, MessageSquareText, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { site } from "../lib/site";

const QUOTE_TYPES = [
  { label: "Auto", note: "Driver, vehicle, and current-policy details", checklist: ["Driver names and dates of birth", "Vehicle year, make, model, or VIN", "Current declarations page if available"] },
  { label: "Home", note: "Property, renters, landlord, or bundle review", checklist: ["Property address", "Current declarations page", "Loan, lease, or landlord requirement"] },
  { label: "Business", note: "Operations, payroll, vehicles, and certificate needs", checklist: ["Business name and operations", "Payroll, sales, or vehicle schedule", "Certificate or contract requirements"] },
  { label: "Specialty", note: "SR-22, bonds, motorcycle, RV, boat, and unusual risks", checklist: ["What needs to be insured or filed", "Target effective date", "Any current policy or requirement notice"] },
] as const;

export default function QuoteWidget({ openSignal = 0 }: { openSignal?: number }) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [quoteType, setQuoteType] = useState<(typeof QUOTE_TYPES)[number]["label"]>("Auto");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const selected = QUOTE_TYPES.find((item) => item.label === quoteType) ?? QUOTE_TYPES[0];

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener("openQuoteModal", handleOpen);
    return () => window.removeEventListener("openQuoteModal", handleOpen);
  }, []);
  useEffect(() => { if (openSignal > 0) setOpen(true); }, [openSignal]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);
    const handleKeyDown = (event: KeyboardEvent) => {
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
      previousFocusRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduceMotion ? undefined : { opacity: 0 }} className="fixed inset-0 z-[60] grid place-items-center p-4">
            <button type="button" className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} aria-label="Close quote dialog" />
            <motion.section initial={reduceMotion ? false : { y: 20, opacity: 0, scale: 0.985 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={reduceMotion ? undefined : { y: 20, opacity: 0, scale: 0.985 }} className="relative max-h-[calc(100dvh-2rem)] w-full max-w-3xl overflow-y-auto overscroll-contain border border-gold-500 bg-white shadow-heavy" role="dialog" aria-modal="true" aria-labelledby="quote-title" aria-describedby="quote-description">
              <div className="flex items-start justify-between border-b border-brand-100 px-6 py-5">
                <div><p className="eyebrow">Rafla Insurance Agency</p><h2 id="quote-title" className="mt-1 text-xl font-bold text-brand-950">Start your insurance quote</h2><p id="quote-description" className="mt-1 text-sm text-slate-500">Choose a coverage type, then contact the office using the method you prefer.</p></div>
                <button ref={closeButtonRef} type="button" onClick={() => setOpen(false)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Close"><X className="h-5 w-5" /></button>
              </div>

              <div className="grid md:grid-cols-[.85fr_1.15fr]">
                <div className="bg-brand-950 p-6 text-white">
                  <p className="text-xs font-bold uppercase tracking-widest text-gold-300">Coverage type</p>
                  <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-1">
                    {QUOTE_TYPES.map((item) => <button type="button" aria-pressed={quoteType === item.label} key={item.label} onClick={() => setQuoteType(item.label)} className={`border px-4 py-3 text-left text-sm font-semibold transition ${quoteType === item.label ? "border-gold-500 bg-gold-500 text-brand-950" : "border-white/10 bg-white/5 text-white/75 hover:bg-white/10"}`}>{item.label}</button>)}
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-white/65">{selected.note}</p>
                </div>

                <div className="p-6 md:p-8">
                  <h3 className="font-bold text-slate-900">Helpful information to have ready</h3>
                  <ul className="mt-4 space-y-3">
                    {selected.checklist.map((item) => <li key={item} className="flex gap-3 text-sm text-slate-600"><span className="mt-1 grid h-5 w-5 shrink-0 place-items-center bg-gold-100 text-brand-800">✓</span>{item}</li>)}
                  </ul>
                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    <a href={site.contact.phoneHref} className="btn btn-accent"><Phone className="h-4 w-4" />Call {site.contact.phone}</a>
                    <a href={site.contact.textHref} className="btn btn-primary"><MessageSquareText className="h-4 w-4" />Text Mark</a>
                    <a href={site.contact.emailHref} className="btn btn-outline"><Mail className="h-4 w-4" />Email the Office</a>
                    <Link to="/contact" onClick={() => setOpen(false)} className="btn btn-outline">Contact Options</Link>
                  </div>
                  <p className="mt-5 text-xs leading-relaxed text-slate-400">Do not send Social Security numbers, payment information, or full driver’s-license images by email or text.</p>
                </div>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
