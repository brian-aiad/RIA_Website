import { Building2, Languages, MapPin, ShieldCheck } from "lucide-react";
import { Stagger, StaggerChild } from "./AnimatedSection";

const STATS = [
  { value: "Independent", label: "Insurance Agency", note: "Personal + commercial", Icon: ShieldCheck },
  { value: "0D95584", label: "CA Agency License", note: "Licensed in California", Icon: Building2 },
  { value: "3", label: "Languages", note: "English · Spanish · Arabic", Icon: Languages },
  { value: "Mar Vista", label: "Local Office", note: "12240 Venice Blvd", Icon: MapPin },
];

export default function StatsBar() {
  return (
    <div className="relative overflow-hidden bg-brand-950 border-t border-brand-900">
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.65) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.65) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
      <div className="container relative py-7">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div><span className="eyebrow-light">Agency snapshot</span><p className="mt-1 text-sm text-white/55">Local service and help that continues after the policy is issued.</p></div>
          <span className="w-fit rounded-full bg-gold-400/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-gold-200 ring-1 ring-gold-300/20">Walk-ins welcome</span>
        </div>
        <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {STATS.map(({ value, label, note, Icon }) => (
            <StaggerChild key={label}>
              <div className="h-full rounded-2xl bg-white/[0.055] px-4 py-4 ring-1 ring-white/10 backdrop-blur-sm sm:px-5 sm:py-5">
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-brand-800/70 text-gold-400 ring-1 ring-brand-700/70"><Icon className="h-5 w-5" /></div>
                <div className="text-xl font-extrabold tracking-tight text-white md:text-2xl">{value}</div>
                <div className="text-[12px] font-semibold text-white/70">{label}</div>
                <div className="mt-0.5 text-[10px] text-white/40">{note}</div>
              </div>
            </StaggerChild>
          ))}
        </Stagger>
      </div>
    </div>
  );
}
