import { useState } from "react";
import { NavLink } from "react-router-dom";
import { usePageMeta } from "../lib/seo";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";
import PageHero from "../components/PageHero";
import LocalBusinessSchema from "../components/seo/LocalBusinessSchema";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import FAQSchema from "../components/seo/FAQSchema";
import InsuranceWorkflow from "../components/InsuranceWorkflow";
import StatsBar from "../components/StatsBar";
import PageTestimonials from "../components/PageTestimonials";
import { ConsultationImage } from "../components/ConsultationImage";
import { images } from "../lib/images";

const AUTO_FAQS = [
  { q: "How much does car insurance cost in Los Angeles, CA?", a: "Premiums depend on driving history, vehicle type, coverage limits, deductibles, garaging location, and carrier underwriting. We compare the programs available for your application rather than quoting a generic citywide average." },
  { q: "What is California's minimum car insurance requirement?", a: "California requires 30/60/15 liability: $30,000 bodily injury per person, $60,000 per accident, and $15,000 for property damage." },
  { q: "When will I receive proof of insurance?", a: "Proof of insurance is generally available electronically after the carrier confirms that a policy is bound. SR-22 submission timing depends on the carrier and DMV processing." },
  { q: "What discounts are available for Los Angeles auto insurance?", a: "Available discounts vary by carrier and may include multi-car, multi-policy, continuous coverage, safety equipment, and good-driver discounts. We compare the options available for your application." },
  { q: "Do you offer insurance for drivers without a California license?", a: "Yes. We work with carriers that cover vehicle owners with foreign licenses, ITIN-based applicants, and licensed household members as the primary driver." },
];
import { Reveal, Stagger, StaggerChild } from "../components/AnimatedSection";
const NEARBY_CITIES = [
  { name: "Mar Vista", slug: "mar-vista" },
  { name: "Culver City", slug: "culver-city" },
  { name: "Santa Monica", slug: "santa-monica" },
  { name: "Venice", slug: "venice" },
  { name: "Marina del Rey", slug: "marina-del-rey" },
  { name: "West Los Angeles", slug: "west-los-angeles" },
];

export default function AutoInsuranceLosAngelesCA() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  usePageMeta({
    title: "Auto Insurance Los Angeles CA | Rafla Insurance",
    description:
      "Compare available carrier programs for auto insurance in Los Angeles, CA, including SR-22 support and lawful nonstandard license situations. Walk in or call today.",
    canonical: "https://raflainsurance.com/auto-insurance-los-angeles-ca",
  });

  return (
    <main id="main-content">
      <LocalBusinessSchema />
      <FAQSchema questions={AUTO_FAQS} />
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://raflainsurance.com/" },
        { name: "Auto Insurance Los Angeles CA", url: "https://raflainsurance.com/auto-insurance-los-angeles-ca" },
      ]} />

      <PageHero
        title="Auto Insurance in Los Angeles, CA"
        subtitle="Auto insurance in Los Angeles should be simple. We compare multiple carriers for liability, full coverage, SR-22 filings, and no-license or international-license situations so you can choose the right price and protection without calling five different companies."
        breadcrumb="Auto Insurance Los Angeles"
        badgeText="Local Independent Broker"
        backgroundImage={images.products.auto}
        imageFilter="contrast(1.08) saturate(1.03) brightness(0.96)"
        imagePosition="center"
      >
        <div className="flex flex-wrap gap-3">
          <button onClick={openQuoteModal} className="btn btn-accent btn-lg">
            Get My Los Angeles Auto Quote
          </button>
          <a href="#sr22" className="btn btn-ghost-light btn-lg">
            SR-22 Filing Help
          </a>
        </div>
      </PageHero>

      <StatsBar />

      <InsuranceWorkflow
        tone="offwhite"
        title="Auto quotes that account for the details"
        lede="Vehicle use, driver history, coverage limits, SR-22 status, and current policy details all affect which carrier is actually competitive."
      />

      {/* Section 1: Cost */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              How much car insurance costs in Los Angeles
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Car insurance rates in Los Angeles depend on your driving history, vehicle, coverage selections, ZIP code, prior insurance, claims, and other underwriting factors. Because each carrier weighs those details differently, a useful comparison starts with accurate driver and vehicle information rather than a generic advertised rate.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                California requires a minimum liability of 30/60/15 — $30,000 bodily injury per person, $60,000 per accident, and $15,000 property damage. Many Los Angeles drivers choose more than this minimum because the limits are low relative to real-world costs. If you cause an accident with an expensive vehicle or medical bills that exceed your coverage, you can be personally responsible for the difference.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                As an independent broker, we do not work for a single insurance company. We compare available programs from multiple carriers and explain the differences in price, limits, deductibles, and exclusions. Factors such as bundling home and auto, eligible safety features, or maintaining continuous coverage may affect your premium.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Our team walks you through each option in plain language so you understand what you are buying. There is no pressure to choose a specific carrier, and any carrier charges or agency fees shown on the quote are reviewed before binding.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 2: Coverage Options */}
      <section className="sp bg-slate-50">
        <div className="container max-w-5xl">
          <Reveal className="text-center mb-10">
            <span className="eyebrow">Coverage Types</span>
            <h2 className="mt-3 display-2 text-slate-900">Coverage options for Los Angeles drivers</h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              Not every car or driver needs the same coverage. We match the policy to your actual situation.
            </p>
          </Reveal>
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Liability-Only",
                desc: "Covers eligible injury or damage you cause to others, subject to the policy limits. This may be considered for a paid-off vehicle when physical-damage coverage is not selected.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ),
                title: "Full Coverage",
                desc: "A common shorthand for liability plus collision and comprehensive coverage. Lenders commonly require physical-damage coverage on financed vehicles.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                ),
                title: "Uninsured Motorist",
                desc: "Can help when an at-fault driver has no insurance or insufficient limits, subject to the coverage selected and policy terms.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                ),
                title: "Comprehensive",
                desc: "Addresses covered non-collision losses such as theft, fire, vandalism, and certain weather events, subject to the deductible and exclusions.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Collision",
                desc: "Helps address covered collision damage to your vehicle, subject to the deductible, limits, exclusions, and the vehicle's value.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                ),
                title: "Add-Ons",
                desc: "Optional features may include rental reimbursement and roadside assistance. Availability, limits, and pricing vary by carrier.",
              },
            ].map((item) => (
              <StaggerChild key={item.title}>
                <div className="bg-white rounded-2xl p-6 ring-1 ring-slate-200/80 shadow-soft hover:shadow-lifted hover:-translate-y-1 transition-all duration-200 h-full">
                  <div className="w-11 h-11 rounded-xl grid place-items-center mb-4 bg-brand-800 text-gold-400 shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-[14px] text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Consultation image — independent broker advantage */}
      <section className="sp bg-white">
        <div className="container max-w-6xl">
          <ConsultationImage
            image={images.clients.autoConsultation}
            alt="Independent insurance broker at Rafla Insurance in Los Angeles, CA comparing auto insurance rates across multiple carriers side by side for client"
            eyebrow="Independent Broker Advantage"
            heading="One conversation. Multiple carrier programs. Clear comparisons."
            badge="Walk-ins welcome · No appointment needed"
            stats={[
              { value: "Multiple", label: "Carrier Programs" },
              { value: "Clear", label: "Coverage Review" },
              { value: "Prompt", label: "Proof After Binding" },
            ]}
            body={
              <>
                <p className="text-lg leading-relaxed">
                  A captive agent shows you one company's prices. We show you multiple. That difference matters most when your situation is non-standard — SR-22 requirement, foreign license, prior lapse, or a financed vehicle with strict lender requirements.
                </p>
                <p className="leading-relaxed">
                  Our office at 12240 Venice Blvd, Suite 2, Los Angeles is open Monday through Friday, 10 AM to 7 PM, and Saturday, 10 AM to 3 PM. Walk-ins are welcome, and service is available in English, Spanish, and Arabic.
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* Section 3: SR-22 */}
      <section id="sr22" className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              SR-22 filing in Los Angeles
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                An SR-22 is a filing — not a separate insurance policy. It is a certificate your insurance company sends electronically to the California DMV confirming that you carry the state-required minimum liability coverage. Common triggers include a lapse in coverage, a license suspension, an at-fault accident while uninsured, a DUI conviction, or a court order.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                After a qualifying policy is bound, the insurer can submit an SR-22 electronically to the California DMV. Bring your driver's license or reinstatement paperwork, vehicle VIN, current declarations page if available, and any court or DMV reference number. We will explain the carrier's filing process and provide any confirmation available.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                California typically requires you to carry SR-22 for three years. During that period, your policy must remain active — any lapse restarts the clock with the DMV. As an independent broker, we have access to carriers that specialize in SR-22 situations and can find competitive rates even when other companies have declined.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                For full details on SR-22 cost, duration, and what to expect, visit our dedicated page.
              </p>
            </div>
            <div className="mt-6">
              <NavLink to="/sr22-insurance-los-angeles" className="btn btn-outline group">
                Full SR-22 Guide
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
              </NavLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 4: No-License */}
      <section id="no-license" className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              No-license, foreign-license, and international-license options
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Vehicle ownership and driving are separate legal concepts. There are several lawful situations where someone needs auto insurance coverage but does not hold a traditional California driver's license. We work with carriers that understand these scenarios and write policies accordingly.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Common situations we help with: a vehicle owner who does not drive but needs the car insured with a licensed primary driver listed; foreign-license holders who have a valid driver's license from another country; international-license drivers temporarily in California; and ITIN-based applicants who do not have a Social Security Number. In all cases, the licensed driver on the policy must be the person actually operating the vehicle — we never advise or imply that driving without a valid license is permissible.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Not every carrier writes these situations. Our access to multiple carriers means we can find options where a single-carrier agent cannot. Documents that help: foreign driver's license, passport, ITIN letter, vehicle registration, and any existing declarations page.
              </p>
            </div>
            <div className="mt-6">
              <NavLink to="/no-license-auto-insurance-los-angeles" className="btn btn-outline group">
                No-License & Foreign-License Guide
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
              </NavLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 5: Why Rafla Insurance */}
      <section className="sp bg-white">
        <div className="container max-w-5xl">
          <Reveal className="text-center mb-10">
            <span className="eyebrow">Why Choose Us</span>
            <h2 className="mt-3 display-2 text-slate-900">Why Los Angeles drivers choose Rafla Insurance</h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              From our Venice Boulevard office, we help you compare available programs and understand the coverage before you buy.
            </p>
          </Reveal>
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>,
                title: "We work for you",
                desc: "Independent broker guidance with no pressure. We compare the carrier programs available to us and explain the tradeoffs.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
                title: "Multiple carriers, one call",
                desc: "Comparing available carrier programs helps you evaluate price alongside limits, deductibles, and exclusions.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>,
                title: "3 languages",
                desc: "Service is available in English, Spanish, and Arabic, with coverage options explained in plain language.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
                title: "Proof after binding",
                desc: "Electronic ID cards are generally available after carrier confirmation. SR-22 timing varies by carrier and DMV processing.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
                title: "Claims advocacy",
                desc: "We don't disappear after the sale. We guide you through claims, communicate with adjusters, and follow up so nothing falls through the cracks.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
                title: "Local office, walk-ins welcome",
                desc: "12240 Venice Blvd, Suite 2, Los Angeles — right off the 405 freeway. local service from our Mar Vista office serving Westside Los Angeles County.",
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

      <PageTestimonials tone="offwhite" />

      {/* Section 5b: Spanish-intent section */}
      <section lang="es" className="sp bg-brand-950 text-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Seguro de Auto en Los Angeles, California
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-white/85 leading-relaxed mb-4">
                En Rafla Insurance, comparamos más de 30 aseguradoras para encontrar la cobertura que mejor se adapta a su situación — ya sea seguro básico de responsabilidad civil, cobertura completa, o un programa especial para conductores sin licencia californiana o con licencia extranjera.
              </p>
              <p className="text-base text-white/80 leading-relaxed mb-4">
                Nuestro equipo en Los Ángeles ofrece servicio en español. Explicamos cada opción de cobertura con claridad, sin terminología confusa, para que usted pueda tomar una decisión informada. Atendemos a familias y negocios de Mar Vista, Culver City, Santa Monica, Venice y otras comunidades cercanas del oeste de Los Ángeles.
              </p>
              <p className="text-base text-white/80 leading-relaxed mb-4">
                Si usted ha tenido infracciones de tránsito, necesita un archivo SR-22 para reinstalar su licencia, o es nuevo en California con una licencia de otro país, tenemos opciones disponibles. No es necesario tener número de Seguro Social para obtener cobertura en muchos de nuestros programas. Aceptamos clientes con ITIN y con licencias extranjeras válidas.
              </p>
              <p className="text-base text-white/80 leading-relaxed mb-4">
                Para obtener una cotización, llámenos o visítenos en nuestra oficina en 12240 Venice Blvd, Suite 2, Los Angeles, CA 90066. Estamos abiertos de lunes a viernes de 10:00 AM a 7:00 PM y los sábados de 10:00 AM a 3:00 PM. También puede solicitar su cotización en línea y nos pondremos en contacto con usted dentro de horas hábiles.
              </p>
              <p className="text-sm text-white/60 leading-relaxed italic">
                Nota: Este contenido fue redactado para hispanohablantes que buscan seguro de auto en Los Angeles. Recomendamos que un hispanohablante nativo revise y perfeccione el texto antes de publicarlo. — Rafla Insurance Team
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 6: Nearby Cities */}
      <section className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl font-bold text-slate-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Nearby cities we serve
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Our Mar Vista office serves drivers throughout Los Angeles and nearby Westside communities. Garaging address, annual mileage, vehicle use, and the listed drivers all matter more to underwriting than a generic neighborhood description.
            </p>
            <div className="flex flex-wrap gap-3">
              {NEARBY_CITIES.map((city) => (
                <NavLink
                  key={city.slug}
                  to={`/insurance/${city.slug}`}
                  className="inline-flex items-center gap-1.5 bg-white text-slate-700 rounded-lg px-4 py-2 ring-1 ring-slate-200 hover:ring-brand-300 hover:text-brand-700 transition-all text-sm font-medium"
                >
                  Auto insurance in {city.name}, CA
                </NavLink>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 7: FAQ */}
      <section className="sp bg-white">
        <div className="container max-w-3xl">
          <Reveal className="text-center mb-10">
            <span className="eyebrow">Common Questions</span>
            <h2 className="mt-3 display-2 text-slate-900">Auto insurance questions Los Angeles clients ask</h2>
          </Reveal>
          <div className="space-y-3">
            {AUTO_FAQS.map((faq, i) => (
              <Reveal key={i}>
                <div className="bg-slate-50 rounded-2xl ring-1 ring-slate-200/80 overflow-hidden">
                  <button
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-white/60 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span className="font-semibold text-slate-900 text-[15px] leading-snug">{faq.q}</span>
                    <svg
                      className={`w-5 h-5 text-gold-500 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5">
                      <p className="text-[14px] text-slate-600 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Dual CTA Footer */}
      <section className="sp bg-brand-950">
        <div className="container max-w-3xl text-center">
          <Reveal>
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Ready to compare Los Angeles auto quotes?
            </h2>
            <p className="text-white/70 mb-6">Call with your details and we will explain the quote and binding timeline for your situation.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={openQuoteModal} className="btn btn-accent btn-lg">
                Get My Los Angeles Auto Quote
              </button>
              <NavLink to="/sr22-insurance-los-angeles" className="btn btn-ghost-light btn-lg">
                Need SR-22 filing help?
              </NavLink>
            </div>
            <p className="mt-5 text-white/60 text-sm">
              Or call us at{" "}
              <a href={site.contact.phoneHref} className="text-gold-300 hover:text-gold-200 font-semibold">
                {site.contact.phone}
              </a>
            </p>
            <p className="mt-3 text-white/50 text-sm">
              Also see:{" "}
              <NavLink to="/no-license-auto-insurance-los-angeles" className="text-gold-300/80 hover:text-gold-200">
                No-license &amp; foreign-license options
              </NavLink>{" "}
              ·{" "}
              <NavLink to="/commercial-auto-insurance-los-angeles" className="text-gold-300/80 hover:text-gold-200">
                Commercial auto insurance
              </NavLink>{" "}
              ·{" "}
              <NavLink to="/home-insurance-los-angeles-ca" className="text-gold-300/80 hover:text-gold-200">
                Home &amp; renters insurance
              </NavLink>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
