import { useEffect } from "react";

interface LocalBusinessSchemaProps {
  /** Override the page URL (defaults to homepage) */
  url?: string;
  /** Override or extend areaServed list (first entry should be the current city) */
  areaServed?: string[];
}

const DEFAULT_AREA_SERVED = [
  "Los Angeles, CA",
  "Mar Vista, Los Angeles, CA",
  "Culver City, CA",
  "Santa Monica, CA",
  "Venice, Los Angeles, CA",
  "Marina del Rey, CA",
  "West Los Angeles, CA",
  "Palms, Los Angeles, CA",
  "Sawtelle, Los Angeles, CA",
  "Playa Vista, Los Angeles, CA",
  "Westchester, Los Angeles, CA",
  "Inglewood, CA",
  "Ladera Heights, CA",
];

export default function LocalBusinessSchema({
  url = "https://raflainsurance.com/",
  areaServed = DEFAULT_AREA_SERVED,
}: LocalBusinessSchemaProps) {
  useEffect(() => {
    // Remove any pre-existing InsuranceAgency blocks (static template block + prior mounts)
    // so every page ends up with exactly 1.
    document.querySelectorAll('script[type="application/ld+json"]').forEach((s) => {
      try {
        if (JSON.parse(s.textContent || "{}")["@type"] === "InsuranceAgency") s.remove();
      } catch {
        return;
      }
    });

    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-schema", "LocalBusinessSchema");
    el.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "InsuranceAgency",
      "@id": "https://raflainsurance.com/#agency",
      name: "Rafla Insurance Agency",
      legalName: "Rafla Insurance Agency, Inc.",
      identifier: "CA Agency License 0D95584",
      description: "Independent insurance broker in the Mar Vista neighborhood of Los Angeles offering personal and commercial insurance in English, Spanish, and Arabic.",
      foundingDate: "2003",
      url,
      telephone: "+1-310-572-7246",
      faxNumber: "+1-310-572-7247",
      image: [
        "https://raflainsurance.com/images/client/rafla-building-street.jpg",
        "https://raflainsurance.com/images/client/rafla-building-front.jpg",
        "https://raflainsurance.com/images/client/rafla-building-angle.jpg",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+1-310-572-7246",
          contactType: "customer service",
          availableLanguage: ["English", "Spanish", "Arabic"],
          areaServed: "US-CA",
        },
        {
          "@type": "ContactPoint",
          name: "Mark Rafla",
          telephone: "+1-310-918-7007",
          contactType: "sales",
          availableLanguage: ["English", "Spanish", "Arabic"],
          areaServed: "US-CA",
        },
        {
          "@type": "ContactPoint",
          name: "Ashraf Abdelmalik",
          telephone: "+1-213-879-5955",
          contactType: "customer service",
          availableLanguage: ["English", "Spanish", "Arabic"],
          areaServed: "US-CA",
        },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "12240 Venice Blvd, Suite 2",
        addressLocality: "Los Angeles",
        addressRegion: "CA",
        postalCode: "90066",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 34.0054,
        longitude: -118.4317,
      },
      areaServed,
      availableLanguage: ["English", "Spanish", "Arabic"],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "10:00",
          closes: "19:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "10:00",
          closes: "15:00",
        },
      ],
      sameAs: ["https://www.google.com/search?q=Rafla+Insurance+Agency+Los+Angeles+CA"],
      serviceType: [
        "Auto Insurance",
        "SR-22 Filing",
        "No-License Auto Insurance",
        "Commercial Auto Insurance",
        "Home Insurance",
        "Renters Insurance",
        "Motorcycle Insurance",
        "Workers' Compensation Insurance",
        "Surety Bonds",
        "Commercial Property Insurance",
        "Condo Insurance",
      ],
    });
    document.head.appendChild(el);
    return () => { el.remove(); };
  }, [url, areaServed]);

  return null;
}
