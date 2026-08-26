import { ArrowRight, Check, FileSearch, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { AtlasButton, AtlasEyebrow, AtlasImage, DossierHeader, PaperNote, QuoteBand } from "../components/AtlasUI";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import { coverageEntries, serviceGroups } from "../data/atlas";
import { openQuoteModal } from "../lib/openQuote";
import { usePageMeta } from "../lib/seo";
import { site } from "../lib/site";

const groupImages = ["/images/agency/auto-home-v2.webp", "/images/agency/auto-home-v2.webp", "/images/agency/workers-v2.webp", "/images/agency/specialty-v2.webp"];

export default function Services() {
  usePageMeta({
    title: "Insurance Services Los Angeles | Rafla Insurance Agency",
    description: "Auto, home, renters, commercial, workers’ compensation, bonds, SR-22, motorcycle, RV, boat and specialty insurance from a Mar Vista broker.",
    canonical: "https://raflainsurance.com/services",
  });

  return (
    <main id="main-content" className="atlas-page services-atlas">
      <BreadcrumbSchema crumbs={[{ name: "Home", url: "https://raflainsurance.com/" }, { name: "Services", url: "https://raflainsurance.com/services" }]} />
      <DossierHeader index="Services" eyebrow="Personal and business insurance" title="Insurance for what you own, drive, and operate." lede="From the car in your driveway to the business that keeps you moving, we help bring your coverage into one clear conversation." image="/images/agency/policy-desk-v2.webp" imageAlt="Policy documents, vehicle keys, and notes prepared for an insurance review">
        <AtlasButton tone="navy" onClick={openQuoteModal}>Tell us what you need</AtlasButton>
        <a className="coverage-brief__call" href={site.contact.phoneHref}><Phone size={15} /> {site.contact.phone}</a>
      </DossierHeader>

      <section className="services-ledger">
        <div className="atlas-container">
          <div className="services-ledger__intro motion-reveal">
            <AtlasEyebrow>What we insure</AtlasEyebrow>
            <h2>Your life is connected.<br />Your coverage should be, too.</h2>
            <p>A vehicle can serve a household and a business. A home can contain equipment or rental exposure. We look at the seams instead of treating every policy as an island.</p>
          </div>
          <div className="services-ledger__groups">
            {serviceGroups.map((group, index) => {
              const Icon = group.icon;
              return (
                <article id={group.id} key={group.id} className={`service-ledger service-ledger--${index % 2 ? "paper" : "navy"} motion-reveal`}>
                  <div className="service-ledger__number">0{index + 1}</div>
                  <div className="service-ledger__title"><span>{group.kicker}</span><Icon size={28} /><h3>{group.label}</h3></div>
                  <div className="service-ledger__image"><AtlasImage src={groupImages[index]} alt="" aria-hidden="true" width="1536" height="1024" loading="lazy" /></div>
                  <ul>{group.lines.map((line) => <li key={line}><Check size={14} />{line}</li>)}</ul>
                  <button type="button" onClick={openQuoteModal}>Talk about this coverage <ArrowRight size={16} /></button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="services-briefs">
        <div className="atlas-container services-briefs__grid">
          <div className="services-briefs__copy motion-reveal"><AtlasEyebrow>Coverage guides</AtlasEyebrow><h2>Learn before you decide.</h2><p>Explore practical explanations of common coverage, useful documents, and questions to bring to a broker conversation.</p></div>
          <div className="services-briefs__list">
            {coverageEntries.slice(0, 4).map((entry) => <Link key={entry.key} to={entry.href} className="motion-reveal"><span>{entry.number}</span><strong>{entry.title}</strong><p>{entry.short}</p><ArrowRight size={18} /></Link>)}
          </div>
        </div>
      </section>

      <section className="scope-note">
        <div className="atlas-container scope-note__grid">
          <div className="motion-reveal"><FileSearch size={32} /><AtlasEyebrow light>Our current services</AtlasEyebrow><h2>A focused property and casualty agency.</h2></div>
          <PaperNote label="Currently offered" tone="blue"><p>Personal and commercial property/casualty coverage, bonds, SR-22 support, and selected agency services.</p></PaperNote>
          <PaperNote label="Not currently offered"><p>Health, life, and notary services are not currently available. We will update this website if our licensing changes.</p></PaperNote>
        </div>
      </section>

      <QuoteBand title="You don’t need to know the policy name." text="Tell us what changed, what you bought, what a contract requires, or what is coming up for renewal. We’ll help identify the right questions." />
    </main>
  );
}
