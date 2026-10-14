import { ArrowRight, Building2, Car, FileCheck2, Home, MapPin, Phone } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { AtlasButton, AtlasEyebrow, DossierHeader, QuoteBand, SectionFolio } from "../components/AtlasUI";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import LocalBusinessSchema from "../components/seo/LocalBusinessSchema";
import { cities, cityMap } from "../data/atlas";
import { usePageMeta } from "../lib/seo";
import { site } from "../lib/site";

const groupCopy = {
  home: "These nearby neighborhoods are a short trip from Rafla’s Venice Boulevard office. Clients commonly call about household vehicles, renters or homeowners coverage, and small-business policies.",
  coast: "Coastal clients often bring a mix of auto, renters, property, liability, business, motorcycle, boat, and specialty questions to the same review.",
  north: "Rafla works with drivers, renters, property owners, professionals, and local businesses across the northern Westside from its Mar Vista office.",
  south: "Households, landlords, contractors, drivers, and growing businesses south of Mar Vista can review personal and commercial policies with the same local team.",
};

const coverageLinks = [
  { label: "Auto & drivers", text: "Liability, physical damage, SR-22, and specialty situations.", href: "/auto-insurance-los-angeles-ca", icon: Car },
  { label: "Home & renters", text: "Homeowners, renters, condo, landlord, and liability.", href: "/home-insurance-los-angeles-ca", icon: Home },
  { label: "Business", text: "Commercial auto, general liability, workers’ comp, and bonds.", href: "/services#work", icon: Building2 },
  { label: "Filings", text: "SR-22 filing support and document-first reviews.", href: "/sr22-insurance-los-angeles", icon: FileCheck2 },
];

const cityVisuals: Record<string, { image: string; alt: string }> = {
  "mar-vista": { image: "/images/editorial/city-mar-vista.webp", alt: "Representative neighborhood scene: A mid-century home and native garden in a Westside residential setting" },
  "palms": { image: "/images/editorial/city-palms.webp", alt: "Representative neighborhood scene: A courtyard apartment building with shaded planting and exterior stairs" },
  "culver-city": { image: "/images/editorial/city-culver-city.webp", alt: "Representative neighborhood scene: A low-rise brick office building beside a tree-lined sidewalk" },
  "venice": { image: "/images/editorial/city-venice.webp", alt: "Representative neighborhood scene: A quiet residential canal with a footbridge and waterside homes" },
  "marina-del-rey": { image: "/images/editorial/city-marina-del-rey.webp", alt: "Representative neighborhood scene: A sailboat moored beside an empty marina dock" },
  "santa-monica": { image: "/images/editorial/city-santa-monica.webp", alt: "Representative neighborhood scene: A palm-lined coastal overlook and bench above the Pacific" },
  "west-los-angeles": { image: "/images/editorial/city-west-los-angeles.webp", alt: "Representative neighborhood scene: A low-rise professional office building with a landscaped entrance" },
  "sawtelle": { image: "/images/editorial/city-sawtelle.webp", alt: "Representative neighborhood scene: Small neighborhood shopfronts with navy awnings and potted maples" },
  "playa-vista": { image: "/images/editorial/city-playa-vista.webp", alt: "Representative neighborhood scene: Contemporary apartments beside a planted pedestrian greenway" },
  "westchester": { image: "/images/editorial/city-westchester.webp", alt: "Representative neighborhood scene: Single-story ranch homes and a shaded residential driveway" },
  "inglewood": { image: "/images/editorial/city-inglewood.webp", alt: "Representative neighborhood scene: A small industrial property with a parked box truck" },
  "ladera-heights": { image: "/images/editorial/city-ladera-heights.webp", alt: "Representative neighborhood scene: A hillside ranch home with a stone entry wall and native planting" },

};

export default function CityLanding() {
  const { citySlug } = useParams<{ citySlug: string }>();
  const city = citySlug ? cityMap[citySlug] : undefined;
  const canonical = city ? `https://www.raflainsurance.com/insurance/${city.slug}` : "https://www.raflainsurance.com/404";
  usePageMeta({ title: city ? `Insurance Broker Serving ${city.name}, CA | Rafla Insurance` : "Page Not Found | Rafla Insurance", description: city ? `Independent insurance broker serving ${city.name}, CA for auto, home, renters, business, workers’ compensation, SR-22 and specialty coverage.` : "The requested page could not be found.", canonical });
  if (!city) return <Navigate to="/404" replace />;

  const nearby = cities
    .filter((item) => item.slug !== city.slug)
    .sort((a, b) => {
      const priority = (item: typeof a) => item.group === city.group ? 0 : item.group === "home" ? 1 : 2;
      return priority(a) - priority(b);
    })
    .slice(0, 4);
  const visual = cityVisuals[city.slug];
  return (
    <main id="main-content" className="atlas-page city-file">
      <LocalBusinessSchema url={canonical} areaServed={[`${city.name}, CA`, "Los Angeles, CA"]} />
      <BreadcrumbSchema crumbs={[{name:"Home",url:"https://www.raflainsurance.com/"},{name:"Service areas",url:"https://www.raflainsurance.com/locations"},{name:city.name,url:canonical}]} />
      <DossierHeader index={city.zips[0]} eyebrow={`Insurance near ${city.name}`} title={city.slug === "mar-vista" ? "Your neighborhood insurance agency in Mar Vista." : `Insurance guidance for ${city.name}, from nearby Mar Vista.`} lede={`${city.note} Serving ZIP codes ${city.zips.join(", ")}.`} image={visual.image} imageAlt={visual.alt}>
        <AtlasButton tone="navy" to="/contact#quote-request">Get a quote</AtlasButton><a className="coverage-brief__call" href={site.contact.phoneHref}><Phone size={15}/>{site.contact.phone}</a>
      </DossierHeader>



      <section className="city-orientation section-folio-host"><SectionFolio>Neighborhood note</SectionFolio><div className="atlas-container city-orientation__grid">

        <div className="city-orientation__copy motion-reveal"><div className="city-postmark"><MapPin aria-hidden="true" /><span>{city.name}<small>Serving ZIP {city.zips.length > 1 ? "codes" : "code"} {city.zips.join(" · ")}</small></span></div><p>{groupCopy[city.group]}</p></div>
        <aside className="city-orientation__office motion-reveal"><MapPin/><span>Rafla office</span><strong>{site.contact.address}</strong><a href={site.contact.mapsHref} target="_blank" rel="noopener noreferrer">Directions <ArrowRight size={14}/></a></aside>
      </div></section>

      <section className="city-coverage section-folio-host"><SectionFolio tone="gold">Coverage desk</SectionFolio><div className="atlas-container"><div className="city-coverage__heading motion-reveal"><AtlasEyebrow light>Insurance options for {city.name}</AtlasEyebrow><h2>Start with the policy you need today.</h2></div><div className="mobile-swipe-hint" aria-hidden="true"><span />Swipe through coverage options</div><div className="city-coverage__grid" role="region" aria-label={`Insurance options for ${city.name}`}>{coverageLinks.map(({label,text,href,icon:Icon},index) => <Link key={href} to={href} className="motion-reveal"><span>0{index+1}</span><Icon/><h3>{label}</h3><p>{text}</p><ArrowRight/></Link>)}</div></div></section>

      <section className="nearby-files section-folio-host"><SectionFolio tone="paper">Nearby areas</SectionFolio><div className="atlas-container nearby-files__grid"><div className="motion-reveal"><h2>Nearby communities</h2></div><div>{nearby.map((item,index) => <Link key={item.slug} to={`/insurance/${item.slug}`} className="motion-reveal"><span>0{index+1}</span><strong>{item.name}</strong><small>{item.zips.join(" · ")}</small><ArrowRight size={16}/></Link>)}</div></div></section>

      <QuoteBand title={`Talk with a local broker serving ${city.name}.`} text="Bring any current declarations page, renewal, lender request, contract, or DMV notice. We’ll help identify the next useful step." />
    </main>
  );
}
