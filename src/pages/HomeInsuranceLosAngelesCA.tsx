import CoverageBriefPage, { type CoverageBriefConfig } from "../components/CoverageBriefPage";

const config: CoverageBriefConfig = {
  index: "02",
  eyebrow: "Home & renters insurance",
  title: "Protect the place. Understand the boundaries.",
  lede: "Homeowners, renters, condo, and landlord coverage reviewed through the details that actually shape the policy.",
  metaTitle: "Home & Renters Insurance Los Angeles CA | Rafla Insurance",
  metaDescription: "Review homeowners, renters, condo and landlord insurance with a Mar Vista independent broker serving Los Angeles and the Westside.",
  canonical: "https://raflainsurance.com/home-insurance-los-angeles-ca",
  image: "/images/agency/people-household-v4.webp",
  imageAlt: "A Westside Los Angeles family loading groceries and a child’s bicycle beside their car and home",
  signals: [
    { label: "Policy focus", value: "Property + liability" },
    { label: "Useful review", value: "Limits + exclusions" },
    { label: "Property types", value: "Home · condo · rental" },
    { label: "Local desk", value: "Mar Vista / 90066" },
  ],
  introTitle: "A home policy is a set of boundaries, not one blanket promise.",
  intro: [
    "Homeowners policies commonly separate protection for the dwelling, other structures, personal property, loss of use, personal liability, and medical payments to others. Renters and condo policies arrange those pieces differently.",
    "California does not generally require homeowners insurance, but a mortgage servicer usually requires coverage. Rebuild cost, property features, occupancy, loss history, deductibles, and carrier eligibility all shape the available options.",
  ],
  anatomyTitle: "Six parts worth locating.",
  anatomy: [
    { title: "Dwelling", text: "Coverage for the house and attached structures after a covered loss, subject to the limit and policy terms.", tag: "Coverage A" },
    { title: "Other structures", text: "Detached structures such as certain garages or fences may have a separate limit.", tag: "Coverage B" },
    { title: "Personal property", text: "Belongings may be covered subject to valuation terms, sublimits, deductibles, and exclusions.", tag: "Coverage C" },
    { title: "Loss of use", text: "May help with additional living expenses when a covered loss makes the residence uninhabitable.", tag: "Coverage D" },
    { title: "Personal liability", text: "May respond to covered claims alleging bodily injury or property damage for which an insured is legally responsible.", tag: "Coverage E" },
    { title: "Medical payments", text: "Limited no-fault medical payments coverage for certain injuries to others, subject to the contract.", tag: "Coverage F" },
  ],
  checklistTitle: "Bring the details that shape your home coverage.",
  checklist: ["Property address and occupancy", "Year built, square footage, roof, plumbing, electrical, and heating details", "Recent renovations or additions", "Existing policy and renewal offer if available", "Mortgage or additional-interest information", "Valuable belongings or business activity at home"],
  fieldNote: "Flood and earthquake are generally not covered by a standard homeowners policy. Ask about separate options and review the exclusions that apply to the actual contract.",
  detailTitle: "Rebuild cost and market value answer different questions.",
  detail: [
    "Dwelling limits should reflect the estimated cost to repair or rebuild—not simply the sale price or land value. Construction costs and code-upgrade needs can change, so limits deserve a periodic review.",
    "Renters should also inventory belongings and consider liability and loss-of-use needs. Landlords and condo owners have different ownership boundaries, association documents, and occupancy questions.",
  ],
  related: [
    { label: "All coverage services", href: "/services" },
    { label: "Local service areas", href: "/locations" },
    { label: "Talk with Rafla", href: "/contact" },
  ],
  faqs: [
    { q: "Does a standard homeowners policy cover earthquake or flood?", a: "Usually not. Those risks generally require separate coverage or policy arrangements. Always read the exclusions in the actual policy." },
    { q: "Is homeowners insurance required by California law?", a: "California generally does not require it, but a mortgage servicer typically requires sufficient insurance as a loan condition." },
    { q: "What does renters insurance protect?", a: "A renters policy may address personal property, loss of use, personal liability, and other selected coverages, subject to its terms, limits, and exclusions. It does not insure the landlord’s building as your property." },
    { q: "Should I update the policy after remodeling?", a: "Yes. Renovations and additions can change rebuild cost, property features, and coverage needs. Share material changes with the agency or carrier." },
  ],
};

export default function HomeInsuranceLosAngelesCA() {
  return <CoverageBriefPage config={config} />;
}
