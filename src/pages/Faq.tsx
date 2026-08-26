import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { site } from "../lib/site";
import { usePageMeta } from "../lib/seo";
import { openQuoteModal } from "../lib/openQuote";
import PageHero from "../components/PageHero";
import FAQSchema from "../components/seo/FAQSchema";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import StatsBar from "../components/StatsBar";
import PageTestimonials from "../components/PageTestimonials";
import { Reveal } from "../components/AnimatedSection";
import { Icons } from "../components/Icons";
import { images } from "../lib/images";

/**
 * Visible answers — rich, 2-5 sentences, may include links and local context.
 * Schema answers — short, factual, no CTAs, no phone numbers.
 */

type FaqItem = {
  q: string;
  /** Displayed on page — can include links via renderA */
  a: string;
  /** Visible FAQ copy only. FAQPage JSON-LD is intentionally disabled. */
  schemaA: string;
};

type FaqGroup = {
  id: string;
  heading: string;
  items: FaqItem[];
};

const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "cost-coverage",
    heading: "Cost & Coverage",
    items: [
      {
        q: "How much does car insurance cost in Los Angeles?",
        a: "Premiums depend on driving history, vehicle, coverage selections, deductibles, garaging location, prior insurance, and carrier underwriting. An accurate comparison uses your actual driver and vehicle information rather than a generic Los Angeles average. See our full guide on the Los Angeles auto insurance page.",
        schemaA: "Car insurance premiums in Los Angeles vary by driver history, vehicle, coverage selections, deductibles, location, prior insurance, and carrier underwriting.",
      },
      {
        q: "What is the difference between liability and full coverage?",
        a: "Liability coverage can address eligible injury and damage you cause to others. “Full coverage” is shorthand often used for liability plus collision and comprehensive, but it is not a single standardized policy form. Lenders commonly require physical-damage coverage on financed or leased vehicles.",
        schemaA: "Liability insurance covers damage and injuries you cause to others. Full coverage adds collision and comprehensive, which cover damage to your own vehicle from crashes, theft, weather, and other events.",
      },
      {
        q: "What affects my car insurance rate?",
        a: "The main factors are your driving history (at-fault accidents, tickets, DUIs), your vehicle's make, model, and year, the coverage level you select, your zip code, your age, and whether you've had prior coverage lapses. Bundling home and auto or maintaining continuous coverage can reduce your rate.",
        schemaA: "Car insurance rates are primarily affected by driving history, vehicle type and value, coverage level, zip code, age, and prior coverage history.",
      },
      {
        q: "What is California's minimum liability requirement?",
        a: "California requires 30/60/15 minimum liability — $30,000 for bodily injury per person, $60,000 per accident, and $15,000 for property damage. These limits are relatively low compared to real accident costs, so many drivers in Los Angeles choose higher limits or additional coverage for better protection.",
        schemaA: "California requires minimum liability coverage of 30/60/15: $30,000 bodily injury per person, $60,000 per accident, and $15,000 for property damage.",
      },
    ],
  },
  {
    id: "no-license",
    heading: "No-License & International-License",
    items: [
      {
        q: "Can I insure a vehicle if I do not have a traditional California license?",
        a: "Yes, in certain lawful situations. If you are a vehicle owner who does not drive, a licensed household member can be listed as the primary driver while you remain the named insured. We also work with carriers that accept foreign licenses, international licenses, and ITIN-based applicants. We never facilitate coverage for unlicensed operation of a vehicle. See our full guide for specific scenarios.",
        schemaA: "Vehicle owners without a traditional California license may have coverage options depending on their situation, including foreign license holders and those with a licensed primary driver listed on the policy. All drivers operating the vehicle must hold a valid license.",
      },
      {
        q: "Do you work with foreign or international license holders?",
        a: "Yes. Many California carriers accept valid driver's licenses issued by other countries. If your license is not in the Latin alphabet, bringing an English translation or an International Driving Permit alongside it helps. We identify which of our multiple carriers accept your specific country's license. See our no-license and foreign-license page for details.",
        schemaA: "Many California carriers accept valid driver's licenses issued by other countries. An International Driving Permit or English translation of a foreign license can help expand available carrier options.",
      },
      {
        q: "What documents help you find coverage?",
        a: "Bring whatever you have — we'll work with it. Most helpful: a foreign driver's license, passport, ITIN letter, vehicle registration, and any existing declarations page. If a licensed household member is the primary driver, their license is also needed. The more documentation you have, the more carriers we can approach on your behalf.",
        schemaA: "Helpful documents include a foreign driver's license, passport, ITIN letter, vehicle registration, and any current declarations page. A licensed household member's license is also needed if they are the primary driver.",
      },
      {
        q: "Can a vehicle owner who doesn't drive still be insured?",
        a: "Yes. A vehicle owner can be listed as the named insured on a policy with a licensed family member or household member listed as the primary driver. The named insured owns and registers the vehicle; the listed driver is covered to operate it. This is a common and legal insurance arrangement.",
        schemaA: "A vehicle owner who does not drive can be listed as the named insured with a licensed household member listed as the primary driver on the policy.",
      },
    ],
  },
  {
    id: "sr22",
    heading: "SR-22 & DMV Reinstatement",
    items: [
      {
        q: "What is SR-22 insurance in California?",
        a: "An SR-22 is a filing — not a separate insurance policy. It is a certificate your insurer sends to the California DMV confirming the required liability coverage is in place. You still need an underlying auto insurance policy, and any filing charge depends on the carrier. See our SR-22 page for a full walkthrough.",
        schemaA: "An SR-22 is a filing your insurer sends to the California DMV to confirm you carry the required liability coverage. It is not a separate insurance policy.",
      },
      {
        q: "Who usually needs SR-22?",
        a: "Common triggers in California include: a lapse in auto insurance while your vehicle is registered, a DUI conviction, a license suspension or revocation, an at-fault accident while uninsured, a hit-and-run determination, or a court order. The California DMV will notify you if SR-22 is required.",
        schemaA: "SR-22 is commonly required after a coverage lapse, DUI conviction, license suspension, at-fault accident while uninsured, or by court order.",
      },
      {
        q: "How long do I need SR-22?",
        a: "Many California reinstatement situations require proof to remain on file for three years, but the DMV or court notice for your case controls. A lapse or cancellation can affect your driving privilege. Confirm the exact end date with the California DMV before changing the filing.",
        schemaA: "Many California reinstatement situations require proof to remain on file for three years, but the exact duration depends on the DMV or court notice for the individual case.",
      },
      {
        q: "How does electronic SR-22 filing work?",
        a: "After a qualifying policy is bound, the insurer can submit the SR-22 certificate electronically to the California DMV. We explain the required information, coordinate the filing, and provide available confirmation. Carrier and DMV processing times can vary.",
        schemaA: "After a qualifying policy is bound, the insurer can submit the SR-22 certificate electronically to the California DMV. Timing varies by carrier and DMV processing.",
      },
      {
        q: "How much does SR-22 cost?",
        a: "The total cost depends on the underlying auto policy, driving record, carrier, and any filing charge. We compare available qualifying programs and review the complete premium and fees before binding.",
        schemaA: "SR-22 cost depends on the underlying auto policy, driving record, carrier, and any filing charge.",
      },
    ],
  },
  {
    id: "claims",
    heading: "Claims, Proof & After-Purchase Support",
    items: [
      {
        q: "How fast can I get proof of insurance?",
        a: "Once a carrier confirms that a policy is bound, proof of coverage is generally available electronically. For SR-22 situations, filing timing depends on the carrier and the DMV. We will tell you what confirmation is available before you leave or end the call.",
        schemaA: "Proof of insurance is generally available after a carrier confirms that a policy is bound. SR-22 timing depends on carrier and DMV processing.",
      },
      {
        q: "What do I do after an accident?",
        a: "First, make sure everyone is safe and call 911 if there are injuries. Then document the scene — photos, the other driver's license and insurance information, and the police report number if applicable. Notify your carrier's 24-hour claims line as soon as possible. Then call us — we can help you understand the process, communicate with adjusters, and follow up on the status of your claim.",
        schemaA: "After an accident, document the scene, exchange insurance information, and notify your carrier's claims line. Your insurance broker can help navigate the claims process.",
      },
      {
        q: "How does your office help with claims?",
        a: "We help you locate carrier contact information, understand requested documentation, and follow up on general claim-service questions. Coverage and claim decisions are made by the carrier under the policy terms.",
        schemaA: "An independent broker can assist with claims documentation, communication with adjusters, and follow-up on claim status as part of their ongoing client service.",
      },
      {
        q: "Can I get help in Spanish or Arabic?",
        a: "Yes. Service is available in English, Spanish, and Arabic, including help discussing application requirements, coverage options, and policy documents.",
        schemaA: "The office provides service in English, Spanish, and Arabic, including policy explanations and document reviews in each language.",
      },
    ],
  },
];

const SCHEMA_FAQS = FAQ_GROUPS.flatMap((g) =>
  g.items.map((item) => ({ q: item.q, a: item.schemaA }))
);

export default function Faq() {
  usePageMeta({
    title: "Insurance FAQ: SR-22, No License, ITIN | Rafla Insurance",
    description:
      "Straight answers about car insurance in Los Angeles: SR-22 cost & duration, ITIN and no-license coverage, proof of insurance, claims help, and CA minimums explained.",
    canonical: "https://raflainsurance.com/faq",
  });

  const navigate = useNavigate();
  const { search } = useLocation();
  useEffect(() => {
    if (search) navigate("/faq", { replace: true });
  }, [search, navigate]);

  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <main id="main-content">
      <FAQSchema questions={SCHEMA_FAQS} />
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://raflainsurance.com/" },
        { name: "FAQ", url: "https://raflainsurance.com/faq" },
      ]} />

      <PageHero
        title="Los Angeles Auto Insurance FAQ"
        subtitle="Straight answers for Los Angeles drivers about car insurance cost, SR-22, no-license options, proof of insurance, and claims help."
        breadcrumb="FAQ"
        backgroundImage={images.claims.docs}
        imageFilter="contrast(1.08) saturate(1.02) brightness(0.96)"
      >
        <div className="flex flex-wrap gap-3">
          <a href={site.contact.phoneHref} className="btn btn-accent">
            <Icons.Phone className="w-4 h-4" />
            Call {site.contact.phone}
          </a>
          <button onClick={openQuoteModal} className="btn btn-ghost-light">
            Get a Free Quote
          </button>
        </div>
      </PageHero>

      <StatsBar />

      <section className="sp bg-white">
        <div className="container max-w-4xl">
          {FAQ_GROUPS.map((group, gi) => (
            <Reveal key={group.id} delay={gi * 0.05}>
              <div id={group.id} className="mb-12 last:mb-0">
                <h2
                  className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {group.heading}
                </h2>
                <div className="space-y-3">
                  {group.items.map((item, i) => {
                    const key = `${gi}-${i}`;
                    const isOpen = openKey === key;
                    return (
                      <div
                        key={key}
                        className="bg-white rounded-2xl ring-1 ring-slate-200/80 shadow-soft overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenKey(isOpen ? null : key)}
                          className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left hover:bg-slate-50/60 transition-colors"
                          aria-expanded={isOpen}
                        >
                          <span className="font-semibold text-slate-900">{item.q}</span>
                          <svg
                            className={`w-5 h-5 text-brand-600 shrink-0 mt-0.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {/* Visible answer — always in DOM for SEO */}
                        <div
                          className="grid transition-all duration-300"
                          style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                        >
                          <div className="overflow-hidden">
                            <div className="px-5 pb-5 text-sm leading-relaxed text-slate-600 border-t border-slate-100 pt-4">
                              {item.a}
                              {/* Contextual links */}
                              {group.id === "cost-coverage" && i === 0 && (
                                <p className="mt-3">
                                  <Link to="/auto-insurance-los-angeles-ca" className="text-brand-700 font-medium hover:underline">
                                    See full cost breakdown for Los Angeles auto insurance →
                                  </Link>
                                </p>
                              )}
                              {group.id === "sr22" && i === 0 && (
                                <p className="mt-3">
                                  <Link to="/sr22-insurance-los-angeles" className="text-brand-700 font-medium hover:underline">
                                    Full SR-22 guide →
                                  </Link>
                                </p>
                              )}
                              {group.id === "no-license" && i === 0 && (
                                <p className="mt-3">
                                  <Link to="/no-license-auto-insurance-los-angeles" className="text-brand-700 font-medium hover:underline">
                                    No-license & foreign-license guide →
                                  </Link>
                                </p>
                              )}
                              {group.id === "claims" && i === 2 && (
                                <p className="mt-3">
                                  <Link to="/contact" className="text-brand-700 font-medium hover:underline">
                                    Contact our Los Angeles office →
                                  </Link>
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}

          {/* About link */}
          <Reveal>
            <p className="mt-10 text-sm text-slate-500 text-center">
              Looking for background on our brokerage?{" "}
              <Link to="/about" className="text-brand-700 font-medium hover:underline">
                Learn about Rafla Insurance
              </Link>{" "}
              — independent broker in Los Angeles since 2003, serving Westside LA in English, Spanish, and Arabic.
            </p>
          </Reveal>

          {/* CTA */}
          <Reveal>
            <div className="mt-8 rounded-2xl bg-gradient-to-br from-brand-950 to-brand-800 p-8 text-center text-white shadow-heavy">
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                Still have questions?
              </h3>
              <p className="text-white/80 mb-5 max-w-lg mx-auto">
                Our multilingual team can discuss coverage questions in English, Spanish, or Arabic.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={site.contact.phoneHref} className="btn btn-accent">
                  Call {site.contact.phone}
                </a>
                <Link to="/contact" className="btn btn-ghost-light">
                  Send a Message
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <PageTestimonials />
    </main>
  );
}
