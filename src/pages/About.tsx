import { Award, Languages, MapPin, Phone, Scale } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Reveal, Stagger, StaggerChild } from "../components/AnimatedSection";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import PageHero from "../components/PageHero";
import PageTestimonials from "../components/PageTestimonials";
import StatsBar from "../components/StatsBar";
import { CTASection, Section } from "../design-system";
import { images } from "../lib/images";
import { site } from "../lib/site";
import { usePageMeta } from "../lib/seo";

const VALUES = [
  { title: "Independent perspective", text: "We are not tied to a single insurance company, so the conversation starts with your needs.", Icon: Scale },
  { title: "Local relationships", text: "Our Venice Boulevard office gives Westside households and businesses a nearby place to get help.", Icon: MapPin },
  { title: "Clear communication", text: "Coverage can be discussed in English, Spanish, or Arabic, without scripted call-center handoffs.", Icon: Languages },
  { title: "Licensed guidance", text: "Rafla Insurance Agency is licensed in California under agency license number 0D95584.", Icon: Award },
];

export default function About() {
  usePageMeta({
    title: "About Rafla Insurance Agency | Los Angeles Insurance Broker",
    description: "Meet Rafla Insurance Agency, an independent personal and commercial insurance broker serving Los Angeles from our Mar Vista office.",
    canonical: "https://raflainsurance.com/about",
  });

  return (
    <main id="main-content">
      <BreadcrumbSchema crumbs={[{ name: "Home", url: "https://raflainsurance.com/" }, { name: "About", url: "https://raflainsurance.com/about" }]} />
      <PageHero
        title="Insurance guidance with a local point of view"
        subtitle="Rafla Insurance Agency helps Los Angeles individuals, families, and businesses understand their options and protect what they have built."
        breadcrumb="About"
        backgroundImage={images.home.why}
        imagePosition="center"
        rightContent={
          <div className="rounded-2xl bg-white/95 p-7 shadow-heavy ring-1 ring-white/30 backdrop-blur-sm">
            <img src="/logo.svg" alt="Rafla Insurance Agency" className="h-auto w-full max-w-sm" />
            <div className="mt-6 border-t border-slate-200 pt-5 text-sm leading-relaxed text-slate-600">
              <p className="font-bold text-brand-950">Our Mar Vista office</p>
              <p>12240 Venice Blvd, Suite 2</p>
              <p>Los Angeles, CA 90066</p>
              <p className="mt-3 text-slate-500">Mon–Fri 10 AM–7 PM · Sat 10 AM–3 PM</p>
            </div>
          </div>
        }
      >
        <div className="flex flex-wrap gap-3">
          <NavLink to="/contact" className="btn btn-accent">Talk With Our Team</NavLink>
          <a href={site.contact.phoneHref} className="btn btn-ghost-light">Call {site.contact.phone}</a>
        </div>
      </PageHero>

      <StatsBar />

      <Section tone="light">
        <div className="container grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <Reveal>
            <span className="eyebrow">About the agency</span>
            <h2 className="mt-3 display-2 text-slate-900">Personal and commercial insurance, handled personally</h2>
            <div className="mt-5 space-y-4 text-slate-600 leading-relaxed">
              <p>Insurance decisions often arrive with a deadline: a vehicle purchase, a lease requirement, a new contract, a renewal, or a California filing. Our job is to slow the decision down enough to make it understandable, then move quickly enough to keep your plans on track.</p>
              <p>We work across personal lines and business coverage, including auto, homeowners, renters, general liability, commercial auto, workers’ compensation, bonds, motorcycle, RV, boat, SR-22, and specialty risks. Health, life, and notary services are not currently offered.</p>
              <p>Clients can reach us by phone, text, or email, and walk-ins are welcome at our Mar Vista office.</p>
            </div>
          </Reveal>
          <Reveal direction="right">
            <div className="overflow-hidden rounded-3xl bg-brand-950 shadow-heavy ring-1 ring-brand-900">
              <img src={images.location.exterior} alt="Rafla Insurance Agency office building at 12240 Venice Boulevard in Los Angeles" className="aspect-[4/3] w-full object-cover" />
              <div className="p-6 text-white">
                <p className="font-bold">Rafla Insurance Agency</p>
                <p className="mt-1 text-sm text-white/65">12240 Venice Blvd, Suite 2 · Los Angeles, CA 90066</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="dark">
        <div className="container grid items-start gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <span className="eyebrow text-gold-300">Direct local contacts</span>
            <h2 className="mt-3 display-2 text-white">Reach the people behind the agency</h2>
            <p className="mt-4 max-w-xl text-white/70 leading-relaxed">Call the office for general service or reach Mark and Ashraf directly using the numbers provided by the agency.</p>
          </Reveal>
          <Stagger className="grid gap-4 sm:grid-cols-2">
            {site.team.map((person) => (
              <StaggerChild key={person.name}>
                <article className="h-full rounded-2xl bg-white/[0.07] p-6 text-white ring-1 ring-white/10 backdrop-blur-sm">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gold-400 text-lg font-extrabold text-brand-950">
                    {person.name.split(" ").map((part) => part[0]).join("")}
                  </div>
                  <h3 className="mt-5 text-xl font-bold">{person.name}</h3>
                  <p className="mt-1 text-sm text-gold-300">{person.role}</p>
                  {person.license && <p className="mt-2 text-xs text-white/55">{person.license}</p>}
                  <a href={person.phoneHref} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-gold-300">
                    <Phone className="h-4 w-4" /> {person.phone}
                  </a>
                </article>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </Section>

      <Section tone="offwhite">
        <div className="container">
          <Reveal className="text-center">
            <span className="eyebrow">How we work</span>
            <h2 className="mt-3 display-2 text-slate-900">Straight answers and accessible service</h2>
          </Reveal>
          <Stagger className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ title, text, Icon }) => (
              <StaggerChild key={title}>
                <article className="h-full rounded-2xl bg-white p-6 ring-1 ring-slate-200/80 shadow-soft">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100"><Icon className="h-5 w-5" /></div>
                  <h3 className="mt-4 font-bold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{text}</p>
                </article>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </Section>

      <PageTestimonials />
      <CTASection title="Put a local broker in your corner" lede="Tell us what needs protection. We will help you identify the information, coverage, and next step." secondaryLabel={`Call ${site.contact.phone}`} />
    </main>
  );
}
