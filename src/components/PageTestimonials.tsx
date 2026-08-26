import { Building2, Languages, ShieldCheck } from "lucide-react";
import { RevealOnScroll } from "../design-system";
import { site } from "../lib/site";

const EXPECTATIONS = [
  { title: "Independent guidance", text: "We review the risk and available programs before recommending a policy.", Icon: ShieldCheck },
  { title: "Local office support", text: "Call, email, text, or visit our Mar Vista office on Venice Boulevard.", Icon: Building2 },
  { title: "Three-language service", text: "Discuss coverage in English, Spanish, or Arabic with a real person.", Icon: Languages },
];

export default function PageTestimonials({ tone = "offwhite" }: { tone?: "white" | "offwhite" }) {
  return (
    <section className={`sp ${tone === "offwhite" ? "bg-slate-50" : "bg-white"}`}>
      <div className="container">
        <RevealOnScroll className="text-center mb-10">
          <span className="eyebrow">What to expect</span>
          <h2 className="mt-3 display-2 text-slate-900">Insurance help built around the conversation</h2>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto">Bring us the details. We will explain the options clearly and stay available after the policy is issued.</p>
        </RevealOnScroll>
        <div className="grid gap-4 sm:grid-cols-3">
          {EXPECTATIONS.map(({ title, text, Icon }) => (
            <article key={title} className="reveal-surface rounded-2xl bg-white p-6 ring-1 ring-slate-200/80 shadow-soft">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100"><Icon className="h-5 w-5" /></div>
              <h3 className="mt-4 font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{text}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href={site.reviews.googleUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-gold-600">Read reviews on Google <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  );
}
