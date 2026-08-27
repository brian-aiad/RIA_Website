import CoverageBriefPage, { type CoverageBriefConfig } from "../components/CoverageBriefPage";

const config: CoverageBriefConfig = {
  index: "03",
  eyebrow: "Commercial auto insurance",
  title: "Coverage built around the work, not just the vehicle.",
  lede: "Practical protection for the vehicles, drivers, and daily operations that keep your business moving.",
  metaTitle: "Commercial Auto Insurance Los Angeles | Rafla Insurance Agency",
  metaDescription: "Commercial auto insurance for Los Angeles contractors, service businesses, fleets and local firms from a Mar Vista independent broker.",
  canonical: "https://raflainsurance.com/commercial-auto-insurance-los-angeles",
  image: "/images/agency/people-business-v4.webp",
  imageAlt: "A Westside small-business crew loading tools into a work van outside their shop",
  signals: [
    { label: "Useful scope", value: "Vehicles + drivers + operations" },
    { label: "Related lines", value: "GL · workers’ comp · bonds" },
    { label: "Business size", value: "Single vehicle to fleet" },
    { label: "Local desk", value: "Mar Vista / 90066" },
  ],
  introTitle: "The same van can represent very different risks in different businesses.",
  intro: [
    "Commercial auto underwriting considers the business, vehicle types, radius, cargo, drivers, ownership, garaging, contracts, and how each vehicle is used. A contractor, florist, wholesaler, and delivery operation do not present the same risks.",
    "The goal is to align vehicle coverage with the real operation and then check the seams with general liability, workers’ compensation, property, umbrella, and bond requirements.",
  ],
  anatomyTitle: "Coverage that follows the way your business works.",
  anatomy: [
    { title: "Covered autos", text: "The symbols and schedule determine which owned, hired, or non-owned autos may be covered.", tag: "Policy structure" },
    { title: "Auto liability", text: "Addresses covered liability arising from business vehicle use, subject to limits, exclusions, and policy terms.", tag: "Core layer" },
    { title: "Physical damage", text: "Comprehensive and collision choices can protect scheduled vehicles, subject to valuations and deductibles.", tag: "Vehicle layer" },
    { title: "Drivers", text: "Motor vehicle records, experience, job duties, license class, and access to vehicles affect the review.", tag: "Underwriting" },
    { title: "Operations & radius", text: "Where vehicles travel, what they carry, towing, equipment, and job-site activity must be described accurately.", tag: "Use" },
    { title: "Contracts & filings", text: "Additional insured, waiver, certificate, DOT, DMV, or other requirements should be reviewed before deadlines.", tag: "Compliance" },
  ],
  checklistTitle: "Assemble the operating picture.",
  checklist: ["Business legal name, entity, years operating, and description", "Vehicle schedule with VINs, values, garaging, and use", "Driver schedule and license information", "Travel radius, states, cargo, towing, and job-site activity", "Current policies and loss runs if requested", "Contracts, certificate samples, or filing requirements"],
  fieldNote: "A certificate of insurance is evidence of coverage; it does not rewrite the policy. Contract requirements should be compared with the actual policy and endorsements.",
  detailTitle: "Commercial auto rarely stands alone.",
  detail: [
    "A complete review may include general liability, workers’ compensation, business property, inland marine, umbrella, and bonds. The right combination depends on employees, contracts, locations, equipment, and professional activity.",
    "California employers with one or more employees generally must satisfy workers’ compensation requirements, subject to applicable definitions and exclusions. Bring payroll and class-code information into the broader business review.",
  ],
  related: [
    { label: "All business coverage", href: "/services#work" },
    { label: "Westside service areas", href: "/locations" },
    { label: "Contact Rafla Insurance", href: "/contact" },
  ],
  faqs: [
    { q: "Can a personal auto policy cover business use?", a: "Do not assume it does. Business use can be restricted or excluded depending on the policy and activity. Describe the actual use so the appropriate form can be reviewed." },
    { q: "What is hired and non-owned auto coverage?", a: "It can address certain liability exposures involving vehicles the business rents or uses but does not own, subject to the policy’s definitions, symbols, exclusions, and endorsements." },
    { q: "Do I need workers’ compensation too?", a: "California employers with one or more employees generally must satisfy workers’ compensation requirements, subject to applicable law and exclusions. The commercial review should consider employees separately from auto coverage." },
    { q: "Can Rafla issue a certificate?", a: "The agency can help with certificates after eligible coverage is in effect. A certificate cannot create coverage or terms that the policy and endorsements do not provide." },
  ],
};

export default function CommercialAutoInsuranceLosAngeles() {
  return <CoverageBriefPage config={config} />;
}
