import { Link } from "react-router-dom";
import { usePageMeta } from "../lib/seo";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";
import PageHero from "../components/PageHero";
import LocalBusinessSchema from "../components/seo/LocalBusinessSchema";
import FAQSchema from "../components/seo/FAQSchema";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import InsuranceWorkflow from "../components/InsuranceWorkflow";
import StatsBar from "../components/StatsBar";
import PageTestimonials from "../components/PageTestimonials";
import { ConsultationImage } from "../components/ConsultationImage";
import { images } from "../lib/images";

const COMMERCIAL_FAQS = [
  { q: "What is commercial auto insurance?", a: "Commercial auto insurance is designed for eligible vehicles and liability exposures arising from business use. Coverage depends on the vehicles, drivers, operation, limits, endorsements, and exclusions selected." },
  { q: "Do I need commercial auto if I use my personal car for work?", a: "Business use beyond ordinary commuting may fall outside a personal policy or require different classification. Review the actual use with a broker before assuming either policy applies." },
  { q: "What is hired and non-owned auto coverage?", a: "Hired-auto coverage can address certain vehicles a business rents, while non-owned auto can address certain business liability arising from employee-owned vehicles. Terms and eligibility vary by policy." },
  { q: "How much does commercial auto insurance cost in Los Angeles?", a: "Premiums vary by vehicle type, business use, operating radius, drivers, loss history, limits, filings, and carrier. We compare the available programs and coverage terms." },
];
import { Reveal } from "../components/AnimatedSection";

const NEARBY_CITIES = [
  { name: "Mar Vista", slug: "mar-vista" },
  { name: "Culver City", slug: "culver-city" },
  { name: "Santa Monica", slug: "santa-monica" },
  { name: "Venice", slug: "venice" },
  { name: "Marina del Rey", slug: "marina-del-rey" },
  { name: "West Los Angeles", slug: "west-los-angeles" },
];

const VEHICLE_TYPES = [
  {
    title: "Single commercial vehicle",
    desc: "Tradespeople, sales representatives, and independent contractors who use one truck, van, or car primarily for business may need a commercial auto policy. The correct classification depends on ownership, use, radius, equipment, and the personal policy's terms.",
  },
  {
    title: "Small fleet (2–10 vehicles)",
    desc: "Small fleets bring multiple drivers, vehicles, and exposure levels into one program. We review vehicle schedules, driver eligibility, garaging, use, and available fleet rating or discount options.",
  },
  {
    title: "For-hire and delivery vehicles",
    desc: "Rideshare, delivery, courier, and last-mile operations can require specialized classification or endorsements. Personal, platform-provided, and commercial policies may address different periods or exposures, so the actual operation must be reviewed.",
  },
  {
    title: "Contractor pickups and vans",
    desc: "Contractor trucks and vans may need commercial auto plus separate consideration for tools, equipment, trailers, general liability, and certificates required by a contract.",
  },
  {
    title: "Non-emergency medical transport (NEMT)",
    desc: "NEMT operators carry specialized passenger exposures. Carrier availability and pricing depend on operating radius, contracts, driver records, vehicle types, safety controls, and the number of vehicles. We can review specialty commercial programs available for the operation.",
  },
  {
    title: "Food trucks and mobile services",
    desc: "Food trucks, mobile pet groomers, pop-up retail vehicles, and other mobile operations can involve both vehicle and premises or operations exposures. We review commercial auto alongside applicable general liability and property needs.",
  },
];

export default function CommercialAutoInsuranceLosAngelesPage() {
  usePageMeta({
    title: "Commercial Auto & Business Vehicle Insurance Los Angeles CA | Rafla Insurance",
    description:
      "Commercial insurance in Los Angeles CA for business vehicles, fleets, trucks, hired/non-owned auto and BOP bundles. Compare available carrier programs.",
    canonical:
      "https://raflainsurance.com/commercial-auto-insurance-los-angeles",
  });

  return (
    <main id="main-content">
      <LocalBusinessSchema />
      <FAQSchema questions={COMMERCIAL_FAQS} />
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://raflainsurance.com/" },
        { name: "Commercial Auto Insurance Los Angeles", url: "https://raflainsurance.com/commercial-auto-insurance-los-angeles" },
      ]} />

      <PageHero
        title="Commercial Auto & Business Vehicle Insurance in Los Angeles, CA"
        subtitle="Protect your trucks, vans, fleets, and business vehicles without shopping carrier by carrier. We compare available commercial auto markets for Los Angeles-area owner-operators, small fleets, and local businesses."
        breadcrumb="Commercial Auto"
        backgroundImage={images.products.commercial}
        imageFilter="contrast(1.08) saturate(1.04) brightness(0.96)"
        imagePosition="center"
      >
        <div className="flex flex-wrap gap-3">
          <button onClick={openQuoteModal} className="btn btn-accent btn-lg">
            Get a Commercial Auto Quote
          </button>
          <a href={site.contact.phoneHref} className="btn btn-ghost-light btn-lg">
            Call {site.contact.phone}
          </a>
        </div>
      </PageHero>

      <StatsBar />

      <InsuranceWorkflow
        tone="offwhite"
        title="Commercial auto quotes need business context"
        lede="Vehicle type, radius, drivers, filings, certificates, and hired/non-owned exposure determine which commercial carriers make sense."
      />

      {/* Section 1: What commercial auto covers */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              What commercial auto insurance covers in California
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Commercial auto insurance in California is designed for eligible
                vehicles and liability exposures arising from business use. If
                a truck, van, or car is used to generate income, transport
                clients, haul tools, or make deliveries, the ownership and use
                should be disclosed accurately so the carrier can classify it.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                A commercial auto policy can include <strong>liability</strong>{" "}
                coverage for bodily injury and property damage you cause to
                third parties, as well as <strong>physical damage</strong>{" "}
                — collision and comprehensive — for your own vehicle.{" "}
                <strong>Hired and non-owned auto (HNOA)</strong> coverage may
                address certain business liability involving rented vehicles or
                employee-owned vehicles, subject to the policy terms.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                <strong>Medical payments</strong> and <strong>uninsured or
                underinsured motorist</strong> options may also be available.
                Their response depends on the coverage selected, who qualifies
                as an insured, the loss facts, limits, and exclusions.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                The right combination of these coverages depends on your
                specific operation — vehicle type, driver count, radius of
                travel, and the nature of your business all factor into what an
                underwriter will require and what limits make sense for your
                risk.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 2: Vehicles and operations */}
      <section className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Vehicles and operations we can review
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Commercial auto underwriting is not one-size-fits-all. Carrier
              appetite varies dramatically by vehicle type, industry class, and
              how the vehicle is used. We work with specialty commercial markets
              that may consider a range of Los Angeles-area business operations.
            </p>
          </Reveal>
          <div className="space-y-6">
            {VEHICLE_TYPES.map((item, i) => (
              <Reveal key={i}>
                <div className="bg-white rounded-2xl p-6 ring-1 ring-slate-200/80 shadow-soft">
                  <h3
                    className="text-xl font-bold text-slate-900 mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: DOT and FMCSA filings */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              DOT and FMCSA filings when you need them
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Some commercial auto operations require more than just a
                standard policy — they require specific regulatory filings that
                prove financial responsibility to a federal or state authority.
                One common example is the <strong>MCS-90 endorsement</strong>,
                which may apply to certain motor carriers operating under FMCSA
                authority. Requirements depend on the operation, cargo,
                authority, and jurisdiction; a USDOT number by itself does not
                determine every insurance filing obligation.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                <strong>Form E</strong> (also called the Uniform Motor Carrier
                Bodily Injury and Property Damage Liability Certificate of
                Insurance) is required in many states for intrastate for-hire
                carriers. If your operation involves crossing state lines or
                operating under for-hire authority, your broker needs to
                coordinate these filings directly with the carrier.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                We can ask available carriers which FMCSA or CPUC filings they
                support and coordinate insurance paperwork alongside a
                qualifying policy. Regulatory requirements should also be
                confirmed with the applicable authority or a qualified advisor.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Consultation image — commercial coverage specialist */}
      <section className="sp bg-white">
        <div className="container max-w-6xl">
          <ConsultationImage
            image={images.clients.commercialConsultation}
            alt="Commercial auto insurance broker at Rafla Insurance in Los Angeles, CA reviewing fleet vehicle coverage and business policy options with small business owner"
            eyebrow="Commercial Auto Specialists · Los Angeles CA"
            heading="Commercial auto quoting that starts with your business, not a form"
            badge="Fleet · Single vehicle · NEMT · Delivery"
            stats={[
              { value: "Multiple", label: "Commercial Markets" },
              { value: "Prompt", label: "COI Support" },
              { value: "20+", label: "Years experience" },
            ]}
            body={
              <>
                <p className="text-lg leading-relaxed">
                  Commercial auto is not one-size-fits-all. A single contractor pickup needs entirely different coverage than a three-van HVAC fleet or a food truck operation. We open with questions about your operation before we touch a quote form.
                </p>
                <p className="leading-relaxed">
                  We can review specialty commercial markets, including programs for NEMT operators, for-hire vehicles, and non-owned commercial exposure for businesses that use employee vehicles. Certificate timing depends on carrier binding and policy requirements.
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* Section 4: Why broker beats direct */}
      <section className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Why an independent broker helps with commercial auto
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Commercial-auto carrier appetite varies substantially by class
                of business. A program that considers a contractor pickup may
                not consider a food truck or NEMT operation. A broker can help
                identify markets available for the actual vehicle use and
                underwriting details.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                An independent broker can organize driver records, vehicle
                schedules, radius of operation, contracts, and business
                descriptions for review by available markets. Complete and
                accurate submissions help underwriters evaluate the risk and
                reduce avoidable follow-up.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                After binding, we remain available for policy service, renewal
                questions, certificates, and general claims-process guidance.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 5: Los Angeles and Westside Los Angeles service */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Commercial auto service for Los Angeles' Westside
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Our office is located at 12240 Venice Blvd, Suite 2 in Los Angeles,
                near the 405 freeway and convenient to Mar Vista, Culver City,
                Venice, Santa Monica, and the surrounding Westside. We start with
                how each vehicle is owned, driven, stored, and used so the quote
                reflects the business's actual operations.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Walk-ins are welcome. Quote and binding timelines depend on the
                operation, driver information, vehicle schedule, and carrier
                review. Call us or start your quote online and we'll explain what
                documents are needed and follow up promptly.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 6: Nearby service areas */}
      <section className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Nearby service areas
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              We serve businesses throughout Los Angeles and nearby Westside
              communities. Carrier eligibility depends on the operation and
              where the vehicles travel.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {NEARBY_CITIES.map((city) => (
                <Link
                  key={city.slug}
                  to={`/insurance/${city.slug}`}
                  className="inline-flex items-center gap-1.5 bg-white text-slate-700 rounded-lg px-4 py-2 ring-1 ring-slate-200 hover:ring-brand-300 hover:text-brand-700 transition-all text-sm font-medium"
                >
                  Insurance in {city.name}, CA
                </Link>
              ))}
            </div>
            <div className="border-t border-slate-200 pt-8">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
                Related Los Angeles insurance pages
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/auto-insurance-los-angeles-ca"
                  className="inline-flex items-center gap-1.5 bg-white text-slate-700 rounded-lg px-4 py-2 ring-1 ring-slate-200 hover:ring-brand-300 hover:text-brand-700 transition-all text-sm font-medium"
                >
                  Auto Insurance Los Angeles CA
                </Link>
                <Link
                  to="/sr22-insurance-los-angeles"
                  className="inline-flex items-center gap-1.5 bg-white text-slate-700 rounded-lg px-4 py-2 ring-1 ring-slate-200 hover:ring-brand-300 hover:text-brand-700 transition-all text-sm font-medium"
                >
                  SR-22 Insurance Los Angeles
                </Link>
                <Link
                  to="/no-license-auto-insurance-los-angeles"
                  className="inline-flex items-center gap-1.5 bg-white text-slate-700 rounded-lg px-4 py-2 ring-1 ring-slate-200 hover:ring-brand-300 hover:text-brand-700 transition-all text-sm font-medium"
                >
                  No-License Insurance Los Angeles
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <PageTestimonials />

      {/* Dual CTA block */}
      <section className="sp bg-brand-950">
        <div className="container max-w-3xl text-center">
          <Reveal>
            <h2
              className="text-3xl font-bold text-white mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ready to protect your business vehicles?
            </h2>
            <p className="text-white/70 mb-6">
              We compare available commercial auto markets and can help coordinate
              certificates of insurance and applicable filing requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={openQuoteModal} className="btn btn-accent btn-lg">
                Get a Commercial Auto Quote
              </button>
              <a
                href={site.contact.phoneHref}
                className="btn btn-ghost-light btn-lg"
              >
                Call {site.contact.phone}
              </a>
            </div>
            <p className="mt-5 text-white/60 text-sm">
              Office at 12240 Venice Blvd, Suite 2, Los Angeles, CA — walk-ins welcome.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
