import { FileCheck2, Gauge, ShieldCheck } from "lucide-react";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";
import { Card, RevealOnScroll, Section, SectionHeader } from "../design-system";

const STEPS = [
  {
    title: "Review your real situation",
    text: "License status, vehicle use, current coverage, home details, business operations, or SR-22 needs.",
    Icon: FileCheck2,
  },
  {
    title: "Shop carrier appetite",
    text: "We compare carriers that actually write your risk instead of forcing every client into one company.",
    Icon: Gauge,
  },
  {
    title: "Bind coverage and service it",
    text: "Proof after carrier binding, electronic SR-22 coordination, renewal checks, and claim guidance.",
    Icon: ShieldCheck,
  },
];

const CHECKLIST = [
  "Driver or owner details",
  "VIN, registration, or property address",
  "Current declarations page if available",
  "SR-22, no-license, or business-use details",
];

interface InsuranceWorkflowProps {
  tone?: "light" | "offwhite";
  title?: string;
  lede?: string;
}

export default function InsuranceWorkflow({
  tone = "offwhite",
  title = "How a better insurance quote should work",
  lede = "A good quote is not a price guess. It is a clean comparison of coverage, carrier fit, documents, and timing.",
}: InsuranceWorkflowProps) {
  return (
    <Section tone={tone}>
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-start">
          <div>
            <RevealOnScroll>
              <SectionHeader eyebrow="Quote Process" title={title} lede={lede} />
            </RevealOnScroll>
            <RevealOnScroll delay={0.04}>
              <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                {["No pressure", "Carrier-by-carrier comparison", "Clear next steps"].map((item) => (
                  <span key={item} className="rounded-full bg-white px-3 py-1.5 ring-1 ring-slate-200/80 shadow-xs">
                    {item}
                  </span>
                ))}
              </div>
            </RevealOnScroll>
            <div className="relative mt-8 grid gap-4">
              <div className="absolute left-[21px] top-8 bottom-8 hidden w-px bg-gradient-to-b from-brand-100 via-brand-200 to-brand-100 sm:block" aria-hidden="true" />
              {STEPS.map(({ title: stepTitle, text, Icon }, index) => (
                <RevealOnScroll key={stepTitle} delay={index * 0.05}>
                <Card className="relative flex gap-4 p-5" hover>
                  <div className="shrink-0 h-11 w-11 rounded-xl bg-brand-50 ring-1 ring-brand-100 grid place-items-center text-brand-700 shadow-xs">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gold-600">
                        Step {index + 1}
                      </span>
                      <span className="h-px w-8 bg-slate-200" />
                    </div>
                    <h3 className="mt-1 font-bold text-slate-900">{stepTitle}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{text}</p>
                  </div>
                </Card>
                </RevealOnScroll>
              ))}
            </div>
          </div>

          <RevealOnScroll direction="right" delay={0.1}>
          <Card variant="dark" className="relative overflow-hidden text-white lg:sticky lg:top-28">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300" aria-hidden="true" />
            <span className="eyebrow-light">Before You Call</span>
            <h3 className="mt-3 text-2xl font-bold tracking-tight">Have what you can. We can work with the rest.</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              Quotes move faster when we can verify the basics. If you are missing something, call anyway.
            </p>
            <ul className="mt-6 space-y-3">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/85">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-400 text-brand-950">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-7 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <button onClick={openQuoteModal} className="btn btn-accent justify-center">
                Start Quote
              </button>
              <a href={site.contact.phoneHref} className="btn btn-ghost-light justify-center">
                Call {site.contact.phone}
              </a>
            </div>
          </Card>
          </RevealOnScroll>
        </div>
      </div>
    </Section>
  );
}
