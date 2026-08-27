import { ArrowRight, Check, FileSearch, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { AtlasButton, AtlasEyebrow, AtlasImage, DossierHeader, PaperNote, QuoteBand } from "../components/AtlasUI";
import CoverageLinework, { type CoverageLineworkVariant } from "../components/CoverageLinework";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import { coverageEntries, serviceGroups } from "../data/atlas";
import { openQuoteModal } from "../lib/openQuote";
import { images } from "../lib/images";
import { usePageMeta } from "../lib/seo";
import { site } from "../lib/site";

const groupDrawings: CoverageLineworkVariant[] = ["auto", "home", "commercial", "specialty"];
const groupPhotos = [images.services.auto, null, images.services.workers, null] as const;
const groupPhotoAlts = [
  "A Los Angeles driver reviewing auto insurance documents with a broker beside an everyday car",
  "",
  "A small Los Angeles contractor crew preparing tools and safety equipment before the workday",
  "",
] as const;

export default function Services() {
  usePageMeta({
    title: "Insurance Services Los Angeles | Rafla Insurance Agency",
    description: "Auto, home, renters, commercial, workers’ compensation, bonds, SR-22, motorcycle, RV, boat and specialty insurance from a Mar Vista broker.",
    canonical: "https://raflainsurance.com/services",
  });

  return (
    <main id="main-content" className="atlas-page services-atlas">
      <BreadcrumbSchema crumbs={[{ name: "Home", url: "https://raflainsurance.com/" }, { name: "Services", url: "https://raflainsurance.com/services" }]} />
      <DossierHeader index="Services" eyebrow="Personal and business insurance" title="Insurance for what you own, drive, and operate." lede="From the car in your driveway to the business that keeps you moving, we help bring your coverage into one clear conversation." image="/images/agency/people-business-v4.webp" imageAlt="A Westside small-business crew loading tools into a work van outside their shop">
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
                  <div className={`service-ledger__image ${groupPhotos[index] ? "service-ledger__image--photo" : "service-ledger__image--drawing"}`}>
                    {groupPhotos[index]
                      ? <AtlasImage src={groupPhotos[index]} alt={groupPhotoAlts[index]} width="1536" height="1024" loading="lazy" />
                      : <CoverageLinework variant={groupDrawings[index]} />}
                  </div>
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
