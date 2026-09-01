import { ArrowRight, Clock3, ExternalLink, FileCheck2, Mail, MapPin, MessageSquareText, Phone, ShieldCheck } from "lucide-react";
import { AtlasButton, AtlasEyebrow, AtlasImage, DossierHeader, SectionFolio } from "../components/AtlasUI";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import { openQuoteModal } from "../lib/openQuote";
import { usePageMeta } from "../lib/seo";
import { images } from "../lib/images";
import { site } from "../lib/site";

const directContactNotes = [
  "New quotes, renewals, and agency conversations",
  "Policy service, documents, and customer support",
] as const;

export default function Contact() {
  usePageMeta({
    title: "Contact Rafla Insurance Agency | Mar Vista Los Angeles",
    description: "Call Rafla Insurance at (310) 572-7246 or visit 12240 Venice Blvd Suite 2, Los Angeles, CA 90066. English, Spanish and Arabic assistance.",
    canonical: "https://raflainsurance.com/contact",
  });

  return (
    <main id="main-content" className="atlas-page contact-file">
      <BreadcrumbSchema crumbs={[{ name: "Home", url: "https://raflainsurance.com/" }, { name: "Contact", url: "https://raflainsurance.com/contact" }]} />
      <DossierHeader index="C1" eyebrow="Contact Rafla Insurance" title="Call, text, email, or stop by." lede="Reach the Venice Boulevard office for a quote, renewal, policy question, document request, or help finding the right carrier contact." image={images.clients.contactFrontDesk} imageAlt="Illustration of an insurance broker answering a client call from a Los Angeles office">
        <AtlasButton tone="navy" onClick={openQuoteModal}>Prepare for a quote</AtlasButton>
        <a className="coverage-brief__call" href={site.contact.phoneHref}><Phone size={15} />Call now</a>
      </DossierHeader>

      <section className="contact-switchboard section-folio-host">
        <SectionFolio>Choose a channel</SectionFolio>
        <div className="atlas-container">
          <div className="contact-switchboard__heading motion-reveal"><AtlasEyebrow>Contact options</AtlasEyebrow><h2>Use the channel that fits the question.</h2></div>
          <div className="mobile-swipe-hint mobile-swipe-hint--ink"><span />Swipe through contact options</div>
          <div className="contact-switchboard__grid" role="region" aria-label="Contact options" aria-description="On narrow screens, scroll horizontally or use the Left and Right Arrow keys to browse contact options." tabIndex={0}>
            <a href={site.contact.phoneHref} className="motion-reveal"><span>01</span><Phone /><h3>Office line</h3><strong>{site.contact.phone}</strong><p>Quotes, policy questions, renewals, and general help.</p><ArrowRight /></a>
            <a href={site.contact.textHref} className="motion-reveal"><span>02</span><MessageSquareText /><h3>Text / direct line</h3><strong>{site.contact.text}</strong><p>Useful for a short first question. Do not text sensitive documents or personal data.</p><ArrowRight /></a>
            <a href={site.contact.emailHref} className="motion-reveal"><span>03</span><Mail /><h3>Email</h3><strong>{site.contact.email}</strong><p>Do not send highly sensitive information by ordinary email.</p><ArrowRight /></a>
            <a href={site.contact.mapsHref} target="_blank" rel="noopener noreferrer" className="motion-reveal"><span>04</span><MapPin /><h3>Visit</h3><strong>12240 Venice Blvd</strong><p>Suite 2 · Los Angeles, CA 90066</p><ExternalLink /></a>
          </div>
        </div>
      </section>

      <section className="contact-desk section-folio-host">
        <SectionFolio tone="gold">Office record</SectionFolio>
        <div className="atlas-container contact-desk__grid">
          <div className="contact-desk__photo motion-reveal"><AtlasImage src={images.location.exteriorWide} alt="Illustration of Rafla Insurance Agency's Venice Boulevard office" width="1536" height="1024" loading="lazy" /><div><MapPin size={17} /> Mar Vista / 90066</div></div>
          <div className="contact-desk__hours motion-reveal">
            <AtlasEyebrow light>When to reach us</AtlasEyebrow><h2>Office hours</h2>
            <dl><div><dt>Monday – Friday</dt><dd>{site.hours.weekdays}</dd></div><div><dt>Saturday</dt><dd>{site.hours.saturday}</dd></div><div><dt>Sunday</dt><dd>{site.hours.sunday}</dd></div></dl>
            <p><Clock3 size={16} />Hours may change for holidays. Call before a time-sensitive visit.</p>
          </div>
        </div>
      </section>

      <section className="contact-team section-folio-host">
        <SectionFolio tone="paper">Direct lines</SectionFolio>
        <div className="atlas-container">
          <div className="contact-team__heading motion-reveal"><AtlasEyebrow>Direct contacts</AtlasEyebrow><h2>Keep a direct number for the office.</h2></div>
          <div className="contact-team__grid">
            {site.team.map((person,index) => (
              <article key={person.name} className="motion-reveal">
                <span>0{index+1}</span>
                <h3>{person.name}</h3>
                <p>{person.role}</p>
                {person.license && <small>{person.license}</small>}
                <div className="contact-team__best"><small>Call for</small><strong>{directContactNotes[index]}</strong></div>
                <a href={person.phoneHref}><Phone size={14}/>{person.phone}<ArrowRight size={14} /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-next section-folio-host">
        <SectionFolio tone="gold">Conversation guide</SectionFolio>
        <div className="atlas-container contact-next__grid">
          <header className="contact-next__heading motion-reveal">
            <AtlasEyebrow light>What happens next</AtlasEyebrow>
            <h2>Start with the task—not a perfect file.</h2>
            <p>Tell the office what changed, which document prompted the call, and whether a real deadline is involved. The broker can then narrow the questions.</p>
            <div className="contact-next__actions">
              <AtlasButton tone="gold" onClick={openQuoteModal}>Open the preparation guide</AtlasButton>
              <a href={site.contact.phoneHref}><Phone aria-hidden="true" size={16} />Call {site.contact.phone}</a>
            </div>
          </header>
          <div className="contact-next__record motion-reveal">
            <span className="contact-next__route" aria-hidden="true" />
            <ol aria-label="What to expect when contacting Rafla Insurance">
              <li><span>01</span><div><h3>Name the task</h3><p>A quote, renewal, policy change, claim question, certificate, bond, or filing request each starts differently.</p></div></li>
              <li><span>02</span><div><h3>Gather only what applies</h3><p>The office will explain which policy, notice, vehicle, property, payroll, contract, or loss details are useful.</p></div></li>
              <li><span>03</span><div><h3>Wait for confirmation</h3><p>Do not assume coverage, a filing, certificate request, or policy change is complete until the proper agency or carrier confirmation is received.</p></div></li>
            </ol>
            <aside><ShieldCheck aria-hidden="true" /><p><strong>Protect sensitive records.</strong> Do not send Social Security numbers, payment information, or full driver’s-license images by ordinary email or text. Ask which delivery method to use.</p></aside>
            <p className="contact-next__tool-note"><FileCheck2 aria-hidden="true" />The online guide prepares you for a conversation. It does not submit or store a quote request.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
