import { ClipboardCheck, FileText, Phone, ShieldCheck } from "lucide-react";
import { openQuoteModal } from "../lib/openQuote";
import { images } from "../lib/images";
import { site } from "../lib/site";

const REVIEW_ITEMS = [
  "License or ownership status",
  "Vehicle, home, or business use",
  "Current coverage and gaps",
  "SR-22, no-license, or certificate needs",
];

export default function BrokerHeroPanel() {
  return (
    <aside className="overflow-hidden rounded-2xl bg-white/[0.08] text-white ring-1 ring-white/15 shadow-heavy backdrop-blur-md">
      <div className="relative h-56 overflow-hidden bg-brand-950">
        <img
          src={images.claims.docs}
          alt="Insurance policy folders and keys on a broker desk"
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
          width={800}
          height={600}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/88 via-brand-950/18 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-300">Prepared before you buy</span>
            <p className="mt-1 text-sm font-semibold text-white/92">Coverage details, documents, and carrier fit reviewed up front.</p>
          </div>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-400 text-brand-950 shadow-md">
            <ClipboardCheck className="h-5 w-5" />
          </span>
        </div>
      </div>

      <div className="p-5">
      <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="eyebrow-light">Broker Review</span>
          <h2 className="mt-2 text-2xl font-bold leading-tight">Coverage checked before price.</h2>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-white/75">
        A quote is only useful if the policy can actually protect you. We review the details carriers care about, then compare available options.
      </p>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {[
          ["multiple", "Carriers"],
          ["20+", "Years"],
          ["3", "Languages"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-xl bg-white/[0.06] px-3 py-3 text-center ring-1 ring-white/10">
            <div className="text-lg font-extrabold tracking-tight text-white">{value}</div>
            <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/50">{label}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3">
        {REVIEW_ITEMS.map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-xl bg-white/[0.06] px-3 py-2.5 ring-1 ring-white/10">
            <ShieldCheck className="h-4 w-4 shrink-0 text-gold-300" />
            <span className="text-sm font-medium text-white/85">{item}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl bg-brand-900/70 p-4 ring-1 ring-white/10">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <FileText className="h-4 w-4 text-gold-300" />
          Prompt proof after carrier binding
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-white/65">
          Bring what you have. If something is missing, a broker can tell you what is actually required.
        </p>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <button onClick={openQuoteModal} className="btn btn-accent justify-center">
          Start Quote
        </button>
        <a href={site.contact.phoneHref} className="btn btn-ghost-light justify-center">
          <Phone className="h-4 w-4" />
          Call
        </a>
      </div>
      </div>
    </aside>
  );
}
