/** Generate a simple srcSet string for a single WebP image path */
export function srcset(src: string): string {
  return src;
}

/** Centralized image paths — all optimized from /public/images */
export const images = {
  hero: {
    /** Original Rafla consultation scene composed for the homepage hero */
    consultation: "/images/rafla/home-hero.webp",
    /** Real photo: exterior storefront on Venice Blvd, Los Angeles */
    storefront: "/images/client/rafla-building-street.jpg",
    officeDetail: "/images/client/rafla-building-front.jpg",
  },
  home: {
    why: "/images/rafla/about-conversation.webp",
    reviews: "/images/rafla/policy-review.webp",
  },
  services: {
    auto: "/images/rafla/auto-mar-vista.webp",
    home: "/images/rafla/home-bungalow.webp",
    workers: "/images/rafla/workers-comp.webp",
    commercial: "/images/rafla/commercial-fleet.webp",
    motorcycle: "/images/rafla/motorcycle-venice.webp",
    rv: "/images/rafla/rv-boat-marina.webp",
  },
  products: {
    overview: "/images/rafla/services-overview.webp",
    auto: "/images/rafla/auto-mar-vista.webp",
    home: "/images/rafla/home-bungalow.webp",
    workers: "/images/rafla/workers-comp.webp",
    commercial: "/images/rafla/commercial-fleet.webp",
    motorcycle: "/images/rafla/motorcycle-venice.webp",
    rv: "/images/rafla/rv-boat-marina.webp",
    sr22: "/images/rafla/sr22-review.webp",
    noLicense: "/images/rafla/document-consultation.webp",
  },
  about: {
    office: "/images/rafla/about-conversation.webp",
    officeAlt: "/images/client/rafla-building-angle.jpg",
  },
  location: {
    /** Real photo: storefront from across the street — clean, no obstruction */
    exterior: "/images/client/rafla-building-street.jpg",
    /** Real photo: wider exterior showing the shopping center context */
    exteriorWide: "/images/client/rafla-building-wide.jpg",
    /** Real photo: close exterior view of the Rafla storefront */
    interior: "/images/client/rafla-building-front.jpg",
    /** Real photo: angled exterior view of the Rafla storefront */
    consultationRoom: "/images/client/rafla-building-angle.jpg",
  },
  testimonials: {
    auto: "/images/rafla/auto-mar-vista.webp",
    family: "/images/rafla/home-bungalow.webp",
    business: "/images/rafla/about-conversation.webp",
  },
  clients: {
    officeConsultation: "/images/rafla/home-hero.webp",
    autoConsultation: "/images/rafla/home-hero.webp",
    sr22Consultation: "/images/rafla/sr22-review.webp",
    noLicenseConsultation: "/images/rafla/document-consultation.webp",
    commercialConsultation: "/images/rafla/commercial-fleet.webp",
    contactFrontDesk: "/images/rafla/contact-welcome.webp",
  },
  claims: {
    docs: "/images/rafla/policy-review.webp",
  },
  city: {
    westside: "/images/rafla/westside-jacaranda.webp",
    coastal: "/images/rafla/coastal-marina.webp",
    palmsCulver: "/images/rafla/palms-culver.webp",
    southWestside: "/images/rafla/south-westside.webp",
  },
};
