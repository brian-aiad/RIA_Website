import { useState } from "react";
import { NavLink } from "react-router-dom";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";
import { usePageMeta } from "../lib/seo";
import { Icons } from "../components/Icons";
import { Reveal } from "../components/AnimatedSection";
import PageHero from "../components/PageHero";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import { CTASection, Section } from "../design-system";
import InsuranceWorkflow from "../components/InsuranceWorkflow";
import StatsBar from "../components/StatsBar";
import PageTestimonials from "../components/PageTestimonials";
import { images } from "../lib/images";

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string;

function cx(...v: (string | false | null | undefined)[]) {
  return v.filter(Boolean).join(" ");
}

const SUBJECTS = [
  "New quote request",
  "Question about my policy",
  "Help with a claim",
  "Coverage question",
  "Billing question",
  "General question",
  "Something else",
] as const;

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState<null | "ok" | "err">(null);
  const [company, setCompany] = useState(""); // honeypot

  usePageMeta({
    title: "Contact Rafla Insurance Los Angeles — Call or Visit",
    description: "Call, text, email, or visit Rafla Insurance Agency in Mar Vista. Open Mon–Fri 10AM–7PM and Sat 10AM–3PM. English, Spanish, and Arabic service.",
    canonical: "https://raflainsurance.com/contact",
  });

  const canSubmit = name.trim() && email.trim() && subject && message.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || submitting) return;
    if (company.trim()) { setSent("ok"); return; }

    try {
      setSubmitting(true);
      setSent(null);

      if (!WEB3FORMS_KEY) {
        const body = [`Name: ${name}`, `Email: ${email}`, `Phone: ${phone || "Not provided"}`, `Topic: ${subject}`, "", message].join("\n");
        window.location.href = `${site.contact.emailHref}?subject=${encodeURIComponent(`Website inquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
        setSent("ok");
        return;
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name,
          email,
          phone: phone || "Not provided",
          subject: `New message from ${name} — Rafla Insurance Website`,
          topic: subject || "General inquiry",
          message,
          from_name: "Rafla Insurance Website",
        }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.message || "Failed");

      setSent("ok");
      setName(""); setEmail(""); setPhone(""); setSubject(""); setMessage("");
    } catch {
      setSent("err");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main id="main-content">
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://raflainsurance.com/" },
        { name: "Contact", url: "https://raflainsurance.com/contact" },
      ]} />

      <PageHero
        title="We're here to help"
        subtitle="Questions about coverage? Need help with a claim? Reach out — real people, real answers."
        breadcrumb="Contact"
        backgroundImage={images.clients.contactFrontDesk}
        imageFilter="contrast(1.08) saturate(1.02) brightness(0.96)"
        imagePosition="center"
      />

      <StatsBar />

      {/* 3 contact cards */}
      <section className="relative -mt-2 z-10 pb-12">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: <Icons.Phone className="w-5 h-5" />,
                title: "Call Us",
                detail: site.contact.phone,
                sub: "Mon–Fri 10 AM–7 PM · Sat 10 AM–3 PM",
                href: site.contact.phoneHref,
                accent: true,
              },
              {
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                  </svg>
                ),
                title: "Text Us",
                detail: site.contact.text,
                sub: "Fast replies during business hours",
                href: site.contact.textHref,
                accent: false,
              },
              {
                icon: <Icons.Mail className="w-5 h-5" />,
                title: "Email Us",
                detail: site.contact.email,
                sub: "Email the office directly",
                href: site.contact.emailHref,
                accent: false,
              },
              {
                icon: <Icons.MapPin className="w-5 h-5" />,
                title: "Visit Us",
                detail: "12240 Venice Blvd, Suite 2",
                sub: "Los Angeles, CA 90066 — walk-ins welcome",
                href: site.contact.mapsHref,
                accent: false,
              },
            ].map((c) => (
              <a
                key={c.title}
                href={c.href}
                target={c.title === "Visit Us" ? "_blank" : undefined}
                rel={c.title === "Visit Us" ? "noreferrer" : undefined}
                className={cx(
                  "block rounded-2xl p-6 transition-all duration-200 hover:shadow-lifted hover:-translate-y-1 group",
                  c.accent
                    ? "bg-brand-900 text-white ring-1 ring-brand-800 hover:bg-brand-800"
                    : "bg-white text-slate-900 ring-1 ring-slate-200/80 shadow-soft hover:ring-slate-300"
                )}
              >
                <div className={cx(
                  "w-10 h-10 rounded-xl grid place-items-center mb-4",
                  c.accent ? "bg-brand-800 text-gold-400" : "bg-brand-50 ring-1 ring-brand-100 text-brand-700"
                )}>
                  {c.icon}
                </div>
                <h3 className="font-bold text-lg">{c.title}</h3>
                <p className={cx("mt-1 font-semibold text-[15px]", c.accent ? "text-white/90" : "text-brand-700")}>{c.detail}</p>
                <p className={cx("mt-1 text-[12px]", c.accent ? "text-white/70" : "text-slate-500")}>{c.sub}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <InsuranceWorkflow
        tone="offwhite"
        title="A faster quote starts with the right details"
        lede="Call, text, or use the form. We will tell you what matters for your situation and avoid asking for unnecessary paperwork."
      />

      {/* Form + sidebar */}
      <Section tone="light" className="border-t border-slate-100">
        <div className="container">
          <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-8 lg:gap-14 items-start">

            {/* Form */}
            <Reveal direction="left">
              {sent === "ok" ? (
                <div
                  className="rounded-2xl p-8 md:p-14 text-center page-fade-in relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, var(--navy-800), var(--navy-900))",
                    border: "1px solid var(--navy-700)",
                    borderTop: "2px solid var(--gold-500)",
                    boxShadow: "var(--shadow-lg)",
                  }}
                  aria-live="polite"
                >
                  <div
                    className="w-16 h-16 mx-auto rounded-full grid place-items-center"
                    style={{ background: "var(--gold-500)", boxShadow: "var(--shadow-gold)" }}
                  >
                    <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="#0B1E3D" strokeWidth={3.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="mt-5 display-3 text-white">Thanks — message received!</h2>
                  <p className="mt-3 text-white/75 leading-relaxed max-w-md mx-auto">
                    Your message is ready for the Rafla Insurance Agency team. We will follow up during business hours.
                  </p>
                  <div className="mt-7 flex flex-wrap justify-center gap-3">
                    <a href={site.contact.phoneHref} className="btn btn-accent">Call {site.contact.phone}</a>
                    <button type="button" onClick={() => setSent(null)} className="btn btn-ghost-light">
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 ring-1 ring-slate-200/80 shadow-lifted">
                  <h2 className="text-xl font-bold text-slate-900 mb-1">Send us a message</h2>
                  <p className="text-sm text-slate-400 mb-6">Have a question or need help with your policy? Send the details and the office will follow up.</p>

                  {/* Error banner */}
                  <span aria-live="polite">
                    {sent === "err" && (
                      <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 page-fade-in">
                        <svg className="w-5 h-5 text-red-600 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="font-bold text-red-900 text-sm">Something went wrong</p>
                          <p className="text-[12px] text-red-700">Call us at <a href="tel:+13105727246" className="underline">(310) 572-7246</a> or try again.</p>
                        </div>
                      </div>
                    )}
                  </span>

                  {/* Honeypot */}
                  <label className="hidden" aria-hidden="true">
                    Company
                    <input name="company" autoComplete="off" tabIndex={-1} value={company} onChange={(e) => setCompany(e.target.value)} className="hidden" />
                  </label>

                  <div className="space-y-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-semibold text-slate-700 mb-2">Your Name *</label>
                      <input
                        id="contact-name" name="name" autoComplete="name"
                        value={name} onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 ring-1 ring-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
                        placeholder="John Smith" required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="contact-email" className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                        <input
                          id="contact-email" name="email" autoComplete="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 ring-1 ring-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
                          placeholder="you@email.com" required
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-phone" className="block text-sm font-semibold text-slate-700 mb-2">Phone <span className="text-slate-400 font-normal">(optional)</span></label>
                        <input
                          id="contact-phone" name="phone" autoComplete="tel" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                          className="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 ring-1 ring-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
                          placeholder="(310) 000-0000"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-subject" className="block text-sm font-semibold text-slate-700 mb-2">What's this about? *</label>
                      <select
                        id="contact-subject" name="topic" value={subject} onChange={(e) => setSubject(e.target.value)}
                        className="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 ring-1 ring-slate-200 text-slate-900 focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
                        required
                      >
                        <option value="">Select a topic...</option>
                        {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-semibold text-slate-700 mb-2">Your Message *</label>
                      <textarea
                        id="contact-message" name="message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)}
                        className="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 ring-1 ring-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all resize-none"
                        placeholder="How can we help you today?" required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!canSubmit || submitting}
                    className={cx("btn btn-accent w-full mt-6 !py-3.5 text-base", (!canSubmit || submitting) && "opacity-70 cursor-not-allowed")}
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </span>
                    ) : "Send Message"}
                  </button>

                  <p className="text-[12px] text-slate-400 mt-3 text-center">Messages are reviewed during regular business hours.</p>
                  <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-center text-[11px] leading-relaxed text-slate-500 ring-1 ring-slate-200">
                    Do not include Social Security numbers, payment-card details, passwords, or full driver’s-license images.{" "}
                    <NavLink to="/privacy" className="font-semibold text-brand-700 hover:text-brand-900">How we handle website data</NavLink>
                  </p>
                </form>
              )}
            </Reveal>

            {/* Sidebar */}
            <Reveal direction="right" delay={0.1}>
              <div className="space-y-6">
                {/* Quote CTA */}
                <div className="rounded-2xl overflow-hidden ring-1 ring-slate-200/80 shadow-lifted aspect-[4/3] relative bg-brand-950">
                  <img
                    src={images.hero.storefront}
                    alt="Rafla Insurance storefront in Los Angeles"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/78 via-brand-950/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-sm font-bold text-white">A real broker answers.</p>
                    <p className="mt-1 text-xs text-white/75">Call, text, or walk in during business hours.</p>
                  </div>
                </div>

                {/* Quote CTA */}
                <div className="bg-brand-50 rounded-2xl p-6 ring-1 ring-brand-100 text-center">
                  <div className="w-12 h-12 bg-brand-100 rounded-xl grid place-items-center mx-auto mb-3">
                    <Icons.Phone className="w-6 h-6 text-brand-700" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">Looking for a quote?</h3>
                  <p className="text-sm text-slate-500 mb-4">
                    Personal and commercial coverage, SR-22 filings, bonds, and more.
                  </p>
                  <button onClick={openQuoteModal} className="btn btn-accent btn-sm w-full justify-center">
                    Get a Free Quote &rarr;
                  </button>
                </div>

                {/* Multilingual */}
                <div className="bg-gradient-to-br from-gold-500 to-gold-400 rounded-2xl p-6 text-white relative overflow-hidden shadow-lifted">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                  <h3 className="font-bold text-lg text-brand-950 mb-2">We speak your language</h3>
                  <p className="text-brand-900/70 text-sm leading-relaxed">
                    <strong>Tambi&eacute;n hablamos espa&ntilde;ol.</strong>{" "}
                    <strong>نتحدث العربية.</strong>{" "}
                    Service is available in Arabic, Spanish, and English.
                  </p>
                </div>

                {/* Map */}
                <div className="rounded-2xl overflow-hidden ring-1 ring-slate-200/80 shadow-soft aspect-[4/3]">
                  <iframe
                    title="Rafla Insurance office map"
                    src="https://www.google.com/maps?q=12240%20Venice%20Blvd%20Suite%202%20Los%20Angeles%20CA%2090066&output=embed"
                    width="100%" height="100%" style={{ border: 0 }} loading="lazy"
                  />
                </div>

                {/* Office info */}
                <div className="bg-white rounded-2xl p-5 ring-1 ring-slate-200/80 shadow-soft text-sm space-y-1">
                  <p className="font-semibold text-slate-900">{site.contact.address}</p>
                  <p className="text-slate-400">Mon–Fri 10 AM–7 PM · Sat 10 AM–3 PM</p>
                  <NavLink to="/services" className="btn btn-outline btn-sm w-full mt-3 justify-center">
                    Browse Services
                  </NavLink>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </Section>

      <PageTestimonials tone="white" />

      <CTASection
        title="Need a quote today?"
        lede="Call, text, or send the form. A licensed Los Angeles broker will help you compare options."
        primaryLabel="Get a Free Quote"
        secondaryLabel={`Call ${site.contact.phone}`}
      />
    </main>
  );
}
