import { ArrowLeft, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { AtlasEyebrow } from "../components/AtlasUI";
import { usePageMeta } from "../lib/seo";

export default function NotFound() {
  usePageMeta({ title: "Page Not Found | Rafla Insurance Agency", description: "The requested Rafla Insurance Agency page could not be found.", canonical: "https://raflainsurance.com/404" });
  return <main id="main-content" className="not-found-atlas"><div className="atlas-container not-found-atlas__grid"><div className="hero-copy-enter"><AtlasEyebrow light>Route not found</AtlasEyebrow><span className="not-found-atlas__number">404</span><h1>This file is not on the map.</h1><p>The address may have changed, or the link may be incomplete. Return to the coverage desk and choose a new route.</p><Link to="/"><ArrowLeft size={16}/>Back to Rafla Insurance</Link></div><figure className="atlas-parallax"><img src="/images/atlas/westside-atlas.webp" alt="Rafla coverage atlas"/><figcaption><MapPin size={15}/>Re-center on Mar Vista</figcaption></figure></div></main>;
}
