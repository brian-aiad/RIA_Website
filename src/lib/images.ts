/** Generate a simple srcSet string for a single WebP image path */
export function srcset(src: string): string {
  return src;
}

/** Centralized image paths — all optimized from /public/images */
export const images = {
  hero: {
    /** Documentary insurance-review still life created for Rafla */
    consultation: "/images/agency/policy-desk-v2.webp",
    /** Real photo: exterior storefront on Venice Blvd, Los Angeles */
    storefront: "/images/agency/office-venice-v2.webp",
    officeDetail: "/images/client/rafla-building-front.jpg",
  },
  home: {
    why: "/images/agency/policy-desk-v2.webp",
    reviews: "/images/agency/policy-desk-v2.webp",
  },
  services: {
    auto: "/images/agency/auto-home-v2.webp",
    home: "/images/agency/auto-home-v2.webp",
    workers: "/images/agency/workers-v2.webp",
    commercial: "/images/agency/small-business-v2.webp",
    motorcycle: "/images/agency/specialty-v2.webp",
    rv: "/images/agency/specialty-v2.webp",
  },
  products: {
    overview: "/images/agency/policy-desk-v2.webp",
    auto: "/images/agency/auto-home-v2.webp",
    home: "/images/agency/auto-home-v2.webp",
    workers: "/images/agency/workers-v2.webp",
    commercial: "/images/agency/small-business-v2.webp",
    motorcycle: "/images/agency/specialty-v2.webp",
    rv: "/images/agency/specialty-v2.webp",
    sr22: "/images/agency/policy-desk-v2.webp",
    noLicense: "/images/agency/policy-desk-v2.webp",
  },
  about: {
    office: "/images/agency/policy-desk-v2.webp",
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
    auto: "/images/agency/auto-home-v2.webp",
    family: "/images/agency/auto-home-v2.webp",
    business: "/images/agency/small-business-v2.webp",
  },
  clients: {
    officeConsultation: "/images/agency/policy-desk-v2.webp",
    autoConsultation: "/images/agency/auto-home-v2.webp",
    sr22Consultation: "/images/agency/policy-desk-v2.webp",
    noLicenseConsultation: "/images/agency/policy-desk-v2.webp",
    commercialConsultation: "/images/agency/small-business-v2.webp",
    contactFrontDesk: "/images/agency/office-venice-v2.webp",
  },
  claims: {
    docs: "/images/agency/policy-desk-v2.webp",
  },
  city: {
    westside: "/images/agency/office-venice-v2.webp",
    coastal: "/images/agency/specialty-v2.webp",
    palmsCulver: "/images/agency/auto-home-v2.webp",
    southWestside: "/images/agency/small-business-v2.webp",
  },
};
