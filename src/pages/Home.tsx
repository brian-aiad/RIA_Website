import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Languages, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { AtlasButton, AtlasEyebrow, AtlasImage, FactRail, LocalOfficeCard, PaperNote, QuoteBand } from "../components/AtlasUI";
import LocalBusinessSchema from "../components/seo/LocalBusinessSchema";
import FAQSchema from "../components/seo/FAQSchema";
import { confidenceMarks, coverageEntries } from "../data/atlas";
import { openQuoteModal } from "../lib/openQuote";
import { usePageMeta } from "../lib/seo";
import { site } from "../lib/site";

const homeFaqs = [
  { question: "Why work with an independent insurance agency?", answer: "An independent agency can review available programs from more than one carrier. Eligibility and availability vary, but the conversation is not limited to a single company’s product menu." },
  { question: "Which kinds of insurance does Rafla offer?", answer: "We help with auto, homeowners, renters, commercial auto, general liability, workers’ compensation, bonds, motorcycle, RV, boat, SR-22 filing support, and other specialty situations. Health, life, and notary services are not currently offered." },
  { question: "Can I visit the office?", answer: "Yes. Rafla Insurance Agency is at 12240 Venice Boulevard, Suite 2, Los Angeles, CA 90066. Office hours are Monday through Friday 10am–7pm and Saturday 10am–3pm." },
  { question: "What should I bring for a quote?", answer: "The useful details depend on the policy. A current declarations page, driver and vehicle information, property details, or business payroll and operations information can make the review more precise." },
];

const homeServiceAreas = [
  { slug: "mar-vista", name: "Mar Vista" },
  { slug: "culver-city", name: "Culver City" },
  { slug: "santa-monica", name: "Santa Monica" },
  { slug: "venice", name: "Venice" },
  { slug: "marina-del-rey", name: "Marina del Rey" },
  { slug: "west-los-angeles", name: "West Los Angeles" },
  { slug: "palms", name: "Palms" },
  { slug: "sawtelle", name: "Sawtelle" },
  { slug: "playa-vista", name: "Playa Vista" },
  { slug: "westchester", name: "Westchester" },
  { slug: "inglewood", name: "Inglewood" },
  { slug: "ladera-heights", name: "Ladera Heights" },
];

export default function Home() {
  const [activeCoverage, setActiveCoverage] = useState(coverageEntries[0]);
  usePageMeta({
    title: "Rafla Insurance Agency | Independent Broker in Mar Vista, Los Angeles",
    description: "Independent insurance broker on Venice Boulevard in Mar Vista for auto, home, renters, commercial, workers’ compensation, bonds, SR-22 and specialty coverage.",
    canonical: "https://raflainsurance.com/",
  });

  return (
    <main id="main-content" className="atlas-page">
      <LocalBusinessSchema url="https://raflainsurance.com/" areaServed={["Mar Vista", "Los Angeles Westside", "Los Angeles, CA"]} />
      <FAQSchema questions={homeFaqs.map((faq) => ({ q: faq.question, a: faq.answer }))} />

      <section className="atlas-home-hero">
        <div className="atlas-container atlas-home-hero__grid">
          <div className="atlas-home-hero__copy hero-copy-enter">
            <AtlasEyebrow>Independent / Mar Vista / CA Lic. 0D95584</AtlasEyebrow>
            <h1>Insurance,<br /><span>made navigable.</span></h1>
            <p>Clear guidance for the things you drive, own, rent, and build—one local conversation at a time.</p>
            <div className="atlas-home-hero__actions">
              <AtlasButton tone="navy" onClick={openQuoteModal}>Build my quote</AtlasButton>
              <a href={site.contact.phoneHref} className="atlas-home-hero__phone"><Phone size={16} /> {site.contact.phone}</a>
            </div>
            <div className="atlas-home-hero__micro">
              <span><ShieldCheck size={15} /> Independent agency</span>
              <span><Languages size={15} /> English · Español · العربية</span>
            </div>
          </div>

          <div className="atlas-home-hero__visual atlas-parallax">
            <AtlasImage src="/images/atlas/coverage-desk.webp" alt="A broker’s coverage desk with a home model, car key, policy documents, and a gold route" width="1536" height="960" sizes="(max-width: 900px) 100vw, 55vw" fetchPriority="high" />
            <svg className="atlas-home-hero__orbit" viewBox="0 0 300 300" aria-hidden="true">
              <circle cx="150" cy="150" r="124" />
              <path d="M68 159a82 82 0 0 1 164 0" />
              <path d="M92 159a58 58 0 0 1 116 0" />
              <circle cx="150" cy="159" r="5" />
            </svg>
            <div className="atlas-home-hero__stamp" aria-hidden="true"><span>RIA</span><small>WESTSIDE<br />COVERAGE DESK</small></div>
            <div className="atlas-home-hero__coordinates"><MapPin size={14} /> 90066 / VENICE BLVD</div>
          </div>
        </div>
        <div className="atlas-home-hero__foot atlas-container">
          <a href="#coverage-index">Explore the coverage desk <ArrowDown size={15} /></a>
          <span>Personal + commercial insurance</span>
        </div>
      </section>

      <div className="brand-runner" aria-label="Agency services">
        <div>
          {["Auto insurance", "Home & renters", "Commercial coverage", "Workers’ compensation", "SR-22 filing", "Surety bonds", "Motorcycle · RV · boat"].map((item) => <span key={item}><i aria-hidden="true" />{item}</span>)}
          {["Auto insurance", "Home & renters", "Commercial coverage", "Workers’ compensation", "SR-22 filing", "Surety bonds", "Motorcycle · RV · boat"].map((item) => <span key={`copy-${item}`} aria-hidden="true"><i />{item}</span>)}
        </div>
      </div>

      <section id="coverage-index" className="coverage-register">
        <div className="atlas-container">
          <div className="coverage-register__heading motion-reveal">
            <AtlasEyebrow>Coverage register</AtlasEyebrow>
            <h2>Start with what<br />needs protecting.</h2>
            <p>No wall of interchangeable cards. Choose the situation that brought you here and open the relevant brief.</p>
          </div>
          <div className="coverage-register__body">
            <div className="coverage-register__list">
              {coverageEntries.map((entry) => {
                const Icon = entry.icon;
                return (
                  <Link key={entry.key} to={entry.href} onMouseEnter={() => setActiveCoverage(entry)} onFocus={() => setActiveCoverage(entry)} className={`coverage-row coverage-row--${entry.accent} ${activeCoverage.key === entry.key ? "is-active" : ""} motion-reveal`}>
                    <span className="coverage-row__number">{entry.number}</span>
                    <span className="coverage-row__icon"><Icon size={21} strokeWidth={1.8} /></span>
                    <span className="coverage-row__title">{entry.title}</span>
                    <span className="coverage-row__copy">{entry.short}</span>
                    <span className="coverage-row__arrow"><ArrowRight size={20} /></span>
                  </Link>
                );
              })}
            </div>
            <figure className="coverage-register__preview motion-reveal">
              <AtlasImage key={activeCoverage.image} src={activeCoverage.image} alt={activeCoverage.imageAlt} width="1536" height="1024" sizes="(max-width: 950px) 100vw, 45vw" />
              <figcaption><span>Selected brief / {activeCoverage.number}</span><strong>{activeCoverage.title}</strong><Link to={activeCoverage.href}>Open file <ArrowUpRight size={15} /></Link></figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="broker-method">
        <div className="route-rule" aria-hidden="true"><span className="route-draw" /></div>
        <div className="atlas-container broker-method__grid">
          <div className="broker-method__intro motion-reveal">
            <AtlasEyebrow light>The broker method</AtlasEyebrow>
            <h2>A route through the fine print.</h2>
            <p>Insurance decisions get easier when the process is visible. We turn the paperwork into three concrete conversations.</p>
            <LocalOfficeCard compact />
          </div>
          <ol className="broker-method__steps">
            {[
              ["01", "Bring the real details", "Your current declarations page, vehicle or property details, and the facts that make your situation different."],
              ["02", "Compare what changes", "We review available programs and explain limits, deductibles, exclusions, and price tradeoffs in plain language."],
              ["03", "Choose with context", "You decide. We help with the application, supporting documents, and the next step after binding."],
            ].map(([number, title, text]) => (
              <li key={number} className="motion-reveal"><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><Check size={18} /></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="home-proof">
        <div className="atlas-container">
          <div className="home-proof__heading motion-reveal">
            <AtlasEyebrow>What feels different here</AtlasEyebrow>
            <h2>Local enough to know the context.<br />Independent enough to compare.</h2>
          </div>
          <div className="home-proof__grid">
            {confidenceMarks.map(({ label, detail, icon: Icon }, index) => (
              <article key={label} className="proof-card motion-reveal">
                <span>0{index + 1}</span><Icon size={24} /><h3>{label}</h3><p>{detail}</p>
              </article>
            ))}
            <PaperNote label="A useful first call" tone="teal">
              <p>Not sure which policy name fits? Describe the vehicle, property, job, or requirement. We’ll start there.</p>
              <button type="button" onClick={openQuoteModal}>Talk it through <ArrowRight size={16} /></button>
            </PaperNote>
          </div>
          <FactRail facts={[
            { label: "Office", value: "Mar Vista / 90066" },
            { label: "Languages", value: "English · Spanish · Arabic" },
            { label: "Hours", value: "Weekdays 10–7 · Sat 10–3" },
            { label: "Agency license", value: "California 0D95584" },
          ]} />
        </div>
      </section>

      <section className="westside-window">
        <div className="atlas-container westside-window__grid">
          <div className="westside-window__media motion-reveal">
            <AtlasImage src="/images/atlas/westside-atlas.webp" alt="Layered paper atlas representing Rafla Insurance service areas across the Los Angeles Westside" width="1536" height="960" loading="lazy" />
            <div className="westside-window__label">Service-area study / illustration</div>
          </div>
          <div className="westside-window__copy motion-reveal">
            <AtlasEyebrow>Westside coverage atlas</AtlasEyebrow>
            <h2>Based in Mar Vista.<br />Built around nearby communities.</h2>
            <p>Our Venice Boulevard office sits in the Palms–Mar Vista–Del Rey community-plan area. We work with clients across the Westside and surrounding Los Angeles communities.</p>
            <div className="westside-window__cities">
              {homeServiceAreas.slice(0, 8).map((city) => <Link key={city.slug} to={`/insurance/${city.slug}`}>{city.name}<ArrowUpRight size={13} /></Link>)}
            </div>
            <AtlasButton to="/locations" tone="line">Open the local atlas</AtlasButton>
          </div>
        </div>
      </section>

      <section className="home-answers">
        <div className="atlas-container home-answers__grid">
          <div className="home-answers__intro motion-reveal"><AtlasEyebrow>Before you call</AtlasEyebrow><h2>Four useful answers.</h2><p>Short, direct, and grounded in how the agency actually works.</p><Link to="/faq">Read every answer <ArrowRight size={15} /></Link></div>
          <div className="home-answers__list">
            {homeFaqs.map((faq, index) => (
              <details key={faq.question} className="answer-drawer motion-reveal" open={index === 0}>
                <summary><span>0{index + 1}</span>{faq.question}<i aria-hidden="true" /></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <QuoteBand />
    </main>
  );
}
