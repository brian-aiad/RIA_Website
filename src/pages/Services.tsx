import { ArrowRight, Building2, Car, Check, FileBadge2, FileSearch, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { AtlasButton, AtlasEyebrow, AtlasImage, DossierHeader, PaperNote, QuoteBand } from "../components/AtlasUI";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import { coverageEntries, serviceGroups } from "../data/atlas";
import { openQuoteModal } from "../lib/openQuote";
import { images } from "../lib/images";
import { usePageMeta } from "../lib/seo";
import { site } from "../lib/site";

const groupPhotos = [images.services.auto, images.services.home, images.services.workers, images.services.motorcycle] as const;
const groupPhotoAlts = [
  "Illustration of a Los Angeles household reviewing auto insurance beside an everyday car",
  "Illustration of Los Angeles renters making an inventory of belongings in their apartment",
  "Illustration of a small Los Angeles contractor crew preparing tools and safety equipment",
  "Illustration of a motorcycle, travel trailer, and boat being prepared safely for a trip",
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
      <DossierHeader index="Services" eyebrow="Personal and business insurance" title="Insurance for what you own, drive, and operate." lede="From the car in your driveway to the business that keeps you moving, we help bring your coverage into one clear conversation." image="/images/illustrated/small-business-v6.webp" imageAlt="Illustration of a Westside small-business owner reviewing coverage outside her shop">
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
                  <div className="service-ledger__image service-ledger__image--photo">
                    <AtlasImage src={groupPhotos[index]} alt={groupPhotoAlts[index]} width="1536" height="1024" loading="lazy" />
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
          <div className="scope-note__intro motion-reveal">
            <FileSearch size={32} />
            <AtlasEyebrow light>Our current services</AtlasEyebrow>
            <h2>A focused property and casualty agency.</h2>
            <ul className="scope-note__focus">
              <li><Car aria-hidden="true" /><span><strong>Personal lines</strong>Vehicles, homes, rentals, and belongings</span></li>
              <li><Building2 aria-hidden="true" /><span><strong>Business lines</strong>Vehicles, liability, property, and employees</span></li>
              <li><FileBadge2 aria-hidden="true" /><span><strong>Bonds &amp; filings</strong>Contract requirements and specialty situations</span></li>
            </ul>
          </div>
          <PaperNote label="Currently offered" tone="blue">
            <div className="scope-card__heading">
              <strong>Property &amp; casualty</strong>
              <p>One local desk for everyday personal and business risks.</p>
            </div>
            <ul className="scope-card__list scope-card__list--active">
              <li><Check aria-hidden="true" />Auto, motorcycle &amp; recreation</li>
              <li><Check aria-hidden="true" />Homeowners &amp; renters</li>
              <li><Check aria-hidden="true" />Business vehicles &amp; liability</li>
              <li><Check aria-hidden="true" />Workers’ compensation</li>
              <li><Check aria-hidden="true" />Bonds, filings &amp; SR-22 support</li>
            </ul>
            <button type="button" onClick={openQuoteModal}>Review my coverage <ArrowRight aria-hidden="true" size={15} /></button>
          </PaperNote>
          <PaperNote label="Not currently offered">
            <div className="scope-card__heading">
              <strong>Future license areas</strong>
              <p>These services are intentionally outside our current agency scope.</p>
            </div>
            <ul className="scope-card__list scope-card__list--inactive">
              <li><span aria-hidden="true">—</span>Health insurance</li>
              <li><span aria-hidden="true">—</span>Life insurance</li>
              <li><span aria-hidden="true">—</span>Notary services</li>
            </ul>
            <div className="scope-card__boundary"><FileBadge2 aria-hidden="true" /><span>Our licensed lane<strong>Property &amp; casualty</strong></span></div>
            <small>We’ll update this website if our licensing changes. Questions about another risk? Call the broker desk.</small>
          </PaperNote>
        </div>
      </section>

      <QuoteBand title="You don’t need to know the policy name." text="Tell us what changed, what you bought, what a contract requires, or what is coming up for renewal. We’ll help identify the right questions." />
    </main>
  );
}
