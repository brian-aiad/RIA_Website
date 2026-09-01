import { ArrowRight, Building2, Car, FileCheck2, Home, MapPin, Phone } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { AtlasButton, AtlasEyebrow, DossierHeader, FactRail, QuoteBand, SectionFolio } from "../components/AtlasUI";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import LocalBusinessSchema from "../components/seo/LocalBusinessSchema";
import { cities, cityMap } from "../data/atlas";
import { openQuoteModal } from "../lib/openQuote";
import { images } from "../lib/images";
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

const cityVisuals = {
  home: { image: images.city.palmsCulver, alt: "Editorial illustration of a Westside household, home, car, and bicycle" },
  coast: { image: images.city.coastal, alt: "Editorial illustration of motorcycle, RV, boat, and recreational coverage on the Los Angeles Westside" },
  north: { image: images.city.westside, alt: "Illustration of Rafla Insurance Agency's Venice Boulevard neighborhood office" },
  south: { image: images.city.southWestside, alt: "Editorial illustration of a Los Angeles small-business owner and crew outside their shop" },
};

export default function CityLanding() {
  const { citySlug } = useParams<{ citySlug: string }>();
  const city = citySlug ? cityMap[citySlug] : undefined;
  const canonical = city ? `https://raflainsurance.com/insurance/${city.slug}` : "https://raflainsurance.com/404";
  usePageMeta({ title: city ? `Insurance Broker Serving ${city.name}, CA | Rafla Insurance` : "Page Not Found | Rafla Insurance", description: city ? `Independent insurance broker serving ${city.name}, CA for auto, home, renters, business, workers’ compensation, SR-22 and specialty coverage.` : "The requested page could not be found.", canonical });
  if (!city) return <Navigate to="/404" replace />;

  const nearby = cities
    .filter((item) => item.slug !== city.slug)
    .sort((a, b) => {
      const priority = (item: typeof a) => item.group === city.group ? 0 : item.group === "home" ? 1 : 2;
      return priority(a) - priority(b);
    })
    .slice(0, 4);
  const visual = city.slug === "mar-vista"
    ? { image: images.city.westside, alt: "Illustration of Rafla Insurance Agency's Venice Boulevard neighborhood office in Mar Vista" }
    : cityVisuals[city.group];
  return (
    <main id="main-content" className="atlas-page city-file">
      <LocalBusinessSchema url={canonical} areaServed={[`${city.name}, CA`, "Los Angeles, CA"]} />
      <BreadcrumbSchema crumbs={[{name:"Home",url:"https://raflainsurance.com/"},{name:"Service areas",url:"https://raflainsurance.com/locations"},{name:city.name,url:canonical}]} />
      <DossierHeader index={city.zips[0]} eyebrow={`Insurance near ${city.name}`} title={`Insurance guidance for ${city.name}, from nearby Mar Vista.`} lede={`${city.note} Call Rafla’s Venice Boulevard office to review personal or business coverage with a local independent agency.`} image={visual.image} imageAlt={visual.alt} visualLabel="Personal + business coverage">
        <AtlasButton tone="navy" onClick={openQuoteModal}>Prepare for a {city.name} quote</AtlasButton><a className="coverage-brief__call" href={site.contact.phoneHref}><Phone size={15}/>{site.contact.phone}</a>
      </DossierHeader>

      <div className="atlas-container"><FactRail facts={[{label:"Community",value:city.name},{label:"ZIP codes",value:city.zips.join(" · ")},{label:"Agency office",value:"Mar Vista / 90066"},{label:"Languages",value:"English · Spanish · Arabic"}]} /></div>

      <section className="city-orientation section-folio-host"><SectionFolio>Neighborhood note</SectionFolio><div className="atlas-container city-orientation__grid">
        <div className="city-orientation__title motion-reveal"><AtlasEyebrow>What shapes the review</AtlasEyebrow><h2>The ZIP code tells us where. The details tell us what to review.</h2></div>
        <div className="city-orientation__copy motion-reveal"><p>{groupCopy[city.group]}</p><p>Two neighbors may need different carriers, limits, or policy forms. Vehicles, property, occupants, operations, payroll, contracts, claims, and filing history can all change the available options.</p></div>
        <aside className="city-orientation__office motion-reveal"><MapPin/><span>Rafla office</span><strong>{site.contact.address}</strong><a href={site.contact.mapsHref} target="_blank" rel="noopener noreferrer">Directions <ArrowRight size={14}/></a></aside>
      </div></section>

      <section className="city-coverage section-folio-host"><SectionFolio tone="gold">Coverage desk</SectionFolio><div className="atlas-container"><div className="city-coverage__heading motion-reveal"><AtlasEyebrow light>Insurance options for {city.name}</AtlasEyebrow><h2>Start with the policy you need today.</h2></div><div className="mobile-swipe-hint" aria-hidden="true"><span />Swipe through coverage options</div><div className="city-coverage__grid" role="region" aria-label={`Insurance options for ${city.name}`} aria-description="On narrow screens, scroll horizontally or use the Left and Right Arrow keys to browse coverage options." tabIndex={0}>{coverageLinks.map(({label,text,href,icon:Icon},index) => <Link key={href} to={href} className="motion-reveal"><span>0{index+1}</span><Icon/><h3>{label}</h3><p>{text}</p><ArrowRight/></Link>)}</div></div></section>

      <section className="nearby-files section-folio-host"><SectionFolio tone="paper">Nearby areas</SectionFolio><div className="atlas-container nearby-files__grid"><div className="motion-reveal"><AtlasEyebrow>Nearby communities</AtlasEyebrow><h2>Insurance help throughout the Westside.</h2></div><div>{nearby.map((item,index) => <Link key={item.slug} to={`/insurance/${item.slug}`} className="motion-reveal"><span>0{index+1}</span><strong>{item.name}</strong><small>{item.zips.join(" · ")}</small><ArrowRight size={16}/></Link>)}</div></div></section>

      <QuoteBand title={`Talk with a local broker serving ${city.name}.`} text="Bring any current declarations page, renewal, lender request, contract, or DMV notice. We’ll help identify the next useful step." />
    </main>
  );
}
