import { ArrowRight, Building2, Car, Check, FileBadge2, FileSearch, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { AtlasButton, AtlasEyebrow, AtlasImage, DossierHeader, PaperNote, QuoteBand, SectionFolio } from "../components/AtlasUI";
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
      <DossierHeader index="Services" eyebrow="Personal and business insurance" title="Insurance for what you own, drive, and operate." lede="Tell us about the vehicle, property, household, or business in front of you. We’ll organize the carrier questions and coverage details around the real situation." image="/images/illustrated/small-business-v6.webp" imageAlt="Illustration of a Westside small-business owner reviewing coverage outside her shop">
        <AtlasButton tone="navy" onClick={openQuoteModal}>Open preparation guide</AtlasButton>
        <a className="coverage-brief__call" href={site.contact.phoneHref}><Phone size={15} /> {site.contact.phone}</a>
      </DossierHeader>

      <section className="services-ledger section-folio-host">
        <SectionFolio>Coverage register</SectionFolio>
        <div className="atlas-container">
          <div className="services-ledger__intro motion-reveal">
            <AtlasEyebrow>What we insure</AtlasEyebrow>
            <h2>Your policies should match<br />how you actually live and work.</h2>
            <p>A vehicle may serve both a household and a business. A home may include rental use, stored equipment, or work activity. We check where one policy stops and another may need to begin.</p>
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
                  <button type="button" onClick={openQuoteModal}>Prepare for this coverage <ArrowRight size={16} /></button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="services-briefs section-folio-host">
        <SectionFolio tone="paper">Practical guides</SectionFolio>
        <div className="atlas-container services-briefs__grid">
          <div className="services-briefs__copy motion-reveal"><AtlasEyebrow>Coverage guides</AtlasEyebrow><h2>Know what to compare.</h2><p>See the common coverage parts, useful documents, and questions worth bringing to the broker desk.</p></div>
          <div className="mobile-swipe-hint mobile-swipe-hint--ink"><span />Swipe through coverage guides</div>
          <div className="services-briefs__list" role="region" aria-label="Coverage guides" aria-description="On narrow screens, scroll horizontally or use the Left and Right Arrow keys to browse coverage guides." tabIndex={0}>
            {coverageEntries.slice(0, 4).map((entry) => <Link key={entry.key} to={entry.href} className="motion-reveal"><span>{entry.number}</span><strong>{entry.title}</strong><p>{entry.short}</p><ArrowRight size={18} /></Link>)}
          </div>
        </div>
      </section>

      <section className="scope-note section-folio-host">
        <SectionFolio tone="gold">Licensed scope</SectionFolio>
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
              <p>Personal and business insurance handled from one local office.</p>
            </div>
            <ul className="scope-card__list scope-card__list--active">
              <li><Check aria-hidden="true" />Auto, motorcycle &amp; recreation</li>
              <li><Check aria-hidden="true" />Homeowners &amp; renters</li>
              <li><Check aria-hidden="true" />Business vehicles &amp; liability</li>
              <li><Check aria-hidden="true" />Workers’ compensation</li>
              <li><Check aria-hidden="true" />Bonds, filings &amp; SR-22 support</li>
            </ul>
            <button type="button" onClick={openQuoteModal}>Open preparation guide <ArrowRight aria-hidden="true" size={15} /></button>
          </PaperNote>
          <PaperNote label="Not currently offered">
            <div className="scope-card__heading">
              <strong>Future license areas</strong>
              <p>Rafla does not currently offer these services.</p>
            </div>
            <ul className="scope-card__list scope-card__list--inactive">
              <li><span aria-hidden="true">—</span>Health insurance</li>
              <li><span aria-hidden="true">—</span>Life insurance</li>
              <li><span aria-hidden="true">—</span>Notary services</li>
            </ul>
            <div className="scope-card__boundary"><FileBadge2 aria-hidden="true" /><span>Our licensed lane<strong>Property &amp; casualty</strong></span></div>
            <small>If you are unsure whether a request fits our current license, call the office before sending documents.</small>
          </PaperNote>
        </div>
      </section>

      <QuoteBand title="You don’t need to know the policy name." text="Tell us what changed, what you bought, what a contract requires, or what is coming up for renewal. We’ll help identify the right questions." />
    </main>
  );
}
