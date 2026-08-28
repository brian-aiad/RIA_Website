import { ArrowRight, Building2, Car, FileCheck2, Home, MapPin, Phone } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { AtlasButton, AtlasEyebrow, DossierHeader, FactRail, QuoteBand } from "../components/AtlasUI";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import LocalBusinessSchema from "../components/seo/LocalBusinessSchema";
import { cities, cityMap } from "../data/atlas";
import { openQuoteModal } from "../lib/openQuote";
import { usePageMeta } from "../lib/seo";
import { site } from "../lib/site";

const groupCopy = {
  home: "Part of Rafla’s immediate Westside network around the Venice Boulevard office, where residential, renter, driver, and small-business needs often overlap.",
  coast: "Coastal households and businesses can bring auto, renters, property, liability, commercial, motorcycle, boat, and specialty questions into one independent review.",
  north: "Drivers, renters, property owners, professionals, and local businesses can work with a nearby independent broker instead of navigating separate carrier menus alone.",
  south: "Households, landlords, contractors, drivers, and growing businesses can review personal and commercial needs with Rafla’s local Mar Vista team.",
};

const coverageLinks = [
  { label: "Auto & drivers", text: "Liability, physical damage, SR-22, and specialty situations.", href: "/auto-insurance-los-angeles-ca", icon: Car },
  { label: "Home & renters", text: "Homeowners, renters, condo, landlord, and liability.", href: "/home-insurance-los-angeles-ca", icon: Home },
  { label: "Business", text: "Commercial auto, general liability, workers’ comp, and bonds.", href: "/commercial-auto-insurance-los-angeles", icon: Building2 },
  { label: "Filings", text: "SR-22 filing support and document-first reviews.", href: "/sr22-insurance-los-angeles", icon: FileCheck2 },
];

export default function CityLanding() {
  const { citySlug } = useParams<{ citySlug: string }>();
  const city = citySlug ? cityMap[citySlug] : undefined;
  const canonical = city ? `https://raflainsurance.com/insurance/${city.slug}` : "https://raflainsurance.com/404";
  usePageMeta({ title: city ? `Insurance Broker Serving ${city.name}, CA | Rafla Insurance` : "Page Not Found | Rafla Insurance", description: city ? `Independent insurance broker serving ${city.name}, CA for auto, home, renters, business, workers’ compensation, SR-22 and specialty coverage.` : "The requested page could not be found.", canonical });
  if (!city) return <Navigate to="/404" replace />;

  const nearby = cities.filter((item) => item.slug !== city.slug && (item.group === city.group || item.group === "home")).slice(0, 6);
  return (
    <main id="main-content" className="atlas-page city-file">
      <LocalBusinessSchema url={canonical} areaServed={[`${city.name}, CA`, "Los Angeles, CA"]} />
      <BreadcrumbSchema crumbs={[{name:"Home",url:"https://raflainsurance.com/"},{name:"Service areas",url:"https://raflainsurance.com/locations"},{name:city.name,url:canonical}]} />
      <DossierHeader index={city.zips[0]} eyebrow={`Insurance near ${city.name}`} title={`A local insurance broker serving ${city.name}.`} lede={`${city.note} Get independent personal and commercial guidance from Rafla’s Venice Boulevard office.`} image="/images/illustrated/office-venice-illustrated-v6.webp" imageAlt="Illustration of Rafla Insurance Agency's Venice Boulevard neighborhood office">
        <AtlasButton tone="navy" onClick={openQuoteModal}>Request a {city.name} quote</AtlasButton><a className="coverage-brief__call" href={site.contact.phoneHref}><Phone size={15}/>{site.contact.phone}</a>
      </DossierHeader>

      <div className="atlas-container"><FactRail facts={[{label:"Community",value:city.name},{label:"ZIP codes",value:city.zips.join(" · ")},{label:"Agency office",value:"Mar Vista / 90066"},{label:"Languages",value:"English · Spanish · Arabic"}]} /></div>

      <section className="city-orientation"><div className="atlas-container city-orientation__grid">
        <div className="city-orientation__title motion-reveal"><AtlasEyebrow>Local, personal guidance</AtlasEyebrow><h2>Your needs matter more than your ZIP code.</h2></div>
        <div className="city-orientation__copy motion-reveal"><p>{groupCopy[city.group]}</p><p>Two neighbors may need different carriers, limits, or policy structures. Vehicles, property, occupants, operations, payroll, contracts, claims, and filing history all shape the right conversation.</p></div>
        <aside className="city-orientation__office motion-reveal"><MapPin/><span>Rafla office</span><strong>{site.contact.address}</strong><a href={site.contact.mapsHref} target="_blank" rel="noreferrer">Directions <ArrowRight size={14}/></a></aside>
      </div></section>

      <section className="city-coverage"><div className="atlas-container"><div className="city-coverage__heading motion-reveal"><AtlasEyebrow light>Insurance options for {city.name}</AtlasEyebrow><h2>Explore popular coverage.</h2></div><div className="city-coverage__grid">{coverageLinks.map(({label,text,href,icon:Icon},index) => <Link key={href} to={href} className="motion-reveal"><span>0{index+1}</span><Icon/><h3>{label}</h3><p>{text}</p><ArrowRight/></Link>)}</div></div></section>

      <section className="nearby-files"><div className="atlas-container nearby-files__grid"><div className="motion-reveal"><AtlasEyebrow>Nearby communities</AtlasEyebrow><h2>Insurance help throughout the Westside.</h2></div><div>{nearby.map((item,index) => <Link key={item.slug} to={`/insurance/${item.slug}`} className="motion-reveal"><span>0{index+1}</span><strong>{item.name}</strong><small>{item.zips.join(" · ")}</small><ArrowRight size={16}/></Link>)}</div></div></section>

      <QuoteBand title={`Talk with a local broker serving ${city.name}.`} text="Bring any current declarations page, renewal, lender request, contract, or DMV notice. We’ll help identify the next useful step." />
    </main>
  );
}
