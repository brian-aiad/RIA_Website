import { useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Car,
  Check,
  FileCheck2,
  Home as HomeIcon,
  Languages,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { AtlasButton, AtlasImage, QuoteBand } from "../components/AtlasUI";
import LocalBusinessSchema from "../components/seo/LocalBusinessSchema";
import FAQSchema from "../components/seo/FAQSchema";
import { coverageEntries } from "../data/atlas";
import { openQuoteModal } from "../lib/openQuote";
import { usePageMeta } from "../lib/seo";
import { site } from "../lib/site";

const homeFaqs = [
  { question: "Why work with an independent insurance agency?", answer: "An independent agency can review available programs from more than one carrier. Eligibility and availability vary, but the conversation is not limited to a single company’s product menu." },
  { question: "Which kinds of insurance does Rafla offer?", answer: "We help with auto, homeowners, renters, commercial auto, general liability, workers’ compensation, bonds, motorcycle, RV, boat, SR-22 filing support, and other specialty situations. Health, life, and notary services are not currently offered." },
  { question: "Can I visit the office?", answer: "Yes. Rafla Insurance Agency is at 12240 Venice Boulevard, Suite 2, Los Angeles, CA 90066. Office hours are Monday through Friday 10am–7pm and Saturday 10am–3pm." },
  { question: "What should I bring for a quote?", answer: "The useful details depend on the coverage. A current declarations page, driver and vehicle information, property details, or business payroll and operations information can make the review more precise." },
];

const localAreas = [
  { slug: "mar-vista", name: "Mar Vista" },
  { slug: "palms", name: "Palms" },
  { slug: "culver-city", name: "Culver City" },
  { slug: "venice", name: "Venice" },
  { slug: "marina-del-rey", name: "Marina del Rey" },
  { slug: "santa-monica", name: "Santa Monica" },
  { slug: "west-los-angeles", name: "West Los Angeles" },
  { slug: "sawtelle", name: "Sawtelle" },
  { slug: "playa-vista", name: "Playa Vista" },
  { slug: "westchester", name: "Westchester" },
  { slug: "inglewood", name: "Inglewood" },
  { slug: "ladera-heights", name: "Ladera Heights" },
];

const serviceMarks = [
  { label: "Auto", icon: Car, href: "/auto-insurance-los-angeles-ca" },
  { label: "Home", icon: HomeIcon, href: "/home-insurance-los-angeles-ca" },
  { label: "Commercial", icon: Building2, href: "/commercial-auto-insurance-los-angeles" },
  { label: "Workers’ comp", icon: BriefcaseBusiness, href: "/services#work" },
  { label: "Bonds & filings", icon: FileCheck2, href: "/sr22-insurance-los-angeles" },
];

export default function Home() {
  const [activeCoverage, setActiveCoverage] = useState(coverageEntries[0]);

  usePageMeta({
    title: "Rafla Insurance Agency | Independent Broker in Mar Vista, Los Angeles",
    description: "Independent insurance broker on Venice Boulevard in Mar Vista for auto, home, renters, commercial, workers’ compensation, bonds, SR-22 and specialty coverage.",
    canonical: "https://raflainsurance.com/",
  });

  return (
    <main id="main-content" className="atlas-page ria-home">
      <LocalBusinessSchema url="https://raflainsurance.com/" areaServed={["Mar Vista", "Los Angeles Westside", "Los Angeles, CA"]} />
      <FAQSchema questions={homeFaqs.map((faq) => ({ q: faq.question, a: faq.answer }))} />

      <section className="ria-hero">
        <div className="atlas-container ria-hero__grid">
          <div className="ria-hero__copy hero-copy-enter">
            <p className="ria-kicker">Personal &amp; commercial insurance · Los Angeles</p>
            <h1>Insurance,<br />handled personally.</h1>
            <p className="ria-hero__lede">Rafla is the independent insurance office on Venice Boulevard. We help local drivers, households, and businesses make sense of coverage—and stay available when questions come up.</p>
            <div className="ria-hero__actions">
              <AtlasButton tone="gold" onClick={openQuoteModal}>Get an insurance quote</AtlasButton>
              <a href={site.contact.phoneHref}><Phone size={17} /> Call {site.contact.phone}</a>
            </div>
            <dl className="ria-hero__details">
              <div><dt>Office</dt><dd>Mar Vista · 90066</dd></div>
              <div><dt>Languages</dt><dd>English · Spanish · Arabic</dd></div>
              <div><dt>CA agency license</dt><dd>0D95584</dd></div>
            </dl>
          </div>

          <figure className="ria-hero__office atlas-parallax">
            <AtlasImage src="/images/agency/office-venice-v2.webp" alt="Rafla Insurance Agency office building at 12240 Venice Boulevard" width="924" height="1703" sizes="(max-width: 900px) 100vw, 45vw" fetchPriority="high" />
            <figcaption>
              <MapPin size={18} />
              <span><strong>Visit our Mar Vista office</strong>12240 Venice Blvd, Suite 2</span>
              <a href={site.contact.mapsHref} target="_blank" rel="noreferrer" aria-label="Get directions to Rafla Insurance Agency"><ArrowRight size={18} /></a>
            </figcaption>
          </figure>
        </div>
      </section>

      <nav className="ria-service-strip" aria-label="Popular insurance services">
        <div className="atlas-container">
          {serviceMarks.map(({ label, icon: Icon, href }) => (
            <Link to={href} key={label}><Icon aria-hidden="true" /><span>{label}</span><ArrowRight aria-hidden="true" /></Link>
          ))}
        </div>
      </nav>

      <section className="ria-coverage" id="coverage-options">
        <div className="atlas-container">
          <header className="ria-section-heading motion-reveal">
            <p className="ria-kicker">What can we help protect?</p>
            <h2>Start with what matters to you.</h2>
            <p>Choose a category. We’ll explain the limits, deductibles, exclusions, and carrier options that apply to your actual situation.</p>
          </header>

          <div className="ria-coverage__chooser motion-reveal">
            <div className="ria-coverage__tabs" role="tablist" aria-label="Insurance categories">
              {coverageEntries.map((entry) => {
                const Icon = entry.icon;
                const selected = entry.key === activeCoverage.key;
                return (
                  <button key={entry.key} type="button" role="tab" aria-selected={selected} onClick={() => setActiveCoverage(entry)}>
                    <Icon aria-hidden="true" /><span><strong>{entry.title}</strong><small>{entry.short}</small></span><ArrowRight aria-hidden="true" />
                  </button>
                );
              })}
            </div>

            <article className="ria-coverage__panel" role="tabpanel">
              <AtlasImage key={activeCoverage.image} src={activeCoverage.image} alt={activeCoverage.imageAlt} width="1536" height="1024" sizes="(max-width: 900px) 100vw, 52vw" />
              <div>
                <p>Rafla Insurance Agency</p>
                <h3>{activeCoverage.title}</h3>
                <span>{activeCoverage.short}</span>
                <Link to={activeCoverage.href}>Learn about this coverage <ArrowRight size={17} /></Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="ria-review">
        <div className="atlas-container ria-review__grid">
          <div className="ria-review__image motion-reveal">
            <AtlasImage src="/images/agency/policy-desk-v2.webp" alt="Policy documents, vehicle keys, and notes arranged for an insurance review" width="1536" height="1024" loading="lazy" />
          </div>
          <div className="ria-review__copy motion-reveal">
            <p className="ria-kicker">A broker conversation, not a checkout screen</p>
            <h2>Bring us the real details.</h2>
            <p>A renewal notice. A first employee. A new driver. A lender deadline. A business vehicle that now carries tools. Those details are where useful insurance work begins.</p>
            <ul>
              <li><Check size={18} /><span><strong>We listen first.</strong> Tell us what changed and what you are trying to protect.</span></li>
              <li><Check size={18} /><span><strong>We compare the substance.</strong> Limits, deductibles, exclusions, carrier rules, and price all matter.</span></li>
              <li><Check size={18} /><span><strong>You make the decision.</strong> We explain the options and help with the paperwork that follows.</span></li>
            </ul>
            <AtlasButton to="/about" tone="line">How Rafla works</AtlasButton>
          </div>
        </div>
      </section>

      <section className="ria-editorial">
        <div className="atlas-container">
          <header className="ria-section-heading motion-reveal">
            <p className="ria-kicker">Personal lines &amp; business lines</p>
            <h2>Coverage for the way the Westside lives and works.</h2>
          </header>
          <div className="ria-editorial__grid">
            <Link to="/auto-insurance-los-angeles-ca" className="ria-story motion-reveal">
              <AtlasImage src="/images/agency/auto-home-v2.webp" alt="Everyday car and bungalow on a Westside Los Angeles driveway" width="1536" height="1024" loading="lazy" />
              <div><span>For households</span><h3>Cars, homes, rentals, and the belongings in between.</h3><p>Auto · Homeowners · Renters · Condo · Landlord · Umbrella</p><b>View personal insurance <ArrowRight size={16} /></b></div>
            </Link>
            <Link to="/commercial-auto-insurance-los-angeles" className="ria-story motion-reveal">
              <AtlasImage src="/images/agency/small-business-v2.webp" alt="A Westside small-business owner opening a storefront beside a work van" width="1536" height="1024" loading="lazy" />
              <div><span>For businesses</span><h3>Protection for the work, vehicles, people, and contracts.</h3><p>Commercial auto · General liability · Workers’ comp · Property · Bonds</p><b>View business insurance <ArrowRight size={16} /></b></div>
            </Link>
          </div>
        </div>
      </section>

      <section className="ria-local">
        <div className="atlas-container ria-local__grid">
          <div className="ria-local__copy motion-reveal">
            <p className="ria-kicker">A neighborhood office</p>
            <h2>On Venice Boulevard,<br />close to the communities we serve.</h2>
            <p>Visit the office in Mar Vista or call from anywhere in the surrounding Los Angeles area. We regularly help clients across the Westside and nearby communities.</p>
            <div className="ria-local__areas">{localAreas.map((area) => <Link key={area.slug} to={`/insurance/${area.slug}`}>{area.name}</Link>)}</div>
            <div className="ria-local__actions"><AtlasButton to="/locations" tone="paper">See service areas</AtlasButton><a href={site.contact.mapsHref} target="_blank" rel="noreferrer">Get directions <ArrowRight size={16} /></a></div>
          </div>
          <div className="ria-local__facts motion-reveal">
            <div><MapPin /><span><small>Address</small><strong>12240 Venice Blvd, Suite 2<br />Los Angeles, CA 90066</strong></span></div>
            <div><Phone /><span><small>Office</small><strong>{site.contact.phone}</strong></span></div>
            <div><Languages /><span><small>Languages</small><strong>English · Spanish · Arabic</strong></span></div>
            <div><ShieldCheck /><span><small>California agency</small><strong>License 0D95584</strong></span></div>
          </div>
        </div>
      </section>

      <section className="ria-faq">
        <div className="atlas-container ria-faq__grid">
          <header className="motion-reveal"><p className="ria-kicker">Straight answers</p><h2>Common questions before you call.</h2><p>No generic promises—just a useful starting point for the conversation.</p><Link to="/faq">Read all FAQs <ArrowRight size={16} /></Link></header>
          <div>
            {homeFaqs.map((faq, index) => (
              <details key={faq.question} className="answer-drawer motion-reveal" open={index === 0}>
                <summary>{faq.question}<i aria-hidden="true" /></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <QuoteBand title="Tell us what needs protecting." text="Call the office or start with a few details online. A local broker will take it from there." />
    </main>
  );
}
