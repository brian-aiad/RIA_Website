import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Bike, Building2, Car, FileText, Home, ShieldCheck } from "lucide-react";
import PageHero from "../components/PageHero";
import InsuranceWorkflow from "../components/InsuranceWorkflow";
import LocalBusinessSchema from "../components/seo/LocalBusinessSchema";
import StatsBar from "../components/StatsBar";
import { Reveal } from "../components/AnimatedSection";
import { CTASection, Section, SectionHeader } from "../design-system";
import { site } from "../lib/site";
import { usePageMeta } from "../lib/seo";
import { openQuoteModal } from "../lib/openQuote";
import { images } from "../lib/images";

type CityInfo = { slug: string; name: string; blurb: string; distance: string; zips: string[] };

const CITIES: CityInfo[] = [
  { slug: "mar-vista", name: "Mar Vista", blurb: "Our home neighborhood. Visit our Venice Boulevard office for personal and commercial insurance help in English, Spanish, or Arabic.", distance: "local to our office — walk-ins welcome", zips: ["90066"] },
  { slug: "culver-city", name: "Culver City", blurb: "Nearby residents and businesses can compare auto, home, renters, liability, and commercial coverage with a local independent agency.", distance: "a short drive from our office", zips: ["90230", "90232"] },
  { slug: "santa-monica", name: "Santa Monica", blurb: "We help drivers, renters, property owners, and small businesses review coverage without being limited to a single carrier.", distance: "west of our office via Venice or Pico Boulevard", zips: ["90401", "90402", "90403", "90404", "90405"] },
  { slug: "venice", name: "Venice", blurb: "Venice residents come to us for auto, renters, homeowners, motorcycle, and small-business insurance support close to home.", distance: "west of our office along Venice Boulevard", zips: ["90291"] },
  { slug: "marina-del-rey", name: "Marina del Rey", blurb: "From daily drivers to watercraft and rental properties, local clients can bring several coverage needs into one conversation.", distance: "southwest of our Mar Vista office", zips: ["90292"] },
  { slug: "west-los-angeles", name: "West Los Angeles", blurb: "We serve West Los Angeles households and businesses with guidance across auto, property, commercial, and specialty coverage.", distance: "north of our office via the 405 or local streets", zips: ["90025", "90064"] },
  { slug: "palms", name: "Palms", blurb: "Palms residents, renters, drivers, and neighborhood businesses can work with a nearby independent agency for personal and commercial coverage.", distance: "just east of our office along Venice Boulevard", zips: ["90034"] },
  { slug: "sawtelle", name: "Sawtelle", blurb: "We help Sawtelle households and small businesses compare auto, renters, property, liability, and specialty insurance options.", distance: "northwest of our office via local Westside streets", zips: ["90025"] },
  { slug: "playa-vista", name: "Playa Vista", blurb: "Renters, condo owners, drivers, and growing businesses can compare protection for both personal and professional risks.", distance: "south of our office near the 405", zips: ["90094"] },
  { slug: "westchester", name: "Westchester", blurb: "Families, landlords, and local businesses can review personal and commercial insurance with a nearby independent broker.", distance: "south of our office toward LAX", zips: ["90045"] },
  { slug: "inglewood", name: "Inglewood", blurb: "We help drivers, property owners, contractors, and small businesses compare coverage and understand their options.", distance: "southeast of our office via the 405", zips: ["90301", "90302", "90303", "90304", "90305"] },
  { slug: "ladera-heights", name: "Ladera Heights", blurb: "Ladera Heights homeowners, drivers, landlords, and professionals can review personal and business protection with a local broker.", distance: "southeast of our office via Culver Boulevard", zips: ["90056"] },
];

const CITY_MAP = Object.fromEntries(CITIES.map((city) => [city.slug, city])) as Record<string, CityInfo>;
const COVERAGE_LINES = [
  { title: "Auto Insurance", desc: "Liability, full coverage, SR-22, and specialty programs.", Icon: Car },
  { title: "Home & Renters", desc: "Homeowners, condo, landlord, and renters coverage.", Icon: Home },
  { title: "Workers’ Compensation", desc: "Coverage that helps protect employees and your business.", Icon: ShieldCheck },
  { title: "Commercial Insurance", desc: "General liability, BOP, commercial auto, and bonds.", Icon: Building2 },
  { title: "Motorcycle, RV & Boat", desc: "Coverage for riders, recreational vehicles, and watercraft.", Icon: Bike },
  { title: "SR-22 Filing", desc: "Help with California SR-22 insurance and filing requirements.", Icon: FileText },
];

function cityHeroImage(slug: string) {
  if (slug === "mar-vista") return images.hero.storefront;
  if (["venice", "marina-del-rey", "santa-monica"].includes(slug)) return images.city.coastal;
  if (["culver-city", "palms", "sawtelle", "west-los-angeles"].includes(slug)) return images.city.palmsCulver;
  if (["playa-vista", "westchester", "inglewood", "ladera-heights"].includes(slug)) return images.city.southWestside;
  return images.city.westside;
}

export default function CityLanding() {
  const { citySlug } = useParams<{ citySlug: string }>();
  const city = citySlug ? CITY_MAP[citySlug] : undefined;
  const canonical = city ? `https://raflainsurance.com/insurance/${city.slug}` : "https://raflainsurance.com/404";

  usePageMeta({
    title: city ? `Insurance Broker in ${city.name}, CA | Rafla Insurance` : "Page Not Found | Rafla Insurance",
    description: city ? `Personal and commercial insurance for ${city.name}, CA. Auto, home, renters, business, workers' compensation, bonds, SR-22, motorcycle and specialty coverage.` : "The requested page could not be found.",
    canonical,
  });

  useEffect(() => {
    if (!city) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://raflainsurance.com/" },
        { "@type": "ListItem", position: 2, name: "Service Area", item: "https://raflainsurance.com/locations" },
        { "@type": "ListItem", position: 3, name: city.name, item: canonical },
      ],
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, [canonical, city]);

  if (!city) return <Navigate to="/404" replace />;
  const nearby = CITIES.filter((item) => item.slug !== city.slug).slice(0, 8);

  return (
    <main id="main-content">
      <LocalBusinessSchema url={canonical} areaServed={[`${city.name}, CA`, "Los Angeles, CA"]} />
      <PageHero
        title={`Insurance broker serving ${city.name}`}
        subtitle="Personal attention, independent carrier access, and clear help from quote through renewal."
        breadcrumb={city.name}
        backgroundImage={cityHeroImage(city.slug)}
        imageFilter="contrast(1.06) saturate(0.96) brightness(0.9)"
      >
        <div className="flex flex-wrap gap-3">
          <button onClick={openQuoteModal} className="btn btn-accent">Start a Quote</button>
          <a href={site.contact.phoneHref} className="btn btn-ghost-light">Call {site.contact.phone}</a>
        </div>
      </PageHero>

      <StatsBar />

      <Section tone="light">
        <div className="container max-w-4xl">
          <Reveal>
            <span className="eyebrow">Local service area</span>
            <h2 className="mt-3 display-2 text-slate-900">Coverage for {city.name} households and businesses</h2>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">{city.blurb}</p>
            <p className="mt-4 text-slate-500 leading-relaxed">Our Mar Vista office is {city.distance}. Call, email, or stop by to discuss your current coverage, a new purchase, or a business insurance requirement.</p>
            <p className="mt-5 text-sm text-slate-500"><strong className="text-slate-700">ZIP codes served:</strong> {city.zips.join(", ")}</p>
          </Reveal>
        </div>
      </Section>

      <InsuranceWorkflow tone="offwhite" title={`How we quote ${city.name} coverage`} lede="Tell us what you need protected. We review the details, compare available programs, and explain the tradeoffs before you choose." />

      <Section tone="light">
        <div className="container">
          <SectionHeader eyebrow="Coverage" title={`Insurance options for ${city.name}`} align="center" className="mb-9" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {COVERAGE_LINES.map(({ title, desc, Icon }) => (
              <Reveal key={title}>
                <Link to="/services" className="block h-full bg-white rounded-2xl p-6 ring-1 ring-slate-200/80 shadow-soft hover:shadow-lifted hover:ring-brand-300 transition-all">
                  <div className="w-11 h-11 rounded-xl bg-brand-50 ring-1 ring-brand-100 grid place-items-center mb-4"><Icon className="w-5 h-5 text-brand-700" /></div>
                  <h3 className="font-bold text-slate-900">{title}</h3>
                  <p className="mt-1 text-sm text-slate-500 leading-relaxed">{desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="offwhite">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Nearby communities we serve</h2>
            <div className="flex flex-wrap gap-2">
              {nearby.map((item) => <Link key={item.slug} to={`/insurance/${item.slug}`} className="text-sm font-medium bg-white text-slate-700 rounded-lg px-3 py-2 ring-1 ring-slate-200 hover:ring-brand-300 hover:text-brand-700 transition-all">{item.name}</Link>)}
            </div>
          </Reveal>
        </div>
      </Section>

      <CTASection title={`Talk with a broker about ${city.name} coverage`} lede="Bring us the details and your current declarations page if you have one. We will help you understand the options." secondaryLabel={`Call ${site.contact.phone}`} />
    </main>
  );
}
