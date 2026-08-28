import { useState, type KeyboardEvent } from "react";
import { ArrowRight, CarFront, ClipboardPenLine, FileBadge2, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { AtlasImage, SectionFolio } from "./AtlasUI";
import { images } from "../lib/images";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";

const deskFiles = [
  {
    id: "quote",
    label: "A new quote",
    context: "Before the policy",
    title: "Something changed. Start there.",
    summary: "A renewal climbed, you bought a car, moved, or started a business. We build the review around the change—not a generic form.",
    checklist: ["Current policy or renewal notice", "The people, property, vehicles, or work involved", "A realistic effective date and any deadline"],
    image: images.hero.consultation,
    alt: "Illustrated broker desk with two people comparing a policy folder and coverage documents",
    action: "Start a quote review",
    actionType: "quote" as const,
    icon: ClipboardPenLine,
  },
  {
    id: "change",
    label: "A policy change",
    context: "While covered",
    title: "Tell us before the details drift.",
    summary: "A new driver, address, employee, vehicle, renovation, or equipment purchase can change how the policy should be reviewed.",
    checklist: ["What changed and when", "Any lender, lease, or contract instructions", "Updated values, use, drivers, payroll, or locations"],
    image: images.home.property,
    alt: "Illustrated local broker reviewing a Westside home and renovation details with homeowners",
    action: "Contact the service desk",
    actionType: "link" as const,
    icon: RefreshCw,
  },
  {
    id: "claim",
    label: "Claim next steps",
    context: "After a loss",
    title: "A local person can help you find the next step.",
    summary: "The carrier decides coverage and handles the claim. Rafla can help locate reporting information, organize questions, and stay in the conversation.",
    checklist: ["Protect people and property from further harm", "Record the facts without guessing or admitting fault", "Use the carrier’s official claim-reporting path"],
    image: images.claims.docs,
    alt: "Illustrated broker helping two drivers document a small bumper scrape beside their parked car",
    action: "Ask the office for help",
    actionType: "link" as const,
    icon: CarFront,
  },
  {
    id: "documents",
    label: "Certificate or bond",
    context: "For a deadline",
    title: "Bring the requirement, not only the due date.",
    summary: "Certificates, additional-insured requests, bonds, and filings should be checked against the actual contract and policy.",
    checklist: ["The contract or sample certificate", "Exact holder, obligee, or filing instructions", "Deadline, project, vehicle, and operation details"],
    image: images.claims.certificates,
    alt: "Illustrated contractor and broker reviewing certificate, bond, and business document folders",
    action: "Send the requirement",
    actionType: "link" as const,
    icon: FileBadge2,
  },
];

export default function BrokerServiceDesk() {
  const [activeId, setActiveId] = useState(deskFiles[0].id);
  const activeIndex = deskFiles.findIndex((file) => file.id === activeId);
  const active = deskFiles[activeIndex];

  const moveTab = (event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const lastIndex = deskFiles.length - 1;
    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? lastIndex
        : ["ArrowDown", "ArrowRight"].includes(event.key)
          ? (currentIndex + 1) % deskFiles.length
          : (currentIndex - 1 + deskFiles.length) % deskFiles.length;
    const next = deskFiles[nextIndex];
    setActiveId(next.id);
    window.requestAnimationFrame(() => document.getElementById(`service-desk-tab-${next.id}`)?.focus());
  };

  return (
    <section className="broker-cases section-folio-host" aria-labelledby="broker-cases-title">
      <SectionFolio>Policy service</SectionFolio>
      <div className="atlas-container">
        <header className="broker-cases__heading">
          <div>
            <p className="ria-kicker">The broker service desk</p>
            <h2 id="broker-cases-title">Help before—and after—the policy begins.</h2>
          </div>
          <p>Insurance work is not finished when a policy is issued. Choose the reason you are calling and see the details that help us move the conversation forward.</p>
        </header>

        <div className="broker-cases__shell">
          <div className="broker-cases__tabs" role="tablist" aria-label="Reasons to contact the broker desk">
            <span>What brings you in?</span>
            {deskFiles.map((file, index) => {
              const Icon = file.icon;
              const selected = file.id === active.id;
              return (
                <button
                  id={`service-desk-tab-${file.id}`}
                  key={file.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="service-desk-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(file.id)}
                  onKeyDown={(event) => moveTab(event, index)}
                >
                  <Icon aria-hidden="true" />
                  <span><small>{file.context}</small><strong>{file.label}</strong></span>
                  <ArrowRight aria-hidden="true" />
                </button>
              );
            })}
            <div className="broker-cases__office">
              <small>Mar Vista office</small>
              <strong>{site.hours.short}</strong>
              <span>English · Spanish · Arabic</span>
            </div>
          </div>

          <div
            id="service-desk-panel"
            className="broker-cases__panel"
            role="tabpanel"
            aria-labelledby={`service-desk-tab-${active.id}`}
            aria-live="polite"
          >
            <figure className="broker-cases__visual">
              <AtlasImage src={active.image} alt={active.alt} width="1536" height="1024" loading="lazy" sizes="(max-width: 900px) 100vw, 42vw" />
              <figcaption key={`caption-${active.id}`}><span>Rafla / local service</span><strong>{active.context}</strong></figcaption>
            </figure>
            <article className="broker-cases__file" key={`file-${active.id}`}>
              <div className="broker-cases__clip" aria-hidden="true" />
              <span className="broker-cases__file-label">Working file · {active.label}</span>
              <h3>{active.title}</h3>
              <p>{active.summary}</p>
              <ul>
                {active.checklist.map((item) => <li key={item}><span aria-hidden="true" />{item}</li>)}
              </ul>
              {active.actionType === "quote"
                ? <button type="button" onClick={openQuoteModal}>{active.action}<ArrowRight size={16} /></button>
                : <Link to="/contact">{active.action}<ArrowRight size={16} /></Link>}
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
