import { ArrowLeft, ArrowRight, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { AtlasEyebrow, AtlasImage } from "../components/AtlasUI";
import { usePageMeta } from "../lib/seo";
import { site } from "../lib/site";

export default function NotFound() {
  usePageMeta({
    title: "Page Not Found | Rafla Insurance Agency",
    description: "The requested Rafla Insurance Agency page could not be found. Return home or contact the Mar Vista office.",
    canonical: "https://raflainsurance.com/404",
    robots: "noindex, nofollow, noarchive",
  });

  return (
    <main id="main-content" className="not-found-atlas">
      <div className="atlas-container not-found-atlas__grid">
        <div className="hero-copy-enter">
          <AtlasEyebrow light>Page not found</AtlasEyebrow>
          <span className="not-found-atlas__number">404</span>
          <h1>We couldn’t find that page.</h1>
          <p>The address may have changed, or the link may be incomplete. Choose a useful way back—or call the office if you were looking for something specific.</p>
          <nav className="not-found-atlas__actions" aria-label="Page recovery options">
            <Link className="not-found-atlas__primary" to="/"><ArrowLeft size={16} />Back home</Link>
            <a href={site.contact.phoneHref}><Phone size={16} />Call {site.contact.phone}</a>
            <Link to="/services">Insurance services<ArrowRight size={15} /></Link>
            <Link to="/locations">Service areas<ArrowRight size={15} /></Link>
          </nav>
        </div>
        <figure className="atlas-parallax">
          <AtlasImage src="/images/illustrated/office-venice-illustrated-v6.webp" alt="Illustration of Rafla Insurance Agency's Venice Boulevard office" width="1536" height="1024" />
          <figcaption><MapPin size={15} />Back to Mar Vista</figcaption>
        </figure>
      </div>
    </main>
  );
}
