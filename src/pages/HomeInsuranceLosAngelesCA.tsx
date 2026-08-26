import { useState } from "react";
import { NavLink } from "react-router-dom";
import { usePageMeta } from "../lib/seo";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";
import PageHero from "../components/PageHero";
import LocalBusinessSchema from "../components/seo/LocalBusinessSchema";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import FAQSchema from "../components/seo/FAQSchema";
import InsuranceWorkflow from "../components/InsuranceWorkflow";
import StatsBar from "../components/StatsBar";
import PageTestimonials from "../components/PageTestimonials";
import { Reveal, Stagger, StaggerChild } from "../components/AnimatedSection";
import { images } from "../lib/images";

const HOME_FAQS = [
  {
    q: "How much does home insurance cost in Los Angeles, CA?",
    a: "Premiums depend on replacement cost, construction, roof and systems, location, claims history, limits, deductibles, and carrier underwriting. We compare the programs available for the property rather than relying on a generic Los Angeles average.",
  },
  {
    q: "Is renters insurance worth it in Los Angeles?",
    a: "Renters coverage can protect personal belongings, personal liability, and additional living expenses for covered losses, subject to the policy terms. A landlord's property policy generally does not insure a tenant's belongings. Pricing varies by limits, deductible, location, and carrier.",
  },
  {
    q: "What does home insurance cover in California?",
    a: "A homeowners policy may include dwelling, other structures, personal property, liability, and additional living expense coverage, subject to limits, deductibles, exclusions, and the cause of loss. Flood and earthquake losses are generally handled through separate coverage.",
  },
  {
    q: "Can I bundle home and auto insurance to save money?",
    a: "Many carriers offer multi-policy discounts for bundling home and auto. We compare the combined price and coverage against separate policies so you can see which approach makes sense.",
  },
  {
    q: "Do I need earthquake insurance in Los Angeles, CA?",
    a: "Standard homeowners policies generally exclude earthquake damage. Ask us to review the earthquake options available for your property; eligibility and placement depend on the home and carrier program.",
  },
];

export default function HomeInsuranceLosAngelesCA() {
  usePageMeta({
    title: "Home & Renters Insurance Los Angeles CA | Rafla Insurance",
    description:
      "Compare home and renters insurance in Los Angeles, CA. Ask about auto bundles, earthquake coverage, landlord insurance, and property coverage. Call (310) 572-7246.",
    canonical: "https://raflainsurance.com/home-insurance-los-angeles-ca",
  });

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main id="main-content">
      <LocalBusinessSchema />
      <FAQSchema questions={HOME_FAQS} />
      <BreadcrumbSchema
        crumbs={[
          { name: "Home", url: "https://raflainsurance.com/" },
          { name: "Home Insurance Los Angeles CA", url: "https://raflainsurance.com/home-insurance-los-angeles-ca" },
        ]}
      />

      <PageHero
        title="Home & Renters Insurance in Los Angeles, CA"
        subtitle="We compare multiple carriers to find the right home or renters policy for your property, budget, and situation — including earthquake coverage and bundle discounts."
        breadcrumb="Home Insurance Los Angeles"
        badgeText="Home · Renters · Landlord"
        backgroundImage={images.products.home}
        imageFilter="contrast(1.06) saturate(1.02) brightness(0.95)"
        imagePosition="center"
      >
        <div className="flex flex-wrap gap-3">
          <button onClick={openQuoteModal} className="btn btn-accent btn-lg">
            Get My Home Insurance Quote
          </button>
          <a href="#renters" className="btn btn-ghost-light btn-lg">
            Renters Insurance
          </a>
        </div>
      </PageHero>

      <StatsBar />

      <InsuranceWorkflow
        tone="offwhite"
        title="Home insurance that fits the property — and the budget"
        lede="Home value, construction type, prior claims, coverage limits, and bundle status all determine which carrier prices your home most competitively."
      />

      {/* Section 1: What home insurance covers */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              What home insurance covers in California
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                A standard California homeowners policy (HO-3) protects your dwelling and your financial liability in one package. Coverage is organized into six components: dwelling (the structure), other structures (detached garage, fence, shed), personal property (your belongings), loss of use (hotel and living expenses if a covered loss displaces you), personal liability (injury or property damage claims against you), and medical payments (minor injuries to guests regardless of fault).
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Depending on the form and endorsements, covered losses may include fire, wind, theft, vandalism, or certain accidental water damage. Standard homeowners policies generally exclude flood and earthquake damage, which require separate coverage. We review the form, limits, deductibles, and exclusions instead of relying on the policy label alone.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                The dwelling coverage limit should reflect the cost to rebuild your home from the ground up — not its market value. Rebuild costs in Southern California have risen significantly in recent years due to labor and materials costs. We help you set the right replacement cost so you're fully covered in a total loss, not underinsured.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                As an independent broker, we compare coverage terms and exclusions across carriers, not just price. A policy that appears cheaper may have a higher deductible, lower personal property limits, or ACV (actual cash value) settlement instead of replacement cost. We explain every difference in plain language before you choose.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 2: Coverage types */}
      <section className="sp bg-slate-50">
        <div className="container max-w-5xl">
          <Reveal className="text-center mb-10">
            <span className="eyebrow">Coverage Options</span>
            <h2 className="mt-3 display-2 text-slate-900">Coverage options for Los Angeles homeowners</h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              Every property is different. We match coverage to your actual structure, belongings, and risk profile.
            </p>
          </Reveal>
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ),
                title: "Dwelling Coverage",
                desc: "Protects the structure of your home — walls, roof, floors, built-in appliances. We set replacement cost limits that reflect real SoCal rebuild costs, not just market value.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                ),
                title: "Personal Property",
                desc: "Covers furniture, electronics, clothing, and valuables against theft, fire, and certain water damage. We compare ACV vs. replacement cost so you know exactly what you'd get after a loss.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Liability Protection",
                desc: "Can respond to covered claims involving bodily injury or property damage for which an insured is legally liable, subject to limits and exclusions. Umbrella coverage may also be available.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Loss of Use",
                desc: "Pays hotel, meals, and living costs while your home is repaired after a covered loss. Los Angeles-area hotel costs can add up fast — we make sure this limit is realistic.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Earthquake Coverage",
                desc: "Not included in standard policies. Available through the California Earthquake Authority (CEA) or private carriers. Given Los Angeles's proximity to active Southern California fault zones, worth a serious look.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                title: "Bundle Discount",
                desc: "Home and auto bundles may qualify for a multi-policy discount. We compare the bundle against separate policies so you can review the actual result.",
              },
            ].map((item) => (
              <StaggerChild key={item.title}>
                <div className="bg-white rounded-2xl p-6 ring-1 ring-slate-200/80 shadow-soft hover:shadow-lifted hover:-translate-y-1 transition-all duration-200 h-full">
                  <div className="w-11 h-11 rounded-xl grid place-items-center mb-4 bg-brand-800 text-gold-400 shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-[14px] text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Section 3: Renters insurance */}
      <section id="renters" className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Renters insurance in Los Angeles
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                If you rent an apartment or house in Los Angeles, the landlord's property policy generally does not insure your belongings. A renters policy can address personal property, liability, and additional living expenses for covered losses, subject to the selected limits, deductible, and exclusions.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Renters insurance is particularly valuable in Los Angeles's denser apartment corridors and mixed-use neighborhoods where a fire or plumbing issue in a neighboring unit can affect your belongings. Many Los Angeles landlords require proof of renters insurance at lease signing. Digital proof is generally available after the carrier confirms that a policy is bound.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Renters policies can also include personal liability coverage. The response to an injury or property-damage claim depends on the facts, selected limits, policy terms, and exclusions, so we review those details before recommending an option.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Some carriers offer multi-policy discounts for renters and auto coverage. We compare the combined premium and coverage with separate options so the discount does not hide a weaker overall fit.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 4: Bundle section */}
      <section className="sp bg-brand-950 text-white">
        <div className="container max-w-4xl">
          <Reveal>
            <span className="eyebrow text-gold-400 mb-4">Bundle Options</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Home + auto bundles in Los Angeles
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-white/85 leading-relaxed mb-4">
                Many carriers offer multi-policy discounts when you bundle home and auto. The amount varies by carrier, property, vehicles, drivers, and coverage selections, so the useful number is the complete quoted price rather than a generic percentage.
              </p>
              <p className="text-base text-white/80 leading-relaxed mb-4">
                As an independent broker, we compare both the bundled price and the separate-carrier price. Some Los Angeles clients find that one carrier is significantly better for auto while another is better for home — and the total savings from going separate beats the bundle discount. We show you both numbers so you can choose with full information.
              </p>
              <p className="text-base text-white/80 leading-relaxed">
                Other combinations may include auto with renters, condo, landlord, motorcycle, or recreational coverage. We look at the full household insurance picture, not just one policy at a time.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={openQuoteModal} className="btn btn-accent btn-lg">
                Compare Bundle Prices
              </button>
              <NavLink to="/auto-insurance-los-angeles-ca" className="btn btn-ghost-light btn-lg">
                See Auto Insurance Options
              </NavLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 5: FAQ */}
      <section className="sp bg-slate-50">
        <div className="container max-w-3xl">
          <Reveal className="text-center mb-10">
            <span className="eyebrow">Common Questions</span>
            <h2 className="mt-3 display-2 text-slate-900">Home insurance questions Los Angeles clients ask</h2>
          </Reveal>
          <div className="space-y-3">
            {HOME_FAQS.map((faq, i) => (
              <Reveal key={i}>
                <div className="bg-white rounded-2xl ring-1 ring-slate-200/80 shadow-soft overflow-hidden">
                  <button
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span className="font-semibold text-slate-900 text-[15px] leading-snug">{faq.q}</span>
                    <svg
                      className={`w-5 h-5 text-gold-500 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5">
                      <p className="text-[14px] text-slate-600 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PageTestimonials tone="offwhite" />

      {/* CTA */}
      <section className="sp bg-brand-950">
        <div className="container max-w-3xl text-center">
          <Reveal>
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Ready to compare Los Angeles home insurance rates?
            </h2>
            <p className="text-white/70 mb-6">
              Free quotes from available carriers. Ask about multi-policy options and digital proof of insurance.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={openQuoteModal} className="btn btn-accent btn-lg">
                Get My Home Insurance Quote
              </button>
              <NavLink to="/services" className="btn btn-ghost-light btn-lg">
                See All Coverage Types
              </NavLink>
            </div>
            <p className="mt-5 text-white/60 text-sm">
              Or call us at{" "}
              <a href={site.contact.phoneHref} className="text-gold-300 hover:text-gold-200 font-semibold">
                {site.contact.phone}
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
