import { Link } from "react-router-dom";
import { Database, Eye, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import { usePageMeta } from "../lib/seo";
import { site } from "../lib/site";

const practices = [
  {
    Icon: Database,
    title: "Collect only what helps us respond",
    text: "Our general contact form asks for your name, contact information, topic, and message. The quote dialog directs you to call, text, email, or use that form.",
  },
  {
    Icon: LockKeyhole,
    title: "Keep sensitive details out of ordinary messages",
    text: "Do not send Social Security numbers, payment-card details, passwords, or full driver’s-license images through email, text, or the general contact form.",
  },
  {
    Icon: Eye,
    title: "Use information for the requested service",
    text: "Information you provide is used to answer your inquiry, prepare or service coverage, and meet applicable insurance and recordkeeping obligations.",
  },
  {
    Icon: ShieldCheck,
    title: "Limit access and third-party processing",
    text: "Information is handled by authorized personnel and service providers needed to operate the website, receive messages, process quote requests, and measure site reliability.",
  },
];

export default function Privacy() {
  usePageMeta({
    title: "Privacy & Data Handling | Rafla Insurance",
    description: "Learn how Rafla Insurance handles website inquiries, quote requests, analytics, and sensitive insurance information.",
    canonical: "https://raflainsurance.com/privacy",
  });

  return (
    <main id="main-content">
      <BreadcrumbSchema
        crumbs={[
          { name: "Home", url: "https://raflainsurance.com/" },
          { name: "Privacy", url: "https://raflainsurance.com/privacy" },
        ]}
      />

      <section className="hero-mesh overflow-hidden text-white">
        <div className="container relative py-20 md:py-28">
          <span className="eyebrow-light">Privacy &amp; Data Handling</span>
          <h1 className="mt-4 max-w-3xl display-1">Your insurance information deserves careful handling.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            This notice explains what our website collects, why it is used, and which channels are appropriate for sensitive information.
          </p>
          <p className="mt-5 text-sm font-medium text-gold-200">Last updated August 26, 2026</p>
        </div>
      </section>

      <section className="sp bg-white">
        <div className="container">
          <div className="grid gap-5 md:grid-cols-2">
            {practices.map(({ Icon, title, text }) => (
              <article key={title} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 shadow-soft">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-lg font-bold text-slate-900">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sp bg-slate-50">
        <div className="container max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr,1.1fr]">
            <div>
              <span className="eyebrow">Website Data Flow</span>
              <h2 className="mt-3 display-2 text-slate-900">Where information goes</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                We use service providers for defined website functions. Their systems may process information under their own privacy terms.
              </p>
            </div>
            <div className="space-y-4">
              {[
                ["General messages", "When configured, the contact form uses Web3Forms to deliver your inquiry to our office. Otherwise, it opens a prefilled message in your email application."],
                ["Quote requests", "The quote dialog helps you prepare the relevant details, then directs you to call, text, email, or use the general contact form."],
                ["Site analytics", "Vercel Analytics and Speed Insights collect limited technical and performance information so we can understand reliability and improve the site."],
                ["Calls, texts, and email", "Information sent through your phone or email provider is also subject to that provider’s terms and security."],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200/80">
                  <h3 className="font-bold text-slate-900">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <span className="eyebrow">Your Choices</span>
          <h2 className="mt-3 display-2 text-slate-900">Questions, corrections, or privacy concerns</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Contact us to ask about information you submitted through this website or to request a correction. We may need to verify your identity before discussing policy or personal information.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={site.contact.emailHref} className="btn btn-primary">
              <Mail className="h-4 w-4" />
              Email our office
            </a>
            <a href={site.contact.phoneHref} className="btn btn-outline">Call {site.contact.phone}</a>
            <Link to="/contact" className="btn btn-outline">Contact options</Link>
          </div>
          <p className="mt-8 rounded-xl bg-amber-50 p-4 text-sm leading-relaxed text-amber-900 ring-1 ring-amber-200">
            For policy documents or identity information, call us first so we can direct you to the appropriate submission method.
          </p>
        </div>
      </section>
    </main>
  );
}
