import { ArrowRight, ClipboardCheck, Languages, MapPin, Phone, PhoneCall, Scale, ShieldCheck } from "lucide-react";
import { AtlasButton, AtlasEyebrow, AtlasImage, DossierHeader, QuoteBand, SectionFolio } from "../components/AtlasUI";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import { openQuoteModal } from "../lib/openQuote";
import { usePageMeta } from "../lib/seo";
import { images } from "../lib/images";
import { site } from "../lib/site";

export default function About() {
  usePageMeta({
    title: "About Rafla Insurance Agency | Mar Vista Los Angeles",
    description: "Meet Rafla Insurance Agency, an independent multilingual insurance brokerage at 12240 Venice Blvd in Mar Vista, Los Angeles.",
    canonical: "https://raflainsurance.com/about",
  });

  return (
    <main id="main-content" className="atlas-page about-file">
      <BreadcrumbSchema crumbs={[{ name: "Home", url: "https://raflainsurance.com/" }, { name: "About", url: "https://raflainsurance.com/about" }]} />
      <DossierHeader index="A1" eyebrow="About Rafla Insurance" title="Local guidance. Personal attention." lede="Independent carrier access, multilingual conversations, and the comfort of knowing who will answer when you call." image={images.hero.storefront} imageAlt="Rafla Insurance Agency office building on Venice Boulevard in Mar Vista">
        <AtlasButton tone="navy" onClick={openQuoteModal}>Start a conversation</AtlasButton>
        <a className="coverage-brief__call" href={site.contact.mapsHref} target="_blank" rel="noreferrer"><MapPin size={15} /> Visit the office</a>
      </DossierHeader>

      <section className="agency-story section-folio-host">
        <SectionFolio>Agency record</SectionFolio>
        <div className="atlas-container agency-story__grid">
          <div className="agency-story__statement motion-reveal"><AtlasEyebrow>Why Rafla</AtlasEyebrow><h2>Insurance gets personal long before a claim.</h2></div>
          <div className="agency-story__copy motion-reveal"><p>Every quote begins with facts that belong to a real household or business: a new driver, a renewal increase, a lender deadline, a first employee, a vehicle added to the workday, or a filing that needs to be understood.</p><p>Rafla Insurance Agency has served individuals, families, and businesses since 2003. We review available programs, explain the tradeoffs, and keep the person behind the policy visible.</p></div>
          <div className="agency-story__seal motion-reveal" aria-label="Agency license"><ShieldCheck /><span>California agency</span><strong>0D95584</strong></div>
        </div>
      </section>

      <section className="agency-principles section-folio-host">
        <SectionFolio tone="gold">Working standards</SectionFolio>
        <div className="atlas-container">
          <div className="agency-principles__heading motion-reveal"><AtlasEyebrow light>Working principles</AtlasEyebrow><h2>What the agency tries to make easier.</h2></div>
          <div className="mobile-swipe-hint"><span />Swipe through our working principles</div>
          <div className="agency-principles__grid" role="region" aria-label="Agency working principles" tabIndex={0}>
            {[
              { title: "The comparison", text: "See how limits, deductibles, exclusions, endorsements, and price move together.", detail: "Limits · deductibles · exclusions", icon: Scale },
              { title: "The language", text: "Discuss your coverage in English, Spanish, or Arabic when that makes the details clearer.", detail: "English · Spanish · Arabic", icon: Languages },
              { title: "The handoff", text: "Know what comes next after a quote, application, document request, or claim notice.", detail: "Quote · application · service", icon: ClipboardCheck },
              { title: "The relationship", text: "Keep a local office and familiar contact connected to the policy over time.", detail: "Mar Vista · direct phone access", icon: PhoneCall },
            ].map(({ title, text, detail, icon: Icon }) => <article key={title} className="motion-reveal"><Icon className="agency-principles__icon" aria-hidden="true" /><h3>{title}</h3><p>{text}</p><small className="agency-principles__detail">{detail}</small></article>)}
          </div>
        </div>
      </section>

      <section className="agency-team section-folio-host">
        <SectionFolio tone="paper">Local contacts</SectionFolio>
        <div className="atlas-container agency-team__grid">
          <div className="agency-team__visual motion-reveal"><AtlasImage src={images.about.office} alt="Illustration of a personal insurance consultation at Rafla Insurance Agency" width="1536" height="1024" loading="lazy" /><div><Languages size={18} /> English · Spanish · Arabic</div></div>
          <div className="agency-team__records">
            <div className="motion-reveal"><AtlasEyebrow>Meet your local contacts</AtlasEyebrow><h2>Real people, ready to help.</h2></div>
            {site.team.map((person, index) => <article key={person.name} className="motion-reveal"><span>0{index + 1}</span><div><h3>{person.name}</h3><p>{person.role}{person.license ? ` · ${person.license}` : ""}</p></div><a href={person.phoneHref}><Phone size={15} />{person.phone}</a></article>)}
            <a className="agency-team__office" href={site.contact.phoneHref}>Office line {site.contact.phone}<ArrowRight size={16} /></a>
          </div>
        </div>
      </section>

      <QuoteBand title="Get to know your local insurance team." />
    </main>
  );
}
