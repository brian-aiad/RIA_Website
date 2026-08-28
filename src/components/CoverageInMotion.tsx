import { ArrowRight, BriefcaseBusiness, Car, House } from "lucide-react";
import { Link } from "react-router-dom";
import { AtlasImage, SectionFolio } from "./AtlasUI";

const scenes = [
  {
    time: "8:10am · On the road",
    title: "A vehicle can change roles during the day.",
    detail: "Commuting, deliveries, rideshare, and business use can lead to different coverage questions.",
    action: "Open the auto file",
    href: "/auto-insurance-los-angeles-ca",
    image: "/images/illustrated/coverage-film-auto-higgsfield.webp",
    alt: "Editorial illustration of a blue sedan outside a Los Angeles insurance office",
    icon: Car,
    tone: "auto",
  },
  {
    time: "12:40pm · Back at home",
    title: "The address holds more than the structure.",
    detail: "Rebuild details, belongings, liability, and temporary living costs belong in the same review.",
    action: "Open the home file",
    href: "/home-insurance-los-angeles-ca",
    image: "/images/illustrated/coverage-film-home-higgsfield.webp",
    alt: "Editorial illustration of a Westside bungalow prepared for a home insurance review",
    icon: House,
    tone: "home",
  },
  {
    time: "3:15pm · At the shop",
    title: "One business can create several insurance needs.",
    detail: "Vehicles, jobsites, employees, property, contracts, and bonds may each need a closer look.",
    action: "Open the business file",
    href: "/commercial-auto-insurance-los-angeles",
    image: "/images/illustrated/small-business-v6.webp",
    alt: "Editorial illustration of a Los Angeles small-business crew preparing tools beside a work van",
    icon: BriefcaseBusiness,
    tone: "business",
  },
];

export default function CoverageInMotion() {
  return (
    <section className="coverage-motion section-folio-host" data-coverage-motion aria-labelledby="coverage-motion-title">
      <SectionFolio tone="gold">A day in motion</SectionFolio>
      <div className="atlas-container">
        <header className="coverage-motion__heading">
          <div>
            <p className="ria-kicker">Protection moves with you</p>
            <h2 id="coverage-motion-title">One ordinary day.<br /><span>Three different risk conversations.</span></h2>
          </div>
          <p>The pieces of life do not stay in separate boxes. A local broker can help identify where personal and business needs meet—then explain which details are worth reviewing.</p>
        </header>

        <div className="coverage-motion__progress" aria-hidden="true">
          <span />
          {scenes.map(({ time }) => <i key={time} />)}
        </div>

        <p className="mobile-swipe-hint mobile-swipe-hint--ink coverage-motion__hint" aria-hidden="true"><span />Swipe through one Los Angeles day</p>
        <div className="coverage-motion__rail" role="region" aria-label="Insurance moments throughout one day" tabIndex={0}>
          {scenes.map(({ time, title, detail, action, href, image, alt, icon: Icon, tone }) => (
            <Link className={`coverage-motion__scene coverage-motion__scene--${tone}`} to={href} key={time}>
              <figure>
                <AtlasImage src={image} alt={alt} width="2048" height="1152" loading="lazy" sizes="(max-width: 620px) 84vw, (max-width: 1000px) 44vw, 31vw" />
                <span className="coverage-motion__time"><Icon aria-hidden="true" />{time}</span>
                <figcaption>
                  <h3>{title}</h3>
                  <p>{detail}</p>
                  <strong>{action}<ArrowRight aria-hidden="true" /></strong>
                </figcaption>
              </figure>
            </Link>
          ))}
        </div>

        <p className="coverage-motion__disclosure">Examples are for general orientation only. Coverage, eligibility, terms, and availability vary by carrier and situation.</p>
      </div>
    </section>
  );
}
