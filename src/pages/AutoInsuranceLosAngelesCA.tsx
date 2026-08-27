import CoverageBriefPage, { type CoverageBriefConfig } from "../components/CoverageBriefPage";

const config: CoverageBriefConfig = {
  index: "01",
  eyebrow: "Auto insurance",
  title: "Auto insurance for the way you really drive.",
  lede: "Liability, physical damage, optional protections, and specialty situations—reviewed from a local broker’s desk in Mar Vista.",
  metaTitle: "Auto Insurance Los Angeles CA | Rafla Insurance Agency",
  metaDescription: "Compare Los Angeles auto insurance for liability, comprehensive, collision, uninsured motorist and specialty situations with a Mar Vista independent broker.",
  canonical: "https://raflainsurance.com/auto-insurance-los-angeles-ca",
  image: "/images/agency/people-auto-review-v5.webp",
  imageAlt: "A Los Angeles driver reviewing auto insurance documents with a broker beside an everyday car",
  signals: [
    { label: "California minimum", value: "30 / 60 / 15" },
    { label: "Review style", value: "Limits + deductibles + use" },
    { label: "Local desk", value: "Mar Vista / 90066" },
    { label: "Languages", value: "English · Spanish · Arabic" },
  ],
  introTitle: "The least expensive policy and the most useful policy are not always the same.",
  intro: [
    "California requires financial responsibility, and most drivers meet that responsibility with auto liability insurance. As of January 1, 2025, the minimum standard-policy liability limits are $30,000 for injury or death to one person, $60,000 per accident for injury or death to multiple people, and $15,000 for property damage.",
    "Those limits are a legal floor, not a recommendation for every household. Vehicle value, driving pattern, household assets, financing requirements, deductibles, and optional protections all change the discussion.",
  ],
  anatomyTitle: "Read the policy in layers.",
  anatomy: [
    { title: "Liability", text: "Helps address bodily injury or property damage you cause, subject to the policy’s terms and limits.", tag: "Required floor" },
    { title: "Collision", text: "May help repair or replace your covered vehicle after a collision, less the chosen deductible.", tag: "Optional / lender may require" },
    { title: "Comprehensive", text: "May address covered non-collision losses such as theft, vandalism, or certain weather damage.", tag: "Optional / lender may require" },
    { title: "Uninsured / underinsured motorist", text: "Can provide protection when an at-fault driver has no insurance or insufficient limits, depending on the coverage selected.", tag: "Review carefully" },
    { title: "Medical, rental & roadside", text: "Optional coverages can fill practical gaps after a covered loss. Limits and triggers vary by carrier.", tag: "Optional" },
  ],
  checklistTitle: "Details that make a quote more precise.",
  checklist: ["Driver names, dates of birth, and license information", "Vehicle VINs, mileage, use, and garaging address", "Current declarations page if available", "Desired limits and deductible range", "Loan or lease information", "Tickets, accidents, or filing requirements"],
  fieldNote: "Tell us how the vehicle is actually used. Commuting, rideshare, deliveries, business use, and household drivers can materially change eligibility and coverage needs.",
  detailTitle: "Price matters. The coverage behind it matters more.",
  detail: [
    "A useful comparison looks at the carrier, coverage limits, deductibles, exclusions, endorsements, claims access, and the total cost—not only the first premium number on the page.",
    "We can also review SR-22 needs and nonstandard license situations separately. Those circumstances require accurate facts and carrier-specific underwriting; no single outcome can be promised before review.",
  ],
  related: [
    { label: "SR-22 filing support", href: "/sr22-insurance-los-angeles" },
    { label: "Specialty license situations", href: "/no-license-auto-insurance-los-angeles" },
    { label: "Commercial vehicles", href: "/commercial-auto-insurance-los-angeles" },
  ],
  faqs: [
    { q: "What are California’s current minimum liability limits?", a: "For standard auto policies, the minimum limits are $30,000 per person for bodily injury, $60,000 per accident for bodily injury, and $15,000 for property damage. These took effect January 1, 2025." },
    { q: "Does “full coverage” have one legal definition?", a: "No. People often use the phrase for liability plus comprehensive and collision, but the actual limits, deductibles, endorsements, and exclusions matter. Review the declarations page and policy language." },
    { q: "Can Rafla compare more than one carrier?", a: "As an independent agency, Rafla can review available programs from multiple carriers, subject to carrier appointments, eligibility, and underwriting." },
    { q: "Can I start with my current policy?", a: "Yes. A declarations page is often the fastest way to understand current limits, deductibles, vehicles, drivers, and possible gaps." },
  ],
};

export default function AutoInsuranceLosAngelesCA() {
  return <CoverageBriefPage config={config} />;
}
