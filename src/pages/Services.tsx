import { ArrowRight, Check, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { AtlasButton, AtlasEyebrow, AtlasImage, DossierHeader, QuoteBand, SectionFolio } from "../components/AtlasUI";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import { coverageEntries, serviceGroups } from "../data/atlas";
import { images } from "../lib/images";
import { usePageMeta } from "../lib/seo";
import InteriorSignature from "../components/InteriorSignature";
import { site } from "../lib/site";

const groupSignatureKinds = ["drive", "property", "work", "weekend"] as const;
const groupPhotos = [images.services.auto, images.services.home, images.services.workers, images.services.motorcycle] as const;
const groupPhotoAlts = ["The empty interior and seat belt of a parked car", "An apartment living room with a sofa, bookshelf, and neighborhood view", "Safety glasses, gloves, a hard hat, and a work jacket on a bench", "A travel trailer parked at a quiet oak-shaded campground"] as const;
const groupQuoteTypes: Record<(typeof serviceGroups)[number]["id"], "auto" | "home" | "business" | "specialty"> = {
  drive: "auto",
  property: "home",
  work: "business",
  weekend: "specialty",
};

export default function Services() {
  usePageMeta({
    title: "Insurance Services Los Angeles | Rafla Insurance Agency",
    description: "Auto, home, renters, commercial, workers’ compensation, bonds, SR-22, motorcycle, RV, boat and specialty insurance from a Mar Vista broker.",
    canonical: "https://www.raflainsurance.com/services",
  });

  return (
    <main id="main-content" className="atlas-page services-atlas">
      <BreadcrumbSchema crumbs={[{ name: "Home", url: "https://www.raflainsurance.com/" }, { name: "Services", url: "https://www.raflainsurance.com/services" }]} />
      <DossierHeader index="Services" eyebrow="Personal and business insurance" title="Insurance for what you own, drive, and operate." lede="Tell us about the vehicle, property, household, or business in front of you. We’ll organize the carrier questions and coverage details around the real situation." image="/images/editorial/services-hero.webp" imageAlt="A commercial loading courtyard with crates and a delivery van">
        <AtlasButton tone="navy" to="/contact#quote-request">Get a quote</AtlasButton>
        <a className="coverage-brief__call" href={site.contact.phoneHref}><Phone size={15} /> {site.contact.phone}</a>
      </DossierHeader>

      <section className="services-ledger section-folio-host">
        <SectionFolio>Coverage register</SectionFolio>
        <div className="atlas-container">
          <div className="services-ledger__intro motion-reveal">
            <AtlasEyebrow>What we insure</AtlasEyebrow>
            <h2>Your policies should match<br />how you actually live and work.</h2>
            <p>A vehicle may serve both a household and a business. A home may include rental use, stored equipment, or work activity. We check where one policy stops and another may need to begin.</p>
            <nav className="services-ledger__index" aria-label="Jump to a coverage category">
              {serviceGroups.map((group, index) => (
                <a key={group.id} href={`#${group.id}`}>
                  <small>0{index + 1}</small>
                  <span>{group.label}</span>
                </a>
              ))}
            </nav>
          </div>
          <div className="services-ledger__groups">
            {serviceGroups.map((group, index) => {
              return (
                <article id={group.id} key={group.id} className={`service-ledger service-ledger--${index % 2 ? "paper" : "navy"} motion-reveal`}>
                  <div className="service-ledger__number">0{index + 1}</div>
                  <div className="service-ledger__title"><InteriorSignature kind={groupSignatureKinds[index]} /><h3>{group.label}</h3></div>
                  <div className="service-ledger__image service-ledger__image--photo">
                    <AtlasImage src={groupPhotos[index]} alt={groupPhotoAlts[index]} width="1536" height="1024" loading="lazy" />
                  </div>
                  <ul>{group.lines.map((line) => <li key={line}><Check size={14} />{line}</li>)}</ul>
                  <Link className="service-ledger__quote" to={`/contact?coverage=${groupQuoteTypes[group.id]}#quote-request`}>Get a quote <ArrowRight size={16} /></Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="services-briefs section-folio-host">
        <SectionFolio tone="paper">Practical guides</SectionFolio>
        <div className="atlas-container services-briefs__grid">
          <div className="services-briefs__copy motion-reveal"><h2>Coverage guides</h2></div>
          <div className="mobile-swipe-hint mobile-swipe-hint--ink"><span />Swipe through coverage guides</div>
          <div className="services-briefs__list" role="region" aria-label="Coverage guides">
            {coverageEntries.slice(0, 4).map((entry) => <Link key={entry.key} to={entry.href} className="motion-reveal"><span>{entry.number}</span><strong>{entry.title}</strong><p>{entry.short}</p><ArrowRight size={18} /></Link>)}
          </div>
        </div>
      </section>

      <aside className="service-scope-note atlas-container"><p>Rafla offers property and casualty insurance. Health insurance, life insurance, and notary services are not currently offered.</p></aside>

      <QuoteBand title="You don’t need to know the policy name." text="Tell us what changed, what you bought, what a contract requires, or what is coming up for renewal. We’ll help identify the right questions." />
    </main>
  );
}
