import CoverageBriefPage, { type CoverageBriefConfig } from "../components/CoverageBriefPage";

const config: CoverageBriefConfig = {
  index: "04A",
  eyebrow: "SR-22 filing support",
  title: "SR-22 help, explained without the fog.",
  lede: "Help arranging an eligible auto policy and submitting California proof of financial responsibility when the DMV requires it.",
  metaTitle: "SR-22 Insurance Los Angeles | Rafla Insurance Agency",
  metaDescription: "Get help with California SR-22 filing and eligible auto insurance from an independent broker in Mar Vista, Los Angeles.",
  canonical: "https://raflainsurance.com/sr22-insurance-los-angeles",
  image: "/images/agency/people-broker-review-v4.webp",
  imageAlt: "An insurance broker and a Los Angeles couple reviewing a policy folder together",
  signals: [
    { label: "What it is", value: "Proof certificate" },
    { label: "Filed by", value: "Eligible insurer" },
    { label: "Requirement source", value: "DMV or court notice" },
    { label: "Local help", value: "Mar Vista / 90066" },
  ],
  introTitle: "An SR-22 is evidence of financial responsibility—not a separate coverage by itself.",
  intro: [
    "California DMV identifies the SR-22 as a California Proof of Insurance Certificate. An authorized insurer files it in connection with an eligible policy when proof is required.",
    "The reason for the filing, required policy structure, and period the proof must remain on file depend on the driver’s specific DMV or court action. The notice or DMV record is the right starting point.",
  ],
  anatomyTitle: "Follow the requirement in order.",
  anatomy: [
    { title: "Confirm the action", text: "Read the DMV or court notice and identify the exact proof, restriction, effective date, and any reissue requirements.", tag: "Start here" },
    { title: "Gather the driver details", text: "Accurate driver, vehicle, household, ownership, and incident information lets the broker check eligible programs.", tag: "Underwriting" },
    { title: "Select an eligible policy", text: "The underlying auto policy must satisfy the applicable carrier and filing requirements.", tag: "Coverage contract" },
    { title: "Submit the certificate", text: "The insurer transmits proof in the accepted form after the policy and filing arrangement are confirmed.", tag: "Carrier action" },
    { title: "Keep proof continuous", text: "Cancellation or lapse can trigger a notice to the state. Follow the specific duration on your official requirement.", tag: "Ongoing" },
  ],
  checklistTitle: "Bring the notice, not a guess.",
  checklist: ["DMV or court notice showing the required action", "Driver license or identifying information", "Vehicle and ownership details", "Household driver information", "Prior insurance details if available", "Incident or conviction dates requested by the application"],
  fieldNote: "Do not cancel an existing policy or assume a filing period until the replacement and filing status are confirmed. A lapse can create additional consequences.",
  detailTitle: "The driver’s record determines what comes next.",
  detail: [
    "Some drivers need an owner policy; others may need a different arrangement based on ownership and driving circumstances. Carrier eligibility varies, so the facts should be reviewed before promising a structure or price.",
    "Rafla can help organize the application and filing conversation, but DMV and court requirements control. Contact the relevant authority for legal-status questions.",
  ],
  related: [
    { label: "Auto insurance", href: "/auto-insurance-los-angeles-ca" },
    { label: "Specialty license situations", href: "/no-license-auto-insurance-los-angeles" },
    { label: "California DMV", href: "/faq" },
  ],
  faqs: [
    { q: "Is an SR-22 a separate insurance policy?", a: "No. It is a proof-of-insurance certificate filed by an eligible insurer in connection with an underlying policy." },
    { q: "How long do I need the filing?", a: "The required period depends on the DMV or court action. Use the official notice or confirm directly with the responsible authority; do not rely on a generic timeline." },
    { q: "What happens if the policy lapses?", a: "The insurer may notify the state when required proof is no longer in effect, which can affect driving privileges. Keep the required coverage continuous and verify any replacement before canceling." },
    { q: "Can Rafla file it immediately?", a: "Timing depends on complete information, carrier eligibility, payment, binding, and the carrier’s filing process. The agency can explain the next step after reviewing your situation." },
  ],
};

export default function SR22InsuranceLosAngeles() {
  return <CoverageBriefPage config={config} />;
}
