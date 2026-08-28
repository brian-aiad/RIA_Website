import { ArrowRight, Clock3, ExternalLink, Mail, MapPin, MessageSquareText, Phone } from "lucide-react";
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
      <DossierHeader index="C1" eyebrow="We’re here to help" title="Let’s start with a conversation." lede="Call, request a quote, send an email, or visit us on Venice Boulevard. A real person will take it from there." image={images.clients.contactFrontDesk} imageAlt="Representative insurance-office service moment with a person answering a policy question by phone">
        <AtlasButton tone="navy" onClick={openQuoteModal}>Request a quote</AtlasButton>
        <a className="coverage-brief__call" href={site.contact.phoneHref}><Phone size={15} />Call now</a>
      </DossierHeader>

      <section className="contact-switchboard section-folio-host">
        <SectionFolio>Choose a channel</SectionFolio>
        <div className="atlas-container">
          <div className="contact-switchboard__heading motion-reveal"><AtlasEyebrow>Contact Rafla Insurance</AtlasEyebrow><h2>Choose what works for you.</h2></div>
          <div className="contact-switchboard__grid">
            <a href={site.contact.phoneHref} className="motion-reveal"><span>01</span><Phone /><h3>Office line</h3><strong>{site.contact.phone}</strong><p>Quotes, policy questions, renewals, and general help.</p><ArrowRight /></a>
            <button type="button" onClick={openQuoteModal} className="motion-reveal"><span>02</span><MessageSquareText /><h3>Request a quote</h3><strong>Start online</strong><p>Share the first details so our team can prepare for the conversation.</p><ArrowRight /></button>
            <a href={site.contact.emailHref} className="motion-reveal"><span>03</span><Mail /><h3>Email</h3><strong>{site.contact.email}</strong><p>Do not send highly sensitive information by ordinary email.</p><ArrowRight /></a>
            <a href={site.contact.mapsHref} target="_blank" rel="noreferrer" className="motion-reveal"><span>04</span><MapPin /><h3>Visit</h3><strong>12240 Venice Blvd</strong><p>Suite 2 · Los Angeles, CA 90066</p><ExternalLink /></a>
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
          <div className="contact-team__heading motion-reveal"><AtlasEyebrow>Direct contacts</AtlasEyebrow><h2>Reach someone who knows the agency.</h2></div>
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
    </main>
  );
}
