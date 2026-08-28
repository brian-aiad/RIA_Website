import CoverageBriefPage, { type CoverageBriefConfig } from "../components/CoverageBriefPage";

const config: CoverageBriefConfig = {
  index: "04B",
  eyebrow: "Specialty license situations",
  title: "Careful help for nonstandard driver situations.",
  lede: "Foreign-license, newly licensed, and other nontraditional situations deserve accurate facts—not a blanket online promise.",
  metaTitle: "Specialty Auto Insurance Situations Los Angeles | Rafla Insurance",
  metaDescription: "Discuss foreign-license, newly licensed and other nonstandard auto-insurance situations with a multilingual independent broker in Los Angeles.",
  canonical: "https://raflainsurance.com/no-license-auto-insurance-los-angeles",
  image: "/images/illustrated/broker-desk-v6.webp",
  imageAlt: "An insurance broker and a Los Angeles couple reviewing a policy folder together",
  signals: [
    { label: "Review type", value: "Carrier-specific" },
    { label: "Languages", value: "English · Spanish · Arabic" },
    { label: "No blanket promise", value: "Facts determine eligibility" },
    { label: "Local desk", value: "Mar Vista / 90066" },
  ],
  introTitle: "“No license” can describe several very different situations.",
  intro: [
    "A person may hold a valid foreign license, be newly arrived, be in the process of obtaining a California license, own a vehicle without driving it, or face a suspension or other action. Those circumstances may be treated differently in underwriting.",
    "The agency begins by documenting who owns the vehicle, who will drive, what license or identification each person holds, how the vehicle is used, and whether a DMV or court requirement applies.",
  ],
  anatomyTitle: "Separate the facts before asking for a price.",
  anatomy: [
    { title: "Identity and license status", text: "Provide truthful, current identification and license details for every relevant person.", tag: "Required facts" },
    { title: "Ownership", text: "The titled or registered owner, named insured, and actual drivers must be understood correctly.", tag: "Structure" },
    { title: "Vehicle use", text: "Personal, commuting, business, delivery, rideshare, and garaging facts can affect eligibility.", tag: "Underwriting" },
    { title: "Household drivers", text: "Carriers may ask about licensed or driving-age household members and regular vehicle access.", tag: "Disclosure" },
    { title: "DMV or court action", text: "A suspension, SR-22 requirement, or restriction adds a separate official compliance path.", tag: "If applicable" },
  ],
  checklistTitle: "Useful facts for an eligibility review.",
  checklist: ["Government identification and any current license", "Foreign-license details if applicable", "Vehicle title, registration, and VIN", "Every actual or expected driver", "Garaging address and vehicle use", "DMV, court, or prior-insurance documents"],
  fieldNote: "Insurance does not authorize someone to drive without a valid license or outside a restriction. Driving privileges and insurance eligibility are separate questions.",
  detailTitle: "Accuracy protects the application.",
  detail: [
    "A quote based on incomplete or incorrect ownership, driver, garaging, or license information may change or become unavailable after verification. Bring the complicated facts up front.",
    "Rafla can review available carrier programs and communicate in English, Spanish, or Arabic. Eligibility, price, payment terms, and filing ability remain subject to the carrier and the specific situation.",
  ],
  related: [
    { label: "Auto insurance", href: "/auto-insurance-los-angeles-ca" },
    { label: "SR-22 filing support", href: "/sr22-insurance-los-angeles" },
    { label: "Contact the agency", href: "/contact" },
  ],
  faqs: [
    { q: "Does an insurance policy give me permission to drive?", a: "No. Driving privilege is controlled by licensing law and any DMV or court restrictions. Insurance coverage and legal authorization to drive are separate issues." },
    { q: "Can someone with a foreign license be reviewed?", a: "Potentially, depending on the facts and available carrier rules. Bring the valid license and identification so the agency can review the actual situation." },
    { q: "Can a vehicle owner insure a car they do not drive?", a: "Some structures may be available, but ownership, insurable interest, household access, actual drivers, and carrier rules must all be reviewed accurately." },
    { q: "Is coverage guaranteed?", a: "No. Eligibility and terms are carrier-specific and depend on complete underwriting information." },
  ],
};

export default function NoLicenseInsuranceLosAngeles() {
  return <CoverageBriefPage config={config} />;
}
