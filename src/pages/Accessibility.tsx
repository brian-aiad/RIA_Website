import { Keyboard, Languages, Mail, MonitorSmartphone, Phone, ScanText } from "lucide-react";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import { usePageMeta } from "../lib/seo";
import { site } from "../lib/site";

const commitments = [
  { Icon: Keyboard, title: "Keyboard access", text: "Navigation and interactive controls are designed to remain usable without a mouse." },
  { Icon: ScanText, title: "Readable structure", text: "Pages use descriptive headings, labels, link text, and image alternatives to support assistive technology." },
  { Icon: MonitorSmartphone, title: "Responsive layouts", text: "Content is designed for phones, tablets, desktops, zoom, and reduced-motion preferences." },
  { Icon: Languages, title: "Human help", text: "Our team can assist by phone, text, email, or in person in English, Spanish, and Arabic." },
];

export default function Accessibility() {
  usePageMeta({
    title: "Accessibility | Rafla Insurance",
    description: "Rafla Insurance provides accessible online and offline ways to request insurance help in English, Spanish, and Arabic.",
    canonical: "https://raflainsurance.com/accessibility",
  });

  return (
    <main id="main-content">
      <BreadcrumbSchema
        crumbs={[
          { name: "Home", url: "https://raflainsurance.com/" },
          { name: "Accessibility", url: "https://raflainsurance.com/accessibility" },
        ]}
      />

      <section className="hero-mesh text-white">
        <div className="container py-20 md:py-28">
          <span className="eyebrow-light">Accessibility</span>
          <h1 className="mt-4 max-w-3xl display-1">Insurance help should be easy to reach.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            We are working to make our digital experience usable across devices and abilities, with direct human assistance whenever the website is not the best channel.
          </p>
        </div>
      </section>

      <section className="sp bg-white">
        <div className="container">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {commitments.map(({ Icon, title, text }) => (
              <article key={title} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 shadow-soft">
                <Icon className="h-6 w-6 text-brand-700" />
                <h2 className="mt-4 font-bold text-slate-900">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <span className="eyebrow">Need Assistance?</span>
          <h2 className="mt-3 display-2 text-slate-900">Tell us what is not working</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            If you encounter an accessibility barrier, tell us which page or task caused the problem and what device or assistive technology you were using. We will provide the information through another channel and use the report to improve the site.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={site.contact.phoneHref} className="btn btn-accent">
              <Phone className="h-4 w-4" />
              Call {site.contact.phone}
            </a>
            <a href={site.contact.emailHref} className="btn btn-outline">
              <Mail className="h-4 w-4" />
              Email us
            </a>
            <a href={site.contact.mapsHref} target="_blank" rel="noreferrer" className="btn btn-outline">Visit the Los Angeles office</a>
          </div>
        </div>
      </section>
    </main>
  );
}
