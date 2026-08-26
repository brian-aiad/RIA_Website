import { Phone } from "lucide-react";
import { AtlasButton, AtlasEyebrow, DossierHeader, QuoteBand } from "../components/AtlasUI";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import { openQuoteModal } from "../lib/openQuote";
import { usePageMeta } from "../lib/seo";
import { site } from "../lib/site";

const sections = [
  { title: "Getting a quote", code: "A", questions: [
    ["What information helps with a quote?", "It depends on the coverage. A current declarations page is useful. Driver and vehicle details, property information, or business operations, payroll, vehicles, and loss history may also be requested."],
    ["Can Rafla compare multiple carriers?", "As an independent agency, Rafla can review available programs from multiple carriers, subject to carrier appointments, market availability, eligibility, and underwriting."],
    ["Is an online estimate guaranteed?", "No. A quote can change after verification or underwriting. Coverage is not effective until the carrier or agency confirms binding in writing and all required conditions are met."],
    ["Which languages are available?", "The agency can assist in English, Spanish, and Arabic."],
  ]},
  { title: "Auto & filings", code: "B", questions: [
    ["What are California’s minimum auto liability limits?", "Standard auto policies must provide at least $30,000 per person for bodily injury, $60,000 per accident for bodily injury, and $15,000 for property damage. Those limits took effect January 1, 2025."],
    ["Is an SR-22 a policy?", "No. It is a proof-of-insurance certificate filed by an eligible insurer in connection with an underlying policy when required."],
    ["Does insurance make it legal to drive without a license?", "No. Insurance and legal driving privilege are separate. Drivers must comply with licensing law and any DMV or court restriction."],
    ["Can business use go on a personal policy?", "Do not assume it can. Delivery, rideshare, job-site, hauling, or other business use may require different coverage. Describe the actual use to the broker."],
  ]},
  { title: "Home & business", code: "C", questions: [
    ["Does homeowners insurance cover earthquake or flood?", "Those causes of loss are generally excluded from a standard homeowners policy and usually require separate coverage or arrangements. Read the actual exclusions."],
    ["Does California require workers’ compensation?", "California employers with one or more employees generally must satisfy workers’ compensation requirements, subject to applicable definitions and exclusions."],
    ["What does a certificate of insurance do?", "It provides evidence of coverage at a point in time. It does not create coverage or rewrite the policy, limits, exclusions, or endorsements."],
    ["Do you offer health, life, or notary services?", "Not currently. Rafla plans to update the service directory if future licensing changes."],
  ]},
  { title: "After the policy starts", code: "D", questions: [
    ["How do I report a claim?", "Use the carrier’s claim-reporting channel shown on the policy or ID materials, then notify the agency if you need help navigating documents or next steps."],
    ["When should I request a policy review?", "Useful moments include renewal, a move, a new driver or vehicle, renovations, a property purchase, hiring employees, changing operations, or signing a contract."],
    ["Can I cancel before replacement coverage is confirmed?", "That can create a gap. Confirm the effective date, binding status, and any filing requirements before canceling existing coverage."],
  ]},
];

export default function Faq() {
  usePageMeta({ title: "Insurance FAQ | Rafla Insurance Agency Los Angeles", description: "Answers about auto, home, business, workers’ compensation, SR-22 filing, claims, quotes and Rafla Insurance services in Los Angeles.", canonical: "https://raflainsurance.com/faq" });
  return (
    <main id="main-content" className="atlas-page faq-file">
      <BreadcrumbSchema crumbs={[{ name: "Home", url: "https://raflainsurance.com/" }, { name: "FAQ", url: "https://raflainsurance.com/faq" }]} />
      <DossierHeader index="Q+A" eyebrow="Insurance questions, clearly answered" title="Helpful answers without the jargon." lede="A practical reference for questions that come up before a quote, during underwriting, and after coverage begins." image="/images/agency/policy-desk-v2.webp" imageAlt="Insurance documents, vehicle keys, and notes arranged for review">
        <AtlasButton tone="navy" onClick={openQuoteModal}>Ask us a question</AtlasButton><a className="coverage-brief__call" href={site.contact.phoneHref}><Phone size={15}/>{site.contact.phone}</a>
      </DossierHeader>
      <section className="answer-library"><div className="atlas-container answer-library__grid">
        <aside className="answer-library__index motion-reveal"><AtlasEyebrow>Browse by topic</AtlasEyebrow>{sections.map((section) => <a key={section.code} href={`#faq-${section.code}`}>{section.title}</a>)}</aside>
        <div>{sections.map((section) => <section key={section.code} id={`faq-${section.code}`} className="answer-group"><div className="answer-group__title motion-reveal"><span>{section.code}</span><h2>{section.title}</h2></div>{section.questions.map(([q,a],index) => <details key={q} className="answer-drawer motion-reveal" open={section.code === "A" && index === 0}><summary><span>{section.code}{index+1}</span>{q}<i /></summary><p>{a}</p></details>)}</section>)}</div>
      </div></section>
      <QuoteBand title="Your situation may need a more specific answer." text="Website explanations are general. Bring the actual policy, notice, contract, vehicle, property, or business details into the conversation." />
    </main>
  );
}
