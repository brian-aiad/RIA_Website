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
      <DossierHeader index="A1" eyebrow="About Rafla Insurance" title="A neighborhood office with a direct phone line." lede="Talk through available carrier programs in English, Spanish, or Arabic with people you can call again after the policy begins." image={images.about.conversation} imageAlt="An insurance broker reviewing a blank policy folder with a Los Angeles couple">
        <AtlasButton tone="navy" onClick={openQuoteModal}>Start a conversation</AtlasButton>
        <a className="coverage-brief__call" href={site.contact.mapsHref} target="_blank" rel="noreferrer"><MapPin size={15} /> Visit the office</a>
      </DossierHeader>

      <section className="agency-story section-folio-host">
        <SectionFolio>Agency record</SectionFolio>
        <div className="atlas-container agency-story__grid">
          <div className="agency-story__statement motion-reveal"><AtlasEyebrow>Why Rafla</AtlasEyebrow><h2>Insurance gets personal long before a claim.</h2></div>
          <div className="agency-story__copy motion-reveal"><p>Every quote starts with a real change: a new driver, a renewal increase, a lender deadline, a first employee, a work vehicle, or a filing notice that needs an answer.</p><p>Rafla Insurance Agency has served individuals, families, and businesses since 2003. We review available programs, explain the differences, and stay available when the policy needs service.</p></div>
          <div className="agency-story__seal motion-reveal" aria-label="Agency license"><ShieldCheck /><span>California agency</span><strong>0D95584</strong></div>
        </div>
      </section>

      <section className="agency-principles section-folio-host">
        <SectionFolio tone="gold">Working standards</SectionFolio>
        <div className="atlas-container">
          <div className="agency-principles__heading motion-reveal"><AtlasEyebrow light>Working principles</AtlasEyebrow><h2>The parts of insurance we make clearer.</h2></div>
          <div className="mobile-swipe-hint"><span />Swipe through our working principles</div>
          <div className="agency-principles__grid" role="region" aria-label="Agency working principles" tabIndex={0}>
            {[
              { title: "Compare the parts", text: "Look at limits, deductibles, exclusions, endorsements, and price together.", detail: "Limits · deductibles · exclusions", icon: Scale },
              { title: "Talk it through", text: "Discuss the details in English, Spanish, or Arabic when that makes the policy easier to understand.", detail: "English · Spanish · Arabic", icon: Languages },
              { title: "Know the next step", text: "Leave a quote, application, document request, or claim conversation knowing what happens next.", detail: "Quote · application · service", icon: ClipboardCheck },
              { title: "Call someone familiar", text: "Keep the office and direct contacts with the policy when you need service later.", detail: "Mar Vista · direct phone access", icon: PhoneCall },
            ].map(({ title, text, detail, icon: Icon }) => <article key={title} className="motion-reveal"><Icon className="agency-principles__icon" aria-hidden="true" /><h3>{title}</h3><p>{text}</p><small className="agency-principles__detail">{detail}</small></article>)}
          </div>
        </div>
      </section>

      <section className="agency-team section-folio-host">
        <SectionFolio tone="paper">Local contacts</SectionFolio>
        <div className="atlas-container agency-team__grid">
          <div className="agency-team__visual motion-reveal"><AtlasImage src={images.about.office} alt="Illustration of a personal insurance consultation at Rafla Insurance Agency" width="1536" height="1024" loading="lazy" /><div><Languages size={18} /> English · Spanish · Arabic</div></div>
          <div className="agency-team__records">
            <div className="motion-reveal"><AtlasEyebrow>Meet your local contacts</AtlasEyebrow><h2>Names and numbers you can keep.</h2></div>
            {site.team.map((person, index) => <article key={person.name} className="motion-reveal"><span>0{index + 1}</span><div><h3>{person.name}</h3><p>{person.role}{person.license ? ` · ${person.license}` : ""}</p></div><a href={person.phoneHref}><Phone size={15} />{person.phone}</a></article>)}
            <a className="agency-team__office" href={site.contact.phoneHref}>Office line {site.contact.phone}<ArrowRight size={16} /></a>
          </div>
        </div>
      </section>

      <QuoteBand title="Get to know your local insurance team." />
    </main>
  );
}
