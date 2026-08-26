import { ArrowRight, Check, FileText, Phone, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { AtlasButton, AtlasEyebrow, AtlasImage, DossierHeader, FactRail, PaperNote, QuoteBand } from "./AtlasUI";
import BreadcrumbSchema from "./seo/BreadcrumbSchema";
import LocalBusinessSchema from "./seo/LocalBusinessSchema";
import { openQuoteModal } from "../lib/openQuote";
import { usePageMeta } from "../lib/seo";
import { site } from "../lib/site";

export type CoverageBriefConfig = {
  index: string;
  eyebrow: string;
  title: string;
  lede: string;
  metaTitle: string;
  metaDescription: string;
  canonical: string;
  image: string;
  imageAlt: string;
  signals: Array<{ label: string; value: string }>;
  introTitle: string;
  intro: string[];
  anatomyTitle: string;
  anatomy: Array<{ title: string; text: string; tag?: string }>;
  checklistTitle: string;
  checklist: string[];
  fieldNote: string;
  detailTitle: string;
  detail: string[];
  related: Array<{ label: string; href: string }>;
  faqs: Array<{ q: string; a: string }>;
};

export default function CoverageBriefPage({ config }: { config: CoverageBriefConfig }) {
  usePageMeta({ title: config.metaTitle, description: config.metaDescription, canonical: config.canonical });

  return (
    <main id="main-content" className="atlas-page coverage-brief">
      <LocalBusinessSchema url="https://raflainsurance.com/" areaServed={["Los Angeles, CA", "Mar Vista", "Los Angeles Westside"]} />
      <BreadcrumbSchema crumbs={[{ name: "Home", url: "https://raflainsurance.com/" }, { name: "Services", url: "https://raflainsurance.com/services" }, { name: config.eyebrow, url: config.canonical }]} />
      <DossierHeader index={config.index} eyebrow={config.eyebrow} title={config.title} lede={config.lede} image={config.image} imageAlt={config.imageAlt}>
        <AtlasButton tone="navy" onClick={openQuoteModal}>Open a quote file</AtlasButton>
        <a className="coverage-brief__call" href={site.contact.phoneHref}><Phone size={15} /> {site.contact.phone}</a>
      </DossierHeader>

      <div className="atlas-container">
        <FactRail facts={config.signals} />
      </div>

      <section className="brief-reading">
        <div className="atlas-container brief-reading__grid">
          <aside className="brief-index motion-reveal">
            <span>File index</span>
            <a href="#orientation">01 / Orientation</a>
            <a href="#anatomy">02 / Coverage anatomy</a>
            <a href="#documents">03 / Useful documents</a>
            <a href="#fine-print">04 / Broker note</a>
            <a href="#answers">05 / Answers</a>
          </aside>
          <div className="brief-reading__content">
            <section id="orientation" className="brief-chapter motion-reveal">
              <AtlasEyebrow>Orientation</AtlasEyebrow>
              <h2>{config.introTitle}</h2>
              {config.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>

            <section id="anatomy" className="brief-chapter brief-anatomy">
              <AtlasEyebrow>Coverage anatomy</AtlasEyebrow>
              <h2>{config.anatomyTitle}</h2>
              <div className="brief-anatomy__list">
                {config.anatomy.map((item, index) => (
                  <article key={item.title} className="motion-reveal">
                    <span>0{index + 1}</span>
                    <div><h3>{item.title}</h3><p>{item.text}</p></div>
                    {item.tag && <small>{item.tag}</small>}
                  </article>
                ))}
              </div>
            </section>

            <section id="documents" className="brief-chapter brief-documents">
              <div className="brief-documents__copy motion-reveal">
                <AtlasEyebrow>Prepare the file</AtlasEyebrow>
                <h2>{config.checklistTitle}</h2>
                <ul>{config.checklist.map((item) => <li key={item}><Check size={16} /> {item}</li>)}</ul>
              </div>
              <PaperNote label="Field note" tone="blue"><p>{config.fieldNote}</p><button type="button" onClick={openQuoteModal}>Ask what applies <ArrowRight size={16} /></button></PaperNote>
            </section>

            <section id="fine-print" className="brief-chapter brief-detail motion-reveal">
              <AtlasEyebrow>Broker note</AtlasEyebrow>
              <h2>{config.detailTitle}</h2>
              {config.detail.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <div className="brief-detail__caution"><ShieldCheck size={21} /><p>Actual policy language, eligibility, carrier underwriting, limits, deductibles, and exclusions control. A website summary cannot bind or guarantee coverage.</p></div>
            </section>

            <section className="brief-related motion-reveal">
              <span>Related files</span>
              <div>{config.related.map((item) => <Link key={item.href} to={item.href}>{item.label}<ArrowRight size={15} /></Link>)}</div>
            </section>

            <section id="answers" className="brief-chapter brief-faq">
              <AtlasEyebrow>Useful answers</AtlasEyebrow>
              <h2>Before we compare options.</h2>
              {config.faqs.map((faq, index) => (
                <details key={faq.q} className="answer-drawer motion-reveal" open={index === 0}>
                  <summary><span>0{index + 1}</span>{faq.q}<i aria-hidden="true" /></summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </section>
          </div>
        </div>
      </section>

      <section className="brief-closing-image">
        <div className="atlas-container brief-closing-image__inner motion-reveal">
          <AtlasImage src={config.image} alt="" aria-hidden="true" width="1536" height="1024" loading="lazy" />
          <div><FileText size={22} /><span>Rafla coverage brief / {config.index}</span><strong>{config.eyebrow}</strong></div>
        </div>
      </section>

      <QuoteBand title={`Let’s review your ${config.eyebrow.toLowerCase()} file.`} />
    </main>
  );
}
