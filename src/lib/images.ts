/** Generate a simple srcSet string for a single WebP image path */
export function srcset(src: string): string {
  return src;
}

/** Centralized image paths — all optimized from /public/images */
export const images = {
  hero: {
    /** Commissioned editorial broker conversation for Rafla's people-first campaign */
    people: "/images/illustrated/broker-desk-v6.webp",
    /** Illustrated coverage-review desk created for Rafla */
    consultation: "/images/illustrated/policy-desk-v6.webp",
    /** Illustrated Venice Boulevard neighborhood office */
    storefront: "/images/illustrated/office-venice-illustrated-v6.webp",
    /** The one documentary proof image retained in the visual system. */
    officeDetail: "/images/brand/office-venice-thumb-v3.webp",
  },
  home: {
    household: "/images/illustrated/household-v6.webp",
    business: "/images/illustrated/small-business-v6.webp",
    renters: "/images/illustrated/renters-inventory-v6.webp",
    property: "/images/illustrated/home-property-v7.webp",
    why: "/images/illustrated/policy-desk-v6.webp",
    reviews: "/images/illustrated/policy-desk-v6.webp",
  },
  services: {
    auto: "/images/illustrated/auto-review-v6.webp",
    home: "/images/illustrated/home-property-v7.webp",
    workers: "/images/illustrated/workers-safety-v6.webp",
    commercial: "/images/illustrated/small-business-v6.webp",
    motorcycle: "/images/illustrated/specialty-v6.webp",
    rv: "/images/illustrated/specialty-v6.webp",
  },
  products: {
    overview: "/images/illustrated/policy-desk-v6.webp",
    auto: "/images/illustrated/auto-review-v6.webp",
    home: "/images/illustrated/renters-inventory-v6.webp",
    workers: "/images/illustrated/workers-safety-v6.webp",
    commercial: "/images/illustrated/small-business-v6.webp",
    motorcycle: "/images/illustrated/specialty-v6.webp",
    rv: "/images/illustrated/specialty-v6.webp",
    sr22: "/images/illustrated/auto-review-v6.webp",
    noLicense: "/images/illustrated/policy-desk-v6.webp",
    filings: "/images/illustrated/certificates-bonds-v7.webp",
  },
  about: {
    office: "/images/illustrated/broker-desk-v6.webp",
    officeAlt: "/images/illustrated/office-venice-illustrated-v6.webp",
  },
  location: {
    exterior: "/images/illustrated/office-venice-illustrated-v6.webp",
    exteriorWide: "/images/illustrated/office-venice-illustrated-v6.webp",
    interior: "/images/illustrated/contact-service-v6.webp",
    consultationRoom: "/images/illustrated/broker-desk-v6.webp",
  },
  testimonials: {
    auto: "/images/illustrated/auto-review-v6.webp",
    family: "/images/illustrated/household-v6.webp",
    business: "/images/illustrated/small-business-v6.webp",
  },
  clients: {
    officeConsultation: "/images/illustrated/policy-desk-v6.webp",
    autoConsultation: "/images/illustrated/auto-review-v6.webp",
    sr22Consultation: "/images/illustrated/auto-review-v6.webp",
    noLicenseConsultation: "/images/illustrated/policy-desk-v6.webp",
    commercialConsultation: "/images/illustrated/small-business-v6.webp",
    contactFrontDesk: "/images/illustrated/contact-service-v6.webp",
  },
  claims: {
    docs: "/images/illustrated/claims-service-v7.webp",
    certificates: "/images/illustrated/certificates-bonds-v7.webp",
  },
  city: {
    westside: "/images/illustrated/office-venice-illustrated-v6.webp",
    coastal: "/images/illustrated/specialty-v6.webp",
    palmsCulver: "/images/illustrated/household-v6.webp",
    southWestside: "/images/illustrated/small-business-v6.webp",
  },
};
