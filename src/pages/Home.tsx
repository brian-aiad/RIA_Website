import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Car,
  ExternalLink,
  FileCheck2,
  Home as HomeIcon,
  Languages,
  MapPin,
  MessageSquareText,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { AtlasButton, AtlasImage, QuoteBand, SectionFolio } from "../components/AtlasUI";
import BrokerServiceDesk from "../components/BrokerServiceDesk";
import CoverageLinework from "../components/CoverageLinework";
import LocalBusinessSchema from "../components/seo/LocalBusinessSchema";
import FAQSchema from "../components/seo/FAQSchema";
import { usePageMeta } from "../lib/seo";
import { site } from "../lib/site";
import { images } from "../lib/images";

const homeFaqs = [
  { question: "Why work with an independent insurance agency?", answer: "An independent agency can review available programs from more than one carrier. Eligibility and availability vary, but the conversation is not limited to a single company’s product menu." },
  { question: "Which kinds of insurance does Rafla offer?", answer: "We help with auto, homeowners, renters, commercial auto, general liability, workers’ compensation, bonds, motorcycle, RV, boat, SR-22 filing support, and other specialty situations. Health, life, and notary services are not currently offered." },
  { question: "Can I visit the office?", answer: "Yes. Rafla Insurance Agency is at 12240 Venice Boulevard, Suite 2, Los Angeles, CA 90066. Office hours are Monday through Friday from 10am to 5pm. Saturday and Sunday are closed." },
  { question: "What should I bring for a quote?", answer: "The useful details depend on the coverage. A current declarations page, driver and vehicle information, property details, or business payroll and operations information can make the review more precise." },
];

const serviceMarks = [
  { label: "Auto", detail: "Personal & commercial", icon: Car, href: "/auto-insurance-los-angeles-ca" },
  { label: "Home", detail: "Owners & renters", icon: HomeIcon, href: "/home-insurance-los-angeles-ca" },
  { label: "Business", detail: "Liability & property", icon: Building2, href: "/services#work" },
  { label: "Workers’ comp", detail: "Protect your team", icon: BriefcaseBusiness, href: "/services#work" },
  { label: "SR-22 filing", detail: "Proof certificate", icon: FileCheck2, href: "/sr22-insurance-los-angeles" },
];

export default function Home() {
  usePageMeta({
    title: "Rafla Insurance Agency | Independent Broker in Mar Vista, Los Angeles",
    description: "Independent insurance broker on Venice Boulevard in Mar Vista for auto, home, renters, commercial, workers’ compensation, bonds, SR-22 and specialty coverage.",
    canonical: "https://www.raflainsurance.com/",
  });

  return (
    <main id="main-content" className="atlas-page ria-home">
      <LocalBusinessSchema url="https://www.raflainsurance.com/" areaServed={["Mar Vista", "Los Angeles Westside", "Los Angeles, CA"]} />
      <FAQSchema questions={homeFaqs.map((faq) => ({ q: faq.question, a: faq.answer }))} />

      <section className="ria-hero">
        <div className="atlas-container ria-hero__grid">
          <div className="ria-hero__copy hero-copy-enter">
            <p className="ria-kicker">Independent insurance agency · Mar Vista · Since 2003</p>
            <h1>Insurance for Los Angeles, <span>explained by a local broker.</span></h1>
            <p className="ria-hero__lede">Rafla is an independent agency—not an insurance company. We review available programs for auto, home, commercial, workers’ compensation, bonds, and specialty coverage from our Venice Boulevard office.</p>
            <div className="ria-hero__actions">
              <AtlasButton tone="navy" to="/contact#quote-request">Get a quote</AtlasButton>
              <a href={site.contact.phoneHref} aria-label={`Call Rafla Insurance Agency at ${site.contact.phone}`}><Phone size={17} /><span>Call agency</span></a>
              <a href={site.contact.textHref} aria-label={`Text Ash at ${site.contact.text}`}><MessageSquareText size={17} /><span>Text Ash <small>{site.contact.text}</small></span></a>
              <a href={site.contact.mapsHref} target="_blank" rel="noopener noreferrer"><MapPin size={17} /><span>Directions</span></a>
            </div>
            <dl className="ria-hero__details">
              <div><dt>Office</dt><dd>12240 Venice Blvd, Suite 2</dd></div>
              <div><dt>Languages</dt><dd>English · Spanish · Arabic</dd></div>
              <div><dt>License</dt><dd>CA agency 0D95584</dd></div>
            </dl>
          </div>
          <figure className="ria-hero__office">
            <AtlasImage src={images.hero.desk} alt="A quiet Los Angeles streetscape with a small commercial building and neighborhood homes" width="1536" height="1024" sizes="(max-width: 900px) 100vw, 52vw" fetchPriority="high" />
            <figcaption><span>Independent guidance</span><strong>Coverage starts with the details.</strong></figcaption>
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

      <section className="ria-editorial section-folio-host" id="coverage-options">
        <SectionFolio tone="paper">Households + business</SectionFolio>
        <div className="atlas-container">
          <header className="ria-section-heading motion-reveal">
            <p className="ria-kicker">Personal and commercial</p>
            <h2>For your household. For your business.</h2>
            <p>Explore personal and commercial coverage with one local agency.</p>
          </header>
          <div className="ria-editorial__grid">
            <Link to="/auto-insurance-los-angeles-ca" className="ria-story motion-reveal">
              <AtlasImage className="ria-story__photo" src={images.home.household} alt="A bungalow courtyard with a station wagon, bicycle, and native planting" width="1536" height="1024" loading="lazy" />
              <CoverageLinework className="ria-story__drawing" variant="home" />
              <div><span>For households</span><h3>Cars, homes, rentals, and the belongings in between.</h3><p>Auto · Homeowners · Renters · Condo · Landlord · Umbrella</p><b>View personal insurance <ArrowRight size={16} /></b></div>
            </Link>
            <Link to="/services#work" className="ria-story motion-reveal">
              <AtlasImage className="ria-story__photo" src={images.home.business} alt="A white commercial van parked outside a Los Angeles workshop" width="1536" height="1024" loading="lazy" />
              <CoverageLinework className="ria-story__drawing" variant="commercial" />
              <div><span>For businesses</span><h3>Protection for the work, vehicles, people, and contracts.</h3><p>Commercial auto · General liability · Workers’ comp · Property · Bonds</p><b>View business services <ArrowRight size={16} /></b></div>
            </Link>
          </div>
        </div>
      </section>

      <BrokerServiceDesk />

      <section className="ria-local ria-local--office section-folio-host">
        <SectionFolio tone="gold">Mar Vista / 90066</SectionFolio>
        <div className="atlas-container ria-local__grid">
          <div className="ria-local__copy motion-reveal">
            <p className="ria-kicker">Mar Vista · Los Angeles</p>
            <svg className="ria-local__streetmark" viewBox="0 0 320 74" aria-hidden="true">
              <path data-register-line="" d="M5 64V22L62 16V64M62 16V5L100 10V64M14 26H53V46H14ZM14 51H53V64M32 26V64M70 20H91M70 26H91M72 43H90V64M5 64H108" fill="none" stroke="currentColor" strokeWidth="1.3" />
              <path data-register-line="" d="M0 70H320" stroke="currentColor" strokeWidth="1" opacity=".4" />
              <text x="127" y="38" className="ria-local__streetnumber">12240</text>
              <text x="129" y="58" className="ria-local__streetname">VENICE BOULEVARD</text>
            </svg>
            <h2>Visit our Mar&nbsp;Vista office.</h2>
            <p>Find us on Venice Boulevard, near the communities we serve. Call ahead or stop by Monday–Friday, 10am–5pm.</p>
            <div className="ria-local__actions"><AtlasButton to="/locations" tone="paper">See service areas</AtlasButton><a href={site.contact.mapsHref} target="_blank" rel="noopener noreferrer">Get directions <ArrowRight size={16} /></a></div>
          </div>
          <div className="ria-local__portfolio motion-reveal">
            <figure className="ria-local__office-photo">
              <AtlasImage src="/images/client/rafla-office-front-720.webp" alt="Rafla Insurance Agency’s office building on Venice Boulevard" width="720" height="1043" loading="lazy" sizes="(max-width: 700px) 90vw, 45vw" />
              <figcaption><MapPin size={16} /> Venice Boulevard / Mar Vista</figcaption>
            </figure>
          </div>
            <div className="ria-local__facts motion-reveal">
              <div><MapPin /><span><small>Address</small><strong>12240 Venice Blvd, Suite 2<br />Los Angeles, CA 90066</strong></span></div>
              <div><Phone /><span><small>Office</small><a href={site.contact.phoneHref}>{site.contact.phone}</a></span></div>
              <div><Languages /><span><small>Languages</small><strong>English · Spanish · Arabic</strong></span></div>
              <div><ShieldCheck /><span><small>California agency</small><strong>License 0D95584</strong></span></div>
            </div>
        </div>
      </section>

      <section className="ria-reviews section-folio-host" aria-labelledby="reviews-title">
        <SectionFolio tone="paper">Google reviews</SectionFolio>
        <div className="atlas-container">
          <header className="ria-reviews__heading motion-reveal">
            <div>
              <p className="ria-kicker">Customer feedback</p>
              <h2 id="reviews-title">Known for patient explanations and personal service.</h2>
              <p>These comments come from Rafla Insurance Agency’s public Google Business Profile.</p>
            </div>
            <div className="ria-reviews__score" aria-label={`${site.reviews.rating} out of 5 stars from ${site.reviews.count} Google reviews`}>
              <strong>{site.reviews.rating}</strong>
              <span aria-hidden="true">{Array.from({ length: 5 }, (_, index) => <Star key={index} fill="currentColor" />)}</span>
              <small>{site.reviews.count} Google reviews</small>
              <a href={site.reviews.googleUrl} target="_blank" rel="noopener noreferrer">View Google profile <ExternalLink aria-hidden="true" /></a>
            </div>
          </header>

          <figure className="ria-award">
            <a className="ria-award__image" href={site.reviews.googleUrl} target="_blank" rel="noopener noreferrer" aria-label="BusinessRate 2026 award — visit Rafla’s Google reviews">
              <img src="/images/brand/businessrate-2026-640.webp" srcSet="/images/brand/businessrate-2026-320.webp 320w, /images/brand/businessrate-2026-640.webp 640w, /images/brand/businessrate-2026-960.webp 960w" sizes="(max-width: 620px) min(224px, calc(100vw - 86px)), 192px" alt="BusinessRate Ranked #1, 2026 Award Winner: Rafla Insurance Agency, Inc., Insurance Agency, Mar Vista, Los Angeles, CA" width="3000" height="3754" loading="lazy" decoding="async" />
            </a>
            <figcaption>
              <p className="ria-kicker">Local recognition</p>
              <h3>BusinessRate Ranked #1 Award Winner — 2026</h3>
              <p>Insurance Agency · Mar Vista, Los Angeles, CA</p>
              <a href={site.reviews.googleUrl} target="_blank" rel="noopener noreferrer">Read our Google reviews <ExternalLink size={16} aria-hidden="true" /></a>
            </figcaption>
          </figure>

          <p className="mobile-swipe-hint mobile-swipe-hint--reviews" aria-hidden="true"><span />Swipe to read customer comments</p>
          <div className="ria-reviews__ledger" role="region" aria-label="Selected customer reviews" aria-description="On narrow screens, scroll horizontally or use the Left and Right Arrow keys to browse reviews." tabIndex={0}>
            <span className="ria-reviews__register" aria-hidden="true" />
            {site.reviews.excerpts.map((review) => (
              <blockquote key={review.name} className="motion-reveal">
                <span aria-hidden="true">“</span>
                <p>{review.quote}</p>
                <footer><strong>{review.name}</strong><small>Public Google review</small></footer>
              </blockquote>
            ))}
          </div>
          <p className="ria-reviews__note">Selected public review excerpts from the agency’s Google profile, excerpted and lightly edited for length and clarity. Rating and review count can change as new reviews are posted. Individual experiences vary; reviews do not guarantee price, savings, eligibility, claim, or coverage outcomes.</p>
        </div>
      </section>

      <section className="ria-faq section-folio-host">
        <SectionFolio>Client questions</SectionFolio>
        <div className="atlas-container ria-faq__grid">
          <header className="motion-reveal"><p className="ria-kicker">Straight answers</p><h2>Common questions before you call.</h2><p>Start with the basics, then call with the document or details specific to you.</p><Link to="/faq">Read all FAQs <ArrowRight size={16} /></Link></header>
          <div>
            {homeFaqs.map((faq) => (
              <details key={faq.question} className="answer-drawer motion-reveal">
                <summary>{faq.question}<i aria-hidden="true" /></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <QuoteBand title="Tell us what needs protecting." text="Tell us what coverage you need. Send a short request, and the agency will follow up with you." />
    </main>
  );
}
