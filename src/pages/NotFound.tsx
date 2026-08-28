import { ArrowLeft, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { AtlasEyebrow, AtlasImage } from "../components/AtlasUI";
import { usePageMeta } from "../lib/seo";

export default function NotFound() {
  usePageMeta({ title: "Page Not Found | Rafla Insurance Agency", description: "The requested Rafla Insurance Agency page could not be found.", canonical: "https://raflainsurance.com/404" });
  return <main id="main-content" className="not-found-atlas"><div className="atlas-container not-found-atlas__grid"><div className="hero-copy-enter"><AtlasEyebrow light>Page not found</AtlasEyebrow><span className="not-found-atlas__number">404</span><h1>We couldn’t find that page.</h1><p>The address may have changed, or the link may be incomplete. Return home or call us if you were looking for something specific.</p><Link to="/"><ArrowLeft size={16}/>Back to Rafla Insurance</Link></div><figure className="atlas-parallax"><AtlasImage src="/images/illustrated/office-venice-illustrated-v6.webp" alt="Illustration of Rafla Insurance Agency's Venice Boulevard office" width="1536" height="1024"/><figcaption><MapPin size={15}/>Back to Mar Vista</figcaption></figure></div></main>;
}
