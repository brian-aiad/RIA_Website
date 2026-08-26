import { useState } from "react";
import { NavLink } from "react-router-dom";
import { usePageMeta } from "../lib/seo";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";
import PageHero from "../components/PageHero";
import LocalBusinessSchema from "../components/seo/LocalBusinessSchema";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import FAQSchema from "../components/seo/FAQSchema";
import { Reveal, Stagger, StaggerChild } from "../components/AnimatedSection";
import InsuranceWorkflow from "../components/InsuranceWorkflow";
import StatsBar from "../components/StatsBar";
import PageTestimonials from "../components/PageTestimonials";
import { ConsultationImage } from "../components/ConsultationImage";
import { images } from "../lib/images";

const SR22_FAQS = [
  { q: "How long do I need SR-22 in California?", a: "Many California reinstatement situations require proof to remain on file for three years, but the exact duration depends on the DMV or court notice for your case. Confirm the requirement directly with the California DMV." },
  { q: "What does SR-22 filing cost in Los Angeles, CA?", a: "Cost depends on the carrier, driving record, underlying policy, and any filing charge. We quote the complete policy and explain the amounts before binding." },
  { q: "How quickly can an SR-22 be filed?", a: "After a qualifying policy is bound, the insurer can submit the certificate electronically. Carrier and DMV processing times vary, and we will explain what confirmation is available." },
  { q: "What happens if I miss a payment while on SR-22?", a: "A lapse or cancellation can cause the insurer to notify the DMV and may affect your driving privilege. Contact the agency before the due date if you are concerned about a payment." },
  { q: "Can I get SR-22 coverage if I don't own a car?", a: "A non-owner policy may be an option when you need a filing but do not own a vehicle. Eligibility and the permitted use of borrowed or rented vehicles depend on the carrier and policy terms." },
];

export default function SR22InsuranceLosAngeles() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  usePageMeta({
    title: "SR-22 Insurance Los Angeles CA | Rafla Insurance",
    description:
      "SR-22 insurance help in Los Angeles. Compare qualifying auto policies and coordinate electronic filing with the California DMV. Walk in or call (310) 572-7246.",
    canonical: "https://raflainsurance.com/sr22-insurance-los-angeles",
  });

  return (
    <main id="main-content">
      <LocalBusinessSchema />
      <FAQSchema questions={SR22_FAQS} />
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://raflainsurance.com/" },
        { name: "SR-22 Insurance Los Angeles", url: "https://raflainsurance.com/sr22-insurance-los-angeles" },
      ]} />

      <PageHero
        title="SR-22 Insurance & Filing Help in Los Angeles, CA"
        subtitle="We help quote the underlying policy and coordinate electronic SR-22 submission after a qualifying policy is bound. Carrier and DMV timing can vary."
        breadcrumb="SR-22 Insurance Los Angeles"
        badgeText="Electronic Filing Support"
        badgeType="open"
        backgroundImage={images.products.sr22}
        imageFilter="contrast(1.08) saturate(1.02) brightness(0.96)"
        imagePosition="center"
      >
        <div className="flex flex-wrap gap-3">
          <button onClick={openQuoteModal} className="btn btn-accent btn-lg">
            Get SR-22 Quote Now
          </button>
          <a href={site.contact.phoneHref} className="btn btn-ghost-light btn-lg">
            Call {site.contact.phone}
          </a>
        </div>
      </PageHero>

      <StatsBar />

      <InsuranceWorkflow
        tone="offwhite"
        title="SR-22 filing without extra confusion"
        lede="We quote the underlying auto policy, confirm the SR-22 filing requirement, and submit the certificate electronically when the policy is bound."
      />

      {/* What is SR-22 */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              What is SR-22?
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              An SR-22 is a filing, not a separate insurance policy. It is a certificate an insurance company sends to the California DMV to confirm that the required liability coverage is in place. Any carrier filing charge is separate from the underlying auto insurance premium and will be shown in the quote.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              Think of it this way: you still need a standard auto insurance policy. The SR-22 is simply the official documentation that your insurer sends to the DMV on your behalf, verifying you're covered. If your policy lapses at any point while you're required to carry SR-22, the insurer notifies the DMV automatically, which can result in further license suspension.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Consultation image — SR-22 filing expertise */}
      <section className="sp bg-slate-50">
        <div className="container max-w-6xl">
          <ConsultationImage
            image={images.clients.sr22Consultation}
            alt="Rafla Insurance broker in Los Angeles reviewing SR-22 filing documents with a client"
            eyebrow="Local SR-22 Help"
            heading="A clearer path through the SR-22 process"
            imageLeft
            badge="Electronic filing support"
            stats={[
              { value: "Electronic", label: "Filing Method" },
              { value: "Clear", label: "Cost Review" },
              { value: "DMV", label: "Requirement Check" },
            ]}
            body={
              <>
                <p className="text-lg leading-relaxed">
                  Our team helps Los Angeles clients obtain qualifying coverage and understand how the carrier submits an SR-22 certificate to the California DMV after binding.
                </p>
                <p className="leading-relaxed">
                  Walk in without an appointment. We explain the filing requirement, policy payment schedule, and available confirmation clearly. Service is available in English, Spanish, and Arabic.
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* Who needs SR-22 */}
      <section className="sp bg-white">
        <div className="container max-w-5xl">
          <Reveal className="text-center mb-10">
            <span className="eyebrow">SR-22 Triggers</span>
            <h2 className="mt-3 display-2 text-slate-900">Who needs SR-22 in California?</h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              The California DMV typically requires SR-22 filing in these situations:
            </p>
          </Reveal>
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
                title: "Coverage Lapse",
                desc: "Driving without active auto insurance, or allowing your policy to cancel while your vehicle is registered.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>,
                title: "License Suspension",
                desc: "A suspended or revoked license due to points accumulation, failure to appear, or failure to pay a judgment.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
                title: "DUI or DWI",
                desc: "A DUI conviction typically requires SR-22 as a condition of California license reinstatement.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3l3.5 3.5M3 3h5m-5 0v5m18 13l-3.5-3.5M21 21h-5m5 0v-5M3 21l3.5-3.5M3 21v-5m0 5h5m13-18l-3.5 3.5M21 3h-5m5 0v5" /></svg>,
                title: "Uninsured Accident",
                desc: "Being involved in an at-fault accident while uninsured, or a hit-and-run determination by the DMV.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5" /></svg>,
                title: "Court Order",
                desc: "A judge can require SR-22 as part of a sentencing condition or civil settlement agreement.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
                title: "Too Many Points",
                desc: "Accumulating too many DMV points from moving violations within a given period triggers the SR-22 requirement.",
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

      {/* How long */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              How long do I need to carry SR-22?
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              In many California reinstatement situations, proof of insurance must remain on file for three years. A lapse or cancellation may cause the insurer to notify the DMV and can affect your driving privilege.
            </p>
            <p className="text-base text-slate-600 leading-relaxed mb-4">
              Do not remove the filing based only on a general timeline. Confirm that your specific DMV or court requirement has ended before asking the insurer to make a change. Premiums remain subject to the carrier's current underwriting and rating factors.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              Always confirm your specific requirement directly with the California DMV. Courts or the DMV may impose a different duration depending on the severity of the underlying violation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* What to bring */}
      <section className="sp bg-slate-50">
        <div className="container max-w-5xl">
          <Reveal className="text-center mb-10">
            <span className="eyebrow">Walk-In Ready</span>
            <h2 className="mt-3 display-2 text-slate-900">What to bring for an SR-22 quote</h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              Walk-ins are welcome. Bringing these items helps avoid delays when quoting the policy and coordinating the filing.
            </p>
          </Reveal>
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>,
                title: "Driver's License or DMV Letter",
                desc: "Your current license, or your DMV reinstatement paperwork if your license has been suspended.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h10" /></svg>,
                title: "Vehicle VIN or Registration",
                desc: "The 17-digit VIN from your dashboard or registration card. This is required to quote and bind the underlying policy.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
                title: "Current Declarations Page",
                desc: "Your existing policy's declarations page if you have coverage. Helps us compare rates against your current carrier.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
                title: "Court or DMV Reference Number",
                desc: "If a court or the DMV issued a specific SR-22 requirement notice, the reference number speeds up the filing confirmation.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                title: "Contact Information",
                desc: "Email and phone number for policy delivery. eID cards and SR-22 confirmation are sent electronically as soon as the policy is bound.",
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

      {/* SR-22 Cost */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              SR-22 cost in Los Angeles
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              Filing charges and the cost of the underlying auto policy vary by carrier and driver. The larger cost difference often comes from the driving event or insurance history that led to the SR-22 requirement, not the certificate alone.
            </p>
            <p className="text-base text-slate-600 leading-relaxed mb-4">
              The premium impact varies significantly by carrier and by the driving or insurance history behind the filing. An independent broker can compare available SR-22-eligible programs side by side so you can review both price and coverage.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              When the DMV or court confirms that the filing requirement has ended, ask us to review the policy again. Carrier appetite and pricing may change as the underlying driving and insurance history changes.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Why independent broker */}
      <section className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Why file SR-22 with an independent broker
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              Not every insurance carrier writes SR-22 policies, and those that do charge very different premiums for the same coverage. A captive agent who works for a single company can only offer you that company's rate. An independent broker like Rafla Insurance can compare multiple SR-22-eligible carriers in a single conversation and find the policy that fits your budget.
            </p>
            <p className="text-base text-slate-600 leading-relaxed mb-4">
              Our team understands the SR-22 insurance process, can help identify the information needed for a quote, and can communicate in English, Spanish, and Arabic so the next steps are clear.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              When available from the carrier, we can provide confirmation that the electronic filing was submitted. DMV posting time is outside the agency's control, so allow time for processing before a DMV or court deadline.
            </p>
            <p className="mt-3 text-sm text-slate-500">
              Want to learn more about our brokerage?{" "}
              <NavLink to="/about" className="text-brand-700 font-medium hover:underline">
                About Rafla Insurance
              </NavLink>{" "}
              — independent broker in Los Angeles since 2003.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="sp bg-slate-50">
        <div className="container max-w-3xl">
          <Reveal className="text-center mb-10">
            <span className="eyebrow">Common Questions</span>
            <h2 className="mt-3 display-2 text-slate-900">SR-22 questions Los Angeles clients ask</h2>
          </Reveal>
          <div className="space-y-3">
            {SR22_FAQS.map((faq, i) => (
              <Reveal key={i}>
                <div className="bg-white rounded-2xl ring-1 ring-slate-200/80 overflow-hidden">
                  <button
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
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

      <PageTestimonials />

      {/* CTA */}
      <section className="sp bg-brand-950">
        <div className="container max-w-3xl text-center">
          <Reveal>
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Need SR-22 filing help in Los Angeles?
            </h2>
            <p className="text-white/70 mb-6">Walk in or call and we will explain the quote, binding, and filing timeline.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={openQuoteModal} className="btn btn-accent btn-lg">
                Get SR-22 Quote Now
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
              <NavLink to="/no-license-auto-insurance-los-angeles" className="text-gold-300 hover:text-gold-200">
                No-license options
              </NavLink>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
