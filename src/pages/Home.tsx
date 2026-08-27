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
import BrokeragePath from "../components/BrokeragePath";
import CoverageDesk from "../components/CoverageDesk";
import CoverageLinework from "../components/CoverageLinework";
import PolicyReviewSheet from "../components/PolicyReviewSheet";
import WestsideMap from "../components/WestsideMap";
import LocalBusinessSchema from "../components/seo/LocalBusinessSchema";
import FAQSchema from "../components/seo/FAQSchema";
import { openQuoteModal } from "../lib/openQuote";
import { usePageMeta } from "../lib/seo";
import { site } from "../lib/site";
import { images } from "../lib/images";

const homeFaqs = [
  { question: "Why work with an independent insurance agency?", answer: "An independent agency can review available programs from more than one carrier. Eligibility and availability vary, but the conversation is not limited to a single company’s product menu." },
  { question: "Which kinds of insurance does Rafla offer?", answer: "We help with auto, homeowners, renters, commercial auto, general liability, workers’ compensation, bonds, motorcycle, RV, boat, SR-22 filing support, and other specialty situations. Health, life, and notary services are not currently offered." },
  { question: "Can I visit the office?", answer: "Yes. Rafla Insurance Agency is at 12240 Venice Boulevard, Suite 2, Los Angeles, CA 90066. Office hours are Monday through Friday 10am–7pm and Saturday 10am–3pm." },
  { question: "What should I bring for a quote?", answer: "The useful details depend on the coverage. A current declarations page, driver and vehicle information, property details, or business payroll and operations information can make the review more precise." },
];

const serviceMarks = [
  { label: "Auto", detail: "Personal & commercial", icon: Car, href: "/auto-insurance-los-angeles-ca" },
  { label: "Home", detail: "Owners & renters", icon: HomeIcon, href: "/home-insurance-los-angeles-ca" },
  { label: "Commercial", detail: "Liability & property", icon: Building2, href: "/commercial-auto-insurance-los-angeles" },
  { label: "Workers’ comp", detail: "Protect your team", icon: BriefcaseBusiness, href: "/services#work" },
  { label: "Bonds & filings", detail: "Special situations", icon: FileCheck2, href: "/sr22-insurance-los-angeles" },
];

export default function Home() {
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
            <p className="ria-kicker">Independent insurance agency · Mar Vista</p>
            <h1>Coverage for Los Angeles, <span>explained by a local broker.</span></h1>
            <p className="ria-hero__lede">Rafla is an independent agency—not an insurance company. We review available programs for auto, home, commercial, workers’ compensation, bonds, and specialty coverage from our Venice Boulevard office.</p>
            <div className="ria-hero__actions">
              <AtlasButton tone="navy" onClick={openQuoteModal}>Request a quote</AtlasButton>
              <a href={site.contact.phoneHref}><Phone size={17} /> {site.contact.phone}</a>
            </div>
            <dl className="ria-hero__details">
              <div><dt>Office</dt><dd>12240 Venice Blvd, Suite 2</dd></div>
              <div><dt>Languages</dt><dd>English · Spanish · Arabic</dd></div>
              <div><dt>License</dt><dd>CA agency 0D95584</dd></div>
            </dl>
          </div>
          <figure className="ria-hero__office">
            <AtlasImage src={images.hero.people} alt="An independent insurance broker reviewing a policy folder with a Los Angeles couple" width="1536" height="1024" sizes="(max-width: 900px) 100vw, 52vw" fetchPriority="high" />
            <figcaption><span>Independent guidance</span><strong>A conversation before a recommendation.</strong><small>Personal & commercial insurance</small></figcaption>
            <div className="ria-hero__office-proof">
              <AtlasImage src="/images/brand/office-venice-thumb-v3.webp" alt="Rafla Insurance Agency on Venice Boulevard" width="320" height="240" />
              <span><small>Actual office</small><strong>12240 Venice Blvd · Mar Vista</strong></span>
            </div>
            <div className="ria-hero__address" aria-hidden="true">12240</div>
          </figure>
        </div>
      </section>

      <nav className="ria-service-strip" aria-label="Popular insurance services">
        <div className="atlas-container">
          {serviceMarks.map(({ label, detail, icon: Icon, href }) => (
            <Link to={href} key={label}><Icon aria-hidden="true" /><span><strong>{label}</strong><small>{detail}</small></span><ArrowRight aria-hidden="true" /></Link>
          ))}
        </div>
      </nav>

      <BrokeragePath />

      <section className="ria-coverage" id="coverage-options">
        <div className="atlas-container">
          <header className="ria-section-heading motion-reveal">
            <p className="ria-kicker">Coverage index</p>
            <h2>Start with what changed.</h2>
            <p>A new car. A renewal increase. A first employee. A lender deadline. Choose the closest file and we’ll sort through the details with you.</p>
          </header>

          <CoverageDesk />
        </div>
      </section>

      <section className="ria-review">
        <div className="atlas-container ria-review__grid">
          <div className="ria-review__image motion-reveal">
            <PolicyReviewSheet />
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
            <p className="ria-kicker">Personal and commercial</p>
            <h2>The policies connect because real life does.</h2>
          </header>
          <div className="ria-editorial__grid">
            <Link to="/auto-insurance-los-angeles-ca" className="ria-story motion-reveal">
              <AtlasImage className="ria-story__photo" src={images.home.household} alt="A Westside Los Angeles family loading groceries and a child’s bicycle beside their car" width="1536" height="1024" loading="lazy" />
              <CoverageLinework className="ria-story__drawing" variant="home" />
              <div><span>For households</span><h3>Cars, homes, rentals, and the belongings in between.</h3><p>Auto · Homeowners · Renters · Condo · Landlord · Umbrella</p><b>View personal insurance <ArrowRight size={16} /></b></div>
            </Link>
            <Link to="/commercial-auto-insurance-los-angeles" className="ria-story motion-reveal">
              <AtlasImage className="ria-story__photo" src={images.home.business} alt="A Westside small-business crew loading tools into a work van outside their shop" width="1536" height="1024" loading="lazy" />
              <CoverageLinework className="ria-story__drawing" variant="commercial" />
              <div><span>For businesses</span><h3>Protection for the work, vehicles, people, and contracts.</h3><p>Commercial auto · General liability · Workers’ comp · Property · Bonds</p><b>View business insurance <ArrowRight size={16} /></b></div>
            </Link>
          </div>
        </div>
      </section>

      <section className="ria-local">
        <AtlasImage className="ria-local__backdrop" src={images.hero.storefront} alt="" aria-hidden="true" width="924" height="1365" loading="lazy" />
        <div className="ria-local__veil" aria-hidden="true" />
        <div className="atlas-container ria-local__grid">
          <div className="ria-local__copy motion-reveal">
            <p className="ria-kicker">A neighborhood office</p>
            <h2>On Venice Boulevard,<br />close to the communities we serve.</h2>
            <p>Visit the office in Mar Vista or call from anywhere in the surrounding Los Angeles area. We regularly help clients across the Westside and nearby communities.</p>
            <WestsideMap />
            <div className="ria-local__actions"><AtlasButton to="/locations" tone="paper">See service areas</AtlasButton><a href={site.contact.mapsHref} target="_blank" rel="noreferrer">Get directions <ArrowRight size={16} /></a></div>
          </div>
          <div className="ria-local__portfolio motion-reveal">
            <figure className="ria-local__office-photo">
              <AtlasImage src="/images/agency/office-venice-v2.webp" alt="Rafla Insurance Agency office at 12240 Venice Boulevard" width="924" height="1365" loading="lazy" sizes="(max-width: 900px) 75vw, 30vw" />
              <figcaption><MapPin size={16} /> Actual Mar Vista office</figcaption>
            </figure>
            <div className="ria-local__facts">
              <div><MapPin /><span><small>Address</small><strong>12240 Venice Blvd, Suite 2<br />Los Angeles, CA 90066</strong></span></div>
              <div><Phone /><span><small>Office</small><strong>{site.contact.phone}</strong></span></div>
              <div><Languages /><span><small>Languages</small><strong>English · Spanish · Arabic</strong></span></div>
              <div><ShieldCheck /><span><small>California agency</small><strong>License 0D95584</strong></span></div>
            </div>
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
