import { NavLink } from "react-router-dom";
import { usePageMeta } from "../lib/seo";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";
import PageHero from "../components/PageHero";
import LocalBusinessSchema from "../components/seo/LocalBusinessSchema";
import FAQSchema from "../components/seo/FAQSchema";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import { Reveal, Stagger, StaggerChild } from "../components/AnimatedSection";
import StatsBar from "../components/StatsBar";
import PageTestimonials from "../components/PageTestimonials";
import InsuranceWorkflow from "../components/InsuranceWorkflow";
import { ConsultationImage } from "../components/ConsultationImage";
import { images } from "../lib/images";

const NO_LICENSE_FAQS = [
  { q: "Can I insure a car without a California driver's license?", a: "In certain lawful situations, yes. Vehicle owners who are not the primary driver, foreign-license holders, and ITIN-based applicants may have coverage options." },
  { q: "Can I apply using an ITIN?", a: "Some carrier programs may consider ITIN-based applicants who do not have a Social Security Number. Eligibility and required documentation vary by carrier." },
  { q: "Will a foreign driver's license work for auto insurance in California?", a: "Some carrier programs may accept a valid license issued by another country. Eligibility, required translations, and use of an International Driving Permit vary by carrier and situation." },
  { q: "What documents do I need for no-license auto insurance?", a: "Bring your foreign driver's license, passport, ITIN letter if applicable, vehicle registration, and any current declarations page." },
  { q: "Can a vehicle owner insure a car they do not personally drive?", a: "Some carriers may allow an owner to be the named insured while a properly licensed household member is listed as the primary driver. Ownership, household members, and all drivers must be disclosed accurately." },
];

export default function NoLicenseInsuranceLosAngeles() {
  usePageMeta({
    title: "Nonstandard License Auto Insurance Los Angeles | Rafla Insurance",
    description:
      "Coverage guidance for lawful foreign-license, ITIN, international-driver, and non-driving vehicle-owner situations in Los Angeles. Eligibility varies by carrier.",
    canonical: "https://raflainsurance.com/no-license-auto-insurance-los-angeles",
  });

  return (
    <main id="main-content">
      <LocalBusinessSchema />
      <FAQSchema questions={NO_LICENSE_FAQS} />
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://raflainsurance.com/" },
        { name: "No-License Insurance Los Angeles", url: "https://raflainsurance.com/no-license-auto-insurance-los-angeles" },
      ]} />

      <PageHero
        title="No-License & International-License Auto Insurance in Los Angeles, CA"
        subtitle="Vehicle ownership and driving are separate legal situations. We work with carriers that understand the difference and write policies for foreign-license holders, international drivers, and vehicle owners who are not the primary driver."
        breadcrumb="No-License Insurance Los Angeles"
        backgroundImage={images.products.noLicense}
        imageFilter="contrast(1.08) saturate(1.04) brightness(0.96)"
        imagePosition="center"
      >
        <div className="flex flex-wrap gap-3">
          <button onClick={openQuoteModal} className="btn btn-accent btn-lg">
            Discuss My Situation
          </button>
          <a href={site.contact.phoneHref} className="btn btn-ghost-light btn-lg">
            Call {site.contact.phone}
          </a>
        </div>
      </PageHero>

      <StatsBar />

      <InsuranceWorkflow
        tone="offwhite"
        title="Non-standard license situations need carrier fit"
        lede="We review carrier programs that may consider foreign licenses, ITIN-based applicants, excluded-owner setups, and named-insured arrangements."
      />

      {/* Common Scenarios */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Common scenarios we help with
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Every situation below assumes lawful vehicle ownership and operation. We never advise driving without a valid license. Ownership, household members, and all vehicle operators must be disclosed accurately, and each driver must satisfy the applicable licensing and carrier requirements.
            </p>
          </Reveal>
          <Stagger className="grid sm:grid-cols-2 gap-5">
            {[
              {
                title: "Vehicle Owner Who Doesn't Drive",
                desc: "You own and register the vehicle but a licensed family member or household member is the primary driver. You can be listed as the named insured with the licensed driver on the policy.",
              },
              {
                title: "Foreign License Holder",
                desc: "You hold a valid driver's license issued by another country. We can review carrier programs that may accept the license and explain the documentation required.",
              },
              {
                title: "International License Driver",
                desc: "You are temporarily in California and hold an International Driving Permit (IDP) alongside your home-country license. Select carrier programs may consider this situation.",
              },
              {
                title: "Household Named-Insured Setup",
                desc: "The vehicle owner and primary driver are different household members. Some carriers may consider this structure when ownership, residence, and every driver are disclosed accurately.",
              },
              {
                title: "ITIN-Based Applicants",
                desc: "You have an Individual Taxpayer Identification Number (ITIN) rather than a Social Security Number. We can review carrier programs that may accept an ITIN-based application.",
              },
              {
                title: "Excluded Unlicensed Owner",
                desc: "In some cases, an unlicensed owner can be excluded from a policy — meaning they are listed as an excluded driver — while a licensed household member is the covered driver. We explain the implications so you fully understand what you're signing.",
              },
            ].map((item, i) => (
              <StaggerChild key={i}>
                <div className="bg-white rounded-2xl p-6 ring-1 ring-slate-200/80 shadow-soft h-full">
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Consultation image — nonstandard license guidance */}
      <section className="sp bg-slate-50">
        <div className="container max-w-6xl">
          <ConsultationImage
            image={images.clients.noLicenseConsultation}
            alt="Rafla Insurance agent in Los Angeles, CA helping ITIN holder and foreign driver's license applicant obtain California auto insurance coverage"
            eyebrow="Nonstandard Coverage Guidance"
            heading="Coverage guidance for lawful nonstandard license situations"
            imageLeft
            badge="ITIN & foreign-license review"
            stats={[
              { value: "20+", label: "Years experience" },
              { value: "Multiple", label: "Carrier Programs" },
              { value: "3", label: "Service Languages" },
            ]}
            body={
              <>
                <p className="text-lg leading-relaxed">
                  Nonstandard applications can require more documentation and a narrower set of carrier programs. We review situations involving foreign licenses, ITIN-based applicants, and vehicle owners who have a properly licensed household driver.
                </p>
                <p className="leading-relaxed">
                  Service is available in English, Spanish, and Arabic. We review the documentation each available carrier requires and never advise unlicensed vehicle operation; anyone operating the vehicle must be properly licensed.
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* Documents */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              What documents help us find coverage
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mb-6">
              You may not need every item. Bring what you have, and we will explain which documents the available carriers require before an application can move forward.
            </p>
            <ul className="space-y-3">
              {[
                "Valid foreign driver's license — an English translation may be requested",
                "Passport or government-issued photo ID",
                "ITIN letter or ITIN card (Individual Taxpayer Identification Number)",
                "Vehicle registration in your name",
                "Current declarations page if you have existing coverage",
                "International Driving Permit (IDP) if you have one",
                "Licensed household member's driver's license (for named-insured / different driver setups)",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-gold-50 ring-1 ring-gold-200 grid place-items-center">
                    <svg className="w-3 h-3 text-gold-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Carrier access */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Carrier access for non-standard license situations
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              No-license, foreign-license, and international-license situations are not standard applications at most insurance companies. A captive agent who works for one carrier may simply tell you they cannot help — because their single carrier does not write these situations.
            </p>
            <p className="text-base text-slate-600 leading-relaxed mb-4">
              As an independent broker with access to multiple carriers, we can identify the companies that specifically handle foreign license holders, ITIN applicants, and complex named-insured setups. This carrier knowledge has been built over two decades of serving Los Angeles and Westside Los Angeles — a community where these situations are common.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              We explain the available options and let you choose. If a carrier requires additional documentation, driver exclusions, or other restrictions, those terms should be understood before binding.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Why Rafla Insurance — icon card grid */}
      <section className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <Reveal className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-2">Why Choose Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Why Los Angeles clients choose Rafla Insurance
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Non-standard license situations need a broker with real carrier access — not a single company that says no.
            </p>
          </Reveal>
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5" /></svg>,
                title: "We work for you",
                desc: "Independent broker — we compare multiple carriers with zero brand pressure.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
                title: "Multiple carriers compared",
                desc: "Side-by-side options from the carrier programs available to our agency.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>,
                title: "Multilingual service",
                desc: "English, Spanish, and Arabic — también hablamos español, وأيضاً نتحدث العربية.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
                title: "Electronic SR-22 filing",
                desc: "Filing support after a qualifying policy is bound; processing time varies.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
                title: "No-license programs",
                desc: "Foreign license, ITIN, and international driver options — we know which carriers say yes.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                title: "20+ years serving Westside LA",
                desc: "Rafla Insurance Agency — we know this community's situations.",
              },
            ].map((item) => (
              <StaggerChild key={item.title}>
                <div className="bg-white rounded-2xl p-6 ring-1 ring-slate-200/80 shadow-soft hover:shadow-lifted hover:-translate-y-1 transition-all duration-200 h-full">
                  <div className="w-11 h-11 rounded-xl grid place-items-center mb-4 bg-brand-800 text-gold-400 shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-[14px] text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Languages */}
      <section className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              We serve Los Angeles and Westside Los Angeles in English, Spanish, and Arabic
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              Many nonstandard license situations involve clients whose first language is not English. Service is available in Arabic, Spanish, and English so the application requirements and policy terms can be discussed clearly.
            </p>
            <p className="text-base text-slate-600 leading-relaxed mb-4">
              Insurance documents can be confusing even in your native language. We take the time to explain what each section of the policy means, what is and is not covered, and what your obligations are as the named insured. Our goal is that you leave our office fully understanding what you bought.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              {["English", "Español", "عربي"].map((lang, i) => (
                <span key={i} className="inline-flex items-center gap-2 bg-white text-brand-800 rounded-full px-4 py-2 ring-1 ring-brand-100 text-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-gold-400" />
                  {lang}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <PageTestimonials />

      {/* CTA */}
      <section className="sp bg-brand-950">
        <div className="container max-w-3xl text-center">
          <Reveal>
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Tell us your situation — we'll review the options
            </h2>
            <p className="text-white/70 mb-6">
              No judgment and no pressure. We review lawful nonstandard license situations carefully and explain the available carrier requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={openQuoteModal} className="btn btn-accent btn-lg">
                Discuss My Situation
              </button>
              <a href={site.contact.phoneHref} className="btn btn-ghost-light btn-lg">
                Call {site.contact.phone}
              </a>
            </div>
            <p className="mt-5 text-white/60 text-sm">
              Also see:{" "}
              <NavLink to="/auto-insurance-los-angeles-ca" className="text-gold-300 hover:text-gold-200">
                Auto insurance in Los Angeles
              </NavLink>{" "}
              ·{" "}
              <NavLink to="/sr22-insurance-los-angeles" className="text-gold-300 hover:text-gold-200">
                SR-22 filing
              </NavLink>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
