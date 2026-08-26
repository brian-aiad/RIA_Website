import type { ImgHTMLAttributes, ReactNode } from "react";
import { ArrowRight, ArrowUpRight, MapPin, Phone, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";

export function AtlasEyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className={`atlas-eyebrow ${light ? "atlas-eyebrow--light" : ""}`}>
      <span aria-hidden="true" />
      {children}
    </div>
  );
}

export function AtlasButton({
  children,
  to,
  tone = "navy",
  onClick,
}: {
  children: ReactNode;
  to?: string;
  tone?: "navy" | "gold" | "paper" | "line";
  onClick?: () => void;
}) {
  const className = `atlas-button atlas-button--${tone}`;
  const content = <>{children}<ArrowUpRight aria-hidden="true" size={16} strokeWidth={2.2} /></>;
  if (to) return <Link className={className} to={to}>{content}</Link>;
  return <button type="button" className={className} onClick={onClick}>{content}</button>;
}

export function AtlasImage({
  src,
  alt,
  sizes = "(max-width: 900px) 100vw, 50vw",
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string }) {
  const isResponsiveAsset = src.startsWith("/images/agency/") && src.endsWith(".webp") && !src.endsWith("-sm.webp") && !src.endsWith("-md.webp");
  const srcSet = isResponsiveAsset
    ? `${src.replace(/\.webp$/, "-sm.webp")} 640w, ${src.replace(/\.webp$/, "-md.webp")} 1100w, ${src} 1568w`
    : undefined;

  return <img src={src} srcSet={srcSet} sizes={srcSet ? sizes : undefined} alt={alt} {...props} />;
}

export function DossierHeader({
  index,
  eyebrow,
  title,
  lede,
  image,
  imageAlt,
  children,
}: {
  index: string;
  eyebrow: string;
  title: string;
  lede: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <header className="dossier-hero">
      <div className="atlas-container dossier-hero__grid">
        <div className="dossier-hero__copy hero-copy-enter">
          <div className="dossier-hero__meta">
            <span>{index}</span>
            <AtlasEyebrow>{eyebrow}</AtlasEyebrow>
          </div>
          <h1>{title}</h1>
          <p className="dossier-hero__lede">{lede}</p>
          {children && <div className="dossier-hero__actions">{children}</div>}
        </div>
        {image && (
          <figure className="dossier-hero__visual atlas-parallax">
            <AtlasImage src={image} alt={imageAlt ?? ""} width="1536" height="1024" fetchPriority="high" />
            <figcaption>
              <span>Rafla Insurance Agency</span>
              Independent · Local · Here when you need us
            </figcaption>
          </figure>
        )}
      </div>
      <div className="route-rule" aria-hidden="true"><span className="route-draw" /></div>
    </header>
  );
}

export function QuoteBand({
  title = "Let’s find coverage that feels right.",
  text = "Tell us what you want to protect. A local broker will help you understand the options and the details that matter.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="quote-band">
      <div className="atlas-container quote-band__grid motion-reveal">
        <div className="quote-band__mark" aria-hidden="true"><Sparkles size={22} /></div>
        <div>
          <AtlasEyebrow light>Personal help starts here</AtlasEyebrow>
          <h2>{title}</h2>
        </div>
        <p>{text}</p>
        <div className="quote-band__actions">
          <AtlasButton tone="gold" onClick={openQuoteModal}>Request a quote</AtlasButton>
          <a className="quote-band__phone" href={site.contact.phoneHref}><Phone size={15} /> {site.contact.phone}</a>
        </div>
      </div>
    </section>
  );
}

export function FactRail({ facts }: { facts: Array<{ label: string; value: string }> }) {
  return (
    <div className="fact-rail" aria-label="Agency facts">
      {facts.map((fact) => (
        <div key={fact.label} className="fact-rail__item motion-reveal">
          <span>{fact.label}</span>
          <strong>{fact.value}</strong>
        </div>
      ))}
    </div>
  );
}

export function LocalOfficeCard({ compact = false }: { compact?: boolean }) {
  return (
    <aside className={`local-office-card ${compact ? "local-office-card--compact" : ""}`}>
      <div className="local-office-card__pin"><MapPin size={18} /></div>
      <div>
        <span>Your neighborhood agency</span>
        <strong>Venice Blvd / Mar Vista</strong>
        <p>{site.contact.address}</p>
      </div>
      <a href={site.contact.mapsHref} target="_blank" rel="noreferrer" aria-label="Open Rafla Insurance in maps"><ArrowRight size={18} /></a>
    </aside>
  );
}

export function PaperNote({ label, children, tone = "paper" }: { label: string; children: ReactNode; tone?: "paper" | "blue" | "teal" }) {
  return (
    <aside className={`paper-note paper-note--${tone} motion-reveal`}>
      <span>{label}</span>
      <div>{children}</div>
    </aside>
  );
}
