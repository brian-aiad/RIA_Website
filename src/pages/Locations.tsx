import { ArrowRight, Clock3, ExternalLink, Languages, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { AtlasButton, AtlasEyebrow, AtlasImage, DossierHeader, QuoteBand, SectionFolio } from "../components/AtlasUI";
import WestsideMap from "../components/WestsideMap";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import LocalBusinessSchema from "../components/seo/LocalBusinessSchema";
import { cities } from "../data/atlas";
import { openQuoteModal } from "../lib/openQuote";
import { usePageMeta } from "../lib/seo";
import { images } from "../lib/images";
import { site } from "../lib/site";

export default function Locations() {
  usePageMeta({
    title: "Mar Vista Insurance Office & Westside Service Areas | Rafla",
    description: "Visit Rafla Insurance at 12240 Venice Blvd Suite 2 in Mar Vista. Serving Palms, Culver City, Venice, Santa Monica, Marina del Rey and the Westside.",
    canonical: "https://raflainsurance.com/locations",
  });

  return (
    <main id="main-content" className="atlas-page locations-file">
      <LocalBusinessSchema url="https://raflainsurance.com/" areaServed={cities.map((city) => `${city.name}, CA`)} />
      <BreadcrumbSchema crumbs={[{ name: "Home", url: "https://raflainsurance.com/" }, { name: "Locations", url: "https://raflainsurance.com/locations" }]} />
      <DossierHeader index="LA" eyebrow="Your Mar Vista insurance office" title="Close by when it matters." lede="Visit us on Venice Boulevard in Mar Vista. We serve nearby Westside and surrounding Los Angeles communities." image="/images/illustrated/office-venice-illustrated-v6.webp" imageAlt="Illustration of Rafla Insurance Agency's Venice Boulevard neighborhood office">
        <AtlasButton tone="navy" onClick={openQuoteModal}>Request a quote</AtlasButton>
        <a className="coverage-brief__call" href={site.contact.mapsHref} target="_blank" rel="noreferrer">Directions <ExternalLink size={14} /></a>
      </DossierHeader>

      <section className="office-record section-folio-host">
        <SectionFolio>Visit / 90066</SectionFolio>
        <div className="atlas-container office-record__grid">
          <div className="office-record__photo motion-reveal"><AtlasImage src={images.location.exterior} alt="Illustration of Rafla Insurance Agency's Venice Boulevard neighborhood office" width="1536" height="1024" loading="lazy" /><span>Neighborhood office / Venice Boulevard</span></div>
          <div className="office-record__details motion-reveal">
            <AtlasEyebrow>Visit Rafla Insurance</AtlasEyebrow>
            <h2>12240 Venice Blvd<br />Suite 2<br />Los Angeles, CA 90066</h2>
            <div className="office-record__lines">
              <a href={site.contact.mapsHref} target="_blank" rel="noreferrer"><MapPin />Open in maps<ArrowRight /></a>
              <a href={site.contact.phoneHref}><Phone />{site.contact.phone}<ArrowRight /></a>
              <p><Clock3 />Monday–Friday 10am–5pm<br />Saturday–Sunday closed</p>
              <p><Languages />English · Spanish · Arabic</p>
            </div>
          </div>
        </div>
      </section>

      <section className="city-directory section-folio-host">
        <SectionFolio tone="paper">Westside service area</SectionFolio>
        <div className="atlas-container">
          <div className="city-directory__heading motion-reveal"><AtlasEyebrow>Communities we serve</AtlasEyebrow><h2>Insurance help across the Westside.</h2><p>We work with households and businesses throughout nearby communities. Carrier availability and eligibility depend on the individual risk.</p></div>
          <div className="locations-map-plate motion-reveal"><WestsideMap /></div>
          <div className="city-directory__grid">
            {cities.map((city, index) => <Link key={city.slug} to={`/insurance/${city.slug}`} className={`city-record city-record--${city.group} motion-reveal`}><span>{String(index + 1).padStart(2,"0")}</span><div><h3>{city.name}</h3><p>{city.note}</p><small>{city.zips.join(" · ")}</small></div><ArrowRight size={18} /></Link>)}
          </div>
        </div>
      </section>

      <section className="planning-note"><div className="atlas-container planning-note__inner motion-reveal"><span>Rooted in the neighborhood</span><p>Los Angeles City Planning groups Palms, Mar Vista, Del Rey, and Playa Vista within the Palms–Mar Vista–Del Rey Community Plan area. Rafla’s 90066 office is well placed to serve that local Westside network and nearby communities.</p></div></section>

      <QuoteBand title="Local office. Direct conversation." text="Call ahead, start online, or visit the Venice Boulevard office during posted hours." />
    </main>
  );
}
