import type { LucideIcon } from "lucide-react";
import { Bike, BriefcaseBusiness, Building2, Car, FileCheck2, Home, Ship, ShieldCheck } from "lucide-react";

export type CoverageKey = "auto" | "home" | "commercial" | "sr22" | "specialty";

export type CoverageEntry = {
  key: CoverageKey;
  number: string;
  title: string;
  short: string;
  href: string;
  image: string;
  imageAlt: string;
  accent: "gold" | "teal" | "blue";
  icon: LucideIcon;
};

export const coverageEntries: CoverageEntry[] = [
  {
    key: "auto",
    number: "01",
    title: "Auto",
    short: "Daily drivers, specialty situations, and California filings.",
    href: "/auto-insurance-los-angeles-ca",
    image: "/images/illustrated/auto-review-v8.webp",
    imageAlt: "Illustration of a Westside household reviewing auto coverage beside their car",
    accent: "gold",
    icon: Car,
  },
  {
    key: "home",
    number: "02",
    title: "Home & renters",
    short: "Property, belongings, loss of use, and personal liability.",
    href: "/home-insurance-los-angeles-ca",
    image: "/images/illustrated/household-v6.webp",
    imageAlt: "Illustration of a Westside Los Angeles household, bungalow, car, and bicycle",
    accent: "teal",
    icon: Home,
  },
  {
    key: "commercial",
    number: "03",
    title: "Business",
    short: "Commercial auto, liability, workers’ compensation, and bonds.",
    href: "/services#work",
    image: "/images/illustrated/small-business-v6.webp",
    imageAlt: "Illustration of a Westside small-business owner and crew outside their shop",
    accent: "blue",
    icon: BriefcaseBusiness,
  },
  {
    key: "sr22",
    number: "04",
    title: "Filings & complex cases",
    short: "SR-22 support and careful review of nonstandard license situations.",
    href: "/sr22-insurance-los-angeles",
    image: "/images/illustrated/policy-desk-v6.webp",
    imageAlt: "Illustration of insurance documents, vehicle keys, and notes arranged for review",
    accent: "gold",
    icon: FileCheck2,
  },
  {
    key: "specialty",
    number: "05",
    title: "Specialty",
    short: "Motorcycle, RV, boat, recreational vehicles, and surety bonds.",
    href: "/services#specialty",
    image: "/images/illustrated/specialty-v6.webp",
    imageAlt: "Illustration of a motorcycle, travel trailer, and small boat prepared for a trip",
    accent: "teal",
    icon: Ship,
  },
];

export const serviceGroups = [
  {
    id: "drive",
    label: "On the road",
    kicker: "Drivers",
    icon: Car,
    lines: ["Auto liability", "Comprehensive & collision", "Commercial auto", "Motorcycle", "SR-22 filing support", "Specialty license situations"],
  },
  {
    id: "property",
    label: "Where you live",
    kicker: "Property",
    icon: Home,
    lines: ["Homeowners", "Renters", "Condo", "Landlord", "Personal liability", "Scheduled belongings"],
  },
  {
    id: "work",
    label: "How you work",
    kicker: "Business",
    icon: Building2,
    lines: ["General liability", "Business owner policies", "Workers’ compensation", "Commercial property", "Commercial auto", "Surety bonds"],
  },
  {
    id: "weekend",
    label: "Beyond the routine",
    kicker: "Specialty",
    icon: Bike,
    lines: ["Motorcycle", "RV", "Boat & watercraft", "Recreational vehicles", "Umbrella", "Policy review"],
  },
];

export type CityInfo = {
  slug: string;
  name: string;
  zips: string[];
  group: "home" | "coast" | "north" | "south";
  note: string;
};

export const cities: CityInfo[] = [
  { slug: "mar-vista", name: "Mar Vista", zips: ["90066"], group: "home", note: "Rafla’s office neighborhood on Venice Boulevard." },
  { slug: "palms", name: "Palms", zips: ["90034"], group: "home", note: "A nearby neighborhood for drivers, renters, homeowners, and small businesses." },
  { slug: "culver-city", name: "Culver City", zips: ["90230", "90232"], group: "home", note: "Nearby coverage help for households, landlords, contractors, and local firms." },
  { slug: "venice", name: "Venice", zips: ["90291"], group: "coast", note: "Auto, renters, property, and business reviews for the coastal neighborhood." },
  { slug: "marina-del-rey", name: "Marina del Rey", zips: ["90292"], group: "coast", note: "Coverage questions for drivers, renters, property owners, businesses, and watercraft." },
  { slug: "santa-monica", name: "Santa Monica", zips: ["90401", "90402", "90403", "90404", "90405"], group: "coast", note: "Personal and business policy reviews from Rafla’s nearby Mar Vista office." },
  { slug: "west-los-angeles", name: "West Los Angeles", zips: ["90025", "90064"], group: "north", note: "A nearby office for personal, property, and business insurance questions." },
  { slug: "sawtelle", name: "Sawtelle", zips: ["90025"], group: "north", note: "Nearby help with auto, renters, property, and small-business policies." },
  { slug: "playa-vista", name: "Playa Vista", zips: ["90094"], group: "south", note: "Policy reviews for renters, condo owners, drivers, and growing businesses." },
  { slug: "westchester", name: "Westchester", zips: ["90045"], group: "south", note: "Insurance help for households, landlords, contractors, and local firms." },
  { slug: "inglewood", name: "Inglewood", zips: ["90301", "90302", "90303", "90304", "90305"], group: "south", note: "Auto, property, contractor, and small-business coverage reviewed from Mar Vista." },
  { slug: "ladera-heights", name: "Ladera Heights", zips: ["90056"], group: "south", note: "Home, auto, landlord, and professional coverage help from a nearby office." },
];

export const cityMap = Object.fromEntries(cities.map((city) => [city.slug, city])) as Record<string, CityInfo>;

export const confidenceMarks = [
  { label: "Independent", detail: "We review available programs rather than presenting one carrier as the only answer.", icon: ShieldCheck },
  { label: "Multilingual", detail: "Conversations in English, Spanish, or Arabic.", icon: BriefcaseBusiness },
  { label: "Westside local", detail: "A real office at 12240 Venice Boulevard in Mar Vista.", icon: Building2 },
];
