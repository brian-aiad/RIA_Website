import { useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { AtlasEyebrow, DossierHeader, QuoteBand, SectionFolio } from "../components/AtlasUI";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import { usePageMeta } from "../lib/seo";
import { site } from "../lib/site";
import InteriorSignature from "../components/InteriorSignature";
import { images } from "../lib/images";

const sections = [
  { title: "Getting a quote", code: "A", questions: [
    ["What information helps with a quote?", "It depends on the coverage. A current declarations page is useful. Driver and vehicle details, property information, or business operations, payroll, vehicles, and loss history may also be requested."],
    ["Can Rafla compare multiple carriers?", "As an independent agency, Rafla can review available programs from multiple carriers, subject to carrier appointments, market availability, eligibility, and underwriting."],
    ["Is a quoted price guaranteed?", "No. A quote can change after verification or underwriting. Coverage is not effective until the carrier or agency confirms binding in writing and all required conditions are met."],
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
    ["What helps with a certificate or bond request?", "Have the contract, sample certificate or bond form, exact holder or obligee details, and deadline ready. The agency and carrier must review what the policy or bond can support; a certificate cannot change coverage."],
    ["Do you offer health, life, or notary services?", "No. Rafla does not currently offer health insurance, life insurance, or notary services."],
  ]},
  { title: "After the policy starts", code: "D", questions: [
    ["How do I report a claim?", "Use the carrier’s claim-reporting channel shown on the policy or ID materials, then notify the agency if you need help locating documents or organizing questions. Coverage and claim decisions remain subject to the policy terms and carrier review."],
    ["When should I request a policy review?", "Useful moments include renewal, a move, a new driver or vehicle, renovations, a property purchase, hiring employees, changing operations, or signing a contract."],
    ["When is a requested policy change effective?", "Do not assume a requested change has taken effect. Wait for the proper agency or carrier confirmation, and ask which delivery method to use before sending sensitive records."],
    ["Can I cancel before replacement coverage is confirmed?", "That can create a gap. Confirm the effective date, binding status, and any filing requirements before canceling existing coverage."],
  ]},
];

export default function Faq() {
  const [query, setQuery] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);
  const terms = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  const filteredSections = sections.map(section => ({ ...section, questions: section.questions.filter(([question, answer]) => terms.every(term => `${section.title} ${question} ${answer}`.toLocaleLowerCase().includes(term))) })).filter(section => section.questions.length);
  const resultCount = filteredSections.reduce((count, section) => count + section.questions.length, 0);
  const clearSearch = () => { setQuery(""); searchInput.current?.focus(); };
  usePageMeta({ title: "Insurance FAQ | Rafla Insurance Agency Los Angeles", description: "Answers about auto, home, business, workers’ compensation, SR-22 filing, claims, quotes and Rafla Insurance services in Los Angeles.", canonical: "https://www.raflainsurance.com/faq" });
  return (
    <main id="main-content" className="atlas-page faq-file">
      <BreadcrumbSchema crumbs={[{ name: "Home", url: "https://www.raflainsurance.com/" }, { name: "FAQ", url: "https://www.raflainsurance.com/faq" }]} />
      <DossierHeader index="Q+A" eyebrow="Questions clients bring us" title="Insurance questions, answered." lede="Find the basics for a quote, filing, policy change, or claim—then call the office when the actual document needs to be reviewed." image={images.interior.faq} imageAlt="An open reference book, reading glasses, and page tabs" />
      <section className="answer-library section-folio-host"><SectionFolio>Answer file</SectionFolio><div className="atlas-container answer-library__grid">
        <aside className="answer-library__index motion-reveal" aria-label="FAQ topics and office help">
          <div className="answer-library__signature"><InteriorSignature kind="reading" /><AtlasEyebrow>Browse by topic</AtlasEyebrow></div>
          <nav aria-label="FAQ topics">{filteredSections.map((section) => <a key={section.code} href={`#faq-${section.code}`}>{section.title}</a>)}</nav>

        </aside>
        <div className="answer-library__answers">
          <div className="faq-search" role="search" aria-label="Search insurance questions">
            <label htmlFor="faq-search">Find an answer</label>
            <div className="faq-search__field"><Search aria-hidden="true" size={20} /><input ref={searchInput} id="faq-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Try renewal, SR-22, or business" autoComplete="off" aria-describedby="faq-search-count" />{query && <button type="button" onClick={clearSearch} aria-label="Clear search"><X aria-hidden="true" size={18} /></button>}</div>
            <p id="faq-search-count" role="status" aria-live="polite">{terms.length ? `${resultCount} ${resultCount === 1 ? "answer" : "answers"} found` : "Search by a coverage type, document, or question."}</p>
          </div>
          {filteredSections.map((section) => <section key={section.code} id={`faq-${section.code}`} className="answer-group"><div className="answer-group__title"><h2>{section.title}</h2></div>{section.questions.map(([q,a]) => <details key={q} open={terms.length > 0 ? true : undefined} className="answer-drawer"><summary>{q}<i aria-hidden="true" /></summary><p>{a}</p></details>)}</section>)}
          {!resultCount && <div className="faq-search__empty"><h2>No matching questions yet.</h2><p>Try a broader phrase, or call the office with your specific question.</p><button type="button" onClick={clearSearch}>Show all questions</button><a href={site.contact.phoneHref}>Call {site.contact.phone}</a></div>}
        </div>
      </div></section>
      <QuoteBand title="Your situation may need a more specific answer." text="Website explanations are general. Bring the actual policy, notice, contract, vehicle, property, or business details into the conversation." />
    </main>
  );
}
